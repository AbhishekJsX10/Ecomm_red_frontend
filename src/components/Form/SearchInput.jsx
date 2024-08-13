import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://ecomm-red.onrender.com/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex flex-col-reverse md:flex lg:flex-row" role="search" onSubmit={handleSubmit}>
        <button className="p-2 rounded-l bg-blue-500 text-white hover:bg-blue-600 flex items-center my-2 lg:my-0" type="submit">
          Search
        </button>
        <input
          placeholder="🔎  Search Products..."
          className="p-2 md:w-[15rem] lg:w-[12rem] xl:w-[28rem] rounded-r bg-zinc-700 text-white border-none focus:outline-none"
          type="search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
      </form>
    </div>
  );
};

export default SearchInput;