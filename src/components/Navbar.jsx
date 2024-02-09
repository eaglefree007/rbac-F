import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import authVerified from '../../libs/utils';
import { toast } from 'react-toastify';


const Navbar = () => {

  const Navigate = useNavigate();
  let auth = authVerified();
  
  const logout=(e)=>{

    e.preventDefault()
    localStorage.clear();
    toast.success("Logout Successfully");
    Navigate("/")
    window.location.reload();
    
  }

  return (
  
    <div className="flex bg-blue-300">
      <div className=" container  text-white p-4">
        <nav className=" flex justify-around ">
          <Link to="/" className="text-lg font-bold md:text-2xl">RBAC</Link>

          <ul className="text-center flex items-center justify-between w-auto space-x-4 md:w-[30rem]">
            <li>
              <Link to="/" className='hover:text-2xl'>Home</Link>
            </li>
            {auth.role=="admin"?<li>
              <Link to="/admin/all-profiles">Manage</Link>
            </li>:"" }
            {auth.token?
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>:""}
              {!auth.token?<li>
                <Link to="/user/join">Register</Link>
              </li>:""}
              {!auth.token?<li>
                <Link to="/login">Login</Link>
              </li>:""}
          </ul>
          {auth.token?<button onClick={logout}>
              Logout
            </button>:""}
        </nav>
      </div>
    </div>
  )
}

export default Navbar