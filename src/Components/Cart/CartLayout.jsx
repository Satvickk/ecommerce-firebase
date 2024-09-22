import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../common/LoadingButton";
import CartCard from "./Cart-card"; // Assuming CartCard is a functional component
import CHECKOUT_SERVICE from "../../Firebase/checkoutService"; // Ensure this path is correct
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";

export default function CartLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserCart = useSelector((state) => state.UserCart);
  const CheckoutDetails = useSelector((state) => state.checkout);
  
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
    } catch (error) {
      console.error("Unable to Create Order:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <header className="p-4">
        <h1 className="text-3xl font-medium flex items-center justify-center">
          Cart
          <img src={"/cart.svg"} alt={"cart"} className="w-6 h-6 ml-2" />
        </h1>
      </header>

      <main className="flex-grow flex flex-col gap-8 p-4 overflow-y-auto">
        {UserCart?.selectedProducts?.length > 0 ? (
          UserCart.selectedProducts.map((item, index) => (
            <CartCard key={index} data={item} />
          ))
        ) : (
          <p className="text-center flex-grow flex items-center justify-center">
            No Products in Cart
          </p>
        )}
      </main>

      <footer className="p-4">
        {UserCart.totalCost !== 0 ? (
          <LoadingButton
            isLoading={loading}
            className="btn btn-primary w-full"
            onClick={handleCheckout}
          >
            Checkout <t /> ₹ {UserCart.totalCost}
          </LoadingButton>
        ) : null}
      </footer>
    </div>
  );
}
