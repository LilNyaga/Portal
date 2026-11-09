export type UserRole = 'student' | 'lecturer' | 'rep' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  admissionNo: string;
  cohort: string;
  semester: string;
  isRegistered: boolean;
  isCleared: boolean;
  phone?: string;
  nationalId?: string;
  department?: string;
  campus?: string;
  admissionYear?: string;
  expectedGraduation?: string;
  guardianName?: string;
  guardianPhone?: string;
  gender?: string;
  county?: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  unitCode: string;
  unitName: string;
  lecturer: string;
  room: string;
  topic?: string;
  isNow?: boolean;
  isNext?: boolean;
  rescheduled?: boolean;
  rescheduleNote?: string;
}

export interface ResourceNote {
  id: string;
  title: string;
  unitCode: string;
  unitName: string;
  uploadedBy: string;
  uploaderRole: string;
  fileSize: string;
  fileType: 'PDF' | 'SLIDE' | 'EXAM';
  downloadUrl: string;
  weekTag: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  authorRole: string;
  createdAt: string;
  isUrgent?: boolean;
  readCount: number;
  totalCohort: number;
  readBy: string[];
}

export interface UnitGrade {
  unitCode: string;
  unitName: string;
  score: number;
  grade: string;
  passed: boolean;
  isSupplementary?: boolean;
}

export interface SemesterTranscript {
  academicYear: string;
  academicSemester: string;
  examSeriesName: string;
  stage: string;
  semesterName: string;
  gpa: number;
  completed: boolean;
  units: UnitGrade[];
}

export interface RegisteredUnit {
  code: string;
  name: string;
  units: number;
  status: 'Registered' | 'Completed' | 'Pending';
}

export interface SemesterRegistrationRecord {
  id: string;
  academicYear: string;
  academicSemester: string;
  title: string;
  status: 'Successful' | 'Registered' | 'Pending';
  registrationDate?: string;
  examPassReady: boolean;
  examPassNumber?: string;
  examVenue?: string;
  units: RegisteredUnit[];
}

export interface FeeTransaction {
  id: string;
  description: string;
  reference: string;
  date: string;
  amount: number;
  isPayment?: boolean;
}

export interface FeeStatement {
  totalInvoiced: number;
  totalPaid: number;
  balance: number;
  mpesaPaybill: string;
  accountNumber: string;
  transactions: FeeTransaction[];
}

export interface HostelAllocation {
  status: 'CONFIRMED' | 'PENDING' | 'NOT_ALLOCATED';
  hostelName: string;
  block: string;
  roomNumber: string;
  bedNumber: string;
  wardenName: string;
  academicYear?: string;
  roomType?: string;
  bedType?: string;
  checkInDate?: string;
  amenities?: string[];
  roommates?: string[];
}
