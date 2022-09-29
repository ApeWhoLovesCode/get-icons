import fs from 'fs';

export const generateExportIconData = () => {
  return new Promise((resolve) => {
    const fileNames = fs.readdirSync('src/svg-data/asn')
    const comFiles = sortLetter(fileNames.map(item => item.replace('.ts', '')))
    const iconData = comFiles.map(item => `${item},`)
    const template = fs.readFileSync('templates/exportIconData.txt').toString()
    const demo = template.replace('@importIcon', comFiles.toString()).replace('@iconObj', iconData.join('\n  '))
    fs.writeFile('src/svg-data/export.ts', demo, () => {
      resolve(0)
    })
  })
}

const sortLetter = (list: string[]) => {
  return list.sort((a, b) => {
    return findThemeIndex(a) - findThemeIndex(b)
  })
}

const findThemeIndex = (str: string) => {
  const theme = ['Linear', 'Surface', 'TwoTone']
  for(const i in theme) {
    if(str.indexOf(theme[i]) !== -1) {
      return +i
    }
  }
  return -1
}