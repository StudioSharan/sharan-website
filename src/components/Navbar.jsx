import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Mixer Ai", path: "/ai" },
    { name: "Projects", path: "/projects" },
    { name: "Elements", path: "/elements" },
    { name: "Blog", path: "/blog" },
    { name: "Studio", path: "/studio" },
    { name: "Contact", path: "/contact" },
  ];

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // hide navbar when scrolling down
      } else {
        setVisible(true); // show when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main Floating Dock */}
      <motion.nav
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-6 inset-x-0 z-50 mx-auto
          flex items-center justify-between 
          rounded-2xl border border-white/25 shadow-lg 
          px-8 py-3 w-[90%] md:w-[85%] lg:w-[75%]
          transition-all duration-500 
          bg-black/20 backdrop-blur-2xl`}
        style={{
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold tracking-wide text-gray-200 whitespace-nowrap"
        >
          Studio Sharan
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative font-medium transition 
                ${
                  item.name === "Mixer Ai"
                    ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-[length:200%_200%] text-transparent bg-clip-text animate-gradientGlow drop-shadow-[0_0_6px_rgba(180,100,255,0.6)]"
                    : "text-gray-200 hover:text-gray-100"
                }
                ${
                  location.pathname === item.path
                    ? "after:w-full"
                    : "after:w-0"
                }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:bg-white after:transition-all after:duration-300`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-black/20 hover:bg-black/20 transition"
        >
          {menuOpen ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[80px] left-1/2 -translate-x-1/2 z-40 
              w-[90%] md:w-[85%] lg:w-[75%] max-w-[1200px]
              bg-black/30 border border-white/20 backdrop-blur-2xl
              rounded-2xl shadow-lg p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-white font-medium text-lg ${
                  location.pathname === item.path ? "text-white" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Animation Style */}
      <style>{`
        @keyframes gradientGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientGlow {
          animation: gradientGlow 4s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
