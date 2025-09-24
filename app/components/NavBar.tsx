import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import ServicenowLogo from "./ServicenowLogo";
import Link from "next/link";
export default function NavBar() {
  return (
    <div className="bg-[#032D42]  p-4">
      <div className="flex items-center justify-between container mx-auto border-b border-[#0A4A6D] pb-4">
        <Link href="/">
          <ServicenowLogo className="w-44  h-10" />
        </Link>

        <ToggleTheme />
      </div>
      <div className="container mx-auto mt-4">
        <Link
          href="/knowledge"
          className="text-white text-sm self-end px-1.5 py-1 rounded-sm bg-[#0A4A6D] border-[#0A4A6D] hover:bg-[#01405E] transition-all"
        >
          Knowledge Articles
        </Link>
      </div>
    </div>
  );
}
