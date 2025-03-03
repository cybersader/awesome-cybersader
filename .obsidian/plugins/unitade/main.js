/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __reflectGet = Reflect.get;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// lib/codemirror.js
var require_codemirror = __commonJS({
  "lib/codemirror.js"(exports, module2) {
    "use strict";
    module2.exports = CodeMirror;
  }
});

// source/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => UNITADE_PLUGIN
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// source/settings.ts
var import_obsidian = require("obsidian");

// source/locales/settings.text.ts
var SETTING_LOCALES = class {
  static getCfgRt() {
    return {
      name: "Extensions:",
      desc: "Enter the file extensions that should be registered with the vault and with which the application should start registering (taking into account): input must be separated by semicolons (';')."
    };
  }
  static getCfgMb() {
    return {
      name: "Mobile-specific:",
      desc: "Both this module's extensions and default specific extensions (if mobile settings are not set up) will be used on mobile devices if this mode is enabled."
    };
  }
  static getMdOv() {
    return {
      name: "Enable markdown override:",
      desc: "If enabled, on plugin's initialization, disables markdown from OBSIDIAN's registry."
    };
  }
  static getUlrd() {
    return {
      name: "Unload plugin's registry",
      desc: "On click, causes imitation of disabling plugin, meaning, reloading registry of extensions in vault to default mode."
    };
  }
  static getHlrd() {
    return {
      name: "Hard-load plugin's registry",
      desc: "On click, causes imitation of enabling plugin, meaning, reloading registries which are defined and set up within user's settings."
    };
  }
  static getFrcInf() {
    return {
      name: "Forced-view extenions:",
      desc: "Entered extensions, would be tried to be initialized through codemirror setup of editors enabling extension's view in OBSIDIAN app.",
      msg: "This functionality is in semi-demo because of OBSIDIAN's API unsupport for such features, it is more unstable on mobile devices."
    };
  }
  static getOnRf() {
    return {
      name: "On-load extension registry",
      desc: "If enabled, plugin will now registry every file's extension (this setting: last part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
      info: "This mode is interchangeable (that is, disabled) when an unsafe on-load registry is enabled."
    };
  }
  static getOnRu() {
    return {
      name: "On-load unsafe extension registry",
      desc: "If enabled, plugin will now registry every file's extension (this setting: every part of extensions sequence) when OBSIDIAN catches event of new file appearing in vault.",
      info: "This mode is interchangeable (that is, disabled) when an normal on-load registry is enabled."
    };
  }
  static getOnMsg() {
    return {
      msg: "ATTENTION: this setting can cause a \u201Cspam attack\u201D with extensions in the OBSIDIAN extension registry and damage some files due to the editing format of the application itself, be careful when using this functionality."
    };
  }
  static getIgnInf() {
    return {
      name: "Ignore mode:",
      desc: "If enabled, plugin now would ignore specified type extensions by user input and files by regular expressions."
    };
  }
  static getIgnExt() {
    return {
      name: "Ignore extensions:",
      desc: "Enter the file extensions that should be ignored by plugin before add to registry by on-load registry."
    };
  }
  static getIgnMsk() {
    return {
      name: "Ignore files (regular expressions):",
      desc: "Enter the file masks (regular expressions) by which files should be ignored by plugin."
    };
  }
  static getIgnMsg() {
    return {
      msg: "This settings works only for on-load registry functionality: meaning that ignoring extensions and files only works with only that functionality when the files are added to the vault."
    };
  }
  static getGrpInf() {
    return {
      name: "Grouped extensions:",
      desc: "Enter by specified syntax extensions which you want to treat as other custom extensions (groups are separated by (';') semicolons while values are separated by (',') commas)."
    };
  }
  static getGrpMsg() {
    return {
      msg: "Keep in mind, this setting is unstable due entire infrastructure of plugin and OBSIDIAN's API, it is recommended to turn off every other setting and clear them if possible before using this module: you can setup every other module just in this block."
    };
  }
};

