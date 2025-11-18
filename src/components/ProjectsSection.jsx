import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 🎛️ Customize these:
const AUTO_SWIPE_INTERVAL = 3000; // milliseconds — change this for auto-swipe speed
const CAROUSEL_HEIGHT = "60vh"; // can be "400px", "70vh", etc.

// 🧱 Sample project data
const sampleProjects = [
  {
    id: 1,
    title: "Hillside Retreat",
    description: "A modern home designed along a gentle Goan slope.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 2,
    title: "Tropical Villa",
    description: "A minimalist tropical villa surrounded by lush greenery.",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 3,
    title: "Urban Courtyard House",
    description: "An urban oasis with an open central courtyard.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=2000&q=80",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto swipe
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, AUTO_SWIPE_INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleProjects.length) % sampleProjects.length);
  };

  return (
    <motion.section
      id="projects"
      className="relative bg-[#faf9f8] py-16 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-10">
        FEATURED PROJECTS
      </h2>

      {/* Carousel Container */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: CAROUSEL_HEIGHT }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={sampleProjects[currentIndex].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={sampleProjects[currentIndex].image}
              alt={sampleProjects[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end text-white p-8">
              <h3 className="text-2xl font-semibold">{sampleProjects[currentIndex].title}</h3>
              <p className="text-sm sm:text-base opacity-90">{sampleProjects[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left/Right Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full shadow-md transition-all z-20"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full shadow-md transition-all z-20"
        >
          ▶
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {sampleProjects.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
