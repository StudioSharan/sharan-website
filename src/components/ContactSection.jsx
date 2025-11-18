import React from "react";
import { motion } from "framer-motion";
import "./font.css"; // contains Monument Extended font styles

const ContactSection = () => {
  return (
    <section className="py-20 bg-transparent backdrop-blur-sm rounded-xl shadow-inner mt-10 border border-white/10">
      <div className="max-w-2xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          className="core-services-title text-4xl text-center mb-12 font-bold text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          GET IN TOUCH
        </motion.h2>

        {/* Contact Form */}
        <form className="space-y-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <label
              htmlFor="name"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 bg-white/80 text-gray-900 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Your Name"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 bg-white/80 text-gray-900 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label
              htmlFor="message"
              className="block text-gray-800 text-sm font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              className="w-full border border-gray-300 bg-white/80 text-gray-900 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Tell us about your project..."
            ></textarea>
          </motion.div>

          {/* Submit Button with Dark Blur + Shine */}
          <motion.button
            type="submit"
            className="relative w-full bg-black/40 backdrop-blur-md text-white font-bold py-3 rounded-lg overflow-hidden transition-all duration-300 border border-white/10 hover:bg-black/60"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="relative z-10">Send Message</span>
            {/* Shiny overlay */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
              translate-x-[-100%] animate-[shine_3s_linear_infinite]"
            />
          </motion.button>
        </form>
      </div>

      {/* Inline keyframes for shine effect */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
