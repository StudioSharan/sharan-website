'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
  const blogs = [
    {
      title: 'Designing with Context in Mind',
      date: 'October 15, 2025',
      image: `${process.env.PUBLIC_URL}/images/blog/context-design.jpg`,
      excerpt:
        'How site, climate, and culture shape the foundation of every architectural decision we make at Studio Sharan.',
    },
    {
      title: 'Material Honesty in Architecture',
      date: 'September 10, 2025',
      image: `${process.env.PUBLIC_URL}/images/blog/material-honesty.jpg`,
      excerpt:
        'Exploring how materials tell stories — from local stone and exposed concrete to reclaimed wood and handmade tiles.',
    },
    {
      title: 'The Poetics of Light',
      date: 'August 22, 2025',
      image: `${process.env.PUBLIC_URL}/images/blog/light-poetics.jpg`,
      excerpt:
        'Light defines space. Discover how natural illumination and shadow form the emotional language of our built work.',
    },
  ];

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/hero/blog-hero.png`}
            alt="Studio Sharan Blog Hero"
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
          <h1 className="text-4xl md:text-6xl font-light mb-4 text-white tracking-wide">
            INSIGHTS
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Reflections, ideas, and stories from Studio Sharan — exploring architecture, process, and design philosophy.
          </p>
        </motion.div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-24 px-8 md:px-20 bg-gray-50 text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Studio Journal
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-violet-600 mb-2">{blog.date}</p>
                <h3 className="text-xl font-medium mb-3 text-gray-900">{blog.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
                <button className="text-violet-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPage;
