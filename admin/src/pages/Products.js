import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ProductList from "../components/ProductList";
import { dataContext } from "../App";
import { useContext } from "react";

 
function Products() {
   let {  isSidebaropen } = useContext(dataContext);

  return (
    <div>
      <Header />
      <Sidebar />
      <section className={`w-full ${isSidebaropen ? "pl-[20%]" : "pl-[10%]"} py-6 pr-8`}>
        <ProductList/>
      </section>
    </div>
  );
}

export default Products;
