import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { dataContext } from "../../context/Context";

function Navbar() {
  const { catData } = useContext(dataContext);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <nav className="md:flex justify-around items-center py-3">
        
        {/* Drawer Button */}
        <div className="text-center">
          <Button
            className="!text-black !text-lg gap-2 !font-semibold"
            onClick={() => setOpen(true)}
          >
            <RiMenu2Fill /> Shop by categories
          </Button>
        </div>

        {/* Desktop Menu */}
        <div>
          <ul className="hidden md:flex gap-8 font-semibold">
            
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>

            {catData?.map((item, index) => (
              <li key={index} className="relative group z-50">
                
                <Link
                  to={`/productlisting/?catId=${item._id}`}
                  className="hover:text-orange-400"
                >
                  {item.name}
                </Link>

                {/* Desktop Hover Overlay */}
                {item.children?.length > 0 && (
                  <ul
                    className="absolute left-0 top-full mt-2 w-[170px] rounded-md bg-gray-50 shadow-lg p-4 flex flex-col gap-3 
                    opacity-0 translate-y-3 invisible
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible
                    transition-all duration-300 ease-in-out"
                  >
                    {item.children.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={`/productlisting/?subCatId=${sub._id}`}
                          className="hover:text-orange-400"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-lg hidden md:flex items-center">
            Free international delivery
          </p>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="w-[280px] p-5">
          <h2 className="text-lg font-semibold mb-4 text-red-400">Categories</h2>

          <ul className="flex flex-col gap-3">
            {catData?.map((item, index) => (
              <li key={index}>

                {/* Category Row */}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/productlisting/?catId=${item._id}`}
                    onClick={() => setOpen(false)}
                    className="font-semibold hover:text-orange-400"
                  >
                    {item.name}
                  </Link>

                  {item.children?.length > 0 && (
                    <IoIosArrowDown
                      className={`cursor-pointer transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                      onClick={() => handleToggle(index)}
                    />
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.children?.length > 0 && (
                  <Collapse in={activeIndex === index}>
                    <ul className="ml-4 mt-2 flex flex-col gap-2">
                      {item.children.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={`/productlisting/?subCatId=${sub._id}`}
                            onClick={() => setOpen(false)}
                            className="text-sm hover:text-orange-400"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}

              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;