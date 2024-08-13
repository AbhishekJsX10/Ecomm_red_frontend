import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import { useAuth } from "../../context/auth";
import { LuLogOut } from "react-icons/lu";

import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";

import { useCart } from "../../context/cart";

const Header = () => {
  const [cart] = useCart();

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  let cartItemCount = 2;
  const [isOpen, setIsOpen] = useState(false);

  const handelNavColor = (e) => {
    return {
      color: e.isActive ? "#f1e0c5" : "#fff",
      fontWeight: e.isActive ? "600" : "",
    };
  };

  // Automatically close the menu when the screen size changes and the hamburger icon is hidden
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Initial check to close the menu if the screen is already large
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // logout functionality
  const handelLogOut = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    await localStorage.removeItem("auth");
    toast.success("logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <nav className="bg-zinc-900 px-4 py-3 border-b-2 border-zinc-800">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-lg font-bold">
            <Link to="/">Logo</Link>
          </div>

          {/* Hamburger Icon (For Mobile) */}
          <div className="lg:hidden ml-auto ">
            <button onClick={() => setIsOpen(true)} className="text-white">
              <FaBars />
            </button>
          </div>

          {/* Desktop Nav Menu */}
          <ul className="hidden  lg:flex mt-5 space-x-6 ml-10">
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/"
                className="text-white hover:text-gray-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/shop"
                className="text-white hover:text-gray-300"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/category"
                className="text-white hover:text-gray-300"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/recommended"
                className="text-white hover:text-gray-300"
              >
                Recommended
              </NavLink>
            </li>
            {auth.user && (
              <>
                <li>
                  <NavLink
                    style={(e) => handelNavColor(e)}
                    to={`/dashboard/${
                      auth.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="text-white hover:text-gray-300"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Desktop Search Bar */}
          {/* <div className="hidden lg:flex items-center ml-10">
            <button className="p-2 rounded-l bg-blue-500 text-white hover:bg-blue-600 flex items-center">
              Filter <CiFilter />
            </button>
            <input
              type="text"
              placeholder="🔎  Search Products..."
              className="p-2 md:w-[15rem] lg:w-[12rem] xl:w-[28rem] rounded-r bg-zinc-700 text-white border-none"
            />
          </div> */}
          <div className="hidden lg:flex items-center ml-10">
            <SearchInput />
          </div>
          <div className="flex items-center">
            {/* Desktop Cart Icon */}
            <NavLink to="/cart">
              <div className="hidden lg:flex mt-4 gap-2 ml-6 relative">
                <FaShoppingCart className="text-white text-xl" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -left-3 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cart?.length}
                  </span>
                )}
                <p className="text-lg">Cart</p>
              </div>
            </NavLink>
            {/* Desktop Login Icon */}
            {/* <div className="hidden lg:flex items-center gap-2 ml-6 py-[0.53rem] px-4 bg-zinc-700 rounded-full">
              <FaUser className="text-white text-xl" />
              Login
            </div> */}

            {auth.user ? (
              <div className="flex items-center justify-center">
                <Link to="/login">
                  <div
                    onClick={handelLogOut}
                    className="hidden lg:flex items-center gap-2 ml-6 py-[0.53rem] px-4"
                  >
                    <div className="h-10 w-10 bg-zinc-700 rounded-full flex items-center justify-center">
                      {auth.user.image ? (
                        <img
                          src={`${auth.user.image}`}
                          alt="User Profile"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <FaRegUser className="text-xl" />
                      )}
                    </div>
                    Logout
                    <LuLogOut />
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <div className="hidden lg:flex items-center gap-2 ml-6 py-[0.53rem] px-4 bg-zinc-700 rounded-full">
                    <FaUser className="text-white text-xl" />
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 p-6 z-50 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between">
            {auth.user ? (
              <>
                <Link to="/login">
                  <div
                    onClick={handelLogOut}
                    className="p-2 flex gap-2 items-center"
                  >
                    <div className="h-10 w-10 bg-zinc-700 rounded-full flex items-center justify-center">
                      {auth.user.image ? (
                        <img
                          src={`${auth.user.image}`}
                          alt="User Profile"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <FaRegUser className="text-xl" />
                      )}
                    </div>
                    logout
                    <LuLogOut className="text-white text-xl" />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <div className="p-2 bg-zinc-500 rounded-full">
                    <FaUser className="text-white text-xl" />
                  </div>
                </Link>
              </>
            )}

            <button onClick={() => setIsOpen(false)} className="text-white">
              <FaTimes />
            </button>
          </div>
          <ul className="mt-8 space-y-6">
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/"
                className="text-white hover:text-gray-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/shop"
                className="text-white hover:text-gray-300"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/category"
                className="text-white hover:text-gray-300"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                style={(e) => handelNavColor(e)}
                to="/recommended"
                className="text-white hover:text-gray-300"
              >
                Recommended
              </NavLink>
            </li>
            {auth.user && (
              <>
                <li>
                  <NavLink
                    style={(e) => handelNavColor(e)}
                    to={`/dashboard/${
                      auth.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="text-white hover:text-gray-300"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="mt-8">
            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } flex-col-reverse px-2 md:px-4 lg:hidden items-center lg:ml-10`}
            >
              <SearchInput />
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center space-y-4">
            <Link to="/cart">
              <div className="flex items-center">
                <div className="relative mt-3">
                  <FaShoppingCart className="text-white text-xl" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cart?.length}
                    </span>
                  )}
                </div>
                <p className="mt-7 ml-5">Cart</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
