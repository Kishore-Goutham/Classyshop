import React from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { postData } from "../utilis/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { dataContext } from "../App";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function AddSubCategory() {
   let {catData} =useContext(dataContext);
  let [isloading, Setisloading] = useState(false);
  let [formfields, Setformfields] = useState({
    name: "",parentId:"",parentCatName:"",
  });
const [productCat, SetproductCat] = useState("");

 function handleChangeProductCat(event) {
    SetproductCat(event.target.value);
  }

  function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }

  function selectCatName(name){
    Setformfields({...formfields,parentCatName:name})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    Setisloading(true);
    try {
      let data = await postData("/api/category/createCategory",{...formfields,parentId:productCat});
      if (data.success) {
        toast.success("Category created successfully", {
          position: "top-center",
        })
        // fetchCat();
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    } finally {
      Setisloading(false);
    }
  }
  return (
    <section className="bg-gray-100 py-8 px-14">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-5">
            <div>
          <h2 className="font-medium mb-2">Product Category Name</h2>
          <Select
                  className="w-[25%] h-11"
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={productCat}
                  onChange={handleChangeProductCat}
                  label="Category"
                >
                   {catData.map((item)=>{
                    return   <MenuItem value={item._id} onClick={()=>selectCatName(item.name)}>{item.name}</MenuItem>
                   })}           
                </Select>
                </div>
           <div> 
            <h1 className="text-lg mb-1">Sub-Category Name</h1>
          <input
            type="text"
            id="name"
            label="Sub-Category Name"
            className="border border-slate-300 outline-none p-2 w-[25%]"
            onChange={handleInput}
          ></input>
          </div>    
        </div>

        
        <Button
          type="submit"
          className="!bg-blue-500 !w-44 !text-white p-2 rounded-md"
        >
          {isloading ? (
            <CircularProgress className="!w-5 !h-5" color="inherit" />
          ) : (
            <span>Publish and View</span>
          )}
        </Button>
      </form>
    </section>
  );
}

export default AddSubCategory;