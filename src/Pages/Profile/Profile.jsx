import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user } = useContext(AuthContext);
    console.log(user);
    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        const updatedDoc = {
            bankAccountNo: data.bankAccountNo,
            designation: data.designation,
            salary: data.salary
        }
        axios.patch(`http://localhost:5001/users?email=${user.email}`, updatedDoc)
            .then(res => {
                // console.log(res);
                if(res.data.modifiedCount>0){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is updated to the menu`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="min-h-screen my-10">
            <h1 className="text-5xl font-bold text-center">Update your profile</h1>
            <div className="text-center mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                    <div className="flex flex-col items-start">
                        <label className="label mr-2">Bank account No</label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input w-full"
                            {...register('bankAccountNo', { required: 'Bank account number is required' })}
                        />
                        {errors.bankAccountNo && <span className="text-red-600 mt-1">{errors.bankAccountNo.message}</span>}
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="label mr-2">Salary</label>
                        <input
                            type="number"
                            placeholder="Type here"
                            className="input w-full"
                            {...register('salary', {
                                required: 'Salary is required',
                                min: { value: 0, message: 'Salary must be a positive number' },
                            })}
                        />
                        {errors.salary && <span className="text-red-600 mt-1">{errors.salary.message}</span>}
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="label mr-2">Designation</label>
                        <select {...register("designation", { required: 'Designation is required' })} defaultValue="Your designation" className="select select-success w-full">
                            <option disabled={true}>Select your designation</option>
                            <option value="sales">Sales Assistant</option>
                            <option value="social">Social Media executive</option>
                            <option value="digitalMarketing">Digital Marketing</option>
                        </select>
                        {errors.designation && <span className="text-red-600 mt-1">{errors.designation.message}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;