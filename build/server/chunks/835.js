"use strict";exports.id=835,exports.ids=[835],exports.modules={9194:(e,t,s)=>{s(997),s(6689)},511:(e,t,s)=>{s(997),s(5675),s(1664),s(6689)},3266:(e,t,s)=>{s.a(e,async(e,l)=>{try{s.d(t,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var a=s(997),r=s(5675),i=s.n(r),x=s(1664),n=s.n(x),c=s(6689),h=s(2179),d=s.n(h),o=s(8e3),f=s.n(o),m=s(1163),u=s(6565),p=e([u]);u=(p.then?(await p)():p)[0];let __WEBPACK_DEFAULT_EXPORT__=function(){(0,m.useRouter)();let[e,t]=(0,c.useState)(),[s,l]=(0,c.useState)(!0),[r,x]=(0,c.useState)(!1),handleScroll=()=>{let e=window.pageYOffset;return e?l(!1):l(!0)};return(0,c.useEffect)(()=>(window.addEventListener("scroll",handleScroll,{passive:!0}),()=>{window.removeEventListener("scroll",handleScroll)}),[]),(0,c.useEffect)(()=>{u.Q.getMyProfile({isNotify:!1}).then(e=>{e&&t(e.data)})},[]),(0,a.jsxs)("nav",{className:`w-full fixed z-50 flex items-center justify-between md:gap-8 duration-700 ${s?"bg-black bg-opacity-40 text-white":"bg-white bg-opacity-100 text-black"} px-2`,children:[a.jsx("div",{className:"px-1 py-2 md:flex-3 lg:flex-2 items-center justify-center md:justify-start flex flex-row",children:a.jsx(n(),{href:"/",children:(0,a.jsxs)("div",{className:"flex flex-row items-center gap-4",children:[a.jsx(i(),{className:"cursor-pointer",src:"/images/logo-aquaculture-pens.png",alt:"Logo PENS",width:40,height:300}),a.jsx("h1",{className:"font-bold text-xs",children:"PENS Aquaculture Technology"})]})})}),(0,a.jsxs)("div",{className:"flex flex-row flex-1 items-center justify-center px-8 hidden md:flex gap-4 md:gap-8",children:[(0,a.jsxs)("div",{className:"flex flex-row gap-2 flex-2 justify-end",children:[a.jsx("a",{href:"#about",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Tentang"})}),a.jsx("a",{href:"#developer",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Pengembang"})}),a.jsx("a",{href:"#contact",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Kontak"})}),a.jsx(n(),{href:"/prediction",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Prediksi"})}),a.jsx("a",{href:"https://drive.google.com/file/d/1cwFcYk5OHVnZrSe801mK4YVA8pEljbET/view?usp=sharing",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center whitespace-nowrap",children:"Buku Panduan"})})]}),e?.username?a.jsx("div",{className:"flex flex-row gap-2 flex-1 justify-end",children:(0,a.jsxs)(n(),{href:"admin"===e.username?"/admin/ponds":"/dashboard",className:"flex-1 flex-row flex",children:[a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:e.username}),a.jsx("span",{className:"material-symbols-outlined",children:"account_circle"})]})}):(0,a.jsxs)("div",{className:"flex flex-row gap-2 flex-1 justify-end",children:[a.jsx(n(),{href:"/auth/signin",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Login"})}),a.jsx(n(),{href:"/auth/signup",className:"flex-1",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:"Register"})})]})]}),a.jsx("div",{className:"flex md:hidden text-2xl relative -top-1",children:a.jsx("button",{onClick:()=>{x(!0)},children:a.jsx(d(),{})})}),a.jsx(f(),{title:"Menu",placement:"right",width:270,open:r,onClose:()=>{x(!1)},className:"md:hidden",children:(0,a.jsxs)("div",{className:"flex flex-col flex-1 items-center justify-center gap-4 md:gap-8 text-black text-right",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-2 flex-2 justify-end w-full",children:[a.jsx("a",{href:"#about",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Tentang"})}),a.jsx("a",{href:"#developer",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Pengembang"})}),a.jsx("a",{href:"#contact",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Kontak"})}),a.jsx(n(),{href:"/prediction",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Prediksi"})}),a.jsx("a",{href:"https://drive.google.com/file/d/1cwFcYk5OHVnZrSe801mK4YVA8pEljbET/view?usp=sharing",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white whitespace-nowrap",children:"Buku Panduan"})})]}),e?.username?a.jsx("div",{className:"flex flex-col gap-2 flex-1 justify-end w-full",children:(0,a.jsxs)(n(),{href:"/dashboard",className:"flex-1 flex-row flex justify-end",children:[a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white text-center",children:e.username}),a.jsx("span",{className:"material-symbols-outlined",children:"account_circle"})]})}):(0,a.jsxs)("div",{className:"flex flex-col gap-2 flex-1 justify-end w-full",children:[a.jsx(n(),{href:"/auth/signin",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Login"})}),a.jsx(n(),{href:"/auth/signup",className:"flex-1 border-b-2",children:a.jsx("div",{className:"font-light text-xs px-2 py-1 hover:bg-blue-600 hover:text-white",children:"Register"})})]})]})})]})};l()}catch(e){l(e)}})},1552:(e,t,s)=>{s.a(e,async(e,l)=>{try{s.d(t,{SI:()=>a.Z});var a=s(3266);s(511),s(9194);var r=e([a]);a=(r.then?(await r)():r)[0],l()}catch(e){l(e)}})},835:(e,t,s)=>{s.a(e,async(e,l)=>{try{s.d(t,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var a=s(997),r=s(1552);s(6689);var i=e([r]);r=(i.then?(await i)():i)[0];let __WEBPACK_DEFAULT_EXPORT__=function({children:e}){return(0,a.jsxs)("div",{children:[a.jsx(r.SI,{}),a.jsx("div",{className:"w-full flex justify-center",children:e})]})};l()}catch(e){l(e)}})}};