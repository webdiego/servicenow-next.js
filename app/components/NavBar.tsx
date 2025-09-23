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
      <div>
        <h1 className="text-2xl font-bold">Incidents</h1>
        <p className="mb-4">List of incidents fetched from ServiceNow</p>
      </div>
    </div>
  );
}
