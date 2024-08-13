
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://ecomm-red.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h4 className="text-center text-2xl font-semibold mb-2">
          Category - {category?.name}
        </h4>
        <h6 className="text-center text-lg mb-6">
          {products?.length} result(s) found
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <div
              className="bg-zinc-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              key={p._id}
            >
              <img
                src={`https://ecomm-red.onrender.com/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h5 className="text-xl font-medium">{p.name}</h5>
                <p className="text-gray-400 mt-2">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="text-lg font-semibold mt-2">$ {p.price}</p>
                <div className="flex justify-between gap-3 mt-4">
                  
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-2 rounded"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="bg-zinc-700 text-sm hover:bg-zinc-700 text-white font-semibold py-2 px-2 rounded">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
