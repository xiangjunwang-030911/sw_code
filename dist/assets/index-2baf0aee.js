import{g as l,h as a,j as g,z as _,l as r,o as p,m as h,p as L,A as I}from"./vendor-a962175c.js";import{u as S,k as E,I as v,L as y,K as c}from"./index-11d2d6b3.js";import{u as N}from"./iframeHelper-2117fee7.js";const A={class:"h-full border-none"},k=["src"],C=l({__name:"index",setup(w){const{meetingListIframe:u}=N(),i=S(),f=E(),t=a(!0),o=a(),m=a(u({subsystemId:f.getSubSystemId})),d=()=>{t.value=!1};return g(()=>i.getLanguageId,n=>{var s,e;(e=(s=o.value)==null?void 0:s.contentWindow)==null||e.postMessage({type:v.CHANGE_KLOUD_LANGUAGE,languageid:n==y.EN?c.EN:c.CN},"*")}),(n,s)=>{const e=I;return _((p(),h("div",A,[L("iframe",{ref_key:"iframeRef",ref:o,class:"w-full h-full",src:r(m),onLoad:d},null,40,k)])),[[e,r(t)]])}}});export{C as default};
