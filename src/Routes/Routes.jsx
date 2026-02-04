import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import Role from '../Pages/Role/Role';
import SignUp from '../Pages/SignUp/SignUp';

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
            }

        ]
    }
])

export default router;