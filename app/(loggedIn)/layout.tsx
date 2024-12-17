import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "ARMS",
  description: "Archives and Records Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger className="mx-5 mt-5" />
            <div className="py-5 px-10">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
