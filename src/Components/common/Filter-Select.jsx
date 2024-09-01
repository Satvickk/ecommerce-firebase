import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAllProductDetails } from "../../redux/productSlice";

export default function FilterSelect({ title, options, filterfunction, removedFilter }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setSelectedValue(value);
    setShowBtn(true);
    filterfunction(value)
  }

  function handleRemoveFilter() {
    setSelectedValue("");
    setShowBtn(false);
    // Optionally reset data to show all items when the filter is removed
    removedFilter()
  }

  return (
    <div className="flex gap-2">
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedValue}
        onChange={handleChange}
      >
        <option disabled value="">
          {title}
        </option>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {showBtn && (
        <button className="btn-primary btn" onClick={handleRemoveFilter}>
          Remove filter
        </button>
      )}
    </div>
  );
}
