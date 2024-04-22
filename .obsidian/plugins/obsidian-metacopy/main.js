var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
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

// metacopy/main.ts
__export(exports, {
  default: () => MetaCopy
});
var import_obsidian5 = __toModule(require("obsidian"));

// metacopy/settings.ts
var import_obsidian2 = __toModule(require("obsidian"));

// metacopy/i18n/index.ts
var import_obsidian = __toModule(require("obsidian"));

// metacopy/i18n/locales/en.ts
var en_default = {
  title: "MetaCopy Settings",
  keyTitle: {
    title: "Key",
    desc: "The frontmatterKey which you want to copy the correspondingValue",
    placeholder: "key1, key2, key3,\u2026"
  },
  linkCreator: {
    header: "Link Creator",
    baseLink: "Base link",
    baseLinkDesc: "The base of the link",
    behavior: {
      title: "Default behavior",
      desc: "Choose between a metadata frontmatterKey, obsidian path & fixed folder for the link creator",
      fixedFolder: "Fixed Folder",
      categoryKey: "Metadata Key",
      obsidianPath: "Obsidian Path"
    },
    keyLink: {
      title: "Key link",
      desc: "The frontmatterKey to create as link",
      defaultValue: "Default correspondingValue",
      defaultValueDesc: "If you want to active the link creation without the frontmatterKey set."
    },
    folderNote: {
      title: "Folder note",
      desc: "If the file name = frontmatterKey link or parent folder, remove the file name in the link"
    },
    useFrontMatterTitle: {
      title: "Use frontmatter frontmatterKey as title",
      desc: "Use a frontmatter field instead of the file name."
    },
    regexReplaceTitle: {
      title: "Apply a replacement to the filename",
      desc: 'If the text is between "//", it will be used as a regex. Otherwise, it will be used as a string.'
    },
    replaceLinkPart: {
      title: "Replace a part of the link",
      desc: "You can add multiple string, separated by a comma."
    }
  },
  disable: {
    title: "Disable MetaCopy",
    desc: "Disable Metacopy context menu with a frontmatter frontmatterKey.",
    descURL: "Also disable the URL creation in command modal."
  },
  menuBehavior: {
    title: "Menu behavior",
    desc: "Enable : require a configured frontmatterKey to enable the menu",
    keyMenu: "Key menu",
    keyMenuDesc: "The frontmatterKey used to disable/enable the metacopy file menu"
  },
  command: {
    metadataMessage: (key) => `Metadata key "${key}" copied to the clipboard.`,
    metadataMessageURL: "URL send to the clipboard.",
    copy: "Copy link",
    copyCmd: (key) => `Copy [${key}]`,
    copyURL: "MetaCopy : Create URL"
  }
};

