import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
export default function CartCard({ data }) {
  const dispatch = useAppDispatch();
  function increaseQuantity() {
    dispatch(increaseProductQuantity(data));
  }
  function decreaseQuantity() {
    dispatch(decreaseProductQuantity(data));
  }
  const RemoveFromCart = () => {
    dispatch(removeProductFromCart({ ...data }));
    toast.warning("Removed from Cart");
  };
  return <div className="border-2 border-black bg-white p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center rounded-none relative"><button
    className="absolute top-3 right-3 text-black font-black text-base hover:text-swiss-accent transition-colors duration-150"
    onClick={RemoveFromCart}
    title="Remove Item"
  >
        ✕
      </button><div className="sm:col-span-3 border-2 border-black bg-swiss-muted p-4 h-36 flex items-center justify-center"><img src={data?.featuredImage} alt={data?.title} className="max-h-full object-contain" /></div><div className="sm:col-span-9 flex flex-col justify-between space-y-4"><div><h3 className="font-black text-lg uppercase tracking-tight text-black">{data?.title}</h3><span className="text-xl font-black text-black">₹ {data?.price}</span></div><div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black"><div className="flex items-center border-2 border-black"><button
    className="w-10 h-10 flex items-center justify-center font-black bg-white hover:bg-black hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
    disabled={data?.quantity < 2}
    onClick={decreaseQuantity}
  >
              -
            </button><div className="w-12 h-10 border-x-2 border-black flex items-center justify-center font-black text-sm bg-swiss-muted">{data?.quantity}</div><button
    className="w-10 h-10 flex items-center justify-center font-black bg-white hover:bg-black hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
    disabled={data?.quantity >= 5}
    onClick={increaseQuantity}
  >
              +
            </button></div><div className="text-right"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">SUBTOTAL</span><span className="text-lg font-black text-black">₹ {data?.price * data?.quantity}</span></div></div></div></div>;
}
