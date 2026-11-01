import React from 'react';
import { Menu, Bell, ShieldCheck } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface HeaderProps {
  user: UserProfile;
  onToggleMenu: () => void;
  onRoleChange: (role: UserRole) => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onToggleMenu,
  onRoleChange,
  unreadCount,
}) => {
  return (
    <header className="bg-emerald-950 text-white sticky top-0 z-30 shadow-md border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Hamburger Menu Trigger & Branding */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleMenu}
            className="p-2 -ml-2 rounded-xl hover:bg-emerald-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-2 group transition-colors"
            title="Open Services Menu"
          >
            <Menu className="w-6 h-6" />
            <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline text-emerald-300 group-hover:text-white">
              Menu
            </span>
          </button>

          <div className="h-6 w-px bg-emerald-800 hidden sm:block"></div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-emerald-950 font-black text-base flex items-center justify-center shadow-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight">KMTC Portal</span>
                <span className="text-[10px] bg-emerald-900 text-emerald-200 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                  Nyeri Campus
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 font-medium leading-none">Physiotherapy Department</p>
            </div>
          </div>
        </div>

        {/* Center / Right: Role Simulation Switcher & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Role Switcher Pill */}
          <div className="hidden lg:flex items-center bg-emerald-900/80 p-1 rounded-xl border border-emerald-800 text-xs">
            <span className="text-emerald-300 px-2 text-[11px] font-medium">Role:</span>
            {(['student', 'lecturer', 'rep', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                  user.role === r
                    ? 'bg-emerald-500 text-emerald-950 font-bold shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                {r === 'rep' ? 'Class Rep' : r}
              </button>
            ))}
          </div>

          {/* Semester Active Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-700/80 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-200 font-semibold text-[11px]">ACTIVE: Y2 S1</span>
          </div>

          {/* Notification Bell */}
          <button 
            onClick={() => alert(`You have ${unreadCount} urgent notification(s).`)}
            className="p-2 rounded-xl hover:bg-emerald-900 text-emerald-200 hover:text-white relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-emerald-950 rounded-full"></span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-emerald-800">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shadow-inner">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                {user.name}
                {user.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />}
              </div>
              <div className="text-[10px] text-emerald-300 font-mono">{user.admissionNo}</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
