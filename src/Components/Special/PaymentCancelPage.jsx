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
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center my-1">
      <p>...Redirecting to home page in {timer}</p>
      <img className="w-[470px] h-[469px]" src="/payment-failed.jpg" alt="Payment Failed" />
      <p className="text-center font-light">
        Sorry, your payment failed due to some error. Please try again later!
      </p>
      <Link to="/" className="btn btn-primary mb-8">
        Back to Home
      </Link>
    </div>
  );
}
