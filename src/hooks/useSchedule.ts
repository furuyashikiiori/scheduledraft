import { useState, useMemo, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import * as holidayJp from "holiday-jp";

export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const useSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectingDates, setSelectingDates] = useState<string[]>([]);
  const [defaultTime, setDefaultTime] = useState({
    start: "10:00",
    end: "19:00",
  });
  const [editableText, setEditableText] = useState("");

  // 祝日判定関数
  const isHoliday = (date: Date) => {
    return (holidayJp as any).isHoliday(date);
  };

  // 日付の切り替え
  const toggleSelectingDate = (dateString: string) => {
    setSelectingDates((prev) =>
      prev.includes(dateString)
        ? prev.filter((d) => d !== dateString)
        : [...prev, dateString].sort(),
    );
  };

  // スケジュールのソート関数（日付でソート、同じ日付なら開始時刻でソート）
  const sortSchedules = (items: Schedule[]): Schedule[] => {
    return items.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });
  };

  // スケジュールの確定
  const confirmSchedules = () => {
    const newSchedules = selectingDates.map((date) => ({
      id: crypto.randomUUID(),
      date,
      startTime: defaultTime.start,
      endTime: defaultTime.end,
    }));
    setSchedules((prev) => sortSchedules([...prev, ...newSchedules]));
    setSelectingDates([]);
  };

  // スケジュールの削除
  const removeSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  // すべてをクリア
  const clearAll = () => {
    setSchedules([]);
    setSelectingDates([]);
  };

  // 時間の更新
  const updateTime = (
    id: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedules((prev) =>
      sortSchedules(
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
      ),
    );
  };

  // テキスト挿入関数
  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById(
      "preview-textarea",
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = editableText;

    const nextText =
      currentText.substring(0, start) +
      textToInsert +
      currentText.substring(end);
    setEditableText(nextText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + textToInsert.length,
        start + textToInsert.length,
      );
    }, 0);
  };

  // 自動生成ロジック（同じ日付は最初だけ日付表示、開始時刻順）
  const generatedText = useMemo(() => {
    if (schedules.length === 0) return "";

    // 日付でソート、同じ日付なら開始時刻でソート
    const sortedSchedules = [...schedules].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

    const groups: { [key: string]: string[] } = {};

    sortedSchedules.forEach((s, index) => {
      const dateObj = parseISO(s.date);
      const monthKey = format(dateObj, "M月");
      if (!groups[monthKey]) groups[monthKey] = [];

      // この日付が最初に出現したかどうかをチェック
      const isFirstOccurrence =
        sortedSchedules.findIndex((item) => item.date === s.date) === index;

      let dateLabel = "";
      if (isFirstOccurrence) {
        dateLabel = format(dateObj, "d(eeee)", { locale: ja }).replace(
          "曜日",
          "",
        );
      } else {
        dateLabel = "　　　";
      }

      groups[monthKey].push(`${dateLabel} ${s.startTime}-${s.endTime}`);
    });

    return Object.entries(groups)
      .map(([m, l]) => `${m}\n${l.join("\n")}`)
      .join("\n\n");
  }, [schedules]);

  // schedulesが更新されたら editableText に反映させる
  useEffect(() => {
    setEditableText(generatedText);
  }, [generatedText]);

  return {
    schedules,
    selectingDates,
    toggleSelectingDate,
    confirmSchedules,
    removeSchedule,
    clearAll,
    updateTime,
    editableText,
    setEditableText,
    insertTextAtCursor,
    isHoliday,
    generatedText,
    defaultTime,
    setDefaultTime,
  };
};
