import { build } from 'esbuild';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { litCssPlugin } from 'esbuild-plugin-lit-css';

import glob from 'glob';

export async function bundle() {
  const resolveDir = join(fileURLToPath(import.meta.url), '../');

  const elementSources = await glob('./*/*-*.ts', { cwd: join(process.cwd(), 'components') });
  
  const elementDirs = new Set(elementSources.map(x => dirname(x)));
  
  const elementFiles = Array.from(elementDirs, x => join(process.cwd(), `components/${x}/${x}.js`));

  const contents = [...elementFiles]
    .map(x => `export * from '${x.replace('.ts', '.js')}';`).join('\n');

  await build({
    stdin: {
      contents, 
      loader: 'ts',
      resolveDir
    },
    format: 'esm',
    outfile: 'b3n.bundle.min.js',
    allowOverwrite: true,
    treeShaking: true,
    legalComments: 'linked',
    logLevel: 'info',
    sourcemap: true,
    bundle: true,
    minify: true,
    minifyWhitespace: true,

    plugins: [
      litCssPlugin({
        include: /atoms\/(.*)\.css$/
      })
    ]
  });
}

if (import.meta.url.endsWith(process.argv.at(1))) {
  try {
    await bundle();
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}


