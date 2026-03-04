import React from "react";
import { Link } from "react-router-dom";

import { dataContext } from "../../context/Context";
import { useContext } from "react";


function HomecatSlider() {
  let {catData}= useContext(dataContext)

  return (
    <div className="md:mx-20 px-6 py-8">

      <div className="
        flex gap-5 
        overflow-x-auto 
        scroll-smooth 
        snap-x snap-mandatory
        scrollbar-hide
      ">
        

        {catData.map((item,index) => (
          <Link 
            key={index}
             to={`/productlisting/?catId=${item._id}`}
            className="
              min-w-[100px] 
              h-max
              snap-start 
              bg-white 
              rounded-full 
              shadow 
              hover:shadow-lg 
              transition 
              p-3
              flex 
              flex-col 
              items-center
             
            "
          >
            <img
              src={item.images}
              alt={item.name}
              className="w-30 h-30 rounded-full object-contain mb-3  hover:scale-110 transition-transform duration-500"
            />

            <p className="text-sm font-medium text-center">
              {item.name}
            </p>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default HomecatSlider;
