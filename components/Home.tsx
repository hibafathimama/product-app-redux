
"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F6F0]">

  


      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div>

            <div className="inline-block bg-[#E4EFE8] text-[#2F6B4F] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Discover Something New
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#1F2A24]">
              Everything You Need,
              <span className="block text-[#2F6B4F]">
                All in One Place.
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#68736D] max-w-xl">
              Explore our collection of amazing products and
              discover something that fits your style, needs,
              and everyday life.
            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="bg-[#2F6B4F] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#24553E] transition shadow-lg"
              >
                Explore Products →
              </Link>

              <Link
                href="/login"
                className="border-2 border-[#2F6B4F] text-[#2F6B4F] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#2F6B4F] hover:text-white transition"
              >
                Get Started
              </Link>

            </div>


            {/* Small Stats */}
            <div className="flex gap-8 mt-10">

              <div>
                <h3 className="text-2xl font-bold text-[#1F2A24]">
                  100+
                </h3>
                <p className="text-sm text-[#68736D]">
                  Products
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1F2A24]">
                  Easy
                </h3>
                <p className="text-sm text-[#68736D]">
                  Shopping
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1F2A24]">
                  24/7
                </h3>
                <p className="text-sm text-[#68736D]">
                  Access
                </p>
              </div>

            </div>

          </div>


          {/* Right Hero Design */}
          <div className="flex justify-center">

            <div className="relative w-full max-w-lg">

              {/* Background Shape */}
              <div className="absolute inset-0 bg-[#DCEBE2] rounded-[3rem] rotate-3"></div>


              {/* Main Card */}
              <div className="relative bg-white rounded-[3rem] p-8 md:p-12 shadow-xl">

                <div className="bg-[#E4EFE8] rounded-[2rem] p-10 text-center">

                  <div className="text-8xl mb-6">
                    🛍️
                  </div>

                  <h2 className="text-3xl font-bold text-[#1F2A24]">
                    Shop Smart
                  </h2>

                  <p className="mt-4 text-[#68736D] leading-relaxed">
                    Find products you love with a simple
                    and enjoyable shopping experience.
                  </p>

                  <Link
                    href="/products"
                    className="inline-block mt-7 bg-[#2F6B4F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#24553E] transition"
                  >
                    View Products
                  </Link>

                </div>


                {/* Floating Badge */}
                <div className="absolute -top-5 -right-5 bg-[#2F6B4F] text-white px-5 py-3 rounded-2xl shadow-lg">
                  <p className="text-xs">
                    Start
                  </p>

                  <p className="font-bold">
                    Shopping!
                  </p>
                </div>


                {/* Floating Circle */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#A8C9B5] rounded-full"></div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-[#2F6B4F] font-semibold uppercase tracking-widest text-sm">
              Our Benefits
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1F2A24]">
              Why Choose Our Store?
            </h2>

            <p className="mt-4 text-[#68736D] max-w-xl mx-auto">
              We make finding and exploring products simple,
              convenient and enjoyable.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {/* Card 1 */}
            <div className="group bg-[#F8F6F0] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="w-14 h-14 flex items-center justify-center bg-[#E4EFE8] rounded-xl text-3xl mb-6">
                ✨
              </div>

              <h3 className="text-xl font-bold text-[#1F2A24]">
                Quality Products
              </h3>

              <p className="mt-3 text-[#68736D] leading-relaxed">
                Discover products selected with quality
                and value in mind.
              </p>

            </div>


            {/* Card 2 */}
            <div className="group bg-[#F8F6F0] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="w-14 h-14 flex items-center justify-center bg-[#E4EFE8] rounded-xl text-3xl mb-6">
                🛒
              </div>

              <h3 className="text-xl font-bold text-[#1F2A24]">
                Easy Shopping
              </h3>

              <p className="mt-3 text-[#68736D] leading-relaxed">
                Browse products easily and find what
                you need without any hassle.
              </p>

            </div>


            {/* Card 3 */}
            <div className="group bg-[#F8F6F0] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="w-14 h-14 flex items-center justify-center bg-[#E4EFE8] rounded-xl text-3xl mb-6">
                💚
              </div>

              <h3 className="text-xl font-bold text-[#1F2A24]">
                Great Experience
              </h3>

              <p className="mt-3 text-[#68736D] leading-relaxed">
                Enjoy a clean and simple experience
                from browsing to buying.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="px-6 py-20 bg-[#F8F6F0]">

        <div className="max-w-5xl mx-auto bg-[#2F6B4F] rounded-[2rem] px-8 py-14 md:py-16 text-center shadow-xl">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Explore?
          </h2>

          <p className="mt-4 text-[#DCEBE2] text-lg">
            Discover our products and find something
            perfect for you.
          </p>

          <Link
            href="/products"
            className="inline-block mt-8 bg-white text-[#2F6B4F] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#E4EFE8] transition"
          >
            Start Shopping →
          </Link>

        </div>

      </section>

    </main>
  )
}

