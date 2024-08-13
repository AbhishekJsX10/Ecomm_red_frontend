

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import {toast, ToastContainer} from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecomm-red.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecomm-red.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://ecomm-red.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecomm-red.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://ecomm-red.onrender.com/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screens min-h-screen">
      <div className="flex flex-col md:flex-row bg-zinc-900">
        {/* Left Section - Filters */}
        <div className="md:w-1/4 px-4 md:min-h-screen w-full bg-zinc-800  mr-2 text-white">
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-4">Filter By Category</h4>
            <div className="flex flex-col">
              {categories?.map((c, i) => (
                <Checkbox
                  key={i}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="mb-2 text-white"

                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-lg font-semibold my-4 border-t-2 border-zinc-900 pt-4">Filter By Price</h4>
            <div className="flex flex-col">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p, i) => (
                  <div key={i} className="mb-2">
                    <Radio className="text-white" value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <button
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Right Section - Products */}
        <div className=" md:w-3/4 w-full px-2 bg-zinc-900 text-white">
          <h1 className="text-2xl font-bold mb-6 text-center pt-4">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((p) => (
              <div
                key={p._id}
                className="bg-zinc-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`https://ecomm-red.onrender.com/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                  <p className="text-gray-400 mb-2">
                    {p.description.substring(0, 60)}...
                  </p>
                  <p className="text-white font-bold mb-4">$ {p.price}</p>
                  <div className="flex justify-between gap-2">

                    <button onClick={()=>navigate(`/product/${p.slug}`)} className="bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                      More Details
                    </button>
                    <button  onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart")
                    }}
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products && products.length < total && (
            <div className="flex justify-center items-center min-h-[50vh] bg-zinc-900 mt-6">
              <button
                className="bg-yellow-600 h-10 w-[10rem] text-white py-2 px-6 rounded hover:bg-yellow-700 transition duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default HomePage;
