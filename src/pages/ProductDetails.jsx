
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container min-w-[100%] px-4 sm:px-10 bg-zinc-900 p-4">
      <div className="flex flex-col md:flex-row bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 p-4">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 p-4 text-zinc-300">
          <h1 className="text-2xl font-bold mb-4">Product Details</h1>
          <p className="mb-2">
            <span className="font-semibold">Name: </span>
            {product.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Description: </span>
            {product.description}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Price: </span>
            ${product.price}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Category: </span>
            {product?.category?.name}
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-zinc-300 mb-4">Similar Products</h2>
        {relatedProducts?.length < 1 && (
          <p className="text-center text-zinc-400">No Similar Products found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts?.map((p) => (
            <div
              key={p._id}
              className="bg-zinc-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p?._id}`}
                alt={p.name}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-4 text-zinc-200">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-zinc-400">
                  {p.description.substring(0, 50)}...
                </p>
                <p className="text-zinc-300 font-bold mt-2">$ {p.price}</p>
                <div className="flex justify-between items-center">
                <button
                  className="bg-blue-600 text-white py-2 px-2 rounded mt-2 hover:bg-blue-700"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="bg-green-600 text-white py-2 px-2 rounded mt-2 hover:bg-green-700 ml-2">
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

export default ProductDetails;
