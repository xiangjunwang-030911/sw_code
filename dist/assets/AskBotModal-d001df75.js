import{w,r as y,J as M,_ as V}from"./index-11d2d6b3.js";import{o as l,m as c,p as u,g as L,h as a,c as S,x as A,D as m,l as t,L as I,bp as q,J as C,K as D,t as O,aa as T}from"./vendor-a962175c.js";const z={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"};function E(r,e){return l(),c("svg",z,e[0]||(e[0]=[u("path",{fill:"currentColor",d:"M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"},null,-1)]))}const J={name:"ep-right",render:E};function K(r,e="modal"){const o=w();return y.get({url:o.getKloudApiSyncDomain+"/MeetingServer/chatbot/question_list",params:r},{errorMessageMode:e,isTransformResponse:!1})}const N={class:"mr-1"},Q="Ask Bot for action",R=L({__name:"AskBotModal",props:{modelValue:{type:Boolean,default:!1}},emits:["submit","update:modelValue"],setup(r,{emit:e}){const o=e,f=a(!1),g=a(!1),i=a(""),d=a([]),p=()=>{o("update:modelValue",!1)},h=()=>{p(),o("submit")},x=async()=>{const s=await K({chatbotId:6});s.code==0&&(d.value=s.data)},b=()=>{x()};return(s,_)=>{const B=T,k=J,v=M;return l(),S(v,{show:s.modelValue,title:Q,loading:t(g),buttonLoading:t(f),isShowOk:!1,cancelText:"关闭",onOk:h,onClose:p,onInit:b,width:"40%"},{default:A(()=>[u("div",null,[m(B,{modelValue:t(i),"onUpdate:modelValue":_[0]||(_[0]=n=>I(i)?i.value=n:null),class:"w-full",clearable:"",size:"large",placeholder:"Please Input","prefix-icon":t(q)},null,8,["modelValue","prefix-icon"]),(l(!0),c(C,null,D(t(d),n=>(l(),c("div",{class:"flex justify-between items-center border-normal border rounded-lg px-3 py-2 mt-4 cursor-pointer",key:n.id},[u("div",N,O(n.question),1),m(k,{class:"text-xl"})]))),128))])]),_:1},8,["show","loading","buttonLoading"])}}});const F=V(R,[["__scopeId","data-v-a32e2746"]]);export{F as default};
