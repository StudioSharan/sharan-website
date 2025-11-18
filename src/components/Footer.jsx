'use client';
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo + Description */}
        <div className="space-y-5">
          <img
            src={`${process.env.PUBLIC_URL}/images/LOGO.svg?v=${Date.now()}`}
            alt="Studio Sharan Logo"
            className="h-10 brightness-0 invert"
          />
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Studio Sharan is an architecture and design practice based in Goa and New Delhi,
            working across scales with a focus on context, materiality, and experience.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/studio" className="hover:text-white transition-colors duration-300">
                Studio
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-white transition-colors duration-300">
                Projects
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition-colors duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition-colors duration-300">
                Insights
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Contact</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="mailto:studio@studiosharan.in"
                className="hover:text-white transition-colors duration-300"
              >
                studio@studiosharan.in
              </a>
            </li>
            <li>Moira, Goa, India</li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Connect</h2>
          <div className="flex space-x-6 text-2xl">
            <a
              href="https://instagram.com/jzbstudioz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/jzb-studioz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/JZBstudioz?t=KWTQHY79lZAF_OakwoiHxg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Studio Sharan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
