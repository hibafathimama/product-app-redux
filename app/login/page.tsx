"use client"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import Link from "next/link"




const loginschema= yup.object({
    email:yup.string().email("Enter a valid email").required("email is required"),
    password:yup.string().required("password is required")
})

type LoginForm=yup.InferType<typeof loginschema>
export default function LoginPage() {

        const router = useRouter()
        const {
            register,
            handleSubmit,
            formState:{errors},
        }=useForm<LoginForm>({
            resolver:yupResolver(loginschema),
        })
    
 const onsubmit = async(data :LoginForm)=>{
    try{
        const response = await api.post("/users/login",data)

        const token = response.data.accestoken
        const role = response.data.data.role

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data)
        )

        localStorage.setItem("token", token)

        await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            role: role,
          }),
        })

        router.push("/products")


    }
    catch(error:any){
        console.log("LOGIN ERROR:", error)
        console.log("SERVER RESPONSE:", error.response?.data)
        alert(
        error.response?.data?.message || "Invalid email or password"
        )
    }
 }


  return (
    <main className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Minimal Background Decoration */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#DDEDE4] rounded-full opacity-70"></div>

      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-[#E8F2EC] rounded-full opacity-70"></div>


      {/* Login Container */}
      <div className="relative w-full max-w-md">


        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-[#E0EAE4] shadow-[0_10px_40px_rgba(47,107,79,0.08)] p-7 md:p-9">


          {/* Heading */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-semibold text-[#1F2A24]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#68736D]">
              Sign in to continue to your account
            </p>

          </div>


          {/* Form */}
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-5"
          >


            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-[#34443B] mb-2">
                Email address
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


            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#2F6B4F] text-white rounded-lg font-medium hover:bg-[#24553E] active:scale-[0.99] transition duration-200 shadow-sm"
            >
              Sign In
            </button>

          </form>


          {/* Register */}
          <div className="mt-7 pt-6 border-t border-[#E8EFEA] text-center">

            <p className="text-sm text-[#68736D]">

              Don't have an account?{" "}

              <Link
                href="/registration"
                className="text-[#2F6B4F] font-medium hover:text-[#24553E] hover:underline"
              >
                Create an account
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

