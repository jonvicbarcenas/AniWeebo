var y=Object.defineProperty;var g=s=>{throw TypeError(s)};var w=(s,t,r)=>t in s?y(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var c=(s,t,r)=>w(s,typeof t!="symbol"?t+"":t,r),h=(s,t,r)=>t.has(s)||g("Cannot "+r);var e=(s,t,r)=>(h(s,t,"read from private field"),r?r.call(s):t.get(s)),u=(s,t,r)=>t.has(s)?g("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,r),p=(s,t,r,a)=>(h(s,t,"write to private field"),a?a.call(s,r):t.set(s,r),r),l=(s,t,r)=>(h(s,t,"access private method"),r);import{n as M,l as f,e as A,c as P,w as S,x as E,b as O}from"./index-CVII2iTA.js";var i,o,b,m;class x{constructor(t){u(this,o);u(this,i);c(this,"src",M(""));c(this,"referrerPolicy",null);p(this,i,t),t.setAttribute("frameBorder","0"),t.setAttribute("aria-hidden","true"),t.setAttribute("allow","autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"),this.referrerPolicy!==null&&t.setAttribute("referrerpolicy",this.referrerPolicy)}get iframe(){return e(this,i)}setup(){f(window,"message",l(this,o,m).bind(this)),f(e(this,i),"load",this.onLoad.bind(this)),A(l(this,o,b).bind(this))}postMessage(t,r){var a;E||(a=e(this,i).contentWindow)==null||a.postMessage(JSON.stringify(t),r??"*")}}i=new WeakMap,o=new WeakSet,b=function(){const t=this.src();if(!t.length){e(this,i).setAttribute("src","");return}const r=P(()=>this.buildParams());e(this,i).setAttribute("src",S(t,r))},m=function(t){var d;const r=this.getOrigin();if((t.source===null||t.source===((d=e(this,i))==null?void 0:d.contentWindow))&&(!O(r)||r===t.origin)){try{const n=JSON.parse(t.data);n&&this.onMessage(n,t);return}catch{}t.data&&this.onMessage(t.data,t)}};export{x as E};
