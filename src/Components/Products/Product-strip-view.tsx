import { useEffect, useState } from "react";
import { addProductToCart, removeProductFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product } from "../../types";

interface ProductStripViewProps {
  data: Product;
}

export default function ProductStripView({ data }: ProductStripViewProps) {
  const [label, setLabel] = useState(true);

  const dispatch = useAppDispatch();
  const UserCart = useAppSelector((state) => state.UserCart);
  const Auth = useAppSelector((state) => state.Auth?.isLogged);

  useEffect(() => {
    handleCartCheck();
  }, [UserCart, data]);

  const AddToCart = () => {
    if (!Auth) {
      toast.info("Please Login to Add products to Cart");
      return;
    }
    handleCartCheck();
    if (label) {
      dispatch(addProductToCart({ ...data }));
      toast.success("Added to Cart");
    } else {
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
    <div className="border-2 border-black bg-white p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center hover:border-black transition-colors duration-150 rounded-none">
      <div className="sm:col-span-4 border-2 border-black bg-swiss-muted p-4 h-48 flex items-center justify-center">
        <img
          src={data.featuredImage}
          alt={data.title}
          className="max-h-full object-contain"
        />
      </div>

      <div className="sm:col-span-8 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-xl uppercase tracking-tight text-black">{data.title}</h3>
            <span className="text-xl font-black text-black">₹ {data.price}</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed border-l-2 border-black pl-3 py-0.5">
            {data.description}
          </p>
        </div>

        {data.color && data.color.length > 0 && (
          <div className="flex gap-2">
            {data.color.map((item) => (
              <div
                className="w-5 h-5 border border-black"
                style={{ backgroundColor: item.value }}
                key={item.value}
              ></div>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">RATING</span>
            <span className="text-xs font-black bg-black text-white px-2 py-0.5">
              ★ {data.review || 4.5}
            </span>
          </div>

          <button
            className={`px-6 py-2.5 border-2 border-black font-black text-xs uppercase tracking-widest transition-colors duration-150 ${
              label
                ? "bg-black text-white hover:bg-swiss-accent hover:border-swiss-accent"
                : "bg-swiss-accent text-white border-swiss-accent hover:bg-black hover:border-black"
            }`}
            onClick={AddToCart}
          >
            {label ? "ADD TO CART +" : "REMOVE ITEM -"}
          </button>
        </div>
      </div>
    </div>
  );
}
