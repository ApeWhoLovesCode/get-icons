import fs from 'fs';

export const generateDemoFs = () => {
  return new Promise((resolve) => {
    const fileNames = fs.readdirSync('src/com-icons/asn')
    const comFiles = sortLetter(fileNames.map(item => item.replace('.tsx', '')))
    const htmlFiles = comFiles.map(item => `<span className="icon-item"><${item} /><span className="icon-name">${item}</span></span>`)
    const template = fs.readFileSync('src/pages/template.txt').toString()
    const demo = template.replace('@com', comFiles.toString()).replace('@html', htmlFiles.join('\n        '))
    fs.writeFile('src/pages/index.tsx', demo, () => {
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
  const theme = ['Linear', 'Faceted', 'TwoTone']
  for(const i in theme) {
    if(str.indexOf(theme[i]) !== -1) {
      return +i
    }
  }
  return -1
}