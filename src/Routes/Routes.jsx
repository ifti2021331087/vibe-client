import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Role from '../Pages/Role/Role';
import SignUp from '../Pages/SignUp/SignUp';
import Profile from '../Pages/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layouts/Dashboard';
import WorkSheet from '../Pages/Dashboard/WorkSheet/WorkSheet';
import EmployeeList from '../Pages/Dashboard/EmployeeList/EmployeeList';
import HrPayment from '../Pages/Dashboard/HrPayment/HrPayment';
import AllEmployeeList from '../Pages/Dashboard/AllEmployeeList/AllEmployeeList';
import AdminPayment from '../Pages/Dashboard/AdminPayment/AdminPayment';

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>,
            },
            {
                path:"role",
                element:<Role></Role>
            },
            {
                path:"login",
                element:<Login></Login>,
            },
            {
                path:"signUp",
                element:<SignUp></SignUp>,
            },
            {
                path:"profile",
                element:<Profile></Profile>
            }

        ],
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:"worksheet",
                element:<WorkSheet></WorkSheet>
            },
            {
                path:"employeeList",
                element:<EmployeeList></EmployeeList>
            },
            {
                path:"hrPayment",
                element:<HrPayment></HrPayment>
            },
            {
                path:"all-employee-list",
                element:<AllEmployeeList></AllEmployeeList>
            },
            {
                path:"adminPayment",
                element:<AdminPayment></AdminPayment>
            }
        ]
    }
])

export default router;