import{b as n}from"./index-11d2d6b3.js";import{a as i}from"./chatEnum-07464a66.js";import{g as p,o as s,m as a,p as c,D as d,l as t,c as _,N as o}from"./vendor-a962175c.js";const l={class:"content-item flex justify-start mb-5"},g={class:"max-w-[60%]"},u=["innerHTML"],C=p({__name:"IncomingMessage",props:{message:{}},setup(f){const m=o(()=>n(()=>import("./CustomContent-8a7e505a.js"),["assets/CustomContent-8a7e505a.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/chatEnum-07464a66.js"])),r=o(()=>n(()=>import("./BubbleHeader-b5833d53.js"),["assets/BubbleHeader-b5833d53.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/temp_avator3-9c9fbd91.js","assets/chatEnum-07464a66.js"]));return(e,y)=>(s(),a("div",l,[c("div",g,[d(t(r),{"message-type":e.message.type,messageFrom:e.message.from,"created-time":e.message.createdTime,"sender-name":e.message.senderName},null,8,["message-type","messageFrom","created-time","sender-name"]),e.message.contentType==t(i).COMMON?(s(),a("div",{key:0,class:"bg-[#F0F3F5] rounded-md px-4 py-2 h-fit mt-4 text-[#2A2A2A] text-[13px] w-fit",innerHTML:e.message.content},null,8,u)):(s(),_(t(m),{key:1,"content-type":e.message.contentType},null,8,["content-type"]))])]))}});export{C as default};
