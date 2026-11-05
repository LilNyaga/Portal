import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  GraduationCap, 
  Home, 
  BookOpen, 
  ChevronDown,
  Layers,
  LifeBuoy,
  ClipboardCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
  onOpenModal: (modalName: 'grades' | 'fees' | 'howToPay' | 'hostel' | 'revision' | 'contacts' | 'profile' | 'registration' | 'calendar' | 'supp' | 'timetable' | any) => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onOpenModal,
}) => {
  // Track open/collapsed state of headers for accordion sub-branches
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    finance: false,
    courses: false,
    registration: false,
    academics: false,
    hostel: false,
    resources: false,
    manual: false,
    support: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Background Overlay: heavy blur & dark tint so only sidebar options are focused */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/65 backdrop-blur-md transition-all duration-300"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          title="Click to close sidebar"
        />
      )}

      {/* Slide-Out Drawer Panel: Seamless uniform cream background without container borders */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-[#FAF2DE] z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-[#DFC494]/40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header: Same cream background, borderless */}
        <div className="bg-[#FAF2DE] text-slate-900 p-5 flex items-center justify-between">
          <div>
            <h2 className="font-black text-lg text-slate-950 tracking-tight">KMTC Student Services</h2>
            <p className="text-xs text-amber-950 font-extrabold uppercase tracking-wider">Department of Physiotherapy</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-[#F0E3BF] transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Navigation List - Uniform cream, borderless headers with clean sub-branches */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm bg-[#FAF2DE]">
          
          {/* 1. FINANCE SECTOR */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('finance')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Finance & Fee Sector
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.finance ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.finance && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('howToPay'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Pay Fees
                </button>

                <button
                  onClick={() => { onOpenModal('fees'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Fee Statement
                </button>

                <button
                  onClick={() => {
                    alert('Downloading Official KMTC Physiotherapy Fee Structure 2025/2026 (PDF)...');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Fee Structure
                </button>
              </div>
            )}
          </div>

          {/* 2. COURSES */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('courses')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Courses
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.courses ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.courses && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('registration'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  My Course
                </button>

                <button
                  onClick={() => {
                    alert('Course Transfer Window: Applications for inter-department or campus transfers open at the start of Term 2 through the Academic Registrar.');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Course Transfer
                </button>

                <button
                  onClick={() => { onOpenModal('calendar'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Academic Calendar
                </button>
              </div>
            )}
          </div>

          {/* 3. REGISTRATION & PROGRESS */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('registration')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Registration & Progress
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.registration ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.registration && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => {
                    alert('Semester Status: Year 2 Term 1 (Session 2025/2026)\nDepartment: Physiotherapy\nRegistration Status: Active & Enrolled');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Semester Status
                </button>

                <button
                  onClick={() => { onOpenModal('registration'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Semester Registration
                </button>

                <button
                  onClick={() => {
                    alert('Academic Leave / Deferment Window:\nApplications for compassionate or medical deferment must be submitted at least 2 weeks prior to end-of-term examinations through the Academic Registrar.');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Leave / Deferment
                </button>

                <button
                  onClick={() => {
                    alert('Readmission Desk:\nStudents resuming studies after an approved deferment or academic leave can submit their clearance and resumption form here.');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Readmission
                </button>
              </div>
            )}
          </div>

          {/* 4. EXAMS & ACADEMIC RECORDS */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('academics')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Exams & Academic Records
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.academics ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.academics && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('grades'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Exam Results
                </button>

                <button
                  onClick={() => {
                    alert('KMTC Examination Card:\n\nCandidate: Lemayian (PT/2024/048)\nProgramme: Diploma in Physiotherapy (Year 2)\nExam Period: Term 1 Final Examinations\nFinancial Clearance: Cleared (KES 0.00 Bal)\nAttendance Clearance: 94% (Eligible)\nStatus: VALID EXAM CARD ISSUED');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Exam Card
                </button>

                <button
                  onClick={() => { onOpenModal('supp'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Supp / Special Exams
                </button>
              </div>
            )}
          </div>

          {/* 5. ACCOMMODATION & HOSTELS */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('hostel')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Accommodation & Hostels
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.hostel ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.hostel && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('hostel'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Hostel Booking & Status
                </button>
              </div>
            )}
          </div>

          {/* 6. STUDY RESOURCES */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('resources')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Study Resources
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.resources ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.resources && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('revision'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Revision Papers Archive
                </button>
              </div>
            )}
          </div>

          {/* 7. USER MANUAL */}
          <div className="space-y-1 pt-2">
            <button
              type="button"
              onClick={() => toggleSection('manual')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  User Manual
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.manual ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.manual && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => {
                    alert('PhysioConnect Portal Manual:\n\n1. Use Dashboard Tiles for fast access to your Fees, GPA, and Hostel status.\n2. Click any sidebar category to expand and collapse its sub-branches.\n3. Switch roles via the top user selector to test Student, Lecturer, Class Rep, or HOD views.');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Portal Navigation Guide
                </button>

                <button
                  onClick={() => {
                    alert('KMTC Physiotherapy Student Portal User Manual (PDF) downloaded successfully.');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Download System Manual
                </button>
              </div>
            )}
          </div>

          {/* 8. HELP & SUPPORT DESK */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => toggleSection('support')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <LifeBuoy className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                  Help & Support Desk
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
                  openSections.support ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
                }`}
              />
            </button>

            {/* Sub-branches */}
            {openSections.support && (
              <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                <button
                  onClick={() => { onOpenModal('contacts'); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  ICT & Admin Helpdesk
                </button>

                <button
                  onClick={() => {
                    alert('KMTC Help Desk Hotline: +254 700 000 000 (Mon-Fri 8:00 AM - 5:00 PM) | Email: ictsupport.nyeri@kmtc.ac.ke');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                >
                  Direct Emergency Helpline
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer: Same cream background, borderless */}
        <div className="p-4 bg-[#FAF2DE] text-xs font-bold text-slate-800 flex items-center justify-between">
          <span>KMTC PhysioConnect v1.0</span>
          <span className="font-semibold text-slate-600">Portal Services</span>
        </div>
      </aside>
    </>
  );
};
