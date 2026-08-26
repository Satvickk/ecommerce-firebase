import { useState } from "react";
export default function FilterSelect({ title, options, filterfunction, removedFilter }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  function handleChange(e) {
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
  return <div className="flex gap-2 items-center"><select
    className="bg-white border-2 border-black font-bold uppercase text-xs tracking-wider px-4 py-2.5 focus:border-swiss-accent focus:outline-none rounded-none cursor-pointer"
    value={selectedValue}
    onChange={handleChange}
  ><option disabled value="">{title}</option>{options.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}</select>{showBtn && <button
    className="bg-swiss-accent text-white font-black uppercase text-xs tracking-widest px-4 py-2.5 border-2 border-swiss-accent hover:bg-black hover:border-black transition-colors duration-150 rounded-none"
    onClick={handleRemoveFilter}
  >
          CLEAR ✕
        </button>}</div>;
}
