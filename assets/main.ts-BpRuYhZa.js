(function(){const y=new Map;let A=0;const I={a:"link",button:"button",input:"textbox",select:"combobox",textarea:"textbox",h1:"heading",h2:"heading",h3:"heading",h4:"heading",h5:"heading",h6:"heading",img:"image",nav:"navigation",main:"main",header:"banner",footer:"contentinfo",aside:"complementary",article:"article",section:"region",form:"form",table:"table",ul:"list",ol:"list",li:"listitem",dialog:"dialog",menu:"menu"},_=new Set(["a","button","input","select","textarea","details","summary"]),L=5e4;function B(t){const n=t.getAttribute("role");if(n)return n;const e=t.tagName.toLowerCase();if(e==="input"){const r=t.getAttribute("type")||"text";return{checkbox:"checkbox",radio:"radio",range:"slider",button:"button",submit:"button",reset:"button",search:"searchbox",email:"textbox",url:"textbox",tel:"textbox",password:"textbox"}[r]||"textbox"}return I[e]||"generic"}function N(t){var a,x,m;const n=t.getAttribute("aria-label");if(n)return n;const e=t.getAttribute("aria-labelledby");if(e){const c=[];for(const d of e.split(/\s+/)){const l=document.getElementById(d);if(l){const h=(a=l.textContent)==null?void 0:a.trim();h&&c.push(h)}}if(c.length>0)return c.join(" ")}const r=t.getAttribute("placeholder");if(r)return r;const o=t.getAttribute("title");if(o)return o;const i=t.tagName.toLowerCase();if(i==="img"){const c=t.getAttribute("alt");if(c)return c}if((i==="input"||i==="select"||i==="textarea")&&t.id){const c=document.querySelector(`label[for="${t.id}"]`);if(c){const d=(x=c.textContent)==null?void 0:x.trim();if(d)return d}}if(i==="input"){const c=t.value;if(c)return c.slice(0,100)}const s=[];for(const c of t.childNodes)if(c.nodeType===Node.TEXT_NODE){const d=(m=c.textContent)==null?void 0:m.trim();d&&s.push(d)}return s.length>0?s.join(" ").slice(0,100):""}function H(t){const n=window.getComputedStyle(t);if(n.display==="none"||n.visibility==="hidden"||n.opacity==="0")return!1;const e=t.getBoundingClientRect();return!(e.width===0&&e.height===0)}function O(t){const n=t.tagName.toLowerCase();return!!(_.has(n)||t.getAttribute("onclick")||t.getAttribute("tabindex")||t.getAttribute("role")==="button"||t.getAttribute("role")==="link"||t.getAttribute("contenteditable")==="true")}function M(t=document.body,n="interactive"){y.clear(),A=0;const e=[];let r=0,o=!1;function i(s,a){if(o||!H(s))return;const x=B(s),m=N(s),c=O(s);if(n==="interactive"&&!c&&x==="generic"){for(const b of s.children)i(b,a);return}const d=`ref_${++A}`;y.set(d,new WeakRef(s));let l="  ".repeat(a)+x;if(m){const b=m.replace(/"/g,'\\"').slice(0,50);l+=` "${b}"`}l+=` [${d}]`;const h=s.getAttribute("href");if(h){const b=h.length>50?h.slice(0,47)+"...":h;l+=` href="${b}"`}const T=s.getAttribute("type");T&&(l+=` type="${T}"`);const w=s.value;if(w&&s.tagName.toLowerCase()==="input"){const b=w.slice(0,20);l+=` value="${b}"`}const k=s.checked;k!==void 0&&s.type==="checkbox"&&(l+=` checked="${k}"`),s.hasAttribute("disabled")&&(l+=" disabled");const C=l.length+1;if(r+C>L){o=!0,e.push("[Truncated: output exceeded 50KB limit. Use a more specific filter or target a sub-element.]");return}r+=C,e.push(l);for(const b of s.children)i(b,a+1)}return i(t,0),e.join(`
`)}function S(t){const n=y.get(t);if(!n)return;const e=n.deref();if(!e){y.delete(t);return}return e}window.__tbRefMap=y;window.__tbGenerateTree=M;function R(t,n="left"){const e=S(t);if(!e)return{success:!1,message:`Element not found: ${t}`};try{e.scrollIntoView({behavior:"smooth",block:"center"});const r=e.getBoundingClientRect(),o=r.left+r.width/2,i=r.top+r.height/2,s={bubbles:!0,cancelable:!0,view:window,clientX:o,clientY:i};return n==="right"?e.dispatchEvent(new MouseEvent("contextmenu",s)):n==="double"?e.dispatchEvent(new MouseEvent("dblclick",s)):(e instanceof HTMLElement&&e.focus(),e.dispatchEvent(new MouseEvent("mousedown",s)),e.dispatchEvent(new MouseEvent("mouseup",s)),e.dispatchEvent(new MouseEvent("click",s)),e instanceof HTMLAnchorElement&&e.href),{success:!0,message:`Clicked element ${t}`}}catch(r){return{success:!1,message:`Click failed: ${r}`}}}function U(t,n){const e=S(t);if(!e)return{success:!1,message:`Element not found: ${t}`};if(!(e instanceof HTMLInputElement)&&!(e instanceof HTMLTextAreaElement)&&e.getAttribute("contenteditable")!=="true")return{success:!1,message:`Element ${t} is not an input field`};try{e instanceof HTMLElement&&e.focus(),(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)&&(e.value="");for(const r of n)e.dispatchEvent(new KeyboardEvent("keydown",{key:r,bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keypress",{key:r,bubbles:!0})),e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?e.value+=r:e.getAttribute("contenteditable")==="true"&&(e.textContent=(e.textContent||"")+r),e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:r})),e.dispatchEvent(new KeyboardEvent("keyup",{key:r,bubbles:!0}));return e.dispatchEvent(new Event("change",{bubbles:!0})),{success:!0,message:`Typed "${n}" into element ${t}`}}catch(r){return{success:!1,message:`Type failed: ${r}`}}}function G(t,n=500){try{const e=t==="down"?n:-n;return window.scrollBy({top:e,behavior:"smooth"}),{success:!0,message:`Scrolled ${t} by ${n}px`}}catch(e){return{success:!1,message:`Scroll failed: ${e}`}}}let f=null;function u(t,n="info"){E(),f=document.createElement("div"),f.id="tb-indicator";const e={info:{bg:"#3b82f6",border:"#2563eb"},success:{bg:"#22c55e",border:"#16a34a"},error:{bg:"#ef4444",border:"#dc2626"}},{bg:r,border:o}=e[n];f.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${r};
    border: 2px solid ${o};
    border-radius: 8px;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: tb-slide-in 0.3s ease-out;
    display: flex;
    align-items: center;
    gap: 8px;
  `;const i=document.createElement("style");if(i.textContent=`
    @keyframes tb-slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,document.head.appendChild(i),n==="info"){const a=document.createElement("span");a.style.cssText="display: flex; align-items: center;",a.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
        <path d="M64 16 L64 80 L28 80 Z" fill="#ffffff" />
        <path d="M64 28 L64 72 L88 72 Z" fill="#e0e7ff" />
        <line x1="64" y1="16" x2="64" y2="88" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
        <path d="M24 88 Q28 104 64 104 Q100 104 104 88 Z" fill="#ffffff" />
      </svg>
    `,f.appendChild(a)}else{const a=document.createElement("span");a.textContent=n==="success"?"✓":"✗",f.appendChild(a)}const s=document.createElement("span");s.textContent=t,f.appendChild(s),document.body.appendChild(f),n==="success"&&setTimeout(E,3e3)}function E(){f&&(f.remove(),f=null)}function $(t){const n=window.__tbRefMap,e=n==null?void 0:n.get(t),r=e==null?void 0:e.deref();if(!r)return;const o=r.getBoundingClientRect(),i=document.createElement("div");i.className="tb-highlight",i.style.cssText=`
    position: fixed;
    top: ${o.top}px;
    left: ${o.left}px;
    width: ${o.width}px;
    height: ${o.height}px;
    border: 2px solid #3b82f6;
    background: rgba(59, 130, 246, 0.2);
    border-radius: 4px;
    z-index: 2147483646;
    pointer-events: none;
    animation: tb-pulse 1s ease-in-out infinite;
  `,document.body.appendChild(i),setTimeout(()=>i.remove(),2e3)}let p=null,g=null;function X(){v(),g=document.createElement("style"),g.textContent=`
    @keyframes tb-stop-pulse {
      0%, 100% { border-color: #ef4444; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); }
      50% { border-color: #f87171; box-shadow: 0 4px 16px rgba(239, 68, 68, 0.5); }
    }
  `,document.head.appendChild(g),p=document.createElement("div"),p.id="tb-stop-button",p.style.cssText=`
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 10px 18px;
    background: #1e1e1e;
    border: 2px solid #ef4444;
    border-radius: 8px;
    color: #f87171;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    font-weight: 600;
    z-index: 2147483647;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    animation: tb-stop-pulse 2s ease-in-out infinite;
    user-select: none;
  `;const t=document.createElement("span");t.style.cssText=`
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #ef4444;
    border-radius: 2px;
  `,p.appendChild(t);const n=document.createElement("span");n.textContent="Stop Agent",p.appendChild(n),p.addEventListener("click",()=>{chrome.runtime.sendMessage({type:"STOP_AGENT"}),v()}),document.body.appendChild(p)}function v(){p&&(p.remove(),p=null),g&&(g.remove(),g=null)}chrome.runtime.onMessage.addListener((t,n,e)=>{var r;if(t.type==="GET_ACCESSIBILITY_TREE"){try{const o=((r=t.payload)==null?void 0:r.filter)||"interactive",i=M(document.body,o);e(i)}catch(o){e({error:String(o)})}return!0}if(t.type==="EXECUTE_ACTION"){const o=t.payload;try{let i;switch(o.type){case"click":u(`Clicking element ${o.refId}...`,"info"),$(o.refId),i=R(o.refId,o.clickType),i.success?u(i.message,"success"):u(i.message,"error");break;case"type_text":u(`Typing into element ${o.refId}...`,"info"),$(o.refId),i=U(o.refId,o.text),i.success?u(i.message,"success"):u(i.message,"error");break;case"scroll":u(`Scrolling ${o.direction}...`,"info"),i=G(o.direction,o.amount),i.success?u(i.message,"success"):u(i.message,"error");break;default:i={success:!1,message:`Unknown action: ${o.type}`},u(i.message,"error")}e(i)}catch(i){const s=String(i);u(s,"error"),e({error:s})}return!0}return t.type==="SHOW_INDICATOR"?(u(t.payload.message,t.payload.type),e({success:!0}),!0):t.type==="HIDE_INDICATOR"?(E(),e({success:!0}),!0):t.type==="SHOW_STOP_BUTTON"?(X(),e({success:!0}),!0):t.type==="HIDE_STOP_BUTTON"?(v(),e({success:!0}),!0):t.type==="HEARTBEAT_PING"?(e({alive:!0}),!0):!1});
})()
