import React, { useState } from "react";

export default function UserView() {
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
        Users
      </h1>
      <div className="py-4 w-full sm:static absolute left-0 top-0">
        <table className="table w-full">
          <thead>
            <tr className="bg-black text-white">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Password</th>
              <th>House Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <OrderRow
              name={"satvick"}
              address={"A23 street, Delhi"}
              email={"satvick@example.com"}
              password={"Sp@123456"}
              contact={"123-456-789"}
              onDeleteClick={handleDeleteClick}
              onUpdateClick={handleUpdateClick}
            />
            <OrderRow
              name={"satvick"}
              address={"A23 street, Delhi"}
              email={"satvick@example.com"}
              password={"Sp@123456"}
              contact={"123-456-789"}
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

const OrderRow = ({ name, address, contact, email, password, onDeleteClick, onUpdateClick }) => {
  return (
    <tr className="bg-white">
      <td>{name}</td>
      <td>{email}</td>
      <td>{contact}</td>
      <td>{password}</td>
      <td>{address}</td>
      <td className="flex gap-3">
        <button className="btn btn-success" onClick={onUpdateClick}>Edit</button>
        <button className="btn btn-error" onClick={onDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export function DeleteModal({ onClose }) {
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Delete User</h3>
        <p className="py-4">Are you sure you want to delete user permanently?</p>
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
        <h3 className="font-bold text-lg">Update Profile</h3>
        <div className="card max-w-sm sm:max-w-full shrink-0">
          <form className="card-body" method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">House Address</span>
              </label>
              <input
                type="text"
                placeholder="House Address"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <input
                type="text"
                placeholder="Contact number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
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
