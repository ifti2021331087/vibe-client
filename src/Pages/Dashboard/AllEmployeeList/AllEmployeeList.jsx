import React from 'react';
import AllUsers from '../../../Hooks/AllUsers';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
import { MdVerified } from 'react-icons/md';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllEmployeeList = () => {
    const { refetch, users } = AllUsers();
    const allEmployee = users?.filter(user => user.role !== 'admin') || [];
    const axiosSecure=useAxiosSecure();
    const handleHR = async (employee) => {
        const newRole = employee.role === "Employee" ? "HR" : "Employee";
        
        try {
            const response = await axiosSecure.patch(`http://localhost:5001/users?email=${employee.email}`, {
                role: newRole
            });
            
            if (response.data.modifiedCount > 0) {
                refetch(); // Refresh the list from the server
            }
        } catch (err) {
            console.error("Failed to update role", err);
        }
    }
    const handleFired=(employee)=>{
        const newIsFired=!employee.isFired;
        try{
            axiosSecure.patch(`http://localhost:5001/users?email=${employee.email}`,{
                isFired:newIsFired
            }).then(res=>{
                if(res.data.modifiedCount>0){
                    refetch();
                }
            })
        }
        catch(error){
            console.log("Failed due to ",{error});
        }
    }
    return (
        <div>
            <SectionHeading heading="All Employee Details"></SectionHeading>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Make HR</th>
                            <th>Fire</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEmployee && allEmployee.map((employee, index) =>
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={employee.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
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
                                        onClick={() => handleHR(employee)}
                                        className={`btn btn-sm ${employee.role==='Employee' ? 'bg-green-400' : 'bg-blue-400'}`}
                                    >
                                        <MdVerified />
                                        {employee.role}
                                    </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={()=>handleFired(employee)}
                                            className={`btn btn-sm ${employee.isFired?'bg-red-400':'bg-green-400'}`}
                                        >  
                                        {employee.isFired?"FIRED":"ALLOWED"}
                                        </button>
                                    </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
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

export default AllEmployeeList;