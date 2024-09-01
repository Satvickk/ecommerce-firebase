import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentSuccessPage() {
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
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center my-1">
      <p>...Redirecting to home page in {timer}</p>
      <img className="w-[470px] h-[469px]" src="/payment-complete.jpg" alt="Payment Complete" />
      <p className="text-center font-light">Thank you for shopping with us ❤️. Your order is on the way 🚚.</p>
      <Link to="/" className="btn btn-primary mb-8">
        Back to Home
      </Link>
    </div>
  );
}
