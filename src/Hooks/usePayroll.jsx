import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const usePayroll = () => {
    const axiosSecure=useAxiosSecure();
    const{refetch,data:paymentRequests=[]}=useQuery({
        queryKey:['payroll',{sort:'latest'}],
        queryFn:async()=>{
            const res=await axiosSecure.get('payroll?orderBy=createdAt&order=desc')
            return res.data;
        }
    })
    return [refetch,paymentRequests];
};
// const usePayroll = () => {
//   const { refetch, data: paymentRequests = [] } = useQuery({
//     queryKey: ['payroll', { sort: 'latest' }],
//     queryFn: async () => {
//       // Add 'return' and 'await' for cleaner logic
//       const res = await axios.get('http://localhost:5001/payroll?orderBy=createdAt&order=desc');
//       return res.data;
//     },
//   });

//   return [refetch, paymentRequests];
// };

export default usePayroll;