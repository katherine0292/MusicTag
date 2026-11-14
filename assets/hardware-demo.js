// A compact, native rendering of the early phone–remote interaction study.
(() => {
  const root=document.querySelector('#hardware-study');if(!root)return;
  const $=s=>root.querySelector(s);
  const songs={moon:['Fly Me to the Moon','Frank Sinatra','moon'],coast:['What a Wonderful World','Louis Armstrong','coast'],bloom:['The Moon Represents My Heart','Teresa Teng','bloom'],train:['Here Comes the Sun','The Beatles','train'],radio:['Hotel California','Eagles','radio']};
  const lists={liked:{labels:['喜欢的歌','Liked songs'],ids:['moon','coast','bloom']},family:{labels:['家人歌单','Family playlist'],ids:['bloom','train']},walk:{labels:['晨间散步','Morning Walk'],ids:['train','coast','radio']}};
  let list='liked',index=0,playing=false,volume=65,audio,gain,timer,step=0;
  const zh=()=>document.documentElement.lang.startsWith('zh');
  function render(){
    const id=lists[list].ids[index],song=songs[id];
    const select=$('#hw-playlist');
    if(!select.options.length||select.dataset.lang!==String(zh())){select.innerHTML=Object.entries(lists).map(([key,v])=>`<option value="${key}">${v.labels[zh()?0:1]}</option>`).join('');select.dataset.lang=String(zh())}
    select.value=list;$('#hw-title').textContent=song[0];$('#hw-artist').textContent=song[1];$('#hw-art').src='assets/art/'+song[2]+'.webp';$('#hw-art').alt=song[0]+' artwork';
    $('#hw-status').textContent=playing?(zh()?'正在播放':'Playing'):(zh()?'已暂停':'Paused');$('#hw-volume').textContent=(zh()?'音量 ':'Volume ')+volume+'%';
    for(const id of ['hw-phone-toggle','hw-remote-toggle']){$('#'+id).textContent=playing?'Ⅱ':'▶';$('#'+id).setAttribute('aria-label',(playing?(zh()?'暂停':'Pause'):(zh()?'播放':'Play'))+(id.includes('remote')?' · MusicTag':''));$('#'+id).setAttribute('aria-pressed',String(playing))}
    $('.hw-remote').classList.toggle('playing',playing);
  }
  function stop(){clearInterval(timer);timer=null;if(gain)gain.gain.setValueAtTime(0,audio.currentTime)}
  function syncSound(){
    if(!playing){stop();return}
    try{audio ||=new(window.AudioContext||window.webkitAudioContext)();if(!gain){gain=audio.createGain();gain.connect(audio.destination)}audio.resume();gain.gain.setValueAtTime(volume/100*.13,audio.currentTime);if(timer)return;
      const notes=[0,4,7,11,7,4,2,7];const tick=()=>{if(!playing)return;const osc=audio.createOscillator(),env=audio.createGain(),at=audio.currentTime;osc.type='sine';osc.frequency.value=220*Math.pow(2,(notes[step++%notes.length]+index*2)/12);env.gain.setValueAtTime(0,at);env.gain.linearRampToValueAtTime(.8,at+.025);env.gain.exponentialRampToValueAtTime(.001,at+.36);osc.connect(env);env.connect(gain);osc.start(at);osc.stop(at+.38)};tick();timer=setInterval(tick,420);
    }catch{/* The visual control study remains usable when audio is unavailable. */}
  }
  root.addEventListener('click',e=>{const b=e.target.closest('[data-hw]');if(!b)return;const key=b.dataset.hw;if(key==='toggle')playing=!playing;else if(key==='next'||key==='previous'){const n=lists[list].ids.length;index=(index+(key==='next'?1:-1)+n)%n}else if(key==='louder'||key==='quieter')volume=Math.min(100,Math.max(0,volume+(key==='louder'?10:-10)));render();syncSound()});
  $('#hw-playlist').addEventListener('change',e=>{list=e.target.value;index=0;playing=true;render();syncSound()});
  const pause=()=>{if(playing){playing=false;stop();render()}};
  new IntersectionObserver(es=>{if(!es[0].isIntersecting)pause()}).observe(root);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
  document.addEventListener('portfolio:language',render);render();
})();
