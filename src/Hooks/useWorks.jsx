import React from 'react';
import {
    useQuery,
} from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';

const useWorks = () => {
    const {user}=useAuth();
    const { refetch, data:works=[] } = useQuery({
        queryKey: ['works',user?.email],
        queryFn: async() =>{
            const res=await axios.get(`http://localhost:5001/works?email=${user?.email}`);
            // console.log(res.data);
            return res.data;
        }
    })
    return {works,refetch};
};

export default useWorks;