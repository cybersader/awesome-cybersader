"use strict";var ee=Object.create;var h=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var ie=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,re=Object.prototype.hasOwnProperty;var oe=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),se=(t,e)=>{for(var i in e)h(t,i,{get:e[i],enumerable:!0})},N=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ie(e))!re.call(t,r)&&r!==i&&h(t,r,{get:()=>e[r],enumerable:!(n=te(e,r))||n.enumerable});return t};var O=(t,e,i)=>(i=t!=null?ee(ne(t)):{},N(e||!t||!t.__esModule?h(i,"default",{value:t,enumerable:!0}):i,t)),ae=t=>N(h({},"__esModule",{value:!0}),t);var z=oe(($e,V)=>{"use strict";function F(t){return Array.isArray(t)?t:[t]}var H="",D=" ",x="\\",le=/^\s+$/,ce=/(?:[^\\]|^)\\$/,pe=/^\\!/,de=/^\\#/,ge=/\r?\n/g,ue=/^\.*\/|^\.+$/,v="/",X="node-ignore";typeof Symbol<"u"&&(X=Symbol.for("node-ignore"));var k=X,fe=(t,e,i)=>Object.defineProperty(t,e,{value:i}),me=/([0-z])-([0-z])/g,j=()=>!1,he=t=>t.replace(me,(e,i,n)=>i.charCodeAt(0)<=n.charCodeAt(0)?e:H),Ee=t=>{let{length:e}=t;return t.slice(0,e-e%2)},be=[[/\\?\s+$/,t=>t.indexOf("\\")===0?D:H],[/\\\s/g,()=>D],[/[\\$.|*+(){^]/g,t=>`\\${t}`],[/(?!\\)\?/g,()=>"[^/]"],[/^\//,()=>"^"],[/\//g,()=>"\\/"],[/^\^*\\\*\\\*\\\//,()=>"^(?:.*\\/)?"],[/^(?=[^^])/,function(){return/\/(?!$)/.test(this)?"^":"(?:^|\\/)"}],[/\\\/\\\*\\\*(?=\\\/|$)/g,(t,e,i)=>e+6<i.length?"(?:\\/[^\\/]+)*":"\\/.+"],[/(^|[^\\]+)(\\\*)+(?=.+)/g,(t,e,i)=>{let n=i.replace(/\\\*/g,"[^\\/]*");return e+n}],[/\\\\\\(?=[$.|*+(){^])/g,()=>x],[/\\\\/g,()=>x],[/(\\)?\[([^\]/]*?)(\\*)($|\])/g,(t,e,i,n,r)=>e===x?`\\[${i}${Ee(n)}${r}`:r==="]"&&n.length%2===0?`[${he(i)}${n}]`:"[]"],[/(?:[^*])$/,t=>/\/$/.test(t)?`${t}$`:`${t}(?=$|\\/$)`],[/(\^|\\\/)?\\\*$/,(t,e)=>`${e?`${e}[^/]+`:"[^/]*"}(?=$|\\/$)`]],M=Object.create(null),ye=(t,e)=>{let i=M[t];return i||(i=be.reduce((n,r)=>n.replace(r[0],r[1].bind(t)),t),M[t]=i),e?new RegExp(i,"i"):new RegExp(i)},S=t=>typeof t=="string",Te=t=>t&&S(t)&&!le.test(t)&&!ce.test(t)&&t.indexOf("#")!==0,_e=t=>t.split(ge),w=class{constructor(e,i,n,r){this.origin=e,this.pattern=i,this.negative=n,this.regex=r}},Ie=(t,e)=>{let i=t,n=!1;t.indexOf("!")===0&&(n=!0,t=t.substr(1)),t=t.replace(pe,"!").replace(de,"#");let r=ye(t,e);return new w(i,t,n,r)},xe=(t,e)=>{throw new e(t)},c=(t,e,i)=>S(t)?t?c.isNotRelative(t)?i(`path should be a \`path.relative()\`d string, but got "${e}"`,RangeError):!0:i("path must not be empty",TypeError):i(`path must be a string, but got \`${e}\``,TypeError),B=t=>ue.test(t);c.isNotRelative=B;c.convert=t=>t;var C=class{constructor({ignorecase:e=!0,ignoreCase:i=e,allowRelativePaths:n=!1}={}){fe(this,k,!0),this._rules=[],this._ignoreCase=i,this._allowRelativePaths=n,this._initCache()}_initCache(){this._ignoreCache=Object.create(null),this._testCache=Object.create(null)}_addPattern(e){if(e&&e[k]){this._rules=this._rules.concat(e._rules),this._added=!0;return}if(Te(e)){let i=Ie(e,this._ignoreCase);this._added=!0,this._rules.push(i)}}add(e){return this._added=!1,F(S(e)?_e(e):e).forEach(this._addPattern,this),this._added&&this._initCache(),this}addPattern(e){return this.add(e)}_testOne(e,i){let n=!1,r=!1;return this._rules.forEach(o=>{let{negative:s}=o;if(r===s&&n!==r||s&&!n&&!r&&!i)return;o.regex.test(e)&&(n=!s,r=s)}),{ignored:n,unignored:r}}_test(e,i,n,r){let o=e&&c.convert(e);return c(o,e,this._allowRelativePaths?j:xe),this._t(o,i,n,r)}_t(e,i,n,r){if(e in i)return i[e];if(r||(r=e.split(v)),r.pop(),!r.length)return i[e]=this._testOne(e,n);let o=this._t(r.join(v)+v,i,n,r);return i[e]=o.ignored?o:this._testOne(e,n)}ignores(e){return this._test(e,this._ignoreCache,!1).ignored}createFilter(){return e=>!this.ignores(e)}filter(e){return F(e).filter(this.createFilter())}test(e){return this._test(e,this._testCache,!0)}},b=t=>new C(t),ve=t=>c(t&&c.convert(t),t,j);b.isPathValid=ve;b.default=b;V.exports=b;if(typeof process<"u"&&(process.env&&process.env.IGNORE_TEST_WIN32||process.platform==="win32")){let t=i=>/^\\\\\?\\/.test(i)||/["<>|\u0000-\u001F]+/u.test(i)?i:i.replace(/\\/g,"/");c.convert=t;let e=/^[a-z]:\//i;c.isNotRelative=i=>e.test(i)||B(i)}});var we={};se(we,{default:()=>p});module.exports=ae(we);var E=require("obsidian"),g=class t extends E.PluginSettingTab{static instance;static setInstance=e=>{t.instance=e};static getInstance=()=>t.instance;static DEFAULT_SETTINGS={ignore:[".git","node_modules"]};settings;plugin;constructor(e){super(e.app,e),this.plugin=e,t.setInstance(this)}loadSettings=async()=>{this.settings=Object.assign({},t.DEFAULT_SETTINGS,await this.plugin.loadData())};saveSettings=async()=>{await this.plugin.saveData(this.settings)};display=()=>{let{containerEl:e}=this;e.empty(),new E.Setting(e).setName("Ignore patterns").setDesc("This will skip this pattern when generating the tree").addTextArea(i=>(i.inputEl.style.width="100%",i.inputEl.rows=8,i.setPlaceholder("filters according to .gitignore spec 2.22.1").setValue(this.settings.ignore.join(`
`)).onChange(async n=>{this.settings.ignore=n.split(`
`),await this.saveSettings()})))}};var $=O(z()),K=(t,e)=>(0,$.default)().add(e).filter(t),U=t=>(0,$.default)().add(t);var W=O(require("path"));var R=t=>Object.keys(t).length===0;var Y=(t,e=null)=>{e=e??W.default.sep;let i={};for(let n of t){let r=n.split(e),o=i;for(let s of r)o[s]||(o[s]={}),o=o[s]}return i},A=(t,e=0)=>{let i=Object.entries(t).filter(([s,a])=>!R(a)).sort(),n=Object.entries(t).filter(([s,a])=>R(a)).sort(),r=e%2?"folder-2":"folder-1",o="";for(let[s,a]of i)o+=`${"> ".repeat(e+1)}[!${r}]- ${s}
${A(a,e+1)}${"> ".repeat(e)}
`;for(let[s,a]of n)o+=`${"> ".repeat(e)}\u{1F4C4} ${s}
`;return o};var q=t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");var J=t=>new RegExp(`^${q(t)}`);var y=require("fs/promises"),P=require("path"),G=async(t,e=null,i=null,n=[])=>{let r=await(0,y.readdir)(t),o=J(i??"");for(let s of r){let a=`${t}${P.sep}${s}`,u=`${t}${P.sep}${s}`.replace(o,""),m=await(0,y.stat)(a);e?.ignores(u)||(m.isDirectory()?await G(a,e,i,n):n.push(u))}return n};var Q=require("@electron/remote"),l=require("obsidian"),L=require("path"),f=class extends l.Modal{editor;useIgnore=!0;separator="/";filesInput="";filesTextArea;constructor(e,i){super(e),this.editor=i,this.titleEl.textContent="Generate file tree"}onOpen=()=>{let{contentEl:e}=this;this.loadConfigSection(e),this.loadFilesSection(e),this.loadGenerateSection(e)};loadConfigSection=e=>{new l.Setting(e).setHeading().setName("Use ignore config").setDesc("filter entries with the ingore configuration in settings").addExtraButton(i=>i.setTooltip("Open plugin settings").onClick(()=>{this.app.setting.open(),this.app.setting.openTabById("file-tree-generator")})).addToggle(i=>i.setValue(this.useIgnore).onChange(n=>{this.useIgnore=n}))};loadFilesSection=e=>{let i=new l.Setting(e);i.infoEl.style.flexGrow="0",l.Platform.isDesktop&&i.addExtraButton(n=>n.setIcon("upload").setTooltip("Import files from folder").onClick(async()=>{let r=await Q.dialog.showOpenDialog({properties:["openDirectory"]});if(r.canceled)return;let o=new l.Notice("",0),s=!0;(async()=>{let d=0;for(;s;)o.setMessage(`\u{1F50E} Loading${".".repeat(d)}`),await sleep(400),d++,d=d%4})();let a=r.filePaths[0],u=a.substring(0,a.lastIndexOf(L.sep)+L.sep.length),m;try{m=await G(a,this.useIgnore?U(g.getInstance().settings.ignore):null,u)}catch(d){if(s=!1,o.hide(),!(d instanceof Error)){new l.Notice("\u274C error while scanning directory");return}new l.Notice(`\u274C error while scanning directory:
${d.message}}`);return}s=!1,o.hide(),this.filesInput=m.join(`
`),this.filesTextArea.setValue(this.filesInput)})),i.setName("Files paths").addTextArea(n=>(this.filesTextArea=n,n.inputEl.rows=8,n.inputEl.style.width="100%",n.setPlaceholder(`my-folder/toto/titi/hey.md
my-folder/tutu/my-video.mp4`).onChange(r=>{this.filesInput=r})))};loadGenerateSection=e=>{new l.Setting(e).setHeading().addButton(i=>i.setButtonText("\u2699 Generate").setCta().onClick(()=>{if(this.filesInput.trim()===""){new l.Notice("\u274C no path has been entered");return}let n=this.filesInput.split(`
`).map(u=>(0,l.normalizePath)(u)),r;this.useIgnore?r=K(n,g.getInstance().settings.ignore):r=n;let o=Y(r,this.separator),s=A(o),a=this.editor.getCursor("head").line;this.editor.setLine(a,`${this.editor.getLine(a)}

${s}`),this.close()}))};onClose=()=>{let{contentEl:e}=this;e.empty()}};var T=class{id="generate-tree";name="generate a file tree";editorCallback=e=>{new f(p.getInstance().app,e).open()}};var Z=require("obsidian");var _=require("obsidian");var I=class{icon="folder-tree";title="Generate file tree";execute=()=>{let e=p.getInstance().getActiveEditor();if(!e){new _.Notice("\u274C Can only be used during editing");return}if(e.currentMode.type!=="source"){new _.Notice("\u274C Can only be used during editing");return}let n=e.editor;if(!n){new _.Notice("\u274C Can only be used during editing");return}new f(p.getInstance().app,n).open()}};var p=class t extends Z.Plugin{static instance;static setInstance=e=>{t.instance=e};static getInstance=()=>t.instance;constructor(e,i){super(e,i),t.setInstance(this)}onload=async()=>{this.addCommands(new T),this.addRibbonIconObject(new I);let e=new g(this);await e.loadSettings(),this.addSettingTab(e)};addCommands=(...e)=>{for(let i of e)this.addCommand(i)};addRibbonIconObject=e=>this.addRibbonIcon(e.icon,e.title,e.execute);getActiveEditor=()=>{let e=this.app.workspace.activeEditor;return e||null}};