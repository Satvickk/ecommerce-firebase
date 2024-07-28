import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function SideBar({ tabs }) {
  const location = useLocation();

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
            isActive={() =>
              location.pathname === `/admin${item.src ? `/${item.src}` : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <MobileAdminMenu tabs={tabs} />
    </>
  );
}

export function MobileAdminMenu({ tabs }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSelectChange = (event) => {
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
