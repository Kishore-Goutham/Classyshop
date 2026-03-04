import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingBag, FiLogOut } from "react-icons/fi";
import { dataContext } from "../context/Context";
import {
  postData,
  updateData,
  deleteData,
} from "../utils/api";
import { toast } from "react-toastify";

export default function Address() {
  const { addresses,fetchAddress,handleDefault } = useContext(dataContext);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
    
  const emptyForm = useMemo(() => ({
  addressLine1: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  phone: "",
  isDefault: false,
}), []);


  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(emptyForm);
    }
  }, [editData,emptyForm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  const handleSave = async () => {
    
    if(!formData.addressLine1 || !formData.city || !formData.phone || !formData.pincode || !formData.state){
      toast.error("Fill all Details",{
        position:'top-center'
      })
      return
    }
    try {
      if (editData) {
        console.log(editData._id)
        const res = await updateData(
          `/api/address/update/${editData._id}`,
          formData
        );
        if (res.success) toast.success("Address updated");
      } else {
        const res = await postData("/api/address/add", formData);
        if (res.success) toast.success("Address added");
      }

      await fetchAddress();
      setOpen(false);
      setEditData(null);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await deleteData(`/api/address/delete/${_id}`);
      if (res.success) {
        toast.success("Address deleted");
        await fetchAddress()
      }
    } catch (err) {
      toast.error(err);
    }
  };


  return (
    <section className="py-6 md:py-8">
      <div className="w-[95%] md:w-[80%] mx-auto flex flex-col md:flex-row gap-6">

        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-[25%] bg-white rounded-md shadow-sm p-5">
          <div className="flex flex-col items-center border-b pb-4">
            <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center">
              <FaRegUser className="text-4xl text-gray-500" />
            </div>
            <h3 className="mt-3 font-semibold">My Profile</h3>
          </div>

          <div className="mt-4 flex flex-col">
            <Link to="/profile" className="px-4 py-3 hover:bg-gray-100">
              <FaRegUser className="inline mr-2" /> My Profile
            </Link>
            <Link to="/mylist" className="px-4 py-3 hover:bg-gray-100">
              <FaRegHeart className="inline mr-2" /> My List
            </Link>
            <Link
              to="/address"
              className="px-4 py-3 bg-gray-100 border-l-4 border-red-500 text-red-500"
            >
              <FaRegHeart className="inline mr-2" /> Address
            </Link>
            <Link to="/order" className="px-4 py-3 hover:bg-gray-100">
              <FiShoppingBag className="inline mr-2" /> My Orders
            </Link>
            <Link to="/logout" className="px-4 py-3 hover:bg-gray-100">
              <FiLogOut className="inline mr-2" /> Logout
            </Link>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-[75%] bg-white rounded-md shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-4">Address</h2>

          <button
            onClick={() => {
              setEditData(null);
              setOpen(true);
            }}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:bg-gray-100 transition"
          >
            Add Address
          </button>

          {addresses.map((item) => (
            <div
              key={item._id}
              className={`flex justify-between items-center border rounded-lg p-4 mt-4 ${
                item.isDefault ? "border-orange-400" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={item.isDefault}
                  onChange={() => handleDefault(item._id)}
                />
                <div>
                  <p className="font-medium">{item.addressLine1}</p>
                  <p className="text-sm text-gray-500">
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.country} | {item.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 text-lg">
                <button
                  onClick={() => {
                    setEditData(item);
                    setOpen(true);
                  }}
                  className="text-blue-500 hover:scale-110"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:scale-110"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] rounded-xl shadow-xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              {editData ? "Edit Address" : "Add Address"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border rounded-md p-3"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border rounded-md p-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border rounded-md p-3"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border rounded-md p-3"
                />
              </div>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md p-3"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                <label>Set as default address</label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md"
              >
                SAVE
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md"
              >
                CANCEL
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}