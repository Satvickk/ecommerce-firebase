import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div
      className="hero w-full bg-slate-500 rounded"
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Coming Soon</h1>
          <p className="mb-5">
            This functionality is currently under development it will be rolled out soon
          </p>
          <Link to={'/'} className="btn btn-primary">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
