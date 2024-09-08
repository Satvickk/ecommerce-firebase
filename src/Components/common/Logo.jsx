import { Link } from "react-router-dom";

export default function Logo() {
    return(
        <Link className="btn btn-ghost text-xl" to="/" data-theme="wireframe">
            <img src='/myShop.png' className="w-8 h-8 sm:w-12 sm:h-12"/>
            MyShop</Link>
    )
}