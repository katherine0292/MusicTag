(() => {
  'use strict';
  const root = document.getElementById('musictag-prototype');
  const phone = root.querySelector('#lr-phone');
  const device = root.querySelector('#lr-device');
  const header = root.querySelector('#lr-header');
  const screen = root.querySelector('#lr-screen');
  const footer = root.querySelector('#lr-footer');
  const overlay = root.querySelector('#lr-overlay');
  const toast = root.querySelector('#lr-toast');
  const scenarios = root.querySelector('#lr-scenario-controls');
  const imagePath = name => `../assets/art/${name}.webp`;
  const tracks = {
    moon: { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', art: 'moon', length: 147, key: 55 },
    bloom: { title: 'The Moon Represents My Heart', artist: 'Teresa Teng', art: 'bloom', length: 209, key: 60 },
    coast: { title: 'What a Wonderful World', artist: 'Louis Armstrong', art: 'coast', length: 138, key: 53 },
    jazz: { title: 'La Vie en rose', artist: 'Édith Piaf', art: 'jazz', length: 187, key: 62 },
    train: { title: 'Here Comes the Sun', artist: 'The Beatles', art: 'train', length: 185, key: 57 },
    singer: { title: 'Below the Lion Rock', artist: 'Roman Tam', art: 'singer', length: 238, key: 53 },
    honey: { title: 'Sweet as Honey', artist: 'Teresa Teng', art: 'singer', length: 210, key: 65 },
    goodbye: { title: 'Goodbye, My Love', artist: 'Teresa Teng', art: 'bloom', length: 228, key: 57 },
    radio: { title: 'Hotel California', artist: 'Eagles', art: 'radio', length: 391, key: 59 }
  };
  const lists = {
    liked: { title: 'Liked songs', desc: 'Songs you’ve saved in one place.', art: 'bloom', wash: '#eecfdf' },
    family: { title: 'Family playlist', desc: 'Curated by Sophie', art: 'family', wash: '#f4d4b3', ids: ['bloom','train','coast'] },
    cantopop: { title: 'Cantopop favourites', desc: 'Curated by Sophie', art: 'singer', wash: '#cbd6fb', ids: ['bloom','singer','honey','goodbye'] },
    walk: { title: 'Morning Walk', desc: 'Made for you', art: 'train', wash: '#f6d8b8', ids: ['train','coast','radio'] }
  };
  const tabs = [['home','house','Home'],['library','library-big','Library'],['search','search','Search'],['tag','radio-receiver','MusicTag']];
  const initialRecents = [['Teresa Teng','Artist'],['Fly Me to the Moon','Song'],['Morning Walk','Playlist']];
  const languages = [
    { key: 'en', label: 'English (Australia)', sample: 'The Moon Represents My Heart' },
    { key: 'yue', label: 'Cantonese (Hong Kong)', sample: 'The Moon Represents My Heart' },
    { key: 'zh', label: 'Mandarin (Simplified)', sample: 'The Moon Represents My Heart' }
  ];
  const defaultState = () => ({
    path: ['welcome'], sheet: '', modalFrom: null, query: '', searchType: 'all', recents: initialRecents,
    liked: ['moon','bloom','coast','jazz'], familySongs: [...lists.family.ids], sent: false,
    inviteRole: 'Can add songs', playlist: 'liked', started: false, playing: false, current: 'moon',
    queue: ['moon','bloom','coast','jazz'], source: 'Liked songs', seconds: 62, output: 'phone', volume: 65,
    size: 'Large', reduce: true, language: 'en', paired: false, bluetooth: true, online: true,
    scanning: false, connecting: false, failVoice: false, failTag: false, guideMode: 'play'
  });
  const state = defaultState();
  const quickCases = [
    ['case-find','Find a familiar song'], ['case-family','Share a family playlist'],
    ['case-voice','Recover from a voice miss'], ['case-offline','Search while offline'],
    ['case-tag','Recover from a pairing failure']
  ];
  const keys = new Set(['home','library','search','tag']);
  const fallbackIcons = {
    house:'⌂', 'library-big':'▥', search:'⌕', 'radio-receiver':'◉', play:'▶', pause:'Ⅱ',
    'skip-back':'|◀', 'skip-forward':'▶|', heart:'♡', mic:'♩', 'mic-off':'×', bluetooth:'ᛒ',
    'bluetooth-off':'×', 'bluetooth-connected':'ᛒ', 'chevron-left':'‹', 'chevron-right':'›',
    'chevron-down':'⌄', 'sliders-horizontal':'☷', 'users-round':'♧', 'user-round':'♙', share:'↑',
    'link-2':'∞', 'clock-3':'◷', 'case-sensitive':'Aa', globe:'◎', plus:'+', minus:'−',
    ellipsis:'⋯', check:'✓', x:'×', info:'ⓘ', speaker:'◖', headphones:'♫', 'volume-2':'◖',
    'airplay':'▣', keyboard:'⌨', smartphone:'▯', 'arrow-up-right':'↗', 'music-2':'♪', send:'➜'
  };

  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const ico = (name, size = 19) => name ? `<i data-lucide="${name}" data-icon-size="${size}" class="lr-icon" style="--icon-size:${size}px" aria-hidden="true">${fallbackIcons[name] || ''}</i>` : '';
  const image = (name, alt = '') => `<img src="${imagePath(name)}" alt="${esc(alt)}" draggable="false" decoding="async">`;
  const action = (key, content, cls = '', attrs = '') =>
    `<button class="cursor-interaction ${cls}" type="button" data-key="${key}" ${attrs}>${content}</button>`;
  const circle = (key, icon, label, cls = '', size = 19, attrs = '') =>
    action(key, ico(icon, size), `lr-circle ${cls}`, `aria-label="${esc(label)}" ${attrs}`);
  const button = (key, text, icon = '', primary = false, attrs = '') =>
    action(key, ico(icon) + esc(text), `lr-btn${primary ? ' lr-primary' : ''}`, attrs);
  const pill = (text, icon = '') => `<span class="lr-pill">${ico(icon,14)}${esc(text)}</span>`;
  const tile = icon => `<span class="lr-tile">${ico(icon,21)}</span>`;
  const lead = (title, desc = '', label = '') =>
    `<div class="lr-lead">${label ? `<div class="lr-eyebrow">${esc(label)}</div>` : ''}<h1>${title}</h1>${desc ? `<p>${esc(desc)}</p>` : ''}</div>`;
  const section = (title, desc = '') =>
    `<div class="lr-section"><h2>${title}</h2>${desc ? `<span>${desc}</span>` : ''}</div>`;
  const rows = (...items) => `<div class="lr-rows lr-glass">${items.join('')}</div>`;
  const note = (html, icon = 'info') => `<div class="lr-note lr-glass">${ico(icon,18)}<p>${html}</p></div>`;
  const row = (art, name, sub, key = '', trail = 'chevron-right', attrs = '') => {
    const content = `${art.startsWith(':') ? tile(art.slice(1)) : image(art)}
      <span><strong>${esc(name)}</strong>${sub ? `<span class="lr-sub">${esc(sub)}</span>` : ''}</span>
      ${trail ? `<span class="lr-trail">${ico(trail,16)}</span>` : ''}`;
    return key ? action(key, content, 'lr-row', attrs) : `<div class="lr-row">${content}</div>`;
  };
  const trackRow = (id, key = 'play') =>
    row(tracks[id].art, tracks[id].title, tracks[id].artist, `${key}:${id}`, key === 'add-song' ? 'plus' : 'play');
  const record = (art, rotating = false) =>
    `<div class="lr-vinyl" aria-hidden="true" data-rotating="${rotating}">${image(art)}</div>`;
  const sleeve = (art, label = '', rotating = false) =>
    `<div class="lr-sleeve">${record(art,rotating)}${image(art)}${label ? `<span class="lr-sleeve-label">${esc(label)}</span>` : ''}</div>`;
  const brand = () => '<span class="lr-brand"><span class="lr-emblem" aria-hidden="true"></span>MusicTag</span>';
  const actions = (...items) => `<div class="lr-actions">${items.join('')}</div>`;
  const now = () => state.path.at(-1);
  const currentTrack = () => tracks[state.current];
  const listTracks = id => id === 'liked' ? state.liked : id === 'family' ? state.familySongs : lists[id].ids;
  const count = (number, noun) => `${number} ${noun}${number === 1 ? '' : 's'}`;
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').trim();
  const initial = () => state.path[0] === 'welcome';

  function icons() {
    const api = globalThis.lucide;
    if (api?.icons) {
      for (const element of root.querySelectorAll('i[data-lucide]')) {
        const key = element.dataset.lucide.replace(/(^|-)([a-z])/g, (_,dash,letter) => letter.toUpperCase());
        if (!api.icons[key] || typeof api.createElement !== 'function') continue;
        const size = element.dataset.iconSize;
        const svg = api.createElement(api.icons[key], { width:size, height:size, 'aria-hidden':'true', 'stroke-width': 1.8, fill: element.dataset.lucide === 'heart' && element.closest('[aria-pressed="true"]') ? 'currentColor' : 'none' });
        element.replaceWith(svg);
      }
    }
    if (api?.createIcons && root.querySelector('i[data-lucide]')) {
      api.createIcons({ attrs: { width: 19, height: 19, 'stroke-width': 1.8 } });
    }
  }

  function focusKey(key, scope = phone) {
    if (!key) return;
    [...scope.querySelectorAll('button[data-key]')].find(item => item.dataset.key === key)?.focus({ preventScroll: true });
  }
  function preserveFocus(renderFn) {
    const node = document.activeElement;
    const key = node?.dataset.key;
    const isSearchInput = node?.id === 'lr-input';
    const selection = isSearchInput ? [node.selectionStart,node.selectionEnd] : null;
    renderFn();
    if (isSearchInput) {
      const input = screen.querySelector('#lr-input');
      if (input && input !== node) {
        input.focus({ preventScroll: true });
        if (selection[0] !== null) input.setSelectionRange(...selection);
      }
    } else {
      focusKey(key, state.sheet ? overlay : phone);
    }
  }
  function route(page, { replace = false, reset = false } = {}) {
    hideToast();
    if (state.sheet) closeSheet(false);
    if (now() !== page) cancelTagRequest();
    if (reset) state.path = [page];
    else if (replace) state.path[state.path.length - 1] = page;
    else if (page !== now()) state.path.push(page);
    render(true);
    if (device.contains(document.activeElement) || document.activeElement === document.body) {
      header.querySelector('button')?.focus({ preventScroll: true });
    }
  }
  function back() {
    if (state.sheet) { closeSheet(); return; }
    if (state.path.length > 1) {
      cancelTagRequest();
      state.path.pop();
      render(true);
      header.querySelector('button')?.focus({ preventScroll: true });
    } else if (!initial()) route('home', { reset: true });
  }
  function tab(page) {
    if (page === 'search' && !state.online) route('offline', { reset: true });
    else route(page, { reset: true });
    focusKey(`tab:${page}`);
  }
  function showToast(message, undo) {
    clearTimeout(showToast.timer);
    const wrapper = document.createElement('div');
    const label = document.createElement('span');
    label.textContent = message;
    wrapper.append(label);
    if (undo) {
      const control = document.createElement('button');
      control.textContent = 'Undo';
      control.type = 'button';
      control.className = 'cursor-interaction';
      control.addEventListener('click', () => { hideToast(); undo(); }, { once: true });
      wrapper.append(control);
    }
    toast.replaceChildren(wrapper);
    showToast.timer = setTimeout(hideToast, undo ? 7200 : 3400);
  }
  function hideToast() {
    clearTimeout(showToast.timer);
    toast.replaceChildren();
  }

  function renderHeader(page) {
    let title = '', left = '', right = '';
    const preferences = circle('preferences','sliders-horizontal','Listening preferences');
    const goBack = circle('back','chevron-left','Back', '', 22);
    const tagInfo = circle('tag-info','info','About MusicTag');
    if (page === 'welcome' || page === 'home') {
      header.innerHTML = `<div class="lr-header lr-brandhead">${brand()}${page === 'welcome' ? action('preferences','Ease Mode','lr-pill') : preferences}</div>`;
      return;
    }
    if (page === 'library') { title = 'Your music'; right = preferences; }
    if (page === 'search') { title = 'Find music'; right = preferences; }
    if (page === 'offline') { title = 'Find music'; left = goBack; }
    if (page === 'playlist') {
      left = goBack;
      right = state.playlist === 'family' ? circle('invite','share','Share Family playlist') :
        circle('playlist-options','ellipsis','Playlist options');
    }
    if (page === 'invite') { title = 'Family playlist'; left = goBack; }
    if (page === 'voice' || page === 'voice-retry') {
      title = 'Voice search'; left = circle('type-instead','x','Close voice search');
    }
    if (page === 'player') {
      title = state.playing ? 'Now playing' : 'Paused';
      left = circle('back','chevron-down','Minimise player', '', 22);
      right = circle('player-options','ellipsis','Playback options');
    }
    if (page === 'preferences') { title = 'Ease Mode'; left = goBack; }
    if (page === 'tag') { title = 'MusicTag'; right = tagInfo; }
    if (page.startsWith('tag-') && page !== 'tag-guide') {
      title = 'MusicTag setup'; left = goBack;
      right = circle('tag-later','x','Close MusicTag setup');
    }
    if (page === 'tag-guide') { title = 'MusicTag'; left = goBack; }
    header.innerHTML = `<div class="lr-header">${left || '<span></span>'}<span>${title}</span>${right || '<span></span>'}</div>`;
  }

  function renderFooter(page) {
    let context = keys.has(page) ? page : '';
    if (page === 'playlist') context = 'library';
    if (page === 'offline') context = 'search';
    let markup = '';
    if (context) {
      if (state.started && page !== 'offline') markup += mini();
      if (page === 'tag' && !state.paired) markup += actions(button('tag-start','Set up MusicTag','bluetooth',true));
      if (page === 'offline') markup += actions(button('online-retry','Try again','search',true),button('tab:library','Back to library','library-big'));
      markup += `<nav class="lr-tabs" aria-label="Main navigation">${tabs.map(([key,icon,label]) =>
        action(`tab:${key}`,ico(icon) + esc(label),'lr-tab',context === key ? 'aria-current="page"' : '')
      ).join('')}</nav>`;
    } else if (page === 'welcome') markup = actions(button('start','Get started','chevron-right',true));
    else if (page === 'invite') markup = actions(button('share','Share invitation','share',true),button('copy','Copy invitation link','link-2'));
    else if (page === 'voice' || page === 'voice-retry') {
      const listening = page === 'voice';
      markup = actions(
        button(listening ? 'stop-voice' : 'voice-restart',listening ? 'Stop listening' : 'Try again',listening ? 'x' : 'mic',true),
        button('type-instead','Type instead','keyboard')
      );
    } else if (page === 'tag-ready') {
      markup = actions(button('tag-scan', state.scanning ? 'Looking nearby…' : 'Find MusicTag','search',true, state.scanning ? 'disabled' : ''),button('tag-later','Set up later'));
    } else if (page === 'tag-found') {
      markup = actions(button('tag-connect', state.connecting ? 'Connecting…' : 'Connect MusicTag','bluetooth',true, state.connecting ? 'disabled' : ''),button('tag-later','Cancel'));
    } else if (page === 'tag-success') {
      markup = actions(button('tag-guide','See button guide','chevron-right',true),button('tab:home','Back to music'));
    } else if (page === 'tag-fail') {
      markup = actions(button('tag-retry','Try again','bluetooth',true),button('tag-later','Set up later'));
    } else if (page === 'tag-guide') markup = actions(button('guide-done','Done','check',true));
    footer.innerHTML = markup;
  }

  function welcome() {
    return `<div class="lr-welcome">
      <div class="lr-welcome-art lr-rings"><span class="lr-eyebrow">Side A / 01</span>${image('vinyl','Three overlapping vinyl records')}<span class="lr-eyebrow">33⅓ RPM</span></div>
      <div>${lead('Music feels<br><em>like home.</em>','Your favourite songs and the memories that come with them.','MusicTag')}</div>
    </div>`;
  }
  function home() {
    const track = currentTrack();
    return `${lead('Good morning,<br>Mary.','Pick up where you left off.')}
      <section class="lr-jacket lr-glass">${sleeve(track.art)}
        <div class="lr-jacket-copy"><div><div class="lr-eyebrow">${state.playing ? 'Now playing' : 'Last played'}</div>
          <strong>${esc(track.title)}</strong><span class="lr-sub">${esc(track.artist)}</span></div>
          ${circle('resume',state.playing ? 'arrow-up-right' : 'play',state.playing ? 'Open now playing' : 'Resume last played','lr-primary',21)}
        </div>
      </section>
      ${section('Close at hand')}
      <div class="lr-two">${action('list:liked',ico('heart') + '<strong>Liked songs</strong>' + `<span class="lr-sub">${count(state.liked.length,'song')}</span>`,'lr-shortcut lr-glass')}
        ${action('list:family',ico('users-round') + '<strong>Family playlist</strong><span class="lr-sub">From Sophie</span>','lr-shortcut lr-glass')}</div>
      ${section('From your shelf')}${rows(row('train','Morning Walk',count(lists.walk.ids.length,'song'),'list:walk'))}`;
  }
  function library() {
    return `${lead('Your library','Your playlists and favourite songs.')}
      ${action('list:liked',record('bloom') + pill('Pinned','heart') + '<h2>Liked songs</h2>' + `<span class="lr-sub">${count(state.liked.length,'song')} you love</span>`,'lr-pin lr-glass')}
      ${section('Your playlists','3 playlists')}
      ${rows(...['family','cantopop','walk'].map(id =>
        row(lists[id].art,lists[id].title,`${count(listTracks(id).length,'song')} · ${id === 'walk' ? 'Made for you' : 'From Sophie'}`,`list:${id}`)
      ))}`;
  }
  function playlist() {
    const id = state.playlist;
    const list = lists[id];
    const songs = listTracks(id);
    const label = id === 'liked' ? count(songs.length,'song') : id === 'family' ? 'Shared with you' : 'Your playlist';
    const desc = id === 'liked' ? list.desc : `${count(songs.length,'song')} · ${list.desc}`;
    return `<div class="lr-detail-art" style="--wash:${list.wash}">${sleeve(list.art)}${pill(label)}</div>
      ${lead(list.title,desc)}
      ${songs.length ? button('play-list','Play playlist','play',true) : ''}
      ${id === 'family' ? `<div class="lr-note lr-glass">${ico('users-round',18)}<div><strong>A note from Sophie</strong><blockquote>“For our Sunday lunches, Mum.”</blockquote></div></div>` : ''}
      ${section('Songs',count(songs.length,'song'))}
      ${songs.length ? rows(...songs.map(id => trackRow(id))) :
        `<div class="lr-empty lr-glass"><h2>No saved songs yet</h2><p>Tap the heart while a song is playing to save it here.</p>${button('tab:search','Find music','search',true)}</div>`}
      ${id === 'family' ? `<div class="lr-actions">${button('family-add','Add a song','plus')}</div>` : ''}`;
  }
  function invite() {
    return `<div class="lr-photo">${image('ribbon','A burgundy ribbon on warm paper')}${tile('users-round')}</div>
      ${lead('Share this playlist','Invite someone you know to listen and add songs.')}
      ${rows(row(':user-round','Sophie','Can add songs','','check'),
        state.sent ? row(':user-round','Alex',`Invited · ${state.inviteRole}`,'','check') : '')}
      ${note('<strong>Who can join?</strong><br>Anyone you send the invitation link to.','link-2')}`;
  }
  function search() {
    return `<div id="lr-search-heading"></div>
      <form class="lr-search lr-glass" id="lr-search-form" role="search">
        ${circle('search-submit','search','Search for music')}
        <input id="lr-input" type="search" maxlength="80" autocomplete="off" placeholder="Song, artist or playlist" aria-label="Song, artist or playlist" value="${esc(state.query)}">
        ${circle('voice-start','mic','Search by voice')}
      </form>
      <div id="lr-search-body"></div>`;
  }
  function matches() {
    const query = normalize(state.query);
    const fit = text => query.split(/\s+/).every(term => normalize(text).includes(term));
    return {
      songs: Object.keys(tracks).filter(id => {
        const track = tracks[id];
        return fit(`${track.title} ${track.artist}`);
      }),
      artists: [...new Set(Object.values(tracks).map(item => item.artist))].filter(artist => fit(artist)),
      playlists: Object.keys(lists).filter(id => fit(lists[id].title))
    };
  }
  function renderSearch() {
    const title = screen.querySelector('#lr-search-heading');
    const body = screen.querySelector('#lr-search-body');
    if (!body) return;
    if (!state.query.trim()) {
      title.innerHTML = lead('Find your music','Type a name or say it aloud.');
      body.innerHTML = action('voice-start',`${tile('mic')}<span><strong>Search by voice</strong><span class="lr-sub">Say a song or artist.</span></span><span class="lr-trail">${ico('chevron-right',16)}</span>`,'lr-voice-cta lr-glass') +
        section('Recent searches') + rows(...state.recents.map(([value,label],index) => row(':clock-3',value,label,`recent:${index}`)));
    } else {
      const result = matches();
      const filters = [['all','All',0],['songs','Songs',result.songs.length],['artists','Artists',result.artists.length],['playlists','Playlists',result.playlists.length]];
      const total = result.songs.length + result.artists.length + result.playlists.length;
      title.innerHTML = lead('Search results',total ? 'Choose a result to open it.' : 'Try a different title, artist or playlist.');
      body.innerHTML = total ? `
        <div class="lr-pills" aria-label="Filter search results">${filters.filter(([type,,num]) => type === 'all' || num)
          .map(([type,label,num]) => action(`filter:${type}`,esc(label) + (num ? ` · ${num}` : ''),'lr-pill',`aria-pressed="${state.searchType === type}"`)).join('')}</div>
        ${state.searchType === 'all' || state.searchType === 'songs' ? result.songs.length ? section('Songs') + rows(...result.songs.map(id => trackRow(id))) : '' : ''}
        ${state.searchType === 'all' || state.searchType === 'artists' ? result.artists.length ? section('Artists') + rows(...result.artists.map((artist,index) =>
          row(':user-round',artist,count(Object.values(tracks).filter(track => track.artist === artist).length,'song'),`artist:${index}`))) : '' : ''}
        ${state.searchType === 'all' || state.searchType === 'playlists' ? result.playlists.length ? section('Playlists') + rows(...result.playlists.map(id =>
          row(lists[id].art,lists[id].title,count(listTracks(id).length,'song'),`list:${id}`))) : '' : ''}
        ${note('<strong>Looking for something else?</strong><br>Change the words above or search by voice.')}
      ` : `<div class="lr-empty lr-glass"><h2>No matches yet</h2><p>Try fewer words, or use the artist’s name.</p>${button('clear-search','Clear search','x')}</div>`;
    }
    icons();
  }
  function rememberQuery(query, label = 'Search') {
    if (!query.trim()) return;
    state.recents = [[query.trim(),label], ...state.recents.filter(([item]) => normalize(item) !== normalize(query))].slice(0,4);
  }
  function setQuery(query, focus = false) {
    state.query = query;
    state.searchType = 'all';
    const input = screen.querySelector('#lr-input');
    if (input) {
      input.value = query;
      if (focus) input.focus();
      else input.blur();
    }
    renderSearch();
  }
  function voice(retry) {
    const sample = languages.find(item => item.key === state.language).sample;
    return `<div class="lr-voice-art lr-rings"><div class="lr-orb" data-listening="${!retry}">${ico(retry ? 'search' : 'mic',54)}</div></div>
      <div class="lr-center lr-voice-heading">
        ${pill(retry ? 'Microphone off' : 'Simulated microphone on',retry ? 'mic-off' : 'mic')}
        <h1>${retry ? 'I didn’t catch that.' : 'I’m listening…'}</h1>
        <p>${retry ? 'Try a song title or the name of the artist.' : 'Tap the example to simulate saying a song title.'}</p>
      </div>
      ${action(retry ? 'voice-restart' : 'voice-example',`<span class="lr-eyebrow">Try saying</span><strong>“${esc(sample)}”</strong>`,'lr-example lr-glass')}`;
  }
  function offline() {
    return `${lead('You’re offline','Connect to the internet to search for songs.')}
      <div class="lr-object lr-offline-art lr-rings">${record('radio')}</div>
      ${note('When you’re back online, you can search by typing or speaking.')}`;
  }
  function typeInstead(focus = true) {
    if (now().startsWith('voice') && state.path.at(-2) === 'search') back();
    else route('search', { reset: true });
    if (focus) screen.querySelector('#lr-input')?.focus();
    else focusKey('voice-start');
  }
  function simulateVoice() {
    if (state.failVoice) {
      state.failVoice = false;
      route('voice-retry',{ replace: true });
      return;
    }
    const sample = languages.find(item => item.key === state.language).sample;
    rememberQuery(sample,'Voice');
    typeInstead(false);
    setQuery(sample);
    showToast('Voice search found a match');
  }

  function mini() {
    const track = currentTrack();
    return `<div class="lr-mini lr-glass">
      ${action('open-player',image(track.art) + `<span class="lr-mini-copy"><strong>${esc(track.title)}</strong><span class="lr-sub">${esc(track.artist)}</span></span>`,'lr-mini-main',`aria-label="Open now playing, ${esc(track.title)}"`)}
      ${circle('toggle-play',state.playing ? 'pause' : 'play',state.playing ? 'Pause' : 'Play')}
    </div>`;
  }
  const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`;
  const durationText = seconds => `${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds % 60)} seconds`;
  const waveform = Array.from({ length: 63 }, (_, i) => Math.max(3, Math.round(
    (7 + 23 * Math.abs(Math.sin(i * 1.18) * Math.cos(i * .27))) * (Math.sin(i * Math.PI / 63) * .69 + .39)
  )));
  function player() {
    const track = currentTrack();
    const liked = state.liked.includes(state.current);
    const destination = state.output === 'phone' ? 'iPhone' : 'Living Room Speaker';
    return `<div class="lr-player-art lr-rings"><span class="lr-eyebrow">33⅓ RPM<br>Side A</span>
      ${sleeve(track.art,state.current === 'moon' ? 'Moonlight · The Sinatra Sessions' : track.artist,state.playing)}</div>
      <div class="lr-song-head"><div><div class="lr-eyebrow">From ${esc(state.source)}</div><h1>${esc(track.title)}</h1><p>${esc(track.artist)}</p></div>
        ${circle('like','heart',liked ? 'Remove from Liked songs' : 'Save to Liked songs','',21,`aria-pressed="${liked}"`)}
      </div>
      <div class="lr-wave">
        ${waveform.map((height,index) => `<i aria-hidden="true" class="${index < state.seconds / track.length * waveform.length ? 'done' : ''}" style="--h:${height}px"></i>`).join('')}
        <input id="lr-seek" class="cursor-interaction" type="range" min="0" max="${track.length}" value="${Math.floor(state.seconds)}" aria-label="Playback position" aria-valuetext="${durationText(state.seconds)}">
      </div>
      <div class="lr-time"><span id="lr-elapsed">${clock(state.seconds)}</span><span>${clock(track.length)}</span></div>
      <div class="lr-transport">
        ${[['previous','skip-back','Previous'],['toggle-play',state.playing?'pause':'play',state.playing?'Pause':'Play'],['next','skip-forward','Next']].map(([key,icon,label],index) =>
          action(key,`<span class="lr-circle ${index === 1 ? 'lr-primary' : ''}">${ico(icon,index === 1 ? 32 : 22)}</span>${label}`)
        ).join('')}
      </div>
      ${action('output',`${ico('airplay',21)}<span><strong>${state.playing ? 'Playing on ' + destination : 'Audio output: ' + destination}</strong><span class="lr-sub">${state.paired ? 'MusicTag controls connected' : 'MusicTag controls available after setup'}</span></span>${ico('chevron-right',19)}`,'lr-output')}
      <div class="lr-previewline">Synthesised audio preview</div>`;
  }
  function updateProgress() {
    const range = screen.querySelector('#lr-seek');
    if (!range) return;
    range.value = Math.floor(state.seconds);
    range.setAttribute('aria-valuetext',durationText(state.seconds));
    screen.querySelector('#lr-elapsed').textContent = clock(state.seconds);
    screen.querySelectorAll('.lr-wave i').forEach((bar,index) =>
      bar.classList.toggle('done',index < state.seconds / currentTrack().length * waveform.length));
  }
  function changeLike() {
    const id = state.current;
    const before = [...state.liked];
    const remove = before.includes(id);
    state.liked = remove ? before.filter(value => value !== id) : [...before,id];
    preserveFocus(render);
    if (state.sheet) renderSheet();
    showToast(remove ? 'Removed from Liked songs' : 'Saved to Liked songs',() => {
      state.liked = before;
      syncStorage();
      preserveFocus(render);
      if (state.sheet) renderSheet();
      showToast('Change undone');
    });
  }

  function preferences() {
    return `${lead('Listening<br>preferences','Make the screen comfortable for you.')}
      ${section('Display')}${rows(
        row(':case-sensitive','Text size',state.size,'text-size'),
        row(':sliders-horizontal','Reduce motion',state.reduce ? 'On' : 'Off','reduce-motion',state.reduce ? 'check' : 'chevron-right',`role="switch" aria-checked="${state.reduce}" aria-label="Reduce motion"`)
      )}
      ${section('Search and help')}${rows(
        row(':globe','Voice search language',languages.find(item => item.key === state.language).label,'language'),
        row(':radio-receiver','MusicTag button guide','See what each button does','tag-guide')
      )}
      ${note('<strong>Your library stays the same</strong><br>These preferences don’t change your playlists or saved songs.')}`;
  }

  function tagArt(label = '', icon = '') {
    return `<div class="lr-object lr-rings">${image('tag','Pearl-white MusicTag with a blue centre button')}${label ? pill(label,icon) : ''}</div>`;
  }
  function tagPage() {
    if (!state.paired) return `${lead('MusicTag','A small remote for everyday listening.')}${tagArt('Not connected','bluetooth')}
      ${note('Play, pause, skip and change the volume using the remote.','radio-receiver')}`;
    return `${lead('MusicTag','Your remote is ready to use.')}${tagArt('Connected','check')}
      <div class="lr-connected">${rows(
        row(':radio-receiver','Mary’s MusicTag','Battery 84% · Connected','tag-settings','check'),
        row(':info','Button guide','Play, pause, skip and volume','tag-guide')
      )}</div>
      ${note('<strong>Choosing a playlist?</strong><br>Open Library on your iPhone.')}`;
  }
  function tagSetup(page) {
    if (page === 'tag-ready') return `${lead('Get your<br>MusicTag ready','Place it beside your iPhone.','Step 1 of 2')}
      ${tagArt(state.scanning ? 'Looking nearby…' : 'Keep within reach','bluetooth')}
      ${note('<strong>Before you start</strong><br>Bluetooth must be on to find your MusicTag.')}
      <div class="lr-actions">${button('bluetooth',state.bluetooth ? 'Bluetooth is on' : 'Turn on Bluetooth',state.bluetooth ? 'bluetooth-connected' : 'bluetooth-off',false,`aria-pressed="${state.bluetooth}"`)}</div>`;
    if (page === 'tag-found') return `${lead('MusicTag found','This is the remote next to your iPhone.','Step 2 of 2')}
      ${tagArt(state.connecting ? 'Connecting…' : 'MusicTag nearby','bluetooth')}
      ${note('<strong>Keep it nearby</strong><br>Leave MusicTag next to your iPhone while it connects.')}`;
    const success = page === 'tag-success';
    return `${tagArt(success ? 'Ready to use' : 'Not connected',success ? 'check' : 'info')}
      <div class="lr-lead lr-center lr-connected"><h1>${success ? 'You’re connected.' : 'Couldn’t connect'}</h1>
      <p>${success ? 'Use MusicTag to control what’s playing on your iPhone.' : 'Keep MusicTag close and check that Bluetooth is on.'}</p></div>
      ${note(success ? 'Choose music on your iPhone, then use MusicTag to play, pause or skip.' : 'You can still listen and control music on your iPhone.','radio-receiver')}`;
  }
  const guideItems = [
    ['play','1. Play or pause','Press the large centre button.','pause'],
    ['skip','2. Skip a song','Use the left or right top button.','skip-forward'],
    ['volume','3. Change volume','Press + or − on the side.','volume-2']
  ];
  function guide() {
    const current = guideItems.find(([key]) => key === state.guideMode);
    const controls = state.guideMode === 'play' ?
      circle('remote-play',state.playing ? 'pause' : 'play',state.playing ? 'Pause with MusicTag' : 'Play with MusicTag','lr-primary') :
      state.guideMode === 'skip' ?
        circle('remote-previous','skip-back','Previous with MusicTag') + circle('remote-next','skip-forward','Next with MusicTag') :
        circle('volume-down','minus','Volume down') + circle('volume-up','plus','Volume up');
    return `${lead('Button guide','Feel for the large blue button in the centre.')}
      <div class="lr-object lr-rings lr-guide-art">${image('tag','MusicTag control positions')}
        ${guideItems.map(([key,title], index) => action(`guide-${key}`,`<span>${index+1}</span>`,'lr-dot',`aria-label="${esc(title)}" aria-pressed="${state.guideMode === key}"`)).join('')}
      </div>
      <div class="lr-connected">${rows(...guideItems.map(([key,title,sub,icon]) =>
        row(':' + icon,title,sub,`guide-row:${key}`,state.guideMode === key ? 'check' : 'chevron-right',`aria-pressed="${state.guideMode === key}"`)))}</div>
      <div class="lr-practice lr-glass">
        <h2>Try the controls</h2><span class="lr-sub">${esc(current[2])}</span><div class="lr-practice-buttons">${controls}</div>
        <div class="lr-practice-readout lr-sub" aria-live="polite">${esc(state.playing ? 'Playing ' + currentTrack().title : 'Paused · ' + currentTrack().title)} · Volume ${state.volume}%</div>
      </div>
      ${note('Choose playlists on your iPhone.')}`;
  }

  function openSheet(name, origin) {
    if (!state.sheet) state.modalFrom = origin?.dataset.key || document.activeElement?.dataset.key;
    state.sheet = name;
    hideToast();
    renderSheet(true);
  }
  function closeSheet(restore = true) {
    const key = state.modalFrom;
    state.sheet = '';
    state.modalFrom = null;
    overlay.replaceChildren();
    device.inert = false;
    if (restore) focusKey(key);
  }
  function renderSheet(focus = false) {
    const focusedKey = overlay.contains(document.activeElement) ? document.activeElement.dataset.key : '';
    const renderers = {
      output: () => ['Audio output','Choose where the sound plays.', rows(
        row(':smartphone','This iPhone',state.output === 'phone' ? 'Current output' : 'Available nearby','output:phone',state.output === 'phone' ? 'check' : 'chevron-right',`aria-pressed="${state.output === 'phone'}"`),
        row(':speaker','Living Room Speaker',state.output === 'speaker' ? 'Current output' : 'Available nearby','output:speaker',state.output === 'speaker' ? 'check' : 'chevron-right',`aria-pressed="${state.output === 'speaker'}"`)
      ) + note('MusicTag controls playback. It does not play sound.','radio-receiver')],
      'player-options': () => ['Playback options','', rows(
        row(':heart',state.liked.includes(state.current) ? 'Remove from Liked songs' : 'Save to Liked songs','','like'),
        row(':volume-2','Audio output','','output'),
        row(':sliders-horizontal','Listening preferences','','preferences')
      )],
      'playlist-options': () => [lists[state.playlist].title,'', rows(
        listTracks(state.playlist).length ? row(':play','Play playlist','','play-list') : '',
        row(':library-big','Return to Library','','tab:library')
      )],
      'text-size': () => ['Text size','Choose a comfortable reading size.',rows(...['Standard','Large','Extra large'].map((size,index) =>
        row(':case-sensitive',size,'',`size:${index}`,state.size === size ? 'check' : 'chevron-right',`aria-pressed="${state.size === size}"`)))],
      language: () => ['Voice search language','Choose your preferred recognition language. Examples use English titles in this demo.',rows(...languages.map(({key,label}) =>
        row(':globe',label,'',`language:${key}`,state.language === key ? 'check' : 'chevron-right',`aria-pressed="${state.language === key}"`)))],
      share: () => ['Share invitation','Choose what your guest can do. This invitation is a demo.',
        rows(...['Can add songs','Can listen'].map((role,index) => row(index ? ':headphones' : ':music-2',role,'',`invite-role:${index}`,
          state.inviteRole === role ? 'check' : 'chevron-right',`aria-pressed="${state.inviteRole === role}"`))),
        actions(button('send-invite','Invite Alex','send',true),button('copy','Copy invitation link','link-2'),button('close-sheet','Cancel'))],
      'copy-link': () => ['Invitation link','Select the demo link and copy it.',
        `<label for="lr-invite-link" class="lr-sub">Demo invitation link</label><input id="lr-invite-link" type="url" readonly value="${inviteLink()}">`],
      'family-add': () => {
        const available = Object.keys(tracks).filter(id => !state.familySongs.includes(id));
        return ['Add to Family playlist','Choose a song to add to the shared playlist.',
          available.length ? rows(...available.map(id => trackRow(id,'add-song'))) : note('All demo songs have been added.')];
      },
      'tag-info': () => ['About MusicTag','Use this remote to play, pause, skip and adjust the volume.',
        note('Choose playlists on your iPhone. MusicTag controls what’s already playing.','radio-receiver'),
        actions(button('tag-guide','See button guide','chevron-right',true),button('close-sheet','Done'))],
      'tag-settings': () => ['Mary’s MusicTag','Battery 84% · Connected',rows(
        row(':info','Button guide','','tag-guide'),
        row(':bluetooth-off','Disconnect MusicTag','You can pair again at any time.','tag-disconnect')
      )],
      'tag-disconnect': () => ['Disconnect MusicTag?','Playback on your iPhone can continue. You can pair the remote again anytime.',
        '',actions(button('do-disconnect','Disconnect MusicTag','bluetooth-off',true),button('close-sheet','Keep connected'))]
    };
    const make = renderers[state.sheet];
    if (!make) return;
    const [title,desc,body,buttons] = make();
    overlay.innerHTML = `<div class="lr-shade"><div class="lr-sheet" role="dialog" aria-modal="true" aria-labelledby="lr-sheet-title">
      <h2 id="lr-sheet-title">${esc(title)}</h2>${desc ? `<p>${esc(desc)}</p>` : ''}${body}
      ${buttons || actions(button('close-sheet','Done','check',true))}
    </div></div>`;
    device.inert = true;
    icons();
    if (focusedKey) focusKey(focusedKey, overlay);
    if (focus || !overlay.contains(document.activeElement)) {
      const target = state.sheet === 'copy-link' ? overlay.querySelector('input') : overlay.querySelector('button');
      target?.focus({ preventScroll: true });
      if (state.sheet === 'copy-link') target?.select();
    }
  }
  const inviteLink = () => `https://musictag.example/invite/family?access=${state.inviteRole === 'Can listen' ? 'listen' : 'contribute'}`;
  async function copyInvite() {
    const url = inviteLink();
    try {
      if (!navigator.clipboard?.writeText || document.permissionsPolicy?.allowsFeature('clipboard-write') === false ||
          document.featurePolicy?.allowsFeature('clipboard-write') === false) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(url);
      showToast('Demo invitation link copied');
    } catch {
      openSheet('copy-link');
    }
  }
  function sendInvite() {
    state.sent = true;
    syncStorage();
    closeSheet(false);
    render();
    focusKey('share');
    showToast('Demo invitation sent to Alex');
  }

  const routes = {
    welcome, home, library, playlist, invite, search, offline,
    voice: () => voice(false), 'voice-retry': () => voice(true),
    player, preferences, tag: tagPage,
    'tag-ready': () => tagSetup('tag-ready'),
    'tag-found': () => tagSetup('tag-found'),
    'tag-success': () => tagSetup('tag-success'),
    'tag-fail': () => tagSetup('tag-fail'),
    'tag-guide': guide
  };
  function render(reset = false) {
    const page = now();
    const scrollTop = reset ? 0 : screen.scrollTop;
    phone.dataset.tone = page === 'player' ? 'night' : [
      'welcome','invite','voice','voice-retry','preferences','tag-ready','tag-found','tag-success','tag-fail','tag-guide'
    ].includes(page) ? 'pearl' : 'day';
    phone.dataset.size = state.size;
    phone.dataset.motion = state.reduce ? 'reduced' : 'full';
    renderHeader(page);
    screen.innerHTML = routes[page]();
    if (page === 'search') renderSearch();
    renderFooter(page);
    screen.scrollTop = scrollTop;
    icons();
  }

  let audio = null;
  let loudness = null;
  let audioRun = null;
  let playbackEpoch = 0;
  let playbackTimer = null;
  const Audio = window.AudioContext || window.webkitAudioContext;
  const arrangements = {
    moon: [0,3,7,10,7,5,2,7], bloom: [0,2,4,9,7,4,2,7], coast: [0,4,7,9,11,7,5,2],
    jazz: [0,5,9,12,11,7,5,9], train: [0,7,4,9,12,9,7,4], singer: [0,2,7,9,5,4,2,5],
    honey: [0,4,7,11,9,7,4,2], goodbye: [0,3,7,12,10,7,3,2], radio: [0,3,7,12,10,8,7,3]
  };
  function stopAudio() {
    if (!audioRun) return;
    audioRun.gain.setTargetAtTime(0,audio.currentTime,.035);
    const old = audioRun;
    audioRun = null;
    setTimeout(() => old.disconnect(),240);
  }
  function soundGain() {
    const level = .19 * Math.pow(state.volume / 100,1.5);
    loudness?.gain.setTargetAtTime(level,audio.currentTime,.06);
  }
  function scheduleAudio() {
    if (!audio || audio.state !== 'running' || !state.playing || !audioRun) return;
    const step = .28;
    while (audioRun.until < audio.currentTime + .85) {
      const index = audioRun.index++;
      const phrase = arrangements[state.current];
      const tonic = currentTrack().key;
      const start = audioRun.until;
      for (const [note,shape,peak,end] of [
        [tonic + 12 + phrase[index % phrase.length],'triangle',.18,.41],
        ...(index % 4 === 0 ? [[tonic - 12 + (index % 8 ? 7 : 0),'sine',.17,.85]] : [])
      ]) {
        const tone = audio.createOscillator();
        const envelope = audio.createGain();
        tone.type = shape;
        tone.frequency.value = 440 * Math.pow(2,(note - 69)/12);
        envelope.gain.setValueAtTime(.0001,start);
        envelope.gain.exponentialRampToValueAtTime(peak,start + .027);
        envelope.gain.exponentialRampToValueAtTime(.0001,start + end);
        tone.connect(envelope).connect(audioRun);
        tone.start(start);
        tone.stop(start + end + .015);
      }
      audioRun.until += step;
    }
  }
  function startAudio() {
    if (!Audio) return;
    try {
      if (!audio) {
        audio = new Audio();
        loudness = audio.createGain();
        loudness.gain.value = 0;
        loudness.connect(audio.destination);
      }
      soundGain();
      stopAudio();
      const run = audio.createGain();
      run.connect(loudness);
      audioRun = run;
      const start = () => {
        if (audioRun !== run || !state.playing) return;
        run.until = audio.currentTime + .025;
        run.index = Math.floor(state.seconds / .28);
        scheduleAudio();
      };
      if (audio.state === 'running') start();
      else audio.resume().then(start).catch(() => {});
    } catch { /* The transport stays usable when audio is unavailable. */ }
  }
  function beginPlayback() {
    state.started = true;
    state.playing = true;
    startAudio();
    playbackEpoch = performance.now();
    clearInterval(playbackTimer);
    playbackTimer = setInterval(() => {
      if (!root.isConnected) { pausePlayback(); return; }
      const now = performance.now();
      state.seconds += (now - playbackEpoch) / 1000;
      playbackEpoch = now;
      if (state.seconds >= currentTrack().length) {
        const index = state.queue.indexOf(state.current);
        if (index < state.queue.length - 1) moveTrack(1);
        else {
          state.seconds = currentTrack().length;
          pausePlayback();
          preserveFocus(render);
        }
      } else {
        updateProgress();
        if (audioRun?.until < audio.currentTime - .7) {
          audioRun.until = audio.currentTime + .025;
          audioRun.index = Math.floor(state.seconds / .28);
        }
        scheduleAudio();
      }
    },250);
  }
  function pausePlayback() {
    state.playing = false;
    clearInterval(playbackTimer);
    stopAudio();
  }
  function togglePlayback() {
    if (state.playing) pausePlayback();
    else {
      if (state.seconds >= currentTrack().length) state.seconds = 0;
      beginPlayback();
    }
    preserveFocus(render);
  }
  function playTrack(id, queue, source) {
    state.current = id;
    state.queue = [...queue];
    state.source = source;
    state.seconds = 0;
    beginPlayback();
    route('player');
  }
  function moveTrack(offset) {
    const index = state.queue.indexOf(state.current);
    state.current = state.queue[(index + offset + state.queue.length) % state.queue.length];
    state.seconds = 0;
    playbackEpoch = performance.now();
    if (state.playing) startAudio();
    preserveFocus(render);
  }
  function seek(seconds) {
    state.seconds = Math.max(0,Math.min(currentTrack().length,seconds));
    playbackEpoch = performance.now();
    if (state.playing) startAudio();
    updateProgress();
  }
  function volume(offset) {
    state.volume = Math.max(0, Math.min(100,state.volume + offset));
    soundGain();
    preserveFocus(render);
    syncStorage();
  }

  let tagTimer;
  function cancelTagRequest() {
    clearTimeout(tagTimer);
    state.scanning = false;
    state.connecting = false;
  }
  function tagLater() {
    cancelTagRequest();
    state.failTag = false;
    if (state.path.includes('tag')) {
      state.path = state.path.slice(0,state.path.indexOf('tag') + 1);
      render(true);
      focusKey('tab:tag');
    } else tab('tag');
  }
  function scan() {
    if (!state.bluetooth) {
      route('tag-fail',{ replace: true });
      return;
    }
    state.scanning = true;
    render();
    tagTimer = setTimeout(() => {
      if (!state.scanning || now() !== 'tag-ready') return;
      state.scanning = false;
      route('tag-found');
    },660);
  }
  function connect() {
    state.connecting = true;
    render();
    tagTimer = setTimeout(() => {
      if (!state.connecting || now() !== 'tag-found') return;
      state.connecting = false;
      if (state.failTag || !state.bluetooth) {
        state.failTag = false;
        route('tag-fail',{ replace: true });
      } else {
        state.paired = true;
        syncStorage();
        state.path = ['tag'];
        route('tag-success');
      }
    },850);
  }
  function tagRetry() {
    state.path = ['tag'];
    route('tag-ready');
  }
  function openList(id) {
    state.playlist = id;
    if (now() === 'playlist') render(true);
    else route('playlist');
  }
  function selectableTrack(id) {
    if (now() === 'playlist') {
      playTrack(id,listTracks(state.playlist),lists[state.playlist].title);
      return;
    }
    const songs = matches().songs;
    rememberQuery(state.query);
    playTrack(id,songs.length ? songs : [id],'Search');
  }
  function addSong(id) {
    if (state.familySongs.includes(id)) return;
    state.familySongs.push(id);
    syncStorage();
    closeSheet(false);
    render();
    focusKey('family-add');
    showToast(`Added ${tracks[id].title}`,() => {
      state.familySongs = state.familySongs.filter(song => song !== id);
      syncStorage();
      render();
      focusKey('family-add');
    });
  }
  function scenario(name) {
    if (name === 'find') {
      state.online = true;
      state.query = '';
      state.searchType = 'all';
      tab('search');
      screen.querySelector('#lr-input')?.focus({ preventScroll: true });
    } else if (name === 'family') {
      state.playlist = 'family';
      state.path = ['library','playlist'];
      route('invite');
      focusKey('share');
    } else if (name === 'voice') {
      state.online = true;
      state.failVoice = true;
      state.path = ['search'];
      route('voice');
      focusKey('voice-example');
    } else if (name === 'offline') {
      state.online = false;
      tab('offline');
      focusKey('online-retry');
    } else {
      state.bluetooth = true;
      state.paired = false;
      state.failTag = true;
      cancelTagRequest();
      state.path = ['tag'];
      route('tag-ready');
      focusKey('tag-scan');
    }
    phone.scrollIntoView({ block: 'nearest' });
  }

  const dispatch = {
    start: () => tab('home'),
    back,
    'guide-done': () => state.path.at(-2) === 'tag-success' ? tab('tag') : back(),
    'tag-later': tagLater,
    tab,
    list: openList,
    play: selectableTrack,
    'add-song': addSong,
    'play-list': () => {
      const queue = listTracks(state.playlist);
      if (queue.length) playTrack(queue[0],queue,lists[state.playlist].title);
    },
    invite: () => route('invite'),
    copy: copyInvite,
    'send-invite': sendInvite,
    'invite-role': index => {
      state.inviteRole = ['Can add songs','Can listen'][index];
      renderSheet();
    },
    preferences: () => route('preferences'),
    'reduce-motion': () => {
      state.reduce = !state.reduce;
      preserveFocus(render);
      syncStorage();
    },
    size: index => {
      state.size = ['Standard','Large','Extra large'][index];
      render();
      renderSheet();
      syncStorage();
    },
    'close-sheet': () => closeSheet(),
    'search-submit': () => {
      if (!state.query.trim()) screen.querySelector('#lr-input')?.focus();
      else {
        rememberQuery(state.query);
        setQuery(state.query);
        focusKey('filter:all');
      }
    },
    'clear-search': () => setQuery('',true),
    recent: index => {
      const [query,label] = state.recents[index];
      rememberQuery(query,label);
      setQuery(query);
      focusKey('filter:all');
    },
    artist: index => {
      const name = matches().artists[index];
      rememberQuery(name,'Artist');
      setQuery(name);
      state.searchType = 'songs';
      renderSearch();
      focusKey('filter:songs');
    },
    filter: type => {
      state.searchType = type;
      preserveFocus(renderSearch);
    },
    'voice-start': () => {
      state.failVoice = false;
      route(state.online ? 'voice' : 'offline');
    },
    'voice-example': simulateVoice,
    'stop-voice': () => {
      state.failVoice = false;
      route('voice-retry',{ replace: true });
    },
    'voice-restart': () => route('voice',{ replace: true }),
    'type-instead': typeInstead,
    'online-retry': () => {
      state.online = true;
      tab('search');
      showToast('Back online');
    },
    resume: () => {
      if (!state.playing) {
        if (state.seconds >= currentTrack().length) state.seconds = 0;
        beginPlayback();
      }
      route('player');
    },
    'open-player': () => route('player'),
    'toggle-play': togglePlayback,
    previous: () => moveTrack(-1),
    next: () => moveTrack(1),
    like: () => { changeLike(); syncStorage(); },
    output: key => {
      state.output = key;
      render();
      renderSheet();
      syncStorage();
    },
    language: key => {
      state.language = key;
      render();
      renderSheet();
      syncStorage();
    },
    'tag-start': () => {
      state.failTag = false;
      route('tag-ready');
    },
    'tag-scan': scan,
    'tag-connect': connect,
    'tag-retry': tagRetry,
    bluetooth: () => {
      state.bluetooth = !state.bluetooth;
      if (!state.bluetooth) cancelTagRequest();
      preserveFocus(render);
      showToast(state.bluetooth ? 'Bluetooth is on' : 'Bluetooth is off');
    },
    'do-disconnect': () => {
      state.paired = false;
      closeSheet(false);
      render();
      focusKey('tag-start');
      syncStorage();
      showToast('MusicTag disconnected');
    },
    'tag-guide': () => {
      state.guideMode = 'play';
      route('tag-guide');
    },
    'guide-row': mode => {
      state.guideMode = mode;
      preserveFocus(render);
      screen.querySelector('.lr-practice')?.scrollIntoView({block:'nearest'});
    },
    'guide-play': () => dispatch['guide-row']('play'),
    'guide-skip': () => dispatch['guide-row']('skip'),
    'guide-volume': () => dispatch['guide-row']('volume'),
    'remote-play': togglePlayback,
    'remote-previous': () => moveTrack(-1),
    'remote-next': () => moveTrack(1),
    'volume-down': () => volume(-10),
    'volume-up': () => volume(10),
    'case-find': () => scenario('find'),
    'case-family': () => scenario('family'),
    'reset-demo': () => {
      pausePlayback();
      cancelTagRequest();
      if (state.sheet) closeSheet(false);
      Object.assign(state,defaultState());
      syncStorage();
      route('welcome',{ reset: true });
      phone.scrollIntoView({ block: 'nearest' });
    },
    'case-voice': () => scenario('voice'),
    'case-offline': () => scenario('offline'),
    'case-tag': () => scenario('tag')
  };
  const sheetNames = new Set(['output','player-options','playlist-options','text-size','language','share','family-add','tag-info','tag-settings','tag-disconnect']);
  root.addEventListener('click',event => {
    if (event.target.classList.contains('lr-shade')) { closeSheet(); return; }
    const control = event.target.closest('button[data-key]');
    if (!control || control.disabled) return;
    const [key,arg] = control.dataset.key.split(':');
    if (arg === undefined && sheetNames.has(key)) openSheet(key,control);
    else if (key === 'type-instead') typeInstead(control.textContent.trim() === 'Type instead');
    else dispatch[key]?.(arg);
  });
  root.addEventListener('input',event => {
    if (event.target.id === 'lr-input') {
      state.query = event.target.value;
      state.searchType = 'all';
      renderSearch();
    }
    if (event.target.id === 'lr-seek') seek(event.target.valueAsNumber);
  });
  root.addEventListener('submit',event => {
    if (event.target.id === 'lr-search-form') {
      event.preventDefault();
      dispatch['search-submit']();
    }
  });
  root.addEventListener('keydown',event => {
    if (event.key === 'Escape') {
      if (state.sheet || state.path.length > 1) {
        event.preventDefault();
        if (state.sheet) closeSheet();
        else dispatch.back();
      }
    }
    if (event.key === 'Tab' && state.sheet) {
      const focusable = [...overlay.querySelectorAll('button:not(:disabled),input')];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  document.addEventListener('musictag:pause',()=>{if(state.playing){pausePlayback();preserveFocus(render)}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.playing){pausePlayback();preserveFocus(render)}});
  const savedFields = ['liked','familySongs','sent','inviteRole','size','reduce','language','paired','output','volume'];
  function syncStorage() {
    try {
      localStorage.setItem('musictag-v1', JSON.stringify(Object.fromEntries(savedFields.map(key => [key,state[key]]))));
    } catch { /* The prototype works in memory when web storage is inaccessible. */ }
  }
  try {
    const saved = JSON.parse(localStorage.getItem('musictag-v1')) || {};
    for (const key of savedFields) {
      if (typeof saved[key] === typeof state[key]) state[key] = saved[key];
    }
  } catch { /* Use the demo defaults when stored state cannot be read. */ }
  scenarios.innerHTML = quickCases.map(([key,label]) =>
    action(key,`<span>${esc(label)}</span><span aria-hidden="true">↗</span>`,'lr-scenario')
  ).join('');
  render(true);
  const cases = ['find','family','voice','offline','tag'];
  const initialCase = new URLSearchParams(location.search).get('scenario');
  if (cases.includes(initialCase)) scenario(initialCase);
})();
