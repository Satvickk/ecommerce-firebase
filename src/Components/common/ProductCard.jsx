import { useState } from "react";

export default function ProductCard() {
  function handleOpenModal() {
    document.getElementById("my_modal_3").showModal();
  }

  return (
    <>
      <div className="relative card card-compact bg-base-100 w-80 sm:w-96 shadow-xl">
        <div className="absolute z-10 top-4 right-2 flex flex-col gap-4">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* empty-heart icon */}
            <img
              src="/heart-empty.svg"
              alt="empty-heart"
              className="inline-block mr-2 swap-off h-6 w-6"
            />

            {/* full-heart icon */}
            <img
              src="/heart-full.svg"
              alt="full-heart"
              className="inline-block mr-2 swap-on h-6 w-6"
            />
          </label>
          <img
            src="/expand-view.svg"
            alt="view details"
            className="inline-block mr-2 h-6 w-6 cursor-pointer"
            onClick={handleOpenModal}
          />
          <img
            src="/exchange.svg"
            alt="exchange"
            className="inline-block mr-2 h-6 w-6"
          />
        </div>
        <figure>
          <img src="/product1.jpg" alt="headphones" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Headphones!</h2>
          <p className="text-start">
            If a dog chews shoes whose shoes does he choose?
          </p>

          <div className="text-start flex items-center gap-2">
            <Rating number={4} />
            (30)
          </div>
          <p className="text-start font-bold text-gray-700 text-lg">
            &#8377; 200
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>

      <ProductDetails
        image="/product1.jpg"
        title="Headphones"
        description="If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?"
        color={["red", "green", "blue"]}
        review={30}
        price={250}
      />
    </>
  );
}

const ProductDetails = ({
  image,
  title,
  description,
  color,
  review,
  price,
}) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn sm:btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50">
            ✕
          </button>
        </form>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-3">
              <img src={image} alt="headphones" />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="pt-6 text-start">{description}</p>
              <p className="pt-2">
                {color && (
                  <div className="flex gap-2">
                    {color.map((item) => (
                      <div
                        className={`w-6 h-6 rounded-full`}
                        style={{ backgroundColor: item }}
                        key={item}
                      ></div>
                    ))}
                  </div>
                )}
              </p>
              <p className="py-2 text-sm text-start">Customer reviews ({review})</p>
              <p className="py-2 text-start font-bold text-gray-700 text-lg ">&#8377; {price}</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const Rating = ({ number }) => {
  return (
    <div className="rating sm:rating-md ">
      {number <= 5 &&
       [... Array(5)].map((_, index) =>
          <input
            key={index}
            type="radio"
            name="rating-4"
            className={`mask mask-star-2 ${index < number ? 'bg-black': 'bg-gray-300'}`}
          />
        )}
    </div>
  );
};
