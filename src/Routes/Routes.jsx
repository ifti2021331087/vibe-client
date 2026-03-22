import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Role from '../Pages/Role/Role';
import SignUp from '../Pages/SignUp/SignUp';
import Profile from '../Pages/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import HRRoute from './HRRoute';
import AdminRoute from './AdminRoute';
import Dashboard from '../Layouts/Dashboard';
import WorkSheet from '../Pages/Dashboard/WorkSheet/WorkSheet';
import EmployeeList from '../Pages/Dashboard/EmployeeList/EmployeeList';
import HrPayment from '../Pages/Dashboard/HrPayment/HrPayment';
import AllEmployeeList from '../Pages/Dashboard/AllEmployeeList/AllEmployeeList';
import AdminPayment from '../Pages/Dashboard/AdminPayment/AdminPayment';
import PaymentSuccess from '../Pages/Dashboard/AdminPayment/PaymentSuccess';
import PaymentCancel from '../Pages/Dashboard/AdminPayment/PaymentCancel';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "role",
                element: <Role></Role>
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>,
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }

        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index: true, 
                element: <PrivateRoute><DashboardHome /></PrivateRoute>
                
            },
            // employee related routes
            {
                path: "worksheet",
                element: <PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>
            },
            {
                path: "paymentHistory",
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            // hr related routes
            {
                path: "employeeList",
                element: <HRRoute><EmployeeList></EmployeeList></HRRoute>
            },
            {
                path: "hrPayment",
                element: <HrPayment></HrPayment>
            },
            // admin related routes
            {
                path: "all-employee-list",
                element: <AdminRoute><AllEmployeeList></AllEmployeeList></AdminRoute>
            },
            {
                path: "adminPayment",
                element: <AdminRoute><AdminPayment></AdminPayment></AdminRoute>
            },
            {
                path: "payment-success",
                element: <AdminRoute><PaymentSuccess></PaymentSuccess></AdminRoute>
            },
            {
                path: "payment-cancel",
                element: <AdminRoute><PaymentCancel></PaymentCancel></AdminRoute>
            }
        ]
    }
])

export default router;