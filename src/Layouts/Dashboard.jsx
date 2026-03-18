// import React from 'react';
// import { FaCalendar, FaHome, FaSearch, FaShoppingCart } from 'react-icons/fa';
// import { GrWorkshop } from "react-icons/gr";
// import { NavLink, Outlet } from 'react-router-dom';
// import useHR from '../Hooks/useHR';
// import { PiUserListFill } from 'react-icons/pi';
// import { AiFillPayCircle } from 'react-icons/ai';
// import useAdmin from '../Hooks/useAdmin';

// const Dashboard = () => {
//     const [isHR,] = useHR();
//     const[isAdmin,]=useAdmin();
//     return (
//         <div className='flex gap-10'>
//             <div className='min-h-screen w-30 md:w-64 bg-sky-300'>
//                 <ul className='menu p-4'>
//                     {!isHR && !isAdmin && (
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/paymentHistory"><FaCalendar></FaCalendar> Payment History</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/worksheet"><GrWorkshop></GrWorkshop>Work Sheet</NavLink>
//                             </li>
//                         </>
//                     )}
//                     {
//                         isHR && (
//                             <>
//                                 <li>
//                                     <NavLink to="/dashboard/employeeList"><PiUserListFill />Employee List</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/dashboard/hrPayment"><AiFillPayCircle />Payroll</NavLink>
//                                 </li>
//                             </>
//                         )
//                     }
//                     {
//                         isAdmin && (
//                             <>
//                                 <li>
//                                     <NavLink to="/dashboard/all-employee-list"><PiUserListFill />All Employee List</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/dashboard/adminPayment"><AiFillPayCircle />Payroll</NavLink>
//                                 </li>
//                             </>
//                         )
//                     }
//                     <div className='divider'></div>
//                     <li>
//                         <NavLink to="/"><FaHome></FaHome> Home</NavLink>
//                     </li>
//                     <li>
//                         <NavLink ><FaSearch></FaSearch> Menu</NavLink>
//                     </li>
//                 </ul>
//             </div>
//             <div className='flex-auto p-8'>
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




import React from 'react';
import { FaCalendar, FaHome, FaSearch, FaUserFriends } from 'react-icons/fa';
import { GrWorkshop } from "react-icons/gr";
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import { PiUserListFill } from 'react-icons/pi';
import { AiFillPayCircle, AiOutlineAppstore } from 'react-icons/ai';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [isHR] = useHR();
    const [isAdmin] = useAdmin();
    const location = useLocation();

    const currentPath = location.pathname.split('/').pop() || 'Overview';
    const formattedPath = currentPath.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

    const navStyles = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
        }`;

    return (
        <div className='min-h-screen bg-[#F8FAFC] flex p-4 lg:p-6 gap-6 font-sans'>
            <aside className='w-20 md:w-72 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col shrink-0'>
                <div className='p-8 flex items-center gap-3'>
                    <div className='h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-inner'>
                        <AiOutlineAppstore size={24} />
                    </div>
                    <h1 className='hidden md:block text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight'>
                        VibePortal
                    </h1>
                </div>

                <nav className='flex-grow px-4 overflow-y-auto'>
                    <ul className='space-y-2'>
                        {!isHR && !isAdmin && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory" className={navStyles}>
                                        <FaCalendar size={18} /> <span className='hidden md:block font-semibold text-sm'>Payment History</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/worksheet" className={navStyles}>
                                        <GrWorkshop size={18} /> <span className='hidden md:block font-semibold text-sm'>Work Sheet</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isHR && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/employeeList" className={navStyles}>
                                        <PiUserListFill size={20} /> <span className='hidden md:block font-semibold text-sm'>Employee List</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/hrPayment" className={navStyles}>
                                        <AiFillPayCircle size={20} /> <span className='hidden md:block font-semibold text-sm'>Payroll Management</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/all-employee-list" className={navStyles}>
                                        <FaUserFriends size={18} /> <span className='hidden md:block font-semibold text-sm'>Staff Overview</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adminPayment" className={navStyles}>
                                        <AiFillPayCircle size={20} /> <span className='hidden md:block font-semibold text-sm'>System Payroll</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className='my-6 border-t border-gray-100'></div>

                    <ul className='space-y-2'>
                        <li>
                            <NavLink to="/" className={navStyles}>
                                <FaHome size={18} /> <span className='hidden md:block font-semibold text-sm'>Back to Home</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className='p-6 mt-auto'>
                    <div className='bg-slate-50 p-4 rounded-2xl hidden md:flex items-center gap-3 border border-slate-100'>
                        <div className='h-10 w-10 rounded-full bg-blue-100 border-2 border-white overflow-hidden shrink-0'>
                            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="avatar" />
                        </div>
                        <div className='overflow-hidden'>
                            <p className='text-[10px] text-blue-500 font-black uppercase tracking-widest'>Current Role</p>
                            <p className='text-sm font-bold text-slate-800 truncate uppercase'>
                                {isAdmin ? 'Admin' : isHR ? 'HR Manager' : 'Employee'}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className='flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden'>
                <header className='h-20 border-b border-gray-50 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl sticky top-0 z-20'>
                    <div className='flex flex-col'>
                        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Navigation</h2>
                        <p className='text-slate-800 font-extrabold text-lg'>
                            Dashboard / <span className='text-blue-600'>{formattedPath}</span>
                        </p>
                    </div>
                    <div className='flex items-center gap-6'>
                        <div className='relative hidden sm:block'>
                            <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
                            <input type="text" placeholder="Search data..." className='bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 w-64' />
                        </div>
                        <div className="avatar placeholder online">
                            <div className="bg-slate-100 text-slate-600 rounded-xl w-10">
                                <span className="text-xs font-bold">{user?.displayName?.charAt(0) || 'V'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <section className='p-8 flex-1 overflow-y-auto bg-white'>
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;