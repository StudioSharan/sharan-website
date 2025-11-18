// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ScrollToTop from "./ScrollToTop";
import Navbar from "./components/Navbar";



import Homepage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import StudioPage from "./pages/StudioPage";
import CareerPage from "./pages/CareerPage";
import BlogPage from "./pages/BlogPage";
import ElementsPage from "./pages/ElementsPage";
import MaterialMixerApp from "./pages/Ai.jsx";



// ✅ Import individual project pages
import MoiraGoa from "./projects/MoiraGoa.jsx";
import SiolimGoa from "./projects/SiolimGoa.jsx";
// ✅ Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const navbarVariants = {
  initial: { y: 0, opacity: 1 },
  exit: { y: -80, opacity: 0 },
  enter: { y: 0, opacity: 1 },
};

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      {/* ✅ Navbar Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key="navbar"
          variants={navbarVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          <Navbar />
        </motion.div>
      </AnimatePresence>

      {/* ✅ Page Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/elements" element={<ElementsPage />} />
            <Route path="/ai" element={<MaterialMixerApp />} />

            {/* ✅ Individual Project Route */}
            <Route path="/projects/moira-goa" element={<MoiraGoa />} />
            <Route path="/projects/siolim-goa" element={<MoiraGoa />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
