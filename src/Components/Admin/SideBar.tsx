import { ChangeEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface Tab {
  label: string;
  src: string;
}

interface SideBarProps {
  tabs: Tab[];
}

export default function SideBar({ tabs }: SideBarProps) {
  return (
    <>
      <div className="sm:flex flex-col w-full gap-3 hidden">
        <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
          Navigation Menu
        </h1>
        {tabs.map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              `btn ${isActive ? "btn-primary" : "btn-ghost"}`
            }
            to={item.src}
            end
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <MobileAdminMenu tabs={tabs} />
    </>
  );
}

export function MobileAdminMenu({ tabs }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    navigate(`/admin${selectedValue ? `/${selectedValue}` : ""}`);
  };

  return (
    <div className="flex sm:hidden flex-col w-full gap-3">
      <h1 className="divider divider-start text-xl font-normal">
        Navigation Menu
      </h1>
      <select
        className="select select-bordered w-full"
        onChange={handleMobileSelectChange}
        value={tabs.find((item) => location.pathname.endsWith(item.src))?.src || ""}
      >
        {tabs.map((item) => (
          <option key={item.label} value={item.src}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
