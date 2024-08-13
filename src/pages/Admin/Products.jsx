import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import AdminMenu from "../../components/layout/AdminMenu";

const Products = () => {
  
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminMenu />

      {/* Main Content */}
      <div className="md:w-3/4 bg-zinc-900 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">All Products List</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="w-full sm:w-80 md:w-80 lg:w-80"
            >
              <div className="bg-zinc-700 text-zinc-100 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4 flex flex-1 flex-col">
                  <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                  <p className="text-zinc-300 flex-1">{p.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
