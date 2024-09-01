import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";
import { AdminOrderRow } from "./order-view/AdminOrderRow";

export default function OrderView() {
  const Orders = useSelector((state) => state.Orders);
  const UserDetails = useSelector((state) => state.UserDetails);
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    // if (!Orders.totalDoc <= 0) {
    fetchOrdersDetails();
    // }
  }, [UserDetails]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div className="text-center w-full flex justify-center items-center flex-col gap-8 p-2 sm:p-12 overflow-x-scroll h-screen sm:h-auto relative sm:static">
      <h1 className="divider divider-start hidden sm:block text-2xl sm:text-3xl font-normal">
        Orders
      </h1>
      <div className="py-4 w-full sm:static absolute left-0 top-0">
        <table className="table w-full">
          <thead>
            <tr className="bg-black text-white">
              <th>Products</th>
              <th>Delivery Address</th>
              <th>Customer Email</th>
              <th>Customer Contact</th>
              <th>OrderId</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Delivery Status</th>
              <th>Delivery Date</th>
              <th>Cancelled Date</th>
              <th>Total Cost (₹)</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Orders?.content.map((item, index) => (
              <AdminOrderRow key={index} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



