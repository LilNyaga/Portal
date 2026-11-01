import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroStatusProps {
  user: UserProfile;
}

export const HeroStatus: React.FC<HeroStatusProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-emerald-800">
      
      {/* Decorative background glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          {/* Admission & Class Identity */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-400 text-emerald-950 font-black text-xs">
              ADMISSION NO: {user.admissionNo}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-800/80 text-emerald-200 text-xs font-semibold">
              Class: {user.cohort}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-xl">
            You are officially enrolled for <strong>{user.semester}</strong>. All mandatory campus clearances, unit registrations, and clinical safety briefings are active.
          </p>
        </div>

        {/* CURRENT SEMESTER STATUS BADGE & FEE CLEARANCE */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <div className="p-3 rounded-2xl bg-emerald-800/60 border border-emerald-600/60 backdrop-blur-sm flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                Semester Registration
              </div>
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                ACTIVE & REGISTERED
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>

          <div className="p-2.5 px-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between gap-3 text-xs">
            <span className="text-slate-300">Exam Eligibility:</span>
            <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cleared (0 Fee Bal)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
