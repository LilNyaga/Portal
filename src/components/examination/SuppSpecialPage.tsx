import React from 'react';
import { PageWrapper } from '../shared/PageWrapper';
import { SuppSpecialExam, UserProfile } from '../../types';

interface SuppSpecialPageProps {
  exams: SuppSpecialExam[];
  user?: UserProfile;
  onBack: () => void;
  onAddExam?: (newExam: SuppSpecialExam) => void;
}

export const SuppSpecialPage: React.FC<SuppSpecialPageProps> = ({ onBack }) => {
  const columns = ['Series', 'Exam on Offer', 'Action'];

  return (
    <PageWrapper
      onBack={onBack}
      title="Special & Supplementary"
      badge={undefined}
    >
      <div className="space-y-0 text-xs text-black">
        <div className="mt-1 mr-1 flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Exam records</div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Register
          </button>
        </div>

        <div className="rounded-2xl border border-[#E7D7C6] overflow-hidden bg-[#FFFDF9] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7E8D8] text-[#4B2A2C] font-extrabold uppercase tracking-wider text-[11px]">
                  {columns.map((column) => (
                    <th key={column} className="py-3.5 px-4 whitespace-nowrap border-b border-[#E7D7C6]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="py-12 px-4 text-center text-slate-500 bg-white">
                    No examination records available.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
