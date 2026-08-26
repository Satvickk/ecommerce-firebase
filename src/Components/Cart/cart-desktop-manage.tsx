import { useNavigate } from "react-router-dom";
import CartCard from "./Cart-card";
import { useState } from "react";
import LoadingButton from "../common/LoadingButton";
import { toast } from "react-toastify";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function CartDesktopManage() {
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
          totalCost: totalCost,
        });
        if (checkout) {
          dispatch(
            setCheckoutProducts({
              selectedProducts: [...selectedProducts],
              totalCost: totalCost ? totalCost : 0,
              checkoutDocId: checkout.id,
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

  return (
    <>
      <h1 className="divider text-md sm:text-xl my-8 font-medium">
        Cart
        <img src={"/cart.svg"} alt={"cart"} className="w-6 h-6 inline-block" />
      </h1>
      <div className="flex flex-col gap-4">
        {UserCart?.selectedProducts?.map((item, index) => (
          <CartCard key={item.docId || index} data={item} />
        ))}
      </div>
      {UserCart.totalCost !== 0 ? (
        <LoadingButton
          isLoading={loading}
          className="btn btn-primary w-full my-4"
          onClick={handleCheckout}
        >
          Checkout ₹ {UserCart.totalCost}
        </LoadingButton>
      ) : (
        <p className="text-center">No Products in Cart</p>
      )}
    </>
  );
}
