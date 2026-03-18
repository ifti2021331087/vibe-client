import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-red-100 p-6 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
            <p className="text-gray-600 mb-6">No charges were made. You can try the payment again whenever you're ready.</p>
            <Link to="/dashboard/adminPayment" className="btn btn-outline btn-error">
                Return to Admin Panel
            </Link>
        </div>
    );
};

export default PaymentCancel;