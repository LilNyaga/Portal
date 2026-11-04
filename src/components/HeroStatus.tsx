import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroStatusProps {
  user: UserProfile;
}

export const HeroStatus: React.FC<HeroStatusProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-blue-800">
      
      {/* Decorative background glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          {/* Admission & Class Identity */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-400 text-blue-950 font-black text-xs">
              ADMISSION NO: {user.admissionNo}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-800/80 text-blue-200 text-xs font-semibold">
              Class: {user.cohort}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90 mt-1 max-w-xl">
            You are officially enrolled for <strong>{user.semester}</strong>. All mandatory campus clearances, unit registrations, and clinical safety briefings are complete.
          </p>
        </div>

        {/* FEE CLEARANCE & EXAM ELIGIBILITY */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <div className="p-3 px-4 rounded-2xl bg-blue-950/80 border border-blue-700/70 flex items-center justify-between gap-4 text-xs shadow-inner">
            <span className="text-blue-200 font-medium">Exam Eligibility:</span>
            <span className="font-bold text-emerald-400 bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cleared (0 Fee Bal)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
