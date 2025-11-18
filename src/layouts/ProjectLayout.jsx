import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const ProjectLayout = ({ title, location, year, description, gallery, video, architects }) => {
  return (
    <div className="relative w-full min-h-screen text-gray-900">
      {/* 🔹 Fixed Background Image */}
      {gallery && gallery.length > 0 && (
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${gallery[0].src})`,
            filter: "brightness(0.65)",
          }}
        ></div>
      )}

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* 🔹 Hero Title */}
      <div className="relative z-20 flex flex-col justify-end min-h-screen px-10 md:px-24 pb-24">
        <h1 className="text-white text-6xl md:text-8xl font-light mb-4">{title}</h1>
        <p className="text-gray-300 text-lg italic">
          {location} &middot; {year}
        </p>
      </div>

      {/* 🔹 Content Scroll Section */}
      <div className="relative z-30 bg-white text-gray-800 -mt-24 pt-24 pb-32 shadow-2xl overflow-hidden">
        {/* Intro */}
        {description && (
          <p className="max-w-6xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-left px-6 md:px-8 mb-16 text-gray-700">
            {description}
          </p>
        )}

        {/* 📸 Image Gallery */}
        <div className="flex flex-col -space-x-0">
          {gallery &&
            gallery.slice(1).map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    isLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image — flush to side */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-8 md:pl-0" : "md:pl-8 md:pr-0"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={`${title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`w-full md:w-1/2 px-10 md:px-20 flex flex-col justify-center text-center md:text-left ${
                      isLeft ? "md:items-start" : "md:items-end"
                    }`}
                  >
                    <div className={`${isLeft ? "md:text-left" : "md:text-right"}`}>
                      <h3 className="text-2xl font-medium mb-2">{`View ${index + 1}`}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {item.caption || `This image showcases an architectural detail of ${title}.`}
                      </p>
                      <p className="text-gray-400 text-sm mt-3 italic">Captured in {year}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* 🎥 Project Video Section */}
        <section className="mt-40 text-center px-8 md:px-24">
          <h2 className="text-3xl font-light mb-6">Project Walkthrough</h2>
          <p className="text-gray-600 mb-8">
            A short film exploring the design, context, and atmosphere of the project
          </p>

          {video ? (
            <>
              {video.type === "local" && (
                <video
                  src={video.src}
                  poster={video.thumbnail}
                  controls
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}

              {video.type === "youtube" && (
                <div className="w-full h-[500px]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.src}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  ></iframe>
                </div>
              )}

              {video.type === "vimeo" && (
                <div className="w-full h-[500px]">
                  <iframe
                    src={`https://player.vimeo.com/video/${video.src}`}
                    title="Vimeo video player"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  ></iframe>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[500px] bg-black flex items-center justify-center text-gray-300 text-xl font-light rounded-2xl">
              [ Video Placeholder ]
            </div>
          )}
        </section>

        {/* 🧱 3D Model Viewer */}
        <section className="mt-40 text-center px-8 md:px-24">
          <h2 className="text-3xl font-light mb-6">3D Model Viewer</h2>
          <p className="text-gray-600 mb-8">
            Interactive 3D representation of the project (coming soon)
          </p>

          <div className="w-full h-[500px] bg-gray-100 shadow-inner overflow-hidden rounded-2xl">
            <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 5, 2]} />
              <Suspense fallback={null}>
                <mesh rotation={[0.4, 0.4, 0]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#555" />
                </mesh>
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>
        </section>

        {/* Credits */}
        {architects && architects.length > 0 && (
          <footer className="text-center text-gray-500 mt-32 text-sm">
            <p>Designed by {architects.join(" & ")}</p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default ProjectLayout;
