import{J as c}from"./index-11d2d6b3.js";import{g as f,h as s,o as b,c as h,x as g,p as e,l as a}from"./vendor-a962175c.js";const _="Common Questions",C=f({__name:"CommonQuestionModal",props:{modelValue:{type:Boolean,default:!1}},emits:["submit","update:modelValue"],setup(w,{emit:r}){const o=r,i=s(!1),l=s(!1),t=()=>{o("update:modelValue",!1)},d=()=>{t(),o("submit")},u=()=>{};return(m,n)=>{const p=c;return b(),h(p,{show:m.modelValue,title:_,loading:a(l),buttonLoading:a(i),isShowCancel:!1,isShowOk:!1,onOk:d,onClose:t,onInit:u,width:"40%"},{default:g(()=>n[0]||(n[0]=[e("div",null,[e("div",{class:"px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"}," Support incident summary "),e("div",{class:"px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"}," Search knowledge for solution "),e("div",{class:"px-5 py-1 border-2 w-fit rounded cursor-pointer border-theme text-theme bg-default mb-4"}," List similar support incidents ")],-1)])),_:1},8,["show","loading","buttonLoading"])}}});export{C as default};
