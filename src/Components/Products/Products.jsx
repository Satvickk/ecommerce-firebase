import React from "react";
import { useSelector } from "react-redux";
const ProductCard = React.lazy(() => import("../common/ProductCard"));

export default function Products({ title, slug }) {
  const AllProductsDetails = useSelector((state) => state.AllProductsDetails);

  return (
    <div className="text-center w-full flex justify-center items-center flex-col my-8 gap-8 p-12">
      <h1 className="divider text-2xl sm:text-3xl font-normal">{title}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4">
        {AllProductsDetails.content ? (
          AllProductsDetails.content
            .filter((item) => item.productType === slug)
            .map((product) =>
              <React.Suspense fallback={<SkeletonCard />} key={product.docId}>
                <ProductCard key={product.docId} data={product} />
              </React.Suspense>
            )
        ) : (
          <SkeletonCard />
        )}
      </div>
    </div>
  );
}

const SkeletonCard = () => (
  <div className="relative card card-compact bg-base-100 w-80 sm:w-96 shadow-xl">
    <div className="flex w-full px-3 py-2 flex-col gap-4">
      <div className="skeleton h-4 w-1/2"></div>
      <div className="skeleton h-52 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  </div>
);
