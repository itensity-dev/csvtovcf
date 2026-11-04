import type { Contact } from './types.js';
import { phoneKey } from './phones.js';

export interface DuplicateGroup {
  /** Indexes into the contacts array; the first one is kept as the base of the merge. */
  members: number[];
  /** What the members share. */
  by: ('phone' | 'email')[];
  /** The shared values (for the preview). */
  keys: string[];
}

/**
 * Find contacts that share a phone number (E.164, or last 9 digits) or an e-mail (case-insensitive).
 * Union-find, so A–B by phone and B–C by e-mail end up in one group.
 */
export function findDuplicates(contacts: Contact[]): DuplicateGroup[] {
  const parent = contacts.map((_, i) => i);
  const find = (i: number): number => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]!]!;
      i = parent[i]!;
    }
    return i;
  };
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
  };
  const seen = new Map<string, number>();
  const linkBy = new Map<number, { by: Set<'phone' | 'email'>; keys: Set<string> }>();
  const note = (i: number, by: 'phone' | 'email', key: string) => {
    let e = linkBy.get(i);
    if (!e) linkBy.set(i, (e = { by: new Set(), keys: new Set() }));
    e.by.add(by);
    e.keys.add(key);
  };
  contacts.forEach((c, i) => {
    const keys = new Set<string>();
    for (const p of c.phones) {
      const k = phoneKey(p.value, p.e164);
      if (k) keys.add(`p:${k}`);
    }
    for (const e of c.emails) {
      const k = e.value.trim().toLowerCase();
      if (k.includes('@')) keys.add(`e:${k}`);
    }
    for (const k of keys) {
      const j = seen.get(k);
      if (j === undefined) seen.set(k, i);
      else {
        union(i, j);
        const by = k.startsWith('p:') ? 'phone' : 'email';
        note(i, by, k.slice(2));
        note(j, by, k.slice(2));
      }
    }
  });
  const groups = new Map<number, number[]>();
  contacts.forEach((_, i) => {
    const r = find(i);
    const g = groups.get(r);
    if (g) g.push(i);
    else groups.set(r, [i]);
  });
  const out: DuplicateGroup[] = [];
  for (const members of groups.values()) {
    if (members.length < 2) continue;
    const by = new Set<'phone' | 'email'>();
    const keys = new Set<string>();
    for (const m of members) {
      const e = linkBy.get(m);
      e?.by.forEach((b) => by.add(b));
      e?.keys.forEach((k) => keys.add(k));
    }
    out.push({ members, by: [...by], keys: [...keys] });
  }
  return out;
}

function longer(a: string, b: string): string {
  return b.trim().length > a.trim().length ? b : a;
}

/**
 * Merge a group into one contact: the longest name wins, every distinct phone,
 * e-mail, address and URL is kept, notes and categories are combined.
 */
export function mergeContacts(group: Contact[]): Contact {
  const [first, ...rest] = group;
  if (!first) throw new Error('empty group');
  const m: Contact = structuredClone(first);
  for (const c of rest) {
    const nameA = [m.given, m.middle, m.family].join(' ').trim();
    const nameB = [c.given, c.middle, c.family].join(' ').trim();
    if (nameB.length > nameA.length) {
      m.prefix = c.prefix || m.prefix;
      m.given = c.given;
      m.middle = c.middle;
      m.family = c.family;
      m.suffix = c.suffix || m.suffix;
    }
    m.fullName = longer(m.fullName, c.fullName);
    for (const k of ['nickname', 'phoneticGiven', 'phoneticMiddle', 'phoneticFamily', 'org', 'department', 'title'] as const) {
      if (!m[k] && c[k]) m[k] = c[k];
    }
    for (const p of c.phones) {
      const key = p.e164 ?? p.value.replace(/\D/g, '');
      if (!m.phones.some((q) => (q.e164 ?? q.value.replace(/\D/g, '')) === key)) m.phones.push(p);
    }
    for (const e of c.emails) {
      if (!m.emails.some((q) => q.value.toLowerCase() === e.value.toLowerCase())) m.emails.push(e);
    }
    for (const a of c.addresses) {
      const key = [a.street, a.city, a.postalCode, a.country].join('|').toLowerCase();
      if (!m.addresses.some((q) => [q.street, q.city, q.postalCode, q.country].join('|').toLowerCase() === key)) {
        m.addresses.push(a);
      }
    }
    for (const u of c.urls) if (!m.urls.some((q) => q.value === u.value)) m.urls.push(u);
    if (!m.birthday && c.birthday) m.birthday = c.birthday;
    if (!m.anniversary && c.anniversary) m.anniversary = c.anniversary;
    if (c.note && !m.note.includes(c.note)) m.note = m.note ? `${m.note}\n${c.note}` : c.note;
    for (const cat of c.categories) if (!m.categories.includes(cat)) m.categories.push(cat);
    m.warnings.push(...c.warnings);
  }
  return m;
}

/** Apply merges: returns a new list where each selected group is replaced by its merged contact (at the first member's position). */
export function applyMerges(contacts: Contact[], groups: DuplicateGroup[]): Contact[] {
  const replaced = new Map<number, Contact>();
  const drop = new Set<number>();
  for (const g of groups) {
    const sorted = [...g.members].sort((a, b) => a - b);
    replaced.set(sorted[0]!, mergeContacts(sorted.map((i) => contacts[i]!)));
    for (const i of sorted.slice(1)) drop.add(i);
  }
  const out: Contact[] = [];
  contacts.forEach((c, i) => {
    if (drop.has(i)) return;
    out.push(replaced.get(i) ?? c);
  });
  return out;
}
