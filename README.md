# PhysioConnect - KMTC Nyeri Campus

Unified Platform for Physiotherapy Department Communication & Resource Access.

## Technologies Used
- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Backend & Cloud Services:** Firebase (Authentication + Cloud Firestore + Firebase Storage)
- **Bundler:** Vite

## How to Run in VS Code

1. Open this folder in **VS Code**:
   `C:\Users\HP\OneDrive\Documents\school`
2. Open the built-in VS Code Terminal (`Ctrl + ~`)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Click on the local link (e.g. `http://localhost:5173`) to view the application in your browser.

## Features Implemented
- **Top-Left Navigation Drawer (`☰ Menu`)**:
  - **Finance Sector:** Fee statement balance, Lipa na M-Pesa Paybill instructions (`964150` / `PT/2024/048`), invoices ledger.
  - **Exams & Academic Records:** Cumulative GPA, **Supplementary (Supp) Checker** (`0 Supps - Passed`), semester-by-semester grade breakdown (Year 1 Sem 1, Year 1 Sem 2).
  - **Hostel Accommodation:** Booking portal & current room allocation (`Block B, Room 14`).
  - **Revision Archive:** Past examination papers repository.
  - **Staff Directory:** Direct inquiry contact lines for HOD, lecturers, and class rep.
- **Mandatory "Must-Know on Entry" Main Dashboard:**
  - **Active Semester Status:** Prominent badge verifying registration for Year 2 Semester 1.
  - **Class & Cohort Identity:** Class of 2024, Admission Number `PT/2024/048`.
  - **Urgent Broadcast Notices:** Urgent clinical attachment announcement with acknowledgment action.
  - **Today's Live Timetable:** Real-time synchronized slots (NOW vs. NEXT, rescheduled rooms).
  - **Direct Action Launch Tiles:** Fast shortcuts to Exams, Fees, Hostels, and Revision.
