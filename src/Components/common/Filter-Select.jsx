import { useState } from "react";

export default function FilterSelect({ title, options }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  function handleChange(e) {
    setSelectedValue(e.target.value);
    setShowBtn(true);
    console.log(e.target.value);
  }

  function handleRemoveFilter() {
    setSelectedValue("");
    setShowBtn(false);
  }

  return (
    <div className="flex gap-2">
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedValue}
        onChange={(e) => handleChange(e)}
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
