import { useState, useEffect } from "react";

export default function LiveSale() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-07-31T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="hero my-12" style={{ backgroundImage: "url(/live-sale.jpg)" }}>
      <div className="hero-overlay bg-opacity-60"></div>
      {/* <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div> */}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="/live-sale.jpg" className="w-full sm:max-w-sm rounded-lg shadow-2xl" />
        <div className="w-full">
          <h1 className="text-5xl font-bold text-white my-4">
            <span>Biggest Headphone Sale</span> is going Live in
          </h1>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.days || 0 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.hours || 0 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.minutes || 0 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.seconds || 0 }}></span>
              </span>
              sec
            </div>
          </div>
          {/* <button className="btn btn-primary">Shop Now</button> */}
        </div>
      </div>
    </div>
  );
}
