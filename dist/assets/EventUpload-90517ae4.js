import{D as x}from"./index-11d2d6b3.js";import{o,m as r,p as s,g as h,h as v,ba as w,c as g,x as u,B,z as D,J as L,K as y,l as C,t as R,D as _,b9 as U}from"./vendor-a962175c.js";const V={viewBox:"0 0 1024 1024",width:"1.2em",height:"1.2em"};function b(p,a){return o(),r("svg",V,a[0]||(a[0]=[s("path",{fill:"currentColor",d:"M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0a33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176a28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"},null,-1)]))}const k={name:"ep-top",render:b},E={class:"p-6 flex items-center flex-wrap"},N={class:"flex flex-col items-center w-[140px] mr-3"},z={class:"w-full h-[108px] rounded-md overflow-hidden"},F=["src","alt"],$={class:"text-theme text-xs mt-2 w-[130px] text-center truncate"},j={class:"flex flex-col items-center w-[140px]"},A={class:"flex items-center justify-center"},M=h({__name:"EventUpload",setup(p){const a=v([]),m=n=>new Promise(function(e,c){let t=new FileReader,l="";t.readAsDataURL(n),t.onload=function(){l=t.result},t.onerror=function(i){c(i)},t.onloadend=function(){e(l)}}),f=async n=>{const e=await m(n);a.value.push({url:e,name:n.name,file:n})};return(n,e)=>{const c=k,t=U,l=x,i=w("auto-animate");return o(),g(l,null,{title:u(()=>e[0]||(e[0]=[B(" 附件 ")])),default:u(()=>[D((o(),r("div",E,[(o(!0),r(L,null,y(C(a),d=>(o(),r("div",N,[s("div",z,[s("img",{src:d.url,alt:d.name,class:"w-full"},null,8,F)]),s("span",$,R(d.name),1)]))),256)),s("div",j,[_(t,{class:"w-full h-[108px]",drag:"",multiple:"","before-upload":f},{default:u(()=>[s("div",A,[_(c,{class:"text-placeholder text-2xl"})])]),_:1}),e[1]||(e[1]=s("span",{class:"text-secondary text-xs mt-2"},"拖动或粘贴附件进行上传",-1))])])),[[i]])]),_:1})}}});export{M as default};
