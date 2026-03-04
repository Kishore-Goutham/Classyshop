import React from "react";
import Button from "@mui/material/Button";
import { FaBagShopping } from "react-icons/fa6";
import { useContext } from "react";
import { dataContext } from "../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const REACT_APP_RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;
// const REACT_APP_RAZORPAY_KEY_SECRET= REACT_APP_RAZORPAY_KEY_SECRET

function Checkout() {
  let { cartProducts, userData,selectedAddress, addresses,handleDefault } = useContext(dataContext);
  let [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    setTotalAmount(
      cartProducts?.length !== 0
        ? cartProducts
            ?.map((item) => parseInt(item.productId.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0,
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });

    localStorage
      .setItem(
        "totalAmount",
        cartProducts?.length !== 0
          ? cartProducts
              ?.map((item) => parseInt(item.price) * item.quantity)
              .reduce((total, value) => total + value, 0)
          : 0,
      )
      ?.toLocaleString("en-US", { style: "currency", currency: "INR" });
  }, [cartProducts]);

  function checkout(e) {
    e.preventDefault();

    if (selectedAddress.length === 0) {
      toast.error("Add address to place order", {
        position: "top-center",
      });
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Cart is empty add some products", {
        position: "top-center",
      });
      return;
    }
    const options = {
      key: REACT_APP_RAZORPAY_KEY_ID,
      amount: parseInt(totalAmount * 100),
      currency: "INR",
      order_receipt: "order_receipt_" + userData.name,
      name: "ClassyShop",
      description: "Test Transaction",

      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;

        const user = userData;

        const payLoad = {
          userId: user?._id,
          products: cartProducts,
          paymentId: paymentId,
          payment_status: "COMPLETED",
          delivery_address: addresses[0],
          totalAmt: totalAmount,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year:'numeric'
          }),
        };
      },
      theme: {
        color: "#ff5252",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  }

  return (
    <section className="px-8 py-10">
      <div className="md:flex container mx-auto gap-5">
        <div className="left bg-white p-5 w-[100%] rounded-md md:w-[70%]">
          <div className="flex justify-between items center">
            <h1 className="text-xl font-semibold">Delivery Details*</h1>
            <Link to="/address">
              <Button className="!text-white !bg-[#ff5252]">
                Change Address
              </Button>
            </Link>
          </div>

          {addresses.length > 0 &&
            addresses.map((item) => (
              <div
                key={item._id}
                className={`flex justify-between items-center border rounded-lg p-4 mt-4 ${
                  item.isDefault ? "border-orange-400 bg-red-50" : ""
                }`}
                  onChange={() => handleDefault(item._id)}
              >
                <div className="flex items-center gap-5">
                  <input type="radio" checked={item.isDefault} />
                  <div>
                    <h1 className="font-medium text-lg">{userData.name}</h1>
                    <p className="">{item.addressLine1}</p>
                    <p className="text-sm text-gray-500">
                      {item.city}, {item.state} - {item.pincode}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.country} | {item.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="right w-[100%] md:w-[34%] px-5 h-fit mt-6 md:mt-0 rounded-md bg-white p-3">
          <form onSubmit={checkout}>
            <h2 className="text-lg font-semibold">Your Order</h2>
            <div className="flex justify-between mt-6 border-y border-slate-200 py-3">
              <p>Product</p>
              <p>Subtotal</p>
            </div>

            {cartProducts.map((cart) => {
              return (
                <div className="flex justify-between mt-4 mb-5">
                  <div className="w-[50%] flex gap-3">
                    <img
                      src={cart.productId.images} alt='products'
                      className="w-[30%] rounded-md h-20"
                    />
                    <p>
                      {cart.productId?.name}
                      <span className="font-medium"> x{cart.quantity}</span>
                    </p>
                  </div>
                  <p className="text-red-500 font-medium ">
                    $ {cart.productId.price * cart.quantity}
                  </p>
                </div>
              );
            })}

            <Button
              type="submit"
              className="!text-white !w-full !bg-[#ff5252] gap-2"
            >
              <FaBagShopping className="text-lg mb-1" />
              Place order
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
