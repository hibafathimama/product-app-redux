"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import api from "@/lib/api"
import Link from "next/link"
import { useRouter } from "next/navigation";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First name is required"),

  lastName: yup
    .string()
    .required("Last name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: yup
    .string()
    .required("Role is required"),

  image: yup
  .mixed<FileList>()
  .test(
    "required",
    "Image is required",
    (value) => {
      if (!value) return false;

      return value.length > 0;
    }
  ),
})

type RegistrationForm = yup.InferType<typeof schema>
export default function RegistrationPage() {
  const router = useRouter();

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<RegistrationForm>({
  resolver: yupResolver(schema),
})

  const onSubmit = async (data: RegistrationForm) => {
    try {
      const formData = new FormData()

      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("role", data.role)
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0])
      }
            const response = await api.post("/users/register", formData)

      console.log("RESPONSE:", response.data)

      alert("Registration successful")
      if(response.data){
        router.push("/login")
      }

    } catch (error: any) {

      console.log("REGISTRATION ERROR:", error)
      console.log("SERVER RESPONSE:", error.response?.data)
      console.log("STATUS:", error.response?.status)

      alert(
        error.response?.data?.message || "Registration failed"
      )
    }
  }


  return (

    <main className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#DDEDE4] rounded-full opacity-70"></div>

      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#E8F2EC] rounded-full opacity-70"></div>


      {/* Registration Container */}
      <div className="relative w-full max-w-lg">


        {/* Registration Card */}
        <div className="bg-white rounded-2xl border border-[#E0EAE4] shadow-[0_10px_40px_rgba(47,107,79,0.08)] p-7 md:p-9">


          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold text-[#1F2A24]">
              Create Account
            </h1>

            <p className="text-[#68736D] mt-2 text-sm">
              Register to get started with our store
            </p>

          </div>


          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >


            {/* First Name */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
                className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
              />

              {errors.firstName && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.firstName.message}
                </p>
              )}

            </div>


            {/* Last Name */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
                className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
              />

              {errors.lastName && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.lastName.message}
                </p>
              )}

            </div>


            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] placeholder-[#9AA9A1] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}

            </div>


            {/* Role */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Role
              </label>

              <select
                {...register("role")}
                className="w-full h-12 px-4 rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] text-[#1F2A24] outline-none transition focus:border-[#2F6B4F] focus:ring-4 focus:ring-[#E8F2EC]"
              >

                <option value="">
                  Select Role
                </option>

                <option value="seller">
                  Seller
                </option>

                <option value="buyer">
                  Buyer
                </option>

              </select>

              {errors.role && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.role.message}
                </p>
              )}

            </div>


            {/* Image */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full rounded-lg border border-[#D5E1DA] bg-[#FBFCFB] px-3 py-2 text-sm text-[#68736D] file:mr-4 file:rounded-md file:border-0 file:bg-[#E8F2EC] file:px-4 file:py-2 file:text-[#2F6B4F] file:font-medium hover:file:bg-[#DDEDE4]"
              />

              {errors.image && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.image.message}
                </p>
              )}

            </div>


            {/* Register Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#2F6B4F] text-white rounded-lg font-medium hover:bg-[#24553E] active:scale-[0.99] transition duration-200 shadow-sm"
            >
              Create Account
            </button>

          </form>


          {/* Login */}
          <div className="mt-7 pt-6 border-t border-[#E8EFEA] text-center">

            <p className="text-sm text-[#68736D]">

              Already have an account?{" "}

              <Link
                href="/login"
                className="text-[#2F6B4F] font-medium hover:text-[#24553E] hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-[#9AA9A1] mt-6">
          © 2026 Product App
        </p>

      </div>

    </main>
  )
}

