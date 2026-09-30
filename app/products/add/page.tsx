
"use client"

import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addproduct } from "@/redux/slices/productSlice"

const schema = yup.object({
  title: yup.string().required("Title is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  cateogary: yup.string().required("Category is required"),

  description: yup.string().required("Description is required"),

  image: yup
    .mixed<FileList>()
    .required("Image is required"),
})

type ProductForm = yup.InferType<typeof schema>

export default function AddProductPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: ProductForm) => {
    try {
      const formData = new FormData()

      formData.append("title", data.title)
      formData.append("price", String(data.price))
      formData.append("cateogary", data.cateogary)
      formData.append("description", data.description)

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0])
      }

      const token = localStorage.getItem("token")
      if (!token) {
      alert("No token found")
      return
    }


        await dispatch(
        addproduct({
          formData,
          token,
        })
      ).unwrap()

  

      alert("Product added successfully")

      router.push("/products")
    }  catch (error: any) {
  console.log("ADD PRODUCT ERROR:", error)
  console.log("STATUS:", error?.response?.status)
  console.log("SERVER RESPONSE:", error?.response?.data)
  console.log("MESSAGE:", error?.message)

  alert(
    error?.response?.data?.message ||
    error?.message ||
    "Failed to add product"
  )
}
  }


return (
  <div className="min-h-screen bg-[#F7FAF8] px-4 py-10">

    <div className="max-w-2xl mx-auto">

      <div className="bg-white rounded-2xl border border-[#E0EAE4] shadow-[0_10px_40px_rgba(47,107,79,0.08)] p-7 md:p-9">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1F2A24] mb-2">
            Add Product
          </h1>

          <p className="text-[#68736D]">
            Add a new product to your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#34443B] mb-2">
              Product Title
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

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-[#34443B] mb-2">
              Price
            </label>

            <input
              type="number"
              {...register("price")}
              placeholder="Enter price"
              className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
            />

            {errors.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#34443B] mb-2">
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

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-[#34443B] mb-2">
              Product Image
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              {...register("image")}
              className="w-full rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] px-3 py-2 text-sm text-[#68736D] file:mr-4 file:rounded-md file:border-0 file:bg-[#E8F2EC] file:px-4 file:py-2 file:text-[#2F6B4F] file:font-medium hover:file:bg-[#DDEDE4]"
            />

            {errors.image && (
              <p className="text-red-500 text-xs mt-2">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#34443B] mb-2">
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

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="flex-1 bg-[#2F6B4F] text-white py-3 rounded-lg font-semibold hover:bg-[#24553E] active:scale-[0.99] transition duration-200 shadow-sm"
            >
              Add Product
            </button>

            <button
              type="button"
              onClick={() => router.push("/products")}
              className="flex-1 bg-[#E8F2EC] text-[#2F6B4F] border border-[#D5E1DA] py-3 rounded-lg font-semibold hover:bg-[#DDEDE4] transition"
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
