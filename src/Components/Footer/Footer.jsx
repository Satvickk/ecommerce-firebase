import { Link } from "react-router-dom";
import Logo from "../common/Logo";
export default function Footer() {
  return <footer className="w-full bg-black text-white border-t-4 border-black mt-auto"><div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">{
    /* Left Column: Brand Statement */
  }<div className="md:col-span-5 flex flex-col justify-between"><div><Logo className="text-white mb-6" /><p className="text-sm font-medium text-gray-300 max-w-sm leading-relaxed">
              INTERNATIONAL TYPOGRAPHIC E-COMMERCE PLATFORM. BUILT WITH OBJECTIVE PRECISION AND UNCOMPROMISING GEOMETRY.
            </p></div><div className="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
            03. COPYRIGHT © {(/* @__PURE__ */ new Date()).getFullYear()} MYSHOP SWISS ARCHITECTURE.
          </div></div>{
    /* Middle Column: Quick Links */
  }<div className="md:col-span-4"><h4 className="text-xs font-black uppercase tracking-widest text-swiss-accent mb-6">
            01. NAVIGATION
          </h4><ul className="space-y-3 text-sm font-bold uppercase tracking-wider"><li><Link to="/" className="hover:text-swiss-accent transition-colors duration-150">
                Home Collection
              </Link></li><li><Link to="/product" className="hover:text-swiss-accent transition-colors duration-150">
                Catalog & Products
              </Link></li><li><Link to="/wishlist" className="hover:text-swiss-accent transition-colors duration-150">
                Saved Wishlist
              </Link></li><li><Link to="/orders" className="hover:text-swiss-accent transition-colors duration-150">
                Order Tracking
              </Link></li></ul></div>{
    /* Right Column: Social Links */
  }<div className="md:col-span-3"><h4 className="text-xs font-black uppercase tracking-widest text-swiss-accent mb-6">
            02. CONNECT
          </h4><div className="flex flex-col gap-3"><a
    href="https://www.linkedin.com/in/satvick-pathak-384956204"
    target="_blank"
    rel="noopener noreferrer"
    className="border-2 border-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150"
  ><span>LINKEDIN</span><span>↗</span></a><a
    href="https://github.com/Satvickk"
    target="_blank"
    rel="noopener noreferrer"
    className="border-2 border-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center justify-between hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150"
  ><span>GITHUB</span><span>↗</span></a></div></div></div></footer>;
}
