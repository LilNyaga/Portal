import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Building, 
  AlertCircle, 
  Copy, 
  Check 
} from 'lucide-react';
import { UserProfile } from '../../types';

export const HowToPayPage: React.FC<{
  user?: UserProfile;
  balance?: number;
  onBack: () => void;
}> = ({ user, onBack }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const studentAdmission = user?.admissionNo || 'PT/2024/048';

  return (
    <div className="w-full space-y-4 animate-fadeIn">
      {/* 1. TOP HEADER - AT THE VERY START OF THE PAGE (NO OUTER BOX CONTAINER) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E5D7BF] gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-[#6f1825] hover:bg-[#F3E6C3] transition-colors cursor-pointer select-none shrink-0"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              How to Pay Fees • Official Payment Channels
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              KMTC Directorate of Finance & Student Accounts • Approved Payment Guidelines
            </p>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY CHANNEL: SAFARICOM M-PESA (DULL WHITE & CREAM THEMED) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FCFBF9] to-[#F8F3EA] border border-[#E6D9C3] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#EFE5D3]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Option 1: Safaricom M-Pesa Paybill (Instant Automated Reconciliation)
              </h3>
              <p className="text-[11px] text-stone-600">
                Official Kenya Medical Training College Paybill • 24/7 Real-Time Ledger Sync
              </p>
            </div>
          </div>
        </div>

        {/* Quick Copy Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5D7BF] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Business / Paybill Number
              </span>
              <span className="font-mono font-black text-2xl text-slate-900 tracking-wider">964150</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('964150', 'paybill')}
              className="px-3.5 py-2 rounded-xl bg-[#6f1825] hover:bg-[#58131e] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedKey === 'paybill' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'paybill' ? 'Copied' : 'Copy Paybill'}</span>
            </button>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5D7BF] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Account Number (Your Admission No)
              </span>
              <span className="font-mono font-black text-2xl text-slate-900 tracking-wider">{studentAdmission}</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(studentAdmission, 'acc')}
              className="px-3.5 py-2 rounded-xl bg-[#6f1825] hover:bg-[#58131e] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedKey === 'acc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'acc' ? 'Copied' : 'Copy Account'}</span>
            </button>
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="bg-white/90 p-4 sm:p-5 rounded-xl border border-[#E5D7BF] space-y-2.5">
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Step-by-Step M-Pesa Payment Instructions
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-stone-700 text-xs sm:text-sm leading-relaxed">
            <li>Go to the <strong>M-Pesa Menu</strong> on your phone (or open the <strong>M-Pesa App</strong>).</li>
            <li>Select <strong>Lipa na M-Pesa</strong> &gt; Select <strong>Pay Bill</strong>.</li>
            <li>Enter Business Number: <strong className="font-mono text-slate-900 bg-[#F3E6C3] px-2 py-0.5 rounded font-bold">964150</strong></li>
            <li>Enter Account Number: <strong className="font-mono text-slate-900 bg-[#F3E6C3] px-2 py-0.5 rounded font-bold">{studentAdmission}</strong></li>
            <li>Enter the <strong>Amount</strong> you are paying for tuition or institutional fee.</li>
            <li>Enter your <strong>M-Pesa PIN</strong> and press Send to complete payment.</li>
            <li>You will receive an official Safaricom confirmation SMS. Your portal fee statement reflects the payment automatically.</li>
          </ol>
        </div>
      </div>

      {/* 4. SECONDARY CHANNEL: DIRECT BANK DEPOSIT (DULL WHITE & CREAM) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FCFBF9] to-[#F7F2E8] border border-[#E6D9C3] space-y-4 shadow-2xs">
        <div className="flex items-center gap-3 pb-3 border-b border-[#EFE5D3]">
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-200 flex items-center justify-center shadow-xs shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base">
              Option 2: Direct Bank Deposit / EFT / RTGS Transfer
            </h3>
            <p className="text-[11px] text-stone-600">
              Institutional KMTC Accounts at National Bank of Kenya & Co-operative Bank
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* NBK */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5D7BF] space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFE5D3]">
              <strong className="text-slate-900 font-black text-sm">National Bank of Kenya (NBK)</strong>
              <span className="text-[10px] font-bold text-stone-600 bg-[#F3E6C3] px-2.5 py-0.5 rounded-full">
                Nyeri Branch
              </span>
            </div>
            <div className="space-y-1.5 text-stone-700 text-xs">
              <div>Account Name: <strong className="text-slate-900">Kenya Medical Training College</strong></div>
              <div className="flex items-center justify-between">
                <span>Account Number: <strong className="font-mono text-slate-900 font-bold">01003086514000</strong></span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('01003086514000', 'nbk')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-[#DFCBA0] text-stone-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'nbk' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'nbk' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div>Swift Code: <strong className="font-mono text-slate-900">NBKEKENX</strong></div>
              <div>Deposit Reference: <strong className="font-mono text-[#6f1825] font-bold">{studentAdmission}</strong></div>
            </div>
          </div>

          {/* Co-op Bank */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E5D7BF] space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFE5D3]">
              <strong className="text-slate-900 font-black text-sm">Co-operative Bank of Kenya</strong>
              <span className="text-[10px] font-bold text-stone-600 bg-[#F3E6C3] px-2.5 py-0.5 rounded-full">
                Main Branch
              </span>
            </div>
            <div className="space-y-1.5 text-stone-700 text-xs">
              <div>Account Name: <strong className="text-slate-900">Kenya Medical Training College</strong></div>
              <div className="flex items-center justify-between">
                <span>Account Number: <strong className="font-mono text-slate-900 font-bold">01129038201000</strong></span>
                <button
                  type="button"
                  onClick={() => copyToClipboard('01129038201000', 'coop')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-[#DFCBA0] text-stone-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'coop' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'coop' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div>Swift Code: <strong className="font-mono text-slate-900">KCOO KENX</strong></div>
              <div>Deposit Reference: <strong className="font-mono text-[#6f1825] font-bold">{studentAdmission}</strong></div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-stone-600 italic">
          * For bank counter deposits, present the original stamped bank slip at the KMTC Nyeri Accounts Office for validation or retain your payment receipt for semester clearance.
        </p>
      </div>

      {/* 5. PAYMENT REGULATIONS & NOTICE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF4E6] border border-[#E5D7B7] text-stone-800 space-y-2">
        <h4 className="font-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#6f1825]">
          <AlertCircle className="w-4 h-4 text-[#6f1825]" /> Important Institutional Payment Regulations:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-xs text-stone-700">
          <li><strong>NO CASH PAYMENTS</strong> are accepted at any college campus or finance office. All payments must be channeled via M-Pesa or approved bank accounts.</li>
          <li>Always verify the Paybill number (<strong>964150</strong>) and your exact student Admission Number (<strong>{studentAdmission}</strong>) before confirming any transaction.</li>
          <li>Fees must be cleared before the official registration deadline to enable course unit enrollment and examination card generation.</li>
        </ul>
      </div>
    </div>
  );
};
