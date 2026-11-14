# -*- coding: utf-8 -*-
"""Build ../index.html from template.html + copy_data.py + base.css (the CircleU page style) + edit_block.html.
Usage: python3 build.py   (run inside src/)"""
import re, json, sys, os
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
from copy_data import C

edit_block = os.path.join(here, 'edit_block.html')
out = os.path.join(here, '..', 'index.html')
css = open(os.path.join(here, 'base.css'), encoding='utf-8').read()
css += "\n" + open(os.path.join(here, 'extra.css'), encoding='utf-8').read()

tpl = open(os.path.join(here, 'template.html'), encoding='utf-8').read()
js = open(os.path.join(here, 'main.js'), encoding='utf-8').read()

# every static data-k must exist; every key must be used (carousel keys sc<N>. are built in JS)
used = set(re.findall(r'data-k="([^"$]+)"', tpl))
missing = sorted(k for k in used if k not in C)
dyn = re.compile(r'^sc\d\.')
unused = sorted(k for k in C if k not in used and not re.match(r'^(j\d|s\d\d)$', k) and not k.startswith('nav.') and k not in ('ui.close', 'ui.enlarge', 'ft.copied'))
if missing: print('MISSING', missing); sys.exit(1)
if unused: print('UNUSED', unused)
# keys built in JS: journeys j1-j6 and screen names s01-s24
for k in [f'j{i}' for i in range(1, 7)] + [f's{i:02d}' for i in range(1, 25)]:
    if k not in C: print('MISSING', k); sys.exit(1)

# Keep the initial document readable before JavaScript applies a saved language.
tpl = re.sub(r'(<[^>]+data-k="([^"$]+)"[^>]*>)(</[^>]+>)',
             lambda m: m.group(1) + C[m.group(2)][1] + m.group(3), tpl)
copy_js = 'const COPY=' + json.dumps({k: list(v) for k, v in C.items()}, ensure_ascii=False) + ';\n'
eb = open(edit_block, encoding='utf-8').read().replace("'cu-edits-local'", "'tlr-edits-local'")

head = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<link rel="icon" href="data:,"><style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
        '<title>The Listening Room | UX &amp; Interaction Design by Katherine Lin</title>\n'
        '<meta name="description" content="A music experience for listeners aged 65+: an accessible iPhone app, MusicTag tactile controls, recoverable voice search, and live interactive demonstrations.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;700&display=swap">\n'
        '<style>' + css + '</style>\n</head><body>\n')
html = head + tpl + '\n<script>\n' + copy_js + js + '</script>\n\n' + eb + '\n</body></html>\n'
open(out, 'w', encoding='utf-8').write(html)
print('ok', len(html), 'bytes;', len(C), 'keys')
