"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { updateproduct } from "@/redux/slices/productSlice"

//validation schema
const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .matches(
      /^[A-Za-z ]+$/,
      "Title should contain only letters and spaces"
    ),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  cateogary: yup
    .string()
    .required("Category is required")
    .matches(
      /^[A-Za-z ]+$/,
      "Category should contain only letters and spaces"
    ),

  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),

  image: yup
    .mixed<FileList>()
    .test(
      "fileType",
      "Only JPG, JPEG and PNG images are allowed",
      (value) => {
        if (!value || value.length === 0) {
          return true;
        }

        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
        ].includes(value[0].type);
      }
    )
    .optional(),
});

type FormData =yup.InferType<typeof schema>

export default function Editproductpage(){

    //get product id from URL
    const params =useParams();
    const id = params.id as string;

    //used for navigation 
    const router =useRouter();
    const dispatch = useDispatch<AppDispatch>()

    //loading state 
    const[loading,setLoading]=useState(true)

    //react hookform

    const{
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }=useForm<FormData>({
        resolver:yupResolver(schema)
    });

  useEffect(() => {
  const getProduct = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("PRODUCT RESPONSE:", result);

      if (!response.ok) {
        alert(result.message || "Product not found");
        return;
      }

      const product = result.data;

      // Put existing values into form
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("cateogary", product.cateogary);
      setValue("description", product.description);

    } catch (error) {
      console.log("GET PRODUCT ERROR:", error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    getProduct();
  }

}, [id, setValue]);

  // update product
const onSubmit = async (data: FormData) => {
  try {
    const token = localStorage.getItem("token");

    // Create FormData
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("cateogary", data.cateogary);
    formData.append("description", data.description);

    // Add image only if a new image is selected
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    // Send update request
      if (!token) {
        alert("No token found")
        return
      }

      await dispatch(
        updateproduct({
          id,
          formData,
          token,
        })
      ).unwrap()

    alert("Product updated successfully");

    // Go back to products page
    router.push("/products");

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    alert("Something went wrong");
  }
};
     // -------------------------
  // 6. Loading screen
  // -------------------------

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p className="text-lg">
          Loading product...
        </p>

      </div>
    );
  }


  // -------------------------
  // 7. Form UI
  // -------------------------

return (
  <div className="min-h-screen bg-[#F7FAF8] py-10 px-4">

    <div className="max-w-xl mx-auto">

      <div className="bg-white p-7 md:p-9 rounded-2xl border border-[#E0EAE4] shadow-[0_10px_40px_rgba(47,107,79,0.08)]">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1F2A24]">
            Edit Product
          </h1>

          <p className="text-[#68736D] mt-2 text-sm">
            Update your product information
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#34443B]">
              Title
            </label>

            <input
              type="text"
              {...register("title")}
              placeholder="Enter product title"
              className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
            />

            {errors.title && (
              <p className="text-red-500 text-xs mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#34443B]">
              Price
            </label>

            <input
              type="number"
              {...register("price")}
              placeholder="Enter product price"
              className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
            />

            {errors.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#34443B]">
              Category
            </label>

            <input
              type="text"
              {...register("cateogary")}
              placeholder="Enter category"
              className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
            />

            {errors.cateogary && (
              <p className="text-red-500 text-xs mt-2">
                {errors.cateogary.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#34443B]">
              Description
            </label>

            <textarea
              {...register("description")}
              placeholder="Enter product description"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC] resize-none"
            />

            {errors.description && (
              <p className="text-red-500 text-xs mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#34443B]">
              Product Image
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              {...register("image")}
              className="w-full rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] px-3 py-2 text-sm text-[#68736D] file:mr-4 file:rounded-md file:border-0 file:bg-[#E8F2EC] file:px-4 file:py-2 file:text-[#2F6B4F] file:font-medium hover:file:bg-[#DDEDE4]"
            />

            {errors.image && (
              <p className="text-red-500 text-xs mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              className="flex-1 bg-[#2F6B4F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#24553E] active:scale-[0.99] transition duration-200 shadow-sm"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => router.push("/products")}
              className="flex-1 bg-[#E8F2EC] text-[#2F6B4F] border border-[#D5E1DA] px-6 py-3 rounded-lg font-semibold hover:bg-[#DDEDE4] transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  </div>
)
}
