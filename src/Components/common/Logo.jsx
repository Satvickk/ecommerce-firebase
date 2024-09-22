import { Link } from "react-router-dom";

export default function Logo({className, ...rest}) {
    return(
        <Link className={`flex gap-3 items-center font-semibold bg-transparent text-xl ${className}`} to="/" data-theme="wireframe" {...rest}>
            <img src='/myShop.png' className="w-8 h-8 sm:w-12 sm:h-12"/>
            MyShop</Link>
    )
}