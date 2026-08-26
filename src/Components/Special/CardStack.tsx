import { useNavigate } from "react-router-dom";

export default function CardStack() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
          <div className="flex items-center gap-4">
            <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
              02. FEATURED SELECTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black">
              DESIGN CATEGORIES
            </h2>
          </div>
          <button
            onClick={() => navigate('/product')}
            className="text-xs font-black uppercase tracking-widest border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-150"
          >
            VIEW ALL PRODUCTS →
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Card 1 */}
          <div className="col-span-12 md:col-span-4 border-2 border-black bg-white group hover:border-black transition-all duration-150">
            <div className="p-4 border-b-2 border-black bg-swiss-muted flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">LIMITED EDITION</span>
              <span className="text-xs font-black text-black">#01</span>
            </div>
            <div className="h-64 overflow-hidden relative border-b-2 border-black">
              <img
                alt="Acme Headphones Pro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                src="https://images.pexels.com/photos/2766408/pexels-photo-2766408.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="p-6">
              <h3 className="font-black text-xl uppercase tracking-tight text-black mb-2">ACME HEADPHONES PRO</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">ENGINEERED FOR STUDIO-GRADE MONITORING ACCURACY.</p>
              <button
                onClick={() => navigate('/product')}
                className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-swiss-accent transition-colors duration-150"
              >
                EXPLORE ITEM
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 md:col-span-4 border-2 border-black bg-white group hover:border-black transition-all duration-150">
            <div className="p-4 border-b-2 border-black bg-swiss-muted flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">ECO BEATS</span>
              <span className="text-xs font-black text-black">#02</span>
            </div>
            <div className="h-64 overflow-hidden relative border-b-2 border-black">
              <img
                alt="Green Beats Headphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="p-6">
              <h3 className="font-black text-xl uppercase tracking-tight text-black mb-2">GREEN BEATS AUDIO</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">RECYCLED ALUMINUM FRAME WITH REFINED MEMORY FOAM.</p>
              <button
                onClick={() => navigate('/product')}
                className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-swiss-accent transition-colors duration-150"
              >
                EXPLORE ITEM
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-span-12 md:col-span-4 border-2 border-black bg-white group hover:border-black transition-all duration-150">
            <div className="p-4 border-b-2 border-black bg-swiss-muted flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">BASS ARCHITECTURE</span>
              <span className="text-xs font-black text-black">#03</span>
            </div>
            <div className="h-64 overflow-hidden relative border-b-2 border-black">
              <img
                alt="Bass Master Headphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
            <div className="p-6">
              <h3 className="font-black text-xl uppercase tracking-tight text-black mb-2">BASS MASTER SOUND</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">DEEP FREQUENCY RESONANCE WITH ACTIVE EQUALIZER.</p>
              <button
                onClick={() => navigate('/product')}
                className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-swiss-accent transition-colors duration-150"
              >
                EXPLORE ITEM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
