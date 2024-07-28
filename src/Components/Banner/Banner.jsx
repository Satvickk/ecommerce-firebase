import { useNavigate } from "react-router-dom";
import Stats from "../common/Stats";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full p-3 h-[500px] relative">
        <div className="relative w-full h-full">
          <img
            src="/banner.jpg"
            className="w-full h-full object-cover rounded-lg"
            alt="Banner"
          />

          <div className="absolute bottom-4 left-4 sm:bottom-12 sm:left-8 flex flex-col justify-end gap-6 items-start h-full text-white">
            <p className="text-3xl sm:text-5xl font-bold">
              Experience Sound Like Never Before
            </p>
            <p className="text-sm sm:text-2xl font-normal">
              Find the perfect headphones to elevate your audio experience.
            </p>
            <button
              className="btn glass text-white"
              onClick={() => navigate("/product")}
            >
              Shop now
            </button>
          </div>

          <div className="hidden sm:block absolute top-4 right-4 z-10">
            <Stats />
          </div>
        </div>
      </div>
      <div className="block sm:hidden mb-4 mt-8">
        <Stats />
      </div>
    </>
  );
}
