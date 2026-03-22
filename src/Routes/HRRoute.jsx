import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useHR from '../Hooks/useHR';


const AdminRoute = ({children}) => {
    const {user,loading}=useAuth();
    const [isHR,isHRLoading]=useHR();
    const location=useLocation();
    
    if(loading || isHRLoading){
        return <progress className='progress w-56'></progress>
    }
    if(user && isHR){
        return children;
    }
    
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;