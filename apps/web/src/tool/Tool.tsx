import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ColumnMapping, Contact, Delimiter } from 'csvtovcf';
import { Card } from './Card';
import { PatchPanel } from './PatchPanel';
import { WorkerClient } from './client';
import type { CardFilter, FileMeta, OutputFormat, Summary, ToolOptions } from './engine';
import type { ToolStrings } from './strings';
import { fmt } from './strings';

export interface ToolProps {
  lang: string;
  intl: string;
  coreLocale: string;
  strings: ToolStrings;
  /** [ISO code, calling code] — names are localized at runtime with Intl.DisplayNames. */
  countries: [string, string][];
  encodings: { id: string; label: string; group: string }[];
  initialFiles: FileMeta[];
  initialSummary: Summary;
  initialOptions: ToolOptions;
  demoRows: string[][];
  demoName: string;
  /** Page preset: open the paste box first (Google Sheets page). */
  pasteFirst?: boolean;
  /** Accept attribute order for the file input. */
  accept: string;
}

type Tab = 'cards' | 'warnings' | 'skipped' | 'duplicates' | 'vcard';
type Busy = null | { kind: 'reading' | 'converting' | 'exporting'; name?: string };

const EXT: Record<OutputFormat, string> = { vcf: '.vcf', zip: '-vcards.zip', google: '-google.csv', outlook: '-outlook.csv' };

function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[\\/:*?"<>|]/g, '').trim() || 'contacts';
}

