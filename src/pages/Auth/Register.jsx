import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios"



const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: '',
    education: [],
    image: '',
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleEducationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, education: [...formData.education, value] });
    } else {
      setFormData({
        ...formData,
        education: formData.education.filter((edu) => edu !== value),
      });
    }
  };

  const validateForm = () => {
    const { name, email, phone, gender, education, image } = formData;

    if (name.length < 2) {
      toast.error('Name must be at least 2 characters long');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be exactly 10 digits');
      return false;
    }

    if (!gender) {
      toast.error('Please select a gender');
      return false;
    }

    if (education.length === 0) {
      toast.error('Please select at least one education level');
      return false;
    }

    if (!image) {
      toast.error('Please upload a profile image');
      return false;
    }

    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post(`http://localhost:8080/api/v1/auth/register`,{
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
          education : formData.education,
          image: formData.image,
        })
        if(res.data.success){
          toast.success(res.data.message)
          setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            gender: '',
            education: [],
            image: '',
          });
        // Clear the file input using the ref
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }    

        setTimeout(()=>{
          navigate("/login")
        },3000)        
        }else{
          toast.error(res.data.message)
        }
        console.log(res)

      } catch (error) {
        console.log(error.message || error)
        toast.error(`error occured while creating a ${formData.name}`)
      }


    }
  };

  return (
    <div className="flex items-center justify-center min-h-[88vh] md:min-h-[92vh] lg:min-h-[94vh] bg-zinc-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 rounded-lg shadow-md my-5">
        <h2 className="text-2xl font-bold text-center text-white">Register User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Profile Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={handleChange}
              ref={fileInputRef} // Attach the ref to the file input
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits."
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
              Gender
            </label>
            <div className="flex space-x-4 mt-1">
              <label className="text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-300">
              Education
            </label>
            <div className="flex flex-wrap mt-1">
              <label className="mr-4 text-white">
                <input
                  type="checkbox"
                  name="education"
                  value="High School"
                  checked={formData.education.includes("High School")}
                  onChange={handleEducationChange}
                  className="mr-2"
                />
                High School
              </label>
              <label className="mr-4 text-white">
                <input
                  type="checkbox"
                  name="education"
                  value="Bachelors"
                  checked={formData.education.includes("Bachelors")}
                  onChange={handleEducationChange}
                  className="mr-2"
                />
                Bachelors
              </label>
              <label className="mr-4 text-white">
                <input
                  type="checkbox"
                  name="education"
                  value="Masters"
                  checked={formData.education.includes("Masters")}
                  onChange={handleEducationChange}
                  className="mr-2"
                />
                Masters
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-white bg-zinc-600 border border-zinc-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
        <div className='flex items-center justify-center'>
          <p>Already have an account? <Link className='text-blue-300' to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
