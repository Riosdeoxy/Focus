'use client';
import {HeroScene,ManifestoScene,HandmadeScene,MiraScene,BrumaScene,OreaScene,MobileScene,ServicesScene,PhilosophyScene,ProcessScene,AboutScene,ContactScene} from '@/components/sections/Scenes';
import {useEffect,useRef,useState,lazy,Suspense} from 'react';
import FallbackPortfolio from '@/components/three/FallbackPortfolio';
import TypographyPortal from '@/components/three/TypographyPortal';
const ExperienceCanvas=lazy(()=>import('@/components/three/ExperienceCanvas')); 
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {timelineState,chapters,TIMELINE_END} from '@/lib/timeline';
import Navigation from '@/components/Navigation';
export default function Home(){
 const root=useRef<HTMLDivElement>(null);const [progress,setProgress]=useState(0); const [loaded,setLoaded]=useState(false);const [error,setError]=useState(false);const [menu,setMenu]=useState(false);
 useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;timelineState.reduced=reduced;const lenis=new Lenis({duration:reduced?0:1.25,smoothWheel:!reduced});lenis.on('scroll',ScrollTrigger.update);const tick=(t:number)=>{if(timelineState.menu)lenis.stop();else lenis.start();lenis.raf(t*1000);};gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
 const ctx=gsap.context(()=>{ScrollTrigger.create({trigger:'.journey',start:'top top',end:'bottom bottom',onUpdate:s=>{timelineState.progress=s.progress*TIMELINE_END; document.documentElement.style.setProperty('--progress',String(s.progress));}});
 document.querySelectorAll<HTMLElement>('.scene').forEach(el=>{const a=Number(el.dataset.start),b=Number(el.dataset.end);ScrollTrigger.create({trigger:'.journey',start:'top top',end:'bottom bottom',onUpdate:s=>{const p=s.progress*TIMELINE_END;const visible=p>=a&&p<b;el.style.visibility=visible?'visible':'hidden';el.style.pointerEvents=visible?'auto':'none';el.setAttribute('aria-hidden',String(!visible));const local=(p-a)/(b-a);el.style.setProperty('--local',String(local));el.style.opacity=String(Math.min(1,(p-a)*5,(b-p)*5)); if(a===0)el.style.opacity=String(Math.min(1,(b-p)*5));if(el.classList.contains('project')){const enter=gsap.utils.clamp(0,1,(local-.24)/.16),leave=gsap.utils.clamp(0,1,(local-.72)/.15);el.style.opacity=String(Math.min(1,(p-a)*5,(b-p)*5)*(1-enter*(1-leave)));}}})});
 },root);
 const move=(e:PointerEvent)=>{timelineState.mouse.x=e.clientX/innerWidth-.5;timelineState.mouse.y=e.clientY/innerHeight-.5;gsap.to('.cursor',{x:e.clientX,y:e.clientY,duration:.35});};window.addEventListener('pointermove',move);
 const magnets=[...document.querySelectorAll<HTMLElement>('.magnetic')];const magnet=(e:PointerEvent)=>{if(reduced||e.pointerType==='touch')return;const el=e.currentTarget as HTMLElement;const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.15,duration:.4});};const reset=(e:PointerEvent)=>gsap.to(e.currentTarget,{x:0,y:0,duration:.5});magnets.forEach(el=>{el.addEventListener('pointermove',magnet);el.addEventListener('pointerleave',reset)});const anchors=(e:MouseEvent)=>{const el=(e.target as HTMLElement).closest('a[href^="#"]');if(el){const id=el.getAttribute('href')!.slice(1);const c=chapters.find(c=>c.id===id);if(c){e.preventDefault();lenis.start();lenis.scrollTo(c.p/TIMELINE_END*(document.querySelector('.journey')!.scrollHeight-innerHeight),{duration:reduced?0:1.8});}}};document.addEventListener('click',anchors);
 return()=>{magnets.forEach(el=>{el.removeEventListener('pointermove',magnet);el.removeEventListener('pointerleave',reset)});ctx.revert();lenis.destroy();gsap.ticker.remove(tick);window.removeEventListener('pointermove',move);document.removeEventListener('click',anchors);};},[]);
 useEffect(()=>{timelineState.menu=menu;document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow='';};},[menu]);
 return <div ref={root}>
 <Suspense fallback={null}><ExperienceCanvas onProgress={setProgress} onReady={()=>setLoaded(true)} onError={()=>{setError(true);setLoaded(true);}}/></Suspense>
 <div className={'preloader '+(loaded?'finished':'')} aria-hidden={loaded}><span className="logo">UNDA.</span><div className="load-number">{String(Math.round(progress)).padStart(2,'0')}</div><span className="micro">DANDO FORMA À SUA PRESENÇA</span></div>
 <Navigation menu={menu} setMenu={setMenu}/>
 <TypographyPortal/><main className="journey" aria-label="A experiência UNDA"><div className="stage">
 <HeroScene/>
 <ManifestoScene/>
 <HandmadeScene/>
 <MiraScene/>
 <BrumaScene/>
 <OreaScene/>
 <MobileScene/>
 <ServicesScene/>
 <PhilosophyScene/>
 <ProcessScene/>
 <AboutScene/>
 <ContactScene/>
 </div></main><div className="progress-line"/><div className="cursor" aria-hidden="true"/>{error&&<FallbackPortfolio/>}{error&&<div className="webgl-note">A visualização 3D não iniciou neste navegador. Os textos e o contato continuam disponíveis.</div>}
 </div>;
}
