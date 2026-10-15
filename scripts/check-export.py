from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path('out')
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=set();self.links=[];self.h1=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='h1':self.h1+=1
pages={p:Page(p.read_text()) for p in root.rglob('*.html') if p.name not in ('404.html','_not-found.html')}
errors=[];links=0
for path,page in pages.items():
 if page.h1!=1:errors.append(f'{path}: {page.h1} h1 headings')
 for href in page.links:
  url=urlsplit(href)
  if url.scheme or url.netloc:continue
  target=path if not url.path else root/(unquote(url.path).lstrip('/') or 'index.html')
  if not target.suffix:target=target.with_suffix('.html')
  if not target.exists():errors.append(f'{path}: missing {href}')
  elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:errors.append(f'{path}: missing anchor {href}')
  links+=1
print(f'{len(pages)} pages, {links} internal links checked')
if errors:print('\n'.join(errors));raise SystemExit(1)
print('PASS: all internal routes and anchors resolve; one h1 per page')
