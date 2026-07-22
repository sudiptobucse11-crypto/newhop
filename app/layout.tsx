import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const bengaliFont = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "স্পিকার আঃ জব্বার খান স্মৃতি পাবলিক লাইব্রেরি",
  description: "জ্ঞানই শক্তি — বই হোক সকলের বন্ধু। বাবুগঞ্জ, বরিশালের একটি ঐতিহ্যবাহী পাবলিক লাইব্রেরি।",
  metadataBase: new URL("https://sajkspla.org"), // Replace with actual domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${bengaliFont.className} flex flex-col min-h-screen bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
