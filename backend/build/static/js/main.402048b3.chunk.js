(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,t,a){e.exports=a(58)},36:function(e,t,a){},37:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(28),c=a.n(l),i=(a(36),a(9)),o=a(5),u=a(13),s=a(6),m=a(11),d=(a(37),a(1)),p=a.n(d),g="/api/recipes",h={getAll:function(){return p.a.get(g).then(function(e){return e.data})},getAllById:function(e){return p.a.get("".concat(g,"/user/").concat(e)).then(function(e){return e.data})},getOne:function(e){return p.a.get("".concat(g,"/").concat(e)).then(function(e){return e.data})},getOneByTitle:function(e){return p.a.get("".concat(g,"/title/").concat(e)).then(function(e){return e.data})},create:function(e,t){return p.a.post("".concat(g,"/").concat(e),t).then(function(e){return e.data})},del:function(e,t,a){return p.a.delete("".concat(g,"/").concat(e,"&").concat(t,"&").concat(a)).then(function(e){return e.data})},edit:function(e,t,a,n){return p.a.put("".concat(g,"/").concat(e,"&").concat(t,"&").concat(a),n).then(function(e){return e.data})},getAllByGroups:function(e,t){var a={group:e};return t?p.a.post("".concat(g,"/group/").concat(t),a).then(function(e){return e.data}):p.a.post("".concat(g,"/group/"),a).then(function(e){return e.data})}},E={getAll:function(){return p.a.get("/api/users").then(function(e){return e.data})},getOne:function(e){return p.a.get("".concat("/api/users","/").concat(e)).then(function(e){return e.data})},create:function(e){return p.a.post("/api/users",e).then(function(e){return e.data})},del:function(e,t,a){return p.a.delete("".concat("/api/users","/").concat(e,"&").concat(t,"&").concat(a)).then(function(e){return e.data})},edit:function(e,t,a,n){return e||(e=0),t||(t=0),Object.keys(n).forEach(function(e){n[e]||delete n[e]}),p.a.put("".concat("/api/users","/").concat(e,"&").concat(t,"&").concat(a),n).then(function(e){return e.data})}},v={login:function(e,t){return p.a.post("".concat("/api/user","/login/").concat(e,"&").concat(t)).then(function(e){return e.data})},logout:function(e,t){return p.a.post("".concat("/api/user","/logout/").concat(e,"&").concat(t)).then(function(e){return e.data})}},f={saveLogin:function(e){sessionStorage.setItem("username",e.username),sessionStorage.setItem("id",e.id),sessionStorage.setItem("email",e.email),sessionStorage.setItem("loginKEY",e.loginKEY),console.log("login session set")},checkLogin:function(){if(sessionStorage.getItem("username")){var e={username:sessionStorage.getItem("username"),id:sessionStorage.getItem("id"),email:sessionStorage.getItem("email"),loginKEY:sessionStorage.getItem("loginKEY")};return console.log("login session found"),e}},clearLogin:function(){sessionStorage.clear(),console.log("session cleared")}};var b=function(e){var t=e.Link,a=e.handleLogout,n=e.user,l=(e.clearEdit,e.hamburgerClick),c=e.clearAddArrays;return r.a.createElement("div",{id:"nav"},r.a.createElement("div",{id:"nav__main"},r.a.createElement(t,{to:"/",onClick:l},"Etusivu"),r.a.createElement(t,{to:"/Recipes",onClick:function(e){c(e),l(e)}},"Reseptej\xe4")),r.a.createElement("div",{id:"nav__sub"},n?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Hei ",n.username),r.a.createElement(t,{to:"/AddRecipe",onClick:function(e){c(e),l(e)}},"Lis\xe4\xe4 resepti"),r.a.createElement(t,{to:"/User",onClick:l},"K\xe4ytt\xe4j\xe4tili"),r.a.createElement(t,{to:"/MyRecipes",onClick:function(e){c(e),l(e)}},"Minun reseptit"),r.a.createElement(t,{onClick:function(e){a(e),l(e)},to:"/"},"Kirjaudu ulos")):r.a.createElement(r.a.Fragment,null,r.a.createElement(t,{to:"/Login",onClick:l},"Kirjaudu sis\xe4\xe4n"),r.a.createElement(t,{to:"/Register",onClick:l},"Rekister\xf6idy"))))};var k=function(e){var t=e.loginHandler;return r.a.createElement("div",{id:"loginForm"},r.a.createElement("form",{onSubmit:t},r.a.createElement("h1",null,"Kirjaudu sis\xe4\xe4n"),r.a.createElement("input",{name:"name",placeholder:"K\xe4ytt\xe4j\xe4nimi",required:!0}),r.a.createElement("input",{name:"pass",placeholder:"Salasana",type:"password",required:!0}),r.a.createElement("button",null,"Kirjaudu")))};var y=function(e){var t=e.registerHandler;return r.a.createElement("div",{id:"registerForm"},r.a.createElement("form",{onSubmit:t},r.a.createElement("h1",null,"Rekister\xf6idy"),r.a.createElement("input",{name:"name",placeholder:"K\xe4ytt\xe4j\xe4nimi",required:!0}),r.a.createElement("input",{name:"pass",placeholder:"Salasana",type:"password",required:!0}),r.a.createElement("button",null,"Rekister\xf6idy")))};var j=function(e){var t=e.recipe,a=e.handleOpen,n=e.dest,l=e.clearAddArrays;return r.a.createElement("div",null,r.a.createElement("h3",null,t.title),r.a.createElement("p",null,t.description),r.a.createElement("button",{onClick:function(e){a(e),l(e)},value:"".concat(t.id,":").concat(n)},"Avaa"))};var O=function(e){var t=e.recipes,a=e.handleOpen,n=e.cat,l=e.handleChange,c=e.group,i=e.addArrays,o=e.handleGroup,u=e.clearAddArrays;return t?r.a.createElement("div",{id:"recipes"},r.a.createElement("h1",null,"Uusimpia reseptej\xe4:"),r.a.createElement("select",{name:"recipesCategory",onChange:l},n.map(function(e,t){return r.a.createElement("option",{key:t,value:e.toLowerCase()},e)})),r.a.createElement("ul",{id:"group"},c.map(function(e){return i.group.indexOf(e.toLowerCase())>=0?r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:o,value:e.toLowerCase(),checked:!0,hidden:!0}),r.a.createElement("label",{htmlFor:e},e)):r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:o,value:e.toLowerCase(),checked:!1,hidden:!0}),r.a.createElement("label",{htmlFor:e},e))})),r.a.createElement("hr",null),t&&t.length>0?t.map(function(e,n){return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,{key:n,recipe:e,handleOpen:a,dest:"recipes",clearAddArrays:u}),n!==t.length-1?r.a.createElement("hr",null):null)}):r.a.createElement("p",null,"Reseptej\xe4 ei l\xf6ytynyt")):r.a.createElement(r.a.Fragment,null)};var C=function(e){var t=e.user,a=e.recipes,n=e.handleOpen,l=e.cat,c=e.handleChange,i=e.group,o=e.addArrays,u=e.handleGroup,s=e.clearAddArrays;return t?r.a.createElement("div",{id:"myRecipes"},r.a.createElement("h1",null,"Minun reseptit:"),r.a.createElement("select",{name:"myRecipesCategory",onChange:c},l.map(function(e,t){return r.a.createElement("option",{key:t,value:e.toLowerCase()},e)})),r.a.createElement("ul",{id:"group"},i.map(function(e){return o.group.indexOf(e.toLowerCase())>=0?r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:u,value:e.toLowerCase(),checked:!0,hidden:!0}),r.a.createElement("label",{htmlFor:e},e)):r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:u,value:e.toLowerCase(),checked:!1,hidden:!0}),r.a.createElement("label",{htmlFor:e},e))})),r.a.createElement("hr",null),a&&a.length>0?a.map(function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,{key:t,recipe:e,handleOpen:n,dest:"myRecipes",clearAddArrays:s}),t!==a.length-1?r.a.createElement("hr",null):null)}):r.a.createElement("p",null,"Reseptej\xe4 ei l\xf6ytynyt")):r.a.createElement("p",null,"Et ole kirjautunut sis\xe4\xe4n")};var A=function(e){var t=e.recipe,a=e.dest,n=e.user,l=e.delRecipe,c=e.match,i=e.setRecipe,o=e.Link;return(0,e.setEditable)(""),t?r.a.createElement("div",{id:"recipe"},r.a.createElement("div",{className:"recipe__nav"},r.a.createElement(o,{to:"/"!==a&&a?"/".concat(a):"/",id:"back"},r.a.createElement("button",null,"/"!==a&&a?"Takaisin":"Etusivulle")),!(!n||n.id!==t.userID)&&r.a.createElement(r.a.Fragment,null,r.a.createElement(o,{to:"/editRecipe/".concat(t.id)},r.a.createElement("button",null,"Muokkaa")),r.a.createElement("button",{onClick:l,value:"".concat(t.id)},"Poista"))),r.a.createElement("h1",null,t.title),t.group.length>0?r.a.createElement("p",null,t.group.map(function(e,t){return 0===t&&e?"- ".concat(e,"  - "):"".concat(e,"  - ")})):null,r.a.createElement("p",null,"- ",t.category," -"),r.a.createElement("p",null,t.description),r.a.createElement("p",null,r.a.createElement("b",null,"Ainekset:")),r.a.createElement("ul",null,t.ingredients.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox"})," ",e))})),r.a.createElement("p",null,r.a.createElement("b",null,"Valmistus:")),r.a.createElement("ol",null,t.steps.map(function(e,t){return r.a.createElement("li",{key:t},e)})),t.servings&&0!==t.servings?r.a.createElement("p",null,r.a.createElement("b",null,"Annoksia:")," ",t.servings," ",t.servings>1?"lautasellista":"lautasellinen"):null,t.timeToMake&&0!==t.timeToMake?r.a.createElement("p",null,r.a.createElement("b",null,"Valmistuksen kesto:")," n. ","".concat(t.timeToMake," minuuttia")):null):(h.getOneByTitle(c.params.id.replace("_"," ")).then(function(e){i(e)}),r.a.createElement(r.a.Fragment,null))};var w=function(e){var t=e.user,a=e.handleUserNameChange,n=e.handleUserPassChange,l=e.delUser;return t?r.a.createElement("div",{id:"user"},r.a.createElement("h1",null,"Hei ",t.username),r.a.createElement("form",{onSubmit:a},r.a.createElement("p",null,r.a.createElement("b",null,"Vaihda k\xe4ytt\xe4j\xe4nime\xe4")),r.a.createElement("input",{placeholder:"K\xe4ytt\xe4j\xe4nimi",name:"username",required:!0}),r.a.createElement("button",null,"L\xe4het\xe4")),r.a.createElement("form",{onSubmit:n},r.a.createElement("p",null,r.a.createElement("b",null,"Vaihda salasana")),r.a.createElement("input",{placeholder:"Vanha salasana",name:"oldPass",type:"password",required:!0}),r.a.createElement("input",{placeholder:"Uusi salasana",name:"newPass",type:"password",required:!0}),r.a.createElement("button",null,"L\xe4het\xe4")),r.a.createElement("button",{id:"del",onClick:l},"Poista k\xe4ytt\xe4j\xe4")):r.a.createElement("p",null,"Et ole kirjautunut sis\xe4\xe4n")};var L=function(e){var t=e.user,a=e.createRecipeHandler,n=e.cat,l=e.group,c=e.handleGroup,i=e.addArrays;return e.setAddArrays,t?r.a.createElement("div",{id:"addRecipe"},r.a.createElement("h1",null,"Lis\xe4\xe4 uusi resepti"),r.a.createElement("form",{onSubmit:a},r.a.createElement("select",{name:"category",required:!0},n.map(function(e){return"Kaikki"===e?null:r.a.createElement("option",{key:e,value:e.toLowerCase()},e)})),r.a.createElement("ul",{id:"group"},l.map(function(e){return"Kaikki"===e?null:i.group.indexOf(e.toLowerCase())>=0?r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:c,value:e.toLowerCase(),checked:!0,hidden:!0}),r.a.createElement("label",{htmlFor:e},e)):r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:c,value:e.toLowerCase(),checked:!1,hidden:!0}),r.a.createElement("label",{htmlFor:e},e))})),r.a.createElement("input",{name:"title",placeholder:"Otsikko",required:!0}),r.a.createElement("textarea",{name:"description",placeholder:"Kuvaus",rows:"5",required:!0}),r.a.createElement("textarea",{name:"ingredients",placeholder:"Ainekset (erota ainekset eri riveille)",rows:"5",required:!0}),r.a.createElement("textarea",{name:"steps",placeholder:"Vaiheet (erota vaiheet eri riveille)",rows:"5",required:!0}),r.a.createElement("div",{id:"add__bottom"},r.a.createElement("label",null,"Annokset",r.a.createElement("input",{name:"servings",step:"any",type:"number",placeholder:"0"})),r.a.createElement("label",null,"Valmistus aika minuutteina",r.a.createElement("input",{name:"timeToMake",step:"any",type:"number",placeholder:"0"}))),r.a.createElement("input",{type:"hidden",name:"editId",value:""}),r.a.createElement("button",null,"L\xe4het\xe4"))):r.a.createElement("p",null,"Et ole kirjautunut sis\xe4\xe4n")};var R=function(e){var t=e.user,a=e.createRecipeHandler,n=e.editable,l=e.setEditable,c=e.match,o=e.cat,u=e.group,s=e.addArrays,m=e.setAddArrays,d=e.handleGroup,p=e.Link;if(!t)return r.a.createElement("p",null,"Et ole kirjautunut sis\xe4\xe4n");!n.title&&c.params.id&&h.getOne(c.params.id,"").then(function(e){console.log(e),e.ingredients=e.ingredients.join("\n"),e.steps=e.steps.join("\n"),l(Object(i.a)({},e));var t=[];e.group.map(function(e){return t.push(e)});var a=s;a.group=t,m(Object(i.a)({},a))});var g=function(e){var t=n;t[e.target.name]=e.target.value,l(Object(i.a)({},t))};return r.a.createElement("div",{id:"editRecipe"},r.a.createElement(p,{to:"/recipe/".concat(n.title)},r.a.createElement("button",null,"Takaisin")),r.a.createElement("h1",null,"Muokkaa resepti\xe4"),r.a.createElement("form",{onSubmit:a},r.a.createElement("select",{name:"category",value:n.category||"",onChange:g},o.map(function(e,t){return"Kaikki"===e?null:r.a.createElement("option",{key:t,value:e.toLowerCase()},e)})),r.a.createElement(function(e){var t=e.addArrays;return r.a.createElement("ul",{id:"group"},u.map(function(e){return"Kaikki"===e?null:t.group.indexOf(e.toLowerCase())>=0?r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:d,value:e.toLowerCase(),checked:!0,hidden:!0}),r.a.createElement("label",{htmlFor:e},e)):r.a.createElement("li",{key:e},r.a.createElement("input",{id:e,type:"checkbox",name:"recipes",onChange:d,value:e.toLowerCase(),checked:!1,hidden:!0}),r.a.createElement("label",{htmlFor:e},e))}))},{addArrays:s}),r.a.createElement("input",{name:"title",value:n.title||"",onChange:g,placeholder:"Otsikko",required:!0}),r.a.createElement("textarea",{name:"description",value:n.description||"",onChange:g,placeholder:"Kuvaus",rows:"5",required:!0}),r.a.createElement("textarea",{name:"ingredients",value:n.ingredients||"",onChange:g,placeholder:"Ainekset (erota ainekset eri riveille)",rows:"5",required:!0}),r.a.createElement("textarea",{name:"steps",value:n.steps||"",onChange:g,placeholder:"Vaiheet (erota vaiheet eri riveille)",rows:"5",required:!0}),r.a.createElement("div",{id:"add__bottom"},r.a.createElement("label",null,"Annokset",r.a.createElement("input",{name:"servings",type:"number",step:"any",value:n.servings||"0",onChange:g})),r.a.createElement("label",null,"Valmistus aika minuutteina",r.a.createElement("input",{name:"timeToMake",type:"number",value:n.timeToMake||"0",onChange:g,placeholder:"0"}))),r.a.createElement("input",{type:"hidden",name:"editId",value:c.params.id||"",placeholder:"0"}),r.a.createElement("button",null,"L\xe4het\xe4")))},S=function(e){var t=e.recipe,a=e.font,n=e.handleOpen,l=(e.handleChange,e.cat),c=e.changeFilter,i=e.user;return r.a.createElement("div",{id:"hero"},r.a.createElement("div",{className:"hero__nav"},r.a.createElement("button",{value:"rand",onClick:c,className:i?"":"noUser"},"Satunnainen"),!!i&&r.a.createElement("button",{value:"ownRand",onClick:c},"Oma resepti"),r.a.createElement("select",{name:"category",onChange:c},l.map(function(e,t){return r.a.createElement("option",{key:t,value:e.toLowerCase()},e)}))),t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"hero__content"},r.a.createElement("h1",{style:{fontFamily:a}},t.title),r.a.createElement("p",null,t.description)),r.a.createElement("div",{className:"hero__buttons"},r.a.createElement("button",{value:"".concat(t.id,":/"),onClick:n},"Avaa"))):r.a.createElement("div",{className:"hero__content"},r.a.createElement("h1",null,"Ei reseptej\xe4")))},K=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{id:"heartAndMug"},r.a.createElement("i",null,"Made with")," ",r.a.createElement("span",{role:"img","aria-label":"heart and mug"},"\u2764\ufe0f ",r.a.createElement("i",null,"&")," \u2615")),r.a.createElement("p",{id:"spacer"}," | "),r.a.createElement("p",{id:"copyright"},r.a.createElement("span",{role:"img","aria-label":"copyright"},"\xa9")," ",r.a.createElement("i",null,"Teemu Nurmi 2019 No Rights Reserved")),r.a.createElement("p",{id:"spacer"}," | "),r.a.createElement("a",{href:"https://teemu-portfolio.web.app/",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("i",null,"Portfolio")),r.a.createElement("p",null," | "),r.a.createElement("a",{href:"https://github.com/Larqqa/RESTful-recipes",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("i",null,"L\xe4hdekoodi")))},I=function(){return r.a.createElement("footer",null,r.a.createElement(K,null))},M=Object(s.f)(function(e){var t=e.children,a=e.location.pathname;return Object(n.useEffect)(function(){window.scrollTo(0,0)},[a]),t});var _=function(){var e=Object(n.useState)(),t=Object(o.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(),d=Object(o.a)(c,2),p=d[0],g=d[1],j=Object(n.useState)(),K=Object(o.a)(j,2),_=K[0],F=K[1],x=Object(n.useState)({}),q=Object(o.a)(x,2),T=q[0],B=q[1],P=Object(n.useState)(),D=Object(o.a)(P,2),H=D[0],N=D[1],G=Object(n.useState)(),V=Object(o.a)(G,2),Y=V[0],U=V[1],J=Object(n.useState)(""),W=Object(o.a)(J,2),z=W[0],Q=W[1],X=Object(n.useState)(),Z=Object(o.a)(X,2),$=Z[0],ee=Z[1],te=Object(n.useState)("'Creepster', cursive"),ae=Object(o.a)(te,2),ne=ae[0],re=ae[1],le=Object(n.useState)(),ce=Object(o.a)(le,2),ie=ce[0],oe=ce[1],ue=Object(n.useState)(["rand","kaikki"]),se=Object(o.a)(ue,2),me=se[0],de=se[1],pe=Object(n.useState)({group:[],ingredients:[],steps:[]}),ge=Object(o.a)(pe,2),he=ge[0],Ee=ge[1],ve=["Kaikki","Aamupala","P\xe4\xe4ruoka","V\xe4lipala","Iltapala","J\xe4lkiruoka","Herkku"],fe=["Kana ja linnut","Punainen liha","Kala ja \xe4yri\xe4iset","Maitotuotteet","Maidoton","Kananmuna","Kananmunaton","Kasvis","Marjat ja hedelm\xe4t","Vilja ja riisi","Gluteeniton","Ruis","Superfood"],be=["'Creepster', cursive","'Fascinate', cursive","'Metal Mania', cursive","'Oleo Script Swash Caps', cursive","'Pacifico', cursive","'Patua One', cursive","'Permanent Marker', cursive","'Piedra', cursive","'Trade Winds', cursive"];Object(n.useEffect)(function(){window.addEventListener("load",function(){!function(){var e=document.getElementById("loader");Object(m.a)({targets:e,opacity:0,duration:2e3,begin:function(){return e.style.pointerEvents="none"},complete:function(){e.remove()}})}(),console.log("Page fully loaded")});var e=f.checkLogin();e&&(N(e),h.getAllById(e.id).then(function(e){U(e)}).catch(function(e){var t=e.response;Me(t.data,"error")})),h.getAll().then(function(e){l(e),g(e[Math.floor(Math.random()*e.length)])}).catch(function(e){var t=e.response;Me(t.data,"error")})},[]);var ke=function(e){e.preventDefault(),v.login(e.target.name.value,e.target.pass.value).then(function(e){h.getAllById(e.id).then(function(t){N(e),U(t),f.saveLogin(e),Me("Tervetuloa takaisin ".concat(e.username," \ud83d\udd90"),"success"),oe(),oe("/")})}).catch(function(e){var t=e.response;Me(t.data,"error")})},ye=function(e){e.preventDefault();var t={username:e.target.name.value,password:e.target.pass.value};E.create(t).then(function(e){N(e),f.saveLogin(e),oe(),oe("/"),Me("Tervetuloa ".concat(e.username," \ud83e\udd1d"),"success")}).catch(function(e){var t=e.response;Me(t.data,"alert")})},je=function(e){e.preventDefault();var t={username:e.target.username.value};E.edit(H.username,"",H.loginKEY,t).then(function(e){N(e),f.saveLogin(e),Me("K\xe4ytt\xe4j\xe4nimi vaihdettu ".concat(e.username,"ksi \ud83d\udc4c"),"success")}).catch(function(e){var t=e.response;Me(t.data,"error")})},Oe=function(e){e.preventDefault();var t={password:e.target.newPass.value};E.edit(H.username,e.target.oldPass.value,H.loginKEY,t).then(function(e){N(e),f.saveLogin(e),Me("Salasana vaihdettu \ud83d\udc4c","success")}).catch(function(e){var t=e.response;Me(t.data,"error")})},Ce=function(e){e.preventDefault();var t=window.prompt("Oletko varma, ett\xe4 haluat poistaa k\xe4ytt\xe4j\xe4tilisi? Anna salasana ja paina ok.");t&&E.del(H.username,t,H.loginKEY).then(function(){N(),f.clearLogin(),Me("K\xe4ytt\xe4j\xe4tilisi on poistettu \u2620\ufe0f","alert"),oe(),oe("/")}).catch(function(e){var t=e.response;Me(t.data,"error")})},Ae=function(e){if(e){var t=e.target.getAttribute("name"),a=e.target.value;h.getAll().then(function(e){l(e);var n=e;if("ownRand"===me[0]&&Y.length>0&&H&&"recipesCategory"!==t&&"myRecipesCategory"!==t&&(n=Y),"recipesCategory"===t||"myRecipesCategory"===t){var r=me;r[1]="kaikki"===a?"":a,de(r)}if(n=n.filter(function(e){return me[1]&&"kaikki"!==me[1]?e.category===me[1]?e:null:e}),"recipesCategory"!==t){if("myRecipesCategory"===t)return n=n.filter(function(e){return e.userID===H.id}),void U(n);var c=Math.floor(Math.random()*n.length);re(be[Math.floor(Math.random()*be.length)]),g(n[c])}else l(n)}).catch(function(e){var t=e.response;Me(t.data,"error")})}else H&&h.getAllByGroups(he.group,H.id).then(function(e){U(e)}).catch(function(e){var t=e.response;Me(t.data,"error")}),h.getAllByGroups(he.group).then(function(e){l(e)}).catch(function(e){var t=e.response;Me(t.data,"error")})},we=function(e){e.preventDefault();var t=e.target.value.split(":");h.getOne(t[0]).then(function(e){F(e),ee(t[1]),oe(),oe("/recipe/".concat(e.title.replace(" ","_")))}).catch(function(e){var t=e.response;Me(t.data,"error")})},Le=function(e){e.preventDefault();var t={category:e.target.category.value,group:he.group,title:e.target.title.value,description:e.target.description.value,ingredients:e.target.ingredients.value.split(/\n/),steps:e.target.steps.value.split(/\n/),servings:e.target.servings.value,timeToMake:e.target.timeToMake.value,userID:H.id};e.target.editId.value?(delete t.userID,h.edit(e.target.editId.value,H.id,H.loginKEY,t).then(function(e){F(e),h.getAll().then(function(e){l(e)}),h.getAllById(H.id).then(function(e){U(e)});var t=he;t.group=[],Ee(Object(i.a)({},t)),Me("Resepti\xe4 ".concat(e.title," muokattu \ud83d\udc4c"),"success"),oe(),oe("/recipe/".concat(e.title.replace(" ","_")))}).catch(function(e){var t=e.response;Me(t.data,"error")})):h.create(H.loginKEY,t).then(function(e){console.log(e),F(e),h.getAll().then(function(e){l(e)}),h.getAllById(H.id).then(function(e){U(e)});var t=he;t.group=[],Ee(Object(i.a)({},t)),Me("Resepti ".concat(e.title," lis\xe4tty \ud83d\udc4c"),"success"),ee("myRecipes"),oe(),oe("/recipe/".concat(e.title.replace(" ","_")))}).catch(function(e){var t=e.response;Me(t.data,"error")})},Re=function(e){e.preventDefault(),window.confirm("Oletko varma, ett\xe4 haluat poistaa t\xe4m\xe4n reseptin?")&&h.del(e.target.value,H.id,H.loginKEY).then(function(){h.getAll().then(function(e){l(e)}),h.getAllById(H.id).then(function(e){U(e),Me("Resepti poistettu \ud83d\udc4c","success"),oe(),oe("/myRecipes")})}).catch(function(e){var t=e.response;Me(t.data,"error")})},Se=function(e){var t=he,a=t.group.indexOf(e.target.value);if(a>=0)return t.group.splice(a,1),Ee(Object(i.a)({},t)),void("recipes"===e.target.name&&Ae());t.group.push(e.target.value),Ee(Object(i.a)({},t)),"recipes"===e.target.name&&Ae()},Ke=function(e){e.preventDefault();var t=me;switch(e.target.value){case"ownRand":case"rand":t[0]=e.target.value,de(t);break;default:if("category"===e.target.getAttribute("name")){if("kaikki"===e.target.value){t[1]="",de(t);break}t[1]=e.target.value,de(t)}}Ae(e)},Ie=function(e){var t=document.getElementById("nav"),a=document.getElementById("hamburger");Object(m.a)({targets:t,top:a.clientHeight,duration:600,begin:function(){t.style.top=-t.clientHeight,t.style.opacity=1}});var n=null;a.classList.contains("active")?(t.classList.remove("show"),a.classList.remove("active"),n=Object(m.a)({targets:t,opacity:0,top:-t.clientHeight,duration:600,complete:function(){t.style.opacity=0}})):(t.classList.add("show"),a.classList.add("active"),n&&(n.reset(),n.stop()))},Me=function(e,t){var a=document.getElementById("error"),n=Object(m.a)({targets:a,top:0,duration:600,begin:function(){a.className="",a.classList.add(t),Q(e)},complete:function(){Object(m.a)({targets:a,top:-100,delay:1e3,duration:300})}});n.reset(),n.play()},_e=function(e){var t=he;t.group=[],Ee(t),Ae()};return r.a.createElement(u.a,null,r.a.createElement(M,null,r.a.createElement("div",{id:"error"},r.a.createElement("p",null,z)),r.a.createElement("div",{id:"loader"},r.a.createElement("h1",null,"Ladataan")),!!ie&&r.a.createElement(s.a,{to:ie}),r.a.createElement("div",{id:"bg--overlay"}),r.a.createElement("div",{id:"main"},r.a.createElement("button",{id:"hamburger",onClick:Ie},r.a.createElement("i",{className:"fas fa-utensils"})),r.a.createElement(b,{Link:u.b,user:H,handleLogout:function(e){e.preventDefault(),f.clearLogin(),v.logout(H.id,H.loginKEY).then(function(e){N(""),f.clearLogin(),U(""),oe(),oe("/"),Me("N\xe4hd\xe4\xe4n taas \ud83d\udc4b","success")}).catch(function(e){Me("Jokin meni pieleen \ud83e\udd14","error")})},clearEdit:function(){B({})},hamburgerClick:Ie,clearAddArrays:_e}),r.a.createElement(s.b,{exact:!0,path:"/",render:function(e){return r.a.createElement(S,Object.assign({},e,{font:ne,recipe:p,handleOpen:we,handleChange:Ae,cat:ve,changeFilter:Ke,user:H}))}}),r.a.createElement(s.b,{path:"/login",render:function(e){return r.a.createElement(k,Object.assign({},e,{loginHandler:ke}))}}),r.a.createElement(s.b,{path:"/register",render:function(e){return r.a.createElement(y,Object.assign({},e,{registerHandler:ye}))}}),r.a.createElement(s.b,{path:"/recipe/:id",render:function(e){return r.a.createElement(A,Object.assign({},e,{recipe:_,dest:$,setEditable:B,user:H,delRecipe:Re,setRecipe:F,Link:u.b}))}}),r.a.createElement(s.b,{path:"/recipes",render:function(e){return r.a.createElement(O,Object.assign({},e,{recipes:a,handleOpen:we,cat:ve,handleChange:Ae,group:fe,addArrays:he,handleGroup:Se,clearAddArrays:_e}))}}),r.a.createElement(s.b,{path:"/user",render:function(e){return r.a.createElement(w,Object.assign({},e,{user:H,handleUserNameChange:je,handleUserPassChange:Oe,delUser:Ce}))}}),r.a.createElement(s.b,{path:"/myRecipes",render:function(e){return r.a.createElement(C,Object.assign({},e,{user:H,recipes:Y,handleOpen:we,cat:ve,handleChange:Ae,group:fe,addArrays:he,handleGroup:Se,clearAddArrays:_e}))}}),r.a.createElement(s.b,{path:"/addRecipe/",render:function(e){return r.a.createElement(L,Object.assign({},e,{user:H,createRecipeHandler:Le,cat:ve,group:fe,handleGroup:Se,addArrays:he}))}}),r.a.createElement(s.b,{path:"/editRecipe/:id",render:function(e){return r.a.createElement(R,Object.assign({},e,{user:H,createRecipeHandler:Le,editable:T,setEditable:B,cat:ve,group:fe,addArrays:he,setAddArrays:Ee,handleGroup:Se,Link:u.b}))}})),r.a.createElement(I,null)))};c.a.render(r.a.createElement(_,null),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.402048b3.chunk.js.map