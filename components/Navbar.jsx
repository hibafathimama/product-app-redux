
"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="bg-[#F8F6F0] border-b border-[#E4EFE8]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold text-[#2F6B4F] text-2xl ">Product App</h1>
        </Link>


        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <Link
            href="/registration"
            className="bg-[#2F6B4F] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#24553E] transition shadow-sm"
          >
            Register
          </Link>

        </nav>

      </div>
    </header>
  )
}

