"use client";
import { useState } from "react";
import { Copy, CheckCircle, Plus, Sparkles } from "lucide-react";

export const PreviewCard = ({ text, setText, onInsert }: any) => {
  const [extraText, setExtraText] = useState("（休憩1h）");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("コピーに失敗しました:", error);
    }
  };

  return (
    <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-gray-800 flex items-center gap-2'>
          <Sparkles size={20} className='text-sky-500' strokeWidth={1.5} />
          生成テキスト
        </h2>
        <div className='flex gap-2'>
          <input
            type='text'
            value={extraText}
            onChange={(e) => setExtraText(e.target.value)}
            className='text-xs border rounded px-2 py-1 w-24'
            placeholder='挿入文字'
          />
          <button
            onClick={() => onInsert(extraText)}
            className='text-xs bg-sky-500 text-white px-3 py-1 rounded-lg hover:bg-sky-600 transition flex items-center gap-1'
          >
            <Plus size={14} strokeWidth={2.5} />
            挿入
          </button>
        </div>
      </div>

      <textarea
        id='preview-textarea'
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='flex-1 w-full p-4 bg-gray-50 rounded-xl border-none text-sm font-mono leading-relaxed focus:ring-2 ring-sky-100 outline-none resize-none'
      />

      <button
        onClick={handleCopy}
        className={`mt-4 w-full py-3 rounded-xl font-bold transition ${
          copied
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {copied ? "✓ Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};
