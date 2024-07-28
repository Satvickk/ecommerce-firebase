export default function OrderLayout() {
  return (
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-2 sm:p-12 ">
      <h1 className="divider text-2xl sm:text-3xl font-normal">My Orders</h1>
      <div className="py-4 w-full">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-300">
              <th>Product</th>
              <th>Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            <OrderRow
              title={"Boat AirDopes M1"}
              price={250}
              date={"28-07-2024"}
            />
            <OrderRow
              title={"Boat AirDopes M1"}
              price={250}
              date={"28-07-2024"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

const OrderRow = ({ title, price, date }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>&#8377; {price}</td>
      <td>{date}</td>
    </tr>
  );
};
