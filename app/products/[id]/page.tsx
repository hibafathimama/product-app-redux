"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ProductType } from "@/types/product"
import {useDispatch, useSelector} from 'react-redux'
import { AppDispatch} from '@/redux/store'
import { getproduct } from "@/redux/slices/productSlice"


export default function ProductPage() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { selectedproduct, loading, error } = useSelector(
  (state: any) => state.products
)



    // Get product id from URL
  const id =params.id as string
 

    //run when page loads
    useEffect(()=>{
     const token=localStorage.getItem("token")
     if(!token){
      alert("not token found")
      return
     }

     dispatch(
      getproduct({
        id,token
      })
     )

    },[id,dispatch])

      // Show loading message
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE3] flex items-center justify-center">
        <p className="text-[#6B4F3A] text-lg">
          Loading product...
        </p>
      </div>
    )
  }
    // Product not found
  if (!selectedproduct) {
    return (
      <div className="min-h-screen bg-[#F5EDE3] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#3E3025]">
          Product Not Found
        </h1>

        <Link
          href="/products"
          className="mt-5 bg-[#6B4F3A] text-white px-6 py-3 rounded-lg hover:bg-[#543C2C] transition"
        >
          Back to Products
        </Link>
      </div>
    )
  }
    // Create image URL
  const imageUrl = selectedproduct.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
        "/api",
        ""
      )}/${selectedproduct.image.replaceAll("\\", "/")}`
    : "/logo.png.jpg"

  


return (
  <div className="min-h-screen bg-[#F7FAF8]">

    <main className="max-w-5xl mx-auto px-6 py-10">

      {/* Back button */}
      <Link
        href="/products"
        className="text-[#2F6B4F] font-semibold hover:text-[#24553E] transition"
      >
        ← Back to Products
      </Link>

      {/* Product card */}
      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(47,107,79,0.08)] border border-[#E0EAE4] overflow-hidden mt-6">

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Product image */}
          <div className="p-6 flex items-center justify-center bg-[#F7FAF8]">

            <img
              src={imageUrl}
              alt={selectedproduct.title}
              className="w-full h-96 object-cover rounded-xl"
            />

          </div>

          {/* Product details */}
          <div className="p-8 flex flex-col justify-center">

            {/* Category */}
            <span className="w-fit px-3 py-1 bg-[#E8F2EC] text-[#2F6B4F] text-xs font-semibold rounded-full">
              {selectedproduct.cateogary}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-bold text-[#1F2A24] mt-4">
              {selectedproduct.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-[#2F6B4F] mt-5">
              ₹{selectedproduct.price}
            </p>

            {/* Description */}
            <div className="mt-6 bg-[#F7FAF8] border border-[#E8EFEA] rounded-xl p-4">
              <p className="text-[#68736D] leading-7">
                {selectedproduct.description}
              </p>
            </div>

            {/* Buy button */}
            <button
              className="mt-8 w-full bg-[#2F6B4F] text-white py-3 rounded-xl font-semibold hover:bg-[#24553E] transition shadow-sm"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </main>

  </div>
)
    }
