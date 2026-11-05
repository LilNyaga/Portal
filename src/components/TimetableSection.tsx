import React from 'react';
import { Clock, MapPin, User, Edit3 } from 'lucide-react';
import { TimetableSlot, UserRole } from '../types';

interface TimetableSectionProps {
  slots: TimetableSlot[];
  userRole: UserRole;
  onEditSlot: (slotId: string) => void;
  onOpenNotes: () => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  slots,
  userRole,
  onEditSlot,
  onOpenNotes,
}) => {
  const canEdit = userRole === 'lecturer' || userRole === 'rep' || userRole === 'admin';

  return (
    <div id="timetable-section" className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900">Today's Class Schedule</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] tracking-wide">
              LIVE SYNC
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Realtime single source of truth updated by department lecturers & class rep.
          </p>
        </div>
        <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          Thursday • Term 1
        </div>
      </div>

      {/* Slots List */}
      <div className="grid grid-cols-1 gap-3">
        {slots.map((slot) => {
          if (slot.isNow) {
            return (
              <div
                key={slot.id}
                className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="bg-emerald-700 text-white px-3 py-2 rounded-xl text-center min-w-[80px] shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-wider block">NOW</span>
                    <span className="text-xs font-mono font-bold">{slot.startTime} - {slot.endTime}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                        {slot.unitCode}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900">{slot.unitName}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {slot.lecturer}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {slot.room}</span>
                    </p>
                    {slot.topic && (
                      <div className="mt-2 text-xs text-emerald-800 font-medium">
                        Topic: {slot.topic}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {canEdit && (
                    <button
                      onClick={() => onEditSlot(slot.id)}
                      className="p-2 text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-xl flex items-center gap-1"
                      title="Edit Slot"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={onOpenNotes}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold shadow-2xs"
                  >
                    Download Lab Notes →
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={slot.id}
              className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                slot.rescheduled
                  ? 'border-amber-300 bg-amber-50/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`text-white px-3 py-2 rounded-xl text-center min-w-[80px] shadow-sm ${
                    slot.rescheduled ? 'bg-amber-600' : 'bg-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider block">
                    {slot.isNext ? 'NEXT' : 'CLASS'}
                  </span>
                  <span className="text-xs font-mono font-bold">{slot.startTime} - {slot.endTime}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        slot.rescheduled
                          ? 'text-amber-900 bg-amber-100'
                          : 'text-slate-800 bg-slate-100'
                      }`}
                    >
                      {slot.unitCode}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">{slot.unitName}</h4>
                    {slot.rescheduled && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                        Venue Updated
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                    <span>{slot.lecturer}</span>
                    <span>• {slot.room}</span>
                  </p>
                  {slot.rescheduleNote && (
                    <p className="text-xs text-amber-800 font-medium mt-1">
                      {slot.rescheduleNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {canEdit && (
                  <button
                    onClick={() => onEditSlot(slot.id)}
                    className="p-2 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl flex items-center gap-1"
                    title="Edit Slot"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
                {slot.isNext && (
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Starts in 1h 45m
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
