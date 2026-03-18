import React from 'react';

const features = [
  {
    title: "Nationwide Coverage",
    desc: "Seamless fiber-optic connectivity across 64 districts with redundant backup paths.",
    icon: "🌐",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Fast & Stable Speed",
    desc: "Ultra-low latency optimized for competitive gaming and 4K buffer-free streaming.",
    icon: "🚀",
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Affordable Packages",
    desc: "Premium internet shouldn't break the bank. Flexible plans for every budget.",
    icon: "💰",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "24/7 Expert Support",
    desc: "Real humans, real solutions. Our technical team is always a call away.",
    icon: "🎧",
    color: "bg-purple-50 text-purple-600"
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* CENTERED HEADER - This is what was missing! */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Why choose <span className="text-blue-700">Vibe</span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mt-4 rounded-full"></div>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl">
            We aren't just an ISP. We are your partner in the digital world, providing the most reliable broadband across Bangladesh.
          </p>
          <button className="btn btn-primary btn-sm rounded-full mt-6 px-8 shadow-lg shadow-blue-200">
            View All Features
          </button>
        </div>

        {/* CENTERED GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-center">
          {features.map((f) => (
            <div 
                key={f.title} 
                className="group p-8 rounded-[2rem] bg-slate-50 border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 border transition-transform duration-500 group-hover:scale-110 ${f.color}`}>
                {f.icon}
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-800 mb-3">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}