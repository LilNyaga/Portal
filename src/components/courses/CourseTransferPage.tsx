import React from 'react';
import { ArrowLeft, Layers } from 'lucide-react';

export const CourseTransferPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <div className="w-full pt-2 sm:pt-4 bg-[#FAF6EE] text-slate-800">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 hover:text-slate-900 transition-colors cursor-pointer select-none shrink-0 bg-transparent border-0 p-0"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
            Course Transfer
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-[#FAF2DE] text-slate-800 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-3 px-4 border border-slate-200">Course Department</th>
              <th className="py-3 px-4 border border-slate-200">Course Name</th>
              <th className="py-3 px-4 border border-slate-200">Class Code</th>
              <th className="py-3 px-4 border border-slate-200">Class Of</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="py-16 px-4 text-center text-slate-500 bg-white/40">
                <div className="max-w-xs mx-auto space-y-2">
                  <Layers className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700 text-sm">No Transfer Records Found</p>
                  <p className="text-xs text-slate-400">
                    There are currently no incourse transfer applications submitted.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
