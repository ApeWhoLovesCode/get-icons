import { series, parallel } from 'gulp';
import {
  clean,
  copy,
  generateIcons,
  generateEntry,
  generateComIcons,
  generateDemo,
  generateDemoFs,
} from './tasks/creators';
import { generalConfig, remainFillConfig } from './plugins/svgo/presets';
import {
  assignAttrsAtTag,
  adjustViewBox,
  setDefaultColorAtPathTag
} from './plugins/svg2Definition/transforms';
import { twotoneStringify } from './plugins/svg2Definition/stringify';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getIdentifier } from './utils';

const iconTemplate = readFileSync(
  resolve(__dirname, './templates/icon.ts.ejs'),
  'utf8'
);

const iconComTemplate = readFileSync(
  resolve(__dirname, './templates/comIcon.ts.ejs'),
  'utf8'
);

export default series(
  // 1. clean
  // clean(['svg-data', 'inline-svg', 'es', 'lib']),

  parallel(
    // 2.1 copy helpers.ts, types.ts
    copy({
      from: ['templates/*.ts'],
      toDir: 'src/svg-data'
    }),
    // 2.2 根据svg图标生成对于的代码段 主题: linear
    generateIcons({
      theme: 'linear',
      from: ['svg/linear/*.svg'],
      toDir: 'src/svg-data/asn',
      svgoConfig: generalConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox
      ],
      stringify: JSON.stringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'Linear' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Linear' })
    }),

    // 2.3 根据svg图标生成对于的代码段 主题: oneFace
    generateIcons({
      theme: 'oneFace',
      from: ['svg/oneFace/*.svg'],
      toDir: 'src/svg-data/asn',
      svgoConfig: generalConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox
      ],
      stringify: JSON.stringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'OneFace' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'OneFace' })
    }),

    // 2.4 根据svg图标生成对于的代码段 主题: twotone
    generateIcons({
      theme: 'twotone',
      from: ['svg/twotone/*.svg'],
      toDir: 'src/svg-data/asn',
      svgoConfig: remainFillConfig,
      extraNodeTransformFactories: [
        assignAttrsAtTag('svg', { focusable: 'false' }),
        adjustViewBox,
        setDefaultColorAtPathTag('#333')
      ],
      stringify: twotoneStringify,
      template: iconTemplate,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'TwoTone' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'TwoTone' })
    })
  ),

  parallel(
    // 3.1 根据上面的svg数据导出一个index.ts
    generateEntry({
      entryName: 'index.ts',
      from: ['src/svg-data/asn/*.ts'],
      toDir: 'src/svg-data',
      banner: '// This index.ts file is generated automatically.\n',
      template: `export { default as <%= identifier %> } from '<%= path %>';`,
      mapToInterpolate: ({ name: identifier }) => ({
        identifier,
        path: `./asn/${identifier}`
      })
    }),
  ),

  // 4 根据svg数据生成对应的tsx文件
  parallel(
    generateComIcons({
      from: ['src/svg-data/asn/*.ts'],
      toDir: 'src/com-icons/asn',
      template: iconComTemplate,
      mapToInterpolate: ({ name: identifier }) => ({
        identifier,
        path: `./com-icons/${identifier}`
      }),
      filename: ({ name }) => getIdentifier({ name })
    }),
  ),

  // 5 根据tsx文件导出一个index.tsx
  parallel(
    generateEntry({
      entryName: 'index.tsx',
      from: ['src/com-icons/asn/*.tsx'],
      toDir: 'src/com-icons',
      banner: '// This index.ts file is generated automatically.\n',
      template: `export { default as <%= identifier %> } from '<%= path %>';`,
      mapToInterpolate: ({ name: identifier }) => ({
        identifier,
        path: `./asn/${identifier}`
      })
    }),
  ),

  // 6 生成demo的icon的html文件
  // parallel(
  //   generateEntry({
  //     entryName: 'demo.html',
  //     from: ['src/com-icons/asn/*.tsx'],
  //     toDir: 'src/pages',
  //     template: `<span className="icon-item"><<%= identifier %>  /></span>`,
  //     mapToInterpolate: ({ name: identifier }) => ({
  //       identifier,
  //       path: `./asn/${identifier}`
  //     })
  //   }),
  // ),
  // 7 生成demo的index.tsx文件
  // parallel(
  //   generateDemo({
  //     entryName: 'index.tsx',
  //     from: ['src/com-icons/asn/*.tsx'],
  //     toDir: 'src/pages',
  //     template: `<%= identifier %>, `,
  //     mapToInterpolate: ({ name: identifier }) => ({
  //       identifier,
  //       path: `./asn/${identifier}`
  //     })
  //   }),
  // ),
  generateDemoFs
);
