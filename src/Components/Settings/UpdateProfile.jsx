export default function UpdateProfile() {
  return (
    <div>
      <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
        Update Profile
      </h1>
      <div className="card bg-base-100 w-full max-w-sm sm:max-w-full shrink-0 shadow-2xl">
        <form className="card-body">
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
              type="address "
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
            {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
          </div>
          <div className="form-control mt-6 gap-3">
            <button className="btn btn-primary">Update</button>
            <button className="btn btn-ghost">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
