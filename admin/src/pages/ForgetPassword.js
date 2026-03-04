import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { postData } from "../utilis/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function ForgetPassword() {
  let navigate = useNavigate();
  let [isloading, Setisloading] = useState(false);
  let [formfields, Setformfields] = useState({ email: "" });

   function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Setisloading(true);
      const data = await postData("/api/user/forgetpassword", formfields);
      console.log(data);
      if (data.success) {
        navigate("/verifypassotp", { state: { email: formfields.email} });
        toast.success("Otp sent successfully", {
          position: "top-center",
        });
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
          Enter your Email to Reset
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            required
            className="w-full"
            onChange={handleInput}
          />

          <Button
            disabled={isloading}
            type="submit"
            className="!mt-4 link !text-white text-center w-full !py-2 rounded-md !bg-[#ff5252]"
          >
             {isloading? <CircularProgress  color="inherit" />:
                        <span>Reset Password</span>}
          </Button>

          <p className="mt-4 text-center">
            Remembered password?
            <Link
              to={"/login"}
              className="text-[#ff5252] hover:underline font-semibold"
            >
              login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
