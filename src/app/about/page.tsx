"use client";

import Link from "next/link";
// 綺麗なアイコンをインポート
import {
  Clock,
  Calendar,
  PlusCircle,
  RefreshCw,
  ClipboardCheck,
  ChevronLeft,
  Edit,
} from "lucide-react";

export default function AboutPage() {
  const steps = [
    {
      title: "時間を設定する",
      desc: "左上の「デフォルト時間設定」で、これから入力したい期間の時間を入力します。",
      Icon: Clock,
    },
    {
      title: "日付を選ぶ",
      desc: "カレンダーから、その期間を入れたい日付をすべてクリックして選択します。",
      Icon: Calendar,
    },
    {
      title: "リストに追加",
      desc: "「日程を追加」ボタンを押すと、右側のリストに確定され、カレンダーの選択はリセットされます。",
      Icon: PlusCircle,
    },
    {
      title: "重複登録（任意）",
      desc: "同じ日に別の時間を入れたい場合は、再度時間を変えてから同じ日付を選んで追加してください。",
      Icon: RefreshCw,
    },
    {
      title: "追加テキスト（任意）",
      desc: "追加したいテキストを入力して「挿入」ボタンを押すと、カーソル位置にテキストが挿入されます。\n（例：休憩時間や備考など）",
      Icon: Edit,
    },
    {
      title: "コピーして送信",
      desc: "右端に生成されたテキストをコピーして、SlackやLINEに貼り付けるだけ！",
      Icon: ClipboardCheck,
    },
  ];

  return (
    <main className='min-h-screen bg-white'>
      {/* 戻るボタン */}
      <div className='max-w-3xl mx-auto pt-10 px-8'>
        <Link
          href='/'
          className='text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium transition'
        >
          <ChevronLeft size={18} /> 戻る
        </Link>
      </div>

      <div className='max-w-3xl mx-auto py-16 px-8'>
        {/* タイトルセクション */}
        <h2 className='text-3xl font-bold text-gray-800 mb-3'>使い方</h2>
        <p className='text-gray-400 text-sm mb-20 tracking-wide'>
          6ステップで、簡単にカレンダーから文書を作成できます！
        </p>

        {/* ステップリスト */}
        <div className='space-y-16'>
          {steps.map((step, i) => (
            <div key={i} className='flex gap-10 items-start'>
              {/* 青い数字バッジ */}
              <div className='flex-shrink-0 w-11 h-11 bg-sky-500 text-white rounded-md flex items-center justify-center font-bold text-base shadow-sm'>
                {i + 1}
              </div>

              <div className='pt-1'>
                <div className='flex items-center gap-3 mb-3'>
                  {/* ここが綺麗なアイコン（Lucide） */}
                  <step.Icon
                    size={22}
                    className='text-sky-500'
                    strokeWidth={1.5}
                  />
                  <h3 className='font-bold text-gray-800 text-xl'>
                    {step.title}
                  </h3>
                </div>
                <p className='text-gray-500 text-[15px] leading-relaxed max-w-xl'>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 復活させた一番下の文章 */}
        <div className='mt-28 pl-8 border-l-[3px] border-sky-400 py-2'>
          <p className='text-gray-500 text-[15px] leading-loose'>
            同じ日付が続いた場合、2つ目以降の日付は自動的に空白になり、
            <br />
            読みやすいフォーマットで出力されます。
          </p>
        </div>
      </div>
    </main>
  );
}
