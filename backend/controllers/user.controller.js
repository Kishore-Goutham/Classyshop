import UserModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmailFun.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefrshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
  secure: true,
});

export async function registerUserController(req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      //  console.log(name,email,password)
      return res.status(400).json({
        message: "Provide email,name,passoword",
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);
    let payload = {
      email: email,
      password: hashpassword,
      name: name,
      otp: verifyCode,
      otpExpires: Date.now() + 600000,
    };

    let newUser = new UserModel(payload);
    const savedUser = await newUser.save();

    await sendEmailFun({
      sendTo: email,
      subject: "Verification mail from ClassyShop",
      text: `Your OTP is ${verifyCode}.
            
                 It expires in 5 minutes`,
    });

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User successfully registered full verify",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(500).json({
        message: "Provide valid fields",
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User doesn't exists",
        error: true,
        success: false,
      });
    }

    const isValidOtp = user.otp === otp;
    const isOtpNotExpired = user.otpExpires > Date.now();

    if (isValidOtp && isOtpNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).send({
        error: false,
        success: true,
        message: "Email verified successfully",
      });
    } else {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function loginUserController(req, res) {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User doesn't exists",
      error: true,
      success: false,
    });
  }

  if (!user.verify_email) {
    return res.status(403).json({
      message: "Please verify your email first",
      error: true,
      success: false,
    });
  }

  if (user.status !== "Active") {
    return res.status(400).json({
      message: "Contact admin",
      error: true,
      success: false,
    });
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({
      message: "Check your password",
      error: true,
      success: false,
    });
  }

  const accessToken = await generatedAccessToken(user._id);
  const refreshToken = await generatedRefreshToken(user._id);

  const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
    last_login_date: new Date(),
  });

  const cookieOption = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.cookie("accessToken", accessToken, cookieOption);
  res.cookie("refreshToken", refreshToken, cookieOption);

  return res.status(200).json({
    message: "Login successful",
    error: false,
    success: true,
    tokens: {
      accessToken,
      refreshToken,
    },
  });
}

export async function logoutController(req, res) {
  try {
    let userid = req.userId; //middleware

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

let imagesarr = [];
export async function userAvatarController(req, res) {
  try {
    imagesarr = [];
    let userid = req.userId; //middleware
    let image = req.files; // from multer
    console.log(image);

    let user = await UserModel.findOne({ _id: userid });
    let userAvatar = user.avatar;
    // console.log(user);
    console.log(userAvatar + " user avatar");

    //deleting current user avatar before uploading new one in cloudinary
    let urlArr = userAvatar.split("/");
    let avatarImage = urlArr[urlArr.length - 1];
    let imageName = avatarImage.split(".")[0];
    if (imageName) {
      const deleteimg = await cloudinary.uploader.destroy(
        imageName,
        function (error, result) {
          // console.log(error, result);
        },
      );
    }

    for (let i = 0; i < image.length; i++) {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      };
      const img = await cloudinary.uploader.upload(
        image[i].path, //filepath
        options,
        function (error, result) {
          imagesarr.push(result.secure_url);
          fs.unlinkSync(`uploads/${image[i].filename}`);
        },
      );
    }
    // console.log(imagesarr[0]);
    user.avatar = imagesarr[0];
    await user.save();

    return res.status(200).json({
      _id: userid,
      avatar: imagesarr[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function removeImageFromCloudinary(req, res) {
  const imgURL = req.query.img;
  let urlArr = imgURL.split("/");
  let img = urlArr[urlArr.length - 1];
  let imageName = img.split(".")[0];

  const deleteimg = await cloudinary.uploader.destroy(
    imageName,
    function (error, result) {
      console.log(error, result);
    },
  );
  res.status(200).send("avatar deleted");
}

export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const { name, email, mobile } = request.body;

    const userExist = await UserModel.findById(userId);
    if (!userExist)
      return response.status(400).send("The user cannot be Updated!");

    let verifyCode = "";

    if (email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
        verify_email: email !== userExist.email ? false : true,
        otp: verifyCode !== "" ? verifyCode : null,
        otpExpires: verifyCode !== "" ? Date.now() + 600000 : "",
      },
      { new: true },
    );

    if (email !== userExist.email) {
      // Send verification email
      await sendEmailFun({
        sendTo: email,
        subject: "Verify email from Ecommerce App",
        text: "",
        html: VerificationEmail(name, verifyCode),
      });
    }

    return response.json({
      message: "User Updated successfully",
      error: false,
      success: true,
      user: updateUser,
    });
  } catch (error) {}
}

export async function forgetPasswordController(req, res) {
  try {
    let { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exists",
        error: true,
        success: false,
      });
    }
    if (!user.verify_email) {
      return res.status(403).json({
        message: "Please verify your email first",
        error: true,
        success: false,
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = verifyCode;
    user.otpExpires = Date.now() + 600000;

    await user.save();

    await sendEmailFun({
      sendTo: email,
      subject: "Verification mail from ClassyShop",
      text: `Your OTP is ${verifyCode}.
            
                 It expires in 5 minutes`,
    });

    res.status(200).send({
      error: false,
      success: true,
      message: "Check your mail for an OTP",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyForgotPasswordController(req, res) {
  try {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide required fields",
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });

    // if (!user) {
    //   return res.status(400).json({
    //     message: "User doesn't exists",
    //     error: true,
    //     success: false,
    //   });
    // }
    const isValidOtp = user.otp === otp;
    const isOtpNotExpired = user.otpExpires > Date.now();

    if (isValidOtp && isOtpNotExpired) {
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).send({
        error: false,
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    let { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password doesnt match",
        error: true,
        success: false,
      });
    }

    let user = await UserModel.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: passwordhash,
    });

    return res.status(200).send({
      message: "Password  updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}



export async function userDetails(req, res) {
  try {
    let userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token",
    );

    return res.json({
      message: "User details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function authWithGoogle(req, res) {
  try {
    let { name, email, mobile, password, signUpWithGoogle } = req.body;

    let user = await UserModel.findOne({ email });
    
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        mobile,
        password: "null",
        signUpWithGoogle,
        role: "USER",
        verify_email: true,
        status: "Active",
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
