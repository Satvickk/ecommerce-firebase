import React from "react";

const FilterBox = React.lazy(() => import("./FilterBox"));
const ProductStripView = React.lazy(() => import("./Product-strip-view"))

export default function ProductLayout() {
  return (
    <>
      <h1 className="divider text-2xl sm:text-3xl my-8 font-normal">
        Products
      </h1>
      <div className="w-full p-4 grid sm:grid-cols-3">
        <div className="sm:col-span-1 bg-gray-200 p-4 rounded-md h-auto">
          <h1 className="divider divider-start text-md sm:text-xl my-8 font-normal">
            Filters
          </h1>
          <FilterBox />
        </div>
        <div className="sm:col-span-2 p-4 flex flex-col gap-6">
            <ProductStripView />
            <ProductStripView />
            <ProductStripView />
            <ProductStripView />
            <ProductStripView />
            <ProductStripView />
        </div>
      </div>
    </>
  );
}
