import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signinSchema } from "./form/schema";
import { toast } from "react-toastify";
import AUTH_SERVICE from "../../Firebase/authService";
import USER_SERVICE from "../../Firebase/userService";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../common/LoadingButton";
import { useState } from "react";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { setWishlist } from "../../redux/userWishlist";
import { useDispatch } from "react-redux";

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signinSchema) });

  const handleSignInUser = async (values) => {
    setLoading(true);
    try {
      const { email, name, password } = values;

      const resp = await AUTH_SERVICE.createAccount({
        email,
        name,
        password,
      });

      console.log('resp', resp)
      console.log('resp.uid', resp.uid)

      if (resp?.uid) {
        await USER_SERVICE.createUser({
          ...values,
          userId: resp.uid,
        });
        const response = await WISHLIST_SERVICE.createWishList(resp.uid);
        console.log("response",response)
        dispatch(setWishlist({customerId: resp.uid, selectedProducts: [], totalDoc: 0}))
        toast.success("Signed In Successfully");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Error in sign-in process:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Join us today! Sign up to unlock exclusive benefits and offers.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(handleSignInUser)}>
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
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email")}
              />
              <p className="text-red-600">{errors.email?.message}</p>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password")}
              />
              <p className="text-red-600">{errors.password?.message}</p>
              {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
            </div>
            <div className="form-control mt-6">
              <LoadingButton type="submit" isLoading={loading}>
                Sign Up
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
