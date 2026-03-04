import Button from "@mui/material/Button";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

function Order() {
  let arr =['order1','order2','order3'];
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

        {/* Responsive container */}
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">

          <table className="min-w-[1200px] w-full text-sm text-left">

            {/* Header */}
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

         {arr.map((product,index)=>{
             return <tbody>
              <tr className="hover:bg-gray-50 border-b">

                {/* First screenshot data */}
                <td className="px-8 py-3  text-red-400 cursor-pointer">
                  <Button className="!min-w-3 !rounded-full hover:!bg-slate-300" onClick={()=>showProduct(index)}>{isOpenProduct===index?<FaAngleUp className="!text-black !text-lg"/>: <FaAngleDown className="!text-black !text-lg" />}</Button>
                </td>
                <td className="px-4 py-3 text-red-400 cursor-pointer">
                  67514d9914da0b78a342b261
                </td>

                <td className="px-4 py-3 text-red-400 cursor-pointer">
                  pay_PTP0qEXFhrtpy8
                </td>

                <td className="px-4 py-3 font-medium">
                  Kishore Goutham
                </td>

                <td className="px-4 py-3">
                  09643990046
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  H No 222 Street No 6 Adarsh Mohalla Chennai 
                </td>

                {/* Second screenshot data */}
                <td className="px-4 py-3">
                  110053
                </td>

                <td className="px-4 py-3 font-medium">
                  ₹3800
                </td>

                <td className="px-4 py-3 ">
                  kishore@gmail.com
                </td>

                <td className="px-4 py-3">
                  66e120733d4b2dc4a19335ab
                </td>

                <td className="px-4 py-3 ">
                   Delivered
                </td>

                <td className="px-4 py-3">
                  2024-12-04
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
                <th className="px-4 py-3 border">Payment Id</th>
                <th className="px-4 py-3 border">Products</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Phone Number</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                <th className="px-10 py-10 border"></th>
                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                  67514d9914da0b78a342b261
                </td>
                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                  67514d9914da0b78a342b261
                </td>

                <td className="px-4 py-3 border text-green-400 font-semibold cursor-pointer">
                  pay_PTP0qEXFhrtpy8
                </td>

                <td className="px-4 py-3 border">
                  <button className="text-blue-600 hover:underline">
                    Click here to view
                  </button>
                </td>

                <td className="px-4 py-3 border font-medium">
                  Goutham
                </td>

                <td className="px-4 py-3 border">
                  09643990046
                </td>
              </tr> 
            </tbody>
          </table>
        </div>
           </td>
              </tr>}
            </tbody>
         })}
           
            
            
          </table>

        </div>

      </div>
    </section>
  );
}

export default Order;

