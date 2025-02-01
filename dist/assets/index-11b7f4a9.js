import{b as l,_ as S}from"./index-11d2d6b3.js";import{g as k,h as d,o as C,m as N,p as s,D as e,x as o,B as b,l as a,aq as M,aw as g,H as F,aG as H,aH as U,N as n}from"./vendor-a962175c.js";const j={class:"bg-default w-full py-5 px-10"},q={class:"flex items-center justify-between border-b border-solid border-normal pb-5"},G={class:"tabs-wrapper flex items-center"},z={class:"action-wrapper flex items-center"},J=k({__name:"index",setup(K){const f=n(()=>l(()=>import("./EventDetails-353c39f6.js"),["assets/EventDetails-353c39f6.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/EventDetails-e3b0c442.css"])),E=n(()=>l(()=>import("./SlaDetails-3738082a.js"),["assets/SlaDetails-3738082a.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-11d2d6b3.js","assets/index-b7f84b08.css","assets/SlaDetails-ab88ac5f.css"])),x=n(()=>l(()=>import("./HistoryRecord-b5b070d4.js"),["assets/HistoryRecord-b5b070d4.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-11d2d6b3.js","assets/index-b7f84b08.css","assets/HistoryRecord-6f18fad5.css"])),V=n(()=>l(()=>import("./Activities-6610324d.js"),["assets/Activities-6610324d.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/Activities-ee8ba56b.css"])),w=n(()=>l(()=>import("./Property-e5b9a709.js"),["assets/Property-e5b9a709.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/Property-ffae62b8.css"])),y=n(()=>l(()=>import("./SubmitModal-d9238564.js"),["assets/SubmitModal-d9238564.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/SubmitModal-2f6b0e4f.css"])),D=n(()=>l(()=>import("./EventFlowModal-010e5558.js"),["assets/EventFlowModal-010e5558.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/EventFlowModal-a7464dae.css"])),T=n(()=>l(()=>import("./SubEvent-1397de42.js"),["assets/SubEvent-1397de42.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css"])),A=n(()=>l(()=>import("./Link-29ec6176.js"),["assets/Link-29ec6176.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css"])),B=n(()=>l(()=>import("./EmployeeEvaluation-8deff835.js"),["assets/EmployeeEvaluation-8deff835.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/EmployeeEvaluation-c2ad0ba3.css"])),P=M(),m=d("name1"),c=d("success"),_=d(!1),u=d(!1),R=()=>{P.back()},L=()=>{c.value="success",_.value=!0},I=()=>{u.value=!0};return(Q,t)=>{const i=g,v=F,r=H,O=U;return C(),N("div",j,[s("div",q,[s("div",G,[e(i,{placement:"top"},{content:o(()=>t[3]||(t[3]=[s("div",null,"目标状态“处理中”",-1)])),default:o(()=>[t[4]||(t[4]=s("div",{class:"py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#289E22] border"}," 工程师补单 ",-1))]),_:1}),e(i,{placement:"top"},{content:o(()=>t[5]||(t[5]=[s("div",null,"目标状态“关闭”",-1)])),default:o(()=>[t[6]||(t[6]=s("div",{class:"py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#D05D00] border"}," 关闭 ",-1))]),_:1}),e(i,{placement:"top"},{content:o(()=>t[7]||(t[7]=[s("div",null,"目标状态“协同处理中”",-1)])),default:o(()=>[t[8]||(t[8]=s("div",{class:"py-1 px-3 rounded-sm text-center cursor-pointer mr-3 border-[#979797] border"}," 创建协同任务 ",-1))]),_:1})]),s("div",z,[e(v,{type:"primary",class:"mr-4 w-[70px]",onClick:I},{default:o(()=>t[9]||(t[9]=[b("提交")])),_:1}),e(v,{class:"w-[70px]",onClick:R},{default:o(()=>t[10]||(t[10]=[b("取消")])),_:1})])]),e(O,{modelValue:m.value,"onUpdate:modelValue":t[0]||(t[0]=p=>m.value=p),class:"mt-3"},{default:o(()=>[e(r,{label:"事件详情",name:"name1"},{default:o(()=>[e(a(f),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"SLA详情",name:"name2"},{default:o(()=>[e(a(E),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"历史记录",name:"name3"},{default:o(()=>[e(a(x),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"所有活动",name:"name4"},{default:o(()=>[e(a(V),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"资产",name:"name5"},{default:o(()=>[e(a(w),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"子事件",name:"name6"},{default:o(()=>[e(a(T),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"链接",name:"name7"},{default:o(()=>[e(a(A),{class:"content-wrapper scrollBar pr-2"})]),_:1}),e(r,{label:"对话",name:"name8"},{default:o(()=>[e(a(B),{class:"content-wrapper scrollBar pr-2"})]),_:1})]),_:1},8,["modelValue"]),e(a(y),{modelValue:_.value,"onUpdate:modelValue":t[1]||(t[1]=p=>_.value=p),type:c.value},null,8,["modelValue","type"]),e(a(D),{modelValue:u.value,"onUpdate:modelValue":t[2]||(t[2]=p=>u.value=p),onSubmit:L},null,8,["modelValue"])])}}});const Y=S(J,[["__scopeId","data-v-25786b1f"]]);export{Y as default};
