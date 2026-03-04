import React from "react";
import { dataContext } from "../App";
import { useContext, useState, useEffect } from "react";
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
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { fetchDataFromApi, deleteData } from "../utilis/api";
import { toast } from "react-toastify";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const columns = [
  { id: "product", label: "Product", minWidth: 150 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "subcategory", label: "SubCategory", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 130 },
  { id: "sales", label: "Sales", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 170 },
];

function ProductList() {
  const [categoryFilterval, SetcategoryFilterval] = useState("");
  const [products, Setproducts] = useState([]);
  const { catData, SetisOpenFullScreenPanel } = useContext(dataContext);

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
      "Are you sure you want to delete this product?"
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
      toast.error(err, { position: "top-center" });
    }
  }

  async function handleCategoryFilter(event) {
    let value = event.target.value;
    SetcategoryFilterval(value);

    try {
      let data = await fetchDataFromApi(
        `/api/product/getProductsByCatId/${value}`
      );
      if (data.success) {
        Setproducts(data.Products);
      }
    } catch (err) {
      toast.error(err, { position: "top-center" });
    }
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <section className="py-6">
      <div className="w-[95%] md:w-full mx-auto bg-white p-4 md:p-5 rounded-md">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-lg font-semibold uppercase">Products</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button className="!bg-blue-500 !text-white w-full sm:w-auto">
              Export
            </Button>

            <Button
              className="!bg-green-500 !text-white w-full sm:w-auto"
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

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 md:justify-between md:items-end">
          <div className="w-full md:w-[20%]">
            <h1 className="mb-2 text-sm font-medium">Category</h1>
            <Select
              className="w-full h-11"
              size="small"
              value={categoryFilterval}
              onChange={handleCategoryFilter}
            >
              {catData.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="w-full md:w-[22%]">
            <Search />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md shadow-sm mt-6">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                      className="!text-sm md:!text-base !font-medium"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.reverse()
                  ?.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-4 min-w-[220px]">
                          
                          {/* 🔥 IMAGE FIXED HERE */}
                          <div className="w-[65px] h-[65px] md:w-[60px] md:h-[65px] rounded overflow-hidden shrink-0">
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
                              <h3 className="text-xs md:text-sm break-all font-medium">
                                {data.name}
                              </h3>
                            </Link>
                            <span className="text-xs text-gray-500">
                              {data.subCat}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{data.catName}</TableCell>
                      <TableCell>{data.subCat}</TableCell>

                      <TableCell>
                        <div className="flex gap-2 text-xs md:text-sm">
                          <h1 className="line-through">{data.oldPrice}</h1>
                          <h1 className="text-[#ff5252] font-semibold">
                            {data.price}
                          </h1>
                        </div>
                      </TableCell>

                      <TableCell>{data.sale}</TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button className="!min-w-[35px]">
                            <Link to={`/editproduct/${data._id}`}>
                              <CiEdit className="text-lg" />
                            </Link>
                          </Button>

                          <Button
                            onClick={() => handleDeleteProduct(data._id)}
                            className="!min-w-[35px]"
                          >
                            <FaRegTrashAlt className="text-lg" />
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
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductList;