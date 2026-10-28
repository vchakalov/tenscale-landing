import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * A page left out of `run_worker_first` is served straight from the asset edge:
 * no `window.__ag`, so no pixel, no PageView to Meta and no first-party cookie.
 * Nothing breaks visibly, which is how /offer first went out untracked. Every
 * page the app exports has to be on the list.
 */
function workerFirst(): string[] {
  const jsonc = readFileSync('wrangler.jsonc', 'utf8');
  const json = jsonc.replace(/^\s*\/\/.*$/gm, '').replace(/,(\s*[\]}])/g, '$1');
  return JSON.parse(json).assets.run_worker_first;
}

function covered(path: string, patterns: string[]): boolean {
  return patterns.some((p) => (p.endsWith('*') ? path.startsWith(p.slice(0, -1)) : path === p));
}

describe('run_worker_first', () => {
  it('lists every page in src/app', () => {
    const patterns = workerFirst();
    const pages = readdirSync('src/app', { withFileTypes: true })
      .filter((d) => d.isDirectory() && existsSync(`src/app/${d.name}/page.tsx`))
      .map((d) => `/${d.name}`);
    expect(pages.length).toBeGreaterThan(5);
    expect(pages.filter((p) => !covered(p, patterns))).toEqual([]);
  });
});
