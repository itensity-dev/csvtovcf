import { describe, expect, it } from 'vitest';
import { splitFullName } from '../src/names';

const s = (name: string, locale?: string) => {
  const p = splitFullName(name, locale ? { locale } : {});
  return [p.prefix, p.given, p.middle, p.family, p.suffix];
};

describe('splitFullName', () => {
  it.each([
    ['John Smith', undefined, ['', 'John', '', 'Smith', '']],
    ['John A. Smith', undefined, ['', 'John', 'A.', 'Smith', '']],
    ['Dr. Jane Doe PhD', undefined, ['Dr.', 'Jane', '', 'Doe', 'PhD']],
    ['Smith, John', undefined, ['', 'John', '', 'Smith', '']],
    ['Smith, John Paul', undefined, ['', 'John', 'Paul', 'Smith', '']],
    ['John Smith, Jr.', undefined, ['', 'John', '', 'Smith', 'Jr.']],
    ['Ludwig van Beethoven', undefined, ['', 'Ludwig', '', 'van Beethoven', '']],
    ['Иванов Иван Иванович', 'ru', ['', 'Иван', 'Иванович', 'Иванов', '']],
    ['Иван Иванович Иванов', 'ru', ['', 'Иван', 'Иванович', 'Иванов', '']],
    ['Петрова Ирина', 'ru', ['', 'Ирина', '', 'Петрова', '']],
    ['Ирина Петрова', 'ru', ['', 'Ирина', '', 'Петрова', '']],
    ['Juan García López', 'es', ['', 'Juan', '', 'García López', '']],
    ['María José García López', 'es', ['', 'María José', '', 'García López', '']],
    ['José Ortega y Gasset', 'es', ['', 'José', '', 'Ortega y Gasset', '']],
    ['João da Silva', 'pt', ['', 'João', '', 'da Silva', '']],
    ['Ana Paula Silva Santos', 'pt', ['', 'Ana', 'Paula', 'Silva Santos', '']],
    ['Budi', 'id', ['', 'Budi', '', '', '']],
    ['Ahmad bin Abdullah', 'id', ['', 'Ahmad', '', 'bin Abdullah', '']],
    ['山田 太郎', undefined, ['', '太郎', '', '山田', '']],
    ['王小明', undefined, ['', '王小明', '', '', '']],
    ['  Ayşe   Yılmaz ', 'tr', ['', 'Ayşe', '', 'Yılmaz', '']],
  ] as const)('%s', (name, locale, expected) => {
    expect(s(name, locale)).toEqual(expected);
  });
});
