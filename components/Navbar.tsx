"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "হোম", path: "/" },
    { name: "বইসমূহ", path: "/books" },
    { name: "ক্যাটাগরি", path: "/categories" },
    { name: "নোটিশ", path: "/notices" },
    { name: "ইভেন্ট", path: "/events" },
    { name: "গ্যালারি", path: "/gallery" },
    { name: "যোগাযোগ", path: "/contact" },
  ];

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-lg hidden sm:block">স্পিকার আঃ জব্বার খান স্মৃতি পাবলিক লাইব্রেরি</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="hover:text-green-200 transition-colors">
                {link.name}
              </Link>
            ))}
            {session ? (
              <div className="flex items-center gap-4 ml-4">
                {(session.user as any)?.role === "ADMIN" && (
                  <Link href="/admin" className="bg-white text-primary px-3 py-1 rounded-md text-sm font-semibold">এডমিন প্যানেল</Link>
                )}
                <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm">লগআউট</button>
              </div>
            ) : (
              <Link href="/auth/login" className="bg-white text-primary px-4 py-1 rounded-md font-semibold">লগইন</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary">
                {link.name}
              </Link>
            ))}
             {session ? (
              <button onClick={() => signOut()} className="block w-full text-left px-3 py-2 text-red-300 font-bold">লগআউট</button>
            ) : (
              <Link href="/auth/login" className="block px-3 py-2 text-green-200 font-bold">লগইন</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
