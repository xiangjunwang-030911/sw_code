import{o as T,j as y,e as V,D as B,m as j}from"./index-11d2d6b3.js";import{g as M,ak as O,o as p,c as g,x as f,p as a,t as P,l as N,aK as x,D as n,m as v,J as C,K as U,C as A,O as H,ax as K,au as R,ao as X,P as $}from"./vendor-a962175c.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-0d69b02f.js";import{u as W}from"./service-0e8ab2f5.js";import{s as q}from"./index-0b0e17b7.js";import"./index-8a0f43b8.js";const z={class:"flex justify-between items-center px-3 py-3.5 h-12"},G={class:"h-9 text-[14px] font-bold text-left"},Q={class:"flex items-center leading-5"},Y={class:"flex justify-between px-11 py-9"},ae=M({__name:"InfoForm",props:{fieldListData:{},isLoading:{type:Boolean},formList:{}},setup(D){const E=W(),h=T(),{createSuccessModal:L,createErrorModal:b}=j(),I=D,i=O(I.formList),k=l=>l+": ",w=()=>{},F=async()=>{var m,u;const l=[];for(const s in i){const o=Number(s),c=I.fieldListData.find(e=>e.uiFieldID===o);if(c)if(c.fieldTypeID===y.MULTIPLE_SELECTION_LISTBOX||c.fieldTypeID===y.CHECKBOX)(m=c.listChoice)==null||m.filter(e=>e.id===i[s]).forEach(e=>{let d={fieldId:o,choiceId:e.id,value:e.name};l.push(d)});else{let e={fieldId:0,value:""};const d=(u=c.listChoice)==null?void 0:u.find(_=>_.id===i[s]);e.fieldId=o,d?(e.choiceId=d.id,e.value=d.name):e.value=i[s],l.push(e)}}const r=await q(h.getBaseProjectId,h.getUserId,l);if(r.every(s=>s.ok))L({message:"提交成功"});else{const s=r.filter(o=>!o.ok).map(o=>o.msg).join(",");b({message:s})}};return(l,r)=>{const m=V,u=H,s=J,o=K,c=R,e=X,d=$,_=B;return p(),g(_,{class:"w-full m-0 enter-x",shadow:"hover"},{title:f(()=>[a("div",z,[a("span",G,P(N(E).customerAs),1),a("div",Q,[a("div",{class:"flex items-center cursor-pointer mr-8",onClick:x(w,["stop"])},[r[0]||(r[0]=a("span",{class:"h-4 font-normal mr-2.5"},"更改密码",-1)),n(m,{class:"h-5",iconClass:"EP_userdata_close",fill:"",alt:""})]),a("div",{class:"flex items-center cursor-pointer mr-8",onClick:x(F,["stop"])},[r[1]||(r[1]=a("span",{class:"h-4 font-normal mr-2.5"},"提交",-1)),n(m,{iconClass:"EP_userdata_submit",fill:"",class:"h-5",alt:""})])])])]),default:f(()=>[n(d,{animated:"",throttle:500,count:5,loading:l.isLoading},{template:f(()=>[a("div",Y,[n(u,{variant:"text",style:{width:"45%"}}),n(u,{variant:"text",style:{width:"45%"}})])]),default:f(()=>[n(e,{class:"p-5",model:i,"label-width":100},{default:f(()=>[n(c,null,{default:f(()=>[(p(!0),v(C,null,U(l.fieldListData,t=>(p(),v(C,{key:t.uiFieldID},[t.ifVisible?(p(),g(o,{key:0,class:"flex justify-center",span:t.width==1?12:24},{default:f(()=>[n(s,{class:"text-secondary font-semibold text-[#505050] w-full items-center",modelValue:i[t.uiFieldID],"onUpdate:modelValue":S=>i[t.uiFieldID]=S,label:k(t.name),fieldId:t.uiFieldID,attributes:{SupportHTMLFormat:t.SupportHTMLFormat},fieldTypeId:t.fieldTypeID?t.fieldTypeID:1,"list-choice":t.listChoice},null,8,["modelValue","onUpdate:modelValue","label","fieldId","attributes","fieldTypeId","list-choice"])]),_:2},1032,["span"])):A("",!0)],64))),128))]),_:1})]),_:1},8,["model"])]),_:1},8,["loading"])]),_:1})}}});export{ae as default};
