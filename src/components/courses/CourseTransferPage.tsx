import React from 'react';
import { PageWrapper } from '../shared/PageWrapper';
import { Layers } from 'lucide-react';

export const CourseTransferPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Incourse Transfer"
      subtitle="KMTC Directorate of Admissions & Student Registry • Inter-Program Transfer Records"
    >
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Course Department</th>
                <th className="py-3 px-4">Course Name</th>
                <th className="py-3 px-4">Class Code</th>
                <th className="py-3 px-4">Class Of</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td colSpan={4} className="py-16 px-4 text-center text-slate-500">
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
    </PageWrapper>
  );
};
