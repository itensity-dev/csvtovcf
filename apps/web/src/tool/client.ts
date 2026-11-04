import type { Envelope, Request, Response } from './protocol';

type Pending = { resolve: (r: Response) => void; reject: (e: Error) => void };

/** Promise wrapper around the conversion worker. The worker starts on first use. */
export class WorkerClient {
  private worker: Worker | null = null;
  private seq = 0;
  private pending = new Map<number, Pending>();
  constructor(private readonly locale: string) {}

  private ensure(): Worker {
    if (this.worker) return this.worker;
    const w = new Worker(new URL('./convert.worker.ts', import.meta.url), { type: 'module', name: 'csvtovcf' });
    w.onmessage = (ev: MessageEvent<Envelope<Response>>) => {
      const p = this.pending.get(ev.data.id);
      if (!p) return;
      this.pending.delete(ev.data.id);
      if (ev.data.type === 'error') p.reject(new Error(ev.data.message));
      else p.resolve(ev.data);
    };
    w.onerror = (e) => {
      for (const p of this.pending.values()) p.reject(new Error(e.message || 'Worker error'));
      this.pending.clear();
    };
    this.worker = w;
    void this.send({ type: 'init', locale: this.locale });
    return w;
  }

  /** Spin the worker up early (on hover/focus of the drop zone) so the first file feels instant. */
  warm(): void {
    this.ensure();
  }

  send<T extends Response['type']>(req: Request, transfer: Transferable[] = []): Promise<Extract<Response, { type: T }>> {
    const w = this.ensure();
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (r: Response) => void, reject });
      w.postMessage({ ...req, id }, transfer);
    });
  }
}
