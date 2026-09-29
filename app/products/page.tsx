
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import ProductCard from "@/components/Productcard"
import { ProductType } from "@/types/product"
import {useDispatch, useSelector} from 'react-redux'
import { AppDispatch} from '@/redux/store'
import { deleteproduct, listProduct } from "@/redux/slices/productSlice"


export default function ProductsPage() {
  const [role, setRole] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch<AppDispatch>()
    const{products,total,loading,error}=useSelector((state:any)=>state.products)


  const limit = 8
  const skip = (currentPage - 1) * limit
  const totalPages = Math.ceil(total / limit)


//   const getProducts = async () => {
//     try {
//       const storedToken = localStorage.getItem("token")

//       //get user info from local storage
//       const storedUser=localStorage.getItem('user');
//       const user=storedUser?JSON.parse(storedUser):null;

      

// //       const response = await api.get(
// //   `/products/listallproduct?limit=${limit}&skip=${skip}`,
// //   {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   }
// // )

//       console.log("PRODUCT RESPONSE:", response.data)

//       setProducts(response.data.data || [])
//       setTotal(response.data.total || 0)
//     } catch (error: any) {
//       console.log("PRODUCT ERROR:", error)
//       console.log("SERVER RESPONSE:", error.response?.data)
//     } finally {
//       setLoading(false)
//     }
//   }

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  )

  if (!confirmDelete) {
    return
  }

  try {
    const token = localStorage.getItem("token")
    if(!token){
      alert("no token found")
      return
    }

    await dispatch(
      deleteproduct({
        id,
        token,
      })
    ).unwrap()

    alert("Product deleted successfully")

    // Get updated product list
       dispatch(
      listProduct({
        limit,
        skip,
        token: token || "",
      })
    )

  } catch (error: any) {
    console.log("DELETE ERROR:", error)
    console.log("SERVER RESPONSE:", error.response?.data)

    alert(
      error.response?.data?.message ||
      "Failed to delete product"
    )
  }
}
  useEffect(() => {
    const storedUser=localStorage.getItem("user")
  const user = storedUser?JSON.parse(storedUser):null

  setRole(user?.role || "")

  const storedToken=localStorage.getItem("token")

  if(storedToken){
    dispatch(
      listProduct({
      limit,
      skip,
      token:storedToken
    })
  )
  }

}, [dispatch,currentPage])


return (
  <div className="min-h-screen bg-[#F7FAF8]">

    <Header />

    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading + Add Product */}
      <div className="flex flex-col items-center justify-center mb-10">

        <h1 className="text-4xl font-bold text-[#1F2A24] mb-5">
          Products
        </h1>

        {role === "seller" && (
          <Link
            href="/products/add"
            className="bg-[#2F6B4F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#24553E] transition shadow-sm"
          >
            + Add Product
          </Link>
        )}

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <p className="text-[#68736D] text-lg">
            Loading products...
          </p>
        </div>
      )}

      {/* No products */}
      {!loading && products.length === 0 && (
        <div className="flex justify-center items-center py-16">
          <div className="bg-white border border-[#E0EAE4] rounded-2xl px-8 py-10 text-center shadow-sm">
            <p className="text-[#68736D] text-lg">
              No products found.
            </p>
          </div>
        </div>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {products.map((product: ProductType) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="w-full flex justify-center items-center mt-10">

          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#E8F2EC] text-[#2F6B4F] font-semibold border border-[#D5E1DA] hover:bg-[#DDEDE4] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-[#2F6B4F] text-white shadow-sm"
                    : "bg-white text-[#2F6B4F] border border-[#D5E1DA] hover:bg-[#E8F2EC]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-[#E8F2EC] text-[#2F6B4F] font-semibold border border-[#D5E1DA] hover:bg-[#DDEDE4] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>

          </div>
        </div>
      )}

    </main>

  </div>
)
}
