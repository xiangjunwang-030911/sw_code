import{c as g}from"./index-4585b2cf.js";import{g as y,aQ as x,j as F,k as b,aR as L,ag as I,o as D,m as A,n as E,a$ as T,aS as $,aT as k,aV as B,aW as H}from"./vendor-a962175c.js";import"./index-11d2d6b3.js";const _=y({__name:"HotStop",props:{width:{default:"100%"},height:{default:"100%"},onResize:{default:()=>[0,0]},dateInfo:{default:()=>({})}},setup(h){x([T,$,k,B,H]);const p=h,m=["#2FD8FF","#61F5A9","#FFD946","#F8635D","#3061F6"];let a=null,n=["SAP关键用户","IT工程师组","现场工程师组","SAP关键用户","IT工程师组","现场工程师组"],c=[["1","2","3","4","5","6"],["7","6","5","4","3","2"]],s={itemStyle:{borderColor:"#000"},tooltip:{},dataset:{source:[]},grid:{left:"3%",right:"4%",bottom:"0%",top:"18%",containLabel:!0},xAxis:[{type:"category",axisLine:{show:!1},axisLabel:{show:!0,color:"#FFFFFF",fontFamily:"MicrosoftYaHei",rotate:-15,opacity:.7,margin:20,align:"center",interval:0},axisTick:{show:!1},splitLine:{show:!1},data:n}],yAxis:[{axisLine:{show:!1,lineStyle:{color:"#FFFFFF",width:1,type:"solid"}},axisLabel:{show:!1},axisTick:{show:!1},splitLine:{show:!0,lineStyle:{color:"#2FD8FF",opacity:.2,type:"dashed"}}}],series:[]};const u=()=>{a==null||a.setOption(s)},w=()=>{if(s.dataset){s.series=[];let t=[];const i=s.dataset;n.forEach(r=>{t.push([r])});let l=[];c.forEach((r,f)=>{l.push({type:"bar",itemStyle:{color:m[f],borderRadius:4},label:{show:!0,position:"top",formatter:d=>d.value,color:"#FFFFFF",fontFamily:"MicrosoftYaHei",align:"center"},barWidth:"20%",barGap:1,data:r}),r.forEach((d,e)=>{t[e].push(d)})}),i.source=t,s.series=l,s.xAxis&&(s.xAxis=[{data:n}]),setTimeout(()=>{u()},50)}},S=async(t,i)=>{await g({projectId:106,fieldId:491,fieldId2:103,dtFrom:t,dtTo:i}).then(l=>{if(l.length!==0){const r=l.reduce((e,o)=>(e[o.name]=(e[o.name]||0)+1,e),{});n=Object.entries(r).sort(([,e],[,o])=>o-e).slice(0,6).map(([e])=>e);const d=l.reduce((e,o)=>(n.includes(o.name)&&(e[o.name]=o.count),e),{});c=[[],[]],n.forEach(e=>{c[0].push(d[e]?d[e].toString():"")}),w()}})};return F(()=>p.onResize,()=>{a==null||a.resize()}),F(()=>p.dateInfo,({start:t,end:i})=>{t&&i&&S(new Date(t).toLocaleDateString(),new Date(i).toLocaleDateString())},{deep:!0,immediate:!0}),b(()=>{a=L(document.getElementById("HotStop")),u()}),I(()=>{a==null||a.dispose()}),(t,i)=>(D(),A("div",{id:"HotStop",style:E({width:t.width,height:t.height})},null,4))}});export{_ as default};
