import React from 'react';
import { Download } from 'lucide-react';
import { ResourceNote } from '../../types';
import { PageWrapper } from '../shared/PageWrapper';

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
