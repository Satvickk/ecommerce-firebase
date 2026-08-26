import { Link, LinkProps } from "react-router-dom";

interface LogoProps extends Partial<LinkProps> {
  className?: string;
}

export default function Logo({ className = "", ...rest }: LogoProps) {
  return (
    <Link className={`flex gap-3 items-center font-semibold bg-transparent text-xl ${className}`} to="/" data-theme="wireframe" {...rest}>
      <img src='/myShop.png' alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12"/>
      MyShop
    </Link>
  );
}
