import pw from 'file:///C:/Users/mahin/.claude/skills/playwright-skill/node_modules/playwright/index.js';
const {chromium}=pw;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1100}});
await p.goto('file:///D:/cursor/netim-seo-os/klienci/kobi-meble/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(900);
await p.evaluate(()=>{const n=[...document.querySelectorAll('.navitem')].find(x=>x.textContent.includes('Pokój dziecka'));if(n)n.click();});
await p.waitForTimeout(400);
await p.screenshot({path:'playwright-tmp/site-mega-subs.png'});
console.log('ok');await b.close();
