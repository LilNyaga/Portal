import React from 'react';
import { 
  User, 
  Clock, 
  BarChart3, 
  ClipboardCheck, 
  CreditCard, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';

export type QuickTileModal = 
  | 'profile'
  | 'timetable'
  | 'grades'
  | 'registration'
  | 'fees'
  | 'calendar'
  | 'supp';

interface QuickActionTilesProps {
  onOpenModal: (modalName: QuickTileModal | any) => void;
  gpa?: number;
  balance?: number;
  hostelRoom?: string;
}

export const QuickActionTiles: React.FC<QuickActionTilesProps> = ({
  onOpenModal,
  gpa = 3.68,
  balance = 0,
}) => {
  const tiles: {
    id: QuickTileModal;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
    actionText: string;
  }[] = [
    {
      id: 'profile',
      title: 'Profile Direct',
      subtitle: 'View biodata, admission & status',
      icon: <User className="w-5 h-5 text-blue-700" />,
      iconBg: 'bg-blue-100',
      actionText: 'View Profile →',
    },
    {
      id: 'timetable',
      title: 'Timetable',
      subtitle: 'Class periods, labs & rooms',
      icon: <Clock className="w-5 h-5 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      actionText: 'View Schedule →',
    },
    {
      id: 'grades',
      title: 'Results',
      subtitle: `GPA: ${gpa.toFixed(2)} • Term grades`,
      icon: <BarChart3 className="w-5 h-5 text-purple-700" />,
      iconBg: 'bg-purple-100',
      actionText: 'Check Results →',
    },
    {
      id: 'registration',
      title: 'Registration',
      subtitle: 'Semester unit & course enrollment',
      icon: <ClipboardCheck className="w-5 h-5 text-teal-700" />,
      iconBg: 'bg-teal-100',
      actionText: 'Manage Units →',
    },
    {
      id: 'fees',
      title: 'Fee Statements',
      subtitle: `Balance: KES ${balance.toFixed(2)}`,
      icon: <CreditCard className="w-5 h-5 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      actionText: 'View Statement →',
    },
    {
      id: 'calendar',
      title: 'Calendar',
      subtitle: 'Term dates, exams & schedule',
      icon: <Calendar className="w-5 h-5 text-amber-700" />,
      iconBg: 'bg-amber-100',
      actionText: 'Open Calendar →',
    },
    {
      id: 'supp',
      title: 'Supp / Special',
      subtitle: 'Retakes & special exams window',
      icon: <AlertCircle className="w-5 h-5 text-rose-700" />,
      iconBg: 'bg-rose-100',
      actionText: 'Check Status →',
    },
  ];

  const handleTileClick = (id: QuickTileModal) => {
    if (id === 'timetable') {
      const el = document.getElementById('timetable-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onOpenModal(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
          Quick Access
        </h2>
        <span className="text-xs text-slate-400">Click any service to view details</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            className="bg-white border border-slate-200/90 hover:border-blue-500 p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[175px]"
          >
            <div>
              <div className="mb-3.5">
                <div className={`w-11 h-11 rounded-2xl ${tile.iconBg} font-bold flex items-center justify-center text-lg group-hover:scale-105 transition-transform shadow-xs`}>
                  {tile.icon}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                {tile.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {tile.subtitle}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>{tile.actionText}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
