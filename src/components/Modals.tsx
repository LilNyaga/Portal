import React, { useState } from 'react';
import { 
  ArrowLeft,
  Download, 
  User, 
  Calendar as CalendarIcon, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail,
  GraduationCap,
  Printer,
  QrCode,
  X,
} from 'lucide-react';
import { 
  SemesterTranscript, 
  HostelAllocation, 
  ResourceNote, 
  UserProfile, 
  TimetableSlot,
  SemesterRegistrationRecord
} from '../types';
import { INITIAL_REGISTRATION_RECORDS } from '../services/firebase';

interface PageWrapperProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  onBack,
  title,
  subtitle,
  children,
  badge,
}) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-xs border border-slate-200/90 space-y-5 animate-fadeIn">
      {/* Page Navigation & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
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
            <h2 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {badge && <div className="self-start sm:self-auto">{badge}</div>}
      </div>

      {/* Page Contents */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

/* =========================================================================
   1. PROFILE DIRECT PAGE
   ========================================================================= */
export const ProfilePage: React.FC<{
  user: UserProfile;
  onBack: () => void;
}> = ({ user, onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Official Student Profile & Biodata Record"
      subtitle="KMTC Registrar Directorate • Student Registry Services"
    >
      <div className="space-y-5 text-xs">
        {/* Profile Identity Hero */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#6f1825] text-white flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-20 h-20 rounded-2xl bg-amber-400 text-[#6f1825] font-black text-3xl flex items-center justify-center shadow-md">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xl font-black text-white">{user.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-extrabold text-[10px] uppercase tracking-wide">
                  Active
                </span>
              </div>
              <p className="text-amber-200 font-mono font-bold text-sm mt-0.5">{user.admissionNo}</p>
              <p className="text-slate-300 text-xs flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5 text-amber-300" /> {user.email}
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/15 text-center sm:text-right shrink-0">
            <span className="text-[10px] text-amber-200 uppercase font-bold block">Academic Standing</span>
            <span className="text-sm font-black text-white">NORMAL PROGRESS (PASS)</span>
          </div>
        </div>

        {/* 1. Personal Biodata Section */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#6f1825]" /> Personal Biodata
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">National ID / Passport</span>
              <strong className="text-slate-900 font-mono text-xs sm:text-sm">{user.nationalId || '38940192'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Gender</span>
              <strong className="text-slate-900 text-xs sm:text-sm">{user.gender || 'Male'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Date of Birth</span>
              <strong className="text-slate-900 text-xs sm:text-sm">14 August 2003</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">County of Origin</span>
              <strong className="text-slate-900 text-xs sm:text-sm">{user.county || 'Narok County'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Mobile Contact</span>
              <strong className="text-slate-900 text-xs sm:text-sm font-mono">{user.phone || '+254 712 345 678'}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Blood Group</span>
              <strong className="text-slate-900 text-xs sm:text-sm">O Positive (O+)</strong>
            </div>
          </div>
        </div>

        {/* 2. Academic Enrollment Section */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#6f1825]" /> Academic & Departmental Enrollment
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Degree / Programme</span>
              <strong className="text-slate-900 text-xs sm:text-sm">Diploma in Physiotherapy</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Department & Campus</span>
              <strong className="text-slate-900 text-xs sm:text-sm">Physiotherapy • KMTC Nyeri Campus</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Year of Entry & Cohort</span>
              <strong className="text-slate-900 text-xs sm:text-sm">September 2024 (Cohort 2024)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[11px] block">Expected Graduation</span>
              <strong className="text-slate-900 text-xs sm:text-sm">July 2027</strong>
            </div>
          </div>
        </div>

        {/* 3. Next of Kin & Guardian Section */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6f1825]" /> Emergency Next of Kin & Guardian
          </h5>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div>
              <strong className="text-slate-900 text-sm">{user.guardianName || 'Samuel Lemayian'}</strong>
              <p className="text-slate-500 text-xs">Relationship: Parent / Primary Guardian</p>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 font-mono font-bold text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-emerald-700" /> {user.guardianPhone || '+254 722 998 877'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Record verified by KMTC Academic Registrar Office</span>
          <button
            onClick={() => alert('Official KMTC Student Biodata Card (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Student Biodata Card (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   2. TIMETABLE PAGE
   ========================================================================= */
export const TimetablePage: React.FC<{
  slots: TimetableSlot[];
  onBack: () => void;
}> = ({ slots, onBack }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Thursday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSlots = slots.filter((s) => s.day === selectedDay);

  return (
    <PageWrapper
      onBack={onBack}
      title="Complete Weekly Timetable & Lecture Schedule"
      subtitle="Department of Physiotherapy • Year 2 Semester 1"
    >
      <div className="space-y-4 text-xs">
        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-[#6f1825] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Selected Day Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-black text-sm sm:text-base text-slate-900">{selectedDay} Schedule</h4>
            <p className="text-xs text-slate-500">Official lectures, practical laboratory demos & hospital rotations</p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
            {filteredSlots.length} Scheduled Sessions
          </span>
        </div>

        {/* Slot Cards List */}
        <div className="space-y-3">
          {filteredSlots.length === 0 ? (
            <div className="p-8 text-center text-slate-400 border rounded-2xl bg-slate-50">
              No classes scheduled for {selectedDay}. Independent study or clinic library reading.
            </div>
          ) : (
            filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all ${
                  slot.isNow
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`px-3 py-2 rounded-xl text-center font-mono font-bold text-xs shrink-0 ${
                      slot.isNow ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {slot.startTime} - {slot.endTime}
                      {slot.isNow && <span className="block text-[9px] uppercase font-black">CURRENT</span>}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {slot.unitCode}
                        </span>
                        <h5 className="font-extrabold text-sm text-slate-900">{slot.unitName}</h5>
                      </div>
                      {slot.topic && (
                        <p className="text-xs text-slate-600 mt-1">Topic: <strong className="text-slate-800">{slot.topic}</strong></p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <User className="w-3.5 h-3.5 text-slate-400" /> {slot.lecturer}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {slot.room}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Updated weekly by Class Representative & HOD</span>
          <button
            onClick={() => alert('Official Weekly Class Timetable (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Full Timetable (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   3. EXAM RESULTS PAGE
   ========================================================================= */
export const GradesPage: React.FC<{
  transcripts: SemesterTranscript[];
  onBack: () => void;
}> = ({ transcripts, onBack }) => {
  const [selectedSemester, setSelectedSemester] = useState<SemesterTranscript | null>(null);

  // Helper to format stage to 1.1, 1.2, 1.3, 2.1
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
      {/* Page Navigation & Title Header */}
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
        {/* 
            TABLE COLUMNS:
            1st column: Academic Year
            2nd column: Academic Semester
            3rd column: Exam Series Name (Year)
            4th column: Stage of the Semester (invisible borders, displays 1.1, 1.2, 1.3, 2.1)
            5th column: Action (invisible borders, View Exam button in light blue)
            Row background: alternating soft white and soft matte slate-100 (non-glare)
        */}
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
                {transcripts.map((item, index) => {
                  const isSelected = selectedSemester?.semesterName === item.semesterName;
                  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-100/70';
                  return (
                    <tr
                      key={index}
                      className={`transition-colors text-black ${
                        isSelected ? 'bg-sky-100 font-bold' : `${rowBg} hover:bg-slate-200/50`
                      }`}
                    >
                      {/* 1st column: Academic Year */}
                      <td className="py-3.5 px-4 font-bold text-black whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 font-mono text-[11px] text-black shadow-2xs">
                          {item.academicYear}
                        </span>
                      </td>

                      {/* 2nd column: Academic Semester */}
                      <td className="py-3.5 px-4 font-semibold text-black whitespace-nowrap">
                        {item.academicSemester}
                      </td>

                      {/* 3rd column: Exam Series Name (Year) */}
                      <td className="py-3.5 px-4 font-bold text-black">
                        {item.examSeriesName}
                      </td>

                      {/* 4th column: Stage of the Semester (Borders invisible, shows 1.1, 1.2, 1.3, 2.1) */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-black border-none">
                        <span className="font-bold text-black border-none">
                          {getStageCode(item, index)}
                        </span>
                      </td>

                      {/* 5th column: Action (Borders invisible, View Exam button in light blue) */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap border-none">
                        <button
                          type="button"
                          onClick={() => setSelectedSemester(item)}
                          className={`inline-block px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer border-0 ${
                            isSelected
                              ? 'bg-sky-300 text-sky-950 ring-2 ring-sky-400'
                              : 'bg-sky-100 hover:bg-sky-200 text-sky-950'
                          }`}
                        >
                          View Exam
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Semester Exam Scores Detail Modal / Card */}
        {selectedSemester && (
          <div className="border border-slate-200 rounded-2xl bg-white p-4 sm:p-5 shadow-xs space-y-4 animate-fadeIn text-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-black border border-slate-200 font-mono text-[10px] font-bold uppercase">
                    {selectedSemester.academicYear} • {selectedSemester.academicSemester}
                  </span>
                  <span className="text-black text-xs font-bold border-none">
                    Stage {getStageCode(selectedSemester, transcripts.findIndex((t) => t.semesterName === selectedSemester.semesterName))}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-black mt-1">
                  {selectedSemester.examSeriesName}
                </h3>
                <p className="text-xs text-black/75">
                  Official Unit Grades & Examination Scores Breakdown
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedSemester(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-bold text-xs border-0 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Units Table for the Selected Semester */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="overflow-x-auto bg-white">
                <table className="w-full text-left text-xs border-collapse bg-white">
                  <thead>
                    <tr className="bg-slate-100 text-black font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3 text-black">Unit Code</th>
                      <th className="py-2.5 px-3 text-black">Unit Description</th>
                      <th className="py-2.5 px-3 text-center text-black">Score</th>
                      <th className="py-2.5 px-3 text-center text-black">Grade</th>
                      <th className="py-2.5 px-3 text-right text-black">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {selectedSemester.units.map((unit, uIdx) => {
                      const unitRowBg = uIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                      return (
                        <tr key={uIdx} className={`hover:bg-slate-100/70 transition-colors text-black ${unitRowBg}`}>
                          <td className="py-2.5 px-3 font-mono font-bold text-black">{unit.unitCode}</td>
                          <td className="py-2.5 px-3 font-medium text-black">{unit.unitName}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-black text-center">
                            {unit.score}%
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="font-bold px-2 py-0.5 rounded-md text-[11px] border border-slate-200 bg-white text-black">
                              Grade {unit.grade}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200 bg-white text-black">
                              {unit.passed ? 'PASS' : 'FAIL'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-slate-200">
              <span className="text-xs text-black/75">
                Grades certified by KMTC Examination Board & Faculty Evaluators
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() =>
                    alert(`Downloading official score slip for ${selectedSemester.examSeriesName} (PDF)...`)
                  }
                  className="flex-1 sm:flex-none px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-950 border-0 rounded-xl font-bold text-xs transition-colors shadow-2xs"
                >
                  Download Semester Result Slip
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSemester(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-black border-0 rounded-xl font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   4. REGISTRATION PAGE
   ========================================================================= */
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
        {/* Semester Registration Table */}
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

        {/* Global Action Footer */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Official enrollment records synchronized with KMTC Academic Registrar Portal.
          </span>
          <button
            type="button"
            onClick={() => alert('Official Semester Registration Summary Sheet (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Complete Registration Summary (PDF)
          </button>
        </div>
      </div>

      {/* =========================================================================
          OFFICIAL KMTC EXAMINATION PASS MODAL PREVIEW & DOWNLOAD
          ========================================================================= */}
      {selectedExamPass && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedExamPass(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-2 border-[#6f1825] my-auto space-y-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Actions Header */}
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

            {/* Printable Pass Card Body */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-[#6f1825]/30 space-y-4 text-xs font-sans">
              {/* College Insignia & Header */}
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

              {/* Candidate Info Grid */}
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

              {/* Units Enrolled for Examination */}
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

              {/* Instructions & Security Verification */}
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

            {/* Modal Action Buttons */}
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
                onClick={() => {
                  window.print();
                }}
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


/* =========================================================================
   6. HOW TO PAY PAGE
   ========================================================================= */
export { HowToPayPage } from "./fees/HowToPayPage";

/* =========================================================================
   7. HOSTEL ROOM PAGE
   ========================================================================= */
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

/* =========================================================================
   8. ACADEMIC CALENDAR PAGE (KENYAN CALENDAR WITH NATIONAL DAYS)
   ========================================================================= */
interface KenyaHoliday {
  day: number;
  month: number; // 0-indexed (0 = Jan, 11 = Dec)
  name: string;
  type: string;
}

const KENYA_NATIONAL_DAYS_2026: KenyaHoliday[] = [
  { day: 1, month: 0, name: "New Year's Day", type: 'Public Holiday' },
  { day: 21, month: 2, name: 'Eid al-Fitr', type: 'Islamic Public Holiday (Tentative)' },
  { day: 3, month: 3, name: 'Good Friday', type: 'Christian Public Holiday' },
  { day: 6, month: 3, name: 'Easter Monday', type: 'Christian Public Holiday' },
  { day: 1, month: 4, name: 'Labour Day', type: 'National Public Holiday' },
  { day: 27, month: 4, name: 'Eid al-Adha', type: 'Islamic Public Holiday (Tentative)' },
  { day: 1, month: 5, name: 'Madaraka Day', type: 'National Day (Self-Rule Day)' },
  { day: 10, month: 9, name: 'Mazingira Day', type: 'National Conservation & Heritage Day' },
  { day: 20, month: 9, name: 'Mashujaa Day', type: "National Heroes' Day" },
  { day: 12, month: 11, name: 'Jamhuri Day', type: 'Republic & Independence Day' },
  { day: 25, month: 11, name: 'Christmas Day', type: 'Christian Public Holiday' },
  { day: 26, month: 11, name: 'Utu Day (Boxing Day)', type: 'National Public Holiday' },
];

const CALENDAR_MONTHS_2026 = [
  { index: 0, name: 'January 2026', shortName: 'Jan', days: 31, startDayOfWeek: 4 },
  { index: 1, name: 'February 2026', shortName: 'Feb', days: 28, startDayOfWeek: 0 },
  { index: 2, name: 'March 2026', shortName: 'Mar', days: 31, startDayOfWeek: 0 },
  { index: 3, name: 'April 2026', shortName: 'Apr', days: 30, startDayOfWeek: 3 },
  { index: 4, name: 'May 2026', shortName: 'May', days: 31, startDayOfWeek: 5 },
  { index: 5, name: 'June 2026', shortName: 'Jun', days: 30, startDayOfWeek: 1 },
  { index: 6, name: 'July 2026', shortName: 'Jul', days: 31, startDayOfWeek: 3 },
  { index: 7, name: 'August 2026', shortName: 'Aug', days: 31, startDayOfWeek: 6 },
  { index: 8, name: 'September 2026', shortName: 'Sep', days: 30, startDayOfWeek: 2 },
  { index: 9, name: 'October 2026', shortName: 'Oct', days: 31, startDayOfWeek: 4 },
  { index: 10, name: 'November 2026', shortName: 'Nov', days: 30, startDayOfWeek: 0 },
  { index: 11, name: 'December 2026', shortName: 'Dec', days: 31, startDayOfWeek: 2 },
];

export const CalendarPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const month = CALENDAR_MONTHS_2026[currentMonthIndex];
  const monthHolidays = KENYA_NATIONAL_DAYS_2026.filter((h) => h.month === currentMonthIndex);

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
            Academic Calendar
          </h2>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs p-2.5 sm:p-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#6f1825]" />
              <h3 className="font-black text-sm sm:text-base text-slate-900">{month.name}</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMonthIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => Math.min(11, prev + 1))}
                disabled={currentMonthIndex === 11}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center font-extrabold text-[10px] text-slate-500 uppercase tracking-wider py-1.5 bg-slate-50 rounded-xl mt-2">
            <span className="text-rose-600">Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] mt-2">
            {Array.from({ length: month.startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 opacity-0 select-none">.</div>
            ))}
            {Array.from({ length: month.days }).map((_, i) => {
              const dayNum = i + 1;
              const holiday = monthHolidays.find((h) => h.day === dayNum);

              return (
                <div
                  key={dayNum}
                  className={`min-h-[46px] sm:min-h-[54px] p-1 rounded-lg flex flex-col items-center justify-between transition-all border ${
                    holiday
                      ? 'bg-rose-50 text-rose-950 font-black border-rose-300 ring-1 ring-rose-200 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-100'
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-bold ${holiday ? 'text-rose-700 font-black' : ''}`}>
                    {dayNum}
                  </span>
                  {holiday && (
                    <span className="block w-full px-1 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-tight bg-[#6f1825] text-amber-200 leading-tight truncate">
                      {holiday.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   9. SUPP / SPECIAL PAGE
   ========================================================================= */
export { SuppSpecialPage } from './examination/SuppSpecialPage';

/* =========================================================================
   10. REVISION PAPERS PAGE
   ========================================================================= */
export const RevisionPage: React.FC<{
  resources: ResourceNote[];
  onBack: () => void;
}> = ({ resources, onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Past Revision Papers & Study Bank Archive"
      subtitle="Official Department of Physiotherapy Exam Archive"
    >
      <div className="space-y-3">
        {resources.map((res) => (
          <div
            key={res.id}
            className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="font-bold text-sm text-slate-900">{res.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {res.unitCode} • {res.unitName} • {res.fileSize}
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading ${res.title} from Firebase Storage...`)}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs border border-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   11. CONTACT DIRECTORY PAGE
   ========================================================================= */
export const ContactsPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Department & Administrative Staff Directory"
      subtitle="Direct Phone & Email Contacts • KMTC Nyeri Campus"
    >
      <div className="space-y-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-slate-900 text-sm">Dr. K. Ndegwa (HOD)</strong>
            <p className="text-slate-500 text-xs">Head of Department • Biomechanics Senior Lecturer</p>
          </div>
          <a
            href="mailto:hod.physio.nyeri@kmtc.ac.ke"
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
          >
            Email HOD
          </a>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-slate-900 text-sm">Madam J. Wanjiku</strong>
            <p className="text-slate-500 text-xs">Senior Lecturer • Electrotherapy & Modalities</p>
          </div>
          <a
            href="mailto:jwanjiku@kmtc.ac.ke"
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
          >
            Email Lecturer
          </a>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-slate-900 text-sm">Sarah (Class Representative)</strong>
            <p className="text-slate-500 text-xs">Cohort 2024 Representative • Student Liaison</p>
          </div>
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
            Available on WhatsApp
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-slate-900 text-sm">KMTC Campus ICT Helpdesk</strong>
            <p className="text-slate-500 text-xs">Portal Support, Password Resets & WiFi Help</p>
          </div>
          <a
            href="tel:+254700000000"
            className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
          >
            Call Helpdesk
          </a>
        </div>
      </div>
    </PageWrapper>
  );
};
