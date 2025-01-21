import {
    createBrowserRouter,

  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import StudentDash from "../pages/Dashboard/StudentDash/StudentDash";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";

  
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main> ,
      children:[
        {
          path:"/",
          element: <Home></Home>
        },
        {
          path:"login",
          element:<Login></Login>
        },
        {
          path:"register",
          element:<Register></Register>
        },
   
      ]
    },
    {
      path:"/dashboard",
      element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>
    }
  ]);