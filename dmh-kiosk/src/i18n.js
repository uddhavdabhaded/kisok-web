// Add more keys / languages here. Missing keys fall back to English.
const en = {
  welcome: 'Welcome', touch: 'Touch to start', chooseLang: 'Choose language', start: 'Start', next: 'Next', back: 'Back', home: 'Home', done: 'Done',
  read: 'Read aloud', stop: 'Stop', call: 'Call staff', staffMsg: 'Staff have been notified (demo).', help: 'Help desk: Ground floor, main lobby',
  gm: 'Good morning', ga: 'Good afternoon', ge: 'Good evening', how: 'How can we help you today?',
  priv: 'Your details are asked only when a service needs them, verified by OTP.',
  book: 'Book Appointment', bookD: 'Book, reschedule or cancel', ci: 'Self Check-in', ciD: 'Get your token for today',
  find: 'Find a Doctor', findD: 'By name or speciality', way: 'Way-finding', wayD: 'Directions inside the hospital',
  pay: 'Pay Bills', payD: 'OPD, interim and IPD bills', rep: 'Reports & Records', repD: 'View, print or download',
  ins: 'Insurance / TPA', insD: 'Forms, cashless help', reg: 'New Registration', regD: 'Get your UHID in 2 minutes',
  spec: 'Choose a speciality', docs: 'Our doctors', all: 'All', search: 'Search doctor or speciality', room: 'Room', floor: 'Floor', ground: 'Ground',
  slotTitle: 'Pick a date and time', today: 'Today', tomorrow: 'Tomorrow', free: 'free', closed: 'Closed', pickTime: 'Select a time', confirm: 'Confirm',
  verify: 'Verify it’s you', verifySub: 'We will send a one-time password to your registered mobile', mobile: 'Mobile number', sendOtp: 'Send OTP',
  enterOtp: 'Enter the 6-digit OTP sent to', verifyBtn: 'Verify', demoOtp: 'Demo OTP', fill: 'Fill', face: 'Use face recognition',
  faceD: 'Look at the camera above the screen. Only for patients who gave consent at registration.', faceN: 'Optional · subject to hospital approval',
  faceMsg: 'Face recognition needs a camera and hospital approval (demo).',
  confirmed: 'Appointment confirmed', apptId: 'APPOINTMENT ID', doctor: 'Doctor', when: 'When', where: 'Where', payNow: 'Pay now', print: 'Print',
  review: 'Review & pay', balance: 'Balance payable', upi: 'UPI', upiD: 'GPay, PhonePe, Paytm, BHIM – scan the QR', card: 'Credit / debit card',
  cardD: 'Tap, insert or swipe on the card reader', online: 'Pay online', onlineD: 'Net banking, wallet, UPI ID or card details',
  scanUpi: 'Scan with any UPI app', simPaid: 'Simulate: payment done', simTap: 'Simulate card tap', paid: 'Payment successful',
  steps: ['Speciality', 'Doctor', 'Date & time', 'Verify', 'Confirmed'], payStepsLbl: ['Bill', 'Verify', 'Review & pay', 'Pay online', 'Receipt'],
  tokenTitle: 'You are checked in', token: 'Your token', wait: 'Est. wait', checkIn: 'Check in now', outstanding: 'Outstanding bill',
  selectReports: 'Select reports to print', printSel: 'Print selected', demo: 'DEMO – simulated',
  emergency: 'Emergency: Casualty, Ground floor · 24×7', visiting: 'Visiting hours & information',
  regName: 'Full name', regAge: 'Age', regSave: 'Create UHID', regDone: 'Registration complete – your UHID',
}
const mr = {
  welcome: 'स्वागत आहे', touch: 'सुरू करण्यासाठी स्पर्श करा', chooseLang: 'भाषा निवडा', start: 'सुरू करा', next: 'पुढे', back: 'मागे', home: 'होम', done: 'पूर्ण',
  read: 'ऐका', stop: 'थांबवा', call: 'स्टाफला बोलवा', gm: 'शुभ प्रभात', ga: 'शुभ दुपार', ge: 'शुभ संध्याकाळ', how: 'आम्ही तुम्हाला कशी मदत करू?',
  book: 'अपॉइंटमेंट बुक करा', ci: 'सेल्फ चेक-इन', find: 'डॉक्टर शोधा', way: 'मार्गदर्शन', pay: 'बिल भरा', rep: 'रिपोर्ट्स व रेकॉर्ड्स',
  ins: 'विमा / TPA', reg: 'नवीन नोंदणी', spec: 'विभाग निवडा', docs: 'आमचे डॉक्टर', all: 'सर्व', slotTitle: 'दिनांक व वेळ निवडा', today: 'आज', tomorrow: 'उद्या',
  verify: 'ओळख पडताळा', mobile: 'मोबाइल नंबर', sendOtp: 'OTP पाठवा', verifyBtn: 'पडताळा', confirmed: 'अपॉइंटमेंट निश्चित झाली', payNow: 'आता पैसे भरा',
  confirm: 'निश्चित करा', paid: 'पेमेंट यशस्वी', steps: ['विभाग', 'डॉक्टर', 'दिनांक व वेळ', 'पडताळणी', 'निश्चित'], payStepsLbl: ['बिल', 'पडताळणी', 'तपासा व भरा', 'पेमेंट', 'पावती'],
}
const hi = {
  welcome: 'स्वागत है', touch: 'शुरू करने के लिए छुएँ', chooseLang: 'भाषा चुनें', start: 'शुरू करें', next: 'आगे', back: 'वापस', home: 'होम', done: 'पूर्ण',
  read: 'सुनें', stop: 'रोकें', call: 'स्टाफ बुलाएँ', gm: 'सुप्रभात', ga: 'नमस्कार', ge: 'शुभ संध्या', how: 'हम आपकी कैसे मदद करें?',
  book: 'अपॉइंटमेंट बुक करें', ci: 'सेल्फ चेक-इन', find: 'डॉक्टर खोजें', way: 'रास्ता खोजें', pay: 'बिल भरें', rep: 'रिपोर्ट व रिकॉर्ड',
  ins: 'बीमा / TPA', reg: 'नया पंजीकरण', spec: 'विभाग चुनें', docs: 'हमारे डॉक्टर', all: 'सभी', slotTitle: 'तारीख और समय चुनें', today: 'आज', tomorrow: 'कल',
  verify: 'पहचान सत्यापित करें', mobile: 'मोबाइल नंबर', sendOtp: 'OTP भेजें', verifyBtn: 'सत्यापित करें', confirmed: 'अपॉइंटमेंट पक्की हुई', payNow: 'अभी भुगतान करें',
  confirm: 'पक्का करें', paid: 'भुगतान सफल', steps: ['विभाग', 'डॉक्टर', 'तारीख व समय', 'सत्यापन', 'पक्का'], payStepsLbl: ['बिल', 'सत्यापन', 'जाँचें व भुगतान', 'ऑनलाइन भुगतान', 'रसीद'],
}
const DICT = { en, mr, hi }
export const t = (lang, key) => DICT[lang]?.[key] ?? en[key] ?? key
export const SPEECH_LANG = { en: 'en-IN', mr: 'mr-IN', hi: 'hi-IN', gu: 'gu-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', bn: 'bn-IN', pa: 'pa-IN', ur: 'ur-IN' }
