import React from 'react';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
import usePayroll from '../../../Hooks/usePayroll';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminPayment = () => {
    const [, paymentRequests] = usePayroll();
    const axiosSecure=useAxiosSecure();
    // console.log(paymentRequests);
    const handlePayment=async(payingUser)=>{
        try{
            const userData={
                id:payingUser._id,
                name:payingUser.name,
                email:payingUser.email,
                salary:payingUser.salary,
                month:payingUser.month,
                year:payingUser.year
            }
            const res=await axiosSecure.post('http://localhost:5001/create-checkout-session',userData);
            console.log(res.data);
            if(res.data?.id){
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = res.data.url;
            }
        }
        catch(error){
            console.log("ERROR: ",error.message);
        }
    }
    return (
        <div>
            <SectionHeading heading="Pay The Employees"></SectionHeading>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentRequests && paymentRequests.map((payingUser, index) =>
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={payingUser.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{payingUser.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {payingUser.salary}
                                    </td>
                                    <td>
                                        {payingUser.month}
                                    </td>
                                    <th>
                                        {payingUser.year}
                                    </th>
                                    <th>
                                        <button 
                                        onClick={()=>handlePayment(payingUser)}
                                        className='btn btn-sm text-white bg-blue-600'>Pay</button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminPayment;