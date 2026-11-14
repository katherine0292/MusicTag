// Shared framing for the two same-origin, live portfolio demonstrations.
(() => {
  const embedded = new URLSearchParams(location.search).get('embed') === '1';
  if (!embedded) return;
  document.documentElement.classList.add('embedded');
  const style = document.createElement('style');
  style.textContent = `html.embedded{color-scheme:light}html.embedded body{background:transparent;margin:0;padding:0}
    .embedded .site-header,.embedded .page-intro,.embedded .study-section{display:none}
    .embedded main.wrap{max-width:none;padding:0;margin:0}
    .embedded #listening-room-prototype{padding:16px 12px}
    .embedded .lr-editorial h2{font-size:48px}
    .embedded .lr-stage{gap:32px}
    .embedded .concept-stage{border-radius:0;background:transparent}
    @media(max-width:650px){.embedded .lr-panel{margin:0 12px}.embedded .lr-phone{grid-row:2}.embedded .lr-editorial{display:none}.embedded .lr-scenarios h3{display:none}.embedded .lr-edition{margin-bottom:12px}.embedded .lr-scenario{min-height:44px}.embedded .lr-footnote{margin-bottom:10px}}
  `;
  document.head.append(style);
  const report = () => parent.postMessage({type:'musictag:height',height:Math.ceil(document.body.scrollHeight)},location.origin);
  const observe = () => { new ResizeObserver(report).observe(document.body); report(); };
  if (document.body) observe();
  else addEventListener('DOMContentLoaded',observe,{once:true});
  addEventListener('load',report);
  addEventListener('message',event => {
    if (event.origin !== location.origin || event.source !== parent) return;
    if (event.data?.type === 'musictag:pause') document.dispatchEvent(new Event('musictag:pause'));
  });
})();
