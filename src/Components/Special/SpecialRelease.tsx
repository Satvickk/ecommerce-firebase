import { useNavigate } from "react-router-dom";

export default function SpecialRelease() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 border-4 border-black bg-swiss-muted p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
            05. SPECIAL ARCHITECTURE RELEASE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
            UNMATCHED SOUND CLARITY.
          </h2>
          <p className="text-sm font-medium text-black leading-relaxed border-l-4 border-black pl-4">
            DIVE INTO THE WORLD OF CRYSTAL-CLEAR AUDIO WITH OUR LATEST HEADPHONE COLLECTION. DESIGNED FOR ULTIMATE COMFORT AND UNMATCHED SOUND CLARITY.
          </p>
          <button
            onClick={() => navigate('/product')}
            className="bg-black text-white font-black uppercase text-xs tracking-widest px-8 py-4 border-2 border-black hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150"
          >
            SHOP CATALOG NOW →
          </button>
        </div>

        <div className="lg:col-span-5 border-2 border-black bg-white p-4 flex items-center justify-center">
          <img
            src="/arrival-headphones.png"
            alt="Arrival Headphones"
            className="max-h-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
