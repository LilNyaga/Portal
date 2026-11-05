import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { 
  UserProfile, 
  TimetableSlot, 
  ResourceNote, 
  Announcement, 
  SemesterTranscript, 
  FeeStatement, 
  HostelAllocation 
} from '../types';

// Firebase configuration from environment or fallback template
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoDummyKeyForPhysioConnectKMTC",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "physioconnect-kmtc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "physioconnect-kmtc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "physioconnect-kmtc.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1029384756",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1029384756:web:abcd1234efgh"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initial Mock Datastore mirroring Firestore collections for instant development
export const INITIAL_USER: UserProfile = {
  id: 'usr_048',
  name: 'Lemayian',
  email: 'lemayian.pt@kmtc.ac.ke',
  role: 'student',
  admissionNo: 'PT/2024/048',
  cohort: 'Diploma in Physiotherapy (Cohort 2024)',
  semester: 'Year 2, Semester 1',
  isRegistered: true,
  isCleared: true,
  phone: '+254 712 345 678',
  nationalId: '38940192',
  department: 'Department of Physiotherapy',
  campus: 'KMTC Nyeri Campus',
  admissionYear: 'September 2024',
  expectedGraduation: 'July 2027',
  guardianName: 'Samuel Lemayian',
  guardianPhone: '+254 722 998 877',
  gender: 'Male',
  county: 'Narok County',
};

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  {
    id: 'mon_1',
    day: 'Monday',
    startTime: '08:00',
    endTime: '10:00',
    unitCode: 'PT 209',
    unitName: 'Clinical Placement & Hospital Ward Rounds',
    lecturer: 'Dr. K. Ndegwa / Ward Sister',
    room: 'Nyeri PGH - Male Orthopaedic Ward',
    topic: 'Post-operative Mobility Assessment & Bedside Transfers'
  },
  {
    id: 'mon_2',
    day: 'Monday',
    startTime: '10:30',
    endTime: '12:30',
    unitCode: 'PT 201',
    unitName: 'Clinical Biomechanics & Gait Analysis',
    lecturer: 'Dr. K. Ndegwa',
    room: 'Biomechanics Lab 1',
    topic: 'Stance Phase Kinematics & Ground Reaction Forces'
  },
  {
    id: 'mon_3',
    day: 'Monday',
    startTime: '14:00',
    endTime: '16:00',
    unitCode: 'PT 211',
    unitName: 'Medical Pathology & Ergonomics',
    lecturer: 'Dr. Kariuki',
    room: 'Lecture Hall 3',
    topic: 'Repetitive Strain Injuries & Workplace Ergonomic Assessment'
  },
  // Tuesday
  {
    id: 'tue_1',
    day: 'Tuesday',
    startTime: '08:30',
    endTime: '11:00',
    unitCode: 'PT 204',
    unitName: 'Electrotherapy Principles & Waveforms',
    lecturer: 'Madam J. Wanjiku',
    room: 'Electrotherapy Demonstration Lab',
    topic: 'Interferential Current (IFC) Electrode Placements'
  },
  {
    id: 'tue_2',
    day: 'Tuesday',
    startTime: '11:30',
    endTime: '13:30',
    unitCode: 'PT 207',
    unitName: 'Orthopaedic Rehabilitation & Lower Extremity Assessment',
    lecturer: 'Mr. Ochieng',
    room: 'Skills Demo Lab',
    topic: 'Anterior Cruciate Ligament (ACL) Rehab Protocols Phase 2'
  },
  // Wednesday
  {
    id: 'wed_1',
    day: 'Wednesday',
    startTime: '08:00',
    endTime: '12:00',
    unitCode: 'PT 209',
    unitName: 'Clinical Placement & Hospital Ward Rounds',
    lecturer: 'Clinical Instructors Team',
    room: 'Outpatient Physiotherapy Clinic (OPD)',
    topic: 'Manual Therapy & Active Assisted ROM Sessions'
  },
  {
    id: 'wed_2',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '16:00',
    unitCode: 'PT 201',
    unitName: 'Clinical Biomechanics Tutorial',
    lecturer: 'Dr. K. Ndegwa',
    room: 'Physio Seminar Room B',
    topic: 'Case Studies Review & Gait Analysis Video Analysis'
  },
  // Thursday
  {
    id: 'slot_1',
    day: 'Thursday',
    startTime: '08:30',
    endTime: '10:30',
    unitCode: 'PT 201',
    unitName: 'Clinical Biomechanics & Gait Analysis',
    lecturer: 'Dr. K. Ndegwa',
    room: 'Physio Lab 2',
    topic: 'Normal vs. Pathological Gait Cycle & Kinetic Vectors',
    isNow: true,
  },
  {
    id: 'slot_2',
    day: 'Thursday',
    startTime: '11:00',
    endTime: '13:00',
    unitCode: 'PT 204',
    unitName: 'Electrotherapy Principles & Waveforms',
    lecturer: 'Madam J. Wanjiku',
    room: 'Hall B (Swapped from Demo Room)',
    isNext: true,
    rescheduled: true,
    rescheduleNote: 'Relocated by Lecturer due to practical equipment maintenance.'
  },
  {
    id: 'slot_3',
    day: 'Thursday',
    startTime: '14:00',
    endTime: '16:00',
    unitCode: 'PT 207',
    unitName: 'Orthopaedic Rehabilitation & Lower Extremity Assessment',
    lecturer: 'Mr. Ochieng',
    room: 'Skills Demo Lab',
    topic: 'Splinting Fabrication Techniques & Goniometric Range'
  },
  // Friday
  {
    id: 'fri_1',
    day: 'Friday',
    startTime: '08:30',
    endTime: '11:00',
    unitCode: 'PT 207',
    unitName: 'Orthopaedic Rehabilitation Practical',
    lecturer: 'Mr. Ochieng',
    room: 'Gymnasium & Rehab Facility',
    topic: 'Proprioceptive Neuromuscular Facilitation (PNF)'
  },
  {
    id: 'fri_2',
    day: 'Friday',
    startTime: '11:30',
    endTime: '13:00',
    unitCode: 'PT 211',
    unitName: 'Medical Pathology Clinical Conference',
    lecturer: 'Dr. Kariuki & HOD',
    room: 'Main Auditorium',
    topic: 'Weekly Inter-professional Case Presentation'
  }
];

