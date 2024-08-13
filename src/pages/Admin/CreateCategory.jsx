

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const { auth } = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("")
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-[100%] bg-zinc-900 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminMenu />

      {/* Main Content */}
      <div className="md:w-3/4 bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Manage Category</h2>
        <div className="space-y-4">
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
        </div>

        {/* Table of categories */}
        <div className="overflow-x-auto mt-8">
          <table className="min-w-[40vw] bg-zinc-800 text-zinc-100">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-zinc-700">
                  <td className="text-sm py-3 px-4">{category.name}</td>
                  <td className="text-sm py-3 px-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                      onClick={() => {
                        setSelected(category);
                        setUpdatedName(category.name);
                        setVisible(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white mx-2 px-4 py-2 rounded"
                      onClick={() => {
                        handleDelete(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal className="custom-modal"
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

