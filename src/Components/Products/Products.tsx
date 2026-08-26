import React from "react";
import { useAppSelector } from "../../redux/hooks";
const ProductCard = React.lazy(() => import("../common/ProductCard"));

interface ProductsProps {
  title: string;
  slug: string;
}

export default function Products({ title, slug }: ProductsProps) {
  const AllProductsDetails = useAppSelector((state) => state.AllProductsDetails);

  const filteredProducts = AllProductsDetails.content?.filter((item) => item.productType === slug) || [];

  if (filteredProducts.length === 0) return null;

  return (
    <section className="w-full bg-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black">
          <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            COLLECTION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <React.Suspense fallback={<SkeletonCard />} key={product.docId}>
              <ProductCard data={product} />
            </React.Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}

const SkeletonCard = () => (
  <div className="border-2 border-black bg-white p-6 space-y-4 rounded-none">
    <div className="bg-gray-200 h-6 w-1/2 animate-pulse"></div>
    <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
    <div className="bg-gray-200 h-6 w-full animate-pulse"></div>
  </div>
);
