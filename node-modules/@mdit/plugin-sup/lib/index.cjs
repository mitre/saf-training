"use strict";const c=/\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/gu,a=(s,n)=>{let u,e;const r=s.posMax,o=s.pos;if(s.src.charAt(o)!=="^"||n||o+2>=r)return!1;for(s.pos=o+1;s.pos<r;){if(s.src.charAt(s.pos)==="^"){u=!0;break}s.md.inline.skipToken(s)}if(!u||o+1===s.pos)return s.pos=o,!1;const t=s.src.slice(o+1,s.pos);return/(^|[^\\])(\\\\)*\s/u.exec(t)?(s.pos=o,!1):(s.posMax=s.pos,s.pos=o+1,e=s.push("sup_open","sup",1),e.markup="^",e=s.push("text","",0),e.content=t.replace(c,"$1"),e=s.push("sup_close","sup",-1),e.markup="^",s.pos=s.posMax+1,s.posMax=r,!0)},i=s=>{s.inline.ruler.after("emphasis","sup",a)};exports.sup=i;
//# sourceMappingURL=index.cjs.map
