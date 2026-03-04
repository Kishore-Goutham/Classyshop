import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { postData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import auth from "../Config/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { dataContext } from "../context/Context";

const googleProvider = new GoogleAuthProvider();

function Register() {
  let {checkUser} = useContext(dataContext)
  let navigate = useNavigate();
  let [isloading,Setisloading]= useState(false)
  let [formfields, Setformfields] = useState({});

  function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
       Setisloading(true) 
      const data = await postData("/api/user/register", formfields);
      console.log(data);
      if (data.success) {
        navigate("/verify",{state:{email:formfields.email,use:"register"}});
        toast.success("Otp sent successfully", {
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    }finally{
        Setisloading(false)
    }
  }

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth,googleProvider);
    
    const user = result.user;
    // console.log("User:", user);
    // console.log("Name:", user.displayName);
    // console.log("Email:", user.email);
    // console.log("Photo:", user.photoURL);
    
    let fields = {
       name:user.displayName,
       email:user.email,
       password:null,
       mobile:user.phoneNumber,
       signUpWithGoogle:true,
    }
     const data = await postData("/api/user/googleAuth",fields);
      console.log(data);
      if (data.success) {
        localStorage.setItem("accessToken", data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        await checkUser();
        navigate("/");
        toast.success("login successfull", {
          position: "top-center",
        });
      }

  } catch (error) {
    console.log(error);
  }
};

  return (
    <section>
      <div className="w-[80%] md:w-[30%] m-auto bg-white p-4 my-10 shadow-lg rounded-md">
        <h1 className="text-center text-xl font-semibold">
          Register your account
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextField
            id="name"
            type="name"
            onChange={handleInput}
            label="Name"
            variant="outlined"
            required
            className="w-full"
          />

          <div className="mt-5">
            <TextField
              id="email"
              type="email"
              onChange={handleInput}
              label="Email"
              variant="outlined"
              required
              className="w-full"
            />
          </div>

          <div className="mt-5">
            <TextField
              id="password"
              label="Password"
              onChange={handleInput}
              type="password"
              variant="outlined"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isloading}
            className={`!mt-4  !text-white text-center w-full py-2 rounded-md ${isloading? '!bg-gray-400':'!bg-[#ff5252]'} `}
          >
           {isloading? <CircularProgress  color="inherit" />:
            <span>Signup</span>}
          </Button>

          <p className="mt-4 text-center">
            Already have an account?
            <Link
              to={"/login"}
              className="text-[#ff5252] hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
          <p className="text-center mt-3 mb-2">or</p>
          <Button className="gap-3 w-full !bg-[#f1f1f1] text-center !font-semibold !text-black" disabled={isloading} onClick={handleGoogleLogin}>
            <FcGoogle className="!text-xl" />
            Login with Google
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
