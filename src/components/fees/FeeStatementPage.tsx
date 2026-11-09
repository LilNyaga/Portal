import React from 'react';
import { CheckCircle2, Download } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import { FeeStatement } from '../../types';

export const FeesPage: React.FC<{
  feeStatement: FeeStatement;
  onBack: () => void;
  onOpenHowToPay: () => void;
}> = ({ feeStatement, onBack, onOpenHowToPay }) => {
  const invoices = feeStatement.transactions.filter((tx) => !tx.isPayment);
  const payments = feeStatement.transactions.filter((tx) => tx.isPayment);
  const totalInvoicesCount = invoices.length;
  const totalPaymentsCount = payments.length;
  const lastPayment = payments.length > 0 ? payments[payments.length - 1] : null;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
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

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Programme Cost
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Diploma in Physiotherapy
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Amount to Pay
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#6f1825] mt-0.5">
                KES {feeStatement.balance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="text-slate-600">
              M-Pesa Paybill: <strong className="font-mono">{feeStatement.mpesaPaybill}</strong>
            </div>
            <button
              onClick={onOpenHowToPay}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-[#6f1825] font-black rounded-xl text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              How to Pay →
            </button>
          </div>
        </div>

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
