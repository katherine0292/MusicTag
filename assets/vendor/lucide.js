/** Lucide v1.17.0, ISC and MIT. See lucide-license.txt. */
(() => {
  'use strict';
  const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  const createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children?.length) {
      children.forEach((child) => {
        const childElement = createSVGElement(child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  const createElement = (iconNode, customAttrs = {}) => {
    const tag = "svg";
    const attrs = {
      ...defaultAttributes,
      ...customAttrs
    };
    return createSVGElement([tag, attrs, iconNode]);
  };

  const icons = {
    Airplay: [["path",{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}],["path",{"d":"m12 15 5 6H7Z"}]],
    ArrowUpRight: [["path",{"d":"M7 7h10v10"}],["path",{"d":"M7 17 17 7"}]],
    Bluetooth: [["path",{"d":"m7 7 10 10-5 5V2l5 5L7 17"}]],
    BluetoothConnected: [["path",{"d":"m7 7 10 10-5 5V2l5 5L7 17"}],["line",{"x1":"18","x2":"21","y1":"12","y2":"12"}],["line",{"x1":"3","x2":"6","y1":"12","y2":"12"}]],
    BluetoothOff: [["path",{"d":"m17 17-5 5V12l-5 5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M14.5 9.5 17 7l-5-5v4.5"}]],
    CaseSensitive: [["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M22 9v7"}],["path",{"d":"M3.304 13h6.392"}],["circle",{"cx":"18.5","cy":"12.5","r":"3.5"}]],
    Check: [["path",{"d":"M20 6 9 17l-5-5"}]],
    ChevronDown: [["path",{"d":"m6 9 6 6 6-6"}]],
    ChevronLeft: [["path",{"d":"m15 18-6-6 6-6"}]],
    ChevronRight: [["path",{"d":"m9 18 6-6-6-6"}]],
    Clock3: [["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6h4"}]],
    Ellipsis: [["circle",{"cx":"12","cy":"12","r":"1"}],["circle",{"cx":"19","cy":"12","r":"1"}],["circle",{"cx":"5","cy":"12","r":"1"}]],
    Globe: [["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{"d":"M2 12h20"}]],
    Headphones: [["path",{"d":"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]],
    Heart: [["path",{"d":"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]],
    House: [["path",{"d":"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]],
    Info: [["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 16v-4"}],["path",{"d":"M12 8h.01"}]],
    Keyboard: [["path",{"d":"M10 8h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M14 8h.01"}],["path",{"d":"M16 12h.01"}],["path",{"d":"M18 8h.01"}],["path",{"d":"M6 8h.01"}],["path",{"d":"M7 16h10"}],["path",{"d":"M8 12h.01"}],["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}]],
    LibraryBig: [["rect",{"width":"8","height":"18","x":"3","y":"3","rx":"1"}],["path",{"d":"M7 3v18"}],["path",{"d":"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"}]],
    Link2: [["path",{"d":"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{"d":"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}]],
    Mic: [["path",{"d":"M12 19v3"}],["path",{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}],["rect",{"x":"9","y":"2","width":"6","height":"13","rx":"3"}]],
    MicOff: [["path",{"d":"M12 19v3"}],["path",{"d":"M15 9.34V5a3 3 0 0 0-5.68-1.33"}],["path",{"d":"M16.95 16.95A7 7 0 0 1 5 12v-2"}],["path",{"d":"M18.89 13.23A7 7 0 0 0 19 12v-2"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M9 9v3a3 3 0 0 0 5.12 2.12"}]],
    Minus: [["path",{"d":"M5 12h14"}]],
    Music2: [["circle",{"cx":"8","cy":"18","r":"4"}],["path",{"d":"M12 18V2l7 4"}]],
    Pause: [["rect",{"x":"14","y":"3","width":"5","height":"18","rx":"1"}],["rect",{"x":"5","y":"3","width":"5","height":"18","rx":"1"}]],
    Play: [["path",{"d":"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]],
    Plus: [["path",{"d":"M5 12h14"}],["path",{"d":"M12 5v14"}]],
    RadioReceiver: [["path",{"d":"M5 16v2"}],["path",{"d":"M19 16v2"}],["rect",{"width":"20","height":"8","x":"2","y":"8","rx":"2"}],["path",{"d":"M18 12h.01"}]],
    Search: [["path",{"d":"m21 21-4.34-4.34"}],["circle",{"cx":"11","cy":"11","r":"8"}]],
    Send: [["path",{"d":"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{"d":"m21.854 2.147-10.94 10.939"}]],
    Share: [["path",{"d":"M12 2v13"}],["path",{"d":"m16 6-4-4-4 4"}],["path",{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}]],
    SkipBack: [["path",{"d":"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"}],["path",{"d":"M3 20V4"}]],
    SkipForward: [["path",{"d":"M21 4v16"}],["path",{"d":"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]],
    SlidersHorizontal: [["path",{"d":"M10 5H3"}],["path",{"d":"M12 19H3"}],["path",{"d":"M14 3v4"}],["path",{"d":"M16 17v4"}],["path",{"d":"M21 12h-9"}],["path",{"d":"M21 19h-5"}],["path",{"d":"M21 5h-7"}],["path",{"d":"M8 10v4"}],["path",{"d":"M8 12H3"}]],
    Smartphone: [["rect",{"width":"14","height":"20","x":"5","y":"2","rx":"2","ry":"2"}],["path",{"d":"M12 18h.01"}]],
    Speaker: [["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["path",{"d":"M12 6h.01"}],["circle",{"cx":"12","cy":"14","r":"4"}],["path",{"d":"M12 14h.01"}]],
    UserRound: [["circle",{"cx":"12","cy":"8","r":"5"}],["path",{"d":"M20 21a8 8 0 0 0-16 0"}]],
    UsersRound: [["path",{"d":"M18 21a8 8 0 0 0-16 0"}],["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"}]],
    Volume2: [["path",{"d":"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{"d":"M16 9a5 5 0 0 1 0 6"}],["path",{"d":"M19.364 18.364a9 9 0 0 0 0-12.728"}]],
    X: [["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]]
  };
  globalThis.lucide = { createElement, icons };
})();
