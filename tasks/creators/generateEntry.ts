import { src, dest } from 'gulp';
import { handleTemplate } from '../../plugins';
import concat from 'gulp-concat';
import header from 'gulp-header';
import { HandleTemplatePluginOptions } from '../../plugins/handleTemplate';

export interface GenerateEntryOptions extends HandleTemplatePluginOptions {
  from: string[];
  toDir: string;
  entryName: string;
  banner?: string;
}

export const generateEntry = ({
  from,
  toDir,
  template,
  mapToInterpolate,
  entryName,
  banner = ''
}: GenerateEntryOptions) =>
  function GenerateEntry() {
    return src(from)
      .pipe(
        handleTemplate({
          template,
          mapToInterpolate
        })
      )
      .pipe(concat(entryName))
      .pipe(header(banner))
      .pipe(dest(toDir));
  };
