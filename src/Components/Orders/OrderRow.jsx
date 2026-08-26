export const OrderRow = ({ data }) => {
  const StatusChip = ({ value }) => {
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
  return <tr className="border-b border-black last:border-b-0 hover:bg-swiss-muted text-xs font-bold uppercase tracking-wider text-black"><td className="p-4">{data?.orderDetails?.selectedProducts?.map((item, index) => <div className="flex items-center gap-3 mb-2 last:mb-0" key={item.docId || index}><div className="w-10 h-10 border border-black bg-white p-0.5 shrink-0 flex items-center justify-center"><img
    src={item?.featuredImage}
    alt={item?.title || "product image"}
    className="max-h-full object-contain"
  /></div><div><div className="font-black text-black">{item?.title}</div><div className="text-[10px] text-gray-500 font-bold">QTY: {item?.quantity}</div></div></div>)}</td><td className="p-4"><div>{data?.customerDetails?.address} {data?.customerDetails?.pincode}</div><div className="text-[10px] text-gray-500 font-bold mt-1">TEL: {data?.customerDetails?.contact}</div></td><td className="p-4 font-mono font-black">{data?.orderId}</td><td className="p-4 font-mono">{data?.orderDate ? data.orderDate.includes("at") ? data.orderDate.split("at")[0] : data.orderDate : "-"}</td><td className="p-4"><StatusChip value={data?.deliveryStatus} /></td><td className="p-4 font-mono">{data?.deliveryDate ? data.deliveryDate : "-"}</td><td className="p-4 text-right font-black text-sm text-black">₹ {data?.orderDetails?.totalCost || 0}</td></tr>;
};
