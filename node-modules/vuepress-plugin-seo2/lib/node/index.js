import{fs as D,colors as H}from"@vuepress/utils";import{createConverter as j,stripTags as B,getPageText as F,Logger as J,entries as M,isString as v,isAbsoluteUrl as x,isUrl as L,isLinkHttp as R,removeEndingSlash as I,removeLeadingSlash as W,getAuthor as $,isArray as q,getDateInfo as E,isFunction as z,startsWith as V,checkVersion as K}from"vuepress-shared/node";const Q=t=>{const{droppedLogger:e}=j("seo");e({options:t,old:"seo",new:"ogp"}),e({options:t,old:"customMeta",new:"customHead"})},X=(t,e=!0)=>{if(!t.frontmatter.description&&e){if(t.data.excerpt)t.frontmatter.description=B(t.data.excerpt).replace(/(?:\r?\n)+/g," ").replace(/ +/g," ").trim();else{const a=F(t);t.frontmatter.description=a.length>180?`${a.slice(0,177)}...`:a}t.data.autoDesc=!0}},O="vuepress-plugin-seo2",p=new J(O),T=({lang:t,path:e,pathLocale:a},{pages:n,siteData:r})=>M(r.locales).map(([i,{lang:o}])=>({path:`${i}${e.replace(a,"")}`,lang:o})).filter(i=>v(i.lang)&&i.lang!==t&&n.some(({path:o})=>o===i.path)),_=({frontmatter:t},{options:{base:e}},{hostname:a})=>{const{banner:n,cover:r}=t;if(n){if(x(n))return u(a,e,n);if(L(n))return n}if(r){if(x(r))return u(a,e,r);if(L(r))return r}return null},U=({content:t},{options:{base:e}},{hostname:a})=>{const n=/!\[.*?\]\((.*?)\)/giu.exec(t);return n?n.map(([,r])=>x(r)?u(a,e,r):L(r)?r:null).filter(r=>r!==null):[]},u=(t,e,a)=>`${R(t)?I(t):`https://${I(t)}`}${e}${W(a)}`,Y=(t,e,a)=>{const{isArticle:n=b=>!!(b.filePathRelative&&!b.frontmatter.home),author:r}=e,{options:{base:i},siteData:o}=a,{frontmatter:{author:s,time:m,date:d=m,tag:c,tags:h=c},data:{git:f={}}}=t,w=o.locales[t.pathLocale]?.title||o.title||o.locales["/"]?.title||"",S=s===!1?[]:$(s||r),l=f.updatedTime?new Date(f.updatedTime).toISOString():null,g=q(h)?h:v(c)?[c]:[],y=t.title,C=_(t,a,e),G=U(t,a,e),N=T(t,a),A=E(d)?.value?.toISOString(),k=C||G[0]||e.fallBackImage||"";return{"og:url":u(e.hostname,i,t.path),"og:site_name":w,"og:title":y,"og:description":t.frontmatter.description||"","og:type":n(t)?"article":"website","og:image":k,"og:locale":t.lang,"og:locale:alternate":N.map(({lang:b})=>b),...l?{"og:updated_time":l}:{},...e.restrictions?{"og:restrictions:age":e.restrictions}:{},...e.twitterID?{"twitter:creator":e.twitterID}:{},...k?{"twitter:card":"summary_large_image","twitter:image:alt":y}:{},"article:author":S[0]?.name,"article:tag":g,...A?{"article:published_time":A}:{},...l?{"article:modified_time":l}:{}}},Z=(t,e,a)=>{const{isArticle:n=g=>!!(g.filePathRelative&&!g.frontmatter.home),author:r}=e,{title:i,frontmatter:{author:o,description:s,time:m,date:d=m},data:{git:c={}}}=t,h=o===!1?[]:$(o||r),f=E(d)?.value?.toISOString(),w=c.updatedTime?new Date(c.updatedTime).toISOString():null,S=_(t,a,e),l=U(t,a,e);return n(t)?{"@context":"https://schema.org","@type":"Article",headline:i,image:l.length?l:[S||e.fallBackImage||""],datePublished:f,dateModified:w,author:h.map(g=>({"@type":"Person",...g}))}:{"@context":"https://schema.org","@type":"WebPage",name:i,...s?{description:s}:{}}},tt=(t,e)=>z(e.canonical)?e.canonical(t):v(e.canonical)?`${I(e.canonical)}${t.path}`:null,et=(t,{hostname:e},a)=>T(t,a).map(({lang:n,path:r})=>({lang:n,path:u(e,a.options.base,r)})),P=(t,{name:e,content:a,attribute:n=["article:","og:"].some(r=>V(e,r))?"property":"name"})=>{a&&t.push(["meta",{[n]:e,content:a}])},at=(t,e)=>{for(const a in e)switch(a){case"article:tag":e["article:tag"].forEach(n=>P(t,{name:"article:tag",content:n}));break;case"og:locale:alternate":e["og:locale:alternate"].forEach(n=>{n!==e["og:locale"]&&P(t,{name:"og:locale:alternate",content:n})});break;default:e[a]&&P(t,{name:a,content:e[a]})}},nt=(t,e)=>{t.push(["script",{type:"application/ld+json"},JSON.stringify(e)])},rt=(t,e)=>{e&&t.push(["link",{rel:"canonical",href:e}])},ot=(t,e)=>{e.forEach(({lang:a,path:n})=>{t.push(["link",{rel:"alternate",hreflang:a.toLowerCase(),href:n}])})},it=(t,e)=>{t.pages.forEach(a=>{const n=a.frontmatter.head||[],r=tt(a,e),i=et(a,e,t);if(rt(n,r),ot(n,i),a.frontmatter.seo!==!1){const o=Y(a,e,t),s=Z(a,e,t),m=e.ogp?e.ogp(o,a,t):o,d=e.jsonLd?e.jsonLd(s,a,t):s;at(n,m),nt(n,d),e.customHead&&e.customHead(n,a,t)}a.frontmatter.head=n})},st=async t=>{p.load("Generating robots.txt");const e=t.public("robots.txt");let a=D.existsSync(e)?await D.readFile(e,{encoding:"utf8"}):"";a&&!a.includes("User-agent")?(p.error(),p.update("robots.txt seems invalid!")):(a+=`
User-agent:*
Disallow:
`,await D.writeFile(t.dest("robots.txt"),a,{flag:"w"}),p.succeed())},lt=(t,e=!0)=>a=>{e&&Q(t),K(a,O,"2.0.0-rc.0"),a.env.isDebug&&p.info("Options:",t);const n={name:O};return t.hostname?{...n,extendsPage:r=>{r.frontmatter.seo!==!1&&X(r,t.autoDescription!==!1)},onInitialized:r=>{it(r,t)},onGenerated:r=>st(r.dir)}:(p.error(`Option ${H.magenta("hostname")} is required!`),n)};export{lt as seoPlugin};
//# sourceMappingURL=index.js.map
