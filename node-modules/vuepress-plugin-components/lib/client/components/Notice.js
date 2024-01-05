import{defineComponent as v,ref as y,computed as l,onMounted as g,h as e,TransitionGroup as k}from"vue";import{useRoute as p,useRouter as S}from"vue-router";import{startsWith as u,isAbsoluteUrl as w,isLinkHttp as C}from"vuepress-shared/client";import{C as x}from"../icons-zhLaO7d8.js";import"../styles/notice.scss";var H=v({name:"NoticeItem",props:{path:{type:String,default:""},match:{type:String,default:""},title:{type:String,required:!0},content:{type:String,required:!0},actions:{type:Array,default:()=>[]},noticeKey:{type:String,default:""},showOnce:Boolean,confirm:Boolean,fullscreen:Boolean},setup(t){const i=p(),a=S(),o=y(!1),s=l(()=>t.noticeKey?`notice-${t.noticeKey}`:`${t.title}${t.content}`),m=l(()=>t.match?new RegExp(t.match).test(i.path):u(i.path,t.path));g(()=>{const n=(t.showOnce?localStorage:sessionStorage).getItem(s.value);o.value=!n});const r=()=>{o.value=!1,(t.showOnce?localStorage:sessionStorage).setItem(s.value,"true")},f=n=>{n&&(w(n)?a.push(n):C(n)&&window.open(n)),r()};return()=>e(k,{name:"notice-fade"},()=>m.value&&o.value?[t.fullscreen?e("div",{key:"mask",class:"vp-notice-mask",onClick:()=>{t.confirm||r()}}):null,e("div",{key:"popup",class:["vp-notice-wrapper",{fullscreen:t.fullscreen}]},[e("header",{class:"vp-notice-title"},[t.confirm?null:e(x,{onClick:()=>r()}),e("span",{innerHTML:t.title})]),e("div",{class:"vp-notice-content",innerHTML:t.content}),e("div",{class:"vp-notice-footer"},t.actions.map(({text:n,link:d,type:h=""})=>e("button",{type:"button",class:["vp-notice-footer-action",h],onClick:()=>f(d),innerHTML:n})))])]:[])}});const c=({config:t})=>{const i=p(),a=t.find(o=>"match"in o?new RegExp(o.match).test(i.path):u(i.path,o.path));return a?e(H,a):null};c.displayName="Notice",c.props={config:{type:Array,required:!0}};export{c as default};
//# sourceMappingURL=Notice.js.map
