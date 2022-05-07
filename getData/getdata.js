/**
 * 抓取iconfont网站中的html结构，其中的icon就是svg图片
 */
const puppeteer = require('puppeteer')
const fs = require('fs')

const getSvg = async (url) => {
  //启动浏览器
  const browers = await puppeteer.launch()
  // const browers = await puppeteer.launch({headless: false}) // 打开浏览器
  //启动新页面
  const page = await browers.newPage()
  //链接网址
  await page.goto(url)

  // 等待首页加载出来
  await page.waitForSelector('#root .main .page-userdetail-container .collection-list .icons-container') 
  const EleList = await page.$$(`#root .main .page-userdetail-container .collection-list .icons-container`);

  // 遍历iconfont中所有的图标
  // let svgAllList:SvgList[] = []
  let svgAllList = []
  for(let i = 1; i <= EleList.length; i++) {
  // for(let i = 1; i <= 1; i++) {
    await page.waitForSelector('#root .main .page-userdetail-container .collection-list .collection-info .info-item span')
    const svgListEle = await page.$(`#root .main .page-userdetail-container .collection-list .block-collection:nth-child(${i})`)
    const aEle = await svgListEle.$('.icons-container')
    // const titleEle = await page.$(`.collection-list .block-collection:nth-child(1) .collection-info:first-child .info-item:first-child span`);
    let svgListKey = await page.evaluate((index)=>{
      const titleEle = document.querySelector(`.collection-list .block-collection:nth-child(${index}) .collection-info .info-item span`)
      return titleEle.innerHTML
    }, i)
    svgListKey = svgListKey.replace('怡本-', '').replace('icon', '')
    // 跳转到iconfont里面的svg详情页
    aEle.click()
    await page.waitForSelector('#root .main .page-collection-detail-wrap ul li')
    const svgObj = await page.evaluate(() => {
      // const res: SvgVal = {}
      const res = {}
      const svgDomList = document.querySelectorAll("#root .main .page-collection-detail-wrap ul li")
      for(let dom of svgDomList) {
        // const svgName = (dom.querySelector('.icon-name span') as HTMLElement).innerText
        const svgName = dom.querySelector('.icon-name span').innerText
        res[svgName] = dom.querySelector('.icon-twrap').innerHTML
      }
      return res
    });

    svgAllList.push({[svgListKey]: svgObj})
    await page.goBack({timeout: 30})
  }

  const str = arrToStr(svgAllList)
  // console.log('zh-name: ', str);
  const newStr = await translate(str)
  // console.log('en-name: ', newStr);

  const newSvgAllList = strToArr(newStr, svgAllList)

  // 生成 svg 文件夹 / 文件
  const dir = `src/svg`
  if (fs.existsSync(dir)) {
    clearDir(dir)
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for(const item of newSvgAllList) {
    const folder = Object.keys(item)[0]
    const folderDir = dir + '/' + folder
    if (!fs.existsSync(folderDir)) {
      fs.mkdirSync(folderDir);
    }
    const svgFolder = Object.values(item)[0]
    for(const svgKey in svgFolder) {
      fs.writeFileSync(`${folderDir}/${svgKey}.svg`, svgFolder[svgKey])
    }
  }
  
  // 最后关闭浏览器
  await browers.close();
}
getSvg('https://www.iconfont.cn/user/detail?spm=a313x.7781069.1998910419.d9bd4f23f&uid=9130643&nid=7smdkOsK6RuQ')

/** 翻译 */
const translate = async (str) => {
  const browers = await puppeteer.launch() 
  // const browers = await puppeteer.launch({headless: false}) // 打开浏览器
  //启动新页面
  const page = await browers.newPage()
  //链接网址
  await page.goto('https://fanyi.baidu.com/#zh/en')

  await page.waitForSelector('#desktop-guide-wrapper .desktop-guide .desktop-guide-inner') 
  const mask = await page.$(`.desktop-guide .desktop-guide-close`);
  mask.click()

  await page.waitForSelector('.container .main .translate-main #baidu_translate_input') 
  const textarea = await page.$(`.container .main .translate-main #baidu_translate_input`);
  await textarea.click()
  await page.type('#baidu_translate_input', str, {delay: 30})
  await page.waitFor(1000);
  await page.waitForSelector(`.container .main .trans-right .target-output span`)
  // const resEle = await page.$(`.container .main .trans-right .target-output span`)
  let transOutput = await page.evaluate(() => {
    // const inpRes = document.querySelector('.container .main .trans-right .target-output span') as HTMLElement
    return [...document.querySelectorAll('.container .main .trans-right .target-output span')].reduce((pre, cur)=>{
      return pre += cur.innerText
    }, '')
  });
  await browers.close()
  return transOutput
}

/** 将svg对象数组转字符串 */
const arrToStr = (arr) => {
  let str = arr.reduce((pre, cur) => {
    return pre += Object.keys(cur)[0] + ','
  }, '')
  // 正则替换最后一个逗号为 ! 
  str = str.replace(/,([^,]*)$/, '!')
  for(const item of arr) {
    const svgListKey = Object.keys(item)[0]
    str += Object.keys(item[svgListKey]).join(',') + ','
  }
  return str.replace(/,([^,]*)$/, '')
  // return str
}
/** 
 * 将字符串转成svg对象数组 (中午key变英文key)
 * return {
 *  linear: { phone: svg, user: svg }, 
 *  faceted: { phone: svg, user: svg }
 * }
 */
const strToArr = (str, arr) => {
  const strArr = str.toLocaleLowerCase().split('! ')
  const folderName = strArr[0].split(', ')
  const fileName = strArr[1].split(', ')
  const newArr = []
  let fileIndex = 0
  for(const index in arr) {
    const svgListKey = Object.keys(arr[index])[0]
    const res = {}
    for(let i in arr[index][svgListKey]) {
      res[handleSpace(fileName[fileIndex])] = arr[index][svgListKey][i]
      fileIndex++
    }
    newArr.push({[folderName[index]]: res})
  }
  return newArr
}
/** 将空格清除，把后面的字符变为大写 */
const handleSpace = (target) => {
  const spaceIndex = target.indexOf(' ')
  if(spaceIndex === -1) return target
  const letter = target[spaceIndex+1]
  const reg = new RegExp(` ${letter}`)
  return target.replace(reg, letter.toLocaleUpperCase())
}


/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path 
 */
function emptyDir(path) {
  const files = fs.readdirSync(path);
  files.forEach(file => {
    const filePath = `${path}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      emptyDir(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

/**
 * 删除指定路径下的所有空文件夹
 * @param {*} path 
 */
function rmEmptyDir(path, level=0) {
  const files = fs.readdirSync(path);
  if (files.length > 0) {
    let tempFile = 0;
    files.forEach(file => {
      tempFile++;
      rmEmptyDir(`${path}/${file}`, 1);
    });
    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(path);
    }
  }
  else {
    level !==0 && fs.rmdirSync(path);
  }
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path 
 */
function clearDir(path) {
  emptyDir(path);
  rmEmptyDir(path);
}


// interface SvgList {
//   [key: string]: SvgVal
// }

// interface SvgVal {
//   [key: string]: string
// }


