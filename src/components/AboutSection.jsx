import React from "react";
import { motion } from "framer-motion";
import "./font.css"; // import the font styles

const AboutSection = () => {
  return (
    <section className="py-20 mt-10 relative z-10">
      <div
        className="w-[90%] max-w-7xl mx-auto px-10 text-center 
        bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-14"
      >
        {/* Title */}
        <motion.h2
          className="core-services-title text-5xl mb-8 font-bold text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          THE STUDIO
        </motion.h2>

        {/* Underline */}
        <motion.div
          className="h-1 w-32 bg-blue-500 mx-auto mb-10 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Studio Image */}
        <motion.img
          src={process.env.PUBLIC_URL + "/images/studio.jpg"} // place your image in public/images/studio.jpg
          alt="Studio"
          className="mx-auto rounded-2xl shadow-lg mb-12 max-h-[400px] object-cover"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Text content */}
        <motion.div
          className="text-xl leading-relaxed text-black/90 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>
            At <strong>Your Firm Name</strong>, we believe architecture is more
            than just buildings; it's about crafting experiences, fostering
            communities, and shaping the future. With a passion for innovative
            design and sustainable practices, we transform visions into
            realities.
          </p>
          <p>
            Founded in 20XX, our firm has grown into a collaborative hub of
            talented architects, designers, and engineers. We pride ourselves on
            a client-centric approach, ensuring every project reflects the
            unique aspirations and functional needs of its inhabitants.
          </p>
          <p>
            From groundbreaking urban developments to serene private residences,
            our portfolio showcases a commitment to excellence and environmental
            responsibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
