import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build', '--webpack'], {
  stdio: 'inherit',
  env: { ...process.env, STATIC_EXPORT: '1' },
});
if (result.error) throw result.error;
if (result.status === 0) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Public CSS assets are outside Next's automatic basePath handling.
  function rewriteCss(directory) {
    for (const file of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, file.name);
      if (file.isDirectory()) rewriteCss(path);
      else if (file.name.endsWith('.css') && base) {
        writeFileSync(path, readFileSync(path, 'utf8').replace(/url\((["']?)\/invitation\//g, `url($1${base}/invitation/`));
      }
    }
  }
  rewriteCss('out');
  writeFileSync('out/.nojekyll', '');
}
process.exit(result.status ?? 1);
