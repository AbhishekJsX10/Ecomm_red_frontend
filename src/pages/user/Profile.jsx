import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  // Context to get authenticated user info
  const { auth, setAuth } = useAuth();

  // State for user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  // Fetch user data from the context and set it to state
  useEffect(() => {
    const { email, name, phone, address, image } = auth?.user || {};
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
    setImage(image || "");
  }, [auth?.user]);

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
        image,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        // Update local storage with the new user data
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col md:flex-row">
    {/* Sidebar */}
    <UserMenu />

    {/* Main Content */}
    <div className="md:col-span-3 md:w-1/2 mx-auto lg:my-auto my-2 h-fit bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-semibold mb-4">Update User</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 h-[2.8rem] bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>

              {/* Email Input (disabled) */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 h-[2.8rem] bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>


              {/* Phone Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 h-[2.8rem] bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Enter Your Phone"
                />
              </div>

              {/* Address Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 h-[2.8rem] bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Enter Your Address"
                />
              </div>

              {/* Profile Image URL Input */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Profile Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-3 h-[2.8rem] bg-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Enter Image URL"
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full p-3 bg-yellow-700 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              UPDATE
            </button>
          </form>
        </div>
  </div>
  );
};

export default Profile;

