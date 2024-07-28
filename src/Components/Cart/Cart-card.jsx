export default function CartCard({ imageUrl, title, price }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl flex-col sm:flex-row items-center">
      <figure className="sm:h-[100px] sm:w-[150px]">
        <img src={imageUrl} alt="product" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-start font-bold text-gray-700 text-lg">
          &#8377; {price}
        </p>
        <div className="card-actions justify-center sm:justify-end">
          <button className="btn btn-primary">Remove from cart</button>
        </div>
      </div>
    </div>
  );
}
