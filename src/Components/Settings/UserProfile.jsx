import { useSelector } from "react-redux";

export default function UserProfile() {
  const userData = useSelector((state) => state?.UserDetails);

  return (
    <div>
      <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
        Profile
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label htmlFor="name" className="font-medium">Full Name:</label>
          <p id="name" >{userData?.name}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="email" className="font-medium">Email:</label>
          <p id="email" >{userData?.email}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="address" className="font-medium">House Address:</label>
          <p id="address" >{userData?.address}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="pincode" className="font-medium">Pin Code:</label>
          <p id="pincode">{userData?.pincode}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="contact" className="font-medium">Contact Number:</label>
          <p id="contact" >{userData?.contact}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="password" className="font-medium">Password:</label>
          <p id="password" >{userData?.password}</p>
        </div>
      </div>
    </div>
  );
}
