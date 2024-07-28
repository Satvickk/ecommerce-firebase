import React from "react";

export default function UserProfile() {
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl sm:text-2xl font-normal">Profile</h1>
        <UpdateModal />
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label htmlFor="name" className="font-medium">
            Full Name:
          </label>
          <p id="name" className="">
            Satvick Pathak
          </p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <p id="email" className="">
            satvick@example.com
          </p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="address" className="font-medium">
            House Address:
          </label>
          <p id="address" className="">
            123 Main St, Springfield
          </p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="contact" className="font-medium">
            Contact Number:
          </label>
          <p id="contact" className="">
            123-456-7890
          </p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="password" className="font-medium">
            Password:
          </label>
          <p id="password" className="">
            Sp@123456
          </p>
        </div>
      </div>
    </div>
  );
}

export function UpdateModal() {
  return (
    <>
      <button
        className="btn btn-success"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Update
      </button>
      <dialog id="my_modal_4" className="modal">
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
                <button className="btn btn-ghost" type="button" onClick={() => document.getElementById("my_modal_4").close()}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
