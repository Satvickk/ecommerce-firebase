export default function CheckoutProductTable({CheckoutData}) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
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
          {/* row 1 */}
          {CheckoutData?.selectedProducts.length > 0 &&
            CheckoutData?.totalCost &&
            CheckoutData?.selectedProducts.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.featuredImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td></td>
                <td>
                  {item.quantity}
                </td>
                <td></td>
                <td>₹ {item.price}</td>
              </tr>
            ))}
        </tbody>
        {/* foot */}
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
