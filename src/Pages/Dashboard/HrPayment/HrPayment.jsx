import React from 'react';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
import usePayroll from '../../../Hooks/usePayroll';

const HrPayment = () => {
    const [, paymentRequests] = usePayroll();
    return (
        <div>
            <SectionHeading heading="Payment requests"></SectionHeading>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentRequests && paymentRequests.map((payingUser, index) =>
                                <tr>
                                    <th>
                                        {index+1}
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
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default HrPayment;