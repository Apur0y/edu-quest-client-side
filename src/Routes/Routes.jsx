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
import CreateSession from "../pages/Dashboard/Tutor/CreateSession";
import CreatedSession from "../pages/Dashboard/Tutor/CreatedSession";
import UploadMaterials from "../pages/Dashboard/Tutor/UploadMaterials";
import UploadedMaterials from "../pages/Dashboard/Tutor/UploadedMaterials";
import ViewAllUser from "../pages/Dashboard/Admin/ViewAllUser";
import ViewAllSession from "../pages/Dashboard/Admin/ViewAllSession";
import ViewAllMaterials from "../pages/Dashboard/Admin/ViewAllMaterials";
import LandingPage from "../pages/Dashboard/LandingPage";
import SessionDetailsCard from "../pages/Home/studySession/SessionDetailsCard";
import Payment from "../pages/Home/studySession/Payment";
import BookedCard from "../pages/Dashboard/StudentDash/StudentCard/BookedCard";
import StudentDetailsCard from "../pages/Dashboard/StudentDash/StudentCard/StudentCard";
import MaterialsCard from "../pages/Dashboard/StudentDash/StudentCard/MaterialsCard";
import AllSession from "../pages/AllSessions/AllSession";
import ErrorPage from "../pages/Error";
import Profile from "../pages/Dashboard/Profile/Profile";

  
  
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
        {
          path:"sessions/:id",
          loader: ()=>fetch("https://eduquest-server-side.vercel.app/sessions"),
          element: <PrivateRoutes><SessionDetailsCard></SessionDetailsCard></PrivateRoutes>
        },
        {
          path:"/payment",
          element: <Payment></Payment>
        },
        {
          path:"/allsession",
          element:<AllSession></AllSession>
        },
        {
          path:'/*',
          element:<ErrorPage></ErrorPage>
        }
   
      ]
    },
    {
      path:"/dashboard",
      element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
      children:[
        {
          path:"profile",
          element:<Profile></Profile>

        },
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
        },

        {
          path:'createsession',
          element:<CreateSession></CreateSession>
        },
        {
          path:"createdsession",
          element:<CreatedSession></CreatedSession>
        },
        {
          path:"uploadmaterials",
          element:<UploadMaterials></UploadMaterials>
        },
        {
          path:"uploadedmaterials",
          element:<UploadedMaterials></UploadedMaterials>
        },

        {
          path:"viewalluser",
          element:<ViewAllUser></ViewAllUser>
        },
        {
          path:"viewallsession",
          element:<ViewAllSession></ViewAllSession>
        },
        {
          path:"viewallmaterials",
          element:<ViewAllMaterials></ViewAllMaterials>
        },
        {
          path:"landingpage",
          element:<LandingPage></LandingPage>
        },
        {
          path: "bookedsession/:id",
          loader: ({ params }) =>
            fetch(`https://eduquest-server-side.vercel.app/booked/${params.id}`),
          element: <StudentDetailsCard></StudentDetailsCard>
        },
        {
          path: "materials/:id",
          loader: ({ params }) =>
            fetch(`https://eduquest-server-side.vercel.app/booked/${params.id}`),
          element: <MaterialsCard></MaterialsCard>
        }
    
      ]

    }
  ]);