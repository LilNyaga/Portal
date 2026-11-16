import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Printer, 
  QrCode, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  PlusCircle, 
  Check, 
  Info
} from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import { SuppSpecialExam, SuppSpecialExamType, UserProfile } from '../../types';

interface SuppSpecialPageProps {
  exams: SuppSpecialExam[];
  user?: UserProfile;
  onBack: () => void;
  onAddExam?: (newExam: SuppSpecialExam) => void;
}

export const SuppSpecialPage: React.FC<SuppSpecialPageProps> = ({
  exams: initialExams,
  user,
  onBack,
  onAddExam,
}) => {
  const [exams, setExams] = useState<SuppSpecialExam[]>(initialExams);
  const [filterType, setFilterType] = useState<'all' | 'Supplementary' | 'Special' | 'Completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamSlip, setSelectedExamSlip] = useState<SuppSpecialExam | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Form state for applying
  const [formUnitCode, setFormUnitCode] = useState('');
  const [formUnitName, setFormUnitName] = useState('');
  const [formExamType, setFormExamType] = useState<SuppSpecialExamType>('Special');
  const [formReason, setFormReason] = useState('');
  const [formSemester, setFormSemester] = useState('Year 2 • Semester 1');

  // Keep local exams in sync if props change
  React.useEffect(() => {
    setExams(initialExams);
  }, [initialExams]);

  const suppCount = exams.filter((e) => e.examType === 'Supplementary').length;
  const specialCount = exams.filter((e) => e.examType === 'Special').length;
  const scheduledCount = exams.filter((e) => e.status !== 'Completed').length;

  const filteredExams = exams.filter((exam) => {
    if (filterType === 'Supplementary' && exam.examType !== 'Supplementary') return false;
    if (filterType === 'Special' && exam.examType !== 'Special') return false;
    if (filterType === 'Completed' && exam.status !== 'Completed') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        exam.unitCode.toLowerCase().includes(q) ||
        exam.unitName.toLowerCase().includes(q) ||
        exam.venue.toLowerCase().includes(q) ||
        (exam.lecturer && exam.lecturer.toLowerCase().includes(q)) ||
        exam.academicYear.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUnitCode.trim() || !formUnitName.trim() || !formReason.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const newExam: SuppSpecialExam = {
      id: `supp_${Date.now()}`,
      unitCode: formUnitCode.trim().toUpperCase(),
      unitName: formUnitName.trim(),
      academicYear: '2025/2026',
      semester: formSemester,
      examType: formExamType,
      examDate: '12 May 2026',
      examTime: '09:00 AM - 12:00 PM',
      venue: 'Main Examination Hall A',
      seatNumber: `Seat ${Math.floor(Math.random() * 50) + 1}`,
      status: 'Pending Clearance',
      reason: formReason.trim(),
      fee: formExamType === 'Supplementary' ? 1000 : 0,
      feeStatus: formExamType === 'Supplementary' ? 'Pending' : 'Waived',
      lecturer: 'Department Examination Board',
      paperCode: `EXAM/2026/${formExamType === 'Special' ? 'SP' : 'SUPP'}-${formUnitCode.trim().toUpperCase()}`,
    };

    setExams((prev) => [newExam, ...prev]);
    if (onAddExam) onAddExam(newExam);

    setIsApplyModalOpen(false);
    setFormUnitCode('');
    setFormUnitName('');
    setFormReason('');
    alert(`Application submitted successfully for ${newExam.unitCode} (${newExam.examType} Examination).\nDocket issued for Examination Board approval.`);
  };

  return (
    <PageWrapper
      onBack={onBack}
      title="Supplementary & Special Examinations Clearance Desk"
      subtitle="KMTC Directorate of Examinations • Official Examination Series & Candidate Clearances"
      badge={
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-[11px] flex items-center gap-1.5 shadow-2xs">
            <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
            Examination Board Cleared
          </span>
        </div>
      }
    >
      <div className="space-y-5 text-xs text-black">
        {/* TOP SUMMARY STAT METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Total Listed Exams
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {exams.length}{' '}
              <span className="text-xs font-semibold text-slate-500">Papers</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              {scheduledCount} upcoming scheduled
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
              Supplementary Exams
            </span>
            <div className="text-2xl font-black text-amber-900 mt-1">
              {suppCount}{' '}
              <span className="text-xs font-semibold text-amber-700">Papers</span>
            </div>
            <div className="mt-2 text-[11px] text-amber-700">
              KES 1,000 / paper retake fee
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-800">
              Special Examinations
            </span>
            <div className="text-2xl font-black text-sky-900 mt-1">
              {specialCount}{' '}
              <span className="text-xs font-semibold text-sky-700">Approved</span>
            </div>
            <div className="mt-2 text-[11px] text-sky-700">
              Medical / Compassionate waive
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Clearance Standing
            </span>
            <div className="text-xl font-black text-emerald-900 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              100% Eligible
            </div>
            <div className="mt-2 text-[11px] text-emerald-700 font-semibold">
              Registry & Accounts Cleared
            </div>
          </div>
        </div>

        {/* SEARCH, FILTERS & ACTION CONTROLS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 cursor-pointer ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Exams ({exams.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('Supplementary')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 cursor-pointer ${
                filterType === 'Supplementary'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              Supplementary ({suppCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('Special')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 cursor-pointer ${
                filterType === 'Special'
                  ? 'bg-sky-700 text-white shadow-2xs'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200'
              }`}
            >
              Special Exams ({specialCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('Completed')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 cursor-pointer ${
                filterType === 'Completed'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Search bar & Apply Button */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search unit code or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6f1825]/30 focus:border-[#6f1825]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#6f1825] hover:bg-[#5a131e] text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Apply for Exam</span>
            </button>
          </div>
        </div>

        {/* CORE TABLE: SUPPLEMENTARY & SPECIAL EXAMS */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Supplementary & Special Examinations Registry
              </h3>
              <p className="text-[11px] text-slate-500">
                Official backend datastore records of scheduled retakes, special exam sittings, venues, and admission dockets.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              Showing {filteredExams.length} of {exams.length} examinations
            </span>
          </div>

          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-black font-extrabold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Unit Code</th>
                  <th className="py-3 px-4">Unit Title & Course</th>
                  <th className="py-3 px-4">Exam Type</th>
                  <th className="py-3 px-4">Academic Semester</th>
                  <th className="py-3 px-4">Exam Schedule & Venue</th>
                  <th className="py-3 px-4">Status & Fee</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam, index) => {
                    const isSupp = exam.examType === 'Supplementary';
                    const isCompleted = exam.status === 'Completed';

                    return (
                      <tr
                        key={exam.id}
                        className={`transition-colors hover:bg-slate-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 font-bold text-slate-500">
                          {index + 1}
                        </td>

                        {/* Unit Code */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            {exam.unitCode}
                          </span>
                        </td>

                        {/* Unit Title */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-slate-900 leading-snug">
                            {exam.unitName}
                          </div>
                          {exam.lecturer && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Examiner: {exam.lecturer}
                            </div>
                          )}
                          {exam.reason && (
                            <div className="text-[10px] text-slate-400 italic line-clamp-1 mt-0.5">
                              Note: {exam.reason}
                            </div>
                          )}
                        </td>

                        {/* Exam Type Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {isSupp ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                              Supplementary
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-sky-100 text-sky-900 border border-sky-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                              Special Exam
                            </span>
                          )}
                        </td>

                        {/* Academic Semester */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">{exam.semester}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {exam.academicYear}
                          </div>
                        </td>

                        {/* Exam Schedule & Venue */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{exam.examDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{exam.examTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600 text-[11px] mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span>
                              {exam.venue} {exam.seatNumber ? `• ${exam.seatNumber}` : ''}
                            </span>
                          </div>
                        </td>

                        {/* Status & Fee */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="mb-1">
                            {isCompleted ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-300">
                                Completed
                              </span>
                            ) : exam.status === 'Approved' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Approved
                              </span>
                            ) : exam.status === 'Scheduled' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300">
                                Scheduled
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                                {exam.status}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-medium text-slate-600">
                            {exam.fee > 0 ? (
                              <span className={exam.feeStatus === 'Paid' ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                                KES {exam.fee.toLocaleString()} ({exam.feeStatus})
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">Waived / Free</span>
                            )}
                          </div>
                        </td>

                        {/* Action: View Exam Slip */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedExamSlip(exam)}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] text-sky-900 bg-sky-100 hover:bg-sky-200 border border-sky-200 transition-colors shadow-2xs cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Exam Slip</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 px-4 text-center text-slate-500 bg-white">
                      <div className="max-w-sm mx-auto space-y-2">
                        <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
                        <div className="font-bold text-slate-700 text-sm">
                          No Examinations Match Your Criteria
                        </div>
                        <p className="text-slate-500 text-xs">
                          {searchQuery
                            ? `No records found matching "${searchQuery}". Try clearing search.`
                            : 'There are currently no supplementary or special examinations under this category.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SPECIAL EXAM REQUEST NOTIFICATION DESK */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-700 shrink-0" />
            <h4 className="font-extrabold text-slate-900 text-sm">
              KMTC Examination Board Guidelines & Clearance Notice
            </h4>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs">
            1. <strong>Supplementary Examinations:</strong> Students scoring below 50% in any continuous assessment or final module examination are scheduled for supplementary examination during the official college examination window. A statutory fee of KES 1,000 per paper applies.<br />
            2. <strong>Special Examinations:</strong> Candidates who miss end-of-term examinations due to certified medical reasons, official college duty, or proven bereavement must provide documentation cleared by the Campus Principal or Hospital Superintendent. Special examinations carry no extra fee penalty.<br />
            3. <strong>Exam Pass:</strong> Admission to the exam hall requires this printed official slip along with your original KMTC Student Identity Card.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
            <span className="text-slate-500 text-xs font-semibold">
              Directorate of Examinations • KMTC Nyeri Campus Desk
            </span>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              Submit New Exam Application
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: OFFICIAL EXAMINATION SLIP / DOCKET */}
      {selectedExamSlip && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-2 border-sky-300 my-auto space-y-5 animate-fadeIn text-slate-900">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#6f1825] text-amber-300 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                  PT
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                    Kenya Medical Training College
                  </h3>
                  <p className="text-[11px] text-slate-600 font-bold">
                    Nyeri Campus • Department of Physiotherapy
                  </p>
                  <p className="text-[10px] text-rose-800 font-extrabold uppercase">
                    Official {selectedExamSlip.examType} Admission Docket
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExamSlip(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate & Paper Verification Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Candidate Name</span>
                <strong className="text-slate-900 font-extrabold">{user?.name || 'Lemayian'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Admission Number</span>
                <strong className="font-mono text-slate-900 font-extrabold">{user?.admissionNo || 'PT/2024/048'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Academic Cohort</span>
                <strong className="text-slate-900">{user?.cohort || 'Diploma in Physiotherapy'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Paper Code</span>
                <strong className="font-mono text-rose-800">{selectedExamSlip.paperCode || 'EXAM-2026-DOCK'}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Sitting Category</span>
                <span className="font-extrabold text-slate-900">{selectedExamSlip.examType} Examination</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Board Clearance</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Cleared & Validated
                </span>
              </div>
            </div>

            {/* Examination Time & Venue Detail */}
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 space-y-2 bg-white">
              <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                Unit & Schedule Information
              </div>
              <div className="font-extrabold text-base text-slate-900">
                {selectedExamSlip.unitCode} — {selectedExamSlip.unitName}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span><strong>Date:</strong> {selectedExamSlip.examDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span><strong>Time:</strong> {selectedExamSlip.examTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span><strong>Venue:</strong> {selectedExamSlip.venue}</span>
                </div>
              </div>

              {selectedExamSlip.seatNumber && (
                <div className="pt-2 text-xs font-semibold text-slate-600">
                  Assigned Candidate Position: <span className="font-mono font-bold text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">{selectedExamSlip.seatNumber}</span>
                </div>
              )}
            </div>

            {/* QR Code and Validation Footnote */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  <div className="font-bold text-slate-900">KMTC Security Barcode & QR Verification</div>
                  <div>Verify at exam entrance with Chief Invigilator.</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                    ID: {selectedExamSlip.id} • HASH: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2 bg-[#6f1825] hover:bg-[#5a131e] text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedExamSlip(null)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: APPLY FOR SPECIAL / SUPPLEMENTARY EXAMINATION */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 my-auto space-y-4 animate-fadeIn text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Apply for Examination Sitting
                </h3>
                <p className="text-[11px] text-slate-500">
                  Submit request to KMTC Departmental Examination Board
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Examination Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormExamType('Special')}
                    className={`py-2 px-3 rounded-xl font-bold border text-xs text-center transition-all ${
                      formExamType === 'Special'
                        ? 'bg-sky-100 border-sky-400 text-sky-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Special Exam (Medical/Conflict)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormExamType('Supplementary')}
                    className={`py-2 px-3 rounded-xl font-bold border text-xs text-center transition-all ${
                      formExamType === 'Supplementary'
                        ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Supplementary (Retake)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Unit Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PT 205"
                  value={formUnitCode}
                  onChange={(e) => setFormUnitCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono uppercase text-xs focus:outline-none focus:ring-2 focus:ring-[#6f1825]/30 focus:border-[#6f1825]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Unit Name / Course Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical Kinesiology & Posture"
                  value={formUnitName}
                  onChange={(e) => setFormUnitName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6f1825]/30 focus:border-[#6f1825]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Semester Stage
                </label>
                <select
                  value={formSemester}
                  onChange={(e) => setFormSemester(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6f1825]/30 focus:border-[#6f1825]"
                >
                  <option value="Year 2 • Semester 1">Year 2 • Semester 1 (Current Session)</option>
                  <option value="Year 1 • Semester 3">Year 1 • Semester 3</option>
                  <option value="Year 1 • Semester 2">Year 1 • Semester 2</option>
                  <option value="Year 1 • Semester 1">Year 1 • Semester 1</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Reason / Grounds for Application <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    formExamType === 'Special'
                      ? 'Explain hospital medical emergency, clinical duty conflict, or compassionate grounds...'
                      : 'State continuous assessment retake reason or paper resit request...'
                  }
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6f1825]/30 focus:border-[#6f1825]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6f1825] hover:bg-[#5a131e] text-white font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};
