import React from 'react';

const features = [
  {
    title: "Nationwide Coverage",
    desc: "Broadband connectivity across Bangladesh with expanding network reach.",
    icon: "📍",
  },
  {
    title: "Fast & Stable Speed",
    desc: "Smooth streaming, gaming, and work with reliable performance.",
    icon: "⚡",
  },
  {
    title: "Affordable Packages",
    desc: "Flexible plans for home users and businesses.",
    icon: "💳",
  },
  {
    title: "Quick Support",
    desc: "Fast installation and responsive customer care when you need it.",
    icon: "🛠️",
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Why choose Vibe</h2>
          <p className="mt-3 text-base-content/70">
            Broadband built for homes and businesses across Bangladesh.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card bg-base-100 shadow-md border border-base-200">
              <div className="card-body">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="card-title mt-2">{f.title}</h3>
                <p className="text-base-content/70">{f.desc}</p>

                <div className="card-actions mt-4">
                  {/* TO-DO */}
                  <button className="btn btn-primary btn-sm">Learn more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
