"use client";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import * as holidayJp from "holiday-jp";

interface Props {
  selectedDateStrings: string[];
  onToggleDate: (date: string) => void;
  onConfirm: () => void;
}

export const CalendarCard = ({
  selectedDateStrings,
  onToggleDate,
  onConfirm,
}: Props) => {
  const [viewDate, setViewDate] = useState(new Date());

  const monthStart = startOfMonth(viewDate);
  const days = eachDayOfInterval({
    start: monthStart,
    end: endOfMonth(viewDate),
  });
  const startOffset = getDay(monthStart);

  return (
    <div className='bg-white p-7 rounded-2xl border border-gray-100 shadow-sm space-y-7'>
      <div>
        {/* 月移動ヘッダー */}
        <div className='flex justify-between items-center mb-6 px-1'>
          <span className='font-bold text-lg text-gray-900'>
            {format(viewDate, "yyyy年 M月")}
          </span>
          <div className='flex gap-2'>
            <button
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className='p-2.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition'
            >
              ◀
            </button>
            <button
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className='p-2.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition'
            >
              ▶
            </button>
          </div>
        </div>

        {/* 曜日見出し */}
        <div className='grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold tracking-wider mb-5'>
          <div className='text-red-500'>SUN</div>
          <div className='text-gray-400'>MON</div>
          <div className='text-gray-400'>TUE</div>
          <div className='text-gray-400'>WED</div>
          <div className='text-gray-400'>THU</div>
          <div className='text-gray-400'>FRI</div>
          <div className='text-sky-500'>SAT</div>
        </div>

        {/* 日付グリッド */}
        <div className='grid grid-cols-7 gap-1.5 text-center'>
          {/* 月初の余白 */}
          {[...Array(startOffset)].map((_, i) => (
            <div key={`offset-${i}`} />
          ))}

          {days.map((day) => {
            const dStr = format(day, "yyyy-MM-dd");
            const isSelected = selectedDateStrings.includes(dStr);
            const dayOfWeek = getDay(day); // 0:日, 6:土
            const isHoliday = holidayJp.isHoliday(day); // 祝日判定

            // テキスト色の決定
            let textColor = "text-gray-800";
            if (dayOfWeek === 0 || isHoliday) {
              textColor = "text-red-500"; // 日曜または祝日
            } else if (dayOfWeek === 6) {
              textColor = "text-sky-500"; // 土曜
            }

            return (
              <button
                key={dStr}
                onClick={() => onToggleDate(dStr)}
                className={`
                  relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 
                  ${
                    isSelected
                      ? "bg-sky-500 text-white shadow shadow-sky-100 z-10"
                      : `hover:bg-gray-50 ${textColor}`
                  }
                `}
              >
                <span>{format(day, "d")}</span>
                {/* 祝日名を出したい場合はここに追加（今回はシンプルにドットや小さい文字を想定） */}
                {isHoliday && !isSelected && (
                  <span className='absolute bottom-1 text-[8px] scale-75 opacity-60'>
                    祝
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 確定ボタン */}
      <button
        onClick={onConfirm}
        disabled={selectedDateStrings.length === 0}
        className={`
          w-full py-3.5 rounded-xl font-bold text-sm transition-all
          ${
            selectedDateStrings.length > 0
              ? "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm"
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        ＋ この時間で日程を追加
      </button>
    </div>
  );
};
