import React from "react";
import Imageupload from "../components/Imageupload/Imageupload";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { postData } from "../utilis/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { dataContext } from "../App";

function AddCategory() {
   let {fetchCat} =useContext(dataContext);
  let [isloading, Setisloading] = useState(false);
  let [formfields, Setformfields] = useState({
    name: "",
    // parentId:"",
    // parentCatName:"",
  });
  const [images, setImages] = useState([]);

  function handleImageChange(e) {
    setImages([...images, ...e.target.files]); //converting to array so we can use map and foreach
  }

  function handleImageRemove(index) {
    images.splice(index, 1);
    setImages([...images]);
  }

  function handleInput(e) {
    let key = e.target.id;
    let value = e.target.value;
    Setformfields({ ...formfields, [key]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", formfields.name);
    images.forEach((file) => {
      formData.append("images", file);
    });
    Setisloading(true);
    try {
      let data = await postData("/api/category/createCategory", formData);
      if (data.success) {
        toast.success("Category uploaded successfully", {
          position: "top-center",
        });
        fetchCat();
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
        <div>
          <h2 className="font-medium mb-2">Category Name</h2>
          <input
            type="text"
            id="name"
            className="border border-slate-300 outline-none p-2 md:w-[25%] w-[60%]"
            onChange={handleInput}
            required
          ></input>
        </div>

        <div className="py-7">
          <h1 className="text-lg font-semibold">Category Image</h1>
          <div className="grid md:grid-cols-7 grid-cols-2 gap-2">
            {images.map((file, index) => {
              return (
                <div
                  key={index}
                  className="imgbox w-full h-[170px] relative mt-3 rounded-md border border-dashed border-black bg-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <span className="absolute -top-1 -right-1">
                    <FaXmark
                      onClick={() => handleImageRemove(index)}
                      className="bg-red-500 text-xl text-white rounded-full p-1"
                    />
                  </span>
                </div>
              );
            })}

            <Imageupload
              multiple={true}
              handleImageChange={handleImageChange}
            />
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

export default AddCategory;
