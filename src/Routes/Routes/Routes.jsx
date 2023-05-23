import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../Layout/MainPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";

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
                path : "/appointment",
                element : <Appointment></Appointment>,
            }
        ]
    }
])