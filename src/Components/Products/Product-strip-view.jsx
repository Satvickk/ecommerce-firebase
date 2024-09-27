import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

export default function ProductCard({ data }) {
  const [label, setLabel] = useState(true);

  const dispatch = useDispatch();
  const UserCart = useSelector((state) => state.UserCart);

  useEffect(() => {
    handleCartCheck();
  }, [UserCart, data]);

  const AddToCart = () => {
    handleCartCheck();
    if (label) {
      // true it means it is not added and we have to add it
      // console.log("add", data);
      dispatch(addProductToCart({ ...data }));
      toast.success("Added to Cart");
    } else {
      // false means it is added and we have to remove it
      // console.log("remove", data);
      dispatch(removeProductFromCart({ ...data }));
      toast.warning("Removed from Cart");
    }
  };

  const handleCartCheck = () => {
    if (
      UserCart?.selectedProducts?.find((item) => item?.docId === data?.docId)
    ) {
      setLabel(false);
      return;
    }
    setLabel(true);
  };

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
              <div className="card bg-base-100 shadow-2xl w-full sm:w-1/2 max-h-96 overflow-clip flex justify-center items-center">
                <img
                  src={data.featuredImage}
                  alt="headphones"
                  className="w-full h-auto object-cover bg-center"
                />
              </div>
              <div className="text-center sm:text-left w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
                <h1 className="text-3xl sm:text-5xl font-bold">{data.title}</h1>
                <p className="pt-6 text-start">{data.description}</p>
                <p className="pt-2">
                  {["red", "green", "blue"] && (
                    <div className="flex gap-2">
                      {data.color?.map((item) => (
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: item.value }}
                          key={item.value}
                        ></div>
                      ))}
                    </div>
                  )}
                </p>
                <div className="text-start flex items-center gap-2 mt-2">
                  <Rating number={data.review} />
                  (30)
                </div>
                <p className="py-2 text-start font-bold text-gray-700 text-lg ">
                  &#8377; {data.price}
                </p>
                <button
                  className={`btn ${label ? "btn-primary" : "btn-success"}`}
                  onClick={AddToCart}
                >
                  {label ? "Add to Cart" : "Remove"}
                </button>
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
      {number &&
        [...Array(5)].map((_, index) => (
          <input
            key={index}
            type="radio"
            name="rating-4"
            className={`mask mask-star-2 ${
              index < number / 100 ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
    </div>
  );
};
