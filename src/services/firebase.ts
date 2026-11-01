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
};

export const INITIAL_TIMETABLE: TimetableSlot[] = [
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
    topic: 'Splinting Fabrication Techniques & Gonio-metric Range'
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

export const INITIAL_TRANSCRIPTS: SemesterTranscript[] = [
  {
    semesterName: 'Year 1 • Semester 1',
    gpa: 3.72,
    completed: true,
    units: [
      { unitCode: 'PT 101', unitName: 'Human Anatomy I', score: 76, grade: 'A', passed: true },
      { unitCode: 'PT 102', unitName: 'Human Physiology I', score: 74, grade: 'A', passed: true },
      { unitCode: 'PT 103', unitName: 'Foundations of Physiotherapy', score: 68, grade: 'B+', passed: true },
    ]
  },
  {
    semesterName: 'Year 1 • Semester 2',
    gpa: 3.65,
    completed: true,
    units: [
      { unitCode: 'PT 105', unitName: 'Pathology & Microbiology', score: 72, grade: 'A', passed: true },
      { unitCode: 'PT 106', unitName: 'Pharmacology for Physiotherapists', score: 65, grade: 'B', passed: true },
      { unitCode: 'PT 107', unitName: 'Clinical Assessment & Palpation', score: 80, grade: 'A', passed: true },
    ]
  }
];

export const INITIAL_FEE_STATEMENT: FeeStatement = {
  totalInvoiced: 42500,
  totalPaid: 42500,
  balance: 0,
  mpesaPaybill: '964150',
  accountNumber: 'PT/2024/048',
  transactions: [
    {
      id: 'tx_1',
      description: 'Term 1 Tuition & Clinical Lab Fee',
      reference: 'Inv #KMTC-NY-8910',
      date: '15 Jan 2026',
      amount: 42500,
      isPayment: false
    },
    {
      id: 'tx_2',
      description: 'M-Pesa Payment (Ref: QK8912LX0)',
      reference: 'Receipt Confirmed',
      date: '18 Jan 2026',
      amount: 42500,
      isPayment: true
    }
  ]
};

export const INITIAL_HOSTEL: HostelAllocation = {
  status: 'CONFIRMED',
  hostelName: 'KMTC Main Campus Hostels',
  block: 'Block B',
  roomNumber: 'Room 14',
  bedNumber: 'Bed 2',
  wardenName: 'Mr. Macharia'
};
