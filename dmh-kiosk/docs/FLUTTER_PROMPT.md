# Prompt: Build the DMH Patient Kiosk as a Flutter Android app (APK)

You are a senior Flutter engineer. Build a production-quality **Flutter 3.x (Dart 3)** Android app that reproduces the
*Deenanath Mangeshkar Hospital & Research Center – Patient Services Kiosk*. Target: Android tablets / kiosk panels
(landscape, 1920×1080 reference, must scale to 10″–32″ screens) and also work on phones. Output a complete, runnable project
that builds with `flutter build apk --release`.

## 1. Branding
- Hospital: **Deenanath Mangeshkar Hospital & Research Center**, Pune. Use the supplied logo (`assets/logo.png`, red cross + "DMH"; ask for a higher-res/SVG version).
- Palette: primary `#C8102E`, dark `#9C0C24`, bg `#F3F5F8`, card `#FFFFFF`, ink `#1F2933`, muted `#6B7785`, line `#E2E6EC`, success `#1B8A4B`.
- Fonts: Inter (Latin) + Noto Sans Devanagari/other Noto scripts. Large touch targets (≥ 56 dp), generous radius (16–26), soft shadows.

## 2. Architecture
- State: **Riverpod** (`flutter_riverpod`); routing: **go_router** with a custom back/forward history (see §4).
- Folder layout: `lib/{core,data,domain,features/<feature>/{ui,state},l10n}`. Repository interfaces (`DoctorRepository`, `SlotRepository`,
  `OtpRepository`, `BillRepository`, `PaymentRepository`, `ReportRepository`) with **mock implementations** returning the sample data below, so a real HIS/API can be dropped in.
- Localization: `flutter_localizations` + ARB. Languages: English, मराठी, हिन्दी, ગુજરાતી, தமிழ், తెలుగు, ಕನ್ನಡ, മലയാളം, বাংলা, ਪੰਜਾਬੀ, اردو (RTL for Urdu). Fallback to English for missing keys.
- Packages: `flutter_tts`, `speech_to_text` (assistant), `wakelock_plus`, `printing` + `pdf`, `qr_flutter`, `intl`, `shared_preferences`, `url_launcher`, `freezed`/`json_serializable` (optional), `mocktail`.
- Scale: wrap the app in a `FittedBox`/`LayoutBuilder` design-size (1920×1080) so layout is identical on every panel.

## 3. Screens & behaviour (match exactly)
**Global shell:** header (logo, hospital name, "Pune · Patient Services Kiosk", live **clock + date** localized, 🌐 language button, ⌂ home),
optional **stepper**, content, footer: `← Back`, `⌂ Home`, "DEMO – simulated" badge, help-desk text, `🔊 Read aloud` ↔ `⏹ Stop` (toggle, auto-stops on navigation),
`📞 Call staff` (toast "Staff have been notified"), and a **Next →** button that mirrors the screen's primary action
(Send OTP, Verify, Confirm, Pay now, Done…); on pure-choice screens it is disabled until a choice exists, then acts as *forward* in history.
The language button lives only in the header (not the footer). The stepper is shown **only inside its flow**, never on the language screen.

1. **Splash** – logo, welcome in selected language, "Touch to start". 2. **Language** – 11-language grid + Start.
3. **Home** – greeting by time of day, privacy note ("details asked only when a service needs them, verified by OTP"), "Ask DMH Assistant" panel
(2 FAQ chips + mic), 8 tiles: Book Appointment, Self Check-in, Find a Doctor, Way-finding, Pay Bills, Reports & Records, Insurance/TPA, New Registration;
bottom strip: visiting hours + emergency info.
4. **Book Appointment** (stepper: Speciality › Doctor › Date & time › Verify › Confirmed)
   - Speciality grid (14, 7 per row) + doctor search; Doctor list with filter chips (All + specialities) and cards (initials avatar, name, role, ★ rating, years, days/hours, room, floor, fee).
   - Date & time: left doctor panel (speciality, OPD days, room, fee); right 6 day cards ("N free"/"Closed"), 20-minute slot grid (5 columns, booked slots struck-through & disabled, past slots hidden today); confirm button "✓ Confirm Thu, 5 Nov, 11:20 am".
   - **Verify it's you:** card with `+91` field (formats `98200 45210`, grey placeholder `XXXXX XXXXX`, blinking caret, ✕ clear), 3×4 keypad (1-9, ⌫, 0, **Send OTP**), "Demo: 98200 45210 [Fill]"; then 6-box OTP (demo `123456`, [Fill], wrong OTP shows error); right card "Use face recognition" (disabled placeholder, shows "needs camera & hospital approval"). Verified session persists until idle reset.
   - Confirmed: ✓, SMS/WhatsApp notice with masked number, gradient **Appointment ID** banner (`APT-######`), doctor/when/where, fee notice, check-in/vitals/consultation steps, QR "add to calendar", Print, **Pay now ₹fee**; auto-return home in 45 s.
