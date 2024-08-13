

import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += (item.price * (item.count || 1)); // Use count instead of quantity
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00"; // Fallback in case of error
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Update item quantity
  const updateQuantity = (pid, newCount) => {
    try {
      const updatedCart = cart.map((item) =>
        item._id === pid ? { ...item, count: newCount } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to get the total quantity of a specific product
  const getTotalQuantity = (pid) => {
    return cart?.reduce((totalQuantity, cartItem) => {
      if (cartItem._id === pid) {
        return totalQuantity + (cartItem.count || 1); // Use count instead of quantity
      }
      return totalQuantity;
    }, 0);
  };

  // Create a unique list of products for rendering
  const uniqueProducts = Array.from(new Set(cart.map(item => item._id))).map(id => {
    return cart.find(item => item._id === id);
  });

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-4">
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1">
            {`Hello ${auth?.token ? auth.user?.name : "Guest"}`}
          </h1>
          <h4 className="text-lg">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {uniqueProducts?.map((p, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row bg-zinc-800 p-4 rounded-lg shadow-lg"
              >
                <div className="md:w-1/4">
                  <img
                    src={`https://ecomm-red.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="w-full h-32 object-cover rounded-lg"
                    alt={p.name}
                  />
                </div>
                <div className="md:w-3/4 md:ml-4 mt-4 md:mt-0">
                  <p className="text-lg font-semibold">{p.name}</p>
                  <p className="text-gray-400">{p.description.substring(0, 30)}</p>
                  <p className="text-lg font-bold mt-2">
                    Price: ${(p.price * getTotalQuantity(p._id)).toFixed(2)} {/* Price * total quantity */}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                      onClick={() => updateQuantity(p._id, getTotalQuantity(p._id) - 1)}
                      disabled={getTotalQuantity(p._id) <= 1} // Disable if quantity is 1
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg">{getTotalQuantity(p._id)}</span>
                    <button
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                      onClick={() => updateQuantity(p._id, getTotalQuantity(p._id) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
            <p className="mb-4 text-lg">Total | Checkout | Payment</p>
            <hr className="border-gray-700 mb-4" />
            <h4 className="text-xl font-bold">Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Current Address</h4>
                <h5 className="text-gray-400">{auth.user.address}</h5>
                <button
                  className="mt-2 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                  onClick={() => navigate("/")}
                >
                  CheckOut
                </button>
              </div>
            ) : (
              <div className="mt-4">
                {auth?.token ? (
                  <button
                    className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                    onClick={() => navigate("/")}
                  >
                    CheckOut
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                    onClick={() =>
                      navigate("/login", {
                        state: { from: "/cart" },
                      })
                    }
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
