import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HostelAllocation } from '../../types';

export const HostelPage: React.FC<{
  hostel?: HostelAllocation;
  onBack: () => void;
}> = ({ onBack }) => {
  const tableHeaders = ['Academic Year', 'Semester', 'Hotel', 'Room', 'Bed', 'Status'];

  return (
    <div className="w-full pt-2 sm:pt-4">
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 hover:text-slate-900 transition-colors cursor-pointer select-none shrink-0 bg-transparent border-0 p-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
            Accommodation
          </h2>
        </div>

        <button
          type="button"
          className="px-4 py-2.5 rounded-xl bg-[#6f1825] text-white font-bold text-xs shadow-xs hover:bg-[#581620] transition-colors whitespace-nowrap"
        >
          Reserve Bed
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs bg-transparent">
          <thead>
            <tr className="bg-[#FAF2DE] text-slate-800 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
              {tableHeaders.map((header) => (
                <th key={header} className="py-3 px-4 border border-slate-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="h-16 align-middle">
              <td colSpan={tableHeaders.length} className="border border-slate-200 bg-white px-4 py-3 text-center font-medium text-slate-500">
                No Data Available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
