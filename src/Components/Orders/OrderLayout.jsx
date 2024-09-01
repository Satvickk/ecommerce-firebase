import { useEffect } from "react";
import { OrderRow } from "./OrderRow";
import { useDispatch, useSelector } from "react-redux";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";

export default function OrderLayout() {

  const Orders = useSelector((state) => state.Orders)
  const UserDetails = useSelector((state) => state.UserDetails)
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchOrdersDetails = async () => {
      try {
        const resp = await ORDER_SERVICE.getOrderByUserId(UserDetails?.userId);
        if (resp) {
          dispatch(setOrdersDetails(resp));
        }
      } catch (error) {
        console.log("Error fetching Orders details:", error);
      }
    }; 

    // if (!Orders.totalDoc <= 0) {
      fetchOrdersDetails();
    // }
  }, [UserDetails]);

  return (
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-2 sm:p-12 ">
      <h1 className="divider text-2xl sm:text-3xl font-normal">My Orders</h1>
      <div className="py-4 w-full">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
              {Orders?.content.map((item,index) =>(
                <OrderRow
                key={index}
                data={item}
                />
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr className="font-light my-3">
                ℹ️ for any concern related to your orders please contact us
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
