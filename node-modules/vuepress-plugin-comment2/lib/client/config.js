import{usePageData as r,usePageFrontmatter as i,defineClientConfig as p}from"@vuepress/client";import{defineComponent as d,computed as c,h as s}from"vue";import u from"vuepress-plugin-comment2/provider";import{d as f,i as l}from"./index-wG_My4pN.js";var v=d({name:"CommentService",props:{darkmode:Boolean},setup(e){const m=f(),n=r(),o=i(),t=m.comment!==!1,a=c(()=>o.value.comment||t&&o.value.comment!==!1);return()=>s(u,{identifier:o.value.commentID||n.value.path,darkmode:e.darkmode,style:{display:a.value?"block":"none"}})}}),C=p({enhance:({app:e})=>{l(e),e.component("CommentService",v)}});export{C as default};
//# sourceMappingURL=config.js.map
