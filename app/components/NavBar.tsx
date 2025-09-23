import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import ServicenowLogo from "./ServicenowLogo";
export default function NavBar() {
  return (
    <div className="bg-[#032D42]  p-4">
      <div className="flex items-start justify-between container mx-auto">
        <ServicenowLogo className="w-44  h-10" />
        <ToggleTheme />
      </div>
    </div>
  );
}
