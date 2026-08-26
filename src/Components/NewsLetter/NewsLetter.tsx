import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function NewsLetter() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to Swiss Newsletter");
  };

  return (
    <section className="w-full bg-black text-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
            07. BULLETIN & DISPATCHES
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            SUBSCRIBE TO DISPATCHES.
          </h2>
          <p className="text-sm font-medium text-gray-300 max-w-xl leading-relaxed border-l-4 border-swiss-accent pl-4">
            RECEIVE DIRECT SPECIFICATION UPDATES ON LIMITED RELEASES, PRICE ADJUSTMENTS, AND ARCHITECTURAL PRODUCT DROPS.
          </p>
        </div>

        <div className="lg:col-span-5 border-4 border-white bg-white text-black p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">FULL NAME</label>
              <input
                type="text"
                placeholder="ENTER YOUR NAME"
                className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="NAME@DOMAIN.COM"
                className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-swiss-accent transition-colors duration-150 rounded-none border-2 border-black"
            >
              JOIN DISPATCH LIST →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
