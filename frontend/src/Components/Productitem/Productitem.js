import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaRegHeart } from "react-icons/fa";
import Button from "@mui/material/Button";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { dataContext } from "../../context/Context";

function Productitem({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  let { fetchMyList } = useContext(dataContext);

  async function addMylist(id) {
    console.log(id);
    try {
      let data = await postData(`/api/myList/addToMyList`, {
        productId: id,
      });
      if (data.success) {
        toast.success("Product added to list", {
          position: "top-center",
        });
        fetchMyList();
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    }
  }

  return (
    <>
      {/* CARD */}
      <div className="w-full h-full flex flex-col rounded-md overflow-hidden border-2 border-gray-200 bg-white">
        
        {/* IMAGE SECTION */}
        <div className="h-[180px] md:h-[250px] bg-white relative productitem overflow-hidden">
          <Link to={`/productdetails/${data?._id}`}>
            <img
              src={data?.images}
              alt=""
              className="w-full h-full object-cover hover:scale-110 duration-300"
            />
          </Link>

          <div className="absolute top-[-500px] right-2 hover:top-2 actions">
            <Button
              onClick={() => addMylist(data?._id)}
              className="!text-black !min-w-7 !rounded-full !bg-white hover:!bg-[#ff5252] hover:!text-white hover:cursor-pointer"
            >
              <FaRegHeart />
            </Button>
          </div>

          <div className="absolute top-2 left-3 w-max p-1 rounded-full bg-red-400 text-white text-xs">
            {data?.discount}%
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-2 bg-[#f1f1f1] flex flex-col flex-grow">
          
          <Link className="link">
            <p className="mt-2 text-sm min-h-[20px] truncate">
              {data?.brand}
            </p>
          </Link>

          <p className="mt-2 mb-1 min-h-[40px]">
            <Link
              to={`/productdetails/${data?._id}`}
              className="link font-medium text-sm line-clamp-2"
            >
              {data?.name}
            </Link>
          </p>

          <div className="min-h-[24px]">
            <Rating
              name="size-small"
              value={data?.rating || 0}
              size="small"
              readOnly
            />
          </div>

          <div className="flex items-center gap-2 mt-auto">
            <h1 className="line-through text-sm">${data?.oldPrice}</h1>
            <h1 className="text-[#ff5252] font-semibold">
              ${data?.price}
            </h1>
          </div>

          {/* 
          <div
            onClick={() => setOpenModal(true)}
            className="mt-3 flex border-2 text-red-400 border-red-400 items-center gap-2 justify-center rounded-md md:p-2 cursor-pointer active:bg-black hover:bg-red-400 hover:text-white"
          >
            <IoCartOutline className="text-lg" />
            <p>Add to cart</p>
          </div> 
          */}

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white w-[90%] md:w-[450px] rounded-lg shadow-lg p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <div className="flex gap-4">
              <img
                src={data?.images}
                alt=""
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-sm">{data?.name}</h3>
                <p className="text-gray-500 text-sm">
                  Brand: {data?.brand}
                </p>
                <Link
                  to={`/productdetails/${data?._id}`}
                  className="link"
                >
                  View Details
                </Link>
              </div>
            </div>

            {(data.catName === "Fashion" ||
              data.catName === "Footwear") && (
              <div className="mt-4">
                <label className="block mb-1 font-medium">
                  Size:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) =>
                    setSelectedSize(e.target.value)
                  }
                  className="border rounded-md p-2 w-full"
                >
                  <option value="">Select Size</option>
                  {data.size?.map((size, index) => {
                    return (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xl font-bold text-[#ff5252]">
                ₹{data?.price}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 border rounded-full"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-5 py-2 bg-yellow-400 rounded-full font-medium hover:bg-yellow-500"
                onClick={() => {
                  if (
                    data.catName === "Fashion" ||
                    data.catName === "Footwear"
                  ) {
                    if (!selectedSize) {
                      alert("Please select size");
                      return;
                    }
                  }

                  console.log("Add to cart:", {
                    id: data?._id,
                    size: selectedSize,
                  });

                  setOpenModal(false);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Productitem;
