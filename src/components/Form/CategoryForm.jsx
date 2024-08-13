import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <input
              type="value"
              id="value"
              className="min-w-[13rem] w-2/4 px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
        </div>

        <button
            type="submit"
            className="min-w-[9rem] w-1/4 bg-blue-600 text-zinc-100 text-md py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            submit
          </button>
      </form>
    </>
  );
};

export default CategoryForm;