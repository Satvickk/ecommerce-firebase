import * as yup from "yup";

export const signinSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    contact: yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    address: yup.string().required("Address is Required"),
    pincode: yup.string().matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });


export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})
