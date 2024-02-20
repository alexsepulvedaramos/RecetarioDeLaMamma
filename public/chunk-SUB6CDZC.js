import{a as M,b as ee}from"./chunk-SNHGCDMB.js";import{a as Z}from"./chunk-DDXTI3RK.js";import{$ as D,A as n,B as a,C as s,D as P,E as g,F as y,G as O,H as F,I as E,J as l,K as R,L as j,N as I,O as V,aa as A,ba as N,ca as z,da as Q,ea as q,fa as $,ga as H,ha as B,i as b,ia as G,ja as J,ka as K,l as d,la as X,m as C,ma as Y,n as w,na as U,o as S,oa as W,pa as k,s as c,t as h,v as T,w as u,x as L,y as v,z as x}from"./chunk-274D6EXY.js";var ae=["sidebarRef"],pe=(i,e)=>e.label;function se(i,e){if(i&1){let p=P();n(0,"li",25),g("click",function(t){w(p);let o=y(2);return S(o.closeCallback(t))}),n(1,"a",26),s(2,"i"),n(3,"span",27),l(4),a()()()}if(i&2){let p=e.$implicit;u("routerLink",p.url),c(2),L(p.icon),c(2),R(p.label)}}function le(i,e){if(i&1){let p=P();n(0,"div",13)(1,"div",14)(2,"span",15),s(3,"p-image",16),n(4,"span",17),l(5,"Mum's Recipes"),a(),n(6,"p-button",18),g("click",function(t){w(p);let o=y();return S(o.closeCallback(t))}),a()()(),n(7,"div",19)(8,"ul",20),v(9,se,5,4,"li",28,pe),a()(),n(11,"div",21),s(12,"hr",22),n(13,"a",23),s(14,"p-avatar",10),n(15,"span",24),l(16,"Alejandro Sep\xFAlveda"),a()()()()}if(i&2){let p=y();c(9),x(p.sidebarItems)}}var te=(()=>{let e=class e{closeCallback(r){this.sidebarRef.close(r)}constructor(r,t){this.authService=r,this.router=t,this.sidebarVisible=!1,this.sidebarItems=[{label:"Search recipes",icon:"pi pi-search mr-3",url:"./recipe-list"},{label:"New recipe",icon:"pi pi-plus mr-3",url:"./add-recipe"}]}};e.\u0275fac=function(t){return new(t||e)(h(Z),h(U))},e.\u0275cmp=d({type:e,selectors:[["app-layout-page"]],viewQuery:function(t,o){if(t&1&&O(ae,5),t&2){let m;F(m=E())&&(o.sidebarRef=m.first)}},decls:16,vars:1,consts:[[3,"visible","visibleChange"],["sidebarRef",""],["pTemplate","headless"],[1,"p-toolbar-group-start","ml-1"],["icon","pi pi-bars",3,"click"],[1,"p-toolbar-group-center"],["src","../../../../assets/app-icon-white.png","alt","Mum's Recipes icon","width","30",1,"mx-2"],[1,"font-semibold","text-3xl","text-primary"],[1,"p-toolbar-group-end","mr-1"],["pRipple","",1,"flex","align-items-center","cursor-pointer","gap-2","border-round","text-700","hover:surface-100","transition-duration-150","transition-colors","p-ripple"],["size","large","image","https://media.licdn.com/dms/image/D4D03AQGtph3VhlHfPQ/profile-displayphoto-shrink_200_200/0/1708007553474?e=1714003200&v=beta&t=8H7i3OKJej5VDqSTODiTcOIY_HM65zXEb5F65MylvNE","shape","circle"],[1,"avatar-name","font-bold"],[1,"content"],[1,"flex","flex-column","h-full"],[1,"flex","align-items-center","justify-content-between","pl-4","pt-3","flex-shrink-0"],[1,"inline-flex","align-items-center","gap-3"],["src","../../../../assets/app-icon-white.png","alt","Mum's Recipes icon","width","30"],[1,"font-semibold","text-2xl","text-primary"],["type","button","icon","pi pi-times",3,"click"],[1,"overflow-y-auto"],[1,"list-none","p-3","m-0"],[1,"mt-auto"],[1,"mb-3","mx-3","border-top-1","border-none","surface-border"],["pRipple","",1,"m-3","flex","align-items-center","cursor-pointer","p-3","gap-2","border-round","text-700","hover:surface-100","transition-duration-150","transition-colors","p-ripple"],[1,"font-bold"],[3,"routerLink","click"],["pRipple","",1,"flex","align-items-center","cursor-pointer","p-3","border-round","text-700","hover:surface-100","transition-duration-150","transition-colors","p-ripple"],[1,"font-medium"],[3,"routerLink"]],template:function(t,o){t&1&&(n(0,"p-sidebar",0,1),g("visibleChange",function(f){return o.sidebarVisible=f}),T(2,le,17,0,"ng-template",2),a(),n(3,"p-toolbar")(4,"div",3)(5,"p-button",4),g("click",function(){return o.sidebarVisible=!0}),a()(),n(6,"div",5),s(7,"p-image",6),n(8,"span",7),l(9,"Mum's Recipes"),a()(),n(10,"div",8)(11,"a",9),s(12,"p-avatar",10),n(13,"span",11),l(14,"Alejandro Sep\xFAlveda"),a()()()(),s(15,"router-outlet",12)),t&2&&u("visible",o.sidebarVisible)},dependencies:[Q,B,$,G,q,J,K,Y,W],styles:["[_nghost-%COMP%]  .p-ripple{text-decoration:none!important}[_nghost-%COMP%]  .p-toolbar{height:80px;padding:.5rem!important;border-radius:0%;box-shadow:0 2px 2px #0003;position:fixed;z-index:1005;top:0;left:0;width:100%}@media only screen and (max-width: 768px){[_nghost-%COMP%]  .avatar-name{display:none}}"]});let i=e;return i})();var ie=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["app-add-recipe"]],decls:3,vars:0,template:function(t,o){t&1&&(n(0,"div")(1,"span"),l(2,"add-recipe-page works! "),a()())},encapsulation:2});let i=e;return i})();var ce=i=>({"background-image":i}),re=(()=>{let e=class e{ngOnInit(){if(!this.recipe)throw Error("Recipe property is required!")}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d({type:e,selectors:[["app-recipe-card"]],inputs:{recipe:"recipe"},decls:4,vars:4,consts:[[1,"recipe-box",3,"ngStyle"],[1,"gradient-overlay"],[1,"title"]],template:function(t,o){t&1&&(n(0,"div",0)(1,"div",1)(2,"h1",2),l(3),a()()()),t&2&&(u("ngStyle",j(2,ce,"url("+o.recipe.images+")")),c(3),R(o.recipe.name))},dependencies:[I],styles:['[_nghost-%COMP%]  .recipe-box{border-radius:20px;box-shadow:0 0 10px #0003;background-size:cover;background-repeat:no-repeat;background-position:center;height:100%}[_nghost-%COMP%]  .gradient-overlay{border-radius:20px;content:"";position:relative;top:50%;left:0;width:100%;height:50%;background:linear-gradient(to bottom,#0000,#000c);z-index:1}[_nghost-%COMP%]  .recipe-box:hover{background-size:103%}[_nghost-%COMP%]  .title{position:absolute;bottom:5%;left:2.5%;margin:0;padding:0;color:#fff;font-size:3rem;font-weight:700}']});let i=e;return i})();var de=(i,e)=>e.id;function ue(i,e){if(i&1&&s(0,"app-recipe-card",4),i&2){let p=e.$implicit;u("recipe",p)}}var oe=(()=>{let e=class e{constructor(r){this.firestoreService=r,this.recipes=[],this.filteredRecipes=[],this.suggestedRecipes=[],this.firestoreService.getAllRecipes().subscribe(t=>{console.log(t),this.recipes=t,this.filteredRecipes=this.recipes})}searchRecipe(r){let t=r.query;this.suggestedRecipes=this.filterRecipes(t),this.showRecipes()}showRecipes(r){r&&(this.suggestedRecipes=this.filterRecipes(r.value.name)),this.filteredRecipes=this.suggestedRecipes}resetRecipes(){this.filteredRecipes=this.recipes}filterRecipes(r){let t=[];return this.recipes.forEach(o=>{o.name.toLowerCase().indexOf(r.toLowerCase())==0&&t.push(o)}),t}};e.\u0275fac=function(t){return new(t||e)(h(M))},e.\u0275cmp=d({type:e,selectors:[["app-recipe-list"]],decls:6,vars:4,consts:[[1,"card","main-content"],[1,"p-fluid"],["field","name",3,"ngModel","suggestions","showClear","placeholder","ngModelChange","completeMethod","onSelect","onClear"],[1,"grid"],[1,"col-12","sm:col-12","lg:col-6",3,"recipe"],["class","col-12 sm:col-12 lg:col-6",3,"recipe"]],template:function(t,o){t&1&&(n(0,"div",0)(1,"span",1)(2,"p-autoComplete",2),g("ngModelChange",function(f){return o.searchParam=f})("completeMethod",function(f){return o.searchRecipe(f)})("onSelect",function(f){return o.showRecipes(f)})("onClear",function(){return o.resetRecipes()}),a()(),n(3,"div",3),v(4,ue,1,1,"app-recipe-card",5,de),a()()),t&2&&(c(2),u("ngModel",o.searchParam)("suggestions",o.suggestedRecipes)("showClear",!0)("placeholder","Busca una receta..."),c(2),x(o.filteredRecipes))},dependencies:[H,D,A,re],styles:["[_nghost-%COMP%]  .main-content{padding:2rem;justify-content:center}[_nghost-%COMP%]  .p-dataview-content{margin-top:1rem}[_nghost-%COMP%]  .p-fluid .p-autocomplete{justify-content:center;margin-left:20%;margin-right:20%;margin-bottom:1.6rem}[_nghost-%COMP%]  .p-fluid .p-inputtext{border-radius:20px;box-shadow:0 0 10px #0003}[_nghost-%COMP%]  app-recipe-card{height:500px}@media only screen and (max-width: 768px){[_nghost-%COMP%]  .p-fluid .p-autocomplete{margin-left:10%;margin-right:10%}}"]});let i=e;return i})();var fe=[{path:"",component:te,children:[{path:"add-recipe",component:ie},{path:"recipe-list",component:oe},{path:"**",redirectTo:"recipe-list"}]}],ne=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C({type:e}),e.\u0275inj=b({imports:[k.forChild(fe),k]});let i=e;return i})();var Ye=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C({type:e}),e.\u0275inj=b({providers:[M,ee],imports:[V,X,N,z,ne]});let i=e;return i})();export{Ye as RecipesModule};
