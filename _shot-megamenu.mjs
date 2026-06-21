import pw from 'file:///C:/Users/mahin/.claude/skills/playwright-skill/node_modules/playwright/index.js';
const { chromium } = pw;
const file = 'file:///D:/cursor/netim-seo-os/klienci/kobi-meble/strategia/mega-menu-FINAL-2026-06-19.html';
const b = await chromium.launch();
for(const [w,h,name] of [[1440,900,'desktop'],[768,1024,'tablet'],[375,800,'mobile']]){
  const p = await b.newPage({viewport:{width:w,height:h}});
  await p.goto(file,{waitUntil:'domcontentloaded'});
  await p.waitForTimeout(1200);
  if(name==='desktop'){ // klik w łóżka piętrowe by pokazac produkty
    await p.evaluate(()=>{const ls=[...document.querySelectorAll('.leaf')];const t=ls.find(x=>x.textContent.includes('piętrowe'));if(t){t.scrollIntoView();t.click();}});
    await p.waitForTimeout(600);
  }
  await p.screenshot({path:`playwright-tmp/megamenu-${name}.png`, fullPage:false});
  console.log('shot', name);
  await p.close();
}
await b.close();