// source/settings.ts
var DEFAULT_SETTINGS = {
  markdown_overcharge: false,
  extensions: "txt",
  is_onload: false,
  is_onload_unsafe: false,
  forced_extensions: "",
  is_ignore: false,
  ignore_extensions: "",
  ignore_masks: "",
  is_grouped: false,
  grouped_extensions: "",
  mobile_settings: {
    enable: false,
    extensions: "txt",
    stable: true
  },
  stable: true,
  errors: {},
  debug_mode: false
};
var UNITADE_SETTINGS_TAB = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.defaults = void 0;
    this.plugin = plugin;
  }
  display() {
    let {
      containerEl
    } = this;
    containerEl.empty();
    containerEl.createEl("h3", { text: "UNITADE's settings:" });
    new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getMdOv().name).setDesc(SETTING_LOCALES.getMdOv().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.markdown_overcharge).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          markdown_overcharge: value
        });
        yield this.plugin.uptSettings(next);
      }));
      return toggle;
    });
    this._config = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getCfgRt().name).setDesc(SETTING_LOCALES.getCfgRt().desc);
    let configInput = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("txt; conf; config; data; logs").setValue(this.plugin.settings.extensions).onChange((value) => __async(this, null, function* () {
      let next = __spreadValues({}, this.plugin.settings);
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.stable = true;
          next.extensions = value;
        } catch (e) {
          next.stable = false;
        }
      }
      this.__uptState(
        configInput,
        this.plugin.settings.stable,
        next.stable
      );
      yield this.plugin.uptSettings(next);
      this.__updateErrors();
    }));
    configInput.inputEl.style.width = "100%";
    configInput.inputEl.style.height = "48px";
    configInput.inputEl.style.minHeight = "36px";
    this._configMobile = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getCfgMb().name).setDesc(SETTING_LOCALES.getCfgMb().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.mobile_settings.enable).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          mobile_settings: __spreadProps(__spreadValues({}, this.plugin.settings.mobile_settings), {
            enable: value
          })
        });
        yield this.plugin.uptSettings(next);
        this.__uptMbConfig(mobileConfigInp, value);
        this.__updateErrors();
      }));
      return toggle;
    });
    let mobileConfigInp = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("txt; conf; config; data; logs").setValue(this.plugin.settings.mobile_settings.extensions ? this.plugin.settings.mobile_settings.extensions : "").onChange((value) => __async(this, null, function* () {
      let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
        mobile_settings: __spreadProps(__spreadValues({}, this.plugin.settings.mobile_settings), {
          extensions: ""
        })
      });
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.mobile_settings.stable = true;
          next.mobile_settings.extensions = value;
        } catch (e) {
          next.mobile_settings.stable = false;
        }
      }
      this.__uptState(
        mobileConfigInp,
        this.plugin.settings.mobile_settings.stable,
        next.mobile_settings.stable
      );
      yield this.plugin.uptSettings(next);
      this.__updateErrors();
    }));
    mobileConfigInp.inputEl.style.width = "100%";
    mobileConfigInp.inputEl.style.height = "48px";
    mobileConfigInp.inputEl.style.minHeight = "36px";
    this.__uptMbConfig(mobileConfigInp, this.plugin.settings.mobile_settings.enable);
    new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getUlrd().name).setDesc(SETTING_LOCALES.getUlrd().desc).addButton((button) => {
      button.setButtonText("Unload").setIcon("upload").onClick((event) => __async(this, null, function* () {
        if (this.plugin.settings.debug_mode)
          console.info(`[${event.timeStamp}]: Caused unloading function!`);
        this.plugin.unapply();
      }));
      return button;
    });
    new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getHlrd().name).setDesc(SETTING_LOCALES.getHlrd().desc).addButton((button) => {
      button.setButtonText("Force-load").setIcon("download").onClick((event) => __async(this, null, function* () {
        if (this.plugin.settings.debug_mode)
          console.info(`[${event.timeStamp}]: Caused loading function!`);
        this.plugin.apply();
      }));
      return button;
    });
    containerEl.createEl("h2", { text: "Errors" });
    this._errors = containerEl.createEl("p", { text: "None" });
    this._errors.style.whiteSpace = "pre-line";
    this.__updateErrors();
    containerEl.createEl("h3", { text: "Advanced block" });
    let forcedMsg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getFrcInf().name).setDesc(SETTING_LOCALES.getFrcInf().desc);
    let forcedWarn = document.createElement("div");
    forcedWarn.style.fontSize = "80%";
    forcedWarn.style.margin = "10px";
    forcedWarn.style.color = "green";
    forcedWarn.innerHTML = SETTING_LOCALES.getFrcInf().msg;
    forcedMsg.nameEl.appendChild(forcedWarn);
    let frcExtInp = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("txt; md; ; data; db;").setValue(this.plugin.settings.forced_extensions).onChange((value) => __async(this, null, function* () {
      let next = __spreadValues({}, this.plugin.settings);
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.stable = true;
          next.forced_extensions = value;
        } catch (e) {
          next.stable = false;
        }
      }
      this.__uptState(
        configInput,
        this.plugin.settings.stable,
        next.stable
      );
      yield this.plugin.uptSettings(next);
      this.__updateErrors();
    }));
    frcExtInp.inputEl.style.width = "100%";
    frcExtInp.inputEl.style.height = "48px";
    frcExtInp.inputEl.style.minHeight = "36px";
    let onRfAttention = document.createElement("div");
    onRfAttention.style.fontSize = "80%";
    onRfAttention.style.margin = "10px";
    onRfAttention.style.color = "darkRed";
    onRfAttention.innerHTML = SETTING_LOCALES.getOnMsg().msg;
    let onRfInfo = document.createElement("div");
    onRfInfo.style.fontWeight = "bold";
    onRfInfo.style.fontSize = "80%";
    onRfInfo.innerHTML = SETTING_LOCALES.getOnRf().info;
    const onRfStg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getOnRf().name).setDesc(SETTING_LOCALES.getOnRf().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.is_onload).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          is_onload: value,
          is_onload_unsafe: this.plugin.settings.is_onload_unsafe ? false : this.plugin.settings.is_onload_unsafe
        });
        yield this.plugin.uptSettings(next);
      }));
      return toggle;
    });
    onRfStg.nameEl.parentElement.appendChild(onRfAttention);
    onRfStg.nameEl.parentElement.appendChild(onRfInfo);
    let onRuAttention = document.createElement("div");
    onRuAttention.style.fontSize = "80%";
    onRuAttention.style.margin = "10px";
    onRuAttention.style.color = "darkRed";
    onRuAttention.innerHTML = SETTING_LOCALES.getOnMsg().msg;
    let onRuInfo = document.createElement("div");
    onRuInfo.style.fontWeight = "bold";
    onRuInfo.style.fontSize = "80%";
    onRuInfo.innerHTML = SETTING_LOCALES.getOnRf().info;
    const onRuStg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getOnRu().name).setDesc(SETTING_LOCALES.getOnRu().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.is_onload_unsafe).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          is_onload_unsafe: value,
          is_onload: this.plugin.settings.is_onload ? false : this.plugin.settings.is_onload
        });
        yield this.plugin.uptSettings(next);
      }));
      return toggle;
    });
    onRuStg.nameEl.parentElement.appendChild(onRuAttention);
    onRuStg.nameEl.parentElement.appendChild(onRuInfo);
    this._configIgnore = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getIgnInf().name).setDesc(SETTING_LOCALES.getIgnInf().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.is_ignore).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          is_ignore: value
        });
        yield this.plugin.uptSettings(next);
        yield this.__uptIgnConfig(
          [ignoreExtInp, ignoreMskInp],
          [ignoreExtMsg, ignoreMskMsg],
          this.plugin.settings.is_ignore
        );
        this.__updateErrors();
      }));
      return toggle;
    });
    let ignoreWarn = document.createElement("div");
    ignoreWarn.style.fontSize = "80%";
    ignoreWarn.style.margin = "10px";
    ignoreWarn.style.color = "yellow";
    ignoreWarn.innerHTML = SETTING_LOCALES.getIgnMsg().msg;
    this._configIgnore.nameEl.appendChild(ignoreWarn);
    let ignoreExtMsg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getIgnExt().name).setDesc(SETTING_LOCALES.getIgnExt().desc);
    let ignoreExtInp = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("txt; conf; config; data; logs").setValue(this.plugin.settings.ignore_extensions).onChange((value) => __async(this, null, function* () {
      let next = __spreadValues({}, this.plugin.settings);
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.stable = true;
          next.ignore_extensions = value;
        } catch (e) {
          next.stable = false;
        }
      }
      this.__uptState(
        configInput,
        this.plugin.settings.stable,
        next.stable
      );
      yield this.plugin.uptSettings(next);
      this.__updateErrors();
    }));
    ignoreExtInp.inputEl.style.width = "100%";
    ignoreExtInp.inputEl.style.height = "48px";
    ignoreExtInp.inputEl.style.minHeight = "36px";
    let ignoreMskMsg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getIgnMsk().name).setDesc(SETTING_LOCALES.getIgnMsk().desc);
    let ignoreMskInp = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("\\.(txt|md)$; doc_[a-z]; file_\\d{3}; file1").setValue(this.plugin.settings.ignore_masks).onChange((value) => __async(this, null, function* () {
      let next = __spreadValues({}, this.plugin.settings);
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.stable = true;
          next.ignore_masks = value;
        } catch (e) {
          next.stable = false;
        }
      }
      this.__uptState(
        configInput,
        this.plugin.settings.stable,
        next.stable
      );
      yield this.plugin.uptSettings(next);
      yield this.__updateErrors();
    }));
    ignoreMskInp.inputEl.style.width = "100%";
    ignoreMskInp.inputEl.style.height = "48px";
    ignoreMskInp.inputEl.style.minHeight = "36px";
    this.__uptIgnConfig(
      [ignoreExtInp, ignoreMskInp],
      [ignoreExtMsg, ignoreMskMsg],
      this.plugin.settings.is_ignore
    );
    let groupMsg = new import_obsidian.Setting(containerEl).setName(SETTING_LOCALES.getGrpInf().name).setDesc(SETTING_LOCALES.getGrpInf().desc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.is_grouped).onChange((value) => __async(this, null, function* () {
        let next = __spreadProps(__spreadValues({}, this.plugin.settings), {
          is_grouped: value
        });
        yield this.plugin.uptSettings(next);
        this.__updateErrors();
      }));
      return toggle;
    });
    let groupedWarn = document.createElement("div");
    groupedWarn.style.fontSize = "80%";
    groupedWarn.style.margin = "10px";
    groupedWarn.style.color = "yellow";
    groupedWarn.innerHTML = SETTING_LOCALES.getGrpMsg().msg;
    groupMsg.nameEl.appendChild(groupedWarn);
    let groupExtInp = new import_obsidian.TextAreaComponent(containerEl).setPlaceholder("md: json, txt, pgb; json: data, md, txt;").setValue(this.plugin.settings.grouped_extensions).onChange((value) => __async(this, null, function* () {
      let next = __spreadValues({}, this.plugin.settings);
      if (value !== "" && value !== null && value !== void 0) {
        try {
          next.stable = true;
          next.grouped_extensions = value;
        } catch (e) {
          next.stable = false;
        }
      }
      this.__uptState(
        configInput,
        this.plugin.settings.stable,
        next.stable
      );
      yield this.plugin.uptSettings(next);
      this.__updateErrors();
    }));
    groupExtInp.inputEl.style.width = "100%";
    groupExtInp.inputEl.style.height = "48px";
    groupExtInp.inputEl.style.minHeight = "36px";
  }
  __uptMbConfig(mbConfigInput, mbConfigEnabled) {
    mbConfigInput.inputEl.style.display = mbConfigEnabled ? "block" : "none";
  }
  __uptIgnConfig(ignInps, ignMsgs, ignConfigEnabled) {
    ignInps[0].inputEl.style.display = ignConfigEnabled ? "block" : "none";
    ignMsgs[0].settingEl.style.display = ignConfigEnabled ? "block" : "none";
    ignInps[1].inputEl.style.display = ignConfigEnabled ? "block" : "none";
    ignMsgs[1].settingEl.style.display = ignConfigEnabled ? "block" : "none";
  }
  __uptState(data, prev, next) {
    if (prev !== next) {
      if (prev) {
        if (!this.defaults) {
          this.defaults = {
            color: data.inputEl.style.color,
            borderColor: data.inputEl.style.borderColor,
            borderWidth: data.inputEl.style.borderWidth
          };
        }
        data.inputEl.style.color = "red";
        data.inputEl.style.borderColor = "red";
        data.inputEl.style.borderWidth = "4px";
      } else if (this.defaults) {
        data.inputEl.style.color = this.defaults.color;
        data.inputEl.style.borderColor = this.defaults.borderColor;
        data.inputEl.style.borderWidth = this.defaults.borderWidth;
      }
    }
  }
  __updateErrors() {
    if (Object.keys(this.plugin.settings.errors).length === 0) {
      this._errors.innerHTML = "None";
      this._errors.style.color = "green";
    } else {
      this._errors.innerHTML = `Errors: <ul>${Object.keys(this.plugin.settings.errors).map((k) => `<li><b>${k}</b>: ${this.plugin.settings.errors[k]}</li>`).join("")}</ul>`;
      this._errors.style.color = "red";
    }
  }
};

