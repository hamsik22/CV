const Puppeteer = require('puppeteer');

module.exports = async function buildPdf(inputFile, outputFile) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${inputFile}`, {
    waitUntil: 'networkidle0'
  });
  await page.addStyleTag({ content: '@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap");' });
  await page.evaluate(() => {
    document.body.style.fontFamily = 'Noto Sans KR, sans-serif';
  });
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
