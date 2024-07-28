export default function ProductCard() {
    return (
      <>
        <div className="relative card card-side bg-base-100 shadow-xl max-w-sm sm:max-w-lg md:max-w-full mx-auto">
          <div className="absolute z-10 top-6 right-3 sm:top-4 sm:right-2 flex flex-col gap-4">
            <label className="swap swap-rotate">
              <input type="checkbox" />
              <img
                src="/heart-empty.svg"
                alt="empty-heart"
                className="inline-block mr-2 swap-off h-6 w-6"
              />
              <img
                src="/heart-full.svg"
                alt="full-heart"
                className="inline-block mr-3 swap-on h-6 w-6"
              />
            </label>
          </div>
          <div className="card-body p-0 sm:p-6">
            <div className="hero">
              <div className="hero-content flex-col sm:flex-row">
                <div className="card bg-base-100 shadow-2xl w-full sm:w-1/2">
                  <img src="/product1.jpg" alt="headphones" className="w-full h-auto" />
                </div>
                <div className="text-center sm:text-left w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
                  <h1 className="text-3xl sm:text-5xl font-bold">Headphones</h1>
                  <p className="pt-6 text-start">
                    If a dog chews shoes whose shoes does he choose? If a dog
                    chews shoes whose shoes does he choose? If a dog chews shoes
                    whose shoes does he choose? If a dog chews shoes whose shoes
                    does he choose?
                  </p>
                  <p className="pt-2">
                    {["red", "green", "blue"] && (
                      <div className="flex gap-2">
                        {["red", "green", "blue"].map((item) => (
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: item }}
                            key={item}
                          ></div>
                        ))}
                      </div>
                    )}
                  </p>
                  <div className="text-start flex items-center gap-2 mt-2">
                    <Rating number={4} />
                    (30)
                  </div>
                  <p className="py-2 text-start font-bold text-gray-700 text-lg ">
                    &#8377; 250
                  </p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  const Rating = ({ number }) => {
    return (
      <div className="rating sm:rating-md">
        {number <= 5 &&
          [...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name="rating-4"
              className={`mask mask-star-2 ${
                index < number ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
      </div>
    );
  };
  