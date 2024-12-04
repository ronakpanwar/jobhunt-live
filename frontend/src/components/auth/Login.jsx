import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
 
  const navigate = useNavigate();
  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`http://localhost:3000/api/user/login` , formData ,{
       headers:{
         "Content-Type":"application/json"
       },
       withCredentials:true
      })
   
     
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }  
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)    
     // Simplified error handling
    }
    finally{
      dispatch(setLoading(false));
    }
    
  };

  return (
    <>

   <Navbar/>
   <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-8">
  <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white rounded-md shadow-md">
    <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={formData.role === 'student'}
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
              checked={formData.role === 'recruiter'}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label htmlFor="recruiter" className="ml-2 text-sm text-gray-700">Recruiter</label>
          </div>
        </div>
      </div>
      {loading ? (
        <button
          className="w-full flex justify-center items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md shadow-sm"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      )}
    </form>
    <p className="text-sm text-gray-600 mt-4 text-center">
      Don't have an account?{' '}
      <a href="/signup" className="text-blue-600 font-bold hover:text-blue-500">
        Sign up
      </a>
    </p>
  </div>
</div>

    </>
  );
};

export default Login;