// metacopy/i18n/locales/fr.ts
var fr_default = {
  title: "Param\xE8tre MetaCopy",
  keyTitle: {
    title: "Cl\xE9",
    desc: "La cl\xE9 dont vous voulez copier la valeur",
    placeholder: "cl\xE91, cl\xE92, cl\xE93,\u2026"
  },
  linkCreator: {
    header: "Cr\xE9ateur de lien",
    baseLink: "Base du lien",
    baseLinkDesc: "La base du lien",
    behavior: {
      title: "Comportement par d\xE9faut",
      desc: "Choisissez entre une cl\xE9 de m\xE9tadonn\xE9es, le chemin dans Obsidian et un dossier fixe pour le cr\xE9ateur de liens.",
      fixedFolder: "Dossier fixe",
      categoryKey: "Cl\xE9 de m\xE9tadonn\xE9e",
      obsidianPath: "Chemin Obsidian"
    },
    keyLink: {
      title: "Cl\xE9 de lien",
      desc: "La cl\xE9 pour cr\xE9er le lien",
      defaultValue: "Valeur par d\xE9faut",
      defaultValueDesc: "Si vous voulez activer la cr\xE9ation de liens sans cl\xE9 de m\xE9tadonn\xE9e."
    },
    folderNote: {
      title: "Folder Note",
      desc: "Si le nom du fichier = lien cl\xE9 ou dossier parent, supprimer le nom du fichier dans le lien"
    },
    useFrontMatterTitle: {
      title: "Utiliser une cl\xE9 frontmatter pour le titre",
      desc: "Utiliser une cl\xE9 de m\xE9tadonn\xE9e en tant que titre (au lieu du nom du fichier) pour cr\xE9er le lien."
    },
    regexReplaceTitle: {
      title: "Appliquer un remplacement au titre",
      desc: 'Si le texte est entre "//", il sera interpr\xE9t\xE9 comme une expression r\xE9guli\xE8re. Sinon, il sera interpr\xE9t\xE9 comme une cha\xEEne de caract\xE8res.'
    },
    replaceLinkPart: {
      title: "Supprimer une partie du lien",
      desc: "Vous pouvez ajouter plusieurs cha\xEEnes de caract\xE8res, s\xE9par\xE9es par une virgule."
    }
  },
  disable: {
    title: "D\xE9sactiver MetaCopy",
    desc: "D\xE9sactiver le menu contextuel de Metacopy avec une cl\xE9 de m\xE9tadonn\xE9e.",
    descURL: "D\xE9sactive \xE9galement la cr\xE9ation d'URL dans la commande."
  },
  menuBehavior: {
    title: "Comportement du menu",
    desc: "Activer : n\xE9cessite une cl\xE9 configur\xE9e pour activer le menu",
    keyMenu: "Cl\xE9 du menu",
    keyMenuDesc: "La cl\xE9 utilis\xE9e pour d\xE9sactiver/activer le menu du fichier Metacopy."
  },
  command: {
    metadataMessage: (key) => `Cl\xE9 de m\xE9tadonn\xE9e "${key}" copi\xE9e dans le presse-papier`,
    metadataMessageURL: "URL envoy\xE9 dans le presse-papier",
    copy: "Copier le lien",
    copyCmd: (key) => `Copie de [${key}]`,
    copyURL: "MetaCopy : Cr\xE9er URL"
  }
};

// metacopy/i18n/index.ts
var localeMap = {
  "en": en_default,
  "fr": fr_default
};
var locale = localeMap[import_obsidian.moment.locale()] || localeMap.en;
function nestedProp(obj, path) {
  return path.split(".").reduce((o, k) => o ? o[k] : void 0, obj);
}
function t(multipleKey) {
  return locale && nestedProp(locale, multipleKey) || nestedProp(en_default, multipleKey);
}

