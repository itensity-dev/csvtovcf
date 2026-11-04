import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import type { ColumnMapping, FieldKey } from 'csvtovcf/fields';
import { ADDRESS_TYPES, EMAIL_TYPES, PHONE_TYPES, URL_TYPES, confidenceLevel, fieldFamily } from 'csvtovcf/fields';
import type { FileMeta } from './engine';
import type { ToolStrings } from './strings';
import { fmt } from './strings';

const GROUPS: { key: keyof ToolStrings['fieldGroups']; fields: FieldKey[] }[] = [
  { key: 'name', fields: ['name.full', 'name.given', 'name.middle', 'name.family', 'name.prefix', 'name.suffix', 'name.nickname', 'name.phoneticGiven', 'name.phoneticMiddle', 'name.phoneticFamily'] },
  { key: 'phone', fields: ['phone', 'phone.label'] },
  { key: 'email', fields: ['email', 'email.label'] },
  { key: 'adr', fields: ['adr.full', 'adr.street', 'adr.extended', 'adr.poBox', 'adr.city', 'adr.region', 'adr.postalCode', 'adr.country', 'adr.label'] },
  { key: 'org', fields: ['org.name', 'org.department', 'org.title'] },
  { key: 'date', fields: ['birthday', 'anniversary', 'event', 'event.label'] },
  { key: 'other', fields: ['url', 'url.label', 'note', 'custom', 'custom.label', 'categories'] },
];

function typesFor(f: FieldKey): readonly string[] | null {
  if (f === 'phone') return PHONE_TYPES;
  if (f === 'email') return EMAIL_TYPES;
  if (f === 'url') return URL_TYPES;
  if (f.startsWith('adr.') && f !== 'adr.label') return ADDRESS_TYPES;
  return null;
}

function defaultType(f: FieldKey): string | undefined {
  if (f === 'phone') return 'cell';
  if (f === 'email' || f === 'url') return 'other';
  if (f.startsWith('adr.') && f !== 'adr.label') return 'home';
  return undefined;
}

/** vCard property a field ends up in — shown on the right-hand jacks. */
function prop(f: FieldKey): string {
  if (f === 'name.full') return 'FN';
  if (f === 'name.nickname') return 'NICKNAME';
  if (f.startsWith('name.phonetic')) return 'X-PHONETIC';
  if (f.startsWith('name.')) return 'N';
  if (f === 'org.title') return 'TITLE';
  if (f.startsWith('org.')) return 'ORG';
  if (f.startsWith('phone')) return 'TEL';
  if (f.startsWith('email')) return 'EMAIL';
  if (f.startsWith('adr.')) return 'ADR';
  if (f.startsWith('url')) return 'URL';
  if (f === 'birthday') return 'BDAY';
  if (f === 'anniversary') return 'ANNIVERSARY';
  if (f.startsWith('event')) return 'BDAY/DATE';
  if (f === 'categories') return 'CATEGORIES';
  return 'NOTE';
}

const ORDER = ['FN', 'N', 'NICKNAME', 'X-PHONETIC', 'ORG', 'TITLE', 'TEL', 'EMAIL', 'ADR', 'URL', 'BDAY', 'ANNIVERSARY', 'BDAY/DATE', 'NOTE', 'CATEGORIES'];

interface RailJack {
  key: string;
  prop: string;
  sub: string;
}

function railKey(m: ColumnMapping, s: ToolStrings): RailJack | null {
  if (m.field === 'ignore') return null;
  const p = prop(m.field);
  const fam = fieldFamily(m.field);
  if (fam === 'phone' || fam === 'email' || fam === 'adr' || fam === 'url') {
    const t = m.type ?? '';
    const g = m.group ?? t;
    const tLabel =
      fam === 'phone'
        ? (s.tool.phoneTypes as Record<string, string>)[t] ?? ''
        : (s.tool.simpleTypes as Record<string, string>)[t] ?? '';
    return { key: `${p}:${g}`, prop: p, sub: tLabel || (m.group ? `#${m.group.replace(/\D/g, '') || m.group}` : '') };
  }
  return { key: p, prop: p, sub: '' };
}

interface Props {
  file: FileMeta;
  fileIndex: number;
  s: ToolStrings;
  onChange: (column: number, m: ColumnMapping) => void;
}

