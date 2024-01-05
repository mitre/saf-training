import{createPage as P,preparePageComponent as B,preparePageData as V,preparePagesComponents as A,preparePagesData as G,preparePagesRoutes as K}from"@vuepress/core";import{watch as j}from"chokidar";import{Logger as F,keys as J,isString as U,isFunction as T,removeLeadingSlash as D,createConverter as z,checkVersion as W,getPageExcerpt as q,addViteSsrNoExternal as Q}from"vuepress-shared/node";import{colors as m}from"@vuepress/utils";const C="vuepress-plugin-blog2",i=new F(C),N=({options:t,pages:_},d)=>{const k=J(t.locales),u={};return(k.length?k:["/"]).forEach(a=>{u[a]=[]}),_.filter(d).forEach(a=>{a.path!=="/404.html"&&u[a.pathLocale].push(a)}),u},X=`
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });

`,O=(t,{category:_,slugify:d},k,u=!1)=>Promise.all(_.map(async({key:a,getter:f,sorter:$=()=>-1,path:l="/:key/",layout:v="Layout",frontmatter:w=()=>({}),itemPath:E="/:key/:name/",itemLayout:M="Layout",itemFrontmatter:b=()=>({})},g)=>{if(!U(a)||!a.length)return i.error(`Invalid ${m.magenta("key")} option ${m.cyan(a)} in ${m.cyan(`category[${g}]`)}`),null;if(!T(f))return i.error(`Invalid ${m.magenta("getter")} option in "${m.cyan(`category[${g}]`)}", it should be a function!`),null;t.env.isDebug&&i.info(`Generating ${m.cyan(a)} category.
`);const e={},c=[],o=T(E)?E:U(E)?p=>E.replace(/:key/g,d(a)).replace(/:name/g,d(p)):()=>null;for(const p in k){if(l){const r=`${p}${D(l.replace(/:key/g,d(a)))}`,s=await P(t,{path:encodeURI(r),frontmatter:{...w(p),blog:{type:"category",key:a},layout:v}}),n=t.pages.findIndex(({path:h})=>h===r);n===-1?t.pages.push(s):t.pages[n].key!==s.key&&(t.pages.splice(n,1,s),u&&i.warn(`Overriding existed path ${m.cyan(r)}`)),c.push(s.key),e[p]={path:s.path,map:{}}}else e[p]={path:"",map:{}};const{map:y}=e[p],x={};for(const r of k[p]){const s=f(r);for(const n of s){if(!y[n]){const h=o(n);if(h){const L=`${p}${D(h)}`,R=await P(t,{path:`${p}${D(h)}`,frontmatter:{...b(n,p),blog:{type:"category",name:n,key:a},layout:M}}),I=t.pages.findIndex(({path:H})=>H===L);I===-1?t.pages.push(R):t.pages[I].key!==R.key&&(t.pages.splice(I,1,R),u&&i.warn(`Overriding existed path ${L}`)),c.push(R.key),y[n]={path:R.path,keys:[]}}else y[n]={path:"",keys:[]};x[n]=[]}x[n].push(r)}}for(const r in x)y[r].keys=x[r].sort($).map(({key:s})=>s);if(t.env.isDebug){let r=`Route ${p} in ${a} category:
`;for(const s in y){const{path:n,keys:h}=y[s];r+=`name: ${s}; ${n?`path: ${n}; `:""}items: ${h.length}
`}i.info(r)}}return{key:a,map:e,pageKeys:c}})).then(async a=>{const f={},$=[];return a.filter(l=>l!==null).forEach(({key:l,map:v,pageKeys:w})=>{f[l]=v,$.push(...w)}),await t.writeTemp("blog/category.js",`export const categoryMap = ${JSON.stringify(f)};
${t.env.isDev?X:""}
`),t.env.isDebug&&i.info("All categories generated."),$}),Y=t=>{const{deprecatedLogger:_}=z("blog2");_({options:t,old:"customElements",new:"isCustomElement"})},Z=`
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });
`,S=(t,{type:_,slugify:d},k,u=!1)=>Promise.all(_.map(async({key:a,sorter:f=()=>-1,filter:$=()=>!0,path:l="/:key/",layout:v="Layout",frontmatter:w=()=>({})},E)=>{if(!U(a)||!a.length)return i.error(`Invalid ${m.magenta("key")} option ${m.cyan(a)} in ${m.cyan(`type[${E}]`)}`),null;const M={},b=[];t.env.isDebug&&i.info(`Generating ${m.cyan(a)} type.
`);for(const g in k){const e=k[g].filter($).sort(f).map(({key:c})=>c);if(l){const c=`${g}${D(d(l.replace(/:key/g,a)))}`,o=await P(t,{path:encodeURI(c),frontmatter:{...w(g),blog:{type:"type",key:a},layout:v}}),p=t.pages.findIndex(({path:y})=>y===c);p===-1?t.pages.push(o):t.pages[p].key!==o.key&&(t.pages.splice(p,1,o),u&&i.warn(`Overriding existed path ${m.cyan(c)}`)),b.push(o.key),M[g]={path:o.path,keys:e},t.env.isDebug&&i.info(`Route ${g} in ${a} type: path: ${o.path}; items: ${e.length}
`)}else M[g]={path:"",keys:e},t.env.isDebug&&i.info(`Route ${g} in ${a} type: items: ${e.length}
`)}return{key:a,map:M,pageKeys:b}})).then(async a=>{const f={},$=[];return a.filter(l=>l!==null).forEach(({key:l,map:v,pageKeys:w})=>{f[l]=v,$.push(...w)}),await t.writeTemp("blog/type.js",`export const typeMap = ${JSON.stringify(f)};
${t.env.isDev?Z:""}
`),t.env.isDebug&&i.info("All types generated."),$}),ee=(t,_=!0)=>d=>{_&&Y(t),W(d,C,"2.0.0-rc.0");const{getInfo:k=()=>({}),filter:u=e=>!!e.filePathRelative&&!e.frontmatter.home,metaScope:a="_blog",excerpt:f=!0,excerptSeparator:$="<!-- more -->",excerptLength:l=300,excerptFilter:v=u,isCustomElement:w=()=>!1,category:E=[],type:M=[],slugify:b=e=>e.replace(/[ _]/g,"-").replace(/[:?*|\\/<>]/g,"").toLowerCase()}=t;let g=[];return d.env.isDebug&&i.info("Options:",t),{name:C,define:()=>({BLOG_META_SCOPE:a}),extendsPage:e=>{f&&v(e)&&(e.data.excerpt=q(d,e,{isCustomElement:w,excerptSeparator:$,excerptLength:l}))},extendsBundlerOptions:(e,c)=>{Q(e,c,"vuepress-shared")},onInitialized:e=>{const c=N(e,u);return e.pages.filter(u).forEach(o=>{o.routeMeta={...a===""?k(o):{[a]:k(o)},...o.routeMeta}}),Promise.all([O(e,{category:E,slugify:b},c,!0).then(o=>{g.push(...o)}),S(e,{type:M,slugify:b},c,!0).then(o=>{g.push(...o)})]).then(()=>{e.env.isDebug&&i.info("temp file generated")})},onWatched:(e,c)=>{if("hotReload"in t?t.hotReload:e.env.isDebug){const o=j("pages/**/*.js",{cwd:e.dir.temp(),ignoreInitial:!0}),p=()=>{const y=[],x=N(e,u);return Promise.all([O(e,{category:E,slugify:b},x).then(r=>{y.push(...r)}),S(e,{type:M,slugify:b},x).then(r=>{y.push(...r)})]).then(async()=>{const r=g.filter(n=>!y.includes(n)),s=y.filter(n=>!g.includes(n));s.length&&(e.env.isDebug&&i.info(`New pages detected: ${s.toString()}`),await Promise.all(s.map(async n=>{await B(e,e.pages.find(({key:h})=>h===n)),await V(e,e.pages.find(({key:h})=>h===n))}))),r.length&&(e.env.isDebug&&i.info(`Removing following pages: ${r.toString()}`),r.forEach(n=>{e.pages.splice(e.pages.findIndex(({key:h})=>h===n),1)})),(r.length||s.length)&&(await A(e),await G(e),await K(e)),g=y,e.env.isDebug&&i.info("temp file updated")})};o.on("add",()=>{p()}),o.on("change",()=>{p()}),o.on("unlink",()=>{p()}),c.push(o)}}}};export{ee as blogPlugin};
//# sourceMappingURL=index.js.map