// metacopy/settings.ts
var BehaviourLinkCreator;
(function(BehaviourLinkCreator2) {
  BehaviourLinkCreator2["CATEGORY_KEY"] = "categoryKey";
  BehaviourLinkCreator2["OBSIDIAN_PATH"] = "obsidianPath";
  BehaviourLinkCreator2["FIXED_FOLDER"] = "fixedFolder";
})(BehaviourLinkCreator || (BehaviourLinkCreator = {}));
var DEFAULT_SETTINGS = {
  copyKey: [],
  baseLink: "",
  keyLink: "",
  comport: false,
  disableKey: "",
  folderNote: false,
  defaultKeyLink: "",
  behaviourLinkCreator: BehaviourLinkCreator.CATEGORY_KEY,
  useFrontMatterTitle: false,
  frontmattertitleKey: "title",
  titleRegex: "",
  titleReplace: "",
  removeLinkPart: []
};
var CopySettingsTabs = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    function showSettings(containerEl2) {
      containerEl2.descEl.show();
      containerEl2.nameEl.show();
      containerEl2.controlEl.show();
    }
    function hideSettings(containerEl2) {
      containerEl2.descEl.hide();
      containerEl2.nameEl.hide();
      containerEl2.controlEl.hide();
    }
    containerEl.empty();
    containerEl.createEl("h2", { text: t("metaCopySettings") });
    new import_obsidian2.Setting(containerEl).setName(t("keyTitle.title")).setDesc(t("keyTitle.desc")).addTextArea((text) => text.setPlaceholder(t("keyTitle.placeholder")).setValue(this.plugin.settings.copyKey.join(", ")).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.copyKey = value.split(/[\n, ]/);
      yield this.plugin.saveSettings();
    })));
    containerEl.createEl("h3", { text: t("linkCreator.header") });
    new import_obsidian2.Setting(containerEl).setName(t("linkCreator.baseLink")).setDesc(t("linkCreator.baseLinkDesc")).addText((text) => text.setPlaceholder("https://obsidian-file.github.io/").setValue(this.plugin.settings.baseLink).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.baseLink = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian2.Setting(containerEl).setName(t("linkCreator.behavior.title")).setDesc(t("linkCreator.behavior.desc")).addDropdown((dropdown) => dropdown.addOptions({
      fixedFolder: t("linkCreator.behavior.fixedFolder"),
      categoryKey: t("linkCreator.behavior.categoryKey"),
      obsidianPath: t("linkCreator.behavior.obsidianPath")
    }).setValue(this.plugin.settings.behaviourLinkCreator).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.behaviourLinkCreator = value;
      if (value === BehaviourLinkCreator.CATEGORY_KEY) {
        showSettings(keyLinkSettings);
      } else if (value === BehaviourLinkCreator.FIXED_FOLDER) {
        hideSettings(folderNoteSettings);
        hideSettings(keyLinkSettings);
      } else {
        hideSettings(keyLinkSettings);
        showSettings(folderNoteSettings);
      }
      yield this.plugin.saveSettings();
    })));
    const keyLinkSettings = new import_obsidian2.Setting(containerEl).setName(t("linkCreator.keyLink.title")).setDesc(t("linkCreator.keyLink.desc")).setClass("metacopy-settings").addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.keyLink).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.keyLink = value;
      yield this.plugin.saveSettings();
    })));
    if (this.plugin.settings.behaviourLinkCreator === BehaviourLinkCreator.CATEGORY_KEY) {
      showSettings(keyLinkSettings);
    } else {
      hideSettings(keyLinkSettings);
    }
    new import_obsidian2.Setting(containerEl).setName(t("linkCreator.keyLink.defaultValue")).setDesc(t("linkCreator.keyLink.defaultValueDesc")).addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.defaultKeyLink).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.defaultKeyLink = value;
      yield this.plugin.saveSettings();
    })));
    const folderNoteSettings = new import_obsidian2.Setting(containerEl).setName(t("linkCreator.folderNote.title")).setDesc(t("linkCreator.folderNote.desc")).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.folderNote);
      toggle.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.folderNote = value;
        yield this.plugin.saveSettings();
      }));
    });
    const titleSettings = new import_obsidian2.Setting(containerEl).setName(t("linkCreator.useFrontMatterTitle.title")).setDesc(t("linkCreator.useFrontMatterTitle.desc")).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.useFrontMatterTitle);
      toggle.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.useFrontMatterTitle = value;
        yield this.plugin.saveSettings();
        this.display();
      }));
    });
    if (this.plugin.settings.useFrontMatterTitle) {
      titleSettings.addText((text) => {
        text.setPlaceholder("title").setValue(this.plugin.settings.frontmattertitleKey).onChange((value) => __async(this, null, function* () {
          this.plugin.settings.frontmattertitleKey = value.trim();
          yield this.plugin.saveSettings();
        }));
      });
    }
    new import_obsidian2.Setting(containerEl).setName(t("linkCreator.regexReplaceTitle.title")).setDesc(t("linkCreator.regexReplaceTitle.desc")).addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.titleRegex).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.titleRegex = value;
      yield this.plugin.saveSettings();
    }))).addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.titleReplace).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.titleReplace = value;
      yield this.plugin.saveSettings();
    })));
    if (this.plugin.settings.behaviourLinkCreator === BehaviourLinkCreator.FIXED_FOLDER) {
      hideSettings(folderNoteSettings);
    } else {
      showSettings(folderNoteSettings);
    }
    new import_obsidian2.Setting(containerEl).setName(t("linkCreator.replaceLinkPart.title")).setDesc(t("linkCreator.replaceLinkPart.desc")).addTextArea((text) => text.setPlaceholder("").setValue(this.plugin.settings.removeLinkPart.join(", ")).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.removeLinkPart = value.split(/[,\n]/).map((item) => item.trim()).filter((item) => item.length > 0);
      yield this.plugin.saveSettings();
    })));
    containerEl.createEl("h3", { text: t("disable.title") });
    containerEl.createEl("p", {
      text: t("disable.desc")
    });
    containerEl.createEl("p", {
      text: t("disable.descURL")
    });
    new import_obsidian2.Setting(containerEl).setName(t("menuBehavior.title")).setDesc(t("menuBehavior.desc")).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.comport);
      toggle.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.comport = value;
        yield this.plugin.saveSettings();
      }));
    });
    new import_obsidian2.Setting(containerEl).setName(t("menuBehavior.keyMenu")).setDesc(t("menuBehavior.keyMenuDesc")).addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.disableKey).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.disableKey = value;
      yield this.plugin.saveSettings();
    })));
  }
};

