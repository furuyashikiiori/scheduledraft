import "./global.css";
import Link from "next/link";
import { CalendarSync } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className='bg-[#F9FAFB] text-[#1F2937]'>
        {/* 固定ヘッダー */}
        <header className='fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-8'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-sky-500 text-white rounded-lg shadow-sm font-bold text-xl'>
              <CalendarSync size={18} strokeWidth={1.5} />
            </div>
            <h1 className='text-xl font-black tracking-tighter text-gray-800 uppercase'>
              ShiftDraft
            </h1>
          </div>

          <nav className='flex gap-1 bg-gray-100 p-1 rounded-xl'>
            <Link
              href='/'
              className='px-6 py-2 rounded-lg text-sm font-bold hover:bg-white transition-all shadow-sm'
            >
              ツール
            </Link>
            <Link
              href='/about'
              className='px-6 py-2 rounded-lg text-sm font-bold hover:bg-white transition-all shadow-sm'
            >
              使い方
            </Link>
          </nav>
        </header>

        {/* コンテンツ部分 (ヘッダーの高さ分 margin-top を確保) */}
        <div className='pt-20'>{children}</div>
      </body>
    </html>
  );
}
