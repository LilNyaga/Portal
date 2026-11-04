import React from 'react';
import { X, CheckCircle2, Download, FileText, Smartphone, Building } from 'lucide-react';
import { SemesterTranscript, FeeStatement, HostelAllocation, ResourceNote, UserProfile } from '../types';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 drawer-overlay animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-black text-lg text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold text-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* 1. GRADES & SUPPLEMENTARY (SUPP) MODAL */
export const GradesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  transcripts: SemesterTranscript[];
}> = ({ isOpen, onClose, transcripts }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Academic Transcript & Supplementary Checker"
      subtitle="Official KMTC Department Examination Board Record"
    >
      {/* Supplementary Status Pill */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-900 uppercase">Supplementary Status</div>
            <div className="text-sm font-black text-emerald-700">0 Supplementary Exams (All Units Passed)</div>
          </div>
        </div>
        <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
          CLEARED
        </span>
      </div>

      {/* Semester Breakdown */}
      <div className="space-y-3">
        {transcripts.map((sem, idx) => (
          <div key={idx} className="border rounded-2xl overflow-hidden shadow-2xs">
            <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 flex justify-between">
              <span>{sem.semesterName.toUpperCase()}</span>
              <span className="text-emerald-700 font-mono font-bold">GPA: {sem.gpa.toFixed(2)}</span>
            </div>
            <div className="divide-y text-xs">
              {sem.units.map((u, i) => (
                <div key={i} className="p-3 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <span className="font-medium text-slate-800">{u.unitCode}: {u.unitName}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      u.grade.startsWith('A')
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-blue-700 bg-blue-50'
                    }`}
                  >
                    Grade {u.grade} ({u.score}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={() => alert('Certified Official KMTC PDF Transcript downloaded.')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Certified Transcript (PDF)
        </button>
      </div>
    </ModalWrapper>
  );
};

/* 2. FEES STATEMENT MODAL */
export const FeesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  feeStatement: FeeStatement;
  onOpenHowToPay: () => void;
}> = ({ isOpen, onClose, feeStatement, onOpenHowToPay }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Department Fee Statement & Invoices"
      subtitle="Account: PT/2024/048 • Lemayian"
    >
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-slate-50 border">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Total Invoiced</div>
          <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
            KES {feeStatement.totalInvoiced.toLocaleString()}
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="text-[10px] text-emerald-700 uppercase font-bold">Amount Paid</div>
          <div className="text-sm sm:text-base font-black text-emerald-700 mt-1">
            KES {feeStatement.totalPaid.toLocaleString()}
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 border">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Current Balance</div>
          <div className="text-sm sm:text-base font-black text-emerald-600 mt-1">
            KES {feeStatement.balance.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-400">HOW TO PAY VIA M-PESA</span>
          <button
            onClick={onOpenHowToPay}
            className="text-[10px] bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-2.5 py-1 rounded-md font-mono"
          >
            View Bank Details →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs pt-1">
          <div>
            <div className="text-slate-400 text-[10px]">Lipa na M-Pesa Paybill:</div>
            <div className="font-mono font-bold text-white text-sm">{feeStatement.mpesaPaybill}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">Account Number:</div>
            <div className="font-mono font-bold text-amber-300 text-sm">{feeStatement.accountNumber}</div>
          </div>
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden text-xs">
        <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700">TRANSACTION HISTORY</div>
        <div className="divide-y">
          {feeStatement.transactions.map((tx) => (
            <div
              key={tx.id}
              className={`p-3 flex justify-between ${tx.isPayment ? 'bg-emerald-50/40' : ''}`}
            >
              <div>
                <div className="font-bold text-slate-800">{tx.description}</div>
                <div className="text-slate-400 text-[10px]">{tx.reference} • {tx.date}</div>
              </div>
              <span className={`font-mono font-bold ${tx.isPayment ? 'text-emerald-700' : 'text-slate-700'}`}>
                {tx.isPayment ? '-' : ''}KES {tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

/* 3. HOW TO PAY MODAL */
export const HowToPayModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Official Payment Channels"
      subtitle="KMTC Nyeri Campus Tuition & Institutional Fees"
    >
      <div className="space-y-3 text-xs text-slate-700">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
          <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Option 1: Safaricom M-Pesa (Auto-Reconciled)
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-700">
            <li>Go to M-Pesa on your phone and select <strong>Lipa na M-Pesa</strong></li>
            <li>Select <strong>Pay Bill</strong></li>
            <li>Enter Business Number: <strong className="text-emerald-950 font-mono">964150</strong></li>
            <li>Enter Account Number: <strong className="text-emerald-950 font-mono">PT/2024/048</strong></li>
            <li>Enter Amount and your Secret M-Pesa PIN</li>
          </ol>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Building className="w-4 h-4" /> Option 2: National Bank of Kenya (NBK)
          </h4>
          <p>Bank Branch: <strong>Nyeri Branch</strong></p>
          <p>Account Name: <strong>Kenya Medical Training College</strong></p>
          <p>Account Number: <strong className="font-mono">01003086514000</strong></p>
          <p className="text-[11px] text-slate-500 pt-1">
            Present official bank deposit slip at the KMTC Finance counter for receipt issuance.
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};

/* 4. HOSTEL MODAL */
export const HostelModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  hostel: HostelAllocation;
}> = ({ isOpen, onClose, hostel }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Hostel Allocation & Booking"
      subtitle="KMTC Nyeri Campus Accommodation"
    >
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-amber-900 uppercase">Current Allocation</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            {hostel.status}
          </span>
        </div>
        <div className="text-base font-black text-slate-900">
          {hostel.hostelName} • {hostel.block} ({hostel.roomNumber}, {hostel.bedNumber})
        </div>
        <p className="text-xs text-slate-600">Resident: Lemayian • Hall Warden: {hostel.wardenName}</p>
      </div>

      <div className="space-y-2 text-xs">
        <div className="font-bold text-slate-800">Term 2 Booking Window:</div>
        <p className="text-slate-500 leading-relaxed">
          Online bed booking for the upcoming term opens on <strong>December 1st at 09:00 AM</strong>.
          Only students with zero fee balance are eligible to select bed spaces.
        </p>
        <button
          onClick={() => alert('Hostel clearance slip downloaded.')}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl mt-2 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" /> Download Hostel Clearance Slip
        </button>
      </div>
    </ModalWrapper>
  );
};

/* 5. REVISION PAPERS MODAL */
export const RevisionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  resources: ResourceNote[];
}> = ({ isOpen, onClose, resources }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Past Revision Papers & Study Bank"
      subtitle="Official Department of Physiotherapy Exam Archive"
    >
      <div className="space-y-2.5">
        {resources.map((res) => (
          <div
            key={res.id}
            className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="font-bold text-xs text-slate-900">{res.title}</div>
              <div className="text-[11px] text-slate-500">
                {res.unitCode} • {res.unitName} • {res.fileSize}
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading ${res.title} from Firebase Storage...`)}
              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs border border-emerald-200 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

/* 6. CONTACT DIRECTORY MODAL */
export const ContactsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Department Contacts Directory"
      subtitle="Official KMTC Escalation Channels"
    >
      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900">Dr. K. Ndegwa (Senior Lecturer & Lab In-charge)</div>
            <div className="text-slate-500 text-[11px]">Biomechanics & Gait • Office: Physio Lab Block</div>
          </div>
          <button
            onClick={() => alert('Opening direct message thread with Dr. Ndegwa...')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
          >
            Message
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900">Madam J. Wanjiku (Lecturer - Electrotherapy)</div>
            <div className="text-slate-500 text-[11px]">Academic Advisor • Office: Staffroom A</div>
          </div>
          <button
            onClick={() => alert('Opening direct message thread with Madam Wanjiku...')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
          >
            Message
          </button>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div>
            <div className="font-bold text-emerald-950">Sarah (Class Representative - Physiotherapy)</div>
            <div className="text-emerald-700 text-[11px]">Class Coordination & Issue Relay</div>
          </div>
          <button
            onClick={() => alert('Direct inquiry chat with Sarah opened.')}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold"
          >
            Direct Chat
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

/* 7. PROFILE DIRECT MODAL */
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}> = ({ isOpen, onClose, user }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile & Biodata"
      subtitle="KMTC Official Registrar Student Record"
    >
      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white font-black text-xl flex items-center justify-center shadow-md">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900">{user.name}</h4>
            <p className="text-blue-800 font-mono font-semibold">{user.admissionNo}</p>
            <p className="text-slate-500 text-[11px] mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="text-slate-500 font-medium block">Department / Program</span>
            <strong className="text-slate-900 text-xs">{user.cohort}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="text-slate-500 font-medium block">Current Semester</span>
            <strong className="text-slate-900 text-xs">{user.semester}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="text-slate-500 font-medium block">Registration Status</span>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
              {user.isRegistered ? 'OFFICIALLY REGISTERED' : 'PENDING'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="text-slate-500 font-medium block">Financial Clearance</span>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
              {user.isCleared ? '100% CLEARED (0 BALANCE)' : 'FEES DUE'}
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => alert('Profile verified with KMTC Student Portal Database.')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Verify Records
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

/* 8. COURSE & SEMESTER REGISTRATION MODAL */
export const RegistrationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}> = ({ isOpen, onClose, user }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Semester Course Registration"
      subtitle={`${user.semester} • Unit Enrollment Portal`}
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
          <div>
            <div className="text-emerald-900 font-bold text-sm">Registration Status: Approved</div>
            <p className="text-emerald-700 text-xs mt-0.5">All 5 core units for this term are registered.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
            Active
          </span>
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Enrolled Units</h5>
          {[
            { code: 'PT 201', name: 'Clinical Biomechanics & Gait Analysis', units: 3 },
            { code: 'PT 204', name: 'Electrotherapy Principles & Waveforms', units: 3 },
            { code: 'PT 207', name: 'Orthopaedic Rehabilitation & Lower Extremity Assessment', units: 4 },
            { code: 'PT 209', name: 'Clinical Placement & Hospital Ward Rounds', units: 4 },
            { code: 'PT 211', name: 'Medical Pathology & Ergonomics', units: 2 },
          ].map((u) => (
            <div key={u.code} className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
              <div>
                <strong className="text-slate-900 font-mono mr-2">{u.code}</strong>
                <span className="text-slate-700 font-medium">{u.name}</span>
              </div>
              <span className="text-slate-500 font-mono text-[11px]">{u.units} Credit Hrs</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-slate-500">Total Credit Hours: <strong>16 Units</strong></span>
          <button
            onClick={() => alert('Official Registration Slip downloaded.')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download Registration Slip
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

/* 9. ACADEMIC CALENDAR MODAL */
export const CalendarModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Academic Calendar & Important Dates"
      subtitle="Current Academic Year Schedule"
    >
      <div className="space-y-3 text-xs">
        {[
          { date: '15 Jan 2026', title: 'Term 1 Commencement & Orientation', tag: 'Academic', color: 'bg-blue-100 text-blue-800' },
          { date: '28 Feb 2026', title: 'Continuous Assessment Tests (CAT 1)', tag: 'Exams', color: 'bg-purple-100 text-purple-800' },
          { date: '15 Mar 2026', title: 'Fee Clearance Deadline for Exams', tag: 'Finance', color: 'bg-rose-100 text-rose-800' },
          { date: '04 Apr 2026', title: 'End of Term Practical & Theory Examinations', tag: 'Exams', color: 'bg-purple-100 text-purple-800' },
          { date: '25 Apr 2026', title: 'Release of Term Results & Examination Board Meeting', tag: 'Results', color: 'bg-emerald-100 text-emerald-800' },
          { date: '02 May 2026', title: 'Supplementary & Special Examinations Window', tag: 'Special', color: 'bg-amber-100 text-amber-800' },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between gap-3">
            <div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.color}`}>
                {item.tag}
              </span>
              <h5 className="font-bold text-slate-900 mt-1">{item.title}</h5>
            </div>
            <span className="font-mono text-slate-500 font-bold shrink-0">{item.date}</span>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

/* 10. SUPPLEMENTARY & SPECIAL EXAMS MODAL */
export const SuppSpecialModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Supplementary & Special Examinations"
      subtitle="Official Examination Board Clearing Desk"
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
          <div>
            <div className="text-emerald-900 font-bold text-sm">Status: Good Academic Standing</div>
            <p className="text-emerald-700 text-xs mt-0.5">You have NO pending supplementary or retake examinations.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px]">
            0 Supps
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border space-y-2">
          <h5 className="font-bold text-slate-900 text-xs">Special Examination Requests</h5>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Students who missed examinations due to documented medical emergencies or compassionate reasons may apply for Special Examinations through the HOD office before the published deadline.
          </p>
          <div className="pt-2">
            <button
              onClick={() => alert('Special exam application initiated.')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
            >
              Apply for Special Exam
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
