import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {REACT_APP_BASEURL} from "../../base_url"
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import authVerified  from '../../libs/utils';



const EditUser = () =>  {
  let base_url = REACT_APP_BASEURL();
  const [user, setUser] = useState({})
  const location = useLocation()
  const Navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
  });

  const {id} = useParams()
  console.log(id, 33)
  useEffect(() => {
    let config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authVerified().token}`
      }
    }
    const userById= `${base_url}/user/${id}`
    const userByDetail= `${base_url}/user-detail`

// console.log({id:authVerified().role=="admin" ? `/user/${id}`:"/user-detail"});
    axios.get(authVerified().role=="admin" ? userById :userByDetail, config )
    .then((res) => {
      if (res.data.status) {
        console.log(res.data);
        setFormData({...res.data.data})
        setUser(res.data.data ? res.data.data : {}) 
      }
    })
  }, [])

  let postDataForUpdate = async (data) => {
    let config = {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${authVerified().token}`
      }
    }
      try {
      const response = await axios.patch(authVerified().role=="admin"? base_url+`/user/${id}`:base_url+"/edit-user", data, config )
      console.log(60, response)
      if (response.data.status == 200) {
        if(authVerified().role=="admin"){
            Navigate("/admin/all-profiles")
        }
        else{
            Navigate("/user/profile")
        }
        
      }
      else {
        toast.error("somthing went wrong ")
      }
      return
      } catch (error) {
        // console.log(error); 
        toast.error("somthing went wrong :(")
      }
      
  //   }).catch(error => {
  //     // console.log(error)
      
  // })

  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).includes('')) {
      toast.info("all required necessary details")
    } else {
      postDataForUpdate(formData)
      toast.success("successfully edited :)")
    }

    // Implement logic to send formData to the server
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
            age
          </label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            />
          </div>
        </div>
        
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        {/* Add other fields here */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
