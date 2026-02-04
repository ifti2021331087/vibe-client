import React from 'react';

const Role = () => {
    return (
        <div className='text-center my-10'>
            <h1 className='text-5xl font-bold'>Choose a role for yourself.</h1>
            <select defaultValue="Pick a role" className="select select-success">
                <option disabled={true}>Pick a role</option>
                <option>Employee</option>
                <option>HR</option>
            </select>
        </div>
    );
};

export default Role;