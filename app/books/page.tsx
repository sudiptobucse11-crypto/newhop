import { prisma } from "@/lib/prisma";
import { BookOpen, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Next 15 awaits searchParams
  const params = await searchParams;
  const q = params.q || "";

  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { author: { contains: q, mode: "insensitive" } },
      ]
    },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">লাইব্রেরির বইসমূহ</h1>
      
      <form className="mb-8 max-w-xl relative">
        <input 
          type="text" 
          name="q"
          defaultValue={q}
          placeholder="বইয়ের নাম বা লেখকের নাম দিয়ে খুঁজুন..." 
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
        <button type="submit" className="hidden">খুঁজুন</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? books.map(book => (
          <div key={book.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition">
            <div className="bg-gray-100 h-32 w-24 rounded flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-gray-400 h-8 w-8" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                <p className="text-xs text-gray-500 mt-1">প্রকাশনী: {book.publisher || "অজানা"}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                  {book.category.name}
                </span>
                <span className={`text-xs font-bold ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.availableCopies > 0 ? 'মজুদ আছে' : 'মজুদ নেই'}
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            দুঃখিত, কোনো বই পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
