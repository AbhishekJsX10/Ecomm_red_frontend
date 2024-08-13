
import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast, ToastContainer } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
import axios from "axios";

const UpdateProduct = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomm-red.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecomm-red.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
    console.log(category)
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `https://ecomm-red.onrender.com/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message)
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://ecomm-red.onrender.com/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // Remove selected image
  const handleRemoveImage = () => {
    setPhoto("");
  };
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminMenu />

      {/* Main Content */}
      <div className="md:w-3/4 bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold mb-8">Update Product</h2>
        <div className="space-y-4">
          <label className="text-lg mr-3">Category</label>
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="custom-select form-select mb-3 w-full md:w-2/4 focus:outline-none"
            onChange={(value) => {
              setCategory(value);
            }}
            style={{ color: 'white' }} // Text color for selected option
            dropdownStyle={{ backgroundColor: '#3f3f46', color: 'white' }} // Dropdown menu background and text color
            value={category}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id} style={{ color: 'black' }}>
                {c.name}
              </Option>
            ))}
          </Select>
        </div>
        
        {/* Image Upload Section */}
        <div>
          <h2 className="text-xl font-bold my-8">Upload Product Image</h2>
        </div>
        <div className="mb-3 bg-zinc-700 px-4 py-4 rounded-md flex flex-col items-center justify-center w-full md:w-fit">
          {photo ? (
            <div className="mb-3 text-center">
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"150px"}
                      width={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <button
                className="mt-3 px-4 py-3 text-md bg-red-600 text-white rounded-md"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          )
          :(
            <>
            <div className="mb-3 text-center">
              <div className="mb-3">
                  <div className="text-center">
                    <img
                      src={`https://ecomm-red.onrender.com/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"150px"}
                      width={"200px"}
                      className="img img-responsive"
                    />
                  </div>
              </div>
              <button
                className="mt-3 px-4 py-3 text-md bg-red-600 text-white rounded-md"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
            </>
          )
        }
          <label className="px-4 py-3 bg-blue-600 text-white rounded-md cursor-pointer">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        {/* Product Details Section */}
        <div className="bg-zinc-800 w-full md:w-1/2 px-5 py-4 mt-6 rounded-md">
          <div className="mb-3">
            <label className="text-lg">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Write a name"
              className="form-control py-3 flex items-center justify-center px-4 mb-2 rounded-md bg-zinc-700 text-white placeholder-zinc-400 border-none w-full focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="text-lg">Description</label>
            <textarea
              value={description}
              placeholder="Write a description"
              className="form-control py-3 flex items-center justify-center px-4 mb-2 rounded-md bg-zinc-700 text-white placeholder-zinc-400 border-none w-full focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="text-lg">Price</label>
            <input
              type="number"
              value={price}
              placeholder="Write a price"
              className="form-control py-3 flex items-center justify-center  px-4 mb-2 rounded-md bg-zinc-700 text-white placeholder-zinc-400 border-none w-full focus:outline-none"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="text-lg">Quantity</label>
            <input
              type="number"
              value={quantity}
              placeholder="Write a quantity"
              className="form-control py-3 flex items-center justify-center  px-4 mb-2 rounded-md bg-zinc-700 text-white placeholder-zinc-400 border-none w-full focus:outline-none"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="text-lg">Shipping</label>
            <Select
              bordered={false}
              placeholder={<span style={{ color: 'white' }}>Select Shipping</span>}
              size="large"
              showSearch
              className="form-select bg-zinc-700 text-white rounded-md placeholder-white border-none w-full focus:outline-none"
              onChange={(value) => setShipping(value)}
              style={{ color: 'white' }} // Text color for selected option
              dropdownStyle={{ backgroundColor: '#3f3f46', color: 'white' }} // Dropdown menu background and text color
              value={shipping ? "yes" : "no"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className=" flex gap-5">
            <button 
              className="bg-blue-600 text-lg text-white py-3 px-4 my-4 rounded-md"
              onClick={handleUpdate}
            >
              Update Product
            </button>
            <button 
              className="bg-red-600 text-lg text-white py-3 px-4 my-4 rounded-md"
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default UpdateProduct;
