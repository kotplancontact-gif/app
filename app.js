var $s=Object.defineProperty;var z=(e,t)=>{for(var s in t)$s(e,s,{get:t[s],enumerable:!0})};var wt=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],vs=["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"],xs=["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],kt=e=>String(e).padStart(2,"0");function N(e=new Date){return`${e.getFullYear()}-${kt(e.getMonth()+1)}-${kt(e.getDate())}`}function U(e){let[t,s,a]=e.split("-").map(Number);return Date.UTC(t,s-1,a)/864e5}function St(e){return new Date(e*864e5).toISOString().slice(0,10)}var E=(e,t)=>St(U(e)+t),ae=(e,t)=>U(t)-U(e),Ke=e=>new Date(U(e)*864e5).getUTCDay();function ne(e){return typeof e!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(e)?!1:St(U(e))===e}function ve(e){let[,t,s]=e.split("-").map(Number);return`${wt[Ke(e)]} ${s} ${vs[t-1]}`}function M(e){let[,t,s]=e.split("-").map(Number);return`${s} ${xs[t-1]}`}var de=e=>wt[Ke(e)].slice(0,3);function Ge(e){return e===0?"aujourd'hui":e===1?"demain":e>1?`dans ${e} jours`:e===-1?"hier":`il y a ${-e} jours`}function Mt(e){let t=Ke(e);return E(e,t===0?-6:1-t)}var Tt="kotplan-app-v1",W=3,Pe=()=>Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4);function Ae(){return{v:1,courses:[],settings:{start:N(),slots:{m:{on:!0,h:3,t:"09:00"},a:{on:!0,h:3,t:"14:00"},s:{on:!0,h:2,t:"19:30"}},off:[]},log:{},sessions:[],timer:null,prefs:{name:"",theme:"auto",accent:"encre",work:50,short:10,long:20,cycle:4,autoNext:!1,sound:!0,vibrate:!0,notify:!1},pro:null,onboarded:!1}}function Et(e){return e&&typeof e=="object"&&!Array.isArray(e)}function We(e,t){for(let s of Object.keys(t||{}))Et(e[s])&&Et(t[s])?We(e[s],t[s]):e[s]=t[s];return e}function ys(){try{let e=localStorage.getItem(Tt);if(e)return We(Ae(),JSON.parse(e))}catch{}return Ae()}var Q=ys(),De=new Set,T=()=>Q,Ct=e=>De.add(e);function Je(){try{localStorage.setItem(Tt,JSON.stringify(Q))}catch{}}function b(e,{silent:t=!1}={}){e(Q),Je(),t||De.forEach(s=>s())}function At(e){Q=We(Ae(),e),Je(),De.forEach(t=>t())}function Pt(){Q=Ae(),Je(),De.forEach(e=>e())}var pe=(e=Q)=>!!(e.pro&&e.pro.key),Z=(e,t=Q)=>t.courses.find(s=>s.id===e)||null;function Dt(e=Q){let t=new Set(e.courses.map(s=>s.color));for(let s=0;s<10;s++)if(!t.has(s))return s;return e.courses.length%10}var xe=[{key:"m",label:"Matin",short:"Matin",start:"09:00"},{key:"a",label:"Apr\xE8s-midi",short:"Apr\xE8m",start:"14:00"},{key:"s",label:"Soir",short:"Soir",start:"19:30"}],Nt=e=>Math.max(1,Number(e.diff)||3)*Math.max(1,Number(e.ects)||5),Ne=(e,t)=>{let s=e.slots?.[t];return s&&s.on?Math.max(0,Number(s.h)||0):0};function Lt(e,t){let{settings:s,log:a={}}=e,n=(e.courses||[]).filter(c=>c.exam),r={days:[],stats:new Map,total:0,start:s.start,last:null,empty:!n.length};if(!n.length)return r;let o=new Map;for(let c of n)o.has(c.exam)||o.set(c.exam,[]),o.get(c.exam).push(c.id);let l=n.reduce((c,p)=>p.exam>c?p.exam:c,n[0].exam);r.last=l;let u=new Set(s.off||[]),d=xe.filter(c=>Ne(s,c.key)>0),m=c=>!o.has(c)&&!u.has(c)&&n.some(p=>p.exam>c),f=0;for(let c=s.start;c<l;c=E(c,1))if(m(c))for(let p of d)f+=Ne(s,p.key);r.total=f;let v=n.reduce((c,p)=>c+Nt(p),0),S=new Map(n.map(c=>[c.id,Nt(c)/v*f])),L=new Map(n.map(c=>[c.id,0]));for(let c of Object.values(a))c&&c.st==="done"&&L.has(c.c)&&L.set(c.c,L.get(c.c)+(Number(c.h)||0));let h=new Map,x=0;for(let c=s.start;c<=l;c=E(c,1))if(h.set(c,x),m(c))for(let p of d)x+=Ne(s,p.key);let k=(c,p)=>{let $=h.get(c.exam)||0;return $>0?S.get(c.id)*Math.min(1,p/$):S.get(c.id)},R=new Map(L),O=new Map(n.map(c=>[c.id,0]));for(let c=s.start;c<=l;c=E(c,1)){let p={date:c,kind:"study",exams:o.get(c)||[],slots:[]};if(p.exams.length?p.kind="exam":m(c)||(p.kind="off"),p.kind==="study"){let $=null,A=h.get(c);for(let F of d){let q=Ne(s,F.key);A+=q;let se=`${c}|${F.key}`,Y={id:se,key:F.key,label:F.label,short:F.short,h:q,course:null,status:"planned"},$e=a[se];if($e)Y.course=$e.c,Y.status=$e.st,$e.st==="done"&&(Y.h=Number($e.h)||q);else if(c<t)Y.status="missed";else{let ce=null,He=-1/0;for(let G of n){if(G.exam<=c)continue;let bs=U(G.exam)-U(c),Xe=S.get(G.id)-R.get(G.id),ue;bs===1?ue=1e3+Xe/10-(G.id===$?1:0):Xe<=0?ue=-1e6+Xe:(ue=k(G,A)-R.get(G.id),G.id===$&&(ue-=q)),ue>He&&(He=ue,ce=G.id)}He>-1/0?(Y.course=ce,R.set(ce,R.get(ce)+q),O.set(ce,O.get(ce)+q)):Y.status="free"}$=Y.course,p.slots.push(Y)}}r.days.push(p)}for(let c of n){let p=S.get(c.id),$=L.get(c.id),A=O.get(c.id),F=U(c.exam)-U(t),q=p>0?($+A)/p:1,se="ok";F<0?se="past":q<.75?se="late":q<.95&&(se="tight"),r.stats.set(c.id,{target:p,done:$,future:A,coverage:q,examIn:F,status:se,missing:Math.max(0,p-$-A)})}return r}function Le(e,t=new Date().getHours()){if(!e||e.kind!=="study")return null;let s=t<13?0:t<19?1:2,a=["m","a","s"].slice(s),n=e.slots.filter(r=>r.status==="planned"||r.status==="free");return n.find(r=>a.includes(r.key))||n[0]||null}function jt(e,t){return e.filter(s=>s.exam&&s.exam>=t).sort((s,a)=>s.exam<a.exam?-1:1)[0]||null}function It(e){let t=e.filter(l=>l.grade!==null&&l.grade!==void 0&&l.grade!==""&&!Number.isNaN(Number(l.grade))),s=l=>Math.max(0,Number(l.ects)||0),a=e.reduce((l,u)=>l+s(u),0),n=t.reduce((l,u)=>l+s(u),0),r=n>0?t.reduce((l,u)=>l+Number(u.grade)*s(u),0)/n:null,o=t.filter(l=>Number(l.grade)>=10).reduce((l,u)=>l+s(u),0);return{avg:r,credits:o,totalEcts:a,gradedEcts:n,graded:t.length}}function Rt(e,t,s){return s>=0&&s<1?(e-s*t)/(1-s):null}var ye=class{constructor(t){this.s=t}toString(){return this.s}},ks={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},me=e=>String(e??"").replace(/[&<>"']/g,t=>ks[t]),Vt=e=>e==null||e===!1?"":Array.isArray(e)?e.map(Vt).join(""):e instanceof ye?e.s:me(e),i=(e,...t)=>new ye(e.reduce((s,a,n)=>s+a+(n<t.length?Vt(t[n]):""),"")),Ye=e=>new ye(e),j=["#ffe94d","#ff9ecb","#86efac","#8fd3ff","#ffb86b","#c9b0ff","#e3f26b","#8ef0e0","#ffc7b0","#b9c4ff"],ze=["jaune","rose","vert","bleu","orange","lilas","citron","menthe","p\xEAche","pervenche"],ke={encre:{name:"Encre bleue",light:"#1b3a8c",dark:"#8fb0ff"},violet:{name:"Violet",light:"#5b2bb5",dark:"#c3a6ff"},sapin:{name:"Vert sapin",light:"#1f6b4a",dark:"#7fd8ad"},bordeaux:{name:"Bordeaux",light:"#8c1d3a",dark:"#ff9bb5"},graphite:{name:"Graphite",light:"#2a2f3a",dark:"#d5dae3"}};function y(e){let t=Math.round(e);if(t<60)return`${t} min`;let s=Math.floor(t/60),a=t%60;return a?`${s} h ${String(a).padStart(2,"0")}`:`${s} h`}var C=e=>y(e*60);function oe(e){let t=Math.max(0,Math.round(e/1e3)),s=Math.floor(t/3600),a=Math.floor(t%3600/60),n=t%60;return s?`${s}:${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`:`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}var D=(e,t="ic")=>Ye(`<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`),g={today:D('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),planning:D('<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 14h3M13.5 14h3M7.5 17.5h3"/>'),focus:D('<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M9.5 2.5h5M19 6l1.5-1.5"/>'),stats:D('<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>'),courses:D('<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/>'),settings:D('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),play:D('<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>'),pause:D('<path d="M8 5v14M16 5v14" stroke-width="3"/>'),stop:D('<rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor"/>'),check:D('<path d="M4.5 12.5l5 5 10-11" stroke-width="2.4"/>'),x:D('<path d="M6 6l12 12M18 6L6 18" stroke-width="2.2"/>'),plus:D('<path d="M12 5v14M5 12h14" stroke-width="2.2"/>'),next:D('<path d="M9 5l7 7-7 7"/>'),lock:D('<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>'),share:D('<path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 13v6.5h14V13"/>')},Ot;function w(e){let t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Ot),Ot=setTimeout(()=>t.classList.remove("show"),3600))}function _(e){let t=document.getElementById("sheet");t.querySelector(".sheet-body").innerHTML=String(e),t.open||t.showModal();let s=t.querySelector("[autofocus], input, select, button:not(.sheet-x)");s&&s.focus()}function V(){let e=document.getElementById("sheet");e.open&&e.close()}function Qe(e,t,s){let a=new Blob([t],{type:s}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download=e,document.body.append(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(n.href),n.remove()},500)}var ee=(e,t)=>e.phase==="work"?t.work:e.phase==="short"?t.short:t.long,we={work:"Concentration",short:"Petite pause",long:"Grande pause"};function re(e,t=Date.now()){return!e||e.waiting||e.phaseStart==null?0:(e.pausedAt??t)-e.phaseStart-(e.paused||0)}function Se(e,t,s=Date.now()){return ee(e,t)*6e4-re(e,s)}function Ze(e,t,s=Date.now()){if(!e||e.waiting)return 0;let a=re(e,s);return e.mode==="free"?a%36e5/36e5:Math.min(1,a/(ee(e,t)*6e4))}function Ft(e,t,s,a){let n=Math.round(s/6e4);if(n<1)return null;let r={id:Pe(),c:t.c||null,start:t.phaseStart,end:a,min:n,kind:t.mode};return e.sessions.push(r),r}function fe(e,t=null,s=null){tt(),b(a=>{a.timer={mode:e,phase:"work",c:t,slot:s,phaseStart:Date.now(),paused:0,pausedAt:null,count:0,waiting:!1}})}function qt(){b(e=>{e.timer&&!e.timer.pausedAt&&!e.timer.waiting&&(e.timer.pausedAt=Date.now())})}function Ut(){tt(),b(e=>{let t=e.timer;t&&t.pausedAt&&(t.paused+=Date.now()-t.pausedAt,t.pausedAt=null)})}function _t(){tt(),b(e=>{let t=e.timer;t&&t.waiting&&Object.assign(t,{waiting:!1,phaseStart:Date.now(),paused:0,pausedAt:null})})}function Bt(){b(e=>{let t=e.timer;t&&t.phase!=="work"&&Object.assign(t,{phase:"work",waiting:!1,phaseStart:Date.now(),paused:0,pausedAt:null})})}function Ht(){let e=null;return b(t=>{let s=t.timer;s&&s.phase==="work"&&!s.waiting&&(e=Ft(t,s,re(s),s.pausedAt??Date.now())),t.timer=null}),e}function Xt(e){b(t=>{t.timer&&(t.timer.c=e||null)})}function et(e=Date.now()){let t=T(),s=t.timer;if(!s||s.mode!=="pomo"||s.waiting||s.pausedAt||Se(s,t.prefs,e)>0)return null;let a=null;return b(n=>{let r=n.timer,o=ee(r,n.prefs)*6e4,l=r.phaseStart+(r.paused||0)+o;r.phase==="work"?(Ft(n,r,o,l),r.count+=1,r.phase=r.count%Math.max(1,n.prefs.cycle)===0?"long":"short",a="work-done"):(r.phase="work",a="break-done"),r.paused=0,r.pausedAt=null,n.prefs.autoNext&&e-l<6e4?(r.phaseStart=l,r.waiting=!1):(r.phaseStart=null,r.waiting=!0)}),a}var B=null;function tt(){try{B=B||new(window.AudioContext||window.webkitAudioContext),B.state==="suspended"&&B.resume()}catch{B=null}}function Kt(){if(!B)return;let e=B.currentTime+.02;[659.3,880,1046.5].forEach((t,s)=>{let a=B.createOscillator(),n=B.createGain();a.type="sine",a.frequency.value=t;let r=e+s*.16;n.gain.setValueAtTime(1e-4,r),n.gain.exponentialRampToValueAtTime(.22,r+.02),n.gain.exponentialRampToValueAtTime(1e-4,r+.5),a.connect(n).connect(B.destination),a.start(r),a.stop(r+.55)})}async function Gt(e,t){try{if(!("Notification"in window)||Notification.permission!=="granted")return;let s=await navigator.serviceWorker?.getRegistration(),a={body:t,icon:"icons/icon-192.png",badge:"icons/icon-192.png",tag:"kotplan-timer"};s?s.showNotification(e,a):new Notification(e,a)}catch{}}var ot={};z(ot,{render:()=>Cs});var Jt=e=>N(new Date(e));function je(e,t,s,a=14){let n=new Map,r=new Map,o=new Array(24).fill(0),l=0;for(let p of e.sessions){let $=Jt(p.start);n.set($,(n.get($)||0)+p.min);let A=p.c||"libre";r.set(A,(r.get(A)||0)+p.min),o[new Date(p.start).getHours()]+=p.min,l+=p.min}let u=[];for(let p=a-1;p>=0;p--){let $=E(s,-p);u.push({date:$,min:n.get($)||0})}let d=new Set;for(let[p,$]of Object.entries(e.log))$.st==="done"&&d.add(p.split("|")[0]);let m=p=>(n.get(p)||0)>0||d.has(p),f=0,v=m(s)?s:E(s,-1);for(;m(v);)f+=1,v=E(v,-1);let S=0,L=0,h=0,x=0;for(let p of t.days){if(p.date>s)break;for(let $ of p.slots)$.status==="done"?(S+=1,x+=$.h):$.status==="skip"?L+=1:$.status==="missed"&&(h+=1)}let k=u.slice(-7).reduce((p,$)=>p+$.min,0),R=[...Array(7)].reduce((p,$,A)=>p+(n.get(E(s,-7-A))||0),0),O=[...n.entries()].sort((p,$)=>$[1]-p[1])[0]||null,c=e.sessions.filter(p=>p.kind==="pomo"&&Jt(p.start)===s).length;return{total:l,week:k,prevWeek:R,todayMin:n.get(s)||0,todayPomos:c,sessions:e.sessions.length,avg:e.sessions.length?l/e.sessions.length:0,best:O,streak:f,days:u,byCourse:r,byHour:o,slots:{done:S,skipped:L,missed:h,doneHours:x}}}var ws="2ctigTHgQ_u1OvPxhLAg0w==",Ie="https://kotplan.gumroad.com/l/kotplan-pro",H="4,99 \u20AC";async function st(e,{activate:t=!1}={}){let s=String(e||"").trim();if(!s)return{ok:!1,definitive:!0,message:"Colle ta cl\xE9 de licence."};let a;try{let r=new URLSearchParams({product_id:ws,license_key:s,increment_uses_count:t?"true":"false"}),o=await fetch("https://api.gumroad.com/v2/licenses/verify",{method:"POST",body:r});if(o.status>=500)throw new Error("serveur");a=await o.json()}catch{return{ok:!1,message:"Pas de connexion. R\xE9essaie quand tu es en ligne."}}let n=a.purchase||{};return a.success?n.refunded||n.chargebacked||n.disputed?{ok:!1,definitive:!0,message:"Cet achat a \xE9t\xE9 rembours\xE9 ou contest\xE9."}:t&&Number(a.uses)>5?{ok:!1,definitive:!0,message:"Cette cl\xE9 est d\xE9j\xE0 activ\xE9e sur 5 appareils. \xC9cris-nous en r\xE9pondant \xE0 l'e-mail de Gumroad."}:{ok:!0}:{ok:!1,definitive:!0,message:"Cette cl\xE9 n'est pas valable. V\xE9rifie-la dans l'e-mail de Gumroad."}}async function Yt(e,t=Date.now()){if(!e||!e.key)return"none";if(e.checked&&t-e.checked<864e5)return"fresh";if(typeof navigator<"u"&&navigator.onLine===!1)return"offline";let s=await st(e.key);return s.ok?"valid":s.definitive?"revoked":"offline"}var I=(e,t)=>t?Z(t,e)?.name||"Cours supprim\xE9":"R\xE9vision libre",Ss=new Set(["introduction","intro","\xE0","a","au","aux","de","des","du","d","la","le","les","l","et","en","pour","sur","g\xE9n\xE9rale","g\xE9n\xE9ral","i","ii","iii"]),zt=e=>{if(e.length<=12)return e;let t=e.split(/[\s'’-]+/).find(s=>s&&!Ss.has(s.toLowerCase()));return t?t[0].toUpperCase()+t.slice(1):e};function at(e,t){let s=t?Z(t,e):null;if(!s)return I(e,t);let a=zt(s.name);return e.courses.some(r=>r.id!==s.id&&zt(r.name).toLowerCase()===a.toLowerCase())?s.name:a}var he=(e,t)=>{let s=t?Z(t,e):null;return s?j[s.color%j.length]:"var(--free)"},P=(e,t,s="")=>i`<span class="hlt ${s}" style="--c:${he(e,t)}">${I(e,t)}</span>`,Qt={ok:{label:"Dans les temps",cls:"ok"},tight:{label:"Serr\xE9",cls:"tight"},late:{label:"En retard",cls:"late"},past:{label:"Examen pass\xE9",cls:"past"}},Zt=e=>i`<span class="tag ${Qt[e].cls}">${Qt[e].label}</span>`,nt={planned:"Pr\xE9vu",free:"Libre",done:"Fait",skip:"Pas fait",missed:"Non coch\xE9"};function Re(e,t,{big:s=!1}={}){let a=t.status==="missed"?"Non coch\xE9":t.status==="free"&&!t.course?"Libre":s?I(e,t.course):at(e,t.course),n=t.status==="done"?g.check:t.status==="skip"?g.x:"";return i`<button class="pill st-${t.status} ${s?"big":""}" style="--c:${he(e,t.course)}"
    data-act="slot-sheet" data-slot="${t.id}" aria-label="${t.label} : ${a}, ${nt[t.status]}">
    ${n}<span class="pill-name">${a}</span><small>${C(t.h)}</small></button>`}function es(e,t){return i`<div class="lock">
    <p class="lock-title">${g.lock} ${e}</p>
    <p>${t}</p>
    <a class="btn small" href="#/reglages" data-scroll="pro">Débloquer Pro · ${H}</a>
  </div>`}var ts=()=>i`<a class="btn" href="${Ie}" target="_blank" rel="noopener">Acheter KotPlan Pro · ${H}</a>`,ss=(e,t,s)=>s===0?"aujourd'hui":s===1?"demain":s>1?`${M(e.exam)} \xB7 dans ${s} j`:`pass\xE9 (${M(e.exam)})`,Oe=e=>{let t=ve(e);return t[0].toUpperCase()+t.slice(1)};var Ms={m:"Ce matin",a:"Cet apr\xE8s-midi",s:"Ce soir"};function Es(e){let{s:t}=e,s=t.timer,a=s.mode==="pomo"?Se(s,t.prefs):re(s),n=s.waiting?"En attente":s.pausedAt?"En pause":s.mode==="pomo"?we[s.phase]:"Chrono libre";return i`<section class="now live" aria-live="polite">
    <p class="now-when">${n} · en direct</p>
    <h2 class="now-course">${P(t,s.c)}</h2>
    <p class="live-clock" data-tick="clock">${s.waiting?"--:--":oe(a)}</p>
    <div class="now-actions">
      <a class="btn" href="#/focus">${g.focus} Ouvrir le minuteur</a>
      ${s.pausedAt?i`<button class="btn-line" data-act="timer-resume">${g.play} Reprendre</button>`:s.waiting?"":i`<button class="btn-line" data-act="timer-pause">${g.pause} Pause</button>`}
    </div>
  </section>`}function Ts(e,t){let{s,today:a,plan:n,hour:r}=e;if(a<s.settings.start){let m=ae(a,s.settings.start);return i`<section class="now calm">
      <p class="now-when">Avant le blocus</p>
      <h2 class="now-title">Ton blocus commence ${Ge(m)}.</h2>
      <p>Le planning démarre le ${M(s.settings.start)}. En attendant, une session libre compte déjà dans tes stats.</p>
      <div class="now-actions"><button class="btn" data-act="focus-free">${g.play} Session libre</button></div>
    </section>`}if(n.last&&a>n.last)return i`<section class="now calm">
      <p class="now-when">Session terminée</p>
      <h2 class="now-title">C'est fini. Respire.</h2>
      <p>Entre tes notes dans le simulateur pour voir ta moyenne et tes crédits.</p>
      <div class="now-actions"><a class="btn" href="#/simuler">Simuler ma session</a></div>
    </section>`;if(!t)return"";if(t.kind==="exam")return i`<section class="now exam">
      <p class="now-when">Jour d'examen</p>
      <h2 class="now-course">${t.exams.map(m=>P(s,m))}</h2>
      <p>Pas de révision prévue aujourd'hui. Relis la checklist : carte d'étudiant, stylos, eau, 30 min d'avance.</p>
    </section>`;if(t.kind==="off")return i`<section class="now calm">
      <p class="now-when">Jour de repos</p>
      <h2 class="now-title">Rien de prévu aujourd'hui.</h2>
      <p>C'est voulu : un vrai jour off évite de craquer en fin de session.</p>
    </section>`;let o=Le(t,r);if(!o){let m=t.slots.filter(f=>f.status==="done").reduce((f,v)=>f+v.h,0);return i`<section class="now done">
      <p class="now-when">Journée bouclée</p>
      <h2 class="now-title"><span class="hlt swipe-in" style="--c:var(--hl)">${C(m)} de révision validées.</span></h2>
      <p>Demain, le planning reprend là où tu en es.</p>
    </section>`}let l=o.course?s.courses.find(m=>m.id===o.course):null,u=l?ae(a,l.exam):null,d=r<13?0:r<19?1:2;return["m","a","s"].indexOf(o.key)<d?i`<section class="now">
      <p class="now-when">${o.label} · pas encore coché</p>
      <h2 class="now-course">${P(s,o.course)}</h2>
      <p>Tu l'as fait ? Dis-le à KotPlan pour que le planning reste juste.</p>
      <div class="now-actions">
        <button class="btn" data-act="slot-done" data-slot="${o.id}">${g.check} Oui, c'est fait</button>
        <button class="btn-line" data-act="slot-skip" data-slot="${o.id}">${g.x} Non, à replacer</button>
      </div>
    </section>`:i`<section class="now">
    <p class="now-when">${Ms[o.key]} · ${C(o.h)}${l?` \xB7 examen ${u===1?"demain":`dans ${u} jours`}`:""}</p>
    <h2 class="now-course">${P(s,o.course,e.justDone===o.id?"swipe-in":"")}</h2>
    ${o.status==="free"?i`<p>Tout est à jour : reprends tes fiches ou refais des exercices du cours de ton choix.</p>`:""}
    <div class="now-actions">
      <button class="btn" data-act="focus-start" data-c="${o.course||""}" data-slot="${o.id}">${g.play} Lancer ${s.prefs.work} min</button>
      <button class="btn-line" data-act="slot-done" data-slot="${o.id}">${g.check} C'est fait</button>
      <button class="btn-text" data-act="slot-skip" data-slot="${o.id}">Pas fait</button>
    </div>
  </section>`}function Cs(e){let{s:t,today:s,plan:a}=e,n=a.days.find(d=>d.date===s),r=je(t,a,s,7),o=jt(t.courses,s),l=t.courses.filter(d=>d.exam>=s).sort((d,m)=>d.exam<m.exam?-1:1).slice(0,4),u=n?n.slots.filter(d=>d.status==="done").length:0;return i`
  <header class="page-head">
    <p class="date">${Oe(s)}</p>
    <h1>${t.prefs.name?`Courage, ${t.prefs.name}.`:"Aujourd'hui"}</h1>
    ${o?i`<p class="sub">${o.exam===s?i`Examen aujourd'hui : <b>${o.name}</b>`:i`Prochain examen : <b>${o.name}</b>, ${Ge(ae(s,o.exam))}`}</p>`:""}
  </header>

  ${t.timer?Es(e):Ts(e,n)}

  ${n&&n.kind==="study"?i`<section class="block">
    <h2 class="h2">Ta journée <small>${u}/${n.slots.length} créneaux</small></h2>
    <ul class="dayslots">${n.slots.map(d=>i`<li><span class="slot-label">${d.label}</span>${Re(t,d,{big:!0})}</li>`)}</ul>
  </section>`:""}

  <section class="block">
    <h2 class="h2">En direct</h2>
    <dl class="numbers">
      <div><dt>Focus aujourd'hui</dt><dd>${y(r.todayMin)}</dd></div>
      <div><dt>Pomodoros</dt><dd>${r.todayPomos}</dd></div>
      <div><dt>Série</dt><dd>${r.streak} j</dd></div>
      <div><dt>Cette semaine</dt><dd>${y(r.week)}</dd></div>
    </dl>
  </section>

  ${l.length?i`<section class="block">
    <h2 class="h2">Prochains examens</h2>
    <ul class="exams">${l.map(d=>{let m=ae(s,d.exam);return i`<li><span>${P(t,d.id)}</span><span class="when ${m<=3?"soon":""}">${m===0?"aujourd'hui":`J\u2212${m}`}</span></li>`})}</ul>
  </section>`:""}

  <p class="foot-note">Coché par erreur ? Touche un créneau pour le modifier.</p>
  `}var it={};z(it,{actions:()=>Ds,mount:()=>Ps,render:()=>As,slotSheet:()=>rt});var Ve=!1;function As(e){let{s:t,today:s,plan:a}=e,n=Ve?t.settings.start:E(s,-1),r=a.days.filter(d=>d.date>=n),o=a.days.length-r.length,l=[];for(let d of r){let m=Mt(d.date);(!l.length||l[l.length-1].w!==m)&&l.push({w:m,days:[]}),l[l.length-1].days.push(d)}let u=d=>d.days.flatMap(m=>m.slots).filter(m=>m.status!=="skip"&&m.status!=="missed").reduce((m,f)=>m+f.h,0);return i`
  <header class="page-head">
    <h1>Planning</h1>
    <p class="sub">Du ${M(t.settings.start)} au ${M(a.last)} · ${C(a.total)} de révision au total. Il se recalcule dès que tu coches ou sautes un créneau.</p>
  </header>
  ${o>0?i`<button class="btn-text past-toggle" data-act="toggle-past">Voir les ${o} jours passés</button>`:Ve?i`<button class="btn-text past-toggle" data-act="toggle-past">Masquer les jours passés</button>`:""}
  ${l.map(d=>i`<section class="week">
    <h2 class="week-h">Semaine du ${M(d.w)} <small>${C(u(d))}</small></h2>
    <ol class="days">${d.days.map(m=>i`<li class="day k-${m.kind} ${m.date===s?"is-today":""} ${m.date<s?"is-past":""}" ${m.date===s?i`id="today"`:""}>
      <div class="d"><span>${de(m.date)}.</span><b>${Number(m.date.slice(8))}</b></div>
      <div class="d-body">
        ${m.kind==="exam"?i`<p class="exam-line">Examen : ${m.exams.map((f,v)=>i`${v?", ":""}<b>${I(t,f)}</b>`)}</p>`:m.kind==="off"?i`<p class="off-line">Repos</p>`:i`<div class="pills">${m.slots.map(f=>Re(t,f))}</div>`}
      </div>
    </li>`)}</ol>
  </section>`)}
  `}function Ps(e,t,s){s&&e.querySelector("#today")?.scrollIntoView({block:"center"})}var Ds={"toggle-past":(e,t,s)=>{Ve=!Ve,s.rerender()}};function rt(e,t){let{s,plan:a,today:n}=e,[r]=t.split("|"),o=a.days.find(u=>u.date===r)?.slots.find(u=>u.id===t);if(!o)return null;let l=r>=n;return i`
  <p class="sheet-kicker">${o.label} · ${Oe(r)}</p>
  <h2 class="sheet-title">${P(s,o.course)}</h2>
  <p class="sheet-meta">${C(o.h)} · ${nt[o.status]}</p>
  <div class="sheet-actions">
    ${l&&o.status!=="done"?i`<button class="btn" data-act="focus-start" data-c="${o.course||""}" data-slot="${o.id}">${g.play} Lancer le focus</button>`:""}
    ${o.status!=="done"?i`<button class="btn-line" data-act="slot-done" data-slot="${o.id}">${g.check} C'est fait</button>`:""}
    ${o.status!=="skip"&&o.status!=="done"?i`<button class="btn-line" data-act="slot-skip" data-slot="${o.id}">${g.x} Pas fait</button>`:""}
    ${o.status==="done"||o.status==="skip"?i`<button class="btn-text" data-act="slot-reset" data-slot="${o.id}">Annuler (remettre « ${l?"pr\xE9vu":"non coch\xE9"} »)</button>`:""}
  </div>
  ${o.status==="planned"?i`<p class="sheet-hint">« Pas fait » redistribue ces ${C(o.h)} sur les jours suivants.</p>`:""}`}var pt={};z(pt,{actions:()=>js,clockText:()=>ge,render:()=>Ls,tick:()=>dt});var X="pomo",Fe,lt=null,ct=100,ut=2*Math.PI*ct,Ns=[{w:25,s:5,l:15,label:"25 / 5"},{w:50,s:10,l:20,label:"50 / 10"},{w:90,s:15,l:30,label:"90 / 15"}];function ge(e){let t=e.timer;return t?t.waiting?oe(ee(t,e.prefs)*6e4):t.mode==="pomo"?oe(Se(t,e.prefs)):oe(re(t)):X==="pomo"?oe(e.prefs.work*6e4):"00:00"}function Ls(e){let{s:t,today:s}=e,a=t.timer;a&&(X=a.mode);let n=a?a.c:Fe!==void 0?Fe||null:e.suggestC||null;lt=n;let r=Ze(a,t.prefs),o=a?a.waiting?`Ensuite : ${we[a.phase].toLowerCase()}`:a.pausedAt?"En pause":a.mode==="pomo"?we[a.phase]:"Chrono libre":X==="pomo"?"Pr\xEAt":"Chrono libre",l=a&&a.phase!=="work",u=t.prefs.cycle,d=a?a.count%u:0,m=t.sessions.filter(f=>N(new Date(f.start))===s).slice().reverse();return i`
  <header class="page-head">
    <h1>Focus</h1>
    <p class="sub">${X==="pomo"?`${t.prefs.work} min de travail, ${t.prefs.short} min de pause, une grande pause de ${t.prefs.long} min tous les ${u} pomodoros.`:"Le chrono tourne tant que tu travailles. Chaque minute compte dans tes stats."}</p>
  </header>

  <div class="seg" role="radiogroup" aria-label="Type de minuteur">
    <button role="radio" aria-checked="${X==="pomo"}" data-act="focus-mode" data-mode="pomo" ${a?"disabled":""}>Pomodoro</button>
    <button role="radio" aria-checked="${X==="free"}" data-act="focus-mode" data-mode="free" ${a?"disabled":""}>Chrono libre</button>
  </div>

  <label class="field">
    <span>Cours</span>
    <select data-on-change="focus-course">
      <option value="">Sans cours précis</option>
      ${t.courses.map(f=>i`<option value="${f.id}" ${n===f.id?"selected":""}>${f.name}</option>`)}
    </select>
  </label>

  <div class="ring-wrap ${l?"is-break":""} ${a&&a.pausedAt?"is-paused":""}" style="--c:${l?"var(--muted)":he(t,n)}">
    <svg class="ring" viewBox="0 0 220 220" aria-hidden="true">
      <circle class="track" cx="110" cy="110" r="${ct}"/>
      <circle class="prog" cx="110" cy="110" r="${ct}" stroke-dasharray="${ut.toFixed(1)}" stroke-dashoffset="${(ut*(1-r)).toFixed(1)}" data-ring/>
    </svg>
    <div class="ring-center">
      <p class="phase">${o}</p>
      <p class="clock" data-tick="clock" role="timer" aria-live="off">${ge(t)}</p>
      ${X==="pomo"?i`<p class="dots" aria-label="${d} pomodoros sur ${u} avant la grande pause">${[...Array(u)].map((f,v)=>i`<i class="${v<d?"on":""}"></i>`)}</p>`:""}
      <p class="ring-course">${n?I(t,n):""}</p>
    </div>
  </div>

  <div class="controls">
    ${a?"":i`<button class="btn big" data-act="${X==="pomo"?"timer-start":"timer-free"}">${g.play} Démarrer</button>`}
    ${a&&a.waiting?i`<button class="btn big" data-act="timer-next">${g.play} ${a.phase==="work"?"Reprendre le travail":`Lancer la pause (${ee(a,t.prefs)} min)`}</button>`:""}
    ${a&&a.waiting&&a.phase!=="work"?i`<button class="btn-line" data-act="timer-skip-break">Passer la pause</button>`:""}
    ${a&&!a.waiting&&!a.pausedAt?i`<button class="btn-line big" data-act="timer-pause">${g.pause} Pause</button>`:""}
    ${a&&a.pausedAt?i`<button class="btn big" data-act="timer-resume">${g.play} Reprendre</button>`:""}
    ${a?i`<button class="btn-text" data-act="timer-stop">${g.stop} Terminer</button>`:""}
  </div>

  ${X==="pomo"&&!a?i`<div class="presets">
    <span>Durées</span>
    ${Ns.map(f=>i`<button class="chip ${t.prefs.work===f.w&&t.prefs.short===f.s?"on":""}" data-act="preset" data-w="${f.w}" data-s="${f.s}" data-l="${f.l}">${f.label}</button>`)}
    <a class="chip" href="#/reglages" data-scroll="pomodoro">Perso…</a>
  </div>`:""}

  <section class="block">
    <h2 class="h2">Sessions d'aujourd'hui <small>${y(m.reduce((f,v)=>f+v.min,0))}</small></h2>
    ${m.length?i`<ul class="sessions">${m.map(f=>{let v=new Date(f.start);return i`<li><time>${String(v.getHours()).padStart(2,"0")}:${String(v.getMinutes()).padStart(2,"0")}</time> ${P(t,f.c)} <span class="num">${y(f.min)}</span></li>`})}</ul>`:i`<p class="empty">Aucune session pour l'instant. La première est la plus dure.</p>`}
  </section>`}function dt(e,t){let s=e.querySelector('[data-tick="clock"]');s&&(s.textContent=ge(t));let a=e.querySelector("[data-ring]");a&&a.setAttribute("stroke-dashoffset",(ut*(1-Ze(t.timer,t.prefs))).toFixed(1))}var js={"focus-mode":(e,t,s)=>{X=e.dataset.mode,s.rerender()},"focus-course":(e,t,s)=>{Fe=e.value,s.s.timer?Xt(Fe||null):s.rerender()},"timer-start":()=>fe("pomo",lt),"timer-free":()=>fe("free",lt)};var mt={};z(mt,{render:()=>Is});function as(e,{height:t=150,labelEvery:s=1,highlight:a=-1}={}){let n=e.length,r=320,o=t,l=14,u=22,d=Math.max(60,...e.map(k=>k.v)),m=d<=120?30:d<=300?60:120,f=Math.ceil(d/m)*m,v=34,S=(r-v)/n,L=2,h=k=>l+(o-l-u)*(1-k/f),x="";for(let k=m;k<=f;k+=m)x+=`<line class="grid" x1="${v}" x2="${r}" y1="${h(k).toFixed(1)}" y2="${h(k).toFixed(1)}"/>`,x+=`<text class="axis" x="${v-5}" y="${(h(k)+3.5).toFixed(1)}" text-anchor="end">${k/60>=1&&k%60===0?`${k/60} h`:`${k} min`}</text>`;return e.forEach((k,R)=>{let O=v+R*S+L/2,c=Math.max(1,S-L),p=h(k.v),$=o-u-p,A=Math.min(4,c/2,$),F=R===a?"bar hi":"bar";k.v>0&&(x+=`<path class="${F}" d="M${O},${o-u} V${(p+A).toFixed(1)} Q${O},${p.toFixed(1)} ${O+A},${p.toFixed(1)} H${(O+c-A).toFixed(1)} Q${O+c},${p.toFixed(1)} ${O+c},${(p+A).toFixed(1)} V${o-u} Z"/>`),x+=`<rect class="hit" x="${(v+R*S).toFixed(1)}" y="${l}" width="${S.toFixed(1)}" height="${o-l-u}" data-tip="${me(k.tip)}"/>`,R%s===0&&(x+=`<text class="axis" x="${(v+R*S+S/2).toFixed(1)}" y="${o-6}" text-anchor="middle">${me(k.label)}</text>`)}),x+=`<line class="base" x1="${v}" x2="${r}" y1="${o-u}" y2="${o-u}"/>`,Ye(`<svg class="chart" viewBox="0 0 ${r} ${o}" role="img" aria-label="Graphique en barres">${x}</svg>`)}function Is(e){let{s:t,today:s,plan:a,pro:n}=e,r=n?14:7,o=je(t,a,s,r),l=o.week-o.prevWeek,u=o.days.map(h=>({v:h.min,label:de(h.date).slice(0,2),tip:`${de(h.date)}. ${M(h.date)} : ${y(h.min)}`})),d=[...o.byCourse.entries()].sort((h,x)=>x[1]-h[1]),m=Math.max(1,...d.map(h=>h[1])),f=o.byHour.slice(6,24).map((h,x)=>({v:h,label:`${x+6}h`,tip:`${x+6} h \u2013 ${x+7} h : ${y(h)}`})),v=o.byHour.indexOf(Math.max(...o.byHour)),S=o.slots.done+o.slots.skipped+o.slots.missed,L=h=>S?Math.round(h/S*100):0;return i`
  <header class="page-head">
    <h1>Stats</h1>
    <p class="sub">Tout est calculé à partir de tes sessions de focus et de tes créneaux cochés.</p>
  </header>

  <section class="hero-stat">
    <p class="hero-label">Cette semaine</p>
    <p class="big"><span class="hlt swipe-in" style="--c:var(--hl)">${y(o.week)}</span></p>
    <p class="hero-sub">${o.prevWeek?`${l>=0?"+":"\u2212"}${y(Math.abs(l))} par rapport \xE0 la semaine derni\xE8re`:"Ta premi\xE8re semaine suivie."}</p>
  </section>

  <dl class="numbers">
    <div><dt>Série</dt><dd>${o.streak} j</dd></div>
    <div><dt>Sessions</dt><dd>${o.sessions}</dd></div>
    <div><dt>Durée moyenne</dt><dd>${y(o.avg)}</dd></div>
    <div><dt>Total</dt><dd>${y(o.total)}</dd></div>
  </dl>

  <section class="block">
    <h2 class="h2">Focus par jour <small>${r} derniers jours</small></h2>
    ${as(u,{highlight:u.length-1})}
    <details class="table-view"><summary>Voir les chiffres</summary>
      <table><thead><tr><th>Jour</th><th>Focus</th></tr></thead><tbody>
      ${o.days.slice().reverse().map(h=>i`<tr><td>${de(h.date)}. ${M(h.date)}</td><td>${y(h.min)}</td></tr>`)}
      </tbody></table>
    </details>
  </section>

  <section class="block">
    <h2 class="h2">Créneaux du planning</h2>
    ${S?i`
      <div class="seg-bar" role="img" aria-label="${o.slots.done} faits, ${o.slots.skipped} pas faits, ${o.slots.missed} non cochés">
        ${o.slots.done?i`<i class="s-done" style="flex:${o.slots.done}" data-tip="Faits : ${o.slots.done}"></i>`:""}
        ${o.slots.skipped?i`<i class="s-skip" style="flex:${o.slots.skipped}" data-tip="Pas faits : ${o.slots.skipped}"></i>`:""}
        ${o.slots.missed?i`<i class="s-missed" style="flex:${o.slots.missed}" data-tip="Non cochés : ${o.slots.missed}"></i>`:""}
      </div>
      <ul class="legend">
        <li><i class="s-done"></i>Faits <b>${o.slots.done}</b> (${L(o.slots.done)} %)</li>
        <li><i class="s-skip"></i>Pas faits <b>${o.slots.skipped}</b></li>
        <li><i class="s-missed"></i>Non cochés <b>${o.slots.missed}</b></li>
      </ul>
      <p class="note">${y(o.slots.doneHours*60)} de créneaux validés depuis le début du blocus.</p>`:i`<p class="empty">Coche tes premiers créneaux dans « Aujourd'hui » pour voir ton taux de réussite.</p>`}
  </section>

  ${n?i`
  <section class="block">
    <h2 class="h2">Par cours</h2>
    ${d.length?i`<ul class="hbars">${d.map(([h,x])=>i`<li data-tip="${I(t,h==="libre"?null:h)} : ${y(x)}">
      <span class="hb-name"><i class="sw" style="--c:${he(t,h==="libre"?null:h)}"></i>${at(t,h==="libre"?null:h)}</span>
      <span class="hb-track"><span class="hb-fill" style="width:${(x/m*100).toFixed(1)}%"></span></span>
      <span class="hb-val">${y(x)}</span></li>`)}</ul>`:i`<p class="empty">Lance un minuteur sur un cours pour remplir ce graphique.</p>`}
  </section>
  <section class="block">
    <h2 class="h2">Tes meilleures heures</h2>
    ${o.total?i`<p class="note">C'est vers <b>${v} h</b> que tu travailles le plus. Garde ce créneau pour les cours les plus durs.</p>${as(f,{labelEvery:3,height:130})}`:i`<p class="empty">Il faut quelques sessions pour trouver ton heure de pointe.</p>`}
  </section>`:es("Stats compl\xE8tes","14 jours d'historique, temps pass\xE9 par cours et tes meilleures heures de travail.")}
  `}var ht={};z(ht,{actions:()=>Vs,courseForm:()=>Me,render:()=>Os,saveCourseForm:()=>ft});var Rs=["","Facile","Abordable","Moyen","Costaud","Tr\xE8s dur"],qe=e=>e>0&&e<1?`${Math.round(e*60)} min`:`${Math.round(e)} h`;function Os(e){let{s:t,today:s,plan:a,pro:n}=e,r=t.courses.slice().sort((u,d)=>u.exam<d.exam?-1:1),o=n||t.courses.length<W,l=new Map;for(let u of t.sessions)u.c&&l.set(u.c,(l.get(u.c)||0)+u.min);return i`
  <header class="page-head">
    <h1>Cours</h1>
    <p class="sub">L'objectif d'heures de chaque cours dépend de sa difficulté et de ses ECTS.</p>
  </header>
  <ul class="courses">${r.map(u=>{let d=a.stats.get(u.id),m=ae(s,u.exam),f=d?d.target:0,v=f?Math.min(100,d.done/f*100):0,S=f?Math.min(100-v,d.future/f*100):0;return i`<li class="course">
      <div class="course-top">
        <h2>${P(t,u.id)}</h2>
        <button class="btn-text" data-act="course-edit" data-id="${u.id}">Modifier</button>
      </div>
      <p class="course-meta">Examen ${ss(u,s,m)} · ${u.ects} ECTS · ${Rs[u.diff]}</p>
      ${d?i`
        <div class="prog" role="img" aria-label="${C(d.done)} faites, ${C(d.future)} prévues sur ${C(f)}">
          <span class="p-done" style="width:${v.toFixed(1)}%;--c:${j[u.color%j.length]}"></span>
          <span class="p-fut" style="width:${S.toFixed(1)}%;--c:${j[u.color%j.length]}"></span>
        </div>
        <p class="course-nums"><b>${qe(d.done)}</b> validées · ${qe(d.future)} prévues · objectif ${qe(f)} ${Zt(d.status)}</p>
        ${l.get(u.id)?i`<p class="course-focus">${y(l.get(u.id))} de focus chronométré</p>`:""}
        ${d.status==="late"||d.status==="tight"?i`<p class="course-warn">Il manquera environ ${qe(d.missing)} avant l'examen. Ajoute un créneau du soir ou retire un jour de repos dans Réglages.</p>`:""}`:""}
    </li>`})}</ul>
  <div class="row-actions">
    <button class="btn" data-act="course-new">${g.plus} Ajouter un cours</button>
    <a class="btn-line" href="#/simuler">Simuler ma session</a>
  </div>
  ${o?"":i`<p class="note">Version gratuite : ${W} cours. KotPlan Pro (${H}, à vie) débloque les cours illimités.</p>`}
  `}function Me(e,t){let s=!t,a=t||{name:"",exam:"",diff:3,ects:5,color:Dt(e)};return i`
  <form class="form" data-form="course" data-id="${t?t.id:""}">
    <h2 class="sheet-title">${s?"Nouveau cours":"Modifier le cours"}</h2>
    <label class="field"><span>Nom du cours</span><input name="name" required maxlength="60" value="${a.name}" placeholder="Analyse mathématique" autocomplete="off"></label>
    <div class="two">
      <label class="field"><span>Date de l'examen</span><input name="exam" type="date" required value="${a.exam}"></label>
      <label class="field"><span>ECTS</span><input name="ects" type="number" inputmode="numeric" min="1" max="30" required value="${a.ects}"></label>
    </div>
    <fieldset class="field"><legend>Difficulté pour toi</legend>
      <div class="seg small">${[1,2,3,4,5].map(n=>i`<label><input type="radio" name="diff" value="${n}" ${Number(a.diff)===n?"checked":""}><span>${n}</span></label>`)}</div>
      <small class="hint">1 = facile, 5 = très dur. Un cours dur reçoit plus d'heures.</small>
    </fieldset>
    <fieldset class="field"><legend>Couleur de surligneur</legend>
      <div class="swatches">${j.map((n,r)=>i`<label title="${ze[r]}"><input type="radio" name="color" value="${r}" ${Number(a.color)===r?"checked":""}><i style="--c:${n}"></i><span class="sr">${ze[r]}</span></label>`)}</div>
    </fieldset>
    <p class="form-error" role="alert" hidden></p>
    <div class="sheet-actions">
      <button class="btn" type="submit">${s?"Ajouter":"Enregistrer"}</button>
      ${s?"":i`<button class="btn-text danger" type="button" data-act="course-delete" data-id="${t.id}">Supprimer ce cours</button>`}
    </div>
  </form>`}function ft(e){let t=new FormData(e),s=String(t.get("name")||"").trim(),a=String(t.get("exam")||""),n=Number(t.get("ects")),r=Number(t.get("diff")||3),o=Number(t.get("color")||0);if(!s)return"Donne un nom au cours.";if(!ne(a))return"Choisis la date de l'examen.";if(!(n>=1&&n<=30))return"Les ECTS vont de 1 \xE0 30.";let l=e.dataset.id;return b(u=>{l?Object.assign(Z(l,u),{name:s,exam:a,ects:n,diff:r,color:o}):u.courses.push({id:Pe(),name:s,exam:a,ects:n,diff:r,color:o,grade:null})}),w(l?"Cours mis \xE0 jour, planning recalcul\xE9.":`${s} ajout\xE9 (examen le ${M(a)}).`),null}var Vs={"course-new":(e,t,s)=>{if(!pe(s.s)&&s.s.courses.length>=W){_(i`<h2 class="sheet-title">Plus de ${W} cours ?</h2>
        <p>La version gratuite planifie ${W} cours. KotPlan Pro débloque les cours illimités, les stats complètes, les couleurs et l'export agenda, pour ${H}, une seule fois.</p>
        <div class="sheet-actions">${ts()}<a class="btn-text" href="#/reglages" data-scroll="pro" data-act="close-sheet">J'ai déjà une clé</a></div>`);return}_(Me(s.s,null))},"course-edit":(e,t,s)=>_(Me(s.s,Z(e.dataset.id,s.s))),"course-delete":(e,t,s)=>{let a=Z(e.dataset.id,s.s);a&&_(i`<h2 class="sheet-title">Supprimer « ${a.name} » ?</h2>
      <p>Ses créneaux disparaissent du planning. Tes sessions de focus restent dans les stats.</p>
      <div class="sheet-actions"><button class="btn danger" data-act="course-delete-ok" data-id="${a.id}">Supprimer</button><button class="btn-text" data-act="close-sheet">Annuler</button></div>`)},"course-delete-ok":e=>{b(t=>{t.courses=t.courses.filter(s=>s.id!==e.dataset.id)}),V(),w("Cours supprim\xE9, planning recalcul\xE9.")}};var gt={};z(gt,{actions:()=>qs,render:()=>Fs});var le={known:"",weight:"",target:"10"},Ue=e=>{let t=Number(String(e).replace(",",".").trim());return String(e).trim()===""||Number.isNaN(t)?null:t},ie=(e,t=2)=>e.toLocaleString("fr-BE",{maximumFractionDigits:t});function ns(){let e=Ue(le.known),t=Ue(le.weight),s=Ue(le.target);if(e===null||t===null||s===null)return i`<p class="empty">Remplis les trois champs.</p>`;if(e<0||e>20||s<0||s>20||t<0||t>=100)return i`<p class="form-error">Notes entre 0 et 20, poids entre 0 et 99 %.</p>`;let a=Rt(s,e,t/100);return a<=0?i`<p class="big"><span class="hlt" style="--c:var(--hl)">C'est déjà gagné</span></p><p>Même avec 0 à l'examen, tu atteins ${ie(s)}/20.</p>`:a>20?i`<p class="big fail">${ie(a)}<span class="unit">/20</span></p><p>Impossible d'atteindre ${ie(s)} : avec 20 à l'examen tu aurais ${ie(t/100*e+(1-t/100)*20)}/20.</p>`:i`<p class="big"><span class="hlt swipe-in" style="--c:var(--hl)">${ie(a)}<span class="unit">/20</span></span></p><p>à l'examen pour finir à ${ie(s)}/20.</p>`}function os(e){let t=It(e.courses);return t.avg===null?i`<p class="empty">Ta moyenne pondérée apparaîtra ici.</p>`:i`
      <p class="hero-label">Moyenne pondérée</p>
      <p class="big ${t.avg<10?"fail":""}"><span class="hlt" style="--c:var(--hl)">${ie(t.avg)}<span class="unit">/20</span></span></p>
      <p><b>${t.credits}</b> crédits validés sur ${t.gradedEcts} notés (${t.totalEcts} au total). Un cours est réussi à partir de 10/20.</p>`}function Fs(e){let{s:t}=e;return i`
  <header class="page-head">
    <h1>Simuler</h1>
    <p class="sub">Entre la note que tu vises (ou que tu as eue) dans chaque cours.</p>
  </header>
  <ul class="grades">${t.courses.map(s=>i`<li>
    <span>${P(t,s.id)} <small>${s.ects} ECTS</small></span>
    <label class="grade"><span class="sr">Note pour ${s.name}</span><input type="text" inputmode="decimal" value="${s.grade==null?"":String(s.grade).replace(".",",")}" placeholder="—" data-on-input="grade" data-id="${s.id}"><span>/20</span></label>
  </li>`)}</ul>
  <section class="result-box" aria-live="polite">${os(t)}</section>

  <section class="block">
    <h2 class="h2">Note à viser à un examen</h2>
    <p class="sub">Si tu as déjà une note (travaux, labo, partiel) qui compte pour une partie du cours.</p>
    <div class="three">
      <label class="field"><span>Note déjà obtenue</span><input inputmode="decimal" value="${le.known}" data-on-input="need" data-k="known" placeholder="12"></label>
      <label class="field"><span>Elle compte pour (%)</span><input inputmode="decimal" value="${le.weight}" data-on-input="need" data-k="weight" placeholder="30"></label>
      <label class="field"><span>Note finale visée</span><input inputmode="decimal" value="${le.target}" data-on-input="need" data-k="target"></label>
    </div>
    <div class="need-result" aria-live="polite">${ns()}</div>
  </section>`}var qs={grade:e=>{let t=Ue(e.value),s=t!==null&&(t<0||t>20);if(e.setAttribute("aria-invalid",s?"true":"false"),s)return;b(n=>{let r=n.courses.find(o=>o.id===e.dataset.id);r&&(r.grade=t)},{silent:!0});let a=document.querySelector(".result-box");a&&(a.innerHTML=String(os(T())))},need:e=>{le[e.dataset.k]=e.value;let t=document.querySelector(".need-result");t&&(t.innerHTML=String(ns()))}};var $t={};z($t,{actions:()=>Hs,render:()=>_s});var Us=()=>new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d+/,""),bt=e=>e.replace(/-/g,""),rs=e=>String(e).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");function is(e,t,s=0){let[a,n]=t.split(":").map(Number),r=a*60+n+s,o=e;for(;r>=1440;)r-=1440,o=E(o,1);return`${bt(o)}T${String(Math.floor(r/60)).padStart(2,"0")}${String(r%60).padStart(2,"0")}00`}function ls(e,t,s){let a=o=>e.courses.find(l=>l.id===o)?.name||"R\xE9vision libre",n=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//KotPlan//Planning de blocus//FR","CALSCALE:GREGORIAN","X-WR-CALNAME:Blocus KotPlan"],r=Us();for(let o of t.days)if(!(o.date<s)){for(let l of o.exams)n.push("BEGIN:VEVENT",`UID:exam-${l}-${o.date}@kotplan`,`DTSTAMP:${r}`,`DTSTART;VALUE=DATE:${bt(o.date)}`,`DTEND;VALUE=DATE:${bt(E(o.date,1))}`,`SUMMARY:${rs(`Examen : ${a(l)}`)}`,"END:VEVENT");for(let l of o.slots){if(l.status!=="planned"&&l.status!=="free")continue;let u=e.settings.slots[l.key]?.t||"09:00";n.push("BEGIN:VEVENT",`UID:${l.id.replace("|","-")}@kotplan`,`DTSTAMP:${r}`,`DTSTART:${is(o.date,u)}`,`DTEND:${is(o.date,u,Math.round(l.h*60))}`,`SUMMARY:${rs(`Blocus : ${l.course?a(l.course):"R\xE9vision libre"}`)}`,"DESCRIPTION:Planifi\xE9 par KotPlan","END:VEVENT")}}return n.push("END:VCALENDAR"),n.join(`\r
`)}var cs="https://kotplancontact-gif.github.io/app/",Ee=(e,t,s,a,n,r="")=>i`<label class="field inline"><span>${e}</span>
  <span class="num-in"><input type="number" inputmode="numeric" min="${a}" max="${n}" value="${s}" data-on-change="set" data-path="${t}" data-type="number">${r}</span></label>`,Te=(e,t,s,a="")=>i`<label class="toggle"><input type="checkbox" ${s?"checked":""} data-on-change="set" data-path="${t}"><span class="t-ui" aria-hidden="true"></span><span class="t-text">${e}${a?i`<small>${a}</small>`:""}</span></label>`;function _s(e){let{s:t,pro:s}=e,a=t.prefs;return i`
  <header class="page-head"><h1>Réglages</h1><p class="sub">Tout reste sur ton appareil. Aucun compte, aucune donnée envoyée.</p></header>

  <section class="block" id="toi">
    <h2 class="h2">Toi</h2>
    <label class="field"><span>Prénom (pour l'écran d'accueil)</span><input value="${a.name}" maxlength="24" data-on-change="set" data-path="prefs.name" placeholder="Facultatif" autocomplete="given-name"></label>
  </section>

  <section class="block" id="rythme">
    <h2 class="h2">Ton rythme</h2>
    <label class="field"><span>Début du blocus</span><input type="date" value="${t.settings.start}" data-on-change="start"></label>
    <div class="slots-set">${xe.map(n=>{let r=t.settings.slots[n.key];return i`<div class="slot-set ${r.on?"":"is-off"}">
        ${Te(n.label,`settings.slots.${n.key}.on`,r.on)}
        <label class="field inline"><span>Début</span><input type="time" value="${r.t}" data-on-change="set" data-path="settings.slots.${n.key}.t" ${r.on?"":"disabled"}></label>
        ${Ee("Dur\xE9e",`settings.slots.${n.key}.h`,r.h,1,6," h")}
      </div>`})}</div>
  </section>

  <section class="block" id="repos">
    <h2 class="h2">Jours de repos</h2>
    <ul class="chips">${t.settings.off.slice().sort().map(n=>i`<li class="chip on">${ve(n)} <button data-act="off-remove" data-d="${n}" aria-label="Retirer ${ve(n)}">${g.x}</button></li>`)}
      ${t.settings.off.length?"":i`<li class="empty">Aucun jour de repos. Un par semaine, c'est mieux pour tenir.</li>`}</ul>
    <div class="add-row"><input type="date" id="off-new" aria-label="Date du jour de repos"><button class="btn-line" data-act="off-add">${g.plus} Ajouter</button></div>
  </section>

  <section class="block" id="pomodoro">
    <h2 class="h2">Pomodoro</h2>
    <div class="grid2">
      ${Ee("Travail","prefs.work",a.work,5,180," min")}
      ${Ee("Petite pause","prefs.short",a.short,1,60," min")}
      ${Ee("Grande pause","prefs.long",a.long,5,90," min")}
      ${Ee("Grande pause tous les","prefs.cycle",a.cycle,2,8," pomodoros")}
    </div>
    ${Te("Encha\xEEner automatiquement","prefs.autoNext",a.autoNext,"La pause d\xE9marre seule \xE0 la fin du travail, et inversement.")}
    ${Te("Son de fin","prefs.sound",a.sound)}
    ${Te("Vibration","prefs.vibrate",a.vibrate,"Sur t\xE9l\xE9phone Android.")}
    ${Te("Notifications","prefs.notify",a.notify,"Pr\xE9viens-moi quand une phase se termine, m\xEAme si l'app est en arri\xE8re-plan.")}
  </section>

  <section class="block" id="apparence">
    <h2 class="h2">Apparence</h2>
    <div class="seg" role="radiogroup" aria-label="Thème">
      ${[["auto","Auto"],["light","Clair"],["dark","Sombre"]].map(([n,r])=>i`<button role="radio" aria-checked="${a.theme===n}" data-act="theme" data-v="${n}">${r}</button>`)}
    </div>
    <p class="field-label">Couleur de l'encre ${s?"":i`<span class="tag pro">${g.lock} Pro</span>`}</p>
    <div class="accents">${Object.entries(ke).map(([n,r])=>i`<button class="accent ${a.accent===n?"on":""}" data-act="accent" data-v="${n}" ${s||n==="encre"?"":"disabled"} style="--a:${r.light};--ad:${r.dark}"><i></i>${r.name}</button>`)}</div>
  </section>

  <section class="block pro-box" id="pro">
    <h2 class="h2">KotPlan Pro</h2>
    ${s?i`<p class="pro-ok">${g.check} Pro est activé sur cet appareil. Merci !</p>
      <p class="note">Clé : ••••${me(t.pro.key.slice(-4))}</p>
      <button class="btn-text" data-act="pro-remove">Retirer la clé de cet appareil</button>`:i`<ul class="perks"><li>Cours illimités (gratuit : 3)</li><li>Stats complètes : 14 jours, par cours, meilleures heures</li><li>Export vers Google Agenda / Apple Calendrier</li><li>Couleurs d'encre</li></ul>
      <p><b>${H}</b>, une seule fois. Pas d'abonnement.</p>
      <div class="row-actions"><a class="btn" href="${Ie}" target="_blank" rel="noopener">Acheter Pro</a></div>
      <label class="field"><span>Déjà acheté ? Colle la clé reçue par e-mail</span><input id="pro-key" autocomplete="off" spellcheck="false" placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX"></label>
      <button class="btn-line" data-act="pro-activate">Activer</button>
      <p class="form-error" id="pro-error" role="alert" hidden></p>`}
  </section>

  <section class="block" id="agenda">
    <h2 class="h2">Agenda</h2>
    <p class="note">Ajoute tous tes créneaux et examens à Google Agenda, Apple Calendrier ou Outlook.</p>
    <button class="btn-line" data-act="ics" ${s?"":"disabled"}>Exporter le planning (.ics)</button> ${s?"":i`<span class="tag pro">${g.lock} Pro</span>`}
  </section>

  <section class="block" id="donnees">
    <h2 class="h2">Sauvegarde</h2>
    <p class="note">Tes données vivent dans ce navigateur. Garde une copie avant de changer de téléphone.</p>
    <div class="row-actions">
      <button class="btn-line" data-act="backup">Télécharger une sauvegarde</button>
      <label class="btn-line file-btn">Restaurer<input type="file" accept="application/json,.json" data-on-change="restore" hidden></label>
    </div>
  </section>

  <section class="block">
    <h2 class="h2">Faire connaître KotPlan</h2>
    <button class="btn-line" data-act="share">${g.share} Partager l'app</button>
  </section>

  <section class="block danger-zone">
    <button class="btn-text danger" data-act="reset">Tout effacer et recommencer</button>
    <p class="note">KotPlan · v1.1 · © ${new Date().getFullYear()} KotPlan, tous droits réservés · <a href="https://kotplancontact-gif.github.io/" target="_blank" rel="noopener">outils gratuits pour étudiants</a></p>
  </section>`}function Bs(e,t,s){let a=t.split("."),n=e;for(let r of a.slice(0,-1))n=n[r];n[a[a.length-1]]=s}var Hs={set:async e=>{let t;if(e.type==="checkbox")t=e.checked;else if(e.dataset.type==="number"){t=Math.round(Number(e.value));let s=Number(e.min),a=Number(e.max);if(!Number.isFinite(t))return;t=Math.min(a,Math.max(s,t)),e.value=t}else t=e.value.trim();if(e.dataset.path==="prefs.notify"&&t){if(!("Notification"in window)){w("Ton navigateur ne g\xE8re pas les notifications."),e.checked=!1;return}if(await Notification.requestPermission()!=="granted"){w("Notifications refus\xE9es. Tu peux les autoriser dans les r\xE9glages du navigateur."),e.checked=!1;return}}b(s=>Bs(s,e.dataset.path,t))},start:e=>{ne(e.value)&&(b(t=>{t.settings.start=e.value}),w(`Le planning d\xE9marre le ${M(e.value)}.`))},"off-add":()=>{let e=document.getElementById("off-new");if(!e||!ne(e.value))return w("Choisis une date.");b(t=>{t.settings.off.includes(e.value)||t.settings.off.push(e.value)}),w("Jour de repos ajout\xE9, planning recalcul\xE9.")},"off-remove":e=>b(t=>{t.settings.off=t.settings.off.filter(s=>s!==e.dataset.d)}),theme:e=>b(t=>{t.prefs.theme=e.dataset.v}),accent:(e,t,s)=>{!s.pro&&e.dataset.v!=="encre"||b(a=>{a.prefs.accent=e.dataset.v})},"pro-activate":async e=>{let t=document.getElementById("pro-key"),s=document.getElementById("pro-error");e.disabled=!0,e.textContent="V\xE9rification\u2026";let a=await st(t.value,{activate:!0});a.ok?(b(n=>{n.pro={key:t.value.trim(),at:Date.now(),checked:Date.now()}}),w("KotPlan Pro activ\xE9. Bon blocus !")):(e.disabled=!1,e.textContent="Activer",s.hidden=!1,s.textContent=a.message)},"pro-remove":()=>b(e=>{e.pro=null}),ics:(e,t,s)=>{s.pro&&(Qe("blocus-kotplan.ics",ls(s.s,s.plan,s.today),"text/calendar;charset=utf-8"),w("Fichier agenda t\xE9l\xE9charg\xE9 : ouvre-le pour l'importer."))},backup:(e,t,s)=>{Qe(`kotplan-sauvegarde-${s.today}.json`,JSON.stringify(s.s),"application/json")},restore:async e=>{let t=e.files?.[0];if(t){try{let s=JSON.parse(await t.text());if(!s||!Array.isArray(s.courses)||!s.settings)throw new Error("format");At(s),w("Sauvegarde restaur\xE9e.")}catch{w("Ce fichier n'est pas une sauvegarde KotPlan.")}e.value=""}},share:async()=>{let e={title:"KotPlan",text:"Mon planning de blocus se fait (et se refait) tout seul :",url:cs};try{navigator.share?await navigator.share(e):(await navigator.clipboard.writeText(cs),w("Lien copi\xE9."))}catch{}},reset:()=>_(i`<h2 class="sheet-title">Tout effacer ?</h2>
      <p>Cours, planning, sessions et réglages seront supprimés de cet appareil. C'est définitif, sauf si tu as une sauvegarde.</p>
      <div class="sheet-actions"><button class="btn danger" data-act="reset-ok">Tout effacer</button><button class="btn-text" data-act="close-sheet">Annuler</button></div>`),"reset-ok":()=>{let e=T().pro;Pt(),e&&b(t=>t.pro=e),V(),location.hash="#/"}};var vt={};z(vt,{actions:()=>Js,render:()=>Ws});var J=0;function Xs(){return i`<section class="welcome">
    <h1 class="w-title">Ton blocus, planifié en deux minutes. <span class="hlt swipe-in" style="--c:var(--hl)">Et replanifié</span> quand la vie s'en mêle.</h1>
    <p class="w-lede">Entre tes examens. KotPlan répartit tes révisions jour par jour, te dit quoi travailler maintenant, et recalcule tout dès que tu sautes une séance.</p>
    <figure class="demo" aria-label="Exemple d'écran">
      <p class="now-when">Ce matin · 3 h · examen dans 8 jours</p>
      <p class="demo-course"><span class="hlt" style="--c:${j[0]}">Analyse</span></p>
      <div class="demo-pills"><span class="pill" style="--c:${j[1]}"><span class="pill-name">Chimie</span><small>3 h</small></span><span class="pill" style="--c:${j[2]}"><span class="pill-name">Droit</span><small>2 h</small></span></div>
    </figure>
    <ul class="w-points">
      <li><b>Priorité aux cours durs et proches</b>, la veille de chaque examen réservée au bon cours.</li>
      <li><b>Pomodoro intégré</b> et suivi de ton temps réel par cours.</li>
      <li><b>Hors-ligne, sans compte.</b> Tes données restent sur ton téléphone.</li>
    </ul>
    <button class="btn big" data-act="w-next">Créer mon planning ${g.next}</button>
  </section>`}function Ks(e){let t=e.courses.slice().sort((a,n)=>a.exam<n.exam?-1:1),s=!pe(e)&&e.courses.length>=W;return i`<section class="welcome">
    <p class="step">Étape 1 sur 2</p>
    <h1>Tes examens</h1>
    <p class="sub">Ajoute-les un par un. Tu pourras tout modifier ensuite.</p>
    ${t.length?i`<ul class="w-list">${t.map(a=>i`<li>${P(e,a.id)}<span>${M(a.exam)} · ${a.ects} ECTS · difficulté ${a.diff}</span><button class="btn-text" data-act="course-edit" data-id="${a.id}">Modifier</button></li>`)}</ul>`:""}
    ${s?i`<p class="note">Version gratuite : ${W} cours. Débloque les cours illimités avec Pro (${H}) dans Réglages, après avoir créé ton planning.</p>`:i`<div class="inline-form">${Me(e,null)}</div>`}
    ${t.length?i`<button class="btn big" data-act="w-next">Continuer ${g.next}</button>`:""}
  </section>`}function Gs(e){let t=e.courses.reduce((n,r)=>r.exam>n?r.exam:n,""),s=Number((t||N()).slice(0,4)),a=[`${s-1}-12-25`,`${s}-01-01`,`${s}-12-25`].filter(n=>n>=e.settings.start&&n<t);return i`<section class="welcome">
    <p class="step">Étape 2 sur 2</p>
    <h1>Ton rythme</h1>
    <label class="field"><span>Je commence à réviser le</span><input type="date" value="${e.settings.start}" data-on-change="start"></label>
    <p class="field-label">Mes créneaux</p>
    <div class="w-slots">${xe.map(n=>{let r=e.settings.slots[n.key];return i`<label class="toggle"><input type="checkbox" ${r.on?"checked":""} data-on-change="set" data-path="settings.slots.${n.key}.on"><span class="t-ui" aria-hidden="true"></span><span class="t-text">${n.label} <small>${r.h} h, dès ${r.t}</small></span></label>`})}</div>
    ${a.length?i`<p class="field-label">Jours de repos</p><div class="w-slots">${a.map(n=>i`<label class="toggle"><input type="checkbox" ${e.settings.off.includes(n)?"checked":""} data-on-change="w-off" data-d="${n}"><span class="t-ui" aria-hidden="true"></span><span class="t-text">${n.endsWith("12-25")?"No\xEBl":"Nouvel An"} <small>${M(n)}</small></span></label>`)}</div>`:""}
    <label class="field"><span>Ton prénom (facultatif)</span><input value="${e.prefs.name}" maxlength="24" data-on-change="set" data-path="prefs.name" autocomplete="given-name"></label>
    <button class="btn big" data-act="w-finish">${g.check} Générer mon planning</button>
    <button class="btn-text" data-act="w-back">Retour aux examens</button>
  </section>`}function Ws(e){let{s:t}=e;return J===0&&t.courses.length&&(J=1),J===0?Xs():J===1?Ks(t):Gs(t)}var Js={"w-next":(e,t,s)=>{if(J=Math.min(2,J+1),J===2){let a=s.s.courses.reduce((n,r)=>r.exam>n?r.exam:n,"");b(n=>{for(let r of[`${Number(a.slice(0,4))-1}-12-25`,`${a.slice(0,4)}-01-01`])ne(r)&&r>=n.settings.start&&r<a&&!n.settings.off.includes(r)&&n.settings.off.push(r)})}else s.rerender();window.scrollTo(0,0)},"w-back":(e,t,s)=>{J=1,s.rerender()},"w-off":e=>b(t=>{let s=e.dataset.d;t.settings.off=e.checked?[...new Set([...t.settings.off,s])]:t.settings.off.filter(a=>a!==s)}),"w-finish":()=>{b(e=>{e.onboarded=!0,!(e.settings.start>N())&&e.settings.start<E(N(),-30)&&(e.settings.start=N())}),J=0,location.hash="#/",w("Ton planning est pr\xEAt.")}};var xt={"":ot,planning:it,focus:pt,stats:mt,cours:ht,simuler:gt,reglages:$t,bienvenue:vt},Ce=document.getElementById("view"),K=null,us=null,_e=null,Be=null,ps=()=>location.hash.replace(/^#\/?/,"").split("?")[0];function Ys(){let e=T(),t=N(),s=Lt(e,t),a=new Date().getHours(),n=Le(s.days.find(r=>r.date===t),a);return{s:e,today:t,plan:s,pro:pe(e),hour:a,suggestC:n?.course||null,rerender:be}}function zs(e){let t=document.documentElement;e.theme==="auto"?delete t.dataset.theme:t.dataset.theme=e.theme;let s=ke[e.accent]||ke.encre;t.style.setProperty("--accent-l",s.light),t.style.setProperty("--accent-d",s.dark)}function ms(){let e=T(),t=e.timer;document.title=t&&!t.waiting?`${ge(e)} \xB7 ${I(e,t.c)} \u2014 KotPlan`:"KotPlan \xB7 planning de blocus"}function be(){let e=T(),t=ps();t in xt||(t=""),(!e.courses.length||!e.onboarded)&&t!=="reglages"?t="bienvenue":t==="bienvenue"&&(t="");let s=xt[t];K=Ys();let a=t!==us;Ce.innerHTML=String(s.render(K)),document.body.dataset.route=t||"today",document.querySelectorAll(".tabs a").forEach(n=>n.dataset.r===t?n.setAttribute("aria-current","page"):n.removeAttribute("aria-current")),s.mount?.(Ce,K,a),_e&&Ce.querySelector(`[data-slot="${_e}"]`)?.classList.add("just"),_e=null,Be?(document.getElementById(Be)?.scrollIntoView({block:"start"}),Be=null):a&&t!=="planning"&&window.scrollTo(0,0),a&&(us=t),zs(e.prefs),ms()}function ds(e,t){let[s]=e.split("|"),a=K.plan.days.find(n=>n.date===s)?.slots.find(n=>n.id===e);a&&(V(),_e=t==="done"?e:null,b(n=>{n.log[e]={c:a.course,st:t,h:a.h,at:Date.now()}}),w(t==="done"?`Bien jou\xE9 : +${C(a.h)}${a.course?` en ${I(T(),a.course)}`:""}.`:`Pas grave : ces ${C(a.h)} sont replac\xE9es dans les prochains jours.`))}var Qs={"close-sheet":()=>V(),"slot-sheet":e=>{let t=rt(K,e.dataset.slot);t&&_(t)},"slot-done":e=>ds(e.dataset.slot,"done"),"slot-skip":e=>ds(e.dataset.slot,"skip"),"slot-reset":e=>{V(),b(t=>{delete t.log[e.dataset.slot]}),w("Cr\xE9neau remis \xE0 z\xE9ro.")},"focus-start":e=>{V(),fe("pomo",e.dataset.c||null,e.dataset.slot||null),location.hash="#/focus"},"focus-free":()=>{fe("free",null),location.hash="#/focus"},"timer-pause":()=>qt(),"timer-resume":()=>Ut(),"timer-next":()=>_t(),"timer-skip-break":()=>Bt(),"timer-stop":()=>{let e=T().timer?.slot,t=Ht();t&&w(`${y(t.min)} de focus enregistr\xE9es.`),e&&!T().log[e]&&t&&_(i`<h2 class="sheet-title">Créneau terminé ?</h2><p>Tu as travaillé ${y(t.min)} sur ${I(T(),t.c)}. Tu valides le créneau du planning ?</p>
        <div class="sheet-actions"><button class="btn" data-act="slot-done" data-slot="${e}">Oui, c'est fait</button><button class="btn-text" data-act="close-sheet">Pas encore</button></div>`)},preset:e=>b(t=>{t.prefs.work=Number(e.dataset.w),t.prefs.short=Number(e.dataset.s),t.prefs.long=Number(e.dataset.l)})},yt=Object.assign({},Qs,...Object.values(xt).map(e=>e.actions||{}));document.addEventListener("click",e=>{let t=e.target.closest("a[data-scroll]");t&&(Be=t.dataset.scroll);let s=e.target.closest("[data-act]");if(!s||s.disabled)return;let a=yt[s.dataset.act];a&&(s.tagName==="BUTTON"&&e.preventDefault(),a(s,e,K))});document.addEventListener("change",e=>{let t=e.target.closest("[data-on-change]");t&&yt[t.dataset.onChange]?.(t,e,K)});document.addEventListener("input",e=>{let t=e.target.closest("[data-on-input]");t&&yt[t.dataset.onInput]?.(t,e,K)});document.addEventListener("submit",e=>{let t=e.target.closest('form[data-form="course"]');if(!t)return;e.preventDefault();let s=ft(t),a=t.querySelector(".form-error");s?(a.hidden=!1,a.textContent=s):V()});document.getElementById("sheet").addEventListener("click",e=>{e.target.id==="sheet"&&V()});var te=document.getElementById("tip");function fs(e){let t=e.target.closest?.("[data-tip]");if(!t)return te.hidden=!0;te.textContent=t.dataset.tip,te.hidden=!1;let s=Math.min(window.innerWidth-te.offsetWidth-8,Math.max(8,e.clientX-te.offsetWidth/2));te.style.transform=`translate(${s}px, ${Math.max(8,e.clientY-te.offsetHeight-14)}px)`}document.addEventListener("pointermove",fs);document.addEventListener("pointerdown",fs);document.addEventListener("scroll",()=>te.hidden=!0,{passive:!0});function hs(e){let t=T(),s=t.timer;t.prefs.sound&&Kt(),t.prefs.vibrate&&navigator.vibrate?.([220,120,220]);let[a,n]=e==="work-done"?["Pomodoro termin\xE9",`${s.phase==="long"?"Grande pause":"Pause"} de ${ee(s,t.prefs)} min. L\xE8ve-toi, bois un verre d'eau.`]:["Pause termin\xE9e","On s'y remet ?"];t.prefs.notify&&document.hidden&&Gt(a,n),w(`${a}. ${n}`)}setInterval(()=>{let e=T();if(K&&N()!==K.today)return be();if(!e.timer)return;let t=et();if(t)return hs(t);if(e.timer.waiting)return;let s=ge(e);Ce.querySelectorAll('[data-tick="clock"]').forEach(a=>a.textContent=s),ps()==="focus"&&dt(Ce,e),ms()},1e3);async function gs(){let e=T().pro,t=await Yt(e);t==="valid"?b(s=>s.pro&&(s.pro.checked=Date.now()),{silent:!0}):t==="revoked"&&(b(s=>s.pro=null),w("Ta cl\xE9 KotPlan Pro n'est plus valable : Pro a \xE9t\xE9 d\xE9sactiv\xE9."))}document.addEventListener("visibilitychange",()=>{if(document.visibilityState!=="visible")return;let e=et();e&&hs(e),be(),gs()});window.addEventListener("hashchange",()=>{V(),be()});Ct(be);be();gs();if("serviceWorker"in navigator&&location.protocol==="https:"){let e=!!navigator.serviceWorker.controller,t=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{!e||t||(t=!0,location.reload())}),navigator.serviceWorker.register("sw.js").catch(()=>{})}
