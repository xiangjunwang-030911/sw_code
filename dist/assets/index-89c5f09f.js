import{b as u,n as h}from"./index-11d2d6b3.js";import{g as x,h as n,j as S,o as k,m as y,p as e,t as c,l as o,D as l,x as f,ap as w,O,P as b,N as I}from"./vendor-a962175c.js";import{g as M}from"./index-162d97de.js";import{u as P}from"./service-0e8ab2f5.js";import"./index-8a0f43b8.js";var a=(s=>(s[s.TITLE=1101]="TITLE",s[s.DATE_LAST_MODIFIED=1109]="DATE_LAST_MODIFIED",s[s.DETAILS=1102]="DETAILS",s))(a||{});const V={class:"p-7 bg-default"},q={class:"pl-3"},C={class:"text-regular"},N={class:"text-primary font-semibold mt-2 text-lg"},j={class:"flex mt-4"},B={class:"text-regular"},R={class:"text-regular"},H={class:"p-3"},K=x({__name:"index",setup(s){const D=I(()=>u(()=>import("./KnowledgeInfo-c47ccf7e.js"),["assets/KnowledgeInfo-c47ccf7e.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css"])),T=I(()=>u(()=>import("./KnowledgeComment-82897d08.js"),["assets/KnowledgeComment-82897d08.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css"])),r=w(),v=P(),i=n(!1),d=n(""),p=n(""),E=n(10),m=n(""),L=async()=>{i.value=!0,(await M({projectId:v.getKnowledgeProjectId,itemIds:[Number(r.query.id)],fieldIds:[a.TITLE,a.DATE_LAST_MODIFIED,a.DETAILS]}))[0].itemValues.forEach(t=>{switch(t.fieldID){case a.TITLE:d.value=t.value;break;case a.DATE_LAST_MODIFIED:p.value=t.value;break;case a.DETAILS:m.value=h(t.valueHTML);break}}),i.value=!1};return S(()=>r.query.id,()=>{r.query.id&&L()},{immediate:!0}),(g,t)=>{const _=O,A=b;return k(),y("div",null,[e("div",V,[e("div",q,[e("div",null,[t[0]||(t[0]=e("span",{class:"text-placeholder mr-2"},"知识ID:",-1)),e("span",C,"#"+c(o(r).query.id),1)]),l(A,{loading:o(i),animated:"",throttle:500},{template:f(()=>[l(_,{class:"mt-2"}),l(_,{style:{width:"15%"},class:"mt-2"}),l(_,{style:{width:"15%"},class:"ml-10 mt-2"})]),default:f(()=>[e("div",N,c(o(d)),1),e("div",j,[t[1]||(t[1]=e("span",{class:"text-placeholder mr-1"},"最后编辑日期:",-1)),e("span",B,c(o(p)),1),t[2]||(t[2]=e("span",{class:"text-placeholder mr-1 ml-[77px]"},"浏览次数:",-1)),e("span",R,c(o(E)),1)])]),_:1},8,["loading"])])]),e("div",H,[l(o(D),{class:"mt-3",knowledgeInfo:o(m)},null,8,["knowledgeInfo"]),l(o(T),{class:"mt-3"})])])}}});export{K as default};
