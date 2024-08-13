import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="md:w-1/4 bg-zinc-800 p-4 space-y-4">
        <NavLink to="/dashboard/user">
        <h2 className="text-lg font-semibold text-zinc-100">Navigation</h2>
        </NavLink>
      <nav className="flex flex-col space-y-2">
        <NavLink 
          to="/dashboard/user/profile" 
          className="block px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Profile
        </NavLink>
        <NavLink 
          to="/dashboard/user/orders" 
          className="block px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600"
          activeClassName="bg-zinc-600"
        >
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default UserMenu;