export function PatchPanel({ file, fileIndex, s, onChange }: Props) {
  const [showEmpty, setShowEmpty] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<{ d: string; level: string; key: string }[]>([]);
  const [height, setHeight] = useState(0);

  const cols = file.columns.filter((c) => showEmpty || c.filled > 0 || file.mapping[c.index]?.field !== 'ignore');
  const emptyCount = file.columns.length - file.columns.filter((c) => c.filled > 0 || file.mapping[c.index]?.field !== 'ignore').length;

  const jacks: RailJack[] = [];
  const seen = new Set<string>();
  for (const c of cols) {
    const m = file.mapping[c.index];
    const j = m ? railKey(m, s) : null;
    if (j && !seen.has(j.key)) {
      seen.add(j.key);
      jacks.push(j);
    }
  }
  jacks.sort((a, b) => ORDER.indexOf(a.prop) - ORDER.indexOf(b.prop) || a.key.localeCompare(b.key));

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const draw = () => {
      const gutter = el.querySelector<HTMLElement>('.patch__wires');
      if (!gutter || gutter.offsetParent === null) {
        setPaths([]);
        return;
      }
      const g = gutter.getBoundingClientRect();
      const out: { d: string; level: string; key: string }[] = [];
      for (const c of cols) {
        const m = file.mapping[c.index];
        const j = m ? railKey(m, s) : null;
        if (!m || !j) continue;
        const from = el.querySelector<HTMLElement>(`[data-jack-col="${c.index}"]`);
        const to = el.querySelector<HTMLElement>(`[data-jack-rail="${CSS.escape(j.key)}"]`);
        if (!from || !to) continue;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const y1 = a.top + a.height / 2 - g.top;
        const y2 = b.top + b.height / 2 - g.top;
        const x1 = a.left + a.width / 2 - g.left;
        const x2 = b.left + b.width / 2 - g.left;
        const w = g.width;
        const level = m.source === 'user' ? 'user' : confidenceLevel(m);
        out.push({
          d: `M${x1.toFixed(1)} ${y1.toFixed(1)} C ${(w * 0.6).toFixed(1)} ${y1.toFixed(1)}, ${(w * 0.4).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
          level,
          key: `${c.index}`,
        });
      }
      setPaths(out);
      setHeight(g.height);
    };
    // Measuring the panel forces a layout: do it when the main thread is idle, not during hydration.
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const first = idle ? idle(schedule, { timeout: 1500 }) : window.setTimeout(schedule, 200);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      cancelAnimationFrame(raf);
      const cancelIdle = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cancelIdle) cancelIdle(first);
      else clearTimeout(first);
    };
  }, [file, showEmpty]);

  const change = (col: number, field: FieldKey, type?: string) => {
    const prev = file.mapping[col];
    const t = type ?? (prev && fieldFamily(prev.field) === fieldFamily(field) ? prev.type : undefined) ?? defaultType(field);
    const isAdr = field.startsWith('adr.');
    const keepGroup = prev?.group && fieldFamily(prev.field) === fieldFamily(field) && !type;
    const m: ColumnMapping = {
      field,
      ...(t ? { type: t } : {}),
      ...(keepGroup ? { group: prev!.group! } : isAdr ? { group: t ?? 'home' } : {}),
      confidence: 1,
      source: 'user',
    };
    onChange(col, m);
  };

  const levelText = (m: ColumnMapping) => {
    const l = m.source === 'user' ? 'user' : confidenceLevel(m);
    return l === 'none' ? '' : s.tool.map[l];
  };

  return (
    <div class="patch" ref={box}>
      <div class="patch__cols" role="list">
        {cols.map((c) => {
          const m = file.mapping[c.index] ?? { field: 'ignore' as FieldKey, confidence: 0, source: 'none' as const };
          const types = typesFor(m.field);
          const id = `map-${fileIndex}-${c.index}`;
          const level = m.source === 'user' ? 'user' : confidenceLevel(m);
          return (
            <div class={`patch__row lvl-${level}${m.field === 'ignore' ? ' is-off' : ''}`} role="listitem" key={c.index}>
              <span class="patch__letter mono" aria-hidden="true">
                {c.letter}
              </span>
              <div class="patch__src">
                <label class="patch__header" for={id} dir="auto">
                  <span class="sr-only">{s.tool.map.column} {c.letter}: </span>
                  {c.header || <span class="patch__noheader">{s.tool.map.column} {c.letter}</span>}
                </label>
                <span class="patch__samples mono" id={`${id}-s`} dir="auto">
                  {c.samples.length ? c.samples.join(' · ') : s.tool.map.empty}
                </span>
              </div>
              <div class="patch__ctl">
                <select id={id} aria-describedby={`${id}-s ${id}-c`} value={m.field} onChange={(e) => change(c.index, (e.currentTarget as HTMLSelectElement).value as FieldKey)}>
                  <option value="ignore">{s.tool.map.skip}</option>
                  {GROUPS.map((g) => (
                    <optgroup label={s.fieldGroups[g.key]} key={g.key}>
                      {g.fields.map((f) => (
                        <option value={f} key={f}>
                          {s.fields[f]}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {types ? (
                  <select
                    class="patch__type"
                    aria-label={`${s.tool.map.type}: ${s.fields[m.field]}`}
                    value={m.type ?? defaultType(m.field)}
                    onChange={(e) => change(c.index, m.field, (e.currentTarget as HTMLSelectElement).value)}
                  >
                    {types.map((t) => (
                      <option value={t} key={t}>
                        {m.field === 'phone' ? (s.tool.phoneTypes as Record<string, string>)[t] : (s.tool.simpleTypes as Record<string, string>)[t]}
                      </option>
                    ))}
                  </select>
                ) : null}
                <span class="patch__conf mono" id={`${id}-c`}>
                  {levelText(m)}
                </span>
              </div>
              <span class="patch__jack" data-jack-col={c.index} aria-hidden="true" />
            </div>
          );
        })}
      </div>
      <svg class="patch__wires" aria-hidden="true" height={height || undefined} preserveAspectRatio="none">
        {paths.map((p) => (
          <path d={p.d} class={`wire wire--${p.level}`} key={p.key} />
        ))}
      </svg>
      <ul class="patch__rail" aria-hidden="true">
        {jacks.map((j) => (
          <li class="patch__railjack" key={j.key}>
            <span class="patch__jack" data-jack-rail={j.key} />
            <span class="mono">{j.prop}</span>
            {j.sub ? <span class="patch__sub">{j.sub}</span> : null}
          </li>
        ))}
      </ul>
      {emptyCount > 0 ? (
        <button type="button" class="patch__toggle btn btn--quiet" onClick={() => setShowEmpty(!showEmpty)}>
          {fmt(showEmpty ? s.tool.map.hideEmpty : s.tool.map.showEmpty, { n: emptyCount })}
        </button>
      ) : null}
    </div>
  );
}
