import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
// 1. Import the Header/Navbar component
import { Header } from "@/component/homepage/navbar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mira-AI Voice Therapist",
  description: "AI Voice Therapist application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${manrope.className} bg-background-light font-display text-[#101c22]`}
        >
          <Header />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}