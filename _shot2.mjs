import pw from 'file:///C:/Users/mahin/.claude/skills/playwright-skill/node_modules/playwright/index.js';
const { chromium } = pw;
const file='file:///D:/cursor/netim-seo-os/klienci/kobi-meble/strategia/mega-menu-FINAL-2026-06-19.html';
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto(file,{waitUntil:'domcontentloaded'});
await p.waitForTimeout(1200);
// otworz galaz Salon (#6) i klik Stoły zeby pokazac chipy
await p.evaluate(()=>{const bs=[...document.querySelectorAll('.branch-h')];const t=bs.find(x=>x.textContent.includes('Salon'));if(t)t.click();});
await p.waitForTimeout(400);
await p.evaluate(()=>{const ls=[...document.querySelectorAll('.leaf')];const t=ls.find(x=>x.textContent.includes('Stoły'));if(t){t.scrollIntoView();t.click();}});
await p.waitForTimeout(500);
await p.screenshot({path:'playwright-tmp/megamenu-subs.png'});
console.log('shot subs');
await b.close();
