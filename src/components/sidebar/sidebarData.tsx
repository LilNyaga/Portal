import {
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Home,
  Layers,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react';

export type SidebarAction = {
  label: string;
  view: string;
};

export type SidebarSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  items?: SidebarAction[];
  action?: SidebarAction;
};

export const sidebarSections: SidebarSection[] = [
  {
    id: 'finance',
    title: 'Finance & Fee Sector',
    icon: CreditCard,
    items: [
      { label: 'Pay Fees', view: 'howToPay' },
      { label: 'Fee Statement', view: 'fees' },
    ],
  },
  {
    id: 'courses',
    title: 'Courses',
    icon: Layers,
    items: [
      { label: 'My Course', view: 'myCourse' },
      { label: 'Course Transfer', view: 'courseTransfer' },
      { label: 'Academic Calendar', view: 'calendar' },
    ],
  },
  {
    id: 'registration',
    title: 'Registration & Progress',
    icon: ClipboardCheck,
    items: [
      { label: 'Semester Status', view: 'semesterStatus' },
      { label: 'Semester Registration', view: 'registration' },
      { label: 'Leave / Deferment', view: 'leaveDeferment' },
      { label: 'Readmission', view: 'readmission' },
    ],
  },
  {
    id: 'academics',
    title: 'Exams & Academic Records',
    icon: GraduationCap,
    items: [
      { label: 'Exam Results', view: 'grades' },
      { label: 'Supp / Special Exams', view: 'supp' },
    ],
  },
  {
    id: 'hostel',
    title: 'Accommodation & Hostels',
    icon: Home,
    items: [{ label: 'Hostel Booking & Status', view: 'hostel' }],
  },
  {
    id: 'manual',
    title: 'Manual',
    icon: BookOpen,
    action: { label: 'Manual', view: 'manualGuide' },
  },
  {
    id: 'help',
    title: 'Help',
    icon: LifeBuoy,
    action: { label: 'Help', view: 'helpSupport' },
  },
];

export const sectionToggleIcon = (isOpen: boolean) => (
  <ChevronDown
    className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
      isOpen ? 'rotate-180 text-amber-950 stroke-[2.5]' : ''
    }`}
  />
);

export const renderSectionAction = (label: string, view: string) => ({
  label,
  view,
});

export const sidebarMeta = {
  title: 'KMTC Student Services',
  subtitle: 'Department of Physiotherapy',
  footer: {
    left: 'KMTC PhysioConnect v1.0',
    right: 'Portal Services',
  },
};
