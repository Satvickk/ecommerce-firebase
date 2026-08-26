import { ChangeEvent, useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  title: string;
  options: FilterOption[];
  filterfunction: (value: string) => void;
  removedFilter: () => void;
}

export default function FilterSelect({ title, options, filterfunction, removedFilter }: FilterSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedValue(value);
    setShowBtn(true);
    filterfunction(value);
  }

  function handleRemoveFilter() {
    setSelectedValue("");
    setShowBtn(false);
    removedFilter();
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
