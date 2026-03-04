import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../utilis/api";
import CircularProgress from "@mui/material/CircularProgress";


function Login() {
  let navigate = useNavigate();
  let [formfields, Setformfields] = useState({ email: "", password: "" });
  let [isloading, Setisloading] = useState(false);
   
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

          <Button className="gap-3 w-full !bg-[#f1f1f1] text-center !font-semibold !text-black">
            <FcGoogle className="!text-xl" />
            Login with Google
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;