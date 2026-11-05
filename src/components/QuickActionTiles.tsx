import React from 'react';
import { 
  User, 
  Clock, 
  BarChart3, 
  ClipboardCheck, 
  CreditCard, 
  Calendar, 
  AlertCircle,
  Home
} from 'lucide-react';

export type QuickTileModal = 
  | 'profile'
  | 'timetable'
  | 'grades'
  | 'registration'
  | 'fees'
  | 'calendar'
  | 'supp'
  | 'hostel';

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
  hostelRoom = 'Block B (Rm 14)',
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
      subtitle: 'Biodata & admission info',
      icon: <User className="w-4 h-4 text-blue-700" />,
      iconBg: 'bg-blue-100',
      actionText: 'View Profile →',
    },
    {
      id: 'timetable',
      title: 'Timetable',
      subtitle: 'Class periods & lecture labs',
      icon: <Clock className="w-4 h-4 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      actionText: 'View Schedule →',
    },
    {
      id: 'grades',
      title: 'Exam Results',
      subtitle: `GPA: ${gpa.toFixed(2)} • Transcripts`,
      icon: <BarChart3 className="w-4 h-4 text-purple-700" />,
      iconBg: 'bg-purple-100',
      actionText: 'Check Results →',
    },
    {
      id: 'registration',
      title: 'Registration',
      subtitle: 'Semester unit enrollment',
      icon: <ClipboardCheck className="w-4 h-4 text-teal-700" />,
      iconBg: 'bg-teal-100',
      actionText: 'Manage Units →',
    },
    {
      id: 'fees',
      title: 'Fee Statement',
      subtitle: `Balance: KES ${balance.toFixed(2)}`,
      icon: <CreditCard className="w-4 h-4 text-emerald-700" />,
      iconBg: 'bg-emerald-100',
      actionText: 'View Statement →',
    },
    {
      id: 'hostel',
      title: 'Hostel Room',
      subtitle: hostelRoom,
      icon: <Home className="w-4 h-4 text-orange-700" />,
      iconBg: 'bg-orange-100',
      actionText: 'View Hostel →',
    },
    {
      id: 'calendar',
      title: 'Academic Calendar',
      subtitle: 'Term dates & exam windows',
      icon: <Calendar className="w-4 h-4 text-amber-700" />,
      iconBg: 'bg-amber-100',
      actionText: 'Open Calendar →',
    },
    {
      id: 'supp',
      title: 'Supp / Special',
      subtitle: 'Exam clearance & retakes',
      icon: <AlertCircle className="w-4 h-4 text-rose-700" />,
      iconBg: 'bg-rose-100',
      actionText: 'Check Status →',
    },
  ];

  const handleTileClick = (id: QuickTileModal) => {
    onOpenModal(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Quick Access Services
        </h2>
        <span className="text-[11px] text-slate-400">Select any tile to open details</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            className="bg-white border border-slate-200/90 hover:border-[#6f1825]/50 p-3.5 rounded-xl shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className={`w-8 h-8 rounded-lg ${tile.iconBg} font-bold flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs`}>
                  {tile.icon}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#6f1825] transition-colors leading-tight">
                {tile.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1">
                {tile.subtitle}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600 group-hover:text-[#6f1825] transition-colors">
              {tile.actionText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
