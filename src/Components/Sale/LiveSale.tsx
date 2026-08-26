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
    <section className="w-full bg-swiss-accent text-white border-y-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
            04. LIMITED TIME EVENT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            BIGGEST HEADPHONE <br />
            FLASH SALE EVENT
          </h2>
          <p className="text-sm font-bold uppercase tracking-wider text-white/90">
            TIME REMAINING UNTIL CATALOG PRICE ADJUSTMENT:
          </p>

          <div className="grid grid-cols-4 gap-4 pt-4 max-w-lg">
            <div className="border-4 border-black bg-black p-4 text-center">
              <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.days || 0).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">DAYS</div>
            </div>
            <div className="border-4 border-black bg-black p-4 text-center">
              <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.hours || 0).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">HRS</div>
            </div>
            <div className="border-4 border-black bg-black p-4 text-center">
              <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.minutes || 0).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">MIN</div>
            </div>
            <div className="border-4 border-black bg-black p-4 text-center">
              <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.seconds || 0).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-swiss-accent">SEC</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 border-4 border-black bg-white p-4">
          <img src="/live-sale.jpg" alt="Live Sale" className="w-full h-80 object-cover border-2 border-black" />
        </div>
      </div>
    </section>
  );
}
