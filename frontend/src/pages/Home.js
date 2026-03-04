import React, { useState } from "react";
import Homeslider from "../Components/homesilder/Homeslider";
import HomecatSlider from "../Components/homesilder/HomecatSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Productslider from "../Components/Productslider/Productslider";
import AdsbannerSlider from "../Components/AdsbannerSlider/AdsbannerSlider";
import { useContext } from "react";
import { dataContext } from "../context/Context";
import { useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";


function Home() {
  let { catData } = useContext(dataContext);
  let [popularProducts, SetpopularProducts] = useState([]);
  let [latestProducts, SetlatestProducts] = useState([]);
  let [featuredProducts, SetfeaturedProducts] = useState([]);

  useEffect(() => {
    if (!catData || catData.length === 0) return;
    async function fetchProduct() {
      try {
        let data = await fetchDataFromApi(`/api/product/getProductsByCatId/${catData[0]._id}`);
        SetpopularProducts(data.Products)
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, [catData]);

  useEffect(()=>{
    async function fetchDatas(){
      try{
        let latest = await fetchDataFromApi('/api/product/getAllProducts');
        SetlatestProducts(latest.Products)

        let featured = await fetchDataFromApi('/api/product/getAllFeaturedProducts')
        SetfeaturedProducts(featured.Featuredproducts)
      } catch (err) {
        console.log(err);
      }
    }
    fetchDatas();
  },[])

  async function filterByCatId(id) {
    try {
      let data = await fetchDataFromApi(
        `/api/product/getProductsByCatId/${id}`,
      );
      SetpopularProducts(data.Products)
    } catch (err) {
      console.log(err);
    }
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  
  return (
    <div>
      <Homeslider />
      <HomecatSlider />

      <section className="bg-white px-8 py-7 pb-12">
        <div className="mx-auto">
          <div className="md:flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Popular products</h3>
              <p className="text-lg font-light mb-5">
                Do not miss the current offers until the end of march
              </p>
            </div>

            <div className="mt-2 mb-4 md:mt-0">
              <Box sx={{ maxWidth: { sm: 480 }, bgcolor: "background.paper" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {catData.map((item, index) => {
                    return (
                      <Tab
                        key={index}
                        label={item.name}
                        onClick={() => filterByCatId(item._id)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
            </div>
          </div>
          {popularProducts.length !==0 && <Productslider item={6} data={popularProducts} />}
        </div>
      </section>

      <section className="w-[80%] m-auto p-5 bg-white hidden md:flex justify-between items-center  border-2 border-orange-400">
        <div className="flex items-center md:gap-4">
          <i className="fa-solid fa-truck-fast fa-2xl"></i>
          <h2 className="text-sm md:text-2xl font-semibold">FREE SHIPPING</h2>
        </div>
        <p className="text-xs md:text-lg font-medium">
          Free delivery on your first order and over $200
        </p>

        <h1 className="text-sm md:text-2xl font-semibold">-Only $200</h1>
      </section>

      <section className="bg-white px-8 py-7 pb-10">
        <div className="mx-auto">
          <h3 className="text-xl font-semibold mb-5">Latest products</h3>
           {latestProducts?.length !==0 && <Productslider item={6} data={latestProducts} />}
        </div>
        <div className="mt-10">
          <AdsbannerSlider item={4} />
        </div>
      </section>

      <section className="bg-white px-8 pb-12">
        <div className="mx-auto">
          <h3 className="text-xl font-semibold mb-5">Feautured products</h3>
           {featuredProducts?.length !==0 && <Productslider item={6} data={featuredProducts} />}
        </div>
      </section>
    </div>
  );
}




export default Home;
