import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateUserDetailsSchema } from "../../../Settings/form/schema";
import { useDispatch } from "react-redux";
import LoadingButton from "../../../common/LoadingButton";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateSingleUserDetails } from "../../../../redux/allUserSlice";
import USER_SERVICE from "../../../../Firebase/userService";

export default function UpdateUserProfile({ userData, onClose }) {
  const dispatch = useDispatch();
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

  // Use useEffect to reset form with userData once it's available
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        address: userData.address,
        pincode: userData.pincode,
        contact: userData.contact,
      });
    }
  }, [userData, reset]);

  const UpdateUserDetails = async (values) => {
    setLoading(true);
    try {
      const resp = await USER_SERVICE.updateUser(userData?.docId, {
        ...values,
      });
      if (resp) {
        toast.success("User Profile updated successfully");
        dispatch(updateSingleUserDetails({ ...values, docId: userData.docId }));
        onClose();
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Unable to Update User details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
          Update Profile
        </h1>
        <div className="card bg-base-100 w-full max-w-sm sm:max-w-full shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(UpdateUserDetails)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                {...register("name")}
              />
              <p className="text-red-600">{errors.name?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">House Address</span>
              </label>
              <input
                type="text"
                placeholder="House Address"
                className="input input-bordered"
                {...register("address")}
              />
              <p className="text-red-600">{errors.address?.message}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Contact number"
                  className="input input-bordered"
                  {...register("contact")}
                />
                <p className="text-red-600">{errors.contact?.message}</p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pin Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Pin Code"
                  className="input input-bordered"
                  {...register("pincode")}
                />
                <p className="text-red-600">{errors.pincode?.message}</p>
              </div>
            </div>
            <div className="form-control mt-6 gap-3">
              <LoadingButton isLoading={loading} type="submit">
                Update
              </LoadingButton>
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
