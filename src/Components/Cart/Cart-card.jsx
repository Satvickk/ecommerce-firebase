import { useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";

export default function CartCard({ data }) {
  const dispatch = useDispatch();

  function increaseQuantity() {
    dispatch(increaseProductQuantity(data));
  }

  function decreaseQuantity() {
    dispatch(decreaseProductQuantity(data));
  }

  const RemoveFromCart = () => {
    // console.log("remove", data);
    dispatch(removeProductFromCart({ ...data }));
    toast.warning("Removed from Cart");
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl flex-col sm:flex-row items-center">
      <button
        className="hidden sm:block btn sm:btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50"
        onClick={RemoveFromCart}
      >
        ✕
      </button>
      {/* <figure className="sm:h-[100px] sm:w-[150px] overflow-hidden"> */}
      <figure className="sm:h-[200px] sm:w-[200px] overflow-hidden ">
        <img src={data?.featuredImage} alt="product" className="object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data?.title}</h2>
        <p className="text-start font-bold text-gray-700 text-lg">
          &#8377; {data?.price}
        </p>
        <div className="card-actions justify-center sm:justify-end gap-20 sm:gap-0 mt-6">
          <div className="join">
            <button
              className={`btn join-item rounded-l-full ${
                data?.quantity < 2 && "btn-disabled btn-ghost"
              }`}
              onClick={decreaseQuantity}
            >
              {" "}
              -{" "}
            </button>
            <p
              className="input input-bordered join-item w-12 text-center flex items-center justify-center"
              placeholder="text"
              readOnly
            >
              {data?.quantity}
            </p>
            <button
              className={`btn join-item rounded-r-full ${
                data?.quantity >= 5 && "btn-disabled btn-ghost"
              }`}
              onClick={increaseQuantity}
            >
              {" "}
              +{" "}
            </button>
          </div>
          <button
            className="sm:hidden block btn btn-primary"
            onClick={RemoveFromCart}
          >
            Remove
          </button>
        </div>
      </div>
      <p className="text-xs absolute bottom-2 right-2">
        maximun quantity for each product is 5
      </p>
    </div>
  );
}
