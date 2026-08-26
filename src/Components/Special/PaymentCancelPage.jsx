import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function PaymentCancelPage() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prevTimer - 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [navigate]);
  return <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 border-b-4 border-black"><div className="max-w-xl w-full border-4 border-black bg-swiss-muted p-12 text-center space-y-6"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
          TRANSACTION INTERRUPTED
        </span><h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
          PAYMENT FAILED.
        </h1><p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-swiss-accent pl-4 text-left">
          WE WERE UNABLE TO PROCESS YOUR CHECKOUT TRANSACTION. YOUR PRODUCTS REMAIN SAFELY IN YOUR CART.
        </p><div className="pt-4 border-t-2 border-black flex flex-col items-center gap-4"><span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600">
            AUTO-REDIRECTING IN {timer} SECONDS...
          </span><Link
    to="/cart"
    className="w-full bg-black text-white font-black text-xs uppercase tracking-widest py-4 border-2 border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none"
  >
            RETURN TO CART & RETRY →
          </Link></div></div></div>;
}
