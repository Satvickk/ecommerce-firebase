export default function UserProfile() {
  return (
    <div>
      <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
        Profile
      </h1>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label htmlFor="name" className="font-medium">Full Name:</label>
          <p id="name" className="">Satvick Pathak</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="email" className="font-medium">Email:</label>
          <p id="email" className="">satvick@example.com</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="address" className="font-medium">House Address:</label>
          <p id="address" className="">123 Main St, Springfield</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="contact" className="font-medium">Contact Number:</label>
          <p id="contact" className="">123-456-7890</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="password" className="font-medium">Password:</label>
          <p id="password" className="">Sp@123456</p>
        </div>
      </div>
    </div>
  );
}
