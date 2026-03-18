import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useHR = () => {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
    const {data:isHR,isPending:isHRLoading}=useQuery({
        queryKey:[user?.email,'isHR'],
        queryFn:async()=>{
            const res=await axiosPublic.get(`users/hr?email=${user?.email}`);
            // console.log(res);
            return res.data?.hr;
        },
        enabled: !!user?.email,
    })
    return [isHR,isHRLoading]
};

export default useHR;