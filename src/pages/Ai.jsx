import React, { useState, useCallback } from "react";
import { Settings, Image as ImageIcon, Loader2, Zap } from "lucide-react";

const callOpenAIImageAPI = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // store key in .env file
  const apiUrl = "https://api.openai.com/v1/images/generations";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      quality: "high",
      n: 1,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Image generation failed");
  }

  const data = await response.json();
  return data.data[0].url; // image URL returned by OpenAI
};

const MaterialMixerApp = () => {
  const [error, setError] = useState("");
  const [material1, setMaterial1] = useState("Concrete (Polished)");
  const [material2, setMaterial2] = useState("Terrazzo (Speckled)");
  const [style, setStyle] = useState("Seamless Macro Texture");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const materials = [
    "Concrete (Polished)",
    "Terrazzo (Speckled)",
    "Wood (Dark Oak)",
    "Marble (Carrara White)",
    "Corten Steel (Rusted)",
    "Glass (Frosted)",
    "Laterite Stone (Rough)",
    "Clay Brick (Smooth)",
    "Copper (Patinated)",
    "Resin (Transparent)",
    "Bamboo Fiber",
    "Limestone",
  ];

  const styles = [
    "Seamless Macro Texture",
    "Architectural Wall Panel",
    "High-Resolution Floor Tile",
    "Close-up Polished Surface",
  ];

  const generateMaterial = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setError("");

    const prompt = `A hyper-realistic, seamless architectural texture showing a fusion of ${material1} and ${material2}, presented as a ${style}. High detail, 8k photorealistic texture, soft lighting, minimalist architectural style.`;

    try {
      const imageUrl = await callOpenAIImageAPI(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError(`Generation failed: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  }, [material1, material2, style, isGenerating]);

  return (
    <div className="min-h-screen text-gray-200 font-sans pt-40 pb-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-[#1a1a1f] to-black">
      {/* Header */}
      <header className="py-6 mb-10 border-b border-white/10 text-center">
        <div className="flex items-center justify-center">
          <Zap className="w-6 h-6 text-violet-400 mr-2" />
          <h1 className="text-3xl font-light tracking-wider uppercase bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradientGlow">
            Material Mixer
          </h1>
        </div>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Visualize architectural material blends with AI — tailored for modern
          design sensibilities.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Controls */}
        <section className="lg:col-span-1 bg-[#121214]/60 border border-white/10 p-6 rounded-xl shadow-lg h-fit sticky top-24 backdrop-blur-md">
          <h2 className="flex items-center text-lg font-medium mb-6 text-violet-300 border-b border-white/10 pb-3">
            <Settings className="w-5 h-5 mr-2 text-violet-400" />
            Material Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Base Material
              </label>
              <select
                value={material1}
                onChange={(e) => setMaterial1(e.target.value)}
                className="w-full p-3 bg-[#1b1b1f] border border-white/10 rounded-lg text-gray-200 focus:ring-violet-500 focus:border-violet-500 transition"
              >
                {materials.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Secondary Accent/Inclusion
              </label>
              <select
                value={material2}
                onChange={(e) => setMaterial2(e.target.value)}
                className="w-full p-3 bg-[#1b1b1f] border border-white/10 rounded-lg text-gray-200 focus:ring-violet-500 focus:border-violet-500 transition"
              >
                {materials.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Texture Style / Context
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-3 bg-[#1b1b1f] border border-white/10 rounded-lg text-gray-200 focus:ring-violet-500 focus:border-violet-500 transition"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateMaterial}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-300 shadow-md ${
                isGenerating
                  ? "bg-violet-500/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90"
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Generating Texture...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Mix & Visualize
                </>
              )}
            </button>
          </div>
        </section>

        {/* Image Output */}
        <section className="lg:col-span-2">
          <h2 className="flex items-center text-lg font-medium mb-6 text-violet-300 border-b border-white/10 pb-3">
            <ImageIcon className="w-5 h-5 mr-2 text-violet-400" />
            Result Visualization
          </h2>

          <div className="bg-[#121214]/60 border border-white/10 p-6 rounded-xl shadow-lg flex items-center justify-center min-h-[500px] relative backdrop-blur-md">
            {error && (
              <div className="absolute top-0 left-0 right-0 p-4 bg-red-900/40 text-red-200 border-l-4 border-red-500 rounded-t-xl">
                Error: {error}
              </div>
            )}

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center p-10 text-gray-300">
                <Loader2 className="w-10 h-10 animate-spin text-violet-400 mb-4" />
                <p className="text-lg font-medium">
                  Imagining the perfect blend...
                </p>
                <p className="text-sm mt-2 text-gray-400">
                  The AI is rendering your architectural texture.
                </p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated Architectural Material Blend"
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-xl transition-opacity duration-500"
              />
            ) : (
              <div className="text-center p-10 text-gray-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">
                  Your generated material texture will appear here.
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  Select your combination and click ‘Mix & Visualize’.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Glow effect for title */}
      <style>{`
        @keyframes gradientGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientGlow {
          background-size: 200% 200%;
          animation: gradientGlow 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default MaterialMixerApp;
