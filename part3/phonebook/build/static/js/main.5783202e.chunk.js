(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{42:function(e,n,t){"use strict";t.r(n);var r=t(17),c=t.n(r),o=t(8),a=t(18),u=t(3),i=t(2),s=t(5),l=t.n(s),d="/api/persons",j=function(){return l.a.get(d).then((function(e){return e.data}))},f=function(e){return l.a.post(d,e).then((function(e){return e.data}))},b=function(e){return l.a.delete("".concat(d,"/").concat(e))},h=function(e,n){return l.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},m=t(0),p=function(e){var n=e.persons,t=e.filter,r=e.handleDelete;return Object(m.jsx)("ul",{children:0===t.length?n.map((function(e){return Object(m.jsxs)("li",{children:[e.name," ",e.number," ",Object(m.jsx)("button",{onClick:function(){return r(e.id)},children:"Delete"})]},e.id)})):n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())})).map((function(e){return Object(m.jsxs)("li",{children:[e.name," ",e.number," ",Object(m.jsx)("button",{onClick:function(){return r(e.id)},children:"Delete"})]},e.id)}))})},O=function(e){var n=e.filter,t=e.handleFilterChange;return Object(m.jsxs)("div",{children:["Filter by: ",Object(m.jsx)("input",{value:n,onChange:t})]})},v=function(e){var n=e.newName,t=e.newPhone,r=e.handleNameChange,c=e.handlePhoneChange,o=e.addPerson;return Object(m.jsxs)("form",{children:[Object(m.jsxs)("div",{children:["New Name: ",Object(m.jsx)("input",{value:n,onChange:r})]}),Object(m.jsxs)("div",{children:["Number: ",Object(m.jsx)("input",{value:t,onChange:c})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",onClick:o,children:"Add"})})]})},x=function(e){var n=e.message,t=e.type;if(null===n)return null;var r={color:"error"===t?"red":"green",background:"lightgrey",fontSize:18,borderStyle:"solid",borderRadius:3,padding:5,marginBottom:5};return Object(m.jsx)("div",{children:Object(m.jsx)("div",{style:r,children:n})})},g=function(){var e=Object(i.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(i.useState)(""),s=Object(u.a)(c,2),l=s[0],d=s[1],g=Object(i.useState)(""),w=Object(u.a)(g,2),C=w[0],y=w[1],N=Object(i.useState)(""),k=Object(u.a)(N,2),S=k[0],P=k[1],D=Object(i.useState)(null),U=Object(u.a)(D,2),T=U[0],A=U[1],E=Object(i.useState)(null),F=Object(u.a)(E,2),B=F[0],J=F[1];Object(i.useEffect)((function(){j().then((function(e){r(e)}))}),[]);var z=function(e){var n=Object(o.a)(Object(o.a)({},t.find((function(n){return n.id===e}))),{},{number:S});h(e,n).then((function(e){A("Number of ".concat(e.name," was updated!")),J("success"),setTimeout((function(){A(null),J(null)}),5e3),r(t.map((function(n){return n.id===e.id?e:n})))})).catch((function(e){var n=e.response||{data:{error:"No error response!"}};A("".concat(n.data.error||"No error details.")),J("error"),setTimeout((function(){A(null),J(null)}),5e3)}))};return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:"Phonebook"}),Object(m.jsx)(x,{message:T,type:B}),Object(m.jsx)(O,{filter:l,handleFilterChange:function(e){d(e.target.value)}}),Object(m.jsx)("h2",{children:"Add New"}),Object(m.jsx)(v,{newName:C,newPhone:S,handlePhoneChange:function(e){P(e.target.value)},handleNameChange:function(e){y(e.target.value)},addPerson:function(e){if(e.preventDefault(),0===t.filter((function(e){return e.name.toUpperCase()===C.toUpperCase()})).length)f({name:C,number:S}).then((function(e){A("New entry ".concat(e.name," was created!")),J("success"),setTimeout((function(){A(null),J(null)}),5e3),r([].concat(Object(a.a)(t),[e]))}));else if(!0===window.confirm("".concat(C," is already on the list! Do you want to update its phone number?"))){var n=t.find((function(e){return e.name.toUpperCase()===C.toUpperCase()})).id;z(n)}}}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(p,{persons:t,filter:l,handleDelete:function(e){var n=t.find((function(n){return n.id===e})).name;!0===window.confirm("Are you sure you want to remove: ".concat(n))&&b(e).then((function(){A("Entry ".concat(n," was removed.")),J("success"),setTimeout((function(){A(null),J(null)}),5e3),r(t.filter((function(n){return n.id!==e})))}))}})]})};c.a.render(Object(m.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.5783202e.chunk.js.map