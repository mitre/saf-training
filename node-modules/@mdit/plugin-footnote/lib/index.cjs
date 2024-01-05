"use strict";var m=require("markdown-it/lib/helpers/parse_link_label.js"),i=require("markdown-it/lib/token.js");const h=(e,n)=>e[n].meta.subId>0?`:${e[n].meta.subId}`:"",A=(e,n,t,s)=>`${typeof s.docId=="string"?`-${s.docId}-`:""}${(e[n].meta.id+1).toString()}`,C=(e,n)=>`[${(e[n].meta.id+1).toString()}${h(e,n)}]`,g=(e,n,t,s,o)=>{const c=o.rules.footnoteAnchorName(e,n,t,s,o),f=o.rules.footnoteCaption(e,n,t,s,o);return`<sup class="footnote-ref"><a href="#footnote${c}">${f}</a><a class="footnote-anchor" id="footnote-ref${c}${h(e,n)}" /></sup>`},I=(e,n,t)=>`<hr class="footnotes-sep"${t.xhtmlOut?" /":""}>
<section class="footnotes">
<ol class="footnotes-list">
`,w=()=>`</ol>
</section>
`,M=(e,n,t,s,o)=>`<li id="footnote${o.rules.footnoteAnchorName(e,n,t,s,o)}${h(e,n)}" class="footnote-item">`,y=()=>`</li>
`,R=(e,n,t,s,o)=>` <a href="#footnote-ref${o.rules.footnoteAnchorName(e,n,t,s,o)}${h(e,n)}" class="footnote-backref">↩︎</a>`,S=(e,n,t,s)=>{let o,c,f,a;const r=e.bMarks[n]+e.tShift[n],l=e.eMarks[n];if(r+4>l||e.src.charAt(r)!=="["||e.src.charAt(r+1)!=="^")return!1;for(o=r+2;o<l;o++){if(e.src.charAt(o)===" ")return!1;if(e.src.charAt(o)==="]")break}if(o===r+2||o+1>=l||e.src.charAt(++o)!==":")return!1;if(s)return!0;o+=1,e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.refs||(e.env.footnotes.refs={});const p=e.src.slice(r+2,o-2);e.env.footnotes.refs[`:${p}`]=-1,c=new i("footnoteReferenceOpen","",1),c.meta={label:p},c.level=e.level++,e.tokens.push(c);const u=e.bMarks[n],b=e.tShift[n],v=e.sCount[n],d=e.parentType,k=o,$=e.sCount[n]+o-(e.bMarks[n]+e.tShift[n]);for(f=e.sCount[n]+o-(e.bMarks[n]+e.tShift[n]);o<l;){if(a=e.src.charAt(o),a==="	")f+=4-f%4;else if(a===" ")f+=1;else break;o+=1}return e.tShift[n]=o-k,e.sCount[n]=f-$,e.bMarks[n]=k,e.blkIndent+=4,e.parentType="footnote",e.sCount[n]<e.blkIndent&&(e.sCount[n]+=e.blkIndent),e.md.block.tokenize(e,n,t),e.parentType=d,e.blkIndent-=4,e.tShift[n]=b,e.sCount[n]=v,e.bMarks[n]=u,c=new i("footnoteReferenceClose","",-1),c.level=--e.level,e.tokens.push(c),!0},O=(e,n)=>{let t,s,o;const c=e.posMax,f=e.pos;if(f+2>=c||e.src.charAt(f)!=="^"||e.src.charAt(f+1)!=="[")return!1;const a=f+2,r=m(e,f+1);return r<0?!1:(n||(e.env.footnotes||(e.env.footnotes={}),e.env.footnotes.list||(e.env.footnotes.list=[]),t=e.env.footnotes.list.length,e.md.inline.parse(e.src.slice(a,r),e.md,e.env,o=[]),s=e.push("footnoteRef","",0),s.meta={id:t},e.env.footnotes.list[t]={content:e.src.slice(a,r),tokens:o}),e.pos=r+1,e.posMax=c,!0)},N=(e,n)=>{let t,s,o,c;const f=e.posMax,a=e.pos;if(a+3>f||!e.env.footnotes||!e.env.footnotes.refs||e.src.charAt(a)!=="["||e.src.charAt(a+1)!=="^")return!1;for(t=a+2;t<f;t++){if(e.src.charAt(t)===" "||e.src.charAt(t)===`
`)return!1;if(e.src.charAt(t)==="]")break}if(t===a+2||t>=f)return!1;t+=1;const r=e.src.slice(a+2,t-1);return typeof e.env.footnotes.refs[`:${r}`]>"u"?!1:(n||(e.env.footnotes.list||(e.env.footnotes.list=[]),e.env.footnotes.refs[`:${r}`]<0?(s=e.env.footnotes.list.length,e.env.footnotes.list[s]={label:r,count:0},e.env.footnotes.refs[`:${r}`]=s):s=e.env.footnotes.refs[`:${r}`],o=e.env.footnotes.list[s].count,e.env.footnotes.list[s].count=e.env.footnotes.list[s].count+1,c=e.push("footnoteRef","",0),c.meta={id:s,subId:o,label:r}),e.pos=t,e.posMax=f,!0)},x=e=>{let n,t,s,o,c,f=!1;const a={};if(!e.env.footnotes||(e.tokens=e.tokens.filter(l=>l.type==="footnoteReferenceOpen"?(f=!0,o=[],c=l.meta.label,!1):l.type==="footnoteReferenceClose"?(f=!1,a[`:${c}`]=o,!1):(f&&o.push(l),!f)),!e.env.footnotes.list))return!1;const{list:r}=e.env.footnotes;t=new i("footnoteBlockOpen","",1),e.tokens.push(t);for(let l=0,{length:p}=r;l<p;l++){t=new i("footnoteOpen","",1),t.meta={id:l,label:r[l].label},e.tokens.push(t),r[l].tokens?(s=[],t=new i("paragraph_open","p",1),t.block=!0,s.push(t),t=new i("inline","",0),t.children=r[l].tokens,t.content=r[l].content,s.push(t),t=new i("paragraph_close","p",-1),t.block=!0,s.push(t)):r[l].label?s=a[`:${r[l].label}`]:s=[],s&&(e.tokens=e.tokens.concat(s)),e.tokens[e.tokens.length-1].type==="paragraph_close"?n=e.tokens.pop()||null:n=null;for(let u=0;u<(Number(r[l].count)>0?r[l].count:1);u++)t=new i("footnoteAnchor","",0),t.meta={id:l,subId:u,label:r[l].label},e.tokens.push(t);n&&e.tokens.push(n),t=new i("footnoteClose","",-1),e.tokens.push(t)}return t=new i("footnoteBlockClose","",-1),e.tokens.push(t),!0},B=e=>{e.renderer.rules.footnoteRef=g,e.renderer.rules.footnoteBlockOpen=I,e.renderer.rules.footnoteBlockClose=w,e.renderer.rules.footnoteOpen=M,e.renderer.rules.footnoteClose=y,e.renderer.rules.footnoteAnchor=R,e.renderer.rules.footnoteCaption=C,e.renderer.rules.footnoteAnchorName=A,e.block.ruler.before("reference","footnoteDef",S,{alt:["paragraph","reference"]}),e.inline.ruler.after("image","footnoteInline",O),e.inline.ruler.after("footnoteInline","footnoteRef",N),e.core.ruler.after("inline","footnoteTail",x)};exports.footnote=B;
//# sourceMappingURL=index.cjs.map
