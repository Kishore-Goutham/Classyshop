import React from "react";
import kurti from "../assests/kurti.png";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaBagShopping } from "react-icons/fa6";
import { dataContext } from "../context/Context";
import { useContext } from "react";

function Cart() {
  let { cartProducts, SetcartProducts, deleteCart } = useContext(dataContext);
  return (
    <section className="px-10 py-7">
      <div className="container  mx-auto">
        <h1 className="text-lg font-semibold">Your Cart</h1>
        <p>
          There are <span className="font-medium">{cartProducts.length}</span>{" "}
          products in your cart
        </p>
      </div>
      <div className="md:flex gap-10 mx-auto container">
        <div className="left md:w-[60%]">
          <div className="cartbox mt-4">
            {cartProducts.map((cart) => {
              return (
                <div className="bg-white p-3 w-full mb-4 rounded-md shadow-md flex gap-5  relative">
                  <IoMdClose className="absolute top-2 right-1 cursor-pointer text-lg" onClick={()=>deleteCart(cart._id)} />
                  <div className="w-[25%] h-28 md:w-[15%]">
                    <Link to={`/productdetails/${cart.productId._id}`}>
                      <img
                        src={cart.productId.images}
                        className="w-full h-full  rounded-md"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/productdetails/${cart.productId._id}`}
                      className="link"
                    >
                      <p className="font-medium text-lg">
                        {cart.productId.brand}
                      </p>
                    </Link>
                    <Link
                      to={`/productdetails/${cart.productId._id}`}
                      className="link"
                    >
                      <p>{cart.productId.name}</p>
                    </Link>
                    <div className="flex items-center mt-2 gap-2">
                      <h1 className="line-through">
                        ${cart.productId.oldPrice}
                      </h1>
                      <h1 className="text-[#ff5252]">
                        ${cart.productId.price}
                      </h1>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <p className="font-medium">Quantity: {cart.quantity}</p>
                      {cart.size ?<span className="font-medium"> Size: {cart.size}</span>: null}
                      {cart.ram ?<span className="font-medium"> Ram: {cart.ram}</span>: null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="right mt-4 w-[60%] md:w-[30%]">
          <div className="bg-white rounded-md shadow-md p-4">
            <h1 className="text-lg font-semibold pb-2 border-b border-slate-200">
              CART TOTALS
            </h1>
            <div className="grid grid-cols-2 gap-y-2 mt-2">
              <p>Subtotal</p>
              <p className="text-right text-red-400 font-medium">$
                 { cartProducts.reduce((acc,item)=>{
               return acc +(item.productId.price * item.quantity)
               },0)}</p>
              <p>Shipping</p>
              <p className="text-right text-red-400 font-medium">Free</p>
              <p>Total</p>
              <p className="text-right text-red-400 font-medium">$
                 { cartProducts.reduce((acc,item)=>{
               return acc +(item.productId.price * item.quantity)
               },0)}
              </p>
            </div>
            <br />
            <Button className="!text-white !bg-[#ff5252] p-2 rounded-md">
              {" "}
              <Link to={"/checkout"} className="flex gap-2">
                <FaBagShopping className="text-lg mb-1" />
                Checkout{" "}
              </Link>{" "}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
