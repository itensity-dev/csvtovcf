import { describe, expect, it } from 'vitest';
import { applyMerges, findDuplicates, mergeContacts } from '../src/dedupe';
import { emptyContact, type Contact } from '../src/types';

const c = (p: Partial<Contact>): Contact => ({ ...emptyContact(0, 1), ...p });
const ph = (value: string, e164?: string) => ({ value, raw: value, type: 'cell' as const, valid: true, ...(e164 ? { e164 } : {}) });

describe('findDuplicates', () => {
  const list = [
    c({ fullName: 'Ann', phones: [ph('+12025550143', '+12025550143')] }),
    c({ fullName: 'Ann Lee', phones: [ph('(202) 555-0143', '+12025550143')], emails: [{ value: 'ann@example.com', type: 'home' }] }),
    c({ fullName: 'A. Lee', emails: [{ value: 'ANN@example.com', type: 'work' }] }),
    c({ fullName: 'Bob', phones: [ph('+12025550111', '+12025550111')] }),
    c({ fullName: 'Иван', phones: [ph('8 (999) 123-45-67')] }),
    c({ fullName: 'Иван П.', phones: [ph('+7 999 123 45 67')] }),
  ];
  const groups = findDuplicates(list);
  it('groups by phone and e-mail transitively', () => {
    expect(groups.map((g) => g.members)).toEqual([
      [0, 1, 2],
      [4, 5],
    ]);
    expect(groups[0]!.by.sort()).toEqual(['email', 'phone']);
  });
  it('merges into one contact keeping every distinct value', () => {
    const merged = applyMerges(list, groups);
    expect(merged.length).toBe(3);
    expect(merged[0]!.fullName).toBe('Ann Lee');
    expect(merged[0]!.phones.length).toBe(1);
    expect(merged[0]!.emails.length).toBe(1);
  });
  it('merge keeps notes and categories', () => {
    const m = mergeContacts([c({ note: 'a', categories: ['X'] }), c({ note: 'b', categories: ['X', 'Y'], birthday: { month: 1, day: 2 } })]);
    expect(m.note).toBe('a\nb');
    expect(m.categories).toEqual(['X', 'Y']);
    expect(m.birthday).toEqual({ month: 1, day: 2 });
  });
});
