import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';



const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth)

  const [Data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    role: "student",
    password: "",
    image: "",
  });

  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setData({
      ...Data,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname" ,Data.fullname)
    formData.append("email" ,Data.email)
    formData.append("phoneNo" ,Data.phone)
    formData.append("role" ,Data.role)
    formData.append("password" ,Data.password)
    if(Data.image ){
        formData.append("file" ,Data.image)
    }
    try {
      dispatch(setLoading(true))
         const res = await axios.post(`http://localhost:3000/api/user/register` , formData ,{
          headers:{
            "Content-Type":"multipart/form-data"
          },
          withCredentials:true
         })
      
        if (res.data.success) {
          navigate("/login")
          toast.success(res.data.message)
        }  
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)    
       // Simplified error handling
      }
      finally{
        dispatch(setLoading(false))
      }
    
    
  };

  return (
    <>

  <Navbar />
  <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-lg p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Your Name"
            value={Data.fullname}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={Data.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={Data.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="flex items-center space-x-6 mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={Data.role === 'student'}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="student" className="ml-2 text-sm text-gray-700">Student</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={Data.role === 'recruiter'}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="recruiter" className="ml-2 text-sm text-gray-700">Recruiter</label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={Data.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        {loading ? (
          <button className="w-full px-4 py-2 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md cursor-not-allowed">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        )}
        <div className="my-4">
          <h1>
            Already have an account?{' '}
            <span className="text-blue-600 font-bold hover:text-blue-500">
              <Link to="/login">Login</Link>
            </span>
          </h1>
        </div>
      </form>
    </div>
  </div>
</>

  );
};

export default Signup;
