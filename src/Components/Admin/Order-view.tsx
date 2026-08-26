import { useEffect } from "react";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";
import { AdminOrderRow } from "./order-view/AdminOrderRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function OrderView() {
  const Orders = useAppSelector((state) => state.Orders);
  const UserDetails = useAppSelector((state) => state.UserDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrdersDetails = async () => {
      try {
        const resp = await ORDER_SERVICE.getAllOrders();
        if (resp) {
          dispatch(setOrdersDetails(resp));
        }
      } catch (error) {
        console.log("Error fetching Orders details:", error);
      }
    };

    fetchOrdersDetails();
  }, [UserDetails, dispatch]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black">ALL ORDERS DATABASE</h2>
        <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
          TOTAL: {Orders?.content?.length || 0}
        </span>
      </div>

      <div className="w-full border-4 border-black bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-xs font-black uppercase tracking-widest border-b-4 border-black">
              <th className="p-4">HARDWARE PRODUCTS</th>
              <th className="p-4">ADDRESS</th>
              <th className="p-4">EMAIL</th>
              <th className="p-4">CONTACT</th>
              <th className="p-4">ORDER ID</th>
              <th className="p-4">DATE</th>
              <th className="p-4">TIME</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">DELIVERY DATE</th>
              <th className="p-4 text-right">COST</th>
              <th className="p-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Orders?.content?.length > 0 ? (
              Orders.content.map((item, index) => (
                <AdminOrderRow key={item.docId || index} data={item} />
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-12 text-center text-xs font-bold uppercase tracking-wider text-gray-500 bg-swiss-muted">
                  NO ORDERS FOUND IN DATABASE.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
