import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signinSchema } from "./form/schema";
import { toast } from "react-toastify";
import AUTH_SERVICE from "../../Firebase/authService";
import USER_SERVICE from "../../Firebase/userService";
import { useNavigate, Link } from "react-router-dom";
import LoadingButton from "../common/LoadingButton";
import { useState } from "react";
import WISHLIST_SERVICE from "../../Firebase/wishlistService";
import { setWishlist } from "../../redux/userWishlist";
import { useAppDispatch } from "../../redux/hooks";
export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signinSchema) });
  const handleSignInUser = async (values) => {
    setLoading(true);
    try {
      const email = String(values.email || "");
      const name = String(values.name || "");
      const password = String(values.password || "");
      const address = String(values.address || "");
      const contact = String(values.contact || "");
      const pincode = String(values.pincode || "");
      const resp = await AUTH_SERVICE.createAccount({
        email,
        name,
        password
      });
      if (resp?.uid) {
        await USER_SERVICE.createUser({
          name,
          email,
          address,
          contact,
          pincode,
          userId: resp.uid
        });
        await WISHLIST_SERVICE.createWishList(resp.uid);
        dispatch(setWishlist({ customerId: resp.uid, selectedProducts: [], wishlistDocId: "" }));
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
  return <section className="w-full bg-white border-b-4 border-black py-16"><div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><div className="lg:col-span-5 space-y-6"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block">
            01. REGISTRATION
          </span><h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
            CREATE NEW ACCOUNT.
          </h1><p className="text-sm font-medium text-black leading-relaxed border-l-4 border-black pl-4">
            REGISTER YOUR SPECIFICATIONS TO UNLOCK FREE SHIPPING, ORDER TRACKING, AND CUSTOM WISHLISTS.
          </p></div><div className="lg:col-span-7 border-4 border-black bg-white p-8 space-y-6"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
            NEW MEMBER FORM
          </h3><form className="space-y-4" onSubmit={handleSubmit(handleSignInUser)}><div className="grid sm:grid-cols-2 gap-4"><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">FULL NAME</label><input
    type="text"
    placeholder="FULL NAME"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("name")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.name?.message}</p></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">EMAIL ADDRESS</label><input
    type="email"
    placeholder="NAME@DOMAIN.COM"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("email")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.email?.message}</p></div></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">HOUSE ADDRESS</label><input
    type="text"
    placeholder="STREET ADDRESS"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("address")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.address?.message}</p></div><div className="grid sm:grid-cols-2 gap-4"><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">CONTACT TELEPHONE</label><input
    type="text"
    placeholder="CONTACT NUMBER"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("contact")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.contact?.message}</p></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">PIN CODE</label><input
    type="text"
    placeholder="PIN CODE"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("pincode")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.pincode?.message}</p></div></div><div><label className="block text-xs font-black uppercase tracking-widest text-black mb-1">PASSWORD</label><input
    type="password"
    placeholder="••••••••"
    className="w-full border-2 border-black px-4 py-3 text-xs font-bold uppercase focus:border-swiss-accent focus:outline-none rounded-none"
    {...register("password")}
  /><p className="text-swiss-accent text-xs font-bold mt-1">{errors.password?.message}</p></div><div className="pt-2"><LoadingButton type="submit" isLoading={loading} className="w-full py-4">
                CREATE ACCOUNT NOW →
              </LoadingButton></div><div className="pt-4 border-t-2 border-black flex justify-between items-center text-xs font-bold uppercase tracking-wider"><span>ALREADY REGISTERED?</span><Link to="/login" className="text-swiss-accent hover:underline">
                LOG IN INSTEAD →
              </Link></div></form></div></div></section>;
}
