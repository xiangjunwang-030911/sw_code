import{g,h as t,ak as i,Y as h,k as f,o as w,m as k,p as r,D as a,x,B as v,G as z,b7 as C,a4 as B}from"./vendor-a962175c.js";import{e as V,q as y,p as E}from"./index-11d2d6b3.js";const T={class:"flex items-center justify-between mb-5"},D={class:"flex justify-center items-center mt-4"},R=g({__name:"index",setup(H){const l=t(!1),u=i([{digest:"薪酬福利声明",knowledgeId:"141",publisher:"Frank Zeng",knowledgeStatus:"知识发布",viewCount:"10"}]),d=i([{type:"selection",width:80,resizable:!0},{label:"",width:80,prop:"digest",resizable:!0,render:()=>h(V,{iconClass:"knowledge_folder_normal"})},{label:"知识ID",prop:"knowledgeId",resizable:!0,sortable:!0,width:180},{label:"知识上传人",prop:"publisher",resizable:!0,sortable:!0,width:200},{label:"知识状态",prop:"knowledgeStatus",resizable:!0,sortable:!0,width:200},{label:"浏览次数",prop:"viewCount",sortable:!0,minWidth:120}]),n=t(0),o=t();function c(){z(()=>{var e;const{top:s}=(e=o.value)==null?void 0:e.$el.getBoundingClientRect();n.value=window.innerHeight-s-60})}return f(()=>{y({name:"resize",listener:()=>{c()},immediate:!0})}),(s,e)=>{const p=C,m=E,_=B;return w(),k("div",null,[r("div",T,[a(p,{modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=b=>l.value=b)},{default:x(()=>e[1]||(e[1]=[v("显示子文件夹中的条目")])),_:1},8,["modelValue"])]),a(m,{ref_key:"tableRef",ref:o,columns:d,data:u,"max-height":n.value,class:"scrollBar-light2"},null,8,["columns","data","max-height"]),r("div",D,[a(_,{layout:"total, prev, pager, next, sizes","page-sizes":[10,20,30,40],total:100})])])}}});export{R as default};
