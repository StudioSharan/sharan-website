'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// --- Three.js Setup (Assumed to be globally available via CDN like r128) ---
// Note: We rely on the global 'THREE' object available in the environment.
const THREE = typeof window !== 'undefined' ? window.THREE : null;

// ----------------------------------------------------------------------------
// 1. MatrixText Component - Handles the falling green character effect AND the text scramble/reveal
// ----------------------------------------------------------------------------

/**
 * Renders text with a dynamic Matrix-style falling character background on a canvas.
 * Now includes a text scramble and reveal effect based on time, triggered by visibility.
 * @param {string} text - The static text to display, which will be revealed.
 * @param {string} className - Tailwind CSS classes for the container.
 * @param {string} textColor - Hex color for the main text display.
 * @param {number} fontSize - Base font size for the displayed text.
 * @param {boolean} isVisible - True when the parent element is in the viewport.
 */
const MatrixText = ({ text, className, textColor = '#3ba7ffff', fontSize = 16, isVisible }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Ref to manage the animation state (mutable across renders)
    const animationRef = useRef({
        animationFrameId: null,
        // Using -1 as a flag: 0=not started/not visible, -1=ready to start, >0=start timestamp
        revealStartTimestamp: 0, 
    });

    // Use ResizeObserver to keep the canvas sized to its container
    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setCanvasSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        resizeObserver.observe(container);
        
        // Initial size check
        setCanvasSize({
            width: container.clientWidth,
            height: container.clientHeight,
        });

        return () => resizeObserver.disconnect();
    }, []);

    // Matrix Rain and Text Scramble Animation Loop
    useEffect(() => {
        if (canvasSize.width === 0 || canvasSize.height === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_~`!@#$%^&*()';

        // Set canvas dimensions
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        // --- Conditional Start Trigger: Only set flag if visible AND not yet started ---
        if (isVisible && animationRef.current.revealStartTimestamp === 0) {
            // Set flag to -1 to indicate it's ready to start on the next frame
            animationRef.current.revealStartTimestamp = -1; 
        }

        const finalRenderLoop = (timestamp) => {
            const current = animationRef.current;

            // 1. Initial Start: If the flag is set to -1, initialize the actual start time
            if (current.revealStartTimestamp === -1) {
                current.revealStartTimestamp = timestamp;
            }

            // 2. Loop Stop Condition: If the reveal hasn't been initiated yet, clear and continue loop
            if (current.revealStartTimestamp <= 0) {
                // Clear canvas and keep looping (needed for when canvas resizes while not visible)
                ctx.clearRect(0, 0, canvas.width, canvas.height); 
                current.animationFrameId = requestAnimationFrame(finalRenderLoop);
                return;
            }

            // --- 1. Clear Canvas ---
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // --- 2. Text Reveal Logic (runs on every frame for smooth scramble) ---
            const elapsed = timestamp - current.revealStartTimestamp;
            const charDelay = 100; // Delay between character starts (in ms)

            let stringToDraw = '';
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const charRevealStart = i * charDelay;
                
                let displayChar;
                
                // Allow 500ms for the character to scramble before settling
                if (elapsed > charRevealStart + 500) { 
                    // Fully revealed
                    displayChar = char;
                } else if (elapsed > charRevealStart) {
                    // Scrambling (changes on every frame for a fast scramble look)
                    displayChar = characters.charAt(Math.floor(Math.random() * characters.length));
                } else {
                    // Not started yet
                    displayChar = ' '; 
                }
                stringToDraw += displayChar;
            }
            
            // Draw the composed string (left-aligned)
            ctx.globalAlpha = 1.0;
            ctx.textAlign = 'left'; 
            ctx.textBaseline = 'middle';
            const textX = 10; 
            const textY = canvas.height / 2; 
            
            // Text shadow/outline for contrast
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.font = `900 ${fontSize}px Inter, monospace`; 

            // Draw the shadow/outline
            ctx.strokeText(stringToDraw, textX, textY);
            
            // Draw the main text
            ctx.fillStyle = textColor; 
            ctx.fillText(stringToDraw, textX, textY);

            // --- 3. Loop Control ---
            current.animationFrameId = requestAnimationFrame(finalRenderLoop);
        };

        // Start the loop if it's not already running
        if (!animationRef.current.animationFrameId) {
            animationRef.current.animationFrameId = requestAnimationFrame(finalRenderLoop);
        }

        return () => {
            // Cleanup: Stop the loop when dependencies change or component unmounts
            if (animationRef.current.animationFrameId) {
                cancelAnimationFrame(animationRef.current.animationFrameId);
                animationRef.current.animationFrameId = null;
            }
            // IMPORTANT: Do NOT reset revealStartTimestamp here, so the animation doesn't repeat on scroll back up.
        };
    }, [canvasSize, text, textColor, fontSize, isVisible]); // isVisible is the new key dependency

    return (
        <div 
            ref={containerRef} 
            className={`relative overflow-hidden flex items-center justify-center ${className}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

// ----------------------------------------------------------------------------
// 2. ElementModel Component - Handles a single Three.js Scene, Object, and Interaction
// ----------------------------------------------------------------------------

/**
 * Renders a single 3D geometric model with interactive hover effects.
 * @param {string} shapeType - 'Dodecahedron', 'TorusKnot', or 'Icosahedron'
 * @param {number} elementId - Unique ID for intersection observation
 * @param {boolean} isVisible - Controls the entry animation (scale/opacity)
 */
const ElementModel = ({ shapeType, elementId, isVisible }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // THREE.js instances stored in a ref to persist across renders
  const sceneRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    element: null,
    wireframe: null,
    container: null,
    // FIX: Replaced 'new THREE?.Vector2' with a ternary check to ensure THREE is loaded, 
    // resolving the syntax error "Constructors in/after an Optional Chain are not allowed."
    mouse: THREE ? new THREE.Vector2(0, 0) : { x: 0, y: 0 },
    targetRotation: THREE ? new THREE.Vector2(0, 0) : { x: 0, y: 0 },
  });

  // --- Core Initialization Function ---
  const initScene = useCallback(() => {
    if (!THREE || !canvasRef.current) return;
    const state = sceneRef.current;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene and Camera
    state.scene = new THREE.Scene();
    state.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    state.camera.position.z = 4;

    // 2. Renderer
    state.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    state.renderer.setSize(width, height);
    state.renderer.setPixelRatio(window.devicePixelRatio);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    state.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 20);
    pointLight.position.set(5, 5, 5);
    state.scene.add(pointLight);

    // 4. Geometry and Material based on shapeType
    let geometry;
    let color;
    const wireframeColor = 0xb4b4ff; 

    switch (shapeType) {
      case 'Dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1.2, 0);
        color = 0x88bbee; // Lighter Blue for transparent effect
        break;
      case 'TorusKnot':
        geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
        color = 0xdd9966; // Amber/Orange for transparent effect
        break;
      case 'Icosahedron':
      default:
        geometry = new THREE.IcosahedronGeometry(1.2, 1);
        color = 0xeeeeaa; // Light Gold/White for transparent effect
        break;
    }

    // --- Transparent Material (Glass Effect) ---
    const material = new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      metalness: 0.1,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      wireframe: false,
      transmission: 0.9,
      ior: 1.5,
    });
    // -------------------------------------
    
    state.element = new THREE.Mesh(geometry, material);
    state.scene.add(state.element);

    // 5. Wireframe / Outline Mesh (The hover effect)
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    state.wireframe = new THREE.LineSegments(
      wireframeGeometry,
      new THREE.LineBasicMaterial({
        color: wireframeColor, 
        linewidth: 2,
        transparent: true,
        opacity: 0.3,
      })
    );
    state.scene.add(state.wireframe);
    state.wireframe.visible = false; // Initially hidden

    // Add a resize handler
    const handleResize = () => {
      if (state.container) {
        const newWidth = state.container.clientWidth;
        const newHeight = state.container.clientHeight;
        state.camera.aspect = newWidth / newHeight;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [shapeType]);

  // --- Animation Loop ---
  const animate = useCallback(() => {
    const state = sceneRef.current;
    if (!state.renderer) return; 

    requestAnimationFrame(animate);

    // --- Rotation Update: Increased interpolation from 0.05 to 0.1 for faster response ---
    if(state.element) {
        // Since state.targetRotation is now initialized as an object {x:0, y:0} or THREE.Vector2, 
        // this calculation still works as long as state.element is valid.
        state.element.rotation.x += (state.targetRotation.y - state.element.rotation.x) * 0.1;
        state.element.rotation.y += (state.targetRotation.x - state.element.rotation.y) * 0.1;

        // Apply the same rotation to the wireframe
        state.wireframe.rotation.copy(state.element.rotation);

        // Continuous, subtle rotation if not hovered
        if (!isHovered) {
          state.element.rotation.z += 0.001;
        }
    }
    

    state.renderer.render(state.scene, state.camera);
  }, [isHovered]);

  // --- Mouse Interaction Handlers ---
  const handleMouseMove = (event) => {
    if (!containerRef.current || !sceneRef.current.element) return;
    // FIX: Define 'state' by referencing the current value of the ref.
    const state = sceneRef.current;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate normalized mouse position (-1 to 1) relative to the container center
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // --- Rotation Update: Increased sensitivity from 1.5 to 3.0 for stronger control ---
    const rotationSensitivity = 3.0; 
    
    // Set target rotation based on mouse position (X-axis affects Y rotation, Y-axis affects X rotation)
    // Accessing .x and .y works for both THREE.Vector2 and the placeholder object {x:0, y:0}
    state.targetRotation.x = (x * 2 - 1) * rotationSensitivity;
    state.targetRotation.y = (y * 2 - 1) * rotationSensitivity;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (sceneRef.current.wireframe) {
        sceneRef.current.wireframe.visible = true;
        sceneRef.current.wireframe.material.opacity = 0.6;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return target rotation to zero for non-hovered state
    // Resetting .x and .y works for both THREE.Vector2 and the placeholder object
    sceneRef.current.targetRotation.x = 0;
    sceneRef.current.targetRotation.y = 0;
    if (sceneRef.current.wireframe) {
      sceneRef.current.wireframe.material.opacity = 0;
      // Use setTimeout to allow the opacity transition to finish before hiding the mesh
      setTimeout(() => {
        if (!isHovered) sceneRef.current.wireframe.visible = false;
      }, 300);
    }
  };

  // --- Initialization and Cleanup ---
  useEffect(() => {
    // Check if THREE is available and initialize the scene
    if (THREE && !sceneRef.current.renderer) {
      const resizeCleanup = initScene();
      animate();
      sceneRef.current.container = containerRef.current; // Store container reference

      return () => {
        const state = sceneRef.current;
        if (state.renderer) {
          state.renderer.dispose();
        }
        if (resizeCleanup) {
            resizeCleanup();
        }
        // Clean up event listeners just in case
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [initScene, animate]);


  // Effect for setting up mouse listeners once the component mounts
  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', handleMouseMove);
        containerRef.current.addEventListener('mouseenter', handleMouseEnter);
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      // Cleanup listeners on unmount
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[50vh] min-h-[400px] transition-all duration-1000 ease-out 
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'}
                  cursor-pointer`}
      style={{ perspective: '1000px' }}
    >
      {/* The canvas itself is transparent (due to alpha: true in renderer) */}
      <canvas ref={canvasRef} />
    </div>
  );
};

// ----------------------------------------------------------------------------
// 3. Custom Hook for Scroll and Intersection Observation
// ----------------------------------------------------------------------------

/**
* Custom hook to observe a list of refs and set a visibility state when they intersect.
 * @param {object[]} elementRefs - Array of refs for elements to observe.
 */
const useElementVisibility = (elementRefs) => {
  const [visibleStates, setVisibleStates] = useState(
    elementRefs.map(() => false)
  );

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(index)) {
            setVisibleStates((prev) => {
              const newState = [...prev];
              // Only set to true once, so animation doesn't repeat on scroll up
              if (entry.isIntersecting && !newState[index]) {
                newState[index] = true;
              }
              return newState;
            });
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    elementRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index; // Add index to element for identification
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [elementRefs]);

  return visibleStates;
};

// ----------------------------------------------------------------------------
// 4. Data for the 3D Elements
// ----------------------------------------------------------------------------
const elementsData = [
    { id: 1, title: 'Quantum Flux', description: 'A highly reactive component capable of storing immense potential energy, encapsulated in an Icosahedron geometry.', type: 'Icosahedron' },
    { id: 2, title: 'Chronon Alloy', description: 'A stable, metallic lattice structure designed for structural integrity in extreme environments, modeled as a Dodecahedron.', type: 'Dodecahedron' },
    { id: 3, title: 'Etheric Filament', description: 'The non-metallic element used for low-resistance energy transmission, represented by the complex Torus Knot.', type: 'TorusKnot' },
];


const ElementsPage = () => {
  
  // Use useState with a function initializer to create a stable array of refs only once.
  const [sectionRefsArray] = useState(() => elementsData.map(() => React.createRef()));
  
  // Use custom hook to track visibility of each section, passing the stable array.
  const visibleStates = useElementVisibility(sectionRefsArray);
  
  // Gradient colors for a dark, dynamic gradient
  const color1 = '#1a1a2e'; // Deep Blue/Purple
  const color2 = '#06112eff'; // Darker Blue
  const color3 = '#000000ff'; // Midnight Blue
  const color4 = '#162131ff'; // Dark Purple

  return (
    // Set default text color to white for the dark theme
    <div className="relative min-h-screen font-sans overflow-hidden text-white">
        
        {/* Load Three.js library */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      {/* 🔹 Moving 4-Color Gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `linear-gradient(-45deg, ${color1}, ${color2}, ${color3}, ${color4})`,
          backgroundSize: '400% 400%',
          animation: 'gradientMove 16s ease infinite',
        }}
      />

      {/* 🔧 Keyframes */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-8 md:px-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-extralight mb-4 tracking-tight">
            ELEMENTS
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Objects and crafted pieces that extend our architectural language —
            exploring materials, craft, and proportion at a more intimate scale.
          </p>
        </motion.div>
      </section>

      {/* Interactive 3D Elements Section */}
      <section className="pt-12 pb-24 px-8 md:px-20 text-gray-300 relative z-10">
        
        <div className="space-y-48"> {/* Increased spacing for scrolling effect */}
          {elementsData.map((element, index) => (
            <div
              key={element.id}
              ref={sectionRefsArray[index]}
              // Card styling updated to be fully transparent, only keeping opacity and shadow effects.
              className={`transition-opacity duration-700 ${visibleStates[index] ? 'opacity-100' : 'opacity-30'} rounded-2xl p-4 md:p-8 shadow-2xl shadow-black/50`}
            >
              <div className="flex flex-col md:flex-row items-center gap-12">
                
                {/* Text Content (Swaps side based on index for visual flow) */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} space-y-4`}>
                  
                  {/* Element ID with Matrix Effect */}
                  <MatrixText 
                    text={`ID: ${element.id.toString().padStart(3, '0')}`}
                      // UPDATE: Removed border/shadow/rounded classes
                    className="w-56 h-10" 
                    textColor="#4dff88"
                    fontSize={18}
                    isVisible={visibleStates[index]} // Pass visibility state
                  />

                  {/* Title with Matrix Effect */}
                  <MatrixText
                    text={element.title.toUpperCase()}
                      // UPDATE: Removed border-b class
                    className="w-full h-16"
                    textColor="#ffffff"
                    fontSize={32}
                    isVisible={visibleStates[index]} // Pass visibility state
                  />
                  
                  <p className="text-gray-300 leading-relaxed max-w-lg pt-4">
                    {element.description}
                  </p>
                  <button className="mt-4 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 rounded-full font-medium shadow-lg shadow-black/50">
                    Explore Data
                  </button>
                </div>

                {/* 3D Model Area (Swaps side based on index for visual flow) */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} rounded-xl overflow-hidden`}>
                  <ElementModel
                    shapeType={element.type}
                    elementId={element.id}
                    isVisible={visibleStates[index]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ElementsPage;