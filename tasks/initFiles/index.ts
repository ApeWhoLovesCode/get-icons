import fs from 'fs';
import checkDir from "../../utils/checkDir";

const initFiles = () => {
  const svgDataDir = 'src/svg-data', wxIconDir = 'src/wx-icons'
  checkDir(svgDataDir)
  checkDir(wxIconDir)
  const svgDataTem = fs.readFileSync('tasks/initFiles/export.txt').toString()
  const wxIconTem = fs.readFileSync('tasks/initFiles/wx-icons.txt').toString()
  fs.writeFile(`${svgDataDir}/export.ts`, svgDataTem, () => {})
  fs.writeFile(`${wxIconDir}/index.ts`, wxIconTem, () => {})
}
initFiles()