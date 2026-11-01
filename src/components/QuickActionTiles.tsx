import React from 'react';
import { BarChart3, CreditCard, Home, BookOpen } from 'lucide-react';

interface QuickActionTilesProps {
  onOpenModal: (modalName: 'grades' | 'fees' | 'hostel' | 'revision') => void;
  gpa: number;
  balance: number;
  hostelRoom: string;
}

export const QuickActionTiles: React.FC<QuickActionTilesProps> = ({
  onOpenModal,
  gpa,
  balance,
  hostelRoom,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span>⚡</span> Direct Access Portals
        </h2>
        <span className="text-xs text-slate-400">Click any card to open services</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tile 1: Exams & Grades Direct Access */}
        <div
          onClick={() => onOpenModal('grades')}
          className="bg-white border border-slate-200 hover:border-emerald-600 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                0 Supps
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
              Exams & Semester Results
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Check GPA, semester-by-semester transcripts, and retake/supp status.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>Cumulative GPA: {gpa.toFixed(2)}</span>
            <span>View →</span>
          </div>
        </div>

        {/* Tile 2: Finance & Fee Statement Direct Access */}
        <div
          onClick={() => onOpenModal('fees')}
          className="bg-white border border-slate-200 hover:border-emerald-600 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Cleared
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
              Finance & Fee Portal
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Download official fee statement, invoice history, and pay via M-Pesa.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Balance: KES {balance.toFixed(2)}</span>
            <span>Pay / View →</span>
          </div>
        </div>

        {/* Tile 3: Hostel Booking Direct Access */}
        <div
          onClick={() => onOpenModal('hostel')}
          className="bg-white border border-slate-200 hover:border-emerald-600 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                Allocated
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
              Hostel Accommodation
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Book semester bed space, inspect room allocation, and check clearance.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>{hostelRoom}</span>
            <span>Manage →</span>
          </div>
        </div>

        {/* Tile 4: Revision Papers Direct Access */}
        <div
          onClick={() => onOpenModal('revision')}
          className="bg-white border border-slate-200 hover:border-emerald-600 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                18 Files
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
              Past Papers & Directory
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Official past exam papers archive and direct contact lines for lecturers/HOD.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>2020 - 2025 Archive</span>
            <span>Open →</span>
          </div>
        </div>

      </div>
    </div>
  );
};
