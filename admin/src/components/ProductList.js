import React from "react";
import { dataContext } from "../App";
import { useContext } from "react";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Search from "../components/Search/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import { fetchDataFromApi } from "../utilis/api";
import { deleteData } from "../utilis/api";
import { toast } from "react-toastify";


const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
const columns = [
  { id: "product", label: "Product", minWidth: 150 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "subcategory",
    label: "SubCategory",
    minWidth: 150,
  },
  {
    id: "price",
    label: "Prize",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "Sales",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

function ProductList() {
  const [categoryFilterval, SetcategoryFilterval] = useState("");
  let {catData,SetisOpenFullScreenPanel} = useContext(dataContext);
 
  let [products, Setproducts] = useState([]);

  useEffect(() => {
    fetchproducts();
  }, []);

  async function fetchproducts() {
    let data = await fetchDataFromApi("/api/product/getAllProducts");
    if (data.success) {
      Setproducts(data.Products);
    }
  }

  async function handleDeleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;
    try {
      let data = await deleteData(`/api/product/${id}`);
      if (data.success) {
        toast.success("Product deleted successfully", {
          position: "top-center",
        });
        fetchproducts();
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    }
  }

 async function handleCategoryFilter(event) {
    let value = event.target.value
    SetcategoryFilterval(value);
    try{
      let data = await fetchDataFromApi(`/api/product/getProductsByCatId/${value}`)
      if(data.success){
        Setproducts(data.Products);
      }
    }catch (err) {
      toast.error(err, {
        position: "top-center",
      });
    }
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

  return ( 
        <section className="py-6">
          <div className="w-[95%] md:w-[100%] mx-auto bg-white p-5 rounded-md">
            {/* Title */}
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2 uppercase">Products</h2>
              <div className="flex gap-3">
                <Button className="!bg-blue-500 !text-white">Export</Button>
                <Button
                  className="!bg-green-500 !text-white"
                  onClick={() =>
                    SetisOpenFullScreenPanel({
                      open: true,
                      model: "Add Product",
                    })
                  }
                >
                  Add Product
                </Button>
              </div>
            </div>

            <div className="flex mb-4 justify-between items-center">
              <div className=" w-[20%]">
                <h1 className="mb-3">Category</h1>
                <Select
                  className="w-full h-11"
                  size="small"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryFilterval}
                  onChange={handleCategoryFilter}
                  label="Category"
                >
                 {catData.map((cat)=>{
                  return  <MenuItem value={cat._id}>{cat.name}</MenuItem>
                 })} 
                  
                </Select>
              </div>

              <div className="searchbox w-[22%] mt-9">
                <Search />
              </div>
            </div>

            {/* Responsive container */}
            <div className="overflow-x-auto rounded-md shadow-sm">
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
                    {products
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      ?.reverse()
                      ?.map((data) => (
                        <TableRow key={data._id}>
                          <TableCell>
                            <Checkbox {...label} size="small" />
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-[55px] h-[60px] shrink-0 rounded overflow-hidden">
                                <Link to={`/product/${data._id}`}>
                                  <img
                                    src={data.images[0]}
                                    alt="product"
                                    className="w-full h-full object-cover"
                                  />
                                </Link>
                              </div>

                              <div className="flex-1 min-w-0">
                                <Link to={`/product/${data._id}`}>
                                  <h3 className="text-sm text-slate-700 font-light break-all">
                                    {data.name}
                                  </h3>
                                </Link>
                                <span className="text-sm">{data.subCat}</span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <p>{data.catName}</p>
                          </TableCell>

                          <TableCell>
                            <p>{data.subCat}</p>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <h1 className="line-through">{data.oldPrice}</h1>
                              <h1 className="text-[#ff5252]">{data.price}</h1>
                            </div>
                          </TableCell>

                          <TableCell>
                            <p>{data.sale}</p>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center">
                              <Button className="!min-w-[40px]">
                              <Link to={`/editproduct/${data._id}`}> <CiEdit className="text-xl text-black" /></Link> 
                              </Button>

                              <Button
                                onClick={() => handleDeleteProduct(data._id)}
                                className="!min-w-[40px]"
                              >
                                <FaRegTrashAlt className="text-lg text-black" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </section>
      
    
  );
}

export default ProductList;