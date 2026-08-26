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
    <div className="text-center w-full flex justify-center items-center flex-col gap-8 p-2 sm:p-12 overflow-x-scroll h-screen sm:h-auto relative sm:static">
      <h1 className="divider divider-start hidden sm:block text-2xl sm:text-3xl font-normal">
        Users
      </h1>
      <div className="py-4 w-full sm:static absolute left-0 top-0">
        <table className="table w-full">
          <thead>
            <tr className="bg-black text-white">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Password</th>
              <th>Pin Code</th>
              <th>House Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {AllUsers?.content?.map((item) => (
              <UserRow key={item.docId} responseData={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
