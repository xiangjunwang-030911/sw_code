import{I as k,J as v}from"./index-11d2d6b3.js";import{u as C}from"./iframeHelper-2117fee7.js";import{g as S,h as o,j as b,o as d,c as M,x as B,m as L,l as n}from"./vendor-a962175c.js";const E=["height","src"],T="New Sync",O=S({__name:"NewSyncModal",props:{modelValue:{type:Boolean,default:!1},meetingType:{},livesyncId:{}},emits:["submit","update:modelValue"],setup(f,{emit:u}){const t=f,a=u,p=o(!1),s=o(!0),l=o(0),c=o(0),i=o(""),r=o();b([()=>t.livesyncId,()=>t.meetingType],()=>{i.value=C().newSyncMeetingIframe({id:t.livesyncId,type:t.meetingType}),c.value++});const g=()=>{var e;(e=r.value.contentWindow)==null||e.postMessage({type:k.CLOSE_SUB_SYNC_MEETING},"*")},h=e=>{l.value=e},_=()=>{s.value=!1},m=()=>{a("update:modelValue",!1)},y=()=>{m(),a("submit")},w=()=>{};return(e,N)=>{const I=v;return d(),M(I,{show:e.modelValue,title:T,loading:n(s),buttonLoading:n(p),isShowFooter:!1,"close-on-click-modal":!1,"before-close":g,onOk:y,onClose:m,onInit:w,onOnHeightChange:h,width:"80%"},{default:B(()=>[(d(),L("iframe",{class:"w-full",ref_key:"iframeRef",ref:r,key:n(c),height:n(l),src:n(i),frameborder:"0",onLoad:_,allow:"microphone; camera"},null,40,E))]),_:1},8,["show","loading","buttonLoading"])}}});export{O as default};
