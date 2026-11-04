import React, { useState } from 'react';
import { Check, Clock, Megaphone } from 'lucide-react';
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
    <div className="bg-[#4d0c16] border-2 border-[#731322] rounded-2xl p-4 sm:p-5 shadow-md relative space-y-2.5 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-rose-100 rounded-md text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300" />
            Important Announcement
          </span>
          <h3 className="font-black text-sm sm:text-base text-white">
            {announcement.title}
          </h3>
        </div>
        <span className="text-xs font-mono font-medium text-rose-200/90 flex items-center gap-1 shrink-0">
          <Clock className="w-3.5 h-3.5 text-rose-300" /> {announcement.createdAt}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-rose-100/95 leading-relaxed">
        {announcement.body}
      </p>

      <div className="pt-2 border-t border-rose-900/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-rose-200">
          Issued by: <strong className="text-white">{announcement.author}</strong> ({announcement.authorRole})
        </span>

        <div className="flex items-center gap-2">
          {showReceipts && (
            <span className="text-[11px] font-semibold text-rose-100 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md">
              Read by: {announcement.readCount} / {announcement.totalCohort} Students
            </span>
          )}

          <button
            onClick={() => setAcknowledged(true)}
            disabled={acknowledged}
            className={`px-3 py-1 font-bold rounded-lg transition-colors text-xs flex items-center gap-1.5 ${
              acknowledged
                ? 'bg-emerald-600 text-white'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
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
