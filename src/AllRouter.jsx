import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./pages/Profile";

export const routes = [
  {
    path: "/login",
    authentication: false,
    element: <Login />
  },
  {
    path: "/user/profile",
    authentication: true,
    element: <Profile />
  },
  {
    path: "/user/join",
    authentication: false,
    element: <SignUp />
  },
  {
    path: "/",
    authentication: false,
    element: <Home />
  }
];
