import React from "react";
import logo from "../../assests/logo.png";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navbar from "./Navbar";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { dataContext } from "../../context/Context";
import { FaRegUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { fetchDataFromApi } from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#ff5252",
  },
}));

function Header() {
  let navigate = useNavigate();
  let { isLogin, SetisLogin, userData, cartProducts, deleteCart, myList,SetcartProducts,SetmyList } =
    useContext(dataContext);
  let [cartoverlay, setCartoverlay] = useState(false);
  let [profileoverlay, setProfileoverlay] = useState(false);

  function showProfile() {
    setProfileoverlay(!profileoverlay);
  }

  async function handleLogout() {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      setProfileoverlay(false);
      try {
        const data = await fetchDataFromApi("/api/user/logout");
        if (data.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          SetisLogin(false);
          SetcartProducts([])
          SetmyList([]);
          navigate("/");
        }
      } catch (err) {
        toast.error(err, {
          position: "top-center",
        });
      }
    }
  }

  return (
    <header className="bg-white md:sticky -top-[90px] z-50">
      <div className="py-3 border-b border-gray-300">
        <div className="flex items-center justify-around">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-[40px] md:w-[64px]"></img>
            <h1 className=" text-xl md:text-3xl font-bold">CLASSYSHOP</h1>
          </div>

          <div className="w-[50%] md:w-[40%] hidden md:flex">
            <Search />
          </div>

          <div className="flex items-center w-[50%] md:w-[20%] justify-between">
            {isLogin ? (
              <div className="profile flex  items-center relative gap-2">
                <Button
                  className="!min-w-2 !h-7  !rounded-full !bg-[#f1f1f1] hover:!bg-gray-300 cursor-pointer"
                  onClick={showProfile}
                >
                  <FaRegUser className="md:text-lg !text-[#ff5252]" />
                </Button>
                <p className="font-medium text-sm md:text-base">
                  {userData.name}
                </p>
                <div
                  className={`${profileoverlay ? "accoverlay" : "hidden"} w-[150px] top-full bg-slate-100  absolute z-40  transition-all duration-300 rounded-md shadow-md`}
                >
                  <Link
                    to={"/my-account"}
                    className="flex items-center gap-1 link"
                    onClick={() => setProfileoverlay(false)}
                  >
                    <FaRegUser />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to={"/order"}
                    className="flex items-center gap-1 link"
                    onClick={() => setProfileoverlay(false)}
                  >
                    <FaBagShopping />
                    <span>Oders</span>
                  </Link>
                  <Link to={'/my-list'}
                    className="flex items-center gap-1 link"
                    onClick={() => setProfileoverlay(false)}
                  >
                    <FaRegHeart />
                    <span>My Lists</span>
                  </Link>
                  <p
                    className="flex hover:cursor-pointer items-center gap-1 link"
                    onClick={handleLogout}
                  >
                    <MdLogout />
                    <span>Log out</span>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <Link
                  to={"/login"}
                  className="hover:underline hover:text-orange-500 text-lg font-medium"
                >
                  Login
                </Link>
                /
                <Link
                  to={"/register"}
                  className="hover:underline hover:text-orange-500 text-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="flex items-center">
              <span onClick={() => setCartoverlay(true)}>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={cartProducts.length}
                      color="secondary"
                    >
                      <ShoppingCartIcon className="!text-xl md:!text-2xl" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </span>
              <Link to={"my-list"}>
                <span className="ml-3">
                  <Tooltip title="WishList">
                    <IconButton aria-label="cart">
                      <StyledBadge
                        badgeContent={myList.length}
                        color="secondary"
                      >
                        <FaRegHeart className="!text-lg md:!text-2xl" />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[80%] mx-auto  mt-3  md:hidden">
          <Search />
        </div>
      </div>
      <Navbar />
      <div
        className={`fixed top-0 ${cartoverlay ? "right-0" : "-right-full"} flex flex-col justify-between transition-all duration-500 ease-in-out w-[55%] md:w-[20%] min-h-screen  z-20 bg-white`}
      >
        <div>
          <div className="px-4 py-7 flex justify-between items-center border-b border-slate-300">
            <h1 className="font-medium text-lg">Shopping Cart</h1>
            <i
              className="fa-solid fa-x fa-lg cursor-pointer"
              onClick={() => setCartoverlay(false)}
            ></i>
          </div>
          {cartProducts.length > 0 ? (
            cartProducts.map((cart) => {
              return (
                <div
                  key={cart._id}
                  className="py-4 px-4 border-b border-slate-200 flex justify-between gap-4"
                >
                  <div className="w-[50%]">
                    <img
                      src={cart.productId.images}
                      alt=""
                      className="w-full h-[80px] rounded-md md:h-[100px]"
                    />
                  </div>
                  <div>
                    <Link to={`/productdetails/${cart._id}`} className="link text-sm">
                      <h4>{cart.productId.name}</h4>
                    </Link>
                    <p className="flex gap-3 mt-2">
                      <span className="text-sm">Qty:{cart.quantity}</span>
                      <span className="text-[#ff5252] text-sm font-medium">
                        Price :{cart.productId.price}
                      </span>
                    </p>
                    <MdDelete
                      onClick={() => deleteCart(cart._id)}
                      className="mt-2 text-red-400 md:text-xl cursor-pointer"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-2xl font-medium text-center text-red-400 mt-5">
              Cart is empty
            </p>
          )}
        </div>

        <div className="border-t border-slate-200">
          <div className="grid grid-cols-2 gap-y-3 px-6 py-6 ">
            <p className="text-left font-semibold text-lg">
              {cartProducts.length} item
            </p>
            <p className="text-right text-red-500 font-medium"></p>
            <p className="text-left font-semibold text-lg">Total</p>
            <p className="text-right  text-red-500 font-medium">
              ${" "}
              {cartProducts.reduce((acc, item) => {
                return acc + item.productId.price * item.quantity;
              }, 0)}
            </p>
          </div>
          <div className="flex px-4 py-4 bg-slate-100 justify-between">
            <Link to={"/cart"}>
              <Button
                className="!bg-[#ff5252] !text-white"
                onClick={() => setCartoverlay(false)}
              >
                View Cart
              </Button>
            </Link>
            <Link to={"/checkout"}>
              <Button
                className="!bg-[#ff5252] !text-white"
                onClick={() => setCartoverlay(false)}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
