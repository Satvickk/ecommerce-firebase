export default function Brands() {
  const BRANDS_DATA = [
    { label: "BOAT", code: "BT" },
    { label: "SONY", code: "SNY" },
    { label: "JBL", code: "JBL" },
    { label: "BOSE", code: "BOS" },
    { label: "APPLE", code: "APL" },
    { label: "SAMSUNG", code: "SSG" },
    { label: "BEATS", code: "BTS" },
    { label: "SKULLCANDY", code: "SKC" },
    { label: "PANASONIC", code: "PNS" },
    { label: "PHILIPS", code: "PHL" },
    { label: "LG", code: "LGE" },
    { label: "TCL", code: "TCL" }
  ];
  return <section className="w-full bg-white border-b-4 border-black py-12"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            03. AUTHORIZED PARTNERS
          </span><h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-black">
            HARDWARE MANUFACTURERS
          </h2></div><div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">{BRANDS_DATA.map((item, index) => <div
    key={index}
    className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors duration-150 flex flex-col justify-between h-28 group"
  ><div className="text-[10px] font-black text-swiss-accent group-hover:text-white">
                0{index + 1}</div><div className="text-center font-black text-lg tracking-tighter uppercase">{item.label}</div><div className="text-[9px] font-bold text-gray-500 group-hover:text-gray-300 text-right tracking-widest">
                [{item.code}]
              </div></div>)}</div></div></section>;
}
