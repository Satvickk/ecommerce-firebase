import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

export default function ProductCard({ data }) {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(true);
  const UserCart = useSelector((state) => state.UserCart);

  useEffect(() => {
    handleCartCheck();
  }, [UserCart, data]);

  const handleOpenModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

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
      <div className="relative card card-compact bg-base-100 w-80 sm:w-96 shadow-xl">
        <div className="absolute z-10 top-0 right-3 flex gap-4 px-3 py-2 rounded-xl">
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
              className="inline-block mr-2 swap-on h-6 w-6"
            />
          </label>
          <img
            src="/expand-view.svg"
            alt="view details"
            className="inline-block mr-2 h-6 w-6 cursor-pointer"
            onClick={handleOpenModal}
          />
          {/* compare functionality */}
          {/* <img
            src="/exchange.svg"
            alt="exchange"
            className="inline-block mr-2 h-6 w-6"
          /> */}
        </div>
      <TypeTag type={data?.productType}/>
        <figure className="min-h-[213px] max-h-[260px] min-w-[320px] max-w-[384px] overflow-hidden bg-black">
          <img
            src={data?.featuredImage}
            alt={data?.title || "product image"}
            className="object-cover bg-center"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data?.title}</h2>
          <p className="text-start">{data?.description}</p>

          <div className="text-start flex items-center gap-2">
            <Rating reviews={data?.review} />({data?.review})
          </div>
          <p className="text-start font-bold text-gray-700 text-lg">
            &#8377; {data?.price}
          </p>
          <div className="card-actions justify-end">
            <button
              className={`btn ${label ? "btn-primary" : "btn-success"}`}
              onClick={AddToCart}
            >
              {label ? "Add to Cart" : "Remove"}
            </button>
          </div>
        </div>
      </div>

      <ProductDetails
        data={data}
        label={label}
        AddToCart={AddToCart}
      />
    </>
  );
}

const ProductDetails = ({data, label, AddToCart}) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
          <button
            className="btn sm:btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50"
            aria-label="Close"
          >
            ✕
          </button>
        </form>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-3">
              <img src={data.featureImage} alt={data.title || "product image"} />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">{data.title}</h1>
              <p className="pt-6 text-start">{data.description}</p>
              <p className="pt-2">
                {data.color.length > 0 && (
                  <div className="flex gap-2">
                    {data.color.map((item, index) => {
                      // console.log(item.value)
                      return(
                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: item.value }}
                        key={item.value}
                      ></div>
                    )}
                    )}
                  </div>
                )}
              </p>
              <p className="py-2 text-sm text-start">
                Customer reviews ({data.review})
              </p>
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
    </dialog>
  );
};

const Rating = ({ reviews }) => {
  let number = Math.round(Number(reviews) / 100);
  number = Math.max(0, Math.min(5, number));

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
            readOnly
          />
        ))}
    </div>
  );
};

const TypeTag = ({type}) => {
  if(type === "newArrival"){
    return(
      <div className="badge bg-green-600 text-white gap-2 px-2 py-3 m-3 top-4 left-4 rounded-full">
      New Arrival
    </div>
    )}
    else if(type === "trending"){
    return(
      <div className="badge bg-red-600 text-white px-2 py-3 gap-2 m-3 top-4 left-4 rounded-full">
      Trending
    </div>
    )
  }
    else if(type === "popular"){
    return(
      <div className="badge bg-yellow-500 rounded-full gap-2 px-2 py-3 m-3 top-4 left-4">
      Popular
    </div>
    )
  }
}
