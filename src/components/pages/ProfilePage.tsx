import React from 'react';
import { ArrowLeft, User, GraduationCap, ShieldCheck, Phone } from 'lucide-react';
import { UserProfile } from '../../types';

export const ProfilePage: React.FC<{
  user: UserProfile;
  onBack: () => void;
}> = ({ user, onBack }) => {
  return (
    <div className="w-full min-h-screen bg-[#FAF6EE] text-slate-800">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#eadbc6] mb-5 px-2 sm:px-4 pt-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#6f1825] hover:bg-[#F8E9DC] transition-colors cursor-pointer select-none shrink-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div>
            <h2 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">Official Student Profile & Biodata Record</h2>
            <p className="text-xs text-slate-600">KMTC Registrar Directorate • Student Registry Services</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-4 pb-6">
        <div className="rounded-3xl border border-[#eadbc6] bg-[#fffaf4] shadow-sm overflow-hidden">
          <div className="space-y-5 text-xs p-3 sm:p-5">
            <div className="space-y-2.5">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#6f1825]" /> Personal Biodata
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">National ID / Passport</span>
                  <strong className="text-slate-900 font-mono text-xs sm:text-sm">{user.nationalId || '38940192'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Gender</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">{user.gender || 'Male'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Date of Birth</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">14 August 2003</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">County of Origin</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">{user.county || 'Narok County'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Mobile Contact</span>
                  <strong className="text-slate-900 text-xs sm:text-sm font-mono">{user.phone || '+254 712 345 678'}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Blood Group</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">O Positive (O+)</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#6f1825]" /> Academic & Departmental Enrollment
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Degree / Programme</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">Diploma in Physiotherapy</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Department & Campus</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">Physiotherapy • KMTC Nyeri Campus</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Year of Entry & Cohort</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">September 2024 (Cohort 2024)</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#eadbc6]">
                  <span className="text-slate-500 text-[11px] block">Expected Graduation</span>
                  <strong className="text-slate-900 text-xs sm:text-sm">July 2027</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6f1825]" /> Emergency Next of Kin & Guardian
              </h5>
              <div className="p-3.5 rounded-xl bg-white border border-[#eadbc6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div>
                  <strong className="text-slate-900 text-sm">{user.guardianName || 'Samuel Lemayian'}</strong>
                  <p className="text-slate-500 text-xs">Relationship: Parent / Primary Guardian</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-mono font-bold text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-emerald-700" /> {user.guardianPhone || '+254 722 998 877'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
