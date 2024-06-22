(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[849],{81743:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var l in t)Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}(t,{noSSR:function(){return noSSR},default:function(){return dynamic}});let r=l(43709),n=(l(82684),r._(l(36586)));function convertModule(e){return{default:(null==e?void 0:e.default)||e}}function noSSR(e,t){return delete t.webpack,delete t.modules,e(t)}function dynamic(e,t){let l=n.default,r={loading:e=>{let{error:t,isLoading:l,pastDelay:r}=e;return null}};e instanceof Promise?r.loader=()=>e:"function"==typeof e?r.loader=e:"object"==typeof e&&(r={...r,...e}),r={...r,...t};let o=r.loader;return(r.loadableGenerated&&(r={...r,...r.loadableGenerated},delete r.loadableGenerated),"boolean"!=typeof r.ssr||r.ssr)?l({...r,loader:()=>null!=o?o().then(convertModule):Promise.resolve(convertModule(()=>null))}):(delete r.webpack,delete r.modules,noSSR(l,r))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},80805:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return o}});let r=l(43709),n=r._(l(82684)),o=n.default.createContext(null)},36586:function(e,t,l){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let r=l(43709),n=r._(l(82684)),o=l(80805),a=[],i=[],s=!1;function load(e){let t=e(),l={loading:!0,loaded:null,error:null};return l.promise=t.then(e=>(l.loading=!1,l.loaded=e,e)).catch(e=>{throw l.loading=!1,l.error=e,e}),l}let LoadableSubscription=class LoadableSubscription{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}};function Loadable(e){return function(e,t){let l=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),r=null;function init(){if(!r){let t=new LoadableSubscription(e,l);r={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return r.promise()}if(!s){let e=l.webpack?l.webpack():l.modules;e&&i.push(t=>{for(let l of e)if(t.includes(l))return init()})}function LoadableComponent(e,t){!function(){init();let e=n.default.useContext(o.LoadableContext);e&&Array.isArray(l.modules)&&l.modules.forEach(t=>{e(t)})}();let a=n.default.useSyncExternalStore(r.subscribe,r.getCurrentValue,r.getCurrentValue);return n.default.useImperativeHandle(t,()=>({retry:r.retry}),[]),n.default.useMemo(()=>{var t;return a.loading||a.error?n.default.createElement(l.loading,{isLoading:a.loading,pastDelay:a.pastDelay,timedOut:a.timedOut,error:a.error,retry:r.retry}):a.loaded?n.default.createElement((t=a.loaded)&&t.default?t.default:t,e):null},[e,a])}return LoadableComponent.preload=()=>init(),LoadableComponent.displayName="LoadableComponent",n.default.forwardRef(LoadableComponent)}(load,e)}function flushInitializers(e,t){let l=[];for(;e.length;){let r=e.pop();l.push(r(t))}return Promise.all(l).then(()=>{if(e.length)return flushInitializers(e,t)})}Loadable.preloadAll=()=>new Promise((e,t)=>{flushInitializers(a).then(e,t)}),Loadable.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let res=()=>(s=!0,t());flushInitializers(i,e).then(res,res)})),window.__NEXT_PRELOADREADY=Loadable.preloadReady;let u=Loadable},51774:function(e,t,l){e.exports=l(81743)},18312:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/maps",function(){return l(86909)}])},6732:function(e,t,l){"use strict";l.d(t,{Z:function(){return layouts_DashboardLayout}});var r=l(28598),n=l(82684),o=l(60071),a=l.n(o),i=l(12691),s=l.n(i),u=l(34376),Header=()=>{let e=(0,u.useRouter)(),defineStyleNav=t=>{let l=e.asPath;return l.split("/")[2]==t?"bg-blue-400 text-white border-blue-200":""};return(0,n.useEffect)(()=>{},[]),(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsx)("div",{className:"flex flex-row items-center w-full justify-center gap-4 py-2",children:(0,r.jsxs)(s(),{href:"/",className:"flex flex-row items-center gap-4",children:[(0,r.jsx)(a(),{className:"cursor-pointer",src:"/images/logo-aquaculture-pens.png",alt:"Logo PENS",width:40,height:300}),(0,r.jsx)("h1",{className:"font-bold text-xs",children:"PENS Aquaculture Technology"})]})}),(0,r.jsxs)("ul",{className:"w-full flex flex-row items-center justify-evenly text-xs mt-4 gap-4",children:[(0,r.jsx)("li",{className:"flex-1 text-center rounded py-2 border-b-4 border-blue-800 hover:border-blue-400 ".concat(defineStyleNav(void 0)),children:(0,r.jsx)(s(),{href:"/dashboard",children:(0,r.jsx)("p",{children:"Beranda"})})}),(0,r.jsx)("li",{className:"flex-1 text-center rounded py-2 border-b-4 border-blue-800 hover:border-blue-400 ".concat(defineStyleNav("ponds")),children:(0,r.jsx)(s(),{href:"/dashboard/ponds",children:(0,r.jsx)("p",{children:"Tambak"})})}),(0,r.jsx)("li",{className:"flex-1 text-center rounded py-2 border-b-4 border-blue-800 hover:border-blue-400 ".concat(defineStyleNav("profile")),children:(0,r.jsx)(s(),{href:"/dashboard/profile",children:(0,r.jsx)("p",{children:"Akun"})})})]})]})},d=l(98440),c=l(18953),layouts_DashboardLayout=function(e){let{children:t}=e,l=(0,u.useRouter)(),checkLoggedIn=()=>{let e=d.Z.getCookie("access_token"),t=d.Z.getCookie("role"),r=d.Z.getCookie("username");return e?"admin"==r&&t?(c.ZP.info({content:"You only admin access !"}),l.replace("/admin/ponds")):void 0:(c.ZP.info({content:"You have to logged in first!"}),l.replace("/"))};return(0,n.useEffect)(()=>{checkLoggedIn()},[]),(0,r.jsx)("div",{className:"w-full",children:(0,r.jsxs)("div",{className:"m-auto w-11/12 md:w-10/12 lg:8/12 xl:w-6/12",children:[(0,r.jsx)(Header,{}),t]})})}},86909:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return Maps}});var r=l(28598),n=l(1887),o=l.n(n),a=l(6732),i=l(51774),s=l.n(i);let u=s()(()=>Promise.all([l.e(269),l.e(188)]).then(l.bind(l,45188)),{loadableGenerated:{webpack:()=>[45188]},loading:()=>(0,r.jsx)("p",{children:"Loading..."}),ssr:!1});function Maps(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:"Daftar Tambak - PENS Aquaculture Technology"}),(0,r.jsx)("meta",{name:"description",content:"Pascasarjana Politeknik Elektronika Negeri Surabaya"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)(a.Z,{children:(0,r.jsx)(u,{})})]})}},98440:function(e,t){"use strict";t.Z={setCookie:(e,t,l)=>{let r="";if(l){let e=new Date;e.setTime(e.getTime()+864e5*l),r="; expires="+e.toUTCString()}document.cookie=e+"="+(t||"")+r+"; path=/"},getCookie:e=>{let t=e+"=",l=document.cookie.split(";");for(let e=0;e<l.length;e++){let r=l[e];for(;" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},deleteCookie:e=>{document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"}}}},function(e){e.O(0,[109,774,888,179],function(){return e(e.s=18312)}),_N_E=e.O()}]);