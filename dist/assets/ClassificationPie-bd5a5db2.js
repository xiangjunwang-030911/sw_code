import{g as i,aQ as n,ak as r,h as c,j as d,k as u,G as f,aR as p,ag as m,o as g,m as h,b0 as b,aS as w,aU as S,b2 as _,aW as k,b3 as v,aT as x}from"./vendor-a962175c.js";const $=i({__name:"ClassificationPie",props:{onResize:{default:()=>[0,0]},data:{default:()=>[{value:60,name:"浏览器问题"},{value:20,name:"SAP问题"},{value:20,name:"邮箱问题"}]}},setup(s){n([b,w,S,_,k,v,x]);const a=s;let e=null;const l=r({grid:{top:"0%",left:"1%",bottom:"5%",right:"1%"},tooltip:{trigger:"item"},legend:{orient:"horizontal",left:"center",bottom:"5%",itemHeight:8,data:[{name:"浏览器问题",textStyle:{color:"#4E74B4"}},{name:"SAP问题",textStyle:{color:"#4EB44E"}},{name:"邮箱问题",textStyle:{color:"#EBCD63"}}]},series:[{type:"pie",radius:"60%",data:a.data,label:{show:!1},emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}),t=c(null),o=()=>{e==null||e.setOption(l)};return d(()=>a.onResize,()=>{e==null||e.resize()}),u(()=>{f(()=>{e=p(t.value),o()})}),m(()=>{e==null||e.dispose()}),(B,E)=>(g(),h("div",{ref_key:"classificationPie",ref:t,style:{"{ width":"100%, height: 100% }"}},null,512))}});export{$ as default};
