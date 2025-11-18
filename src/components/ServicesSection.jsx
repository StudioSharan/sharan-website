import React, { useState } from "react";
import { motion } from "framer-motion";
import "./font.css"; // we'll define the Monument Extended font here

const ServicesSection = () => {
  const services = [
    {
      name: "Architectural Design",
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    },
    {
      name: "Urban Planning",
      icon: "M17 14v6m-3-3h6m-3 3V8m-3 3h6m-3 3V2",
    },
    { name: "Interior Design", icon: "M5 3l14 9-14 9V3z" },
    {
      name: "Sustainable Solutions",
      icon: "M12 1L3 6v6l9 5 9-5V6l-9-5zm0 14.99V23",
    },
  ];

  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      index,
    });
  };

  return (
    <section className="py-20 bg-transparent backdrop-blur-sm border border-gray-200 rounded-xl shadow-inner mt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          className="core-services-title text-4xl text-center mb-12 font-bold text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          EXPERTISE
        </motion.h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {/* Spotlight Effect */}
              {lightPos.index === index && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at ${lightPos.x}px ${lightPos.y}px, rgba(0,0,0,0.08), transparent 80%)`,
                    transition: "background 0.05s ease",
                  }}
                ></div>
              )}

              {/* Icon */}
              <div className="w-20 h-20 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mb-4 relative z-10">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={service.icon}
                  ></path>
                </svg>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-semibold text-black mb-2 relative z-10">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm relative z-10">
                Comprehensive solutions from concept to completion, tailored to your needs.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
