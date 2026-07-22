import { prisma } from "@/lib/prisma";

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({ include: { category: true } });
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">বই ব্যবস্থাপনা</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">বইয়ের নাম</th>
              <th className="py-2 px-4 text-left">লেখক</th>
              <th className="py-2 px-4 text-left">ক্যাটাগরি</th>
              <th className="py-2 px-4 text-left">মজুদ</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="border-b">
                <td className="py-2 px-4">{book.title}</td>
                <td className="py-2 px-4">{book.author}</td>
                <td className="py-2 px-4">{book.category.name}</td>
                <td className="py-2 px-4">{book.availableCopies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
