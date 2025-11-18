'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-white"
      >
        <div className="absolute inset-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/hero/contact-hero.jpg`}
            alt="Contact Studio Sharan"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* dark overlay */}
        </div>

        <motion.div
          className="relative z-10 text-center px-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            CONTACT US
          </h1>
        </motion.div>
      </section>

      {/* Contact Info + Form + Map Section */}
      <section className="py-24 px-8 md:px-20 bg-white text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-6 lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-medium text-gray-900">Studio Sharan</h3>
            <p className="text-gray-600 leading-relaxed">
              Moira, Goa <br />
              India
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Email:</span> studio@studiosharan.in
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Phone:</span> +91 99999 99999
            </p>
          </motion.div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Google Map */}
        <motion.div
          className="mt-20 w-full h-[450px] rounded-xl overflow-hidden shadow-lg max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d868.0672978382997!2d77.23322238391768!3d28.550453210001447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1762256781690!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
