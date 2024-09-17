import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../common/ProductCard";
import { useEffect } from "react";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { toast } from "react-toastify";
import { setWishlist } from "../../redux/userWishlist";
import ComingSoon from "../common/ComingSoon";

export default function Products() {
  const dispatch = useDispatch();
  const Wishlist = useSelector((state) => state.Wishlist);
  const Auth = useSelector((state) => state.Auth);

  useEffect(() => {
    async function getCustomerWishlist(id) {
      try {
        const resp = await WISHLIST_SERVICE.getUserWishlist(id);
        console.log("resp", resp);
        // const { selectedProducts, totalCost, checkoutDocId } = CheckoutData;
        if (resp) {
          dispatch(
            setWishlist({
              selectedProducts: resp?.selectedProducts || [],
              totalDoc: resp?.selectedProducts?.length || 0,
              wishlistDocId: resp?.wishlistDocId || "",
            })
          );
        }
      } catch (error) {
        console.log("Error ::", error);
        toast.warning("Error in fetching user Wishlist");
      }
    }

    if (Wishlist.totalDoc <= 0) {
      getCustomerWishlist(Auth?.userId);
    }
  }, []);

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
