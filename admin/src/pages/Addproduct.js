import React from "react";
import { dataContext } from "../App";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Imageupload from "../components/Imageupload/Imageupload";
import { FaXmark } from "react-icons/fa6";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { postData } from "../utilis/api";
import { toast } from "react-toastify";

function Addproduct() {
  let { catData } = useContext(dataContext);
  let [isloading, Setisloading] = useState(false);
  let [productCat, SetproductCat] = useState("");
  let [productSubCat, SetproductSubCat] = useState("");
  let [productFeatured, SetproductFeatured] = useState("");
  let [productRam, SetproductRAM] = useState([]);
  let [productWeight, SetproductWeight] = useState([]);
  let [productSize, SetproductSize] = useState([]);

  let [formfields, Setformfields] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCat: "",
    subCatId: "",
    thirdsubCatId: "",
    thirdsubCat: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: "",
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });

  

  function handleProductCat(event) {
    SetproductCat(event.target.value);
  }
  function handleProductSubCat(event) {
    SetproductSubCat(event.target.value);
  }
  function handleProductFeatured(event) {
    SetproductFeatured(event.target.value);
  }
  function handleProductRAM(event) {
    let value = event.target.value;
    SetproductRAM(value);
    Setformfields({ ...formfields, productRam: value });
  }
  function handleProductWeight(event) {
    let value = event.target.value;
    SetproductWeight(value);
    Setformfields({ ...formfields, productWeight: value });
  }
  function handleProductSize(event) {
    let value = event.target.value;
    SetproductSize(value);
    Setformfields({ ...formfields, size: value });
  }

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

    if (!formfields.name) {
      toast.error("Add name", {
        position: "top-center",
      });
      return;
    }

    if (!formfields.description) {
      toast.error("Add details", {
        position: "top-center",
      });
      return;
    }
    if (!formfields.catId) {
      toast.error("Select category", {
        position: "top-center",
      });
      return;
    }

    Setisloading(true);
    const data = new FormData();

    Object.keys(formfields).forEach((key) => {
      if (Array.isArray(formfields[key])) {
        data.append(key, JSON.stringify(formfields[key]));
      } else {
        data.append(key, formfields[key]);
      }
    });

    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      let response = await postData("/api/product/createProduct", data);
      if (response.success) {
        toast.success("Product uploaded successfully", {
          position: "top-center",
        });
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
          <h2 className="font-medium mb-2">Product Name</h2>
          <input
            type="text"
            id="name"
            onChange={handleInput}
            className="border border-slate-300 outline-none p-2 w-full"
          ></input>
        </div>

        <div className="mt-5">
          <h2 className="font-medium mb-2">Product Description</h2>
          <textarea
            id="description"
            onChange={handleInput}
            className="border border-slate-300 outline-none h-36 p-2 w-full"
          ></textarea>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5 items-center">
          <div>
            <h2 className="mb-2">Product Category</h2>
            <Select
              className="w-full h-11 bg-white"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productCat"
              value={productCat}
              onChange={handleProductCat}
              label="Category"
            >
              {catData.map((data) => {
                return (
                  <MenuItem
                    onClick={() =>
                      Setformfields({
                        ...formfields,
                        catName: data.name,
                        catId: data._id,
                        category: data._id,
                      })
                    }
                    value={data._id}
                  >
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div>
            <h2 className="mb-2">Product Sub-Category</h2>
            <Select
              className="w-full bg-white h-11"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productSubCat"
              value={productSubCat}
              onChange={handleProductSubCat}
              label="Category"
            >
              {catData.map((data) => {
                return data.children.map((item, index) => {
                  return (
                    <MenuItem
                      onClick={() =>
                        Setformfields({
                          ...formfields,
                          subCat: item.name,
                          subCatId: item._id,
                        })
                      }
                      value={item._id}
                    >
                      {item.name}
                    </MenuItem>
                  );
                });
              })}
            </Select>
          </div>
          <div>
            <h2 className="font-medium mb-2">Product Prize</h2>
            <input
              type="Number"
              id="price"
              onChange={handleInput}
              className="border border-slate-300 rounded-md outline-none p-4 h-11 w-full"
            ></input>
          </div>

          <div>
            <h2 className="font-medium mb-2">Product Old Prize</h2>
            <input
              type="Number"
              id="oldPrice"
              onChange={handleInput}
              className="border border-slate-300 rounded-md outline-none p-4 h-[44px] w-full"
            ></input>
          </div>

          <div>
            <h2 className="mb-2">Product Featured</h2>
            <Select
              className="w-full bg-white h-11"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productSubCat"
              value={productFeatured}
              onChange={handleProductFeatured}
              label="Category"
            >
              <MenuItem
                onClick={() =>
                  Setformfields({ ...formfields, isFeatured: true })
                }
                value={true}
              >
                True
              </MenuItem>
              <MenuItem
                onClick={() =>
                  Setformfields({ ...formfields, isFeatured: false })
                }
                value={false}
              >
                False
              </MenuItem>
            </Select>
          </div>

          <div>
            <h2 className="font-medium mb-2">Product Stock</h2>
            <input
              type="Number"
              id="countInStock"
              onChange={handleInput}
              className="border border-slate-300 rounded-md outline-none p-4 h-11 w-full"
            ></input>
          </div>

          <div>
            <h2 className="font-medium mb-2">Product Brand</h2>
            <input
              type="text"
              id="brand"
              onChange={handleInput}
              className="border border-slate-300 rounded-md outline-none p-4 h-11 w-full"
            ></input>
          </div>

          <div>
            <h2 className="font-medium mb-2">Product Discount</h2>
            <input
              type="Number"
              id="discount"
              onChange={handleInput}
              className="border border-slate-300 rounded-md outline-none p-4 h-11 w-full"
            ></input>
          </div>

          <div>
            <h2 className="mb-2">Product RAM</h2>
            <Select
              multiple
              className="w-full bg-white h-11"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productSubCat"
              value={productRam}
              onChange={handleProductRAM}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"4GB"}>4GB</MenuItem>
              <MenuItem value={"8GB"}>8GB</MenuItem>
              <MenuItem value={"12GB"}>12GB</MenuItem>
              <MenuItem value={"16GB"}>16GB</MenuItem>
            </Select>
          </div>

          <div>
            <h2 className="mb-2">Product Weight</h2>
            <Select
              multiple
              className="w-full bg-white h-11"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productSubCat"
              value={productWeight}
              onChange={handleProductWeight}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"4kg"}>4kg</MenuItem>
              <MenuItem value={"6kg"}>6kg</MenuItem>
              <MenuItem value={"8kg"}>8kg</MenuItem>
            </Select>
          </div>

          <div>
            <h2 className="mb-2">Product Size</h2>
            <Select
              multiple
              className="w-full bg-white h-11"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="productSubCat"
              value={productSize}
              onChange={handleProductSize}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>L</MenuItem>
              <MenuItem value={"XXL"}>L</MenuItem>
            </Select>
          </div>

          <div>
            <h2 className="font-medium mb-2">Product Discount</h2>
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                onChange={(e) => {
                  Setformfields({ ...formfields, rating: e.target.value });
                }}
                defaultValue={2.5}
                precision={0.5}
              />
            </Stack>
          </div>
        </div>

        <div className="py-7">
          <h1 className="text-lg font-semibold">Media & Images</h1>
          <div className="grid grid-cols-7 gap-2">
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

export default Addproduct;
