import { useMemo } from 'react'
import logo from './assets/logo.png'
import { HOSPITAL, LANGS, SPECIALITIES, DOCTORS, REPORTS, ROOMS, FORMS, OPEN_BILL, DEMO_PHONE } from './data'
import { money, initials, maskPhone, dayAt, dayLabel, daysText, t12, slotsFor, freeCount } from './utils'

const floorName = (f, T) => (f ? `${T('floor')} ${f}` : T('ground'))
const Kv = ({ rows }) => rows.map(([k, v]) => <div className="kv" key={k}><span>{k}</span><b>{v}</b></div>)

export const Keypad = ({ onKey, label, disabled, onGo }) => (
  <div className="kp">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0].map((k) => <button key={k} onClick={() => onKey(String(k))}>{k}</button>)}
    <button className="go" disabled={disabled} onClick={onGo}>{label}</button>
  </div>
)

/** Pseudo QR (demo only) – swap for a real QR library (e.g. `qrcode.react`) in production. */
const FakeQR = ({ seed, size = 320 }) => {
  const cells = useMemo(() => {
    let s = [...seed].reduce((a, c) => a + c.charCodeAt(0), 7); const out = []
    for (let i = 0; i < 25; i++) for (let j = 0; j < 25; j++) { s = (s * 1103515245 + 12345) % 2147483648; if (s % 3 === 0) out.push([i, j]) }
    return out
  }, [seed])
  const finder = (x, y) => <g key={x + '' + y}><rect x={x} y={y} width="7" height="7" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" /></g>
  return <svg width={size} height={size} viewBox="0 0 25 25" style={{ background: '#fff' }}>{cells.map(([i, j]) => <rect key={i + '-' + j} x={i} y={j} width="1" height="1" />)}{finder(0, 0)}{finder(18, 0)}{finder(0, 18)}</svg>
}

