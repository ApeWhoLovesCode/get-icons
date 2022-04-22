import { src, dest } from 'gulp';
import { handleTemplate } from '../../plugins';
import concat from 'gulp-concat';
import header from 'gulp-header';
import footer from 'gulp-footer';
import fileInclude from 'gulp-file-include';
import replace from 'gulp-replace';
import { HandleTemplatePluginOptions } from '../../plugins/handleTemplate';

export interface GenerateDemoOptions extends HandleTemplatePluginOptions {
  from: string[];
  toDir: string;
  entryName: string;
  banner?: string;
}

export const generateDemo = ({
  from,
  toDir,
  template,
  mapToInterpolate,
  entryName,
}: GenerateDemoOptions) =>
  function generateDemo() {
    return src(from)
    .pipe(handleTemplate({template, mapToInterpolate}))
    .pipe(concat(entryName))
    .pipe(replace(/,([^,]*)$/, `\n} from '../com-icons/index';\n\nexport default class PickerDemo extends Component<{}> {\n  render() {\n    return (\n      <div className="demo-icon">`))
    .pipe(header(`import { Component } from 'react';\nimport './index.css';\nimport {\n`))
    .pipe(footer(`\n@-@include('./demo.html')\n      </div>\n    );\n  }\n}`))
    .pipe(fileInclude({
      prefix: '@-@',
      basepath: 'src/pages'
    }))
    .pipe(dest(toDir))
  };

  /* 
    return src(from)
    .pipe(handleTemplate({template: template2, mapToInterpolate}))
    .pipe(src(headSrc))
    .pipe(concat(entryName))
    .pipe(dest(toDir))
  */
