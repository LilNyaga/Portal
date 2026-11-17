import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface KenyaHoliday {
  day: number;
  month: number;
  name: string;
  type: string;
}

const KENYA_NATIONAL_DAYS_2026: KenyaHoliday[] = [
  { day: 1, month: 0, name: "New Year's Day", type: 'Public Holiday' },
  { day: 21, month: 2, name: 'Eid al-Fitr', type: 'Islamic Public Holiday (Tentative)' },
  { day: 3, month: 3, name: 'Good Friday', type: 'Christian Public Holiday' },
  { day: 6, month: 3, name: 'Easter Monday', type: 'Christian Public Holiday' },
  { day: 1, month: 4, name: 'Labour Day', type: 'National Public Holiday' },
  { day: 27, month: 4, name: 'Eid al-Adha', type: 'Islamic Public Holiday (Tentative)' },
  { day: 1, month: 5, name: 'Madaraka Day', type: 'National Day (Self-Rule Day)' },
  { day: 10, month: 9, name: 'Mazingira Day', type: 'National Conservation & Heritage Day' },
  { day: 20, month: 9, name: 'Mashujaa Day', type: "National Heroes' Day" },
  { day: 12, month: 11, name: 'Jamhuri Day', type: 'Republic & Independence Day' },
  { day: 25, month: 11, name: 'Christmas Day', type: 'Christian Public Holiday' },
  { day: 26, month: 11, name: 'Utu Day (Boxing Day)', type: 'National Public Holiday' },
];

const CALENDAR_MONTHS_2026 = [
  { index: 0, name: 'January 2026', shortName: 'Jan', days: 31, startDayOfWeek: 4 },
  { index: 1, name: 'February 2026', shortName: 'Feb', days: 28, startDayOfWeek: 0 },
  { index: 2, name: 'March 2026', shortName: 'Mar', days: 31, startDayOfWeek: 0 },
  { index: 3, name: 'April 2026', shortName: 'Apr', days: 30, startDayOfWeek: 3 },
  { index: 4, name: 'May 2026', shortName: 'May', days: 31, startDayOfWeek: 5 },
  { index: 5, name: 'June 2026', shortName: 'Jun', days: 30, startDayOfWeek: 1 },
  { index: 6, name: 'July 2026', shortName: 'Jul', days: 31, startDayOfWeek: 3 },
  { index: 7, name: 'August 2026', shortName: 'Aug', days: 31, startDayOfWeek: 6 },
  { index: 8, name: 'September 2026', shortName: 'Sep', days: 30, startDayOfWeek: 2 },
  { index: 9, name: 'October 2026', shortName: 'Oct', days: 31, startDayOfWeek: 4 },
  { index: 10, name: 'November 2026', shortName: 'Nov', days: 30, startDayOfWeek: 0 },
  { index: 11, name: 'December 2026', shortName: 'Dec', days: 31, startDayOfWeek: 2 },
];

export const CalendarPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(() => today.getMonth());

  const month = CALENDAR_MONTHS_2026[currentMonthIndex];
  const monthHolidays = KENYA_NATIONAL_DAYS_2026.filter((h) => h.month === currentMonthIndex);
  const isToday = (day: number) => day === today.getDate() && currentMonthIndex === today.getMonth();

  return (
    <div className="w-full pt-2 sm:pt-4 bg-[#FAF6EE] text-slate-800">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 hover:text-slate-900 transition-colors cursor-pointer select-none shrink-0 bg-transparent border-0 p-0"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
            Academic Calendar
          </h2>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs p-2.5 sm:p-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#6f1825]" />
              <h3 className="font-black text-sm sm:text-base text-slate-900">{month.name}</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMonthIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => Math.min(11, prev + 1))}
                disabled={currentMonthIndex === 11}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center font-extrabold text-[10px] text-slate-500 uppercase tracking-wider py-1.5 bg-slate-50 rounded-xl mt-2">
            <span className="text-rose-600">Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] mt-2">
            {Array.from({ length: month.startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 opacity-0 select-none">.</div>
            ))}
            {Array.from({ length: month.days }).map((_, i) => {
              const dayNum = i + 1;
              const holiday = monthHolidays.find((h) => h.day === dayNum);
              const todayCell = isToday(dayNum);

              return (
                <div
                  key={dayNum}
                  className={`min-h-[46px] sm:min-h-[54px] p-1 rounded-lg flex flex-col items-center justify-center text-center transition-all border ${
                    todayCell
                      ? 'bg-[#6f1825] text-white border-[#6f1825] shadow-sm ring-1 ring-[#6f1825]/20'
                      : holiday
                        ? 'bg-rose-50 text-rose-950 font-black border-rose-300 ring-1 ring-rose-200 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-100'
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-bold text-center ${todayCell ? 'text-white' : holiday ? 'text-rose-700 font-black' : ''}`}>
                    {dayNum}
                  </span>
                  {holiday && (
                    <span className={`mt-1 block w-full px-1 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-tight leading-tight truncate text-center ${
                      todayCell ? 'bg-white/15 text-white' : 'bg-[#6f1825] text-amber-200'
                    }`}>
                      {holiday.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
