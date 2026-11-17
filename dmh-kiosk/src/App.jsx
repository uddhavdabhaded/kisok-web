import { useCallback, useEffect, useState } from 'react'
import logo from './assets/logo.png'
import { HOSPITAL, DEMO_OTP, DOCTORS, OPEN_BILL } from './data'
import { t, SPEECH_LANG } from './i18n'
import { rnd, validPhone } from './utils'
import { SCREENS } from './screens.jsx'

const INIT = {
  s: 'splash', h: [], f: [], lang: 'en', vd: false, flow: null, after: null, lb: null,
  phone: '', otp: '', otpErr: false, sp: -1, q: '', di: null, day: 0, time: null, appts: [], apt: null,
  amt: 0, pline: '', tx: '', rc: '', tok: '', sel: [], wr: null, name: '', age: '', uhid: '',
}
const BOOK_STEP = { spec: 0, doc: 1, slot: 2, vm: 3, vo: 3, bkok: 4 }
const PAY_STEP = { bill: 0, vm: 1, vo: 1, rev: 2, upi: 3, card: 3, ok: 4 }
const IDLE_MS = 120000

export default function App() {
  const [st, setSt] = useState(INIT)
  const [reading, setReading] = useState(false)
  const [toast, setToast] = useState('')
  const [scale, setScale] = useState(1)
  const [now, setNow] = useState(new Date())
  const T = useCallback((k) => t(st.lang, k), [st.lang])

  // ---- navigation (history + forward stack) ----
  const up = (p) => setSt((x) => ({ ...x, ...p }))
  const go = (s, p = {}) => setSt((x) => ({ ...x, ...p, s, f: [], h: s === 'home' ? [] : x.s === 'splash' || x.s === s ? x.h : [...x.h, x.s] }))
  const back = () => setSt((x) => { const h = [...x.h], q = h.pop(); return { ...x, h, s: q || (x.s === 'lang' ? 'splash' : 'home'), f: [...x.f, x.s] } })
  const fwd = () => setSt((x) => { const f = [...x.f], q = f.pop(); return q ? { ...x, f, s: q, h: [...x.h, x.s] } : x })
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 5000) }

  // ---- verification gate: services that need identity go through OTP first ----
  const finish = (after) => {
    if (after === 'bkmake') {
      const id = 'APT-' + rnd(6)
      setSt((x) => ({ ...x, s: 'bkok', apt: id, tx: 'DEMO' + rnd(10), appts: [...x.appts, { id, di: x.di, day: x.day, time: x.time }], h: [...x.h, x.s], f: [] }))
    } else go(after)
  }
  const need = (after, flow = null) => (st.vd ? (after === 'bkmake' ? finish(after) : go(after, { flow })) : go('vm', { after, flow, phone: '', otp: '', otpErr: false }))
  const press = (k) => setSt((x) => {
    const f = x.s === 'vm' ? 'phone' : 'otp', max = f === 'phone' ? 10 : 6
    const v = k === '⌫' ? x[f].slice(0, -1) : x[f].length < max ? x[f] + k : x[f]
    return { ...x, [f]: v, otpErr: false }
  })
  const verifyOtp = () => { if (st.otp === DEMO_OTP) { up({ vd: true }); finish(st.after) } else up({ otp: '', otpErr: true }) }
  const startPay = (amt, pline) => go('rev', { amt, pline, flow: 'pay', tx: 'DEMO' + rnd(10) })
  const paid = () => go('ok', { rc: rnd(6) })

  // ---- footer "Next" – primary action of the current screen ----
  const next = () => {
    const d = DOCTORS[st.di] || DOCTORS[0], n = T('next') + ' →'
    switch (st.s) {
      case 'lang': return { l: T('start') + ' →', fn: () => go(st.lb || 'home') }
      case 'slot': return { l: '✓ ' + T('confirm'), dis: st.time == null, fn: () => need('bkmake', 'book') }
      case 'vm': return { l: T('sendOtp') + ' →', dis: !validPhone(st.phone), fn: () => go('vo', { otp: '' }) }
      case 'vo': return { l: T('verifyBtn') + ' →', dis: st.otp.length < 6, fn: verifyOtp }
      case 'bkok': return { l: `💳 ${T('payNow')} ₹${d[9]}`, fn: () => startPay(d[9], 'Consultation – Dr. ' + d[1]) }
      case 'bill': return { l: T('payNow') + ' →', fn: () => startPay(OPEN_BILL.amount, OPEN_BILL.id) }
      case 'upi': return { l: '▶ ' + T('simPaid'), fn: paid }
      case 'card': return { l: '▶ ' + T('simTap'), fn: paid }
      case 'cin': return { l: T('checkIn') + ' →', fn: () => go('cinok', { tok: 'A-' + rnd(3) }) }
      case 'reg': return { l: T('regSave') + ' →', dis: !st.name.trim(), fn: () => go('regok', { uhid: 'DMH' + rnd(7) }) }
      case 'ok': case 'cinok': case 'regok': return { l: '⌂ ' + T('home'), fn: () => go('home') }
      case 'rep': case 'ins': case 'way': return { l: T('done') + ' ✓', fn: () => go('home') }
      case 'home': case 'splash': return null
      default: return st.f.length ? { l: n, fn: fwd } : { l: n, dis: true }
    }
  }

  // ---- read aloud (toggle) ----
  const speak = () => {
    const ss = window.speechSynthesis
    if (!ss) return
    if (reading || ss.speaking) { ss.cancel(); setReading(false); return }
    const u = new SpeechSynthesisUtterance(document.querySelector('.main, .wel')?.innerText || '')
    u.lang = SPEECH_LANG[st.lang] || 'en-IN'
    u.onend = u.onerror = () => setReading(false)
    setReading(true); ss.speak(u)
  }
  useEffect(() => { window.speechSynthesis?.cancel(); setReading(false) }, [st.s])

  // ---- clock, scaling (1920×1080 stage), idle reset ----
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 10000); return () => clearInterval(i) }, [])
  useEffect(() => { const f = () => setScale(Math.min(innerWidth / 1920, innerHeight / 1080)); f(); addEventListener('resize', f); return () => removeEventListener('resize', f) }, [])
  useEffect(() => {
    let id; const arm = () => { clearTimeout(id); id = setTimeout(() => setSt((x) => (x.s === 'splash' ? x : { ...INIT })), IDLE_MS) }
    arm(); addEventListener('pointerdown', arm); return () => { clearTimeout(id); removeEventListener('pointerdown', arm) }
  }, [])

  const Screen = SCREENS[st.s], nx = next()
  const stepMap = st.flow === 'book' ? BOOK_STEP : st.flow === 'pay' ? PAY_STEP : null
  const cur = stepMap?.[st.s], labels = st.flow === 'book' ? T('steps') : T('payStepsLbl')
  const loc = st.lang + '-IN'

  return (
    <div className="stage" style={{ transform: `scale(${scale})` }} dir={st.lang === 'ur' ? 'rtl' : 'ltr'}>
      <header className="hdr">
        <img src={logo} alt="DMH logo" />
        <div><b>{HOSPITAL.name} {HOSPITAL.sub}</b><small>{HOSPITAL.city} · Patient Services Kiosk</small></div>
        <div className="sp" />
        <div className="clk">{now.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' })}<small>{now.toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</small></div>
        <button className="chip" onClick={() => go('lang', { lb: st.s === 'lang' ? st.lb : st.s })}>🌐 {st.lang.toUpperCase()}</button>
        <button className="chip" onClick={() => go('home')}>⌂</button>
      </header>
      {cur !== undefined && stepMap && (
        <div className="steps">{labels.map((l, i) => <div key={l} className={i < cur ? 'dn' : i === cur ? 'on' : ''}><i>{i < cur ? '✓' : i + 1}</i>{l}</div>)}</div>
      )}
      <Screen st={st} up={up} go={go} need={need} press={press} verifyOtp={verifyOtp} T={T} say={say} />
      <footer className="ftr">
        {st.s !== 'splash' && <><button className="chip" onClick={back}>← {T('back')}</button><button className="chip" onClick={() => go('home')}>⌂ {T('home')}</button></>}
        <span className="demo">{T('demo')}</span><span className="mid">{T('help')}</span>
        <button className="chip" onClick={speak}>{reading ? '⏹ ' + T('stop') : '🔊 ' + T('read')}</button>
        <button className="chip" style={{ background: 'var(--ok)', color: '#fff', borderColor: 'var(--ok)' }} onClick={() => say(T('staffMsg'))}>📞 {T('call')}</button>
        {nx && <button className="chip nx" disabled={nx.dis} onClick={nx.fn}>{nx.l}</button>}
      </footer>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
