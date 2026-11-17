import React, { useState } from 'react';
import { X } from 'lucide-react';
import { UserProfile } from '../types';
import { sidebarMeta, sidebarSections, sectionToggleIcon } from './sidebar/sidebarData';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserProfile;
  onOpenModal: (modalName: 'grades' | 'fees' | 'howToPay' | 'hostel' | 'revision' | 'contacts' | 'profile' | 'registration' | 'semesterStatus' | 'leaveDeferment' | 'readmission' | 'calendar' | 'supp' | 'timetable' | 'manualGuide' | 'helpSupport' | any) => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onOpenModal,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    finance: false,
    courses: false,
    registration: false,
    academics: false,
    hostel: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAction = (view: string) => {
    onOpenModal(view as any);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/65 backdrop-blur-md transition-all duration-300"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          title="Click to close sidebar"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-[#FAF2DE] z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-[#DFC494]/40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-[#FAF2DE] text-slate-900 p-5 flex items-center justify-between">
          <div>
            <h2 className="font-black text-lg text-slate-950 tracking-tight">{sidebarMeta.title}</h2>
            <p className="text-xs text-amber-950 font-extrabold uppercase tracking-wider">{sidebarMeta.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-[#F0E3BF] transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-[#FAF2DE]">
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            const hasItems = !!section.items?.length;

            return (
              <div key={section.id} className={`${section.id === 'manual' || section.id === 'help' ? 'space-y-1 pt-2' : 'space-y-1'}`}>
                <button
                  type="button"
                  onClick={() => {
                    if (hasItems) {
                      toggleSection(section.id);
                      return;
                    }
                    if (section.action) {
                      handleAction(section.action.view);
                    }
                  }}
                  className={`w-full flex ${hasItems ? 'items-center justify-between' : 'items-center'} px-3 py-2.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C3] active:bg-[#EBDCBA] text-slate-950 transition-colors cursor-pointer select-none`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-amber-900 stroke-[2.5]" />
                    <span className="font-black text-xs uppercase tracking-wider text-slate-950">
                      {section.title}
                    </span>
                  </div>
                  {hasItems && sectionToggleIcon(Boolean(openSections[section.id]))}
                </button>

                {hasItems && openSections[section.id] && (
                  <div className="ml-4 pl-3 space-y-1 py-1 transition-all">
                    {section.items?.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleAction(item.view)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F3E6C3] text-slate-800 font-semibold transition-colors block"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#FAF2DE] text-xs font-bold text-slate-800 flex items-center justify-between">
          <span>{sidebarMeta.footer.left}</span>
          <span className="font-semibold text-slate-600">{sidebarMeta.footer.right}</span>
        </div>
      </aside>
    </>
  );
};
