from PIL import Image,ImageOps,ImageDraw,ImageFont
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public/images/projects'; OUT.mkdir(parents=True,exist_ok=True)
def fit(im,size): return ImageOps.fit(im.convert('RGB'),size,method=Image.Resampling.LANCZOS)
def font(name,size): return ImageFont.truetype(str(ROOT/'public/fonts'/name),size)
for source,target,width in [('handmade-site.webp','handmade-site.webp',1200),('mira-site.png','mira-site.webp',1200),('orea-site.png','orea-site.webp',821)]:
 im=Image.open(ROOT/'public/images'/source).convert('RGB');im.thumbnail((width,10000),Image.Resampling.LANCZOS);im.save(OUT/target,'WEBP',quality=82,method=6)
names=['hero','linho','madeira','chuva','terra','ritual','architecture','manifesto'];ims={n:Image.open(ROOT/f'public/portfolio/bruma/bruma-{n}.webp').convert('RGB') for n in names}
w,h=1200,6500;page=Image.new('RGB',(w,h),'#ece8df');d=ImageDraw.Draw(page);serif=font('unda-1.ttf',96);sans=font('unda-2.ttf',24);label=font('unda-3.ttf',15)
def txt(x,y,s,f,fill):d.multiline_text((x,y),s,font=f,fill=fill,spacing=8)
def cover(im,box):x,y,bw,bh=box;page.paste(fit(im,(bw,bh)),(x,y))
cover(ims['hero'],(0,0,w,920));d.rectangle((0,0,w,920),fill='#17130f');cover(ims['hero'],(360,0,840,920));d.rectangle((360,0,1200,920),fill=(10,8,6,40));txt(55,48,'BRUMA.',font('unda-3.ttf',30),'#f3ede3');txt(55,310,'A casa também\ntem memória.',serif,'#f3ede3');txt(55,590,'FRAGRÂNCIAS PARA A CASA',label,'#e8c58e');txt(55,640,'Matéria, luz e silêncio para transformar\na atmosfera de um espaço.',sans,'#f3ede3')
txt(55,1040,'FRAGRÂNCIA É ARQUITETURA INVISÍVEL',label,'#756856');txt(55,1120,'Objetos de presença.\nRituais de permanência.',serif,'#342b22');txt(710,1210,'Uma coleção construída a partir de\nmemória, matéria e luz.',sans,'#756856')
base=1500;labels=['LINHO 01','MADEIRA 02','CHUVA 03','TERRA 04'];subs=['limpo · claro · sereno','profundo · quente · tátil','mineral · úmido · silencioso','seco · âmbar · essencial']
for i,n in enumerate(names[1:5]):
 x=55+(i%2)*570;y=base+(i//2)*800;cover(ims[n],(x,y,520,620));txt(x,y+650,labels[i],font('unda-3.ttf',28),'#342b22');txt(x,y+696,subs[i],label,'#756856')
ry=3180;d.rectangle((0,ry,w,ry+1000),fill='#171410');cover(ims['ritual'],(55,ry+80,570,820));txt(690,ry+170,'O RITUAL',label,'#e8c58e');txt(690,ry+250,'Acender.\nPausar.\nPermanecer.',font('unda-0.ttf',72),'#f3ede3');txt(690,ry+570,'A atmosfera muda quando\na atenção muda.',sans,'#b9ad9d')
ay=4300;cover(ims['architecture'],(0,ay,w,760));txt(55,ay+70,'ESCOLHA SUA ATMOSFERA',label,'#f3ede3');txt(55,ay+530,'A casa como extensão\ndaquilo que sentimos.',font('unda-1.ttf',62),'#f3ede3')
my=5180;cover(ims['manifesto'],(55,my,1090,700));txt(55,my+780,'CASA. MEMÓRIA. PRESENÇA.',label,'#756856');txt(55,my+850,'Há lugares que ficam\nmesmo depois de partirmos.',font('unda-0.ttf',68),'#342b22');txt(55,6260,'BRUMA.',font('unda-3.ttf',32),'#342b22');txt(930,6270,'RIO DE JANEIRO',label,'#756856')
page.save(OUT/'bruma-site.webp','WEBP',quality=82,method=6)
for n,im in ims.items():im.thumbnail((1200,1200),Image.Resampling.LANCZOS);im.save(OUT/f'bruma-{n}.webp','WEBP',quality=80,method=6)
