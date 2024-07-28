import { useState } from "react";

export default function OrderView() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
              <th>Product</th>
              <th>Price (&#8377;)</th>
              <th>Date</th>
              <th>Address</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <OrderRow
              product={"Boat Airdopes"}
              price={200}
              date={"28-07-2024"}
              address={"A23 street, Delhi"}
              status={"pending"}
              onDeleteClick={handleDeleteClick}
              onUpdateClick={handleUpdateClick}
            />
            <OrderRow
              product={"Boat Airdopes"}
              price={200}
              date={"28-07-2024"}
              address={"A23 street, Delhi"}
              status={"delivered"}
              onDeleteClick={handleDeleteClick}
              onUpdateClick={handleUpdateClick}
            />
            <OrderRow
              product={"Boat Airdopes"}
              price={200}
              date={"28-07-2024"}
              address={"A23 street, Delhi"}
              status={"not delivered"}
              onDeleteClick={handleDeleteClick}
              onUpdateClick={handleUpdateClick}
            />
          </tbody>
        </table>
      </div>
      {showDeleteModal && <DeleteModal onClose={closeDeleteModal} />}
      {showUpdateModal && <UpdateModal onClose={closeUpdateModal} />}
    </div>
  );
}

const OrderRow = ({ product, price, date, address, status, onDeleteClick, onUpdateClick }) => {
  return (
    <tr className="bg-white">
      <td>{product}</td>
      <td>{price}</td>
      <td>{date}</td>
      <td>{address}</td>
      <td><StatusChip value={status} /></td>
      <td className="flex gap-3">
        <button className="btn btn-success" onClick={onUpdateClick}>Edit</button>
        <button className="btn btn-error" onClick={onDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const StatusChip = ({ value }) => {
  if (value === "pending") {
    return <span className="badge bg-yellow-400">Pending</span>;
  } else if (value === "delivered") {
    return <span className="badge bg-green-400">Delivered</span>;
  } else {
    return <span className="badge bg-red-400">Not Delivered</span>;
  }
};

export function DeleteModal({ onClose }) {
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Delete Product</h3>
        <p className="py-4">Are you sure you want to delete this product permanently?</p>
        <div className="modal-action">
          <button className="btn btn-primary mr-1" onClick={onClose}>
            Delete
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function UpdateModal({ onClose }) {
  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Update Product</h3>
        <div className="card max-w-sm sm:max-w-full shrink-0">
          <form className="card-body" method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reviews</span>
              </label>
              <input
                type="number"
                placeholder="Reviews"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                type="number"
                placeholder="Rating"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Category"
                className="input input-bordered"
                required
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
              <button className="btn btn-ghost" type="button" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
