import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../Layout/MainPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <MainPage></MainPage>,
        children : [
            {
                path : "/",
                element : <Home></Home>,
            },
            {
                path : "/login",
                element : <Login></Login>,
            },
            {
                path : "/signup",
                element : <SignUp></SignUp>,
            },
            {
                path : "/appointment",
                element : <Appointment></Appointment>,
            }
        ]
    },
    {
        path : "/dashboard",
        element : <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
    }
])