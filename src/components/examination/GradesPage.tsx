import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SemesterTranscript } from '../../types';

export const GradesPage: React.FC<{
  transcripts: SemesterTranscript[];
  onBack: () => void;
}> = ({ transcripts, onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState<SemesterTranscript | null>(null);

  const getStageCode = (item: SemesterTranscript, index: number) => {
    const yearMatch = item.semesterName.match(/Year\s*(\d+)/i);
    const semMatch = item.academicSemester.match(/(\d+)/) || item.semesterName.match(/Semester\s*(\d+)/i);
    if (yearMatch && semMatch) {
      return `${yearMatch[1]}.${semMatch[1]}`;
    }
    const year = Math.floor(index / 3) + 1;
    const sem = (index % 3) + 1;
    return `${year}.${sem}`;
  };

  return (
    <div className="w-full pt-2 sm:pt-4 bg-[#FAF6EE] text-slate-800">
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

          <div>
            <h1 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              Exam Results
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              KMTC Directorate of Examinations • Official Examination Series & Unit Scores
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[760px] border-collapse text-left text-xs bg-transparent">
          <thead>
            <tr className="bg-[#FAF2DE] text-slate-800 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-3 px-4 border border-slate-200">Academic Year</th>
              <th className="py-3 px-4 border border-slate-200">Academic Semester</th>
              <th className="py-3 px-4 border border-slate-200">Exam Series Name (Year)</th>
              <th className="py-3 px-4 border border-slate-200">Stage of the Semester</th>
              <th className="py-3 px-4 border border-slate-200 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {transcripts.map((item, index) => (
              <tr key={`${item.academicYear}-${item.academicSemester}-${index}`} className="align-middle bg-white/40">
                <td className="py-3 px-4 border border-slate-200 font-bold whitespace-nowrap text-slate-900">{item.academicYear}</td>
                <td className="py-3 px-4 border border-slate-200 font-bold whitespace-nowrap text-slate-900">{item.academicSemester}</td>
                <td className="py-3 px-4 border border-slate-200 font-bold whitespace-nowrap text-slate-900">{item.examSeriesName}</td>
                <td className="py-3 px-4 border border-slate-200 whitespace-nowrap text-slate-700">{getStageCode(item, index)}</td>
                <td className="py-3 px-4 border border-slate-200 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setSelectedSemester(item)}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl font-bold text-[11px] text-slate-900 bg-[#FAF2DE] hover:bg-[#F3E6C3] border border-[#E7D7C6] transition-colors shadow-2xs cursor-pointer"
                  >
                    View Exam
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSemester && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-2 border-slate-200 my-auto space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900">{selectedSemester.examSeriesName}</h3>
                <p className="text-[11px] text-slate-500">{selectedSemester.academicYear} • {selectedSemester.academicSemester}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSemester(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                aria-label="Close exam details"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-black font-extrabold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Unit Code</th>
                    <th className="py-2.5 px-3">Unit Name</th>
                    <th className="py-2.5 px-3 text-center">Score</th>
                    <th className="py-2.5 px-3 text-center">Grade</th>
                    <th className="py-2.5 px-3 text-center">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedSemester.units.map((unit) => (
                    <tr key={unit.unitCode} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{unit.unitCode}</td>
                      <td className="py-2.5 px-3 text-slate-800">{unit.unitName}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900">{unit.score}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900">{unit.grade}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-black text-[10px] uppercase ${unit.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {unit.passed ? 'Pass' : 'Fail'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
