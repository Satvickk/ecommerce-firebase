import UpdateProfile from "../Settings/UpdateProfile";
import { useAppSelector } from "../../redux/hooks";

export default function UserProfile() {
  const userData = useAppSelector((state) => state?.UserDetails);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black">ADMIN PROFILE</h2>
        <UpdateModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs uppercase font-bold">
        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">ADMINISTRATOR NAME</span>
          <span className="text-sm font-black text-black">{userData?.name || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">EMAIL ADDRESS</span>
          <span className="text-sm font-black text-black">{userData?.email || "N/A"}</span>
        </div>

        <div className="border-2 border-black p-4 bg-swiss-muted md:col-span-2">
          <span className="text-[10px] text-gray-500 font-black block tracking-widest mb-1">STREET ADDRESS</span>
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

export function UpdateModal() {
  const handleOpen = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const handleClose = () => {
    const modal = document.getElementById("my_modal_4") as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <>
      <button
        className="bg-black text-white font-black text-xs uppercase tracking-widest px-4 py-2.5 border-2 border-black hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150 rounded-none"
        onClick={handleOpen}
      >
        EDIT PROFILE →
      </button>
      <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-4 border-black bg-white rounded-none p-6 max-w-2xl w-full">
          <UpdateProfile handleClose={handleClose} isClose={false}/>
        </div>
      </dialog>
    </>
  );
}
