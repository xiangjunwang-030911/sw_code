import{_ as x,p as y}from"./index-11d2d6b3.js";import{ak as d,o as f,m as h,D as a,x as l,a8 as v,p as n,aa as V,an as w,ao as z}from"./vendor-a962175c.js";const C={class:"w-full h-full px-3 pt-3"},N={__name:"index",setup(E){const o=d({companyName:"北京海天起点技术有限公司",companyCity:"北京",conpanyAdress:"北京市朝阳区东大桥路8号尚都国际中心28"}),c=[{label:"姓名",prop:"name",resizable:!0},{label:"联系方式",prop:"phone",resizable:!0},{label:"邮件",prop:"email",resizable:!0}],u=[{label:"类型",prop:"type",resizable:!0},{label:"名称",prop:"name",resizable:!0},{label:"联系方式",prop:"phone",resizable:!0},{label:"邮件",prop:"email",resizable:!0}],i=d([{name:"李登星",phone:"1234567890",email:"123456@163.com"},{name:"张三",phone:"1234567890",email:"123456@163.com"},{name:"李四",phone:"1234567890",email:"123456@163.com"}]),_=d([{name:"北京泰克赛尔软件有限公司",phone:"1234567890",email:"123456@163.com",type:"支持团队"},{name:"(北京) 腾飞",phone:"1234567890",email:"123456@163.com",type:"销售人员"},{name:"(嘉兴) 周佳杰",phone:"1234567890",email:"123456@163.com",type:"支持人员"},{name:"N/A",phone:"1234567890",email:"123456@163.com",type:"项目经理"}]);return(g,e)=>{const s=V,p=w,b=z,m=v,r=y;return f(),h("div",C,[a(m,{class:"box-card enter-x",shadow:"hover"},{header:l(()=>e[3]||(e[3]=[n("div",{class:"card-header"},[n("span",null,"客户信息")],-1)])),default:l(()=>[a(b,{model:o,"label-width":110},{default:l(()=>[a(p,{label:"公司名称"},{default:l(()=>[a(s,{modelValue:o.companyName,"onUpdate:modelValue":e[0]||(e[0]=t=>o.companyName=t),class:"w-96"},null,8,["modelValue"])]),_:1}),a(p,{label:"公司城市"},{default:l(()=>[a(s,{modelValue:o.companyCity,"onUpdate:modelValue":e[1]||(e[1]=t=>o.companyCity=t),class:"w-96"},null,8,["modelValue"])]),_:1}),a(p,{label:"公司地址及简介"},{default:l(()=>[a(s,{modelValue:o.conpanyAdress,"onUpdate:modelValue":e[2]||(e[2]=t=>o.conpanyAdress=t),type:"textarea",class:"w-96"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1}),a(m,{class:"box-card no-padding no-line mt-3 enter-x",shadow:"hover"},{header:l(()=>e[4]||(e[4]=[n("div",{class:"card-header px-[18px] py-[20px]"},[n("span",null,"联系人")],-1)])),default:l(()=>[a(r,{columns:c,data:i},null,8,["data"])]),_:1}),a(m,{class:"box-card no-padding mt-3 no-line enter-x",shadow:"hover"},{header:l(()=>e[5]||(e[5]=[n("div",{class:"card-header px-[18px] py-[20px]"},[n("span",null,"支持团队")],-1)])),default:l(()=>[a(r,{columns:u,data:_},null,8,["data"])]),_:1})])}}},B=x(N,[["__scopeId","data-v-f66ec380"]]);export{B as default};
