import { Link } from "react-router-dom";

export default function Logo() {
    return(
        <Link className="btn btn-ghost text-xl" to="/" data-theme="wireframe">MyShop</Link>
    )
}