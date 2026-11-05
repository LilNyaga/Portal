import React from 'react';
import { UserProfile } from '../types';

interface HeroStatusProps {
  user: UserProfile;
}

export const HeroStatus: React.FC<HeroStatusProps> = ({ user: _user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-white rounded-none py-3 px-4 sm:py-3.5 sm:px-6 text-slate-900 shadow-xs border border-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            {getGreeting()}
          </h1>
        </div>

        {/* Right end: Active in green background */}
        <div className="shrink-0">
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
