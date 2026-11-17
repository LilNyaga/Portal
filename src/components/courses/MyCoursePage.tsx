import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { UserProfile } from '../../types';

export const MyCoursePage: React.FC<{
  user?: UserProfile;
  onBack: () => void;
}> = ({ user, onBack }) => {
  return (
    <div className="w-full space-y-4 animate-fadeIn">
      {/* HEADER AT THE VERY START OF THE PAGE (NO OUTER BOX CONTAINER) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-200 gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-[#6f1825] hover:bg-slate-200/60 transition-colors cursor-pointer select-none shrink-0"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              My Course Details
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              KMTC Directorate of Academic Affairs • Student Program Enrollment & Progression Profile
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 text-xs text-slate-800">
        {/* FIRST TABLE: PROGRAM SPECIFICATION & ENTRY REQUIREMENTS */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Program Specification & Entry Profile
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Official course details, hosting department, program duration, and minimum entry qualifications.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Course Currently Doing</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Entry Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors align-top">
                  <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap align-top">
                    <div className="space-y-1.5">
                      <span className="text-sm font-black block text-[#6f1825] leading-tight">
                        {user?.cohort?.replace(/\s*\(.*\)/, '') || 'Diploma in Physiotherapy'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono block">
                        {user?.cohort || 'Cohort 2024 (Class of 2027)'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 align-top">
                    {user?.department || 'Department of Physiotherapy'}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-700 whitespace-nowrap align-top">
                    3 Academic Years (6 Semesters)
                  </td>
                  <td className="py-4 px-4 text-slate-700 leading-relaxed min-w-[280px] align-top">
                    <div className="space-y-1.5">
                      <div><strong className="text-slate-900">Mean Grade:</strong> KCSE C (Plain)</div>
                      <div><strong className="text-slate-900">Mandatory:</strong> Biology C (Plain), English or Kiswahili C (Plain)</div>
                      <div><strong className="text-slate-900">Cluster:</strong> Chemistry, Physics or Mathematics C- (Minus)</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECOND TABLE: REGISTRATION STATUS, CURRENT SEMESTER & STAGE */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">
              Registration Status & Semester Progression
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Official semester enrollment status, active study stage, and current session record.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Registration Status</th>
                  <th className="py-3 px-4">Current Semester</th>
                  <th className="py-3 px-4">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors align-middle">
                  <td className="py-4 px-4 whitespace-nowrap align-middle text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {user?.isRegistered ? 'Registered & Cleared' : 'Pending Registration'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-black text-slate-900 text-sm whitespace-nowrap align-middle">
                    {user?.semester || 'Year 2, Semester 1'}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap align-middle">
                    Stage 2.1 (Year 2 • First Session)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
