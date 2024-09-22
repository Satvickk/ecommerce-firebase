import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { schema } from "./schema";
import LoadingButton from "../../../common/LoadingButton";
import PRODUCT_SERVICE from "../../../../Firebase/productService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addSingleProductDetails, updateSingleProductDetails } from "../../../../redux/productSlice";

export default function ProductFormModal({ editData, onClose }) {
  const isEdit = useRef(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) {
      isEdit.current = true;
      reset(editData); // Initialize form with existing data
    } else {
      isEdit.current = false;
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (isEdit.current) {

        try {
          if (data.featuredImage instanceof File) {
            const resp = await PRODUCT_SERVICE.uploadFile(data.featuredImage);
            data.featuredImage = resp.downloadURL;
            data.fileId = resp.fileId;
          }
          await PRODUCT_SERVICE.updateProduct(data?.docId, { ...data });
          dispatch(updateSingleProductDetails({ ...data }));
          toast.success("Product updated successfully");
          await PRODUCT_SERVICE.updateProductInStripe(data)
        } catch (error) {
          console.error("Error in updating product:", error);
          toast.error("Something went wrong!");
        }
      } else {

        try {
          const resp = await PRODUCT_SERVICE.uploadFile(data.featuredImage);
          if (resp) {
            const product = await PRODUCT_SERVICE.createProduct({
              ...data,
              featuredImage: resp.downloadURL,
              fileId: resp.fileId,
            });

            const storeData = {
              ...data,
              featuredImage: resp.downloadURL,
              fileId: resp.fileId,
              docId: product.id,
            };



            dispatch(addSingleProductDetails({ ...storeData }));
            onClose();
            toast.success("Product added successfully");
            // Add data to Stripe Dashboard
            const response = await PRODUCT_SERVICE.createProductInStripe(storeData);
            dispatch(updateSingleProductDetails({ ...response }));

          }
        } catch (error) {
          console.error("Error in creating product:", error);
          toast.error("Something went wrong!");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
      onClose(); // Close the modal
      reset(); // Reset form after submission
    }
  };

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
  ];

  const productTypeOptions = [
    { value: "regular", label: "Regular" },
    { value: "trending", label: "Trending" },
    { value: "newArrival", label: "New Arrival" },
    { value: "popular", label: "Popular" },
  ];

  const statusOptions = [
    { value: 1, label: "Available" },
    { value: 2, label: "Not Available" },
    { value: 3, label: "Coming Soon" },
  ];

  return (
    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered"
          {...register("title")}
        />
        <p className="text-red-600">{errors.title?.message}</p>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered"
          {...register("description")}
        />
        <p className="text-red-600">{errors.description?.message}</p>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Price (INR)</span>
        </label>
        <input
          type="text"
          placeholder="Price"
          className="input input-bordered"
          {...register("price")}
        />
        <p className="text-red-600">{errors.price?.message}</p>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Product Type</span>
        </label>
        <select className="select select-bordered" {...register("productType")}>
          {productTypeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <p className="text-red-600">{errors.productType?.message}</p>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select className="select select-bordered" {...register("status")}>
          {statusOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <p className="text-red-600">{errors.status?.message}</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Color</span>
        </label>
        <Controller
          name="color"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              {...field}
              options={colorOptions}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select colors"
            />
          )}
        />
        <p className="text-red-600">{errors.color?.message}</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Number of Review</span>
        </label>
        <input
          type="text"
          placeholder="Review"
          className="input input-bordered"
          {...register("review")}
          step="0.1"
        />
        <p className="text-red-600">{errors.review?.message}</p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Featured Image</span>
        </label>
        <Controller
          name="featuredImage"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                onChange(e.target.files[0]); // Update file input value
              }}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <p className="text-red-600">{errors.featuredImage?.message}</p>
      </div>
      <div className="form-control mt-6">
        <LoadingButton isLoading={loading} type='submit' className="btn btn-primary">
          Submit
        </LoadingButton>
      </div>
    </form>
  );
}
