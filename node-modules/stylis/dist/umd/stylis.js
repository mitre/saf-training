(function(e,r){typeof exports==="object"&&typeof module!=="undefined"?r(exports):typeof define==="function"&&define.amd?define(["exports"],r):(e=e||self,r(e.stylis={}))})(this,(function(e){"use strict";var r="-ms-";var a="-moz-";var c="-webkit-";var n="comm";var t="rule";var s="decl";var i="@page";var u="@media";var o="@import";var l="@charset";var f="@viewport";var p="@supports";var h="@document";var v="@namespace";var b="@keyframes";var d="@font-face";var w="@counter-style";var m="@font-feature-values";var g="@layer";var k=Math.abs;var $=String.fromCharCode;var x=Object.assign;function E(e,r){return M(e,0)^45?(((r<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3):0}function y(e){return e.trim()}function T(e,r){return(e=r.exec(e))?e[0]:e}function A(e,r,a){return e.replace(r,a)}function O(e,r,a){return e.indexOf(r,a)}function M(e,r){return e.charCodeAt(r)|0}function C(e,r,a){return e.slice(r,a)}function R(e){return e.length}function S(e){return e.length}function z(e,r){return r.push(e),e}function N(e,r){return e.map(r).join("")}function P(e,r){return e.filter((function(e){return!T(e,r)}))}e.line=1;e.column=1;e.length=0;e.position=0;e.character=0;e.characters="";function j(r,a,c,n,t,s,i,u){return{value:r,root:a,parent:c,type:n,props:t,children:s,line:e.line,column:e.column,length:i,return:"",siblings:u}}function U(e,r){return x(j("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},r)}function _(e){while(e.root)e=U(e.root,{children:[e]});z(e,e.siblings)}function F(){return e.character}function I(){e.character=e.position>0?M(e.characters,--e.position):0;if(e.column--,e.character===10)e.column=1,e.line--;return e.character}function L(){e.character=e.position<e.length?M(e.characters,e.position++):0;if(e.column++,e.character===10)e.column=1,e.line++;return e.character}function D(){return M(e.characters,e.position)}function Y(){return e.position}function K(r,a){return C(e.characters,r,a)}function V(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function W(r){return e.line=e.column=1,e.length=R(e.characters=r),e.position=0,[]}function B(r){return e.characters="",r}function G(r){return y(K(e.position-1,Q(r===91?r+2:r===40?r+1:r)))}function H(e){return B(q(W(e)))}function Z(r){while(e.character=D())if(e.character<33)L();else break;return V(r)>2||V(e.character)>3?"":" "}function q(r){while(L())switch(V(e.character)){case 0:z(ee(e.position-1),r);break;case 2:z(G(e.character),r);break;default:z($(e.character),r)}return r}function J(r,a){while(--a&&L())if(e.character<48||e.character>102||e.character>57&&e.character<65||e.character>70&&e.character<97)break;return K(r,Y()+(a<6&&D()==32&&L()==32))}function Q(r){while(L())switch(e.character){case r:return e.position;case 34:case 39:if(r!==34&&r!==39)Q(e.character);break;case 40:if(r===41)Q(r);break;case 92:L();break}return e.position}function X(r,a){while(L())if(r+e.character===47+10)break;else if(r+e.character===42+42&&D()===47)break;return"/*"+K(a,e.position-1)+"*"+$(r===47?r:L())}function ee(r){while(!V(D()))L();return K(r,e.position)}function re(e){return B(ae("",null,null,null,[""],e=W(e),0,[0],e))}function ae(e,r,a,c,n,t,s,i,u){var o=0;var l=0;var f=s;var p=0;var h=0;var v=0;var b=1;var d=1;var w=1;var m=0;var g="";var x=n;var E=t;var y=c;var T=g;while(d)switch(v=m,m=L()){case 40:if(v!=108&&M(T,f-1)==58){if(O(T+=A(G(m),"&","&\f"),"&\f",k(o?i[o-1]:0))!=-1)w=-1;break}case 34:case 39:case 91:T+=G(m);break;case 9:case 10:case 13:case 32:T+=Z(v);break;case 92:T+=J(Y()-1,7);continue;case 47:switch(D()){case 42:case 47:z(ne(X(L(),Y()),r,a,u),u);break;default:T+="/"}break;case 123*b:i[o++]=R(T)*w;case 125*b:case 59:case 0:switch(m){case 0:case 125:d=0;case 59+l:if(w==-1)T=A(T,/\f/g,"");if(h>0&&R(T)-f)z(h>32?te(T+";",c,a,f-1,u):te(A(T," ","")+";",c,a,f-2,u),u);break;case 59:T+=";";default:z(y=ce(T,r,a,o,l,n,i,g,x=[],E=[],f,t),t);if(m===123)if(l===0)ae(T,r,y,y,x,t,f,i,E);else switch(p===99&&M(T,3)===110?100:p){case 100:case 108:case 109:case 115:ae(e,y,y,c&&z(ce(e,y,y,0,0,n,i,g,n,x=[],f,E),E),n,E,f,i,c?x:E);break;default:ae(T,y,y,y,[""],E,0,i,E)}}o=l=h=0,b=w=1,g=T="",f=s;break;case 58:f=1+R(T),h=v;default:if(b<1)if(m==123)--b;else if(m==125&&b++==0&&I()==125)continue;switch(T+=$(m),m*b){case 38:w=l>0?1:(T+="\f",-1);break;case 44:i[o++]=(R(T)-1)*w,w=1;break;case 64:if(D()===45)T+=G(L());p=D(),l=f=R(g=T+=ee(Y())),m++;break;case 45:if(v===45&&R(T)==2)b=0}}return t}function ce(e,r,a,c,n,s,i,u,o,l,f,p){var h=n-1;var v=n===0?s:[""];var b=S(v);for(var d=0,w=0,m=0;d<c;++d)for(var g=0,$=C(e,h+1,h=k(w=i[d])),x=e;g<b;++g)if(x=y(w>0?v[g]+" "+$:A($,/&\f/g,v[g])))o[m++]=x;return j(e,r,a,n===0?t:u,o,l,f,p)}function ne(e,r,a,c){return j(e,r,a,n,$(F()),C(e,2,-2),0,c)}function te(e,r,a,c,n){return j(e,r,a,s,C(e,0,c),C(e,c+1,-1),c,n)}function se(e,n,t){switch(E(e,n)){case 5103:return c+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return c+e+e;case 4789:return a+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return c+e+a+e+r+e+e;case 5936:switch(M(e,n+11)){case 114:return c+e+r+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return c+e+r+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return c+e+r+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return c+e+r+e+e;case 6165:return c+e+r+"flex-"+e+e;case 5187:return c+e+A(e,/(\w+).+(:[^]+)/,c+"box-$1$2"+r+"flex-$1$2")+e;case 5443:return c+e+r+"flex-item-"+A(e,/flex-|-self/g,"")+(!T(e,/flex-|baseline/)?r+"grid-row-"+A(e,/flex-|-self/g,""):"")+e;case 4675:return c+e+r+"flex-line-pack"+A(e,/align-content|flex-|-self/g,"")+e;case 5548:return c+e+r+A(e,"shrink","negative")+e;case 5292:return c+e+r+A(e,"basis","preferred-size")+e;case 6060:return c+"box-"+A(e,"-grow","")+c+e+r+A(e,"grow","positive")+e;case 4554:return c+A(e,/([^-])(transform)/g,"$1"+c+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,c+"$1"),/(image-set)/,c+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,c+"$1"+"$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,c+"box-pack:$3"+r+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+c+e+e;case 4200:if(!T(e,/flex-|baseline/))return r+"grid-column-align"+C(e,n)+e;break;case 2592:case 3360:return r+A(e,"template-","")+e;case 4384:case 3616:if(t&&t.some((function(e,r){return n=r,T(e.props,/grid-\w+-end/)}))){return~O(e+(t=t[n].value),"span",0)?e:r+A(e,"-start","")+e+r+"grid-row-span:"+(~O(t,"span",0)?T(t,/\d+/):+T(t,/\d+/)-+T(e,/\d+/))+";"}return r+A(e,"-start","")+e;case 4896:case 4128:return t&&t.some((function(e){return T(e.props,/grid-\w+-start/)}))?e:r+A(A(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,c+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(R(e)-1-n>6)switch(M(e,n+1)){case 109:if(M(e,n+4)!==45)break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+c+"$2-$3"+"$1"+a+(M(e,n+3)==108?"$3":"$2-$3"))+e;case 115:return~O(e,"stretch",0)?se(A(e,"stretch","fill-available"),n,t)+e:e}break;case 5152:case 5920:return A(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(a,c,n,t,s,i,u){return r+c+":"+n+u+(t?r+c+"-span:"+(s?i:+i-+n)+u:"")+e}));case 4949:if(M(e,n+6)===121)return A(e,":",":"+c)+e;break;case 6444:switch(M(e,M(e,14)===45?18:11)){case 120:return A(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+c+(M(e,14)===45?"inline-":"")+"box$3"+"$1"+c+"$2$3"+"$1"+r+"$2box$3")+e;case 100:return A(e,":",":"+r)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return A(e,"scroll-","scroll-snap-")+e}return e}function ie(e,r){var a="";for(var c=0;c<e.length;c++)a+=r(e[c],c,e,r)||"";return a}function ue(e,r,a,c){switch(e.type){case g:if(e.children.length)break;case o:case s:return e.return=e.return||e.value;case n:return"";case b:return e.return=e.value+"{"+ie(e.children,c)+"}";case t:if(!R(e.value=e.props.join(",")))return""}return R(a=ie(e.children,c))?e.return=e.value+"{"+a+"}":""}function oe(e){var r=S(e);return function(a,c,n,t){var s="";for(var i=0;i<r;i++)s+=e[i](a,c,n,t)||"";return s}}function le(e){return function(r){if(!r.root)if(r=r.return)e(r)}}function fe(e,n,i,u){if(e.length>-1)if(!e.return)switch(e.type){case s:e.return=se(e.value,e.length,i);return;case b:return ie([U(e,{value:A(e.value,"@","@"+c)})],u);case t:if(e.length)return N(i=e.props,(function(n){switch(T(n,u=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":_(U(e,{props:[A(n,/:(read-\w+)/,":"+a+"$1")]}));_(U(e,{props:[n]}));x(e,{props:P(i,u)});break;case"::placeholder":_(U(e,{props:[A(n,/:(plac\w+)/,":"+c+"input-$1")]}));_(U(e,{props:[A(n,/:(plac\w+)/,":"+a+"$1")]}));_(U(e,{props:[A(n,/:(plac\w+)/,r+"input-$1")]}));_(U(e,{props:[n]}));x(e,{props:P(i,u)});break}return""}))}}function pe(e){switch(e.type){case t:e.props=e.props.map((function(r){return N(H(r),(function(r,a,c){switch(M(r,0)){case 12:return C(r,1,R(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:if(c[++a]==="global")c[a]="",c[++a]="\f"+C(c[a],a=1,-1);case 32:return a===1?"":r;default:switch(a){case 0:e=r;return S(c)>1?"":r;case a=S(c)-1:case 2:return a===2?r+e+e:r+e;default:return r}}}))}))}}e.CHARSET=l;e.COMMENT=n;e.COUNTER_STYLE=w;e.DECLARATION=s;e.DOCUMENT=h;e.FONT_FACE=d;e.FONT_FEATURE_VALUES=m;e.IMPORT=o;e.KEYFRAMES=b;e.LAYER=g;e.MEDIA=u;e.MOZ=a;e.MS=r;e.NAMESPACE=v;e.PAGE=i;e.RULESET=t;e.SUPPORTS=p;e.VIEWPORT=f;e.WEBKIT=c;e.abs=k;e.alloc=W;e.append=z;e.assign=x;e.caret=Y;e.char=F;e.charat=M;e.combine=N;e.comment=ne;e.commenter=X;e.compile=re;e.copy=U;e.dealloc=B;e.declaration=te;e.delimit=G;e.delimiter=Q;e.escaping=J;e.filter=P;e.from=$;e.hash=E;e.identifier=ee;e.indexof=O;e.lift=_;e.match=T;e.middleware=oe;e.namespace=pe;e.next=L;e.node=j;e.parse=ae;e.peek=D;e.prefix=se;e.prefixer=fe;e.prev=I;e.replace=A;e.ruleset=ce;e.rulesheet=le;e.serialize=ie;e.sizeof=S;e.slice=K;e.stringify=ue;e.strlen=R;e.substr=C;e.token=V;e.tokenize=H;e.tokenizer=q;e.trim=y;e.whitespace=Z;Object.defineProperty(e,"__esModule",{value:true})}));
//# sourceMappingURL=stylis.js.map
