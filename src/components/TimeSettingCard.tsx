import { Clock } from "lucide-react";

export const TimeSettingCard = ({ defaultTime, setDefaultTime }: any) => (
  <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
    <h2 className='text-sm font-bold text-sky-600 mb-4 flex items-center gap-2'>
      <Clock size={18} strokeWidth={1.5} />
      デフォルト時間設定
    </h2>
    <div className='flex items-center gap-3'>
      <input
        type='time'
        value={defaultTime.start}
        onChange={(e) =>
          setDefaultTime({ ...defaultTime, start: e.target.value })
        }
        className='flex-1 p-2 bg-gray-50 border-none rounded-xl text-center font-bold focus:ring-2 ring-sky-200 outline-none'
      />
      <span className='text-gray-400 font-bold'>~</span>
      <input
        type='time'
        value={defaultTime.end}
        onChange={(e) =>
          setDefaultTime({ ...defaultTime, end: e.target.value })
        }
        className='flex-1 p-2 bg-gray-50 border-none rounded-xl text-center font-bold focus:ring-2 ring-sky-200 outline-none'
      />
    </div>
  </div>
);
