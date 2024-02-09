import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { REACT_APP_BASEURL } from '../../base_url';
// import avatar from "../assets/avatar.png"
import { useParams } from 'react-router-dom';
import authVerified from '../../libs/utils';
import { toast } from 'react-toastify';

const Profile = () => {
  let avatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw10sXKvxhS9fmuut0TZoG42&ust=1707470555095000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDemPX3nIQDFQAAAAAdAAAAABAE"
  let base_url = REACT_APP_BASEURL();
  const {id} = useParams()
  // console.log(useParams())
  const getUserById = `${base_url}/user/${id}`
  const getUserDetail = `${base_url}/user-detail`

  const [user, setUser] = useState({})
  const [refferalLink, setRefferalLink] = useState("")

  // console.log({id});

  useEffect(() => {

    const fetchData = async () => {
      try {

        const token = localStorage.getItem('token');
        // console.log(token)

        if (token) {

          let config = {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }

          const response = await axios.get(authVerified().role=="admin" && id ? getUserById : getUserDetail, config);
          
          // console.log(response.data.data)
          setUser(response.data.data);
        } else {
          toast.error("Login Error! Try Again..")
          // console.log('Token not present. User not logged in.');
        }
      } catch (error) {
        toast.error("Login Error! Try Again..")
        // console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect

  const genrateLink=async() => {
    // e.preventDefault();
    const token = localStorage.getItem('token');
    try{
      let referalLink = `${base_url}/admin/referal`
        const response = await axios.get( referalLink, {
          headers: {
            authorization: `Bearer ${token}`,
            },
          }
        );

      if(response.data.status==200){
        // console.log(window.location.href.replace("profile","join")+"?code="+response.data.code)
        setRefferalLink( window.location.href.replace("profile","join")+"?code="+response.data.code)
        }
      } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={user ? user.avatarUrl : avatar}
            alt={user ? user.name : "Image Alt"}
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-semibold my-2">Name: {user && user ? user.name : ""}</h2>
            <h5 className="">Role: {user && user.role}</h5> 
            <p className="text-gray-600">Username: {user ? user.username : ""}</p>
            <p className="text-gray-600">Email: {user ? user.email : ""}</p>
            {/* <p className="text-gray-600">Address: {user ? `${user.address} ${user.city} ${user.state} ${user.country} - ${user.zip}`: ""}</p>
            <p className="text-gray-600">ZIP: {user ? user.zip : ""}</p> */}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium">added by : </h3>
          <p className="text-gray-600">{user ? user.addedBy : ""}</p>
        </div>
       {authVerified().role=="admin"? <div className="mt-6">
          <button className="text-lg font-medium" onClick={genrateLink}>generate referal link </button>
          <p className="text-gray-600">{refferalLink}</p>
        </div>: <div className="mt-6">
          <h3 className="text-lg font-medium">refered by link : </h3>
          <p className="text-gray-600">{user.refferByLink == 0 ? "- no" : "- yes"}</p>
        </div>}
      </div>
    </div>
  );
};

export default Profile;
