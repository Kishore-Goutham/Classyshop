import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./pages/Home";
import Footer from "./Components/Footer/Footer";
import Productlisting from "./pages/Productlisting";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Myaccount from "./pages/Myaccount";
import Order from "./pages/Order";
import ForgetPassword from "./pages/ForgetPassword";
import Verify from "./pages/Verify";
import VerifypassOtp from "./pages/VerifypassOtp";
import Resetpassword from "./pages/Resetpassword";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Address";
import Searchproducts from "./pages/Searchproducts";
import ScrollToTop from "./Components/Scrolltotop/ScrollToTop";

function App() {
  return (
    <div className="App">

       <BrowserRouter>
       <Header/>
       <Routes>
        <Route path="/" element={<Home/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
       <Route path="/forget-password" element={<ForgetPassword/>}></Route>
       <Route path="/verify" element={<Verify/>}></Route>
       <Route path="/verifypassotp" element={<VerifypassOtp/>}></Route>
        <Route path="/reset-password" element={<Resetpassword/>}></Route>
       <Route path="/cart" element={<Cart/>}></Route>
       <Route path="/checkout" element={<Checkout/>}></Route>
       <Route path="/order" element={<Order/>}></Route>
       <Route path="/productlisting" element={<Productlisting/>}></Route>
       <Route path="/productdetails/:id" element={<ProductDetails/>}></Route>
       <Route path="/my-account" element={<Myaccount/>}></Route>
       <Route path="/my-list" element={<Wishlist/>}></Route>
       <Route path="/address" element={<Address/>}></Route>
       <Route path="/search" element={<Searchproducts/>}></Route>
       </Routes>
       <ScrollToTop/>
       <Footer/>
       </BrowserRouter>
       <ToastContainer />
    </div>
  );
}

export default App;
