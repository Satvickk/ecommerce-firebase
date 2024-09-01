export default function CardStack() {
    return (
      <div className="sm:max-w-full max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
          <div className="absolute z-10 top-1 flex-col items-start p-4">
            <p className="text-xs text-white/60 uppercase font-bold">What to watch</p>
            <h4 className="text-white font-medium text-lg">Stream the Acme event</h4>
          </div>
          <figure className="z-0 w-full h-full">
            <img
              alt="Card background"
              className="object-cover w-full h-full"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
          </figure>
        </div>
        
        <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
          <div className="absolute z-10 top-1 flex-col items-start p-4">
            <p className="text-xs text-white/60 uppercase font-bold">Plant a tree</p>
            <h4 className="text-white font-medium text-lg">Contribute to the planet</h4>
          </div>
          <figure className="z-0 w-full h-full">
            <img
              alt="Card background"
              className="object-cover w-full h-full"
              src="https://nextui.org/images/card-example-3.jpeg"
            />
          </figure>
        </div>
        
        <div className="card col-span-12 sm:col-span-4 h-[300px] relative">
          <div className="absolute z-10 top-1 flex-col items-start p-4">
            <p className="text-xs text-white/60 uppercase font-bold">Supercharged</p>
            <h4 className="text-white font-medium text-lg">Creates beauty like a beast</h4>
          </div>
          <figure className="z-0 w-full h-full">
            <img
              alt="Card background"
              className="object-cover w-full h-full"
              src="https://nextui.org/images/card-example-2.jpeg"
            />
          </figure>
        </div>
        
        <div className="card col-span-12 sm:col-span-7 h-[300px] relative bg-black/40">
          <div className="absolute z-10 top-1 flex-col items-start p-4">
            <p className="text-xs text-white/60 uppercase font-bold">Your day your way</p>
            <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
          </div>
          <figure className="z-0 w-full h-full">
            <img
              alt="Relaxing app background"
              className="object-cover w-full h-full"
              src="https://nextui.org/images/card-example-5.jpeg"
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
                <p className="text-xs text-white/60">Breathing App</p>
                <p className="text-xs text-white/60">Get a good night's sleep.</p>
              </div>
            </div>
            <button className="btn btn-sm rounded-full">Get App</button>
          </div>
        </div>
  
        <div className="card col-span-12 sm:col-span-5 h-[300px] relative bg-white/30 overflow-hidden">
          <div className="absolute z-10 top-1 flex-col items-start p-4">
            <p className="text-xs text-white/60 uppercase font-bold">New</p>
            <h4 className="text-black font-medium text-2xl">Acme camera</h4>
          </div>
          <figure className="z-0 w-full h-full scale-125 -translate-y-6">
            <img
              alt="Card example background"
              className="object-cover w-full h-full"
              src="https://nextui.org/images/card-example-6.jpeg"
            />
          </figure>
          <div className="card-footer absolute bottom-0 bg-white/30 border-t border-gray-200 z-10 flex justify-between items-center p-4">
            <div>
              <p className="text-black text-xs">Available soon.</p>
              <p className="text-black text-xs">Get notified.</p>
            </div>
            <button className="btn btn-primary btn-sm rounded-full">Notify Me</button>
          </div>
        </div>
      </div>
    );
  }
  