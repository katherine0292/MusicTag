/* Reproducible recordings of actual browser interactions.
   Requires Playwright, Chrome and ffmpeg; override paths through environment variables. */
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/recordings');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const ffmpeg=process.env.FFMPEG || 'ffmpeg';
const base=process.env.DEMO_BASE_URL || 'http://127.0.0.1:8765';
const time=t=>{const ms=Math.floor(t*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`};
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--autoplay-policy=no-user-gesture-required']});
 async function record(kind){
  const context=await browser.newContext({viewport:{width:1280,height:960},deviceScaleFactor:1,colorScheme:'light',recordVideo:{dir:'/private/tmp/musictag-raw',size:{width:1280,height:960}}});
  await context.route('https://**/*',r=>r.abort());
  await context.addInitScript(()=>{
    localStorage.clear();
    window.__sound=[];
    const Native=window.AudioContext;
    window.AudioContext=class extends Native{constructor(...args){super(...args);const dest=this.createMediaStreamDestination();const original=AudioNode.prototype.connect;const ctx=this;AudioNode.prototype.connect=function(target,...rest){if(target===ctx.destination)original.call(this,dest);return original.call(this,target,...rest)};
      const recorder=new MediaRecorder(dest.stream,{mimeType:'audio/webm;codecs=opus'}),chunks=[];const item={start:performance.now(),recorder,chunks};window.__sound.push(item);recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};recorder.start(200);
    }};
  });
  const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/'+(kind==='app'?'prototype/':'early-concept/')+'?embed=1',{waitUntil:'domcontentloaded'});
  await p.addStyleTag({content:`body{padding-top:86px!important}#record-caption{position:fixed;top:0;left:0;right:0;height:74px;background:#151d47;color:#fff;z-index:9999;padding:16px 46px;box-sizing:border-box;font:600 22px/1.25 -apple-system,sans-serif}#record-caption small{display:block;font-size:12px;color:#c4ccef;font-weight:400;margin-top:5px}.lr-panel{align-self:start;margin-top:80px}.lr-phone{height:812px!important}.concept-stage{margin:45px auto;max-width:1000px}.record-cursor{position:fixed;width:24px;height:24px;border:2px solid #5368ed;background:#5368ed33;border-radius:50%;pointer-events:none;z-index:10000;transform:translate(-50%,-50%)}`});
  await p.evaluate(()=>{const c=document.createElement('div');c.id='record-caption';document.body.prepend(c);const pointer=document.createElement('i');pointer.className='record-cursor';document.body.append(pointer);addEventListener('pointermove',e=>{pointer.style.left=e.clientX+'px';pointer.style.top=e.clientY+'px'})});
  const start=Date.now(),chapters=[],captions=[];
  const elapsed=()=> (Date.now()-start)/1000;
  const wait=ms=>p.waitForTimeout(ms);
  async function label(title,detail){await p.evaluate(([a,b])=>{document.querySelector('#record-caption').innerHTML='';const t=document.createElement('span');t.textContent=a;const sub=document.createElement('small');sub.textContent=b;document.querySelector('#record-caption').append(t,sub)},[title,detail]);captions.push({start:elapsed(),text:title+' — '+detail});}
  async function click(key,delay=1000,early=false){const scope=early&&['toggle','next','previous','louder','quieter'].includes(key)?p.locator('.concept-remote'):p;const loc=scope.locator(`[${early?'data-action':'data-key'}="${key}"]`).first();await loc.scrollIntoViewIfNeeded();const b=await loc.boundingBox();await p.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:12});await loc.click();await wait(delay)}
  const chapter=async(id,title,fn)=>{const begin=elapsed();await fn();chapters.push({id,title,start:begin,end:elapsed()});console.log(kind,id,'done')};
  if(kind==='app'){
   await chapter('01-listening','Choose and play',async()=>{
    await label('01 / Familiar music, close at hand','Welcome → Home → Library → Liked songs → Now playing');await wait(1500);await click('start');await click('tab:library');await click('list:liked');await click('play:moon',2200);await p.screenshot({path:path.join(out,'app-poster.jpg')});await click('toggle-play');await click('toggle-play',1800);await click('next');await click('previous');
    await p.locator('#lr-seek').fill('90');await wait(900);await click('like');await p.locator('.lr-toast button').click();await wait(900);await click('back');
   });
   await chapter('02-search-recovery','Search and recovery',async()=>{
    await label('02 / Search stays recoverable','Typed search → voice miss → retry → review results → typed fallback → offline recovery');
    await click('tab:search');await p.locator('#lr-input').fill('Teresa');await wait(1300);await click('filter:songs');await click('play:bloom');await click('back');
    await click('case-voice');await click('voice-example',2000);await click('voice-restart');await click('voice-example',2000);await click('play:bloom');await click('back');
    await click('voice-start');await click('stop-voice');await click('type-instead');await p.locator('#lr-input').fill('Moon');await wait(1200);await click('case-offline');await click('tab:library');await click('case-offline');await click('online-retry');
   });
   await chapter('03-family','Family playlist and invitation',async()=>{
    await label('03 / A shared place for family music','Library → Family playlist → add a song → invitation permissions → invite Alex');
    await click('tab:library');await click('list:family');await click('family-add');await click('add-song:moon');await click('invite');await click('share');await click('invite-role:1');await click('send-invite',1500);await click('back');await click('back');
   });
   await chapter('04-preferences','Output and preferences',async()=>{
    await label('04 / Comfort and control','Speaker routing → text size → reduced motion → voice language');
    await click('tab:home');await click('resume');await click('output');await click('output:speaker');await click('close-sheet');await click('player-options');await click('preferences');await click('text-size');await click('size:2');await click('close-sheet');await click('reduce-motion');await click('language');await click('language:yue');await click('close-sheet');await click('text-size');await click('size:1');await click('close-sheet');await click('back');await click('back');
   });
   await chapter('05-musictag-setup','MusicTag setup and practice',async()=>{
    await label('05 / Learn the remote by trying it','Pairing failure → retry → connected → play, skip and volume → disconnect');
    await click('case-tag');await click('tag-scan',1200);await click('tag-connect',1500);await click('tag-retry');await click('tag-scan',1200);await click('tag-connect',1500);await click('tag-guide');await click('remote-play');await click('remote-play');await click('guide-skip');await click('remote-next');await click('remote-previous');await click('guide-volume');await click('volume-up');await click('volume-down');await click('guide-done');await click('tag-settings');await click('tag-disconnect');await click('do-disconnect');await click('tab:home');
   });
   await label('The Listening Room / End of walkthrough','Browser prototype · synthesised audio · simulated services and Bluetooth');await wait(1700);
  }else{
   await label('MusicTag / Early hardware concept','Choose music on the phone, then operate the tactile remote. Browser simulation.');await wait(1700);
   await click('library',1000,true);await click('list-liked',1800,true);await p.screenshot({path:path.join(out,'hardware-poster.jpg')});
   await label('Play and pause','The large centre button controls the same track on the phone.');await click('toggle',1300,true);await click('toggle',1600,true);
   await label('Skip without browsing','Next and Previous update the phone’s title, artwork and playback status.');await click('next',1600,true);await click('next',1300,true);await click('previous',1600,true);
   await label('Adjust volume','Volume changes the synthesised preview level as well as the visible percentage.');await click('louder',1200,true);await click('louder',1200,true);await click('quieter',1200,true);
   await label('Choose a different playlist on the phone','MusicTag controls playback; playlist selection stays on the phone.');await click('library',1000,true);await click('list-family',1600,true);await click('next',1400,true);await click('library',1000,true);await click('list-walk',1600,true);await click('next',1400,true);await click('toggle',1200,true);await click('reset',1200,true);
   await label('MusicTag / End of early concept walkthrough','Recorded interactions with the repository’s early-concept prototype, not physical device footage.');await wait(1500);
  }
  const duration=elapsed();
  const sound=await p.evaluate(async()=>{const item=window.__sound[0];if(!item)return null;await new Promise(r=>{item.recorder.onstop=r;item.recorder.stop()});const blob=new Blob(item.chunks,{type:'audio/webm'});const base64=await new Promise(r=>{const reader=new FileReader();reader.onload=()=>r(reader.result.split(',')[1]);reader.readAsDataURL(blob)});return{base64,start:item.start}});
  // Video begins with the page; the first synthesised output starts later.
  const video=p.video();await context.close();const raw=await video.path();
  const name=kind==='app'?'app-full':'musictag-early-full';const args=['-y','-i',raw];
  if(sound){fs.writeFileSync('/private/tmp/'+name+'-audio.webm',Buffer.from(sound.base64,'base64'));args.push('-itsoffset',String(Math.max(0,sound.start/1000)),'-i','/private/tmp/'+name+'-audio.webm','-map','0:v','-map','1:a','-c:a','aac','-b:a','128k');}
  if(sound)args.push('-af',kind==='app'?'volume=12dB':'volume=6dB');
  args.push('-c:v','libx264','-preset','fast','-crf','22','-pix_fmt','yuv420p','-movflags','+faststart',path.join(out,name+'.mp4'));
  execFileSync(ffmpeg,args,{stdio:'ignore'});
  const vtt=(list,offset=0,end=duration)=>'WEBVTT\n\n'+list.filter(c=>c.start<end).map((c,i)=>`${time(Math.max(0,c.start-offset))} --> ${time(Math.max(.1,Math.min(list[i+1]?.start??end,end)-offset))}\n${c.text}\n`).join('\n');
  fs.writeFileSync(path.join(out,name+'.vtt'),vtt(captions));
  if(kind==='app')for(const c of chapters){execFileSync(ffmpeg,['-y','-ss',String(c.start),'-i',path.join(out,name+'.mp4'),'-t',String(c.end-c.start),'-c:v','libx264','-preset','fast','-crf','23','-c:a','aac','-movflags','+faststart',path.join(out,c.id+'.mp4')],{stdio:'ignore'});fs.writeFileSync(path.join(out,c.id+'.vtt'),vtt(captions.filter(x=>x.start>=c.start&&x.start<c.end),c.start,c.end));}
  fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify({recordedOn:'2026-11-15',type:'Actual browser interaction recording',audio:'Captured Web Audio synthesised preview',duration,chapters,errors},null,2));
  if(errors.length)throw Error(errors.join('\n'));console.log('saved',name,duration.toFixed(1)+'s');
 }
 try{if(process.argv[2]!=='hardware')await record('app');await record('hardware')}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
