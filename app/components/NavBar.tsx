import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import Image from "next/image";

export default function NavBar() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Image
          className="mb-6"
          src="/image.png"
          alt="ServiceNow Logo"
          width={200}
          height={100}
        />
        <ToggleTheme />
      </div>
    </div>
  );
}
