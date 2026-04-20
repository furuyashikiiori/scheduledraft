"use client";
import { format, parseISO, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import * as holidayJp from "holiday-jp";
import { Schedule } from "../hooks/useSchedule";

interface Props {
  schedules: Schedule[];
  onUpdateTime: (
    id: string,
    field: "startTime" | "endTime",
    value: string,
  ) => void;
  onRemove: (id: string) => void;
}

export const SelectedListCard = ({
  schedules,
  onUpdateTime,
  onRemove,
}: Props) => (
  <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden'>
    <h2 className='text-lg font-bold mb-4 flex items-center justify-between flex-shrink-0'>
      選択中の日程
      <span className='text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-500'>
        {schedules.length}枠
      </span>
    </h2>
    <div className='flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar min-h-0'>
      {schedules.map((s) => {
        const dateObj = parseISO(s.date);
        const dayOfWeek = getDay(dateObj);
        const isHoliday = (holidayJp as any).isHoliday(dateObj);

        const textColor =
          dayOfWeek === 0 || isHoliday
            ? "text-red-500"
            : dayOfWeek === 6
              ? "text-sky-500"
              : "text-gray-700";

        return (
          <div
            key={s.id}
            className='group p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-transparent hover:border-sky-100 transition relative'
          >
            <span className={`text-sm font-black ${textColor}`}>
              {format(parseISO(s.date), "M/d(eee)", { locale: ja })}
            </span>
            <div className='flex items-center gap-2 mr-6'>
              <input
                type='time'
                value={s.startTime}
                onChange={(e) =>
                  onUpdateTime(s.id, "startTime", e.target.value)
                }
                className='bg-white border-none rounded-lg p-1 text-xs font-bold shadow-sm w-20'
              />
              <span className='text-gray-300 font-bold'>-</span>
              <input
                type='time'
                value={s.endTime}
                onChange={(e) => onUpdateTime(s.id, "endTime", e.target.value)}
                className='bg-white border-none rounded-lg p-1 text-xs font-bold shadow-sm w-20'
              />
            </div>
            <button
              onClick={() => onRemove(s.id)}
              className='absolute -right-1 -top-1 bg-white text-gray-300 hover:text-red-500 rounded-full shadow-sm w-6 h-6 flex items-center justify-center border border-gray-100 transition-colors'
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
