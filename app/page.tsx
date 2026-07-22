import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Users, Calendar, Bell } from "lucide-react";

export default async function Home() {
  const [totalBooks, totalNotices, recentBooks, activeNotices] = await Promise.all([
    prisma.book.count(),
    prisma.notice.count({ where: { isActive: true } }),
    prisma.book.findMany({ take: 4, orderBy: { createdAt: 'desc' }, include: { category: true } }),
    prisma.notice.findMany({ take: 3, where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">স্পিকার আঃ জব্বার খান স্মৃতি পাবলিক লাইব্রেরি</h1>
        <p className="text-xl md:text-2xl mb-8 font-light">"জ্ঞানই শক্তি — বই হোক সকলের বন্ধু"</p>
        <Link href="/books" className="bg-white text-primary px-6 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
          বই অনুসন্ধান করুন
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <BookOpen className="mx-auto h-10 w-10 text-primary mb-2" />
          <h3 className="text-3xl font-bold text-gray-800">{totalBooks}</h3>
          <p className="text-gray-600">মোট বই</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <Users className="mx-auto h-10 w-10 text-primary mb-2" />
          <h3 className="text-3xl font-bold text-gray-800">৫০০+</h3>
          <p className="text-gray-600">সদস্য</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <Calendar className="mx-auto h-10 w-10 text-primary mb-2" />
          <h3 className="text-3xl font-bold text-gray-800">২০০১</h3>
          <p className="text-gray-600">প্রতিষ্ঠাকাল</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <Bell className="mx-auto h-10 w-10 text-primary mb-2" />
          <h3 className="text-3xl font-bold text-gray-800">{totalNotices}</h3>
          <p className="text-gray-600">বর্তমান নোটিশ</p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        
        {/* Recent Books */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">নতুন সংযোজিত বই</h2>
            <Link href="/books" className="text-primary hover:underline">সব দেখুন &rarr;</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {recentBooks.length > 0 ? recentBooks.map(book => (
              <div key={book.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div className="bg-gray-100 h-24 w-16 rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {book.category.name}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-gray-500">কোনো বই পাওয়া যায়নি।</p>
            )}
          </div>
        </div>

        {/* Notice Board */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">নোটিশ বোর্ড</h2>
            <Link href="/notices" className="text-primary hover:underline">সব &rarr;</Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
            {activeNotices.length > 0 ? activeNotices.map(notice => (
              <div key={notice.id} className="border-b last:border-0 pb-3 last:pb-0">
                <p className="text-xs text-gray-400 mb-1">{new Date(notice.createdAt).toLocaleDateString('bn-BD')}</p>
                <Link href={`/notices/${notice.id}`} className="font-semibold text-gray-800 hover:text-primary transition">
                  {notice.title}
                </Link>
              </div>
            )) : (
              <p className="text-gray-500 text-sm">কোনো নতুন নোটিশ নেই।</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
