/** Minimal inline Markdown for frontmatter strings (steps, table cells, FAQ answers): links, bold, code, line breaks. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function md(s: string): string {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t: string, u: string) => {
    const external = /^https?:/.test(u);
    return `<a href="${u}"${external ? ' rel="noopener"' : ''}>${t}</a>`;
  });
  out = out
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, '<br>'))
    .join('</p><p>');
  return out.includes('</p><p>') ? `<p>${out}</p>` : out;
}
