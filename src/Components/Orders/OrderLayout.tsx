import { useEffect } from "react";
import { OrderRow } from "./OrderRow";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function OrderLayout() {
  const Orders = useAppSelector((state) => state.Orders);
  const UserDetails = useAppSelector((state) => state.UserDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrdersDetails = async () => {
      if (!UserDetails?.userId) return;
      try {
        const resp = await ORDER_SERVICE.getOrderByUserId(UserDetails.userId);
        if (resp) {
          dispatch(setOrdersDetails(resp));
        }
      } catch (error) {
        console.log("Error fetching Orders details:", error);
      }
    }; 

    if (UserDetails?.userId) {
      fetchOrdersDetails();
    }
  }, [UserDetails?.userId, dispatch]);

  return (
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-2 sm:p-12 ">
      <h1 className="divider text-2xl sm:text-3xl font-normal">My Orders</h1>
      <div className="py-4 w-full">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Products</th>
                <th>Delivery Address</th>
                <th>OrderId</th>
                <th>Order Date</th>
                <th>Delivery Status</th>
                <th>Delivery Date</th>
                <th>Total Cost (₹)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Orders?.content?.map((item, index) => (
                <OrderRow
                  key={item.docId || index}
                  data={item}
                />
              ))}
            </tbody>
            <tfoot>
              <tr className="font-light my-3">
                <td colSpan={8}>
                  ℹ️ for any concern related to your orders please contact us
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