// source/components/view.ts
var import_obsidian2 = require("obsidian");
var import_codemirror = __toESM(require_codemirror());
var UNITADE_VIEW = class extends import_obsidian2.TextFileView {
  constructor(leaf, extension) {
    super(leaf);
    this._extension = "";
    this.onChange = (instance, changes) => __async(this, null, function* () {
      this.requestSave();
    });
    this._extension = extension;
    this._codemirror = (0, import_codemirror.default)(this.contentEl, {
      theme: "obsidian"
    });
    this._codemirror.on("changes", this.onChange);
  }
  onResize() {
    this._codemirror.refresh();
  }
  getViewData() {
    return this._codemirror.getValue();
  }
  setViewData(data, clear) {
    if (clear)
      this._codemirror.swapDoc(import_codemirror.default.Doc(data, `text/x-${this._extension}`));
    else
      this._codemirror.setValue(data);
  }
  clear() {
    this._codemirror.setValue("");
    this._codemirror.clearHistory();
  }
  getDisplayText() {
    if (this.file)
      return this.file.basename;
    else
      return "no file";
  }
  canAcceptExtension(extension) {
    return extension === this._extension;
  }
  getViewType() {
    return this._extension;
  }
};

// source/main.ts
var import_codemirror2 = __toESM(require_codemirror());

