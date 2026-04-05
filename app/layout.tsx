import type { Metadata } from "next";
import { DM_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BetaBase - Climbing Gym and Route Management Platform",
  description:
    "BetaBase is a comprehensive climbing gym and route management platform designed to streamline operations, enhance customer engagement, and foster a vibrant climbing community. With features for route setting, gym management, and community interaction, BetaBase empowers climbing gyms to thrive in the digital age.",
};

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSerifDisplay.variable} ${dmMono.variable} antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
      >
        <TooltipProvider>
          <Navbar />
          <main className="h-full overflow-auto">{children}</main>
          <Footer />
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
