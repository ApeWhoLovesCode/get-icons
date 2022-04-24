import fs from 'fs';

export const generateDemoFs = () => {
  return new Promise((resolve) => {
    const fileNames = fs.readdirSync('src/com-icons/asn')
    const comFiles = fileNames.map(item => item.replace('.tsx', ''))
    const htmlFiles = comFiles.map(item => `<span className="icon-item"><${item} /></span>`)
    const template = fs.readFileSync('src/pages/template.txt').toString()
    const demo = template.replace('@com', comFiles.toString()).replace('@html', htmlFiles.join('\n        '))
    fs.writeFile('src/pages/index.tsx', demo, () => {
      resolve(0)
    })
  })
}
