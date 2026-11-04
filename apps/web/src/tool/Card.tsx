import type { Contact, PartialDate } from 'csvtovcf';
import type { ToolStrings } from './strings';
import { fmt } from './strings';

function dateText(d: PartialDate, intl: string): string {
  try {
    const dt = new Date(Date.UTC(d.year ?? 2000, d.month - 1, d.day));
    return new Intl.DateTimeFormat(intl, d.year ? { dateStyle: 'medium', timeZone: 'UTC' } : { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(dt);
  } catch {
    return `${d.year ?? '--'}-${d.month}-${d.day}`;
  }
}

/** One contact as a library catalog card: index line, red rule, blue ruled lines, rod hole. */
export function Card({ c, s, intl, showFile }: { c: Contact; s: ToolStrings; intl: string; showFile?: boolean }) {
  const lines: { k: string; v: string; bad?: string; mono?: boolean }[] = [];
  for (const p of c.phones) {
    const label = p.label ?? s.tool.phoneTypes[p.type];
    const bad =
      p.issue === 'excel-scientific'
        ? fmt(s.tool.warnings['phone-excel-scientific'], { value: p.raw })
        : p.valid === false
          ? s.tool.warnings['phone-invalid']
          : undefined;
    lines.push({ k: label, v: p.value, mono: true, ...(bad ? { bad } : {}) });
  }
  for (const e of c.emails) lines.push({ k: e.label ?? s.tool.card.email, v: e.value, mono: true });
  if (c.org || c.department) lines.push({ k: s.tool.card.org, v: [c.org, c.department].filter(Boolean).join(' · ') });
  if (c.title) lines.push({ k: s.tool.card.title, v: c.title });
  for (const a of c.addresses) {
    lines.push({
      k: `${s.tool.card.adr}${a.type !== 'home' ? ' · ' + (s.tool.simpleTypes[a.type] ?? a.type) : ''}`,
      v: [a.street, a.extended, [a.postalCode, a.city].filter(Boolean).join(' '), a.region, a.country].filter(Boolean).join(', '),
    });
  }
  for (const u of c.urls) lines.push({ k: s.tool.card.url, v: u.value, mono: true });
  if (c.birthday) lines.push({ k: s.tool.card.bday, v: dateText(c.birthday, intl) });
  if (c.anniversary) lines.push({ k: s.tool.card.anniversary, v: dateText(c.anniversary, intl) });
  if (c.nickname) lines.push({ k: s.tool.card.nickname, v: c.nickname });
  if (c.categories.length) lines.push({ k: s.tool.card.categories, v: c.categories.join(', ') });
  if (c.note) lines.push({ k: s.tool.card.note, v: c.note.length > 120 ? c.note.slice(0, 117) + '…' : c.note });
  const otherWarnings = c.warnings.filter((w) => !w.code.startsWith('phone-'));

  return (
    <article class="ccard" aria-label={c.fullName}>
      <header class="ccard__head">
        <h3 class="ccard__name" dir="auto">
          {c.fullName}
        </h3>
        <span class="ccard__row num">
          {showFile ? fmt(s.tool.card.file, { n: c.file + 1 }) + ' · ' : ''}№ {c.row}
        </span>
      </header>
      {(c.given || c.family) && c.fullName !== [c.given, c.family].filter(Boolean).join(' ') ? (
        <p class="ccard__n" dir="auto">
          N: <span>{[c.family, c.given, c.middle, c.prefix, c.suffix].join(';').replace(/;+$/, '')}</span>
        </p>
      ) : null}
      <dl class="ccard__body">
        {lines.map((l, i) => (
          <div class={'ccard__line' + (l.bad ? ' is-bad' : '')} key={i}>
            <dt>{l.k}</dt>
            <dd class={l.mono ? 'mono num' : ''} dir="auto">
              <span class="ccard__val">{l.v}</span>
              {l.bad ? <span class="ccard__bad">{l.bad}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
      {otherWarnings.length ? (
        <ul class="ccard__notes">
          {otherWarnings.map((w, i) => (
            <li key={i}>{fmt(s.tool.warnings[w.code], { value: w.value ?? '' })}</li>
          ))}
        </ul>
      ) : null}
      <span class="ccard__hole" aria-hidden="true" />
    </article>
  );
}