export const INITIAL_RESOURCES: ResourceNote[] = [
  {
    id: 'res_1',
    title: 'Gait Analysis & Muscle Vectors.pdf',
    unitCode: 'PT 201',
    unitName: 'Biomechanics',
    uploadedBy: 'Dr. K. Ndegwa',
    uploaderRole: 'Lecturer',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    downloadUrl: '#',
    weekTag: 'Week 4'
  },
  {
    id: 'res_2',
    title: 'TENS & Interferential Current Therapy.pdf',
    unitCode: 'PT 204',
    unitName: 'Electrotherapy',
    uploadedBy: 'Madam J. Wanjiku',
    uploaderRole: 'Lecturer',
    fileSize: '6.8 MB',
    fileType: 'PDF',
    downloadUrl: '#',
    weekTag: 'Week 3'
  },
  {
    id: 'res_3',
    title: 'KMTC 2024 End-of-Semester Past Exam Paper.pdf',
    unitCode: 'EXAM',
    unitName: 'Department Archive',
    uploadedBy: 'Sarah (Class Rep)',
    uploaderRole: 'Class Rep',
    fileSize: '1.9 MB',
    fileType: 'EXAM',
    downloadUrl: '#',
    weekTag: 'Revision'
  },
  {
    id: 'res_4',
    title: 'Spinal Cord Injury Rehab Protocols.pptx',
    unitCode: 'PT 207',
    unitName: 'Orthopaedic Rehab',
    uploadedBy: 'Mr. Ochieng',
    uploaderRole: 'Lecturer',
    fileSize: '12.1 MB',
    fileType: 'SLIDE',
    downloadUrl: '#',
    weekTag: 'Week 2'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Nyeri PGH Clinical Rotations Reporting Time Confirmed',
    body: 'All Year 2 students assigned to Group A must report to the Physiotherapy Outpatient Department at Nyeri Provincial General Hospital by 8:00 AM sharp on Monday. Clinical tunic, valid KMTC ID badge, and stethoscope are mandatory for hospital gate admission.',
    author: 'Department Clinical Coordinator & HOD',
    authorRole: 'Admin',
    createdAt: 'Today, 07:15 AM',
    isUrgent: true,
    readCount: 46,
    totalCohort: 48,
    readBy: ['usr_048']
  },
  {
    id: 'ann_2',
    title: 'Electrotherapy Hall Switch Notice',
    body: 'Please note that Madam Wanjikus 11:00 AM session today will take place in Hall B instead of the demonstration room due to equipment calibration.',
    author: 'Sarah (Class Rep)',
    authorRole: 'Class Rep',
    createdAt: 'Yesterday, 4:30 PM',
    isUrgent: false,
    readCount: 48,
    totalCohort: 48,
    readBy: ['usr_048']
  }
];

