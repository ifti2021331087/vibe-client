import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const AllUsers = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {refetch,data:users=[]}=useQuery({
        queryKey:[user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get('users');
            return res.data;
        }
    })
    return {refetch,users}
};

export default AllUsers;