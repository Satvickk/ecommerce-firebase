export default function ReviewCard({ Image, Name, TimeStamp, Content }) {
  return <div className="flex w-80 sm:w-96 flex-col gap-4 bg-white border-2 border-black p-6 rounded-none hover:bg-black hover:text-white transition-colors duration-150 group"><div className="flex items-center gap-4 border-b-2 border-black pb-4 group-hover:border-white"><div className="h-12 w-12 border border-black group-hover:border-white overflow-hidden shrink-0"><img
    className="w-full h-full object-cover"
    src={Image}
    alt={Name}
  /></div><div className="flex flex-col"><div className="text-sm font-black uppercase tracking-tight">{Name}</div><div className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-gray-300 uppercase">{TimeStamp}</div></div></div><p className="text-xs font-medium leading-relaxed">{Content}</p></div>;
}
