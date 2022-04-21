import { src, dest } from 'gulp';
import rename from 'gulp-rename';
import { UseTemplatePluginOptions } from '../../plugins/useTemplate';
import { useTemplate } from '../../plugins';

export interface GenerateIconsOptions extends UseTemplatePluginOptions {
  from: string[];
  toDir: string;
  filename: (option: { name: string }) => string;
}

export const generateComIcons = ({
  from,
  toDir,
  template,
  mapToInterpolate,
  filename
}: GenerateIconsOptions) =>
  function generateComIcons() {
    // 必须要把出处理的代码放到pipe中
    // src 获取任务要处理的文件
    // dest 输出文件
    return src(from)
      .pipe(useTemplate({ template, mapToInterpolate }))
      .pipe(
        rename((file) => {
          if (file.basename) {
            file.basename = filename({ name: file.basename });
            file.extname = '.tsx';
          }
        })
      )
      .pipe(dest(toDir));
  };
