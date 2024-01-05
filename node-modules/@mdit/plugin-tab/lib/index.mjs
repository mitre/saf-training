const x=r=>r.replace(/&/gu,"&amp;").replace(/</gu,"&lt;").replace(/>/gu,"&gt;").replace(/"/gu,"&quot;").replace(/'/gu,"&#039;"),g="@tab",y=(r,p)=>(t,n,b,_)=>{if(p.state!==r)return!1;let a=t.bMarks[n]+t.tShift[n],o=t.eMarks[n];if(t.src.charAt(a)!=="@")return!1;let e;for(e=0;e<g.length;e++)if(g[e]!==t.src[a+e])return!1;const s=t.src.slice(a,a+e),l=t.src.slice(a+e,o);if(_)return!0;let c=n,u=!1;for(;c<b&&(c+=1,a=t.bMarks[c]+t.tShift[c],o=t.eMarks[c],!(a<o&&t.sCount[c]<t.blkIndent));)if(t.src[a]==="@"&&t.sCount[c]<=t.sCount[n]){let m=!0;for(e=0;e<g.length;e++)if(g[e]!==t.src[a+e]){m=!1;break}if(m){u=!0;break}}const k=t.parentType,i=t.lineMax;t.parentType="tab",t.lineMax=c-(u?1:0);const d=t.push(`${r}_tab_open`,"",1),[,$,v]=/^(.*?)(?:(?<!\\)#([^#]*))?$/.exec(l.replace(/^:active/,""));d.block=!0,d.markup=s,d.info=$.trim().replace(/\\#/g,"#"),d.meta={active:l.includes(":active")},v&&(d.meta.id=v.trim()),d.map=[n,c-(u?1:0)],t.md.block.tokenize(t,n+1,c+(u?0:1));const f=t.push(`${r}_tab_close`,"",-1);return f.block=!0,f.markup="",t.parentType=k,t.lineMax=i,t.line=c+(u?0:1),!0},S=(r,p)=>(t,n,b,_)=>{let a=t.bMarks[n]+t.tShift[n],o=t.eMarks[n];if(t.src[a]!==":")return!1;let e=a+1;for(;e<=o&&t.src[e]===":";)e+=1;const s=e-a;if(s<3)return!1;const l=t.src.slice(a,e),c=t.src.slice(e,o),[u,k=""]=c.split("#",2);if(u.trim()!==r)return!1;if(_)return!0;let i=n,d=!1;for(;i<b&&(i+=1,a=t.bMarks[i]+t.tShift[i],o=t.eMarks[i],!(a<o&&t.sCount[i]<t.blkIndent));)if(t.src[a]===":"&&t.sCount[i]-t.blkIndent<4){for(e=a+1;e<=o&&t.src[e]===":";e++);if(e-a>=s&&(e=t.skipSpaces(e),e>=o)){d=!0;break}}const $=t.parentType,v=t.lineMax;t.parentType=`${r}_tabs`,t.lineMax=i-(d?1:0);const f=t.push(`${r}_tabs_open`,"",1);f.markup=l,f.block=!0,f.info=u,f.meta={id:k.trim()},f.map=[n,i-(d?1:0)];const m=p.state;p.state=r,t.md.block.tokenize(t,n+1,i-(d?1:0)),p.state=m;const h=t.push(`${r}_tabs_close`,"",-1);return h.markup=t.src.slice(a,e),h.block=!0,t.parentType=$,t.lineMax=v,t.line=i+(d?1:0),!0},C=r=>(p,t)=>{const n=[];let b=-1,_=!1,a=-1;for(let o=t;o<p.length;o++){const{block:e,meta:s,type:l,info:c}=p[o];if(e){if(l===`${r}_tabs_open`){a+=1;continue}if(l===`${r}_tabs_close`){if(a===0)break;a-=1;continue}if(a>0)continue;if(l===`${r}_tab_open`){_=!0,s.index=n.length,s.active&&(b===-1?b=n.length:s.active=!1),n.push({title:c,index:s.index,...s.id?{id:s.id}:{}});continue}if(l===`${r}_tab_close`)continue;_||(p[o].type=`${r}_tabs_empty`,p[o].hidden=!0)}}return{active:b,data:n.map((o,e)=>({...o,active:e===b}))}},A=(r,p)=>{const{info:t,meta:n}=r[p];return{title:t,index:n.index,...n.id?{id:n.id}:{},isActive:!!n.active}},M={state:null},T=(r,p)=>{const{name:t="tabs",tabsOpenRenderer:n=(e,s,l,c,u,k)=>{const{active:i,data:d}=e,$=s[l];$.attrJoin("class",`${t}-tabs-wrapper`),$.meta.id&&$.attrJoin("data-id",$.meta.id);const v=d.map(({title:f,id:m},h)=>`<button type="button" class="${t}-tab-button${i===h?" active":""}" data-tab="${h}"${m?` data-id="${x(m)}"`:""}${i===h?" data-active":""}>${x(f)}</button>`);return`<div${k.renderAttrs($)}>
  <div class="${t}-tabs-header">
    ${v.join(`
    `)}
  </div>
  <div class="${t}-tabs-container">
`},tabsCloseRenderer:b=()=>`
  </div>
</div>`,tabOpenRenderer:_=(e,s,l,c,u,k)=>{const i=s[l];return i.attrJoin("class",`${t}-tab-content${e.isActive?" active":""}`),i.attrSet("data-index",e.index.toString()),e.id&&i.attrSet("data-id",e.id.toString()),e.isActive&&i.attrJoin("data-active",""),`<div${k.renderAttrs(s[l])}>`},tabCloseRenderer:a=()=>"</div>"}=p||{},o=C(t);r.block.ruler.before("fence",`${t}_tabs`,S(t,M),{alt:["paragraph","reference","blockquote","list"]}),r.block.ruler.before("paragraph",`${t}_tab`,y(t,M),{alt:["paragraph","reference","blockquote","list"]}),r.renderer.rules[`${t}_tabs_open`]=(e,s,l,c,u)=>{const k=o(e,s);return n(k,e,s,l,c,u)},r.renderer.rules[`${t}_tabs_close`]=b,r.renderer.rules[`${t}_tab_open`]=(e,s,...l)=>{const c=A(e,s);return _(c,e,s,...l)},r.renderer.rules[`${t}_tab_close`]=a};export{T as tab};
//# sourceMappingURL=index.mjs.map
