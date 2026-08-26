import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "./form/schema";
import { useState } from "react";
import LoadingButton from "../common/LoadingButton";
import { toast } from "react-toastify";
import AUTH_SERVICE from "../../Firebase/authService";
import { setAuth } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import USER_SERVICE from "../../Firebase/userService";
import { setUserDetails } from "../../redux/userDetailSlice";
import { useAppDispatch } from "../../redux/hooks";
import type { User } from "firebase/auth";

export default function LoginForm() {
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginUser = async (values: any) => {
    setLoading(true);
    try {
      const resp = (await AUTH_SERVICE.login({ email: values.email, password: values.password })) as (User & { accessToken?: string }) | null;
      if (resp) {
        window.localStorage.setItem("authToken", resp.accessToken || "");
        const { uid, displayName, email } = resp;
        dispatch(setAuth({ userId: uid, userName: displayName, userEmail: email, isLogged: true }));
        const firstName = displayName?.split(" ")?.[0] || "User";
        toast.success(`Welcome back ${firstName}`);

        const UserData = await USER_SERVICE.getUserById(uid);
        if (UserData?.userRole) {
          window.localStorage.setItem("role", String(UserData.userRole));
        }
        if (UserData) {
          dispatch(setUserDetails(UserData));
        }
        navigate("/");
        reset();
      }
    } catch (error) {
      console.log("error ::", error);
      toast.error("Unable to Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white border-b-4 border-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
            01. AUTHENTICATION
          </span>
          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter text-black leading-none">
            USER ACCESS PORTAL.
          </h1>
          <p className="text-sm font-medium text-black leading-relaxed border-l-4 border-black pl-4">
            AUTHENTICATE TO ACCESS YOUR SAVED WISHLIST, ACTIVE CHECKOUT ORDERS, AND ACCOUNT PREFERENCES.
          </p>
        </div>

        <div className="lg:col-span-6 border-4 border-black bg-white p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
            LOG IN SPECIFICATIONS
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit(handleLoginUser)}>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="NAME@DOMAIN.COM"
                className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
                {...register("email")}
              />
              <p className="text-swiss-accent text-xs font-bold mt-1">{errors.email?.message}</p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-1">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
                {...register("password")}
              />
              <p className="text-swiss-accent text-xs font-bold mt-1">{errors.password?.message}</p>
            </div>

            <div className="pt-2">
              <LoadingButton className="w-full py-4" isLoading={loading} type="submit">
                AUTHENTICATE & LOG IN →
              </LoadingButton>
            </div>

            <div className="pt-4 border-t-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider">
              <span>NEW TO MYSHOP?</span>
              <Link to="/signup" className="text-swiss-accent hover:underline">
                CREATE ACCOUNT →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
