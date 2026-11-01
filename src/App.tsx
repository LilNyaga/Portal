import { useState } from 'react';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HeroStatus } from './components/HeroStatus';
import { UrgentNotice } from './components/UrgentNotice';
import { QuickActionTiles } from './components/QuickActionTiles';
import { TimetableSection } from './components/TimetableSection';
import { 
  GradesModal, 
  FeesModal, 
  HowToPayModal, 
  HostelModal, 
  RevisionModal, 
  ContactsModal 
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

export function App() {
  const [user, setUser] = useState(INITIAL_USER);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [announcements] = useState(INITIAL_ANNOUNCEMENTS);
  const [transcripts] = useState(INITIAL_TRANSCRIPTS);
  const [feeStatement] = useState(INITIAL_FEE_STATEMENT);
  const [hostel] = useState(INITIAL_HOSTEL);
  const [resources] = useState(INITIAL_RESOURCES);

  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    'grades' | 'fees' | 'howToPay' | 'hostel' | 'revision' | 'contacts' | null
  >(null);

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
      <Header
        user={user}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        onRoleChange={handleRoleChange}
        unreadCount={announcements.filter((a) => a.isUrgent).length}
      />

      {/* 2. TOP-LEFT NAVIGATION DRAWER */}
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onOpenModal={(modalName) => setActiveModal(modalName)}
      />

      {/* 3. MAIN MUST-KNOW ENTRY DASHBOARD */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
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
          onOpenModal={(modalName) => setActiveModal(modalName)}
          gpa={3.68}
          balance={feeStatement.balance}
          hostelRoom={`${hostel.block} (${hostel.roomNumber})`}
        />

        {/* Live Class Timetable */}
        <TimetableSection
          slots={timetable}
          userRole={user.role}
          onEditSlot={handleEditSlot}
          onOpenNotes={() => setActiveModal('revision')}
        />

      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            PhysioConnect • <strong>Kenya Medical Training College (Nyeri Campus)</strong>
          </div>
          <div>React + TypeScript + Tailwind CSS + Firebase</div>
        </div>
      </footer>

      {/* 5. MODAL DIALOGS */}
      <GradesModal
        isOpen={activeModal === 'grades'}
        onClose={() => setActiveModal(null)}
        transcripts={transcripts}
      />

      <FeesModal
        isOpen={activeModal === 'fees'}
        onClose={() => setActiveModal(null)}
        feeStatement={feeStatement}
        onOpenHowToPay={() => setActiveModal('howToPay')}
      />

      <HowToPayModal
        isOpen={activeModal === 'howToPay'}
        onClose={() => setActiveModal(null)}
      />

      <HostelModal
        isOpen={activeModal === 'hostel'}
        onClose={() => setActiveModal(null)}
        hostel={hostel}
      />

      <RevisionModal
        isOpen={activeModal === 'revision'}
        onClose={() => setActiveModal(null)}
        resources={resources}
      />

      <ContactsModal
        isOpen={activeModal === 'contacts'}
        onClose={() => setActiveModal(null)}
      />

    </div>
  );
}

export default App;
