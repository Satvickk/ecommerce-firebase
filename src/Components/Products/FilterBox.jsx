import { setAllProductDetails } from "../../redux/productSlice";
import FilterSelect from "../common/Filter-Select";
import { useAppDispatch } from "../../redux/hooks";
export default function FilterBox({ data }) {
  const dispatch = useAppDispatch();
  const PRICE_DATA = [
    { label: "Under 1000", value: "0-1000" },
    { label: "between 1000 - 3000", value: "1000-3000" },
    { label: "between 3001 - 5000", value: "3001-5000" },
    { label: "between 5001 - 10000", value: "5001-10000" },
    { label: "above 10000", value: "10001-100000" }
  ];
  const CATEOGORY_DATA = [
    { label: "Trending", value: "trending" },
    { label: "Popular", value: "popular" },
    { label: "New Arrival", value: "newArrival" },
    { label: "Regular", value: "regular" }
  ];
  const RATING_DATA = [
    { label: "1 \u2605 and above", value: "1" },
    { label: "2 \u2605 and above", value: "2" },
    { label: "3 \u2605 and above", value: "3" },
    { label: "4 \u2605 and above", value: "4" }
  ];
  function RemovedFilter() {
    dispatch(
      setAllProductDetails({
        content: data,
        totalDoc: data.length
      })
    );
  }
  function handlePriceFilter(value) {
    const [lower, upper] = value.split("-").map(Number);
    const filteredData = data.filter((item) => Number(item.price) <= upper && Number(item.price) >= lower);
    dispatch(
      setAllProductDetails({
        content: filteredData,
        totalDoc: filteredData.length
      })
    );
  }
  function handleCategoryFilter(value) {
    const filteredData = data.filter((item) => item.productType === value);
    dispatch(
      setAllProductDetails({
        content: filteredData,
        totalDoc: filteredData.length
      })
    );
  }
  function handleRatingFilter(value) {
    const ratingVal = Number(value);
    const filteredData = data.filter((item) => Math.floor(Number(item.review || 0) / 100) >= ratingVal);
    dispatch(
      setAllProductDetails({
        content: filteredData,
        totalDoc: filteredData.length
      })
    );
  }
  return <div className="flex flex-col gap-3"><FilterSelect title={"Sort by Price"} options={PRICE_DATA} filterfunction={handlePriceFilter} removedFilter={RemovedFilter} /><FilterSelect title={"Category"} options={CATEOGORY_DATA} filterfunction={handleCategoryFilter} removedFilter={RemovedFilter} /><FilterSelect title={"Rating"} options={RATING_DATA} filterfunction={handleRatingFilter} removedFilter={RemovedFilter} /></div>;
}
