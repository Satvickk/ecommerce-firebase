import { useEffect } from "react";
import USER_SERVICE from "../../Firebase/userService";
import { setUserDetails } from "../../redux/userDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useUserDetails = () => {
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.Auth?.userId);
  const UserDetails = useSelector((state) => state.UserDetails);

  useEffect(() => {
    const fetchUserData = async () => {
      if (UserId && !UserDetails) {
        try {
          const UserData = await USER_SERVICE.getUserById(UserId);
          if (UserData) {
            dispatch(setUserDetails(UserData));
          }
        } catch (error) {
          console.log("error:", error);
          toast.error("Unable to fetch user details");
        }
      }
    };

    fetchUserData();
  }, [UserId, UserDetails, dispatch]);

  return {
    UserData: UserDetails,
    UserId
  };
};
