import React from 'react';
import { 
  X, 
  CreditCard, 
  GraduationCap, 
  Home, 
  BookOpen, 
  PhoneCall, 
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenModal: (modalName: 'grades' | 'fees' | 'howToPay' | 'hostel' | 'revision' | 'contacts') => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onOpenModal,
}) => {
  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="drawer-overlay fixed inset-0 z-40 transition-opacity"
        />
      )}

      {/* Slide-Out Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-sky-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header: White Light-Blue background without icon in the name */}
        <div className="bg-gradient-to-r from-white via-sky-50 to-blue-50 text-slate-800 p-5 flex items-center justify-between border-b border-sky-200">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 tracking-tight">KMTC Student Services</h2>
            <p className="text-xs text-sky-700 font-medium">Department of Physiotherapy</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-100 transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Identity Sub-bar */}
        <div className="bg-sky-50/50 px-5 py-3 border-b border-sky-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 font-medium">Logged in:</span>
            <strong className="text-slate-800 ml-1">{user.name} ({user.role})</strong>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            {user.isRegistered ? 'ACTIVE' : 'INACTIVE'}
          </span>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
          
          {/* 1. FINANCE SECTOR */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-900/60 px-2 mb-1.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-sky-700" />
              <span>Finance & Fee Sector</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('fees'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Fee Statement</span>
                <span className="text-[11px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Bal: KES 0.00
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('howToPay'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>How to Pay (M-Pesa / Bank)</span>
                <span className="text-[10px] text-slate-400 font-mono">Paybill 964150</span>
              </button>

              <button
                onClick={() => { onOpenModal('fees'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Invoices & Receipts</span>
                <span className="text-[10px] text-slate-400">Term 1 Paid</span>
              </button>
            </div>
          </div>

          {/* 2. EXAMS & ACADEMICS */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-900/60 px-2 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
              <span>Exams & Academic Records</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Current Grades & GPA</span>
                <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                  GPA 3.68
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Supplementary (Supp) Checker</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 0 Supps
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Semester-by-Semester Results</span>
                <span className="text-[10px] text-slate-400">Year 1 & 2</span>
              </button>
            </div>
          </div>

          {/* 3. HOSTEL BOOKING */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-900/60 px-2 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-sky-700" />
              <span>Accommodation & Hostels</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('hostel'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Hostel Booking & Status</span>
                <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  Block B • Rm 14
                </span>
              </button>
            </div>
          </div>

          {/* 4. REVISION PAPERS & STUDY RESOURCES */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-900/60 px-2 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-700" />
              <span>Study Resources</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('revision'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Revision Papers Archive</span>
                <span className="text-[11px] text-slate-500">2020 - 2025</span>
              </button>
            </div>
          </div>

          {/* 5. CONTACT STAFF & DIRECTORY */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-900/60 px-2 mb-1.5 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-sky-700" />
              <span>Staff Directory & Inquiries</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Reach Admin & HOD</span>
                <span className="text-[10px] text-slate-400">Office Hours</span>
              </button>

              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Lecturer Directory</span>
                <span className="text-[10px] text-slate-400">11 Staff</span>
              </button>

              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-950 text-slate-700 font-medium transition-colors"
              >
                <span>Message Class Rep (Sarah)</span>
                <span className="text-[10px] text-emerald-600 font-bold">Online</span>
              </button>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-sky-100 bg-sky-50/50 text-xs text-slate-500 flex items-center justify-between">
          <span>KMTC PhysioConnect v1.0</span>
          <span>Portal Services</span>
        </div>
      </aside>
    </>
  );
};
