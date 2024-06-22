(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[65],{44006:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"}}]},name:"login",theme:"outlined"}},42391:function(e,t,n){"use strict";Object.defineProperty(t,"Z",{enumerable:!0,get:function(){return r}});var i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=_getRequireWildcardCache(t);if(n&&n.has(e))return n.get(e);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var r=o?Object.getOwnPropertyDescriptor(e,s):null;r&&(r.get||r.set)?Object.defineProperty(i,s,r):i[s]=e[s]}return i.default=e,n&&n.set(e,i),i}(n(82684)),o=_interop_require_default(n(44006)),s=_interop_require_default(n(32905));function _interop_require_default(e){return e&&e.__esModule?e:{default:e}}function _getRequireWildcardCache(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(_getRequireWildcardCache=function(e){return e?n:t})(e)}var r=i.forwardRef(function(e,t){var n,r;return i.createElement(s.default,(n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){var i;i=n[t],t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i})}return e}({},e),r=r={ref:t,icon:o.default},Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n.push.apply(n,i)}return n})(Object(r)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}),n))})},37265:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/signin",function(){return n(15134)}])},15134:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Auth}});var i=n(28598),o=n(1887),s=n.n(o),r=n(9712),a=n(98440),c=n(64283),l=n(42391),d=n(33612),u=n(60071),g=n.n(u),p=n(12691),f=n.n(p),y=n(34376),v=n(82684),signup_Signin=function(){let[e,t]=(0,v.useState)(!1),n=(0,y.useRouter)(),[o,s]=(0,v.useState)({username:"",password:""}),setCred=(e,t)=>{s({...o,[e]:t})},checkLoggedIn=()=>{let e=a.Z.getCookie("access_token"),t=a.Z.getCookie("username");e&&("admin"==t?n.replace("/admin/ponds"):n.replace("/dashboard"))},handleLogin=async()=>{t(!0),r.gx.login({data:o,isNotify:!0}).then(e=>{if(!e)return t(!1);a.Z.setCookie("access_token",e.data.access_token,9999),e.data.data.username&&a.Z.setCookie("username",e.data.data.username,9999),"admin"==e.data.data.username&&a.Z.setCookie("role","admin",9999),checkLoggedIn()}).finally(()=>{t(!1)})};return(0,v.useEffect)(()=>{checkLoggedIn()},[]),(0,i.jsxs)("div",{className:"h-screen flex flex-col items-center justify-center",children:[(0,i.jsxs)("div",{className:"flex flex-row justify-between w-72",children:[(0,i.jsx)("h2",{className:"text-2xl font-light text-gray-500",children:"Login"}),(0,i.jsxs)(f(),{href:"/auth/signup",className:"flex flex-row gap-2 items-center text-blue-800",children:[(0,i.jsx)("p",{children:"Register"})," ",(0,i.jsx)(l.Z,{})]})]}),(0,i.jsxs)("div",{className:"w-72 px-2 py-6 bg-gray-800 rounded mt-2",children:[(0,i.jsx)(g(),{className:"cursor-pointer m-auto",src:"/images/logo-aquaculture-pens.png",alt:"Logo PENS",width:60,height:300}),(0,i.jsxs)("div",{className:"mt-4",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"username",className:"text-white",children:"Username"}),(0,i.jsx)(d.default,{onChange:e=>setCred("username",e.target.value),id:"username",name:"username"})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"password",className:"text-white",children:"Password"}),(0,i.jsx)(d.default.Password,{onChange:e=>setCred("password",e.target.value),id:"password",name:"password"})]}),(0,i.jsx)("button",{onClick:handleLogin,className:"mt-8 w-full bg-gray-100 text-gray-700 rounded-full py-2",children:e?(0,i.jsx)(c.default,{}):(0,i.jsx)("p",{children:"Login"})})]})]})]})};function Auth(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s(),{children:[(0,i.jsx)("title",{children:"Masuk - PENS Aquaculture Technology"}),(0,i.jsx)("meta",{name:"description",content:"Pascasarjana Politeknik Elektronika Negeri Surabaya"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsx)(signup_Signin,{})]})}},9712:function(e,t,n){"use strict";n.d(t,{gx:function(){return a},SM:function(){return u},C8:function(){return f},ff:function(){return l},jf:function(){return g},Rb:function(){return d},pv:function(){return p},Q:function(){return c},vn:function(){return serviceInstance}});let i="https://be.aquaculturepens.com";var o=n(98440),s=n(18953),r=n(50112);async function login(e){let{data:t}=await serviceInstance(e.isNotify).post("/api/v1/auth/login",e.data);return t}async function register(e){let{data:t}=await serviceInstance(e.isNotify).post("/api/v1/auth/register",e.data);return t}let a={login:login,register:register};async function getAllUserProfiles(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/users/all");return t}async function getMyProfile(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/users");return t}let c={getMyProfile:getMyProfile,getAllUserProfiles:getAllUserProfiles};async function getAllPonds(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/ponds?pondsName="+e.pondsName+"&page="+e.page+"&limit="+e.limit+"&provinceId="+e.provinceId+"&cityId="+e.cityId);return t}async function getAllNoQueryPonds(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/ponds/all-ponds?pondsName="+e.pondsName+"&page="+e.page+"&limit="+e.limit+"&provinceId="+e.provinceId+"&cityId="+e.cityId);return t}async function getPondById(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/ponds/pondsId/"+e.pondsId);return t}async function getAllPondsByCityId(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/ponds/cityId/"+e.cityId);return t}async function createPonds(e){let{data:t}=await serviceInstance(e.isNotify).post("/api/v1/ponds?pondsName",e.data);return t}async function deletePondsById(e){let{data:t}=await serviceInstance(e.isNotify).delete("/api/v1/ponds/pondsId/"+e.pondsId);return t}let l={getAllPonds:getAllPonds,createPonds:createPonds,getAllNoQueryPonds:getAllNoQueryPonds,getAllPondsByCityId:getAllPondsByCityId,deletePondsById:deletePondsById,getPondById:getPondById};async function getAllProvinces(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/provinces?provinceName="+e.provinceName);return t}async function getProvinceById(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/provinces/provinceId/"+e.provinceId);return t}let d={getAllProvinces:getAllProvinces,getProvinceById:getProvinceById};async function getAllCities(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/cities?cityName=");return t}async function getCityById(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/cities/cityId/"+e.cityId);return t}async function getAllCitiesByProvinceId(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/cities/provinceId/"+e.provinceId);return t}let u={getAllCities:getAllCities,getAllCitiesByProvinceId:getAllCitiesByProvinceId,getCityById:getCityById};async function getAllPools(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/pools?poolsName="+e.poolsName);return t}async function createPools(e){let{data:t}=await serviceInstance(e.isNotify).post("/api/v1/pools",e.data);return t}async function getPoolsByPondId(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/pools/pondsId/"+e.pondId);return t}async function getPoolsById(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/pools/poolsId/"+e.poolsId);return t}async function bindPools(e){let{data:t}=await serviceInstance(e.isNotify).put("/api/v1/pools/bind/poolsId/"+e.poolsId,e.data);return t}async function getPoolsByPondIdAdmin(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/pools/pondsIdAdmin/"+e.pondId);return t}let g={getAllPools:getAllPools,getPoolsByPondId:getPoolsByPondId,createPools:createPools,getPoolsById:getPoolsById,getPoolsByPondIdAdmin:getPoolsByPondIdAdmin,bindPools:bindPools};async function getAllSampling(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/sample/poolsId/".concat(e.poolsId,"?from=").concat(e.from,"&to=").concat(e.to,"&limit=").concat(e.limit,"&page=").concat(e.page,"&newestTime=").concat(e.newestTime));return t}async function getTodaySampling(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/sample/poolsId/".concat(e.poolsId,"/today"));return t}let p={getTodaySampling:getTodaySampling,getAllSampling:getAllSampling};async function getAllMonitoring(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/monitor/poolsId/".concat(e.poolsId,"?from=").concat(e.from,"&to=").concat(e.to,"&limit=").concat(e.limit,"&page=").concat(e.page,"&newestTime=").concat(e.newestTime));return t}async function getTodayMonitoring(e){let{data:t}=await serviceInstance(e.isNotify).get("/api/v1/monitor/poolsId/".concat(e.poolsId,"/today"));return t}let f={getTodayMonitoring:getTodayMonitoring,getAllMonitoring:getAllMonitoring};r.Z.create({baseURL:i,timeout:1e4});let serviceInstance=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?"":o.Z.getCookie("access_token"),a=r.Z.create({baseURL:i,timeout:1e4,headers:{Authorization:"Bearer "+n,"Access-Control-Allow-Origin":"*"}});return a.interceptors.response.use(function(t){return e&&s.ZP.success({content:t.data.message}),t},function(t){return e&&s.ZP.error({content:t.response.data.message}),t}),a}},98440:function(e,t){"use strict";t.Z={setCookie:(e,t,n)=>{let i="";if(n){let e=new Date;e.setTime(e.getTime()+864e5*n),i="; expires="+e.toUTCString()}document.cookie=e+"="+(t||"")+i+"; path=/"},getCookie:e=>{let t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){let i=n[e];for(;" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return null},deleteCookie:e=>{document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"}}}},function(e){e.O(0,[109,112,423,164,612,774,888,179],function(){return e(e.s=37265)}),_N_E=e.O()}]);