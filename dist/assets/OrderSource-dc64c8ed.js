import{h as u}from"./index-4585b2cf.js";import{g as m,aQ as g,j as c,k as h,aR as w,ag as y,o as x,m as S,n as F,aT as b,aS as L,aV as k,aW as A}from"./vendor-a962175c.js";import"./index-11d2d6b3.js";const R=m({__name:"OrderSource",props:{width:{default:"100%"},height:{default:"100%"},onResize:{default:()=>[0,0]},dateInfo:{default:()=>({})}},setup(f){g([b,L,k,A]);const i=f;let r=["微信","电信","APP","官网","邮件","其他"].reverse(),l=[300,250,200,160,130,80].reverse(),e=null,o={color:{type:"linear",x:0,y:0,x2:1,y2:0,colorStops:[{offset:0,color:"#1A3B95"},{offset:1,color:"#3163FB"}],global:!1},grid:{left:"3%",right:"4%",bottom:"0%",top:"10%",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{show:!0,color:"#FFF",fontFamily:"MicrosoftYaHei",opacity:.7,margin:18},splitLine:{show:!1}},yAxis:{type:"category",data:[],axisLabel:{show:!0,color:"#FFF",fontFamily:"MicrosoftYaHei",opacity:.7,margin:18},axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!1}},series:[{data:[],type:"bar",itemStyle:{borderRadius:[0,5,5,0]},showBackground:!0,backgroundStyle:{color:"RGBA(18, 39, 67, .8)",borderRadius:[0,5,5,0]}}]};const n=()=>{e==null||e.setOption(o)},p=async(t,a)=>{const d=await u({projectId:106,fieldId:14,dtTo:new Date(a).toISOString(),dtFrom:new Date(t).toISOString()});r=d.map(s=>s.name).reverse(),l=d.map(s=>s.count).reverse(),o.yAxis={data:r},o.series=[{data:l}],n()};return c(()=>i.onResize,()=>{e==null||e.resize()}),c(()=>i.dateInfo,({start:t,end:a})=>{t&&a&&p(t,a)},{immediate:!0}),h(()=>{e=w(document.getElementById("orderSource")),n()}),y(()=>{e==null||e.dispose()}),(t,a)=>(x(),S("div",{id:"orderSource",style:F({width:t.width,height:t.height})},null,4))}});export{R as default};
