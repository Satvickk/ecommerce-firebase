import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./form/schema";
import { useState } from "react";
import LoadingButton from "../common/LoadingButton";
import { toast } from "react-toastify";
import AUTH_SERVICE from "../../Firebase/authService";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import USER_SERVICE from "../../Firebase/userService";
import { setUserDetails } from "../../redux/userDetailSlice";

export default function LoginForm() {

  const { handleSubmit, register, reset , formState: {errors}} = useForm({ resolver: yupResolver(loginSchema)})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleLoginUser = async(values) => {
    setLoading(true);
    try {
      const resp = await AUTH_SERVICE.login({...values})
      if (resp) {
        window.localStorage.setItem("authToken", resp.accessToken);
        const { uid, displayName, email } = resp;
        dispatch(setAuth({ userId: uid, userName: displayName, userEmail: email, isLogged: true }));
        toast.success(`Welcome back ${displayName.split(" ")[0]}`);
        
        // console.log("running getting user details")
        const UserData = await USER_SERVICE.getUserById(uid);
        // console.log("running getting user details", UserData)
        window.localStorage.setItem("role", UserData.userRole);
        dispatch(setUserDetails(UserData));
          navigate("/")
        reset();
      }
    } catch (error) {
      console.log("error ::", error);
      toast.error("Unable to Login");
    }finally{
      setLoading(false)
    }
  }  

  return (
    <div className="hero bg-base-200 min-h-full w-full">
      <div className="hero-content flex-col justify-between lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
          Welcome back! Log in to access your account.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm sm:max-w-md shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(handleLoginUser)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <p className="text-red-600">{errors.password?.message}</p>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <LoadingButton className="btn btn-primary" isLoading={loading} type="submit">
                Login
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
