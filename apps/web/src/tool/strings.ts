import type en from '../i18n/ui/en.json';

type Dict = typeof en;

/** The subset of the dictionary the island needs (serialized into the page for hydration). */
export interface ToolStrings {
  tool: Dict['tool'];
  fields: Dict['fields'];
  fieldGroups: Dict['fieldGroups'];
}

export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}
