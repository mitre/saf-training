import{isString as i}from"@vuepress/shared";import{inject as l}from"vue";let e=t=>i(t.title)?{title:t.title}:null;const o=Symbol(__VUEPRESS_DEV__?"auto-catalog":""),r=t=>{e=t},a=()=>l(o),n=t=>{t.provide(o,e)};export{r as defineAutoCatalogGetter,n as injectAutoCatalogGetter,a as useAutoCatalogGetter};
//# sourceMappingURL=index.js.map
