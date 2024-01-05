import{usePageData as _,useSiteData as E}from"@vuepress/client";import{defineComponent as L,computed as S,h as n}from"vue";import{useRouter as A}from"vue-router";import{useLocaleConfig as F,VPLink as m,startsWith as v,keys as R,endsWith as p}from"vuepress-shared/client";import f from"../../components/FontIcon.js";import"../styles/catalog.scss";import"../../styles/font-icon.scss";var U=L({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},titleGetter:{type:Function,default:a=>a.title},iconGetter:{type:Function,default:a=>a.icon},orderGetter:{type:Function,default:a=>a.order||0},shouldIndex:{type:Function,default:a=>a.index!==!1}},setup(a){__VUEPRESS_DEV__&&a.indexType&&console.warn("[AutoCatalog]: `indexType` is deprecated, please use `index` instead");const $=F(CATALOG_LOCALES),b=_(),x=A(),y=E(),C=()=>{const c=a.base||b.value.path.replace(/\/[^/]+$/,"/"),u=x.getRoutes(),s=[];return u.filter(({meta:t,path:e})=>{if(!v(e,c)||e===c)return!1;if(c==="/"){const r=R(y.value.locales).filter(l=>l!=="/");if(e==="/404.html"||r.some(l=>v(e,l)))return!1}return(p(e,".html")&&!p(e,"/index.html")||p(e,"/"))&&a.shouldIndex(t)}).map(({path:t,meta:e})=>{const r=t.substring(c.length).split("/").length;return{title:a.titleGetter(e),icon:a.iconGetter(e),base:t.replace(/\/[^/]+\/?$/,"/"),order:a.orderGetter(e),level:p(t,"/")?r-1:r,path:t}}).filter(({title:t,level:e})=>e<=a.level||!t).sort(({title:t,level:e,path:r,order:l},{title:i,level:h,path:d,order:o})=>e-h||(p(r,"/index.html")?-1:p(d,"/index.html")?1:l===null?o===null?t.localeCompare(i):o:o===null?l:l>0?o>0?l-o:-1:o<0?l-o:1)).forEach(t=>{const{base:e,level:r}=t;switch(r){case 1:s.push(t);break;case 2:{const l=s.find(i=>i.path===e);l&&(l.children??=[]).push(t);break}default:{const l=s.find(i=>i.path===e.replace(/\/[^/]+\/$/,"/"));if(l){const i=l.children?.find(h=>h.path===e);i&&(i.children??=[]).push(t)}}}}),s},w=S(()=>C());return()=>n("div",{class:"catalog-wrapper"},[n("h2",{class:"main-title"},$.value.title),w.value.map(({children:c=[],icon:u,path:s,title:t},e)=>[n("h3",{id:t,class:["child-title",{"has-children":c.length}]},[n("a",{href:`#${t}`,class:"header-anchor"},"#"),n(m,{class:"catalog-title",to:s},()=>[u?n(f,{icon:u}):null,`${e+1}. ${t||"Unknown"}`])]),c.length?n("ul",{class:"child-catalog-wrapper"},c.map(({children:r=[],icon:l,path:i,title:h},d)=>n("li",{class:"child-catalog-item"},[n("div",{class:["sub-title",{"has-children":r.length}]},[n("a",{href:`#${h}`,class:"header-anchor"},"#"),n(m,{class:"catalog-title",to:i},()=>[l?n(f,{icon:l}):null,`${e+1}.${d+1} ${h||"Unknown"}`])]),r.length?n("div",{class:"sub-catalog-wrapper"},r.map(({icon:o,path:g,title:k},G)=>n(m,{class:"sub-catalog-item",to:g},()=>[o?n(f,{icon:o}):null,`${e+1}.${d+1}.${G+1} ${k||"Unknown"}`]))):null]))):null])])}});export{U as default};
//# sourceMappingURL=Catalog.js.map