// metacopy/modal.ts
var import_obsidian4 = __toModule(require("obsidian"));

// metacopy/src/utils.ts
var import_obsidian3 = __toModule(require("obsidian"));

// metacopy/src/pluginBehavior.ts
function disableMetaCopy(app, settings, file) {
  const toggle = settings.comport;
  const fileCache = app.metadataCache.getFileCache(file);
  const meta = fileCache == null ? void 0 : fileCache.frontmatter;
  if (!meta && settings.behaviourLinkCreator === BehaviourLinkCreator.OBSIDIAN_PATH) {
    return true;
  }
  if (toggle) {
    if (meta === void 0) {
      return false;
    } else
      return !!meta[settings.disableKey];
  } else {
    if (meta === void 0) {
      return false;
    } else
      return !meta[settings.disableKey];
  }
}

// metacopy/src/metadata.ts
function getMeta(app, file, settings) {
  var _a;
  if (!file) {
    return null;
  }
  const meta = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
  const defaultKey = {
    frontmatterKey: "DefaultKey",
    correspondingValue: settings.defaultKeyLink
  };
  if (meta === void 0) {
    if (settings.behaviourLinkCreator !== BehaviourLinkCreator.OBSIDIAN_PATH) {
      return null;
    } else {
      return defaultKey;
    }
  }
  let linkValue = "";
  let metaKey = "";
  if (settings) {
    if (settings.copyKey.length > 1) {
      for (let i = 0; i < settings.copyKey.length; i++) {
        if (meta[settings.copyKey[i]] !== void 0) {
          linkValue = meta[settings.copyKey[i]].trim();
          metaKey = settings.copyKey[i].trim();
          break;
        }
      }
    } else {
      linkValue = meta[settings.copyKey[0]];
      metaKey = settings.copyKey[0];
    }
  }
  const metaKeys = {
    frontmatterKey: metaKey,
    correspondingValue: linkValue
  };
  if (!linkValue && settings.defaultKeyLink) {
    return defaultKey;
  }
  return metaKeys;
}
function checkMeta(app, settings) {
  const file = app.workspace.getActiveFile();
  const meta = getMeta(app, file, settings);
  const cmd = t("command.copy");
  const checkKey = (meta == null ? void 0 : meta.frontmatterKey) === "DefaultKey" || (meta == null ? void 0 : meta.frontmatterKey) === cmd;
  return !!file && checkKey;
}
function getAllMeta(app, file, settings) {
  const metaValue = [];
  const frontmatter = app.metadataCache.getCache(file.path).frontmatter;
  let listKey = settings.copyKey;
  listKey = listKey.map((x) => x.trim());
  if (listKey.length > 0) {
    for (let i = 0; i < listKey.length; i++) {
      if (frontmatter[listKey[i]]) {
        metaValue.push(frontmatter[listKey[i].trim()]);
      }
    }
  }
  let mappedListKey = listKey.map((key, i) => ({
    key,
    value: metaValue[i]
  }));
  mappedListKey = JSON.parse(JSON.stringify(mappedListKey));
  Object.entries(mappedListKey).forEach(([, v]) => {
    if (v.value === void 0) {
      mappedListKey.remove(v);
    }
  });
  const enableMetaCopy = disableMetaCopy(app, settings, file);
  if (enableMetaCopy && settings.defaultKeyLink) {
    mappedListKey[mappedListKey.length] = {
      key: t("command.copy"),
      value: settings.defaultKeyLink
    };
  }
  return mappedListKey;
}

