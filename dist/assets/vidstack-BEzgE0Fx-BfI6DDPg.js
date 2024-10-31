const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vidstack-7jdJQx_M-BuvUjK7_.js","assets/index-CVII2iTA.js","assets/index-oQJnFjWX.css"])))=>i.map(i=>d[i]);
var P=Object.defineProperty;var w=t=>{throw TypeError(t)};var k=(t,e,a)=>e in t?P(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var u=(t,e,a)=>k(t,typeof e!="symbol"?e+"":e,a),C=(t,e,a)=>e.has(t)||w("Cannot "+a);var c=(t,e,a)=>(C(t,e,"read from private field"),a?a.call(t):e.get(t)),h=(t,e,a)=>e.has(t)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,a),E=(t,e,a,o)=>(C(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a),s=(t,e,a)=>(C(t,e,"access private method"),a);import{l as A,I as O,y as R,z as b,c as D,x as G,_ as L,h as M}from"./index-CVII2iTA.js";function N(){return"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"}function T(){var t;return!!((t=window.cast)!=null&&t.framework)}function F(){var t,e;return!!((e=(t=window.chrome)==null?void 0:t.cast)!=null&&e.isAvailable)}function v(){return g().getCastState()===cast.framework.CastState.CONNECTED}function g(){return window.cast.framework.CastContext.getInstance()}function y(){return g().getCurrentSession()}function U(){var t;return(t=y())==null?void 0:t.getSessionObj().media[0]}function q(t){var a;return((a=U())==null?void 0:a.media.contentId)===(t==null?void 0:t.src)}function j(){return{language:"en-US",autoJoinPolicy:chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,receiverApplicationId:chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,resumeSavedSession:!0,androidReceiverCompatible:!0}}function V(t){return`Google Cast Error Code: ${t}`}function B(t,e){return A(g(),t,e)}var n,r,_,S,I,l,d;class z{constructor(){h(this,r);u(this,"name","google-cast");u(this,"target");h(this,n)}get cast(){return g()}mediaType(){return"video"}canPlay(e){return O&&!R&&b(e)}async prompt(e){var m;let a,o,i;try{a=await s(this,r,_).call(this,e),c(this,n)||(E(this,n,new cast.framework.RemotePlayer),new cast.framework.RemotePlayerController(c(this,n))),o=e.player.createEvent("google-cast-prompt-open",{trigger:a}),e.player.dispatchEvent(o),s(this,r,l).call(this,e,"connecting",o),await s(this,r,S).call(this,D(e.$props.googleCast)),e.$state.remotePlaybackInfo.set({deviceName:(m=y())==null?void 0:m.getCastDevice().friendlyName}),v()&&s(this,r,l).call(this,e,"connected",o)}catch(p){const f=p instanceof Error?p:s(this,r,d).call(this,(p+"").toUpperCase(),"Prompt failed.");throw i=e.player.createEvent("google-cast-prompt-error",{detail:f,trigger:o??a,cancelable:!0}),e.player.dispatch(i),s(this,r,l).call(this,e,v()?"connected":"disconnected",i),f}finally{e.player.dispatch("google-cast-prompt-close",{trigger:i??o??a})}}async load(e){if(G)throw Error("[vidstack] can not load google cast provider server-side");if(!c(this,n))throw Error("[vidstack] google cast player was not initialized");return new(await L(async()=>{const{GoogleCastProvider:a}=await import("./vidstack-7jdJQx_M-BuvUjK7_.js");return{GoogleCastProvider:a}},__vite__mapDeps([0,1,2]))).GoogleCastProvider(c(this,n),e)}}n=new WeakMap,r=new WeakSet,_=async function(e){if(T())return;const a=e.player.createEvent("google-cast-load-start");e.player.dispatch(a),await M(N()),await customElements.whenDefined("google-cast-launcher");const o=e.player.createEvent("google-cast-loaded",{trigger:a});if(e.player.dispatch(o),!F())throw s(this,r,d).call(this,"CAST_NOT_AVAILABLE","Google Cast not available on this platform.");return o},S=async function(e){s(this,r,I).call(this,e);const a=await this.cast.requestSession();if(a)throw s(this,r,d).call(this,a.toUpperCase(),V(a))},I=function(e){var a;(a=this.cast)==null||a.setOptions({...j(),...e})},l=function(e,a,o){const i={type:"google-cast",state:a};e.notify("remote-playback-change",i,o)},d=function(e,a){const o=Error(a);return o.code=e,o};var H=Object.freeze({__proto__:null,GoogleCastLoader:z});export{g as getCastContext,V as getCastErrorMessage,y as getCastSession,U as getCastSessionMedia,q as hasActiveCastSession,B as listenCastContextEvent,H as loader};
