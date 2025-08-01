
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">

  <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <NavBar />
    <div className=" mt-15 ">{children}</div>
    <SpeedInsights />
  </body>
</html>
  );
}
