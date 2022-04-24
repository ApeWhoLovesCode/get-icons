// const request = require('request')
const puppeteer = require('puppeteer')
const fs = require('fs')
const log = console.log

const getHtml = async (url) => {
  //启动浏览器
  const browers = await puppeteer.launch({
    headless: false, // 打开浏览器
  })
  //启动新页面
  const page = await browers.newPage()
  //链接网址
  await page.goto(url)

  await page.waitForSelector('#root .main') // 等待首页加载出来
  // await page.waitForSelector('#root .main .page-userdetail-container .collection-list .icons-container') // 等待首页加载出来
  const Element = await page.$('#root .main .page-userdetail-container .collection-list .icons-container');
  // 跳转到iconfont里面的svg详情页
  Element.click()

  await page.waitForSelector('#root .main .page-collection-detail-wrap') // 等待首页加载出来

  // const Element2 = await page.$('#root .main .page-collection-detail-wrap ul li .icon-twrap');

  // Element2.hover()

  const result = await page.evaluate(() => {
    const res = []
    const svgDomList = document.querySelectorAll("#root .main .page-collection-detail-wrap ul li")
    for(let dom of svgDomList) {
      res.push(dom.querySelector('.icon-twrap').innerHTML)
    }
    return res
  });

  // 生成svg
  const dir = `getData/svg`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for(let i in result) {
    fs.writeFileSync(`${dir}/icon${i}.svg`, result[i])
  }
  
  // await page.close();
}
getHtml('https://www.iconfont.cn/user/detail?spm=a313x.7781069.1998910419.d9bd4f23f&uid=9130643&nid=7smdkOsK6RuQ')

// const getSvgData = (url) => {
//   return new Promise((resolve, reject) => {
//     request(url, (error, response, body) => {
//       if(response.statusCode === 200) {
//         // console.log('body:', body);
//         fs.writeFileSync('getData/iconfont.html', body)
//         resolve(body)
//       } else {
//         reject(error)
//       }
//     });
//   })
// }

// const url = '/collections/detail?spm=a313x.7781069.1998910419.dc64b3430&cid=40180'
// const url = 'https://www.baidu.com/'
// getSvgData(url).then(res => {

// })


