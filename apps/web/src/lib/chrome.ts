/**
 * Tiny page chrome: theme toggle, "this page exists in your language" banner,
 * service worker registration, privacy-safe analytics events. No contact data is touched here.
 */
export function initChrome(): void {
  // theme: auto → light → dark
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', () => {
    const root = document.documentElement;
    const cur = root.dataset.theme ?? 'auto';
    const next = cur === 'auto' ? 'light' : cur === 'light' ? 'dark' : 'auto';
    if (next === 'auto') delete root.dataset.theme;
    else root.dataset.theme = next;
    try {
      if (next === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch {
      /* private mode */
    }
    btn.setAttribute('data-state', next);
    btn.setAttribute('aria-label', btn.dataset[`l${next}`] ?? next);
  });
  if (btn) {
    const cur = document.documentElement.dataset.theme ?? 'auto';
    btn.setAttribute('data-state', cur);
  }

  // language suggestion — never redirects
  const banner = document.getElementById('lang-banner');
  if (banner) {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('lang-banner') === '1';
    } catch {
      /* ignore */
    }
    const alts = JSON.parse(banner.dataset.alts ?? '[]') as { l: string; p: string; n: string }[];
    const pageLang = document.documentElement.lang.toLowerCase();
    const prefs = (navigator.languages ?? [navigator.language]).map((l) => l.toLowerCase());
    if (!dismissed && !prefs.some((p) => p === pageLang || p.split('-')[0] === pageLang.split('-')[0])) {
      for (const p of prefs) {
        const hit = alts.find((a) => a.l === p) ?? alts.find((a) => a.l.split('-')[0] === p.split('-')[0]);
        if (hit) {
          const text = document.getElementById('lang-banner-text');
          const link = document.getElementById('lang-banner-link') as HTMLAnchorElement | null;
          if (text) text.textContent = (banner.dataset.text ?? '').replace('{lang}', hit.n);
          if (link) {
            link.href = hit.p;
            link.textContent = banner.dataset.open ?? 'Open';
            link.hreflang = hit.l;
          }
          banner.hidden = false;
          break;
        }
      }
    }
    document.getElementById('lang-banner-close')?.addEventListener('click', () => {
      banner.hidden = true;
      try {
        sessionStorage.setItem('lang-banner', '1');
      } catch {
        /* ignore */
      }
    });
  }

  // offline: cache the app shell (never user files)
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  // ads: fill reserved slots (only rendered when ADS_ENABLED at build time)
  const units = document.querySelectorAll('ins.adsbygoogle');
  if (units.length) {
    const w = window as unknown as { adsbygoogle?: unknown[] };
    w.adsbygoogle = w.adsbygoogle || [];
    units.forEach(() => w.adsbygoogle!.push({}));
  }

  // analytics: only coarse, anonymous events (never names, numbers, headers)
  window.addEventListener('csvtovcf:converted', (e) => {
    const d = (e as CustomEvent<{ contacts: number; version: string; output: string; source: string }>).detail;
    const plausible = (window as unknown as { plausible?: (n: string, o: object) => void }).plausible;
    if (!plausible) return;
    const n = d.contacts;
    const range = n <= 10 ? '1-10' : n <= 100 ? '11-100' : n <= 1000 ? '101-1000' : n <= 10000 ? '1001-10000' : '10000+';
    plausible('Conversion', { props: { contacts: range, version: d.version, output: d.output, source: d.source } });
  });
}
