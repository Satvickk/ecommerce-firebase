import { useEffect } from "react";
import USER_SERVICE from "../../Firebase/userService";
import { setUserDetails } from "../../redux/userDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import type { RootState } from "../../redux/store/store";

export const useUserDetails = () => {
  const dispatch = useAppDispatch();
  const UserId = useAppSelector((state: RootState) => state.Auth?.userId);
  const UserDetails = useAppSelector((state: RootState) => state.UserDetails);

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
