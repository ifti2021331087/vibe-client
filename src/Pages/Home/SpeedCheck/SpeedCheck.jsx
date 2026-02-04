import React from 'react';
import img from '../../../assets/bandwidth-meter.png'
const SpeedCheck = () => {
    return (
        <div className='flex flex-col gap-4 items-center my-10'>
            <h1 className='text-xl md:text-3xl font-bold text-center'>Are you getting what you are paying for?</h1>
            <div className='w-100px h-100px'>
                <img className="object-cover" src={img} alt="" />
            </div>
            {/* TO-DO */}
            <button className='btn '>Check Now</button>
            <h1 className='text-2xl md:text-5xl font-bold text-center'>What is my <span className='text-blue-800'>current internet speed?</span></h1>
        </div>
    );
};

export default SpeedCheck;