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
  title: {
    default: "BetaBase | Climbing Beta Videos",
    template: "%s | BetaBase",
  },
  description:
    "BetaBase is a community-powered video platform where climbers share and discover beta for routes at their local gym. Browse free climbing beta videos — no account required.",
  keywords: ["climbing beta", "climbing gym", "bouldering videos", "route beta", "climbing community"],
  openGraph: {
    siteName: "BetaBase",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
  },
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
