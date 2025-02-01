import{e as $,p as R,b as g,_ as z}from"./index-11d2d6b3.js";import{g as F,h as O,ak as x,Y as i,o as u,m as S,p as n,a5 as b,D as e,x as t,c as _,B as r,l as k,aq as L,al as j,am as q,H as M,an as W,aa as Y,ax as G,au as J,ah as K,ao as Q,N as E}from"./vendor-a962175c.js";const X={class:"bg-default w-full py-5 px-10"},Z={class:"flex items-center justify-between border-b border-solid border-normal pb-5"},h={class:"template-select flex items-center"},ee={class:"action-wrapper flex items-center"},le={class:"flex items-center"},te={class:"px-[29px] py-[27px] border-solid border border-normal"},ae=F({__name:"index",setup(oe){const T=E(()=>g(()=>import("./index-a2b3f9c1.js"),["assets/index-a2b3f9c1.js","assets/index-11d2d6b3.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/index-b7f84b08.css","assets/index-272aaaf1.css"])),C=E(()=>g(()=>import("./index-b46c7a6f.js"),["assets/index-b46c7a6f.js","assets/vendor-a962175c.js","assets/vendor-9f745663.css","assets/plus-d2f80c0a.js","assets/index-11d2d6b3.js","assets/index-b7f84b08.css","assets/index-890ce962.css"])),U=L(),m=O(0),a=x({employee:"",title:"",database:"",scene:"",occurrenceTime:"",status:"服务台受理中",principal:""}),N=x([{number:"123458",title:"笔记本",category:"桌面设备",endTime:"2023年11月25日",vender:"联想"}]),B=x([{type:"selection",width:80},{prop:"number",renderHeader:()=>i("span","资产编号")},{prop:"title",renderHeader:()=>i("span","标题")},{prop:"category",renderHeader:()=>i("span","三级分类")},{prop:"endTime",renderHeader:()=>i("span","维保到期时间")},{prop:"vender",renderHeader:()=>i("span","厂家")}]),D=v=>{var d;const l=v.target;(d=l.dataset)!=null&&d.id&&(m.value=Number(l.dataset.id))},H=()=>{U.back()};return(v,l)=>{const d=j,c=q,V=M,w=$,s=W,I=R,f=Y,p=G,y=J,A=K,P=Q;return u(),S("div",X,[n("div",Z,[n("div",{class:"tabs-wrapper flex items-center",onClick:D},[n("div",{class:b(["py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary",`${m.value==0?"text-theme":""}`]),"data-id":"0"}," Assign to work ",2),n("div",{class:b(["py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary",`${m.value==1?"text-theme":""}`]),"data-id":"1"}," 工程师提交SAP工单 ",2),n("div",{class:b(["py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary",`${m.value==2?"text-theme":""}`]),"data-id":"2"}," 工程师补单 ",2),n("div",{class:b(["py-1 px-2 rounded-md text-center cursor-pointer mr-2 bg-primary",`${m.value==3?"text-theme":""}`]),"data-id":"3"}," 新建DMS权限申请 ",2)]),n("div",h,[l[9]||(l[9]=n("span",{class:"mr-2 whitespace-nowrap"},"事件模版",-1)),e(c,{class:"w-40",placeholder:"运维工单"},{default:t(()=>[(u(),_(d,{value:"1234",key:123},{default:t(()=>l[8]||(l[8]=[r("123")])),_:1}))]),_:1})]),n("div",ee,[e(V,{type:"primary",class:"mr-4 w-[70px]"},{default:t(()=>l[10]||(l[10]=[r("提交")])),_:1}),e(V,{class:"w-[70px]",onClick:H},{default:t(()=>l[11]||(l[11]=[r("取消")])),_:1})])]),e(P,{model:a,"label-width":"90",class:"py-5"},{default:t(()=>[e(s,{label:"员工:",prop:"employee"},{default:t(()=>[n("div",le,[e(c,{modelValue:a.employee,"onUpdate:modelValue":l[0]||(l[0]=o=>a.employee=o),class:"w-80",placeholder:"请选择"},{default:t(()=>[(u(),_(d,{value:"1234",key:123},{default:t(()=>l[12]||(l[12]=[r("123")])),_:1}))]),_:1},8,["modelValue"]),e(w,{iconClass:"search_icon",className:"cursor-pointer mr-1 ml-2",size:"23"}),e(w,{iconClass:"add_icon",className:"cursor-pointer mr-1",size:"30"})])]),_:1}),e(s,{label:"资产:",prop:"property"},{default:t(()=>[e(I,{columns:B,data:N,class:"propertyTableWrapper"},null,8,["columns","data"])]),_:1}),e(s,{label:"标题:",prop:"title"},{default:t(()=>[e(f,{modelValue:a.title,"onUpdate:modelValue":l[1]||(l[1]=o=>a.title=o),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1}),e(y,null,{default:t(()=>[e(p,{span:12},{default:t(()=>[e(s,{label:"产品:",prop:"product"},{default:t(()=>[e(c,{modelValue:a.employee,"onUpdate:modelValue":l[2]||(l[2]=o=>a.employee=o),class:"w-[90%]",placeholder:"请选择"},{default:t(()=>[(u(),_(d,{value:"1234",key:123},{default:t(()=>l[13]||(l[13]=[r("123")])),_:1}))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:t(()=>[e(s,{label:"数据库:",prop:"database"},{default:t(()=>[e(c,{modelValue:a.database,"onUpdate:modelValue":l[3]||(l[3]=o=>a.database=o),class:"w-full",placeholder:"请选择",multiple:""},{default:t(()=>[(u(),_(d,{value:"123",key:123},{default:t(()=>l[14]||(l[14]=[r("杭州市")])),_:1})),(u(),_(d,{value:"1234",key:1234},{default:t(()=>l[15]||(l[15]=[r("南京市")])),_:1}))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(y,null,{default:t(()=>[e(p,{span:12},{default:t(()=>[e(s,{label:"发生时间:",prop:"occurrenceTime"},{default:t(()=>[e(A,{modelValue:a.occurrenceTime,"onUpdate:modelValue":l[4]||(l[4]=o=>a.occurrenceTime=o),type:"datetime",class:"!w-[90%]",placeholder:"选择日期和时间"},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:t(()=>[e(s,{label:"发生地点:",prop:"scene"},{default:t(()=>[e(f,{modelValue:a.scene,"onUpdate:modelValue":l[5]||(l[5]=o=>a.scene=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(s,{class:"w-full",label:"描述:",prop:"desc"},{default:t(()=>[e(k(T),{width:"100%"})]),_:1}),e(y,null,{default:t(()=>[e(p,{span:12},{default:t(()=>[e(s,{label:"进程状态:",prop:"status"},{default:t(()=>[e(f,{modelValue:a.status,"onUpdate:modelValue":l[6]||(l[6]=o=>a.status=o),class:"w-[90%]",disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:t(()=>[e(s,{label:"进程状态:",prop:"status"},{default:t(()=>[e(f,{modelValue:a.principal,"onUpdate:modelValue":l[7]||(l[7]=o=>a.principal=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(s,{label:"附件:",prop:"file"},{default:t(()=>[n("div",te,[e(k(C))])]),_:1})]),_:1},8,["model"])])}}});const de=z(ae,[["__scopeId","data-v-65950fb3"]]);export{de as default};
