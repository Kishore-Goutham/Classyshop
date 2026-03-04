import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { createContext } from "react";
import { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Addproduct from "./pages/Addproduct";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FaXmark } from "react-icons/fa6";
import Slide from '@mui/material/Slide';
import React from "react";
import CategoryList from "./pages/CategoryList";
import AddCategory from "./pages/AddCategory";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Profile from "./pages/Profile";
import EditCategory from "./pages/EditCategory";
import SubCategoryList from "./pages/SubCategoryList";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utilis/api";
import AddSubCategory from "./pages/AddSubCategory";
import Thirdlevelcat from "./pages/Thirdlevelcat";
import Addthirdlevelcat from "./pages/Addthirdlevelcat";
import ProductList from "./components/ProductList";
import EditProduct from "./pages/Editproduct";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const dataContext = createContext();
function App() {
   
  let[isSidebaropen,SetisSidebaropen]= useState(false)
  let[isLogin,SetisLogin]=useState(false)
  let[isOpenFullScreenPanel,SetisOpenFullScreenPanel] = useState({open:false,model:""})


   let[catData, SetcatData]= useState([])

    useEffect(()=>{
      fetchCat();
    },[])

       let fetchCat = async ()=>{
        try{
        let data = await fetchDataFromApi("/api/category/");
        if(data.success){
          SetcatData(data.rootCategories)
        }
      }catch(err){
         console.log(err)
      }
      }

  let route = createBrowserRouter([
    {
      path : "/",
      element:<Dashboard/>
    },
    {
      path : "/login",
      element:<Login/>
    },
     {
      path : "/register",
      element:<Register/>
    },
     {
      path : "/products",
      element:<Products/>
    },
    {
      path : "/productlist",
      element:<ProductList/>
    },
      {
      path : "/product/upload",
      element:<Addproduct/>
    },
     {
      path : "/category/list",
      element:<CategoryList/>
    },
     {
      path : "/subcategory/list",
      element:<SubCategoryList/>
    },
    {
      path : "/thirdlevelcat/list",
      element:<Thirdlevelcat/>
    },
    {
      path : "/thirdlevelcat/",
      element:<Addthirdlevelcat/>
    },
      {
      path : "/addcategory",
      element:<AddCategory/>
    },
     {
      path : "/editcategory/:id",
      element:<EditCategory/>
    },
     {
      path : "/editproduct/:id",
      element:<EditProduct/>
    },

  ])
  let value={
    isSidebaropen,
    SetisSidebaropen,
    isLogin,
    isOpenFullScreenPanel,
    SetisOpenFullScreenPanel,
    catData,
    SetcatData,
    fetchCat,
    SetisLogin
  }
  return (
    <div>
      <dataContext.Provider value={value}>
     <RouterProvider router={route}/>
      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={()=>SetisOpenFullScreenPanel({...isOpenFullScreenPanel,open:false})}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>SetisOpenFullScreenPanel({...isOpenFullScreenPanel,open:false})}
              aria-label="close"
            >
              <FaXmark/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isOpenFullScreenPanel.model}
            </Typography>
          </Toolbar>
        </AppBar>
          {isOpenFullScreenPanel.model==="Add Product" && <Addproduct/>}
          {isOpenFullScreenPanel.model==="Add Category" && <AddCategory/>}
          {isOpenFullScreenPanel.model==="Add Sub Category" && <AddSubCategory/>}
          {isOpenFullScreenPanel.model==="Add third category" && <Addthirdlevelcat/>}
      </Dialog>
      <ToastContainer/>
     </dataContext.Provider>
   
    </div>
  );
}

export default App;
