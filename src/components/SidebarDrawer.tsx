import React from 'react';
import { 
  X, 
  CreditCard, 
  GraduationCap, 
  Home, 
  BookOpen, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Smartphone,
  Receipt
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
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-slate-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-black text-lg flex items-center justify-center">
              K
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white">KMTC Student Services</h2>
              <p className="text-[11px] text-emerald-300">Department of Physiotherapy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Identity Sub-bar */}
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
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
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-500" />
              <span>Finance & Fee Sector</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('fees'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-bold">📄</span> Fee Statement
                </span>
                <span className="text-[11px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Bal: KES 0.00
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('howToPay'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-amber-600" /> How to Pay (M-Pesa / Bank)
                </span>
                <span className="text-[10px] text-slate-400">Paybill 964150</span>
              </button>

              <button
                onClick={() => { onOpenModal('fees'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-indigo-600" /> Invoices & Receipts
                </span>
                <span className="text-[10px] text-slate-400">Term 1 Paid</span>
              </button>
            </div>
          </div>

          {/* 2. EXAMS & ACADEMICS */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
              <span>Exams & Academic Records</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-purple-600 font-bold">📊</span> Current Grades & GPA
                </span>
                <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                  GPA 3.68
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Supplementary (Supp) Checker
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 0 Supps
                </span>
              </button>

              <button
                onClick={() => { onOpenModal('grades'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-blue-600 font-bold">📜</span> Semester-by-Semester Results
                </span>
                <span className="text-[10px] text-slate-400">Year 1 & 2</span>
              </button>
            </div>
          </div>

          {/* 3. HOSTEL BOOKING */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-500" />
              <span>Accommodation & Hostels</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('hostel'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-amber-700 font-bold">🛏️</span> Hostel Booking & Status
                </span>
                <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                  Block B • Rm 14
                </span>
              </button>
            </div>
          </div>

          {/* 4. REVISION PAPERS & STUDY RESOURCES */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Study Resources</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('revision'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-teal-700" /> Revision Papers Archive
                </span>
                <span className="text-[11px] text-slate-500">2020 - 2025</span>
              </button>
            </div>
          </div>

          {/* 5. CONTACT STAFF & DIRECTORY */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              <span>Staff Directory & Inquiries</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-slate-700 font-bold">👨‍💼</span> Reach Admin & HOD
                </span>
                <span className="text-[10px] text-slate-400">Office Hours</span>
              </button>

              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-slate-700 font-bold">👩‍🏫</span> Lecturer Directory
                </span>
                <span className="text-[10px] text-slate-400">11 Staff</span>
              </button>

              <button
                onClick={() => { onOpenModal('contacts'); onClose(); }}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-teal-700 font-bold">💬</span> Message Class Rep (Sarah)
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Online</span>
              </button>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>KMTC PhysioConnect v1.0</span>
          <span>React + Firebase</span>
        </div>
      </aside>
    </>
  );
};
