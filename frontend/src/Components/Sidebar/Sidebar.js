import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./style.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
import { dataContext } from "../../context/Context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { postData } from "../../utils/api";

function Sidebar(props) {
  let location = useLocation();
  let { catData } = useContext(dataContext);
  const [price, Setprize] = useState([0, 60000]);

  let [filters, Setfilters] = useState({
    catId: [],
    subCatId: [],
    maxPrice: "",
    minPrice: "",
    page: 1,
    limit: 5,
  });

  function handleCheckBoxChange(field, value) {
    let currentValues = filters[field];
    let updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    Setfilters({ ...filters, [field]: updatedValues });
  }

  useEffect(() => {
    let queryParameters = new URLSearchParams(location.search);
    let categoryId = queryParameters.get("catId");
    let subcategoryId = queryParameters.get("subCatId");

    if (categoryId) {
      let catArr = [];
      catArr.push(categoryId);
      Setfilters((prev) => ({
        ...prev,
        catId: [categoryId],
        subCatId: [],
        page: 1,
      }));
    }

    if (subcategoryId) {
      Setfilters((prev) => ({
        ...prev,
        subCatId: [subcategoryId],
        catId: [],
        page: 1,
      }));
    }
  }, [location.search]);

  async function filterData() {
    let data = await postData("/api/product/filters", filters);
    props.SetproductsData(data.products);
    props.SettotalPages(data.totalPages);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    Setfilters((prev) => ({
      ...prev,
      page: props.page,
    }));
  }, [props.page]);

  useEffect(() => {
    Setfilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
      page: 1,
    }));
  }, [price]);

  useEffect(() => {
    if (filters.catId.length === 0 && filters.subCatId.length === 0) return
    filterData();
  }, [filters]);

  return (
    <aside className="w-full bg-white p-3 rounded-lg shadow-sm">
      <div className="box">
        <h1 className="text-lg md:text-xl font-semibold mb-3">
          Shop by category
        </h1>

        <div className="scroll">
          {catData?.length > 0 &&
            catData.map((item, index) => (
              <FormControlLabel
                key={index}
                className="sidebar-item"
                control={
                  <Checkbox
                    size="small"
                    value={item._id}
                    sx={{
                      marginRight: "6px",
                      padding: "4px",
                    }}
                    checked={filters.catId.includes(item._id)}
                    onChange={() => handleCheckBoxChange("catId", item._id)}
                  />
                }
                label={item.name}
                sx={{
                  margin: 0,
                  alignItems: "center",

                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",

                    "@media (max-width:600px)": {
                      fontSize: "13px",
                    },
                  },
                }}
              />
            ))}
        </div>
      </div>

      <div className="box mt-3 ">
        <h1 className="text-lg md:text-xl font-semibold mb-3">Availabity</h1>

        <div className="scroll">
          <FormControlLabel
            className="sidebar-item"
            control={
              <Checkbox
                size="small"
                sx={{
                  marginRight: "6px",
                  padding: "4px",
                }}
              />
            }
            label="Available (17)"
            sx={{
              margin: 0,
              alignItems: "center",

              "& .MuiFormControlLabel-label": {
                fontSize: "14px",

                "@media (max-width:600px)": {
                  fontSize: "13px",
                },
              },
            }}
          />

          <FormControlLabel
            className="sidebar-item"
            control={
              <Checkbox
                size="small"
                sx={{
                  marginRight: "6px",
                  padding: "4px",
                }}
              />
            }
            label="In Stock (17)"
            sx={{
              margin: 0,
              alignItems: "center",

              "& .MuiFormControlLabel-label": {
                fontSize: "14px",

                "@media (max-width:600px)": {
                  fontSize: "13px",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="box mt-3">
        <h1 className="text-lg md:text-xl font-semibold mb-2">
          Filter By Price
        </h1>

        <RangeSlider min={100} max={50000} onInput={Setprize} step={100} />

        <div className="flex justify-between text-sm mt-2 text-gray-600">
          <span>From: Rs: {price[0]}</span>
          <span>From: Rs: {price[1]}</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
