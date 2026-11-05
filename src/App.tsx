import { useState } from 'react';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HeroStatus } from './components/HeroStatus';
import { UrgentNotice } from './components/UrgentNotice';
import { QuickActionTiles } from './components/QuickActionTiles';
import { TimetableSection } from './components/TimetableSection';
import { 
  ProfilePage,
  TimetablePage,
  GradesPage,
  RegistrationPage,
  FeesPage,
  HowToPayPage,
  HostelPage,
  CalendarPage,
  SuppSpecialPage,
  RevisionPage,
  ContactsPage
} from './components/Modals';
import { 
  INITIAL_USER, 
  INITIAL_TIMETABLE, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_TRANSCRIPTS, 
  INITIAL_FEE_STATEMENT, 
  INITIAL_HOSTEL,
  INITIAL_RESOURCES 
} from './services/firebase';
import { UserRole } from './types';

export type PageView =
  | 'dashboard'
  | 'profile'
  | 'timetable'
  | 'grades'
  | 'registration'
  | 'fees'
  | 'howToPay'
  | 'hostel'
  | 'calendar'
  | 'supp'
  | 'revision'
  | 'contacts';

export function App() {
  const [user, setUser] = useState(INITIAL_USER);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [announcements] = useState(INITIAL_ANNOUNCEMENTS);
  const [transcripts] = useState(INITIAL_TRANSCRIPTS);
  const [feeStatement] = useState(INITIAL_FEE_STATEMENT);
  const [hostel] = useState(INITIAL_HOSTEL);
  const [resources] = useState(INITIAL_RESOURCES);

  // Navigation State: Full Dedicated Pages (Zero Popups!)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>('dashboard');

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Switcher Handler
  const handleRoleChange = (newRole: UserRole) => {
    setUser((prev) => {
      let updatedName = prev.name;
      if (newRole === 'lecturer') updatedName = 'Dr. K. Ndegwa';
      else if (newRole === 'rep') updatedName = 'Sarah (Class Rep)';
      else if (newRole === 'admin') updatedName = 'Mr. Kimani (HOD)';
      else updatedName = 'Lemayian';

      return {
        ...prev,
        role: newRole,
        name: updatedName,
      };
    });
  };

  // Timetable Slot Edit Handler
  const handleEditSlot = (slotId: string) => {
    const slot = timetable.find((s) => s.id === slotId);
    if (!slot) return;

    const newRoom = prompt(
      `Update room/time for ${slot.unitCode} (${slot.unitName}):`,
      slot.room
    );
    if (newRoom && newRoom !== slot.room) {
      setTimetable((prev) =>
        prev.map((s) =>
          s.id === slotId
            ? { ...s, room: newRoom, rescheduled: true, rescheduleNote: 'Updated by Lecturer/Rep in realtime' }
            : s
        )
      );
      alert('Firestore sync: Slot updated and push alert triggered for all 48 cohort members!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* 1. TOP HEADER & APP BAR */}
      <div className={`transition-all duration-300 ${isMenuOpen ? 'filter blur-[3px]' : ''}`}>
        <Header
          user={user}
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          onRoleChange={handleRoleChange}
          unreadCount={announcements.filter((a) => a.isUrgent).length}
        />
      </div>

      {/* 2. TOP-LEFT NAVIGATION DRAWER */}
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onOpenModal={(pageName) => navigateTo(pageName as PageView)}
      />

      {/* 3. MAIN CONTAINER: DASHBOARD OR DEDICATED FULL PAGE */}
      <main className={`flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 pt-3 pb-6 space-y-3.5 transition-all duration-300 ${
        isMenuOpen ? 'filter blur-[4px] pointer-events-none select-none' : ''
      }`}>
        
        {/* VIEW 1: HOME DASHBOARD */}
        {currentView === 'dashboard' && (
          <>
            {/* Identity & Current Semester Status */}
            <HeroStatus user={user} />

            {/* Urgent Broadcast Notice */}
            {announcements.length > 0 && (
              <UrgentNotice
                announcement={announcements[0]}
                showReceipts={user.role !== 'student'}
              />
            )}

            {/* Direct Action Launch Tiles */}
            <QuickActionTiles
              onOpenModal={(pageName) => navigateTo(pageName as PageView)}
              gpa={3.68}
              balance={feeStatement.balance}
              hostelRoom={`${hostel.block} (${hostel.roomNumber})`}
            />

            {/* Live Class Timetable Section */}
            <TimetableSection
              slots={timetable}
              userRole={user.role}
              onEditSlot={handleEditSlot}
              onOpenNotes={() => navigateTo('revision')}
            />
          </>
        )}

        {/* DEDICATED FULL PAGES (ZERO POPUPS / NO OVERLAYS) */}
        {currentView === 'profile' && (
          <ProfilePage user={user} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'timetable' && (
          <TimetablePage slots={timetable} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'grades' && (
          <GradesPage transcripts={transcripts} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'registration' && (
          <RegistrationPage user={user} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'fees' && (
          <FeesPage
            feeStatement={feeStatement}
            onBack={() => navigateTo('dashboard')}
            onOpenHowToPay={() => navigateTo('howToPay')}
          />
        )}

        {currentView === 'howToPay' && (
          <HowToPayPage onBack={() => navigateTo('fees')} />
        )}

        {currentView === 'hostel' && (
          <HostelPage hostel={hostel} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'calendar' && (
          <CalendarPage onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'supp' && (
          <SuppSpecialPage onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'revision' && (
          <RevisionPage resources={resources} onBack={() => navigateTo('dashboard')} />
        )}

        {currentView === 'contacts' && (
          <ContactsPage onBack={() => navigateTo('dashboard')} />
        )}

      </main>

      {/* 4. FOOTER */}
      <footer className={`bg-[#6f1825] text-amber-100 py-2 sm:py-2.5 text-center text-xs font-medium border-t border-amber-400/20 shadow-xs transition-all duration-300 ${
        isMenuOpen ? 'filter blur-[3px]' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center gap-0.5">
          <span className="font-semibold text-amber-100/95">
            KMTC PhysioConnect © 2026 Kenya Medical Training College
          </span>
          <span className="text-amber-300 text-[11px] font-bold">
            Department of Physiotherapy • Nyeri Campus
          </span>
        </div>
      </footer>

    </div>
  );
}

export default App;
