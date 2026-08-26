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
    <section className="w-full bg-white border-b-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black">
          <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            04. ORDER HISTORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
            MY ORDERS
          </h1>
        </div>

        <div className="w-full border-4 border-black bg-white overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white text-xs font-black uppercase tracking-widest border-b-4 border-black">
                <th className="p-4">HARDWARE PRODUCTS</th>
                <th className="p-4">DELIVERY ADDRESS</th>
                <th className="p-4">ORDER ID</th>
                <th className="p-4">DATE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">DELIVERY DATE</th>
                <th className="p-4 text-right">TOTAL COST</th>
              </tr>
            </thead>
            <tbody>
              {Orders?.content?.length > 0 ? (
                Orders.content.map((item, index) => (
                  <OrderRow key={item.docId || index} data={item} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs font-bold uppercase tracking-wider text-gray-500 bg-swiss-muted">
                    NO ORDER HISTORY RECORDED.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