const FaceCard = ({ T, say }) => (
  <div className="card c col" style={{ width: 560, cursor: 'pointer' }} onClick={() => say(T('faceMsg'))}>
    <div style={{ width: 220, height: 220, borderRadius: 30, background: '#2b0a10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110 }}>👤</div>
    <h2>{T('face')}</h2><p className="mut">{T('faceD')}</p><span className="demo">{T('faceN')}</span>
  </div>
)

const DoctorCard = ({ i, T, onPick }) => {
  const d = DOCTORS[i], sp = SPECIALITIES[d[0]]
  return (
    <div className="doc" onClick={() => onPick(i)}>
      <div className="row"><div className="av sm">{initials(d[1])}</div><div><b style={{ fontSize: 25 }}>Dr. {d[1]}</b><div className="mut">{d[2]}</div></div></div>
      <div className="row" style={{ margin: '12px 0' }}><span className="tag">{sp[1]} {sp[0]}</span><span className="tag">★ {d[3]}</span><span className="tag">{d[4]} yrs</span></div>
      <div className="mut">📅 {daysText(d[5])} · {d[6]} – {d[7]}</div>
      <div className="mut">📍 {T('room')} {d[8]} · {floorName(sp[2], T)} · {money(d[9])}</div>
    </div>
  )
}

export const SCREENS = {
  splash: ({ go, T }) => (
    <div className="wel" onClick={() => go('lang')}>
      <img src={logo} alt="DMH" /><h1>{HOSPITAL.name}</h1><h2 style={{ color: 'var(--red)' }}>{HOSPITAL.sub}</h2>
      <p style={{ fontSize: 40, fontWeight: 700 }}>{T('welcome')}</p><button className="btn p" style={{ fontSize: 30, padding: '0 60px', minHeight: 84 }}>{T('touch')}</button>
    </div>
  ),

  lang: ({ st, up, T }) => (
    <div className="main"><h1>{T('chooseLang')}</h1>
      <div className="lang">{LANGS.map(([c, n]) => <button key={c} className={c === st.lang ? 'on' : ''} onClick={() => up({ lang: c })}>{n}</button>)}</div></div>
  ),

  home: ({ st, go, need, T, say }) => {
    const h = new Date().getHours(), tiles = [
      ['📅', 'book', 'bookD', () => go('spec', { flow: 'book', sp: -1, q: '' })], ['✅', 'ci', 'ciD', () => need('cin')],
      ['🧑‍⚕️', 'find', 'findD', () => go('doc', { flow: 'book', sp: -1, q: '' })], ['🧭', 'way', 'wayD', () => go('way', { flow: null })],
      ['💳', 'pay', 'payD', () => need('bill', 'pay')], ['📄', 'rep', 'repD', () => need('rep')],
      ['🛡️', 'ins', 'insD', () => go('ins', { flow: null })], ['📝', 'reg', 'regD', () => go('reg', { flow: null })],
    ]
    return (
      <div className="main">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div><h1 style={{ border: 0, padding: 0, fontSize: 52 }}>{T(h < 12 ? 'gm' : h < 17 ? 'ga' : 'ge')}</h1><p className="sub">{T('how')}</p></div>
          <div className="card mut" style={{ maxWidth: 520, padding: '12px 20px' }}>🔒 {T('priv')}</div>
        </div>
        <div className="hub">
          <div className="asst"><div style={{ fontSize: 60 }}>✨</div><h2 style={{ fontSize: 36 }}>Ask DMH Assistant</h2><p style={{ opacity: .85, fontSize: 21 }}>Speak or type any question about the hospital</p><div style={{ flex: 1 }} />
            <button onClick={() => say('General wards 11:00–12:00 and 17:00–19:00. ICU 11:00–11:30 and 17:00–17:30. (Sample information)')}>💬 What are the visiting hours?</button>
            <button onClick={() => say('Many blood tests need 8–12 hours of fasting; water is fine. Please confirm with your doctor or lab. (Sample information)')}>💬 Do I need to fast before a blood test?</button></div>
          {tiles.map(([i, a, b, fn]) => <button key={a} className="tile" onClick={fn}><i>{i}</i><b>{T(a)}</b><small>{T(b)}</small><div className="ar">→</div></button>)}
        </div>
        <div className="card row" style={{ padding: '14px 24px', fontSize: 21 }}><span>ℹ️ <b>{T('visiting')}</b> · General wards 11:00–12:00 & 17:00–19:00</span><span style={{ marginInlineStart: 'auto', color: 'var(--red)', fontWeight: 700 }}>🚑 {T('emergency')}</span></div>
      </div>
    )
  },

  spec: ({ st, up, go, T }) => {
    const q = st.q.trim().toLowerCase(), hits = q ? DOCTORS.map((_, i) => i).filter((i) => (DOCTORS[i][1] + DOCTORS[i][2] + SPECIALITIES[DOCTORS[i][0]][0]).toLowerCase().includes(q)) : []
    return (
      <div className="main">
        <div className="row" style={{ justifyContent: 'space-between' }}><h1>{T('spec')}</h1><input className="fi" style={{ width: 520, margin: 0 }} placeholder={'🔍 ' + T('search')} value={st.q} onChange={(e) => up({ q: e.target.value })} /></div>
        {q ? <div className="g3">{hits.map((i) => <DoctorCard key={i} i={i} T={T} onPick={(d) => go('slot', { di: d, time: null, day: firstFreeDay(d) })} />)}</div>
          : <div className="g7">{SPECIALITIES.map((s, i) => <button key={s[0]} className="sc" onClick={() => go('doc', { sp: i, q: '' })}><i>{s[1]}</i><b>{s[0]}</b><small>{DOCTORS.filter((d) => d[0] === i).length} · {floorName(s[2], T)}</small></button>)}</div>}
      </div>
    )
  },

  doc: ({ st, up, go, T }) => {
    const q = st.q.toLowerCase(), list = DOCTORS.map((_, i) => i).filter((i) => (st.sp < 0 || DOCTORS[i][0] === st.sp) && (!q || (DOCTORS[i][1] + DOCTORS[i][2]).toLowerCase().includes(q)))
    return (
      <div className="main">
        <div className="row" style={{ justifyContent: 'space-between' }}><h1>{T('docs')}{st.sp >= 0 ? ' · ' + SPECIALITIES[st.sp][0] : ''}</h1><input className="fi" style={{ width: 520, margin: 0 }} placeholder={'🔍 ' + T('search')} value={st.q} onChange={(e) => up({ q: e.target.value })} /></div>
        <div className="row" style={{ overflowX: 'auto', flex: 'none', paddingBottom: 6 }}>
          <button className={'chip ' + (st.sp < 0 ? 'on' : '')} onClick={() => up({ sp: -1 })}>{T('all')}</button>
          {SPECIALITIES.map((s, i) => <button key={s[0]} className={'chip ' + (st.sp === i ? 'on' : '')} style={{ flex: 'none' }} onClick={() => up({ sp: i })}>{s[1]} {s[0]}</button>)}
        </div>
        <div className="g3">{list.map((i) => <DoctorCard key={i} i={i} T={T} onPick={(d) => go('slot', { di: d, time: null, day: firstFreeDay(d) })} />)}</div>
      </div>
    )
  },

  slot: ({ st, up, T }) => {
    const d = DOCTORS[st.di], sp = SPECIALITIES[d[0]], cur = slotsFor(st.di, st.day) || []
    return (
      <div className="main" style={{ flexDirection: 'row' }}>
        <div className="card c col" style={{ width: 420, flex: 'none' }}><div className="av">{initials(d[1])}</div><h2>Dr. {d[1]}</h2><p className="mut">{d[2]}</p>
          <div style={{ width: '100%', textAlign: 'start' }}><Kv rows={[['Speciality', sp[0]], ['OPD', daysText(d[5])], [T('room'), `${d[8]} · ${floorName(sp[2], T)}`], ['Fee', money(d[9])]]} /></div></div>
        <div className="card f1 col" style={{ gap: 20 }}><h2>{T('slotTitle')}</h2>
          <div className="row">{[0, 1, 2, 3, 4, 5].map((o) => { const n = freeCount(st.di, o), x = dayAt(o); return (
            <button key={o} className={'day ' + (st.day === o ? 'on' : '')} disabled={n < 0} onClick={() => up({ day: o, time: null })}>
              <span>{o === 0 ? T('today') : o === 1 ? T('tomorrow') : x.toLocaleDateString(st.lang + '-IN', { weekday: 'short' })}</span><b>{x.getDate()}</b><small>{n < 0 ? T('closed') : `${n} ${T('free')}`}</small></button>) })}</div>
          <div className="slots">{cur.map(([tm, booked]) => <button key={tm} className={'slot ' + (st.time === tm ? 'on' : '')} disabled={booked} onClick={() => up({ time: tm })}>{t12(tm)}</button>)}</div>
        </div>
      </div>
    )
  },

  vm: ({ st, up, go, press, T, say }) => {
    const n = st.phone.length
    return (
      <div className="main"><div className="c col" style={{ gap: 4 }}><h1 style={{ border: 0, padding: 0 }}>{T('verify')}</h1><p className="sub">{T('verifySub')}</p></div>
        <div className="row f1" style={{ justifyContent: 'center', alignItems: 'stretch', minHeight: 0, gap: 36 }}>
          <div className="card col" style={{ width: 760 }}><div className="mut">{T('mobile')}</div>
            <div className="pin"><span className="pf">+91</span><span>{n ? st.phone.slice(0, 5) + (n > 5 ? ' ' + st.phone.slice(5) : '') : ''}<span className="ph">{'XXXXX XXXXX'.slice(n + (n > 5 ? 1 : 0))}</span></span>{n < 10 && <span className="cur" />}{n > 0 && <button className="x" onClick={() => up({ phone: '' })}>✕</button>}</div>
            <Keypad onKey={press} label={T('sendOtp')} disabled={!/^[6-9]\d{9}$/.test(st.phone)} onGo={() => go('vo', { otp: '' })} />
            <div className="mut">💬 Demo: 98200 45210 <button className="chip" style={{ height: 40, fontSize: 17 }} onClick={() => up({ phone: DEMO_PHONE })}>{T('fill')}</button></div></div>
          <FaceCard T={T} say={say} /></div></div>
    )
  },

  vo: ({ st, up, press, verifyOtp, T, say }) => (
    <div className="main"><div className="c col" style={{ gap: 4 }}><h1 style={{ border: 0, padding: 0 }}>{T('verify')}</h1><p className="sub">{T('verifySub')}</p></div>
      <div className="row f1" style={{ justifyContent: 'center', alignItems: 'stretch', minHeight: 0, gap: 36 }}>
        <div className="card col" style={{ width: 760 }}><div className="mut">{T('enterOtp')} +91 {maskPhone(st.phone)}</div>
          <div className="row c" style={{ minHeight: 96 }}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={'ob ' + (st.otp.length === i ? 'on' : '')}>{st.otp[i] || ''}</div>)}</div>
          {st.otpErr && <div style={{ color: 'var(--red)', fontSize: 22 }}>Incorrect OTP</div>}
          <Keypad onKey={press} label={T('verifyBtn')} disabled={st.otp.length < 6} onGo={verifyOtp} />
          <div className="mut">💬 {T('demoOtp')} <b>123456</b> <button className="chip" style={{ height: 40, fontSize: 17 }} onClick={() => up({ otp: '123456' })}>{T('fill')}</button></div></div>
        <FaceCard T={T} say={say} /></div></div>
  ),

  bkok: ({ st, go, T }) => {
    const d = DOCTORS[st.di], sp = SPECIALITIES[d[0]]
    return (
      <div className="main" style={{ flexDirection: 'row' }}>
        <div className="card f1 col"><div className="row"><div className="big">✓</div><div><h1 style={{ border: 0, padding: 0, fontSize: 42 }}>{T('confirmed')}</h1><div className="mut">SMS & WhatsApp → +91 {maskPhone(st.phone)}</div></div></div>
          <div className="aid"><small>{T('apptId')}</small><b>{st.apt}</b></div>
          <Kv rows={[[T('doctor'), 'Dr. ' + d[1]], [T('when'), `${dayLabel(dayAt(st.day), st.lang)}, ${t12(st.time)}`], [T('where'), `${T('room')} ${d[8]} · ${floorName(sp[2], T)}`]]} />
          <div className="card" style={{ background: '#fff4d6', color: '#8a5a00', padding: 16, fontSize: 21 }}>ℹ️ Consultation fee {money(d[9])} – pay now, or at the OPD billing counter before your visit.</div>
          <div className="row"><button className="btn" onClick={() => window.print()}>🖨 {T('print')}</button></div></div>
        <div className="card c col" style={{ width: 520 }}><FakeQR seed={st.apt} /><p className="mut">Scan to add to your calendar (demo QR)</p></div>
      </div>
    )
  },

  rev: ({ st, go, T }) => (
    <div className="main" style={{ flexDirection: 'row' }}>
      <div className="card f1 col"><b style={{ color: 'var(--red)' }}>{st.tx}</b><h2>{st.pline}</h2><div className="mut">{OPEN_BILL.patient} · UHID {OPEN_BILL.uhid}</div><div style={{ flex: 1 }} />
        <Kv rows={[['Bill amount', money(st.amt)]]} /><div className="tot"><span>{T('balance')}</span>{money(st.amt)}</div></div>
      <div className="card" style={{ width: 800 }}><h2 style={{ marginBottom: 18 }}>{T('review')} · {money(st.amt)}</h2>
        {[['📱', 'upi', 'upiD', 'upi'], ['💳', 'card', 'cardD', 'card'], ['🌐', 'online', 'onlineD', 'ok']].map(([i, a, b, to]) => (
          <button key={a} className="opt" onClick={() => go(to, { rc: String(Date.now()).slice(-6) })}><span>{i}</span><div className="f1"><b>{T(a)}</b><small>{T(b)}</small></div>›</button>))}
        <p className="mut">🔒 Payments go through the hospital’s payment gateway. The kiosk never stores card details.</p></div>
    </div>
  ),

  upi: ({ st, T }) => (
    <div className="main"><h1>{T('scanUpi')}</h1><div className="row f1 c" style={{ gap: 80 }}><div className="card"><FakeQR seed={st.tx} size={380} /></div>
      <div className="col c"><div className="tot" style={{ fontSize: 80 }}>{money(st.amt)}</div><div style={{ fontSize: 26 }}>GPay · PhonePe · Paytm · BHIM</div><p className="mut">TXN {st.tx}</p></div></div></div>
  ),

  card: ({ st, T }) => (
    <div className="main c"><h1>{T('card')}</h1><div style={{ width: 380, height: 300, borderRadius: 30, background: '#1f2933', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}><div style={{ fontSize: 70 }}>💳</div><div style={{ fontSize: 58, fontWeight: 700 }}>{money(st.amt)}</div></div><p style={{ fontSize: 28 }}>{T('cardD')}</p></div>
  ),

  ok: ({ st, T }) => (
    <div className="main c"><div className="big">✓</div><h1 style={{ color: 'var(--ok)', border: 0, padding: 0 }}>{T('paid')}</h1>
      <div className="card" style={{ width: 900 }}><Kv rows={[['Patient', OPEN_BILL.patient], ['Amount', money(st.amt)], ['TXN', st.tx], ['Receipt', 'RC-' + st.rc]]} /></div>
      <button className="btn" onClick={() => window.print()}>🖨 {T('print')}</button></div>
  ),

  bill: ({ T }) => (
    <div className="main"><h1>{T('pay')}</h1><div className="row f1" style={{ alignItems: 'stretch' }}>
      <div className="card f1"><Kv rows={[['UHID', OPEN_BILL.uhid], ['Bill', OPEN_BILL.id], ['Patient', OPEN_BILL.patient]]} /></div>
      <div className="card f1 c col"><h2>{T('outstanding')}</h2><div className="tot" style={{ fontSize: 80, justifyContent: 'center' }}>{money(OPEN_BILL.amount)}</div></div></div></div>
  ),

  cin: ({ st, T }) => {
    const a = st.appts[st.appts.length - 1], d = DOCTORS[a ? a.di : 5]
    return <div className="main c"><h1>{T('ci')}</h1><div className="card" style={{ width: 900 }}><Kv rows={[[T('doctor'), 'Dr. ' + d[1]], ['Speciality', SPECIALITIES[d[0]][0]], [T('when'), a ? `${dayLabel(dayAt(a.day), st.lang)} · ${t12(a.time)}` : 'Today · 11:20 am'], [T('room'), d[8]]]} /></div></div>
  },

  cinok: ({ st, T }) => (
    <div className="main c"><div className="big">✓</div><h1 style={{ color: 'var(--ok)', border: 0, padding: 0 }}>{T('tokenTitle')}</h1>
      <div className="card c" style={{ background: 'var(--red)', color: '#fff', width: 700 }}><div style={{ fontSize: 26 }}>{T('token')}</div><div style={{ fontSize: 120, fontWeight: 700 }}>{st.tok}</div><div style={{ fontSize: 26 }}>{T('wait')}: ~12 min</div></div></div>
  ),

  rep: ({ st, up, T }) => (
    <div className="main"><h1>{T('rep')}</h1><p className="sub">{T('selectReports')} · {st.sel.length}</p>
      <div className="row f1" style={{ alignItems: 'flex-start', gap: 28 }}><div className="card f1">{REPORTS.map((r, i) => <div className="kv" key={r} style={{ cursor: 'pointer' }} onClick={() => up({ sel: st.sel.includes(i) ? st.sel.filter((x) => x !== i) : [...st.sel, i] })}><span style={{ color: 'var(--ink)' }}>{st.sel.includes(i) ? '☑' : '☐'} 📄 {r}</span><b style={{ color: 'var(--ok)' }}>Ready</b></div>)}</div>
        <button className="btn p" disabled={!st.sel.length} onClick={() => window.print()}>🖨 {T('printSel')}</button></div></div>
  ),

  ins: ({ T }) => (
    <div className="main"><h1>{T('ins')}</h1><div className="card" style={{ maxWidth: 1200 }}>{FORMS.map((f) => <div className="kv" key={f}><span style={{ color: 'var(--ink)' }}>📎 {f}</span><button className="chip" onClick={() => window.print()}>{T('print')}</button></div>)}
      <p className="mut" style={{ marginTop: 14 }}>TPA helpdesk · Ground floor, main lobby</p></div></div>
  ),

  way: ({ st, up, T }) => {
    const sel = ROOMS.find((r) => r[0] === st.wr), fl = sel ? sel[1] : 0
    return (
      <div className="main"><h1>{T('way')}</h1><div className="row f1" style={{ alignItems: 'stretch', minHeight: 0 }}>
        <div className="card col" style={{ width: 560, overflow: 'auto' }}>{ROOMS.map(([n, f]) => <button key={n} className={'chip ' + (st.wr === n ? 'on' : '')} style={{ textAlign: 'start' }} onClick={() => up({ wr: n })}>📍 {n} · {floorName(f, T)}</button>)}</div>
        <div className="card f1"><h2 style={{ marginBottom: 12 }}>{floorName(fl, T)}</h2><div className="g3">{ROOMS.filter((r) => r[1] === fl).map(([n]) => <div key={n} className="card c" style={{ height: 150, background: st.wr === n ? '#fdecef' : '#e8f1fa', borderColor: st.wr === n ? 'var(--red)' : '#9fb6cc', borderWidth: st.wr === n ? 4 : 1, display: 'flex' }}><b>{n}</b></div>)}</div>
          <p style={{ marginTop: 18, color: 'var(--red)', fontSize: 24, fontWeight: 700 }}>📍 You are here: Main lobby, Ground floor{fl ? ` → take the lift to ${floorName(fl, T)}` : ''}</p></div></div></div>
    )
  },

  reg: ({ st, up, T }) => (
    <div className="main"><h1>{T('reg')}</h1><div className="card" style={{ width: 1000, alignSelf: 'center' }}>
      <input className="fi" placeholder={T('regName')} value={st.name} onChange={(e) => up({ name: e.target.value })} />
      <input className="fi" type="number" placeholder={T('regAge')} value={st.age} onChange={(e) => up({ age: e.target.value })} /></div></div>
  ),

  regok: ({ st, T }) => (
    <div className="main c"><div className="big">✓</div><h1 style={{ border: 0, padding: 0 }}>{T('regDone')}</h1><div className="card c" style={{ width: 760 }}><div style={{ fontSize: 30 }}>{st.name}</div><div style={{ fontSize: 72, fontWeight: 700, color: 'var(--red)' }}>{st.uhid}</div></div></div>
  ),
}

export function firstFreeDay(di) { for (let o = 0; o < 6; o++) if (freeCount(di, o) > 0) return o; return 0 }
