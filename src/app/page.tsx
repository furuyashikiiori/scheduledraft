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
    <main className='p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1600px] mx-auto items-start'>
      {/* 左カラム */}
      <section className='space-y-8'>
        <TimeSettingCard
          defaultTime={defaultTime}
          setDefaultTime={setDefaultTime}
        />
        <CalendarCard
          selectedDateStrings={selectingDates}
          onToggleDate={toggleSelectingDate}
          onConfirm={confirmSchedules}
        />
      </section>

      {/* 中央カラム */}
      <section className='space-y-6 h-[calc(100vh-180px)] min-h-[600px] flex flex-col'>
        <div className='flex-1'>
          <SelectedListCard
            schedules={schedules}
            onUpdateTime={updateTime}
            onRemove={removeSchedule}
          />
        </div>
        <button
          onClick={clearAll}
          className='w-full py-3 text-red-500 text-sm font-medium border border-gray-100 bg-white rounded-xl hover:bg-gray-50 hover:border-gray-200 transition'
        >
          リストをすべてクリア
        </button>
      </section>

      {/* 右カラム */}
      <section className='h-[calc(100vh-180px)] min-h-[600px]'>
        <PreviewCard
          text={editableText}
          setText={setEditableText}
          onInsert={insertTextAtCursor}
        />
      </section>
    </main>
  );
}
