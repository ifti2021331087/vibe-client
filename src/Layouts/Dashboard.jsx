import React from 'react';
import { FaCalendar, FaHome, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { GrWorkshop } from "react-icons/gr";
import { NavLink, Outlet } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import { PiUserListFill } from 'react-icons/pi';
import { AiFillPayCircle } from 'react-icons/ai';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const [isHR] = useHR();
    const[isAdmin]=useAdmin();
    console.log(isHR)
    return (
        <div className='flex gap-10'>
            <div className='min-h-screen w-30 md:w-64 bg-sky-300'>
                <ul className='menu p-4'>
                    {!isHR && !isAdmin && (
                        <>
                            <li>
                                <NavLink to="/dashboard/paymentHistory"><FaCalendar></FaCalendar> Payment History</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/worksheet"><GrWorkshop></GrWorkshop>Work Sheet</NavLink>
                            </li>
                        </>
                    )}
                    {
                        isHR && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/employeeList"><PiUserListFill />Employee List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/hrPayment"><AiFillPayCircle />Payroll</NavLink>
                                </li>
                            </>
                        )
                    }
                    {
                        isAdmin && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/all-employee-list"><PiUserListFill />All Employee List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adminPayment"><AiFillPayCircle />Payroll</NavLink>
                                </li>
                            </>
                        )
                    }
                    <div className='divider'></div>
                    <li>
                        <NavLink to="/"><FaHome></FaHome> Home</NavLink>
                    </li>
                    <li>
                        <NavLink ><FaSearch></FaSearch> Menu</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-auto p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;