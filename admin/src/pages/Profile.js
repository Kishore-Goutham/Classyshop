import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import { dataContext } from "../App";
import { useContext } from "react";


function Profile() {
  let { isSidebaropen } = useContext(dataContext);
  // let [isOpenProduct, SetisOpenProduct] = useState(null);
  // const [categoryFilterval, SetcategoryFilterval] = useState("");
    
  let[val,setVal]= useState("welcome")
  function handleInput(e){
    setVal(e.target.val)
  }
  let[edit,Setedit]= useState(false)
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`w-full ${isSidebaropen ? "pl-[20%]" : "pl-[10%]"} py-6 pr-8`} >
           
        <input value={val} disabled={edit}  onChange={handleInput}></input>
        <button onClick={()=>Setedit(!edit)}>Edit</button>
       

        
      </div>
    </div>
  );
}

export default Profile;