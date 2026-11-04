import React from 'react';
import { Menu, Bell, ShieldCheck, User as UserIcon } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface HeaderProps {
  user: UserProfile;
  onToggleMenu: () => void;
  onRoleChange?: (role: UserRole) => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onToggleMenu,
  unreadCount,
}) => {
  return (
    <header className="bg-emerald-950 text-white sticky top-0 z-30 shadow-md border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Hamburger Menu Trigger Only */}
        <button
          onClick={onToggleMenu}
          className="p-2 -ml-2 rounded-xl hover:bg-emerald-900 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-2 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Right: Notification Icon and Owner's Profile with Icon */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell Icon */}
          <button 
            onClick={() => alert(`You have ${unreadCount} urgent notification(s).`)}
            className="p-2 rounded-xl hover:bg-emerald-900 text-emerald-200 hover:text-white relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-emerald-950 rounded-full"></span>
            )}
          </button>

          {/* Owner's Profile with User Icon */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-emerald-800">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-inner">
              <UserIcon className="w-5 h-5 text-emerald-950" />
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
