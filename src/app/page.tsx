"use client";

import { useSchedule } from "../hooks/useSchedule";
import { TimeSettingCard } from "../components/TimeSettingCard";
import { CalendarCard } from "../components/CalendarCard";
import { SelectedListCard } from "../components/SelectedListCard";
import { PreviewCard } from "../components/PreviewCard";

export default function Home() {
  const {
    schedules,
    selectingDates,
    toggleSelectingDate,
    confirmSchedules,
    removeSchedule,
    clearAll,
    updateTime,
    generatedText,
    defaultTime,
    setDefaultTime,
    editableText,
    setEditableText,
    insertTextAtCursor,
  } = useSchedule();

  return (
    <main className='lg:h-[calc(100vh-80px)] lg:overflow-hidden flex flex-col'>
      <div className='p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto lg:flex-1 lg:overflow-hidden'>
        {/* 左カラム */}
        <section className='flex flex-col lg:h-full overflow-hidden'>
          <div className='space-y-6 flex-shrink-0'>
            <TimeSettingCard
              defaultTime={defaultTime}
              setDefaultTime={setDefaultTime}
            />
            <CalendarCard
              selectedDateStrings={selectingDates}
              onToggleDate={toggleSelectingDate}
              onConfirm={confirmSchedules}
            />
          </div>
          <div className='flex-1' />
        </section>

        {/* 中央カラム */}
        <section className='flex flex-col lg:h-[95%] overflow-hidden'>
          <div className='flex-1 overflow-hidden'>
            <SelectedListCard
              schedules={schedules}
              onUpdateTime={updateTime}
              onRemove={removeSchedule}
            />
          </div>
          <button
            onClick={clearAll}
            className='w-full py-3 text-red-500 text-sm font-medium border border-gray-100 bg-white rounded-xl hover:bg-gray-50 hover:border-gray-200 transition mt-4 flex-shrink-0'
          >
            リストをすべてクリア
          </button>
        </section>

        {/* 右カラム */}
        <section className='flex flex-col lg:h-[95%] overflow-hidden'>
          <PreviewCard
            text={editableText}
            setText={setEditableText}
            onInsert={insertTextAtCursor}
          />
        </section>
      </div>
    </main>
  );
}
