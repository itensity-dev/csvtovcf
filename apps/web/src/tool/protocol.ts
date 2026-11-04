import type { ColumnMapping, Contact, Delimiter } from 'csvtovcf';
import type { CardFilter, FileMeta, OutputFormat, Summary, ToolOptions } from './engine';

export type Request =
  | { type: 'init'; locale: string }
  | { type: 'load'; files: { name: string; bytes: ArrayBuffer }[]; append: boolean }
  | { type: 'loadText'; name: string; text: string; append: boolean }
  | { type: 'loadTable'; name: string; rows: string[][] }
  | { type: 'reparse'; file: number; encoding?: string; delimiter?: Delimiter; sheet?: number; hasHeader?: boolean }
  | { type: 'setMapping'; file: number; mapping: ColumnMapping[] }
  | { type: 'remove'; file: number }
  | { type: 'convert'; options: Partial<ToolOptions> }
  | { type: 'page'; filter: CardFilter; page: number }
  | { type: 'export'; format: OutputFormat };

export type Response =
  | { type: 'files'; files: FileMeta[] }
  | { type: 'summary'; summary: Summary }
  | { type: 'page'; page: Contact[]; total: number }
  | { type: 'export'; name: string; mime: string; bytes: ArrayBuffer }
  | { type: 'error'; message: string };

export type Envelope<T> = T & { id: number };