// Historical Transcripts Since Year 1 (Joined September 2024)
export const INITIAL_TRANSCRIPTS: SemesterTranscript[] = [
  {
    semesterName: 'Year 1 • Semester 1 (Sep - Dec 2024)',
    gpa: 3.75,
    completed: true,
    units: [
      { unitCode: 'PT 101', unitName: 'Gross Human Anatomy I (Upper Extremity & Thorax)', score: 78, grade: 'A', passed: true },
      { unitCode: 'PT 102', unitName: 'Human Physiology I (Cardiovascular & Neuro)', score: 74, grade: 'A', passed: true },
      { unitCode: 'PT 103', unitName: 'Foundations of Physiotherapy & Professional Ethics', score: 71, grade: 'A', passed: true },
      { unitCode: 'PT 104', unitName: 'First Aid, BLS & Patient Safety', score: 82, grade: 'A', passed: true },
      { unitCode: 'PT 105', unitName: 'Medical Communication & Clinical Documentation', score: 68, grade: 'B+', passed: true },
    ]
  },
  {
    semesterName: 'Year 1 • Semester 2 (Jan - Apr 2025)',
    gpa: 3.65,
    completed: true,
    units: [
      { unitCode: 'PT 106', unitName: 'Gross Human Anatomy II (Lower Extremity & Pelvis)', score: 72, grade: 'A', passed: true },
      { unitCode: 'PT 107', unitName: 'Human Physiology II (Musculoskeletal & Respiration)', score: 70, grade: 'A', passed: true },
      { unitCode: 'PT 108', unitName: 'Pathology & Microbiology in Rehabilitation', score: 65, grade: 'B', passed: true },
      { unitCode: 'PT 109', unitName: 'Pharmacology for Physiotherapists', score: 66, grade: 'B', passed: true },
      { unitCode: 'PT 110', unitName: 'Clinical Assessment & Palpation Skills', score: 84, grade: 'A', passed: true },
    ]
  },
  {
    semesterName: 'Year 1 • Semester 3 (May - Aug 2025)',
    gpa: 3.80,
    completed: true,
    units: [
      { unitCode: 'PT 111', unitName: 'Principles of Exercise Therapy & Movement Science', score: 80, grade: 'A', passed: true },
      { unitCode: 'PT 112', unitName: 'Basic Electrotherapy Modalities (Thermal & Cryo)', score: 77, grade: 'A', passed: true },
      { unitCode: 'PT 113', unitName: 'Kinesiology & Human Movement Analysis', score: 75, grade: 'A', passed: true },
      { unitCode: 'PT 114', unitName: 'Introduction to Clinical Hospital Placement I', score: 86, grade: 'A', passed: true },
    ]
  },
  {
    semesterName: 'Year 2 • Semester 1 (Current Session 2025/2026)',
    gpa: 3.68,
    completed: true,
    units: [
      { unitCode: 'PT 201', unitName: 'Clinical Biomechanics & Gait Analysis', score: 76, grade: 'A', passed: true },
      { unitCode: 'PT 204', unitName: 'Electrotherapy Principles & Waveforms', score: 73, grade: 'A', passed: true },
      { unitCode: 'PT 207', unitName: 'Orthopaedic Rehabilitation & Lower Extremity', score: 70, grade: 'A', passed: true },
      { unitCode: 'PT 209', unitName: 'Clinical Placement & Hospital Ward Rounds', score: 82, grade: 'A', passed: true },
      { unitCode: 'PT 211', unitName: 'Medical Pathology & Ergonomics', score: 67, grade: 'B+', passed: true },
    ]
  }
];

