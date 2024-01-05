const r=async()=>{try{const{pageviewCount:e}=await import("@waline/client/pageview");return e({serverURL:COMMENT_OPTIONS.serverURL})}catch{console.error("@waline/client is not installed!");return}};export{r as updatePageview};
//# sourceMappingURL=pageview.js.map
