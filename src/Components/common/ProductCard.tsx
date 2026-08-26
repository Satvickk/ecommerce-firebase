import { useEffect, useState } from "react";
import { addProductToCart, removeProductFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/userWishlist";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Product } from "../../types";

interface ProductCardProps {
  data: Product;
  index?: string | number;
}

export default function ProductCard({ data }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);

  const Wishlist = useAppSelector((state) => state.Wishlist);
  const UserCart = useAppSelector((state) => state.UserCart);
  const Auth = useAppSelector((state) => state.Auth?.isLogged);

  useEffect(() => {
    handleCartCheck();
  }, [UserCart, data]);

  useEffect(() => {
    if (Wishlist?.selectedProducts?.some((item) => (item.docId || item.id) === (data.docId || data.id))) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [Wishlist, data]);

  const handleOpenModal = () => {
    const modal = document.getElementById(`my_modal_${data.docId}`) as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const handleIsWishlist = async () => {
    const willAdd = !isWishlist;
    setIsWishlist(willAdd);
    try {
      let updatedProducts: Product[] = [];
      if (willAdd) {
        dispatch(addProductToWishlist({ ...data }));
        updatedProducts = [...Wishlist.selectedProducts, data];
      } else {
        dispatch(removeProductFromWishlist({ ...data }));
        updatedProducts = Wishlist.selectedProducts.filter((item) => (item.docId || item.id) !== (data.docId || data.id));
      }
      if (Wishlist.wishlistDocId) {
        const result = await WISHLIST_SERVICE.updateWishlist(Wishlist.wishlistDocId, {
          selectedProducts: updatedProducts,
        });
        if (result) {
          toast.success(
            `${willAdd ? "Added to Wishlist" : "Removed from Wishlist"}`
          );
        }
      }
    } catch (error) {
      console.log("Error:: ", error);
      toast.error(
        `${
          willAdd
            ? "Unable to Add to Wishlist"
            : "Unable to Remove from Wishlist"
        }`
      );
    }
  };

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

  function handleDescriptionLength(value: string) {
    let newDescription = value.slice(0, 80);
    return newDescription + "...";
  }

  return (
    <>
      <div className="relative border-2 border-black bg-white group hover:border-black transition-all duration-150 flex flex-col justify-between h-full">
        {data?.featuredImage ? (
          <>
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-swiss-muted">
              <TypeTag type={data?.productType} />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleIsWishlist}
                  className={`w-8 h-8 flex items-center justify-center border border-black font-black text-xs transition-colors duration-150 ${
                    isWishlist ? "bg-swiss-accent text-white" : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                  title="Toggle Wishlist"
                >
                  ♥
                </button>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-8 h-8 flex items-center justify-center border border-black bg-white text-black font-black text-xs hover:bg-black hover:text-white transition-colors duration-150"
                  title="Expand View"
                >
                  ↗
                </button>
              </div>
            </div>

            {/* Product Image Frame */}
            <div className="relative aspect-square w-full border-b-2 border-black bg-white overflow-hidden flex items-center justify-center p-4">
              <img
                src={data?.featuredImage}
                alt={data?.title || "Product Image"}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>

            {/* Content Info */}
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <h3 className="font-black text-lg uppercase tracking-tight text-black line-clamp-1 mb-2">
                  {data?.title}
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                  {data?.description && data.description.length > 80
                    ? handleDescriptionLength(data.description)
                    : data?.description}
                </p>
              </div>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between pt-4 border-t border-black">
                <div>
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">PRICE</span>
                  <span className="text-xl font-black tracking-tight text-black">₹ {data?.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">RATING</span>
                  <span className="text-xs font-black bg-black text-white px-2 py-0.5">
                    ★ {data?.review || 4.5}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 border-2 border-black font-black text-xs uppercase tracking-widest transition-colors duration-150 ${
                  label
                    ? "bg-black text-white hover:bg-swiss-accent hover:border-swiss-accent"
                    : "bg-swiss-accent text-white border-swiss-accent hover:bg-black hover:border-black"
                }`}
                onClick={AddToCart}
              >
                {label ? "ADD TO CART +" : "REMOVE ITEM -"}
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 space-y-4">
            <div className="bg-gray-200 h-6 w-1/2 animate-pulse"></div>
            <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
            <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
          </div>
        )}
      </div>

      <ProductDetails
        data={data}
        label={label}
        AddToCart={AddToCart}
        index={data?.docId}
      />
    </>
  );
}

interface ProductDetailsProps {
  data: Product;
  label: boolean;
  AddToCart: () => void;
  index?: string | number;
}

const ProductDetails = ({ data, label, AddToCart, index }: ProductDetailsProps) => {
  return (
    <dialog id={`my_modal_${index}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-4xl w-full">
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-black text-white">
          <h3 className="font-black text-lg uppercase tracking-tight">PRODUCT SPECIFICATION</h3>
          <form method="dialog">
            <button className="text-white hover:text-swiss-accent font-black text-xl px-2" aria-label="Close">
              ✕
            </button>
          </form>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="border-2 border-black p-4 bg-swiss-muted flex items-center justify-center">
            <img
              src={data?.featuredImage}
              alt={data?.title || "Product Image"}
              className="max-h-80 object-contain"
            />
          </div>
          <div className="space-y-4 text-left">
            <TypeTag type={data?.productType} />
            <h2 className="text-3xl font-black uppercase tracking-tight text-black">{data?.title}</h2>
            <p className="text-sm text-gray-800 leading-relaxed border-l-4 border-black pl-4 py-1">
              {data?.description}
            </p>

            {data?.color && data.color.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">COLORS</span>
                <div className="flex gap-2">
                  {data.color.map((item) => (
                    <div
                      className="w-6 h-6 border-2 border-black"
                      style={{ backgroundColor: item.value }}
                      key={item.value}
                      title={item.label || item.value}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t-2 border-black flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block">TOTAL PRICE</span>
                <span className="text-2xl font-black text-black">₹ {data?.price}</span>
              </div>
              <button
                className={`px-6 py-3 border-2 border-black font-black text-xs uppercase tracking-widest ${
                  label ? "bg-black text-white hover:bg-swiss-accent" : "bg-swiss-accent text-white"
                }`}
                onClick={AddToCart}
              >
                {label ? "ADD TO CART +" : "REMOVE ITEM -"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

const TypeTag = ({ type }: { type?: string }) => {
  if (type === "newArrival") {
    return (
      <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black">
        NEW ARRIVAL
      </span>
    );
  } else if (type === "trending") {
    return (
      <span className="bg-swiss-accent text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-swiss-accent">
        TRENDING
      </span>
    );
  } else if (type === "popular") {
    return (
      <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black">
        POPULAR
      </span>
    );
  } else {
    return (
      <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border border-black">
        REGULAR
      </span>
    );
  }
};
