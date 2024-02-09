import axios from 'axios';
import React, { useState } from 'react';
import { REACT_APP_BASEURL } from '../../base_url';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
// import { authVerified } from '../../libs/utils';


const Login = () => {
  
  const Navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      let base_url = REACT_APP_BASEURL();
      let userLoginUrl = `${base_url}/user/login`
      // console.log(userLoginUrl)
      const response = await axios.post(userLoginUrl, formData);
      // console.log({response : response.data.role})
      if (response.data.status === 200) {
        // Save the token to local storage
        localStorage.setItem('token', response.data.data);
        localStorage.setItem('role', response.data.role);
        if (response.data.role == "user") Navigate("/user/profile")
        if (response.data.role == "admin") Navigate("/admin/all-profiles")
        // response.data.role == "admin" ? Navigate("/admin/all-profiles") : Navigate("/user/profile");
        toast.success('Login successful');
        window.location.reload();
      } else {
          toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Try again...');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
