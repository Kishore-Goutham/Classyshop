import React from "react";
import shield from "../assests/shield.png";
import Otpbox from "../Components/Otpbox/Otpbox";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { postData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VerifypassOtp() {
  let location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
   let [isloading,Setisloading]= useState(false)
  let navigate = useNavigate();

  function handleOtpChange(OTP) {
    setOtp(OTP);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Setisloading(true)
      let data = await postData("/api/user/verify-forget-password-otp", { otp, email });
      console.log(data);
      if(data.success) {
        navigate("/reset-password",{state:{email:email}});
        toast.success("OTP verified successfully,please reset", {
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
  return (
    <section>
      <div className="w-[80%] md:w-[30%] m-auto bg-white p-5 my-10 shadow-lg rounded-md">
        <div className="flex flex-col items-center gap-3">
          <img src={shield} className="w-[70px]" alt="shield"></img>
          <h1 className="text-center text-2xl font-bold">Verify OTP</h1>
        </div>
         <p className="text-center text-slate-500">OTP sent to {email}</p>
        <form onSubmit={handleSubmit}>
          <Otpbox length={6} onChange={handleOtpChange} />
          <div className="mx-auto mt-5 w-max">
            <Button type="submit" className="!text-lg !text-black !bg-red-400" disabled={isloading}>
              Verify OTP
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default VerifypassOtp;