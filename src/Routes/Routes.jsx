import {
    createBrowserRouter,

  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import CreateNotes from "../pages/Dashboard/StudentDash/CreateNotes";
import BookedSession from "../pages/Dashboard/StudentDash/BookedSession";
import ManageNotes from "../pages/Dashboard/StudentDash/ManageNotes";
import Materials from "../pages/Dashboard/StudentDash/Materials";

  
  
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
      element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
      children:[
        {
          path:"createnote",
          element:<CreateNotes></CreateNotes>
        },
        {
          path:"bookedsession",
          element:<BookedSession></BookedSession>
        },
        {
          path:"managenote",
          element:<ManageNotes></ManageNotes>
        },
        {
          path:"materials",
          element:<Materials></Materials>
        }
      ]

    }
  ]);