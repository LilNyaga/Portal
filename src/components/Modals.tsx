import React, { useState } from 'react';
import { 
  ArrowLeft,
  CheckCircle2, 
  Download, 
  Smartphone, 
  Building, 
  User, 
  Calendar as CalendarIcon, 
  MapPin, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Phone, 
  Mail,
  GraduationCap
} from 'lucide-react';
import { 
  SemesterTranscript, 
  FeeStatement, 
  HostelAllocation, 
  ResourceNote, 
  UserProfile, 
  TimetableSlot 
} from '../types';

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
            className="flex items-center gap-1.5 text-xs font-black text-[#6f1825] hover:text-rose-950 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 transition-colors shadow-2xs cursor-pointer select-none shrink-0"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Dashboard</span>
          </button>
          <div>
            <h2 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
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
  return (
    <PageWrapper
      onBack={onBack}
      title="Academic Examination Results & Historical Transcripts"
      subtitle="Complete Record of Sittings Since Year 1 Entry (September 2024)"
    >
      <div className="space-y-4 text-xs">
        {/* Cumulative CGPA Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div>
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Cumulative GPA (All Semesters)</div>
            <div className="text-3xl font-black text-white mt-0.5">3.71 <span className="text-sm font-normal text-emerald-200">/ 4.00</span></div>
            <p className="text-xs text-slate-300 mt-1">Total Completed: 19 Units • 68 Credit Hours</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span className="font-extrabold text-xs sm:text-sm text-white">0 Supplementary Exams (All Units Passed)</span>
          </div>
        </div>

        {/* All Semesters Breakdown since Year 1 */}
        <div className="space-y-3.5">
          {transcripts.map((sem, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="bg-slate-100 px-4 py-3 text-xs font-bold text-slate-800 flex items-center justify-between border-b border-slate-200">
                <span className="font-black text-sm text-slate-900 uppercase">{sem.semesterName}</span>
                <span className="text-emerald-800 font-mono font-black bg-emerald-100/90 px-2.5 py-1 rounded-lg border border-emerald-300">
                  Semester GPA: {sem.gpa.toFixed(2)}
                </span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {sem.units.map((u, i) => (
                  <div key={i} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                    <div>
                      <strong className="text-slate-900 font-mono mr-2">{u.unitCode}:</strong>
                      <span className="text-slate-800 font-medium">{u.unitName}</span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs text-slate-500 font-mono font-semibold">Score: {u.score}%</span>
                      <span
                        className={`font-black text-xs px-2.5 py-0.5 rounded-md border ${
                          u.grade.startsWith('A')
                            ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                            : 'text-blue-800 bg-blue-50 border-blue-200'
                        }`}
                      >
                        Grade {u.grade}
                      </span>
                      <span className="text-xs text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                        PASS
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500">Official transcript certified by KMTC Examination Board</span>
          <button
            onClick={() => alert('Official Complete Transcript (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Full Historical Transcript (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   4. REGISTRATION PAGE
   ========================================================================= */
export const RegistrationPage: React.FC<{
  user: UserProfile;
  onBack: () => void;
}> = ({ user, onBack }) => {
  const semestersHistory = [
    {
      title: 'Year 2 • Semester 1 (Current Session 2025/2026)',
      status: 'SUCCESSFULLY REGISTERED',
      statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      units: [
        { code: 'PT 201', name: 'Clinical Biomechanics & Gait Analysis', units: 3, status: 'Registered' },
        { code: 'PT 204', name: 'Electrotherapy Principles & Waveforms', units: 3, status: 'Registered' },
        { code: 'PT 207', name: 'Orthopaedic Rehabilitation & Lower Extremity', units: 4, status: 'Registered' },
        { code: 'PT 209', name: 'Clinical Placement & Hospital Ward Rounds', units: 4, status: 'Registered' },
        { code: 'PT 211', name: 'Medical Pathology & Ergonomics', units: 2, status: 'Registered' },
      ]
    },
    {
      title: 'Year 1 • Semester 3 (May - Aug 2025)',
      status: 'COMPLETED & APPROVED',
      statusColor: 'bg-slate-100 text-slate-800 border-slate-200',
      units: [
        { code: 'PT 111', name: 'Principles of Exercise Therapy & Movement Science', units: 4, status: 'Completed' },
        { code: 'PT 112', name: 'Basic Electrotherapy Modalities (Thermal & Cryo)', units: 3, status: 'Completed' },
        { code: 'PT 113', name: 'Kinesiology & Human Movement Analysis', units: 4, status: 'Completed' },
        { code: 'PT 114', name: 'Introduction to Clinical Hospital Placement I', units: 4, status: 'Completed' },
      ]
    },
    {
      title: 'Year 1 • Semester 2 (Jan - Apr 2025)',
      status: 'COMPLETED & APPROVED',
      statusColor: 'bg-slate-100 text-slate-800 border-slate-200',
      units: [
        { code: 'PT 106', name: 'Gross Human Anatomy II (Lower Extremity & Pelvis)', units: 4, status: 'Completed' },
        { code: 'PT 107', name: 'Human Physiology II (Musculoskeletal)', units: 3, status: 'Completed' },
        { code: 'PT 108', name: 'Pathology & Microbiology in Rehabilitation', units: 3, status: 'Completed' },
        { code: 'PT 109', name: 'Pharmacology for Physiotherapists', units: 3, status: 'Completed' },
        { code: 'PT 110', name: 'Clinical Assessment & Palpation Skills', units: 4, status: 'Completed' },
      ]
    },
    {
      title: 'Year 1 • Semester 1 (Sep - Dec 2024)',
      status: 'COMPLETED & APPROVED',
      statusColor: 'bg-slate-100 text-slate-800 border-slate-200',
      units: [
        { code: 'PT 101', name: 'Gross Human Anatomy I (Upper Extremity & Thorax)', units: 4, status: 'Completed' },
        { code: 'PT 102', name: 'Human Physiology I (Cardiovascular & Neuro)', units: 4, status: 'Completed' },
        { code: 'PT 103', name: 'Foundations of Physiotherapy & Ethics', units: 3, status: 'Completed' },
        { code: 'PT 104', name: 'First Aid, BLS & Patient Safety', units: 3, status: 'Completed' },
        { code: 'PT 105', name: 'Medical Communication & Clinical Documentation', units: 2, status: 'Completed' },
      ]
    },
    {
      title: 'Year 2 • Semester 2 (Upcoming Session)',
      status: 'PENDING ENROLLMENT WINDOW',
      statusColor: 'bg-amber-100 text-amber-900 border-amber-300',
      units: [
        { code: 'PT 215', name: 'Neurological Rehabilitation & Stroke Management', units: 4, status: 'Pending Window' },
        { code: 'PT 218', name: 'Paediatric Physiotherapy & Developmental Assessment', units: 3, status: 'Pending Window' },
        { code: 'PT 220', name: 'Community-Based Rehabilitation & Disability Inclusion', units: 3, status: 'Pending Window' },
        { code: 'PT 222', name: 'Hospital Internship & Clinical Practical II', units: 5, status: 'Pending Window' },
      ]
    }
  ];

  return (
    <PageWrapper
      onBack={onBack}
      title="Semester Registration & Course Enrollment Tracker"
      subtitle={`Student: ${user.name} (${user.admissionNo}) • Status Since Year 1 Entry`}
    >
      <div className="space-y-4 text-xs">
        {/* Active Semester Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
          <div>
            <div className="text-emerald-950 font-black text-sm">Current Semester: {user.semester}</div>
            <p className="text-emerald-800 text-xs mt-0.5">All 5 core units for this term are fully registered and cleared by HOD.</p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wide">
            16 Credit Units
          </span>
        </div>

        {/* History of Every Semester */}
        <div className="space-y-3.5">
          {semestersHistory.map((sem, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900">{sem.title}</span>
                <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${sem.statusColor}`}>
                  {sem.status}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {sem.units.map((u, i) => (
                  <div key={i} className="p-3 px-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <strong className="text-slate-900 font-mono mr-2">{u.code}</strong>
                      <span className="text-slate-800 font-medium">{u.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-500 font-mono">{u.units} Credit Hrs</span>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        u.status === 'Registered' || u.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {u.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Total Academic Progress: 68 Credits Completed</span>
          <button
            onClick={() => alert('Official Semester Registration Slip (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Current Registration Slip (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   5. FEES STATEMENT PAGE
   ========================================================================= */
export const FeesPage: React.FC<{
  feeStatement: FeeStatement;
  onBack: () => void;
  onOpenHowToPay: () => void;
}> = ({ feeStatement, onBack, onOpenHowToPay }) => {
  // Separate invoices and payments
  const invoices = feeStatement.transactions.filter((tx) => !tx.isPayment);
  const payments = feeStatement.transactions.filter((tx) => tx.isPayment);
  const totalInvoicesCount = invoices.length;
  const totalPaymentsCount = payments.length;
  const lastPayment = payments.length > 0 ? payments[payments.length - 1] : null;

  // Compute numbered rows with running balance
  let runningBalance = 0;
  const transactionsWithBalance = feeStatement.transactions.map((tx, idx) => {
    if (tx.isPayment) {
      runningBalance -= tx.amount;
    } else {
      runningBalance += tx.amount;
    }
    return {
      ...tx,
      index: idx + 1,
      balanceAfter: runningBalance,
    };
  });

  return (
    <PageWrapper
      onBack={onBack}
      title="Complete Financial Ledger & Historical Fee Statement"
      subtitle={`Account: ${feeStatement.accountNumber} • Full Statement Since First Day of Enrollment`}
    >
      <div className="space-y-4 text-xs">
        {/* 1. TOP METRIC CONTAINERS: EACH IN ITS OWN CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {/* Container 1: Total No. of Invoices */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Total Invoices
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {totalInvoicesCount} <span className="text-xs font-semibold text-slate-500">Invoices</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-mono">
              Billed: KES {feeStatement.totalInvoiced.toLocaleString()}
            </div>
          </div>

          {/* Container 2: All Payments Made */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                All Payments Made
              </span>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                KES {feeStatement.totalPaid.toLocaleString()}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {totalPaymentsCount} Reconciled Payments
            </div>
          </div>

          {/* Container 3: Current Balance */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Current Balance
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                KES {feeStatement.balance.toFixed(2)}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-emerald-700 font-bold">
              100% Cleared (Zero Due)
            </div>
          </div>

          {/* Container 4: Last Payment & Date */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">
                Last Payment & Date
              </span>
              <div className="text-xl font-black text-amber-950 mt-1">
                {lastPayment ? `KES ${lastPayment.amount.toLocaleString()}` : 'N/A'}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-amber-900 font-medium font-mono">
              {lastPayment ? `${lastPayment.date} • ${lastPayment.reference}` : 'No payments yet'}
            </div>
          </div>
        </div>

        {/* 2. AMOUNT THAT SHOULD BE PAID FOR CURRENT SEMESTER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#6f1825] text-white space-y-3 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-2.5">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                Current Semester Fee Assessment (Year 2, Semester 1)
              </div>
              <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                Tuition & Hospital Ward Rotations Attachment Fee
              </h4>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-white font-black text-xs uppercase tracking-wide self-start sm:self-auto shrink-0 shadow-xs">
              FULLY PAID & CLEARED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-slate-300 text-[11px] block">Current Semester Invoiced</span>
              <strong className="text-white text-base sm:text-lg font-mono font-black">KES 32,500.00</strong>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-emerald-300 text-[11px] block">Amount Paid for Semester</span>
              <strong className="text-emerald-300 text-base sm:text-lg font-mono font-black">KES 32,500.00</strong>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-amber-200 text-[11px] block">Outstanding Amount to Pay</span>
              <strong className="text-white text-base sm:text-lg font-mono font-black">KES 0.00</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-xs">
            <div className="text-slate-300 text-[11px]">
              Official M-Pesa Paybill: <strong className="text-white font-mono">{feeStatement.mpesaPaybill}</strong> • Account: <strong className="text-amber-300 font-mono">{feeStatement.accountNumber}</strong>
            </div>
            <button
              onClick={onOpenHowToPay}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-[#6f1825] font-black rounded-xl text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              How to Pay Details →
            </button>
          </div>
        </div>

        {/* 3. ITEMISED TABLE FORMAT NUMBERING EVERY INVOICE & TRANSACTION */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
          <div className="bg-slate-100 px-4 py-3 font-bold text-slate-800 flex items-center justify-between border-b border-slate-200">
            <span className="uppercase text-xs tracking-wider">Itemized Ledger of Invoices & Payments</span>
            <span className="text-slate-500 font-mono text-xs">{feeStatement.transactions.length} Total Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3 text-center w-10">#</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Date</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Description</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Reference</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Invoice (Debit)</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Payment (Credit)</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactionsWithBalance.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      row.isPayment ? 'bg-emerald-50/25' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500">{row.index}</td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-600">{row.date}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{row.description}</td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-500">{row.reference}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {!row.isPayment ? `KES ${row.amount.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-black text-emerald-700">
                      {row.isPayment ? `KES ${row.amount.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-700">
                      KES {row.balanceAfter.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100/90 font-black text-xs text-slate-900 border-t-2 border-slate-200">
                  <td colSpan={4} className="py-3 px-3 uppercase tracking-wider text-slate-700">
                    Total Ledger Summary (Net Balance)
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black">
                    KES {feeStatement.totalInvoiced.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-emerald-700">
                    KES {feeStatement.totalPaid.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-emerald-800">
                    KES {feeStatement.balance.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Statement stamped by KMTC Finance Directorate</span>
          <button
            onClick={() => alert('Official Certified Fee Statement (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Official Statement (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   6. HOW TO PAY PAGE
   ========================================================================= */
export const HowToPayPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Official Payment Channels & Instructions"
      subtitle="KMTC Nyeri Campus Tuition & Institutional Fees"
    >
      <div className="space-y-4 text-xs text-slate-700">
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2.5">
          <h4 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-800" /> Safaricom M-Pesa (Auto-Reconciled)
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-800 text-xs sm:text-sm">
            <li>Go to M-Pesa on your phone and select <strong>Lipa na M-Pesa</strong></li>
            <li>Select <strong>Pay Bill</strong></li>
            <li>Enter Business Number: <strong className="text-emerald-950 font-mono">964150</strong></li>
            <li>Enter Account Number: <strong className="text-emerald-950 font-mono">PT/2024/048</strong></li>
            <li>Enter Amount and your Secret M-Pesa PIN to complete</li>
          </ol>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Building className="w-5 h-5 text-slate-700" /> National Bank of Kenya (NBK) Branch Counter
          </h4>
          <p className="text-xs sm:text-sm">Bank Branch: <strong>Nyeri Branch</strong></p>
          <p className="text-xs sm:text-sm">Account Name: <strong>Kenya Medical Training College</strong></p>
          <p className="text-xs sm:text-sm">Account Number: <strong className="font-mono">01003086514000</strong></p>
          <p className="text-xs text-slate-500 pt-1">
            Present the stamped bank counter slip to the KMTC Finance Office for instant ledger confirmation.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   7. HOSTEL ROOM PAGE
   ========================================================================= */
export const HostelPage: React.FC<{
  hostel: HostelAllocation;
  onBack: () => void;
}> = ({ hostel, onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Hostel Allocation, Room Booking & Bed Assignment"
      subtitle="KMTC Nyeri Campus Student Accommodation Directorate"
    >
      <div className="space-y-4 text-xs">
        {/* Current Allocation Hero Banner */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
              Academic Year: {hostel.academicYear || '2025/2026 (Year 2, Semester 1)'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black">
              ALLOCATION CONFIRMED
            </span>
          </div>
          <div className="text-base sm:text-xl font-black text-slate-900">
            {hostel.hostelName} • {hostel.block}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-slate-500 text-[11px] block">Allocated Room</span>
              <strong className="text-slate-900 font-mono text-sm">{hostel.roomNumber}</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-slate-500 text-[11px] block">Allocated Bed</span>
              <strong className="text-[#6f1825] font-black text-sm">{hostel.bedNumber} ({hostel.bedType || 'Lower Bunk'})</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-slate-500 text-[11px] block">Room Type</span>
              <strong className="text-slate-900 text-sm">{hostel.roomType || '4-Bed Cubicle'}</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-slate-500 text-[11px] block">Check-in Date</span>
              <strong className="text-slate-900 text-sm">{hostel.checkInDate || '15 Jan 2026'}</strong>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-1">Hall Warden: <strong className="text-slate-900">{hostel.wardenName}</strong></p>
        </div>

        {/* Roommates & Bed Occupants */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#6f1825]" /> Roommates & Bed Spaces (Room 14)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(hostel.roommates || [
              'Brian Kiprono (PT/2024/012) • Bed 1 (Upper Bunk)',
              'Lemayian [You] (PT/2024/048) • Bed 2 (Lower Bunk)',
              'Kevin Mwangi (PT/2024/033) • Bed 3 (Upper Bunk)',
              'David Otieno (PT/2024/051) • Bed 4 (Lower Bunk)',
            ]).map((rm, i) => (
              <div key={i} className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                rm.includes('[You]') ? 'bg-amber-50/80 border-amber-300' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                  {i + 1}
                </div>
                <span className="text-xs font-bold text-slate-900">{rm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Home className="w-4 h-4 text-[#6f1825]" /> Room Facilities & Amenities
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700">
            {(hostel.amenities || [
              'Individual Wooden Study Desk & Ergonomic Chair',
              'Heavy-Duty Steel Padlockable Locker',
              'Campus High-Speed Wi-Fi Hotspot',
              'Solar Water Heating in Bathrooms',
            ]).map((amenity, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Term 2 Booking Window opens 01 Dec 2026</span>
          <button
            onClick={() => alert('Official Hostel Room & Bed Clearance Slip (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Bed Clearance Slip (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   8. ACADEMIC CALENDAR PAGE
   ========================================================================= */
export const CalendarPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Jan 2026

  const calendarMonths = [
    { name: 'January 2026', days: 31, startDayOfWeek: 4 }, // Thu
    { name: 'February 2026', days: 28, startDayOfWeek: 0 }, // Sun
    { name: 'March 2026', days: 31, startDayOfWeek: 0 },
    { name: 'April 2026', days: 30, startDayOfWeek: 3 },
  ];

  const month = calendarMonths[currentMonthIndex];

  const events = [
    { date: '15 Jan 2026', title: 'Term 1 Commencement & Clinical Orientation', tag: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { date: '28 Feb 2026', title: 'Continuous Assessment Tests (CAT 1)', tag: 'Exams', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { date: '15 Mar 2026', title: 'Fee Clearance Deadline for Practical Exams', tag: 'Finance', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { date: '28 Mar 2026', title: 'Hospital Ward Rotations Mid-Term Evaluation', tag: 'Clinical', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { date: '04 Apr 2026', title: 'End of Term Practical & Theory Examinations', tag: 'Exams', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { date: '25 Apr 2026', title: 'Release of Term Results & Academic Board Meeting', tag: 'Results', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { date: '02 May 2026', title: 'Supplementary & Special Examinations Window', tag: 'Special', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  ];

  return (
    <PageWrapper
      onBack={onBack}
      title="Official KMTC Academic Calendar & Institutional Events"
      subtitle="Academic Year 2026 Schedule • Department of Physiotherapy"
    >
      <div className="space-y-5 text-xs">
        {/* DUAL VIEW: Visual Interactive Calendar Grid (Always Displayed) */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
          {/* Calendar Month Controls */}
          <div className="flex items-center justify-between">
            <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#6f1825]" /> {month.name}
            </h4>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMonthIndex === 0}
                className="p-1.5 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonthIndex((prev) => Math.min(calendarMonths.length - 1, prev + 1))}
                disabled={currentMonthIndex === calendarMonths.length - 1}
                className="p-1.5 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center font-bold text-[11px] text-slate-400 uppercase">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-xs">
            {Array.from({ length: month.startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 opacity-0">.</div>
            ))}
            {Array.from({ length: month.days }).map((_, i) => {
              const dayNum = i + 1;
              const isToday = currentMonthIndex === 0 && dayNum === 15;
              const hasEvent = (currentMonthIndex === 0 && (dayNum === 15 || dayNum === 28)) ||
                               (currentMonthIndex === 1 && dayNum === 28) ||
                               (currentMonthIndex === 2 && (dayNum === 15 || dayNum === 28)) ||
                               (currentMonthIndex === 3 && (dayNum === 4 || dayNum === 25));

              return (
                <div
                  key={dayNum}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    isToday
                      ? 'bg-[#6f1825] text-white font-black shadow-xs'
                      : hasEvent
                      ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-100'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{dayNum}</span>
                  {hasEvent && !isToday && <span className="w-1.5 h-1.5 bg-[#6f1825] rounded-full mt-1"></span>}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#6f1825] rounded-sm"></span> Today / Key Date</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-200 border border-amber-300 rounded-sm"></span> Event Scheduled</span>
          </div>
        </div>

        {/* All Dates & Events of the School */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs">
            Chronological Institutional Dates & Events (Term 1 - Term 3 2026)
          </h5>
          <div className="space-y-2.5">
            {events.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors">
                <div>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${item.color}`}>
                    {item.tag}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{item.title}</h5>
                </div>
                <span className="font-mono text-slate-600 font-bold text-xs shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Approved by KMTC Academic Board 2026</span>
          <button
            onClick={() => alert('Official 2026 KMTC Academic Calendar (PDF) downloaded.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" /> Download Full Year Calendar (PDF)
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

/* =========================================================================
   9. SUPP / SPECIAL PAGE
   ========================================================================= */
export const SuppSpecialPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  return (
    <PageWrapper
      onBack={onBack}
      title="Supplementary & Special Examinations Clearance Desk"
      subtitle="KMTC Department Examination Board Record"
    >
      <div className="space-y-4 text-xs">
        {/* Status Card */}
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-2xl shadow-xs shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="text-emerald-950 font-black text-sm sm:text-base">Status: Good Academic Standing (Zero Supps)</div>
              <p className="text-emerald-800 text-xs mt-0.5">
                You have passed all 19 units since Year 1 on first sittings. There are <strong>0 pending supplementary</strong> or retake exams against your student record.
              </p>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-emerald-700 text-white font-extrabold text-xs shrink-0 self-start sm:self-auto shadow-2xs">
            100% CLEARED
          </span>
        </div>

        {/* History of Past Exam Sittings Verification */}
        <div className="space-y-2.5">
          <h5 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs">
            Examination Sittings Check (Since Year 1 September 2024)
          </h5>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 grid grid-cols-4 text-xs">
              <span className="col-span-2">Examination Period</span>
              <span>Units Sat</span>
              <span>Supp Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { period: 'Year 1 • Semester 1 Finals', units: '5 Core Units', status: '0 Supps (All Passed)' },
                { period: 'Year 1 • Semester 2 Finals', units: '5 Core Units', status: '0 Supps (All Passed)' },
                { period: 'Year 1 • Semester 3 Finals', units: '4 Core Units', status: '0 Supps (All Passed)' },
                { period: 'Year 2 • Semester 1 Finals', units: '5 Core Units', status: '0 Supps (All Passed)' },
              ].map((row, idx) => (
                <div key={idx} className="p-3 px-4 grid grid-cols-4 items-center">
                  <span className="col-span-2 font-semibold text-slate-900 text-xs">{row.period}</span>
                  <span className="text-slate-600 font-mono text-xs">{row.units}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5 text-xs">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Examination Requests Desk */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-700" />
            <h5 className="font-extrabold text-slate-900 text-sm">Special Examination Request Window</h5>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs">
            Students who miss scheduled continuous assessment tests or end-of-term examinations due to verified medical emergencies or documented compassionate grounds may apply for a Special Examination.
          </p>
          <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
            <span className="text-slate-500 text-xs">Next Special Exam Board: May 2026 Session</span>
            <button
              onClick={() => alert('Special Examination Application initiated.\n\nPlease upload medical superintendent documentation to complete request.')}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              Apply for Special Examination
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

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
