import { useDispatch } from "react-redux";
import { setAllProductDetails } from "../../redux/productSlice";
import FilterSelect from "../common/Filter-Select"
export default function FilterBox({data}) {

  const dispatch = useDispatch();

  const PRICE_DATA = [
    {
        label: "Under 1000",
        value: {
          upper : 1000,
          lower : 0
        }
    },
    {
        label: "between 1000 - 3000",
        value: {
          upper : 3000,
          lower : 1000
        }
    },
    {
        label: "between 3001 - 5000",
        value: {
          upper : 5000,
          lower : 3001
        }
    },
    {
        label: "between 5001 - 10000",
        value: {
          upper : 10000,
          lower : 5001
        }
    },
    {
        label: "above 10000",
        value: {
          upper : 100000,
          lower : 10001
        }
    },
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
        value: "newArrival",
    },
    {
        label: "Regular",
        value: "regular",
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

  function RemovedFilter(){
    dispatch(setAllProductDetails({
      content: data,
      totalDoc: data.length,
    }));
  }

  function handlePriceFilter(value) {
    const filteredData = data.filter((item) => item.price <= value.upper && item.price >= value.lower);
    dispatch(setAllProductDetails({
      content: filteredData,
      totalDoc: filteredData.length,
    }));
  }

  function handleCategoryFilter(value) {
    const filteredData = data.filter((item) => item.productType === value);
    dispatch(setAllProductDetails({
      content: filteredData,
      totalDoc: filteredData.length,
    }));
  }
  function handleRatingFilter(value) {
    const filteredData = data.filter((item) => Math.floor(item.review/100) === value);
    dispatch(setAllProductDetails({
      content: filteredData,
      totalDoc: filteredData.length,
    }));
  }

  return (
    <div className="flex flex-col gap-3">
        <FilterSelect title={"Sort by Price"} options={PRICE_DATA} data={data} filterfunction={handlePriceFilter} removedFilter={RemovedFilter}/>
        <FilterSelect title={"Cateogory"} options={CATEOGORY_DATA} data={data} filterfunction={handleCategoryFilter} removedFilter={RemovedFilter}/>
        <FilterSelect title={"Rating"} options={RATING_DATA} data={data} filterfunction={handleRatingFilter} removedFilter={RemovedFilter}/>
    </div>
  );
}
