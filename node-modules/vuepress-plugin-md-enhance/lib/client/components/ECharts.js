import{useEventListener as p,useDebounceFn as l}from"@vueuse/core";import{defineComponent as u,ref as h,shallowRef as d,onMounted as m,onUnmounted as _,h as r}from"vue";import{atou as f,LoadingIcon as g}from"vuepress-shared/client";import"../styles/echarts.scss";import{u as y}from"../echarts-C0TL_WZU.js";const v=(async()=>{}).constructor,w=(t,o,i)=>o==="js"?v("myChart",`let width,height,option,__echarts_config__;
{
${t}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`)(i):Promise.resolve({option:JSON.parse(t)});var C=u({name:"ECharts",props:{config:{type:String,required:!0},id:{type:String,required:!0},title:{type:String,default:""},type:{type:String,default:"json"}},setup(t){const o=y(),i=h(!0),s=d();let e;return p("resize",l(()=>e?.resize(),100)),m(()=>{Promise.all([import("echarts"),new Promise(n=>setTimeout(n,MARKDOWN_ENHANCE_DELAY))]).then(async([n])=>{await o.setup?.(),e=n.init(s.value);const{option:a,...c}=await w(f(t.config),t.type,e);e.resize(c),e.setOption({...o.option,...a}),i.value=!1})}),_(()=>{e?.dispose()}),()=>[t.title?r("div",{class:"echarts-title"},decodeURIComponent(t.title)):null,r("div",{class:"echarts-wrapper"},[r("div",{ref:s,class:"echarts-container",id:t.id}),i.value?r(g,{class:"echarts-loading",height:360}):null])]}});export{C as default};
//# sourceMappingURL=ECharts.js.map
