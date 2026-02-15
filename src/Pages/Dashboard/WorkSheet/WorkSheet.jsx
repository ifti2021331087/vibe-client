import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../../Providers/AuthProvider';
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import useWorks from '../../../Hooks/UseWorks';

const WorkSheet = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const { works, refetch } = useWorks();
    console.log(user);
    console.log(works);
    const onSubmit = (data) => {
        const newEntry = { ...data, email: user?.email };
        axios.post('http://localhost:5001/works', newEntry)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
        reset(); // Reset form
    };

    return (
        <div className="min-h-screen py-10">
            <div className="mx-auto w-full max-w-6xl px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center">Work Sheet</h1>

                {/* Form card */}
                <div className="mt-10 rounded-xl bg-base-100 p-6 shadow">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end"
                    >
                        <div className="flex flex-col">
                            <label className="label">Task</label>
                            <select
                                defaultValue=""
                                {...register("task", { required: "Task is required" })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">Pick a task</option>
                                <option>Sales</option>
                                <option>Support</option>
                                <option>Paper-work</option>
                                <option>Marketing</option>
                                <option>Development</option>
                                <option>Research</option>
                            </select>
                            {errors.task && <span className="text-red-600 mt-1">{errors.task.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Hours worked</label>
                            <input
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                {...register("workHour", {
                                    required: "Working hour is required",
                                    min: { value: 0, message: "Working hour must be a positive number" },
                                })}
                            />
                            {errors.workHour && <span className="text-red-600 mt-1">{errors.workHour.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label className="label">Date</label>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: "Choose your working date" }}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="MMMM d, yyyy"
                                        className="input input-bordered w-full"
                                        placeholderText="Select date"
                                    />
                                )}
                            />
                            {errors.date && <span className="text-red-600 mt-1">{errors.date.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full md:w-auto">
                            Add
                        </button>
                    </form>
                </div>

                {/* Table card */}
                <div className="mt-10 rounded-xl bg-base-100 p-6 shadow">
                    <h2 className="text-2xl md:text-4xl font-bold text-center">Work Entries</h2>

                    <div className="mt-4 overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Hours</th>
                                    <th>Date</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.length > 0 && works.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.task}</td>
                                        <td>{entry.workHour}</td>
                                        <td>{entry.date?.toString()}</td>
                                        <td className="text-right">
                                            <button className="btn btn-sm mr-2 bg-sky-500">
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-sm bg-red-400">
                                                <ImCross />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkSheet;