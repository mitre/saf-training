"use strict";const S=(p,{name:l,open:h,close:m,render:d}={name:"uml",open:"start",close:"end",render:(o,i)=>{const f=o[i],{content:e,info:c,type:u}=f;return`<div class="${u}" title="${c}">${e}</div>`}})=>{const o=`@${h}`,i=`@${m}`,f=(e,c,u,$)=>{let t,k=!1,n=e.bMarks[c]+e.tShift[c],a=e.eMarks[c];if(e.src.charAt(n)!=="@")return!1;for(t=0;t<o.length;++t)if(o[t]!==e.src[n+t])return!1;const g=e.src.slice(n,n+t),M=e.src.slice(n+t,a);if($)return!0;let s=c;for(;s<u&&(n=e.bMarks[s]+e.tShift[s],a=e.eMarks[s],!(n<a&&e.sCount[s]<e.blkIndent));){if(e.src.charAt(n)==="@"&&e.sCount[s]<=e.sCount[c]){let b=!0;for(t=0;t<i.length;++t)if(i[t]!==e.src[n+t]){b=!1;break}if(b&&e.skipSpaces(n+t)>=a){k=!0;break}}s+=1}const C=e.src.split(`
`).slice(c+1,s).join(`
`),r=e.push(l,"fence",0);return r.block=!0,r.info=M,r.content=C,r.map=[c,s],r.markup=g,e.line=s+(k?1:0),!0};p.block.ruler.before("fence",l,f,{alt:["paragraph","reference","blockquote","list"]}),p.renderer.rules[l]=d};exports.uml=S;
//# sourceMappingURL=index.cjs.map
