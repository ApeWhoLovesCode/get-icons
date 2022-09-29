import fs from 'fs';

export const generateDemoFs = () => {
  return new Promise((resolve) => {
    const fileNames = fs.readdirSync('src/com-icons/asn')
    const comFiles = sortLetter(fileNames.map(item => item.replace('.tsx', '')))
    const htmlFiles = comFiles.map(item => `<span className="icon-item"><${item} /><span className="icon-name">${item}</span></span>`)
    const template = fs.readFileSync('templates/demo.txt').toString()
    const wxIconDemo = `<WxIcon name={IconEnum.${comFiles[0].toLocaleLowerCase()}} color="blue" size={80} />` 
    const demo = template.replace('@com', comFiles.toString())
      .replace('@html', htmlFiles.join('\n        '))
      .replace('@wxIcon', wxIconDemo)
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
  const theme = ['Linear', 'Surface', 'TwoTone']
  for(const i in theme) {
    if(str.indexOf(theme[i]) !== -1) {
      return +i
    }
  }
  return -1
}