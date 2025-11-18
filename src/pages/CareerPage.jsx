'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const CareerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    message: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert('Application submitted successfully!');
  };

  const vacancies = [
    {
      title: 'Junior Architect',
      location: 'Moira, Goa',
      type: 'Full-time',
      description:
        'We are looking for a motivated architect with strong design sensibilities, software proficiency, and an eagerness to learn. Prior experience in residential or hospitality projects is a plus.',
    },
    {
      title: '3D Visualizer',
      location: 'Moira, Goa / Remote',
      type: 'Contract',
      description:
        'Seeking a talented 3D artist proficient in rendering software such as Twinmotion, V-Ray, or Enscape. The candidate should have an eye for light, materials, and spatial storytelling.',
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/hero/career-hero.png`}
            alt="Careers at Studio Sharan"
            className="w-full h-full object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide text-white">
            CAREERS
          </h1>
        </motion.div>
      </section>

      {/* Vacancies Section */}
      <section className="py-24 px-8 md:px-20 bg-gray-50 text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Current Openings
        </motion.h2>

        <div className="space-y-10">
          {vacancies.map((job, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <h3 className="text-2xl font-medium mb-2">{job.title}</h3>
              <p className="text-sm text-violet-600 mb-3">
                {job.location} · {job.type}
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-24 px-8 md:px-20 bg-white text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Apply Now
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <label className="block text-sm text-gray-600 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Position Applying For</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Why do you want to join us?</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Upload Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition duration-300"
            whileTap={{ scale: 0.97 }}
          >
            Submit Application
          </motion.button>
        </motion.form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CareerPage;
