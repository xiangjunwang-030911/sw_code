import{c as I}from"./index-4585b2cf.js";import{g as b,aQ as L,j as h,k as A,aR as D,ag as E,o as T,m as $,n as k,a$ as B,aS as H,aT as N,aV as O,aW as j}from"./vendor-a962175c.js";import"./index-11d2d6b3.js";const v=b({__name:"HotStop",props:{width:{default:"100%"},height:{default:"100%"},onResize:{default:()=>[0,0]},dateInfo:{default:()=>({})}},setup(F){L([B,H,N,O,j]);const u=F,m=["#2FD8FF","#61F5A9","#FFD946","#F8635D","#3061F6"];let o=null,l=["SAP关键用户","IT工程师组","现场工程师组","SAP关键用户","IT工程师组","现场工程师组"],c=[["1","2","3","4","5","6"],["7","6","5","4","3","2"]],i={itemStyle:{borderColor:"#000"},tooltip:{},dataset:{source:[]},grid:{left:"3%",right:"4%",bottom:"0%",top:"18%",containLabel:!0},xAxis:[{type:"category",axisLine:{show:!1},axisLabel:{show:!0,color:"#FFFFFF",fontFamily:"MicrosoftYaHei",rotate:-15,opacity:.7,margin:20,align:"center",interval:0},axisTick:{show:!1},splitLine:{show:!1},data:l}],yAxis:[{axisLine:{show:!1,lineStyle:{color:"#FFFFFF",width:1,type:"solid"}},axisLabel:{show:!1},axisTick:{show:!1},splitLine:{show:!0,lineStyle:{color:"#2FD8FF",opacity:.2,type:"dashed"}}}],series:[]};const p=()=>{o==null||o.setOption(i)},S=()=>{if(i.dataset){i.series=[];let t=[];const n=i.dataset;l.forEach(d=>{t.push([d])});let r=[];c.forEach((d,f)=>{r.push({type:"bar",itemStyle:{color:m[f],borderRadius:4},label:{show:!0,position:"top",formatter:a=>a.value,color:"#FFFFFF",fontFamily:"MicrosoftYaHei",align:"center"},barWidth:"20%",barGap:1,data:d}),d.forEach((a,e)=>{t[e].push(a)})}),n.source=t,i.series=r,i.xAxis&&(i.xAxis=[{data:l}]),setTimeout(()=>{p()},50)}},g=async(t,n)=>{await I({projectId:106,fieldId:491,fieldId2:103,dtFrom:t,dtTo:n}).then(r=>{if(r.length!==0){const d=r.reduce((e,s)=>(e[s.name]=(e[s.name]||0)+1,e),{});l=Object.entries(d).sort(([,e],[,s])=>s-e).slice(0,6).map(([e])=>e);const a=r.reduce((e,s)=>{if(l.includes(s.name)){const w=s.childIdNameCount.sort((y,x)=>x.count-y.count);e[s.name]=w.slice(0,2)}return e},{});c=[[],[]],l.forEach(e=>{c[0].push(a[e]&&a[e][0]?a[e][0].count.toString():""),c[1].push(a[e]&&a[e][1]?a[e][1].count.toString():"")}),S()}})};return h(()=>u.onResize,()=>{o==null||o.resize()}),h(()=>u.dateInfo,({start:t,end:n})=>{t&&n&&g(new Date(t).toISOString(),new Date(n).toISOString())},{deep:!0,immediate:!0}),A(()=>{o=D(document.getElementById("HotStop")),p()}),E(()=>{o==null||o.dispose()}),(t,n)=>(T(),$("div",{id:"HotStop",style:k({width:t.width,height:t.height})},null,4))}});export{v as default};
