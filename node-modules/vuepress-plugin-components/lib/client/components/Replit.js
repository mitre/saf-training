import{defineComponent as f,ref as a,computed as s,h as e}from"vue";import{LoadingIcon as m}from"vuepress-shared/client";import"../styles/repl-it.scss";import{u as g}from"../size-EeS19OAO.js";import"@vuepress/shared";import"@vueuse/core";var h=f({name:"Replit",props:{link:{type:String,default:""},user:{type:String,default:""},repl:{type:String,default:""},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:void 0},ratio:{type:[String,Number],default:16/9},theme:{type:String,default:"light"},file:{type:String,default:()=>null},autoLoad:Boolean,text:{type:String,default:"Load Replit"}},setup(t){const{el:n,width:o,height:p,resize:d}=g(t),l=a(!1),r=a(!1),i=s(()=>{if(t.link){const u=new URL(t.link);return u.searchParams.set("embed","true"),u.toString()}return t.user&&t.repl?`https://replit.com/@${t.user}/${t.repl}${t.file?.length?`#${t.file}`:""}`:null});return()=>i.value?e("div",{class:"replit-wrapper"},t.autoLoad||l.value?[e("iframe",{ref:n,class:"replit-iframe",src:i.value,style:{width:o.value,height:r.value?p.value:0},onLoad:()=>{r.value=!0,d()}}),r.value?null:e(m)]:e("button",{type:"button",class:"replit-button",onClick:()=>{l.value=!0}},t.text)):null}});export{h as default};
//# sourceMappingURL=Replit.js.map
