import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { TimetableSlot } from '../../types';

export const TimetablePage: React.FC<{
  slots: TimetableSlot[];
  onBack: () => void;
}> = ({ slots, onBack }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Thursday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSlots = slots.filter((s) => s.day === selectedDay);

  return (
    <div className="w-full pt-2 sm:pt-4 bg-[#FAF6EE] text-slate-800">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#eadbc6] mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 hover:text-slate-900 transition-colors cursor-pointer select-none shrink-0 bg-transparent border-0 p-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              Complete Weekly Timetable & Lecture Schedule
            </h2>
            <p className="text-xs text-slate-600">Department of Physiotherapy • Year 2 Semester 1</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs rounded-2xl border border-[#eadbc6] bg-[#fffaf4] p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#eadbc6]">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-[#6f1825] text-white shadow-xs'
                  : 'bg-[#FAF2DE] hover:bg-[#f3e2bb] text-slate-700 border border-[#eadbc6]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="font-black text-sm sm:text-base text-slate-900">{selectedDay} Schedule</h4>
            <p className="text-xs text-slate-500">Official lectures, practical laboratory demos & hospital rotations</p>
          </div>
          <span className="text-xs font-mono font-bold bg-[#FAF2DE] text-slate-700 px-3 py-1 rounded-lg border border-[#eadbc6]">
            {filteredSlots.length} Scheduled Sessions
          </span>
        </div>

        <div className="space-y-3">
          {filteredSlots.length === 0 ? (
            <div className="p-8 text-center text-slate-500 border rounded-2xl bg-white border-[#eadbc6]">
              No classes scheduled for {selectedDay}. Independent study or clinic library reading.
            </div>
          ) : (
            filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all ${
                  slot.isNow
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                    : 'border-[#eadbc6] bg-white hover:bg-[#fffaf4]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`px-3 py-2 rounded-xl text-center font-mono font-bold text-xs shrink-0 ${
                      slot.isNow ? 'bg-emerald-700 text-white' : 'bg-[#FAF2DE] text-slate-800 border border-[#eadbc6]'
                    }`}>
                      {slot.startTime}
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-900">{slot.unitName}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{slot.room}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    {slot.unitCode}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
