'use strict';
const songs = {
  moon: ['Fly Me to the Moon','Frank Sinatra','moon'],
  coast: ['What a Wonderful World','Louis Armstrong','coast'],
  bloom: ['The Moon Represents My Heart','Teresa Teng','bloom'],
  train: ['Here Comes the Sun','The Beatles','train'],
  radio: ['Hotel California','Eagles','radio']
};
const playlists = {
  liked: ['Liked songs','bloom',['moon','coast','bloom']],
  family: ['Family playlist','family',['bloom','train']],
  walk: ['Morning Walk','train',['train','coast','radio']]
};
const ui = document.querySelector('#concept-screen');
const status = document.querySelector('#remote-status');
const button = document.querySelector('#remote-toggle');
const amount = document.querySelector('#concept-volume');
const defaults = () => ({ view: 'welcome', playing: false, list: '', track: 0, volume: 65 });
let state = defaults();

// A quiet synthesised preview makes play, pause, skip and volume tangible.
// This is deliberately not a recording of any of the named catalogue songs.
let audio, gain, timer, step = 0;
const notes = [0,4,7,11,7,4,2,7];
function stopSound() { clearInterval(timer); timer = null; if(gain) gain.gain.setValueAtTime(0,audio.currentTime); }
function syncSound() {
  if (!state.playing || !state.list) { stopSound(); return; }
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    if (!gain) { gain = audio.createGain(); gain.connect(audio.destination); }
    audio.resume();
    gain.gain.setValueAtTime(state.volume / 100 * .13,audio.currentTime);
    if (timer) return;
    const tick = () => {
      if(!state.playing) return;
      const osc = audio.createOscillator(), envelope = audio.createGain();
      const at = audio.currentTime;
      osc.type='sine'; osc.frequency.value=220*Math.pow(2,(notes[step++ % notes.length]+state.track*2)/12);
      envelope.gain.setValueAtTime(0,at); envelope.gain.linearRampToValueAtTime(.8,at+.025); envelope.gain.exponentialRampToValueAtTime(.001,at+.36);
      osc.connect(envelope); envelope.connect(gain); osc.start(at); osc.stop(at+.38);
    };
    tick(); timer=setInterval(tick,420);
  } catch { /* All controls remain usable when browser audio is unavailable. */ }
}
document.addEventListener('musictag:pause',()=>{state.playing=false;stopSound();render()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){state.playing=false;stopSound();render()}});

const art = (name, css = '') => `<img src="../assets/art/${name}.webp" alt="" class="${css}">`;
const press = (key,label,css) => `<button class="${css}" type="button" data-action="${key}">${label}</button>`;
function render(focusKey) {
  const list = state.list ? playlists[state.list] : null;
  const song = list ? songs[list[2][state.track]] : null;
  if (state.view === 'welcome') {
    ui.innerHTML = art('moon','concept-art') + '<h2>Welcome to Spotify Ease</h2><p>Open your library to choose a playlist.</p>' + press('library','Get started','concept-btn');
  } else if (state.view === 'library') {
    ui.innerHTML = '<h2>Your library</h2>' + Object.entries(playlists).map(([id,[title,cover]]) =>
      press('list-' + id,art(cover) + `<span>${title}</span><span aria-hidden="true">▶</span>`,'concept-playlist')).join('');
  } else {
    ui.innerHTML = press('library','‹ Library','concept-back') + art(song[2],'concept-art') +
      `<h2>${song[0]}</h2><p>${song[1]} · ${list[0]}</p><div class="concept-player">${press('previous','Previous','')}${press('toggle',state.playing ? 'Pause' : 'Play','')}${press('next','Next','')}</div>`;
  }
  button.textContent = state.playing ? 'Ⅱ' : '▶';
  button.setAttribute('aria-label',state.playing ? 'Pause' : 'Play');
  amount.value = state.volume + '%';
  status.textContent = song ? `${state.playing ? 'Playing' : 'Paused'} · ${song[0]}` : 'Choose a playlist on the phone to start.';
  document.querySelector('.disc-remote').classList.toggle('is-playing',state.playing);
  if (focusKey) ui.querySelector(`[data-action="${focusKey}"]`)?.focus({ preventScroll:true });
}
document.querySelector('.concept-stage').addEventListener('click',event => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  let focusKey = ui.contains(target) ? action : null;
  if (action === 'reset') state = defaults();
  else if (action === 'library') {
    state.view = 'library';
    focusKey = 'list-liked';
  } else if (action.startsWith('list-')) {
    state.list = action.slice(5);
    state.track = 0;
    state.view = 'playing';
    state.playing = true;
    focusKey = 'toggle';
  } else if (action === 'louder' || action === 'quieter') {
    state.volume = Math.min(100,Math.max(0,state.volume + (action === 'louder' ? 10 : -10)));
  } else if (state.list) {
    if (action === 'toggle') state.playing = !state.playing;
    if (action === 'next' || action === 'previous') {
      const total = playlists[state.list][2].length;
      state.track = (state.track + total + (action === 'next' ? 1 : -1)) % total;
    }
  }
  render(focusKey);
  syncSound();
});
render();
