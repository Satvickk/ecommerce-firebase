import ReviewCard from "../common/ReviewCard";
export default function Reviews() {
  const REVIEWS_DATA = [
    {
      id: "1",
      image: "/reviewer.jpg",
      name: "HANNAH NELSON",
      timestamp: "24 AUG 2023",
      content: "I RECENTLY PURCHASED THE HEADPHONES AND COULD NOT BE HAPPIER WITH MY DECISION! SLEEK DESIGN AND HIGH-QUALITY MATERIALS. CLEAR ACOUSTIC CLARITY."
    },
    {
      id: "2",
      image: "/reviewer.jpg",
      name: "MARCUS VANE",
      timestamp: "18 SEP 2023",
      content: "THE OBJECTIVE GEOMETRY AND AUDIO FIDELITY ARE OUTSTANDING. COMFORTABLE FOR 8+ HOUR STUDIO SESSIONS WITHOUT FATIGUE."
    },
    {
      id: "3",
      image: "/reviewer.jpg",
      name: "ELENA ROSTOVA",
      timestamp: "02 NOV 2023",
      content: "MINIMALIST HARDWARE WITH MAXIMUM ACOUSTIC PERFORMANCE. EXPEDITED SHIPPING AND CLEAN PACKAGING."
    }
  ];
  return <section className="w-full bg-white border-b-4 border-black py-16"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            06. VERIFIED TESTIMONIALS
          </span><h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black">
            CLIENT FEEDBACK
          </h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{REVIEWS_DATA.map((item) => <ReviewCard
    key={item.id}
    Name={item.name}
    TimeStamp={item.timestamp}
    Content={item.content}
    Image={item.image}
  />)}</div></div></section>;
}
