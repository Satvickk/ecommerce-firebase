import React, { useState, useEffect } from "react";

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function LiveSale() {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date("2026-12-31T00:00:00") - +new Date();
    let timeLeft: TimeLeft = {};

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="hero my-12" style={{ backgroundImage: "url(/live-sale.jpg)" }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="/live-sale.jpg" alt="Live Sale" className="w-full sm:max-w-sm rounded-lg shadow-2xl" />
        <div className="w-full">
          <h1 className="text-5xl font-bold text-white my-4">
            <span>Biggest Headphone Sale</span> is going Live in
          </h1>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.days || 0 } as React.CSSProperties}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.hours || 0 } as React.CSSProperties}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.minutes || 0 } as React.CSSProperties}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": timeLeft.seconds || 0 } as React.CSSProperties}></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
