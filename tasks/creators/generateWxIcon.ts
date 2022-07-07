import fs from 'fs';
// import iconObj from '../../src/svg-data/export'
import { AbstractNode } from '../../src/types'
import checkDir from "../../utils/checkDir";

export const generateWxIcon = () => {
  return new Promise(async (resolve) => {
    // 将生成的svg path保存到对象中
    // const iconData: {[key: string]: string} = {}
    const iconData: string[] = []
    const iconEnum: string[] = []
    // import() 指定所要加载的模块的位置
    const iconObj = (await import('../../src/svg-data/export')).default
    Object.keys(iconObj).forEach((iconKey) => {
      // 这里还要处理双色的情况
      const target = iconObj[iconKey].icon as AbstractNode
      // 处理value值
      const svgPath = target.children?.reduce((pre, cur, index) => {
        // 每一次循环最终生成：%3Cpath d='M794.08 666' fill='@svgColor2' /%3E
        let str = `%3C${cur.tag}`
        Object.keys(cur.attrs).forEach((key) => {
          str += ` ${key}='${cur.attrs[key]}'`
        })
        str += ` fill='@svgColor${index + 1}' /%3E`
        return pre += str
      }, '')
      const svgTem = `data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='@svgSize' height='@svgSize'%3E${svgPath}%3C/svg%3E`
      const iconType = iconObj[iconKey].name + iconObj[iconKey].theme
      iconEnum.push(`${iconType} = "${iconType}"`)
      // iconData[iconType] = svgTem
      iconData.push(`${iconType}: "${svgTem}",`)
    })
    // console.log('iconData: ', iconData);

    const template = fs.readFileSync('templates/wxIcon.txt').toString()
    const svgData = template.replace('@svgData', iconData.join('\n  ')).replace('@iconEnum', iconEnum.join(',\n  '))
    const dir = 'src/wx-icons'
    checkDir(dir)
    fs.writeFile(`${dir}/index.ts`, svgData, () => {
      resolve(0)
    })
  })
}
