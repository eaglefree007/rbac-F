import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {REACT_APP_BASEURL} from "../../base_url"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SignUp = () =>  {
  const Navigate = useNavigate()
  let base_url = REACT_APP_BASEURL();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let postDataForReg = async (data) => {
    try {
        let windowLocation = window.location.href
        // console.log(windowLocation)

        // if(windowLocation.includes("?code")){
        //     data.refferByLink = 1
        //     data.code = windowLocation.split("?code")[1]
            // data.refferByLink = 1
            // data.code = windowLocation.split("?code")[1]
            // console.log(data.code)
        // }
      let postUserUrl = `${base_url}/user`
      let response = await axios.post( postUserUrl, data);

      console.log(response);

      if (response.data) {
        // Save the token to local storage
        if (response.data.data) Navigate("/login")
        // if (response.data.role == "admin") Navigate("/admin/all-profiles")
        toast.success("Successfully registered");
        window.location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).includes('')) {
      toast.info("all required necessary details")
    } else {
      postDataForReg(formData)
    }

    // console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Form fields */}
        <div className="flex">
          <div className="mr-2">
            <label className="flex justify-center  text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            />
          </div>
        </div>

        <div className="flex">
          <div className="mr-2">
            <label className="flex justify-center text-gray-700 text-sm font-bold mb-2">
            Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="flex">
          <div className="mr-2">
            <label className="flex justify-center text-gray-700 text-sm font-bold mb-2">
            Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="flex ">
          <div className="mr-2">
            <label className="flex justify-center text-gray-700 text-sm font-bold mb-2">
            Password
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        
        {/* Add other fields here */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
