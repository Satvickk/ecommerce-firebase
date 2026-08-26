import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateUserDetailsSchema } from "../../../Settings/form/schema";
import LoadingButton from "../../../common/LoadingButton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateSingleUserDetails } from "../../../../redux/allUserSlice";
import USER_SERVICE from "../../../../Firebase/userService";
import { useAppDispatch } from "../../../../redux/hooks";
export default function UpdateUserProfile({ userData, onClose }) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(updateUserDetailsSchema),
    defaultValues: {
      name: "",
      address: "",
      pincode: "",
      contact: ""
    }
  });
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        address: userData.address || "",
        pincode: userData.pincode || "",
        contact: userData.contact || ""
      });
    }
  }, [userData, reset]);
  const UpdateUserDetails = async (values) => {
    setLoading(true);
    try {
      if (userData?.docId) {
        const resp = await USER_SERVICE.updateUser(userData.docId, {
          ...values
        });
        if (resp) {
          toast.success("User Profile updated successfully");
          dispatch(updateSingleUserDetails({
            ...values,
            docId: userData.docId,
            email: userData?.email,
            password: userData?.password,
            userId: userData?.userId
          }));
          onClose();
        }
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Unable to Update User details");
    } finally {
      setLoading(false);
    }
  };
  return <dialog open className="modal modal-bottom sm:modal-middle"><div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-xl w-full"><div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between"><h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">UPDATE USER RECORD</h3><button onClick={onClose} className="text-white hover:text-swiss-accent font-black text-lg">✕</button></div><form className="p-6 space-y-4" onSubmit={handleSubmit(UpdateUserDetails)}><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">FULL NAME</label><input
    type="text"
    placeholder="FULL NAME"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("name")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.name?.message}</p></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">HOUSE ADDRESS</label><input
    type="text"
    placeholder="HOUSE ADDRESS"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("address")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.address?.message}</p></div><div className="grid sm:grid-cols-2 gap-4"><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">CONTACT TELEPHONE</label><input
    type="text"
    placeholder="CONTACT NUMBER"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("contact")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.contact?.message}</p></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">POSTAL PIN CODE</label><input
    type="text"
    placeholder="PIN CODE"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("pincode")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.pincode?.message}</p></div></div><div className="pt-4 flex gap-3"><LoadingButton isLoading={loading} type="submit" className="w-full py-3">
              SAVE UPDATES →
            </LoadingButton><button type="button" className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted" onClick={onClose}>
              CANCEL
            </button></div></form></div></dialog>;
}
