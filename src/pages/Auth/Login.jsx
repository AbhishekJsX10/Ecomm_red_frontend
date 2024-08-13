import React, { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { json, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from "../../context/auth";



const Login = () => {

  const {auth, setAuth} = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
      toast.error('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      toast.error('Email is invalid');
    }

    if (!password) {
      errors.password = 'Password is required';
      toast.error('Password is required');
    } else if (password.length < 1) {
      errors.password = 'password is required';
      toast.error('password is required');
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post(`http://localhost:8080/api/v1/auth/login`,{
          email,
          password
        })
        if(res.data.success){
          toast.success(res.data.message)

          setAuth({...auth,user: res.data.user, token: res.data.token})
          setEmail("")
          setPassword("")
          // setting data into local storage 
          localStorage.setItem("auth",JSON.stringify(res.data))

        setTimeout(()=>{
          navigate(location.state||"/")
        },3000)        

        }else{
          toast.error(res.data.message)
        }
        console.log(res)

      } catch (error) {
        console.log(error.message || error)
        toast.error(`error occured while logging in ${email}`)
      }


    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-zinc-100 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 h-[3.5rem] bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div className="mb-6 relative">
            <label className="block text-zinc-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 h-[3.5rem] bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute  mt-5 right-0 px-5 text-zinc-400"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-zinc-100 text-md py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            Login
          </button>
        </form>
        <div className='flex items-center justify-center mt-3'>
          <p>Don't have a account? <Link className='text-blue-300' to="/register">Register</Link></p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
