// SAMPLE DATA – replace with your HIS / API responses.
export const HOSPITAL = { name: 'Deenanath Mangeshkar Hospital', sub: '& Research Center', city: 'Pune' }
export const DEMO_PHONE = '9820045210'
export const DEMO_OTP = '123456'

export const SPECIALITIES = [
  ['Cardiology', '❤️', 2], ['Neurology', '⚡', 3], ['Orthopaedics', '🦴', 1], ['Gastroenterology', '💊', 2],
  ['Nephrology', '💧', 3], ['Oncology', '🎗️', 4], ['Paediatrics', '🧸', 1], ['Obstetrics & Gynaecology', '🤰', 1],
  ['Dermatology', '🧴', 2], ['ENT', '👂', 2], ['Ophthalmology', '👁️', 1], ['Endocrinology & Diabetes', '🩸', 3],
  ['Pulmonology', '🫁', 3], ['General Medicine', '⚕️', 0],
]
const MW = [1, 3, 5], WD = [1, 2, 3, 4, 5, 6], MF = [1, 2, 3, 4, 5]
// [speciality index, name, role, rating, years, working days (0=Sun), from, to, room, fee]
export const DOCTORS = [
  [0, 'Arvind Kulkarni', 'Consultant – Interventional Cardiology', 4.9, 24, MW, '10:00', '14:00', '214', 1500],
  [0, 'Nandita Rao', 'Consultant – Cardiology & Heart Failure', 4.8, 16, WD, '15:00', '18:00', '216', 1500],
  [1, 'Manasi Joshi', 'Consultant Neurologist', 4.8, 15, MF, '10:00', '14:00', '305', 1500],
  [2, 'Farhan Shaikh', 'Consultant – Joint Replacement', 4.9, 20, WD, '09:00', '13:00', '108', 1200],
  [2, 'Sunita Iyer', 'Consultant – Spine Surgery', 4.7, 14, MW, '14:00', '17:00', '110', 1200],
  [3, 'Sameer Desai', 'Consultant – Gastroenterology & Hepatology', 4.8, 18, WD, '11:00', '14:00', '221', 1400],
  [4, 'Priya Nair', 'Consultant Nephrologist', 4.8, 13, MF, '10:00', '13:00', '312', 1400],
  [5, 'Vikram Sinha', 'Consultant – Medical Oncology', 4.9, 21, MF, '10:00', '14:00', '405', 1800],
  [6, 'Kavita Menon', 'Consultant Paediatrician', 4.9, 19, WD, '09:00', '13:00', '120', 900],
  [7, 'Meera Bhatt', 'Consultant – Obstetrics & Gynaecology', 4.8, 16, WD, '10:00', '14:00', '130', 1200],
  [8, 'Tanvi Shah', 'Consultant Dermatologist', 4.7, 11, MF, '11:00', '15:00', '230', 1000],
  [9, 'Girish Patil', 'Consultant – ENT & Head-Neck Surgery', 4.7, 14, WD, '10:00', '13:00', '236', 1000],
  [10, 'Leena Sathe', 'Consultant Ophthalmologist', 4.8, 15, WD, '09:00', '13:00', '140', 1000],
  [11, 'Harsh Vyas', 'Consultant – Endocrinology & Diabetes', 4.8, 13, MF, '14:00', '17:00', '320', 1400],
  [12, 'Imran Qureshi', 'Consultant Pulmonologist', 4.7, 12, WD, '10:00', '13:00', '325', 1400],
  [13, 'Hemant Pawar', 'Consultant Physician', 4.7, 10, WD, '09:00', '17:00', 'G-12', 800],
]
export const REPORTS = ['Complete Blood Count (CBC)', 'HbA1c & Fasting Blood Sugar', 'Lipid Profile', 'Chest X-Ray (PA)', '2D Echocardiography']
export const ROOMS = [
  ['OPD Registration', 0], ['Billing Counter', 0], ['Pharmacy (24×7)', 0], ['Emergency / Casualty', 0],
  ['Pathology & Lab', 1], ['Radiology / CT', 1], ['Orthopaedics OPD', 1], ['Cardiology OPD', 2],
]
export const FORMS = ['Cashless pre-authorisation request', 'Reimbursement claim form', 'Cashless admission checklist', 'Discharge summary & bills request']
export const OPEN_BILL = { id: 'DMH-B-260417', patient: 'Demo Patient (Sample)', uhid: 'DMH-DEMO-00417', amount: 95400 }
export const LANGS = [['en', 'English'], ['mr', 'मराठी'], ['hi', 'हिन्दी'], ['gu', 'ગુજરાતી'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['kn', 'ಕನ್ನಡ'], ['ml', 'മലയാളം'], ['bn', 'বাংলা'], ['pa', 'ਪੰਜਾਬੀ'], ['ur', 'اردو']]
