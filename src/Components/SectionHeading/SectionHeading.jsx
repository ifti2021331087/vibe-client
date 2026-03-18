import React from 'react';

const SectionHeading = ({ heading}) => {
    return (
        <div className="relative mb-12 text-center group">
            <span className="absolute left-0 right-0 hidden tracking-widest uppercase -top-4 opacity-3 md:block text-7xl select-none">
                {heading}
            </span>
            <h2 className="relative z-10 font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100">
                <span className="text-2xl md:text-4xl lg:text-5xl">
                    {heading}
                </span>
            </h2>
            <div className="flex items-center justify-center mt-4">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                <div className="mx-3 text-primary">
                    <div className="w-2 h-2 rotate-45 border-2 border-primary"></div>
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
            </div>
        </div>
    );
};

export default SectionHeading;