import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateUserDetailsSchema } from "./form/schema";
import LoadingButton from "../common/LoadingButton";
import { useState } from "react";
import { toast } from "react-toastify";
import USER_SERVICE from "../../Firebase/userService";
import { updateUserDetails } from "../../redux/userDetailSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface UpdateProfileProps {
  handleClose?: () => void;
  isClose?: boolean;
}

export default function UpdateProfile({ handleClose, isClose = true }: UpdateProfileProps) {
  const userData = useAppSelector((state) => state?.UserDetails);

  const initialValues = {
    name: userData?.name || "",
    address: userData?.address || "",
    pincode: userData?.pincode || "",
    contact: userData?.contact || "",
  };

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserDetailsSchema),
    defaultValues: initialValues,
  });

  const UpdateUserDetails = async (values: any) => {
    setLoading(true);
    try {
      if (userData?.docId) {
        const resp = await USER_SERVICE.updateUser(userData.docId, {
          ...values,
        });
        if (resp) {
          if (isClose) toast.success("Profile updated successfully");
          dispatch(updateUserDetails({ ...values }));
          if (handleClose) handleClose();
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Unable to Update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b-4 border-black pb-3">
        <h2 className="text-xl font-black uppercase tracking-tight text-black">UPDATE USER SPECIFICATIONS</h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(UpdateUserDetails)}>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">FULL NAME</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
            {...register("name")}
          />
          <p className="text-swiss-accent text-xs font-bold mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">HOUSE ADDRESS</label>
          <input
            type="text"
            placeholder="House Address"
            className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
            {...register("address")}
          />
          <p className="text-swiss-accent text-xs font-bold mt-1">{errors.address?.message}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">CONTACT TELEPHONE</label>
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
              {...register("contact")}
            />
            <p className="text-swiss-accent text-xs font-bold mt-1">{errors.contact?.message}</p>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">POSTAL PIN CODE</label>
            <input
              type="text"
              placeholder="Pin Code"
              className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
              {...register("pincode")}
            />
            <p className="text-swiss-accent text-xs font-bold mt-1">{errors.pincode?.message}</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <LoadingButton isLoading={loading} type="submit" className="w-full py-3">
            SAVE UPDATES →
          </LoadingButton>
          {handleClose && (
            <button
              type="button"
              className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted"
              onClick={handleClose}
            >
              CLOSE
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
