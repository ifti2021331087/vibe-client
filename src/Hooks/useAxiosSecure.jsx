import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const axiosSecure=axios.create({
  baseURL: 'https://vibe-server-ashy.vercel.app/',
  withCredentials:true,
});
const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logOut}=useContext(AuthContext);
    // axiosSecure.interceptors.request.use(function (config) {
    //     const token=localStorage.getItem('access-token');
    //     config.headers.authorization=`Bearer ${token}`;
    //     return config;
    // }, function (error) {
    //     return Promise.reject(error);
    // },
    // );

    axiosSecure.interceptors.response.use(function onFulfilled(response) {
        return response;
    }, function onRejected (error) {
        const status=error.response?.status;
        if(status===401 || status===403){
            logOut();
            navigate('/login');
        }

        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;