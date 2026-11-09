import React, { useState } from 'react';
import { AlertCircle, Download, X, QrCode, Printer } from 'lucide-react';
import { INITIAL_REGISTRATION_RECORDS } from '../../services/firebase';
import { UserProfile, SemesterRegistrationRecord } from '../../types';
import { PageWrapper } from '../shared/PageWrapper';

const formatSemesterTitle = (title: string) => title.replace(/\s*\([^)]*\)/g, '').trim();

export const RegisteredUnitsPage: React.FC<{
  record: SemesterRegistrationRecord;
  onBack: () => void;
}> = ({ record, onBack }) => {
  const registeredUnits = record.units.filter(
    (unit) => unit.status === 'Registered' || unit.status === 'Completed'
  );

  const totalCredits = registeredUnits.reduce((acc, unit) => acc + unit.units, 0);

  return (
    <PageWrapper
      onBack={onBack}
      title={`${formatSemesterTitle(record.title)} • Registered Units`}
      subtitle={`${record.academicYear} • ${record.registrationDate || 'Registration record'}`}
      badge={undefined}
    >
      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Semester</span>
            <strong className="text-slate-900 font-bold text-sm">{record.title}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Status</span>
            <strong className="text-emerald-700 font-bold text-sm">{record.status}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 text-[11px] block">Total Credits</span>
            <strong className="text-slate-900 font-bold text-sm">{totalCredits} Cr</strong>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm">Registered Units Table</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">N.o</th>
                  <th className="py-3 px-4">Unit Code</th>
                  <th className="py-3 px-4">Unit Name</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registeredUnits.length > 0 ? (
                  registeredUnits.map((unit, idx) => (
                    <tr key={`${unit.code}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{idx + 1}</td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                          {unit.code}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{unit.name}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black border bg-emerald-100 text-emerald-900 border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {unit.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 px-4 text-center text-slate-500">
                      No registered units for this semester.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const RegistrationPage: React.FC<{
  user: UserProfile;
  records?: SemesterRegistrationRecord[];
  onBack: () => void;
}> = ({ user, records = INITIAL_REGISTRATION_RECORDS, onBack }) => {
  const [selectedRecord, setSelectedRecord] = useState<SemesterRegistrationRecord | null>(null);
  const [selectedExamPass, setSelectedExamPass] = useState<SemesterRegistrationRecord | null>(null);

  const handleDownloadExamPass = (record: SemesterRegistrationRecord) => {
    if (!record.examPassReady) {
      alert('Exam Pass is not ready yet. Clearances and approvals are currently pending.');
      return;
    }
    setSelectedExamPass(record);
  };

  if (selectedRecord) {
    return <RegisteredUnitsPage record={selectedRecord} onBack={() => setSelectedRecord(null)} />;
  }

  return (
    <PageWrapper
      onBack={onBack}
      title="Semester Registration & Course Enrollment Tracker"
      subtitle={`Student: ${user.name} (${user.admissionNo}) • Status & Exam Passes Since Year 1 Entry`}
      badge={undefined}
    >
      <div className="space-y-4 text-xs">
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Semester Registration Directory</h3>
              <p className="text-[11px] text-slate-500">
                Official table of semester enrollment statuses, enrolled course units, and examination passes.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Registration Status</th>
                  <th className="py-3 px-4">Enrolled Units</th>
                  <th className="py-3 px-4 text-center">Exam Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((sem, index) => {
                  const isSuccessful = sem.status === 'Successful';
                  const isRegistered = sem.status === 'Registered';
                  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';

                  return (
                    <tr key={sem.id} className={`transition-colors hover:bg-slate-100/60 ${rowBg}`}>
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 font-mono text-[11px] text-slate-900 shadow-2xs">
                          {sem.academicYear}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>
                          <span className="font-extrabold text-slate-900 block">{formatSemesterTitle(sem.title)}</span>
                          {sem.registrationDate && (
                            <span className="text-[10px] text-slate-500 font-normal">
                              Enrolled: {sem.registrationDate}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black border ${
                            isSuccessful
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : isRegistered
                              ? 'bg-teal-100 text-teal-900 border-teal-300'
                              : 'bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSuccessful || isRegistered ? 'bg-emerald-600' : 'bg-amber-600'
                            }`}
                          />
                          {isSuccessful ? 'Successful' : isRegistered ? 'Registered' : 'Pending'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700 text-xs">
                            {sem.units.length} Units ({sem.units.reduce((acc, u) => acc + u.units, 0)} Cr)
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(sem)}
                            className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 shadow-sm hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {sem.examPassReady ? (
                          <button
                            type="button"
                            onClick={() => handleDownloadExamPass(sem)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-[#6f1825] hover:bg-[#59131e] text-white shadow-2xs transition-colors cursor-pointer"
                            title="Exam pass is ready. Click to preview and download."
                          >
                            <Download className="w-3.5 h-3.5 text-amber-300" />
                            <span>Download Pass</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-400 border border-slate-200">
                            <AlertCircle className="w-3 h-3 text-amber-500" />
                            <span>Pending Clearance</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedExamPass && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedExamPass(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#6f1825] my-auto space-y-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                  Official Exam Card
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Series: {selectedExamPass.academicYear}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExamPass(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-[#6f1825]/30 space-y-4 text-xs font-sans">
              <div className="text-center border-b border-[#6f1825]/20 pb-3 space-y-0.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#6f1825]">
                  KENYA MEDICAL TRAINING COLLEGE
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  NYERI CAMPUS • FACULTY OF REHABILITATIVE SCIENCES
                </h3>
                <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                  OFFICIAL EXAMINATION ATTENDANCE CARD / PASS
                </div>
                <div className="text-[11px] font-mono text-[#6f1825] font-bold">
                  PASS NUMBER: {selectedExamPass.examPassNumber || 'KMTC/NYR/EX/2025/0842'}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Candidate Name</span>
                  <strong className="text-slate-900 font-bold">{user.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Admission Number</span>
                  <strong className="text-slate-900 font-mono font-bold">{user.admissionNo}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Academic Session</span>
                  <strong className="text-slate-900">{selectedExamPass.academicYear} • {selectedExamPass.academicSemester}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Department</span>
                  <strong className="text-slate-900">Physiotherapy</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Financial Clearance</span>
                  <strong className="text-emerald-700 font-bold">CLEARED (KES 0.00 BAL)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance Eligibility</span>
                  <strong className="text-emerald-700 font-bold">94% (ELIGIBLE)</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-extrabold text-[11px] uppercase tracking-wide text-slate-700 block">
                  Authorized Units for Examination Sitting
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-1.5 px-3">Unit Code</th>
                        <th className="py-1.5 px-3">Unit Title</th>
                        <th className="py-1.5 px-3 text-center">Invigilator Sign</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedExamPass.units.map((u, i) => (
                        <tr key={i}>
                          <td className="py-2 px-3 font-mono font-bold text-slate-900">{u.code}</td>
                          <td className="py-2 px-3 text-slate-800">{u.name}</td>
                          <td className="py-2 px-3 text-center font-mono text-slate-400 italic">
                            [&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-[10px] text-slate-600">
                  <p>• <strong>Strict Notice:</strong> Must be presented alongside valid KMTC Student ID card at exam entry.</p>
                  <p>• Mobile phones, smartwatches, and notes are strictly prohibited in the exam hall.</p>
                  <p>• Exam Venue: <strong>{selectedExamPass.examVenue || 'Main Examination Hall A'}</strong></p>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                  <QrCode className="w-7 h-7 text-slate-800" />
                  <div className="text-[9px] font-mono leading-tight text-slate-600">
                    <span className="font-bold block text-slate-900">VERIFIED PASS</span>
                    KMTC-SEC-2025
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setSelectedExamPass(null)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print Card
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Exam Pass (${selectedExamPass.examPassNumber}) downloaded as PDF.`);
                  setSelectedExamPass(null);
                }}
                className="w-full sm:w-auto px-5 py-2 bg-[#6f1825] hover:bg-[#59131e] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4 text-amber-300" /> Download Official PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};
