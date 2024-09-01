import USER_SERVICE from "../../Firebase/userService";
import { setUserDetails } from "../../redux/userDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useUserDetails = async () => {
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.Auth?.userId);
  const UserDetails = useSelector((state) => state.UserDetails);
  const UserData = {};

  if(!UserDetails){
    try {
        const UserData = await USER_SERVICE.getUserById(UserId);
        dispatch(setUserDetails(UserData));
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch user details");
      }
  }
  return {
    UserData,
    UserId
  }
};
