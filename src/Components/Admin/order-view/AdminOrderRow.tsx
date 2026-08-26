import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import LoadingButton from "../../common/LoadingButton";
import { toast } from "react-toastify";
import ORDER_SERVICE from "../../../Firebase/orderService";
import { updateOrderDetails } from "../../../redux/orderSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Order } from "../../../types";

interface AdminOrderRowProps {
  data: Order;
}

export const AdminOrderRow = ({ data }: AdminOrderRowProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleUpdateStatus = async (value: { selectedStatus: number; formattedDateTime: string }) => {
    if (!data.docId) return;
    try {
      const resp = await ORDER_SERVICE.updateOrderStatus(data.docId, {
        deliveryStatus: value.selectedStatus,
        deliveryDate: value.formattedDateTime
      });
      if (resp) {
        dispatch(updateOrderDetails({
          ...data,
          deliveryStatus: value.selectedStatus,
          deliveryDate: value.formattedDateTime
        }));
        setIsModalOpen(false);
        toast.success("Delivery Status Updated");
      }
    } catch (error) {
      console.log("Error Updating Status::", error);
      toast.error("Error Updating Delivery Status");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (status: number) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const StatusChip = ({ value }: { value?: number }) => {
    if (value === 2) {
      return <span className="text-yellow-400 font-semibold">Pending</span>;
    } else if (value === 1) {
      return <span className="text-green-400 font-semibold">Delivered</span>;
    } else if (value === 3) {
      return <span className="text-blue-600 font-semibold">Cancelled</span>;
    } else if (value === 5) {
      return <span className="font-semibold text-green-500">Delivery Scheduled</span>;
    } else {
      return <span className="text-red-400 font-semibold">Not Delivered</span>;
    }
  };

  return (
    <>
      <tr>
        <td>
          {data.orderDetails?.selectedProducts?.map((item, index) => (
            <div className="flex items-center gap-3 mb-2" key={item.docId || index}>
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={item.featuredImage} alt="product image" />
                </div>
              </div>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm opacity-50">
                  Quantity - {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </td>
        <td>
          {data.customerDetails?.address} {data.customerDetails?.pincode}
        </td>
        <td>{data.customerDetails?.email}</td>
        <td>{data.customerDetails?.contact}</td>
        <td>{data.orderId}</td>
        <td>{data.orderDate ? (data.orderDate.includes("at") ? data.orderDate.split("at")[0] : data.orderDate) : "-"}</td>
        <td>{data.orderDate ? (data.orderDate.includes("at") ? data.orderDate.split("at")[1] : "-") : "-"}</td>
        <td>
          <StatusChip value={data.deliveryStatus} />
        </td>
        <td>{data.deliveryDate ? data.deliveryDate : "-"}</td>
        <td>{data.deliveryCancelledDate ? data.deliveryCancelledDate : "-"}</td>
        <td>₹ {data.orderDetails?.totalCost || 0}</td>
        <th>
          <LoadingButton
            isLoading={loading}
            className={`btn btn-sm text-white text-nowrap ${(data.deliveryStatus === 2 || data.deliveryStatus === 5 ) ? ' bg-green-600 btn-ghost' : 'bg-gray-400 btn-disabled'}`}
            onClick={() => openModal(1)}
          >
            Update Status
          </LoadingButton>
        </th>
      </tr>
      <StatusUpdateModal
        handleUpdateStatus={handleUpdateStatus}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

interface StatusUpdateModalProps {
  handleUpdateStatus: (value: { selectedStatus: number; formattedDateTime: string }) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function StatusUpdateModal({ handleUpdateStatus, isOpen, onClose }: StatusUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<number>(2);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());

  const handleSubmit = () => {
    const formattedDateTime = (selectedDateTime || new Date()).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const updatedStatus = {
      selectedStatus,
      formattedDateTime,
    };

    handleUpdateStatus(updatedStatus);
    toast.success("Order status updated successfully!");
    onClose();
  };

  return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Order Status</h3>

        <div className="grid grid-cols-2">
          <div className="py-4 grid-cols-1">
            <label className="block mb-2">Select Status</label>
            <select
              className="select select-bordered w-full"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(Number(e.target.value))}
            >
              <option value={1}>Delivered</option>
              <option value={3}>Cancelled</option>
              <option value={4}>Not Delivered</option>
              <option value={5}>Delivery Scheduled</option>
            </select>
          </div>

          <div className="py-4 grid-cols-1">
            <label className="block mb-2">Select Date & Time</label>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date: Date | null) => setSelectedDateTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="input input-bordered w-full max-h-full"
              popperClassName="z-50"
              popperPlacement="top-end"
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary mr-1" onClick={handleSubmit}>
            Update
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
