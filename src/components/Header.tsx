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
    <header className="bg-[#6f1825] text-white sticky top-0 z-30 shadow-sm border-b border-amber-400/30 relative overflow-hidden">
      
      {/* Tiny visible yellow stripes pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #facc15 0, #facc15 1.5px, transparent 1.5px, transparent 10px)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 sm:h-13 flex items-center justify-between relative z-10">
        
        {/* Left: Hamburger Menu Trigger Only */}
        <button
          onClick={onToggleMenu}
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 flex items-center gap-2 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right: Notification Icon and Owner's Profile with Icon */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Notification Bell Icon */}
          <button 
            onClick={() => alert(`You have ${unreadCount} urgent notification(s).`)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-amber-200 hover:text-white relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 border border-[#6f1825] rounded-full"></span>
            )}
          </button>

          {/* Owner's Profile with User Icon */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-[#6f1825] flex items-center justify-center shadow-inner">
              <UserIcon className="w-4 h-4 text-[#6f1825]" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                {user.name}
                {user.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />}
              </div>
              <div className="text-[10px] text-amber-200/90 font-mono">{user.admissionNo}</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
