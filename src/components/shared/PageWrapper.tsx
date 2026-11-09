import React from 'react';
import { ArrowLeft } from 'lucide-react';

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

      <div className="space-y-4">{children}</div>
    </div>
  );
};
