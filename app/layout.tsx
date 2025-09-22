import type { Metadata } from "next";
import "@/app/globals.css"; // <- obbligatorio

export const metadata: Metadata = {
  title: "ServiceNow Next.js",
  description: "A Next.js project with ServiceNow integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
