"use strict";const R=/[^\t\n\f />"'=]/,v=" ",E="=",k=".",$="#",p=(e,t,{left:i,right:n,allowed:r})=>{let s="",l="",o=!0,h=!1;const f=[];for(let a=t+i.length;a<e.length;a++){if(e.slice(a,a+n.length)===n){s!==""&&f.push([s,l]);break}const c=e.charAt(a);if(c===E&&o){o=!1;continue}if(c===k&&s===""){e.charAt(a+1)===k?(s="css-module",a+=1):s="class",o=!1;continue}if(c===$&&s===""){s="id",o=!1;continue}if(c==='"'&&l===""){h=!0;continue}if(c==='"'&&h){h=!1;continue}if(c===v&&!h){if(s==="")continue;f.push([s,l]),s="",l="",o=!0;continue}if(!(o&&c.search(R)===-1)){if(o){s+=c;continue}l+=c}}return r.length?f.filter(([a])=>r.some(c=>c instanceof RegExp?c.test(a):c===a)):f},u=(e,t)=>{t&&e.forEach(i=>{const[n,r]=i;n==="class"?t.attrJoin("class",r):n==="css-module"?t.attrJoin("css-module",r):t.attrPush(i)})},w=(e,t)=>t>=0?e[t]:e[e.length+t],b=e=>e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),I=e=>Array.isArray(e)&&!!e.length&&e.every(t=>typeof t=="function"),S=e=>Array.isArray(e)&&!!e.length&&e.every(t=>typeof t=="object"),g=(e,t,i)=>n=>{const r=t.length,s=i.length,l=r+1+s;if(!n||typeof n!="string"||n.length<l)return!1;const o=d=>{const x=d.charAt(r)===".",O=d.charAt(r)==="#";return x||O?d.length>=l+1:d.length>=l};let h,f,a,c;const y=l-s;switch(e){case"start":a=n.slice(0,r),h=a===t?0:-1,f=h===-1?-1:n.indexOf(i,y),c=n.charAt(f+s),c&&i.indexOf(c)!==-1&&(f=-1);break;case"end":h=n.lastIndexOf(t),f=h===-1?-1:n.indexOf(i,h+y),f=f===n.length-s?f:-1;break;case"only":a=n.slice(0,r),h=a===t?0:-1,a=n.slice(n.length-s),f=a===i?n.length-s:-1;break}return h!==-1&&f!==-1&&o(n.substring(h,f+s))},j=(e,t,i)=>{const n=b(t),r=b(i),s=e.search(new RegExp(`[ \\n]?${n}[^${n}${r}]+${r}$`));return s!==-1?e.slice(0,s):e},m=(e,t)=>{if(e[t].type==="softbreak")return null;if(e[t].nesting===0)return e[t];const i=e[t].level,n=e[t].type.replace("_close","_open");for(;t>=0;--t)if(e[t].type===n&&e[t].level===i)return e[t];return null},D=e=>({name:"code-block",tests:[{shift:0,block:!0,info:g("end",e.left,e.right)}],transform:(t,i)=>{const n=t[i];let r="";const s=n.info.match(/{(?:[\d,-]+)}/);s&&(n.info=n.info.replace(s[0],""),r=s[0]);const l=n.info.lastIndexOf(e.left),o=p(n.info,l,e);u(o,n),n.info=`${j(n.info,e.left,e.right)} ${r}`}}),K=e=>[{name:"inline nesting 0",tests:[{shift:0,type:"inline",children:[{shift:-1,type:t=>t==="image"||t==="code_inline"},{shift:0,type:"text",content:g("start",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=r.content.indexOf(e.right),l=t[i].children[n-1],o=p(r.content,0,e);u(o,l),r.content.length===s+e.right.length?t[i].children.splice(n,1):r.content=r.content.slice(s+e.right.length)}},{name:"inline attributes",tests:[{shift:0,type:"inline",children:[{shift:-1,nesting:-1},{shift:0,type:"text",content:g("start",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,0,e),o=m(t[i].children,n-1);u(l,o),r.content=s.slice(s.indexOf(e.right)+e.right.length)}}],P=e=>({name:"table",tests:[{shift:0,type:"table_close"},{shift:1,type:"paragraph_open"},{shift:2,type:"inline",content:g("only",e.left,e.right)}],transform:(t,i)=>{const n=t[i+2],r=m(t,i),s=p(n.content,0,e);u(s,r),t.splice(i+1,3)}}),T=e=>[{name:"list softbreak",tests:[{shift:-2,type:"list_item_open"},{shift:0,type:"inline",children:[{position:-2,type:"softbreak"},{position:-1,type:"text",content:g("only",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=p(r.content,0,e);let l=i-2;for(;t[l-1]&&t[l-1].type!=="ordered_list_open"&&t[l-1].type!=="bullet_list_open";)l--;u(s,t[l-1]),t[i].children=t[i].children.slice(0,-2)}},{name:"list double softbreak",tests:[{shift:0,type:t=>t==="bullet_list_close"||t==="ordered_list_close"},{shift:1,type:"paragraph_open"},{shift:2,type:"inline",content:g("only",e.left,e.right),children:t=>t.length===1},{shift:3,type:"paragraph_close"}],transform:(t,i)=>{const n=t[i+2],r=p(n.content,0,e),s=m(t,i);u(r,s),t.splice(i+1,3)}},{name:"list item end",tests:[{shift:-2,type:"list_item_open"},{shift:0,type:"inline",children:[{position:-1,type:"text",content:g("end",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,s.lastIndexOf(e.left),e);u(l,t[i-2]);const o=s.slice(0,s.lastIndexOf(e.left));r.content=o[o.length-1]===" "?o.slice(0,-1):o}}],L=e=>({name:`
{.a} softbreak then curly in start`,tests:[{shift:0,type:"inline",children:[{position:-2,type:"softbreak"},{position:-1,type:"text",content:g("only",e.left,e.right)}]}],transform:(t,i,n)=>{const r=t[i].children[n],s=p(r.content,0,e);let l=i+1;for(;t[l+1]&&t[l+1].nesting===-1;)l++;const o=m(t,l);u(s,o),t[i].children=t[i].children.slice(0,-2)}}),M=e=>({name:"horizontal rule",tests:[{shift:0,type:"paragraph_open"},{shift:1,type:"inline",children:t=>t.length===1,content:t=>t.match(new RegExp(`^ {0,3}[-*_]{3,} ?${b(e.left)}[^${b(e.right)}]`))!==null},{shift:2,type:"paragraph_close"}],transform:(t,i)=>{const n=t[i];n.type="hr",n.tag="hr",n.nesting=0;const{content:r}=t[i+1],s=r.lastIndexOf(e.left),l=p(r,s,e);u(l,n),n.markup=r,t.splice(i+1,2)}}),C=e=>({name:"end of block",tests:[{shift:0,type:"inline",children:[{position:-1,content:g("end",e.left,e.right),type:t=>t!=="code_inline"&&t!=="math_inline"}]}],transform:(t,i,n)=>{const r=t[i].children[n],{content:s}=r,l=p(s,s.lastIndexOf(e.left),e);let o=i+1;for(;t[o+1]&&t[o+1].nesting===-1;)o++;const h=m(t,o);u(l,h);const f=s.slice(0,s.lastIndexOf(e.left));r.content=f[f.length-1]===" "?f.slice(0,-1):f}}),A=["fence","inline","table","list","hr","softbreak","block"],J=e=>{const t=e.rule===!1?[]:Array.isArray(e.rule)?e.rule.filter(n=>A.includes(n)):A,i=[];return t.includes("fence")&&i.push(D(e)),t.includes("inline")&&i.push(...K(e)),t.includes("list")&&i.push(...T(e)),t.includes("table")&&i.push(P(e)),t.includes("softbreak")&&i.push(L(e)),t.includes("hr")&&i.push(M(e)),t.includes("block")&&i.push(C(e)),i},_=(e,t,i)=>{const n={match:!1,position:null},r=i.shift!==void 0?t+i.shift:i.position;if(i.shift!==void 0&&r<0)return n;const s=w(e,r);if(s===void 0)return n;for(const l of Object.keys(i)){if(l==="shift"||l==="position")continue;if(s[l]===void 0)return n;if(l==="children"&&S(i.children)){if(s.children?.length===0)return n;let h;const f=i.children,a=s.children;if(f?.every(c=>c.position!==void 0)){if(h=f.every(c=>_(a,c.position,c).match),h){const c=f[f.length-1]?.position||0;n.position=c>=0?c:a.length+c}}else for(let c=0;c<a.length;c++)if(h=f.every(y=>_(a,c,y).match),h){n.position=c;break}if(h===!1)return n;continue}const o=i[l];switch(typeof o){case"boolean":case"number":case"string":if(s[l]!==o)return n;break;case"function":if(!o(s[l]))return n;break;case"object":if(I(o)){if(o.every(h=>h(s[l]))===!1)return n;break}continue;default:throw new Error(`Unknown type of pattern test (key: ${l}). Test should be of type boolean, number, string, function or array of functions.`)}}return n.match=!0,n},Y=(e,{left:t="{",right:i="}",allowed:n=[],rule:r="all"}={})=>{const s=J({left:t,right:i,allowed:n,rule:r}),l=({tokens:o})=>{for(let h=0;h<o.length;h++)for(let f=0;f<s.length;f++){const a=s[f];let c=null;a.tests.every(y=>{const d=_(o,h,y);return d.position!==null&&({position:c}=d),d.match})&&(a.transform(o,h,c),(a.name==="inline attributes"||a.name==="inline nesting 0")&&(f-=1))}};e.core.ruler.before("linkify","attrs",l)};exports.attrs=Y;
//# sourceMappingURL=index.cjs.map
