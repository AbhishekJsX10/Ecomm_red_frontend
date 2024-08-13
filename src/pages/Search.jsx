

import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()
  return (
    <div className="container min-w-[100%] min-h-screen bg-zinc-900 p-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-100">Search Results</h1>
        <h6 className="text-zinc-300">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length}`}
        </h6>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {values?.results.map((p) => (
          <div key={p._id} className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://ecomm-red.onrender.com/api/v1/product/product-photo/${p._id}`}
              className="w-full h-48 object-cover"
              alt={p.name}
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold text-zinc-100">{p.name}</h5>
              <p className="text-zinc-400">
                {p.description.substring(0, 30)}...
              </p>
              <p className="text-zinc-200 font-bold"> $ {p.price}</p>
              <div className="mt-4 gap-2 flex justify-between">
                <button onClick={()=>navigate(`/product/${p.slug}`)} className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md">
                  More Details
                </button>
                <button className="btn btn-secondary bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
