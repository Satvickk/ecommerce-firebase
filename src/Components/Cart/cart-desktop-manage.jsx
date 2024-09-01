import { useNavigate } from "react-router-dom";
import CartCard from "./Cart-card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingButton from "../common/LoadingButton";
import { toast } from "react-toastify";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { setCheckoutProducts } from "../../redux/checkoutSlice";

export default function CartDesktopManage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserCart = useSelector((state) => state.UserCart);
  const CheckoutDetails = useSelector((state) => state.checkout)

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      if(CheckoutDetails?.checkoutDocId){
        const { checkoutDocId } = CheckoutDetails;
        CHECKOUT_SERVICE.deleteCheckout(checkoutDocId)
      }
      // console.log("Adding new product:", UserCart);
      const { selectedProducts, totalCost } = UserCart;
      if (selectedProducts.length > 0 && totalCost) {
        const checkout = await CHECKOUT_SERVICE.createCheckout({
          selectedProducts: [...selectedProducts],
          totalCost: totalCost,
        });
        dispatch(
          setCheckoutProducts({
            selectedProducts: [...selectedProducts],
            totalCost: totalCost,
            checkoutDocId: checkout.id,
          })
        );
        toast.success("Order Created Successfully");
        navigate("/checkout");
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
          <CartCard key={index} data={item} />
        ))}
      </div>
      {UserCart.totalCost !== 0 ? (
        <LoadingButton
          isLoading={loading}
          className="btn btn-primary w-full my-4"
          onClick={handleCheckout}
        >
          Checkout <t /> ₹ {UserCart.totalCost}
        </LoadingButton>
      ) : (
        <p className="text-center">No Products in Cart</p>
      )}
    </>
  );
}
