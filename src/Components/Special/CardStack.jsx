import { useNavigate } from "react-router-dom";

export default function CardStack() {

  const navigate = useNavigate();
  return (
    <div className="sm:max-w-full max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      {/* Featured Headphones Card */}
      <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <p className="text-xs text-white/60 uppercase font-bold">Limited Offer</p>
          <h4 className="text-white font-medium text-lg">Acme Headphones Pro</h4>
        </div>
        <figure className="z-0 w-full h-full">
          <img
            alt="Card background"
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/2766408/pexels-photo-2766408.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </figure>
      </div>

      {/* Eco-Friendly Headphones Card */}
      <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <p className="text-xs text-white/60 uppercase font-bold">Eco-Friendly</p>
          <h4 className="text-white font-medium text-lg">Green Beats Headphones</h4>
        </div>
        <figure className="z-0 w-full h-full">
          <img
            alt="Card background"
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </figure>
      </div>

      {/* Premium Sound Quality Card */}
      <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <p className="text-xs text-white/60 uppercase font-bold">Best Sound</p>
          <h4 className="text-white font-medium text-lg">Bass Master Headphones</h4>
        </div>
        <figure className="z-0 w-full h-full">
          <img
            alt="Card background"
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </figure>
      </div>

      {/* Sleep Assistant Card */}
      <div className="card col-span-12 sm:col-span-7 h-[300px] relative bg-black/40">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <p className="text-xs text-white/60 uppercase font-bold">Sleep Better</p>
          <h4 className="text-white/90 font-medium text-xl">Noise Cancelling Headphones</h4>
        </div>
        <figure className="z-0 w-full h-full">
          <img
            alt="Relaxing app background"
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/164710/pexels-photo-164710.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </figure>
        <div className="card-footer absolute bottom-0 bg-black/40 border-t border-gray-600 z-10 flex justify-between items-center p-4">
          <div className="flex gap-2 items-center">
            <img
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://nextui.org/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-xs text-white/60">Premium Brand</p>
              <p className="text-xs text-white/60">Experience tranquility.</p>
            </div>
          </div>
          <button className="btn btn-sm rounded-full" onClick={() => navigate('/product')}>Shop Now</button>
        </div>
      </div>

      {/* New Arrival Card */}
      <div className="card col-span-12 sm:col-span-5 h-[300px] relative bg-white/30 overflow-hidden">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <p className="text-xs text-white/60 uppercase font-bold">New Arrival</p>
          <h4 className="text-black font-medium text-2xl">Acme Wireless Headphones</h4>
        </div>
        <figure className="z-0 w-full h-full scale-125 -translate-y-6">
          <img
            alt="Card example background"
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </figure>
        <div className="card-footer absolute bottom-0 bg-white/30 border-t border-gray-200 z-10 flex justify-between items-center p-4">
          <div>
            <p className="text-black text-xs">Available soon.</p>
            <p className="text-black text-xs">Get notified.</p>
          </div>
          <button className="btn btn-sm rounded-full btn-primary" onClick={() => navigate('/product')}>Notify Me</button>
        </div>
      </div>
    </div>
  );
}
