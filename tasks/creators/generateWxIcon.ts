import fs from 'fs';
import {AddLinear} from '../../src/svg-data/index'
import {AbstractNode} from '../../src/svg-data/types'

export const generateWxIcon = () => {
  return new Promise((resolve) => {
    // 这里还要处理双色的情况
    const target = AddLinear.icon as AbstractNode
    // 处理value值
    const svgPath = target.children?.reduce((pre, cur, index) => {
      // 每一次循环最终生成：%3Cpath d='M794.08 666' fill='@svgColor2' /%3E
      let str = `%3C${cur.tag}`
      const pathAtt = Object.keys(cur.attrs)
      pathAtt.forEach((key) => {
        str += ` ${key}='${cur.attrs[key]}'`
      })
      str += ` fill='@svgColor${index + 1}' /%3E`
      return pre += str
    }, '')
    // 将生成的svg path保存到对象中
    const iconData: {[key: string]: string} = {}
    const svgTem = `data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='@svgSize' height='@svgSize'%3E${svgPath}%3C/svg%3E`
    iconData[AddLinear.name + AddLinear.theme] = svgTem
    console.log('iconData: ', iconData);

    const template = fs.readFileSync('templates/wxIcon.txt').toString()
    const svgData = template.replace('@svgData', JSON.stringify(iconData))

    fs.writeFile('src/wx-icons-test/test.ts', svgData, () => {
      resolve(0)
    })
  })
}
