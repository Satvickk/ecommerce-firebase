export default function Loading() {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white p-8 border-4 border-black">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-4 h-4 bg-swiss-accent animate-pulse"></div>
        <div className="w-4 h-4 bg-black animate-pulse delay-75"></div>
        <div className="w-4 h-4 bg-swiss-muted border border-black animate-pulse delay-150"></div>
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-black">
        LOADING DATA...
      </span>
    </div>
  );
}
