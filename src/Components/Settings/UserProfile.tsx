import { useAppSelector } from "../../redux/hooks";

export default function UserProfile() {
  const userData = useAppSelector((state) => state?.UserDetails);

  return (
    <div className="space-y-6">
      <div className="border-b-4 border-black pb-3">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">PROFILE SPECIFICATIONS</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs uppercase font-bold">
        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">FULL NAME</span>
          <span className="text-sm font-black text-black">{userData?.name || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">EMAIL ADDRESS</span>
          <span className="text-sm font-black text-black">{userData?.email || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted md:col-span-2">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">HOUSE ADDRESS</span>
          <span className="text-sm font-black text-black">{userData?.address || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">POSTAL PIN CODE</span>
          <span className="text-sm font-black text-black">{userData?.pincode || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">CONTACT TELEPHONE</span>
          <span className="text-sm font-black text-black">{userData?.contact || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
