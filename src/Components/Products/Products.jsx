// Products.js
import { useSelector } from "react-redux";
import ProductCard from "../common/ProductCard";

export default function Products({ title, slug }) {
  const AllProductsDetails = useSelector((state) => state.AllProductsDetails);

  return (
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-12">
      <h1 className="divider text-2xl sm:text-3xl font-normal">{title}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
        {AllProductsDetails?.content &&
          AllProductsDetails.content
            .filter((item) => item.productType === slug)
            .map((product) => (
              <ProductCard key={product.docId} data={product} />
            ))}
      </div>
    </div>
  );
}
