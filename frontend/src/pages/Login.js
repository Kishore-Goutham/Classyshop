import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { dataContext } from "../context/Context";
import { useEffect } from "react";
import auth from "../Config/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

function Login() {
  let navigate = useNavigate();
  let {isLogin,checkUser} = useContext(dataContext);
  let [formfields, Setformfields] = useState({ email: "", password: "" });
  let [isloading, Setisloading] = useState(false);
   

    useEffect(()=>{
        if(isLogin){
           navigate('/')
        }
      },[isLogin,navigate])

  function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }

  function forgetPassword() {
    navigate("/forget-password");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Setisloading(true);
      const data = await postData("/api/user/login", formfields);
       
      if (data.success) {
        localStorage.setItem("accessToken", data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
       await checkUser();
       navigate("/");
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    } finally {
      Setisloading(false);
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
          Login to your account
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            onChange={handleInput}
            variant="outlined"
            required
            className="w-full"
          />
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

          <div className="mt-4">
            <p className="link pt-4 cursor-pointer" onClick={forgetPassword}>
              Forget Password?
            </p>
          </div>
          <Button
            type="submit"
            className="!mt-4 !text-white text-center w-full !py-2 rounded-md !bg-[#ff5252]"
            disabled={isloading}
          >
            {isloading ? (
              <CircularProgress color="inherit" />
            ) : (
              <span>Login</span>
            )}
          </Button>

          <p className="mt-4 text-center">
            Not Registered?
            <Link
              to={"/register"}
              className="text-[#ff5252] hover:underline font-semibold"
            >
              Signup here
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

export default Login;
