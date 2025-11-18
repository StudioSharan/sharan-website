'use client';
import React, { useMemo, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const StudioPage = () => {
  const teamMembers = [
    {
      name: 'Aditya Mehta',
      role: 'Principal Architect',
      image: `${process.env.PUBLIC_URL}/images/team/aditya-mehta.jpeg`,
    },
    {
      name: 'Jahanzaib Bhat',
      role: 'Project Architect',
      image: `${process.env.PUBLIC_URL}/images/team/jahanzaib-bhat.jpg`,
    },
  ];

  // 👇 Provide 6 full-bleed images for the pinned sequence
  const studioImages = useMemo(
    () => [
      `${process.env.PUBLIC_URL}/images/studio/studio1.jpg`,
      `${process.env.PUBLIC_URL}/images/studio/studio2.jpg`,
      `${process.env.PUBLIC_URL}/images/studio/studio3.jpg`,
      `${process.env.PUBLIC_URL}/images/studio/studio4.jpg`,
      `${process.env.PUBLIC_URL}/images/studio/studio5.jpg`,
      `${process.env.PUBLIC_URL}/images/studio/studio6.jpg`,
    ],
    []
  );

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
            src={`${process.env.PUBLIC_URL}/images/hero/studio-hero.jpg`}
            alt="Studio Sharan"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide">
            THE STUDIO
          </h1>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 md:px-20 bg-white text-gray-800">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About the Studio
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-600 leading-relaxed text-lg">
            Founded with a focus on contextual and sustainable design, Studio Sharan explores
            architecture through materials, light, and spatial experience. Each project evolves
            through research, dialogue, and experimentation — reflecting a deep connection between
            people and place.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            The practice engages with diverse typologies: residential, hospitality, and public spaces.
            Our approach is grounded in simplicity, proportion, and a contemporary expression of
            local identity.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-8 md:px-20 bg-gray-100">
        <motion.h2
          className="text-3xl md:text-5xl font-light mb-10 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Team
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="relative w-full overflow-hidden bg-gray-200 aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-medium mb-1 text-gray-900">{member.name}</h3>
                <p className="text-sm text-violet-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======== PINNED CINEMATIC STUDIO SEQUENCE (6 IMAGES) ======== */}
      <PinnedStudioSequence images={studioImages} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

/* ------------------- PINNED SEQUENCE (B4-Pin, Replace mode) ------------------- */
const PinnedStudioSequence = ({ images }) => {
  const pinRef = useRef(null);

  // 100vh per image → total height images.length * 100vh
  const totalVH = `${images.length * 100}vh`;

  // Track scroll progress across the whole pinned block
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  // Motion configuration (tweak to taste)
  const cfg = {
    SLIDE_VW: 20,        // slide distance (vw)
    ENTER_PORTION: 0.65, // portion of each segment used to enter
    BLUR_FROM: 50,        // Medium blur (your choice)
    SCALE_FROM: 1.05,    // slight zoom that settles to 1
  };

  return (
    <section ref={pinRef} className="relative" style={{ height: totalVH }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Optional heading overlay */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center text-white/90">
          <h2 className="text-sm tracking-[0.2em]">INSIDE OUR STUDIO</h2>
        </div>

        {/* Render each frame as its own component (ESLint-safe hooks) */}
        {images.map((src, i) => (
          <StudioFrame
            key={i}
            index={i}
            count={images.length}
            src={src}
            progress={scrollYProgress}
            cfg={cfg}
          />
        ))}
      </div>
    </section>
  );
};

/* ------------------- ONE FRAME (ESLint-safe hooks at top) ------------------- */
const StudioFrame = ({ index, count, src, progress, cfg }) => {
  const segment = 1 / count;
  const start = index * segment;
  const enterEnd = start + segment * cfg.ENTER_PORTION;

  // For "Replace" mode, we fade out this frame as the next one starts entering
  const nextStart = Math.min(1, (index + 1) * segment);
  const nextEnterEnd = Math.min(1, nextStart + segment * cfg.ENTER_PORTION * 0.6);

  // Hybrid motion in (Slide + Fade + De-blur + De-scale)
  const x = useTransform(progress, [start, enterEnd], [`${cfg.SLIDE_VW}vw`, '0vw']);
  const scale = useTransform(progress, [start, enterEnd], [cfg.SCALE_FROM, 1]);
  const blur = useTransform(progress, [start, enterEnd], [cfg.BLUR_FROM, 0]);

  // Build CSS filter using useMotionTemplate (fixes .to error)
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  // Opacity timeline:
  // 0→1 during entry, hold 1 until next starts, then 1→0 as next enters (Replace mode)
  const opacity = useTransform(
    progress,
    [start, enterEnd, nextStart, nextEnterEnd],
    [0, 1, 1, index === count - 1 ? 1 : 0]
  );

  return (
    <motion.div className="absolute inset-0" style={{ zIndex: 10 + index }}>
      <motion.img
        src={src}
        alt={`Studio ${index + 1}`}
        className="w-full h-full object-cover object-center will-change-transform will-change-opacity"
        style={{
          x,
          scale,
          opacity,
          filter: blurFilter,
        }}
      />
      {/* Soft vignette to add depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_100%,rgba(0,0,0,0.35))]" />
    </motion.div>
  );
};

export default StudioPage;
