import { useEffect } from "react";
import USER_SERVICE from "../../Firebase/userService";
import { setAllUserDetails } from "../../redux/allUserSlice";
import { toast } from "react-toastify";
import UserRow from "./user-view/UserRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function UserView() {
  const dispatch = useAppDispatch();
  const AllUsers = useAppSelector((state) => state.AllUserDetails);

  useEffect(() => {
    const getAllUsersDetails = async () => {
      try {
        const UserData = await USER_SERVICE.getUsers();
        dispatch(
          setAllUserDetails({ content: UserData, totalDoc: UserData.length })
        );
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch user details");
      }
    };

    if (!AllUsers || AllUsers.content.length === 0) {
      getAllUsersDetails();
    }
  }, [AllUsers, dispatch]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black">REGISTERED USERS DATABASE</h2>
        <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
          TOTAL: {AllUsers?.content?.length || 0}
        </span>
      </div>

      <div className="w-full border-4 border-black bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-xs font-black uppercase tracking-widest border-b-4 border-black">
              <th className="p-4">NAME</th>
              <th className="p-4">EMAIL</th>
              <th className="p-4">TELEPHONE</th>
              <th className="p-4">SECURITY</th>
              <th className="p-4">PIN CODE</th>
              <th className="p-4">ADDRESS</th>
              <th className="p-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(AllUsers?.content?.length ?? 0) > 0 ? (
              AllUsers!.content.map((item) => (
                <UserRow key={item.docId} responseData={item} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-12 text-center text-xs font-bold uppercase tracking-wider text-gray-500 bg-swiss-muted">
                  NO REGISTERED USERS FOUND.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
