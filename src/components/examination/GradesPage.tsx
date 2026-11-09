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
    <div className="bg-slate-50 text-black rounded-3xl p-4 sm:p-7 shadow-xs border border-slate-200 space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-rose-200 bg-rose-50 text-[#6f1825] hover:text-rose-950 hover:bg-rose-100 transition-colors shadow-2xs cursor-pointer select-none shrink-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div>
            <h1 className="font-black text-xl sm:text-2xl text-blue-700 leading-tight">
              Exam Series Results
            </h1>
            <p className="text-xs text-black mt-0.5">
              KMTC Directorate of Examinations • Official Examination Series & Unit Scores
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs text-black">
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200">
            <h2 className="font-extrabold text-black text-sm">Examination Series Directory</h2>
            <p className="text-[11px] text-black/75">
              Select any series row under Action to view the exam of the specific semester.
            </p>
          </div>

          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-black font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 text-black">Academic Year</th>
                  <th className="py-3 px-4 text-black">Academic Semester</th>
                  <th className="py-3 px-4 text-black">Exam Series Name (Year)</th>
                  <th className="py-3 px-4 text-black border-none">Stage of the Semester</th>
                  <th className="py-3 px-4 text-center text-black border-none">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {transcripts.map((item, index) => (
                  <tr key={`${item.academicYear}-${item.academicSemester}-${index}`} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-black font-bold whitespace-nowrap">{item.academicYear}</td>
                    <td className="py-3 px-4 text-black font-bold whitespace-nowrap">{item.academicSemester}</td>
                    <td className="py-3 px-4 text-black font-bold whitespace-nowrap">{item.examSeriesName}</td>
                    <td className="py-3 px-4 text-black border-none whitespace-nowrap">{getStageCode(item, index)}</td>
                    <td className="py-3 px-4 text-center border-none whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedSemester(item)}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl font-bold text-[11px] text-sky-900 bg-sky-100 hover:bg-sky-200 border border-sky-200 transition-colors shadow-2xs cursor-pointer"
                      >
                        View Exam
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedSemester && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border-2 border-sky-200 my-auto space-y-4 animate-fadeIn">
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
