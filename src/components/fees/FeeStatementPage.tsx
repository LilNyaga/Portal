import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { FeeStatement } from '../../types';

export const FeesPage: React.FC<{
  feeStatement: FeeStatement;
  onBack: () => void;
}> = ({ feeStatement, onBack }) => {
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
    <div className="w-full pt-2 sm:pt-4 bg-[#FAF6EE] text-slate-800">
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
          <div>
            <h2 className="font-black text-xl sm:text-2xl text-slate-900 leading-tight">
              Fee Statement
            </h2>
          </div>
        </div>

      </div>

      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-left">
          <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">Total Invoices</span>
            <div className="mt-2 text-xl font-black text-slate-900">{totalInvoicesCount}</div>
            <div className="mt-1 text-[10px] text-slate-500 font-mono">Billed: KES {feeStatement.totalInvoiced.toLocaleString()}</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-200">
            <span className="text-[10px] uppercase tracking-wider text-emerald-800 block font-bold">Payments</span>
            <div className="mt-2 text-xl font-black text-emerald-700">KES {feeStatement.totalPaid.toLocaleString()}</div>
            <div className="mt-1 text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> {totalPaymentsCount} Reconciled
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">Current Balance</span>
            <div className="mt-2 text-xl font-black text-slate-900">KES {feeStatement.balance.toFixed(2)}</div>
            <div className="mt-1 text-[10px] text-emerald-700 font-bold">Zero Due</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-100/80 border border-amber-200">
            <span className="text-[10px] uppercase tracking-wider text-amber-900 block font-bold">Last Payment</span>
            <div className="mt-2 text-lg font-black text-amber-950">
              {lastPayment ? `KES ${lastPayment.amount.toLocaleString()}` : 'N/A'}
            </div>
            <div className="mt-1 text-[10px] text-amber-900 font-mono">
              {lastPayment ? `${lastPayment.date}` : 'No payments yet'}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs bg-transparent">
            <thead>
              <tr className="bg-[#FAF2DE] text-slate-800 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4 border border-slate-200 text-center w-10">#</th>
                <th className="py-3 px-4 border border-slate-200">Date</th>
                <th className="py-3 px-4 border border-slate-200">Description</th>
                <th className="py-3 px-4 border border-slate-200">Reference</th>
                <th className="py-3 px-4 border border-slate-200 text-right">Invoice</th>
                <th className="py-3 px-4 border border-slate-200 text-right">Payment</th>
                <th className="py-3 px-4 border border-slate-200 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactionsWithBalance.map((row) => (
                <tr
                  key={row.id}
                  className={`align-middle ${row.isPayment ? 'bg-emerald-50/30' : 'bg-white/40'}`}
                >
                  <td className="py-3 px-4 border border-slate-200 text-center font-bold text-slate-500">{row.index}</td>
                  <td className="py-3 px-4 border border-slate-200 font-mono text-slate-600">{row.date}</td>
                  <td className="py-3 px-4 border border-slate-200 font-bold text-slate-900">{row.description}</td>
                  <td className="py-3 px-4 border border-slate-200 font-mono text-slate-500">{row.reference}</td>
                  <td className="py-3 px-4 border border-slate-200 text-right font-mono font-bold text-slate-900">
                    {!row.isPayment ? `KES ${row.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="py-3 px-4 border border-slate-200 text-right font-mono font-black text-emerald-700">
                    {row.isPayment ? `KES ${row.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="py-3 px-4 border border-slate-200 text-right font-mono font-bold text-slate-700">
                    KES {row.balanceAfter.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#F7EFE2] font-black text-xs text-slate-900 border-t-2 border-slate-200">
                <td colSpan={4} className="py-3 px-4 uppercase tracking-wider text-slate-700">
                  Total Summary
                </td>
                <td className="py-3 px-4 text-right font-mono">KES {feeStatement.totalInvoiced.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-700">
                  KES {feeStatement.totalPaid.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono text-emerald-800">
                  KES {feeStatement.balance.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </div>
  );
};
