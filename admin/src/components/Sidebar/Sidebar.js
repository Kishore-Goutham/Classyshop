import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { dataContext } from "../../App";
import { Link } from "react-router-dom";

function Sidebar() {
  let {
    isLogin,
    isSidebaropen,
    SetisSidebaropen,
    SetisOpenFullScreenPanel,
  } = useContext(dataContext);

  let [dropDownindex, SetdropDownindex] = useState(null);

  function handleDropdown(index) {
    if (dropDownindex === index) {
      SetdropDownindex(null);
    } else {
      SetdropDownindex(index);
    }
  }

  return (
    <section
      className={`
        fixed top-0 left-0 z-40
        h-screen bg-white
        transition-all duration-300
        overflow-y-auto

        /* Desktop width */
        ${isSidebaropen ? "md:w-[18%]" : "md:w-[8%]"}

        /* Mobile behavior */
        w-[75%]
        ${isSidebaropen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* ===== TOP HEADER AREA ===== */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="font-bold text-2xl">ECMA</div>

        {/* Close Button (Mobile Only) */}
        <button
          className="md:hidden text-3xl"
          onClick={() => SetisSidebaropen(false)}
        >
          <IoClose />
        </button>
      </div>

      {/* ===== MENU ITEMS ===== */}
      <ul className="mt-6 px-3 pb-10">

        {/* Dashboard */}
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black !items-center">
            <RxDashboard />
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                Dashboard
                <FaAngleDown onClick={() => handleDropdown(1)} />
              </span>
            )}
          </Button>

          {dropDownindex === 1 && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to={"/products"} className="flex gap-2 items-center">
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Product-list
                </Link>
              </li>
              <li>
                <Link to={"/productadd"} className="flex gap-2 items-center">
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Add-Products
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Home */}
        <li>
          <Link to={"/"}>
            <Button className="w-full !justify-start text-lg gap-2 !text-black">
              <RxDashboard />
              {isSidebaropen && <span>Home</span>}
            </Button>
          </Link>
        </li>

        {/* Users */}
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />
            {isSidebaropen && <span>Users</span>}
          </Button>
        </li>

        {/* Products */}
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                Products
                <FaAngleDown onClick={() => handleDropdown(2)} />
              </span>
            )}
          </Button>

          {dropDownindex === 2 && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to={"/products"} className="flex gap-2 items-center">
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Product-list
                </Link>
              </li>
              <li>
                <Link
                  to={"/product/upload"}
                  className="flex gap-2 items-center"
                >
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Add-Products
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Orders */}
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />
            {isSidebaropen && <span>Orders</span>}
          </Button>
        </li>

        {/* Category */}
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                Category
                <FaAngleDown onClick={() => handleDropdown(3)} />
              </span>
            )}
          </Button>

          {dropDownindex === 3 && (
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to={"/category/list"} className="flex gap-2 items-center">
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Category-list
                </Link>
              </li>

              <li
                onClick={() =>
                  SetisOpenFullScreenPanel({
                    open: true,
                    model: "Add Category",
                  })
                }
              >
                <Link className="flex gap-2 items-center">
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Add-Category
                </Link>
              </li>

              <li>
                <Link
                  to={"/subcategory/list"}
                  className="flex gap-2 items-center"
                >
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Sub-Category-list
                </Link>
              </li>

              <li>
                <Link
                  to={"/thirdlevelcat/list"}
                  className="flex gap-2 items-center"
                >
                  <p className="w-2 h-2 bg-slate-300 rounded-full"></p>
                  Third-level-Category-list
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Login / Logout */}
        {isLogin ? (
          <li>
            <Button className="w-full !justify-start text-lg gap-2 !text-black">
              <RxDashboard />
              {isSidebaropen && <span>Logout</span>}
            </Button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>
              <Button className="w-full !justify-start text-lg gap-2 !text-black">
                <RxDashboard />
                {isSidebaropen && <span>Login</span>}
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}

export default Sidebar;