import{g as _,i as b,o as a,c as s,x as n,p as f,D as k,l as V,L as h,m as x,J as C,K as g,b7 as B,b8 as E,an as v}from"./vendor-a962175c.js";const w={class:"w-full font-normal"},L=_({__name:"Checkbox",props:{modelValue:{},label:{},listChoice:{}},emits:["update:modelValue"],setup(m,{emit:u}){const r=m,c=u,o=b({get(){return r.modelValue},set(e){c("update:modelValue",e)}});return(e,t)=>{const d=B,p=E,i=v;return a(),s(i,{label:e.label},{default:n(()=>[f("div",w,[k(p,{modelValue:V(o),"onUpdate:modelValue":t[0]||(t[0]=l=>h(o)?o.value=l:null)},{default:n(()=>[(a(!0),x(C,null,g(e.listChoice,l=>(a(),s(d,{key:l.id,label:l.name},null,8,["label"]))),128))]),_:1},8,["modelValue"])])]),_:1},8,["label"])}}});export{L as default};
