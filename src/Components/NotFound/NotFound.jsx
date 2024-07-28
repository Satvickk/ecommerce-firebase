import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center my-1">
        <img 
            className="w-[470px] h-[469px]"
            src="/404.svg"
            />
        <Link to='/' className="btn btn-primary mb-8">Back to Home</Link>
        </div>
    )
}