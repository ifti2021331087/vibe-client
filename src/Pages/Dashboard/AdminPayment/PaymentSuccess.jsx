import React, { useEffect} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const userId=searchParams.get('userId');
    const axiosSecure=useAxiosSecure();
    useEffect(() => {
        if (sessionId && userId) {
            axiosSecure.get(`payment-info/${sessionId}`)
                .then(res => {
                    const fetchedTransactionId = res.data.transactionId;
                    const updatedDoc={
                        paymentDate: new Date().toLocaleDateString(),
                        status:"Paid",
                        transactionId:fetchedTransactionId,
                    }
                    axiosSecure.patch(`userSalary/${userId}`,updatedDoc).
                    then(()=>{
                    })
                })
        }
    
    }, [sessionId])
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-green-100 p-6 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">The employee's salary has been processed successfully.</p>
            <Link to="/dashboard/adminPayment" className="btn btn-primary text-white">
                Back to Payroll
            </Link>
        </div>
    );
};

export default PaymentSuccess;