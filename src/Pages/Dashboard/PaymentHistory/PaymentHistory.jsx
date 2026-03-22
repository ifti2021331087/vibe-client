import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user} = useAuth();
    // console.log(user);
    const [transactions, setTransactions] = useState([]);
    const axiosSecure=useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get(`payroll?email=${user?.email}`)
        .then(res => {
            // console.log(res.data);
            setTransactions(res.data);
        })
    },[])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Salary</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Payment Data</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions && transactions.map((transaction,index) =>
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{transaction.salary}</td>
                                    <td>{transaction.month}</td>
                                    <td>{transaction.year}</td>
                                    <td>{transaction.paymentDate}</td>
                                    <td>{transaction.transactionId}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;