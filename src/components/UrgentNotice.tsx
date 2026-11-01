import React, { useState } from 'react';
import { Check, Clock } from 'lucide-react';
import { Announcement } from '../types';

interface UrgentNoticeProps {
  announcement: Announcement;
  showReceipts?: boolean;
}

export const UrgentNotice: React.FC<UrgentNoticeProps> = ({ 
  announcement,
  showReceipts = false
}) => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-sm relative space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-md text-[10px] font-black uppercase tracking-wider animate-pulse">
            URGENT NOTICE
          </span>
          <h3 className="font-black text-sm text-slate-900">
            {announcement.title}
          </h3>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> {announcement.createdAt}
        </span>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed">
        {announcement.body}
      </p>

      <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-slate-600">
          Issued by: <strong>{announcement.author}</strong> ({announcement.authorRole})
        </span>

        <div className="flex items-center gap-2">
          {showReceipts && (
            <span className="text-[11px] font-semibold text-amber-900 bg-amber-200 px-2.5 py-1 rounded-md">
              Read by: {announcement.readCount} / {announcement.totalCohort} Students
            </span>
          )}

          <button
            onClick={() => setAcknowledged(true)}
            disabled={acknowledged}
            className={`px-3 py-1 font-bold rounded-lg transition-colors text-xs flex items-center gap-1 ${
              acknowledged
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-200/80 hover:bg-amber-300 text-amber-900'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {acknowledged ? 'Acknowledged' : 'Acknowledge Notification'}
          </button>
        </div>
      </div>
    </div>
  );
};
