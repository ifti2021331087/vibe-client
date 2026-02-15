import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useHR = () => {
    const {user}=useAuth();
    const {data:isHR,isPending:isHRLoading}=useQuery({
        queryKey:[user?.email,'isHR'],
        queryFn:async()=>{
            const res=await axios.get(`http://localhost:5001/users/hr?email=${user?.email}`,);
            return res.data?.hr;
        }
    })
    return [isHR,isHRLoading]
};

export default useHR;