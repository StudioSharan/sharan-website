import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServiceSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#f8f8f5" }} // ✅ Off-white background
    >
      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <ServiceSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
