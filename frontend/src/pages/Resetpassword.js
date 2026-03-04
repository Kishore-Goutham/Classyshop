import React from "react";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { postData } from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function Restpassword() {
 let location = useLocation();
 const email = location.state?.email; 
  let navigate = useNavigate();
  let [isloading, Setisloading] = useState(false);
  let [formfields, Setformfields] = useState({});

   function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Setisloading(true);
      const data = await postData("/api/user/reset-password", {...formfields,email});
      console.log(data);
      if (data.success) {
        navigate("/login");
        toast.success("password updated successfully,Please login", {
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
          Reset your passowrd
        </h1>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            id="newPassword"
            type="password"
            label="New Password"
            variant="outlined"
            required
            className="w-full"
            onChange={handleInput}
          />

             <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
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

        </form>
      </div>
    </section>
  );
}

export default Restpassword;