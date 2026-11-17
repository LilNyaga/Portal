import React from 'react';
import { Clock, Megaphone } from 'lucide-react';
import { Announcement } from '../types';

interface UrgentNoticeProps {
  announcement: Announcement;
  showReceipts?: boolean;
}

export const UrgentNotice: React.FC<UrgentNoticeProps> = ({ 
  announcement,
  showReceipts = false
}) => {
  return (
    <div className="mt-[4.5rem] mb-4 sm:mb-5 my-3 sm:my-4 bg-[#7a1d2a] border border-[#9b3747] rounded-xl py-4 sm:py-5 px-3 sm:px-4 shadow-sm relative space-y-2 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-rose-50 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-amber-300" />
            Important Announcement
          </span>
          <h3 className="font-black text-sm sm:text-base text-white">
            {announcement.title}
          </h3>
        </div>
        <span className="text-[10px] font-mono font-medium text-rose-100/90 flex items-center gap-1 shrink-0">
          <Clock className="w-3.5 h-3.5 text-rose-200" /> {announcement.createdAt}
        </span>
      </div>

      <p className="text-xs text-rose-50/95 leading-relaxed">
        {announcement.body}
      </p>

      {showReceipts && (
        <div className="pt-2 border-t border-white/15 flex justify-end">
          <span className="text-[10px] font-semibold text-rose-50 bg-white/10 border border-white/10 px-2 py-1 rounded-md">
            Read by: {announcement.readCount} / {announcement.totalCohort} Students
          </span>
        </div>
      )}
    </div>
  );
};
