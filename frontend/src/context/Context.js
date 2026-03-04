import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDataFromApi} from "../utils/api";
import { deleteData } from "../utils/api";
import { toast } from "react-toastify";
import { updateData } from "../utils/api";

let dataContext = createContext();

function Context({ children }) {
 
  let [isLogin, SetisLogin] = useState(false);
  let [userData, SetuserData] = useState({});
  let [catData, SetcatData] = useState([]);
  let [cartProducts,SetcartProducts] = useState([])
  let [myList,SetmyList]= useState([])
  const [addresses, setAddresses] = useState([]);
  let [selectedAddress,SetselectedAddress]= useState([]);
 

  useEffect(() => {
    checkUser();
    fetchCart();
    fetchMyList()
    fetchAddress();
  },[]); // empty dependency
 
  useEffect(()=>{
    if(addresses.length===0){
      return;
    }
    addresses.map((item)=>{
      if(item.isDefault){
      SetselectedAddress(item)
      }
      
    })
     console.log("k")
  },[addresses])


  const fetchAddress = async()=>{
            try{
      let data = await fetchDataFromApi('/api/address/');
      if(data.success){
        setAddresses(data.data)
      }
    }catch(err){
      console.log(err);
    }
  }

    const handleDefault = async (id) => {
      try {
        const res = await updateData(`/api/address/default/${id}`);
        if (res.success) {
          toast.success("Default address updated");
          await fetchAddress()
        }
      } catch (err) {
        toast.error(err);
      }
    };


    
  const fetchMyList = async()=>{
        try{
      let data = await fetchDataFromApi('/api/myList/getMyList');
      if(data.success){
        SetmyList(data.listItems)
      }
    }catch(err){
      console.log(err);
    }
  }
  
   const fetchCart = async()=>{
          try{
      let data = await fetchDataFromApi('/api/cart/get');
      if(data.success){
        SetcartProducts(data.cartItems)
      }
    }catch(err){
      console.log(err);
    }
   }



   async function deleteCart(id){
    console.log(id)
       try{
         let data = await deleteData(`/api/cart/delete-cart-item/${id}`);
         if(data.success){
          toast.success("Product removed from cart",{
            position:'top-center'
          })
          fetchCart()
         }
       }catch(err){
           toast.error(err,{
            position:'top-center'
           })
       }
   }


  const checkUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      SetisLogin(true);
      try {
        const data = await fetchDataFromApi("/api/user/user-details");
        SetuserData(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      SetisLogin(false);
    }
  };
   
  
  useEffect(()=>{
  async function fetchCatData(){
    try{
      let data = await fetchDataFromApi('/api/category');
      if(data.success){
        SetcatData(data.rootCategories)
      }
    }catch(err){
      console.log(err);
    }
  }
  fetchCatData();
},[])

  let value = {
    isLogin,
    SetisLogin,
    userData,
    checkUser,
    catData,
    cartProducts,
    SetcartProducts,
    deleteCart,
    fetchCart,
    myList,
    SetmyList,
    fetchMyList,
    addresses,
    setAddresses,
    fetchAddress,
    handleDefault,
    selectedAddress
  };
 
  return <dataContext.Provider value={value}>
    {children}
    </dataContext.Provider>;
}

export default Context;
export { dataContext };
