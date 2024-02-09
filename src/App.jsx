import React, { useEffect, useState } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import authVerified from '../libs/utils'
import Login from './Pages/Login';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import AllUserList from './Pages/AllUserList';
import EditUser from './Pages/EditUser';


const App = () => {
  const [token, setToken] = useState("")
  const [role, setRole] = useState("")
  const isAuthenticated = authVerified()

  useEffect(() => {
    setRole(isAuthenticated.role)
    setToken(isAuthenticated.token)
  }, [token, role])
  useEffect(() => {

    console.log(token, role) 
  })

  return (
    <Routes>

      <Route exact path="/" element={<Home />} />
      <Route path='/login' element={ <Login /> } />
      <Route path='/user/join' element={ <SignUp /> } />
      <Route path='/user/profile' element={ isAuthenticated.token && <Profile /> }/>
      <Route path='/user/profile/:id' element={ isAuthenticated.token && <Profile /> } />
      <Route path='/user/update/:id' element={ isAuthenticated.token && <EditUser /> }/>
      <Route path="/admin/all-profiles" element={isAuthenticated.role == "admin" && <AllUserList /> }/> 

    </Routes>

    
      // <Routes>
      //   <Route path="/" element={<Home/>} /> 
        
      //       <Route path='/user/profile/:id' element={!isAuthenticated.token  ?<Login /> : <Profile/>}/>
      //       <Route path='/user/profile' element={isAuthenticated.token ? <Profile /> : <Login/>}/>
      //       <Route path='/login' element={isAuthenticated.token ? (!isAuthenticated.role=="admin" ? <AllUserList/> : <Profile /> ) : <Login />}/>
      //       <Route path='/user/join' element={!isAuthenticated.token?<SignUp /> : <Profile/>}/>
      //       <Route path='/user/update/:id' element={!isAuthenticated.token ? <Login /> : <EditUser />}/>
      //       <Route path='/admin/all-profiles' element={isAuthenticated.token && isAuthenticated.role=="admin" ? <AllUserList /> : <Profile/>}/>
      //       {/* <Route path='/admin/all-profiles' element={isAuthenticated.token && isAuthenticated.role=="admin" ?<Profile /> : <Home/>}/> */}

      // </Routes>
  )
}

export default App
