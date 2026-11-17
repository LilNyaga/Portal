import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';

export const ManualGuidePage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const steps = [
    {
      title: '1. Access your dashboard',
      description: 'The dashboard gives you a quick summary of your academic standings, fees, hostel status, and key student actions.',
    },
    {
      title: '2. Navigate from the left menu',
      description: 'Use the sidebar to move through registration, exams, finance, resources, and student services without leaving the portal.',
    },
    {
      title: '3. Open service pages',
      description: 'Each section opens a dedicated page where you can view details, submit requests, or check your record status.',
    },
    {
      title: '4. Get help when needed',
      description: 'If something is not clear or a page is not working, open the Help option and send a support message directly.',
    },
  ];

  return (
    <div className="w-full pt-2 sm:pt-4">
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
          <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">Portal Manual</h2>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E8D4A0] bg-[#FAF2DE] p-4 sm:p-6 shadow-sm">
        <div className="space-y-4 rounded-2xl border border-[#E5D7B0] bg-[#FFFDF8] p-4 shadow-xs">
          <div className="rounded-2xl bg-gradient-to-r from-[#6f1825] to-[#7f1f2d] text-white p-5 shadow-sm">
            <h3 className="text-base sm:text-lg font-black">Student Portal Overview</h3>
            <p className="mt-2 text-amber-100 text-xs sm:text-sm">
              This portal helps students manage fees, academic records, registrations, timetable access, support requests, and daily student services from one place.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.title} className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#6f1825] text-white font-black text-xs shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-slate-600 text-xs leading-5">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HelpSupportPage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    issueType: 'Portal Access',
    subject: '',
    message: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const emailTo = 'ictsupport.nyeri@kmtc.ac.ke';
    const mailSubject = form.subject || `${form.issueType}: Student Issue`;
    const mailBody = [
      'Student Name: ' + (form.name || 'N/A'),
      'Email: ' + (form.email || 'N/A'),
      'Issue Type: ' + form.issueType,
      '',
      'Issue Details:',
      form.message || 'No details provided.',
    ].join('\n');

    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  return (
    <div className="w-full pt-2 sm:pt-4">
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
          <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">Help</h2>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E8D4A0] bg-[#FAF2DE] p-4 sm:p-6 shadow-sm">
        <div className="space-y-4 rounded-2xl border border-[#E5D7B0] bg-[#FFFDF8] p-4 shadow-xs">
          <div className="flex items-center gap-3 rounded-2xl bg-[#6f1825] px-4 py-3 text-white shadow-sm">
            <div className="rounded-xl bg-white/10 p-2">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-200">Support Desk</div>
              <div className="text-sm font-bold">Submit your issue</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600">
                Full name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#6f1825] focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600">
                Email address
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#6f1825] focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600">
                Issue type
                <select
                  value={form.issueType}
                  onChange={(e) => handleChange('issueType', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#6f1825] focus:outline-none"
                >
                  <option>Portal Access</option>
                  <option>Fees / Payment</option>
                  <option>Exam Results</option>
                  <option>Registration</option>
                  <option>Hostel / Accommodation</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600">
                Subject
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:border-[#6f1825] focus:outline-none"
                  placeholder="Brief summary"
                  required
                />
              </label>
            </div>

            <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Description of issue
              <textarea
                rows={7}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 focus:border-[#6f1825] focus:outline-none resize-none"
                placeholder="Describe the problem, page, date, and any error message..."
                required
              />
            </label>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6f1825] px-5 py-2.5 text-sm font-black text-white hover:bg-[#55141d] transition-colors"
              >
                <Mail className="w-4 h-4" /> Submit via Gmail
              </button>
              <div className="text-[11px] text-slate-500 self-center">
                Opens your default mail app with a Gmail-style compose message.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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
