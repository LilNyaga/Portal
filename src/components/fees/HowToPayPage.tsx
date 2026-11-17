import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Building, 
  AlertCircle 
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
          <div>
            <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              How to Pay Fees
            </h2>
            <p className="text-[11px] text-slate-600 mt-0.5">
              KMTC finance channels and payment instructions
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs bg-transparent">
            <thead>
              <tr className="bg-[#FAF2DE] text-slate-800 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4 border border-slate-200">Payment Channel</th>
                <th className="py-3 px-4 border border-slate-200">Details</th>
                <th className="py-3 px-4 border border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle bg-white/40">
                <td className="py-3 px-4 border border-slate-200 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white"><Smartphone className="w-4 h-4" /></span>
                    M-Pesa Paybill
                  </div>
                </td>
                <td className="py-3 px-4 border border-slate-200 text-slate-700">
                  <div className="space-y-1">
                    <div>Business Number: <span className="font-mono font-bold text-slate-900">964150</span></div>
                    <div>Account Number: <span className="font-mono font-bold text-slate-900">{studentAdmission}</span></div>
                  </div>
                </td>
                <td className="py-3 px-4 border border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={() => copyToClipboard('964150', 'paybill')}
                    className="px-3 py-1.5 rounded-lg bg-[#6f1825] text-white font-bold text-[11px] hover:bg-[#581620] transition-colors"
                  >
                    {copiedKey === 'paybill' ? 'Copied' : 'Copy'}
                  </button>
                </td>
              </tr>

              <tr className="align-middle bg-white/20">
                <td className="py-3 px-4 border border-slate-200 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-amber-200"><Building className="w-4 h-4" /></span>
                    Bank Deposit
                  </div>
                </td>
                <td className="py-3 px-4 border border-slate-200 text-slate-700">
                  <div className="space-y-1">
                    <div>NBK: <span className="font-mono font-bold text-slate-900">01003086514000</span></div>
                    <div>Co-op: <span className="font-mono font-bold text-slate-900">01129038201000</span></div>
                  </div>
                </td>
                <td className="py-3 px-4 border border-slate-200 text-center">
                  <button
                    type="button"
                    onClick={() => copyToClipboard('01003086514000', 'nbk')}
                    className="px-3 py-1.5 rounded-lg bg-[#6f1825] text-white font-bold text-[11px] hover:bg-[#581620] transition-colors"
                  >
                    {copiedKey === 'nbk' ? 'Copied' : 'Copy'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl border border-[#E5D7B7] bg-[#FAF4E6] text-stone-800">
          <h4 className="font-black text-xs uppercase tracking-wider text-[#6f1825] flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Payment Regulations
          </h4>
          <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-stone-700">
            <li>Always verify the Paybill number and account number before sending payment.</li>
            <li>Keep the M-Pesa or bank receipt for confirmation and record matching.</li>
            <li>Payments must be cleared before registration and exam processing can proceed.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
