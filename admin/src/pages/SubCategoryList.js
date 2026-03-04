import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { dataContext } from "../App";
import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import { fetchDataFromApi } from "../utilis/api";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
const columns = [
  { id: "image", label: "Image", minWidth: 150 },
  { id: "categoryname", label: "Category Name", minWidth: 100 },
  { id: "subcategoryname", label:"Sub Category Name", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

function SubCategoryList() {
  let { SetisOpenFullScreenPanel, isSidebaropen } =useContext(dataContext);
   let[catData, SetcatData]= useState([])

  useEffect(()=>{
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
    fetchCat();
  },[])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div
        className={`w-full ${isSidebaropen ? "pl-[20%]" : "pl-[10%]"} py-6 pr-8`}
      >
        <section className="py-6">
          <div className="w-[95%] md:w-[100%] mx-auto bg-white p-5 rounded-md">
            {/* Title */}
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2 uppercase">
               Sub Category List
              </h2>
              <div className="flex gap-3">
                <Button className="!bg-blue-500 !text-white">Export</Button>
                <Button
                  className="!bg-green-500 !text-white"
                  onClick={() =>
                    SetisOpenFullScreenPanel({
                      open: true,
                      model: "Add Sub Category",
                    })
                  }
                >
                  Add Sub-Category
                </Button>
              </div>
            </div>

            {/* Responsive container */}
            <div className="overflow-x-auto mt-5 rounded-md shadow-sm">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className="!text-lg !font-medium"
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                 {catData.map((data,index)=>{
                  return  <TableRow key={index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell>
                        {/* Image */}
                        <div className="w-[80px] h-[75px] shrink-0 rounded overflow-hidden">
                          <Link to={"/product/6"}>
                            {" "}
                            <img
                              src={data.images}
                              alt="product"
                              className="w-full h-full object-cover"
                            />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="bg-gray-200 p-2 rounded-full">{data.name}</span>
                      </TableCell>
                      <TableCell>
                         <div className="flex gap-3">
                            {data.children.map((data,index)=>{
                                return <span className="bg-blue-500 p-2 rounded-full text-white">{data.name}</span>
                            })}
                         </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Button className="!min-w-[40px]">
                            {" "}
                           <Link to={`/editcategory/${data._id}`}> <CiEdit className="text-xl text-black" /></Link>
                          </Button>
                          <Button className="!min-w-[40px]">
                            <FaRegTrashAlt className="text-lg text-black" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                 })}  
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={20}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SubCategoryList;