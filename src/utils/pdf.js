const Puppeteer = require('puppeteer');
// 웹 폰트 사용을 위한 CSS 추가
const webFontLink = '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">';
const modifiedHtml = html.replace('</head>', `${webFontLink}</head>`);

module.exports = async function buildPdf(inputFile, outputFile) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(modifiedHtml, { waitUntil: 'networkidle0' });
  // await page.goto(`file://${inputFile}`, {
  //   waitUntil: 'networkidle0'
  // });
  await page.pdf({
    path: outputFile,
    format: 'A4',
    border: 0,
    margin: {
      top: '2.54cm',
      right: '2.54cm',
      bottom: '2.54cm',
      left: '2.54cm',
    },
  });
  await browser.close();
};
