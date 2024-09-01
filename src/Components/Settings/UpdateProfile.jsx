import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateUserDetailsSchema } from "./form/schema";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../common/LoadingButton";
import { useState } from "react";
import { toast } from "react-toastify";
import USER_SERVICE from "../../Firebase/userService";
import { updateUserDetails } from "../../redux/userDetailSlice";

export default function UpdateProfile({ handleClose }) {
  const userData = useSelector((state) => state?.UserDetails);

  const initialValues = {
    name: userData?.name,
    address: userData?.address,
    pincode: userData?.pincode,
    contact: userData?.contact,
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserDetailsSchema),
    defaultValues: initialValues,
  });

  const UpdateUserDetails = async (values) => {
    setLoading(true);
    try {
      const resp = await USER_SERVICE.updateUser(userData?.docId, {
        ...values,
      });
      if (resp) {
        toast.success("Profile updated successfully");
        dispatch(updateUserDetails({ ...values }));
        if(handleClose) handleClose()
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Unable to Update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
              type="address "
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
            {handleClose && (
              <button className="btn btn-outline" onClick={handleClose}>
                Close
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
