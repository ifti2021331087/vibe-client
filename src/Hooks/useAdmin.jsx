import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        enabled: !loading && !!user?.email,
        queryKey:[user?.email,'isAdmin'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`users/admin?email=${user?.email}`);
            // console.log(res);
            return res?.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;