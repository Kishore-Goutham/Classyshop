import React, { useEffect } from "react";
import Productitem from "../Components/Productitem/Productitem";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import { toast } from "react-toastify";

function Searchproducts() {
  let [productsData, SetproductsData] = useState([]);
  let [totalPages, SettotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    async function searchProducts() {
      let data = await fetchDataFromApi(
        `/api/product/search/get?q=${query}&page=${page}&limit=${limit}`,
      );
      if (data.success) {
        if(data.products.length===0){
            toast.error("No products available")
        }else{
        SetproductsData(data.products);
        SettotalPages(data.totalPages);
        }
      }
    }
    searchProducts();
  }, [query, page,limit]);

  return (
    <section className="">
      <div className="flex gap-8 justify-center px-4 py-8 md:px-10">
        <div className="w-[100%]  md:w-[80%]">
          <div className="rightcontent grid grid-cols-2 h-500px md:grid-cols-4 gap-4 mt-0">
            {productsData.length !== 0 &&
              productsData.map((data) => {
                return <Productitem key={data._id} data={data} />;
              })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                count={totalPages}
                showFirstButton
                showLastButton
                page={page}
                onChange={(e, value) => {
                  setSearchParams({
                    q: query,
                    page: value,
                    limit: limit,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Searchproducts;
