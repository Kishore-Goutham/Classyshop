import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboardboxes from "../components/Dashboardboxes/Dashboardboxes";
import { Button } from "@mui/material";
import undraw from "../assests/undraw.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState, useContext } from "react";
import { dataContext } from "../App";
import ProductList from "../components/ProductList";

function Dashboard() {
  let { isSidebaropen,isLogin,userData} = useContext(dataContext);
  let arr = ["order1", "order2", "order3"];
  let [isOpenProduct, SetisOpenProduct] = useState(null);

  function showProduct(index) {
    if (isOpenProduct === index) {
      SetisOpenProduct(null);
    } else {
      SetisOpenProduct(index);
    }
  }

  return (
    <div>
      <Header />
      <Sidebar />

      {/* ✅ Responsive Content Wrapper */}
      <div
        className={`w-full transition-all duration-300 
        ${isSidebaropen ? "md:pl-[20%]" : "md:pl-[10%]"} 
        pl-0 py-6 pr-4 md:pr-6`}
      >
        {/* ✅ Welcome Section */}
        <section className="border border-slate-200 bg-white p-4 md:p-6 rounded-md flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">
              Good Morning <br />
              {isLogin &&  userData.name}
            </h1>

            <p className="mt-2 mb-5 text-slate-500 text-sm md:text-base">
              Here's what happening in the store, see the statistics all at once
            </p>

            <Button className="!bg-blue-500 !p-2 !text-white w-full md:w-auto">
              + Add product
            </Button>
          </div>

          <div className="w-[60%] md:w-[25%]">
            <img src={undraw} alt="" className="w-full object-contain" />
          </div>
        </section>

        {/* Dashboard Boxes */}
        <div className="mt-6">
          <Dashboardboxes />
        </div>

        {/* Product List */}
        <div className="mt-6">
          <ProductList />
        </div>

        {/* ✅ Recent Orders */}
        <section className="py-6">
          <div className="w-full bg-white p-3 md:p-5 rounded-md">
            <h2 className="text-lg font-semibold mb-4 uppercase">
              Recent Orders
            </h2>

            <div className="overflow-x-auto rounded-md shadow-sm">
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

                {arr.map((product, index) => (
                  <tbody key={index}>
                    <tr className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-3">
                        <Button
                          className="!min-w-3 !rounded-full hover:!bg-slate-300"
                          onClick={() => showProduct(index)}
                        >
                          {isOpenProduct === index ? (
                            <FaAngleUp className="text-black text-lg" />
                          ) : (
                            <FaAngleDown className="text-black text-lg" />
                          )}
                        </Button>
                      </td>

                      <td className="px-4 py-3 text-red-400">
                        67514d9914da0b78a342b261
                      </td>
                      <td className="px-4 py-3 text-red-400">
                        pay_PTP0qEXFhrtpy8
                      </td>
                      <td className="px-4 py-3 font-medium">
                        Kishore Goutham
                      </td>
                      <td className="px-4 py-3">09643990046</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        H No 222 Street No 6 Adarsh Mohalla Chennai
                      </td>
                      <td className="px-4 py-3">110053</td>
                      <td className="px-4 py-3 font-medium">₹3800</td>
                      <td className="px-4 py-3">
                        kishoregoutham@gmail.com
                      </td>
                      <td className="px-4 py-3">
                        66e120733d4b2dc4a19335ab
                      </td>
                      <td className="px-4 py-3">Delivered</td>
                      <td className="px-4 py-3">2024-12-04</td>
                    </tr>

                    {isOpenProduct === index && (
                      <tr>
                        <td colSpan={12}>
                          <div className="overflow-x-auto bg-white rounded-md shadow-sm">
                            <table className="min-w-[1000px] w-full text-sm text-left">
                              <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                  <th className="px-4 py-3 border"></th>
                                  <th className="px-4 py-3 border">
                                    Product Id
                                  </th>
                                  <th className="px-4 py-3 border">
                                    Product Title
                                  </th>
                                  <th className="px-4 py-3 border">
                                    Payment Id
                                  </th>
                                  <th className="px-4 py-3 border">
                                    Products
                                  </th>
                                  <th className="px-4 py-3 border">
                                    Name
                                  </th>
                                  <th className="px-4 py-3 border">
                                    Phone Number
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td className="px-6 py-6 border"></td>
                                  <td className="px-4 py-3 border text-green-400 font-semibold">
                                    67514d9914da0b78a342b261
                                  </td>
                                  <td className="px-4 py-3 border text-green-400 font-semibold">
                                    Product Name Here
                                  </td>
                                  <td className="px-4 py-3 border text-green-400 font-semibold">
                                    pay_PTP0qEXFhrtpy8
                                  </td>
                                  <td className="px-4 py-3 border">
                                    <button className="text-blue-600 hover:underline">
                                      Click here to view
                                    </button>
                                  </td>
                                  <td className="px-4 py-3 border font-medium">
                                    Kishore
                                  </td>
                                  <td className="px-4 py-3 border">
                                    09643990046
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;