import { Button } from "@mui/material";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa6";
import { dataContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  let { isLogin, isSidebaropen, SetisOpenFullScreenPanel } =
    useContext(dataContext);
  let [dropDownindex, SetdropDownindex] = useState(null);

  function handleDropdown(index) {
    if (dropDownindex === index) {
      SetdropDownindex(null);
    } else SetdropDownindex(index);
  }
  return (
    <section
      className={` ${isSidebaropen ? "w-[18%]" : "w-[8%]"} h-full  fixed top-0 left-0 z-30 bg-white`}
    >
      <div className="font-bold text-2xl w-full p-2 text-center">ECMA</div>

      <ul className="mt-10 px-2">
        <li>
          <Button className="w-full !justify-start  text-lg gap-2 !text-black !items-center">
            <RxDashboard />
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                {" "}
                Dashboard
                <span className="bg">
                  <FaAngleDown onClick={() => handleDropdown(1)} />
                </span>
              </span>
            )}
          </Button>
          {dropDownindex === 1 && (
            <ul className="w-max m-auto">
              <li>
                <Link to={"/products"} className="flex gap-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Product-list
                </Link>
              </li>
              <li className="mt-2">
                <Link to={"/productadd"} className="flex gap-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Add-Products
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
        <Link to={'/'}><Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />
            {isSidebaropen && <span> Home</span>}
          </Button> </Link>
        </li>
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard /> {isSidebaropen && <span>Users</span>}
          </Button>
        </li>

        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />{" "}
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                Products
                <span className="bg">
                  <FaAngleDown onClick={() => handleDropdown(2)} />
                </span>
              </span>
            )}
          </Button>
          {dropDownindex === 2 && (
            <ul className="w-max m-auto">
              <li>
                <Link to={"/products"} className="flex gap-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Product-list
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  to={"/product/upload"}
                  className="flex gap-2 items-center"
                >
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Add-Products
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard /> {isSidebaropen && <span> Orders</span>}
          </Button>
        </li>
        <li>
          <Button className="w-full !justify-start text-lg gap-2 !text-black">
            <RxDashboard />{" "}
            {isSidebaropen && (
              <span className="flex justify-between w-full items-center">
                Category
                <span className="bg">
                  <FaAngleDown onClick={() => handleDropdown(3)} />
                </span>
              </span>
            )}
          </Button>
          {dropDownindex === 3 && (
            <ul className="w-max m-auto">
              <li>
                <Link to={"/category/list"} className="flex gap-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Category-list
                </Link>
              </li>
              <li
                className="mt-2"
                onClick={() =>
                  SetisOpenFullScreenPanel({
                    open: true,
                    model: "Add Category",
                  })
                }
              >
                <Link className="flex gap-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                  Add-Category
                </Link>
              </li>
              <li>
                <Link to={"/subcategory/list"} className="flex gap-2 mt-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                 Sub-Category-list
                </Link>
              </li>
               <li>
                <Link to={"/thirdlevelcat/list"} className="flex gap-2 mt-2 items-center">
                  <p className="w-3 h-3 bg-slate-200 rounded-full"></p>
                 Third-level-Category-list
                </Link>
              </li>
            </ul>
          )}
        </li>

        {isLogin ? (
          <li>
            <Button className="w-full !justify-start text-lg gap-2 !text-black">
              <RxDashboard />
              {isSidebaropen && <span> Logout</span>}
            </Button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>
              <Button className="w-full !justify-start text-lg gap-2 !text-black">
                <RxDashboard />
                {isSidebaropen && <span> Login</span>}
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}

export default Sidebar;
