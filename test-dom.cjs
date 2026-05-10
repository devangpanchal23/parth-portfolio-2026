const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for 5 seconds for animations
  await new Promise(r => setTimeout(r, 5000));
  
  const imgCount = await page.evaluate(() => document.querySelectorAll('#hero img').length);
  const cardCount = await page.evaluate(() => document.querySelectorAll('#hero > div > div > div > div').length);
  
  console.log(`Images found in #hero: ${imgCount}`);
  
  if (imgCount > 0) {
    const details = await page.evaluate(() => {
      const img = document.querySelector('#hero img');
      const card = img.parentElement;
      const mouse = card.parentElement;
      const scroll = mouse.parentElement;
      
      return {
        img: {
          src: img.src,
          width: img.getBoundingClientRect().width,
          height: img.getBoundingClientRect().height,
          opacity: window.getComputedStyle(img).opacity,
          transform: window.getComputedStyle(img).transform,
          display: window.getComputedStyle(img).display
        },
        card: {
          width: card.getBoundingClientRect().width,
          height: card.getBoundingClientRect().height,
          opacity: window.getComputedStyle(card).opacity,
          transform: window.getComputedStyle(card).transform,
          display: window.getComputedStyle(card).display,
          overflow: window.getComputedStyle(card).overflow
        },
        scroll: {
          width: scroll.getBoundingClientRect().width,
          height: scroll.getBoundingClientRect().height,
          top: window.getComputedStyle(scroll).top,
          left: window.getComputedStyle(scroll).left,
          position: window.getComputedStyle(scroll).position
        }
      };
    });
    console.log(JSON.stringify(details, null, 2));
  }
  
  await browser.close();
})();
