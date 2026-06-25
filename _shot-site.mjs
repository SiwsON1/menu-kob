import pw from 'file:///C:/Users/mahin/.claude/skills/playwright-skill/node_modules/playwright/index.js';
const {chromium}=pw;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('file:///D:/cursor/netim-seo-os/klienci/kobi-meble/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(900);
await p.evaluate(()=>{const n=[...document.querySelectorAll('.navitem')].find(x=>x.textContent.trim().startsWith('Meble'));if(n)n.click();});
await p.waitForTimeout(300);
// hover Komody to show its subs in right panel
await p.evaluate(()=>{const l=[...document.querySelectorAll('.mleft')].find(x=>x.textContent.includes('Komody'));if(l){const e=new MouseEvent('mouseenter');l.dispatchEvent(e);}});
await p.waitForTimeout(300);
await p.screenshot({path:'playwright-tmp/site-mega2.png'});
console.log('ok');await b.close();
