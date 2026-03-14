import Button from "@mui/material/Button";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { dataContext } from "../context/Context";
import { useContext } from "react";

function Order() {

  let {order,userData}= useContext(dataContext)
  let [isOpenProduct, SetisOpenProduct]= useState(null)

  function showProduct(index){
    if(isOpenProduct===index){
      SetisOpenProduct(null)
    }else{
      SetisOpenProduct(index)
    }
  }

  return (
    <section className="py-6">
      <div className="w-[95%] md:w-[90%] mx-auto">

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 uppercase">
          Orders
        </h2>
       {
        order.length ===0? <p className="text-center text-xl  font-medium">No order history</p> :
      
       
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">

          <table className="min-w-[1200px] w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 border"></th>
                <th className="px-4 py-3 border">Order Id</th>
                <th className="px-4 py-3 border">Payment Id</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Phone Number</th>
                <th className="px-4 py-3 border">Address</th>

                <th className="px-4 py-3 border">Pincode</th>
                <th className="px-4 py-3 border">Total Amount</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">User Id</th>
                <th className="px-4 py-3 border">Order Status</th>
                <th className="px-4 py-3 border">Date</th>
              </tr>
            </thead>

         {order.map((item,index)=>{
             return <tbody>
              <tr className="hover:bg-gray-50 border-b">

                
                <td className="px-8 py-3  text-red-400 cursor-pointer">
                  <Button className="!min-w-3 !rounded-full hover:!bg-slate-300" onClick={()=>showProduct(index)}>{isOpenProduct===index?<FaAngleUp className="!text-black !text-lg"/>: <FaAngleDown className="!text-black !text-lg" />}</Button>
                </td>
                <td className="px-4 py-3 text-red-400 cursor-pointer">
                  {item._id}
                </td>

                <td className="px-4 py-3 text-red-400 cursor-pointer">
                   {item.paymentId}
                </td>

                <td className="px-4 py-3 font-medium">
                  {userData.name}
                </td>

                <td className="px-4 py-3">
                   {item.delivery_address.phone}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {`${item.delivery_address.addressLine1} ${item.delivery_address.city}
                  ${item.delivery_address.state}`}
                </td>

                <td className="px-4 py-3">
                  {item.delivery_address.pincode}
                </td>

                <td className="px-4 py-3 font-medium">
                  ${item.totalAmt}
                </td>

                <td className="px-4 py-3 ">
                   {userData.email}
                </td>

                <td className="px-4 py-3">
                  {item.userId}
                </td>

                <td className="px-4 py-3 ">
                   pending
                </td>

                <td className="px-4 py-3">
                  {item.date}
                </td>
              </tr>
          { isOpenProduct===index &&   <tr>
                <td colSpan={8}>
                <div className="overflow-x-auto bg-white rounded-md shadow-sm">

           <table className="min-w-[1200px] w-full text-sm text-left ">
             <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 border"></th>
                <th className="px-4 py-3 border">Product Id</th>
                <th className="px-4 py-3 border">Product Title</th>
                <th className="px-4 py-3 border">Quantity</th>
                <th className="px-4 py-3 border">Sub Total</th>
              </tr>
            </thead>

            <tbody>
             {item.products.map((product)=>{
             
              return  <tr className="hover:bg-gray-50">
                <th className="px-10 py-10 border"></th>
                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                  {product.productId._id}
                </td>
                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                  {product.productId.name}
                </td>

                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                   {product.quantity}
                </td>

                <td className="px-4 py-3 border">
                  {product.subTotal}
                </td>
              </tr> })}
            </tbody>
          </table>
        </div>
           </td>
              </tr>}
            </tbody>
         })}
           
            
            
          </table>

        </div>} 

      </div>
    </section>
  );
}

export default Order;

