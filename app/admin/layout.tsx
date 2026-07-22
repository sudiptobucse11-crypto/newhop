import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Book, Folder, Bell, Image as ImageIcon, Calendar } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/auth/login");
  }

  const sidebarLinks = [
    { name: "ড্যাশবোর্ড", path: "/admin", icon: LayoutDashboard },
    { name: "বই ব্যবস্থাপনা", path: "/admin/books", icon: Book },
    { name: "ক্যাটাগরি", path: "/admin/categories", icon: Folder },
    { name: "নোটিশ", path: "/admin/notices", icon: Bell },
    { name: "ইভেন্ট", path: "/admin/events", icon: Calendar },
    { name: "গ্যালারি", path: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-center">এডমিন প্যানেল</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.path} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                <Icon className="h-5 w-5 text-gray-400" />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
