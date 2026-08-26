import ProductCard from "../common/ProductCard";
import { useEffect } from "react";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { toast } from "react-toastify";
import { setWishlist } from "../../redux/userWishlist";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function WishListProduct() {
  const dispatch = useAppDispatch();
  const Wishlist = useAppSelector((state) => state.Wishlist);
  const Auth = useAppSelector((state) => state.Auth);

  useEffect(() => {
    async function getCustomerWishlist(id: string) {
      try {
        const resp = await WISHLIST_SERVICE.getUserWishlist(id);
        if (resp) {
          dispatch(
            setWishlist({
              customerId: resp?.customerId || id || Auth?.userId || "",
              selectedProducts: resp?.selectedProducts || [],
              wishlistDocId: resp?.wishlistDocId || "",
            })
          );
        }
      } catch (error) {
        console.log("Error ::", error);
        toast.warning("Error in fetching user Wishlist");
      }
    }

    if (Auth?.userId && Wishlist.selectedProducts.length <= 0) {
      getCustomerWishlist(Auth.userId);
    }
  }, [Auth?.userId, Wishlist.selectedProducts.length, dispatch]);

  return (
    <section className="w-full bg-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black">
          <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            03. SAVED SELECTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
            MY WISHLIST
          </h1>
        </div>

        {Wishlist.selectedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Wishlist.selectedProducts.map((item, index) => (
              <ProductCard key={item.docId || index} data={item} />
            ))}
          </div>
        ) : (
          <div className="border-4 border-black p-12 text-center bg-swiss-muted">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">NO WISHLIST ITEMS SAVED</h3>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-6">
              BROWSE OUR AUDIO HARDWARE PRODUCTS AND CLICK HEART TO SAVE.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
