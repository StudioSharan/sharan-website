'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const ProjectsPage = () => {
  const navigate = useNavigate();

  // ✅ Sample project data
  const [projects, setProjects] = useState([
    {
      title: 'Moira-Goa',
      description:
        'A coastal home in Goa designed around courtyards, shaded verandas, and breezeways that frame the landscape and invite the monsoon in.',
      image: `${process.env.PUBLIC_URL}/images/projects/moira-goa/thumb.jpg`,
      route: '/projects/moira-goa',
    },
    {
      title: 'Siolim-Goa',
      description:
        'A workspace designed as an inward-looking courtyard volume that blends structure, light, and texture to create calm focus.',
      image: `${process.env.PUBLIC_URL}/images/projects/siolim-goa/thumb.jpg`,
      route: '/projects/siolim-goa',
    },
    {
      title: 'Valley House',
      description:
        'A stepped home on a hillside site, where each level frames panoramic views and connects to terraced gardens.',
      image: `${process.env.PUBLIC_URL}/images/projects/safdarjung-goa/thumb.png`,
      route: '/projects/safdarjung-goa',
    },
  ]);

  // Admin state
  const [isAdmin] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    thumbnail: null,
    images: [],
  });

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // File uploads
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewProject((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    setNewProject((prev) => ({ ...prev, images: files }));
  };

  // Add new project
  const handleSubmit = (e) => {
    e.preventDefault();

    const projectURL = newProject.thumbnail
      ? URL.createObjectURL(newProject.thumbnail)
      : '';

    const newEntry = {
      title: newProject.title,
      description: newProject.description,
      image: projectURL,
      route:
        '/projects/' + newProject.title.toLowerCase().replace(/\s+/g, '-'),
    };

    setProjects((prev) => [...prev, newEntry]);
    setIsModalOpen(false);
    setNewProject({ title: '', description: '', thumbnail: null, images: [] });
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src={`${process.env.PUBLIC_URL}/images/hero/projects-hero.jpg`}
            alt="Studio Sharan Projects"
            className="w-full h-full object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide text-white">
            PROJECTS
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Built environments and explorations that reflect context, climate,
            and craft — the architecture of Studio Sharan.
          </p>
        </motion.div>
      </section>

      {/* Project Grid */}
      <section className="py-24 px-8 md:px-20 bg-gray-50 text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Work
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              // ✅ Navigate instead of open new tab
              onClick={() => navigate(project.route)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admin Add Button */}
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl w-[90%] max-w-lg shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-light mb-6 text-center">
                Add New Project
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Additional Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImages}
                    className="w-full text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;
