const fs=require('fs'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
(async()=>{const b=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});const results=[];
for(const width of [1440,1024,768,390,320]){
 const p=await b.newPage({viewport:{width,height:1000},colorScheme:'light',reducedMotion:'reduce'});await p.route('https://**/*',r=>r.abort());const errors=[];p.on('pageerror',e=>errors.push(e.message));const missing=[];p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1'))missing.push(r.url())});
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(500);await p.screenshot({path:path.join(root,`review/cover-${width}.png`)});
 const cover=await p.locator('#bn-img').evaluate(e=>({complete:e.complete,natural:[e.naturalWidth,e.naturalHeight],display:[e.clientWidth,e.clientHeight]}));
 await p.locator('#c-experience').scrollIntoViewIfNeeded();await p.waitForTimeout(600);const app=p.frameLocator('#app-frame');await app.locator('[data-key="start"]').click();await app.locator('[data-key="resume"]').click();await app.locator('[data-key="next"]').click();await app.locator('[data-key="toggle-play"]').click();
 await p.screenshot({path:path.join(root,`review/live-${width}.png`)});
 const appWidth=await app.locator('body').evaluate(e=>({viewport:innerWidth,scroll:e.scrollWidth,height:e.scrollHeight}));
 await p.locator('#early-frame').scrollIntoViewIfNeeded();await p.waitForTimeout(400);const early=p.frameLocator('#early-frame');await early.locator('[data-action="library"]').click();await early.locator('[data-action="list-liked"]').click();await early.locator('#remote-toggle').click();await early.locator('.concept-remote [data-action="next"]').click();await early.locator('[data-action="louder"]').click();const remoteStatus=await early.locator('#remote-status').textContent();const volume=await early.locator('#concept-volume').textContent();
 await p.screenshot({path:path.join(root,`review/hardware-${width}.png`)});
 const earlyWidth=await early.locator('body').evaluate(e=>({viewport:innerWidth,scroll:e.scrollWidth,height:e.scrollHeight}));
 await p.locator('#l-zh').click();const zhTitle=await p.locator('[data-k="live.title"]').textContent();await p.locator('#l-en').click();
 await p.locator('.screen-details summary').click();const screens=await p.locator('#strip .si').count();await p.locator('#recordings summary').click();await p.locator('[data-film="musictag-early-full"]').click();const src=await p.locator('#walkthrough').getAttribute('src');
 const external=await p.locator('a[href^="http"]').count();const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 results.push({width,errors,missing,cover,appWidth,earlyWidth,remoteStatus,volume,zhTitle,screens,src,external,overflow});await p.close();
}
await b.close();fs.writeFileSync(path.join(root,'review/browser-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));if(results.some(r=>r.errors.length||r.missing.length||r.overflow||r.external||r.screens!==24||r.appWidth.scroll>r.appWidth.viewport||r.earlyWidth.scroll>r.earlyWidth.viewport))process.exit(1);
})().catch(e=>{console.error(e);process.exit(1)});
