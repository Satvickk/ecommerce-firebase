export default function NewsLetter() {
  return (
    <div className="hero bg-base-200 py-4">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Subscribe to our NewsLetter</h1>
          <p className="py-6">
            Get daily updates on the latest and trendiest headphones on the
            market, including sales, customized product reviews, and new
            arrivals.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Name"
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
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