export default function Tool(props: ToolProps) {
  const s = props.strings;
  const T = s.tool;
  const nf = useMemo(() => new Intl.NumberFormat(props.intl), [props.intl]);
  const n = (x: number) => nf.format(x);

  const client = useRef<WorkerClient | null>(null);
  const demoLoaded = useRef(false);
  const convertSeq = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const pasteRef = useRef<HTMLTextAreaElement>(null);

  const [files, setFiles] = useState<FileMeta[]>(props.initialFiles);
  const [summary, setSummary] = useState<Summary>(props.initialSummary);
  const [options, setOptions] = useState<ToolOptions>(props.initialOptions);
  const [isSample, setIsSample] = useState(true);
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<Tab>('cards');
  const [filter, setFilter] = useState<CardFilter>('all');
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState<{ list: Contact[]; total: number }>({ list: props.initialSummary.page, total: props.initialSummary.total });
  const [pasteOpen, setPasteOpen] = useState(!!props.pasteFirst);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('');

  const countryNames = useMemo(() => {
    let dn: Intl.DisplayNames | null = null;
    try {
      dn = new Intl.DisplayNames([props.intl], { type: 'region' });
    } catch {
      dn = null;
    }
    return props.countries
      .map(([code, cc]) => ({ code, cc, name: dn?.of(code) ?? code }))
      .sort((a, b) => a.name.localeCompare(b.name, props.intl));
  }, [props.intl]);

  // Default country from the browser region when it matches the page language (es-AR on /es/ → AR).
  useEffect(() => {
    const langs = navigator.languages ?? [navigator.language];
    for (const l of langs) {
      const [lng, region] = l.split('-');
      if (lng && region && props.coreLocale.startsWith(lng.toLowerCase()) && props.countries.some(([c]) => c === region.toUpperCase())) {
        if (region.toUpperCase() !== options.country) setOptions((o) => ({ ...o, country: region.toUpperCase() }));
        break;
      }
    }
  }, []);

  const w = () => (client.current ??= new WorkerClient(props.coreLocale));

  async function ensureDemo() {
    if (isSample && !demoLoaded.current) {
      await w().send<'files'>({ type: 'loadTable', name: props.demoName, rows: props.demoRows });
      demoLoaded.current = true;
    }
  }

  async function convert(opts: ToolOptions = options) {
    const seq = ++convertSeq.current;
    setBusy({ kind: 'converting' });
    try {
      const r = await w().send<'summary'>({ type: 'convert', options: opts });
      if (seq !== convertSeq.current) return;
      setSummary(r.summary);
      setPage(0);
      setFilter('all');
      setCards({ list: r.summary.page, total: r.summary.total });
      setStatus(fmt(T.result.ready, { n: n(r.summary.total) }));
    } catch (e) {
      setError(String((e as Error).message));
    } finally {
      if (seq === convertSeq.current) setBusy(null);
    }
  }

  async function afterLoad(meta: FileMeta[]) {
    setFiles(meta);
    setActive(0);
    setIsSample(false);
    demoLoaded.current = false;
    setTab('cards');
    await convert();
  }

  async function loadFiles(list: FileList | File[], append = false) {
    const arr = Array.from(list);
    if (!arr.length) return;
    setError(null);
    setBusy({ kind: 'reading', name: arr.map((f) => f.name).join(', ') });
    setStatus(fmt(T.result.reading, { name: arr[0]!.name }));
    try {
      const payload = await Promise.all(arr.map(async (f) => ({ name: f.name, bytes: await f.arrayBuffer() })));
      const r = await w().send<'files'>({ type: 'load', files: payload, append: append && !isSample }, payload.map((p) => p.bytes));
      await afterLoad(r.files);
    } catch (e) {
      setBusy(null);
      setError(fmt(T.result.error, { message: (e as Error).message }));
    }
  }

  async function loadPaste() {
    const text = pasteRef.current?.value ?? '';
    if (!text.trim()) return;
    setError(null);
    setBusy({ kind: 'reading' });
    try {
      const r = await w().send<'files'>({ type: 'loadText', name: 'Pasted cells', text, append: false });
      setPasteOpen(false);
      await afterLoad(r.files);
    } catch (e) {
      setBusy(null);
      setError(fmt(T.result.error, { message: (e as Error).message }));
    }
  }

  async function showSample() {
    setError(null);
    await w().send<'files'>({ type: 'loadTable', name: props.demoName, rows: props.demoRows });
    demoLoaded.current = true;
    setIsSample(true);
    setFiles(props.initialFiles);
    setActive(0);
    await convert();
  }

  async function setOption<K extends keyof ToolOptions>(k: K, v: ToolOptions[K]) {
    const next = { ...options, [k]: v };
    setOptions(next);
    if (k === 'output') return; // output format does not change the contacts
    await ensureDemo();
    await convert(next);
  }

  async function changeMapping(fi: number, col: number, m: ColumnMapping) {
    const nextFiles = files.map((f, i) => (i === fi ? { ...f, mapping: f.mapping.map((x, j) => (j === col ? m : x)) } : f));
    setFiles(nextFiles);
    await ensureDemo();
    await w().send<'files'>({ type: 'setMapping', file: fi, mapping: nextFiles[fi]!.mapping });
    await convert();
  }

  async function reparse(fi: number, ch: { encoding?: string; delimiter?: Delimiter; sheet?: number; hasHeader?: boolean }) {
    await ensureDemo();
    setBusy({ kind: 'reading' });
    try {
      const r = await w().send<'files'>({ type: 'reparse', file: fi, ...ch });
      setFiles(r.files);
      await convert();
    } catch (e) {
      setBusy(null);
      setError((e as Error).message);
    }
  }

  async function removeFile(fi: number) {
    const r = await w().send<'files'>({ type: 'remove', file: fi });
    if (!r.files.length) return showSample();
    setFiles(r.files);
    setActive(0);
    await convert();
  }

  async function goPage(p: number, f: CardFilter = filter) {
    await ensureDemo();
    if (isSample && !summary) await convert();
    const r = await w().send<'page'>({ type: 'page', filter: f, page: p });
    setPage(p);
    setFilter(f);
    setCards({ list: r.page, total: r.total });
  }

  async function download() {
    setBusy({ kind: 'exporting' });
    try {
      if (isSample && !demoLoaded.current) {
        await ensureDemo();
        await w().send<'summary'>({ type: 'convert', options });
      }
      const r = await w().send<'export'>({ type: 'export', format: options.output });
      const blob = new Blob([r.bytes], { type: r.mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = r.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      window.dispatchEvent(new CustomEvent('csvtovcf:converted', { detail: { contacts: summary.total, version: options.version, output: options.output, source: files[0]?.source.id ?? 'generic' } }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  const fileName = baseName(files[0]?.name ?? props.demoName) + EXT[options.output];
  const st = summary.stats;
  const f = files[active] ?? files[0];
  const multi = files.length > 1;
  const warnTotal = Object.values(summary.warningCounts).reduce<number>((a, b) => a + (b ?? 0), 0);
  const skippedTotal = st.skipped.empty + st.skipped['no-contact-data'] + st.skipped['repeated-header'];
  const pages = Math.max(1, Math.ceil(cards.total / summary.pageSize));

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer?.files?.length) void loadFiles(e.dataTransfer.files);
  };

  return (
    <div class={'tool' + (busy ? ' is-busy' : '')} aria-busy={busy ? 'true' : 'false'}>
      <p class="sr-only" role="status" aria-live="polite">
        {status}
      </p>

      {/* 1 — FILE */}
      <section class="tool__panel tool__input" aria-labelledby="t-step1">
        <h2 class="label label--framed" id="t-step1">
          <span class="step">1</span>
          {T.step1}
        </h2>
        <div
          class={'drop' + (dragging ? ' is-over' : '')}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onPointerEnter={() => w().warm()}
        >
          <p class="drop__title">{dragging ? T.drop.dropping : T.drop.title}</p>
          <p class="drop__hint">{T.drop.hint}</p>
          <div class="drop__actions">
            <button type="button" class="btn" onClick={() => fileInput.current?.click()} onFocus={() => w().warm()}>
              {T.drop.choose}
            </button>
            <button type="button" class="btn btn--ghost" aria-expanded={pasteOpen} aria-controls="t-paste" onClick={() => setPasteOpen(!pasteOpen)}>
              {T.drop.paste}
            </button>
            {!isSample ? (
              <button type="button" class="btn btn--quiet" onClick={showSample}>
                {T.drop.sample}
              </button>
            ) : null}
          </div>
          <input
            ref={fileInput}
            type="file"
            multiple
            accept={props.accept}
            class="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(e) => {
              const el = e.currentTarget as HTMLInputElement;
              if (el.files) void loadFiles(el.files);
              el.value = '';
            }}
          />
          <p class="drop__privacy">{T.drop.privacy}</p>
        </div>
        {pasteOpen ? (
          <div class="paste" id="t-paste">
            <label for="t-paste-area" class="label">
              {T.paste.label}
            </label>
            <textarea id="t-paste-area" ref={pasteRef} rows={6} placeholder={T.paste.placeholder} spellcheck={false} class="mono" />
            <div class="paste__actions">
              <button type="button" class="btn" onClick={loadPaste}>
                {T.paste.apply}
              </button>
              <button type="button" class="btn btn--quiet" onClick={() => setPasteOpen(false)}>
                {T.paste.cancel}
              </button>
            </div>
          </div>
        ) : null}
        {error ? (
          <p class="tool__error" role="alert">
            {error}
          </p>
        ) : null}

        {multi ? (
          <div class="filetabs" role="tablist" aria-label={T.step1}>
            {files.map((x, i) => (
              <button type="button" role="tab" aria-selected={i === active} class="filetab" onClick={() => setActive(i)} key={i}>
                {x.name}
              </button>
            ))}
          </div>
        ) : null}

        {f ? (
          <div class="fileinfo">
            <p class="fileinfo__name">
              <span class="mono">{isSample ? props.demoName : f.name}</span>
              <span class="fileinfo__meta num">
                {fmt(T.file.rows, { n: n(f.rowCount) })} · {T.file.source}: {T.sources[f.source.id]}
                {f.source.headerLanguage ? ` (${f.source.headerLanguage.toUpperCase()})` : ''}
              </span>
              {!isSample && multi ? (
                <button type="button" class="linkbtn" onClick={() => removeFile(active)}>
                  {T.file.remove}
                </button>
              ) : null}
            </p>
            {isSample ? <p class="fileinfo__sample">{T.file.sample}</p> : null}
            <div class="fileinfo__ctl">
              {f.encoding && f.kind !== 'paste' && f.kind !== 'demo' ? (
                <label>
                  <span class="label">{T.file.encoding}</span>
                  <select value={f.encoding} onChange={(e) => reparse(active, { encoding: (e.currentTarget as HTMLSelectElement).value })}>
                    {props.encodings.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.label}
                        {f.encodingGuess?.encoding === e.id ? ` — ${T.file.encodingDetected}` : ''}
                      </option>
                    ))}
                  </select>
                  {f.encodingGuess && f.encodingGuess.confidence < 0.8 ? <small class="warn">{T.file.encodingGuess}</small> : null}
                </label>
              ) : null}
              {f.delimiter && f.kind !== 'demo' ? (
                <label>
                  <span class="label">{T.file.delimiter}</span>
                  <select value={f.delimiter} onChange={(e) => reparse(active, { delimiter: (e.currentTarget as HTMLSelectElement).value as Delimiter })}>
                    {([',', ';', '\t', '|'] as const).map((d) => (
                      <option value={d} key={d}>
                        {T.delimiters[d]}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              {f.sheets && f.sheets.length > 1 ? (
                <label>
                  <span class="label">{T.file.sheet}</span>
                  <select value={String(f.sheet)} onChange={(e) => reparse(active, { sheet: Number((e.currentTarget as HTMLSelectElement).value) })}>
                    {f.sheets.map((sh, i) => (
                      <option value={String(i)} key={i}>
                        {sh.name} ({n(sh.rows)}){sh.hidden ? ` — ${T.file.hidden}` : ''}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label class="check">
                <input type="checkbox" checked={f.hasHeader} onChange={(e) => reparse(active, { hasHeader: (e.currentTarget as HTMLInputElement).checked })} />
                {T.file.header}
              </label>
            </div>
            {f.columns.filter((c) => c.numericCells > 0 && f.mapping[c.index]?.field === 'phone').map((c) => (
              <p class="warnline" key={c.index}>
                {fmt(T.file.numeric, { n: n(c.numericCells), col: c.letter })}
              </p>
            ))}
            {f.parseErrors ? <p class="warnline">{fmt(T.file.parseErrors, { n: f.parseErrors })}</p> : null}
            {/* scrollable region must be reachable by keyboard (WCAG 2.1.1) */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <div class="rawtable table-wrap" tabIndex={0} role="region" aria-label={T.file.preview}>
              <table>
                <caption class="sr-only">{T.file.preview}</caption>
                <thead>
                  <tr>
                    <th scope="col" class="rawtable__n">#</th>
                    {f.columns.map((c) => (
                      <th scope="col" key={c.index}>
                        <span class="rawtable__letter">{c.letter}</span>
                        <span dir="auto">{c.header}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.previewRows.map((r, i) => (
                    <tr key={i}>
                      <th scope="row" class="rawtable__n num">{f.firstRowNumber + i}</th>
                      {r.map((v, j) => (
                        <td key={j} dir="auto" class="mono">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>

      {/* RESULT (top right) */}
      <section class="tool__panel tool__result" aria-labelledby="t-step4">
        <div class="result__bar">
          <h2 class="label label--framed" id="t-step4">
            {T.step4}
          </h2>
          <p class="result__count">
            <strong class="num">{fmt(T.result.contacts, { n: n(summary.total) })}</strong>{' '}
            <span class="num">{fmt(T.result.fromRows, { rows: n(st.rows) })}</span>
          </p>
          <button type="button" class="btn result__download" onClick={download} disabled={!!busy || summary.total === 0}>
            {busy?.kind === 'exporting' ? T.result.preparing : fmt(T.result.download, { file: fileName })}
          </button>
        </div>
        {isSample ? <p class="result__sample">{T.result.sample}</p> : null}

        <div class="tabs" role="tablist" aria-label={T.step4}>
          {(
            [
              ['cards', T.tabs.cards, summary.total],
              ['warnings', T.tabs.warnings, warnTotal],
              ['skipped', T.tabs.skipped, skippedTotal],
              ['duplicates', T.tabs.duplicates, summary.duplicates.groups],
              ['vcard', T.tabs.vcard, null],
            ] as [Tab, string, number | null][]
          ).map(([k, label, count]) => (
            <button type="button" role="tab" id={`tab-${k}`} aria-controls={`panel-${k}`} aria-selected={tab === k} class="tab" onClick={() => setTab(k)} key={k}>
              {label}
              {count !== null ? <span class={'tab__n num' + (count && k !== 'cards' ? ' is-hot' : '')}>{n(count)}</span> : null}
            </button>
          ))}
        </div>

        {tab === 'cards' ? (
          <div role="tabpanel" id="panel-cards" aria-labelledby="tab-cards">
            <div class="cards">
              {cards.list.map((c, i) => (
                <Card c={c} s={s} intl={props.intl} showFile={multi} key={`${c.file}-${c.row}-${i}`} />
              ))}
            </div>
            {cards.total > summary.pageSize ? (
              <nav class="pager" aria-label={T.tabs.cards}>
                <button type="button" class="btn btn--quiet" disabled={page === 0} onClick={() => goPage(page - 1)}>
                  {T.pager.prev}
                </button>
                <span class="num">
                  {fmt(T.pager.range, { from: n(page * summary.pageSize + 1), to: n(Math.min(cards.total, (page + 1) * summary.pageSize)), total: n(cards.total) })}
                </span>
                <button type="button" class="btn btn--quiet" disabled={page >= pages - 1} onClick={() => goPage(page + 1)}>
                  {T.pager.next}
                </button>
                {warnTotal ? (
                  <label class="check">
                    <input type="checkbox" checked={filter === 'warnings'} onChange={(e) => goPage(0, (e.currentTarget as HTMLInputElement).checked ? 'warnings' : 'all')} />
                    {T.pager.onlyWarnings}
                  </label>
                ) : null}
              </nav>
            ) : null}
          </div>
        ) : null}

        {tab === 'warnings' ? (
          <div role="tabpanel" id="panel-warnings" aria-labelledby="tab-warnings" class="listpanel">
            {summary.warnings.length ? (
              <table>
                <tbody>
                  {summary.warnings.map((x, i) => (
                    <tr key={i}>
                      <th scope="row" class="num mono">
                        {multi ? `${x.file + 1}:` : ''}
                        {x.row}
                      </th>
                      <td dir="auto">{x.name}</td>
                      <td>{fmt(T.warnings[x.code], { value: x.value })}</td>
                      <td class="mono" dir="auto">
                        {x.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{T.report.none}</p>
            )}
            {summary.warnings.length >= 500 ? <p class="muted">{fmt(T.report.more, { n: 500 })}</p> : null}
          </div>
        ) : null}

        {tab === 'skipped' ? (
          <div role="tabpanel" id="panel-skipped" aria-labelledby="tab-skipped" class="listpanel">
            {summary.skipped.length ? (
              <table>
                <tbody>
                  {summary.skipped.map((x, i) => (
                    <tr key={i}>
                      <th scope="row" class="num mono">
                        {multi ? `${x.file + 1}:` : ''}
                        {x.row}
                      </th>
                      <td>{T.skip[x.reason]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{T.report.none}</p>
            )}
          </div>
        ) : null}

        {tab === 'duplicates' ? (
          <div role="tabpanel" id="panel-duplicates" aria-labelledby="tab-duplicates" class="listpanel">
            {summary.duplicates.preview.length ? (
              summary.duplicates.preview.map((g, i) => (
                <div class="dupgroup" key={i}>
                  <p class="dupgroup__head">
                    <span class="mono">{g.by.map((b) => T.dup[b]).join(' + ')}</span> · <span class="mono">{g.keys.join(', ')}</span> —{' '}
                    {options.mergeDuplicates ? T.dup.merged : T.dup.separate}
                  </p>
                  <div class="cards cards--dup">
                    {g.members.map((c, j) => (
                      <Card c={c} s={s} intl={props.intl} showFile={multi} key={j} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>{T.dup.none}</p>
            )}
          </div>
        ) : null}

        {tab === 'vcard' ? (
          <div role="tabpanel" id="panel-vcard" aria-labelledby="tab-vcard" class="listpanel">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <pre class="vcardtext" tabIndex={0}>
              {summary.sampleVcf.replace(/\r\n/g, '\n')}
            </pre>
          </div>
        ) : null}

        <dl class="report">
          <div>
            <dt>{T.report.rows}</dt>
            <dd class="num">{n(st.rows)}</dd>
          </div>
          <div>
            <dt>{T.report.contacts}</dt>
            <dd class="num">{n(summary.total)}</dd>
          </div>
          {st.skipped.empty ? (
            <div>
              <dt>{T.report.empty}</dt>
              <dd class="num">{n(st.skipped.empty)}</dd>
            </div>
          ) : null}
          {st.skipped['no-contact-data'] ? (
            <div>
              <dt>{T.report.noData}</dt>
              <dd class="num">{n(st.skipped['no-contact-data'])}</dd>
            </div>
          ) : null}
          <div>
            <dt>{T.report.phones}</dt>
            <dd class="num">{n(st.phones)}</dd>
          </div>
          {st.phonesInvalid ? (
            <div class="is-bad">
              <dt>{T.report.phonesInvalid}</dt>
              <dd class="num">{n(st.phonesInvalid)}</dd>
            </div>
          ) : null}
          {st.phonesExcelLost ? (
            <div class="is-bad">
              <dt>{T.report.excelLost}</dt>
              <dd class="num">{n(st.phonesExcelLost)}</dd>
            </div>
          ) : null}
          {st.phonesExcelRestored ? (
            <div>
              <dt>{T.report.excelRestored}</dt>
              <dd class="num">{n(st.phonesExcelRestored)}</dd>
            </div>
          ) : null}
          {st.phonesPlusAdded ? (
            <div>
              <dt>{T.report.plusAdded}</dt>
              <dd class="num">{n(st.phonesPlusAdded)}</dd>
            </div>
          ) : null}
          {st.emailsInvalid ? (
            <div class="is-bad">
              <dt>{T.report.emailsInvalid}</dt>
              <dd class="num">{n(st.emailsInvalid)}</dd>
            </div>
          ) : null}
          {st.datesUnparsed ? (
            <div>
              <dt>{T.report.datesUnparsed}</dt>
              <dd class="num">{n(st.datesUnparsed)}</dd>
            </div>
          ) : null}
          {summary.duplicates.groups ? (
            <div>
              <dt>{T.report.duplicates}</dt>
              <dd class="num">{n(summary.duplicates.groups)}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      {/* 2 — MAPPING */}
      <section class="tool__panel tool__map" aria-labelledby="t-step2">
        <h2 class="label label--framed" id="t-step2">
          <span class="step">2</span>
          {T.step2}
        </h2>
        <p class="tool__intro">{T.map.intro}</p>
        {f ? <PatchPanel file={f} fileIndex={active} s={s} onChange={(col, m) => changeMapping(active, col, m)} key={`${active}-${f.name}`} /> : null}
      </section>

      {/* 3 — OPTIONS */}
      <section class="tool__panel tool__opts" aria-labelledby="t-step3">
        <h2 class="label label--framed" id="t-step3">
          <span class="step">3</span>
          {T.step3}
        </h2>
        <div class="opts">
          <fieldset>
            <legend class="label">{T.options.version}</legend>
            {(
              [
                ['3.0', T.options.v30],
                ['4.0', T.options.v40],
                ['2.1', T.options.v21],
              ] as const
            ).map(([v, label]) => (
              <label class="radio" key={v}>
                <input type="radio" name="t-version" value={v} checked={options.version === v} onChange={() => setOption('version', v)} />
                {label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend class="label">{T.options.output}</legend>
            {(['vcf', 'zip', 'google', 'outlook'] as const).map((v) => (
              <label class="radio" key={v}>
                <input type="radio" name="t-output" value={v} checked={options.output === v} onChange={() => setOption('output', v)} />
                {T.options[v]}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend class="label">{T.options.phoneMode}</legend>
            <label class="stack">
              <span>{T.options.country}</span>
              <select value={options.country} onChange={(e) => setOption('country', (e.currentTarget as HTMLSelectElement).value)}>
                {countryNames.map((c) => (
                  <option value={c.code} key={c.code}>
                    {c.name} (+{c.cc})
                  </option>
                ))}
              </select>
            </label>
            {(['e164', 'international', 'national', 'keep'] as const).map((v) => (
              <label class="radio" key={v}>
                <input type="radio" name="t-phone" value={v} checked={options.phoneMode === v} onChange={() => setOption('phoneMode', v)} />
                {T.options[v]}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend class="label">{T.options.names}</legend>
            <label class="check">
              <input type="checkbox" checked={options.splitFullName} onChange={(e) => setOption('splitFullName', (e.currentTarget as HTMLInputElement).checked)} />
              {T.options.split}
            </label>
            <span class="label opts__sub">{T.options.duplicates}</span>
            <label class="check">
              <input type="checkbox" checked={options.mergeDuplicates} onChange={(e) => setOption('mergeDuplicates', (e.currentTarget as HTMLInputElement).checked)} />
              {T.options.merge}
              {summary.duplicates.groups ? <span class="num"> ({n(summary.duplicates.groups)})</span> : null}
            </label>
            {options.version === '3.0' ? (
              <>
                <span class="label opts__sub">{T.options.compat}</span>
                <label class="check">
                  <input type="checkbox" checked={options.charset} onChange={(e) => setOption('charset', (e.currentTarget as HTMLInputElement).checked)} />
                  {T.options.charset}
                </label>
              </>
            ) : null}
          </fieldset>
        </div>
        <div class="opts__go">
          <button type="button" class="btn" onClick={download} disabled={!!busy || summary.total === 0}>
            {busy?.kind === 'exporting' ? T.result.preparing : fmt(T.result.download, { file: fileName })}
          </button>
          <span class="num">{fmt(T.result.contacts, { n: n(summary.total) })}</span>
        </div>
      </section>
    </div>
  );
}
