import{getDirname as k,path as g,fs as A}from"@vuepress/utils";import{watch as b}from"chokidar";import{getBundlerName as F,mergeViteConfig as L,isString as x,isFunction as I,Logger as M,checkVersion as N}from"vuepress-shared/node";const B=(t,s,e)=>{const i=F(s);if(i==="vite"){const a=t,n=a.viteOptions?.css?.preprocessorOptions?.scss.additionalData;a.viteOptions=L(a.viteOptions||{},{css:{preprocessorOptions:{scss:{charset:!1,additionalData:async(r,o)=>{const p=x(n)?`${n}${r}`:I(n)?await n(r,o):r;return p.match(new RegExp(`@use\\s+["']@sass-palette\\/${e}-config["'];`))?p:`@use "@sass-palette/${e}-config";
${p}`}}}}})}else if(i==="webpack"){const a=t;a.scss||(a.scss={});const{additionalData:n}=a.scss,r=(o,p)=>{const c=x(n)?`${n}${o}`:I(n)?n(o,p):o;return c.match(new RegExp(`@use\\s+(["'])@sass-palette\\/${e}-config\\1;`))?c:`@use "@sass-palette/${e}-config";
${c}`};a.scss.additionalData=r}},R=k(import.meta.url),V=g.resolve(R,"../../styles/empty.scss"),S="vuepress-plugin-sass-palette",$=new M(S),u=t=>A.pathExistsSync(t)?t:V,_=(t,s)=>t.writeTemp(`sass-palette/load-${s}.js`,`import "@sass-palette/${s}-inject";
export default {};
`),z=(t,s)=>t.writeTemp(`sass-palette/${s}-inject.scss`,`@use "sass:meta";

@use "@sass-palette/helper";
@use "@sass-palette/${s}-palette";

$palette-variables: meta.module-variables("${s}-palette");
${t.env.isDebug?`
@debug "${s} palette variables: #{meta.inspect($palette-variables)}";
@debug "${s} config variables: #{meta.inspect(meta.module-variables("${s}-config"))}";
`:""}

@if meta.global-variable-exists("dark-selector", $module: "${s}-config") {
  @include helper.inject($palette-variables, ${s}-config.$dark-selector);
} @else {
  @include helper.inject($palette-variables);
}
`),w=(t,{id:s,defaultConfig:e,defaultPalette:i,generator:a,userConfig:n,userPalette:r})=>t.writeTemp(`sass-palette/${s}-config.scss`,`@import "file:///${u(i)}";
@import "file:///${u(e)}";
@import "file:///${u(r)}";
@import "file:///${u(n)}";
@import "file:///${u(a)}";
`),O=(t,{id:s,defaultPalette:e,generator:i,userPalette:a})=>t.writeTemp(`sass-palette/${s}-palette.scss`,`@import "file:///${u(e)}";
@import "file:///${u(a)}";
@import "file:///${u(i)}";
`),E=(t,{id:s,userStyle:e})=>e?t.writeTemp(`sass-palette/${s}-style.scss`,`@forward "file:///${u(e)}";
`):Promise.resolve(null),v=k(import.meta.url),T=t=>s=>{N(s,S,"2.0.0-rc.0"),s.env.isDebug&&$.info("Options:",t);const{id:e="hope",config:i=`.vuepress/styles/${e}-config.scss`,defaultConfig:a=g.resolve(v,"../../styles/default/config.scss"),palette:n=`.vuepress/styles/${e}-palette.scss`,defaultPalette:r=g.resolve(v,"../../styles/default/palette.scss"),generator:o=g.resolve(v,"../../styles/empty.scss"),style:p=""}=t,c=s.dir.source(i),d=s.dir.source(n),m=p?s.dir.source(p):null;return{name:S,multiple:!0,id:e,alias:{"@sass-palette/helper":g.resolve(v,"../../styles/helper.scss"),[`@sass-palette/${e}-config`]:s.dir.temp(`sass-palette/${e}-config.scss`),[`@sass-palette/${e}-inject`]:s.dir.temp(`sass-palette/${e}-inject.scss`),[`@sass-palette/${e}-palette`]:s.dir.temp(`sass-palette/${e}-palette.scss`),...p?{[`@sass-palette/${e}-style`]:s.dir.temp(`sass-palette/${e}-style.scss`)}:{}},extendsBundlerOptions:(l,f)=>{B(l,f,e)},onInitialized:()=>Promise.all([z(s,e),w(s,{id:e,defaultConfig:a,defaultPalette:r,generator:o,userConfig:c,userPalette:d}),O(s,{id:e,defaultPalette:r,generator:o,userPalette:d}),E(s,{id:e,userStyle:m})]).then(()=>{s.env.isDebug&&$.info(`Style file for ${e} generated`)}),onWatched:(l,f)=>{const P=b(c,{cwd:l.dir.source(),ignoreInitial:!0}),C=()=>w(l,{id:e,defaultConfig:a,defaultPalette:r,generator:o,userConfig:c,userPalette:d}).then(()=>{l.env.isDebug&&$.info(`Style file for ${e} updated`)});P.on("add",()=>{C()}),P.on("unlink",()=>{C()}),f.push(P);const y=b(d,{cwd:l.dir.source(),ignoreInitial:!0}),D=()=>Promise.all([w(l,{id:e,defaultConfig:a,defaultPalette:r,generator:o,userConfig:c,userPalette:d}),O(l,{id:e,defaultPalette:r,generator:o,userPalette:d})]).then(()=>{l.env.isDebug&&$.info(`Style file for ${e} updated`)});if(y.on("add",()=>{D()}),y.on("unlink",()=>{D()}),f.push(y),m){const h=b(m,{cwd:l.dir.source(),ignoreInitial:!0}),j=()=>E(l,{id:e,userStyle:m}).then(()=>{l.env.isDebug&&$.info(`Style file for ${e} updated`)});h.on("add",()=>{j()}),h.on("unlink",()=>{j()}),f.push(h)}},clientConfigFile:l=>_(l,e)}},G=(t,s)=>{const{plugins:e}=t.pluginApi;e.filter(i=>i.name==="vuepress-plugin-sass-palette").every(i=>i.id!==s.id)&&t.use(T(s))},U=(t,s)=>{const{plugins:e}=t.pluginApi,i=e.filter(a=>a.name==="vuepress-plugin-sass-palette").findIndex(a=>a.id===s);i!==-1&&t.pluginApi.plugins.splice(i,1)};export{U as removePalettePlugin,T as sassPalettePlugin,G as useSassPalettePlugin};
//# sourceMappingURL=index.js.map
