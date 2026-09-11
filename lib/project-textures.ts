import * as T from 'three';
export type PageTexture={texture:T.CanvasTexture;update:(progress:number)=>void};
export function makePageTexture(page:CanvasImageSource & {width:number;height:number},mobile=false):PageTexture{
 const viewport=document.createElement('canvas');viewport.width=mobile?512:1536;viewport.height=mobile?1100:944;
 const c=viewport.getContext('2d',{alpha:false})!;const texture=new T.CanvasTexture(viewport);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=2;texture.minFilter=T.LinearFilter;texture.generateMipmaps=false;let old=-1;
 function update(progress:number){const p=Math.round(Math.max(0,Math.min(1,progress))*180)/180;if(p===old)return;old=p;const ratio=viewport.width/viewport.height;const cropH=Math.min(page.height,page.width/ratio);const cropW=Math.min(page.width,cropH*ratio);const maxY=Math.max(0,page.height-cropH);const x=(page.width-cropW)/2;c.drawImage(page,x,p*maxY,cropW,cropH,0,0,viewport.width,viewport.height);texture.needsUpdate=true;}
 update(0);return{texture,update};
}
