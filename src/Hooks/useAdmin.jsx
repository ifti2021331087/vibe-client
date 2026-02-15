import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const useAdmin = () => {
    const {user}=useAuth();
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn:async()=>{
            const res=await axios.get(`http://localhost:5001/users/admin?email=${user?.email}`);
            return res?.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;