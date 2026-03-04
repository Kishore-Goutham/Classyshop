import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Productitem from "../Components/Productitem/Productitem";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

function Productlisting() {
  let [productsData, SetproductsData] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPages, SettotalPages] = useState(1);

  return (
    <section className="">
      <div className="flex gap-8 px-4 py-8 md:px-10">
        <div className=" hidden md:block w-[25%] bg-white">
          <Sidebar
            productsData={productsData}
            SetproductsData={SetproductsData}
            page={page}
            SettotalPages={SettotalPages}
          />
        </div>

        <div className="w-[100%] md:w-[80%]">
          <div className="rightcontent grid grid-cols-2 h-500px md:grid-cols-5 gap-4 mt-0">
            {productsData.length !== 0 &&
              productsData.map((data) => {
                return <Productitem key={data._id} data={data} />;
              })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination count={totalPages}
               showFirstButton
                showLastButton
                page={page}
                onChange={(e,value)=>setPage(value)}
            />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Productlisting;
