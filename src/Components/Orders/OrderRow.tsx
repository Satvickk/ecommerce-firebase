import { Order } from "../../types";

interface OrderRowProps {
  data: Order;
}

export const OrderRow = ({ data }: OrderRowProps) => {
  const StatusChip = ({ value }: { value?: number }) => {
    if (value === 2) {
      return <span className="badge bg-yellow-400">Pending</span>;
    } else if (value === 1) {
      return <span className="badge bg-green-400">Delivered</span>;
    } else if (value === 3) {
      return <span className="badge bg-blue-600 text-white">Cancelled</span>;
    } else if (value === 5) {
      return <span className="badge bg-green-500">Delivery Scheduled</span>;
    } else {
      return <span className="badge bg-red-400 ">Not Delivered</span>;
    }
  };

  return (
    <tr>
      <td>
        {data?.orderDetails?.selectedProducts?.map((item, index) => (
          <div className="flex items-center gap-3 mb-2" key={item.docId || index}>
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item?.featuredImage}
                  alt={item?.title || "product image"}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{item?.title}</div>
              <div className="text-sm opacity-50">Quantity - {item?.quantity}</div>
            </div>
          </div>
        ))}
      </td>
      <td>
        {data?.customerDetails?.address} {data?.customerDetails?.pincode}
        <br />
        <span className="badge badge-ghost badge-sm">
          Contact No. - {data?.customerDetails?.contact}
        </span>
      </td>
      <td>{data?.orderId}</td>
      <td>{data?.orderDate ? (data.orderDate.includes("at") ? data.orderDate.split("at")[0] : data.orderDate) : "-"}</td>
      <td><StatusChip value={data?.deliveryStatus}/></td>
      <td>{data?.deliveryDate ? data.deliveryDate : "-"}</td>
      <td>₹ {data?.orderDetails?.totalCost || 0}</td>
    </tr>
  );
};