5. **Pay flow** (stepper: Bill › Verify › Review & pay › Pay online › Receipt): Review (bill left, options right: UPI QR, Credit/Debit card, Pay online) → UPI QR screen / card-reader screen with *Simulate* buttons → Payment successful (receipt id, TXN) → print.
6. **Pay Bills** – types: OPD/appointment, interim (admitted), final IPD (itemised bill, **split bill**, UPI QR, success/fail, A4 invoice and 80 mm receipt preview).
7. **Self Check-in** – verify → today's appointment → token card (e.g. `A-214`, est. wait). 8. **Find a Doctor**, 9. **Way-finding** (floor tabs, department list, highlighted room, "You are here", lift hint),
10. **Reports** (multi-select, Print selected, Send to WhatsApp), 11. **Insurance/TPA** (forms list with Print/QR, 4-step cashless guide), 12. **New Registration** (name, DOB, gender, mobile, city/PIN, e-mail, face-consent checkbox → OTP → ₹250 fee → UHID).

## 4. Navigation & kiosk rules
- Custom history: `go()` pushes current screen and clears the forward stack; Back pops and pushes to forward; Home clears history; Back on Language returns to Splash.
- Services needing identity call `need(after, flow)` → Verify → continue to `after`.
- **Idle timeout 120 s** → reset all state (logout), return to Splash. Idle timer resets on any pointer event.
- Kiosk hardening: landscape lock, `SystemUiMode.immersiveSticky`, `wakelock_plus`, Android **lock-task / screen pinning** instructions in README, disable back-button exit (`PopScope`), auto-start on boot (optional `BOOT_COMPLETED` receiver).
- Voice: `flutter_tts` (language per selected locale) with toggle; `speech_to_text` for the assistant with keyword answers (visiting hours, fasting).
- Printing: `printing` package to the default/USB printer; 80 mm thermal receipt (`PdfPageFormat.roll80`) and A4 invoice.
- Payments: abstract `PaymentRepository` (UPI intent via `url_launcher` / PSP SDK, card-reader SDK placeholder). Never store card data.

## 5. Sample data (mock repos)
14 specialities (Cardiology, Neurology, Orthopaedics, Gastroenterology, Nephrology, Oncology, Paediatrics, Obstetrics & Gynaecology, Dermatology, ENT, Ophthalmology, Endocrinology & Diabetes, Pulmonology, General Medicine) with floors;
~16 sample doctors (name, role, rating, years, working weekdays, hours, room, fee ₹800–1800); slots every 20 min; demo bill `DMH-B-260417` ₹95,400; demo OTP `123456`.
Mark everything "DEMO" until real APIs are connected.

## 6. Quality bar
- Null-safe, lint-clean (`flutter_lints`), no hard-coded strings in widgets (ARB only), responsive, accessible (semantics, ≥ 4.5:1 contrast).
- Tests: unit (slot generation, phone/OTP validation, navigation stack), widget tests (keypad, OTP gate, stepper only in flow), golden test for Home.
- README with: setup, `flutter pub get`, `flutter run`, **`flutter build apk --release`** (+ keystore signing steps), `flutter build appbundle`, kiosk/pinning guide, how to plug in real APIs.

## 7. Deliverables
Full project source (zip), signed release APK, README, and a short list of assumptions/gaps.
