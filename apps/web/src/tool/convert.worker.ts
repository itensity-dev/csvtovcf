/// <reference lib="webworker" />
/**
 * All contact data lives here, in the worker — not in the page's global scope,
 * where third-party scripts (ads, analytics) could read it. Nothing is sent over the network.
 */
import { Engine } from './engine';
import type { Envelope, Request, Response } from './protocol';

declare const self: DedicatedWorkerGlobalScope;
let engine = new Engine('en');

function reply(id: number, r: Response, transfer: Transferable[] = []) {
  self.postMessage({ ...r, id }, transfer);
}

self.onmessage = async (ev: MessageEvent<Envelope<Request>>) => {
  const m = ev.data;
  try {
    switch (m.type) {
      case 'init':
        engine = new Engine(m.locale);
        reply(m.id, { type: 'files', files: [] });
        break;
      case 'load':
        if (!m.append) engine.clear();
        for (const f of m.files) await engine.addBytes(f.name, new Uint8Array(f.bytes));
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'loadText':
        if (!m.append) engine.clear();
        engine.addText(m.name, m.text);
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'loadTable':
        engine.clear();
        engine.addTable(m.name, m.rows);
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'reparse':
        engine.reparse(m.file, m);
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'setMapping':
        engine.setMapping(m.file, m.mapping);
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'remove':
        engine.remove(m.file);
        reply(m.id, { type: 'files', files: engine.meta() });
        break;
      case 'convert':
        reply(m.id, { type: 'summary', summary: engine.convert(m.options) });
        break;
      case 'page': {
        const p = engine.page(m.filter, m.page);
        reply(m.id, { type: 'page', ...p });
        break;
      }
      case 'export': {
        const out = await engine.export(m.format);
        const buf = out.bytes.buffer.slice(out.bytes.byteOffset, out.bytes.byteOffset + out.bytes.byteLength) as ArrayBuffer;
        reply(m.id, { type: 'export', name: out.name, mime: out.mime, bytes: buf }, [buf]);
        break;
      }
    }
  } catch (e) {
    reply(m.id, { type: 'error', message: e instanceof Error ? e.message : String(e) });
  }
};
