(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Dn(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Cp(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function Ud(n){let t,e,i;n.length!==2?(t=Dn,e=(a,l)=>Dn(n(a),l),i=(a,l)=>n(a)-l):(t=n===Dn||n===Cp?n:Rp,e=n,i=n);function r(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const d=c+u>>>1;e(a[d],l)<0?c=d+1:u=d}while(c<u)}return c}function s(a,l,c=0,u=a.length){if(c<u){if(t(l,l)!==0)return u;do{const d=c+u>>>1;e(a[d],l)<=0?c=d+1:u=d}while(c<u)}return c}function o(a,l,c=0,u=a.length){const d=r(a,l,c,u-1);return d>c&&i(a[d-1],l)>-i(a[d],l)?d-1:d}return{left:r,center:o,right:s}}function Rp(){return 0}function Nd(n){return n===null?NaN:+n}function*Pp(n,t){if(t===void 0)for(let e of n)e!=null&&(e=+e)>=e&&(yield e);else{let e=-1;for(let i of n)(i=t(i,++e,n))!=null&&(i=+i)>=i&&(yield i)}}const Lp=Ud(Dn),Dp=Lp.right;Ud(Nd).center;class yn{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let i=0;for(let r=0;r<this._n&&r<32;r++){const s=e[r],o=t+s,a=Math.abs(t)<Math.abs(s)?t-(o-s):s-(o-t);a&&(e[i++]=a),t=o}return e[i]=t,this._n=i+1,this}valueOf(){const t=this._partials;let e=this._n,i,r,s,o=0;if(e>0){for(o=t[--e];e>0&&(i=o,r=t[--e],o=i+r,s=r-(o-i),!s););e>0&&(s<0&&t[e-1]<0||s>0&&t[e-1]>0)&&(r=s*2,i=o+r,r==i-o&&(o=i))}return o}}class du extends Map{constructor(t,e=Np){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),t!=null)for(const[i,r]of t)this.set(i,r)}get(t){return super.get(fu(this,t))}has(t){return super.has(fu(this,t))}set(t,e){return super.set(Ip(this,t),e)}delete(t){return super.delete(Up(this,t))}}function fu({_intern:n,_key:t},e){const i=t(e);return n.has(i)?n.get(i):e}function Ip({_intern:n,_key:t},e){const i=t(e);return n.has(i)?n.get(i):(n.set(i,e),e)}function Up({_intern:n,_key:t},e){const i=t(e);return n.has(i)&&(e=n.get(i),n.delete(i)),e}function Np(n){return n!==null&&typeof n=="object"?n.valueOf():n}function Fp(n=Dn){if(n===Dn)return Fd;if(typeof n!="function")throw new TypeError("compare is not a function");return(t,e)=>{const i=n(t,e);return i||i===0?i:(n(e,e)===0)-(n(t,t)===0)}}function Fd(n,t){return(n==null||!(n>=n))-(t==null||!(t>=t))||(n<t?-1:n>t?1:0)}const Op=Math.sqrt(50),Bp=Math.sqrt(10),zp=Math.sqrt(2);function Do(n,t,e){const i=(t-n)/Math.max(0,e),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),o=s>=Op?10:s>=Bp?5:s>=zp?2:1;let a,l,c;return r<0?(c=Math.pow(10,-r)/o,a=Math.round(n*c),l=Math.round(t*c),a/c<n&&++a,l/c>t&&--l,c=-c):(c=Math.pow(10,r)*o,a=Math.round(n/c),l=Math.round(t/c),a*c<n&&++a,l*c>t&&--l),l<a&&.5<=e&&e<2?Do(n,t,e*2):[a,l,c]}function kp(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const i=t<n,[r,s,o]=i?Do(t,n,e):Do(n,t,e);if(!(s>=r))return[];const a=s-r+1,l=new Array(a);if(i)if(o<0)for(let c=0;c<a;++c)l[c]=(s-c)/-o;else for(let c=0;c<a;++c)l[c]=(s-c)*o;else if(o<0)for(let c=0;c<a;++c)l[c]=(r+c)/-o;else for(let c=0;c<a;++c)l[c]=(r+c)*o;return l}function fl(n,t,e){return t=+t,n=+n,e=+e,Do(n,t,e)[2]}function Hp(n,t,e){t=+t,n=+n,e=+e;const i=t<n,r=i?fl(t,n,e):fl(n,t,e);return(i?-1:1)*(r<0?1/-r:r)}function _i(n,t){let e;if(t===void 0)for(const i of n)i!=null&&(e<i||e===void 0&&i>=i)&&(e=i);else{let i=-1;for(let r of n)(r=t(r,++i,n))!=null&&(e<r||e===void 0&&r>=r)&&(e=r)}return e}function pu(n,t){let e;for(const i of n)i!=null&&(e>i||e===void 0&&i>=i)&&(e=i);return e}function Od(n,t,e=0,i=1/0,r){if(t=Math.floor(t),e=Math.floor(Math.max(0,e)),i=Math.floor(Math.min(n.length-1,i)),!(e<=t&&t<=i))return n;for(r=r===void 0?Fd:Fp(r);i>e;){if(i-e>600){const l=i-e+1,c=t-e+1,u=Math.log(l),d=.5*Math.exp(2*u/3),h=.5*Math.sqrt(u*d*(l-d)/l)*(c-l/2<0?-1:1),f=Math.max(e,Math.floor(t-c*d/l+h)),m=Math.min(i,Math.floor(t+(l-c)*d/l+h));Od(n,t,f,m,r)}const s=n[t];let o=e,a=i;for(Hr(n,e,t),r(n[i],s)>0&&Hr(n,e,i);o<a;){for(Hr(n,o,a),++o,--a;r(n[o],s)<0;)++o;for(;r(n[a],s)>0;)--a}r(n[e],s)===0?Hr(n,e,a):(++a,Hr(n,a,i)),a<=t&&(e=a+1),t<=a&&(i=a-1)}return n}function Hr(n,t,e){const i=n[t];n[t]=n[e],n[e]=i}function Mo(n,t,e){if(n=Float64Array.from(Pp(n,e)),!(!(i=n.length)||isNaN(t=+t))){if(t<=0||i<2)return pu(n);if(t>=1)return _i(n);var i,r=(i-1)*t,s=Math.floor(r),o=_i(Od(n,s).subarray(0,s+1)),a=pu(n.subarray(s+1));return o+(a-o)*(r-s)}}function mu(n,t,e=Nd){if(!(!(i=n.length)||isNaN(t=+t))){if(t<=0||i<2)return+e(n[0],0,n);if(t>=1)return+e(n[i-1],i-1,n);var i,r=(i-1)*t,s=Math.floor(r),o=+e(n[s],s,n),a=+e(n[s+1],s+1,n);return o+(a-o)*(r-s)}}function gu(n,t){let e=0,i=0;for(let r of n)r!=null&&(r=+r)>=r&&(++e,i+=r);if(e)return i/e}function Io(n,t){return Mo(n,.5,t)}function*Gp(n){for(const t of n)yield*t}function Bd(n){return Array.from(Gp(n))}function di(n,t,e){n=+n,t=+t,e=(r=arguments.length)<2?(t=n,n=0,1):r<3?1:+e;for(var i=-1,r=Math.max(0,Math.ceil((t-n)/e))|0,s=new Array(r);++i<r;)s[i]=n+i*e;return s}function Fi(n,t){let e=0;if(t===void 0)for(let i of n)(i=+i)&&(e+=i);else{let i=-1;for(let r of n)(r=+t(r,++i,n))&&(e+=r)}return e}function Vp(n){return n}var va=1,xa=2,pl=3,Zr=4,_u=1e-6;function Wp(n){return"translate("+n+",0)"}function $p(n){return"translate(0,"+n+")"}function Xp(n){return t=>+n(t)}function qp(n,t){return t=Math.max(0,n.bandwidth()-t*2)/2,n.round()&&(t=Math.round(t)),e=>+n(e)+t}function Yp(){return!this.__axis}function zd(n,t){var e=[],i=null,r=null,s=6,o=6,a=3,l=typeof window<"u"&&window.devicePixelRatio>1?0:.5,c=n===va||n===Zr?-1:1,u=n===Zr||n===xa?"x":"y",d=n===va||n===pl?Wp:$p;function h(f){var m=i??(t.ticks?t.ticks.apply(t,e):t.domain()),_=r??(t.tickFormat?t.tickFormat.apply(t,e):Vp),g=Math.max(s,0)+a,p=t.range(),v=+p[0]+l,x=+p[p.length-1]+l,y=(t.bandwidth?qp:Xp)(t.copy(),l),L=f.selection?f.selection():f,A=L.selectAll(".domain").data([null]),R=L.selectAll(".tick").data(m,t).order(),D=R.exit(),b=R.enter().append("g").attr("class","tick"),S=R.select("line"),C=R.select("text");A=A.merge(A.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),R=R.merge(b),S=S.merge(b.append("line").attr("stroke","currentColor").attr(u+"2",c*s)),C=C.merge(b.append("text").attr("fill","currentColor").attr(u,c*g).attr("dy",n===va?"0em":n===pl?"0.71em":"0.32em")),f!==L&&(A=A.transition(f),R=R.transition(f),S=S.transition(f),C=C.transition(f),D=D.transition(f).attr("opacity",_u).attr("transform",function(N){return isFinite(N=y(N))?d(N+l):this.getAttribute("transform")}),b.attr("opacity",_u).attr("transform",function(N){var B=this.parentNode.__axis;return d((B&&isFinite(B=B(N))?B:y(N))+l)})),D.remove(),A.attr("d",n===Zr||n===xa?o?"M"+c*o+","+v+"H"+l+"V"+x+"H"+c*o:"M"+l+","+v+"V"+x:o?"M"+v+","+c*o+"V"+l+"H"+x+"V"+c*o:"M"+v+","+l+"H"+x),R.attr("opacity",1).attr("transform",function(N){return d(y(N)+l)}),S.attr(u+"2",c*s),C.attr(u,c*g).text(_),L.filter(Yp).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",n===xa?"start":n===Zr?"end":"middle"),L.each(function(){this.__axis=y})}return h.scale=function(f){return arguments.length?(t=f,h):t},h.ticks=function(){return e=Array.from(arguments),h},h.tickArguments=function(f){return arguments.length?(e=f==null?[]:Array.from(f),h):e.slice()},h.tickValues=function(f){return arguments.length?(i=f==null?null:Array.from(f),h):i&&i.slice()},h.tickFormat=function(f){return arguments.length?(r=f,h):r},h.tickSize=function(f){return arguments.length?(s=o=+f,h):s},h.tickSizeInner=function(f){return arguments.length?(s=+f,h):s},h.tickSizeOuter=function(f){return arguments.length?(o=+f,h):o},h.tickPadding=function(f){return arguments.length?(a=+f,h):a},h.offset=function(f){return arguments.length?(l=+f,h):l},h}function jp(n){return zd(pl,n)}function Zp(n){return zd(Zr,n)}var Kp={value:()=>{}};function kd(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new So(e)}function So(n){this._=n}function Jp(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",r=e.indexOf(".");if(r>=0&&(i=e.slice(r+1),e=e.slice(0,r)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}So.prototype=kd.prototype={constructor:So,on:function(n,t){var e=this._,i=Jp(n+"",e),r,s=-1,o=i.length;if(arguments.length<2){for(;++s<o;)if((r=(n=i[s]).type)&&(r=Qp(e[r],n.name)))return r;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++s<o;)if(r=(n=i[s]).type)e[r]=vu(e[r],n.name,t);else if(t==null)for(r in e)e[r]=vu(e[r],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new So(n)},call:function(n,t){if((r=arguments.length-2)>0)for(var e=new Array(r),i=0,r,s;i<r;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],i=0,r=s.length;i<r;++i)s[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],r=0,s=i.length;r<s;++r)i[r].value.apply(t,e)}};function Qp(n,t){for(var e=0,i=n.length,r;e<i;++e)if((r=n[e]).name===t)return r.value}function vu(n,t,e){for(var i=0,r=n.length;i<r;++i)if(n[i].name===t){n[i]=Kp,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var ml="http://www.w3.org/1999/xhtml";const xu={svg:"http://www.w3.org/2000/svg",xhtml:ml,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ca(n){var t=n+="",e=t.indexOf(":");return e>=0&&(t=n.slice(0,e))!=="xmlns"&&(n=n.slice(e+1)),xu.hasOwnProperty(t)?{space:xu[t],local:n}:n}function tm(n){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===ml&&t.documentElement.namespaceURI===ml?t.createElement(n):t.createElementNS(e,n)}}function em(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Hd(n){var t=ca(n);return(t.local?em:tm)(t)}function nm(){}function Uc(n){return n==null?nm:function(){return this.querySelector(n)}}function im(n){typeof n!="function"&&(n=Uc(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],o=s.length,a=i[r]=new Array(o),l,c,u=0;u<o;++u)(l=s[u])&&(c=n.call(l,l.__data__,u,s))&&("__data__"in l&&(c.__data__=l.__data__),a[u]=c);return new Qe(i,this._parents)}function rm(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function sm(){return[]}function Gd(n){return n==null?sm:function(){return this.querySelectorAll(n)}}function om(n){return function(){return rm(n.apply(this,arguments))}}function am(n){typeof n=="function"?n=om(n):n=Gd(n);for(var t=this._groups,e=t.length,i=[],r=[],s=0;s<e;++s)for(var o=t[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&(i.push(n.call(l,l.__data__,c,o)),r.push(l));return new Qe(i,r)}function Vd(n){return function(){return this.matches(n)}}function Wd(n){return function(t){return t.matches(n)}}var lm=Array.prototype.find;function cm(n){return function(){return lm.call(this.children,n)}}function um(){return this.firstElementChild}function hm(n){return this.select(n==null?um:cm(typeof n=="function"?n:Wd(n)))}var dm=Array.prototype.filter;function fm(){return Array.from(this.children)}function pm(n){return function(){return dm.call(this.children,n)}}function mm(n){return this.selectAll(n==null?fm:pm(typeof n=="function"?n:Wd(n)))}function gm(n){typeof n!="function"&&(n=Vd(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],o=s.length,a=i[r]=[],l,c=0;c<o;++c)(l=s[c])&&n.call(l,l.__data__,c,s)&&a.push(l);return new Qe(i,this._parents)}function $d(n){return new Array(n.length)}function _m(){return new Qe(this._enter||this._groups.map($d),this._parents)}function Uo(n,t){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=t}Uo.prototype={constructor:Uo,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,t){return this._parent.insertBefore(n,t)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function vm(n){return function(){return n}}function xm(n,t,e,i,r,s){for(var o=0,a,l=t.length,c=s.length;o<c;++o)(a=t[o])?(a.__data__=s[o],i[o]=a):e[o]=new Uo(n,s[o]);for(;o<l;++o)(a=t[o])&&(r[o]=a)}function ym(n,t,e,i,r,s,o){var a,l,c=new Map,u=t.length,d=s.length,h=new Array(u),f;for(a=0;a<u;++a)(l=t[a])&&(h[a]=f=o.call(l,l.__data__,a,t)+"",c.has(f)?r[a]=l:c.set(f,l));for(a=0;a<d;++a)f=o.call(n,s[a],a,s)+"",(l=c.get(f))?(i[a]=l,l.__data__=s[a],c.delete(f)):e[a]=new Uo(n,s[a]);for(a=0;a<u;++a)(l=t[a])&&c.get(h[a])===l&&(r[a]=l)}function Mm(n){return n.__data__}function Sm(n,t){if(!arguments.length)return Array.from(this,Mm);var e=t?ym:xm,i=this._parents,r=this._groups;typeof n!="function"&&(n=vm(n));for(var s=r.length,o=new Array(s),a=new Array(s),l=new Array(s),c=0;c<s;++c){var u=i[c],d=r[c],h=d.length,f=Em(n.call(u,u&&u.__data__,c,i)),m=f.length,_=a[c]=new Array(m),g=o[c]=new Array(m),p=l[c]=new Array(h);e(u,d,_,g,p,f,t);for(var v=0,x=0,y,L;v<m;++v)if(y=_[v]){for(v>=x&&(x=v+1);!(L=g[x])&&++x<m;);y._next=L||null}}return o=new Qe(o,i),o._enter=a,o._exit=l,o}function Em(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function wm(){return new Qe(this._exit||this._groups.map($d),this._parents)}function bm(n,t,e){var i=this.enter(),r=this,s=this.exit();return typeof n=="function"?(i=n(i),i&&(i=i.selection())):i=i.append(n+""),t!=null&&(r=t(r),r&&(r=r.selection())),e==null?s.remove():e(s),i&&r?i.merge(r).order():r}function Tm(n){for(var t=n.selection?n.selection():n,e=this._groups,i=t._groups,r=e.length,s=i.length,o=Math.min(r,s),a=new Array(r),l=0;l<o;++l)for(var c=e[l],u=i[l],d=c.length,h=a[l]=new Array(d),f,m=0;m<d;++m)(f=c[m]||u[m])&&(h[m]=f);for(;l<r;++l)a[l]=e[l];return new Qe(a,this._parents)}function Am(){for(var n=this._groups,t=-1,e=n.length;++t<e;)for(var i=n[t],r=i.length-1,s=i[r],o;--r>=0;)(o=i[r])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function Cm(n){n||(n=Rm);function t(d,h){return d&&h?n(d.__data__,h.__data__):!d-!h}for(var e=this._groups,i=e.length,r=new Array(i),s=0;s<i;++s){for(var o=e[s],a=o.length,l=r[s]=new Array(a),c,u=0;u<a;++u)(c=o[u])&&(l[u]=c);l.sort(t)}return new Qe(r,this._parents).order()}function Rm(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}function Pm(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function Lm(){return Array.from(this)}function Dm(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length;r<s;++r){var o=i[r];if(o)return o}return null}function Im(){let n=0;for(const t of this)++n;return n}function Um(){return!this.node()}function Nm(n){for(var t=this._groups,e=0,i=t.length;e<i;++e)for(var r=t[e],s=0,o=r.length,a;s<o;++s)(a=r[s])&&n.call(a,a.__data__,s,r);return this}function Fm(n){return function(){this.removeAttribute(n)}}function Om(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Bm(n,t){return function(){this.setAttribute(n,t)}}function zm(n,t){return function(){this.setAttributeNS(n.space,n.local,t)}}function km(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(n):this.setAttribute(n,e)}}function Hm(n,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}}function Gm(n,t){var e=ca(n);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((t==null?e.local?Om:Fm:typeof t=="function"?e.local?Hm:km:e.local?zm:Bm)(e,t))}function Xd(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function Vm(n){return function(){this.style.removeProperty(n)}}function Wm(n,t,e){return function(){this.style.setProperty(n,t,e)}}function $m(n,t,e){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(n):this.style.setProperty(n,i,e)}}function Xm(n,t,e){return arguments.length>1?this.each((t==null?Vm:typeof t=="function"?$m:Wm)(n,t,e??"")):wr(this.node(),n)}function wr(n,t){return n.style.getPropertyValue(t)||Xd(n).getComputedStyle(n,null).getPropertyValue(t)}function qm(n){return function(){delete this[n]}}function Ym(n,t){return function(){this[n]=t}}function jm(n,t){return function(){var e=t.apply(this,arguments);e==null?delete this[n]:this[n]=e}}function Zm(n,t){return arguments.length>1?this.each((t==null?qm:typeof t=="function"?jm:Ym)(n,t)):this.node()[n]}function qd(n){return n.trim().split(/^|\s+/)}function Nc(n){return n.classList||new Yd(n)}function Yd(n){this._node=n,this._names=qd(n.getAttribute("class")||"")}Yd.prototype={add:function(n){var t=this._names.indexOf(n);t<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var t=this._names.indexOf(n);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function jd(n,t){for(var e=Nc(n),i=-1,r=t.length;++i<r;)e.add(t[i])}function Zd(n,t){for(var e=Nc(n),i=-1,r=t.length;++i<r;)e.remove(t[i])}function Km(n){return function(){jd(this,n)}}function Jm(n){return function(){Zd(this,n)}}function Qm(n,t){return function(){(t.apply(this,arguments)?jd:Zd)(this,n)}}function tg(n,t){var e=qd(n+"");if(arguments.length<2){for(var i=Nc(this.node()),r=-1,s=e.length;++r<s;)if(!i.contains(e[r]))return!1;return!0}return this.each((typeof t=="function"?Qm:t?Km:Jm)(e,t))}function eg(){this.textContent=""}function ng(n){return function(){this.textContent=n}}function ig(n){return function(){var t=n.apply(this,arguments);this.textContent=t??""}}function rg(n){return arguments.length?this.each(n==null?eg:(typeof n=="function"?ig:ng)(n)):this.node().textContent}function sg(){this.innerHTML=""}function og(n){return function(){this.innerHTML=n}}function ag(n){return function(){var t=n.apply(this,arguments);this.innerHTML=t??""}}function lg(n){return arguments.length?this.each(n==null?sg:(typeof n=="function"?ag:og)(n)):this.node().innerHTML}function cg(){this.nextSibling&&this.parentNode.appendChild(this)}function ug(){return this.each(cg)}function hg(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function dg(){return this.each(hg)}function fg(n){var t=typeof n=="function"?n:Hd(n);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function pg(){return null}function mg(n,t){var e=typeof n=="function"?n:Hd(n),i=t==null?pg:typeof t=="function"?t:Uc(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)})}function gg(){var n=this.parentNode;n&&n.removeChild(this)}function _g(){return this.each(gg)}function vg(){var n=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function xg(){var n=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(n,this.nextSibling):n}function yg(n){return this.select(n?xg:vg)}function Mg(n){return arguments.length?this.property("__data__",n):this.node().__data__}function Sg(n){return function(t){n.call(this,t,this.__data__)}}function Eg(n){return n.trim().split(/^|\s+/).map(function(t){var e="",i=t.indexOf(".");return i>=0&&(e=t.slice(i+1),t=t.slice(0,i)),{type:t,name:e}})}function wg(n){return function(){var t=this.__on;if(t){for(var e=0,i=-1,r=t.length,s;e<r;++e)s=t[e],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):t[++i]=s;++i?t.length=i:delete this.__on}}}function bg(n,t,e){return function(){var i=this.__on,r,s=Sg(t);if(i){for(var o=0,a=i.length;o<a;++o)if((r=i[o]).type===n.type&&r.name===n.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=e),r.value=t;return}}this.addEventListener(n.type,s,e),r={type:n.type,name:n.name,value:t,listener:s,options:e},i?i.push(r):this.__on=[r]}}function Tg(n,t,e){var i=Eg(n+""),r,s=i.length,o;if(arguments.length<2){var a=this.node().__on;if(a){for(var l=0,c=a.length,u;l<c;++l)for(r=0,u=a[l];r<s;++r)if((o=i[r]).type===u.type&&o.name===u.name)return u.value}return}for(a=t?bg:wg,r=0;r<s;++r)this.each(a(i[r],t,e));return this}function Kd(n,t,e){var i=Xd(n),r=i.CustomEvent;typeof r=="function"?r=new r(t,e):(r=i.document.createEvent("Event"),e?(r.initEvent(t,e.bubbles,e.cancelable),r.detail=e.detail):r.initEvent(t,!1,!1)),n.dispatchEvent(r)}function Ag(n,t){return function(){return Kd(this,n,t)}}function Cg(n,t){return function(){return Kd(this,n,t.apply(this,arguments))}}function Rg(n,t){return this.each((typeof t=="function"?Cg:Ag)(n,t))}function*Pg(){for(var n=this._groups,t=0,e=n.length;t<e;++t)for(var i=n[t],r=0,s=i.length,o;r<s;++r)(o=i[r])&&(yield o)}var Jd=[null];function Qe(n,t){this._groups=n,this._parents=t}function bs(){return new Qe([[document.documentElement]],Jd)}function Lg(){return this}Qe.prototype=bs.prototype={constructor:Qe,select:im,selectAll:am,selectChild:hm,selectChildren:mm,filter:gm,data:Sm,enter:_m,exit:wm,join:bm,merge:Tm,selection:Lg,order:Am,sort:Cm,call:Pm,nodes:Lm,node:Dm,size:Im,empty:Um,each:Nm,attr:Gm,style:Xm,property:Zm,classed:tg,text:rg,html:lg,raise:ug,lower:dg,append:fg,insert:mg,remove:_g,clone:yg,datum:Mg,on:Tg,dispatch:Rg,[Symbol.iterator]:Pg};function Dg(n){return typeof n=="string"?new Qe([[document.querySelector(n)]],[document.documentElement]):new Qe([[n]],Jd)}function Fc(n,t,e){n.prototype=t.prototype=e,e.constructor=n}function Qd(n,t){var e=Object.create(n.prototype);for(var i in t)e[i]=t[i];return e}function Ts(){}var gs=.7,No=1/gs,yr="\\s*([+-]?\\d+)\\s*",_s="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Fn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ig=/^#([0-9a-f]{3,8})$/,Ug=new RegExp(`^rgb\\(${yr},${yr},${yr}\\)$`),Ng=new RegExp(`^rgb\\(${Fn},${Fn},${Fn}\\)$`),Fg=new RegExp(`^rgba\\(${yr},${yr},${yr},${_s}\\)$`),Og=new RegExp(`^rgba\\(${Fn},${Fn},${Fn},${_s}\\)$`),Bg=new RegExp(`^hsl\\(${_s},${Fn},${Fn}\\)$`),zg=new RegExp(`^hsla\\(${_s},${Fn},${Fn},${_s}\\)$`),yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Fc(Ts,Vi,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Mu,formatHex:Mu,formatHex8:kg,formatHsl:Hg,formatRgb:Su,toString:Su});function Mu(){return this.rgb().formatHex()}function kg(){return this.rgb().formatHex8()}function Hg(){return tf(this).formatHsl()}function Su(){return this.rgb().formatRgb()}function Vi(n){var t,e;return n=(n+"").trim().toLowerCase(),(t=Ig.exec(n))?(e=t[1].length,t=parseInt(t[1],16),e===6?Eu(t):e===3?new $e(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Is(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Is(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=Ug.exec(n))?new $e(t[1],t[2],t[3],1):(t=Ng.exec(n))?new $e(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=Fg.exec(n))?Is(t[1],t[2],t[3],t[4]):(t=Og.exec(n))?Is(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Bg.exec(n))?Tu(t[1],t[2]/100,t[3]/100,1):(t=zg.exec(n))?Tu(t[1],t[2]/100,t[3]/100,t[4]):yu.hasOwnProperty(n)?Eu(yu[n]):n==="transparent"?new $e(NaN,NaN,NaN,0):null}function Eu(n){return new $e(n>>16&255,n>>8&255,n&255,1)}function Is(n,t,e,i){return i<=0&&(n=t=e=NaN),new $e(n,t,e,i)}function Gg(n){return n instanceof Ts||(n=Vi(n)),n?(n=n.rgb(),new $e(n.r,n.g,n.b,n.opacity)):new $e}function gl(n,t,e,i){return arguments.length===1?Gg(n):new $e(n,t,e,i??1)}function $e(n,t,e,i){this.r=+n,this.g=+t,this.b=+e,this.opacity=+i}Fc($e,gl,Qd(Ts,{brighter(n){return n=n==null?No:Math.pow(No,n),new $e(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?gs:Math.pow(gs,n),new $e(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new $e(Hi(this.r),Hi(this.g),Hi(this.b),Fo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:wu,formatHex:wu,formatHex8:Vg,formatRgb:bu,toString:bu}));function wu(){return`#${Oi(this.r)}${Oi(this.g)}${Oi(this.b)}`}function Vg(){return`#${Oi(this.r)}${Oi(this.g)}${Oi(this.b)}${Oi((isNaN(this.opacity)?1:this.opacity)*255)}`}function bu(){const n=Fo(this.opacity);return`${n===1?"rgb(":"rgba("}${Hi(this.r)}, ${Hi(this.g)}, ${Hi(this.b)}${n===1?")":`, ${n})`}`}function Fo(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function Hi(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Oi(n){return n=Hi(n),(n<16?"0":"")+n.toString(16)}function Tu(n,t,e,i){return i<=0?n=t=e=NaN:e<=0||e>=1?n=t=NaN:t<=0&&(n=NaN),new gn(n,t,e,i)}function tf(n){if(n instanceof gn)return new gn(n.h,n.s,n.l,n.opacity);if(n instanceof Ts||(n=Vi(n)),!n)return new gn;if(n instanceof gn)return n;n=n.rgb();var t=n.r/255,e=n.g/255,i=n.b/255,r=Math.min(t,e,i),s=Math.max(t,e,i),o=NaN,a=s-r,l=(s+r)/2;return a?(t===s?o=(e-i)/a+(e<i)*6:e===s?o=(i-t)/a+2:o=(t-e)/a+4,a/=l<.5?s+r:2-s-r,o*=60):a=l>0&&l<1?0:o,new gn(o,a,l,n.opacity)}function Wg(n,t,e,i){return arguments.length===1?tf(n):new gn(n,t,e,i??1)}function gn(n,t,e,i){this.h=+n,this.s=+t,this.l=+e,this.opacity=+i}Fc(gn,Wg,Qd(Ts,{brighter(n){return n=n==null?No:Math.pow(No,n),new gn(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?gs:Math.pow(gs,n),new gn(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,t=isNaN(n)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*t,r=2*e-i;return new $e(ya(n>=240?n-240:n+120,r,i),ya(n,r,i),ya(n<120?n+240:n-120,r,i),this.opacity)},clamp(){return new gn(Au(this.h),Us(this.s),Us(this.l),Fo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Fo(this.opacity);return`${n===1?"hsl(":"hsla("}${Au(this.h)}, ${Us(this.s)*100}%, ${Us(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Au(n){return n=(n||0)%360,n<0?n+360:n}function Us(n){return Math.max(0,Math.min(1,n||0))}function ya(n,t,e){return(n<60?t+(e-t)*n/60:n<180?e:n<240?t+(e-t)*(240-n)/60:t)*255}const Oc=n=>()=>n;function $g(n,t){return function(e){return n+e*t}}function Xg(n,t,e){return n=Math.pow(n,e),t=Math.pow(t,e)-n,e=1/e,function(i){return Math.pow(n+i*t,e)}}function qg(n){return(n=+n)==1?ef:function(t,e){return e-t?Xg(t,e,n):Oc(isNaN(t)?e:t)}}function ef(n,t){var e=t-n;return e?$g(n,e):Oc(isNaN(n)?t:n)}const Oo=function n(t){var e=qg(t);function i(r,s){var o=e((r=gl(r)).r,(s=gl(s)).r),a=e(r.g,s.g),l=e(r.b,s.b),c=ef(r.opacity,s.opacity);return function(u){return r.r=o(u),r.g=a(u),r.b=l(u),r.opacity=c(u),r+""}}return i.gamma=n,i}(1);function Yg(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,i=t.slice(),r;return function(s){for(r=0;r<e;++r)i[r]=n[r]*(1-s)+t[r]*s;return i}}function jg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Zg(n,t){var e=t?t.length:0,i=n?Math.min(e,n.length):0,r=new Array(i),s=new Array(e),o;for(o=0;o<i;++o)r[o]=Bc(n[o],t[o]);for(;o<e;++o)s[o]=t[o];return function(a){for(o=0;o<i;++o)s[o]=r[o](a);return s}}function Kg(n,t){var e=new Date;return n=+n,t=+t,function(i){return e.setTime(n*(1-i)+t*i),e}}function pn(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function Jg(n,t){var e={},i={},r;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in n?e[r]=Bc(n[r],t[r]):i[r]=t[r];return function(s){for(r in e)i[r]=e[r](s);return i}}var _l=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ma=new RegExp(_l.source,"g");function Qg(n){return function(){return n}}function t_(n){return function(t){return n(t)+""}}function nf(n,t){var e=_l.lastIndex=Ma.lastIndex=0,i,r,s,o=-1,a=[],l=[];for(n=n+"",t=t+"";(i=_l.exec(n))&&(r=Ma.exec(t));)(s=r.index)>e&&(s=t.slice(e,s),a[o]?a[o]+=s:a[++o]=s),(i=i[0])===(r=r[0])?a[o]?a[o]+=r:a[++o]=r:(a[++o]=null,l.push({i:o,x:pn(i,r)})),e=Ma.lastIndex;return e<t.length&&(s=t.slice(e),a[o]?a[o]+=s:a[++o]=s),a.length<2?l[0]?t_(l[0].x):Qg(t):(t=l.length,function(c){for(var u=0,d;u<t;++u)a[(d=l[u]).i]=d.x(c);return a.join("")})}function Bc(n,t){var e=typeof t,i;return t==null||e==="boolean"?Oc(t):(e==="number"?pn:e==="string"?(i=Vi(t))?(t=i,Oo):nf:t instanceof Vi?Oo:t instanceof Date?Kg:jg(t)?Yg:Array.isArray(t)?Zg:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Jg:pn)(n,t)}function e_(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}var Cu=180/Math.PI,vl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function rf(n,t,e,i,r,s){var o,a,l;return(o=Math.sqrt(n*n+t*t))&&(n/=o,t/=o),(l=n*e+t*i)&&(e-=n*l,i-=t*l),(a=Math.sqrt(e*e+i*i))&&(e/=a,i/=a,l/=a),n*i<t*e&&(n=-n,t=-t,l=-l,o=-o),{translateX:r,translateY:s,rotate:Math.atan2(t,n)*Cu,skewX:Math.atan(l)*Cu,scaleX:o,scaleY:a}}var Ns;function n_(n){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?vl:rf(t.a,t.b,t.c,t.d,t.e,t.f)}function i_(n){return n==null||(Ns||(Ns=document.createElementNS("http://www.w3.org/2000/svg","g")),Ns.setAttribute("transform",n),!(n=Ns.transform.baseVal.consolidate()))?vl:(n=n.matrix,rf(n.a,n.b,n.c,n.d,n.e,n.f))}function sf(n,t,e,i){function r(c){return c.length?c.pop()+" ":""}function s(c,u,d,h,f,m){if(c!==d||u!==h){var _=f.push("translate(",null,t,null,e);m.push({i:_-4,x:pn(c,d)},{i:_-2,x:pn(u,h)})}else(d||h)&&f.push("translate("+d+t+h+e)}function o(c,u,d,h){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),h.push({i:d.push(r(d)+"rotate(",null,i)-2,x:pn(c,u)})):u&&d.push(r(d)+"rotate("+u+i)}function a(c,u,d,h){c!==u?h.push({i:d.push(r(d)+"skewX(",null,i)-2,x:pn(c,u)}):u&&d.push(r(d)+"skewX("+u+i)}function l(c,u,d,h,f,m){if(c!==d||u!==h){var _=f.push(r(f)+"scale(",null,",",null,")");m.push({i:_-4,x:pn(c,d)},{i:_-2,x:pn(u,h)})}else(d!==1||h!==1)&&f.push(r(f)+"scale("+d+","+h+")")}return function(c,u){var d=[],h=[];return c=n(c),u=n(u),s(c.translateX,c.translateY,u.translateX,u.translateY,d,h),o(c.rotate,u.rotate,d,h),a(c.skewX,u.skewX,d,h),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,d,h),c=u=null,function(f){for(var m=-1,_=h.length,g;++m<_;)d[(g=h[m]).i]=g.x(f);return d.join("")}}}var r_=sf(n_,"px, ","px)","deg)"),s_=sf(i_,", ",")",")"),br=0,Kr=0,Gr=0,of=1e3,Bo,Jr,zo=0,Wi=0,ua=0,vs=typeof performance=="object"&&performance.now?performance:Date,af=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function zc(){return Wi||(af(o_),Wi=vs.now()+ua)}function o_(){Wi=0}function ko(){this._call=this._time=this._next=null}ko.prototype=Ho.prototype={constructor:ko,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?zc():+e)+(t==null?0:+t),!this._next&&Jr!==this&&(Jr?Jr._next=this:Bo=this,Jr=this),this._call=n,this._time=e,xl()},stop:function(){this._call&&(this._call=null,this._time=1/0,xl())}};function Ho(n,t,e){var i=new ko;return i.restart(n,t,e),i}function a_(){zc(),++br;for(var n=Bo,t;n;)(t=Wi-n._time)>=0&&n._call.call(void 0,t),n=n._next;--br}function Ru(){Wi=(zo=vs.now())+ua,br=Kr=0;try{a_()}finally{br=0,c_(),Wi=0}}function l_(){var n=vs.now(),t=n-zo;t>of&&(ua-=t,zo=n)}function c_(){for(var n,t=Bo,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:Bo=e);Jr=n,xl(i)}function xl(n){if(!br){Kr&&(Kr=clearTimeout(Kr));var t=n-Wi;t>24?(n<1/0&&(Kr=setTimeout(Ru,n-vs.now()-ua)),Gr&&(Gr=clearInterval(Gr))):(Gr||(zo=vs.now(),Gr=setInterval(l_,of)),br=1,af(Ru))}}function Pu(n,t,e){var i=new ko;return t=t==null?0:+t,i.restart(r=>{i.stop(),n(r+t)},t,e),i}var u_=kd("start","end","cancel","interrupt"),h_=[],lf=0,Lu=1,yl=2,Eo=3,Du=4,Ml=5,wo=6;function ha(n,t,e,i,r,s){var o=n.__transition;if(!o)n.__transition={};else if(e in o)return;d_(n,e,{name:t,index:i,group:r,on:u_,tween:h_,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:lf})}function kc(n,t){var e=Sn(n,t);if(e.state>lf)throw new Error("too late; already scheduled");return e}function On(n,t){var e=Sn(n,t);if(e.state>Eo)throw new Error("too late; already running");return e}function Sn(n,t){var e=n.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function d_(n,t,e){var i=n.__transition,r;i[t]=e,e.timer=Ho(s,0,e.time);function s(c){e.state=Lu,e.timer.restart(o,e.delay,e.time),e.delay<=c&&o(c-e.delay)}function o(c){var u,d,h,f;if(e.state!==Lu)return l();for(u in i)if(f=i[u],f.name===e.name){if(f.state===Eo)return Pu(o);f.state===Du?(f.state=wo,f.timer.stop(),f.on.call("interrupt",n,n.__data__,f.index,f.group),delete i[u]):+u<t&&(f.state=wo,f.timer.stop(),f.on.call("cancel",n,n.__data__,f.index,f.group),delete i[u])}if(Pu(function(){e.state===Eo&&(e.state=Du,e.timer.restart(a,e.delay,e.time),a(c))}),e.state=yl,e.on.call("start",n,n.__data__,e.index,e.group),e.state===yl){for(e.state=Eo,r=new Array(h=e.tween.length),u=0,d=-1;u<h;++u)(f=e.tween[u].value.call(n,n.__data__,e.index,e.group))&&(r[++d]=f);r.length=d+1}}function a(c){for(var u=c<e.duration?e.ease.call(null,c/e.duration):(e.timer.restart(l),e.state=Ml,1),d=-1,h=r.length;++d<h;)r[d].call(n,u);e.state===Ml&&(e.on.call("end",n,n.__data__,e.index,e.group),l())}function l(){e.state=wo,e.timer.stop(),delete i[t];for(var c in i)return;delete n.__transition}}function f_(n,t){var e=n.__transition,i,r,s=!0,o;if(e){t=t==null?null:t+"";for(o in e){if((i=e[o]).name!==t){s=!1;continue}r=i.state>yl&&i.state<Ml,i.state=wo,i.timer.stop(),i.on.call(r?"interrupt":"cancel",n,n.__data__,i.index,i.group),delete e[o]}s&&delete n.__transition}}function p_(n){return this.each(function(){f_(this,n)})}function m_(n,t){var e,i;return function(){var r=On(this,n),s=r.tween;if(s!==e){i=e=s;for(var o=0,a=i.length;o<a;++o)if(i[o].name===t){i=i.slice(),i.splice(o,1);break}}r.tween=i}}function g_(n,t,e){var i,r;if(typeof e!="function")throw new Error;return function(){var s=On(this,n),o=s.tween;if(o!==i){r=(i=o).slice();for(var a={name:t,value:e},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=a;break}l===c&&r.push(a)}s.tween=r}}function __(n,t){var e=this._id;if(n+="",arguments.length<2){for(var i=Sn(this.node(),e).tween,r=0,s=i.length,o;r<s;++r)if((o=i[r]).name===n)return o.value;return null}return this.each((t==null?m_:g_)(e,n,t))}function Hc(n,t,e){var i=n._id;return n.each(function(){var r=On(this,i);(r.value||(r.value={}))[t]=e.apply(this,arguments)}),function(r){return Sn(r,i).value[t]}}function cf(n,t){var e;return(typeof t=="number"?pn:t instanceof Vi?Oo:(e=Vi(t))?(t=e,Oo):nf)(n,t)}function v_(n){return function(){this.removeAttribute(n)}}function x_(n){return function(){this.removeAttributeNS(n.space,n.local)}}function y_(n,t,e){var i,r=e+"",s;return function(){var o=this.getAttribute(n);return o===r?null:o===i?s:s=t(i=o,e)}}function M_(n,t,e){var i,r=e+"",s;return function(){var o=this.getAttributeNS(n.space,n.local);return o===r?null:o===i?s:s=t(i=o,e)}}function S_(n,t,e){var i,r,s;return function(){var o,a=e(this),l;return a==null?void this.removeAttribute(n):(o=this.getAttribute(n),l=a+"",o===l?null:o===i&&l===r?s:(r=l,s=t(i=o,a)))}}function E_(n,t,e){var i,r,s;return function(){var o,a=e(this),l;return a==null?void this.removeAttributeNS(n.space,n.local):(o=this.getAttributeNS(n.space,n.local),l=a+"",o===l?null:o===i&&l===r?s:(r=l,s=t(i=o,a)))}}function w_(n,t){var e=ca(n),i=e==="transform"?s_:cf;return this.attrTween(n,typeof t=="function"?(e.local?E_:S_)(e,i,Hc(this,"attr."+n,t)):t==null?(e.local?x_:v_)(e):(e.local?M_:y_)(e,i,t))}function b_(n,t){return function(e){this.setAttribute(n,t.call(this,e))}}function T_(n,t){return function(e){this.setAttributeNS(n.space,n.local,t.call(this,e))}}function A_(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&T_(n,s)),e}return r._value=t,r}function C_(n,t){var e,i;function r(){var s=t.apply(this,arguments);return s!==i&&(e=(i=s)&&b_(n,s)),e}return r._value=t,r}function R_(n,t){var e="attr."+n;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var i=ca(n);return this.tween(e,(i.local?A_:C_)(i,t))}function P_(n,t){return function(){kc(this,n).delay=+t.apply(this,arguments)}}function L_(n,t){return t=+t,function(){kc(this,n).delay=t}}function D_(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?P_:L_)(t,n)):Sn(this.node(),t).delay}function I_(n,t){return function(){On(this,n).duration=+t.apply(this,arguments)}}function U_(n,t){return t=+t,function(){On(this,n).duration=t}}function N_(n){var t=this._id;return arguments.length?this.each((typeof n=="function"?I_:U_)(t,n)):Sn(this.node(),t).duration}function F_(n,t){if(typeof t!="function")throw new Error;return function(){On(this,n).ease=t}}function O_(n){var t=this._id;return arguments.length?this.each(F_(t,n)):Sn(this.node(),t).ease}function B_(n,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;On(this,n).ease=e}}function z_(n){if(typeof n!="function")throw new Error;return this.each(B_(this._id,n))}function k_(n){typeof n!="function"&&(n=Vd(n));for(var t=this._groups,e=t.length,i=new Array(e),r=0;r<e;++r)for(var s=t[r],o=s.length,a=i[r]=[],l,c=0;c<o;++c)(l=s[c])&&n.call(l,l.__data__,c,s)&&a.push(l);return new Qn(i,this._parents,this._name,this._id)}function H_(n){if(n._id!==this._id)throw new Error;for(var t=this._groups,e=n._groups,i=t.length,r=e.length,s=Math.min(i,r),o=new Array(i),a=0;a<s;++a)for(var l=t[a],c=e[a],u=l.length,d=o[a]=new Array(u),h,f=0;f<u;++f)(h=l[f]||c[f])&&(d[f]=h);for(;a<i;++a)o[a]=t[a];return new Qn(o,this._parents,this._name,this._id)}function G_(n){return(n+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function V_(n,t,e){var i,r,s=G_(t)?kc:On;return function(){var o=s(this,n),a=o.on;a!==i&&(r=(i=a).copy()).on(t,e),o.on=r}}function W_(n,t){var e=this._id;return arguments.length<2?Sn(this.node(),e).on.on(n):this.each(V_(e,n,t))}function $_(n){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==n)return;t&&t.removeChild(this)}}function X_(){return this.on("end.remove",$_(this._id))}function q_(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Uc(n));for(var i=this._groups,r=i.length,s=new Array(r),o=0;o<r;++o)for(var a=i[o],l=a.length,c=s[o]=new Array(l),u,d,h=0;h<l;++h)(u=a[h])&&(d=n.call(u,u.__data__,h,a))&&("__data__"in u&&(d.__data__=u.__data__),c[h]=d,ha(c[h],t,e,h,c,Sn(u,e)));return new Qn(s,this._parents,t,e)}function Y_(n){var t=this._name,e=this._id;typeof n!="function"&&(n=Gd(n));for(var i=this._groups,r=i.length,s=[],o=[],a=0;a<r;++a)for(var l=i[a],c=l.length,u,d=0;d<c;++d)if(u=l[d]){for(var h=n.call(u,u.__data__,d,l),f,m=Sn(u,e),_=0,g=h.length;_<g;++_)(f=h[_])&&ha(f,t,e,_,h,m);s.push(h),o.push(u)}return new Qn(s,o,t,e)}var j_=bs.prototype.constructor;function Z_(){return new j_(this._groups,this._parents)}function K_(n,t){var e,i,r;return function(){var s=wr(this,n),o=(this.style.removeProperty(n),wr(this,n));return s===o?null:s===e&&o===i?r:r=t(e=s,i=o)}}function uf(n){return function(){this.style.removeProperty(n)}}function J_(n,t,e){var i,r=e+"",s;return function(){var o=wr(this,n);return o===r?null:o===i?s:s=t(i=o,e)}}function Q_(n,t,e){var i,r,s;return function(){var o=wr(this,n),a=e(this),l=a+"";return a==null&&(l=a=(this.style.removeProperty(n),wr(this,n))),o===l?null:o===i&&l===r?s:(r=l,s=t(i=o,a))}}function t0(n,t){var e,i,r,s="style."+t,o="end."+s,a;return function(){var l=On(this,n),c=l.on,u=l.value[s]==null?a||(a=uf(t)):void 0;(c!==e||r!==u)&&(i=(e=c).copy()).on(o,r=u),l.on=i}}function e0(n,t,e){var i=(n+="")=="transform"?r_:cf;return t==null?this.styleTween(n,K_(n,i)).on("end.style."+n,uf(n)):typeof t=="function"?this.styleTween(n,Q_(n,i,Hc(this,"style."+n,t))).each(t0(this._id,n)):this.styleTween(n,J_(n,i,t),e).on("end.style."+n,null)}function n0(n,t,e){return function(i){this.style.setProperty(n,t.call(this,i),e)}}function i0(n,t,e){var i,r;function s(){var o=t.apply(this,arguments);return o!==r&&(i=(r=o)&&n0(n,o,e)),i}return s._value=t,s}function r0(n,t,e){var i="style."+(n+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,i0(n,t,e??""))}function s0(n){return function(){this.textContent=n}}function o0(n){return function(){var t=n(this);this.textContent=t??""}}function a0(n){return this.tween("text",typeof n=="function"?o0(Hc(this,"text",n)):s0(n==null?"":n+""))}function l0(n){return function(t){this.textContent=n.call(this,t)}}function c0(n){var t,e;function i(){var r=n.apply(this,arguments);return r!==e&&(t=(e=r)&&l0(r)),t}return i._value=n,i}function u0(n){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;return this.tween(t,c0(n))}function h0(){for(var n=this._name,t=this._id,e=hf(),i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],a=o.length,l,c=0;c<a;++c)if(l=o[c]){var u=Sn(l,t);ha(l,n,e,c,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Qn(i,this._parents,n,e)}function d0(){var n,t,e=this,i=e._id,r=e.size();return new Promise(function(s,o){var a={value:o},l={value:function(){--r===0&&s()}};e.each(function(){var c=On(this,i),u=c.on;u!==n&&(t=(n=u).copy(),t._.cancel.push(a),t._.interrupt.push(a),t._.end.push(l)),c.on=t}),r===0&&s()})}var f0=0;function Qn(n,t,e,i){this._groups=n,this._parents=t,this._name=e,this._id=i}function hf(){return++f0}var kn=bs.prototype;Qn.prototype={constructor:Qn,select:q_,selectAll:Y_,selectChild:kn.selectChild,selectChildren:kn.selectChildren,filter:k_,merge:H_,selection:Z_,transition:h0,call:kn.call,nodes:kn.nodes,node:kn.node,size:kn.size,empty:kn.empty,each:kn.each,on:W_,attr:w_,attrTween:R_,style:e0,styleTween:r0,text:a0,textTween:u0,remove:X_,tween:__,delay:D_,duration:N_,ease:O_,easeVarying:z_,end:d0,[Symbol.iterator]:kn[Symbol.iterator]};function p0(n){return--n*n*n+1}function df(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var m0={time:null,delay:0,duration:250,ease:df};function g0(n,t){for(var e;!(e=n.__transition)||!(e=e[t]);)if(!(n=n.parentNode))throw new Error(`transition ${t} not found`);return e}function _0(n){var t,e;n instanceof Qn?(t=n._id,n=n._name):(t=hf(),(e=m0).time=zc(),n=n==null?null:n+"");for(var i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],a=o.length,l,c=0;c<a;++c)(l=o[c])&&ha(l,n,t,c,o,e||g0(l,t));return new Qn(i,this._parents,n,t)}bs.prototype.interrupt=p_;bs.prototype.transition=_0;const Sl=Math.PI,El=2*Sl,Li=1e-6,v0=El-Li;function ff(n){this._+=n[0];for(let t=1,e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function x0(n){let t=Math.floor(n);if(!(t>=0))throw new Error(`invalid digits: ${n}`);if(t>15)return ff;const e=10**t;return function(i){this._+=i[0];for(let r=1,s=i.length;r<s;++r)this._+=Math.round(arguments[r]*e)/e+i[r]}}class y0{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?ff:x0(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,i,r){this._append`Q${+t},${+e},${this._x1=+i},${this._y1=+r}`}bezierCurveTo(t,e,i,r,s,o){this._append`C${+t},${+e},${+i},${+r},${this._x1=+s},${this._y1=+o}`}arcTo(t,e,i,r,s){if(t=+t,e=+e,i=+i,r=+r,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,a=this._y1,l=i-t,c=r-e,u=o-t,d=a-e,h=u*u+d*d;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(h>Li)if(!(Math.abs(d*l-c*u)>Li)||!s)this._append`L${this._x1=t},${this._y1=e}`;else{let f=i-o,m=r-a,_=l*l+c*c,g=f*f+m*m,p=Math.sqrt(_),v=Math.sqrt(h),x=s*Math.tan((Sl-Math.acos((_+h-g)/(2*p*v)))/2),y=x/v,L=x/p;Math.abs(y-1)>Li&&this._append`L${t+y*u},${e+y*d}`,this._append`A${s},${s},0,0,${+(d*f>u*m)},${this._x1=t+L*l},${this._y1=e+L*c}`}}arc(t,e,i,r,s,o){if(t=+t,e=+e,i=+i,o=!!o,i<0)throw new Error(`negative radius: ${i}`);let a=i*Math.cos(r),l=i*Math.sin(r),c=t+a,u=e+l,d=1^o,h=o?r-s:s-r;this._x1===null?this._append`M${c},${u}`:(Math.abs(this._x1-c)>Li||Math.abs(this._y1-u)>Li)&&this._append`L${c},${u}`,i&&(h<0&&(h=h%El+El),h>v0?this._append`A${i},${i},0,1,${d},${t-a},${e-l}A${i},${i},0,1,${d},${this._x1=c},${this._y1=u}`:h>Li&&this._append`A${i},${i},0,${+(h>=Sl)},${d},${this._x1=t+i*Math.cos(s)},${this._y1=e+i*Math.sin(s)}`)}rect(t,e,i,r){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${i=+i}v${+r}h${-i}Z`}toString(){return this._}}function M0(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function Go(n,t){if(!isFinite(n)||n===0)return null;var e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"),i=n.slice(0,e);return[i.length>1?i[0]+i.slice(2):i,+n.slice(e+1)]}function Tr(n){return n=Go(Math.abs(n)),n?n[1]:NaN}function S0(n,t){return function(e,i){for(var r=e.length,s=[],o=0,a=n[0],l=0;r>0&&a>0&&(l+a+1>i&&(a=Math.max(1,i-l)),s.push(e.substring(r-=a,r+a)),!((l+=a+1)>i));)a=n[o=(o+1)%n.length];return s.reverse().join(t)}}function E0(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var w0=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Vo(n){if(!(t=w0.exec(n)))throw new Error("invalid format: "+n);var t;return new Gc({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}Vo.prototype=Gc.prototype;function Gc(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}Gc.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function b0(n){t:for(var t=n.length,e=1,i=-1,r;e<t;++e)switch(n[e]){case".":i=r=e;break;case"0":i===0&&(i=e),r=e;break;default:if(!+n[e])break t;i>0&&(i=0);break}return i>0?n.slice(0,i)+n.slice(r+1):n}var Wo;function T0(n,t){var e=Go(n,t);if(!e)return Wo=void 0,n.toPrecision(t);var i=e[0],r=e[1],s=r-(Wo=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,o=i.length;return s===o?i:s>o?i+new Array(s-o+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+Go(n,Math.max(0,t+s-1))[0]}function Iu(n,t){var e=Go(n,t);if(!e)return n+"";var i=e[0],r=e[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Uu={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:M0,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>Iu(n*100,t),r:Iu,s:T0,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Nu(n){return n}var Fu=Array.prototype.map,Ou=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function A0(n){var t=n.grouping===void 0||n.thousands===void 0?Nu:S0(Fu.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",i=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Nu:E0(Fu.call(n.numerals,String)),o=n.percent===void 0?"%":n.percent+"",a=n.minus===void 0?"−":n.minus+"",l=n.nan===void 0?"NaN":n.nan+"";function c(d,h){d=Vo(d);var f=d.fill,m=d.align,_=d.sign,g=d.symbol,p=d.zero,v=d.width,x=d.comma,y=d.precision,L=d.trim,A=d.type;A==="n"?(x=!0,A="g"):Uu[A]||(y===void 0&&(y=12),L=!0,A="g"),(p||f==="0"&&m==="=")&&(p=!0,f="0",m="=");var R=(h&&h.prefix!==void 0?h.prefix:"")+(g==="$"?e:g==="#"&&/[boxX]/.test(A)?"0"+A.toLowerCase():""),D=(g==="$"?i:/[%p]/.test(A)?o:"")+(h&&h.suffix!==void 0?h.suffix:""),b=Uu[A],S=/[defgprs%]/.test(A);y=y===void 0?6:/[gprs]/.test(A)?Math.max(1,Math.min(21,y)):Math.max(0,Math.min(20,y));function C(N){var B=R,k=D,P,H,X;if(A==="c")k=b(N)+k,N="";else{N=+N;var G=N<0||1/N<0;if(N=isNaN(N)?l:b(Math.abs(N),y),L&&(N=b0(N)),G&&+N==0&&_!=="+"&&(G=!1),B=(G?_==="("?_:a:_==="-"||_==="("?"":_)+B,k=(A==="s"&&!isNaN(N)&&Wo!==void 0?Ou[8+Wo/3]:"")+k+(G&&_==="("?")":""),S){for(P=-1,H=N.length;++P<H;)if(X=N.charCodeAt(P),48>X||X>57){k=(X===46?r+N.slice(P+1):N.slice(P))+k,N=N.slice(0,P);break}}}x&&!p&&(N=t(N,1/0));var Q=B.length+N.length+k.length,it=Q<v?new Array(v-Q+1).join(f):"";switch(x&&p&&(N=t(it+N,it.length?v-k.length:1/0),it=""),m){case"<":N=B+N+k+it;break;case"=":N=B+it+N+k;break;case"^":N=it.slice(0,Q=it.length>>1)+B+N+k+it.slice(Q);break;default:N=it+B+N+k;break}return s(N)}return C.toString=function(){return d+""},C}function u(d,h){var f=Math.max(-8,Math.min(8,Math.floor(Tr(h)/3)))*3,m=Math.pow(10,-f),_=c((d=Vo(d),d.type="f",d),{suffix:Ou[8+f/3]});return function(g){return _(m*g)}}return{format:c,formatPrefix:u}}var Fs,Bi,pf;C0({thousands:",",grouping:[3],currency:["$",""]});function C0(n){return Fs=A0(n),Bi=Fs.format,pf=Fs.formatPrefix,Fs}function R0(n){return Math.max(0,-Tr(Math.abs(n)))}function P0(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(Tr(t)/3)))*3-Tr(Math.abs(n)))}function L0(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,Tr(t)-Tr(n))+1}var Xt=1e-6,mf=1e-12,Zt=Math.PI,on=Zt/2,$o=Zt/4,Ye=Zt*2,Hn=180/Zt,Re=Zt/180,de=Math.abs,D0=Math.atan,Ar=Math.atan2,ce=Math.cos,Os=Math.ceil,ue=Math.sin,I0=Math.sign||function(n){return n>0?1:n<0?-1:0},xi=Math.sqrt;function U0(n){return n>1?0:n<-1?Zt:Math.acos(n)}function $i(n){return n>1?on:n<-1?-on:Math.asin(n)}function Ue(){}function Xo(n,t){n&&zu.hasOwnProperty(n.type)&&zu[n.type](n,t)}var Bu={Feature:function(n,t){Xo(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,i=-1,r=e.length;++i<r;)Xo(e[i].geometry,t)}},zu={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)n=e[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){wl(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)wl(e[i],t,0)},Polygon:function(n,t){ku(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)ku(e[i],t)},GeometryCollection:function(n,t){for(var e=n.geometries,i=-1,r=e.length;++i<r;)Xo(e[i],t)}};function wl(n,t,e){var i=-1,r=n.length-e,s;for(t.lineStart();++i<r;)s=n[i],t.point(s[0],s[1],s[2]);t.lineEnd()}function ku(n,t){var e=-1,i=n.length;for(t.polygonStart();++e<i;)wl(n[e],t,1);t.polygonEnd()}function Ii(n,t){n&&Bu.hasOwnProperty(n.type)?Bu[n.type](n,t):Xo(n,t)}var bl=new yn,qo=new yn,gf,_f,Tl,Al,Cl,xs={point:Ue,lineStart:Ue,lineEnd:Ue,polygonStart:function(){bl=new yn,xs.lineStart=N0,xs.lineEnd=F0},polygonEnd:function(){var n=+bl;qo.add(n<0?Ye+n:n),this.lineStart=this.lineEnd=this.point=Ue},sphere:function(){qo.add(Ye)}};function N0(){xs.point=O0}function F0(){vf(gf,_f)}function O0(n,t){xs.point=vf,gf=n,_f=t,n*=Re,t*=Re,Tl=n,Al=ce(t=t/2+$o),Cl=ue(t)}function vf(n,t){n*=Re,t*=Re,t=t/2+$o;var e=n-Tl,i=e>=0?1:-1,r=i*e,s=ce(t),o=ue(t),a=Cl*o,l=Al*s+a*ce(r),c=a*i*ue(r);bl.add(Ar(c,l)),Tl=n,Al=s,Cl=o}function B0(n){return qo=new yn,Ii(n,xs),qo*2}function Rl(n){return[Ar(n[1],n[0]),$i(n[2])]}function Cr(n){var t=n[0],e=n[1],i=ce(e);return[i*ce(t),i*ue(t),ue(e)]}function Bs(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Yo(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Sa(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function zs(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Pl(n){var t=xi(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Ll(n,t){function e(i,r){return i=n(i,r),t(i[0],i[1])}return n.invert&&t.invert&&(e.invert=function(i,r){return i=t.invert(i,r),i&&n.invert(i[0],i[1])}),e}function Dl(n,t){return de(n)>Zt&&(n-=Math.round(n/Ye)*Ye),[n,t]}Dl.invert=Dl;function z0(n,t,e){return(n%=Ye)?t||e?Ll(Gu(n),Vu(t,e)):Gu(n):t||e?Vu(t,e):Dl}function Hu(n){return function(t,e){return t+=n,de(t)>Zt&&(t-=Math.round(t/Ye)*Ye),[t,e]}}function Gu(n){var t=Hu(n);return t.invert=Hu(-n),t}function Vu(n,t){var e=ce(n),i=ue(n),r=ce(t),s=ue(t);function o(a,l){var c=ce(l),u=ce(a)*c,d=ue(a)*c,h=ue(l),f=h*e+u*i;return[Ar(d*r-f*s,u*e-h*i),$i(f*r+d*s)]}return o.invert=function(a,l){var c=ce(l),u=ce(a)*c,d=ue(a)*c,h=ue(l),f=h*r-d*s;return[Ar(d*r+h*s,u*e+f*i),$i(f*e-u*i)]},o}function k0(n,t,e,i,r,s){if(e){var o=ce(t),a=ue(t),l=i*e;r==null?(r=t+i*Ye,s=t-l/2):(r=Wu(o,r),s=Wu(o,s),(i>0?r<s:r>s)&&(r+=i*Ye));for(var c,u=r;i>0?u>s:u<s;u-=l)c=Rl([o,-a*ce(u),-a*ue(u)]),n.point(c[0],c[1])}}function Wu(n,t){t=Cr(t),t[0]-=n,Pl(t);var e=U0(-t[1]);return((-t[2]<0?-e:e)+Ye-Xt)%Ye}function xf(){var n=[],t;return{point:function(e,i,r){t.push([e,i,r])},lineStart:function(){n.push(t=[])},lineEnd:Ue,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function bo(n,t){return de(n[0]-t[0])<Xt&&de(n[1]-t[1])<Xt}function ks(n,t,e,i){this.x=n,this.z=t,this.o=e,this.e=i,this.v=!1,this.n=this.p=null}function yf(n,t,e,i,r){var s=[],o=[],a,l;if(n.forEach(function(m){if(!((_=m.length-1)<=0)){var _,g=m[0],p=m[_],v;if(bo(g,p)){if(!g[2]&&!p[2]){for(r.lineStart(),a=0;a<_;++a)r.point((g=m[a])[0],g[1]);r.lineEnd();return}p[0]+=2*Xt}s.push(v=new ks(g,m,null,!0)),o.push(v.o=new ks(g,null,v,!1)),s.push(v=new ks(p,m,null,!1)),o.push(v.o=new ks(p,null,v,!0))}}),!!s.length){for(o.sort(t),$u(s),$u(o),a=0,l=o.length;a<l;++a)o[a].e=e=!e;for(var c=s[0],u,d;;){for(var h=c,f=!0;h.v;)if((h=h.n)===c)return;u=h.z,r.lineStart();do{if(h.v=h.o.v=!0,h.e){if(f)for(a=0,l=u.length;a<l;++a)r.point((d=u[a])[0],d[1]);else i(h.x,h.n.x,1,r);h=h.n}else{if(f)for(u=h.p.z,a=u.length-1;a>=0;--a)r.point((d=u[a])[0],d[1]);else i(h.x,h.p.x,-1,r);h=h.p}h=h.o,u=h.z,f=!f}while(!h.v);r.lineEnd()}}}function $u(n){if(t=n.length){for(var t,e=0,i=n[0],r;++e<t;)i.n=r=n[e],r.p=i,i=r;i.n=r=n[0],r.p=i}}function Ea(n){return de(n[0])<=Zt?n[0]:I0(n[0])*((de(n[0])+Zt)%Ye-Zt)}function H0(n,t){var e=Ea(t),i=t[1],r=ue(i),s=[ue(e),-ce(e),0],o=0,a=0,l=new yn;r===1?i=on+Xt:r===-1&&(i=-on-Xt);for(var c=0,u=n.length;c<u;++c)if(h=(d=n[c]).length)for(var d,h,f=d[h-1],m=Ea(f),_=f[1]/2+$o,g=ue(_),p=ce(_),v=0;v<h;++v,m=y,g=A,p=R,f=x){var x=d[v],y=Ea(x),L=x[1]/2+$o,A=ue(L),R=ce(L),D=y-m,b=D>=0?1:-1,S=b*D,C=S>Zt,N=g*A;if(l.add(Ar(N*b*ue(S),p*R+N*ce(S))),o+=C?D+b*Ye:D,C^m>=e^y>=e){var B=Yo(Cr(f),Cr(x));Pl(B);var k=Yo(s,B);Pl(k);var P=(C^D>=0?-1:1)*$i(k[2]);(i>P||i===P&&(B[0]||B[1]))&&(a+=C^D>=0?1:-1)}}return(o<-Xt||o<Xt&&l<-mf)^a&1}function Mf(n,t,e,i){return function(r){var s=t(r),o=xf(),a=t(o),l=!1,c,u,d,h={point:f,lineStart:_,lineEnd:g,polygonStart:function(){h.point=p,h.lineStart=v,h.lineEnd=x,u=[],c=[]},polygonEnd:function(){h.point=f,h.lineStart=_,h.lineEnd=g,u=Bd(u);var y=H0(c,i);u.length?(l||(r.polygonStart(),l=!0),yf(u,V0,y,e,r)):y&&(l||(r.polygonStart(),l=!0),r.lineStart(),e(null,null,1,r),r.lineEnd()),l&&(r.polygonEnd(),l=!1),u=c=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function f(y,L){n(y,L)&&r.point(y,L)}function m(y,L){s.point(y,L)}function _(){h.point=m,s.lineStart()}function g(){h.point=f,s.lineEnd()}function p(y,L){d.push([y,L]),a.point(y,L)}function v(){a.lineStart(),d=[]}function x(){p(d[0][0],d[0][1]),a.lineEnd();var y=a.clean(),L=o.result(),A,R=L.length,D,b,S;if(d.pop(),c.push(d),d=null,!!R){if(y&1){if(b=L[0],(D=b.length-1)>0){for(l||(r.polygonStart(),l=!0),r.lineStart(),A=0;A<D;++A)r.point((S=b[A])[0],S[1]);r.lineEnd()}return}R>1&&y&2&&L.push(L.pop().concat(L.shift())),u.push(L.filter(G0))}}return h}}function G0(n){return n.length>1}function V0(n,t){return((n=n.x)[0]<0?n[1]-on-Xt:on-n[1])-((t=t.x)[0]<0?t[1]-on-Xt:on-t[1])}const Xu=Mf(function(){return!0},W0,X0,[-Zt,-on]);function W0(n){var t=NaN,e=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(s,o){var a=s>0?Zt:-Zt,l=de(s-t);de(l-Zt)<Xt?(n.point(t,e=(e+o)/2>0?on:-on),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),n.point(s,e),r=0):i!==a&&l>=Zt&&(de(t-i)<Xt&&(t-=i*Xt),de(s-a)<Xt&&(s-=a*Xt),e=$0(t,e,s,o),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),r=0),n.point(t=s,e=o),i=a},lineEnd:function(){n.lineEnd(),t=e=NaN},clean:function(){return 2-r}}}function $0(n,t,e,i){var r,s,o=ue(n-e);return de(o)>Xt?D0((ue(t)*(s=ce(i))*ue(e)-ue(i)*(r=ce(t))*ue(n))/(r*s*o)):(t+i)/2}function X0(n,t,e,i){var r;if(n==null)r=e*on,i.point(-Zt,r),i.point(0,r),i.point(Zt,r),i.point(Zt,0),i.point(Zt,-r),i.point(0,-r),i.point(-Zt,-r),i.point(-Zt,0),i.point(-Zt,r);else if(de(n[0]-t[0])>Xt){var s=n[0]<t[0]?Zt:-Zt;r=e*s/2,i.point(-s,r),i.point(0,r),i.point(s,r)}else i.point(t[0],t[1])}function q0(n){var t=ce(n),e=2*Re,i=t>0,r=de(t)>Xt;function s(u,d,h,f){k0(f,n,e,h,u,d)}function o(u,d){return ce(u)*ce(d)>t}function a(u){var d,h,f,m,_;return{lineStart:function(){m=f=!1,_=1},point:function(g,p){var v=[g,p],x,y=o(g,p),L=i?y?0:c(g,p):y?c(g+(g<0?Zt:-Zt),p):0;if(!d&&(m=f=y)&&u.lineStart(),y!==f&&(x=l(d,v),(!x||bo(d,x)||bo(v,x))&&(v[2]=1)),y!==f)_=0,y?(u.lineStart(),x=l(v,d),u.point(x[0],x[1])):(x=l(d,v),u.point(x[0],x[1],2),u.lineEnd()),d=x;else if(r&&d&&i^y){var A;!(L&h)&&(A=l(v,d,!0))&&(_=0,i?(u.lineStart(),u.point(A[0][0],A[0][1]),u.point(A[1][0],A[1][1]),u.lineEnd()):(u.point(A[1][0],A[1][1]),u.lineEnd(),u.lineStart(),u.point(A[0][0],A[0][1],3)))}y&&(!d||!bo(d,v))&&u.point(v[0],v[1]),d=v,f=y,h=L},lineEnd:function(){f&&u.lineEnd(),d=null},clean:function(){return _|(m&&f)<<1}}}function l(u,d,h){var f=Cr(u),m=Cr(d),_=[1,0,0],g=Yo(f,m),p=Bs(g,g),v=g[0],x=p-v*v;if(!x)return!h&&u;var y=t*p/x,L=-t*v/x,A=Yo(_,g),R=zs(_,y),D=zs(g,L);Sa(R,D);var b=A,S=Bs(R,b),C=Bs(b,b),N=S*S-C*(Bs(R,R)-1);if(!(N<0)){var B=xi(N),k=zs(b,(-S-B)/C);if(Sa(k,R),k=Rl(k),!h)return k;var P=u[0],H=d[0],X=u[1],G=d[1],Q;H<P&&(Q=P,P=H,H=Q);var it=H-P,pt=de(it-Zt)<Xt,Pt=pt||it<Xt;if(!pt&&G<X&&(Q=X,X=G,G=Q),Pt?pt?X+G>0^k[1]<(de(k[0]-P)<Xt?X:G):X<=k[1]&&k[1]<=G:it>Zt^(P<=k[0]&&k[0]<=H)){var kt=zs(b,(-S+B)/C);return Sa(kt,R),[k,Rl(kt)]}}}function c(u,d){var h=i?n:Zt-n,f=0;return u<-h?f|=1:u>h&&(f|=2),d<-h?f|=4:d>h&&(f|=8),f}return Mf(o,a,s,i?[0,-n]:[-Zt,n-Zt])}function Y0(n,t,e,i,r,s){var o=n[0],a=n[1],l=t[0],c=t[1],u=0,d=1,h=l-o,f=c-a,m;if(m=e-o,!(!h&&m>0)){if(m/=h,h<0){if(m<u)return;m<d&&(d=m)}else if(h>0){if(m>d)return;m>u&&(u=m)}if(m=r-o,!(!h&&m<0)){if(m/=h,h<0){if(m>d)return;m>u&&(u=m)}else if(h>0){if(m<u)return;m<d&&(d=m)}if(m=i-a,!(!f&&m>0)){if(m/=f,f<0){if(m<u)return;m<d&&(d=m)}else if(f>0){if(m>d)return;m>u&&(u=m)}if(m=s-a,!(!f&&m<0)){if(m/=f,f<0){if(m>d)return;m>u&&(u=m)}else if(f>0){if(m<u)return;m<d&&(d=m)}return u>0&&(n[0]=o+u*h,n[1]=a+u*f),d<1&&(t[0]=o+d*h,t[1]=a+d*f),!0}}}}}var Qr=1e9,Hs=-Qr;function j0(n,t,e,i){function r(c,u){return n<=c&&c<=e&&t<=u&&u<=i}function s(c,u,d,h){var f=0,m=0;if(c==null||(f=o(c,d))!==(m=o(u,d))||l(c,u)<0^d>0)do h.point(f===0||f===3?n:e,f>1?i:t);while((f=(f+d+4)%4)!==m);else h.point(u[0],u[1])}function o(c,u){return de(c[0]-n)<Xt?u>0?0:3:de(c[0]-e)<Xt?u>0?2:1:de(c[1]-t)<Xt?u>0?1:0:u>0?3:2}function a(c,u){return l(c.x,u.x)}function l(c,u){var d=o(c,1),h=o(u,1);return d!==h?d-h:d===0?u[1]-c[1]:d===1?c[0]-u[0]:d===2?c[1]-u[1]:u[0]-c[0]}return function(c){var u=c,d=xf(),h,f,m,_,g,p,v,x,y,L,A,R={point:D,lineStart:N,lineEnd:B,polygonStart:S,polygonEnd:C};function D(P,H){r(P,H)&&u.point(P,H)}function b(){for(var P=0,H=0,X=f.length;H<X;++H)for(var G=f[H],Q=1,it=G.length,pt=G[0],Pt,kt,Y=pt[0],tt=pt[1];Q<it;++Q)Pt=Y,kt=tt,pt=G[Q],Y=pt[0],tt=pt[1],kt<=i?tt>i&&(Y-Pt)*(i-kt)>(tt-kt)*(n-Pt)&&++P:tt<=i&&(Y-Pt)*(i-kt)<(tt-kt)*(n-Pt)&&--P;return P}function S(){u=d,h=[],f=[],A=!0}function C(){var P=b(),H=A&&P,X=(h=Bd(h)).length;(H||X)&&(c.polygonStart(),H&&(c.lineStart(),s(null,null,1,c),c.lineEnd()),X&&yf(h,a,P,s,c),c.polygonEnd()),u=c,h=f=m=null}function N(){R.point=k,f&&f.push(m=[]),L=!0,y=!1,v=x=NaN}function B(){h&&(k(_,g),p&&y&&d.rejoin(),h.push(d.result())),R.point=D,y&&u.lineEnd()}function k(P,H){var X=r(P,H);if(f&&m.push([P,H]),L)_=P,g=H,p=X,L=!1,X&&(u.lineStart(),u.point(P,H));else if(X&&y)u.point(P,H);else{var G=[v=Math.max(Hs,Math.min(Qr,v)),x=Math.max(Hs,Math.min(Qr,x))],Q=[P=Math.max(Hs,Math.min(Qr,P)),H=Math.max(Hs,Math.min(Qr,H))];Y0(G,Q,n,t,e,i)?(y||(u.lineStart(),u.point(G[0],G[1])),u.point(Q[0],Q[1]),X||u.lineEnd(),A=!1):X&&(u.lineStart(),u.point(P,H),A=!1)}v=P,x=H,y=X}return R}}function qu(n,t,e){var i=di(n,t-Xt,e).concat(t);return function(r){return i.map(function(s){return[r,s]})}}function Yu(n,t,e){var i=di(n,t-Xt,e).concat(t);return function(r){return i.map(function(s){return[s,r]})}}function Z0(){var n,t,e,i,r,s,o,a,l=10,c=l,u=90,d=360,h,f,m,_,g=2.5;function p(){return{type:"MultiLineString",coordinates:v()}}function v(){return di(Os(i/u)*u,e,u).map(m).concat(di(Os(a/d)*d,o,d).map(_)).concat(di(Os(t/l)*l,n,l).filter(function(x){return de(x%u)>Xt}).map(h)).concat(di(Os(s/c)*c,r,c).filter(function(x){return de(x%d)>Xt}).map(f))}return p.lines=function(){return v().map(function(x){return{type:"LineString",coordinates:x}})},p.outline=function(){return{type:"Polygon",coordinates:[m(i).concat(_(o).slice(1),m(e).reverse().slice(1),_(a).reverse().slice(1))]}},p.extent=function(x){return arguments.length?p.extentMajor(x).extentMinor(x):p.extentMinor()},p.extentMajor=function(x){return arguments.length?(i=+x[0][0],e=+x[1][0],a=+x[0][1],o=+x[1][1],i>e&&(x=i,i=e,e=x),a>o&&(x=a,a=o,o=x),p.precision(g)):[[i,a],[e,o]]},p.extentMinor=function(x){return arguments.length?(t=+x[0][0],n=+x[1][0],s=+x[0][1],r=+x[1][1],t>n&&(x=t,t=n,n=x),s>r&&(x=s,s=r,r=x),p.precision(g)):[[t,s],[n,r]]},p.step=function(x){return arguments.length?p.stepMajor(x).stepMinor(x):p.stepMinor()},p.stepMajor=function(x){return arguments.length?(u=+x[0],d=+x[1],p):[u,d]},p.stepMinor=function(x){return arguments.length?(l=+x[0],c=+x[1],p):[l,c]},p.precision=function(x){return arguments.length?(g=+x,h=qu(s,r,90),f=Yu(t,n,g),m=qu(a,o,90),_=Yu(i,e,g),p):g},p.extentMajor([[-180,-90+Xt],[180,90-Xt]]).extentMinor([[-180,-80-Xt],[180,80+Xt]])}function K0(){return Z0()()}const Il=n=>n;var wa=new yn,Ul=new yn,Sf,Ef,Nl,Fl,Yn={point:Ue,lineStart:Ue,lineEnd:Ue,polygonStart:function(){Yn.lineStart=J0,Yn.lineEnd=tv},polygonEnd:function(){Yn.lineStart=Yn.lineEnd=Yn.point=Ue,wa.add(de(Ul)),Ul=new yn},result:function(){var n=wa/2;return wa=new yn,n}};function J0(){Yn.point=Q0}function Q0(n,t){Yn.point=wf,Sf=Nl=n,Ef=Fl=t}function wf(n,t){Ul.add(Fl*n-Nl*t),Nl=n,Fl=t}function tv(){wf(Sf,Ef)}var Rr=1/0,jo=Rr,ys=-Rr,Zo=ys,Ko={point:ev,lineStart:Ue,lineEnd:Ue,polygonStart:Ue,polygonEnd:Ue,result:function(){var n=[[Rr,jo],[ys,Zo]];return ys=Zo=-(jo=Rr=1/0),n}};function ev(n,t){n<Rr&&(Rr=n),n>ys&&(ys=n),t<jo&&(jo=t),t>Zo&&(Zo=t)}var Ol=0,Bl=0,ts=0,Jo=0,Qo=0,_r=0,zl=0,kl=0,es=0,bf,Tf,Cn,Rn,sn={point:Xi,lineStart:ju,lineEnd:Zu,polygonStart:function(){sn.lineStart=rv,sn.lineEnd=sv},polygonEnd:function(){sn.point=Xi,sn.lineStart=ju,sn.lineEnd=Zu},result:function(){var n=es?[zl/es,kl/es]:_r?[Jo/_r,Qo/_r]:ts?[Ol/ts,Bl/ts]:[NaN,NaN];return Ol=Bl=ts=Jo=Qo=_r=zl=kl=es=0,n}};function Xi(n,t){Ol+=n,Bl+=t,++ts}function ju(){sn.point=nv}function nv(n,t){sn.point=iv,Xi(Cn=n,Rn=t)}function iv(n,t){var e=n-Cn,i=t-Rn,r=xi(e*e+i*i);Jo+=r*(Cn+n)/2,Qo+=r*(Rn+t)/2,_r+=r,Xi(Cn=n,Rn=t)}function Zu(){sn.point=Xi}function rv(){sn.point=ov}function sv(){Af(bf,Tf)}function ov(n,t){sn.point=Af,Xi(bf=Cn=n,Tf=Rn=t)}function Af(n,t){var e=n-Cn,i=t-Rn,r=xi(e*e+i*i);Jo+=r*(Cn+n)/2,Qo+=r*(Rn+t)/2,_r+=r,r=Rn*n-Cn*t,zl+=r*(Cn+n),kl+=r*(Rn+t),es+=r*3,Xi(Cn=n,Rn=t)}function Cf(n){this._context=n}Cf.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,t){switch(this._point){case 0:{this._context.moveTo(n,t),this._point=1;break}case 1:{this._context.lineTo(n,t);break}default:{this._context.moveTo(n+this._radius,t),this._context.arc(n,t,this._radius,0,Ye);break}}},result:Ue};var Hl=new yn,ba,Rf,Pf,ns,is,Ms={point:Ue,lineStart:function(){Ms.point=av},lineEnd:function(){ba&&Lf(Rf,Pf),Ms.point=Ue},polygonStart:function(){ba=!0},polygonEnd:function(){ba=null},result:function(){var n=+Hl;return Hl=new yn,n}};function av(n,t){Ms.point=Lf,Rf=ns=n,Pf=is=t}function Lf(n,t){ns-=n,is-=t,Hl.add(xi(ns*ns+is*is)),ns=n,is=t}let Ku,ta,Ju,Qu;class th{constructor(t){this._append=t==null?Df:lv(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,e){switch(this._point){case 0:{this._append`M${t},${e}`,this._point=1;break}case 1:{this._append`L${t},${e}`;break}default:{if(this._append`M${t},${e}`,this._radius!==Ju||this._append!==ta){const i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,Ju=i,ta=this._append,Qu=this._,this._=r}this._+=Qu;break}}}result(){const t=this._;return this._="",t.length?t:null}}function Df(n){let t=1;this._+=n[0];for(const e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function lv(n){const t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);if(t>15)return Df;if(t!==Ku){const e=10**t;Ku=t,ta=function(r){let s=1;this._+=r[0];for(const o=r.length;s<o;++s)this._+=Math.round(arguments[s]*e)/e+r[s]}}return ta}function Ta(n,t){let e=3,i=4.5,r,s;function o(a){return a&&(typeof i=="function"&&s.pointRadius(+i.apply(this,arguments)),Ii(a,r(s))),s.result()}return o.area=function(a){return Ii(a,r(Yn)),Yn.result()},o.measure=function(a){return Ii(a,r(Ms)),Ms.result()},o.bounds=function(a){return Ii(a,r(Ko)),Ko.result()},o.centroid=function(a){return Ii(a,r(sn)),sn.result()},o.projection=function(a){return arguments.length?(r=a==null?(n=null,Il):(n=a).stream,o):n},o.context=function(a){return arguments.length?(s=a==null?(t=null,new th(e)):new Cf(t=a),typeof i!="function"&&s.pointRadius(i),o):t},o.pointRadius=function(a){return arguments.length?(i=typeof a=="function"?a:(s.pointRadius(+a),+a),o):i},o.digits=function(a){if(!arguments.length)return e;if(a==null)e=null;else{const l=Math.floor(a);if(!(l>=0))throw new RangeError(`invalid digits: ${a}`);e=l}return t===null&&(s=new th(e)),o},o.projection(n).digits(e).context(t)}function Vc(n){return function(t){var e=new Gl;for(var i in n)e[i]=n[i];return e.stream=t,e}}function Gl(){}Gl.prototype={constructor:Gl,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Wc(n,t,e){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),Ii(e,n.stream(Ko)),t(Ko.result()),i!=null&&n.clipExtent(i),n}function If(n,t,e){return Wc(n,function(i){var r=t[1][0]-t[0][0],s=t[1][1]-t[0][1],o=Math.min(r/(i[1][0]-i[0][0]),s/(i[1][1]-i[0][1])),a=+t[0][0]+(r-o*(i[1][0]+i[0][0]))/2,l=+t[0][1]+(s-o*(i[1][1]+i[0][1]))/2;n.scale(150*o).translate([a,l])},e)}function cv(n,t,e){return If(n,[[0,0],t],e)}function uv(n,t,e){return Wc(n,function(i){var r=+t,s=r/(i[1][0]-i[0][0]),o=(r-s*(i[1][0]+i[0][0]))/2,a=-s*i[0][1];n.scale(150*s).translate([o,a])},e)}function hv(n,t,e){return Wc(n,function(i){var r=+t,s=r/(i[1][1]-i[0][1]),o=-s*i[0][0],a=(r-s*(i[1][1]+i[0][1]))/2;n.scale(150*s).translate([o,a])},e)}var eh=16,dv=ce(30*Re);function nh(n,t){return+t?pv(n,t):fv(n)}function fv(n){return Vc({point:function(t,e){t=n(t,e),this.stream.point(t[0],t[1])}})}function pv(n,t){function e(i,r,s,o,a,l,c,u,d,h,f,m,_,g){var p=c-i,v=u-r,x=p*p+v*v;if(x>4*t&&_--){var y=o+h,L=a+f,A=l+m,R=xi(y*y+L*L+A*A),D=$i(A/=R),b=de(de(A)-1)<Xt||de(s-d)<Xt?(s+d)/2:Ar(L,y),S=n(b,D),C=S[0],N=S[1],B=C-i,k=N-r,P=v*B-p*k;(P*P/x>t||de((p*B+v*k)/x-.5)>.3||o*h+a*f+l*m<dv)&&(e(i,r,s,o,a,l,C,N,b,y/=R,L/=R,A,_,g),g.point(C,N),e(C,N,b,y,L,A,c,u,d,h,f,m,_,g))}}return function(i){var r,s,o,a,l,c,u,d,h,f,m,_,g={point:p,lineStart:v,lineEnd:y,polygonStart:function(){i.polygonStart(),g.lineStart=L},polygonEnd:function(){i.polygonEnd(),g.lineStart=v}};function p(D,b){D=n(D,b),i.point(D[0],D[1])}function v(){d=NaN,g.point=x,i.lineStart()}function x(D,b){var S=Cr([D,b]),C=n(D,b);e(d,h,u,f,m,_,d=C[0],h=C[1],u=D,f=S[0],m=S[1],_=S[2],eh,i),i.point(d,h)}function y(){g.point=p,i.lineEnd()}function L(){v(),g.point=A,g.lineEnd=R}function A(D,b){x(r=D,b),s=d,o=h,a=f,l=m,c=_,g.point=x}function R(){e(d,h,u,f,m,_,s,o,r,a,l,c,eh,i),g.lineEnd=y,y()}return g}}var mv=Vc({point:function(n,t){this.stream.point(n*Re,t*Re)}});function gv(n){return Vc({point:function(t,e){var i=n(t,e);return this.stream.point(i[0],i[1])}})}function _v(n,t,e,i,r){function s(o,a){return o*=i,a*=r,[t+n*o,e-n*a]}return s.invert=function(o,a){return[(o-t)/n*i,(e-a)/n*r]},s}function ih(n,t,e,i,r,s){if(!s)return _v(n,t,e,i,r);var o=ce(s),a=ue(s),l=o*n,c=a*n,u=o/n,d=a/n,h=(a*e-o*t)/n,f=(a*t+o*e)/n;function m(_,g){return _*=i,g*=r,[l*_-c*g+t,e-c*_-l*g]}return m.invert=function(_,g){return[i*(u*_-d*g+h),r*(f-d*_-u*g)]},m}function vv(n){return xv(function(){return n})()}function xv(n){var t,e=150,i=480,r=250,s=0,o=0,a=0,l=0,c=0,u,d=0,h=1,f=1,m=null,_=Xu,g=null,p,v,x,y=Il,L=.5,A,R,D,b,S;function C(P){return D(P[0]*Re,P[1]*Re)}function N(P){return P=D.invert(P[0],P[1]),P&&[P[0]*Hn,P[1]*Hn]}C.stream=function(P){return b&&S===P?b:b=mv(gv(u)(_(A(y(S=P)))))},C.preclip=function(P){return arguments.length?(_=P,m=void 0,k()):_},C.postclip=function(P){return arguments.length?(y=P,g=p=v=x=null,k()):y},C.clipAngle=function(P){return arguments.length?(_=+P?q0(m=P*Re):(m=null,Xu),k()):m*Hn},C.clipExtent=function(P){return arguments.length?(y=P==null?(g=p=v=x=null,Il):j0(g=+P[0][0],p=+P[0][1],v=+P[1][0],x=+P[1][1]),k()):g==null?null:[[g,p],[v,x]]},C.scale=function(P){return arguments.length?(e=+P,B()):e},C.translate=function(P){return arguments.length?(i=+P[0],r=+P[1],B()):[i,r]},C.center=function(P){return arguments.length?(s=P[0]%360*Re,o=P[1]%360*Re,B()):[s*Hn,o*Hn]},C.rotate=function(P){return arguments.length?(a=P[0]%360*Re,l=P[1]%360*Re,c=P.length>2?P[2]%360*Re:0,B()):[a*Hn,l*Hn,c*Hn]},C.angle=function(P){return arguments.length?(d=P%360*Re,B()):d*Hn},C.reflectX=function(P){return arguments.length?(h=P?-1:1,B()):h<0},C.reflectY=function(P){return arguments.length?(f=P?-1:1,B()):f<0},C.precision=function(P){return arguments.length?(A=nh(R,L=P*P),k()):xi(L)},C.fitExtent=function(P,H){return If(C,P,H)},C.fitSize=function(P,H){return cv(C,P,H)},C.fitWidth=function(P,H){return uv(C,P,H)},C.fitHeight=function(P,H){return hv(C,P,H)};function B(){var P=ih(e,0,0,h,f,d).apply(null,t(s,o)),H=ih(e,i-P[0],r-P[1],h,f,d);return u=z0(a,l,c),R=Ll(t,H),D=Ll(u,R),A=nh(R,L),k()}function k(){return b=S=null,C}return function(){return t=n.apply(this,arguments),C.invert=t.invert&&N,B()}}var cs=1.340264,us=-.081106,hs=893e-6,ds=.003796,ea=xi(3)/2,yv=12;function Uf(n,t){var e=$i(ea*ue(t)),i=e*e,r=i*i*i;return[n*ce(e)/(ea*(cs+3*us*i+r*(7*hs+9*ds*i))),e*(cs+us*i+r*(hs+ds*i))]}Uf.invert=function(n,t){for(var e=t,i=e*e,r=i*i*i,s=0,o,a,l;s<yv&&(a=e*(cs+us*i+r*(hs+ds*i))-t,l=cs+3*us*i+r*(7*hs+9*ds*i),e-=o=a/l,i=e*e,r=i*i*i,!(de(o)<mf));++s);return[ea*n*(cs+3*us*i+r*(7*hs+9*ds*i))/ce(e),$i(ue(e)/ea)]};function rs(){return vv(Uf).scale(177.158)}function da(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}const rh=Symbol("implicit");function Nf(){var n=new du,t=[],e=[],i=rh;function r(s){let o=n.get(s);if(o===void 0){if(i!==rh)return i;n.set(s,o=t.push(s)-1)}return e[o%e.length]}return r.domain=function(s){if(!arguments.length)return t.slice();t=[],n=new du;for(const o of s)n.has(o)||n.set(o,t.push(o)-1);return r},r.range=function(s){return arguments.length?(e=Array.from(s),r):e.slice()},r.unknown=function(s){return arguments.length?(i=s,r):i},r.copy=function(){return Nf(t,e).unknown(i)},da.apply(r,arguments),r}function Ff(){var n=Nf().unknown(void 0),t=n.domain,e=n.range,i=0,r=1,s,o,a=!1,l=0,c=0,u=.5;delete n.unknown;function d(){var h=t().length,f=r<i,m=f?r:i,_=f?i:r;s=(_-m)/Math.max(1,h-l+c*2),a&&(s=Math.floor(s)),m+=(_-m-s*(h-l))*u,o=s*(1-l),a&&(m=Math.round(m),o=Math.round(o));var g=di(h).map(function(p){return m+s*p});return e(f?g.reverse():g)}return n.domain=function(h){return arguments.length?(t(h),d()):t()},n.range=function(h){return arguments.length?([i,r]=h,i=+i,r=+r,d()):[i,r]},n.rangeRound=function(h){return[i,r]=h,i=+i,r=+r,a=!0,d()},n.bandwidth=function(){return o},n.step=function(){return s},n.round=function(h){return arguments.length?(a=!!h,d()):a},n.padding=function(h){return arguments.length?(l=Math.min(1,c=+h),d()):l},n.paddingInner=function(h){return arguments.length?(l=Math.min(1,h),d()):l},n.paddingOuter=function(h){return arguments.length?(c=+h,d()):c},n.align=function(h){return arguments.length?(u=Math.max(0,Math.min(1,h)),d()):u},n.copy=function(){return Ff(t(),[i,r]).round(a).paddingInner(l).paddingOuter(c).align(u)},da.apply(d(),arguments)}function Of(n){var t=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return Of(t())},n}function Mv(){return Of(Ff.apply(null,arguments).paddingInner(1))}function Sv(n){return function(){return n}}function Ev(n){return+n}var sh=[0,1];function In(n){return n}function Vl(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:Sv(isNaN(t)?NaN:.5)}function wv(n,t){var e;return n>t&&(e=n,n=t,t=e),function(i){return Math.max(n,Math.min(t,i))}}function bv(n,t,e){var i=n[0],r=n[1],s=t[0],o=t[1];return r<i?(i=Vl(r,i),s=e(o,s)):(i=Vl(i,r),s=e(s,o)),function(a){return s(i(a))}}function Tv(n,t,e){var i=Math.min(n.length,t.length)-1,r=new Array(i),s=new Array(i),o=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<i;)r[o]=Vl(n[o],n[o+1]),s[o]=e(t[o],t[o+1]);return function(a){var l=Dp(n,a,1,i)-1;return s[l](r[l](a))}}function Bf(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function zf(){var n=sh,t=sh,e=Bc,i,r,s,o=In,a,l,c;function u(){var h=Math.min(n.length,t.length);return o!==In&&(o=wv(n[0],n[h-1])),a=h>2?Tv:bv,l=c=null,d}function d(h){return h==null||isNaN(h=+h)?s:(l||(l=a(n.map(i),t,e)))(i(o(h)))}return d.invert=function(h){return o(r((c||(c=a(t,n.map(i),pn)))(h)))},d.domain=function(h){return arguments.length?(n=Array.from(h,Ev),u()):n.slice()},d.range=function(h){return arguments.length?(t=Array.from(h),u()):t.slice()},d.rangeRound=function(h){return t=Array.from(h),e=e_,u()},d.clamp=function(h){return arguments.length?(o=h?!0:In,u()):o!==In},d.interpolate=function(h){return arguments.length?(e=h,u()):e},d.unknown=function(h){return arguments.length?(s=h,d):s},function(h,f){return i=h,r=f,u()}}function Av(){return zf()(In,In)}function Cv(n,t,e,i){var r=Hp(n,t,e),s;switch(i=Vo(i??",f"),i.type){case"s":{var o=Math.max(Math.abs(n),Math.abs(t));return i.precision==null&&!isNaN(s=P0(r,o))&&(i.precision=s),pf(i,o)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=L0(r,Math.max(Math.abs(n),Math.abs(t))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=R0(r))&&(i.precision=s-(i.type==="%")*2);break}}return Bi(i)}function kf(n){var t=n.domain;return n.ticks=function(e){var i=t();return kp(i[0],i[i.length-1],e??10)},n.tickFormat=function(e,i){var r=t();return Cv(r[0],r[r.length-1],e??10,i)},n.nice=function(e){e==null&&(e=10);var i=t(),r=0,s=i.length-1,o=i[r],a=i[s],l,c,u=10;for(a<o&&(c=o,o=a,a=c,c=r,r=s,s=c);u-- >0;){if(c=fl(o,a,e),c===l)return i[r]=o,i[s]=a,t(i);if(c>0)o=Math.floor(o/c)*c,a=Math.ceil(a/c)*c;else if(c<0)o=Math.ceil(o*c)/c,a=Math.floor(a*c)/c;else break;l=c}return n},n}function Ss(){var n=Av();return n.copy=function(){return Bf(n,Ss())},da.apply(n,arguments),kf(n)}function oh(n){return function(t){return t<0?-Math.pow(-t,n):Math.pow(t,n)}}function Rv(n){return n<0?-Math.sqrt(-n):Math.sqrt(n)}function Pv(n){return n<0?-n*n:n*n}function Lv(n){var t=n(In,In),e=1;function i(){return e===1?n(In,In):e===.5?n(Rv,Pv):n(oh(e),oh(1/e))}return t.exponent=function(r){return arguments.length?(e=+r,i()):e},kf(t)}function Hf(){var n=Lv(zf());return n.copy=function(){return Bf(n,Hf()).exponent(n.exponent())},da.apply(n,arguments),n}function na(){return Hf.apply(null,arguments).exponent(.5)}function Ji(n){return function(){return n}}function Dv(n){let t=3;return n.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const i=Math.floor(e);if(!(i>=0))throw new RangeError(`invalid digits: ${e}`);t=i}return n},()=>new y0(t)}function Iv(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function Gf(n){this._context=n}Gf.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,t){switch(n=+n,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,t):this._context.moveTo(n,t);break;case 1:this._point=2;default:this._context.lineTo(n,t);break}}};function Uv(n){return new Gf(n)}function Nv(n){return n[0]}function Fv(n){return n[1]}function Ov(n,t){var e=Ji(!0),i=null,r=Uv,s=null,o=Dv(a);n=typeof n=="function"?n:n===void 0?Nv:Ji(n),t=typeof t=="function"?t:t===void 0?Fv:Ji(t);function a(l){var c,u=(l=Iv(l)).length,d,h=!1,f;for(i==null&&(s=r(f=o())),c=0;c<=u;++c)!(c<u&&e(d=l[c],c,l))===h&&((h=!h)?s.lineStart():s.lineEnd()),h&&s.point(+n(d,c,l),+t(d,c,l));if(f)return s=null,f+""||null}return a.x=function(l){return arguments.length?(n=typeof l=="function"?l:Ji(+l),a):n},a.y=function(l){return arguments.length?(t=typeof l=="function"?l:Ji(+l),a):t},a.defined=function(l){return arguments.length?(e=typeof l=="function"?l:Ji(!!l),a):e},a.curve=function(l){return arguments.length?(r=l,i!=null&&(s=r(i)),a):r},a.context=function(l){return arguments.length?(l==null?i=s=null:s=r(i=l),a):i},a}function ss(n,t,e){this.k=n,this.x=t,this.y=e}ss.prototype={constructor:ss,scale:function(n){return n===1?this:new ss(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new ss(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};ss.prototype;const Et={geoJsonUrl:"assets/worldmap-economies-4326.topo.json",years:di(2010,2025),defaultYear:2024,flowColors:{"north-south":"#009EDB","south-north":"#72BF44","south-south":"#FBAF17","north-north":"#AEA29A"},flowLabels:{"north-south":"North → South","south-north":"South → North","south-south":"South → South","north-north":"North → North"},need:{domain:[0,20,40,60,80,100],colors:["#f4f0f6","#e2d3e7","#c7a9d0","#a978b6","#8a4f9e","#5e2b75"],noData:"#f7f5f3",noDataLine:"#b8aea7",border:"#ffffff"},bivariate:[["#e6e1dd","#f0b3c0","#e45a74"],["#cbb8d6","#c98aa6","#b8405f"],["#9a76b2","#8e4f86","#6e1a45"]],arcRate:{cap:15,colors:["#0077b8","#5aa9dd","#d9cfc9","#e4476a","#8a1538"]},tariff:{cap:20,guides:[5,10,20],colors:["#cfc5bf","#f47a94","#eb1f48","#9b1830"],domain:[0,5,10,20]}},zt={worldScale:100,elevationDeg:52,topViewElevationDeg:80,azimuthRangeDeg:30,polarRangeDeg:[22,62],wallMaxHeight:19,wallMinHeight:.35,wallOpacityBottom:.92,wallOpacityTop:.62,arcMaxWidth:7,arcMinWidth:1.2,arcLift:.32,textureWidth:4096,maxArcs:40,topArcs:15,regionArcs:14,hoverArcs:8,circleMaxRadius:9,arcStepAt:.5,arcStepExaggeration:4,labelTopTariff:6,transitionMs:650,defaultZoom:1.1},Bv={841350:"Reciprocating pumps",841370:"Centrifugal pumps",841391:"Pump parts",841440:"Towed air compressors",841480:"Air/vacuum pumps & compressors",841490:"Compressor & fan parts",842121:"Water filtering & purifying machinery",842199:"Filter & purifier parts",841989:"Thermal treatment plant",847982:"Mixing & stirring machines",853710:"Control panels (≤1 000 V)",902610:"Flow & level meters",902620:"Pressure gauges",902730:"Spectrometers",902789:"Analysis instruments n.e.c.",902790:"Instrument parts"},re=n=>{const t=Math.abs(n),e=n<0?"-":"";return t>=1e9?e+"$"+Bi(".2f")(t/1e9)+"B":t>=1e6?e+"$"+Bi(".2f")(t/1e6)+"M":t>=1e3?e+"$"+Bi(".1f")(t/1e3)+"K":e+"$"+Bi(",.0f")(t)},$t=(n,t=1)=>n==null||isNaN(n)?"—":Bi(`.${t}f`)(n)+"%",E={year:Et.defaultYear,product:"all",duty:"MFN",region:"Global",selectedExporters:new Set,selectedImporters:new Set,flowFilters:new Set(["north-south","south-north","south-south","north-north"]),thresholdMode:"auto",importerNeed:"all",flowMetric:"duty",arcColor:"rate",flowView:"importers",view:"3d",focusedIso:null,countries:{},products:null,tariffs:{},water:{},walls:{},flowsByYear:{},tariffView:{},filteredFlows:[],allFlows:[],nodeStats:{},effectiveThreshold:0,totalScope:0},Si=async n=>{const t=await fetch(n);if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return t.json()},at={async loadAll(){const[n,t,e,i,r,s]=await Promise.all([Si("data/countries.json"),Si("data/products.json"),Si("data/tariffs.json"),Si("data/water.json"),Si("data/walls.json"),Si(Et.geoJsonUrl)]);Object.assign(E,{countries:n,products:t,tariffs:e,water:i,walls:r,topo:s}),E.m49ToIso={};for(const[o,a]of Object.entries(n))a.m49&&(E.m49ToIso[String(+a.m49)]=o);await this.loadYear(E.year)},async loadYear(n){return E.flowsByYear[n]||(E.flowsByYear[n]=await Si(`data/flows/${n}.json`)),E.flowsByYear[n]},prefetchAll(){return Promise.all(Et.years.map(n=>this.loadYear(n).catch(()=>null)))},productIndices(n=E.product){const{hs:t,groups:e}=E.products;if(n==="all")return t.map((s,o)=>o);const i=e.find(s=>s.id===n);if(i)return i.codes.map(s=>t.indexOf(s));const r=t.indexOf(n);return r>=0?[r]:t.map((s,o)=>o)},productLabel(n=E.product){const{hs:t,groups:e,desc:i}=E.products;if(n==="all")return"All 16 WWT-related goods";const r=e.find(o=>o.id===n);if(r)return`${r.label} (${r.codes.length} HS codes)`;const s=t.indexOf(n);return s>=0?`HS ${n} – ${i[s]}`:n},groupOf(n){return E.products.groups.find(t=>t.codes.includes(n))},tariffFor(n,t=E.duty,e=this.productIndices()){var s;const i=(s=E.tariffs[n])==null?void 0:s[t];if(!i)return null;const r=e.map(o=>i.r[o]).filter(o=>o!=null);return r.length?{value:gu(r),year:i.year,n:r.length}:null},computeTariffView(){const n=this.productIndices(),t={};for(const e of Object.keys(E.tariffs)){const i=this.tariffFor(e,E.duty,n);i&&(t[e]=i)}return E.tariffView=t,t},needOf(n){var t;return((t=E.water[n])==null?void 0:t.without)??null},dev(n){var t;return((t=E.countries[n])==null?void 0:t.dev)||"south"},region(n){var t;return((t=E.countries[n])==null?void 0:t.region)||"Other"},name(n){var t;return((t=E.countries[n])==null?void 0:t.name)||n},category(n,t){return`${this.dev(n)}-${this.dev(t)}`},rateVector(n,t=E.duty){var s,o;const e=`${n}|${t}`;if(this._rates||(this._rates={}),e in this._rates)return this._rates[e];const i=(o=(s=E.tariffs[n])==null?void 0:s[t])==null?void 0:o.r;let r=null;if(i){const a=i.filter(l=>l!=null);if(a.length){const l=gu(a);r=i.map(c=>c??l)}}return this._rates[e]=r},dutyOn(n,t,e,i=this.productIndices()){var o,a;const r=this.rateVector(t);if(!r)return null;if((o=E.countries[n])!=null&&o.eu&&((a=E.countries[t])!=null&&a.eu))return 0;let s=0;for(const l of i)s+=e[l]*r[l]/100;return s},worldEffectiveRate(){let n=0,t=0;for(const e of E.allFlows)e.duty!=null&&(n+=e.duty,t+=e.value);return t?n/t*100:0},mv(n){return E.flowMetric==="duty"?n.duty??0:n.value},buildFlows(){const n=E.flowsByYear[E.year]||[],t=this.productIndices(),e=[];for(const[i,r,s]of n){let o=0;for(const a of t)o+=s[a];o>0&&e.push({exporter:i,importer:r,value:o,duty:this.dutyOn(i,r,s,t),flowCategory:this.category(i,r),vals:s})}return E.allFlows=e,e},inScope(n){return E.region==="Global"||this.region(n)===E.region},filterFlows(){let n=E.allFlows;if(E.region!=="Global"&&(n=n.filter(s=>this.inScope(s.exporter)&&this.inScope(s.importer))),E.selectedExporters.size&&(n=n.filter(s=>E.selectedExporters.has(s.exporter))),E.selectedImporters.size&&(n=n.filter(s=>E.selectedImporters.has(s.importer))),E.importerNeed==="high"){const s=this.highNeedThreshold();n=n.filter(o=>(this.needOf(o.importer)??-1)>=s)}E.importerStats=this.importerStats(n);const t=E.selectedExporters.size||E.selectedImporters.size,e=E.focusedIso&&!t?E.focusedIso:null;e&&(n=E.allFlows.filter(s=>s.exporter===e||s.importer===e)),E.scopeFlows=n,E.totalScope=Fi(n,s=>this.mv(s)),E.scopeValue=Fi(n,s=>s.value),E.scopeDuty=Fi(n,s=>s.duty??0),E.scopeValueKnown=Fi(n,s=>s.duty==null?0:s.value);const i=e||t?"all":E.flowView;E.arcView=i,E.effectiveThreshold=0;let r=[];if(i==="all"){const s=E.thresholdMode==="auto"?this.computeAutoThreshold(n):+E.thresholdMode*this.metricScale();E.effectiveThreshold=s,r=n.filter(o=>this.mv(o)>=s&&this.mv(o)>0).sort((o,a)=>this.mv(a)-this.mv(o)).slice(0,400).filter(o=>E.flowFilters.has(o.flowCategory))}else if(i==="top"){const s=this.highNeedThreshold();r=n.filter(o=>(this.needOf(o.importer)??-1)>=s&&this.mv(o)>0).sort((o,a)=>this.mv(a)-this.mv(o)).slice(0,zt.topArcs)}else i==="region"&&(r=this.regionFlows(n).slice(0,zt.regionArcs));return r.forEach(s=>{s.m=this.mv(s)}),E.filteredFlows=r,E.nodeStats=this.nodeStats(r.filter(s=>s.importer)),r},importerStats(n){var e;const t={};for(const i of n){if(i.duty==null)continue;const r=t[e=i.importer]||(t[e]={duty:0,value:0});r.duty+=i.duty,r.value+=i.value}return t},regionFlows(n){var e;const t={};for(const i of n){const r=this.region(i.importer),s=(e=E.countries[i.importer])==null?void 0:e.coords;if(r==="Other"||!s)continue;const o=`${i.exporter}|${r}`,a=t[o]||(t[o]={exporter:i.exporter,importer:null,importerRegion:r,value:0,duty:0,valueKnown:0,n:new Set,wx:0,wy:0,wz:0,w:0,flowCategory:`${this.dev(i.exporter)}-south`});a.value+=i.value,i.duty!=null&&(a.duty+=i.duty,a.valueKnown+=i.value),a.n.add(i.importer);const l=s[0]*Math.PI/180,c=s[1]*Math.PI/180,u=i.value;a.wx+=Math.cos(c)*Math.cos(l)*u,a.wy+=Math.cos(c)*Math.sin(l)*u,a.wz+=Math.sin(c)*u,a.w+=u}return Object.values(t).map(i=>{const r=Math.atan2(i.wy,i.wx)*180/Math.PI,s=Math.atan2(i.wz,Math.hypot(i.wx,i.wy))*180/Math.PI;return{...i,n:i.n.size,toLonLat:[r,s]}}).filter(i=>this.mv(i)>0).sort((i,r)=>this.mv(r)-this.mv(i))},corridorMix(n,t=3){var a,l,c,u;if(!n.vals)return null;const{hs:e}=E.products,i=(l=(a=E.tariffs[n.importer])==null?void 0:a[E.duty])==null?void 0:l.r,r=this.rateVector(n.importer),s=((c=E.countries[n.exporter])==null?void 0:c.eu)&&((u=E.countries[n.importer])==null?void 0:u.eu),o=this.productIndices().filter(d=>n.vals[d]>0).map(d=>({hs:e[d],share:n.vals[d]/n.value*100,rate:s?0:r?r[d]:null,imputed:!s&&!!r&&i[d]==null,duty:s||!r?0:n.vals[d]*r[d]/100})).sort((d,h)=>h.share-d.share);return{top:o.slice(0,t),rest:o.length-t,count:o.length}},supplierFlows(n,t=zt.hoverArcs){return E.allFlows.filter(e=>e.importer===n&&this.mv(e)>0).sort((e,i)=>this.mv(i)-this.mv(e)).slice(0,t).map(e=>({...e,m:this.mv(e)}))},computeAutoThreshold(n,t=zt.maxArcs){const e=E.selectedExporters.size+E.selectedImporters.size+(E.focusedIso?1:0)+(E.importerNeed==="high"?4:0),i=E.region!=="Global";let r;e===0&&!i?r=1e7:e<=3?r=1e4:e<=10?r=1e5:e<=30?r=5e5:r=1e6,i&&e===0&&(r=1e6),r*=this.metricScale();const s=n.filter(o=>this.mv(o)>=r);return s.length<=t?r:this.mv(s.slice().sort((o,a)=>this.mv(a)-this.mv(o))[t-1])},metricScale(){return E.flowMetric==="duty"?.05:1},nodeStats(n){var e,i;const t={};for(const r of n){const s=this.mv(r);(t[e=r.exporter]||(t[e]={exp:0,imp:0})).exp+=s,(t[i=r.importer]||(t[i]={exp:0,imp:0})).imp+=s}return t},countryTotals(n,t=E.year,e=this.productIndices()){const i=E.flowsByYear[t];if(!i)return null;let r=0,s=0,o=0,a=!!this.rateVector(n);const l={},c={},u={};for(const[d,h,f]of i){if(d!==n&&h!==n)continue;let m=0;for(const _ of e)m+=f[_];if(m){if(h===n){r+=m,l[d]=(l[d]||0)+m;const _=this.dutyOn(d,h,f,e)??0;o+=_,u[d]=(u[d]||0)+_}d===n&&(s+=m,c[h]=(c[h]||0)+m)}}return{imp:r,exp:s,suppliers:l,markets:c,duty:a?o:null,supplierDuty:u}},highNeedThreshold(){return this._q3==null&&(this._q3=Mo(Object.values(E.water).map(n=>n.without).sort(Dn),.75)),this._q3},dutyHighNeed(){const n=this.highNeedThreshold();let t=0;for(const e of E.scopeFlows||[])(this.needOf(e.importer)??-1)>=n&&(t+=e.duty??0);return t},bivariate(){const n=[];for(const[s,o]of Object.entries(E.tariffView)){const a=this.needOf(s);a!=null&&n.push([s,a,o.value])}const t=[1/3,2/3].map(s=>Mo(n.map(o=>o[1]).sort(Dn),s)),e=[1/3,2/3].map(s=>Mo(n.map(o=>o[2]).sort(Dn),s)),i={},r=(s,o)=>s<=o[0]?0:s<=o[1]?1:2;for(const[s,o,a]of n)i[s]=[r(o,t),r(a,e)];return{nb:t,tb:e,cls:i,n:n.length}},needTariffQuartiles(){const n=[];for(const[o,a]of Object.entries(E.tariffView)){const l=this.needOf(o);l==null||!this.inScope(o)||n.push({iso:o,need:l,tariff:a.value})}if(n.length<8)return null;const t=n.map(o=>o.need).sort(Dn),e=mu(t,.25),i=mu(t,.75),r=n.filter(o=>o.need<=e),s=n.filter(o=>o.need>=i);return{n:n.length,lowMedian:Io(r,o=>o.tariff),highMedian:Io(s,o=>o.tariff),q1:e,q3:i,pts:n}}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $c="170",Zn={ROTATE:0,DOLLY:1,PAN:2},fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zv=0,ah=1,kv=2,Vf=1,Hv=2,qn=3,vi=0,Xe=1,Pn=2,mi=0,Mr=1,lh=2,ch=3,uh=4,Gv=5,Ui=100,Vv=101,Wv=102,$v=103,Xv=104,qv=200,Yv=201,jv=202,Zv=203,Wl=204,$l=205,Kv=206,Jv=207,Qv=208,tx=209,ex=210,nx=211,ix=212,rx=213,sx=214,Xl=0,ql=1,Yl=2,Pr=3,jl=4,Zl=5,Kl=6,Jl=7,Wf=0,ox=1,ax=2,gi=0,lx=1,cx=2,ux=3,hx=4,dx=5,fx=6,px=7,$f=300,Lr=301,Dr=302,Ql=303,tc=304,fa=306,ec=1e3,zi=1001,nc=1002,qe=1003,mx=1004,Gs=1005,Un=1006,Aa=1007,ki=1008,ti=1009,Xf=1010,qf=1011,Es=1012,Xc=1013,qi=1014,Nn=1015,As=1016,qc=1017,Yc=1018,Ir=1020,Yf=35902,jf=1021,Zf=1022,an=1023,Kf=1024,Jf=1025,Sr=1026,Ur=1027,Qf=1028,jc=1029,tp=1030,Zc=1031,Kc=1033,To=33776,Ao=33777,Co=33778,Ro=33779,ic=35840,rc=35841,sc=35842,oc=35843,ac=36196,lc=37492,cc=37496,uc=37808,hc=37809,dc=37810,fc=37811,pc=37812,mc=37813,gc=37814,_c=37815,vc=37816,xc=37817,yc=37818,Mc=37819,Sc=37820,Ec=37821,Po=36492,wc=36494,bc=36495,ep=36283,Tc=36284,Ac=36285,Cc=36286,gx=3200,_x=3201,vx=0,xx=1,hi="",Je="srgb",Fr="srgb-linear",pa="linear",ie="srgb",Qi=7680,hh=519,yx=512,Mx=513,Sx=514,np=515,Ex=516,wx=517,bx=518,Tx=519,Rc=35044,dh="300 es",jn=2e3,ia=2001;class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fh=1234567;const fs=Math.PI/180,ws=180/Math.PI;function Kn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Se(n,t,e){return Math.max(t,Math.min(e,n))}function Jc(n,t){return(n%t+t)%t}function Ax(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function Cx(n,t,e){return n!==t?(e-n)/(t-n):0}function ps(n,t,e){return(1-e)*n+e*t}function Rx(n,t,e,i){return ps(n,t,1-Math.exp(-e*i))}function Px(n,t=1){return t-Math.abs(Jc(n,t*2)-t)}function Lx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Dx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Ix(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Ux(n,t){return n+Math.random()*(t-n)}function Nx(n){return n*(.5-Math.random())}function Fx(n){n!==void 0&&(fh=n);let t=fh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ox(n){return n*fs}function Bx(n){return n*ws}function zx(n){return(n&n-1)===0&&n!==0}function kx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Hx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Gx(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),u=o((t+i)/2),d=s((t-i)/2),h=o((t-i)/2),f=s((i-t)/2),m=o((i-t)/2);switch(r){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function _n(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ra={DEG2RAD:fs,RAD2DEG:ws,generateUUID:Kn,clamp:Se,euclideanModulo:Jc,mapLinear:Ax,inverseLerp:Cx,lerp:ps,damp:Rx,pingpong:Px,smoothstep:Lx,smootherstep:Dx,randInt:Ix,randFloat:Ux,randFloatSpread:Nx,seededRandom:Fx,degToRad:Ox,radToDeg:Bx,isPowerOfTwo:zx,ceilPowerOfTwo:kx,floorPowerOfTwo:Hx,setQuaternionFromProperEuler:Gx,normalize:ne,denormalize:_n};class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,i,r,s,o,a,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],_=r[0],g=r[3],p=r[6],v=r[1],x=r[4],y=r[7],L=r[2],A=r[5],R=r[8];return s[0]=o*_+a*v+l*L,s[3]=o*g+a*x+l*A,s[6]=o*p+a*y+l*R,s[1]=c*_+u*v+d*L,s[4]=c*g+u*x+d*A,s[7]=c*p+u*y+d*R,s[2]=h*_+f*v+m*L,s[5]=h*g+f*x+m*A,s[8]=h*p+f*y+m*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,m=e*d+i*h+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=d*_,t[1]=(r*c-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=h*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ca.makeScale(t,e)),this}rotate(t){return this.premultiply(Ca.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ca.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ca=new Ft;function ip(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vx(){const n=sa("canvas");return n.style.display="block",n}const ph={};function os(n){n in ph||(ph[n]=!0,console.warn(n))}function Wx(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function $x(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:Fr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(n.r=Jn(n.r),n.g=Jn(n.g),n.b=Jn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(n.r=Er(n.r),n.g=Er(n.g),n.b=Er(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===hi?pa:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Jn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Er(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const mh=[.64,.33,.3,.6,.15,.06],gh=[.2126,.7152,.0722],_h=[.3127,.329],vh=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xh=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[Fr]:{primaries:mh,whitePoint:_h,transfer:pa,toXYZ:vh,fromXYZ:xh,luminanceCoefficients:gh,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:mh,whitePoint:_h,transfer:ie,toXYZ:vh,fromXYZ:xh,luminanceCoefficients:gh,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}});let tr;class qx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{tr===void 0&&(tr=sa("canvas")),tr.width=t.width,tr.height=t.height;const i=tr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=tr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sa("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Jn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Jn(e[i]/255)*255):e[i]=Jn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yx=0;class rp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yx++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ra(r[o].image)):s.push(Ra(r[o]))}else s=Ra(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Ra(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?qx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jx=0;class Ne extends Zi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,i=zi,r=zi,s=Un,o=ki,a=an,l=ti,c=Ne.DEFAULT_ANISOTROPY,u=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jx++}),this.uuid=Kn(),this.name="",this.source=new rp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$f)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ec:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case nc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ec:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case nc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=$f;Ne.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(f+1)/2,L=(p+1)/2,A=(u+h)/4,R=(d+_)/4,D=(m+g)/4;return x>y&&x>L?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=A/i,s=R/i):y>L?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=A/r,s=D/r):L<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),i=R/s,r=D/s),this.set(i,r,s,e),this}let v=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-_)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zx extends Zi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Ne(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new rp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Zx{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class sp extends Ne{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kx extends Ne{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ji{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const h=s[o+0],f=s[o+1],m=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(d!==_||l!==h||c!==f||u!==m){let g=1-a;const p=l*h+c*f+u*m+d*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),A=Math.atan2(L,p*v);g=Math.sin(g*A)/L,a=Math.sin(a*A)/L}const y=a*v;if(l=l*g+h*y,c=c*g+f*y,u=u*g+m*y,d=d*g+_*y,g===1-a){const L=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=L,c*=L,u*=L,d*=L}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],h=s[o+1],f=s[o+2],m=s[o+3];return t[e]=a*m+u*d+l*f-c*h,t[e+1]=l*m+u*h+c*d-a*f,t[e+2]=c*m+u*f+a*h-l*d,t[e+3]=u*m-a*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),h=l(i/2),f=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*r+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),d=2*(s*i-o*e);return this.x=e+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Pa.copy(this).projectOnVector(t),this.sub(Pa)}reflect(t){return this.sub(Pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Se(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pa=new I,yh=new ji;class yi{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,un):un.fromBufferAttribute(s,o),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vs.copy(i.boundingBox)),Vs.applyMatrix4(t.matrixWorld),this.union(Vs)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vr),Ws.subVectors(this.max,Vr),er.subVectors(t.a,Vr),nr.subVectors(t.b,Vr),ir.subVectors(t.c,Vr),ri.subVectors(nr,er),si.subVectors(ir,nr),Ei.subVectors(er,ir);let e=[0,-ri.z,ri.y,0,-si.z,si.y,0,-Ei.z,Ei.y,ri.z,0,-ri.x,si.z,0,-si.x,Ei.z,0,-Ei.x,-ri.y,ri.x,0,-si.y,si.x,0,-Ei.y,Ei.x,0];return!La(e,er,nr,ir,Ws)||(e=[1,0,0,0,1,0,0,0,1],!La(e,er,nr,ir,Ws))?!1:($s.crossVectors(ri,si),e=[$s.x,$s.y,$s.z],La(e,er,nr,ir,Ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Gn=[new I,new I,new I,new I,new I,new I,new I,new I],un=new I,Vs=new yi,er=new I,nr=new I,ir=new I,ri=new I,si=new I,Ei=new I,Vr=new I,Ws=new I,$s=new I,wi=new I;function La(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){wi.fromArray(n,s);const a=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),l=t.dot(wi),c=e.dot(wi),u=i.dot(wi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Jx=new yi,Wr=new I,Da=new I;class Or{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Jx.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Wr.subVectors(t,this.center);const e=Wr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Wr,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Da.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Wr.copy(t.center).add(Da)),this.expandByPoint(Wr.copy(t.center).sub(Da))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new I,Ia=new I,Xs=new I,oi=new I,Ua=new I,qs=new I,Na=new I;class ma{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Ia.copy(t).add(e).multiplyScalar(.5),Xs.copy(e).sub(t).normalize(),oi.copy(this.origin).sub(Ia);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Xs),a=oi.dot(this.direction),l=-oi.dot(Xs),c=oi.lengthSq(),u=Math.abs(1-o*o);let d,h,f,m;if(u>0)if(d=o*l-a,h=o*a-l,m=s*u,d>=0)if(h>=-m)if(h<=m){const _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ia).addScaledVector(Xs,h),f}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);const i=Vn.dot(this.direction),r=Vn.dot(Vn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,i,r,s){Ua.subVectors(e,t),qs.subVectors(i,t),Na.crossVectors(Ua,qs);let o=this.direction.dot(Na),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,t);const l=a*this.direction.dot(qs.crossVectors(oi,qs));if(l<0)return null;const c=a*this.direction.dot(Ua.cross(oi));if(c<0||l+c>o)return null;const u=-a*oi.dot(Na);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(t,e,i,r,s,o,a,l,c,u,d,h,f,m,_,g){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,d,h,f,m,_,g)}set(t,e,i,r,s,o,a,l,c,u,d,h,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/rr.setFromMatrixColumn(t,0).length(),s=1/rr.setFromMatrixColumn(t,1).length(),o=1/rr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const h=o*u,f=o*d,m=a*u,_=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,f=l*d,m=c*u,_=c*d;e[0]=h+_*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,f=l*d,m=c*u,_=c*d;e[0]=h-_*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,f=o*d,m=a*u,_=a*d;e[0]=l*u,e[4]=m*c-f,e[8]=h*c+_,e[1]=l*d,e[5]=_*c+h,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*u,e[4]=_-h*d,e[8]=m*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*d+m,e[10]=h-_*d}else if(t.order==="XZY"){const h=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+_,e[5]=o*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=_*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qx,t,ty)}lookAt(t,e,i){const r=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ai.crossVectors(i,Ze),ai.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ai.crossVectors(i,Ze)),ai.normalize(),Ys.crossVectors(Ze,ai),r[0]=ai.x,r[4]=Ys.x,r[8]=Ze.x,r[1]=ai.y,r[5]=Ys.y,r[9]=Ze.y,r[2]=ai.z,r[6]=Ys.z,r[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],m=i[2],_=i[6],g=i[10],p=i[14],v=i[3],x=i[7],y=i[11],L=i[15],A=r[0],R=r[4],D=r[8],b=r[12],S=r[1],C=r[5],N=r[9],B=r[13],k=r[2],P=r[6],H=r[10],X=r[14],G=r[3],Q=r[7],it=r[11],pt=r[15];return s[0]=o*A+a*S+l*k+c*G,s[4]=o*R+a*C+l*P+c*Q,s[8]=o*D+a*N+l*H+c*it,s[12]=o*b+a*B+l*X+c*pt,s[1]=u*A+d*S+h*k+f*G,s[5]=u*R+d*C+h*P+f*Q,s[9]=u*D+d*N+h*H+f*it,s[13]=u*b+d*B+h*X+f*pt,s[2]=m*A+_*S+g*k+p*G,s[6]=m*R+_*C+g*P+p*Q,s[10]=m*D+_*N+g*H+p*it,s[14]=m*b+_*B+g*X+p*pt,s[3]=v*A+x*S+y*k+L*G,s[7]=v*R+x*C+y*P+L*Q,s[11]=v*D+x*N+y*H+L*it,s[15]=v*b+x*B+y*X+L*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+s*l*d-r*c*d-s*a*h+i*c*h+r*a*f-i*l*f)+_*(+e*l*f-e*c*h+s*o*h-r*o*f+r*c*u-s*l*u)+g*(+e*c*d-e*a*f-s*o*d+i*o*f+s*a*u-i*c*u)+p*(-r*a*u-e*l*d+e*a*h+r*o*d-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],v=d*g*c-_*h*c+_*l*f-a*g*f-d*l*p+a*h*p,x=m*h*c-u*g*c-m*l*f+o*g*f+u*l*p-o*h*p,y=u*_*c-m*d*c+m*a*f-o*_*f-u*a*p+o*d*p,L=m*d*l-u*_*l-m*a*h+o*_*h+u*a*g-o*d*g,A=e*v+i*x+r*y+s*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=v*R,t[1]=(_*h*s-d*g*s-_*r*f+i*g*f+d*r*p-i*h*p)*R,t[2]=(a*g*s-_*l*s+_*r*c-i*g*c-a*r*p+i*l*p)*R,t[3]=(d*l*s-a*h*s-d*r*c+i*h*c+a*r*f-i*l*f)*R,t[4]=x*R,t[5]=(u*g*s-m*h*s+m*r*f-e*g*f-u*r*p+e*h*p)*R,t[6]=(m*l*s-o*g*s-m*r*c+e*g*c+o*r*p-e*l*p)*R,t[7]=(o*h*s-u*l*s+u*r*c-e*h*c-o*r*f+e*l*f)*R,t[8]=y*R,t[9]=(m*d*s-u*_*s-m*i*f+e*_*f+u*i*p-e*d*p)*R,t[10]=(o*_*s-m*a*s+m*i*c-e*_*c-o*i*p+e*a*p)*R,t[11]=(u*a*s-o*d*s-u*i*c+e*d*c+o*i*f-e*a*f)*R,t[12]=L*R,t[13]=(u*_*r-m*d*r+m*i*h-e*_*h-u*i*g+e*d*g)*R,t[14]=(m*a*r-o*_*r-m*i*l+e*_*l+o*i*g-e*a*g)*R,t[15]=(o*d*r-u*a*r+u*i*l-e*d*l-o*i*h+e*a*h)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,m=s*d,_=o*u,g=o*d,p=a*d,v=l*c,x=l*u,y=l*d,L=i.x,A=i.y,R=i.z;return r[0]=(1-(_+p))*L,r[1]=(f+y)*L,r[2]=(m-x)*L,r[3]=0,r[4]=(f-y)*A,r[5]=(1-(h+p))*A,r[6]=(g+v)*A,r[7]=0,r[8]=(m+x)*R,r[9]=(g-v)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=rr.set(r[0],r[1],r[2]).length();const o=rr.set(r[4],r[5],r[6]).length(),a=rr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],hn.copy(this);const c=1/s,u=1/o,d=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,e.setFromRotationMatrix(hn),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=jn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),d=(e+t)/(e-t),h=(i+r)/(i-r);let f,m;if(a===jn)f=-(o+s)/(o-s),m=-2*o*s/(o-s);else if(a===ia)f=-o/(o-s),m=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=jn){const l=this.elements,c=1/(e-t),u=1/(i-r),d=1/(o-s),h=(e+t)*c,f=(i+r)*u;let m,_;if(a===jn)m=(o+s)*d,_=-2*d;else if(a===ia)m=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const rr=new I,hn=new fe,Qx=new I(0,0,0),ty=new I(1,1,1),ai=new I,Ys=new I,Ze=new I,Mh=new fe,Sh=new ji;class ei{constructor(t=0,e=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Se(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sh.setFromEuler(this),this.setFromQuaternion(Sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Qc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ey=0;const Eh=new I,sr=new ji,Wn=new fe,js=new I,$r=new I,ny=new I,iy=new ji,wh=new I(1,0,0),bh=new I(0,1,0),Th=new I(0,0,1),Ah={type:"added"},ry={type:"removed"},or={type:"childadded",child:null},Fa={type:"childremoved",child:null};class ke extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new I,e=new ei,i=new ji,r=new I(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new fe},normalMatrix:{value:new Ft}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.multiply(sr),this}rotateOnWorldAxis(t,e){return sr.setFromAxisAngle(t,e),this.quaternion.premultiply(sr),this}rotateX(t){return this.rotateOnAxis(wh,t)}rotateY(t){return this.rotateOnAxis(bh,t)}rotateZ(t){return this.rotateOnAxis(Th,t)}translateOnAxis(t,e){return Eh.copy(t).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wh,t)}translateY(t){return this.translateOnAxis(bh,t)}translateZ(t){return this.translateOnAxis(Th,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?js.copy(t):js.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt($r,js,this.up):Wn.lookAt(js,$r,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),sr.setFromRotationMatrix(Wn),this.quaternion.premultiply(sr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ah),or.child=t,this.dispatchEvent(or),or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ry),Fa.child=t,this.dispatchEvent(Fa),Fa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ah),or.child=t,this.dispatchEvent(or),or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,t,ny),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,iy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}ke.DEFAULT_UP=new I(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new I,$n=new I,Oa=new I,Xn=new I,ar=new I,lr=new I,Ch=new I,Ba=new I,za=new I,ka=new I,Ha=new he,Ga=new he,Va=new he;class vn{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),dn.subVectors(t,e),r.cross(dn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){dn.subVectors(r,e),$n.subVectors(i,e),Oa.subVectors(t,e);const o=dn.dot(dn),a=dn.dot($n),l=dn.dot(Oa),c=$n.dot($n),u=$n.dot(Oa),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,m=(o*u-a*l)*h;return s.set(1-f-m,m,f)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Xn.x),l.addScaledVector(o,Xn.y),l.addScaledVector(a,Xn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return Ha.setScalar(0),Ga.setScalar(0),Va.setScalar(0),Ha.fromBufferAttribute(t,e),Ga.fromBufferAttribute(t,i),Va.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Ha,s.x),o.addScaledVector(Ga,s.y),o.addScaledVector(Va,s.z),o}static isFrontFacing(t,e,i,r){return dn.subVectors(i,e),$n.subVectors(t,e),dn.cross($n).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),dn.cross($n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return vn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;ar.subVectors(r,i),lr.subVectors(s,i),Ba.subVectors(t,i);const l=ar.dot(Ba),c=lr.dot(Ba);if(l<=0&&c<=0)return e.copy(i);za.subVectors(t,r);const u=ar.dot(za),d=lr.dot(za);if(u>=0&&d<=u)return e.copy(r);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ar,o);ka.subVectors(t,s);const f=ar.dot(ka),m=lr.dot(ka);if(m>=0&&f<=m)return e.copy(s);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(i).addScaledVector(lr,a);const g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return Ch.subVectors(s,r),a=(d-u)/(d-u+(f-m)),e.copy(r).addScaledVector(Ch,a);const p=1/(g+_+h);return o=_*p,a=h*p,e.copy(i).addScaledVector(ar,o).addScaledVector(lr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function Wa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=jt.workingColorSpace){if(t=Jc(t,1),e=Se(e,0,1),i=Se(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Wa(o,s,t+1/3),this.g=Wa(o,s,t),this.b=Wa(o,s,t-1/3)}return jt.toWorkingColorSpace(this,r),this}setStyle(t,e=Je){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){const i=op[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=Er(t.r),this.g=Er(t.g),this.b=Er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return jt.fromWorkingColorSpace(De.copy(this),t),Math.round(Se(De.r*255,0,255))*65536+Math.round(Se(De.g*255,0,255))*256+Math.round(Se(De.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(De.copy(this),e);const i=De.r,r=De.g,s=De.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Je){jt.fromWorkingColorSpace(De.copy(this),t);const e=De.r,i=De.g,r=De.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(Zs);const i=ps(li.h,Zs.h,e),r=ps(li.s,Zs.s,e),s=ps(li.l,Zs.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Jt;Jt.NAMES=op;let sy=0;class Cs extends Zi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=Kn(),this.name="",this.blending=Mr,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wl,this.blendDst=$l,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mr&&(i.blending=this.blending),this.side!==vi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Wl&&(i.blendSrc=this.blendSrc),this.blendDst!==$l&&(i.blendDst=this.blendDst),this.blendEquation!==Ui&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Pr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vr extends Cs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Wf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new I,Ks=new Rt;class xn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Rc,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ks.fromBufferAttribute(this,e),Ks.applyMatrix3(t),this.setXY(e,Ks.x,Ks.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=_n(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_n(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_n(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_n(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_n(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),r=ne(r,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rc&&(t.usage=this.usage),t}}class ap extends xn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class lp extends xn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class le extends xn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let oy=0;const nn=new fe,$a=new ke,cr=new I,Ke=new yi,Xr=new yi,be=new I;class He extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oy++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ip(t)?lp:ap)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ft().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,i){return nn.makeTranslation(t,e,i),this.applyMatrix4(nn),this}scale(t,e,i){return nn.makeScale(t,e,i),this.applyMatrix4(nn),this}lookAt(t){return $a.lookAt(t),$a.updateMatrix(),this.applyMatrix4($a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new le(i,3))}else{for(let i=0,r=e.count;i<r;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Ke.setFromBufferAttribute(s),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Xr.setFromBufferAttribute(a),this.morphTargetsRelative?(be.addVectors(Ke.min,Xr.min),Ke.expandByPoint(be),be.addVectors(Ke.max,Xr.max),Ke.expandByPoint(be)):(Ke.expandByPoint(Xr.min),Ke.expandByPoint(Xr.max))}Ke.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)be.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(be));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)be.fromBufferAttribute(a,c),l&&(cr.fromBufferAttribute(t,c),be.add(cr)),r=Math.max(r,i.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new I,l[D]=new I;const c=new I,u=new I,d=new I,h=new Rt,f=new Rt,m=new Rt,_=new I,g=new I;function p(D,b,S){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,S),h.fromBufferAttribute(s,D),f.fromBufferAttribute(s,b),m.fromBufferAttribute(s,S),u.sub(c),d.sub(c),f.sub(h),m.sub(h);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(C),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(C),a[D].add(_),a[b].add(_),a[S].add(_),l[D].add(g),l[b].add(g),l[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let D=0,b=v.length;D<b;++D){const S=v[D],C=S.start,N=S.count;for(let B=C,k=C+N;B<k;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const x=new I,y=new I,L=new I,A=new I;function R(D){L.fromBufferAttribute(r,D),A.copy(L);const b=a[D];x.copy(b),x.sub(L.multiplyScalar(L.dot(b))).normalize(),y.crossVectors(A,b);const C=y.dot(l[D])<0?-1:1;o.setXYZW(D,x.x,x.y,x.z,C)}for(let D=0,b=v.length;D<b;++D){const S=v[D],C=S.start,N=S.count;for(let B=C,k=C+N;B<k;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new I,s=new I,o=new I,a=new I,l=new I,c=new I,u=new I,d=new I;if(t)for(let h=0,f=t.count;h<f;h+=3){const m=t.getX(h+0),_=t.getX(h+1),g=t.getX(h+2);r.fromBufferAttribute(e,m),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let p=0;p<u;p++)h[m++]=c[f++]}return new xn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rh=new fe,bi=new ma,Js=new Or,Ph=new I,Qs=new I,to=new I,eo=new I,Xa=new I,no=new I,Lh=new I,io=new I;class ze extends ke{constructor(t=new He,e=new vr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){no.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Xa.fromBufferAttribute(d,t),o?no.addScaledVector(Xa,u):no.addScaledVector(Xa.sub(e),u))}e.add(no)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Js.copy(i.boundingSphere),Js.applyMatrix4(s),bi.copy(t.ray).recast(t.near),!(Js.containsPoint(bi.origin)===!1&&(bi.intersectSphere(Js,Ph)===null||bi.origin.distanceToSquared(Ph)>(t.far-t.near)**2))&&(Rh.copy(s).invert(),bi.copy(t.ray).applyMatrix4(Rh),!(i.boundingBox!==null&&bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,L=x;y<L;y+=3){const A=a.getX(y),R=a.getX(y+1),D=a.getX(y+2);r=ro(this,p,t,i,c,u,d,A,R,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);r=ro(this,o,t,i,c,u,d,v,x,y),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,L=x;y<L;y+=3){const A=y,R=y+1,D=y+2;r=ro(this,p,t,i,c,u,d,A,R,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,e.push(r))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const v=g,x=g+1,y=g+2;r=ro(this,o,t,i,c,u,d,v,x,y),r&&(r.faceIndex=Math.floor(g/3),e.push(r))}}}}function ay(n,t,e,i,r,s,o,a){let l;if(t.side===Xe?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===vi,a),l===null)return null;io.copy(a),io.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(io);return c<e.near||c>e.far?null:{distance:c,point:io.clone(),object:n}}function ro(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Qs),n.getVertexPosition(l,to),n.getVertexPosition(c,eo);const u=ay(n,t,e,i,Qs,to,eo,Lh);if(u){const d=new I;vn.getBarycoord(Lh,Qs,to,eo,d),r&&(u.uv=vn.getInterpolatedAttribute(r,a,l,c,d,new Rt)),s&&(u.uv1=vn.getInterpolatedAttribute(s,a,l,c,d,new Rt)),o&&(u.normal=vn.getInterpolatedAttribute(o,a,l,c,d,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new I,materialIndex:0};vn.getNormal(Qs,to,eo,h.normal),u.face=h,u.barycoord=d}return u}class Rs extends He{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;m("z","y","x",-1,-1,i,e,t,o,s,0),m("z","y","x",1,-1,i,e,-t,o,s,1),m("x","z","y",1,1,t,i,e,r,o,2),m("x","z","y",1,-1,t,i,-e,r,o,3),m("x","y","z",1,-1,t,e,i,r,s,4),m("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(d,2));function m(_,g,p,v,x,y,L,A,R,D,b){const S=y/R,C=L/D,N=y/2,B=L/2,k=A/2,P=R+1,H=D+1;let X=0,G=0;const Q=new I;for(let it=0;it<H;it++){const pt=it*C-B;for(let Pt=0;Pt<P;Pt++){const kt=Pt*S-N;Q[_]=kt*v,Q[g]=pt*x,Q[p]=k,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[g]=0,Q[p]=A>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(Pt/R),d.push(1-it/D),X+=1}}for(let it=0;it<D;it++)for(let pt=0;pt<R;pt++){const Pt=h+pt+P*it,kt=h+pt+P*(it+1),Y=h+(pt+1)+P*(it+1),tt=h+(pt+1)+P*it;l.push(Pt,kt,tt),l.push(kt,Y,tt),G+=6}a.addGroup(f,G,b),f+=G,h+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Nr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Be(n){const t={};for(let e=0;e<n.length;e++){const i=Nr(n[e]);for(const r in i)t[r]=i[r]}return t}function ly(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function cp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const tu={clone:Nr,merge:Be};var cy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends Cs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cy,this.fragmentShader=uy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Nr(t.uniforms),this.uniformsGroups=ly(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class up extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=jn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new I,Dh=new Rt,Ih=new Rt;class mn extends up{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(fs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(fs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Dh,Ih),e.subVectors(Ih,Dh)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(fs*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ur=-90,hr=1;class hy extends ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(ur,hr,t,e);r.layers=this.layers,this.add(r);const s=new mn(ur,hr,t,e);s.layers=this.layers,this.add(s);const o=new mn(ur,hr,t,e);o.layers=this.layers,this.add(o);const a=new mn(ur,hr,t,e);a.layers=this.layers,this.add(a);const l=new mn(ur,hr,t,e);l.layers=this.layers,this.add(l);const c=new mn(ur,hr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===jn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ia)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class hp extends Ne{constructor(t,e,i,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Lr,super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class dy extends Yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new hp(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Rs(5,5,5),s=new Mn({name:"CubemapFromEquirect",uniforms:Nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:mi});s.uniforms.tEquirect.value=e;const o=new ze(r,s),a=e.minFilter;return e.minFilter===ki&&(e.minFilter=Un),new hy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}const qa=new I,fy=new I,py=new Ft;class ui{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=qa.subVectors(i,e).cross(fy.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(qa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||py.getNormalMatrix(t),r=this.coplanarPoint(qa).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new Or,so=new I;class dp{constructor(t=new ui,e=new ui,i=new ui,r=new ui,s=new ui,o=new ui){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=jn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],h=r[7],f=r[8],m=r[9],_=r[10],g=r[11],p=r[12],v=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,h-c,g-f,y-p).normalize(),i[1].setComponents(l+s,h+c,g+f,y+p).normalize(),i[2].setComponents(l+o,h+u,g+m,y+v).normalize(),i[3].setComponents(l-o,h-u,g-m,y-v).normalize(),i[4].setComponents(l-a,h-d,g-_,y-x).normalize(),e===jn)i[5].setComponents(l+a,h+d,g+_,y+x).normalize();else if(e===ia)i[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(so.x=r.normal.x>0?t.max.x:t.min.x,so.y=r.normal.y>0?t.max.y:t.min.y,so.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(so)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fp(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function my(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){const m=d[h],_=d[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Ps extends He{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=t/a,h=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const v=p*h-o;for(let x=0;x<c;x++){const y=x*d-s;m.push(y,-v,0),_.push(0,0,1),g.push(x/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const x=v+c*p,y=v+c*(p+1),L=v+1+c*(p+1),A=v+1+c*p;f.push(x,y,A),f.push(y,L,A)}this.setIndex(f),this.setAttribute("position",new le(m,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.width,t.height,t.widthSegments,t.heightSegments)}}var gy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_y=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,My=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ey=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,by=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ty=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ay=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ry=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Py=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ly=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ny=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Oy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,By=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,zy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ky=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$y=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xy="gl_FragColor = linearToOutputTexel( gl_FragColor );",qy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ky=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,oM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,aM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_M=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,SM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,EM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,TM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,AM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,RM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,DM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,UM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,FM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,BM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,HM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,GM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,VM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,WM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$M=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,XM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,YM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ZM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,KM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,JM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,QM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,eS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,iS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,aS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,SS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ES=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,US=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,FS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,OS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,WS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$S=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:gy,alphahash_pars_fragment:_y,alphamap_fragment:vy,alphamap_pars_fragment:xy,alphatest_fragment:yy,alphatest_pars_fragment:My,aomap_fragment:Sy,aomap_pars_fragment:Ey,batching_pars_vertex:wy,batching_vertex:by,begin_vertex:Ty,beginnormal_vertex:Ay,bsdfs:Cy,iridescence_fragment:Ry,bumpmap_pars_fragment:Py,clipping_planes_fragment:Ly,clipping_planes_pars_fragment:Dy,clipping_planes_pars_vertex:Iy,clipping_planes_vertex:Uy,color_fragment:Ny,color_pars_fragment:Fy,color_pars_vertex:Oy,color_vertex:By,common:zy,cube_uv_reflection_fragment:ky,defaultnormal_vertex:Hy,displacementmap_pars_vertex:Gy,displacementmap_vertex:Vy,emissivemap_fragment:Wy,emissivemap_pars_fragment:$y,colorspace_fragment:Xy,colorspace_pars_fragment:qy,envmap_fragment:Yy,envmap_common_pars_fragment:jy,envmap_pars_fragment:Zy,envmap_pars_vertex:Ky,envmap_physical_pars_fragment:lM,envmap_vertex:Jy,fog_vertex:Qy,fog_pars_vertex:tM,fog_fragment:eM,fog_pars_fragment:nM,gradientmap_pars_fragment:iM,lightmap_pars_fragment:rM,lights_lambert_fragment:sM,lights_lambert_pars_fragment:oM,lights_pars_begin:aM,lights_toon_fragment:cM,lights_toon_pars_fragment:uM,lights_phong_fragment:hM,lights_phong_pars_fragment:dM,lights_physical_fragment:fM,lights_physical_pars_fragment:pM,lights_fragment_begin:mM,lights_fragment_maps:gM,lights_fragment_end:_M,logdepthbuf_fragment:vM,logdepthbuf_pars_fragment:xM,logdepthbuf_pars_vertex:yM,logdepthbuf_vertex:MM,map_fragment:SM,map_pars_fragment:EM,map_particle_fragment:wM,map_particle_pars_fragment:bM,metalnessmap_fragment:TM,metalnessmap_pars_fragment:AM,morphinstance_vertex:CM,morphcolor_vertex:RM,morphnormal_vertex:PM,morphtarget_pars_vertex:LM,morphtarget_vertex:DM,normal_fragment_begin:IM,normal_fragment_maps:UM,normal_pars_fragment:NM,normal_pars_vertex:FM,normal_vertex:OM,normalmap_pars_fragment:BM,clearcoat_normal_fragment_begin:zM,clearcoat_normal_fragment_maps:kM,clearcoat_pars_fragment:HM,iridescence_pars_fragment:GM,opaque_fragment:VM,packing:WM,premultiplied_alpha_fragment:$M,project_vertex:XM,dithering_fragment:qM,dithering_pars_fragment:YM,roughnessmap_fragment:jM,roughnessmap_pars_fragment:ZM,shadowmap_pars_fragment:KM,shadowmap_pars_vertex:JM,shadowmap_vertex:QM,shadowmask_pars_fragment:tS,skinbase_vertex:eS,skinning_pars_vertex:nS,skinning_vertex:iS,skinnormal_vertex:rS,specularmap_fragment:sS,specularmap_pars_fragment:oS,tonemapping_fragment:aS,tonemapping_pars_fragment:lS,transmission_fragment:cS,transmission_pars_fragment:uS,uv_pars_fragment:hS,uv_pars_vertex:dS,uv_vertex:fS,worldpos_vertex:pS,background_vert:mS,background_frag:gS,backgroundCube_vert:_S,backgroundCube_frag:vS,cube_vert:xS,cube_frag:yS,depth_vert:MS,depth_frag:SS,distanceRGBA_vert:ES,distanceRGBA_frag:wS,equirect_vert:bS,equirect_frag:TS,linedashed_vert:AS,linedashed_frag:CS,meshbasic_vert:RS,meshbasic_frag:PS,meshlambert_vert:LS,meshlambert_frag:DS,meshmatcap_vert:IS,meshmatcap_frag:US,meshnormal_vert:NS,meshnormal_frag:FS,meshphong_vert:OS,meshphong_frag:BS,meshphysical_vert:zS,meshphysical_frag:kS,meshtoon_vert:HS,meshtoon_frag:GS,points_vert:VS,points_frag:WS,shadow_vert:$S,shadow_frag:XS,sprite_vert:qS,sprite_frag:YS},rt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},We={basic:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Be([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Be([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Be([rt.points,rt.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Be([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Be([rt.common,rt.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Be([rt.sprite,rt.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Be([rt.common,rt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Be([rt.lights,rt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};We.physical={uniforms:Be([We.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const oo={r:0,b:0,g:0},Ai=new ei,jS=new fe;function ZS(n,t,e,i,r,s,o){const a=new Jt(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function m(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function _(v){let x=!1;const y=m(v);y===null?p(a,l):y&&y.isColor&&(p(y,1),x=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(v,x){const y=m(x);y&&(y.isCubeTexture||y.mapping===fa)?(u===void 0&&(u=new ze(new Rs(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:Nr(We.backgroundCube.uniforms),vertexShader:We.backgroundCube.vertexShader,fragmentShader:We.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ai.copy(x.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(jS.makeRotationFromEuler(Ai)),u.material.toneMapped=jt.getTransfer(y.colorSpace)!==ie,(d!==y||h!==y.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=y,h=y.version,f=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new ze(new Ps(2,2),new Mn({name:"BackgroundMaterial",uniforms:Nr(We.background.uniforms),vertexShader:We.background.vertexShader,fragmentShader:We.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(y.colorSpace)!==ie,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,f=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(oo,cp(n)),i.buffers.color.setClear(oo.r,oo.g,oo.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:g}}function KS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(S,C,N,B,k){let P=!1;const H=d(B,N,C);s!==H&&(s=H,c(s.object)),P=f(S,B,N,k),P&&m(S,B,N,k),k!==null&&t.update(k,n.ELEMENT_ARRAY_BUFFER),(P||o)&&(o=!1,y(S,C,N,B),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,C,N){const B=N.wireframe===!0;let k=i[S.id];k===void 0&&(k={},i[S.id]=k);let P=k[C.id];P===void 0&&(P={},k[C.id]=P);let H=P[B];return H===void 0&&(H=h(l()),P[B]=H),H}function h(S){const C=[],N=[],B=[];for(let k=0;k<e;k++)C[k]=0,N[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:B,object:S,attributes:{},index:null}}function f(S,C,N,B){const k=s.attributes,P=C.attributes;let H=0;const X=N.getAttributes();for(const G in X)if(X[G].location>=0){const it=k[G];let pt=P[G];if(pt===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(pt=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(pt=S.instanceColor)),it===void 0||it.attribute!==pt||pt&&it.data!==pt.data)return!0;H++}return s.attributesNum!==H||s.index!==B}function m(S,C,N,B){const k={},P=C.attributes;let H=0;const X=N.getAttributes();for(const G in X)if(X[G].location>=0){let it=P[G];it===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(it=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(it=S.instanceColor));const pt={};pt.attribute=it,it&&it.data&&(pt.data=it.data),k[G]=pt,H++}s.attributes=k,s.attributesNum=H,s.index=B}function _(){const S=s.newAttributes;for(let C=0,N=S.length;C<N;C++)S[C]=0}function g(S){p(S,0)}function p(S,C){const N=s.newAttributes,B=s.enabledAttributes,k=s.attributeDivisors;N[S]=1,B[S]===0&&(n.enableVertexAttribArray(S),B[S]=1),k[S]!==C&&(n.vertexAttribDivisor(S,C),k[S]=C)}function v(){const S=s.newAttributes,C=s.enabledAttributes;for(let N=0,B=C.length;N<B;N++)C[N]!==S[N]&&(n.disableVertexAttribArray(N),C[N]=0)}function x(S,C,N,B,k,P,H){H===!0?n.vertexAttribIPointer(S,C,N,k,P):n.vertexAttribPointer(S,C,N,B,k,P)}function y(S,C,N,B){_();const k=B.attributes,P=N.getAttributes(),H=C.defaultAttributeValues;for(const X in P){const G=P[X];if(G.location>=0){let Q=k[X];if(Q===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),Q!==void 0){const it=Q.normalized,pt=Q.itemSize,Pt=t.get(Q);if(Pt===void 0)continue;const kt=Pt.buffer,Y=Pt.type,tt=Pt.bytesPerElement,yt=Y===n.INT||Y===n.UNSIGNED_INT||Q.gpuType===Xc;if(Q.isInterleavedBufferAttribute){const lt=Q.data,Ct=lt.stride,It=Q.offset;if(lt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<G.locationSize;Ht++)p(G.location+Ht,lt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Ht=0;Ht<G.locationSize;Ht++)g(G.location+Ht);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let Ht=0;Ht<G.locationSize;Ht++)x(G.location+Ht,pt/G.locationSize,Y,it,Ct*tt,(It+pt/G.locationSize*Ht)*tt,yt)}else{if(Q.isInstancedBufferAttribute){for(let lt=0;lt<G.locationSize;lt++)p(G.location+lt,Q.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let lt=0;lt<G.locationSize;lt++)g(G.location+lt);n.bindBuffer(n.ARRAY_BUFFER,kt);for(let lt=0;lt<G.locationSize;lt++)x(G.location+lt,pt/G.locationSize,Y,it,pt*tt,pt/G.locationSize*lt*tt,yt)}}else if(H!==void 0){const it=H[X];if(it!==void 0)switch(it.length){case 2:n.vertexAttrib2fv(G.location,it);break;case 3:n.vertexAttrib3fv(G.location,it);break;case 4:n.vertexAttrib4fv(G.location,it);break;default:n.vertexAttrib1fv(G.location,it)}}}}v()}function L(){D();for(const S in i){const C=i[S];for(const N in C){const B=C[N];for(const k in B)u(B[k].object),delete B[k];delete C[N]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const C=i[S.id];for(const N in C){const B=C[N];for(const k in B)u(B[k].object),delete B[k];delete C[N]}delete i[S.id]}function R(S){for(const C in i){const N=i[C];if(N[S.id]===void 0)continue;const B=N[S.id];for(const k in B)u(B[k].object),delete B[k];delete N[S.id]}}function D(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:b,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function JS(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let m=0;m<d;m++)f+=u[m];e.update(f,i,1)}function l(c,u,d,h){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_]*h[_];e.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function QS(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==an&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===As&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ti&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Nn&&!D)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=m>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:L,maxSamples:A}}function tE(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new ui,a=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){const m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{const v=s?0:i,x=v*4;let y=p.clippingState||null;l.value=y,y=u(m,h,x,f);for(let L=0;L!==x;++L)y[L]=e[L];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,m){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)o.copy(d[x]).applyMatrix4(v,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function eE(n){let t=new WeakMap;function e(o,a){return a===Ql?o.mapping=Lr:a===tc&&(o.mapping=Dr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ql||a===tc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new dy(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class pp extends up{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xr=4,Uh=[.125,.215,.35,.446,.526,.582],Ni=20,Ya=new pp,Nh=new Jt;let ja=null,Za=0,Ka=0,Ja=!1;const Di=(1+Math.sqrt(5))/2,dr=1/Di,Fh=[new I(-Di,dr,0),new I(Di,dr,0),new I(-dr,0,Di),new I(dr,0,Di),new I(0,Di,-dr),new I(0,Di,dr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Oh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ja=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ja,Za,Ka),this._renderer.xr.enabled=Ja,t.scissorTest=!1,ao(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Lr||t.mapping===Dr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ja=this._renderer.getRenderTarget(),Za=this._renderer.getActiveCubeFace(),Ka=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:As,format:an,colorSpace:Fr,depthBuffer:!1},r=Bh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bh(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nE(s)),this._blurMaterial=iE(s,t,e)}return r}_compileMaterial(t){const e=new ze(this._lodPlanes[0],t);this._renderer.compile(e,Ya)}_sceneToCubeUV(t,e,i,r){const a=new mn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Nh),u.toneMapping=gi,u.autoClear=!1;const f=new vr({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),m=new ze(new Rs,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(Nh),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;ao(r,v*x,p>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Lr||t.mapping===Dr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ze(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;ao(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ya)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Fh[(r-s-1)%Fh.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ze(this._lodPlanes[r],c),h=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ni-1),_=s/m,g=isFinite(s)?1+Math.floor(u*_):Ni;g>Ni&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ni}`);const p=[];let v=0;for(let R=0;R<Ni;++R){const D=R/_,b=Math.exp(-D*D/2);p.push(b),R===0?v+=b:R<g&&(v+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=m,h.mipInt.value=x-i;const y=this._sizeLods[r],L=3*y*(r>x-xr?r-x+xr:0),A=4*(this._cubeSize-y);ao(e,L,A,3*y,2*y),l.setRenderTarget(e),l.render(d,Ya)}}function nE(n){const t=[],e=[],i=[];let r=n;const s=n-xr+1+Uh.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-xr?l=Uh[o-n+xr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,m=6,_=3,g=2,p=1,v=new Float32Array(_*m*f),x=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,D=A>2?0:-1,b=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];v.set(b,_*m*A),x.set(h,g*m*A);const S=[A,A,A,A,A,A];y.set(S,p*m*A)}const L=new He;L.setAttribute("position",new xn(v,_)),L.setAttribute("uv",new xn(x,g)),L.setAttribute("faceIndex",new xn(y,p)),t.push(L),r>xr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Bh(n,t,e){const i=new Yi(n,t,e);return i.texture.mapping=fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ao(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function iE(n,t,e){const i=new Float32Array(Ni),r=new I(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function zh(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function kh(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function eu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function rE(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ql||l===tc,u=l===Lr||l===Dr;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Oh(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&r(f)?(e===null&&(e=new Oh(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function sE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&os("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function oE(n,t,e,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const _=h.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}h.removeEventListener("dispose",o),delete r[h.id];const f=s.get(h);f&&(t.remove(f),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],n.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,m=d.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,y=v.length;x<y;x+=3){const L=v[x+0],A=v[x+1],R=v[x+2];h.push(L,A,A,R,R,L)}}else if(m!==void 0){const v=m.array;_=m.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const L=x+0,A=x+1,R=x+2;h.push(L,A,A,R,R,L)}}else return;const g=new(ip(h)?lp:ap)(h,1);g.version=_;const p=s.get(d);p&&t.remove(p),s.set(d,g)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function aE(n,t,e){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,s,h*o),e.update(f,i,1)}function c(h,f,m){m!==0&&(n.drawElementsInstanced(i,f,s,h*o,m),e.update(f,i,m))}function u(h,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,i,1)}function d(h,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)c(h[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,s,h,0,_,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*_[v];e.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function lE(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function cE(n,t,e){const i=new WeakMap,r=new he;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let S=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;m===!0&&(y=1),_===!0&&(y=2),g===!0&&(y=3);let L=a.attributes.position.count*y,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const R=new Float32Array(L*A*4*d),D=new sp(R,L,A,d);D.type=Nn,D.needsUpdate=!0;const b=y*4;for(let C=0;C<d;C++){const N=p[C],B=v[C],k=x[C],P=L*A*4*C;for(let H=0;H<N.count;H++){const X=H*b;m===!0&&(r.fromBufferAttribute(N,H),R[P+X+0]=r.x,R[P+X+1]=r.y,R[P+X+2]=r.z,R[P+X+3]=0),_===!0&&(r.fromBufferAttribute(B,H),R[P+X+4]=r.x,R[P+X+5]=r.y,R[P+X+6]=r.z,R[P+X+7]=0),g===!0&&(r.fromBufferAttribute(k,H),R[P+X+8]=r.x,R[P+X+9]=r.y,R[P+X+10]=r.z,R[P+X+11]=k.itemSize===4?r.w:1)}}h={count:d,texture:D,size:new Rt(L,A)},i.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function uE(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(r.get(d)!==c&&(t.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class mp extends Ne{constructor(t,e,i,r,s,o,a,l,c,u=Sr){if(u!==Sr&&u!==Ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Sr&&(i=qi),i===void 0&&u===Ur&&(i=Ir),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const gp=new Ne,Hh=new mp(1,1),_p=new sp,vp=new Kx,xp=new hp,Gh=[],Vh=[],Wh=new Float32Array(16),$h=new Float32Array(9),Xh=new Float32Array(4);function Br(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Gh[r];if(s===void 0&&(s=new Float32Array(r),Gh[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Ee(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function we(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ga(n,t){let e=Vh[t];e===void 0&&(e=new Int32Array(t),Vh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function hE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function dE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2fv(this.addr,t),we(e,t)}}function fE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;n.uniform3fv(this.addr,t),we(e,t)}}function pE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4fv(this.addr,t),we(e,t)}}function mE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;Xh.set(i),n.uniformMatrix2fv(this.addr,!1,Xh),we(e,i)}}function gE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;$h.set(i),n.uniformMatrix3fv(this.addr,!1,$h),we(e,i)}}function _E(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,i))return;Wh.set(i),n.uniformMatrix4fv(this.addr,!1,Wh),we(e,i)}}function vE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function xE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2iv(this.addr,t),we(e,t)}}function yE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3iv(this.addr,t),we(e,t)}}function ME(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4iv(this.addr,t),we(e,t)}}function SE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function EE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2uiv(this.addr,t),we(e,t)}}function wE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3uiv(this.addr,t),we(e,t)}}function bE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4uiv(this.addr,t),we(e,t)}}function TE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Hh.compareFunction=np,s=Hh):s=gp,e.setTexture2D(t||s,r)}function AE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||vp,r)}function CE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||xp,r)}function RE(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||_p,r)}function PE(n){switch(n){case 5126:return hE;case 35664:return dE;case 35665:return fE;case 35666:return pE;case 35674:return mE;case 35675:return gE;case 35676:return _E;case 5124:case 35670:return vE;case 35667:case 35671:return xE;case 35668:case 35672:return yE;case 35669:case 35673:return ME;case 5125:return SE;case 36294:return EE;case 36295:return wE;case 36296:return bE;case 35678:case 36198:case 36298:case 36306:case 35682:return TE;case 35679:case 36299:case 36307:return AE;case 35680:case 36300:case 36308:case 36293:return CE;case 36289:case 36303:case 36311:case 36292:return RE}}function LE(n,t){n.uniform1fv(this.addr,t)}function DE(n,t){const e=Br(t,this.size,2);n.uniform2fv(this.addr,e)}function IE(n,t){const e=Br(t,this.size,3);n.uniform3fv(this.addr,e)}function UE(n,t){const e=Br(t,this.size,4);n.uniform4fv(this.addr,e)}function NE(n,t){const e=Br(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function FE(n,t){const e=Br(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function OE(n,t){const e=Br(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function BE(n,t){n.uniform1iv(this.addr,t)}function zE(n,t){n.uniform2iv(this.addr,t)}function kE(n,t){n.uniform3iv(this.addr,t)}function HE(n,t){n.uniform4iv(this.addr,t)}function GE(n,t){n.uniform1uiv(this.addr,t)}function VE(n,t){n.uniform2uiv(this.addr,t)}function WE(n,t){n.uniform3uiv(this.addr,t)}function $E(n,t){n.uniform4uiv(this.addr,t)}function XE(n,t,e){const i=this.cache,r=t.length,s=ga(e,r);Ee(i,s)||(n.uniform1iv(this.addr,s),we(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||gp,s[o])}function qE(n,t,e){const i=this.cache,r=t.length,s=ga(e,r);Ee(i,s)||(n.uniform1iv(this.addr,s),we(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||vp,s[o])}function YE(n,t,e){const i=this.cache,r=t.length,s=ga(e,r);Ee(i,s)||(n.uniform1iv(this.addr,s),we(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||xp,s[o])}function jE(n,t,e){const i=this.cache,r=t.length,s=ga(e,r);Ee(i,s)||(n.uniform1iv(this.addr,s),we(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||_p,s[o])}function ZE(n){switch(n){case 5126:return LE;case 35664:return DE;case 35665:return IE;case 35666:return UE;case 35674:return NE;case 35675:return FE;case 35676:return OE;case 5124:case 35670:return BE;case 35667:case 35671:return zE;case 35668:case 35672:return kE;case 35669:case 35673:return HE;case 5125:return GE;case 36294:return VE;case 36295:return WE;case 36296:return $E;case 35678:case 36198:case 36298:case 36306:case 35682:return XE;case 35679:case 36299:case 36307:return qE;case 35680:case 36300:case 36308:case 36293:return YE;case 36289:case 36303:case 36311:case 36292:return jE}}class KE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=PE(e.type)}}class JE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ZE(e.type)}}class QE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const Qa=/(\w+)(\])?(\[|\.)?/g;function qh(n,t){n.seq.push(t),n.map[t.id]=t}function tw(n,t,e){const i=n.name,r=i.length;for(Qa.lastIndex=0;;){const s=Qa.exec(i),o=Qa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){qh(e,c===void 0?new KE(a,n,t):new JE(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new QE(a),qh(e,d)),e=d}}}class Lo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);tw(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Yh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ew=37297;let nw=0;function iw(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const jh=new Ft;function rw(n){jt._getMatrix(jh,jt.workingColorSpace,n);const t=`mat3( ${jh.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(n)){case pa:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Zh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+iw(n.getShaderSource(t),o)}else return r}function sw(n,t){const e=rw(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ow(n,t){let e;switch(t){case lx:e="Linear";break;case cx:e="Reinhard";break;case ux:e="Cineon";break;case hx:e="ACESFilmic";break;case fx:e="AgX";break;case px:e="Neutral";break;case dx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const lo=new I;function aw(){jt.getLuminanceCoefficients(lo);const n=lo.x.toFixed(4),t=lo.y.toFixed(4),e=lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(as).join(`
`)}function cw(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function uw(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function as(n){return n!==""}function Kh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(n){return n.replace(hw,fw)}const dw=new Map;function fw(n,t){let e=Bt[t];if(e===void 0){const i=dw.get(t);if(i!==void 0)e=Bt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Pc(e)}const pw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(n){return n.replace(pw,mw)}function mw(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function td(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function gw(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Vf?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Hv?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function _w(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Lr:case Dr:t="ENVMAP_TYPE_CUBE";break;case fa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function vw(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Dr:t="ENVMAP_MODE_REFRACTION";break}return t}function xw(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wf:t="ENVMAP_BLENDING_MULTIPLY";break;case ox:t="ENVMAP_BLENDING_MIX";break;case ax:t="ENVMAP_BLENDING_ADD";break}return t}function yw(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Mw(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=gw(e),c=_w(e),u=vw(e),d=xw(e),h=yw(e),f=lw(e),m=cw(s),_=r.createProgram();let g,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(as).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(as).join(`
`),p.length>0&&(p+=`
`)):(g=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(as).join(`
`),p=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gi?"#define TONE_MAPPING":"",e.toneMapping!==gi?Bt.tonemapping_pars_fragment:"",e.toneMapping!==gi?ow("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,sw("linearToOutputTexel",e.outputColorSpace),aw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(as).join(`
`)),o=Pc(o),o=Kh(o,e),o=Jh(o,e),a=Pc(a),a=Kh(a,e),a=Jh(a,e),o=Qh(o),a=Qh(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=v+g+o,y=v+p+a,L=Yh(r,r.VERTEX_SHADER,x),A=Yh(r,r.FRAGMENT_SHADER,y);r.attachShader(_,L),r.attachShader(_,A),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(_).trim(),B=r.getShaderInfoLog(L).trim(),k=r.getShaderInfoLog(A).trim();let P=!0,H=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,L,A);else{const X=Zh(r,L,"vertex"),G=Zh(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+X+`
`+G)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(B===""||k==="")&&(H=!1);H&&(C.diagnostics={runnable:P,programLog:N,vertexShader:{log:B,prefix:g},fragmentShader:{log:k,prefix:p}})}r.deleteShader(L),r.deleteShader(A),D=new Lo(r,_),b=uw(r,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,ew)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=nw++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=A,this}let Sw=0;class Ew{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new ww(t),e.set(t,i)),i}}class ww{constructor(t){this.id=Sw++,this.code=t,this.usedTimes=0}}function bw(n,t,e,i,r,s,o){const a=new Qc,l=new Ew,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let f=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,S,C,N,B){const k=N.fog,P=B.geometry,H=b.isMeshStandardMaterial?N.environment:null,X=(b.isMeshStandardMaterial?e:t).get(b.envMap||H),G=X&&X.mapping===fa?X.image.height:null,Q=m[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const it=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,pt=it!==void 0?it.length:0;let Pt=0;P.morphAttributes.position!==void 0&&(Pt=1),P.morphAttributes.normal!==void 0&&(Pt=2),P.morphAttributes.color!==void 0&&(Pt=3);let kt,Y,tt,yt;if(Q){const ee=We[Q];kt=ee.vertexShader,Y=ee.fragmentShader}else kt=b.vertexShader,Y=b.fragmentShader,l.update(b),tt=l.getVertexShaderID(b),yt=l.getFragmentShaderID(b);const lt=n.getRenderTarget(),Ct=n.state.buffers.depth.getReversed(),It=B.isInstancedMesh===!0,Ht=B.isBatchedMesh===!0,_e=!!b.map,qt=!!b.matcap,xe=!!X,z=!!b.aoMap,tn=!!b.lightMap,Gt=!!b.bumpMap,Vt=!!b.normalMap,Tt=!!b.displacementMap,pe=!!b.emissiveMap,bt=!!b.metalnessMap,T=!!b.roughnessMap,M=b.anisotropy>0,V=b.clearcoat>0,Z=b.dispersion>0,J=b.iridescence>0,j=b.sheen>0,Mt=b.transmission>0,ct=M&&!!b.anisotropyMap,ft=V&&!!b.clearcoatMap,Yt=V&&!!b.clearcoatNormalMap,et=V&&!!b.clearcoatRoughnessMap,mt=J&&!!b.iridescenceMap,At=J&&!!b.iridescenceThicknessMap,Lt=j&&!!b.sheenColorMap,gt=j&&!!b.sheenRoughnessMap,Wt=!!b.specularMap,Ot=!!b.specularColorMap,oe=!!b.specularIntensityMap,U=Mt&&!!b.transmissionMap,ot=Mt&&!!b.thicknessMap,q=!!b.gradientMap,K=!!b.alphaMap,dt=b.alphaTest>0,ut=!!b.alphaHash,Ut=!!b.extensions;let ve=gi;b.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Pe={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:kt,fragmentShader:Y,defines:b.defines,customVertexShaderID:tt,customFragmentShaderID:yt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ht,batchingColor:Ht&&B._colorsTexture!==null,instancing:It,instancingColor:It&&B.instanceColor!==null,instancingMorph:It&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:lt===null?n.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Fr,alphaToCoverage:!!b.alphaToCoverage,map:_e,matcap:qt,envMap:xe,envMapMode:xe&&X.mapping,envMapCubeUVHeight:G,aoMap:z,lightMap:tn,bumpMap:Gt,normalMap:Vt,displacementMap:h&&Tt,emissiveMap:pe,normalMapObjectSpace:Vt&&b.normalMapType===xx,normalMapTangentSpace:Vt&&b.normalMapType===vx,metalnessMap:bt,roughnessMap:T,anisotropy:M,anisotropyMap:ct,clearcoat:V,clearcoatMap:ft,clearcoatNormalMap:Yt,clearcoatRoughnessMap:et,dispersion:Z,iridescence:J,iridescenceMap:mt,iridescenceThicknessMap:At,sheen:j,sheenColorMap:Lt,sheenRoughnessMap:gt,specularMap:Wt,specularColorMap:Ot,specularIntensityMap:oe,transmission:Mt,transmissionMap:U,thicknessMap:ot,gradientMap:q,opaque:b.transparent===!1&&b.blending===Mr&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:dt,alphaHash:ut,combine:b.combine,mapUv:_e&&_(b.map.channel),aoMapUv:z&&_(b.aoMap.channel),lightMapUv:tn&&_(b.lightMap.channel),bumpMapUv:Gt&&_(b.bumpMap.channel),normalMapUv:Vt&&_(b.normalMap.channel),displacementMapUv:Tt&&_(b.displacementMap.channel),emissiveMapUv:pe&&_(b.emissiveMap.channel),metalnessMapUv:bt&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:ct&&_(b.anisotropyMap.channel),clearcoatMapUv:ft&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:At&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(b.sheenRoughnessMap.channel),specularMapUv:Wt&&_(b.specularMap.channel),specularColorMapUv:Ot&&_(b.specularColorMap.channel),specularIntensityMapUv:oe&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ot&&_(b.thicknessMap.channel),alphaMapUv:K&&_(b.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Vt||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!P.attributes.uv&&(_e||K),fog:!!k,useFog:b.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ct,skinning:B.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:Pt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:_e&&b.map.isVideoTexture===!0&&jt.getTransfer(b.map.colorSpace)===ie,decodeVideoTextureEmissive:pe&&b.emissiveMap.isVideoTexture===!0&&jt.getTransfer(b.emissiveMap.colorSpace)===ie,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Pn,flipSided:b.side===Xe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ut&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&b.extensions.multiDraw===!0||Ht)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)S.push(C),S.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(v(S,b),x(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function v(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function x(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const S=m[b.type];let C;if(S){const N=We[S];C=tu.clone(N.uniforms)}else C=b.uniforms;return C}function L(b,S){let C;for(let N=0,B=u.length;N<B;N++){const k=u[N];if(k.cacheKey===S){C=k,++C.usedTimes;break}}return C===void 0&&(C=new Mw(n,S,b,s),u.push(C)),C}function A(b){if(--b.usedTimes===0){const S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:L,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:D}}function Tw(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Aw(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function ed(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function nd(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(d,h,f,m,_,g){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},n[t]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function a(d,h,f,m,_,g){const p=o(d,h,f,m,_,g);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):e.push(p)}function l(d,h,f,m,_,g){const p=o(d,h,f,m,_,g);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):e.unshift(p)}function c(d,h){e.length>1&&e.sort(d||Aw),i.length>1&&i.sort(h||ed),r.length>1&&r.sort(h||ed)}function u(){for(let d=t,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Cw(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new nd,n.set(i,[o])):r>=s.length?(o=new nd,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Rw(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Jt};break;case"SpotLight":e={position:new I,direction:new I,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function Pw(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Lw=0;function Dw(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Iw(n){const t=new Rw,e=Pw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const r=new I,s=new fe,o=new fe;function a(c){let u=0,d=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,v=0,x=0,y=0,L=0,A=0,R=0;c.sort(Dw);for(let b=0,S=c.length;b<S;b++){const C=c[b],N=C.color,B=C.intensity,k=C.distance,P=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=N.r*B,d+=N.g*B,h+=N.b*B;else if(C.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(C.sh.coefficients[H],B);R++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const X=C.shadow,G=e.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=P,i.directionalShadowMatrix[f]=C.shadow.matrix,v++}i.directional[f]=H,f++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(N).multiplyScalar(B),H.distance=k,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,i.spot[_]=H;const X=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,X.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[_]=X.matrix,C.castShadow){const G=e.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=P,y++}_++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(N).multiplyScalar(B),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),i.rectArea[g]=H,g++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const X=C.shadow,G=e.get(C);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,G.shadowCameraNear=X.camera.near,G.shadowCameraFar=X.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=P,i.pointShadowMatrix[m]=C.shadow.matrix,x++}i.point[m]=H,m++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(B),H.groundColor.copy(C.groundColor).multiplyScalar(B),i.hemi[p]=H,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const D=i.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==v||D.numPointShadows!==x||D.numSpotShadows!==y||D.numSpotMaps!==L||D.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=v,D.numPointShadows=x,D.numSpotShadows=y,D.numSpotMaps=L,D.numLightProbes=R,i.version=Lw++)}function l(c,u){let d=0,h=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const x=c[p];if(x.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),d++}else if(x.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:i}}function id(n){const t=new Iw(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Uw(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new id(n),t.set(r,[a])):s>=o.length?(a=new id(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Nw extends Cs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=gx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Fw extends Cs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ow=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zw(n,t,e){let i=new dp;const r=new Rt,s=new Rt,o=new he,a=new Nw({depthPacking:_x}),l=new Fw,c={},u=e.maxTextureSize,d={[vi]:Xe,[Xe]:vi,[Pn]:Pn},h=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:Ow,fragmentShader:Bw}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new He;m.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ze(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vf;let p=this.type;this.render=function(A,R,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const b=n.getRenderTarget(),S=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(mi),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const B=p!==qn&&this.type===qn,k=p===qn&&this.type!==qn;for(let P=0,H=A.length;P<H;P++){const X=A[P],G=X.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const Q=G.getFrameExtents();if(r.multiply(Q),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,G.mapSize.y=s.y)),G.map===null||B===!0||k===!0){const pt=this.type!==qn?{minFilter:qe,magFilter:qe}:{};G.map!==null&&G.map.dispose(),G.map=new Yi(r.x,r.y,pt),G.map.texture.name=X.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const it=G.getViewportCount();for(let pt=0;pt<it;pt++){const Pt=G.getViewport(pt);o.set(s.x*Pt.x,s.y*Pt.y,s.x*Pt.z,s.y*Pt.w),N.viewport(o),G.updateMatrices(X,pt),i=G.getFrustum(),y(R,D,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===qn&&v(G,D),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,S,C)};function v(A,R){const D=t.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Yi(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,D,h,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,D,f,_,null)}function x(A,R,D,b){let S=null;const C=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)S=C;else if(S=D.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const N=S.uuid,B=R.uuid;let k=c[N];k===void 0&&(k={},c[N]=k);let P=k[B];P===void 0&&(P=S.clone(),k[B]=P,R.addEventListener("dispose",L)),S=P}if(S.visible=R.visible,S.wireframe=R.wireframe,b===qn?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:d[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const N=n.properties.get(S);N.light=D}return S}function y(A,R,D,b,S){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===qn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const B=t.update(A),k=A.material;if(Array.isArray(k)){const P=B.groups;for(let H=0,X=P.length;H<X;H++){const G=P[H],Q=k[G.materialIndex];if(Q&&Q.visible){const it=x(A,Q,b,S);A.onBeforeShadow(n,A,R,D,B,it,G),n.renderBufferDirect(D,null,B,it,A,G),A.onAfterShadow(n,A,R,D,B,it,G)}}}else if(k.visible){const P=x(A,k,b,S);A.onBeforeShadow(n,A,R,D,B,P,null),n.renderBufferDirect(D,null,B,P,A,null),A.onAfterShadow(n,A,R,D,B,P,null)}}const N=A.children;for(let B=0,k=N.length;B<k;B++)y(N[B],R,D,b,S)}function L(A){A.target.removeEventListener("dispose",L);for(const D in c){const b=c[D],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const kw={[Xl]:ql,[Yl]:Kl,[jl]:Jl,[Pr]:Zl,[ql]:Xl,[Kl]:Yl,[Jl]:jl,[Zl]:Pr};function Hw(n,t){function e(){let U=!1;const ot=new he;let q=null;const K=new he(0,0,0,0);return{setMask:function(dt){q!==dt&&!U&&(n.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){U=dt},setClear:function(dt,ut,Ut,ve,Pe){Pe===!0&&(dt*=ve,ut*=ve,Ut*=ve),ot.set(dt,ut,Ut,ve),K.equals(ot)===!1&&(n.clearColor(dt,ut,Ut,ve),K.copy(ot))},reset:function(){U=!1,q=null,K.set(-1,0,0,0)}}}function i(){let U=!1,ot=!1,q=null,K=null,dt=null;return{setReversed:function(ut){if(ot!==ut){const Ut=t.get("EXT_clip_control");ot?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const ve=dt;dt=null,this.setClear(ve)}ot=ut},getReversed:function(){return ot},setTest:function(ut){ut?lt(n.DEPTH_TEST):Ct(n.DEPTH_TEST)},setMask:function(ut){q!==ut&&!U&&(n.depthMask(ut),q=ut)},setFunc:function(ut){if(ot&&(ut=kw[ut]),K!==ut){switch(ut){case Xl:n.depthFunc(n.NEVER);break;case ql:n.depthFunc(n.ALWAYS);break;case Yl:n.depthFunc(n.LESS);break;case Pr:n.depthFunc(n.LEQUAL);break;case jl:n.depthFunc(n.EQUAL);break;case Zl:n.depthFunc(n.GEQUAL);break;case Kl:n.depthFunc(n.GREATER);break;case Jl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=ut}},setLocked:function(ut){U=ut},setClear:function(ut){dt!==ut&&(ot&&(ut=1-ut),n.clearDepth(ut),dt=ut)},reset:function(){U=!1,q=null,K=null,dt=null,ot=!1}}}function r(){let U=!1,ot=null,q=null,K=null,dt=null,ut=null,Ut=null,ve=null,Pe=null;return{setTest:function(ee){U||(ee?lt(n.STENCIL_TEST):Ct(n.STENCIL_TEST))},setMask:function(ee){ot!==ee&&!U&&(n.stencilMask(ee),ot=ee)},setFunc:function(ee,ln,Bn){(q!==ee||K!==ln||dt!==Bn)&&(n.stencilFunc(ee,ln,Bn),q=ee,K=ln,dt=Bn)},setOp:function(ee,ln,Bn){(ut!==ee||Ut!==ln||ve!==Bn)&&(n.stencilOp(ee,ln,Bn),ut=ee,Ut=ln,ve=Bn)},setLocked:function(ee){U=ee},setClear:function(ee){Pe!==ee&&(n.clearStencil(ee),Pe=ee)},reset:function(){U=!1,ot=null,q=null,K=null,dt=null,ut=null,Ut=null,ve=null,Pe=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],m=null,_=!1,g=null,p=null,v=null,x=null,y=null,L=null,A=null,R=new Jt(0,0,0),D=0,b=!1,S=null,C=null,N=null,B=null,k=null;const P=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,X=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=X>=1):G.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=X>=2);let Q=null,it={};const pt=n.getParameter(n.SCISSOR_BOX),Pt=n.getParameter(n.VIEWPORT),kt=new he().fromArray(pt),Y=new he().fromArray(Pt);function tt(U,ot,q,K){const dt=new Uint8Array(4),ut=n.createTexture();n.bindTexture(U,ut),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ut=0;Ut<q;Ut++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ot,0,n.RGBA,1,1,K,0,n.RGBA,n.UNSIGNED_BYTE,dt):n.texImage2D(ot+Ut,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,dt);return ut}const yt={};yt[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),yt[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),yt[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),lt(n.DEPTH_TEST),o.setFunc(Pr),Gt(!1),Vt(ah),lt(n.CULL_FACE),z(mi);function lt(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function Ct(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function It(U,ot){return d[U]!==ot?(n.bindFramebuffer(U,ot),d[U]=ot,U===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ot),U===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ht(U,ot){let q=f,K=!1;if(U){q=h.get(ot),q===void 0&&(q=[],h.set(ot,q));const dt=U.textures;if(q.length!==dt.length||q[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,Ut=dt.length;ut<Ut;ut++)q[ut]=n.COLOR_ATTACHMENT0+ut;q.length=dt.length,K=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,K=!0);K&&n.drawBuffers(q)}function _e(U){return m!==U?(n.useProgram(U),m=U,!0):!1}const qt={[Ui]:n.FUNC_ADD,[Vv]:n.FUNC_SUBTRACT,[Wv]:n.FUNC_REVERSE_SUBTRACT};qt[$v]=n.MIN,qt[Xv]=n.MAX;const xe={[qv]:n.ZERO,[Yv]:n.ONE,[jv]:n.SRC_COLOR,[Wl]:n.SRC_ALPHA,[ex]:n.SRC_ALPHA_SATURATE,[Qv]:n.DST_COLOR,[Kv]:n.DST_ALPHA,[Zv]:n.ONE_MINUS_SRC_COLOR,[$l]:n.ONE_MINUS_SRC_ALPHA,[tx]:n.ONE_MINUS_DST_COLOR,[Jv]:n.ONE_MINUS_DST_ALPHA,[nx]:n.CONSTANT_COLOR,[ix]:n.ONE_MINUS_CONSTANT_COLOR,[rx]:n.CONSTANT_ALPHA,[sx]:n.ONE_MINUS_CONSTANT_ALPHA};function z(U,ot,q,K,dt,ut,Ut,ve,Pe,ee){if(U===mi){_===!0&&(Ct(n.BLEND),_=!1);return}if(_===!1&&(lt(n.BLEND),_=!0),U!==Gv){if(U!==g||ee!==b){if((p!==Ui||y!==Ui)&&(n.blendEquation(n.FUNC_ADD),p=Ui,y=Ui),ee)switch(U){case Mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lh:n.blendFunc(n.ONE,n.ONE);break;case ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case uh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case uh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,x=null,L=null,A=null,R.set(0,0,0),D=0,g=U,b=ee}return}dt=dt||ot,ut=ut||q,Ut=Ut||K,(ot!==p||dt!==y)&&(n.blendEquationSeparate(qt[ot],qt[dt]),p=ot,y=dt),(q!==v||K!==x||ut!==L||Ut!==A)&&(n.blendFuncSeparate(xe[q],xe[K],xe[ut],xe[Ut]),v=q,x=K,L=ut,A=Ut),(ve.equals(R)===!1||Pe!==D)&&(n.blendColor(ve.r,ve.g,ve.b,Pe),R.copy(ve),D=Pe),g=U,b=!1}function tn(U,ot){U.side===Pn?Ct(n.CULL_FACE):lt(n.CULL_FACE);let q=U.side===Xe;ot&&(q=!q),Gt(q),U.blending===Mr&&U.transparent===!1?z(mi):z(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const K=U.stencilWrite;a.setTest(K),K&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),pe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(n.SAMPLE_ALPHA_TO_COVERAGE):Ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(U){S!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),S=U)}function Vt(U){U!==zv?(lt(n.CULL_FACE),U!==C&&(U===ah?n.cullFace(n.BACK):U===kv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ct(n.CULL_FACE),C=U}function Tt(U){U!==N&&(H&&n.lineWidth(U),N=U)}function pe(U,ot,q){U?(lt(n.POLYGON_OFFSET_FILL),(B!==ot||k!==q)&&(n.polygonOffset(ot,q),B=ot,k=q)):Ct(n.POLYGON_OFFSET_FILL)}function bt(U){U?lt(n.SCISSOR_TEST):Ct(n.SCISSOR_TEST)}function T(U){U===void 0&&(U=n.TEXTURE0+P-1),Q!==U&&(n.activeTexture(U),Q=U)}function M(U,ot,q){q===void 0&&(Q===null?q=n.TEXTURE0+P-1:q=Q);let K=it[q];K===void 0&&(K={type:void 0,texture:void 0},it[q]=K),(K.type!==U||K.texture!==ot)&&(Q!==q&&(n.activeTexture(q),Q=q),n.bindTexture(U,ot||yt[U]),K.type=U,K.texture=ot)}function V(){const U=it[Q];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(U){kt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),kt.copy(U))}function gt(U){Y.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Y.copy(U))}function Wt(U,ot){let q=c.get(ot);q===void 0&&(q=new WeakMap,c.set(ot,q));let K=q.get(U);K===void 0&&(K=n.getUniformBlockIndex(ot,U.name),q.set(U,K))}function Ot(U,ot){const K=c.get(ot).get(U);l.get(ot)!==K&&(n.uniformBlockBinding(ot,K,U.__bindingPointIndex),l.set(ot,K))}function oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,it={},d={},h=new WeakMap,f=[],m=null,_=!1,g=null,p=null,v=null,x=null,y=null,L=null,A=null,R=new Jt(0,0,0),D=0,b=!1,S=null,C=null,N=null,B=null,k=null,kt.set(0,0,n.canvas.width,n.canvas.height),Y.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:lt,disable:Ct,bindFramebuffer:It,drawBuffers:Ht,useProgram:_e,setBlending:z,setMaterial:tn,setFlipSided:Gt,setCullFace:Vt,setLineWidth:Tt,setPolygonOffset:pe,setScissorTest:bt,activeTexture:T,bindTexture:M,unbindTexture:V,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:mt,texImage3D:At,updateUBOMapping:Wt,uniformBlockBinding:Ot,texStorage2D:Yt,texStorage3D:et,texSubImage2D:j,texSubImage3D:Mt,compressedTexSubImage2D:ct,compressedTexSubImage3D:ft,scissor:Lt,viewport:gt,reset:oe}}function rd(n,t,e,i){const r=Gw(i);switch(e){case jf:return n*t;case Kf:return n*t;case Jf:return n*t*2;case Qf:return n*t/r.components*r.byteLength;case jc:return n*t/r.components*r.byteLength;case tp:return n*t*2/r.components*r.byteLength;case Zc:return n*t*2/r.components*r.byteLength;case Zf:return n*t*3/r.components*r.byteLength;case an:return n*t*4/r.components*r.byteLength;case Kc:return n*t*4/r.components*r.byteLength;case To:case Ao:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Co:case Ro:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rc:case oc:return Math.max(n,16)*Math.max(t,8)/4;case ic:case sc:return Math.max(n,8)*Math.max(t,8)/2;case ac:case lc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case cc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case hc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case dc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case fc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case pc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case mc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case gc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case _c:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case vc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case xc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case yc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Mc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Sc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ec:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Po:case wc:case bc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ep:case Tc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ac:case Cc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Gw(n){switch(n){case ti:case Xf:return{byteLength:1,components:1};case Es:case qf:case As:return{byteLength:2,components:1};case qc:case Yc:return{byteLength:2,components:4};case qi:case Xc:case Nn:return{byteLength:4,components:1};case Yf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Vw(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Rt,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,M){return f?new OffscreenCanvas(T,M):sa("canvas")}function _(T,M,V){let Z=1;const J=bt(T);if((J.width>V||J.height>V)&&(Z=V/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(Z*J.width),Mt=Math.floor(Z*J.height);d===void 0&&(d=m(j,Mt));const ct=M?m(j,Mt):d;return ct.width=j,ct.height=Mt,ct.getContext("2d").drawImage(T,0,0,j,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+Mt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function v(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(T,M,V,Z,J=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=M;if(M===n.RED&&(V===n.FLOAT&&(j=n.R32F),V===n.HALF_FLOAT&&(j=n.R16F),V===n.UNSIGNED_BYTE&&(j=n.R8)),M===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.R8UI),V===n.UNSIGNED_SHORT&&(j=n.R16UI),V===n.UNSIGNED_INT&&(j=n.R32UI),V===n.BYTE&&(j=n.R8I),V===n.SHORT&&(j=n.R16I),V===n.INT&&(j=n.R32I)),M===n.RG&&(V===n.FLOAT&&(j=n.RG32F),V===n.HALF_FLOAT&&(j=n.RG16F),V===n.UNSIGNED_BYTE&&(j=n.RG8)),M===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RG8UI),V===n.UNSIGNED_SHORT&&(j=n.RG16UI),V===n.UNSIGNED_INT&&(j=n.RG32UI),V===n.BYTE&&(j=n.RG8I),V===n.SHORT&&(j=n.RG16I),V===n.INT&&(j=n.RG32I)),M===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGB8UI),V===n.UNSIGNED_SHORT&&(j=n.RGB16UI),V===n.UNSIGNED_INT&&(j=n.RGB32UI),V===n.BYTE&&(j=n.RGB8I),V===n.SHORT&&(j=n.RGB16I),V===n.INT&&(j=n.RGB32I)),M===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),V===n.UNSIGNED_INT&&(j=n.RGBA32UI),V===n.BYTE&&(j=n.RGBA8I),V===n.SHORT&&(j=n.RGBA16I),V===n.INT&&(j=n.RGBA32I)),M===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),M===n.RGBA){const Mt=J?pa:jt.getTransfer(Z);V===n.FLOAT&&(j=n.RGBA32F),V===n.HALF_FLOAT&&(j=n.RGBA16F),V===n.UNSIGNED_BYTE&&(j=Mt===ie?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(T,M){let V;return T?M===null||M===qi||M===Ir?V=n.DEPTH24_STENCIL8:M===Nn?V=n.DEPTH32F_STENCIL8:M===Es&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===qi||M===Ir?V=n.DEPTH_COMPONENT24:M===Nn?V=n.DEPTH_COMPONENT32F:M===Es&&(V=n.DEPTH_COMPONENT16),V}function L(T,M){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==qe&&T.minFilter!==Un?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function A(T){const M=T.target;M.removeEventListener("dispose",A),D(M),M.isVideoTexture&&u.delete(M)}function R(T){const M=T.target;M.removeEventListener("dispose",R),S(M)}function D(T){const M=i.get(T);if(M.__webglInit===void 0)return;const V=T.source,Z=h.get(V);if(Z){const J=Z[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(T),Object.keys(Z).length===0&&h.delete(V)}i.remove(T)}function b(T){const M=i.get(T);n.deleteTexture(M.__webglTexture);const V=T.source,Z=h.get(V);delete Z[M.__cacheKey],o.memory.textures--}function S(T){const M=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let J=0;J<M.__webglFramebuffer[Z].length;J++)n.deleteFramebuffer(M.__webglFramebuffer[Z][J]);else n.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[Z]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const V=T.textures;for(let Z=0,J=V.length;Z<J;Z++){const j=i.get(V[Z]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(V[Z])}i.remove(T)}let C=0;function N(){C=0}function B(){const T=C;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),C+=1,T}function k(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function P(T,M){const V=i.get(T);if(T.isVideoTexture&&Tt(T),T.isRenderTargetTexture===!1&&T.version>0&&V.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(V,T,M);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+M)}function H(T,M){const V=i.get(T);if(T.version>0&&V.__version!==T.version){Y(V,T,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+M)}function X(T,M){const V=i.get(T);if(T.version>0&&V.__version!==T.version){Y(V,T,M);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+M)}function G(T,M){const V=i.get(T);if(T.version>0&&V.__version!==T.version){tt(V,T,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+M)}const Q={[ec]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[nc]:n.MIRRORED_REPEAT},it={[qe]:n.NEAREST,[mx]:n.NEAREST_MIPMAP_NEAREST,[Gs]:n.NEAREST_MIPMAP_LINEAR,[Un]:n.LINEAR,[Aa]:n.LINEAR_MIPMAP_NEAREST,[ki]:n.LINEAR_MIPMAP_LINEAR},pt={[yx]:n.NEVER,[Tx]:n.ALWAYS,[Mx]:n.LESS,[np]:n.LEQUAL,[Sx]:n.EQUAL,[bx]:n.GEQUAL,[Ex]:n.GREATER,[wx]:n.NOTEQUAL};function Pt(T,M){if(M.type===Nn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Un||M.magFilter===Aa||M.magFilter===Gs||M.magFilter===ki||M.minFilter===Un||M.minFilter===Aa||M.minFilter===Gs||M.minFilter===ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Q[M.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Q[M.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Q[M.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,it[M.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,it[M.minFilter]),M.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,pt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===qe||M.minFilter!==Gs&&M.minFilter!==ki||M.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function kt(T,M){let V=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",A));const Z=M.source;let J=h.get(Z);J===void 0&&(J={},h.set(Z,J));const j=k(M);if(j!==T.__cacheKey){J[j]===void 0&&(J[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),J[j].usedTimes++;const Mt=J[T.__cacheKey];Mt!==void 0&&(J[T.__cacheKey].usedTimes--,Mt.usedTimes===0&&b(M)),T.__cacheKey=j,T.__webglTexture=J[j].texture}return V}function Y(T,M,V){let Z=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=n.TEXTURE_3D);const J=kt(T,M),j=M.source;e.bindTexture(Z,T.__webglTexture,n.TEXTURE0+V);const Mt=i.get(j);if(j.version!==Mt.__version||J===!0){e.activeTexture(n.TEXTURE0+V);const ct=jt.getPrimaries(jt.workingColorSpace),ft=M.colorSpace===hi?null:jt.getPrimaries(M.colorSpace),Yt=M.colorSpace===hi||ct===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let et=_(M.image,!1,r.maxTextureSize);et=pe(M,et);const mt=s.convert(M.format,M.colorSpace),At=s.convert(M.type);let Lt=x(M.internalFormat,mt,At,M.colorSpace,M.isVideoTexture);Pt(Z,M);let gt;const Wt=M.mipmaps,Ot=M.isVideoTexture!==!0,oe=Mt.__version===void 0||J===!0,U=j.dataReady,ot=L(M,et);if(M.isDepthTexture)Lt=y(M.format===Ur,M.type),oe&&(Ot?e.texStorage2D(n.TEXTURE_2D,1,Lt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,Lt,et.width,et.height,0,mt,At,null));else if(M.isDataTexture)if(Wt.length>0){Ot&&oe&&e.texStorage2D(n.TEXTURE_2D,ot,Lt,Wt[0].width,Wt[0].height);for(let q=0,K=Wt.length;q<K;q++)gt=Wt[q],Ot?U&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,At,gt.data):e.texImage2D(n.TEXTURE_2D,q,Lt,gt.width,gt.height,0,mt,At,gt.data);M.generateMipmaps=!1}else Ot?(oe&&e.texStorage2D(n.TEXTURE_2D,ot,Lt,et.width,et.height),U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et.width,et.height,mt,At,et.data)):e.texImage2D(n.TEXTURE_2D,0,Lt,et.width,et.height,0,mt,At,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ot&&oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,Lt,Wt[0].width,Wt[0].height,et.depth);for(let q=0,K=Wt.length;q<K;q++)if(gt=Wt[q],M.format!==an)if(mt!==null)if(Ot){if(U)if(M.layerUpdates.size>0){const dt=rd(gt.width,gt.height,M.format,M.type);for(const ut of M.layerUpdates){const Ut=gt.data.subarray(ut*dt/gt.data.BYTES_PER_ELEMENT,(ut+1)*dt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,ut,gt.width,gt.height,1,mt,Ut)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,et.depth,mt,gt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,Lt,gt.width,gt.height,et.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?U&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,et.depth,mt,At,gt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,q,Lt,gt.width,gt.height,et.depth,0,mt,At,gt.data)}else{Ot&&oe&&e.texStorage2D(n.TEXTURE_2D,ot,Lt,Wt[0].width,Wt[0].height);for(let q=0,K=Wt.length;q<K;q++)gt=Wt[q],M.format!==an?mt!==null?Ot?U&&e.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(n.TEXTURE_2D,q,Lt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?U&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,At,gt.data):e.texImage2D(n.TEXTURE_2D,q,Lt,gt.width,gt.height,0,mt,At,gt.data)}else if(M.isDataArrayTexture)if(Ot){if(oe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,Lt,et.width,et.height,et.depth),U)if(M.layerUpdates.size>0){const q=rd(et.width,et.height,M.format,M.type);for(const K of M.layerUpdates){const dt=et.data.subarray(K*q/et.data.BYTES_PER_ELEMENT,(K+1)*q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,mt,At,dt)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,mt,At,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Lt,et.width,et.height,et.depth,0,mt,At,et.data);else if(M.isData3DTexture)Ot?(oe&&e.texStorage3D(n.TEXTURE_3D,ot,Lt,et.width,et.height,et.depth),U&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,mt,At,et.data)):e.texImage3D(n.TEXTURE_3D,0,Lt,et.width,et.height,et.depth,0,mt,At,et.data);else if(M.isFramebufferTexture){if(oe)if(Ot)e.texStorage2D(n.TEXTURE_2D,ot,Lt,et.width,et.height);else{let q=et.width,K=et.height;for(let dt=0;dt<ot;dt++)e.texImage2D(n.TEXTURE_2D,dt,Lt,q,K,0,mt,At,null),q>>=1,K>>=1}}else if(Wt.length>0){if(Ot&&oe){const q=bt(Wt[0]);e.texStorage2D(n.TEXTURE_2D,ot,Lt,q.width,q.height)}for(let q=0,K=Wt.length;q<K;q++)gt=Wt[q],Ot?U&&e.texSubImage2D(n.TEXTURE_2D,q,0,0,mt,At,gt):e.texImage2D(n.TEXTURE_2D,q,Lt,mt,At,gt);M.generateMipmaps=!1}else if(Ot){if(oe){const q=bt(et);e.texStorage2D(n.TEXTURE_2D,ot,Lt,q.width,q.height)}U&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt,At,et)}else e.texImage2D(n.TEXTURE_2D,0,Lt,mt,At,et);g(M)&&p(Z),Mt.__version=j.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function tt(T,M,V){if(M.image.length!==6)return;const Z=kt(T,M),J=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+V);const j=i.get(J);if(J.version!==j.__version||Z===!0){e.activeTexture(n.TEXTURE0+V);const Mt=jt.getPrimaries(jt.workingColorSpace),ct=M.colorSpace===hi?null:jt.getPrimaries(M.colorSpace),ft=M.colorSpace===hi||Mt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const Yt=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,mt=[];for(let K=0;K<6;K++)!Yt&&!et?mt[K]=_(M.image[K],!0,r.maxCubemapSize):mt[K]=et?M.image[K].image:M.image[K],mt[K]=pe(M,mt[K]);const At=mt[0],Lt=s.convert(M.format,M.colorSpace),gt=s.convert(M.type),Wt=x(M.internalFormat,Lt,gt,M.colorSpace),Ot=M.isVideoTexture!==!0,oe=j.__version===void 0||Z===!0,U=J.dataReady;let ot=L(M,At);Pt(n.TEXTURE_CUBE_MAP,M);let q;if(Yt){Ot&&oe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Wt,At.width,At.height);for(let K=0;K<6;K++){q=mt[K].mipmaps;for(let dt=0;dt<q.length;dt++){const ut=q[dt];M.format!==an?Lt!==null?Ot?U&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ut.width,ut.height,Lt,ut.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Wt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,0,0,ut.width,ut.height,Lt,gt,ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt,Wt,ut.width,ut.height,0,Lt,gt,ut.data)}}}else{if(q=M.mipmaps,Ot&&oe){q.length>0&&ot++;const K=bt(mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Wt,K.width,K.height)}for(let K=0;K<6;K++)if(et){Ot?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,mt[K].width,mt[K].height,Lt,gt,mt[K].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Wt,mt[K].width,mt[K].height,0,Lt,gt,mt[K].data);for(let dt=0;dt<q.length;dt++){const Ut=q[dt].image[K].image;Ot?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Ut.width,Ut.height,Lt,gt,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Wt,Ut.width,Ut.height,0,Lt,gt,Ut.data)}}else{Ot?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Lt,gt,mt[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Wt,Lt,gt,mt[K]);for(let dt=0;dt<q.length;dt++){const ut=q[dt];Ot?U&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,0,0,Lt,gt,ut.image[K]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,dt+1,Wt,Lt,gt,ut.image[K])}}}g(M)&&p(n.TEXTURE_CUBE_MAP),j.__version=J.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function yt(T,M,V,Z,J,j){const Mt=s.convert(V.format,V.colorSpace),ct=s.convert(V.type),ft=x(V.internalFormat,Mt,ct,V.colorSpace),Yt=i.get(M),et=i.get(V);if(et.__renderTarget=M,!Yt.__hasExternalTextures){const mt=Math.max(1,M.width>>j),At=Math.max(1,M.height>>j);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,j,ft,mt,At,M.depth,0,Mt,ct,null):e.texImage2D(J,j,ft,mt,At,0,Mt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Vt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,J,et.__webglTexture,0,Gt(M)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,J,et.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(T,M,V){if(n.bindRenderbuffer(n.RENDERBUFFER,T),M.depthBuffer){const Z=M.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,j=y(M.stencilBuffer,J),Mt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=Gt(M);Vt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,j,M.width,M.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,j,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,j,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Mt,n.RENDERBUFFER,T)}else{const Z=M.textures;for(let J=0;J<Z.length;J++){const j=Z[J],Mt=s.convert(j.format,j.colorSpace),ct=s.convert(j.type),ft=x(j.internalFormat,Mt,ct,j.colorSpace),Yt=Gt(M);V&&Vt(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,ft,M.width,M.height):Vt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Yt,ft,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ft,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ct(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(M.depthTexture);Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),P(M.depthTexture,0);const J=Z.__webglTexture,j=Gt(M);if(M.depthTexture.format===Sr)Vt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(M.depthTexture.format===Ur)Vt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function It(T){const M=i.get(T),V=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=Z}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ct(M.__webglFramebuffer,T)}else if(V){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=n.createRenderbuffer(),lt(M.__webglDepthbuffer[Z],T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=M.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),lt(M.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,J)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ht(T,M,V){const Z=i.get(T);M!==void 0&&yt(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&It(T)}function _e(T){const M=T.texture,V=i.get(T),Z=i.get(M);T.addEventListener("dispose",R);const J=T.textures,j=T.isWebGLCubeRenderTarget===!0,Mt=J.length>1;if(Mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=M.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[ct]=[];for(let ft=0;ft<M.mipmaps.length;ft++)V.__webglFramebuffer[ct][ft]=n.createFramebuffer()}else V.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let ct=0;ct<M.mipmaps.length;ct++)V.__webglFramebuffer[ct]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Mt)for(let ct=0,ft=J.length;ct<ft;ct++){const Yt=i.get(J[ct]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&Vt(T)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const ft=J[ct];V.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[ct]);const Yt=s.convert(ft.format,ft.colorSpace),et=s.convert(ft.type),mt=x(ft.internalFormat,Yt,et,ft.colorSpace,T.isXRRenderTarget===!0),At=Gt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,At,mt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,V.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),lt(V.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Pt(n.TEXTURE_CUBE_MAP,M);for(let ct=0;ct<6;ct++)if(M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)yt(V.__webglFramebuffer[ct][ft],T,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,ft);else yt(V.__webglFramebuffer[ct],T,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);g(M)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let ct=0,ft=J.length;ct<ft;ct++){const Yt=J[ct],et=i.get(Yt);e.bindTexture(n.TEXTURE_2D,et.__webglTexture),Pt(n.TEXTURE_2D,Yt),yt(V.__webglFramebuffer,T,Yt,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),g(Yt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,Z.__webglTexture),Pt(ct,M),M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)yt(V.__webglFramebuffer[ft],T,M,n.COLOR_ATTACHMENT0,ct,ft);else yt(V.__webglFramebuffer,T,M,n.COLOR_ATTACHMENT0,ct,0);g(M)&&p(ct),e.unbindTexture()}T.depthBuffer&&It(T)}function qt(T){const M=T.textures;for(let V=0,Z=M.length;V<Z;V++){const J=M[V];if(g(J)){const j=v(T),Mt=i.get(J).__webglTexture;e.bindTexture(j,Mt),p(j),e.unbindTexture()}}}const xe=[],z=[];function tn(T){if(T.samples>0){if(Vt(T)===!1){const M=T.textures,V=T.width,Z=T.height;let J=n.COLOR_BUFFER_BIT;const j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(T),ct=M.length>1;if(ct)for(let ft=0;ft<M.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let ft=0;ft<M.length;ft++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[ft]);const Yt=i.get(M[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Yt,0)}n.blitFramebuffer(0,0,V,Z,0,0,V,Z,J,n.NEAREST),l===!0&&(xe.length=0,z.length=0,xe.push(n.COLOR_ATTACHMENT0+ft),T.depthBuffer&&T.resolveDepthBuffer===!1&&(xe.push(j),z.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let ft=0;ft<M.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[ft]);const Yt=i.get(M[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Yt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const M=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function Gt(T){return Math.min(r.maxSamples,T.samples)}function Vt(T){const M=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Tt(T){const M=o.render.frame;u.get(T)!==M&&(u.set(T,M),T.update())}function pe(T,M){const V=T.colorSpace,Z=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||V!==Fr&&V!==hi&&(jt.getTransfer(V)===ie?(Z!==an||J!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),M}function bt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=N,this.setTexture2D=P,this.setTexture2DArray=H,this.setTexture3D=X,this.setTextureCube=G,this.rebindTextures=Ht,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=tn,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=Vt}function Ww(n,t){function e(i,r=hi){let s;const o=jt.getTransfer(r);if(i===ti)return n.UNSIGNED_BYTE;if(i===qc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Yc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xf)return n.BYTE;if(i===qf)return n.SHORT;if(i===Es)return n.UNSIGNED_SHORT;if(i===Xc)return n.INT;if(i===qi)return n.UNSIGNED_INT;if(i===Nn)return n.FLOAT;if(i===As)return n.HALF_FLOAT;if(i===jf)return n.ALPHA;if(i===Zf)return n.RGB;if(i===an)return n.RGBA;if(i===Kf)return n.LUMINANCE;if(i===Jf)return n.LUMINANCE_ALPHA;if(i===Sr)return n.DEPTH_COMPONENT;if(i===Ur)return n.DEPTH_STENCIL;if(i===Qf)return n.RED;if(i===jc)return n.RED_INTEGER;if(i===tp)return n.RG;if(i===Zc)return n.RG_INTEGER;if(i===Kc)return n.RGBA_INTEGER;if(i===To||i===Ao||i===Co||i===Ro)if(o===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===To)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===To)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ao)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ro)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ic||i===rc||i===sc||i===oc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ic)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===sc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===oc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ac||i===lc||i===cc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ac||i===lc)return o===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===cc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===uc||i===hc||i===dc||i===fc||i===pc||i===mc||i===gc||i===_c||i===vc||i===xc||i===yc||i===Mc||i===Sc||i===Ec)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===uc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_c)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Sc)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ec)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Po||i===wc||i===bc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Po)return o===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ep||i===Tc||i===Ac||i===Cc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Po)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Tc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ac)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ir?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class $w extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class An extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xw={type:"move"};class tl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,i),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xw)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new An;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const qw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ne,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Mn({vertexShader:qw,fragmentShader:Yw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new Ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zw extends Zi{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null;const _=new jw,g=e.getContextAttributes();let p=null,v=null;const x=[],y=[],L=new Rt;let A=null;const R=new mn;R.viewport=new he;const D=new mn;D.viewport=new he;const b=[R,D],S=new $w;let C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=x[Y];return tt===void 0&&(tt=new tl,x[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=x[Y];return tt===void 0&&(tt=new tl,x[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=x[Y];return tt===void 0&&(tt=new tl,x[Y]=tt),tt.getHandSpace()};function B(Y){const tt=y.indexOf(Y.inputSource);if(tt===-1)return;const yt=x[tt];yt!==void 0&&(yt.update(Y.inputSource,Y.frame,c||o),yt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",P);for(let Y=0;Y<x.length;Y++){const tt=y[Y];tt!==null&&(y[Y]=null,x[Y].disconnect(tt))}C=null,N=null,_.reset(),t.setRenderTarget(p),f=null,h=null,d=null,r=null,v=null,kt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",k),r.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),r.renderState.layers===void 0){const tt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,e,tt),r.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Yi(f.framebufferWidth,f.framebufferHeight,{format:an,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let tt=null,yt=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=g.stencil?Ur:Sr,yt=g.stencil?Ir:qi);const Ct={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:s};d=new XRWebGLBinding(r,e),h=d.createProjectionLayer(Ct),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new Yi(h.textureWidth,h.textureHeight,{format:an,type:ti,depthTexture:new mp(h.textureWidth,h.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),kt.setContext(r),kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function P(Y){for(let tt=0;tt<Y.removed.length;tt++){const yt=Y.removed[tt],lt=y.indexOf(yt);lt>=0&&(y[lt]=null,x[lt].disconnect(yt))}for(let tt=0;tt<Y.added.length;tt++){const yt=Y.added[tt];let lt=y.indexOf(yt);if(lt===-1){for(let It=0;It<x.length;It++)if(It>=y.length){y.push(yt),lt=It;break}else if(y[It]===null){y[It]=yt,lt=It;break}if(lt===-1)break}const Ct=x[lt];Ct&&Ct.connect(yt)}}const H=new I,X=new I;function G(Y,tt,yt){H.setFromMatrixPosition(tt.matrixWorld),X.setFromMatrixPosition(yt.matrixWorld);const lt=H.distanceTo(X),Ct=tt.projectionMatrix.elements,It=yt.projectionMatrix.elements,Ht=Ct[14]/(Ct[10]-1),_e=Ct[14]/(Ct[10]+1),qt=(Ct[9]+1)/Ct[5],xe=(Ct[9]-1)/Ct[5],z=(Ct[8]-1)/Ct[0],tn=(It[8]+1)/It[0],Gt=Ht*z,Vt=Ht*tn,Tt=lt/(-z+tn),pe=Tt*-z;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(pe),Y.translateZ(Tt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ct[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const bt=Ht+Tt,T=_e+Tt,M=Gt-pe,V=Vt+(lt-pe),Z=qt*_e/T*bt,J=xe*_e/T*bt;Y.projectionMatrix.makePerspective(M,V,Z,J,bt,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Q(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let tt=Y.near,yt=Y.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(yt=_.depthFar)),S.near=D.near=R.near=tt,S.far=D.far=R.far=yt,(C!==S.near||N!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,N=S.far),R.layers.mask=Y.layers.mask|2,D.layers.mask=Y.layers.mask|4,S.layers.mask=R.layers.mask|D.layers.mask;const lt=Y.parent,Ct=S.cameras;Q(S,lt);for(let It=0;It<Ct.length;It++)Q(Ct[It],lt);Ct.length===2?G(S,R,D):S.projectionMatrix.copy(R.projectionMatrix),it(Y,S,lt)};function it(Y,tt,yt){yt===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(yt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ws*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let pt=null;function Pt(Y,tt){if(u=tt.getViewerPose(c||o),m=tt,u!==null){const yt=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let lt=!1;yt.length!==S.cameras.length&&(S.cameras.length=0,lt=!0);for(let It=0;It<yt.length;It++){const Ht=yt[It];let _e=null;if(f!==null)_e=f.getViewport(Ht);else{const xe=d.getViewSubImage(h,Ht);_e=xe.viewport,It===0&&(t.setRenderTargetTextures(v,xe.colorTexture,h.ignoreDepthValues?void 0:xe.depthStencilTexture),t.setRenderTarget(v))}let qt=b[It];qt===void 0&&(qt=new mn,qt.layers.enable(It),qt.viewport=new he,b[It]=qt),qt.matrix.fromArray(Ht.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(Ht.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(_e.x,_e.y,_e.width,_e.height),It===0&&(S.matrix.copy(qt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),lt===!0&&S.cameras.push(qt)}const Ct=r.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const It=d.getDepthInformation(yt[0]);It&&It.isValid&&It.texture&&_.init(t,It,r.renderState)}}for(let yt=0;yt<x.length;yt++){const lt=y[yt],Ct=x[yt];lt!==null&&Ct!==void 0&&Ct.update(lt,tt,c||o)}pt&&pt(Y,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),m=null}const kt=new fp;kt.setAnimationLoop(Pt),this.setAnimationLoop=function(Y){pt=Y},this.dispose=function(){}}}const Ci=new ei,Kw=new fe;function Jw(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,cp(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,v,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,v,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=t.get(p),x=v.envMap,y=v.envMapRotation;x&&(g.envMap.value=x,Ci.copy(y),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),g.envMapRotation.value.setFromMatrix4(Kw.makeRotationFromEuler(Ci)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=x*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Qw(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){const y=x.program;i.uniformBlockBinding(v,y)}function c(v,x){let y=r[v.id];y===void 0&&(m(v),y=u(v),r[v.id]=y,v.addEventListener("dispose",g));const L=x.program;i.updateUBOMapping(v,L);const A=t.render.frame;s[v.id]!==A&&(h(v),s[v.id]=A)}function u(v){const x=d();v.__bindingPointIndex=x;const y=n.createBuffer(),L=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const x=r[v.id],y=v.uniforms,L=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,R=y.length;A<R;A++){const D=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,S=D.length;b<S;b++){const C=D[b];if(f(C,A,b,L)===!0){const N=C.__offset,B=Array.isArray(C.value)?C.value:[C.value];let k=0;for(let P=0;P<B.length;P++){const H=B[P],X=_(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,N+k,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,k),k+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,x,y,L){const A=v.value,R=x+"_"+y;if(L[R]===void 0)return typeof A=="number"||typeof A=="boolean"?L[R]=A:L[R]=A.clone(),!0;{const D=L[R];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return L[R]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function m(v){const x=v.uniforms;let y=0;const L=16;for(let R=0,D=x.length;R<D;R++){const b=Array.isArray(x[R])?x[R]:[x[R]];for(let S=0,C=b.length;S<C;S++){const N=b[S],B=Array.isArray(N.value)?N.value:[N.value];for(let k=0,P=B.length;k<P;k++){const H=B[k],X=_(H),G=y%L,Q=G%X.boundary,it=G+Q;y+=Q,it!==0&&L-it<X.storage&&(y+=L-it),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=X.storage}}}const A=y%L;return A>0&&(y+=L-A),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function p(){for(const v in r)n.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class tb{constructor(t={}){const{canvas:e=Vx(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const v=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Je,this.toneMapping=gi,this.toneMappingExposure=1;const y=this;let L=!1,A=0,R=0,D=null,b=-1,S=null;const C=new he,N=new he;let B=null;const k=new Jt(0);let P=0,H=e.width,X=e.height,G=1,Q=null,it=null;const pt=new he(0,0,H,X),Pt=new he(0,0,H,X);let kt=!1;const Y=new dp;let tt=!1,yt=!1;const lt=new fe,Ct=new fe,It=new I,Ht=new he,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function xe(){return D===null?G:1}let z=i;function tn(w,F){return e.getContext(w,F)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$c}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),z===null){const F="webgl2";if(z=tn(F,w),z===null)throw tn(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Gt,Vt,Tt,pe,bt,T,M,V,Z,J,j,Mt,ct,ft,Yt,et,mt,At,Lt,gt,Wt,Ot,oe,U;function ot(){Gt=new sE(z),Gt.init(),Ot=new Ww(z,Gt),Vt=new QS(z,Gt,t,Ot),Tt=new Hw(z,Gt),Vt.reverseDepthBuffer&&h&&Tt.buffers.depth.setReversed(!0),pe=new lE(z),bt=new Tw,T=new Vw(z,Gt,Tt,bt,Vt,Ot,pe),M=new eE(y),V=new rE(y),Z=new my(z),oe=new KS(z,Z),J=new oE(z,Z,pe,oe),j=new uE(z,J,Z,pe),Lt=new cE(z,Vt,T),et=new tE(bt),Mt=new bw(y,M,V,Gt,Vt,oe,et),ct=new Jw(y,bt),ft=new Cw,Yt=new Uw(Gt),At=new ZS(y,M,V,Tt,j,f,l),mt=new zw(y,j,Vt),U=new Qw(z,pe,Vt,Tt),gt=new JS(z,Gt,pe),Wt=new aE(z,Gt,pe),pe.programs=Mt.programs,y.capabilities=Vt,y.extensions=Gt,y.properties=bt,y.renderLists=ft,y.shadowMap=mt,y.state=Tt,y.info=pe}ot();const q=new Zw(y,z);this.xr=q,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const w=Gt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Gt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(H,X,!1))},this.getSize=function(w){return w.set(H,X)},this.setSize=function(w,F,W=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=w,X=F,e.width=Math.floor(w*G),e.height=Math.floor(F*G),W===!0&&(e.style.width=w+"px",e.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(H*G,X*G).floor()},this.setDrawingBufferSize=function(w,F,W){H=w,X=F,G=W,e.width=Math.floor(w*W),e.height=Math.floor(F*W),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(C)},this.getViewport=function(w){return w.copy(pt)},this.setViewport=function(w,F,W,$){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,F,W,$),Tt.viewport(C.copy(pt).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(Pt)},this.setScissor=function(w,F,W,$){w.isVector4?Pt.set(w.x,w.y,w.z,w.w):Pt.set(w,F,W,$),Tt.scissor(N.copy(Pt).multiplyScalar(G).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(w){Tt.setScissorTest(kt=w)},this.setOpaqueSort=function(w){Q=w},this.setTransparentSort=function(w){it=w},this.getClearColor=function(w){return w.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(w=!0,F=!0,W=!0){let $=0;if(w){let O=!1;if(D!==null){const nt=D.texture.format;O=nt===Kc||nt===Zc||nt===jc}if(O){const nt=D.texture.type,ht=nt===ti||nt===qi||nt===Es||nt===Ir||nt===qc||nt===Yc,_t=At.getClearColor(),vt=At.getClearAlpha(),Dt=_t.r,Nt=_t.g,xt=_t.b;ht?(m[0]=Dt,m[1]=Nt,m[2]=xt,m[3]=vt,z.clearBufferuiv(z.COLOR,0,m)):(_[0]=Dt,_[1]=Nt,_[2]=xt,_[3]=vt,z.clearBufferiv(z.COLOR,0,_))}else $|=z.COLOR_BUFFER_BIT}F&&($|=z.DEPTH_BUFFER_BIT),W&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),ft.dispose(),Yt.dispose(),bt.dispose(),M.dispose(),V.dispose(),j.dispose(),oe.dispose(),U.dispose(),Mt.dispose(),q.dispose(),q.removeEventListener("sessionstart",ru),q.removeEventListener("sessionend",su),Mi.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const w=pe.autoReset,F=mt.enabled,W=mt.autoUpdate,$=mt.needsUpdate,O=mt.type;ot(),pe.autoReset=w,mt.enabled=F,mt.autoUpdate=W,mt.needsUpdate=$,mt.type=O}function ut(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ut(w){const F=w.target;F.removeEventListener("dispose",Ut),ve(F)}function ve(w){Pe(w),bt.remove(w)}function Pe(w){const F=bt.get(w).programs;F!==void 0&&(F.forEach(function(W){Mt.releaseProgram(W)}),w.isShaderMaterial&&Mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,W,$,O,nt){F===null&&(F=_e);const ht=O.isMesh&&O.matrixWorld.determinant()<0,_t=bp(w,F,W,$,O);Tt.setMaterial($,ht);let vt=W.index,Dt=1;if($.wireframe===!0){if(vt=J.getWireframeAttribute(W),vt===void 0)return;Dt=2}const Nt=W.drawRange,xt=W.attributes.position;let Kt=Nt.start*Dt,ae=(Nt.start+Nt.count)*Dt;nt!==null&&(Kt=Math.max(Kt,nt.start*Dt),ae=Math.min(ae,(nt.start+nt.count)*Dt)),vt!==null?(Kt=Math.max(Kt,0),ae=Math.min(ae,vt.count)):xt!=null&&(Kt=Math.max(Kt,0),ae=Math.min(ae,xt.count));const me=ae-Kt;if(me<0||me===1/0)return;oe.setup(O,$,_t,W,vt);let Ge,Qt=gt;if(vt!==null&&(Ge=Z.get(vt),Qt=Wt,Qt.setIndex(Ge)),O.isMesh)$.wireframe===!0?(Tt.setLineWidth($.wireframeLinewidth*xe()),Qt.setMode(z.LINES)):Qt.setMode(z.TRIANGLES);else if(O.isLine){let St=$.linewidth;St===void 0&&(St=1),Tt.setLineWidth(St*xe()),O.isLineSegments?Qt.setMode(z.LINES):O.isLineLoop?Qt.setMode(z.LINE_LOOP):Qt.setMode(z.LINE_STRIP)}else O.isPoints?Qt.setMode(z.POINTS):O.isSprite&&Qt.setMode(z.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Qt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const St=O._multiDrawStarts,zn=O._multiDrawCounts,te=O._multiDrawCount,cn=vt?Z.get(vt).bytesPerElement:1,Ki=bt.get($).currentProgram.getUniforms();for(let je=0;je<te;je++)Ki.setValue(z,"_gl_DrawID",je),Qt.render(St[je]/cn,zn[je])}else if(O.isInstancedMesh)Qt.renderInstances(Kt,me,O.count);else if(W.isInstancedBufferGeometry){const St=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,zn=Math.min(W.instanceCount,St);Qt.renderInstances(Kt,me,zn)}else Qt.render(Kt,me)};function ee(w,F,W){w.transparent===!0&&w.side===Pn&&w.forceSinglePass===!1?(w.side=Xe,w.needsUpdate=!0,Ds(w,F,W),w.side=vi,w.needsUpdate=!0,Ds(w,F,W),w.side=Pn):Ds(w,F,W)}this.compile=function(w,F,W=null){W===null&&(W=w),p=Yt.get(W),p.init(F),x.push(p),W.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),w!==W&&w.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const $=new Set;return w.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const nt=O.material;if(nt)if(Array.isArray(nt))for(let ht=0;ht<nt.length;ht++){const _t=nt[ht];ee(_t,W,O),$.add(_t)}else ee(nt,W,O),$.add(nt)}),x.pop(),p=null,$},this.compileAsync=function(w,F,W=null){const $=this.compile(w,F,W);return new Promise(O=>{function nt(){if($.forEach(function(ht){bt.get(ht).currentProgram.isReady()&&$.delete(ht)}),$.size===0){O(w);return}setTimeout(nt,10)}Gt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ln=null;function Bn(w){ln&&ln(w)}function ru(){Mi.stop()}function su(){Mi.start()}const Mi=new fp;Mi.setAnimationLoop(Bn),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(w){ln=w,q.setAnimationLoop(w),w===null?Mi.stop():Mi.start()},q.addEventListener("sessionstart",ru),q.addEventListener("sessionend",su),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(F),F=q.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,F,D),p=Yt.get(w,x.length),p.init(F),x.push(p),Ct.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(Ct),yt=this.localClippingEnabled,tt=et.init(this.clippingPlanes,yt),g=ft.get(w,v.length),g.init(),v.push(g),q.enabled===!0&&q.isPresenting===!0){const nt=y.xr.getDepthSensingMesh();nt!==null&&_a(nt,F,-1/0,y.sortObjects)}_a(w,F,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(Q,it),qt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,qt&&At.addToRenderList(g,w),this.info.render.frame++,tt===!0&&et.beginShadows();const W=p.state.shadowsArray;mt.render(W,w,F),tt===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const nt=F.cameras;if(O.length>0)for(let ht=0,_t=nt.length;ht<_t;ht++){const vt=nt[ht];au($,O,w,vt)}qt&&At.render(w);for(let ht=0,_t=nt.length;ht<_t;ht++){const vt=nt[ht];ou(g,w,vt,vt.viewport)}}else O.length>0&&au($,O,w,F),qt&&At.render(w),ou(g,w,F);D!==null&&(T.updateMultisampleRenderTarget(D),T.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(y,w,F),oe.resetDefaultState(),b=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],tt===!0&&et.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function _a(w,F,W,$){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Y.intersectsSprite(w)){$&&Ht.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ct);const ht=j.update(w),_t=w.material;_t.visible&&g.push(w,ht,_t,W,Ht.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Y.intersectsObject(w))){const ht=j.update(w),_t=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ht.copy(w.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ht.copy(ht.boundingSphere.center)),Ht.applyMatrix4(w.matrixWorld).applyMatrix4(Ct)),Array.isArray(_t)){const vt=ht.groups;for(let Dt=0,Nt=vt.length;Dt<Nt;Dt++){const xt=vt[Dt],Kt=_t[xt.materialIndex];Kt&&Kt.visible&&g.push(w,ht,Kt,W,Ht.z,xt)}}else _t.visible&&g.push(w,ht,_t,W,Ht.z,null)}}const nt=w.children;for(let ht=0,_t=nt.length;ht<_t;ht++)_a(nt[ht],F,W,$)}function ou(w,F,W,$){const O=w.opaque,nt=w.transmissive,ht=w.transparent;p.setupLightsView(W),tt===!0&&et.setGlobalState(y.clippingPlanes,W),$&&Tt.viewport(C.copy($)),O.length>0&&Ls(O,F,W),nt.length>0&&Ls(nt,F,W),ht.length>0&&Ls(ht,F,W),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function au(w,F,W,$){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new Yi(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?As:ti,minFilter:ki,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const nt=p.state.transmissionRenderTarget[$.id],ht=$.viewport||C;nt.setSize(ht.z,ht.w);const _t=y.getRenderTarget();y.setRenderTarget(nt),y.getClearColor(k),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear(),qt&&At.render(W);const vt=y.toneMapping;y.toneMapping=gi;const Dt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),tt===!0&&et.setGlobalState(y.clippingPlanes,$),Ls(w,W,$),T.updateMultisampleRenderTarget(nt),T.updateRenderTargetMipmap(nt),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let xt=0,Kt=F.length;xt<Kt;xt++){const ae=F[xt],me=ae.object,Ge=ae.geometry,Qt=ae.material,St=ae.group;if(Qt.side===Pn&&me.layers.test($.layers)){const zn=Qt.side;Qt.side=Xe,Qt.needsUpdate=!0,lu(me,W,$,Ge,Qt,St),Qt.side=zn,Qt.needsUpdate=!0,Nt=!0}}Nt===!0&&(T.updateMultisampleRenderTarget(nt),T.updateRenderTargetMipmap(nt))}y.setRenderTarget(_t),y.setClearColor(k,P),Dt!==void 0&&($.viewport=Dt),y.toneMapping=vt}function Ls(w,F,W){const $=F.isScene===!0?F.overrideMaterial:null;for(let O=0,nt=w.length;O<nt;O++){const ht=w[O],_t=ht.object,vt=ht.geometry,Dt=$===null?ht.material:$,Nt=ht.group;_t.layers.test(W.layers)&&lu(_t,F,W,vt,Dt,Nt)}}function lu(w,F,W,$,O,nt){w.onBeforeRender(y,F,W,$,O,nt),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),O.onBeforeRender(y,F,W,$,w,nt),O.transparent===!0&&O.side===Pn&&O.forceSinglePass===!1?(O.side=Xe,O.needsUpdate=!0,y.renderBufferDirect(W,F,$,O,w,nt),O.side=vi,O.needsUpdate=!0,y.renderBufferDirect(W,F,$,O,w,nt),O.side=Pn):y.renderBufferDirect(W,F,$,O,w,nt),w.onAfterRender(y,F,W,$,O,nt)}function Ds(w,F,W){F.isScene!==!0&&(F=_e);const $=bt.get(w),O=p.state.lights,nt=p.state.shadowsArray,ht=O.state.version,_t=Mt.getParameters(w,O.state,nt,F,W),vt=Mt.getProgramCacheKey(_t);let Dt=$.programs;$.environment=w.isMeshStandardMaterial?F.environment:null,$.fog=F.fog,$.envMap=(w.isMeshStandardMaterial?V:M).get(w.envMap||$.environment),$.envMapRotation=$.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Dt===void 0&&(w.addEventListener("dispose",Ut),Dt=new Map,$.programs=Dt);let Nt=Dt.get(vt);if(Nt!==void 0){if($.currentProgram===Nt&&$.lightsStateVersion===ht)return uu(w,_t),Nt}else _t.uniforms=Mt.getUniforms(w),w.onBeforeCompile(_t,y),Nt=Mt.acquireProgram(_t,vt),Dt.set(vt,Nt),$.uniforms=_t.uniforms;const xt=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(xt.clippingPlanes=et.uniform),uu(w,_t),$.needsLights=Ap(w),$.lightsStateVersion=ht,$.needsLights&&(xt.ambientLightColor.value=O.state.ambient,xt.lightProbe.value=O.state.probe,xt.directionalLights.value=O.state.directional,xt.directionalLightShadows.value=O.state.directionalShadow,xt.spotLights.value=O.state.spot,xt.spotLightShadows.value=O.state.spotShadow,xt.rectAreaLights.value=O.state.rectArea,xt.ltc_1.value=O.state.rectAreaLTC1,xt.ltc_2.value=O.state.rectAreaLTC2,xt.pointLights.value=O.state.point,xt.pointLightShadows.value=O.state.pointShadow,xt.hemisphereLights.value=O.state.hemi,xt.directionalShadowMap.value=O.state.directionalShadowMap,xt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,xt.spotShadowMap.value=O.state.spotShadowMap,xt.spotLightMatrix.value=O.state.spotLightMatrix,xt.spotLightMap.value=O.state.spotLightMap,xt.pointShadowMap.value=O.state.pointShadowMap,xt.pointShadowMatrix.value=O.state.pointShadowMatrix),$.currentProgram=Nt,$.uniformsList=null,Nt}function cu(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Lo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function uu(w,F){const W=bt.get(w);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function bp(w,F,W,$,O){F.isScene!==!0&&(F=_e),T.resetTextureUnits();const nt=F.fog,ht=$.isMeshStandardMaterial?F.environment:null,_t=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Fr,vt=($.isMeshStandardMaterial?V:M).get($.envMap||ht),Dt=$.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Nt=!!W.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),xt=!!W.morphAttributes.position,Kt=!!W.morphAttributes.normal,ae=!!W.morphAttributes.color;let me=gi;$.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(me=y.toneMapping);const Ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Qt=Ge!==void 0?Ge.length:0,St=bt.get($),zn=p.state.lights;if(tt===!0&&(yt===!0||w!==S)){const en=w===S&&$.id===b;et.setState($,w,en)}let te=!1;$.version===St.__version?(St.needsLights&&St.lightsStateVersion!==zn.state.version||St.outputColorSpace!==_t||O.isBatchedMesh&&St.batching===!1||!O.isBatchedMesh&&St.batching===!0||O.isBatchedMesh&&St.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&St.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&St.instancing===!1||!O.isInstancedMesh&&St.instancing===!0||O.isSkinnedMesh&&St.skinning===!1||!O.isSkinnedMesh&&St.skinning===!0||O.isInstancedMesh&&St.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&St.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&St.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&St.instancingMorph===!1&&O.morphTexture!==null||St.envMap!==vt||$.fog===!0&&St.fog!==nt||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==et.numPlanes||St.numIntersection!==et.numIntersection)||St.vertexAlphas!==Dt||St.vertexTangents!==Nt||St.morphTargets!==xt||St.morphNormals!==Kt||St.morphColors!==ae||St.toneMapping!==me||St.morphTargetsCount!==Qt)&&(te=!0):(te=!0,St.__version=$.version);let cn=St.currentProgram;te===!0&&(cn=Ds($,F,O));let Ki=!1,je=!1,zr=!1;const ge=cn.getUniforms(),En=St.uniforms;if(Tt.useProgram(cn.program)&&(Ki=!0,je=!0,zr=!0),$.id!==b&&(b=$.id,je=!0),Ki||S!==w){Tt.buffers.depth.getReversed()?(lt.copy(w.projectionMatrix),$x(lt),Xx(lt),ge.setValue(z,"projectionMatrix",lt)):ge.setValue(z,"projectionMatrix",w.projectionMatrix),ge.setValue(z,"viewMatrix",w.matrixWorldInverse);const ni=ge.map.cameraPosition;ni!==void 0&&ni.setValue(z,It.setFromMatrixPosition(w.matrixWorld)),Vt.logarithmicDepthBuffer&&ge.setValue(z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ge.setValue(z,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,je=!0,zr=!0)}if(O.isSkinnedMesh){ge.setOptional(z,O,"bindMatrix"),ge.setOptional(z,O,"bindMatrixInverse");const en=O.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),ge.setValue(z,"boneTexture",en.boneTexture,T))}O.isBatchedMesh&&(ge.setOptional(z,O,"batchingTexture"),ge.setValue(z,"batchingTexture",O._matricesTexture,T),ge.setOptional(z,O,"batchingIdTexture"),ge.setValue(z,"batchingIdTexture",O._indirectTexture,T),ge.setOptional(z,O,"batchingColorTexture"),O._colorsTexture!==null&&ge.setValue(z,"batchingColorTexture",O._colorsTexture,T));const kr=W.morphAttributes;if((kr.position!==void 0||kr.normal!==void 0||kr.color!==void 0)&&Lt.update(O,W,cn),(je||St.receiveShadow!==O.receiveShadow)&&(St.receiveShadow=O.receiveShadow,ge.setValue(z,"receiveShadow",O.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(En.envMap.value=vt,En.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&F.environment!==null&&(En.envMapIntensity.value=F.environmentIntensity),je&&(ge.setValue(z,"toneMappingExposure",y.toneMappingExposure),St.needsLights&&Tp(En,zr),nt&&$.fog===!0&&ct.refreshFogUniforms(En,nt),ct.refreshMaterialUniforms(En,$,G,X,p.state.transmissionRenderTarget[w.id]),Lo.upload(z,cu(St),En,T)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Lo.upload(z,cu(St),En,T),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ge.setValue(z,"center",O.center),ge.setValue(z,"modelViewMatrix",O.modelViewMatrix),ge.setValue(z,"normalMatrix",O.normalMatrix),ge.setValue(z,"modelMatrix",O.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const en=$.uniformsGroups;for(let ni=0,ii=en.length;ni<ii;ni++){const hu=en[ni];U.update(hu,cn),U.bind(hu,cn)}}return cn}function Tp(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Ap(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,F,W){bt.get(w.texture).__webglTexture=F,bt.get(w.depthTexture).__webglTexture=W;const $=bt.get(w);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=W===void 0,$.__autoAllocateDepthBuffer||Gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const W=bt.get(w);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,W=0){D=w,A=F,R=W;let $=!0,O=null,nt=!1,ht=!1;if(w){const vt=bt.get(w);if(vt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(z.FRAMEBUFFER,null),$=!1;else if(vt.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(vt.__hasExternalTextures)T.rebindTextures(w,bt.get(w.texture).__webglTexture,bt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const xt=w.depthTexture;if(vt.__boundDepthTexture!==xt){if(xt!==null&&bt.has(xt)&&(w.width!==xt.image.width||w.height!==xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Dt=w.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(ht=!0);const Nt=bt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Nt[F])?O=Nt[F][W]:O=Nt[F],nt=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?O=bt.get(w).__webglMultisampledFramebuffer:Array.isArray(Nt)?O=Nt[W]:O=Nt,C.copy(w.viewport),N.copy(w.scissor),B=w.scissorTest}else C.copy(pt).multiplyScalar(G).floor(),N.copy(Pt).multiplyScalar(G).floor(),B=kt;if(Tt.bindFramebuffer(z.FRAMEBUFFER,O)&&$&&Tt.drawBuffers(w,O),Tt.viewport(C),Tt.scissor(N),Tt.setScissorTest(B),nt){const vt=bt.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,W)}else if(ht){const vt=bt.get(w.texture),Dt=F||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,vt.__webglTexture,W||0,Dt)}b=-1},this.readRenderTargetPixels=function(w,F,W,$,O,nt,ht){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){Tt.bindFramebuffer(z.FRAMEBUFFER,_t);try{const vt=w.texture,Dt=vt.format,Nt=vt.type;if(!Vt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-$&&W>=0&&W<=w.height-O&&z.readPixels(F,W,$,O,Ot.convert(Dt),Ot.convert(Nt),nt)}finally{const vt=D!==null?bt.get(D).__webglFramebuffer:null;Tt.bindFramebuffer(z.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(w,F,W,$,O,nt,ht){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=bt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){const vt=w.texture,Dt=vt.format,Nt=vt.type;if(!Vt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-$&&W>=0&&W<=w.height-O){Tt.bindFramebuffer(z.FRAMEBUFFER,_t);const xt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,xt),z.bufferData(z.PIXEL_PACK_BUFFER,nt.byteLength,z.STREAM_READ),z.readPixels(F,W,$,O,Ot.convert(Dt),Ot.convert(Nt),0);const Kt=D!==null?bt.get(D).__webglFramebuffer:null;Tt.bindFramebuffer(z.FRAMEBUFFER,Kt);const ae=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Wx(z,ae,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,xt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,nt),z.deleteBuffer(xt),z.deleteSync(ae),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,W=0){w.isTexture!==!0&&(os("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const $=Math.pow(2,-W),O=Math.floor(w.image.width*$),nt=Math.floor(w.image.height*$),ht=F!==null?F.x:0,_t=F!==null?F.y:0;T.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,W,0,0,ht,_t,O,nt),Tt.unbindTexture()},this.copyTextureToTexture=function(w,F,W=null,$=null,O=0){w.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,w=arguments[1],F=arguments[2],O=arguments[3]||0,W=null);let nt,ht,_t,vt,Dt,Nt,xt,Kt,ae;const me=w.isCompressedTexture?w.mipmaps[O]:w.image;W!==null?(nt=W.max.x-W.min.x,ht=W.max.y-W.min.y,_t=W.isBox3?W.max.z-W.min.z:1,vt=W.min.x,Dt=W.min.y,Nt=W.isBox3?W.min.z:0):(nt=me.width,ht=me.height,_t=me.depth||1,vt=0,Dt=0,Nt=0),$!==null?(xt=$.x,Kt=$.y,ae=$.z):(xt=0,Kt=0,ae=0);const Ge=Ot.convert(F.format),Qt=Ot.convert(F.type);let St;F.isData3DTexture?(T.setTexture3D(F,0),St=z.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(T.setTexture2DArray(F,0),St=z.TEXTURE_2D_ARRAY):(T.setTexture2D(F,0),St=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,F.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,F.unpackAlignment);const zn=z.getParameter(z.UNPACK_ROW_LENGTH),te=z.getParameter(z.UNPACK_IMAGE_HEIGHT),cn=z.getParameter(z.UNPACK_SKIP_PIXELS),Ki=z.getParameter(z.UNPACK_SKIP_ROWS),je=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,me.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,me.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,vt),z.pixelStorei(z.UNPACK_SKIP_ROWS,Dt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Nt);const zr=w.isDataArrayTexture||w.isData3DTexture,ge=F.isDataArrayTexture||F.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const En=bt.get(w),kr=bt.get(F),en=bt.get(En.__renderTarget),ni=bt.get(kr.__renderTarget);Tt.bindFramebuffer(z.READ_FRAMEBUFFER,en.__webglFramebuffer),Tt.bindFramebuffer(z.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let ii=0;ii<_t;ii++)zr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(w).__webglTexture,O,Nt+ii),w.isDepthTexture?(ge&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,bt.get(F).__webglTexture,O,ae+ii),z.blitFramebuffer(vt,Dt,nt,ht,xt,Kt,nt,ht,z.DEPTH_BUFFER_BIT,z.NEAREST)):ge?z.copyTexSubImage3D(St,O,xt,Kt,ae+ii,vt,Dt,nt,ht):z.copyTexSubImage2D(St,O,xt,Kt,ae+ii,vt,Dt,nt,ht);Tt.bindFramebuffer(z.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(St,O,xt,Kt,ae,nt,ht,_t,Ge,Qt,me.data):F.isCompressedArrayTexture?z.compressedTexSubImage3D(St,O,xt,Kt,ae,nt,ht,_t,Ge,me.data):z.texSubImage3D(St,O,xt,Kt,ae,nt,ht,_t,Ge,Qt,me):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,O,xt,Kt,nt,ht,Ge,Qt,me.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,O,xt,Kt,me.width,me.height,Ge,me.data):z.texSubImage2D(z.TEXTURE_2D,O,xt,Kt,nt,ht,Ge,Qt,me);z.pixelStorei(z.UNPACK_ROW_LENGTH,zn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,te),z.pixelStorei(z.UNPACK_SKIP_PIXELS,cn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ki),z.pixelStorei(z.UNPACK_SKIP_IMAGES,je),O===0&&F.generateMipmaps&&z.generateMipmap(St),Tt.unbindTexture()},this.copyTextureToTexture3D=function(w,F,W=null,$=null,O=0){return w.isTexture!==!0&&(os("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,$=arguments[1]||null,w=arguments[2],F=arguments[3],O=arguments[4]||0),os('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,W,$,O)},this.initRenderTarget=function(w){bt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Tt.unbindTexture()},this.resetState=function(){A=0,R=0,D=null,Tt.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class eb extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class nb{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Rc,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new I;class pi{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=_n(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_n(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_n(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_n(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_n(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),r=ne(r,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new xn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ib extends Ne{constructor(t=null,e=1,i=1,r,s,o,a,l,c=qe,u=qe,d,h){super(null,o,a,l,c,u,r,s,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yp extends Cs{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oa=new I,aa=new I,sd=new fe,qr=new ma,co=new Or,el=new I,od=new I;class Mp extends ke{constructor(t=new He,e=new yp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)oa.fromBufferAttribute(e,r-1),aa.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=oa.distanceTo(aa);t.setAttribute("lineDistance",new le(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),co.copy(i.boundingSphere),co.applyMatrix4(r),co.radius+=s,t.ray.intersectsSphere(co)===!1)return;sd.copy(r).invert(),qr.copy(t.ray).applyMatrix4(sd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=u.getX(_),v=u.getX(_+1),x=uo(this,t,qr,l,p,v);x&&e.push(x)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(f),p=uo(this,t,qr,l,_,g);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=c){const p=uo(this,t,qr,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=uo(this,t,qr,l,m-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function uo(n,t,e,i,r,s){const o=n.geometry.attributes.position;if(oa.fromBufferAttribute(o,r),aa.fromBufferAttribute(o,s),e.distanceSqToSegment(oa,aa,el,od)>i)return;el.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(el);if(!(l<t.near||l>t.far))return{distance:l,point:od.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const ad=new I,ld=new I;class rb extends Mp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)ad.fromBufferAttribute(e,r),ld.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+ad.distanceTo(ld);t.setAttribute("lineDistance",new le(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sb extends Ne{constructor(t,e,i,r,s,o,a,l,c){super(t,e,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ob{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],h=i[r+1]-u,f=(o-u)/h;return(r+f)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new Rt:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new I,r=[],s=[],o=[],a=new I,l=new fe;for(let f=0;f<=t;f++){const m=f/t;r[f]=this.getTangentAt(m,new I)}s[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Se(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(r[f],s[f])}if(e===!0){let f=Math.acos(Se(s[0].dot(s[t]),-1,1));f/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function ab(n,t){const e=1-n;return e*e*t}function lb(n,t){return 2*(1-n)*n*t}function cb(n,t){return n*n*t}function nl(n,t,e,i){return ab(n,t)+lb(n,e)+cb(n,i)}class ub extends ob{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(nl(t,r.x,s.x,o.x),nl(t,r.y,s.y,o.y),nl(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nu extends He{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new I,u=new Rt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const f=i+d/e*r;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(a,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class la extends He{constructor(t=.5,e=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=t;const h=(e-t)/r,f=new I,m=new Rt;for(let _=0;_<=r;_++){for(let g=0;g<=i;g++){const p=s+g/i*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}d+=h}for(let _=0;_<r;_++){const g=_*(i+1);for(let p=0;p<i;p++){const v=p+g,x=v,y=v+i+1,L=v+i+2,A=v+1;a.push(x,y,A),a.push(y,L,A)}}this.setIndex(a),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new la(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hb extends He{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],i=new Set,r=new I,s=new I;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],h=d.start,f=d.count;for(let m=h,_=h+f;m<_;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),v=a.getX(m+(g+1)%3);r.fromBufferAttribute(o,p),s.fromBufferAttribute(o,v),cd(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,d=3*a+(c+1)%3;r.fromBufferAttribute(o,u),s.fromBufferAttribute(o,d),cd(r,s,i)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new le(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function cd(n,t,e){const i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(r)===!0?!1:(e.add(i),e.add(r),!0)}class db extends yp{static get type(){return"LineDashedMaterial"}constructor(t){super(),this.isLineDashedMaterial=!0,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class fb extends He{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Lc extends nb{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const ud=new fe;class pb{constructor(t,e,i=0,r=1/0){this.ray=new ma(t,e),this.near=i,this.far=r,this.camera=null,this.layers=new Qc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ud.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ud),this}intersectObject(t,e=!0,i=[]){return Dc(t,this,i,e),i.sort(hd),i}intersectObjects(t,e=!0,i=[]){for(let r=0,s=t.length;r<s;r++)Dc(t[r],this,i,e);return i.sort(hd),i}}function hd(n,t){return n.distance-t.distance}function Dc(n,t,e,i){let r=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(r=!1),r===!0&&i===!0){const s=n.children;for(let o=0,a=s.length;o<a;o++)Dc(s[o],t,e,!0)}}class dd{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Se(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const fd=new I,ho=new I;class mb{constructor(t=new I,e=new I){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){fd.subVectors(t,this.start),ho.subVectors(this.end,this.start);const i=ho.dot(ho);let s=ho.dot(fd)/i;return e&&(s=Se(s,0,1)),s}closestPointToPoint(t,e,i){const r=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class gb extends Zi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$c}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$c);function _b(n){return n}function vb(n){if(n==null)return _b;var t,e,i=n.scale[0],r=n.scale[1],s=n.translate[0],o=n.translate[1];return function(a,l){l||(t=e=0);var c=2,u=a.length,d=new Array(u);for(d[0]=(t+=a[0])*i+s,d[1]=(e+=a[1])*r+o;c<u;)d[c]=a[c],++c;return d}}function xb(n,t){for(var e,i=n.length,r=i-t;r<--i;)e=n[r],n[r++]=n[i],n[i]=e}function Yr(n,t){return typeof t=="string"&&(t=n.objects[t]),t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(e){return pd(n,e)})}:pd(n,t)}function pd(n,t){var e=t.id,i=t.bbox,r=t.properties==null?{}:t.properties,s=yb(n,t);return e==null&&i==null?{type:"Feature",properties:r,geometry:s}:i==null?{type:"Feature",id:e,properties:r,geometry:s}:{type:"Feature",id:e,bbox:i,properties:r,geometry:s}}function yb(n,t){var e=vb(n.transform),i=n.arcs;function r(u,d){d.length&&d.pop();for(var h=i[u<0?~u:u],f=0,m=h.length;f<m;++f)d.push(e(h[f],f));u<0&&xb(d,m)}function s(u){return e(u)}function o(u){for(var d=[],h=0,f=u.length;h<f;++h)r(u[h],d);return d.length<2&&d.push(d[0]),d}function a(u){for(var d=o(u);d.length<4;)d.push(d[0]);return d}function l(u){return u.map(a)}function c(u){var d=u.type,h;switch(d){case"GeometryCollection":return{type:d,geometries:u.geometries.map(c)};case"Point":h=s(u.coordinates);break;case"MultiPoint":h=u.coordinates.map(s);break;case"LineString":h=o(u.arcs);break;case"MultiLineString":h=u.arcs.map(o);break;case"Polygon":h=l(u.arcs);break;case"MultiPolygon":h=u.arcs.map(l);break;default:return null}return{type:d,coordinates:h}}return c(t)}const md={type:"change"},iu={type:"start"},Sp={type:"end"},fo=new ma,gd=new ui,Mb=Math.cos(70*ra.DEG2RAD),Me=new I,Ve=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},il=1e-6;class Sb extends gb{constructor(t,e=null){super(t,e),this.state=se.NONE,this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zn.ROTATE,MIDDLE:Zn.DOLLY,RIGHT:Zn.PAN},this.touches={ONE:fi.ROTATE,TWO:fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new ji,this._lastTargetPosition=new I,this._quat=new ji().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dd,this._sphericalDelta=new dd,this._scale=1,this._panOffset=new I,this._rotateStart=new Rt,this._rotateEnd=new Rt,this._rotateDelta=new Rt,this._panStart=new Rt,this._panEnd=new Rt,this._panDelta=new Rt,this._dollyStart=new Rt,this._dollyEnd=new Rt,this._dollyDelta=new Rt,this._dollyDirection=new I,this._mouse=new Rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wb.bind(this),this._onPointerDown=Eb.bind(this),this._onPointerUp=bb.bind(this),this._onContextMenu=Db.bind(this),this._onMouseWheel=Cb.bind(this),this._onKeyDown=Rb.bind(this),this._onTouchStart=Pb.bind(this),this._onTouchMove=Lb.bind(this),this._onMouseDown=Tb.bind(this),this._onMouseMove=Ab.bind(this),this._interceptControlDown=Ib.bind(this),this._interceptControlUp=Ub.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(md),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Ve:i>Math.PI&&(i-=Ve),r<-Math.PI?r+=Ve:r>Math.PI&&(r-=Ve),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Me.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(fo.origin.copy(this.object.position),fo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fo.direction))<Mb?this.object.lookAt(this.target):(gd.setFromNormalAndCoplanarPoint(this.object.up,this.target),fo.intersectPlane(gd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>il||8*(1-this._lastQuaternion.dot(this.object.quaternion))>il||this._lastTargetPosition.distanceToSquared(this.target)>il?(this.dispatchEvent(md),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ve/60*this.autoRotateSpeed*t:Ve/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Me.copy(r).sub(this.target);let s=Me.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ve*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ve*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ve*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Eb(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function wb(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function bb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sp),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Tb(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Zn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=se.DOLLY;break;case Zn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}break;case Zn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(iu)}function Ab(n){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Cb(n){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(n.preventDefault(),this.dispatchEvent(iu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Sp))}function Rb(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function Pb(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case fi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=se.TOUCH_ROTATE;break;case fi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case fi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=se.TOUCH_DOLLY_PAN;break;case fi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(iu)}function Lb(n){switch(this._trackPointer(n),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=se.NONE}}function Db(n){this.enabled!==!1&&n.preventDefault()}function Ib(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ub(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Nb extends ke{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Rt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const fr=new I,_d=new fe,vd=new fe,xd=new I,yd=new I;class Fb{constructor(t={}){const e=this;let i,r,s,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:r}},this.render=function(m,_){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),_d.copy(_.matrixWorldInverse),vd.multiplyMatrices(_.projectionMatrix,_d),u(m,m,_),f(m)},this.setSize=function(m,_){i=m,r=_,s=i/2,o=r/2,l.style.width=m+"px",l.style.height=_+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let _=0,g=m.children.length;_<g;_++)c(m.children[_])}function u(m,_,g){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){fr.setFromMatrixPosition(m.matrixWorld),fr.applyMatrix4(vd);const p=fr.z>=-1&&fr.z<=1&&m.layers.test(g.layers)===!0,v=m.element;v.style.display=p===!0?"":"none",p===!0&&(m.onBeforeRender(e,_,g),v.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(fr.x*s+s)+"px,"+(-fr.y*o+o)+"px)",v.parentNode!==l&&l.appendChild(v),m.onAfterRender(e,_,g));const x={distanceToCameraSquared:d(g,m)};a.objects.set(m,x)}for(let p=0,v=m.children.length;p<v;p++)u(m.children[p],_,g)}function d(m,_){return xd.setFromMatrixPosition(m.matrixWorld),yd.setFromMatrixPosition(_.matrixWorld),xd.distanceToSquared(yd)}function h(m){const _=[];return m.traverseVisible(function(g){g.isCSS2DObject&&_.push(g)}),_}function f(m){const _=h(m).sort(function(p,v){if(p.renderOrder!==v.renderOrder)return v.renderOrder-p.renderOrder;const x=a.objects.get(p).distanceToCameraSquared,y=a.objects.get(v).distanceToCameraSquared;return x-y}),g=_.length;for(let p=0,v=_.length;p<v;p++)_[p].element.style.zIndex=g-p}}}const Md=new yi,po=new I;class Ep extends fb{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new le(t,3)),this.setAttribute("uv",new le(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Lc(e,6,1);return this.setAttribute("instanceStart",new pi(i,3,0)),this.setAttribute("instanceEnd",new pi(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const i=new Lc(e,6,1);return this.setAttribute("instanceColorStart",new pi(i,3,0)),this.setAttribute("instanceColorEnd",new pi(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new hb(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Md.setFromBufferAttribute(e),this.boundingBox.union(Md))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)po.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(po)),po.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(po));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}rt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Rt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};We.line={uniforms:tu.merge([rt.common,rt.fog,rt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class ms extends Mn{static get type(){return"LineMaterial"}constructor(t){super({uniforms:tu.clone(We.line.uniforms),vertexShader:We.line.vertexShader,fragmentShader:We.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const rl=new he,Sd=new I,Ed=new I,Te=new he,Ae=new he,wn=new he,sl=new I,ol=new fe,Ce=new mb,wd=new I,mo=new yi,go=new Or,bn=new he;let Ln,Gi;function bd(n,t,e){return bn.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),bn.multiplyScalar(1/bn.w),bn.x=Gi/e.width,bn.y=Gi/e.height,bn.applyMatrix4(n.projectionMatrixInverse),bn.multiplyScalar(1/bn.w),Math.abs(Math.max(bn.x,bn.y))}function Ob(n,t){const e=n.matrixWorld,i=n.geometry,r=i.attributes.instanceStart,s=i.attributes.instanceEnd,o=Math.min(i.instanceCount,r.count);for(let a=0,l=o;a<l;a++){Ce.start.fromBufferAttribute(r,a),Ce.end.fromBufferAttribute(s,a),Ce.applyMatrix4(e);const c=new I,u=new I;Ln.distanceSqToSegment(Ce.start,Ce.end,u,c),u.distanceTo(c)<Gi*.5&&t.push({point:u,pointOnLine:c,distance:Ln.origin.distanceTo(u),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Bb(n,t,e){const i=t.projectionMatrix,s=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),d=-t.near;Ln.at(1,wn),wn.w=1,wn.applyMatrix4(t.matrixWorldInverse),wn.applyMatrix4(i),wn.multiplyScalar(1/wn.w),wn.x*=s.x/2,wn.y*=s.y/2,wn.z=0,sl.copy(wn),ol.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,f=u;h<f;h++){if(Te.fromBufferAttribute(l,h),Ae.fromBufferAttribute(c,h),Te.w=1,Ae.w=1,Te.applyMatrix4(ol),Ae.applyMatrix4(ol),Te.z>d&&Ae.z>d)continue;if(Te.z>d){const x=Te.z-Ae.z,y=(Te.z-d)/x;Te.lerp(Ae,y)}else if(Ae.z>d){const x=Ae.z-Te.z,y=(Ae.z-d)/x;Ae.lerp(Te,y)}Te.applyMatrix4(i),Ae.applyMatrix4(i),Te.multiplyScalar(1/Te.w),Ae.multiplyScalar(1/Ae.w),Te.x*=s.x/2,Te.y*=s.y/2,Ae.x*=s.x/2,Ae.y*=s.y/2,Ce.start.copy(Te),Ce.start.z=0,Ce.end.copy(Ae),Ce.end.z=0;const _=Ce.closestPointToPointParameter(sl,!0);Ce.at(_,wd);const g=ra.lerp(Te.z,Ae.z,_),p=g>=-1&&g<=1,v=sl.distanceTo(wd)<Gi*.5;if(p&&v){Ce.start.fromBufferAttribute(l,h),Ce.end.fromBufferAttribute(c,h),Ce.start.applyMatrix4(o),Ce.end.applyMatrix4(o);const x=new I,y=new I;Ln.distanceSqToSegment(Ce.start,Ce.end,y,x),e.push({point:y,pointOnLine:x,distance:Ln.origin.distanceTo(y),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}class zb extends ze{constructor(t=new Ep,e=new ms({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Sd.fromBufferAttribute(e,o),Ed.fromBufferAttribute(i,o),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Sd.distanceTo(Ed);const s=new Lc(r,2,1);return t.setAttribute("instanceDistanceStart",new pi(s,1,0)),t.setAttribute("instanceDistanceEnd",new pi(s,1,1)),this}raycast(t,e){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Ln=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Gi=l.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),go.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=Gi*.5;else{const d=Math.max(r.near,go.distanceToPoint(Ln.origin));c=bd(r,d,l.resolution)}if(go.radius+=c,Ln.intersectsSphere(go)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),mo.copy(a.boundingBox).applyMatrix4(o);let u;if(i)u=Gi*.5;else{const d=Math.max(r.near,mo.distanceToPoint(Ln.origin));u=bd(r,d,l.resolution)}mo.expandByScalar(u),Ln.intersectsBox(mo)!==!1&&(i?Ob(this,e):Bb(this,r,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(rl),this.material.uniforms.resolution.value.set(rl.z,rl.w))}}class Ic extends Ep{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setPositions(i),this}setColors(t){const e=t.length-3,i=new Float32Array(2*e);for(let r=0;r<e;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setColors(i),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}class al extends zb{constructor(t=new Ic,e=new ms({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}}const ll=typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;function Td(){return!!(ll!=null&&ll.matches)}const Ie=zt.worldScale,_o=rs().scale(1).translate([0,0]).rotate([-11.31,0]),pr=2.7064*1.02,vo=1.3174*1.02,fn=Math.PI/180,xo=n=>new Jt(n),Ad=new Jt(16777215);function kb(){return`
    uniform vec3 uC0, uC1, uC2, uC3;
    uniform float uD0, uD1, uD2, uD3;
    vec3 ramp(float v) {
        if (v <= uD1) return mix(uC0, uC1, clamp((v - uD0) / (uD1 - uD0), 0.0, 1.0));
        if (v <= uD2) return mix(uC1, uC2, (v - uD1) / (uD2 - uD1));
        return mix(uC2, uC3, clamp((v - uD2) / (uD3 - uD2), 0.0, 1.0));
    }`}const Cd=`
    attribute float aTop;
    attribute float aShade;
    attribute float aCountry;
    uniform sampler2D uVals;
    uniform float uN, uT, uCap, uHmax, uHmin;
    varying float vTop, vShade, vV, vPresent, vState;
    void main() {
        vec4 d = texture2D(uVals, vec2((aCountry + 0.5) / uN, 0.5));
        float pr = d.r >= 0.0 ? 1.0 : 0.0;
        float pg = d.g >= 0.0 ? 1.0 : 0.0;
        float present = mix(pr, pg, uT);
        float v = mix(max(d.r, 0.0), max(d.g, 0.0), uT);
        float h = (uHmin + min(v, uCap) / uCap * (uHmax - uHmin)) * present;
        vec3 p = position;
        p.y = aTop * h;
        vTop = aTop; vShade = aShade; vV = v; vPresent = present; vState = d.b;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,Rd=`
    ${kb()}
    uniform float uOpBottom, uOpTop, uEdge;
    varying float vTop, vShade, vV, vPresent, vState;
    void main() {
        vec3 col = ramp(vV) * vShade;
        float strength = 0.45 + 0.55 * clamp(vV / 8.0, 0.0, 1.0);
        float a = mix(uOpBottom, uOpTop, vTop) * vPresent * strength;
        if (uEdge > 0.5) { col = ramp(vV) * 0.72; a = vPresent * (0.55 + 0.45 * strength); }
        // state: 0 normal · 1 hover · 2 focus · 3 dimmed
        if (vState > 2.5) a *= 0.22;
        else if (vState > 0.5) {
            // hover / focus: solid, slightly darker face and a near-black ridge
            a = uEdge > 0.5 ? 1.0 : max(a, 0.9);
            col = uEdge > 0.5 ? vec3(0.14, 0.12, 0.13) : ramp(max(vV, 2.0)) * vShade * 0.88;
        }
        if (a < 0.01) discard;
        gl_FragColor = vec4(col, a);
    }`;function Hb(n){const t=n.geometry;if(!t)return n;const e=i=>B0({type:"Polygon",coordinates:i})>2*Math.PI?i.map(r=>r.slice().reverse()):i;return t.type==="Polygon"?t.coordinates=e(t.coordinates):t.type==="MultiPolygon"&&(t.coordinates=t.coordinates.map(e)),n}const wt={handlers:{},isoIndex:{},isoList:[],labels:[],arcObjects:[],hoverIso:null,focusIso:null,init(n,t={}){this.container=n,this.handlers=t;const{width:e,height:i}=n.getBoundingClientRect();this.renderer=new tb({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e,i),this.renderer.setClearColor(0,0),n.appendChild(this.renderer.domElement),this.renderer.domElement.classList.add("map3d-canvas"),this.labelRenderer=new Fb,this.labelRenderer.setSize(e,i),this.labelRenderer.domElement.className="map3d-labels",n.appendChild(this.labelRenderer.domElement),this.scene=new eb,this.camera=new pp(-1,1,1,-1,-5e3,5e3),this._setupControls(),this._fitFrustum(e,i),this.resetView(!1),this.raycaster=new pb,this.raycaster.params.Line2={threshold:6},this.pointer=new Rt,this.groundGroup=new An,this.wallGroup=new An,this.arcGroup=new An,this.nodeGroup=new An,this.guideGroup=new An,this.scene.add(this.groundGroup,this.wallGroup,this.guideGroup,this.nodeGroup,this.arcGroup),this._buildGround(),this._buildWalls(),this._buildRuler(),this._bindPointer(),new ResizeObserver(()=>this.resize()).observe(n),this._dirty=!0,this.renderer.setAnimationLoop(()=>this._tick())},_setupControls(){const n=new Sb(this.camera,this.labelRenderer.domElement);n.enableDamping=!0,n.dampingFactor=.12,n.screenSpacePanning=!1,n.zoomToCursor=!0,n.minZoom=.8,n.maxZoom=14,n.minPolarAngle=zt.polarRangeDeg[0]*fn,n.maxPolarAngle=zt.polarRangeDeg[1]*fn,n.minAzimuthAngle=-30*fn,n.maxAzimuthAngle=zt.azimuthRangeDeg*fn,n.mouseButtons={LEFT:Zn.PAN,MIDDLE:Zn.DOLLY,RIGHT:Zn.ROTATE},n.touches={ONE:fi.PAN,TWO:fi.DOLLY_ROTATE},n.addEventListener("change",()=>this._clampTarget()),this.controls=n},_clampTarget(){const n=this.controls.target,t=pr*Ie,e=vo*Ie,i=ra.clamp(n.x,-t,t),r=ra.clamp(n.z,-e,e);if(i!==n.x||r!==n.z||n.y!==0){const s=i-n.x,o=r-n.z;n.set(i,0,r),this.camera.position.x+=s,this.camera.position.z+=o}},_fitFrustum(n,t){const e=n/Math.max(t,1),i=zt.elevationDeg*fn,r=pr*Ie,s=(vo*Ie*Math.sin(i)+zt.wallMaxHeight*Math.cos(i))*1.04;let o=r,a=r/e;a<s&&(a=s,o=a*e),Object.assign(this.camera,{left:-o,right:o,top:a,bottom:-a}),this.camera.updateProjectionMatrix()},mobileZoomFactor(){const{width:n,height:t}=this.container.getBoundingClientRect();return n/Math.max(t,1)<1?1.5:1},resetView(n=!0,t=this.viewElev()){const e=(90-t)*fn,i=1500,r=this.mobileZoomFactor()>1,[s,o]=r?_o([18,8]):[0,0],a=new I(s*Ie,0,o*Ie),l=a.clone().add(new I(0,i*Math.cos(e),i*Math.sin(e)));this._flyTo(a,l,zt.defaultZoom*(r?3.2:1),n)},viewElev(){return this.mode==="biv"?89.9:this.flat?zt.topViewElevationDeg:zt.elevationDeg},_applyElevation(n=!0){const t=this.viewElev(),e=this.mode==="biv"||this.flat,i=(90-t)*fn;this.controls.minPolarAngle=e?i:zt.polarRangeDeg[0]*fn,this.controls.maxPolarAngle=e?i:zt.polarRangeDeg[1]*fn,this.controls.minAzimuthAngle=this.mode==="biv"?0:-30*fn,this.controls.maxAzimuthAngle=this.mode==="biv"?0:zt.azimuthRangeDeg*fn;const r=this.controls.target.clone(),s=r.clone().add(new I(0,1500*Math.cos(i),1500*Math.sin(i)));this._flyTo(r,s,this.camera.zoom,n)},setFlat(n){this.flat=n,this._applyElevation()},setMode(n,t=!0){this.invalidate(),this.mode=n,this.wallGroup.visible=n!=="biv",this.guideGroup.visible=n!=="biv",this._applyElevation(t),this.setWallLabels(this._wallLabelIsos||[]),this._buildFocusGuides()},focusLonLat(n,t,e,i=!0){const[r,s]=_o([n,t]),o=new I(r*Ie,0,s*Ie),a=this.camera.position.clone().sub(this.controls.target);this._flyTo(o,o.clone().add(a),e,i)},focusIsoView(n,t=0,e=1.6,i=0){const r=this.scenePos(n);if(!r)return;const{width:s}=this.container.getBoundingClientRect(),o=Math.max(this.camera.zoom,e*this.mobileZoomFactor()),a=(this.camera.right-this.camera.left)/o/s,l=new I().setFromMatrixColumn(this.camera.matrixWorld,0).setY(0).normalize(),c=this.camera.position.clone().sub(this.controls.target),u=c.clone().setY(0).normalize(),d=Math.max(.2,c.clone().normalize().y),h=r.clone().add(l.multiplyScalar(t/2*a)).add(u.multiplyScalar(i/2*a/d));this._flyTo(h,h.clone().add(c),o,!0)},_flyTo(n,t,e,i){const r=this.controls,s=this.camera;if(!i||Td()){r.target.copy(n),s.position.copy(t),s.zoom=e,s.updateProjectionMatrix(),r.update(),this.invalidate();return}const o=r.target.clone(),a=s.position.clone(),l=s.zoom;this._fly&&this._fly.stop(),this._fly=Ho(c=>{const u=df(Math.min(1,c/900));r.target.lerpVectors(o,n,u),s.position.lerpVectors(a,t,u),s.zoom=l+(e-l)*u,s.updateProjectionMatrix(),this.invalidate(),u>=1&&this._fly.stop()})},resize(){this.invalidate();const{width:n,height:t}=this.container.getBoundingClientRect();if(!(!n||!t)){this.renderer.setSize(n,t),this.labelRenderer.setSize(n,t),this._fitFrustum(n,t);for(const e of[...this.arcObjects,...this.hoverArcObjects||[]])for(const i of[...e.lines,...e.casings])i.material.resolution.set(n,t);for(const e of Object.values(this._outlines||{}))(e||[]).forEach(i=>i.material.resolution.set(n,t))}},_buildGround(){const n=zt.textureWidth,t=n/(2*pr),e=Math.round(2*vo*t);this.tex={W:n,H:e,k:t},this.texProj=rs().scale(t).translate([n/2,e/2]),this.texProjReal=rs().scale(t).translate([n/2,e/2]).rotate([-11.31,0]);const i=document.createElement("canvas");i.width=n,i.height=e,this.groundCanvas=i,this.groundTexture=new sb(i),this.groundTexture.colorSpace=Je,this.groundTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const r=new Ps(2*pr*Ie,2*vo*Ie);r.rotateX(-Math.PI/2);const s=new vr({map:this.groundTexture,transparent:!0,depthWrite:!1});this.ground=new ze(r,s),this.ground.renderOrder=-1,this.groundGroup.add(this.ground);const o=document.createElement("canvas"),a=2048,l=Math.round(a*e/n);o.width=a,o.height=l,this.pick={canvas:o,ctx:o.getContext("2d",{willReadFrequently:!0}),W:a,H:l,proj:rs().scale(a/(2*pr)).translate([a/2,l/2]),projReal:rs().scale(a/(2*pr)).translate([a/2,l/2]).rotate([-11.31,0])},this.features=Yr(E.topo,E.topo.objects.economies).features.map(Hb),this.borders={plain:Yr(E.topo,E.topo.objects["plain-borders"]),dashed:Yr(E.topo,E.topo.objects["dashed-borders"]),dotted:Yr(E.topo,E.topo.objects["dotted-borders"]),dashDotted:Yr(E.topo,E.topo.objects["dash-dotted-borders"])},this.drawGround(),this._drawPick()},isoOfFeature(n){const t=String(n.properties.code);return/^\d+$/.test(t)?E.m49ToIso[String(+t)]:null},needColor:Ss().domain(Et.need.domain).range(Et.need.colors).clamp(!0),groundColor(n){var e;const t=n?(e=E.water[n])==null?void 0:e.without:null;return t!=null?this.needColor(t):null},noDataPattern(n,t=1){const e=document.createElement("canvas"),i=Math.round(10*t);e.width=e.height=i;const r=e.getContext("2d");return r.fillStyle=Et.need.noData,r.fillRect(0,0,i,i),r.strokeStyle=Et.need.noDataLine,r.lineWidth=1.6*t,r.beginPath(),r.moveTo(0,i),r.lineTo(i,0),r.moveTo(-i/2,i/2),r.lineTo(i/2,-i/2),r.moveTo(i/2,i*1.5),r.lineTo(i*1.5,i/2),r.stroke(),n.createPattern(e,"repeat")},drawGround(){var a;const{W:n,H:t}=this.tex,e=this.groundCanvas.getContext("2d"),i=Ta(this.texProj,e);e.clearRect(0,0,n,t),e.beginPath(),i({type:"Sphere"}),e.fillStyle="#ffffff",e.fill(),e.beginPath(),Ta(this.texProjReal,e)(K0()),e.strokeStyle="rgba(0,73,144,0.07)",e.lineWidth=2,e.stroke();const r=E.region!=="Global"?E.region:null,s=this.noDataPattern(e,1.6);for(const l of this.features){const c=this.isoOfFeature(l);if(e.beginPath(),i(l),e.fillStyle=this.groundColor(c)??s,e.globalAlpha=r&&((a=E.countries[c])==null?void 0:a.region)!==r?.35:1,e.fill(),l.properties.code==="C00002"){e.save(),e.clip(),e.strokeStyle="rgba(110,98,89,0.45)",e.lineWidth=2;const u=i.bounds(l);for(let d=u[0][0]-60;d<u[1][0]+60;d+=7)e.beginPath(),e.moveTo(d,u[0][1]),e.lineTo(d+60,u[1][1]),e.stroke();e.restore()}}e.globalAlpha=1;const o=(l,c)=>{e.beginPath(),i(l),e.setLineDash(c),e.strokeStyle=Et.need.border,e.lineWidth=2.2,e.stroke()};o(this.borders.plain,[]),o(this.borders.dashed,[9,6]),o(this.borders.dotted,[2,5]),o(this.borders.dashDotted,[9,5,2,5]),e.setLineDash([]),e.beginPath(),i({type:"Sphere"}),e.strokeStyle="rgba(0,73,144,0.18)",e.lineWidth=2.5,e.stroke(),this.groundTexture.needsUpdate=!0,this.invalidate()},_drawPick(){const{ctx:n,W:t,H:e,proj:i,projReal:r}=this.pick,s=Ta(i,n);n.clearRect(0,0,t,e),this.pickColors={};let o=1;const a=l=>{this.pickColors[l]||(this.pickColors[l]=o++);const c=this.pickColors[l];return`rgb(${c&255},${c>>8&255},${c>>16&255})`};for(const l of this.features){const c=this.isoOfFeature(l);c&&(n.beginPath(),s(l),n.fillStyle=a(c),n.fill())}for(const[l,c]of Object.entries(E.countries)){if(!c.coords||!(c.sids||this._isCage(l)))continue;const u=r(c.coords);u&&(n.beginPath(),n.arc(u[0],u[1],5,0,2*Math.PI),n.fillStyle=a(l),n.fill())}this.pickLookup=Object.fromEntries(Object.entries(this.pickColors).map(([l,c])=>[c,l]))},_isCage(n){const t=E.walls[n];return t&&t.length===1&&t[0].length===18},isoAtUV(n){const{ctx:t,W:e,H:i}=this.pick,r=Math.floor(n.x*e),s=Math.floor((1-n.y)*i);if(r<0||s<0||r>=e||s>=i)return null;const o=t.getImageData(r,s,1,1).data;return o[3]<255?null:this.pickLookup[o[0]+(o[1]<<8)+(o[2]<<16)]||null},_buildWalls(){const n=Object.keys(E.walls);this.isoList=n,n.forEach((A,R)=>{this.isoIndex[A]=R});const t=n.length,e=[],i=[],r=[],s=[],o=[],a=[],l=new Rt(-.55,-.83).normalize();this.wallRings={},n.forEach((A,R)=>{this.wallRings[A]=[];for(const D of E.walls[A]){const b=[];for(let S=0;S<D.length;S+=2)b.push([D[S]*Ie,D[S+1]*Ie]);this.wallRings[A].push(b);for(let S=0;S<b.length-1;S++){const[C,N]=b[S],[B,k]=b[S+1],P=new Rt(k-N,-(B-C)).normalize(),H=.78+.22*Math.abs(P.dot(l)),X=[[C,N,0],[B,k,0],[B,k,1],[C,N,0],[B,k,1],[C,N,1]];for(const[G,Q,it]of X)e.push(G,0,Q),i.push(it),r.push(H),s.push(R);o.push(C,0,N,B,0,k),a.push(R,R)}}}),this.valTex=new ib(new Float32Array(t*4).fill(-1),t,1,an,Nn),this.valTex.magFilter=this.valTex.minFilter=qe;for(let A=0;A<t;A++)this.valTex.image.data[A*4+2]=0;this.valTex.needsUpdate=!0,this.invalidate();const[c,u,d,h]=Et.tariff.colors.map(xo),[f,m,_,g]=Et.tariff.domain,p={uVals:{value:this.valTex},uN:{value:t},uT:{value:1},uCap:{value:Et.tariff.cap},uHmax:{value:zt.wallMaxHeight},uHmin:{value:zt.wallMinHeight},uC0:{value:c},uC1:{value:u},uC2:{value:d},uC3:{value:h},uD0:{value:f},uD1:{value:m},uD2:{value:_},uD3:{value:g},uOpBottom:{value:zt.wallOpacityBottom},uOpTop:{value:zt.wallOpacityTop},uEdge:{value:0}};this.wallUniforms=p;const v=new He;v.setAttribute("position",new le(e,3)),v.setAttribute("aTop",new le(i,1)),v.setAttribute("aShade",new le(r,1)),v.setAttribute("aCountry",new le(s,1));const x=new Mn({uniforms:p,vertexShader:Cd,fragmentShader:Rd,transparent:!0,depthWrite:!1,side:Pn});this.walls=new ze(v,x),this.walls.frustumCulled=!1,this.walls.renderOrder=2,this.wallGroup.add(this.walls);const y=new He;y.setAttribute("position",new le(o,3)),y.setAttribute("aTop",new le(new Array(a.length).fill(1),1)),y.setAttribute("aShade",new le(new Array(a.length).fill(1),1)),y.setAttribute("aCountry",new le(a,1));const L=new Mn({uniforms:{...p,uEdge:{value:1}},vertexShader:Cd,fragmentShader:Rd,transparent:!0,depthWrite:!1});this.edges=new rb(y,L),this.edges.frustumCulled=!1,this.edges.renderOrder=3,this.wallGroup.add(this.edges)},wallHeight(n){return n==null?0:zt.wallMinHeight+Math.min(n,Et.tariff.cap)/Et.tariff.cap*(zt.wallMaxHeight-zt.wallMinHeight)},setWallValues(n,t=!0){const e=this.valTex.image.data,i=this.wallUniforms.uT.value;for(let r=0;r<this.isoList.length;r++){const s=this.isoList[r],o=e[r*4],a=e[r*4+1],l=o<0&&a<0?-1:o<0?i>.5?a:-1:a<0?i<.5?o:-1:o+(a-o)*i;e[r*4]=l;const c=n[s];e[r*4+1]=c??-1}if(this.valTex.needsUpdate=!0,this.invalidate(),this.wallValues=n,!t||Td()){this.wallUniforms.uT.value=1;return}this.wallUniforms.uT.value=0,this._wallAnim&&this._wallAnim.stop(),this._wallAnim=Ho(r=>{const s=p0(Math.min(1,r/zt.transitionMs));this.wallUniforms.uT.value=s,this.invalidate(),s>=1&&this._wallAnim.stop()})},_applyWallStates(){var i;const n=this.valTex.image.data,t=!!this.focusIso,e=this.relatedIsos||new Set;for(let r=0;r<this.isoList.length;r++){const s=this.isoList[r];let o=0;t&&s!==this.focusIso&&!e.has(s)&&(o=3),E.region!=="Global"&&((i=E.countries[s])==null?void 0:i.region)!==E.region&&(o=3),s===this.focusIso&&(o=2),s===this.hoverIso&&(o=1),n[r*4+2]=o}this.valTex.needsUpdate=!0,this.invalidate()},setHover(n){n!==this.hoverIso&&(this.hoverIso=n,this._applyWallStates(),this._outline("hover",n,18832,2.2))},_outline(n,t,e,i){this.invalidate(),this._outlines||(this._outlines={});const r=this._outlines[n];if(r&&r.forEach(a=>{this.scene.remove(a),a.geometry.dispose(),a.material.dispose()}),this._outlines[n]=null,!t||!this.wallRings[t])return;const{width:s,height:o}=this.container.getBoundingClientRect();this._outlines[n]=this.wallRings[t].map(a=>{const l=new Ic;l.setPositions(a.flatMap(([d,h])=>[d,.15,h]));const c=new ms({color:e,linewidth:i});c.resolution.set(s,o);const u=new al(l,c);return u.renderOrder=4,this.scene.add(u),u})},setFocus(n,t=null){this.focusIso=n,this.relatedIsos=t,this._applyWallStates(),this._outline("focus",n,18832,3),this._buildFocusGuides()},refreshStates(){this._applyWallStates()},_buildFocusGuides(){this.guideGroup.children.slice().forEach(i=>{var r;this.guideGroup.remove(i),(r=i.geometry)==null||r.dispose()}),this._removeLabels("guide");const n=this.focusIso;if(!n||!this.wallRings[n]||this.mode==="biv")return;const t=new db({color:18832,dashSize:.8,gapSize:.6,transparent:!0,opacity:.55});let e=null;for(const i of Et.tariff.guides){const r=this.wallHeight(i);for(const s of this.wallRings[n]){const o=s.map(([c,u])=>new I(c,r,u)),a=new He().setFromPoints(o),l=new Mp(a,t);l.computeLineDistances(),this.guideGroup.add(l),(!e||s.length>e.len)&&(e={len:s.length,pt:s.reduce((c,u)=>u[0]>c[0]?u:c)})}}if(e)for(const i of Et.tariff.guides)this._addLabel("guide",`${i}%`,new I(e.pt[0]+.8,this.wallHeight(i),e.pt[1]),"lbl-guide")},_buildRuler(){this.rulerEl=document.getElementById("wall-scale"),this._rulerKey=""},_updateRuler(){if(!this.rulerEl)return;this.rulerEl.style.display=this.mode==="biv"?"none":"";const n=this.controls.target,t=n.clone().project(this.camera),e=n.clone().setY(this.wallHeight(Et.tariff.cap)).project(this.camera),{height:i}=this.container.getBoundingClientRect(),r=Math.abs(e.y-t.y)/2*i,s=r.toFixed(1);if(s===this._rulerKey)return;this._rulerKey=s;const o=Math.max(r,4),a=o+8,l=f=>a-this.wallHeight(f)/this.wallHeight(Et.tariff.cap)*o,c=[0,...Et.tariff.guides],u={},d=c.map(f=>{const m=l(f),_=Object.values(u).every(g=>Math.abs(g-m)>=10);return _&&(u[f]=m),`<line x1="14" x2="22" y1="${m}" y2="${m}" stroke="#6e6259"/>`+(_?`<text x="26" y="${m+3}">${f===Et.tariff.cap?f+"%+":f+"%"}</text>`:"")}).join(""),h=Et.tariff.colors.map((f,m)=>`<stop offset="${Et.tariff.domain[m]/Et.tariff.cap}" stop-color="${f}"/>`).join("");this.rulerEl.innerHTML=`<div class="ws-title">Wall height</div>
            <svg width="64" height="${a+4}" aria-hidden="true">
                <defs><linearGradient id="wsg" x1="0" y1="1" x2="0" y2="0">${h}</linearGradient></defs>
                <rect x="4" y="${a-o}" width="8" height="${o}" fill="url(#wsg)" opacity="0.9"/>
                <line x1="4" x2="12" y1="${a-o}" y2="${a-o}" stroke="#9b1830" stroke-width="1.5"/>
                <line x1="18" x2="18" y1="${l(Et.tariff.cap)}" y2="${a}" stroke="#6e6259"/>
                ${d}
            </svg>`},_addLabel(n,t,e,i){this.invalidate();const r=document.createElement("div");r.className=`map3d-label ${i||""}`,r.innerHTML=t;const s=new Nb(r);return s.position.copy(e),s.userData.kind=n,s.userData.rank=this.labels.length,this.scene.add(s),this.labels.push(s),s},_removeLabels(n){this.invalidate(),this.labels=this.labels.filter(t=>t.userData.kind!==n?!0:(this.scene.remove(t),t.element.remove(),!1))},scenePos(n,t=0){var r;const e=(r=E.countries[n])==null?void 0:r.coords;if(!e)return null;const i=_o(e);return i?new I(i[0]*Ie,t,i[1]*Ie):null},setWallLabels(n){var t,e,i;this._wallLabelIsos=n,this._removeLabels("wall");for(const r of n){const s=(t=this.wallValues)==null?void 0:t[r],o=this.scenePos(r,this.mode==="biv"?.6:this.wallHeight(s)+1.2);if(!o||s==null)continue;const a=((e=E.countries[r])==null?void 0:e.short)||((i=E.countries[r])==null?void 0:i.name)||r;this._addLabel("wall",`<span class="lw-name">${a}</span> <b>${$t(s)}</b>`,o,"lbl-wall")}},setArcMidpoint(n){const t=Math.max(Et.arcRate.cap,n*2);this.arcMid=n,this.arcDomain=[0,n*.5,n,n+(t-n)*.4,t],this.arcRateColor=Ss().domain(this.arcDomain).range(Et.arcRate.colors).clamp(!0)},arcRate(n){const t=n.valueKnown??n.value;return n.duty==null||!t?null:n.duty/t*100},arcColorOf(n){if(E.arcColor==="ns")return Et.flowColors[n.flowCategory];const t=this.arcRate(n);return t==null?"#aea29a":this.arcRateColor(t)},_pos(n,t){if(t==="to"&&n.toLonLat){const e=_o(n.toLonLat);return e?new I(e[0]*Ie,.2,e[1]*Ie):null}return this.scenePos(t==="to"?n.importer:n.exporter,.2)},_clearArcs(n,t){for(const e of n)for(const i of[...e.lines,...e.casings])t.remove(i),i.geometry.dispose(),i.material.dispose()},_buildArc(n,t,e,i){const r=this._pos(n,"from"),s=this._pos(n,"to");if(!r||!s)return null;const o=r.distanceTo(s),a=s.clone().sub(r).normalize(),l=new I(-a.z,0,a.x),c=r.clone().add(s).multiplyScalar(.5).add(l.multiplyScalar(o*.12)).setY(Math.max(4,o*zt.arcLift)+zt.wallMaxHeight*.35),u=new ub(r,c,s),d=u.getPoints(64),{width:h,height:f}=this.container.getBoundingClientRect(),m=E.arcColor==="ns",_=this.arcRate(n)??0,g=xo(m?Et.flowColors[n.flowCategory]:this.arcRateColor(0)),p=xo(m?Et.flowColors[n.flowCategory]:this.arcColorOf(n)),v=m?t:t*(1+Math.min(1.5,_/100*zt.arcStepExaggeration)),x=16,y=d.length/x,L=Math.round(x*zt.arcStepAt),A=[],R=[];for(let D=0;D<x;D++){const b=d.slice(Math.floor(D*y),Math.min(d.length,Math.floor((D+1)*y)+1)),S=D<L?0:D===L?.55:1,C=Math.max(1,t+(v-t)*S),N=g.clone().lerp(p,S),B=new Ic;B.setPositions(b.flatMap(G=>[G.x,G.y,G.z]));const k=new ms({color:N.clone().lerp(Ad,.06),linewidth:C,depthWrite:!1,transparent:!0,opacity:1});k.userData={base:N},k.resolution.set(h,f);const P=new al(B,k);P.renderOrder=e+1,P.userData.flow=n;const H=new ms({color:16777215,linewidth:C+2.2,depthWrite:!1,transparent:!0,opacity:1});H.resolution.set(h,f);const X=new al(B.clone(),H);X.renderOrder=e,i.add(X,P),A.push(P),R.push(X)}return{lines:A,casings:R,curve:u,flow:n}},_drawArcs(n,t,e=10){const i=s=>s.value,r=na().domain([0,_i(n,i)||1]).range([zt.arcMinWidth,zt.arcMaxWidth]);return n.slice().sort((s,o)=>i(s)-i(o)).map((s,o)=>this._buildArc(s,r(i(s)),e+2*o,t)).filter(Boolean)},setFlows(n,t={},e=[]){var s,o;this.invalidate(),this._clearArcs(this.arcObjects,this.arcGroup),this.arcObjects=this._drawArcs(n,this.arcGroup),this.setHoverArcs([]),this.nodeGroup.children.slice().forEach(a=>{var l,c;this.nodeGroup.remove(a),(l=a.geometry)==null||l.dispose(),(c=a.material)==null||c.dispose()});const i=Object.entries(t).filter(([,a])=>a.duty>0),r=na().domain([0,_i(i,a=>a[1].duty)||1]).range([.7,zt.circleMaxRadius]);i.sort((a,l)=>l[1].duty-a[1].duty),i.forEach(([a,l],c)=>{const u=this.scenePos(a,.25);if(!u)return;const d=r(l.duty),h=E.arcColor==="ns"?5195584:xo(this.arcRateColor(l.duty/l.value*100)),f=new ze(new nu(d,32).rotateX(-Math.PI/2),new vr({color:h,transparent:!0,opacity:.92,depthWrite:!1}));f.position.copy(u),f.renderOrder=5+c*.001,f.userData.iso=a;const m=new ze(new la(d,d+.45,32).rotateX(-Math.PI/2),new vr({color:16777215,transparent:!0,depthWrite:!1}));m.position.copy(u).setY(.26),m.renderOrder=5.5+c*.001;const _=new ze(new la(d+.45,d+.62,32).rotateX(-Math.PI/2),new vr({color:5195584,transparent:!0,opacity:.8,depthWrite:!1}));_.position.copy(u).setY(.27),_.renderOrder=5.6+c*.001;const g=this._nodeScale??1;for(const p of[f,m,_])p.scale.set(g,1,g),this.nodeGroup.add(p)}),this._removeLabels("node");for(const a of e){const l=this.scenePos(a,.4);l&&this._addLabel("node",((s=E.countries[a])==null?void 0:s.short)||((o=E.countries[a])==null?void 0:o.name)||a,l,"lbl-node")}},_stepLabel(n){if(n===this._stepFlow||(this._stepFlow=n,this._removeLabels("step"),!n||n.duty==null))return;const t=[...this.arcObjects,...this.hoverArcObjects||[]].find(r=>r.flow===n);if(!t)return;const e=t.curve.getPoint(zt.arcStepAt),i=this.arcRate(n);this._addLabel("step",`+${i.toFixed(1)}% <span>+${re(n.duty)}</span>`,e,"lbl-step")},setHoverArcs(n){this.invalidate(),this.hoverArcGroup||(this.hoverArcGroup=(()=>{const t=new An;return this.scene.add(t),t})()),this._clearArcs(this.hoverArcObjects||[],this.hoverArcGroup),this.hoverArcObjects=n.length?this._drawArcs(n,this.hoverArcGroup,600):[]},_bindPointer(){const n=this.labelRenderer.domElement;let t=null;n.addEventListener("pointermove",e=>this._onMove(e)),n.addEventListener("pointerleave",()=>{var e,i;this.setHover(null),(i=(e=this.handlers).onHover)==null||i.call(e,null)}),n.addEventListener("pointerdown",e=>{t=[e.clientX,e.clientY]}),n.addEventListener("pointerup",e=>{var r,s;if(!t||Math.hypot(e.clientX-t[0],e.clientY-t[1])>5)return;const i=this._hitTest(e);(s=(r=this.handlers).onClick)==null||s.call(r,i,e)})},_hitTest(n){const t=this.container.getBoundingClientRect();this.pointer.set((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera),this.raycaster.camera=this.camera;const e=this.raycaster.intersectObjects(this.arcObjects.flatMap(s=>s.lines),!1);if(e.length)return{type:"arc",flow:e.sort((o,a)=>a.object.renderOrder-o.object.renderOrder)[0].object.userData.flow};const i=this.raycaster.intersectObjects(this.nodeGroup.children.filter(s=>s.userData.iso),!1);if(i.length)return{type:"country",iso:i[0].object.userData.iso};const r=this.raycaster.intersectObject(this.ground,!1);if(r.length){const s=this.isoAtUV(r[0].uv);if(s)return{type:"country",iso:s}}return null},_onMove(n){this._moveRaf||(this._moveRaf=requestAnimationFrame(()=>{var i,r;this._moveRaf=null;const t=this._hitTest(n);this.setHover((t==null?void 0:t.type)==="country"?t.iso:null);const e=(t==null?void 0:t.type)==="arc";this._stepLabel(e?t.flow:null),this.invalidate();for(const s of this.arcObjects){const o=e&&s.flow===t.flow;for(const a of s.lines)a.material.color.copy(a.material.userData.base).lerp(Ad,e?o?0:.7:.08)}this.labelRenderer.domElement.style.cursor=t?"pointer":"",(r=(i=this.handlers).onHover)==null||r.call(i,t,n)}))},_tick(){this.controls.update()&&(this._dirty=!0);const n=Math.min(1,1/Math.sqrt(this.camera.zoom/zt.defaultZoom));if(n!==this._nodeScale){this._nodeScale=n;for(const t of this.nodeGroup.children)t.scale.set(n,1,n);this._dirty=!0}this._dirty&&(this._dirty=!1,this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera),this._declutterLabels(),this._updateRuler())},_declutterLabels(){const n={wall:0,node:1,guide:2},t=this.labels.filter(i=>i.userData.kind in n&&i.element.style.display!=="none").sort((i,r)=>n[i.userData.kind]-n[r.userData.kind]||i.userData.rank-r.userData.rank),e=[];for(const i of t){i.element.style.visibility="visible";const r=i.element.getBoundingClientRect();e.some(o=>r.left<o.right+2&&r.right>o.left-2&&r.top<o.bottom+1&&r.bottom>o.top-1)?i.element.style.visibility="hidden":e.push(r)}},screenOf(n){const t=this.scenePos(n);if(!t)return null;const e=t.project(this.camera),{width:i,height:r}=this.container.getBoundingClientRect();return{x:(e.x+1)/2*i,y:(1-e.y)/2*r}},invalidate(){this._dirty=!0},snapshot(){return this.renderer.domElement.toDataURL("image/png")}};let cl=null;class Pd{constructor(t,e,i){this.elementId=t,this.labelId=e,this.type=i,this.classificationData=null,this.selectedCountries=new Set,this.allCountries=[],this._checkboxByCode={}}async init(){await this.loadClassificationData(),this.buildDropdown()}async loadClassificationData(){try{if(!cl){const t=await fetch("data/country_classification.json");if(!t.ok)throw new Error(`HTTP ${t.status}`);cl=await t.json()}this.classificationData=cl,this.allCountries=Object.keys(this.classificationData.countries).map(t=>({code:t,name:this.classificationData.countries[t].name})).sort((t,e)=>t.name.localeCompare(e.name))}catch(t){console.error("Failed to load country classification:",t)}}getCountriesInRegion(t){return Object.keys(this.classificationData.countries).filter(e=>this.classificationData.countries[e].regions.includes(t))}buildDropdown(){if(!this.classificationData)return;const t=document.getElementById(`${this.elementId}-list`);if(!t)return;t.innerHTML="",this._addSectionHeader(t,"🌍 Geographic Regions"),["5100","5200","5300","5400","5500"].forEach(i=>{const r=this.classificationData.regions[i];if(!r)return;const s=this.getCountriesInRegion(i),{childContainer:o}=this._addGroupRow(t,{label:`${r.name} (All)`,countries:s,indent:0,icon:"▶"});(r.subregions||[]).forEach(a=>{const l=this.getCountriesInRegion(a.code),{childContainer:c}=this._addGroupRow(o,{label:a.name,countries:l,indent:1,icon:"└"});(a.subsubregions||[]).length>0?a.subsubregions.forEach(u=>{const d=this.getCountriesInRegion(u.code),{childContainer:h}=this._addGroupRow(c,{label:u.name,countries:d,indent:2,icon:"  └"});this._addSortedCountries(h,d,3)}):this._addSortedCountries(c,l,2)})}),this._addSectionHeader(t,"📊 Development Status"),["1500","1400","1610"].forEach(i=>{const r=this.classificationData.development[i];if(!r)return;const{childContainer:s}=this._addGroupRow(t,{label:r.name,countries:r.countries,indent:0,icon:"▶"});this._addSortedCountries(s,r.countries,1)})}_addSectionHeader(t,e){const i=document.createElement("div");i.className="picker-section-header",i.textContent=e,t.appendChild(i)}_addGroupRow(t,{label:e,countries:i,indent:r,icon:s}){const o=document.createElement("div");o.className="group-wrapper";const a=document.createElement("div");a.className="group-option",a.style.paddingLeft=`${8+r*14}px`;const l=document.createElement("button");l.type="button",l.className="group-toggle",l.setAttribute("aria-expanded","false"),l.textContent="▶";const c=document.createElement("input");c.type="checkbox",c.className="custom-checkbox group-checkbox",c.dataset.groupCountries=i.join(",");const u=document.createElement("span");u.className="group-icon",u.textContent=s;const d=document.createElement("span");d.className="group-label",d.textContent=e;const h=document.createElement("span");h.className="group-count",h.textContent=i.length,a.appendChild(l),a.appendChild(c),a.appendChild(u),a.appendChild(d),a.appendChild(h);const f=document.createElement("div");return f.className="group-children hidden",l.addEventListener("click",m=>{m.stopPropagation();const _=l.getAttribute("aria-expanded")==="true";l.setAttribute("aria-expanded",String(!_)),f.classList.toggle("hidden")}),c.addEventListener("change",m=>{m.stopPropagation(),m.target.checked?i.forEach(_=>this.selectedCountries.add(_)):i.forEach(_=>this.selectedCountries.delete(_)),this.updateSelection()}),a.addEventListener("click",m=>{m.target===c||m.target===l||(c.checked=!c.checked,c.dispatchEvent(new Event("change")))}),o.appendChild(a),o.appendChild(f),t.appendChild(o),{wrapper:o,childContainer:f}}_addSortedCountries(t,e,i){e.map(s=>{var o;return{code:s,name:((o=this.classificationData.countries[s])==null?void 0:o.name)||s}}).sort((s,o)=>s.name.localeCompare(o.name)).forEach(s=>this._addCountryItem(t,s.code,s.name,i))}_addCountryItem(t,e,i,r=0){const s=document.createElement("div");s.className="country-option",s.style.paddingLeft=`${8+r*14}px`;const o=document.createElement("input");o.type="checkbox",o.className="custom-checkbox",o.dataset.country=e,o.checked=this.selectedCountries.has(e),o.addEventListener("change",l=>{l.stopPropagation(),l.target.checked?this.selectedCountries.add(e):this.selectedCountries.delete(e),this.updateSelection()}),this._checkboxByCode[e]=o;const a=document.createElement("span");a.textContent=i,s.appendChild(o),s.appendChild(a),s.addEventListener("click",l=>{l.target!==o&&(o.checked=!o.checked,o.dispatchEvent(new Event("change")))}),t.appendChild(s)}_syncUI(){var l;const t=document.getElementById(this.labelId),e=this.selectedCountries.size;if(e===0)t.textContent=this.type==="exporter"?"All Exporters":"All Importers";else if(e===1){const c=Array.from(this.selectedCountries)[0],u=(l=this.classificationData)==null?void 0:l.countries[c];t.textContent=u?u.name:c}else t.textContent=`${e} Countries`;for(const[c,u]of Object.entries(this._checkboxByCode)){const d=this.selectedCountries.has(c);u.checked!==d&&(u.checked=d)}this.syncGroupCheckboxes();const i=document.getElementById(`${this.elementId}-count`),r=document.getElementById(`${this.elementId}-btn`);i&&(i.textContent=e,i.classList.toggle("hidden",e===0)),r&&r.classList.toggle("has-selection",e>0);const s=document.getElementById(`m-${this.elementId}-label`);s&&(s.textContent=t.textContent);const o=document.getElementById(`m-${this.elementId}-count`);o&&(o.textContent=e,o.classList.toggle("hidden",e===0));const a=document.getElementById(`m-${this.elementId}-btn`);a&&a.classList.toggle("has-selection",e>0)}updateSelection(){this._syncUI(),document.dispatchEvent(new CustomEvent("shc:selection-change"))}setCountries(t){this.selectedCountries=new Set(t),this._syncUI()}syncGroupCheckboxes(){document.querySelectorAll(`#${this.elementId}-list .group-checkbox`).forEach(t=>{const e=t.dataset.groupCountries.split(","),i=e.filter(r=>this.selectedCountries.has(r)).length;t.checked=i===e.length,t.indeterminate=i>0&&i<e.length})}getSelectedCountries(){return Array.from(this.selectedCountries)}clearAll(){this.selectedCountries.clear(),this.updateSelection()}}const Ld={regions:{Global:{center:[0,20],scale:1},Africa:{center:[18,4],scale:1.75},Americas:{center:[-76,6],scale:1.25},Asia:{center:[98,22],scale:1.9},Europe:{center:[20,50],scale:4.2},Oceania:{center:[150,-22],scale:2.6}}},Ri=n=>document.getElementById(n),yo={init({onClose:n,onSelect:t}){this.onSelect=t,Ri("panel-close-btn").addEventListener("click",n),Ri("panel-body").addEventListener("click",e=>{const i=e.target.closest("[data-iso]");i&&t(i.dataset.iso)})},open(n){Ri("insight-panel").classList.add("open"),document.body.classList.add("panel-open"),this.render(n),this._prefetched||(this._prefetched=!0,at.prefetchAll().then(()=>{E.focusedIso&&this.render(E.focusedIso)}))},close(){Ri("insight-panel").classList.remove("open"),document.body.classList.remove("panel-open")},render(n){const t=E.countries[n]||{name:n};Ri("panel-country-name").textContent=t.name;const e=[t.region,t.dev==="north"?"Developed":"Developing",t.ldc?'<span class="si-badge badge-ldc">LDC</span>':"",t.sids?'<span class="si-badge badge-sids">SIDS</span>':""].filter(Boolean);Ri("panel-country-meta").innerHTML=e.join(" · ");const i=E.water[n],r=at.productIndices(),s=at.tariffFor(n,"MFN",r),o=at.tariffFor(n,"AHS",r),a=at.countryTotals(n);let l=`
        <div class="si-kpi-grid cols-3">
            <div class="si-kpi-card need">
                <div class="si-kpi-label">No safe water</div>
                <div class="si-kpi-value">${i?$t(i.without):"—"}</div>
                <div class="si-kpi-sub">${i?`urban ${$t(i.urban)} · rural ${$t(i.rural)}`:"no JMP estimate"}</div>
            </div>
            <div class="si-kpi-card tariff">
                <div class="si-kpi-label">MFN tariff</div>
                <div class="si-kpi-value">${s?$t(s.value):"—"}</div>
                <div class="si-kpi-sub">${s?`${s.year} · ${s.n} HS lines`:"no data"}</div>
            </div>
            <div class="si-kpi-card applied">
                <div class="si-kpi-label">Applied (AHS)</div>
                <div class="si-kpi-value">${o?$t(o.value):"—"}</div>
                <div class="si-kpi-sub">${o?`${o.year} · incl. preferences`:"no data"}</div>
            </div>
        </div>`;l+=this._rankNarrative(n,i,E.duty==="MFN"?s:o),l+=this._groupBars(n),l+=this._tradeBlock(n,a),l+=this._trend(n,r),l+=this._suppliers(n,a),l+=this._hsTable(n),l+=`<div class="si-foot">Goods: ${at.productLabel()}. Tariffs: WITS/TRAINS simple averages. Trade: UN Comtrade, importer-reported with exporter mirror fallback.</div>`,Ri("panel-body").innerHTML=l},_rankNarrative(n,t,e){const i=Object.entries(E.tariffView).map(([u,d])=>[u,d.value]).sort((u,d)=>d[1]-u[1]),r=i.findIndex(([u])=>u===n),s=Object.entries(E.water).map(([u,d])=>[u,d.without]).sort((u,d)=>d[1]-u[1]),o=s.findIndex(([u])=>u===n);if(r<0&&o<0)return"";const a=[];r>=0&&a.push(`<b>${Dd(r+1)}</b> highest ${E.duty==="MFN"?"MFN":"applied"} tariff of ${i.length} economies`),o>=0&&a.push(`<b>${Dd(o+1)}</b> largest water-access gap of ${s.length}`);const l=at.needTariffQuartiles();let c="";return l&&t&&e&&(t.without>=l.q3&&e.value>=l.highMedian?c='<span class="si-flag">High need · high tariff</span>':t.without>=l.q3&&(c='<span class="si-flag si-flag-soft">High need</span>')),`<div class="si-narrative-box">${c?`<div>${c}</div>`:""}${a.join("<br>")}</div>`},_groupBars(n){const e=[{id:"all",label:"All 16 goods",codes:E.products.hs},...E.products.groups].map(o=>{const a=o.codes.map(u=>E.products.hs.indexOf(u)),l=at.tariffFor(n,"MFN",a),c=at.tariffFor(n,"AHS",a);return{g:o,m:l==null?void 0:l.value,a:c==null?void 0:c.value}}),i=Math.max(Et.tariff.guides[1],_i(e,o=>Math.max(o.m??0,o.a??0))||0),r=(o,a)=>o==null?'<span class="gb-na">n/a</span>':`<span class="gb-bar ${a}" style="width:${(o/i*100).toFixed(1)}%"></span><span class="gb-val">${$t(o)}</span>`,s=E.product;return`<div class="si-section">
            <div class="si-label">Tariffs by technology</div>
            <div class="gb-legend"><span class="gb-key mfn"></span>MFN <span class="gb-key ahs"></span>Applied (AHS)</div>
            ${e.map(o=>`<div class="gb-row${s===o.g.id||s==="all"&&o.g.id==="all"?" active":""}">
                <div class="gb-name">${o.g.label}</div>
                <div class="gb-bars"><div class="gb-line">${r(o.m,"mfn")}</div><div class="gb-line">${r(o.a,"ahs")}</div></div>
            </div>`).join("")}
        </div>`},_tradeBlock(n,t){return t?`<div class="si-section">
            <div class="si-label">Trade in ${E.year}</div>
            <div class="si-kpi-grid cols-3 compact">
                <div class="si-kpi-card"><div class="si-kpi-label">Imports</div><div class="si-kpi-value">${re(t.imp)}</div></div>
                <div class="si-kpi-card tariff"><div class="si-kpi-label">Est. duties paid (${E.duty})</div><div class="si-kpi-value">${t.duty!=null?re(t.duty):"—"}</div>
                    <div class="si-kpi-sub">${t.duty!=null&&t.imp?`${$t(t.duty/t.imp*100,2)} of imports`:"no tariff data"}</div></div>
                <div class="si-kpi-card"><div class="si-kpi-label">Exports</div><div class="si-kpi-value">${re(t.exp)}</div></div>
            </div>
        </div>`:""},_trend(n,t){const e=Et.years,i=e.map(d=>{const h=at.countryTotals(n,d,t);return h?{y:d,imp:h.imp,exp:h.exp}:null});if(i.some(d=>d===null))return`<div class="si-section"><div class="si-label">Imports &amp; exports ${e[0]}–${e[e.length-1]}</div><div class="si-loading">Loading trend…</div></div>`;const r=320,s=70,o=_i(i,d=>Math.max(d.imp,d.exp))||1,a=Mv().domain(e).range([4,r-4]),l=Ss().domain([0,o]).range([s,4]),c=d=>Ov().x(h=>a(h.y)).y(h=>l(h[d]))(i),u=i.find(d=>d.y===E.year);return`<div class="si-section">
            <div class="si-label">Imports &amp; exports ${e[0]}–${e[e.length-1]}</div>
            <div class="si-chart-legend">
                <div class="si-legend-item"><div class="si-legend-swatch" style="background:#4f4740;height:2px"></div><span>Imports</span></div>
                <div class="si-legend-item"><div class="si-legend-swatch" style="background:#009edb;height:2px"></div><span>Exports</span></div>
                <span class="si-legend-max">max ${re(o)}</span>
            </div>
            <svg viewBox="0 0 ${r} ${s+14}" width="100%" role="img" aria-label="Imports and exports trend">
                <line x1="0" x2="${r}" y1="${s}" y2="${s}" stroke="#ded9d5"/>
                <path d="${c("imp")}" fill="none" stroke="#4f4740" stroke-width="1.8"/>
                <path d="${c("exp")}" fill="none" stroke="#009edb" stroke-width="1.8"/>
                ${u?`<line x1="${a(u.y)}" x2="${a(u.y)}" y1="0" y2="${s}" stroke="#aea29a" stroke-dasharray="2,2"/>
                <circle cx="${a(u.y)}" cy="${l(u.imp)}" r="3" fill="#4f4740"/><circle cx="${a(u.y)}" cy="${l(u.exp)}" r="3" fill="#009edb"/>`:""}
                ${e.filter((d,h)=>h%2===0).map(d=>`<text x="${a(d)}" y="${s+12}" text-anchor="middle" font-size="8" fill="#6e6259">${d}</text>`).join("")}
            </svg>
        </div>`},_suppliers(n,t){if(!t||!t.imp)return"";const e=Object.entries(t.suppliers).sort((i,r)=>r[1]-i[1]).slice(0,6);return`<div class="si-section">
            <div class="si-label">Top suppliers ${E.year}</div>
            <div class="si-partners">
            ${e.map(([i,r])=>{const s=at.category(i,n),o=r/t.imp*100;return`<div class="si-partner-row" data-iso="${i}" title="Open ${at.name(i)}">
                    <span class="sp-name">${at.name(i)}</span>
                    <span class="sp-bar-wrap"><span class="sp-bar" style="width:${o.toFixed(1)}%;background:${Et.flowColors[s]}"></span></span>
                    <span class="sp-val" title="Estimated duty on imports from ${at.name(i)}: ${re(t.supplierDuty[i]||0)}">${o.toFixed(0)}% · ${re(r)}</span>
                </div>`}).join("")}
            </div>
        </div>`},_hsTable(n){var u,d,h,f,m,_;const{hs:t,desc:e}=E.products,i=((d=(u=E.tariffs[n])==null?void 0:u.MFN)==null?void 0:d.r)||[],r=((f=(h=E.tariffs[n])==null?void 0:h.AHS)==null?void 0:f.r)||[],s=E.flowsByYear[E.year]||[],o=new Array(t.length).fill(0),a=new Array(t.length).fill(0),l=at.rateVector(n);for(const[g,p,v]of s){if(p!==n)continue;const x=((m=E.countries[g])==null?void 0:m.eu)&&((_=E.countries[p])==null?void 0:_.eu);v.forEach((y,L)=>{o[L]+=y,l&&!x&&(a[L]+=y*l[L]/100)})}const c=t.map((g,p)=>`<tr class="${at.productIndices().includes(p)?"":"muted-row"}">
            <td title="${e[p]}"><b>${g}</b> <span class="hs-desc">${e[p]}</span></td>
            <td class="ar">${i[p]!=null?$t(i[p]):"—"}</td>
            <td class="ar">${r[p]!=null?$t(r[p]):"—"}</td>
            <td class="ar">${o[p]?re(o[p]):"—"}</td>
            <td class="ar">${l&&o[p]?re(a[p]):"—"}</td></tr>`).join("");return`<div class="si-section">
            <div class="si-label">Detail by HS code</div>
            <div class="hs-table-wrap"><table class="si-table hs-table">
                <thead><tr><th>HS 6</th><th class="ar">MFN</th><th class="ar">AHS</th><th class="ar">Imports ${E.year}</th><th class="ar">Est. duty</th></tr></thead>
                <tbody>${c}</tbody>
            </table></div>
        </div>`}};function Dd(n){const t=["th","st","nd","rd"],e=n%100;return n+(t[(e-20)%10]||t[e]||t[0])}const Gb=n=>{if(n==null)return"";const t=String(n);return/[",\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t};function ul(n,t,e,i=[]){const r=[...i.map(a=>`# ${a}`),t.join(","),...e.map(a=>a.map(Gb).join(","))],s=new Blob(["\uFEFF"+r.join(`
`)],{type:"text/csv;charset=utf-8"}),o=document.createElement("a");o.href=URL.createObjectURL(s),o.download=n,document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(o.href),o.remove()},500)}const Id=()=>`${E.product}_${E.year}_${E.region}`.toLowerCase().replace(/[^a-z0-9_]+/g,"-"),hl=()=>["UNCTAD Wastewater Treatment Technology: Trade & Tariff Monitor",`Goods: ${at.productLabel()} | Year: ${E.year} | Scope: ${E.region}`,"Trade: UN Comtrade, importer-reported values (exporter mirror where missing), current USD"],dl={flows(){const n=(E.scopeFlows||[]).slice().sort((t,e)=>e.value-t.value).map(t=>{var e,i;return[E.year,t.exporter,at.name(t.exporter),t.importer,at.name(t.importer),t.flowCategory,Math.round(t.value),t.duty==null?"":Math.round(t.duty),(i=(e=E.tariffView[t.importer])==null?void 0:e.value)==null?void 0:i.toFixed(2),at.needOf(t.importer)]});ul(`wwt_flows_${Id()}.csv`,["year","exporter_iso3","exporter","importer_iso3","importer","flow_category","value_usd",`est_duty_${E.duty.toLowerCase()}_usd`,`importer_${E.duty.toLowerCase()}_tariff_pct`,"importer_pct_without_safe_water"],n,hl())},countries(){const n=at.productIndices(),e=Object.keys(E.countries).filter(i=>at.inScope(i)&&(E.tariffs[i]||E.water[i])).sort().map(i=>{var l,c,u;const r=E.countries[i],s=at.tariffFor(i,"MFN",n),o=at.tariffFor(i,"AHS",n),a=at.countryTotals(i);return[i,r.name,r.region,r.dev==="north"?"Developed":"Developing",r.ldc?1:0,r.sids?1:0,(l=E.water[i])==null?void 0:l.without,(c=s==null?void 0:s.value)==null?void 0:c.toFixed(2),s==null?void 0:s.year,(u=o==null?void 0:o.value)==null?void 0:u.toFixed(2),o==null?void 0:o.year,a?Math.round(a.imp):"",(a==null?void 0:a.duty)==null?"":Math.round(a.duty),a?Math.round(a.exp):""]});ul(`wwt_countries_${Id()}.csv`,["iso3","economy","region","development_status","ldc","sids","pct_without_safe_water","mfn_tariff_pct","mfn_year","applied_tariff_pct","applied_year",`imports_${E.year}_usd`,`est_duty_${E.duty.toLowerCase()}_${E.year}_usd`,`exports_${E.year}_usd`],e,hl())},country(n){var o,a,l;const{hs:t,desc:e}=E.products,i=(o=E.tariffs[n])==null?void 0:o.MFN,r=(a=E.tariffs[n])==null?void 0:a.AHS,s=[];for(const[c,u]of Object.entries(E.flowsByYear))for(const[d,h,f]of u)d!==n&&h!==n||f.forEach((m,_)=>{m&&s.push([c,d===n?"export":"import",d===n?h:d,at.name(d===n?h:d),t[_],e[_],Math.round(m),i==null?void 0:i.r[_],r==null?void 0:r.r[_]])});s.sort((c,u)=>u[0]-c[0]||u[6]-c[6]),ul(`wwt_${n.toLowerCase()}.csv`,["year","direction","partner_iso3","partner","hs6","description","value_usd","mfn_tariff_pct","applied_tariff_pct"],s,[...hl().slice(0,1),`Economy: ${at.name(n)} | years loaded: ${Object.keys(E.flowsByYear).sort().join(" ")}`,`% without safely managed water: ${((l=E.water[n])==null?void 0:l.without)??"n/a"}`])}},jr={read(){const n=new URLSearchParams(location.hash.slice(1));return{year:+n.get("y")||null,product:n.get("p"),duty:n.get("d"),region:n.get("r"),focus:n.get("c"),need:n.get("n"),view:n.get("v"),metric:n.get("m"),arcColor:n.get("k"),flowView:n.get("f")}},applyPreLoad(n){n.year&&Et.years.includes(n.year)&&(E.year=n.year),n.product&&(E.product=n.product),(n.duty==="MFN"||n.duty==="AHS")&&(E.duty=n.duty),n.need==="high"&&(E.importerNeed="high"),(n.view==="biv"||n.view==="3d")&&(E.view=n.view),(n.metric==="value"||n.metric==="duty")&&(E.flowMetric=n.metric),(n.arcColor==="ns"||n.arcColor==="rate")&&(E.arcColor=n.arcColor),["importers","top","region","all"].includes(n.flowView)&&(E.flowView=n.flowView),["Global","Africa","Americas","Asia","Europe","Oceania"].includes(n.region)&&(E.region=n.region)},write(){const n=new URLSearchParams({y:E.year,p:E.product,d:E.duty,r:E.region});E.focusedIso&&n.set("c",E.focusedIso),E.importerNeed==="high"&&n.set("n","high"),E.view!=="3d"&&n.set("v",E.view),E.flowMetric!=="duty"&&n.set("m",E.flowMetric),E.arcColor!=="rate"&&n.set("k",E.arcColor),E.flowView!=="importers"&&n.set("f",E.flowView),history.replaceState(null,"",`#${n.toString()}`)}},Vb=`
<section class="method-section">
    <h3 class="method-section-title">What the map shows</h3>
    <p class="method-note">Three layers are stacked on an Equal Earth projection, viewed at an angle:
    the <strong>ground colour</strong> shows how much of the population lacks safely managed drinking water (need),
    <strong>walls</strong> raised along each economy's border show the tariff it applies to water and wastewater treatment goods (barrier),
    and <strong>arcs</strong> show bilateral trade in those goods (supply). Economies whose share of the population without safely
    managed drinking water is highest tend to apply the highest tariffs on the equipment needed to close that gap.</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Products</h3>
    <dl class="method-dl">
        <dt>Coverage</dt>
        <dd>16 HS 6-digit codes that cover equipment used in water and wastewater treatment, grouped into five technology groups:
        <strong>Pumping</strong> (841350, 841370, 841391); <strong>Aeration &amp; air handling</strong> (841440, 841480, 841490);
        <strong>Filtration &amp; purification</strong> (842121, 842199); <strong>Process equipment</strong> (841989, 847982);
        <strong>Monitoring &amp; control</strong> (853710, 902610, 902620, 902730, 902789, 902790).</dd>
        <dt>Caveat</dt>
        <dd>Most of these codes also cover goods used outside water treatment (for example general-purpose pumps, compressors,
        control panels and laboratory instruments). Figures describe trade in <em>WWT-related goods</em>, not in water-treatment use only.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Trade data</h3>
    <dl class="method-dl">
        <dt>Source</dt>
        <dd>UN Comtrade, 2010–2024, current US dollars.</dd>
        <dt>Mirror data</dt>
        <dd>For each exporter–importer–product–year, the value reported by the importer is used. Where the importer does not report,
        the value reported by the exporter is used. About 97% of the value comes from importer reports.
        Many least developed countries report incompletely, so mirror data give them better coverage.</dd>
        <dt>Direction</dt>
        <dd>Arcs are gross, directed flows from exporter to importer. They are not netted, because the tariff applies to gross imports.
        Arcs bend clockwise, so flows in opposite directions between the same pair do not overlap.</dd>
        <dt>High-need importers</dt>
        <dd>The <strong>Importers: High need</strong> switch keeps only flows into economies in the global top quarter of the share of population without safely managed drinking water.</dd>
        <dt>Display threshold</dt>
        <dd>As in UNCTAD's Second-Hand Clothes Trade Monitor, at most 40 arcs are drawn in Auto mode (global floor $10&thinsp;M). Exports (CSV) ignore the threshold.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Flow direction classification</h3>
    <p class="method-note">Economies are classified as <strong>North</strong> (developed) or <strong>South</strong> (developing) using the UNCTAD development-status classification.</p>
    <dl class="method-dl">
        <dt><span class="method-flow-dot" style="background:#009EDB"></span> N&rarr;S</dt><dd>Developed exporter, developing importer</dd>
        <dt><span class="method-flow-dot" style="background:#72BF44"></span> S&rarr;N</dt><dd>Developing exporter, developed importer</dd>
        <dt><span class="method-flow-dot" style="background:#FBAF17"></span> S&rarr;S</dt><dd>Both developing</dd>
        <dt><span class="method-flow-dot" style="background:#AEA29A"></span> N&rarr;N</dt><dd>Both developed</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Tariffs (walls)</h3>
    <dl class="method-dl">
        <dt>Source</dt>
        <dd>WITS / UNCTAD TRAINS, latest year available for each reporter (mostly 2023). The panel shows the year for each economy.</dd>
        <dt>Measures</dt>
        <dd><strong>MFN</strong>: most-favoured-nation applied rate. <strong>Applied (AHS)</strong>: effectively applied rate, including preferential rates.</dd>
        <dt>Aggregation</dt>
        <dd>For the selected goods, the wall shows the <em>simple average</em> of the HS 6-digit simple-average rates.
        Trade-weighted averages are not used: prohibitive tariffs suppress imports and would therefore receive little weight.</dd>
        <dt>Height</dt>
        <dd>Linear in the tariff and capped at 20%. Walls for the few economies above 20% stop at the cap; their exact rate is in the labels, tooltip and panel.
        Reference levels at 5, 10 and 20% appear on the ruler and, when an economy is selected, as dashed rings around its wall.</dd>
        <dt>Borders</dt>
        <dd>Walls follow each economy's border, pulled slightly inwards so that neighbours do not share one line.
        Economies too small to draw are shown as a symbolic ring, so small island developing States stay visible.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Estimated duties paid (arcs and KPIs)</h3>
    <dl class="method-dl">
        <dt>Formula</dt>
        <dd>For each exporter → importer corridor: Σ over the selected HS codes of <em>trade value × importer's tariff rate</em>.
        The rate is the importer's MFN or applied (AHS) simple average for that HS code (latest year). Where one HS rate is missing, the importer's mean rate is used.</dd>
        <dt>Preferences</dt>
        <dd>Trade within the European Union is treated as duty-free (customs union). Other bilateral preferences are not modelled.
        MFN therefore gives an upper-bound estimate; AHS is closer to the duties actually collected.</dd>
        <dt>Interpretation</dt>
        <dd>A static, first-order estimate of the extra cost on water treatment equipment. It does not account for exemptions for public utilities or donor projects, for smuggling, or for imports that the tariff prevents.</dd>
        <dt>Circles</dt>
        <dd>Each importing economy gets a circle: <strong>size</strong> = estimated duties it pays on the selected goods, <strong>colour</strong> = its effective duty rate (same key as the arcs). This is the default view: it shows who pays, and how heavily, without drawing every trade route.</dd>
        <dt>Show</dt>
        <dd><strong>Importers</strong>: circles only; hovering an economy draws its 8 largest supplier corridors. <strong>Top 15</strong>: the 15 largest duty corridors into economies in the global top quarter of need. <strong>Regions</strong>: corridors grouped from each supplier to an importing region (anchored at the trade-weighted centre of that region's importers). <strong>All</strong>: every corridor above the adaptive threshold, with the North/South and threshold filters. Selecting an economy always shows its own corridors. Arcs are static and widen towards the importer, where the duty is paid.</dd>
        <dt>Arc encoding</dt>
        <dd>Every arc runs from supplier to importer. Its <strong>first half</strong> is the shipment at its export price, i.e. before any duty: it takes the 0% colour of the duty-rate scale (UNCTAD blue), width = trade value. At the <strong>midpoint of every arc</strong> (the same place on all arcs, so small economies are as readable as large ones) the importer's duty is added: the line turns to the duty-rate colour and widens by the rate. The widening is exaggerated ×4 so that rates of 1–12% remain visible. Hover an arc for the exact rate and duty, and for the products shipped on that corridor.</dd>
        <dt>Why arcs into the same economy differ</dt>
        <dd>The importer sets a rate per HS code; each supplier ships a different mix of codes. The corridor's effective rate is the trade-weighted mix of the importer's rates, so, for example, a supplier shipping mostly water-purifying machinery (HS 842121) to Ethiopia faces 30%, while one shipping mostly control panels (HS 853710) faces 5%. With a single HS code selected, all arcs into one economy share its rate (except duty-free intra-EU trade). The arc tooltip lists the main products, their share and the importer's rate for each.</dd>
        <dt>Landed cost of $100</dt>
        <dd>The side panel shows what $100 of equipment costs once the importer's tariff is added, for the high need · high tariff economies, against the median of the low-need third and of all economies.</dd>
        <dt>Arcs</dt>
        <dd>By default, arc <strong>width</strong> shows the duties paid (USD) and arc <strong>colour</strong> shows the effective duty rate on the corridor (duties ÷ trade value), on a diverging scale centred on the <strong>world average effective duty rate</strong> for the selected goods and measure (e.g. 2.46% for all 16 goods, MFN, 2024): UNCTAD water blue below the world average, neutral grey at it, red above, dark red at 15% or more.
        Switch <strong>Arcs</strong> to "Trade value" for width by trade, and <strong>Colour</strong> to "N/S" for the development-status colours. The display threshold adapts to the chosen measure.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Bivariate map (Need × tariff)</h3>
    <p class="method-note">Economies with both indicators are split into thirds (tertiles) of need and thirds of tariff, for the selected goods and tariff measure.
    The 3 × 3 colour key combines UNCTAD purple (need) and UNCTAD red (tariff). The darkest cell marks economies with <strong>high need and high tariffs</strong>.
    The view is top-down and the walls are hidden, because the tariff is already encoded in the colour.</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Water access (ground)</h3>
    <dl class="method-dl">
        <dt>Indicator</dt>
        <dd>100 minus the share of the population using safely managed drinking-water services (SDG 6.1.1), national total, latest year (mostly 2024).</dd>
        <dt>Source</dt>
        <dd>WHO/UNICEF Joint Monitoring Programme (JMP). Hatched land (grey diagonal lines) means no JMP estimate is available (e.g. China, Kenya, Australia). It is deliberately not a colour, so it cannot be mistaken for a low share.</dd>
    </dl>
</section>

<section class="method-section">
    <h3 class="method-section-title">Need vs tariff indicator (KPI bar)</h3>
    <p class="method-note">Economies with both a tariff and a water-access estimate are split into quarters by the share of the population
    without safely managed drinking water. The KPI bar compares the median tariff of the highest-need quarter with that of the lowest-need quarter,
    for the selected goods, tariff measure and region. Globally, for all 16 goods (MFN), the medians rise steadily across the quarters (about 1.2%, 2.2%, 3.1% and 6.4%);
    the Spearman rank correlation is about 0.5 (135 economies).</p>
</section>

<section class="method-section">
    <h3 class="method-section-title">Map disclaimer</h3>
    <p class="method-note">The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.
    Dotted and dashed lines represent approximate borders for which the final status has not yet been agreed.</p>
</section>

<section class="method-section method-section-last">
    <h3 class="method-section-title">How to cite</h3>
    <p class="method-cite">UNCTAD (2026). <em>Wastewater Treatment Technology: Trade &amp; Tariff Monitor.</em> United Nations Conference on Trade and Development, Geneva.</p>
</section>
`,rn=n=>document.getElementById(n),mr=316,gr=262,Oe={top:12,right:10,bottom:34,left:36},Pi=25,ls={init({onHover:n,onSelect:t,onToggle:e}){this.onHover=n,this.onSelect=t,this.onToggle=e,this.panel=rn("analysis-panel"),rn("scatter-toggle").addEventListener("click",()=>this.toggle(!0)),rn("analysis-close").addEventListener("click",()=>this.toggle(!1)),this.svg=Dg("#scatter-svg").attr("viewBox",`0 0 ${mr} ${gr}`),rn("hh-list").addEventListener("click",i=>{var s;const r=i.target.closest("[data-iso]");r&&((s=this.onSelect)==null||s.call(this,r.dataset.iso))}),rn("hh-list").addEventListener("mouseover",i=>{var s;const r=i.target.closest("[data-iso]");r&&((s=this.onHover)==null||s.call(this,r.dataset.iso),this.highlight(r.dataset.iso))}),rn("hh-list").addEventListener("mouseleave",()=>{var i;(i=this.onHover)==null||i.call(this,null),this.highlight(null)})},isOpen(){return this.panel.classList.contains("open")},toggle(n=!this.isOpen()){var t;this.panel.classList.toggle("open",n),document.body.classList.toggle("analysis-open",n),rn("scatter-toggle").setAttribute("aria-pressed",String(n)),(t=this.onToggle)==null||t.call(this,n),n&&this.render()},render(){if(!this.isOpen())return;const n=at.bivariate(),t=this.svg;if(t.selectAll("*").remove(),this.dots=null,n.n<9)return;const e={};for(const v of E.allFlows)e[v.importer]=(e[v.importer]||0)+(v.duty??0);const i=Object.entries(n.cls).map(([v,x])=>({iso:v,c:x,need:at.needOf(v),tariff:E.tariffView[v].value,duty:e[v]||0,inScope:at.inScope(v)})),r=na().domain([0,100]).range([Oe.left,mr-Oe.right]),s=Ss().domain([0,Pi]).range([gr-Oe.bottom,Oe.top]),o=na().domain([0,_i(i,v=>v.duty)||1]).range([2,10]),a=[0,n.nb[0],n.nb[1],100],l=[0,n.tb[0],n.tb[1],Pi],c=t.append("g");for(let v=0;v<3;v++)for(let x=0;x<3;x++)c.append("rect").attr("x",r(a[v])).attr("width",r(a[v+1])-r(a[v])).attr("y",s(Math.min(l[x+1],Pi))).attr("height",s(l[x])-s(Math.min(l[x+1],Pi))).attr("fill",Et.bivariate[v][x]).attr("opacity",v===2&&x===2?.34:.16);const u=t.append("g").attr("class","sc-breaks");n.nb.forEach(v=>u.append("line").attr("x1",r(v)).attr("x2",r(v)).attr("y1",Oe.top).attr("y2",gr-Oe.bottom)),n.tb.forEach(v=>u.append("line").attr("x1",Oe.left).attr("x2",mr-Oe.right).attr("y1",s(v)).attr("y2",s(v))),t.append("text").attr("class","sc-hh-lbl").attr("x",mr-Oe.right-3).attr("y",Oe.top+10).attr("text-anchor","end").text("High need · high tariff"),t.append("g").attr("class","sc-axis").attr("transform",`translate(0,${gr-Oe.bottom})`).call(jp(r).tickValues([0,5,10,25,50,75,100]).tickFormat(v=>v+"%").tickSizeOuter(0)),t.append("g").attr("class","sc-axis").attr("transform",`translate(${Oe.left},0)`).call(Zp(s).ticks(5).tickFormat(v=>v+"%").tickSizeOuter(0)),t.append("text").attr("class","sc-axis-title").attr("x",(mr+Oe.left)/2).attr("y",gr-3).attr("text-anchor","middle").text("Population without safely managed water (√ scale) →"),t.append("text").attr("class","sc-axis-title").attr("transform",`translate(10,${(gr-Oe.bottom)/2}) rotate(-90)`).attr("text-anchor","middle").text(`${E.duty==="MFN"?"MFN":"Applied"} tariff →`);const d=i.slice().sort((v,x)=>x.duty-v.duty);this.dots=t.append("g").selectAll("circle").data(d,v=>v.iso).join("circle").attr("class",v=>`sc-dot${v.inScope?"":" out"}`).attr("cx",v=>r(v.need)).attr("cy",v=>s(Math.min(v.tariff,Pi))).attr("r",v=>o(v.duty)).attr("fill",v=>Et.bivariate[v.c[0]][v.c[1]]).attr("tabindex",v=>v.inScope?0:-1).attr("aria-label",v=>`${at.name(v.iso)}: ${$t(v.need)} without safe water, tariff ${$t(v.tariff)}, duties ${re(v.duty)}`),this.dots.on("mouseenter focus",(v,x)=>{var y;(y=this.onHover)==null||y.call(this,x.iso),this.highlight(x.iso)}).on("mouseleave blur",()=>{var v;(v=this.onHover)==null||v.call(this,null),this.highlight(null)}).on("click keydown",(v,x)=>{var y;(v.type==="click"||v.key==="Enter")&&((y=this.onSelect)==null||y.call(this,x.iso))}),t.append("g").selectAll("text").data(i.filter(v=>v.tariff>Pi)).join("text").attr("class","sc-over").attr("x",v=>r(v.need)).attr("y",Oe.top+3).attr("text-anchor","middle").text("▲"),this.labelLayer=t.append("g").attr("class","sc-labels"),this.x=r,this.y=s,this.pts=i;const h=i.filter(v=>v.c[0]===2&&v.c[1]===2&&v.inScope).sort((v,x)=>x.tariff-v.tariff),f=i.filter(v=>v.c[0]===0),m=[{label:"Low-need median",tariff:Io(f,v=>v.tariff),cls:"ref-low"},{label:"All-economy median",tariff:Io(i,v=>v.tariff),cls:"ref-all"}],_=Math.max(15,_i(h,v=>v.tariff)||0),g=v=>`<span class="ld-bar"><span class="ld-base"></span><span class="ld-duty" style="width:${(Math.min(v,_)/_*100*.55).toFixed(1)}%"></span></span>`,p=v=>`$${(100+v).toFixed(1)}`;rn("ladder-measure").textContent=`${E.duty==="MFN"?"MFN":"applied"} tariff, ${at.productLabel().replace("All 16 WWT-related goods","all 16 goods")}`,rn("hh-count").textContent=`${h.length} economies`,rn("hh-refs").innerHTML=m.map(v=>`<div class="ld-row ${v.cls}">
                <span class="hh-name">${v.label}</span>${g(v.tariff)}<span class="ld-cost">${p(v.tariff)}</span></div>`).join(""),rn("hh-list").innerHTML=h.length?h.map(v=>{var x;return`
            <button class="hh-row ld-row" data-iso="${v.iso}" type="button"
                title="${at.name(v.iso)} · ${$t(v.need,0)} without safe water · est. duties paid ${E.year}: ${re(v.duty)} · click to open">
                <span class="hh-name">${((x=E.countries[v.iso])==null?void 0:x.short)||at.name(v.iso)}</span>${g(v.tariff)}<span class="ld-cost">${p(v.tariff)}</span>
            </button>`}).join(""):'<div class="hh-empty">None in the current scope.</div>',rn("analysis-note").innerHTML=`Thirds of ${n.n} economies — need breaks ${$t(n.nb[0],0)} / ${$t(n.nb[1],0)}, tariff breaks ${$t(n.tb[0])} / ${$t(n.tb[1])} (${E.duty}). Colours match the <b>Need × tariff</b> map; dot size = estimated duties paid, ${E.year}.`,this.highlight(this._hover||null)},highlight(n){if(this._hover=n,!this.dots)return;this.dots.classed("hover",e=>e.iso===n).classed("focus",e=>e.iso===E.focusedIso),this.dots.filter(e=>e.iso===n||e.iso===E.focusedIso).raise();const t=this.pts.filter(e=>e.iso===n||e.iso===E.focusedIso);this.labelLayer.selectAll("text").data(t,e=>e.iso).join("text").attr("x",e=>Math.min(this.x(e.need)+8,mr-70)).attr("y",e=>this.y(Math.min(e.tariff,Pi))-7).text(e=>{var i;return((i=E.countries[e.iso])==null?void 0:i.short)||at.name(e.iso)}),document.querySelectorAll("#hh-list .hh-row").forEach(e=>{e.classList.toggle("hover",e.dataset.iso===n),e.classList.toggle("focus",e.dataset.iso===E.focusedIso)})}},Tn='Inter, "Helvetica Neue", Arial, sans-serif';function Wb(){var g,p;const n=wt.renderer.domElement;wt.renderer.render(wt.scene,wt.camera);const t=wt.container.clientWidth,e=wt.container.clientHeight,i=n.width/t,r=84,s=74,o=document.createElement("canvas");o.width=n.width,o.height=n.height+(r+s)*i;const a=o.getContext("2d");a.scale(i,i),a.fillStyle="#f3f8fd",a.fillRect(0,0,t,e+r+s),a.fillStyle="#009edb",a.fillRect(0,e+r+s-4,t,4),a.fillStyle="#000",a.font=`700 22px ${Tn}`,a.fillText("Wastewater Treatment Technology: Trade & Tariff Monitor",20,32),a.fillStyle="rgba(0,0,0,0.6)",a.font=`400 12.5px ${Tn}`;const l=at.needTariffQuartiles(),c=l?` · Median ${E.duty} tariff ${l.highMedian.toFixed(1)}% in the highest-need quarter vs ${l.lowMedian.toFixed(1)}% in the lowest`:"";a.fillText(`${E.year} · ${at.productLabel()} · ${E.region==="Global"?"World":E.region}${c}`,20,54),a.fillStyle="#ab1d37",a.font=`600 12.5px ${Tn}`,a.fillText(`Estimated import duties paid: ${re(E.scopeDuty||0)} · of which by highest-need importers: ${re(at.dutyHighNeed())}`,20,71),a.drawImage(n,0,r,t,e);const u=wt.container.getBoundingClientRect();for(const v of wt.labels){const x=v.element;if(x.style.display==="none"||x.style.visibility==="hidden")continue;const y=x.getBoundingClientRect();if(y.right<u.left||y.left>u.right||y.bottom<u.top||y.top>u.bottom)continue;const L=y.left-u.left,A=y.top-u.top+r;if(x.classList.contains("lbl-wall")){a.fillStyle="rgba(255,255,255,0.92)",a.strokeStyle="rgba(171,29,55,0.35)",a.fillRect(L,A,y.width,y.height),a.strokeRect(L+.5,A+.5,y.width-1,y.height-1);const R=((g=x.querySelector(".lw-name"))==null?void 0:g.textContent)||"",D=((p=x.querySelector("b"))==null?void 0:p.textContent)||"";a.font=`600 10.5px ${Tn}`,a.fillStyle="#231f20",a.fillText(R,L+5,A+y.height-5);const b=a.measureText(R+" ").width;a.font=`700 10.5px ${Tn}`,a.fillStyle="#ab1d37",a.fillText(D,L+5+b,A+y.height-5)}else a.font=`600 ${x.classList.contains("lbl-guide")?9.5:11}px ${Tn}`,a.lineWidth=3,a.strokeStyle="#fff",a.lineJoin="round",a.strokeText(x.textContent,L,A+y.height-3),a.fillStyle=x.classList.contains("lbl-guide")?"#004990":"#231f20",a.fillText(x.textContent,L,A+y.height-3)}let d=r+e+18,h=20;a.font=`700 9px ${Tn}`,a.fillStyle="#6e6259";const f=v=>{a.font=`700 9px ${Tn}`,a.fillStyle="#6e6259",a.fillText(v.toUpperCase(),h,d),h+=a.measureText(v.toUpperCase()).width+8},m=(v,x=16)=>{a.fillStyle=v,a.fillRect(h,d-8,x,9),h+=x+1},_=v=>{a.font=`400 10px ${Tn}`,a.fillStyle="#6e6259",a.fillText(v,h,d),h+=a.measureText(v).width+6};if(E.view==="biv"){f("Need × tariff"),_("need ↑");for(let v=0;v<3;v++)for(let x=0;x<3;x++)a.fillStyle=Et.bivariate[v][x],a.fillRect(h+x*9,d+2-(v+1)*9,8,8);h+=30,_("tariff →"),m(wt.noDataPattern(a,.8),12),h+=3,_("no data"),h+=14}else{f("No safe water"),_("0%"),[10,30,50,70,90].forEach(x=>m(wt.needColor(x))),h+=4,_("100%"),m(wt.noDataPattern(a,.8),12),h+=3,_("no data"),h+=14,f(`Tariff wall (${E.duty})`),_("0%");const v=a.createLinearGradient(h,0,h+70,0);Et.tariff.colors.forEach((x,y)=>v.addColorStop(Et.tariff.domain[y]/Et.tariff.cap,x)),m(v,70),h+=4,_(`${Et.tariff.cap}%+`),h+=14}if(f(E.flowMetric==="duty"?"Arcs: width = duties paid":"Arcs: width = trade"),E.arcColor==="rate"){_("colour = duty rate 0%");const v=wt.arcDomain,x=v[v.length-1],y=a.createLinearGradient(h,0,h+60,0);Et.arcRate.colors.forEach((L,A)=>y.addColorStop(v[A]/x,L)),a.fillStyle=y,a.fillRect(h,d-6,60,4),h+=64,_(`${+x.toFixed(1)}%+ (grey = world avg ${wt.arcMid.toFixed(2)}%)`)}else for(const[v,x]of Object.entries(Et.flowColors))a.fillStyle=x,a.fillRect(h,d-5,14,3),h+=18,_({"north-south":"N→S","south-north":"S→N","south-south":"S→S","north-north":"N→N"}[v]);d+=20,h=20,a.font=`400 9.5px ${Tn}`,a.fillStyle="#6e6259",a.fillText("Sources: UNCTAD calculations based on UN Comtrade (importer-reported, exporter mirror fallback), WITS/TRAINS (simple-average tariffs, latest year), WHO/UNICEF JMP 2024. Duties = trade value × importer tariff per HS code (intra-EU duty-free).",h,d),a.fillText("The boundaries and names shown and the designations used on this map do not imply official endorsement or acceptance by the United Nations.",h,d+13),o.toBlob(v=>{const x=document.createElement("a");x.href=URL.createObjectURL(v),x.download=`wwt_map_${E.product}_${E.year}_${E.region}.png`.toLowerCase(),document.body.appendChild(x),x.click(),setTimeout(()=>{URL.revokeObjectURL(x.href),x.remove()},500)},"image/png")}const st=n=>document.getElementById(n),$b=wt.groundColor,Xb=n=>n>=1e6?`$${+(n/1e6).toFixed(1)}M`:n>=1e3?`$${+(n/1e3).toFixed(0)}K`:`$${Math.round(n)}`,wp={async init(){if(!this._webglOK()){st("loader").classList.add("hidden"),st("webgl-error").classList.remove("hidden");return}jr.applyPreLoad(jr.read());try{await at.loadAll()}catch(t){console.error(t),st("loader").querySelector("p").textContent="Could not load data.";return}this._populateSelects(),wt.init(st("map-container"),{onHover:(t,e)=>this.showTooltip(t,e),onClick:t=>this.onMapClick(t)}),this.exporterSelector=new Pd("exp","exp-label","exporter"),this.importerSelector=new Pd("imp","imp-label","importer"),await Promise.all([this.exporterSelector.init(),this.importerSelector.init()]),this._setupPicker("exp",this.exporterSelector),this._setupPicker("imp",this.importerSelector),document.addEventListener("shc:selection-change",()=>{E.selectedExporters=new Set(this.exporterSelector.getSelectedCountries()),E.selectedImporters=new Set(this.importerSelector.getSelectedCountries()),this.update({walls:!1})}),this._bindControls(),st("methodology-body").innerHTML=Vb,yo.init({onClose:()=>this.focusCountry(null),onSelect:t=>this.focusCountry(t)}),ls.init({onHover:t=>this.hoverCountry(t),onSelect:t=>this.focusCountry(t)}),window.innerWidth>=1400&&ls.toggle(!0);const n=jr.read();E.view==="biv"&&(document.body.classList.add("view-biv"),at.computeTariffView(),this._applyGroundColours(),wt.drawGround(),wt.setMode("biv",!1)),this._syncControls(),await this.update({animate:!1}),n.region&&n.region!=="Global"&&this._flyToRegion(n.region,!1),n.focus&&E.countries[n.focus]&&this.focusCountry(n.focus),st("loader").classList.add("hidden"),window.__wwtReady=!0},_webglOK(){try{const n=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&n.getContext("webgl2"))}catch{return!1}},_populateSelects(){const n=Et.years.slice().reverse();for(const o of["year-select","m-year-select"])st(o).innerHTML=n.map(a=>`<option value="${a}">${a}</option>`).join("");const{hs:t,desc:e,groups:i}=E.products,r=o=>o.length>58?o.slice(0,56)+"…":o;let s='<option value="all">All 16 WWT-related goods</option>';s+=`<optgroup label="Technology groups">${i.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}</optgroup>`;for(const o of i)s+=`<optgroup label="${o.label} · HS codes">${o.codes.map(a=>`<option value="${a}">${a} – ${r(e[t.indexOf(a)])}</option>`).join("")}</optgroup>`;st("product-select").innerHTML=s,st("m-product-select").innerHTML=s},_syncControls(){for(const n of["year-select","m-year-select"])st(n).value=E.year;for(const n of["product-select","m-product-select"])st(n).value=E.product;document.querySelectorAll(".duty-btn").forEach(n=>n.classList.toggle("active",n.dataset.duty===E.duty)),document.querySelectorAll(".region-btn").forEach(n=>n.classList.toggle("active",n.dataset.region===E.region)),document.querySelectorAll(".threshold-btn").forEach(n=>n.classList.toggle("active",String(n.dataset.threshold)===String(E.thresholdMode))),document.querySelectorAll(".need-btn").forEach(n=>n.classList.toggle("active",n.dataset.need===E.importerNeed)),document.querySelectorAll(".view-btn").forEach(n=>n.classList.toggle("active",n.dataset.view===E.view)),document.querySelectorAll(".metric-btn").forEach(n=>n.classList.toggle("active",n.dataset.metric===E.flowMetric)),document.querySelectorAll(".arccolor-btn").forEach(n=>n.classList.toggle("active",n.dataset.arccolor===E.arcColor)),document.querySelectorAll(".flowview-btn").forEach(n=>n.classList.toggle("active",n.dataset.flowview===E.flowView)),document.body.classList.toggle("flows-all",E.flowView==="all"),document.querySelectorAll(".threshold-btn").forEach(n=>{n.dataset.threshold!=="auto"&&(n.textContent=Xb(+n.dataset.threshold*at.metricScale()))}),document.querySelectorAll(".flow-checkbox").forEach(n=>{n.checked=E.flowFilters.has(n.value)}),st("mobile-filter-badge").textContent=this._activeFilterCount()||""},_activeFilterCount(){let n=0;return E.region!=="Global"&&n++,E.product!=="all"&&n++,E.duty!=="MFN"&&n++,E.flowFilters.size<4&&n++,E.importerNeed!=="all"&&n++,(E.selectedExporters.size||E.selectedImporters.size)&&n++,n},_bindControls(){const n=async h=>{this.stopAnimation(),E.year=+h.target.value,await this.update({walls:!1})};st("year-select").addEventListener("change",n),st("m-year-select").addEventListener("change",n);const t=h=>{E.product=h.target.value,this.update()};st("product-select").addEventListener("change",t),st("m-product-select").addEventListener("change",t),document.querySelectorAll(".duty-btn").forEach(h=>h.addEventListener("click",()=>{E.duty=h.dataset.duty,this.update()})),document.querySelectorAll(".region-btn").forEach(h=>h.addEventListener("click",()=>{E.region=h.dataset.region,wt.drawGround(),this._flyToRegion(E.region,!0),this.update({walls:!1})})),document.querySelectorAll(".view-btn").forEach(h=>h.addEventListener("click",()=>this.setView(h.dataset.view))),document.querySelectorAll(".metric-btn").forEach(h=>h.addEventListener("click",()=>{E.flowMetric=h.dataset.metric,this.update({walls:!1})})),document.querySelectorAll(".flowview-btn").forEach(h=>h.addEventListener("click",()=>{E.flowView=h.dataset.flowview,this.update({walls:!1})})),document.querySelectorAll(".arccolor-btn").forEach(h=>h.addEventListener("click",()=>{E.arcColor=h.dataset.arccolor,this.update({walls:!1})})),document.querySelectorAll(".need-btn").forEach(h=>h.addEventListener("click",()=>{E.importerNeed=h.dataset.need,this.update({walls:!1})})),document.querySelectorAll(".threshold-btn").forEach(h=>h.addEventListener("click",()=>{E.thresholdMode=h.dataset.threshold==="auto"?"auto":+h.dataset.threshold,this.update({walls:!1})})),document.querySelectorAll(".flow-checkbox").forEach(h=>h.addEventListener("change",()=>{h.checked?E.flowFilters.add(h.value):E.flowFilters.delete(h.value),this.update({walls:!1})}));const e=h=>{const f=wt.camera;f.zoom=qb(f.zoom*h,wt.controls.minZoom,wt.controls.maxZoom),f.updateProjectionMatrix()};st("view-zoom-in").addEventListener("click",()=>e(1.35)),st("view-zoom-out").addEventListener("click",()=>e(1/1.35)),st("view-reset").addEventListener("click",()=>{wt.flat=!1,st("view-flat").setAttribute("aria-pressed","false"),st("view-flat").textContent="Top",wt.controls.minPolarAngle=zt.polarRangeDeg[0]*Math.PI/180,wt.controls.maxPolarAngle=zt.polarRangeDeg[1]*Math.PI/180,E.region!=="Global"?this._flyToRegion(E.region,!0):wt.resetView(!0)}),st("view-flat").addEventListener("click",()=>{const h=!wt.flat;wt.setFlat(h),st("view-flat").setAttribute("aria-pressed",String(h)),st("view-flat").textContent=h?"3D":"Top"});const i=st("export-menu"),r=st("export-btn");r.addEventListener("click",h=>{h.stopPropagation(),i.classList.toggle("hidden"),r.setAttribute("aria-expanded",String(!i.classList.contains("hidden"))),st("export-scope").textContent=this._scopeLabel()}),document.addEventListener("click",h=>{!i.contains(h.target)&&h.target!==r&&(i.classList.add("hidden"),r.setAttribute("aria-expanded","false"))}),document.querySelectorAll("[data-export]").forEach(h=>h.addEventListener("click",()=>{i.classList.add("hidden"),h.dataset.export==="flows"?dl.flows():h.dataset.export==="png"?Wb():dl.countries()})),st("panel-export-btn").addEventListener("click",()=>E.focusedIso&&dl.country(E.focusedIso));const s=st("methodology-modal");st("methodology-btn").addEventListener("click",()=>s.classList.remove("hidden")),st("methodology-modal-close").addEventListener("click",()=>s.classList.add("hidden")),st("methodology-modal-backdrop").addEventListener("click",()=>s.classList.add("hidden")),document.addEventListener("keydown",h=>{h.key==="Escape"&&(s.classList.add("hidden"),E.focusedIso&&this.focusCountry(null))}),st("anim-btn").addEventListener("click",()=>this._anim?this.stopAnimation():this.startAnimation());const o=st("mobile-filter-panel"),a=st("mobile-filter-backdrop"),l=h=>{o.classList.toggle("open",h),a.classList.toggle("hidden",!h)};st("mobile-filter-btn").addEventListener("click",()=>l(!0)),st("mobile-filter-close").addEventListener("click",()=>l(!1)),a.addEventListener("click",()=>l(!1));const c=st("legend-panel"),u=st("mobile-legend-backdrop"),d=h=>{c.classList.toggle("mobile-open",h),u.classList.toggle("hidden",!h)};st("mobile-legend-btn").addEventListener("click",()=>d(!0)),st("mobile-legend-close").addEventListener("click",()=>d(!1)),u.addEventListener("click",()=>d(!1))},_setupPicker(n,t){const e=st(`${n}-btn`),i=st(`${n}-menu`),r=st(`${n}-search`);e.addEventListener("click",s=>{s.stopPropagation(),st(`${n==="exp"?"imp":"exp"}-menu`).classList.add("hidden"),i.classList.toggle("hidden"),e.parentElement.style.zIndex=i.classList.contains("hidden")?"50":"60",i.classList.contains("hidden")||(i.style.left="",i.style.right="",i.getBoundingClientRect().left<8&&(i.style.right="auto",i.style.left=`${8-e.parentElement.getBoundingClientRect().left}px`))}),document.addEventListener("click",s=>{!i.contains(s.target)&&!e.contains(s.target)&&(i.classList.add("hidden"),e.parentElement.style.zIndex="50")}),r.addEventListener("input",s=>{const o=s.target.value.toLowerCase().trim();if(!o){i.querySelectorAll(".picker-section-header, .group-option, .country-option").forEach(a=>{a.style.display=""}),i.querySelectorAll(".group-children").forEach(a=>{a.classList.add("hidden"),a.style.display=""}),i.querySelectorAll(".group-toggle").forEach(a=>a.setAttribute("aria-expanded","false"));return}i.querySelectorAll(".picker-section-header, .group-option").forEach(a=>{a.style.display="none"}),i.querySelectorAll(".group-children").forEach(a=>{a.classList.remove("hidden"),a.style.display="block"}),i.querySelectorAll(".country-option").forEach(a=>{a.style.display=a.innerText.toLowerCase().includes(o)?"flex":"none"})}),st(`${n}-clear-all`).addEventListener("click",()=>t.clearAll())},setView(n,t=!0){E.view=n,document.body.classList.toggle("view-biv",n==="biv"),this._applyGroundColours(),wt.drawGround(),wt.setMode(n,t),this.update({walls:!1})},_applyGroundColours(){if(E.view!=="biv"){wt.groundColor=$b;return}this._biv=at.bivariate(),wt.groundColor=n=>{const t=n&&this._biv.cls[n];return t?Et.bivariate[t[0]][t[1]]:null}},_flyToRegion(n,t){const e=Ld.regions[n]||Ld.regions.Global;n==="Global"?wt.resetView(t):wt.focusLonLat(e.center[0],e.center[1],e.scale*wt.mobileZoomFactor(),t)},_scopeLabel(){const n=[E.region==="Global"?"Global":E.region];return E.importerNeed==="high"&&n.push("high-need importers"),E.selectedExporters.size&&n.push(`${E.selectedExporters.size} exp.`),E.selectedImporters.size&&n.push(`${E.selectedImporters.size} imp.`),`${n.join(" · ")} · ${E.year}`},async update({walls:n=!0,flows:t=!0,animate:e=!0}={}){if(this._syncControls(),n){at.computeTariffView();const i={};for(const[r,s]of Object.entries(E.tariffView))i[r]=s.value;wt.setWallValues(i,e),E.view==="biv"&&(this._applyGroundColours(),wt.drawGround())}wt.setWallLabels(this._topTariffIsos()),t&&(await at.loadYear(E.year),at.buildFlows(),wt.setArcMidpoint(at.worldEffectiveRate()),at.filterFlows(),wt.setFlows(E.filteredFlows,E.importerStats,this._nodeLabelIsos())),wt.refreshStates(),this.renderLegend(),this.renderKPIs(),ls.render(),st("mb-year").textContent=E.year,st("mb-meta").innerHTML=`${at.productLabel()}<br>Walls: ${E.duty==="MFN"?"MFN":"applied (AHS)"} tariff, latest year · Ground: WHO/UNICEF JMP 2024`,E.focusedIso&&yo.render(E.focusedIso),jr.write()},_topTariffIsos(){return Object.entries(E.tariffView).filter(([n,t])=>at.needOf(n)!=null&&at.inScope(n)&&t.value>=Et.tariff.guides[0]).sort((n,t)=>t[1].value-n[1].value).slice(0,zt.labelTopTariff).map(([n])=>n)},_nodeLabelIsos(){const n=new Set(this._topTariffIsos()),t=Object.entries(E.importerStats||{}).sort((i,r)=>r[1].duty-i[1].duty).slice(0,8).map(([i])=>i),e=[...new Set(E.filteredFlows.map(i=>i.exporter))].slice(0,6);return[...new Set([...t,...e])].filter(i=>!n.has(i))},renderLegend(){const n=E.filteredFlows,t=["north-south","south-north","south-south","north-north"],e={"north-south":"N→S","south-north":"S→N","south-south":"S→S","north-north":"N→N"},i=t.map(u=>{const d=n.filter(f=>f.flowCategory===u);return`<div class="legend-flow-item" style="opacity:${E.flowFilters.has(u)?1:.3}">
                <span class="legend-flow-dot" style="background:${Et.flowColors[u]}"></span>
                <span class="legend-flow-label">${e[u]}</span>
                <span class="legend-flow-stat">${d.length} · ${d.length?re(Fi(d,f=>at.mv(f))):"—"}</span>
            </div>`}).join(""),r=Et.need.domain.slice(0,-1).map((u,d)=>{const h=(u+Et.need.domain[d+1])/2;return`<span class="lg-swatch" style="background:${wt.needColor(h)}" title="${u}–${Et.need.domain[d+1]}%"></span>`}).join(""),s=Et.tariff,o=`linear-gradient(90deg, ${s.colors.map((u,d)=>`${u} ${s.domain[d]/s.cap*100}%`).join(", ")})`,a=E.thresholdMode!=="auto",l=E.view==="biv"?this._bivLegendHTML():`
            <div class="legend-section" title="WHO/UNICEF JMP 2024: share of the population not using safely managed drinking-water services">
                <span class="legend-section-label">No safe water</span>
                <span class="lg-scale-lbl">0%</span>${r}<span class="lg-scale-lbl">100%</span>
                <span class="lg-swatch lg-nodata" title="No data"></span><span class="lg-scale-lbl">n/a</span>
            </div>
            <span class="legend-bar-divider"></span>
            <div class="legend-section" title="Wall height and colour: simple-average ${E.duty} tariff on the selected goods, capped at ${s.cap}%">
                <span class="legend-section-label">Tariff wall (${E.duty==="MFN"?"MFN":"AHS"})</span>
                <span class="lg-scale-lbl">0%</span><span class="lg-wall" style="background:${o}"></span><span class="lg-scale-lbl">${s.cap}%+</span>
            </div>`;st("legend-content").innerHTML=`${l}
            <span class="legend-bar-divider"></span>
            <div class="legend-section" title="Circles at each importer and arcs from supplier to importer. Size: ${E.flowMetric==="duty"?"estimated duties paid":"trade value"}. Colour: effective duty rate (duties ÷ trade value).">
                <span class="legend-section-label">Duties</span>
                <span class="legend-node lg-circle-key" title="Circle size = ${E.flowMetric==="duty"?"duties paid by the importer":"imports"}"></span>
                <span class="lg-scale-lbl">size = ${E.flowMetric==="duty"?"duties $":"trade $"}</span>
                ${E.arcColor==="rate"?this._arcRateLegendHTML(n):`<div class="legend-flows">${i}</div>`}
            </div>
            <span class="legend-bar-divider"></span>
            <div class="legend-section">
                <span class="legend-section-label">Arcs</span>
                <span class="lg-scale-lbl">${{importers:"on hover",top:`top ${n.length} · high need`,region:`${n.length} to regions`,all:""}[E.arcView]}</span>
                ${E.arcView==="all"?`<span class="legend-threshold-badge${a?" manual":""}">${a?"MANUAL":"AUTO"}</span>
                <span class="legend-threshold-val">${re(E.effectiveThreshold)}</span>
                <span class="legend-arc-count">${n.length} arcs</span>`:""}
                <svg class="lg-taper" width="40" height="10" aria-hidden="true"><path d="M1 5 H20" stroke="${Et.arcRate.colors[0]}" stroke-width="2.5"/><path d="M20 5 H39" stroke="#d0234f" stroke-width="5.5"/></svg>
                <span class="lg-scale-lbl" title="Each arc runs from supplier to importer. First half: goods at export price, i.e. at 0% duty (the 0% colour, width = trade value). At the midpoint the importer's duty is added: the arc turns to the duty-rate colour and widens by the rate (×${zt.arcStepExaggeration} for visibility).">width = trade · +duty at midpoint</span>
            </div>`;const c=n.length?Fi(n,u=>at.mv(u)):E.totalScope;st("stat-value").textContent=re(c),st("stat-bilateral").textContent=re(E.totalScope),st("stat-coverage").textContent=E.totalScope?`${(c/E.totalScope*100).toFixed(1)}% shown`:""},_arcRateLegendHTML(n){const t=Et.arcRate,e=wt.arcDomain,i=wt.arcMid,r=e[e.length-1];return`<span class="lg-scale-lbl" title="Colour: effective duty rate = estimated duties ÷ trade value">rate 0%</span>
            <span class="lg-arcrate-wrap"><span class="lg-arcrate" style="background:${`linear-gradient(90deg, ${t.colors.map((o,a)=>`${o} ${e[a]/r*100}%`).join(", ")})`}"></span><span class="lg-arcmid-tick" style="left:${i/r*100}%"></span></span><span class="lg-scale-lbl">${+r.toFixed(1)}%+</span>
            <span class="lg-scale-lbl" title="Neutral grey = world average effective duty rate on the selected goods (trade-weighted, all corridors with tariff data)">grey = world avg ${$t(i,2)}</span>
`},_bivLegendHTML(){const n=this._biv||at.bivariate(),t=[2,1,0].map(e=>[0,1,2].map(i=>`<span class="biv-cell${e===2&&i===2?" biv-hh":""}" style="background:${Et.bivariate[e][i]}"
                title="Need ${["low","mid","high"][e]} · tariff ${["low","mid","high"][i]}"></span>`).join("")).join("");return`<div class="legend-section legend-biv" title="Tertiles over ${n.n} economies. Need breaks: ${$t(n.nb[0])} / ${$t(n.nb[1])} without safe water. Tariff breaks: ${$t(n.tb[0])} / ${$t(n.tb[1])} (${E.duty}).">
                <span class="legend-section-label">Need × tariff</span>
                <span class="biv-axis biv-y">need ↑</span>
                <span class="biv-grid">${t}</span>
                <span class="biv-axis">tariff →</span>
                <span class="lg-scale-lbl biv-note"><span class="biv-hh-dot"></span>high need · high tariff</span>
                <span class="lg-swatch lg-nodata" title="No data"></span><span class="lg-scale-lbl">n/a</span>
            </div>`},renderKPIs(){st("kpi-scope").textContent=E.focusedIso&&!E.selectedExporters.size&&!E.selectedImporters.size?`${at.name(E.focusedIso)} (all partners)`:E.region==="Global"&&!E.selectedExporters.size&&!E.selectedImporters.size&&E.importerNeed==="all"?"Global":this._scopeLabel().replace(` · ${E.year}`,""),st("kpi-total-label").textContent=E.filteredFlows.length?`${E.flowMetric==="duty"?"Duties":"Trade"} on arcs (${E.filteredFlows.length})`:`Importers paying duty (${Object.values(E.importerStats||{}).filter(o=>o.duty>0).length})`,st("kpi-total").textContent=E.filteredFlows.length?re(Fi(E.filteredFlows,o=>at.mv(o))):re(E.scopeDuty||0),st("kpi-flows").textContent=E.filteredFlows.length,st("kpi-duty").textContent=re(E.scopeDuty||0),st("kpi-duty-high").textContent=re(at.dutyHighNeed()),st("kpi-duty-rate").textContent=E.scopeValueKnown?$t(E.scopeDuty/E.scopeValueKnown*100,2):"—";const n=at.needTariffQuartiles();if(n){st("kpi-need-high").textContent=$t(n.highMedian),st("kpi-need-low").textContent=$t(n.lowMedian);const o=st("kpi-need-gap");n.lowMedian>.05&&n.highMedian>=n.lowMedian?o.textContent=`${(n.highMedian/n.lowMedian).toFixed(1)}×`:n.highMedian<n.lowMedian?o.textContent="reversed":o.textContent=n.highMedian>.05?"higher":"—",o.title=`Highest-need quarter median ${$t(n.highMedian)} vs lowest-need quarter ${$t(n.lowMedian)} (${n.n} economies)`}else["kpi-need-high","kpi-need-low","kpi-need-gap"].forEach(o=>{st(o).textContent="—"});const t={},e={};for(const o of E.scopeFlows||[])t[o.exporter]=(t[o.exporter]||0)+o.value,e[o.importer]=(e[o.importer]||0)+at.mv(o);const i=o=>Object.entries(o).sort((a,l)=>l[1]-a[1])[0],r=i(t),s=i(e);st("kpi-top-exp").textContent=r?at.name(r[0]):"—",st("kpi-top-imp").textContent=s?at.name(s[0]):"—",st("kpi-top-imp-label").textContent=E.flowMetric==="duty"?"#1 Duty payer":"#1 Importer"},showTooltip(n,t){var d,h;const e=st("tooltip");if(ls.highlight((n==null?void 0:n.type)==="country"?n.iso:null),(n==null?void 0:n.type)!=="arc"&&this._scheduleHoverArcs((n==null?void 0:n.type)==="country"?n.iso:null),!n||!t){e.style.display="none";return}let i="";const r=at.productLabel();if(n.type==="country"){const f=n.iso,m=E.countries[f],_=E.water[f],g=E.tariffView[f],p=at.countryTotals(f);i=`<div class="tt-title">${(m==null?void 0:m.name)||f}</div>
                <div class="tt-sub">${[m==null?void 0:m.region,(m==null?void 0:m.dev)==="north"?"Developed":"Developing",m!=null&&m.ldc?"LDC":null,m!=null&&m.sids?"SIDS":null].filter(Boolean).join(" · ")}</div>
                <div class="tt-row"><span>Without safely managed water</span><b class="tt-need">${_?$t(_.without):"no data"}</b></div>
                <div class="tt-row"><span>${E.duty==="MFN"?"MFN":"Applied"} tariff${g?` (${g.year})`:""}</span><b class="tt-tariff">${g?$t(g.value):"no data"}</b></div>
                <div class="tt-row"><span>Imports ${E.year}</span><b>${p?re(p.imp):"—"}</b></div>
                <div class="tt-row"><span>Est. duties paid ${E.year}</span><b class="tt-tariff">${(p==null?void 0:p.duty)!=null?re(p.duty):"no data"}</b></div>
                <div class="tt-row"><span>Exports ${E.year}</span><b>${p?re(p.exp):"—"}</b></div>
                <div class="tt-foot">${r} · click for details</div>`}else if(n.type==="arc"&&n.flow.importerRegion){const f=n.flow;i=`<div class="tt-title">${at.name(f.exporter)} → ${f.importerRegion}</div>
                <div class="tt-sub">${f.n} importing economies · grouped corridor</div>
                <div class="tt-row"><span>Trade ${E.year}</span><b>${re(f.value)}</b></div>
                <div class="tt-row"><span>Est. duties paid</span><b class="tt-tariff">${re(f.duty)}</b></div>
                <div class="tt-row"><span>Effective duty rate</span><b class="tt-tariff">${f.valueKnown?$t(f.duty/f.valueKnown*100,1):"—"}</b></div>
                <div class="tt-foot">${r} · click to zoom to ${f.importerRegion}</div>`}else if(n.type==="arc"){const f=n.flow,m=E.tariffView[f.importer],_=E.water[f.importer];i=`<div class="tt-title">${at.name(f.exporter)} → ${at.name(f.importer)}</div>
                <div class="tt-sub"><span class="tt-dot" style="background:${Et.flowColors[f.flowCategory]}"></span>${Et.flowLabels[f.flowCategory]}</div>
                <div class="tt-row"><span>Trade ${E.year}</span><b>${re(f.value)}</b></div>
                <div class="tt-row"><span>Est. duties paid</span><b class="tt-tariff">${f.duty!=null?re(f.duty):"no tariff data"}</b></div>
                <div class="tt-row"><span>Effective duty rate</span><b class="tt-tariff">${f.duty!=null&&f.value?$t(f.duty/f.value*100,1):"—"}</b></div>
                ${(d=E.countries[f.exporter])!=null&&d.eu&&((h=E.countries[f.importer])!=null&&h.eu)?'<div class="tt-row"><span>Intra-EU trade</span><b>duty-free</b></div>':""}
                <div class="tt-row"><span>Importer's ${E.duty==="MFN"?"MFN":"applied"} tariff (simple avg.)</span><b class="tt-tariff">${m?$t(m.value):"no data"}</b></div>
                <div class="tt-row"><span>Importer: no safe water</span><b class="tt-need">${_?$t(_.without):"no data"}</b></div>
                ${this._mixHTML(f)}
                <div class="tt-foot">${r} · click to open ${at.name(f.importer)}</div>`}e.innerHTML=i,e.style.display="block";const s=st("map-container").getBoundingClientRect(),o=s.left-st("map-container").parentElement.getBoundingClientRect().left,a=e.offsetWidth,l=e.offsetHeight;let c=t.clientX-s.left+16,u=t.clientY-s.top+16;c+a>s.width-8&&(c=t.clientX-s.left-a-16),u+l>s.height-8&&(u=t.clientY-s.top-l-16),e.style.left=`${Math.max(8,c)+o}px`,e.style.top=`${Math.max(8,u)}px`},hoverCountry(n){wt.setHover(n),this._scheduleHoverArcs(n)},_scheduleHoverArcs(n){clearTimeout(this._hoverTimer),n!==this._hoverArcIso&&(this._hoverTimer=setTimeout(()=>{this._hoverArcIso=n;const t=n&&n!==E.focusedIso&&E.arcView!=="all";wt.setHoverArcs(t?at.supplierFlows(n):[])},n?140:250))},_mixHTML(n){const t=at.corridorMix(n);if(!t||t.count<2)return"";const e=t.top.map(i=>`<tr>
                <td><span class="mix-name">${Bv[i.hs]||i.hs}</span> <span class="mix-hs">${i.hs}</span></td>
                <td class="ar"><span class="mix-bar" style="width:${Math.max(2,i.share*.4).toFixed(0)}px"></span>${i.share.toFixed(0)}%</td>
                <td class="ar mix-rate" style="color:${i.rate==null?"#aea29a":wt.arcRateColor(i.rate)}">${i.rate==null?"—":$t(i.rate,i.rate%1?1:0)}${i.imputed?"*":""}</td>
            </tr>`).join("");return`<div class="tt-mix">
                <div class="tt-mix-head">What is shipped <span>share · ${at.name(n.importer)}'s ${E.duty} rate</span></div>
                <table>${e}</table>
                ${t.rest>0?`<div class="tt-mix-note">+ ${t.rest} more HS line${t.rest>1?"s":""}</div>`:""}
                ${t.top.some(i=>i.imputed)?`<div class="tt-mix-note">* no rate reported; ${at.name(n.importer)}'s average used</div>`:""}
                <div class="tt-mix-note">The effective rate is the trade-weighted mix of these rates, so it differs by supplier.</div>
            </div>`},onMapClick(n){if(!n){E.focusedIso&&this.focusCountry(null);return}n.type==="country"&&this.focusCountry(n.iso===E.focusedIso?null:n.iso),n.type==="arc"&&n.flow.importerRegion?(E.region=n.flow.importerRegion,wt.drawGround(),this._flyToRegion(E.region,!0),this.update({walls:!1})):n.type==="arc"&&this.focusCountry(n.flow.importer,{move:!1})},focusCountry(n,{move:t=!0}={}){const e=E.focusedIso;if(E.focusedIso=n,n){wt.setFocus(n,null),yo.open(n);const i=window.innerWidth<768,r=document.getElementById("insight-panel");t&&requestAnimationFrame(()=>wt.focusIsoView(n,i?0:r.offsetWidth,1.6,i?Math.min(r.getBoundingClientRect().height,st("map-container").clientHeight*.7):0))}else wt.setFocus(null),yo.close();e!==n?this.update({walls:!1}):jr.write()},async startAnimation(){st("anim-btn").innerHTML="&#9632; Stop",st("anim-btn").classList.add("playing"),await at.prefetchAll();const n=Et.years;let t=E.year>=n[n.length-1]?0:Math.max(0,n.indexOf(E.year)+1);const e=async()=>{if(E.year=n[t],await this.update({walls:!1}),t++,t>=n.length){this.stopAnimation();return}this._anim=setTimeout(e,1300)};this._anim=setTimeout(e,50)},stopAnimation(){clearTimeout(this._anim),this._anim=null,st("anim-btn").innerHTML="&#9654; Animate",st("anim-btn").classList.remove("playing")}};function qb(n,t,e){return Math.max(t,Math.min(e,n))}window.addEventListener("hashchange",()=>location.reload());window.App=wp;window.Map3D=wt;window.__Data=at;window.__STATE=E;window.__Scatter=ls;wp.init();
