import { DOCTORS } from './data'
export const money = (n) => '₹' + n.toLocaleString('en-IN')
export const rnd = (n) => String(Math.floor(Math.random() * 10 ** n)).padStart(n, '0')
export const initials = (name) => name.split(' ').map((w) => w[0]).join('')
export const maskPhone = (p) => p.slice(0, 2) + '•••••' + p.slice(-3)
export const validPhone = (p) => /^[6-9]\d{9}$/.test(p)
export const dayAt = (offset) => { const d = new Date(); d.setDate(d.getDate() + offset); return d }
export const dayLabel = (d, lang = 'en') => d.toLocaleDateString(lang + '-IN', { weekday: 'short', day: 'numeric', month: 'short' })
const DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const daysText = (a) => { const s = [...a].sort(); return s.length > 2 && s.every((v, i) => !i || v === s[i - 1] + 1) ? `${DN[s[0]]} – ${DN[s[s.length - 1]]}` : s.map((v) => DN[v]).join(', ') }
const toMin = (x) => { const [h, m] = x.split(':').map(Number); return h * 60 + m }
const hhmm = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0')
export const t12 = (s) => { const [h, m] = s.split(':').map(Number); return String(((h + 11) % 12) + 1).padStart(2, '0') + ':' + String(m).padStart(2, '0') + (h < 12 ? ' am' : ' pm') }
/** null when the doctor does not work that day, else [[time, booked], …] (max 10). Replace with an API call. */
export function slotsFor(di, offset) {
  const d = DOCTORS[di], date = dayAt(offset)
  if (!d[5].includes(date.getDay())) return null
  const now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), out = []
  for (let m = toMin(d[6]), i = 0; m < toMin(d[7]) && out.length < 10; m += 20, i++) {
    if (offset === 0 && m <= nowMin + 10) continue
    out.push([hhmm(m), (di * 7 + offset * 3 + i * 5) % 4 === 0])
  }
  return out
}
export const freeCount = (di, o) => { const s = slotsFor(di, o); return s ? s.filter((x) => !x[1]).length : -1 }
