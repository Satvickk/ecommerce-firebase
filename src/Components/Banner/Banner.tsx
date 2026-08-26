import { useNavigate } from "react-router-dom";
import Stats from "../common/Stats";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white border-b-4 border-black swiss-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Huge Swiss Typography */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div>
            <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block mb-4">
              01. ARCHITECTURAL AUDIO
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none mb-6">
              PURE SOUND. <br />
              <span className="text-swiss-accent">ZERO NOISE.</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-black max-w-xl leading-relaxed border-l-4 border-black pl-4 py-1">
              ENGINEERED FOR ABSOLUTE ACOUSTIC PRECISION. EXPERIENCING AUDIOPHILE-GRADE PERFORMANCE THROUGH MINIMALIST HARDWARE ARCHITECTURE.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              className="bg-black text-white border-2 border-black font-black uppercase text-xs tracking-widest px-8 py-4 hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150"
              onClick={() => navigate("/product")}
            >
              EXPLORE CATALOG →
            </button>
            <button
              className="bg-white text-black border-2 border-black font-black uppercase text-xs tracking-widest px-8 py-4 hover:bg-black hover:text-white transition-colors duration-150"
              onClick={() => navigate("/wishlist")}
            >
              SAVED WISHLIST
            </button>
          </div>
        </div>

        {/* Right Column: Hero Graphic Frame */}
        <div className="lg:col-span-5 relative">
          <div className="border-4 border-black bg-swiss-muted p-4 relative">
            <img
              src="/banner.jpg"
              alt="Banner Headset"
              className="w-full h-80 sm:h-96 object-cover border-2 border-black"
            />
            <div className="absolute top-8 right-8 bg-black text-white px-4 py-2 font-black text-xs uppercase tracking-widest">
              SWISS EDITION
            </div>
          </div>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
        <Stats />
      </div>
    </section>
  );
}
