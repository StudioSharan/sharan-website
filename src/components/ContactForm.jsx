'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // You can integrate emailjs or backend API here
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Get In Touch
      </h2>

      {/* Input Container */}
      {["name", "email", "subject"].map((field) => (
        <div key={field} className="relative">
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="peer w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder=" "
          />
          <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
            peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-violet-500 bg-white px-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}

      {/* Message Box */}
      <div className="relative">
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
        ></textarea>
        <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-violet-500 bg-white px-1">
          Message
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: !loading && 1.04 }}
        whileTap={{ scale: !loading && 0.97 }}
        className={`w-full text-white px-8 py-3 rounded-lg font-medium shadow 
        transition-all duration-300 flex items-center justify-center
        ${loading ? "bg-violet-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}`}
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="border-2 border-white border-t-transparent w-5 h-5 rounded-full"
          />
        ) : (
          "Send Message"
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