// Historical Fee Statement Since the First Day Joined
export const INITIAL_FEE_STATEMENT: FeeStatement = {
  totalInvoiced: 160200,
  totalPaid: 160200,
  balance: 0,
  mpesaPaybill: '964150',
  accountNumber: 'PT/2024/048',
  transactions: [
    {
      id: 'tx_1',
      description: 'Admission, Orientation & Student ID Card Fee',
      reference: 'Inv #KMTC-NY-2024-ADM',
      date: '04 Sep 2024',
      amount: 12000,
      isPayment: false
    },
    {
      id: 'tx_2',
      description: 'M-Pesa Payment (Ref: QHG729381A)',
      reference: 'Receipt #REC-00192',
      date: '06 Sep 2024',
      amount: 12000,
      isPayment: true
    },
    {
      id: 'tx_3',
      description: 'Year 1 Semester 1 Tuition & Clinical Lab Fee',
      reference: 'Inv #KMTC-NY-2024-T1',
      date: '15 Sep 2024',
      amount: 38700,
      isPayment: false
    },
    {
      id: 'tx_4',
      description: 'M-Pesa Payment (Ref: QHG891042B)',
      reference: 'Receipt #REC-00281',
      date: '16 Sep 2024',
      amount: 38700,
      isPayment: true
    },
    {
      id: 'tx_5',
      description: 'Year 1 Semester 2 Tuition & Hospital Attachment Fee',
      reference: 'Inv #KMTC-NY-2025-T2',
      date: '10 Jan 2025',
      amount: 38500,
      isPayment: false
    },
    {
      id: 'tx_6',
      description: 'National Bank Deposit (Ref: NBK-0491820)',
      reference: 'Receipt #REC-00512',
      date: '12 Jan 2025',
      amount: 38500,
      isPayment: true
    },
    {
      id: 'tx_7',
      description: 'Year 1 Semester 3 Tuition & Practical Exam Fee',
      reference: 'Inv #KMTC-NY-2025-T3',
      date: '05 May 2025',
      amount: 38500,
      isPayment: false
    },
    {
      id: 'tx_8',
      description: 'M-Pesa Payment (Ref: RHJ481920M)',
      reference: 'Receipt #REC-00784',
      date: '07 May 2025',
      amount: 38500,
      isPayment: true
    },
    {
      id: 'tx_9',
      description: 'Year 2 Semester 1 Tuition & Ward Practice Fee',
      reference: 'Inv #KMTC-NY-2026-T1',
      date: '14 Jan 2026',
      amount: 32500,
      isPayment: false
    },
    {
      id: 'tx_10',
      description: 'M-Pesa Payment (Ref: SIK910283X)',
      reference: 'Receipt #REC-00994',
      date: '16 Jan 2026',
      amount: 32500,
      isPayment: true
    }
  ]
};

// Hostel Room Details with Bed, Block, History & Roommates
export const INITIAL_HOSTEL: HostelAllocation = {
  status: 'CONFIRMED',
  academicYear: '2025/2026 (Year 2, Semester 1)',
  hostelName: 'KMTC Main Campus Student Hostels',
  block: 'Block B (Physiotherapy Senior Wing)',
  roomNumber: 'Room 14 (East Wing, 1st Floor)',
  bedNumber: 'Bed 2',
  bedType: 'Lower Bunk (Window Side)',
  roomType: '4-Bed Standard Student Cubicle',
  checkInDate: '15 Jan 2026',
  wardenName: 'Mr. Macharia (Warden Office Rm 02)',
  amenities: [
    'Individual Wooden Study Desk & Ergonomic Chair',
    'Heavy-Duty Steel Padlockable Locker',
    'Campus High-Speed Wi-Fi Hotspot',
    'Solar Water Heating in Bathrooms',
    'Outdoor Laundry Wash & Clotheslines Area'
  ],
  roommates: [
    'Brian Kiprono (PT/2024/012) • Bed 1 (Upper Bunk)',
    'Lemayian [You] (PT/2024/048) • Bed 2 (Lower Bunk)',
    'Kevin Mwangi (PT/2024/033) • Bed 3 (Upper Bunk)',
    'David Otieno (PT/2024/051) • Bed 4 (Lower Bunk)'
  ]
};
