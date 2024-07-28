import React from "react";

const FilterSelect = React.lazy(() => import("../common/Filter-Select"))
export default function FilterBox() {

  const PRICE_DATA = [
    {
        label: "Low to High",
        value: 'asc'
    },
    {
        label: "High to Low",
        value: 'dec'
    }
  ]

  const CATEOGORY_DATA = [
    {
        label: "Trending",
        value: "trending",
    },
    {
        label: "Popular",
        value: "popular",
    },
    {
        label: "New Arrival",
        value: "New Arrival",
    },
  ]

  const RATING_DATA = [
    {
        label: "1 ★ and above",
        value: 1,
    },
    {
        label: "2 ★ and above",
        value: 2,
    },
    {
        label: "3 ★ and above",
        value: 3,
    },
    {
        label: "4 ★ and above",
        value: 4,
    },
  ]

  return (
    <div className="flex flex-col gap-3">
        <FilterSelect title={"Sort by Price"} options={PRICE_DATA}/>
        <FilterSelect title={"Cateogory"} options={CATEOGORY_DATA}/>
        <FilterSelect title={"Rating"} options={RATING_DATA}/>
    </div>
  );
}
