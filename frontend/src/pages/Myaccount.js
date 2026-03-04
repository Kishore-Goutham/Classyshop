import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingBag, FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import { dataContext } from "../context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


function Myaccount() {
  
  let {isLogin,userData,addresses} = useContext(dataContext)
  let navigate = useNavigate()

   useEffect(()=>{
     if(!isLogin){
        navigate('/')
     }
   },[isLogin,navigate])

  return (
    <section className="py-6 md:py-8">
      <div className="w-[95%] md:w-[80%] mx-auto flex flex-col md:flex-row gap-6">

        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-[25%] bg-white rounded-md shadow-sm p-4 md:p-5">

          {/* Profile image and name */}
          <div className="flex flex-col items-center border-b pb-4">
            <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] relative rounded-full bg-gray-200 flex items-center justify-center">
               
              <FaRegUser className="text-3xl md:text-4xl text-gray-500"/>
            </div>

            <h3 className="mt-3 font-semibold text-base md:text-lg text-center">
              {userData.name}
            </h3>

            <p className="text-gray-500 text-sm text-center">
              {userData.email}
            </p>
          </div>

          {/* Menu */}
          <div className="mt-4 flex flex-col">

            <Link to={'/my-account'}
              className="flex items-center gap-3 px-4 py-3 bg-gray-100 border-l-4 border-red-500 text-red-500 font-medium"
            >
              <FaRegUser />
              My Profile
            </Link>

            <Link
              to="/my-list"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <FaRegHeart />
              My List
            </Link>

            <Link
              to="/address"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <FaRegHeart />
              Address
            </Link>

            <Link
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <FiShoppingBag />
              My Orders
            </Link>

            <Link
              to="/logout"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <FiLogOut />
              Logout
            </Link>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-[75%] bg-white rounded-md shadow-sm p-4 md:p-6">

          <h2 className="text-lg md:text-xl font-semibold border-b pb-3">
            My Profile
          </h2>

          {/* Form */}
          <div className="mt-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
              value={userData.name}
                type="text"
                placeholder="Full Name"
                className="border rounded-md px-4 py-2 outline-none focus:border-red-400"
              />

              <input
              value={userData.email}
                type="email"
                placeholder="Email"
                className="border rounded-md px-4 py-2 outline-none focus:border-red-400"
              />

              <input
              value={addresses.mobile}
                type="text"
                placeholder="Phone Number"
                className="border rounded-md px-4 py-2 outline-none focus:border-red-400"
              />

            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">

              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto">
                SAVE
              </button>

              <button className="border border-red-500 text-red-500 px-6 py-2 rounded-md hover:bg-red-50 w-full sm:w-auto">
                CANCEL
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Myaccount;

