import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Category = () => {
  const categories = useCategory();
  return (
      <div className="container min-h-screen">
        <div className="flex flex-col md:flex-row px-8 py-6">
          {categories.map((c) => (
            <div className="my-3 px-4 py-3 md:mx-4 rounded-lg bg-blue-500 w-fit " key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Category;