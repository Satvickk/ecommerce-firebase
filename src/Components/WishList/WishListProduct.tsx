import ProductCard from "../common/ProductCard";
import { useEffect } from "react";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { toast } from "react-toastify";
import { setWishlist } from "../../redux/userWishlist";
import ComingSoon from "../common/ComingSoon";
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
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-12">
      <h1 className="divider text-2xl sm:text-3xl font-normal">My WishList</h1>

      {Wishlist.customerId ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
          {Wishlist?.selectedProducts.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      ) : (
        <div className="grid gap-10 py-4">
          <ComingSoon />
        </div>
      )}
    </div>
  );
}
