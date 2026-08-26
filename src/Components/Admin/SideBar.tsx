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
        <h3 className="text-xs font-black uppercase tracking-widest text-black border-b-2 border-black pb-3 mb-2">
          01. ADMIN NAVIGATION
        </h3>
        {tabs.map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              `w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest border-2 border-black transition-colors duration-150 ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`
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
    <div className="flex sm:hidden flex-col w-full gap-2">
      <h3 className="text-xs font-black uppercase tracking-widest text-black">
        NAVIGATION MENU
      </h3>
      <select
        className="w-full bg-white border-2 border-black px-4 py-3 text-xs font-black uppercase focus:border-swiss-accent focus:outline-none rounded-none cursor-pointer"
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
