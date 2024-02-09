// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import { authVerified } from '../libs/utils'
// import Home from './Pages/Home'
// import SignUp from './Pages/SignUp'
// import Login from './pages/Login'


// const AppRouter = () => {
//   return (
//     // <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/user/join' element={<SignUp />} />

//     </Routes>
//     // </BrowserRouter>
//     )
// }

// export default AppRouter

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authVerified } from '../libs/utils'; // Import your authVerified function

// PrivateRoute component for protecting routes
const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const isAuthenticated = authVerified();

  // Check if user is authenticated and has the required role
  const isAuthorized = isAuthenticated && isAuthenticated.role === role;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          // Render the component if authenticated and authorized
          <Component {...props} />
        ) : (
          // Redirect to login if not authenticated or authorized
          <Redirect to="/login" />
        )
      }
    />
  );
};

// Example usage:
// <PrivateRoute path="/user" component={UserComponent} role="user" />
// <PrivateRoute path="/admin" component={AdminComponent} role="admin" />
