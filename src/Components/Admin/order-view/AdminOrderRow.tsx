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
    if (value === 1) {
      return <span className="bg-black text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest border border-black">DELIVERED</span>;
    } else if (value === 2) {
      return <span className="bg-white text-black border-2 border-black px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">PENDING</span>;
    } else if (value === 3) {
      return <span className="bg-swiss-accent text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">CANCELLED</span>;
    } else if (value === 5) {
      return <span className="bg-black text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">SCHEDULED</span>;
    } else {
      return <span className="bg-swiss-accent text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">NOT DELIVERED</span>;
    }
  };

  return (
    <>
      <tr className="border-b border-black last:border-b-0 hover:bg-swiss-muted text-xs font-bold uppercase tracking-wider text-black">
        <td className="p-4">
          {data.orderDetails?.selectedProducts?.map((item, index) => (
            <div className="flex items-center gap-3 mb-2 last:mb-0" key={item.docId || index}>
              <div className="w-10 h-10 border border-black bg-white p-0.5 shrink-0 flex items-center justify-center">
                <img src={item.featuredImage} alt="product image" className="max-h-full object-contain" />
              </div>
              <div>
                <div className="font-black text-black">{item.title}</div>
                <div className="text-[10px] text-gray-500 font-bold">QTY: {item.quantity}</div>
              </div>
            </div>
          ))}
        </td>
        <td className="p-4">
          <div>{data.customerDetails?.address} {data.customerDetails?.pincode}</div>
        </td>
        <td className="p-4">{data.customerDetails?.email}</td>
        <td className="p-4">{data.customerDetails?.contact}</td>
        <td className="p-4 font-mono font-black">{data.orderId}</td>
        <td className="p-4 font-mono">{data.orderDate ? (data.orderDate.includes("at") ? data.orderDate.split("at")[0] : data.orderDate) : "-"}</td>
        <td className="p-4 font-mono">{data.orderDate ? (data.orderDate.includes("at") ? data.orderDate.split("at")[1] : "-") : "-"}</td>
        <td className="p-4"><StatusChip value={data.deliveryStatus} /></td>
        <td className="p-4 font-mono">{data.deliveryDate ? data.deliveryDate : "-"}</td>
        <td className="p-4 text-right font-black text-sm text-black">₹ {data.orderDetails?.totalCost || 0}</td>
        <td className="p-4">
          <button
            className="bg-black text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none whitespace-nowrap"
            onClick={() => openModal(1)}
          >
            UPDATE STATUS →
          </button>
        </td>
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
      <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-lg w-full">
        <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
          <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">UPDATE DELIVERY STATUS</h3>
          <button onClick={onClose} className="text-white hover:text-swiss-accent font-black text-lg">✕</button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">STATUS</label>
              <select
                className="w-full bg-white border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(Number(e.target.value))}
              >
                <option value={1}>Delivered</option>
                <option value={3}>Cancelled</option>
                <option value={4}>Not Delivered</option>
                <option value={5}>Delivery Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">DATE & TIME</label>
              <DatePicker
                selected={selectedDateTime}
                onChange={(date: Date | null) => setSelectedDateTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
                popperClassName="z-50"
                popperPlacement="top-end"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              className="w-full py-3 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none"
              onClick={handleSubmit}
            >
              SAVE STATUS →
            </button>
            <button
              className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-swiss-muted transition-colors duration-150 rounded-none"
              onClick={onClose}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