// source/components/file-edit.ts
var import_obsidian3 = require("obsidian");

// source/locales/modals.text.ts
var MODALES_LOCALE = class {
  static gtToggle1() {
    return {
      name: "Include in extensions registry:",
      desc: "If enabled, generated file's extension would be inserted in extensions array."
    };
  }
};

// source/components/file-edit.ts
var TFileEdit = class extends import_obsidian3.Modal {
  constructor(plugin, target) {
    var _a;
    super(plugin.app);
    this.plugin = plugin;
    this.target = target;
    (_a = this.target) != null ? _a : this.target = this.plugin.app.vault.getRoot();
    this._filename = this.target.path.split("/").last();
    this._filepath = this.target.path.split("/").slice(0, -1).join("/");
    this._extension = this._filename.split(".").slice(1).join(".");
    this._name = this._filename.split(".").first();
    this._integration = false;
  }
  onOpen() {
    const { contentEl } = this;
    const form = contentEl.createEl("div");
    const disp = contentEl.createEl("span");
    const input = new import_obsidian3.TextComponent(form);
    contentEl.style.cssText = `
            display:          flex;
            align-items:    center;
            flex-direction: column;
            `;
    disp.style.cssText = `
            flex-grow:       1;
            font-weight:  bold;
            margin-top:   10px;
            margin-right: 10px;
            margin-bottom: 5px;
            text-align: center;
            `;
    form.style.cssText = `
            display:       flex;
            align-items: center;
            `;
    input.inputEl.style.cssText = `
            flex-grow:       1;
            margin-right: 10px;
            `;
    disp.innerHTML = this.__pathgen();
    input.inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.__submit();
      } else if (e.key === "Escape") {
        this.close();
      }
    });
    input.setValue(this._extension);
    input.onChange((value) => {
      this._extension = value.startsWith(".") ? value.slice(1) : value;
      disp.innerHTML = this.__pathgen();
    });
    new import_obsidian3.ButtonComponent(form).setCta().setIcon("pencil").setButtonText("Edit").onClick(() => this.__submit());
    new import_obsidian3.Setting(contentEl).setName(MODALES_LOCALE.gtToggle1().name).setDesc(MODALES_LOCALE.gtToggle1().desc).addToggle((toggle) => {
      toggle.setValue(this._integration).onChange((value) => __async(this, null, function* () {
        this._integration = value;
      }));
      return toggle;
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
  __submit() {
    return __async(this, null, function* () {
      this.close();
      if (this._integration) {
        let next = __spreadValues({}, this.plugin.settings);
        next.extensions += `;${this._extension}`;
        this.plugin.uptSettings(next);
      }
      yield this.app.vault.rename(this.target, this.__pathgen());
    });
  }
  __pathgen() {
    return this._filepath + "/" + this._name + (!!this._extension ? "." : "") + this._extension;
  }
};

// source/components/file-create.ts
var import_obsidian4 = require("obsidian");
var TFileCreate = class extends import_obsidian4.Modal {
  constructor(plugin, target) {
    super(plugin.app);
    this.plugin = plugin;
    this.target = target;
    this._filepath = this.target.path;
    this._name = "";
    this._integration = false;
  }
  onOpen() {
    const { contentEl } = this;
    const form = contentEl.createEl("div");
    const disp = contentEl.createEl("span");
    const input = new import_obsidian4.TextComponent(form);
    contentEl.style.cssText = `
            display:          flex;
            align-items:    center;
            flex-direction: column;
            `;
    disp.style.cssText = `
            flex-grow:       1;
            font-weight:  bold;
            margin-top:   10px;
            margin-right: 10px;
            margin-bottom: 5px;
            text-align: center;
            `;
    form.style.cssText = `
            display:       flex;
            align-items: center;
            `;
    input.inputEl.style.cssText = `
            flex-grow:       1;
            margin-right: 10px;
            `;
    disp.innerHTML = "Enter fullname of your file";
    input.inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.__submit();
      } else if (e.key === "Escape") {
        this.close();
      }
    });
    input.setValue(this._name);
    input.onChange((value) => {
      this._name = value;
      disp.innerHTML = `Enter fullname of your file: ${this._pathgen()}`;
    });
    new import_obsidian4.ButtonComponent(form).setCta().setIcon("pencil").setButtonText("Create").onClick(() => this.__submit());
    new import_obsidian4.Setting(contentEl).setName(MODALES_LOCALE.gtToggle1().name).setDesc(MODALES_LOCALE.gtToggle1().desc).addToggle((toggle) => {
      toggle.setValue(this._integration).onChange((value) => __async(this, null, function* () {
        this._integration = value;
      }));
      return toggle;
    });
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
  __submit() {
    return __async(this, null, function* () {
      this.close();
      if (this._integration) {
        let next = __spreadValues({}, this.plugin.settings);
        let extensions = this._name.split(".").slice(1).join(";");
        next.extensions += `;${extensions}`;
        this.plugin.uptSettings(next);
      }
      yield this.app.vault.create(this._pathgen(), "");
    });
  }
  _pathgen() {
    return this._filepath + "/" + this._name;
  }
};

