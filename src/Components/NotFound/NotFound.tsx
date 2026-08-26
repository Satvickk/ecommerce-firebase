import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-8 bg-white my-12">
      <div className="max-w-xl w-full border-4 border-black bg-swiss-muted p-12 text-center space-y-6">
        <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
          ERROR 404
        </span>

        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black leading-none">
          PAGE NOT FOUND.
        </h1>

        <p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-black pl-4 text-left">
          THE REQUESTED URL LOCATION COULD NOT BE RESOLVED IN OUR CATALOG INDEX.
        </p>

        <Link
          to="/"
          className="w-full bg-black text-white font-black text-xs uppercase tracking-widest py-4 border-2 border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none inline-block"
        >
          RETURN TO CATALOG HOMEPAGE →
        </Link>
      </div>
    </div>
  );
}