// metacopy/src/utils.ts
function getTitleField(frontmatter, file, settings) {
  let fileName = file.name;
  if (!settings.useFrontMatterTitle)
    return fileName;
  if (frontmatter && frontmatter[settings.frontmattertitleKey] && frontmatter[settings.frontmattertitleKey] !== file.name) {
    fileName = frontmatter[settings.frontmattertitleKey] + ".md";
  }
  return fileName;
}
function createLink(file, settings, metaCopy, app) {
  var _a;
  let url = metaCopy.correspondingValue;
  const folderPath = checkSlash(url).replace(/(^\/|\/$)/, "");
  const folder = folderPath.split("/").slice(-1)[0];
  const meta = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
  const cmd = t("command.copy");
  if (settings) {
    let baseLink = settings.baseLink;
    if (meta && meta["baselink"] !== void 0) {
      baseLink = meta["baselink"];
    }
    baseLink = checkSlash(baseLink);
    const folderNote = settings.folderNote;
    let fileName = getTitleField(meta, file, settings);
    if (settings.behaviourLinkCreator === "categoryKey") {
      const keyLink = settings.keyLink;
      if (metaCopy.frontmatterKey === keyLink || metaCopy.frontmatterKey == "DefaultKey" || metaCopy.frontmatterKey == cmd) {
        if (fileName.replace(".md", "") === folder && folderNote) {
          fileName = "/";
        } else {
          fileName = "/" + fileName + "/";
        }
        url = baseLink + folderPath + regexOnFileName(fileName, settings);
      }
    } else if (settings.behaviourLinkCreator === BehaviourLinkCreator.OBSIDIAN_PATH) {
      fileName = folderNoteIndexOBS(file, app.vault, settings, fileName);
      url = baseLink + settings.defaultKeyLink + fileName;
    } else {
      url = baseLink + settings.defaultKeyLink + "/" + regexOnFileName(fileName, settings) + "/";
    }
  }
  if (settings.removeLinkPart) {
    for (const part of settings.removeLinkPart) {
      url = url.replace(part, "");
    }
  }
  return encodeURI(url);
}
function folderNoteIndexOBS(file, vault, settings, fileName) {
  const defaultPath = `/${file.parent.path}/${regexOnFileName(fileName, settings)}`;
  if (!settings.folderNote)
    return defaultPath;
  const folderParent = file.parent.name;
  if (fileName.replace(".md", "") === folderParent)
    return `/${file.parent.path}/`;
  const outsideFolder = vault.getAbstractFileByPath(file.path.replace(".md", ""));
  if (outsideFolder && outsideFolder instanceof import_obsidian3.TFolder) {
    return `/${outsideFolder.path}/`;
  } else {
    return defaultPath;
  }
}
function getValue(app, file, settings) {
  return __async(this, null, function* () {
    const meta = getMeta(app, file, settings);
    if (!meta || meta.correspondingValue === void 0) {
      return false;
    }
    let value = meta.correspondingValue.toString();
    if (value.split(",").length > 1) {
      value = "- " + value.replaceAll(",", "\n- ");
    }
    const metaCopyValue = { frontmatterKey: meta.frontmatterKey, correspondingValue: value };
    const linkValue = createLink(file, settings, metaCopyValue, app);
    yield copy(linkValue, meta.frontmatterKey, settings);
  });
}
function checkSlash(link) {
  const slash = link.match(/\/*$/);
  if (slash[0].length != 1) {
    link = link.replace(/\/*$/, "") + "/";
  }
  return link;
}
function copy(content, item, settings) {
  return __async(this, null, function* () {
    yield navigator.clipboard.writeText(content);
    let message = t("command.metadataMessage")(item);
    if (item == "DefaultKey" || item == settings.keyLink) {
      message = t("command.metadataMessageURL");
    }
    new import_obsidian3.Notice(message);
  });
}
function regexOnFileName(fileName, settings) {
  if (fileName === "/" && settings.folderNote)
    return fileName;
  fileName = fileName.replace(".md", "");
  if (settings.titleRegex.length > 0) {
    const toReplace = settings.titleRegex;
    const replaceWith = settings.titleReplace;
    if (toReplace.match(/\/.+\//)) {
      const flagsRegex = toReplace.match(/\/([gimy]+)$/);
      const flags = flagsRegex ? Array.from(new Set(flagsRegex[1].split(""))).join("") : "";
      const regex = new RegExp(toReplace.replace(/\/(.+)\/.*/, "$1"), flags);
      return fileName.replace(regex, replaceWith);
    } else {
      return fileName.replaceAll(toReplace, replaceWith);
    }
  }
  return fileName;
}

