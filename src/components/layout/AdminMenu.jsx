import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="w-[100%] md:w-1/4 bg-zinc-800 p-4 space-y-4">
        <NavLink to="/dashboard/admin">
        <h2 className="text-lg font-semibold text-zinc-100">Admin Panel</h2>
        </NavLink>
      <nav className="flex flex-col space-y-2">
        <NavLink 
          to="/dashboard/admin/create-category" 
          className="block px-4 py-4 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Create Category
        </NavLink>
        <NavLink 
          to="/dashboard/admin/create-product" 
          className="block px-4 py-4 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Create Product
        </NavLink>
        <NavLink 
          to="/dashboard/admin/products" 
          className="block px-4 py-4 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Products
        </NavLink>
        <NavLink 
          to="/dashboard/admin/users" 
          className="block px-4 py-4 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;
