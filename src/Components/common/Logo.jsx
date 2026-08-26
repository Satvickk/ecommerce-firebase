import { Link } from "react-router-dom";
export default function Logo({ className = "", ...rest }) {
  return <Link
    className={`flex items-center gap-3 font-black text-xl sm:text-2xl tracking-tighter uppercase text-black group ${className}`}
    to="/"
    {...rest}
  ><div className="bg-black text-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-black text-lg transition-colors duration-150 group-hover:bg-swiss-accent">
        M
      </div><span className="group-hover:text-swiss-accent transition-colors duration-150 tracking-tight">
        MY<span className="text-swiss-accent group-hover:text-black">SHOP</span></span></Link>;
}