// metacopy/modal.ts
var CopyMetaSuggester = class extends import_obsidian4.FuzzySuggestModal {
  constructor(app, settings, file) {
    super(app);
    this.file = file;
    this.settings = settings;
  }
  getItemText(item) {
    return item.key;
  }
  getItems() {
    return getAllMeta(this.app, this.file, this.settings);
  }
  onChooseItem(item, evt) {
    item.value = item.value.toString();
    if (item.value.split(",").length > 1) {
      item.value = "- " + item.value.replaceAll(",", "\n- ");
    }
    let contents = item.value;
    const cmd = t("command.copy");
    if (item.key === cmd) {
      contents = createLink(this.file, this.settings, { frontmatterKey: item.key, correspondingValue: item.value }, this.app);
    }
    copy(contents, item.key, this.settings);
  }
};

// metacopy/main.ts
var MetaCopy = class extends import_obsidian5.Plugin {
  convertstringToList(toConvert) {
    const str = this.settings[toConvert];
    if (typeof str === "string") {
      this.settings[toConvert] = str.split(/[\n, ]/).map((item) => item.trim());
      this.saveSettings();
    }
  }
  onload() {
    return __async(this, null, function* () {
      console.log("MetaCopy loaded");
      yield this.loadSettings();
      this.addSettingTab(new CopySettingsTabs(this.app, this));
      this.convertstringToList("copyKey");
      this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
        const meta = getMeta(this.app, file, this.settings);
        if (!meta) {
          return false;
        }
        const keyMeta = meta.frontmatterKey;
        let title = t("command.copy");
        let icon = "two-blank-pages";
        const enableMetaCopy = disableMetaCopy(this.app, this.settings, file);
        if ((keyMeta === this.settings.keyLink || this.settings.defaultKeyLink) && enableMetaCopy) {
          title = t("command.copyURL");
          icon = "price-tag-glyph";
        }
        if (meta.correspondingValue && enableMetaCopy) {
          menu.addSeparator();
          menu.addItem((item) => {
            item.setSection("info");
            item.setTitle(title).setIcon(icon).onClick(() => __async(this, null, function* () {
              yield getValue(this.app, file, this.settings);
            }));
          });
          menu.addSeparator();
        }
      }));
      this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor, view) => {
        const meta = getMeta(this.app, view.file, this.settings);
        if (!meta) {
          return false;
        }
        const keyMeta = meta.frontmatterKey;
        const enableMetaCopy = disableMetaCopy(this.app, this.settings, view.file);
        if ((keyMeta === this.settings.keyLink || this.settings.defaultKeyLink) && enableMetaCopy) {
          menu.addSeparator();
          menu.addItem((item) => {
            item.setSection("info");
            item.setTitle(t("command.copyURL")).setIcon("price-tag-glyph").onClick(() => __async(this, null, function* () {
              yield getValue(this.app, view.file, this.settings);
            }));
          });
          menu.addSeparator();
        }
      }));
      this.addCommand({
        id: "obsidian-metacopy",
        name: "Metacopy",
        hotkeys: [],
        checkCallback: (checking) => {
          const fileMeta = checkMeta(this.app, this.settings);
          if (fileMeta) {
            if (!checking) {
              new CopyMetaSuggester(this.app, this.settings, this.app.workspace.getActiveFile()).open();
            }
            return true;
          }
          return false;
        }
      });
    });
  }
  onunload() {
    return __async(this, null, function* () {
      console.log("MetaCopy unloaded");
    });
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
