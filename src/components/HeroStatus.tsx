import React from 'react';
import { UserProfile } from '../types';

interface HeroStatusProps {
  user: UserProfile;
}

export const HeroStatus: React.FC<HeroStatusProps> = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:px-5 sm:py-3 text-slate-900 shadow-xs border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
      <div>
        <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
          {getGreeting()}, <span className="text-[#6f1825]">{user.name}</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Physiotherapy Department • {user.semester} • <span className="font-mono text-slate-700 font-semibold">{user.admissionNo}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wide border border-slate-200">
          {user.role}
        </span>
        <span className="px-3 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs">
          Active
        </span>
      </div>
    </div>
  );
};
