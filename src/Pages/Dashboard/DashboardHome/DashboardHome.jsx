import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaWallet, FaTasks, FaCheckCircle, FaHourglassHalf, FaChartLine } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';
import useHR from '../../../Hooks/useHR';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const DashboardHome = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isHR] = useHR();
    const axiosSecure = useAxiosSecure();

    // Fetching data based on role
    const { data: statsData = {} } = useQuery({
        queryKey: ['dashboard-stats', user?.email],
        queryFn: async () => {
            // If Admin/HR, fetch all users and payrolls
            if (isAdmin || isHR) {
                const [usersRes, paymentsRes] = await Promise.all([
                    axiosSecure.get('/users'),
                    axiosSecure.get('/payroll')
                ]);
                return {
                    totalUsers: usersRes.data.length,
                    totalPayments: paymentsRes.data.length,
                    allPayments: paymentsRes.data
                };
            }
            // If Employee, fetch only their works and payments
            const [worksRes, myPaymentsRes] = await Promise.all([
                axiosSecure.get(`/works?email=${user?.email}`),
                axiosSecure.get(`/payroll?email=${user?.email}`)
            ]);
            return {
                myWorks: worksRes.data.length,
                myPayments: myPaymentsRes.data.length,
                totalEarned: myPaymentsRes.data.reduce((sum, p) => sum + (p.salary || 0), 0)
            };
        },
        enabled: !!user?.email
    });

    const getRoleConfig = () => {
        if (isAdmin) {
            return {
                title: "System Administrator",
                stats: [
                    { label: 'Total Employees', value: statsData.totalUsers || 0, icon: <FaUsers />, color: 'bg-indigo-600' },
                    { label: 'Total Transactions', value: statsData.totalPayments || 0, icon: <FaChartLine />, color: 'bg-emerald-600' },
                    { label: 'System Status', value: 'Active', icon: <FaCheckCircle />, color: 'bg-blue-600' },
                ]
            };
        }
        if (isHR) {
            return {
                title: "HR Management",
                stats: [
                    { label: 'Staff Count', value: statsData.totalUsers || 0, icon: <FaUsers />, color: 'bg-pink-600' },
                    { label: 'Payroll Records', value: statsData.totalPayments || 0, icon: <FaWallet />, color: 'bg-amber-500' },
                    { label: 'Pending Tasks', value: 'High', icon: <FaHourglassHalf />, color: 'bg-orange-600' },
                ]
            };
        }
        return {
            title: "Employee Portal",
            stats: [
                { label: 'Submitted Works', value: statsData.myWorks || 0, icon: <FaTasks />, color: 'bg-blue-500' },
                { label: 'Payment Records', value: statsData.myPayments || 0, icon: <FaWallet />, color: 'bg-emerald-500' },
                { label: 'Total Salary Recieved', value: `$${statsData.totalEarned || 0}`, icon: <FaCheckCircle />, color: 'bg-purple-500' },
            ]
        };
    };

    const config = getRoleConfig();

    return (
        <div className="animate-fadeIn">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight capitalize">
                    Welcome, {user?.displayName?.split(' ')[0]}! 👋
                </h1>
                <p className="text-slate-500 mt-2 font-medium uppercase text-xs tracking-[0.2em]">
                    {config.title} • {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {config.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`${stat.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl mb-6 shadow-lg shadow-inherit/20`}>
                            {stat.icon}
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-slate-800 mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-xl mb-4 text-blue-400">Quick Actions</h3>
                        <p className="text-slate-400 text-sm mb-8">Access your most frequently used tools immediately.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {isAdmin && <button className="btn btn-primary rounded-2xl px-6">System Logs</button>}
                        {isHR && <button className="btn btn-primary rounded-2xl px-6">Run Payroll</button>}
                        {!isAdmin && !isHR && <button className="btn btn-primary rounded-2xl px-6">New Work Entry</button>}
                        <button className="btn btn-ghost bg-white/5 rounded-2xl px-6">Support</button>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-10 rounded-[3rem]">
                    <h3 className="text-blue-900 font-bold text-xl mb-4">Internal Memo</h3>
                    <p className="text-blue-800/70 text-sm leading-relaxed">
                        {isAdmin || isHR 
                            ? "Quarterly financial audits start next week. Please ensure all payment data in the 'vibe' database is verified and consistent."
                            : "Your worksheets are automatically synced with the HR panel. Ensure your hours are logged before the 28th of every month."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;