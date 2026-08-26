import { CheckoutState } from "../../types";

interface CheckoutProductTableProps {
  CheckoutData: CheckoutState;
}

export default function CheckoutProductTable({ CheckoutData }: CheckoutProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th></th>
            <th>Quantity</th>
            <th></th>
            <th>Price (₹)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {CheckoutData?.selectedProducts?.length > 0 &&
            CheckoutData?.totalCost &&
            CheckoutData.selectedProducts.map((item, index) => (
              <tr key={item.docId || index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.featuredImage}
                          alt={item.title || "Product"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td></td>
                <td>{item.quantity}</td>
                <td></td>
                <td>₹ {item.price}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Total Price</th>
            <th></th>
            <th>₹ {CheckoutData.totalCost}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
