import axios from 'axios';
import  authVerified  from './utils';
import { REACT_APP_BASEURL } from '../base_url';

const base_url = REACT_APP_BASEURL();

export const getAllUsers = async (url) => {
  let config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authVerified().token}`
    }
  }
  try {
    const response = await axios.get(`${base_url}/${url}`,config );
    console.log(response.data, "api.js");
    return response.data;
  } catch (error) {
    // console.error('api.js Error fetching data:', error);
    throw error;
  }
};