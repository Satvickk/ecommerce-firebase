import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../common/LoadingButton";
import CartCard from "./Cart-card";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function CartLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const UserCart = useAppSelector((state) => state.UserCart);
  const CheckoutDetails = useAppSelector((state) => state.Checkout);
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (CheckoutDetails?.checkoutDocId) {
        const { checkoutDocId } = CheckoutDetails;
        await CHECKOUT_SERVICE.deleteCheckout(checkoutDocId);
      }
      const { selectedProducts, totalCost } = UserCart;
      if (selectedProducts.length > 0 && totalCost) {
        const checkout = await CHECKOUT_SERVICE.createCheckout({
          selectedProducts: [...selectedProducts],
          totalCost
        });
        if (checkout) {
          dispatch(
            setCheckoutProducts({
              selectedProducts: [...selectedProducts],
              totalCost: totalCost ? totalCost : 0,
              checkoutDocId: checkout.id
            })
          );
          toast.success("Order Created Successfully");
          navigate("/checkout");
        }
      }
    } catch (error) {
      console.error("Unable to Create Order:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return <section className="w-full bg-white min-h-screen border-b-4 border-black py-12"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            01. SHOPPING BAG
          </span><h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
            YOUR CART
          </h1></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">{
    /* Cart Products List */
  }<div className="lg:col-span-8 space-y-6">{UserCart?.selectedProducts?.length > 0 ? UserCart.selectedProducts.map((item, index) => <CartCard key={item.docId || index} data={item} />) : <div className="border-4 border-black p-12 text-center bg-swiss-muted"><h3 className="text-xl font-black uppercase tracking-tight mb-2">YOUR CART IS EMPTY</h3><p className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-6">
                  EXPLORE OUR CATALOG TO ADD AUDIO EQUIPMENT.
                </p><button
    onClick={() => navigate("/product")}
    className="bg-black text-white px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-swiss-accent transition-colors duration-150"
  >
                  EXPLORE CATALOG →
                </button></div>}</div>{
    /* Cart Summary Side Block */
  }{UserCart.totalCost !== 0 && <div className="lg:col-span-4 border-4 border-black bg-swiss-muted p-6 sticky top-24 space-y-6"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
                02. ORDER SUMMARY
              </h3><div className="space-y-3 text-xs font-bold uppercase tracking-wider"><div className="flex justify-between"><span>ITEMS SUB-TOTAL</span><span>₹ {UserCart.totalCost}</span></div><div className="flex justify-between"><span>SHIPPING & HANDLING</span><span className="text-swiss-accent">FREE</span></div><div className="flex justify-between"><span>TAXES</span><span>INCLUDED</span></div></div><div className="pt-4 border-t-4 border-black flex justify-between items-center"><span className="text-xs font-black uppercase tracking-widest">TOTAL AMOUNT</span><span className="text-2xl font-black text-black">₹ {UserCart.totalCost}</span></div><LoadingButton
    isLoading={loading}
    className="w-full py-4 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150 rounded-none"
    onClick={handleCheckout}
  >
                PROCEED TO CHECKOUT →
              </LoadingButton></div>}</div></div></section>;
}
