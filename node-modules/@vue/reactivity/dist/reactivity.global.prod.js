var VueReactivity=function(t){"use strict";function e(t,e){const s=new Set(t.split(","));return e?t=>s.has(t.toLowerCase()):t=>s.has(t)}const s=()=>{},n=Object.assign,i=Object.prototype.hasOwnProperty,r=(t,e)=>i.call(t,e),c=Array.isArray,o=t=>"[object Map]"===f(t),u=t=>"function"==typeof t,a=t=>"symbol"==typeof t,l=t=>null!==t&&"object"==typeof t,h=Object.prototype.toString,f=t=>h.call(t),_=t=>f(t).slice(8,-1),d=t=>"string"==typeof t&&"NaN"!==t&&"-"!==t[0]&&""+parseInt(t,10)===t,p=(t,e)=>!Object.is(t,e);let v,g;class y{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=v,!t&&v&&(this.index=(v.scopes||(v.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const e=v;try{return v=this,t()}finally{v=e}}}on(){v=this}off(){v=this.parent}stop(t){if(this._active){let e,s;for(e=0,s=this.effects.length;e<s;e++)this.effects[e].stop();for(e=0,s=this.cleanups.length;e<s;e++)this.cleanups[e]();if(this.scopes)for(e=0,s=this.scopes.length;e<s;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function w(t,e=v){e&&e.active&&e.effects.push(t)}class R{constructor(t,e,s,n){this.fn=t,this.trigger=e,this.scheduler=s,this.active=!0,this.deps=[],this._dirtyLevel=3,this._trackId=0,this._runnings=0,this._queryings=0,this._depsLength=0,w(this,n)}get dirty(){if(1===this._dirtyLevel){this._dirtyLevel=0,this._queryings++,j();for(const t of this.deps)if(t.computed&&(b(t.computed),this._dirtyLevel>=2))break;x(),this._queryings--}return this._dirtyLevel>=2}set dirty(t){this._dirtyLevel=t?3:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let t=L,e=g;try{return L=!0,g=this,this._runnings++,S(this),this.fn()}finally{k(this),this._runnings--,g=e,L=t}}stop(){var t;this.active&&(S(this),k(this),null==(t=this.onStop)||t.call(this),this.active=!1)}}function b(t){return t.value}function S(t){t._trackId++,t._depsLength=0}function k(t){if(t.deps&&t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)E(t.deps[e],t);t.deps.length=t._depsLength}}function E(t,e){const s=t.get(e);void 0!==s&&e._trackId!==s&&(t.delete(e),0===t.size&&t.cleanup())}let L=!0,m=0;const O=[];function j(){O.push(L),L=!1}function x(){const t=O.pop();L=void 0===t||t}function P(){m++}function T(){for(m--;!m&&A.length;)A.shift()()}function I(t,e,s){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const s=t.deps[t._depsLength];s!==e?(s&&E(s,t),t.deps[t._depsLength++]=e):t._depsLength++}}const A=[];function M(t,e,s){P();for(const n of t.keys())if((n.allowRecurse||!n._runnings)&&n._dirtyLevel<e&&(!n._runnings||2!==e)){const t=n._dirtyLevel;n._dirtyLevel=e,0!==t||n._queryings&&2===e||(n.trigger(),n.scheduler&&A.push(n.scheduler))}T()}const V=(t,e)=>{const s=new Map;return s.cleanup=t,s.computed=e,s},W=new WeakMap,z=Symbol(""),N=Symbol("");function C(t,e,s){if(L&&g){let e=W.get(t);e||W.set(t,e=new Map);let n=e.get(s);n||e.set(s,n=V((()=>e.delete(s)))),I(g,n)}}function D(t,e,s,n,i,r){const u=W.get(t);if(!u)return;let l=[];if("clear"===e)l=[...u.values()];else if("length"===s&&c(t)){const t=Number(n);u.forEach(((e,s)=>{("length"===s||!a(s)&&s>=t)&&l.push(e)}))}else switch(void 0!==s&&l.push(u.get(s)),e){case"add":c(t)?d(s)&&l.push(u.get("length")):(l.push(u.get(z)),o(t)&&l.push(u.get(N)));break;case"delete":c(t)||(l.push(u.get(z)),o(t)&&l.push(u.get(N)));break;case"set":o(t)&&l.push(u.get(z))}P();for(const c of l)c&&M(c,3);T()}const q=e("__proto__,__v_isRef,__isVue"),K=new Set(Object.getOwnPropertyNames(Symbol).filter((t=>"arguments"!==t&&"caller"!==t)).map((t=>Symbol[t])).filter(a)),H=Y();function Y(){const t={};return["includes","indexOf","lastIndexOf"].forEach((e=>{t[e]=function(...t){const s=Tt(this);for(let e=0,i=this.length;e<i;e++)C(s,0,e+"");const n=s[e](...t);return-1===n||!1===n?s[e](...t.map(Tt)):n}})),["push","pop","shift","unshift","splice"].forEach((e=>{t[e]=function(...t){j(),P();const s=Tt(this)[e].apply(this,t);return T(),x(),s}})),t}function F(t){const e=Tt(this);return C(e,0,t),e.hasOwnProperty(t)}class G{constructor(t=!1,e=!1){this._isReadonly=t,this._shallow=e}get(t,e,s){const n=this._isReadonly,i=this._shallow;if("__v_isReactive"===e)return!n;if("__v_isReadonly"===e)return n;if("__v_isShallow"===e)return i;if("__v_raw"===e)return s===(n?i?Et:kt:i?St:bt).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=c(t);if(!n){if(o&&r(H,e))return Reflect.get(H,e,s);if("hasOwnProperty"===e)return F}const u=Reflect.get(t,e,s);return(a(e)?K.has(e):q(e))?u:(n||C(t,0,e),i?u:Nt(u)?o&&d(e)?u:u.value:l(u)?n?mt(u):Lt(u):u)}}class B extends G{constructor(t=!1){super(!1,t)}set(t,e,s,n){let i=t[e];if(!this._shallow){const e=xt(i);if(Pt(s)||xt(s)||(i=Tt(i),s=Tt(s)),!c(t)&&Nt(i)&&!Nt(s))return!e&&(i.value=s,!0)}const o=c(t)&&d(e)?Number(e)<t.length:r(t,e),u=Reflect.set(t,e,s,n);return t===Tt(n)&&(o?p(s,i)&&D(t,"set",e,s):D(t,"add",e,s)),u}deleteProperty(t,e){const s=r(t,e),n=Reflect.deleteProperty(t,e);return n&&s&&D(t,"delete",e,void 0),n}has(t,e){const s=Reflect.has(t,e);return a(e)&&K.has(e)||C(t,0,e),s}ownKeys(t){return C(t,0,c(t)?"length":z),Reflect.ownKeys(t)}}class J extends G{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Q=new B,U=new J,X=new B(!0),Z=new J(!0),$=t=>t,tt=t=>Reflect.getPrototypeOf(t);function et(t,e,s=!1,n=!1){const i=Tt(t=t.__v_raw),r=Tt(e);s||(p(e,r)&&C(i,0,e),C(i,0,r));const{has:c}=tt(i),o=n?$:s?At:It;return c.call(i,e)?o(t.get(e)):c.call(i,r)?o(t.get(r)):void(t!==i&&t.get(e))}function st(t,e=!1){const s=this.__v_raw,n=Tt(s),i=Tt(t);return e||(p(t,i)&&C(n,0,t),C(n,0,i)),t===i?s.has(t):s.has(t)||s.has(i)}function nt(t,e=!1){return t=t.__v_raw,!e&&C(Tt(t),0,z),Reflect.get(t,"size",t)}function it(t){t=Tt(t);const e=Tt(this);return tt(e).has.call(e,t)||(e.add(t),D(e,"add",t,t)),this}function rt(t,e){e=Tt(e);const s=Tt(this),{has:n,get:i}=tt(s);let r=n.call(s,t);r||(t=Tt(t),r=n.call(s,t));const c=i.call(s,t);return s.set(t,e),r?p(e,c)&&D(s,"set",t,e):D(s,"add",t,e),this}function ct(t){const e=Tt(this),{has:s,get:n}=tt(e);let i=s.call(e,t);i||(t=Tt(t),i=s.call(e,t)),n&&n.call(e,t);const r=e.delete(t);return i&&D(e,"delete",t,void 0),r}function ot(){const t=Tt(this),e=0!==t.size,s=t.clear();return e&&D(t,"clear",void 0,void 0),s}function ut(t,e){return function(s,n){const i=this,r=i.__v_raw,c=Tt(r),o=e?$:t?At:It;return!t&&C(c,0,z),r.forEach(((t,e)=>s.call(n,o(t),o(e),i)))}}function at(t,e,s){return function(...n){const i=this.__v_raw,r=Tt(i),c=o(r),u="entries"===t||t===Symbol.iterator&&c,a="keys"===t&&c,l=i[t](...n),h=s?$:e?At:It;return!e&&C(r,0,a?N:z),{next(){const{value:t,done:e}=l.next();return e?{value:t,done:e}:{value:u?[h(t[0]),h(t[1])]:h(t),done:e}},[Symbol.iterator](){return this}}}}function lt(t){return function(...e){return"delete"!==t&&("clear"===t?void 0:this)}}function ht(){const t={get(t){return et(this,t)},get size(){return nt(this)},has:st,add:it,set:rt,delete:ct,clear:ot,forEach:ut(!1,!1)},e={get(t){return et(this,t,!1,!0)},get size(){return nt(this)},has:st,add:it,set:rt,delete:ct,clear:ot,forEach:ut(!1,!0)},s={get(t){return et(this,t,!0)},get size(){return nt(this,!0)},has(t){return st.call(this,t,!0)},add:lt("add"),set:lt("set"),delete:lt("delete"),clear:lt("clear"),forEach:ut(!0,!1)},n={get(t){return et(this,t,!0,!0)},get size(){return nt(this,!0)},has(t){return st.call(this,t,!0)},add:lt("add"),set:lt("set"),delete:lt("delete"),clear:lt("clear"),forEach:ut(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((i=>{t[i]=at(i,!1,!1),s[i]=at(i,!0,!1),e[i]=at(i,!1,!0),n[i]=at(i,!0,!0)})),[t,s,e,n]}const[ft,_t,dt,pt]=ht();function vt(t,e){const s=e?t?pt:dt:t?_t:ft;return(e,n,i)=>"__v_isReactive"===n?!t:"__v_isReadonly"===n?t:"__v_raw"===n?e:Reflect.get(r(s,n)&&n in e?s:e,n,i)}const gt={get:vt(!1,!1)},yt={get:vt(!1,!0)},wt={get:vt(!0,!1)},Rt={get:vt(!0,!0)},bt=new WeakMap,St=new WeakMap,kt=new WeakMap,Et=new WeakMap;function Lt(t){return xt(t)?t:Ot(t,!1,Q,gt,bt)}function mt(t){return Ot(t,!0,U,wt,kt)}function Ot(t,e,s,n,i){if(!l(t))return t;if(t.__v_raw&&(!e||!t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const c=(o=t).__v_skip||!Object.isExtensible(o)?0:function(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(_(o));var o;if(0===c)return t;const u=new Proxy(t,2===c?n:s);return i.set(t,u),u}function jt(t){return xt(t)?jt(t.__v_raw):!(!t||!t.__v_isReactive)}function xt(t){return!(!t||!t.__v_isReadonly)}function Pt(t){return!(!t||!t.__v_isShallow)}function Tt(t){const e=t&&t.__v_raw;return e?Tt(e):t}const It=t=>l(t)?Lt(t):t,At=t=>l(t)?mt(t):t;class Mt{constructor(t,e,s,n){this._setter=e,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new R((()=>t(this._value)),(()=>zt(this,1))),this.effect.computed=this,this.effect.active=this._cacheable=!n,this.__v_isReadonly=s}get value(){const t=Tt(this);return Wt(t),t._cacheable&&!t.effect.dirty||p(t._value,t._value=t.effect.run())&&zt(t,2),t._value}set value(t){this._setter(t)}get _dirty(){return this.effect.dirty}set _dirty(t){this.effect.dirty=t}}function Vt(t,e,n=!1){let i,r;const c=u(t);c?(i=t,r=s):(i=t.get,r=t.set);return new Mt(i,r,c||!r,n)}function Wt(t){L&&g&&(t=Tt(t),I(g,t.dep||(t.dep=V((()=>t.dep=void 0),t instanceof Mt?t:void 0))))}function zt(t,e=3,s){const n=(t=Tt(t)).dep;n&&M(n,e)}function Nt(t){return!(!t||!0!==t.__v_isRef)}function Ct(t){return Dt(t,!1)}function Dt(t,e){return Nt(t)?t:new qt(t,e)}class qt{constructor(t,e){this.__v_isShallow=e,this.dep=void 0,this.__v_isRef=!0,this._rawValue=e?t:Tt(t),this._value=e?t:It(t)}get value(){return Wt(this),this._value}set value(t){const e=this.__v_isShallow||Pt(t)||xt(t);t=e?t:Tt(t),p(t,this._rawValue)&&(this._rawValue=t,this._value=e?t:It(t),zt(this,3))}}function Kt(t){return Nt(t)?t.value:t}const Ht={get:(t,e,s)=>Kt(Reflect.get(t,e,s)),set:(t,e,s,n)=>{const i=t[e];return Nt(i)&&!Nt(s)?(i.value=s,!0):Reflect.set(t,e,s,n)}};class Yt{constructor(t){this.dep=void 0,this.__v_isRef=!0;const{get:e,set:s}=t((()=>Wt(this)),(()=>zt(this)));this._get=e,this._set=s}get value(){return this._get()}set value(t){this._set(t)}}class Ft{constructor(t,e,s){this._object=t,this._key=e,this._defaultValue=s,this.__v_isRef=!0}get value(){const t=this._object[this._key];return void 0===t?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return t=Tt(this._object),e=this._key,null==(s=W.get(t))?void 0:s.get(e);var t,e,s}}class Gt{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Bt(t,e,s){const n=t[e];return Nt(n)?n:new Ft(t,e,s)}const Jt=Vt;return t.EffectScope=y,t.ITERATE_KEY=z,t.ReactiveEffect=R,t.ReactiveFlags={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",IS_SHALLOW:"__v_isShallow",RAW:"__v_raw"},t.TrackOpTypes={GET:"get",HAS:"has",ITERATE:"iterate"},t.TriggerOpTypes={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},t.computed=Vt,t.customRef=function(t){return new Yt(t)},t.deferredComputed=Jt,t.effect=function(t,e){t.effect instanceof R&&(t=t.effect.fn);const i=new R(t,s,(()=>{i.dirty&&i.run()}));e&&(n(i,e),e.scope&&w(i,e.scope)),e&&e.lazy||i.run();const r=i.run.bind(i);return r.effect=i,r},t.effectScope=function(t){return new y(t)},t.enableTracking=function(){O.push(L),L=!0},t.getCurrentScope=function(){return v},t.isProxy=function(t){return jt(t)||xt(t)},t.isReactive=jt,t.isReadonly=xt,t.isRef=Nt,t.isShallow=Pt,t.markRaw=function(t){return((t,e,s)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:s})})(t,"__v_skip",!0),t},t.onScopeDispose=function(t){v&&v.cleanups.push(t)},t.pauseScheduling=P,t.pauseTracking=j,t.proxyRefs=function(t){return jt(t)?t:new Proxy(t,Ht)},t.reactive=Lt,t.readonly=mt,t.ref=Ct,t.resetScheduling=T,t.resetTracking=x,t.shallowReactive=function(t){return Ot(t,!1,X,yt,St)},t.shallowReadonly=function(t){return Ot(t,!0,Z,Rt,Et)},t.shallowRef=function(t){return Dt(t,!0)},t.stop=function(t){t.effect.stop()},t.toRaw=Tt,t.toRef=function(t,e,s){return Nt(t)?t:u(t)?new Gt(t):l(t)&&arguments.length>1?Bt(t,e,s):Ct(t)},t.toRefs=function(t){const e=c(t)?new Array(t.length):{};for(const s in t)e[s]=Bt(t,s);return e},t.toValue=function(t){return u(t)?t():Kt(t)},t.track=C,t.trigger=D,t.triggerRef=function(t){zt(t,3)},t.unref=Kt,t}({});
