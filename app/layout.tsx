import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo_Black, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthik Kumar — Full Stack & Mobile Developer",
  description:
    "I build scalable web applications and cross-platform mobile apps that solve real-world problems.",
  keywords: ["Full Stack Developer", "Mobile App Developer", "React", "Next.js", "React Native"],
  authors: [{ name: "Karthik Kumar" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Karthik Kumar — Full Stack & Mobile Developer",
    description:
      "I build scalable web applications and cross-platform mobile apps that solve real-world problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
