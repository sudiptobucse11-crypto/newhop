import { prisma } from "@/lib/prisma";
import { Book, Folder, Bell, Users } from "lucide-react";

export default async function AdminDashboard() {
  const [totalBooks, totalCategories, totalNotices, totalUsers] = await Promise.all([
    prisma.book.count(),
    prisma.category.count(),
    prisma.notice.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { title: "মোট বই", count: totalBooks, icon: Book, color: "bg-blue-500" },
    { title: "মোট ক্যাটাগরি", count: totalCategories, icon: Folder, color: "bg-green-500" },
    { title: "মোট নোটিশ", count: totalNotices, icon: Bell, color: "bg-yellow-500" },
    { title: "এডমিন/ইউজার", count: totalUsers, icon: Users, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ড্যাশবোর্ড ওভারভিউ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className={`${stat.color} p-4 rounded-lg text-white`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
