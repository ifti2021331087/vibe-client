import React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useWorks = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const { refetch, data:works=[] } = useQuery({
        queryKey: ['works',user?.email],
        queryFn: async() =>{
            const res=await axiosSecure.get(`works?email=${user?.email}`);
            // console.log(res.data);
            return res.data;
        }
    })
    return {works,refetch};
};

export default useWorks;