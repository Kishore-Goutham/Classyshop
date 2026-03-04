import React from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { dataContext } from "../context/Context";
import { Link } from "react-router-dom";
import { deleteData } from "../utils/api";
import { toast } from "react-toastify";

function Wishlist() {
    
    let {myList,fetchMyList} = useContext(dataContext)

   async function deleteList(id){
       try{
        let data = await deleteData(`/api/myList/deleteMyList/${id}`);
        if(data.success){
           toast.success("Item removed from list");
           fetchMyList()
        }
       }catch(err){
         toast.error(err)
       }

    }
  return (
    <div className="min-h-screen  py-10 px-4 md:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md">

       
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-semibold">
            My Wishlist ({myList.length} items)
          </h2>
        </div>

        
        {myList.map((item,index) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row gap-6 p-6 border-b last:border-none hover:bg-gray-50 transition"
          >
            
            <div className="w-full md:w-[180px] h-[220px] flex-shrink-0">
              <img
                src={item.productId?.images}
                alt={item.productId?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{item.productId?.brand}</p>
                    <h3 className="font-semibold text-lg mt-1">
                      {item.productId?.name}
                    </h3>
                  </div>

                  <button onClick={()=>deleteList(item._id)} className="text-gray-400 hover:text-red-500 text-2xl">
                    <IoClose />
                  </button>
                </div>

                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < item.productId?.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-lg font-semibold text-gray-800">
                    ${item.productId?.price}
                  </p>
                  <p className="line-through text-gray-400">
                    ${item.productId?.oldPrice}
                  </p>
                  <p className="text-red-500 font-medium">
                    {item.productId?.discount}% OFF
                  </p>
                </div>
              </div>

             
              <div className="mt-5">
               <Link to={`/productdetails/${item.productId?._id}`}><button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition">
                  View Product
                </button></Link> 
              </div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;