import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  productType: yup.string().oneOf(["regular", "trending", "newArrival", "popular"], "Invalid product type").required("Product type is required"),
  status: yup
    .number()
    .oneOf([1, 2, 3], "Invalid status value")
    .required("Status is required"),
  review: yup
    .number()
    .typeError("Review must be a number"),
  featuredImage: yup
    .mixed()
    .required("Featured image is required"),
});
