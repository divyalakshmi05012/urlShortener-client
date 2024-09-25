import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard";
import ForgotPassword from "../components/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { Navigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import MyURLs from "../components/MyURLs";
import AdminGuard from "./AdminGuard";
import Home from "../components/Home";
import ForgotPasswordEmailCheck from "../components/ForgotPasswordEmailCheck";

export default [
    {
        path:'/',
        element:<Auth/>
    },
    {
        path:'/signin',
        element:<Signin/>
    },
    {
        path:'/signup',
        element:<Signup/>
    },
    {
        path:'/home',
        element:<ProtectedRoute><Topbar/><Home></Home></ProtectedRoute>
    },
    {
        path:'/dashboard',
        element:<AdminGuard><ProtectedRoute><Topbar/><Dashboard/></ProtectedRoute></AdminGuard>
    },
    {
        path:'/forgotpwdcheck',
        element:<ForgotPasswordEmailCheck/>
    },
    {
        path:'/forgotpassword',
        element:<ForgotPassword/>
    },
    {
        path:'/myurls',
        element:<ProtectedRoute><Topbar/><MyURLs/></ProtectedRoute>
    },
    {
        path:'*',
        element:<Navigate to='/'></Navigate>
    }
]