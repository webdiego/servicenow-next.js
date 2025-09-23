import type { Metadata } from "next";
import "@/app/globals.css"; // <- obbligatorio
// No need to import RootLayoutProps; define the props type inline
export const metadata: Metadata = {
  title: "ServiceNow Next.js",
  description: "A Next.js project with ServiceNow integration",
};
import NavBar from "@/app/components/NavBar";

import { ThemeProvider } from "@/app/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
