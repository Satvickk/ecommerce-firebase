export default function Stats() {
  return <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black bg-white"><div className="p-6 border-b sm:border-b-0 sm:border-r-2 border-black hover:bg-black hover:text-white transition-colors duration-150 group"><span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent group-hover:text-white block mb-1">
          01. PURCHASES
        </span><div className="text-3xl font-black tracking-tight mb-1">31,000+</div><div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300">
          MONTHLY COMPLETED ORDERS
        </div></div><div className="p-6 border-b sm:border-b-0 sm:border-r-2 border-black hover:bg-black hover:text-white transition-colors duration-150 group"><span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent group-hover:text-white block mb-1">
          02. ACTIVE USERS
        </span><div className="text-3xl font-black tracking-tight mb-1 text-swiss-accent group-hover:text-white">4,200</div><div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300">
          ↑ 40% INCREASE THIS MONTH
        </div></div><div className="p-6 hover:bg-black hover:text-white transition-colors duration-150 group"><span className="text-[10px] font-black uppercase tracking-widest text-swiss-accent group-hover:text-white block mb-1">
          03. REGISTRATIONS
        </span><div className="text-3xl font-black tracking-tight mb-1">1,200</div><div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300">
          VERIFIED PLATFORM MEMBERS
        </div></div></div>;
}
