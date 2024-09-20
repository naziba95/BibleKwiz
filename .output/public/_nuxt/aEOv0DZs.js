import{s as Re,u as ce,_ as Be,x as qe,y as Ve,z as $,c as le,a as g,t as _,b as O,A as F,F as Qe,p as Ue,B as $e,o as ae}from"./fNgEoHnC.js";import{u as He}from"./BfqfkKoQ.js";import{u as Ge}from"./CttbmQ9R.js";const L=/^[a-z0-9]+(-[a-z0-9]+)*$/,q=(e,t,n,r="")=>{const o=e.split(":");if(e.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;r=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const c=o.pop(),l=o.pop(),a={provider:o.length>0?o[0]:r,prefix:l,name:c};return t&&!D(a)?null:a}const s=o[0],i=s.split("-");if(i.length>1){const c={provider:r,prefix:i.shift(),name:i.join("-")};return t&&!D(c)?null:c}if(n&&r===""){const c={provider:r,prefix:"",name:s};return t&&!D(c,n)?null:c}return null},D=(e,t)=>e?!!((e.provider===""||e.provider.match(L))&&(t&&e.prefix===""||e.prefix.match(L))&&e.name.match(L)):!1,Ce=Object.freeze({left:0,top:0,width:16,height:16}),B=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),V=Object.freeze({...Ce,...B}),K=Object.freeze({...V,body:"",hidden:!1});function Ke(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const r=((e.rotate||0)+(t.rotate||0))%4;return r&&(n.rotate=r),n}function ue(e,t){const n=Ke(e,t);for(const r in K)r in B?r in e&&!(r in n)&&(n[r]=B[r]):r in t?n[r]=t[r]:r in e&&(n[r]=e[r]);return n}function Je(e,t){const n=e.icons,r=e.aliases||Object.create(null),o=Object.create(null);function s(i){if(n[i])return o[i]=[];if(!(i in o)){o[i]=null;const c=r[i]&&r[i].parent,l=c&&s(c);l&&(o[i]=[c].concat(l))}return o[i]}return Object.keys(n).concat(Object.keys(r)).forEach(s),o}function We(e,t,n){const r=e.icons,o=e.aliases||Object.create(null);let s={};function i(c){s=ue(r[c]||o[c],s)}return i(t),n.forEach(i),ue(e,s)}function ke(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(o=>{t(o,null),n.push(o)});const r=Je(e);for(const o in r){const s=r[o];s&&(t(o,We(e,o,s)),n.push(o))}return n}const Xe={provider:"",aliases:{},not_found:{},...Ce};function H(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function je(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!H(e,Xe))return null;const n=t.icons;for(const o in n){const s=n[o];if(!o.match(L)||typeof s.body!="string"||!H(s,K))return null}const r=t.aliases||Object.create(null);for(const o in r){const s=r[o],i=s.parent;if(!o.match(L)||typeof i!="string"||!n[i]&&!r[i]||!H(s,K))return null}return t}const fe=Object.create(null);function Ye(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function C(e,t){const n=fe[e]||(fe[e]=Object.create(null));return n[t]||(n[t]=Ye(e,t))}function te(e,t){return je(t)?ke(t,(n,r)=>{r?e.icons[n]=r:e.missing.add(n)}):[]}function Ze(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch{}return!1}let P=!1;function _e(e){return typeof e=="boolean"&&(P=e),P}function et(e){const t=typeof e=="string"?q(e,!0,P):e;if(t){const n=C(t.provider,t.prefix),r=t.name;return n.icons[r]||(n.missing.has(r)?null:void 0)}}function tt(e,t){const n=q(e,!0,P);if(!n)return!1;const r=C(n.provider,n.prefix);return Ze(r,n.name,t)}function nt(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),P&&!t&&!e.prefix){let o=!1;return je(e)&&(e.prefix="",ke(e,(s,i)=>{i&&tt(s,i)&&(o=!0)})),o}const n=e.prefix;if(!D({provider:t,prefix:n,name:"a"}))return!1;const r=C(t,n);return!!te(r,e)}const Te=Object.freeze({width:null,height:null}),Le=Object.freeze({...Te,...B}),ot=/(-?[0-9.]*[0-9]+[0-9.]*)/g,rt=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function de(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const r=e.split(ot);if(r===null||!r.length)return e;const o=[];let s=r.shift(),i=rt.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?o.push(s):o.push(Math.ceil(c*t*n)/n)}else o.push(s);if(s=r.shift(),s===void 0)return o.join("");i=!i}}function st(e,t="defs"){let n="";const r=e.indexOf("<"+t);for(;r>=0;){const o=e.indexOf(">",r),s=e.indexOf("</"+t);if(o===-1||s===-1)break;const i=e.indexOf(">",s);if(i===-1)break;n+=e.slice(o+1,s).trim(),e=e.slice(0,r).trim()+e.slice(i+1)}return{defs:n,content:e}}function it(e,t){return e?"<defs>"+e+"</defs>"+t:t}function ct(e,t,n){const r=st(e);return it(r.defs,t+r.content+n)}const lt=e=>e==="unset"||e==="undefined"||e==="none";function at(e,t){const n={...V,...e},r={...Le,...t},o={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,r].forEach(y=>{const f=[],k=y.hFlip,I=y.vFlip;let w=y.rotate;k?I?w+=2:(f.push("translate("+(o.width+o.left).toString()+" "+(0-o.top).toString()+")"),f.push("scale(-1 1)"),o.top=o.left=0):I&&(f.push("translate("+(0-o.left).toString()+" "+(o.height+o.top).toString()+")"),f.push("scale(1 -1)"),o.top=o.left=0);let b;switch(w<0&&(w-=Math.floor(w/4)*4),w=w%4,w){case 1:b=o.height/2+o.top,f.unshift("rotate(90 "+b.toString()+" "+b.toString()+")");break;case 2:f.unshift("rotate(180 "+(o.width/2+o.left).toString()+" "+(o.height/2+o.top).toString()+")");break;case 3:b=o.width/2+o.left,f.unshift("rotate(-90 "+b.toString()+" "+b.toString()+")");break}w%2===1&&(o.left!==o.top&&(b=o.left,o.left=o.top,o.top=b),o.width!==o.height&&(b=o.width,o.width=o.height,o.height=b)),f.length&&(s=ct(s,'<g transform="'+f.join(" ")+'">',"</g>"))});const i=r.width,c=r.height,l=o.width,a=o.height;let u,p;i===null?(p=c===null?"1em":c==="auto"?a:c,u=de(p,l/a)):(u=i==="auto"?l:i,p=c===null?de(u,a/l):c==="auto"?a:c);const d={},m=(y,f)=>{lt(f)||(d[y]=f.toString())};m("width",u),m("height",p);const v=[o.left,o.top,l,a];return d.viewBox=v.join(" "),{attributes:d,viewBox:v,body:s}}const ut=/\sid="(\S+)"/g,ft="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let dt=0;function pt(e,t=ft){const n=[];let r;for(;r=ut.exec(e);)n.push(r[1]);if(!n.length)return e;const o="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof t=="function"?t(s):t+(dt++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");e=e.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+o+"$3")}),e=e.replace(new RegExp(o,"g"),""),e}const J=Object.create(null);function ht(e,t){J[e]=t}function W(e){return J[e]||J[""]}function ne(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const oe=Object.create(null),T=["https://api.simplesvg.com","https://api.unisvg.com"],z=[];for(;T.length>0;)T.length===1||Math.random()>.5?z.push(T.shift()):z.push(T.pop());oe[""]=ne({resources:["https://api.iconify.design"].concat(z)});function gt(e,t){const n=ne(t);return n===null?!1:(oe[e]=n,!0)}function re(e){return oe[e]}const mt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let pe=mt();function yt(e,t){const n=re(e);if(!n)return 0;let r;if(!n.maxURL)r=0;else{let o=0;n.resources.forEach(i=>{o=Math.max(o,i.length)});const s=t+".json?icons=";r=n.maxURL-o-n.path.length-s.length}return r}function bt(e){return e===404}const xt=(e,t,n)=>{const r=[],o=yt(e,t),s="icons";let i={type:s,provider:e,prefix:t,icons:[]},c=0;return n.forEach((l,a)=>{c+=l.length+1,c>=o&&a>0&&(r.push(i),i={type:s,provider:e,prefix:t,icons:[]},c=l.length),i.icons.push(l)}),r.push(i),r};function wt(e){if(typeof e=="string"){const t=re(e);if(t)return t.path}return"/"}const vt=(e,t,n)=>{if(!pe){n("abort",424);return}let r=wt(t.provider);switch(t.type){case"icons":{const s=t.prefix,c=t.icons.join(","),l=new URLSearchParams({icons:c});r+=s+".json?"+l.toString();break}case"custom":{const s=t.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let o=503;pe(e+r).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(bt(i)?"abort":"next",i)});return}return o=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",o)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",o)})},It={prepare:xt,send:vt};function St(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((o,s)=>o.provider!==s.provider?o.provider.localeCompare(s.provider):o.prefix!==s.prefix?o.prefix.localeCompare(s.prefix):o.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return e.forEach(o=>{if(r.name===o.name&&r.prefix===o.prefix&&r.provider===o.provider)return;r=o;const s=o.provider,i=o.prefix,c=o.name,l=n[s]||(n[s]=Object.create(null)),a=l[i]||(l[i]=C(s,i));let u;c in a.icons?u=t.loaded:i===""||a.missing.has(c)?u=t.missing:u=t.pending;const p={provider:s,prefix:i,name:c};u.push(p)}),t}function Pe(e,t){e.forEach(n=>{const r=n.loaderCallbacks;r&&(n.loaderCallbacks=r.filter(o=>o.id!==t))})}function Ct(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const r=e.provider,o=e.prefix;t.forEach(s=>{const i=s.icons,c=i.pending.length;i.pending=i.pending.filter(l=>{if(l.prefix!==o)return!0;const a=l.name;if(e.icons[a])i.loaded.push({provider:r,prefix:o,name:a});else if(e.missing.has(a))i.missing.push({provider:r,prefix:o,name:a});else return n=!0,!0;return!1}),i.pending.length!==c&&(n||Pe([e],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let kt=0;function jt(e,t,n){const r=kt++,o=Pe.bind(null,n,r);if(!t.pending.length)return o;const s={id:r,icons:t,callback:e,abort:o};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),o}function _t(e,t=!0,n=!1){const r=[];return e.forEach(o=>{const s=typeof o=="string"?q(o,t,n):o;s&&r.push(s)}),r}var Tt={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Lt(e,t,n,r){const o=e.resources.length,s=e.random?Math.floor(Math.random()*o):e.index;let i;if(e.random){let h=e.resources.slice(0);for(i=[];h.length>1;){const x=Math.floor(Math.random()*h.length);i.push(h[x]),h=h.slice(0,x).concat(h.slice(x+1))}i=i.concat(h)}else i=e.resources.slice(s).concat(e.resources.slice(0,s));const c=Date.now();let l="pending",a=0,u,p=null,d=[],m=[];typeof r=="function"&&m.push(r);function v(){p&&(clearTimeout(p),p=null)}function y(){l==="pending"&&(l="aborted"),v(),d.forEach(h=>{h.status==="pending"&&(h.status="aborted")}),d=[]}function f(h,x){x&&(m=[]),typeof h=="function"&&m.push(h)}function k(){return{startTime:c,payload:t,status:l,queriesSent:a,queriesPending:d.length,subscribe:f,abort:y}}function I(){l="failed",m.forEach(h=>{h(void 0,u)})}function w(){d.forEach(h=>{h.status==="pending"&&(h.status="aborted")}),d=[]}function b(h,x,j){const M=x!=="success";switch(d=d.filter(S=>S!==h),l){case"pending":break;case"failed":if(M||!e.dataAfterTimeout)return;break;default:return}if(x==="abort"){u=j,I();return}if(M){u=j,d.length||(i.length?U():I());return}if(v(),w(),!e.random){const S=e.resources.indexOf(h.resource);S!==-1&&S!==e.index&&(e.index=S)}l="completed",m.forEach(S=>{S(j)})}function U(){if(l!=="pending")return;v();const h=i.shift();if(h===void 0){if(d.length){p=setTimeout(()=>{v(),l==="pending"&&(w(),I())},e.timeout);return}I();return}const x={status:"pending",resource:h,callback:(j,M)=>{b(x,j,M)}};d.push(x),a++,p=setTimeout(U,e.rotate),n(h,t,x.callback)}return setTimeout(U),k}function Ee(e){const t={...Tt,...e};let n=[];function r(){n=n.filter(c=>c().status==="pending")}function o(c,l,a){const u=Lt(t,c,l,(p,d)=>{r(),a&&a(p,d)});return n.push(u),u}function s(c){return n.find(l=>c(l))||null}return{query:o,find:s,setIndex:c=>{t.index=c},getIndex:()=>t.index,cleanup:r}}function he(){}const G=Object.create(null);function Pt(e){if(!G[e]){const t=re(e);if(!t)return;const n=Ee(t),r={config:t,redundancy:n};G[e]=r}return G[e]}function Et(e,t,n){let r,o;if(typeof e=="string"){const s=W(e);if(!s)return n(void 0,424),he;o=s.send;const i=Pt(e);i&&(r=i.redundancy)}else{const s=ne(e);if(s){r=Ee(s);const i=e.resources?e.resources[0]:"",c=W(i);c&&(o=c.send)}}return!r||!o?(n(void 0,424),he):r.query(t,o,n)().abort}const ge="iconify2",E="iconify",Me=E+"-count",me=E+"-version",Oe=36e5,Mt=168,Ot=50;function X(e,t){try{return e.getItem(t)}catch{}}function se(e,t,n){try{return e.setItem(t,n),!0}catch{}}function ye(e,t){try{e.removeItem(t)}catch{}}function Y(e,t){return se(e,Me,t.toString())}function Z(e){return parseInt(X(e,Me))||0}const Q={local:!0,session:!0},Fe={local:new Set,session:new Set};let ie=!1;function Ft(e){ie=e}let A=typeof window>"u"?{}:window;function Ae(e){const t=e+"Storage";try{if(A&&A[t]&&typeof A[t].length=="number")return A[t]}catch{}Q[e]=!1}function Ne(e,t){const n=Ae(e);if(!n)return;const r=X(n,me);if(r!==ge){if(r){const c=Z(n);for(let l=0;l<c;l++)ye(n,E+l.toString())}se(n,me,ge),Y(n,0);return}const o=Math.floor(Date.now()/Oe)-Mt,s=c=>{const l=E+c.toString(),a=X(n,l);if(typeof a=="string"){try{const u=JSON.parse(a);if(typeof u=="object"&&typeof u.cached=="number"&&u.cached>o&&typeof u.provider=="string"&&typeof u.data=="object"&&typeof u.data.prefix=="string"&&t(u,c))return!0}catch{}ye(n,l)}};let i=Z(n);for(let c=i-1;c>=0;c--)s(c)||(c===i-1?(i--,Y(n,i)):Fe[e].add(c))}function De(){if(!ie){Ft(!0);for(const e in Q)Ne(e,t=>{const n=t.data,r=t.provider,o=n.prefix,s=C(r,o);if(!te(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function At(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const r in Q)Ne(r,o=>{const s=o.data;return o.provider!==e.provider||s.prefix!==e.prefix||s.lastModified===t});return!0}function Nt(e,t){ie||De();function n(r){let o;if(!Q[r]||!(o=Ae(r)))return;const s=Fe[r];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=Z(o),i>=Ot||!Y(o,i+1))return;const c={cached:Math.floor(Date.now()/Oe),provider:e.provider,data:t};return se(o,E+i.toString(),JSON.stringify(c))}t.lastModified&&!At(e,t.lastModified)||Object.keys(t.icons).length&&(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function be(){}function Dt(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,Ct(e)}))}function zt(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:r}=e,o=e.iconsToLoad;delete e.iconsToLoad;let s;if(!o||!(s=W(n)))return;s.prepare(n,r,o).forEach(c=>{Et(n,c,l=>{if(typeof l!="object")c.icons.forEach(a=>{e.missing.add(a)});else try{const a=te(e,l);if(!a.length)return;const u=e.pendingIcons;u&&a.forEach(p=>{u.delete(p)}),Nt(e,l)}catch(a){console.error(a)}Dt(e)})})}))}const Rt=(e,t)=>{const n=_t(e,!0,_e()),r=St(n);if(!r.pending.length){let l=!0;return t&&setTimeout(()=>{l&&t(r.loaded,r.missing,r.pending,be)}),()=>{l=!1}}const o=Object.create(null),s=[];let i,c;return r.pending.forEach(l=>{const{provider:a,prefix:u}=l;if(u===c&&a===i)return;i=a,c=u,s.push(C(a,u));const p=o[a]||(o[a]=Object.create(null));p[u]||(p[u]=[])}),r.pending.forEach(l=>{const{provider:a,prefix:u,name:p}=l,d=C(a,u),m=d.pendingIcons||(d.pendingIcons=new Set);m.has(p)||(m.add(p),o[a][u].push(p))}),s.forEach(l=>{const{provider:a,prefix:u}=l;o[a][u].length&&zt(l,o[a][u])}),t?jt(t,r,s):be};function Bt(e,t){const n={...e};for(const r in t){const o=t[r],s=typeof o;r in Te?(o===null||o&&(s==="string"||s==="number"))&&(n[r]=o):s===typeof n[r]&&(n[r]=r==="rotate"?o%4:o)}return n}const qt=/[\s,]+/;function Vt(e,t){t.split(qt).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}function Qt(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function r(o){for(;o<0;)o+=4;return o%4}if(n===""){const o=parseInt(e);return isNaN(o)?0:r(o)}else if(n!==e){let o=0;switch(n){case"%":o=25;break;case"deg":o=90}if(o){let s=parseFloat(e.slice(0,e.length-n.length));return isNaN(s)?0:(s=s/o,s%1===0?r(s):0)}}return t}function Ut(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in t)n+=" "+r+'="'+t[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function $t(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Ht(e){return"data:image/svg+xml,"+$t(e)}function Gt(e){return'url("'+Ht(e)+'")'}const xe={...Le,inline:!1},Kt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},Jt={display:"inline-block"},ee={backgroundColor:"currentColor"},ze={backgroundColor:"transparent"},we={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},ve={webkitMask:ee,mask:ee,background:ze};for(const e in ve){const t=ve[e];for(const n in we)t[e+n]=we[n]}const R={};["horizontal","vertical"].forEach(e=>{const t=e.slice(0,1)+"Flip";R[e+"-flip"]=t,R[e.slice(0,1)+"-flip"]=t,R[e+"Flip"]=t});function Ie(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}const Se=(e,t)=>{const n=Bt(xe,t),r={...Kt},o=t.mode||"svg",s={},i=t.style,c=typeof i=="object"&&!(i instanceof Array)?i:{};for(let y in t){const f=t[y];if(f!==void 0)switch(y){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[y]=f===!0||f==="true"||f===1;break;case"flip":typeof f=="string"&&Vt(n,f);break;case"color":s.color=f;break;case"rotate":typeof f=="string"?n[y]=Qt(f):typeof f=="number"&&(n[y]=f);break;case"ariaHidden":case"aria-hidden":f!==!0&&f!=="true"&&delete r["aria-hidden"];break;default:{const k=R[y];k?(f===!0||f==="true"||f===1)&&(n[k]=!0):xe[y]===void 0&&(r[y]=f)}}}const l=at(e,n),a=l.attributes;if(n.inline&&(s.verticalAlign="-0.125em"),o==="svg"){r.style={...s,...c},Object.assign(r,a);let y=0,f=t.id;return typeof f=="string"&&(f=f.replace(/-/g,"_")),r.innerHTML=pt(l.body,f?()=>f+"ID"+y++:"iconifyVue"),ce("svg",r)}const{body:u,width:p,height:d}=e,m=o==="mask"||(o==="bg"?!1:u.indexOf("currentColor")!==-1),v=Ut(u,{...a,width:p+"",height:d+""});return r.style={...s,"--svg":Gt(v),width:Ie(a.width),height:Ie(a.height),...Jt,...m?ee:ze,...c},ce("span",r)};_e(!0);ht("",It);if(typeof document<"u"&&typeof window<"u"){De();const e=window;if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(r=>{try{(typeof r!="object"||r===null||r instanceof Array||typeof r.icons!="object"||typeof r.prefix!="string"||!nt(r))&&console.error(n)}catch{console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(let n in t){const r="IconifyProviders["+n+"] is invalid.";try{const o=t[n];if(typeof o!="object"||!o||o.resources===void 0)continue;gt(n,o)||console.error(r)}catch{console.error(r)}}}}const Wt={...V,body:""},N=Re({inheritAttrs:!1,data(){return{_name:"",_loadingIcon:null,iconMounted:!1,counter:0}},mounted(){this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(e,t){if(typeof e=="object"&&e!==null&&typeof e.body=="string")return this._name="",this.abortLoading(),{data:e};let n;if(typeof e!="string"||(n=q(e,!1,!0))===null)return this.abortLoading(),null;const r=et(n);if(!r)return(!this._loadingIcon||this._loadingIcon.name!==e)&&(this.abortLoading(),this._name="",r!==null&&(this._loadingIcon={name:e,abort:Rt([n],()=>{this.counter++})})),null;this.abortLoading(),this._name!==e&&(this._name=e,t&&t(e));const o=["iconify"];return n.prefix!==""&&o.push("iconify--"+n.prefix),n.provider!==""&&o.push("iconify--"+n.provider),{data:r,classes:o}}},render(){this.counter;const e=this.$attrs,t=this.iconMounted||e.ssr?this.getIcon(e.icon,e.onLoad):null;if(!t)return Se(Wt,e);let n=e;return t.classes&&(n={...e,class:(typeof e.class=="string"?e.class+" ":"")+t.classes.join(" ")}),Se({...V,...t.data},n)}}),Xt={class:"bg-gray-100 my-10 p-6 mx-4 md:mx-16 rounded-lg shadow-lg"},Yt={class:"flex justify-between mb-6"},Zt={class:"font-bold text-3xl"},en={class:"flex shadow-md rounded-lg justify-between gap-10 p-4 bg-white items-center mb-6"},tn={class:"flex gap-4 items-center"},nn={class:"font-bold text-xl text-blue-500"},on={class:"flex gap-4 items-center"},rn={class:"font-bold text-xl text-blue-500"},sn={class:"grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"},cn=["onClick"],ln={class:"text-4xl font-bold text-blue-500 mb-2"},an={class:"font-semibold"},un={__name:"home",setup(e){$e().public.apiBaseUrl;const n=qe(),r=He(),o=Ge();Ve(r);const s=$(()=>r.user&&r.user.fullName?r.user.fullName.split(" ")[0]:"Guest"),i=$(()=>r.user&&r.user.points?r.user.points:"0"),c=$(()=>r.user&&r.user.rank?r.user.rank:"200"),l=p=>{o.setSelectedDay(p),n.push("/quizPage")},a=()=>{r.setUser(null),n.push("/login")},u=()=>{n.push("/leaderboard")};return(p,d)=>(ae(),le("div",Xt,[g("div",Yt,[g("div",null,[g("h1",Zt,"Hi, "+_(s.value),1),d[0]||(d[0]=g("p",{class:"text-gray-600"},"Let's make this day count",-1))]),g("div",null,[O(F(N),{icon:"noto:man-pouting",class:"text-blue-500 bg-orange-400 w-20 h-20 rounded-full"}),g("button",{onClick:a,class:"px-4 py-2 bg-gray-100 text-red-500 font-semibold rounded hover:bg-red-600 transition-colors"}," Logout ")])]),g("div",en,[g("div",tn,[O(F(N),{icon:"noto:trophy",class:"w-12 h-12"}),g("div",null,[d[1]||(d[1]=g("p",{class:"text-base"},"Ranking",-1)),g("p",nn,_(c.value),1)])]),g("div",on,[O(F(N),{icon:"noto:coin",class:"w-12 h-12"}),g("div",null,[d[2]||(d[2]=g("p",null,"Points",-1)),g("p",rn,_(i.value),1)])])]),d[5]||(d[5]=g("h2",{class:"mt-8 mb-4 font-bold text-2xl"},"Daily Quizzes",-1)),g("div",sn,[(ae(),le(Qe,null,Ue(6,m=>g("div",{key:m,onClick:v=>l(m),class:"quizCard relative flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"},[g("div",ln,_(m),1),g("p",an,"Day "+_(m),1),d[3]||(d[3]=g("p",{class:"text-sm text-gray-600"},"10 questions",-1))],8,cn)),64)),g("div",{onClick:u,class:"quizCard relative flex flex-col items-center justify-center p-6 bg-green-500 text-dark rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"},[O(F(N),{icon:"material-symbols:social-leaderboard",class:"w-12 h-12 text-blue-500"}),d[4]||(d[4]=g("p",{class:"font-semibold"},"View Leaderboard",-1))])])]))}},hn=Be(un,[["__scopeId","data-v-2c222da9"]]);export{hn as default};