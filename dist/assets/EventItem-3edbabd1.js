import{e as a}from"./index-11d2d6b3.js";import{g as i,o as l,m as d,p as e,D as c,t as s}from"./vendor-a962175c.js";const r={class:"bg-default rounded-lg p-3 h-fit text-[13px] flex"},x={class:"rounded-full w-[30px] h-[30px] bg-[#EDEDED] flex items-center justify-center mr-3"},p={class:"flex-1 w-0"},_={class:"flex justify-between items-center"},m={class:"text-xs"},u={class:"text-xs text-secondary"},v={class:"text-xs my-2 line-clamp-2 max-h-[28px]",title:"xxxx"},f={class:"flex justify-between items-center"},h={class:"text-xs"},g={class:"border-normal border rounded-xl text-xs py-[2px] px-3 bg-default text-regular"},E=i({__name:"EventItem",props:{event:{}},setup(y){return(t,n)=>{const o=a;return l(),d("div",r,[e("div",x,[c(o,{"icon-class":"ep-common-ep_event",size:15})]),e("div",p,[e("div",_,[e("div",null,[n[0]||(n[0]=e("span",{class:"mr-1 text-xs text-secondary"},"事件ID:",-1)),e("span",m,"#"+s(t.event.id),1)]),e("div",u,s(t.event.time),1)]),e("div",v,s(t.event.content),1),e("div",f,[e("div",null,[n[1]||(n[1]=e("span",{class:"text-secondary text-xs"},"当前负责人:",-1)),e("span",h,s(t.event.master),1)]),e("div",g,s(t.event.status),1)])])])}}});export{E as default};
