(this["webpackJsonptime-winder"]=this["webpackJsonptime-winder"]||[]).push([[0],{31:function(e,t,n){e.exports=n(54)},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},53:function(e,t){},54:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(13),o=n.n(i),c=(n(36),n(9)),s=n(17),u=n(10),l=n(6),p=(n(37),n(56)),m=n(57),d=(n(38),n(15)),f=n(18),h=n.n(f),y=n(14),b=n(4),v=n(19),g=Object.keys(y).filter((function(e){return e.startsWith("GiAbstract")})).map((function(e){return y[e]})),E={event:function(e){return e.ctx.locked?b.HI:b.RM},person:function(e){return"witch"===e.emote?b.hY:b.HP},food:function(){return b.XN},juice:function(){return b.okb},dino:function(e){return"angry"===e.emote?b.bh:b.lP},skeleton:function(e){return"dino"===e.aliveType?b.Ur:"person"===e.aliveType?b.XX:v.yc},curse:function(e){return g[+e.date%g.length]},music:function(){return b.xM}};function O(e){var t=e.item,n=e.index,a=t.ctx.locked;t.hasOwnProperty("preventSelfDrag")&&t.preventSelfDrag()&&(a=!0);var i=function(e){return e.icon||(E.hasOwnProperty(e.type)?E[e.type](e):null)}(t);return r.a.createElement(d.b,{draggableId:String(t.id),index:n,isDragDisabled:a},(function(e,n){return r.a.createElement("div",Object.assign({ref:e.innerRef},e.draggableProps,e.dragHandleProps),r.a.createElement("div",{className:"py-1"},r.a.createElement("div",{className:h()("inventory-item noselect px-2 py-3 rounded-right rounded-bottom",t.emote,a&&"locked")},r.a.createElement("h6",{className:"item-date text-white-50 float-right ml-3 mt-1"},"string"==typeof t.date?t.date:t.date&&t.date.toLocaleDateString()),r.a.createElement("h4",{className:"text-uppercase mb-1"},i&&r.a.createElement(i,{className:"mr-2",style:{marginTop:"-.25em"}}),t.title),t.hasConsumed&&r.a.createElement("p",{className:"text-white text-uppercase mb-1 float-right"},t.consumeVerb||"Ate"," ",t.hasConsumed.map((function(e){return e.title})).join(", ")),t.message&&r.a.createElement("p",{className:"item-message mb-1"},t.message))))}))}function k(e){var t=e.name,n=e.inventories[t],a="backpack"===t;return r.a.createElement("div",{className:"inventory pt-3"},r.a.createElement(d.c,{droppableId:t},(function(e,i){return r.a.createElement("div",Object.assign({},e.droppableProps,{ref:e.innerRef}),r.a.createElement("div",{style:{background:"#0002",height:"60vh",overflowY:"scroll"}},r.a.createElement("div",{className:"p-3",style:{minHeight:a&&"70vh"}},n.map((function(e,n){return r.a.createElement(O,{key:t+e.id,item:e,index:n})})),e.placeholder)))})))}var x=n(28),w=n(3),C=n.n(w),D=n(8),I=n(29),j=n.n(I),S=n(16),N=n.n(S),A={suspicious:["Yeah, sure, sure.","Time traveler? I doubt it.","Okay then, McFly.","Seems like the paparazzi are getting desperate.","I have no reason to believe you.","Nice costume."],friendly:["What the heck...","How??","How is this possible?","Do you have flying cars yet?","It's true!","I'm just not going to question this.","Is this a dream?","Wow. Okay. Time traveler. Fair enough.","I can't believe it!","Do you have an extra seat?","Can you bring me along?","Please let me come with you.","Mind if I tag along?","It's a miracle!"],sedated:["Zzzzzz...","I'mma take a nap.","What did you put in this?","I don't think that was juice.","Something isn't right...","Whoa..."],curse:["YOU HAVE TRESPASSED ON SACRED GROUND","TIME TRAVELERS ARE UNWELCOME HERE","BURN","BURN","BEGONE","GO","LEAVE","RUN","AWAY","FLEE","HEATHEN","TIME-CRAWLER","DESECRATOR","FOE OF THE TEMPORAL DEMON","DEFILER","YOU DID NOT LISTEN","BLOOD WILL BE SPILLED","WE DO NOT TAKE KINDLY TO YOUR PRESENCE","LEAVE WHILE YOU HAVE THE CHANCE","TIME-WEEVIL","FIEND","WE SHALL NOT BE CONTAINED","SACRIFICE","AWAY","THE BAT WILL FIND YOU","OUT","TOO FAR","REJOICE","YOUR KIND HAVE NO PLACE HERE"]};function T(e){return L.apply(this,arguments)}function L(){return(L=Object(D.a)(C.a.mark((function e(t){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(A.hasOwnProperty(t)){e.next=2;break}throw new Error("Unknown dialog type: "+t);case 2:return e.abrupt("return",A[t]);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=["January","February","March","April","May","June","July","August","September","October","November","December"];function M(e,t){return e.double()<=t}function P(e,t){if(!t.length)throw new Error("Empty array");return t[Math.abs(e.int32())%t.length]}function F(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];t.splice.apply(t,[Math.abs(e.int32())%(t.length+1),0].concat(a))}function H(e,t,n){var a=new Date(+t+e.double()*(+n-t)).toDateString();return new Date(a)}function W(e){return U.apply(this,arguments)}function U(){return(U=Object(D.a)(C.a.mark((function e(t){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){return j.a.parse(t,{download:!0,header:!0,skipEmptyLines:!0,complete:function(t){e(t.data)}})})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Y=N()("people"),B=Promise.all([W("data/singers.csv").then(function(){var e=Object(D.a)(C.a.mark((function e(t){var n,a,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T("suspicious");case 2:return n=e.sent,e.next=5,T("friendly");case 5:return a=e.sent,e.next=8,T("sedated");case 8:return r=e.sent,e.abrupt("return",t.map((function(e,t){var i={type:"person",title:e.singer,message:'"'.concat(P(Y,n),'"'),date:new Date(e.year,e.month-1,e.day),emote:"suspicious",consumeVerb:"Sedated",preventSelfDrag:function(){var e=this;return!this.hasConsumed&&("today"===this.ctx.name&&"suspicious"===this.emote||this.ctx.inventories["today"===this.ctx.name?"backpack":"today"].some((function(t){return t.willConsume&&t.willConsume(e)})))},willConsume:function(e){return!this.hasConsumed&&"juice"===e.type},onConsume:function(e){this.message=P(N()(this.id),r),this.hasConsumed.length=0},onView:function(){var e=this;"suspicious"===this.emote&&this.ctx.items.some((function(t){return"dino"===t.type||["event","music"].includes(t.type)&&+t.date>+e.date}))&&this.convertFriendly()},convertFriendly:function(){this.emote="friendly",this.message='"'.concat(P(N()(this.id),a),'"')}};return M(Y,.4)&&i.convertFriendly(),i})));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())]),V=Promise.all([W("data/headlines.csv").then((function(e){return e.map((function(e,t){return{type:"event",title:e.title,date:new Date(e.year,e.month-1,e.day),noSkeleton:!0}}))})),W("data/songs.csv").then((function(e){return e.map((function(e,t){return{type:"music",title:e.song,message:e.singer,date:new Date(e.year,e.month-1,e.day),emote:"music",noSkeleton:!0}}))}))]).then((function(e){return e.flat()})).then((function(e){return t=function(e){return e.date.getFullYear()},e.reduce((function(e,n){var a=t(n);return(e[a]=e[a]||[]).push(n),e}),{});var t})),G=W("data/dinosaurs.csv").then((function(e){return e.map((function(e,t){var n=e.diet.toLowerCase().includes("omni"),a=e.diet.toLowerCase().includes("carni"),r=e.diet.toLowerCase().includes("herbi");return{type:"dino",title:e.name,message:e.diet.toUpperCase().replace("?",""),date:e.period.toUpperCase(),emote:a?"angry":"neutral",preventDrag:function(){return a?!this.hasConsumed||this.hasConsumed.length<3:"today"===this.ctx.name&&!this.hasConsumed},willConsume:function(e){var t=e.type;return[].concat(Object(c.a)(a||n?["dino","person"]:[]),Object(c.a)(r||n?["food"]:[])).includes(t)},onConsume:function(e){if(!e.noSkeleton){var t={type:"skeleton",aliveType:e.type,title:e.title,message:"Skeleton",icon:e.skeletonIcon},n=Object(c.a)(this.ctx.inventories[this.ctx.name]);n.splice(n.indexOf(this)+1,0,t),this.ctx.applyInventory(this.ctx.name,n)}}}}))})),z=["Potato","Rice","Tofu","Corn","Carrot","Beans","Soylent","Lard","Quinoa"].map((function(e){return{type:"food",title:e,emote:"food",noSkeleton:!0}})),J=["Orange","Apple","Lemon","Lime","Kiwi","Grape"].map((function(e){return{type:"juice",title:e+" Juice",emote:"juice",noSkeleton:!0}}));function q(){return(q=Object(D.a)(C.a.mark((function e(t){var n,a,r,i;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V;case 2:if(e.t0=t.getFullYear(),n=e.sent[e.t0]){e.next=6;break}return e.abrupt("return",[]);case 6:if(a=t.toDateString(),!(r=n.filter((function(e){return e.date.toDateString()===a}))).length){e.next=51;break}if(i=N()(a),+t!==+new Date(2015,9,21)){e.next=14;break}F(i,r,{type:"person",title:"Doc Brown",date:t,message:'"Great Scott!"',emote:"friendly"},{type:"person",title:"Marty McFly",date:t,message:'"This is heavy."',emote:"friendly"}),e.next=51;break;case 14:if(1!==t.getDate()){e.next=23;break}return r.length=0,e.t1=r,e.next=19,ee(i,t);case 19:e.t2=e.sent,e.t1.unshift.call(e.t1,e.t2),e.next=51;break;case 23:if(!M(i,.3)){e.next=33;break}return e.t3=F,e.t4=i,e.t5=r,e.next=29,Q(i,t);case 29:e.t6=e.sent,(0,e.t3)(e.t4,e.t5,e.t6),e.next=51;break;case 33:if(!M(i,.3)){e.next=43;break}return e.t7=F,e.t8=i,e.t9=r,e.next=39,$(i,t);case 39:e.t10=e.sent,(0,e.t7)(e.t8,e.t9,e.t10),e.next=51;break;case 43:if(!M(i,.3)){e.next=51;break}return e.t11=F,e.t12=i,e.t13=r,e.next=49,K(i,t);case 49:e.t14=e.sent,(0,e.t11)(e.t12,e.t13,e.t14);case 51:return e.abrupt("return",r);case 52:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(e,t){return X.apply(this,arguments)}function X(){return(X=Object(D.a)(C.a.mark((function e(t,n){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=P,e.t1=t,e.next=4,G;case 4:return e.t2=e.sent,e.abrupt("return",(0,e.t0)(e.t1,e.t2));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(e,t){return Z.apply(this,arguments)}function Z(){return(Z=Object(D.a)(C.a.mark((function e(t,n){var a,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=P,e.t1=t,e.next=4,B;case 4:return e.t2=e.sent,e.t3=function(e){return+e.date>=n},a=(0,e.t0)(e.t1,e.t2).filter(e.t3),r=a.length?P(t,a):{type:"person",title:"Gustav",emote:"friendly"},e.abrupt("return",Object(u.a)({},r,{date:n}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e,t){return _.apply(this,arguments)}function _(){return(_=Object(D.a)(C.a.mark((function e(t,n){return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",M(t,.7)?P(t,z):P(t,J));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ee(e,t){return te.apply(this,arguments)}function te(){return(te=Object(D.a)(C.a.mark((function e(t,n){var a,r;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=function(e){var t=[e.getMonth()+1,e.getDate()],n=t[0],a=["","Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn"];return t[1]>["",19,18,20,20,21,21,22,22,21,22,21,20,19][n]?a[n+1]:a[n]},r=N()(),e.abrupt("return",{type:"person",title:a(n)+" Time Witch",emote:"witch",skeletonIcon:b.hY,preventDrag:function(){return"backpack"!==this.ctx.name},update:function(e){var t=this;this.attackTimer+=e,this.attackTimer>1.2&&(ne(r,n).then((function(e){t.ctx.applyInventory("backpack",[e].concat(Object(c.a)(t.ctx.inventories.backpack)))})),this.attackCt++,this.attackCt>3&&(this.attackCt=0,this.attackTimer=0))},attackTimer:0,attackCt:0});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ne(e,t){return ae.apply(this,arguments)}function ae(){return(ae=Object(D.a)(C.a.mark((function e(t,n){var a;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 1===(a=H(t,new Date(2003,1,1),new Date(2020,1,1))).getDate()&&a.setDate(2),e.t0=P,e.t1=t,e.next=6,T("curse");case 6:return e.t2=e.sent,e.t3=(0,e.t0)(e.t1,e.t2),e.t4=a,e.t5=function(){return"cursed"===this.emote&&+this.date!==+this.ctx.date},e.t6=function(){var e=this;return"cursed"===this.emote&&!this.ctx.items.some((function(t){return"curse"===t.type&&+t.date===+e.ctx.date}))},e.t7=function(e){return"cursed"===this.emote&&("event"===e.type&&+this.date===+e.date||"music"===e.type)},e.t8=function(e){this.emote=null,this.hasConsumed.length=0},e.abrupt("return",{type:"curse",title:e.t3,date:e.t4,emote:"cursed",consumeVerb:"Amended",preventSelfDrag:e.t5,preventDrag:e.t6,willConsume:e.t7,onConsume:e.t8});case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var re=[];setInterval((function(){for(var e=0;e<re.length;e++)re[e].update(.1)}),100);var ie=null;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement((function(){var e=new Date,t=Object(a.useState)(null),n=Object(l.a)(t,2),i=n[0],o=n[1],f=Object(a.useState)(e.getFullYear()),y=Object(l.a)(f,2),b=y[0],g=y[1],E=Object(a.useState)(e.getMonth()),O=Object(l.a)(E,2),w=O[0],C=O[1],D=Object(a.useState)(e.getDate()),I=Object(l.a)(D,2),j=I[0],S=I[1],N=Object(a.useState)(null),A=Object(l.a)(N,2),T=A[0],L=A[1],M=Object(a.useState)({}),P=Object(l.a)(M,2),F=P[0],H=P[1],W=new Date(b,w,j),U=W.toDateString();F.hasOwnProperty(U)?T=F[U]:T||function(e){return q.apply(this,arguments)}(W).then((function(e){return L(e)}));var Y=Object(a.useState)({today:[],backpack:[{id:"stevie-o",type:"person",title:"Stevie-o",date:e,icon:v.Xg,skeletonIcon:v.yc,message:'"Bark! Woof!"',emote:"friendly"}]}),B=Object(l.a)(Y,2),V=B[0],G=B[1];T&&(V.today=T);var z={};re.length=0,Object.entries(V).forEach((function(e){var t=Object(l.a)(e,2),n=t[0],a=t[1],r={date:W,name:n,items:a,inventories:V,queryArray:function(e){return this.items.map((function(t){return t.hasOwnProperty(e)?"function"===typeof t[e]?t[e](r):t[e]:void 0}))},queryAny:function(e){return this.queryArray(e).some((function(e){return e}))},applyInventory:function(e,t){V[e]=t,"today"===e&&H(Object(u.a)({},F,Object(s.a)({},U,t))),G(Object(u.a)({},V))}};z[n]=r,a.forEach((function(e){e.id||(e.id=Object(x.a)()),e.ctx=r,e.onView&&e.onView(),e.update&&re.push(e)}));var i=Object(c.a)(a),o=Object(c.a)(a);i.forEach((function(e){e.willConsume&&o.forEach((function(t,i){if(t&&e!==t&&e.willConsume(t)){o[i]=null;var c=a.indexOf(t);-1!==c&&a.splice(c,1),r.applyInventory(n,a),(e.hasConsumed=e.hasConsumed||[]).push(t),e.hasOwnProperty("onConsume")&&e.onConsume(t)}}))})),r.locked=r.queryAny("preventDrag")}));var J=[[w,C,0,11,R[w].toUpperCase().slice(0,3),b>2019],[j,S,1,new Date(b,w,0).getDate(),j.toString().padStart(2,"0"),b>2019],[b,g,2003,2019,b]];function K(e){function t(t){e.preventDefault();var n=Math.max(0,Math.min(J.length-1,parseInt(e.target.id.slice(-1))+t)),a=document.getElementById(e.target.id.slice(0,-1)+n);a&&a.focus()}38===e.keyCode?t(-1):40===e.keyCode?t(1):37!==e.keyCode&&39!==e.keyCode||(o("time-jump-"+(37===e.keyCode?"left":"right")),clearTimeout(ie),ie=setTimeout((function(){o(null)}),200))}return r.a.createElement("div",null,r.a.createElement("div",{className:"pt-3 pb-1",style:{background:"#0005"}},r.a.createElement(p.a,{className:"text-center"},r.a.createElement(m.a,{sm:4},r.a.createElement("h2",{className:"mb-0 text-primary text-left mt-5 ml-4"},"Outside")),r.a.createElement(m.a,{sm:4},r.a.createElement("div",{className:h()(i)},r.a.createElement("div",{className:"form-group"},J.map((function(e,t){var n=Object(l.a)(e,6),a=n[0],i=n[1],c=n[2],s=n[3],u=n[4],d=n[5];return r.a.createElement("div",{key:t},r.a.createElement(p.a,{className:"text-right text-info"},r.a.createElement(m.a,{xs:4},r.a.createElement("h5",{className:"mt-1 pt-2"},u)),r.a.createElement(m.a,{xs:8},r.a.createElement("input",{type:"range",id:"slider-"+t,className:"form-control",min:c,max:s,style:{opacity:d?.2:1},value:Math.min(s,Math.max(c,a)),onChange:function(e){L(null),i(e.target.value)},onMouseDown:function(){return o("time-traveling")},onMouseUp:function(){return o(null)},onKeyDown:K,onBlur:function(e){return e.relatedTarget||e.target.focus()}}))))}))))),r.a.createElement(m.a,{sm:4},r.a.createElement("h2",{className:"text-primary text-right mt-5 mr-4"},"Inside")))),r.a.createElement(d.a,{onDragEnd:function(e){var t=e.source,n=e.destination;if(n){if(t.droppableId===n.droppableId)V[n.droppableId]=function(e,t,n){var a=Array.from(e),r=a.splice(t,1),i=Object(l.a)(r,1)[0];return a.splice(n,0,i),a}(V[n.droppableId],t.index,n.index);else V[t.droppableId][t.index].ctx=z[n.droppableId],Object.assign(V,function(e,t,n,a){var r=Array.from(e),i=Array.from(t),o=r.splice(n.index,1),c=Object(l.a)(o,1)[0];i.splice(a.index,0,c);var s={};return s[n.droppableId]=r,s[a.droppableId]=i,s}(V[t.droppableId],V[n.droppableId],t,n));"today"!==t.droppableId&&"today"!==n.droppableId||H(Object(u.a)({},F,Object(s.a)({},U,V.today))),G(Object(u.a)({},V))}}},r.a.createElement("div",{className:h()(i)},r.a.createElement(p.a,null,r.a.createElement(m.a,{md:6},V.today&&W.getFullYear()<=2019&&r.a.createElement(k,{name:"today",inventories:V})),r.a.createElement(m.a,{md:6},r.a.createElement(k,{name:"backpack",inventories:V}))))))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.64bc5069.chunk.js.map