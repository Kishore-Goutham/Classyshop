import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    
   let navigate = useNavigate();

   let [search, Setsearch] = useState("");
   
  function handleSubmit(e){
    e.preventDefault();
    if(!search.trim()){
      return;
    }
    navigate(`/search/?q=${search}&page=1&limit=8`);
    Setsearch("")
  }
  
  function handleSearch(e) {
      Setsearch(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-[100%] h-[40px] bg-[#e5e5e5] p-5 flex items-center rounded-md">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search your products here"
        className="focus:outline-none bg-inherit w-full"
      ></input>
      <button>
        {" "}
        <i className="fa-solid fa-magnifying-glass"></i>{" "}
      </button>
    </form>
  );
}

export default Search;