// source/utils/utils.ts
var import_obsidian5 = require("obsidian");
function isTFile(file) {
  return file instanceof import_obsidian5.TFile;
}
function isTFolder(file) {
  return file instanceof import_obsidian5.TFolder;
}

// source/utils/functions.ts
function gencase(input) {
  const variations = [];
  function gen(current, index) {
    if (index === input.length) {
      variations.push(current);
      return;
    }
    const char = input[index];
    gen(current + char.toLowerCase(), index + 1);
    gen(current + char.toUpperCase(), index + 1);
  }
  gen("", 0);
  return variations;
}
function parsegroup(input) {
  const settings = {};
  const settings_parsed = input.split(";");
  for (const setting of settings_parsed) {
    const [key, values] = setting.trim().split(":");
    if (values !== void 0) {
      const arr_values = values.split(",").map((value) => value.trim());
      settings[key.trim()] = arr_values;
    } else {
      settings[key.trim()] = [];
    }
  }
  return settings;
}

// source/main.ts
var UNITADE_PLUGIN = class _UNITADE_PLUGIN extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    this._settings = DEFAULT_SETTINGS;
  }
  get settings() {
    return this._settings;
  }
  get is_mobile() {
    return import_obsidian6.Platform.isMobile && this.settings.mobile_settings.enable;
  }
  onload() {
    return __async(this, null, function* () {
      __superGet(_UNITADE_PLUGIN.prototype, this, "onload").call(this);
      yield this.ldSettings();
      this.app.vault.on("create", (file) => __async(this, null, function* () {
        const filename = file.name.split(".").splice(1);
        if (isTFolder(file))
          return;
        if (this.settings.is_ignore) {
          for (const mask of this.settings.ignore_masks.split(";")) {
            const _mask = mask.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            try {
              const regex = new RegExp(_mask);
              if (regex.test(file.name)) {
                return;
              }
            } catch (error) {
              console.error("Error creating regular expression:", error);
            }
          }
        }
        if (this.settings.is_onload) {
          if (this.settings.ignore_extensions.split(";").includes(filename.last()) && this.settings.is_ignore)
            return;
          if (this.settings.extensions.split(";").includes(filename.last()))
            return;
          if (this.settings.mobile_settings.enable && this.settings.mobile_settings.extensions.split(";").includes(filename.last()))
            return;
          try {
            this.__tryApply(filename.last(), "markdown");
            let __settings = this.settings.extensions.split(";");
            __settings.push(`${filename.last()}`);
            this.settings.extensions = __settings.join(";");
            if (this.settings.mobile_settings.enable) {
              let __mb_settings = this.settings.mobile_settings.extensions.split(";");
              __mb_settings.push(`${filename.last()}`);
              this.settings.mobile_settings.extensions = __mb_settings.join(";");
            }
          } catch (err) {
            new Notification("Error from UNITADE plugin:", { body: `Error with on-load registry of: ${filename.last()}};` });
            console.error(err);
          }
        }
        if (this.settings.is_onload_unsafe) {
          const extensions = filename;
          for (const extension of extensions) {
            if (this.settings.ignore_extensions.split(";").includes(extension) && this.settings.is_ignore)
              return;
            if (this.settings.extensions.split(";").includes(extension))
              return;
            if (this.settings.mobile_settings.enable && this.settings.mobile_settings.extensions.split(";").includes(extension))
              return;
            try {
              this.__tryApply(extension, "markdown");
              let __settings = this.settings.extensions.split(";");
              __settings.push(`${extension}`);
              this.settings.extensions = __settings.join(";");
              if (this.settings.mobile_settings.enable) {
                let __mb_settings = this.settings.mobile_settings.extensions.split(";");
                __mb_settings.push(`${extension}`);
                this.settings.mobile_settings.extensions = __mb_settings.join(";");
              }
            } catch (err) {
              new Notification("Error from UNITADE plugin:", { body: `Error with on-load registry of: ${extensions}` });
              console.error(err);
            }
          }
        }
      }));
      if (this._settings.markdown_overcharge)
        this.app.viewRegistry.unregisterExtensions(["md"]);
      this.addSettingTab(new UNITADE_SETTINGS_TAB(this.app, this));
      this.app.workspace.layoutReady ? this.ltReady() : this.app.workspace.on("active-leaf-change", this.ltReady);
      this.registerEvent(this.__ctxEditExt());
      this.__apply();
    });
  }
  __ctxEditExt() {
    return this.app.workspace.on("file-menu", (menu, file) => {
      menu.addItem((item) => {
        item.setTitle("Edit extension");
        item.setIcon("pencil").onClick(() => {
          if (isTFolder(file))
            return;
          new TFileEdit(this, file).open();
        });
      }).addItem((item) => {
        item.setTitle("Create with extension");
        item.setIcon("pencil").onClick(() => {
          if (isTFile(file))
            return;
          new TFileCreate(this, file).open();
        });
      });
    });
  }
  ltReady() {
    this.app.workspace.off("layout-ready", this.ltReady);
    this.leafRef();
  }
  leafRef() {
    this.app.workspace.iterateCodeMirrors((cm) => cm.setOption("mode", cm.getOption("mode")));
  }
  onunload() {
    return __async(this, null, function* () {
      __superGet(_UNITADE_PLUGIN.prototype, this, "onunload").call(this);
      this.__unapply(this.settings);
      try {
        this.registerExtensions([".md"], "markdown");
      } catch (err) {
        console.error(err);
        this.settings.errors["markdown_override"] = `Error with reregistering extensions: ${err}`;
      }
      for (const key in import_codemirror2.default.modes) {
        if (import_codemirror2.default.modes.hasOwnProperty(key) && !["hypermd", "markdown", "null", "xml"].includes(key))
          delete import_codemirror2.default.modes[key];
      }
      this.leafRef();
    });
  }
  ldSettings() {
    return __async(this, null, function* () {
      this._settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  uptSettings(upt_settings) {
    return __async(this, null, function* () {
      this.__unapply(upt_settings);
      this._settings = upt_settings;
      yield this.saveData(this.settings);
      this.__apply();
    });
  }
  __apply() {
    var _a;
    if (this.settings.is_grouped) {
      const data = parsegroup(this.settings.grouped_extensions);
      for (const view in data) {
        this.__applyCfg(data[view].join(";"), view);
      }
    }
    if (this.is_mobile) {
      this.__applyCfg((_a = this.settings.mobile_settings.extensions) != null ? _a : this.settings.extensions, "markdown");
    } else {
      this.__applyCfg(this.settings.extensions, "markdown");
    }
    const forced_extensions = this.settings.forced_extensions.split(";").map((s) => s.trim());
    for (const extension of forced_extensions) {
      try {
        this.registerView(extension, (leaf) => {
          return new UNITADE_VIEW(leaf, extension);
        });
      } catch (err) {
        new Notification("Error from UNITADE plugin:", { body: `${err}` });
        this.settings.errors[extension] = `Error from UNITADE plugin: ${err}`;
        console.error(err);
      }
    }
  }
  apply() {
    this.__apply();
  }
  __tryApply(filetype, view) {
    if (!this.settings.markdown_overcharge && ["md", "mdown", "markdown"].includes(filetype))
      return;
    if (this.app.viewRegistry.isExtensionRegistered(filetype))
      return;
    try {
      this.registerExtensions([filetype], view);
    } catch (err) {
      let curr = this.app.viewRegistry.getTypeByExtension(filetype);
      let _msg;
      if (curr) {
        _msg = `Could not register extension: ${filetype} to view as ${view}.
It's already registered.`;
      } else {
        _msg = `Could not register extension: ${filetype} to view as ${view}.
${err}`;
      }
      new Notification("Error from UNITADE plugin:", { body: _msg });
      console.error(_msg);
      this._settings.errors[filetype] = _msg;
    }
  }
  __applyCfg(extensions, view) {
    this.settings.errors = {};
    if (this.settings.debug_mode)
      console.info(this.app.viewRegistry.typeByExtension);
    const extensions_arr = extensions.split(";").map((s) => s.trim());
    for (const extension of extensions_arr) {
      if (this.settings.is_ignore && this.settings.ignore_extensions.split(";").includes(extension))
        continue;
      const rnd_filetype = gencase(extension);
      for (const type of rnd_filetype)
        this.__tryApply(type, view);
    }
  }
  __unapply(upt_settings) {
    var _a;
    if (this.is_mobile) {
      this.__unapplyCfg((_a = this.settings.mobile_settings.extensions) != null ? _a : this.settings.extensions, upt_settings.markdown_overcharge);
    } else {
      this.__unapplyCfg(this.settings.extensions, upt_settings.markdown_overcharge);
    }
  }
  unapply() {
    this.__unapply(this.settings);
  }
  __unapplyCfg(extensions, markdown_charge) {
    const ext_arr = extensions.split(";").map((s) => s.trim());
    for (const extension of ext_arr)
      if (markdown_charge || extension !== "md") {
        if (!this._settings.errors[extension]) {
          try {
            this.app.viewRegistry.unregisterExtensions([extension]);
          } catch (err) {
            const _msg = `Couldn't unregistry extension: ${extension};`;
            new Notification("Error from UNITADE plugin:", { body: _msg });
            this.settings.errors[extension] = _msg;
            console.error(_msg);
          }
        }
      }
  }
};
