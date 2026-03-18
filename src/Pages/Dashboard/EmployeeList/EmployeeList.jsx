import React, { useState } from 'react';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
import AllUsers from '../../../Hooks/AllUsers';
import { MdVerified } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const EmployeeList = () => {
    const { refetch, users } = AllUsers();
    const [requestUser, setRequestUser] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const axiosSecure=useAxiosSecure();
    const employees = users?.filter(user => user.role === 'Employee') || [];

    const handleVerify = async (employee) => {
        try {
            const response = await axiosSecure.patch(`http://localhost:5001/users?email=${employee.email}`, {
                isVerified: !employee.isVerified, 
            });
            
            if (response.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Verification Updated",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        } catch (err) {
            console.error("Verification failed", err);
        }
    }

    const handlePaymentRequest = async () => {
        if (!requestUser || !month || !year) return;

        const userInfo = {
            name: requestUser.name,
            photoURL: requestUser.photoURL,
            email: requestUser.email,
            salary: requestUser.salary,
            month: month,
            year: year,
            paymentDate: null,
            status: "Pending",
            transactionId: '',
        }

        try {
            const res = await axiosSecure.post('http://localhost:5001/payroll', userInfo);
            if (res.data.insertedId) {
                Swal.fire("Success", "Payment Request Sent", "success");
                setMonth('');
            }
        } catch (error) {
            Swal.fire("Error", "Request already exists or server error", {error});
        }
    }

    return (
        <div className="p-4">
            <SectionHeading heading="Employee List" />
            <div className="overflow-x-auto mt-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Verified</th>
                            <th>Salary</th>
                            <th>Bank Account</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={employee.photoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{employee.name}</div>
                                            <div className="text-sm opacity-50">{employee.designation}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleVerify(employee)}
                                        className={`btn btn-sm text-white ${employee.isVerified ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        <MdVerified />
                                    </button>
                                </td>
                                <td>${employee.salary}</td>
                                <td>{employee.bankAccountNo}</td>
                                <th>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        disabled={!employee.isVerified || !employee.salary || !employee.bankAccountNo}
                                        onClick={() => {
                                            setRequestUser(employee);
                                            document.getElementById('my_modal_5').showModal();
                                        }}
                                    >PAY</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Payroll for {requestUser?.name}</h3>
                    <p className="py-2">Salary: ${requestUser?.salary}</p>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className='block font-semibold'>Month</label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="select select-bordered w-full">
                                <option value="" disabled>Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div>
                            <label className='block font-semibold'>Year</label>
                            <input 
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                type="number" 
                                className="input input-bordered w-full" 
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            <button className="btn">Cancel</button>
                            <button
                                disabled={!month || !year}
                                onClick={handlePaymentRequest}
                                className="btn btn-success text-white"
                            >Confirm Request</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EmployeeList;