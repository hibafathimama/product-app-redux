
"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5EDE3]">

      {/* Existing Navbar */}
      

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <p className="text-[#8A6A50] font-semibold tracking-widest uppercase mb-4">
              Welcome to Our Store
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#3E3025]">
              Find Products
              <span className="block text-[#6B4F3A]">
                You’ll Love.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#78695A] max-w-xl">
              Discover quality products, explore new collections,
              and find everything you need in one simple place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="bg-[#6B4F3A] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-[#513A2B] transition shadow-md"
              >
                Shop Now →
              </Link>

              <Link
                href="/login"
                className="border-2 border-[#6B4F3A] text-[#6B4F3A] px-7 py-3.5 rounded-lg font-semibold hover:bg-[#6B4F3A] hover:text-white transition"
              >
                Get Started
              </Link>

            </div>

          </div>


          {/* Right Side */}
          <div className="flex justify-center">

            <div className="relative w-full max-w-md">

              <div className="bg-[#E8D8C7] rounded-3xl p-8 md:p-10 shadow-xl">

                <div className="bg-[#F5EDE3] rounded-2xl p-8 text-center">

                  <div className="text-7xl mb-6">
                    🛍️
                  </div>

                  <h2 className="text-2xl font-bold text-[#3E3025]">
                    Everything You Need
                  </h2>

                  <p className="mt-3 text-[#78695A]">
                    Browse our collection and discover
                    products made for you.
                  </p>

                  <Link
                    href="/products"
                    className="inline-block mt-6 text-[#6B4F3A] font-semibold hover:underline"
                  >
                    Explore Products →
                  </Link>

                </div>

              </div>

              {/* Decorative Circles */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#6B4F3A] rounded-full opacity-10"></div>

              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-[#8A6A50] rounded-full opacity-10"></div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">

            <h2 className="text-3xl md:text-4xl font-bold text-[#3E3025]">
              Why Shop With Us?
            </h2>

            <p className="mt-3 text-[#78695A]">
              Simple shopping, quality products and a great experience.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white/60 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

              <div className="text-4xl mb-4">
                ✨
              </div>

              <h3 className="text-xl font-bold text-[#3E3025]">
                Quality Products
              </h3>

              <p className="mt-3 text-[#78695A]">
                Explore products selected with quality
                and value in mind.
              </p>

            </div>


            <div className="bg-white/60 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

              <div className="text-4xl mb-4">
                🛒
              </div>

              <h3 className="text-xl font-bold text-[#3E3025]">
                Easy Shopping
              </h3>

              <p className="mt-3 text-[#78695A]">
                Browse products easily and find what
                you are looking for quickly.
              </p>

            </div>


            <div className="bg-white/60 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition">

              <div className="text-4xl mb-4">
                💛
              </div>

              <h3 className="text-xl font-bold text-[#3E3025]">
                Made For You
              </h3>

              <p className="mt-3 text-[#78695A]">
                Discover products that fit your needs
                and personal style.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="px-6 pb-16">

        <div className="max-w-5xl mx-auto bg-[#6B4F3A] rounded-3xl px-8 py-12 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Start Shopping?
          </h2>

          <p className="mt-4 text-[#E8D8C7]">
            Explore our products and find something perfect for you.
          </p>

          <Link
            href="/products"
            className="inline-block mt-7 bg-[#F5EDE3] text-[#6B4F3A] px-7 py-3 rounded-lg font-semibold hover:bg-white transition"
          >
            Explore Products →
          </Link>

        </div>

      </section>

    </main>
  )
}

