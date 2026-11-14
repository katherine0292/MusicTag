"""Check local links and media in the static portfolio and its Markdown documentation."""
from pathlib import Path
from html.parser import HTMLParser
import re,json,urllib.parse
ROOT=Path(__file__).resolve().parents[1]
errors=[]
def check(file,target):
 target=urllib.parse.unquote(target.strip().split('#')[0].split('?')[0])
 if not target or target.startswith(('http:','https:','data:','mailto:','javascript:')):return
 dest=(ROOT/target.lstrip('/')) if target.startswith('/') else file.parent/target
 if not dest.exists():errors.append({'file':str(file.relative_to(ROOT)),'target':target})
class Links(HTMLParser):
 def __init__(self,file):super().__init__();self.file=file
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for key in ('src','href','poster'):
   if key in a:check(self.file,a[key])
for f in [ROOT/'index.html',ROOT/'prototype/index.html',ROOT/'early-concept/index.html',ROOT/'gallery/index.html']:
 parser=Links(f);parser.feed(f.read_text())
for f in [ROOT/'README.md',*list((ROOT/'docs').glob('*.md'))]:
 s=f.read_text()
 for target in re.findall(r'!?\[[^\]]*\]\(([^)\s]+)\)',s):check(f,target)
 for target in re.findall(r'(?:src|href)="([^"]+)"',s):check(f,target)
result={'checked':'Final local HTML, README and docs links','errors':errors}
(ROOT/'review/local-links.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2));raise SystemExit(bool(errors))
