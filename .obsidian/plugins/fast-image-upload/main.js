'use strict';

var obsidian = require('obsidian');
var path = require('path');
var child_process = require('child_process');
var fs = require('fs');
var os = require('os');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
var os__namespace = /*#__PURE__*/_interopNamespaceDefault(os);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var REGEX_FILE = /!\[(.*?)]\((\S+\.\w+)\)|!\[(.*?)]\((https?:\/\/.*?)\)/g;
var REGEX_WIKI_FILE = /!\[\[(.*?)(\s*?\|.*?)?]]/g;
var Cache = /** @class */ (function () {
    function Cache(app) {
        this.app = app;
    }
    Cache.prototype.getEditor = function () {
        var mdView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (mdView) {
            return mdView.editor;
        }
        else {
            return null;
        }
    };
    Cache.prototype.getValue = function () {
        var editor = this.getEditor();
        return editor.getValue();
    };
    Cache.prototype.setValue = function (value) {
        var editor = this.getEditor();
        var _a = editor.getScrollInfo(), left = _a.left, top = _a.top;
        var position = editor.getCursor();
        editor.setValue(value);
        editor.scrollTo(left, top);
        editor.setCursor(position);
    };
    Cache.prototype.getAllFiles = function () {
        var editor = this.getEditor();
        var value = editor.getValue();
        return this.getImageLink(value);
    };
    Cache.prototype.getImageLink = function (value) {
        var e_1, _a, e_2, _b;
        var matches = value.matchAll(REGEX_FILE);
        var WikiMatches = value.matchAll(REGEX_WIKI_FILE);
        var fileArray = [];
        try {
            for (var matches_1 = __values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                var match = matches_1_1.value;
                var source = match[0];
                var name_1 = match[1];
                var path$1 = match[2];
                if (name_1 === undefined) {
                    name_1 = match[3];
                }
                if (path$1 === undefined) {
                    path$1 = match[4];
                }
                fileArray.push({
                    path: path$1,
                    name: name_1,
                    source: source,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var WikiMatches_1 = __values(WikiMatches), WikiMatches_1_1 = WikiMatches_1.next(); !WikiMatches_1_1.done; WikiMatches_1_1 = WikiMatches_1.next()) {
                var match = WikiMatches_1_1.value;
                var name_2 = path.parse(match[1]).name;
                var path$1 = match[1];
                var source = match[0];
                if (match[2]) {
                    name_2 = "".concat(name_2).concat(match[2]);
                }
                fileArray.push({
                    path: path$1,
                    name: name_2,
                    source: source,
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (WikiMatches_1_1 && !WikiMatches_1_1.done && (_b = WikiMatches_1.return)) _b.call(WikiMatches_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return fileArray;
    };
    Cache.prototype.hasBlackDomain = function (src, blackDomains) {
        if (blackDomains.trim() === "") {
            return false;
        }
        var blackDomainList = blackDomains.split(",").filter(function (item) { return item !== ""; });
        var url = new URL(src);
        var domain = url.hostname;
        return blackDomainList.some(function (blackDomain) { return domain.includes(blackDomain); });
    };
    return Cache;
}());
var IMAGE_EXT_LIST = [
    ".png",
    ".jpg",
    ".jpeg",
    ".bmp",
    ".gif",
    ".svg",
    ".tiff",
    ".webp",
    ".avif",
];
function isAnImage(ext) {
    return IMAGE_EXT_LIST.includes(ext.toLowerCase());
}
function isAssetTypeAnImage(path$1) {
    return isAnImage(path.extname(path$1));
}
function bufferToArrayBuffer(buffer) {
    var arrayBuffer = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(arrayBuffer);
    for (var i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
}

const a=globalThis.FormData;

var PicGoUploader = /** @class */ (function () {
    function PicGoUploader(settings, plugin) {
        this.settings = settings;
        this.plugin = plugin;
    }
    PicGoUploader.prototype.uploadFiles = function (fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var response, files, _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = [];
                        _loop_1 = function (i) {
                            var file, buffer, arrayBuffer;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        file = fileList[i];
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                fs.readFile(file, function (err, data) {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    resolve(data);
                                                });
                                            })];
                                    case 1:
                                        buffer = _b.sent();
                                        arrayBuffer = bufferToArrayBuffer(buffer);
                                        files.push(new File([arrayBuffer], file));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < fileList.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.uploadFileByData(files)];
                    case 5:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    PicGoUploader.prototype.uploadFileByData = function (fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var form, filelistRaw, readFiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = new a();
                        filelistRaw = [];
                        readFiles = function () { return __awaiter(_this, void 0, void 0, function () {
                            var _loop_2, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_2 = function (i) {
                                            var file, uniqueSuffix, filePath, arrayBuffer;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        file = fileList[i];
                                                        form.append("list", file);
                                                        uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                                                        filePath = path__namespace.join(os__namespace.tmpdir(), "".concat(uniqueSuffix, "-").concat(file.name));
                                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                                var reader = new FileReader();
                                                                reader.onload = function () { return resolve(reader.result); };
                                                                reader.onerror = reject;
                                                                reader.readAsArrayBuffer(file);
                                                            })];
                                                    case 1:
                                                        arrayBuffer = _b.sent();
                                                        return [4 /*yield*/, fs.promises.writeFile(filePath, Buffer.from(arrayBuffer))];
                                                    case 2:
                                                        _b.sent();
                                                        filelistRaw.push(filePath);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < fileList.length)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_2(i)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, readFiles()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var files = filelistRaw.join(' ');
                                var storages;
                                if (new Set([_this.settings.Github, _this.settings.Samba, _this.settings.Qiniu]).size === 1) {
                                    storages = "-a";
                                }
                                else {
                                    storages = "-s ";
                                    var storageList = [];
                                    if (_this.settings.Qiniu) {
                                        storageList.push("qiniu");
                                    }
                                    if (_this.settings.Samba) {
                                        storageList.push("samba");
                                    }
                                    if (_this.settings.Github) {
                                        storageList.push("github");
                                    }
                                    storages += storageList.join(",");
                                }
                                var command = _this.settings.GopicPath + " upload ".concat(storages, " -p ").concat(files, " -f ") + _this.settings.PrimaryStorage;
                                child_process.exec(command, function (error, stdout, stderr) { return __awaiter(_this, void 0, void 0, function () {
                                    var filelistRaw_1, filelistRaw_1_1, filePath, e_1_1, result;
                                    var e_1, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 5, 6, 7]);
                                                filelistRaw_1 = __values(filelistRaw), filelistRaw_1_1 = filelistRaw_1.next();
                                                _b.label = 1;
                                            case 1:
                                                if (!!filelistRaw_1_1.done) return [3 /*break*/, 4];
                                                filePath = filelistRaw_1_1.value;
                                                return [4 /*yield*/, fs.promises.unlink(filePath)];
                                            case 2:
                                                _b.sent();
                                                _b.label = 3;
                                            case 3:
                                                filelistRaw_1_1 = filelistRaw_1.next();
                                                return [3 /*break*/, 1];
                                            case 4: return [3 /*break*/, 7];
                                            case 5:
                                                e_1_1 = _b.sent();
                                                e_1 = { error: e_1_1 };
                                                return [3 /*break*/, 7];
                                            case 6:
                                                try {
                                                    if (filelistRaw_1_1 && !filelistRaw_1_1.done && (_a = filelistRaw_1.return)) _a.call(filelistRaw_1);
                                                }
                                                finally { if (e_1) throw e_1.error; }
                                                return [7 /*endfinally*/];
                                            case 7:
                                                if (error) {
                                                    reject("Error: ".concat(error.message));
                                                    return [2 /*return*/];
                                                }
                                                if (stderr) {
                                                    reject("Stderr: ".concat(stderr));
                                                    return [2 /*return*/];
                                                }
                                                result = stdout.trim().split('\n');
                                                resolve(result);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    PicGoUploader.prototype.uploadFileByClipboard = function (fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uploadFileByData(fileList)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return PicGoUploader;
}());

// العربية
var ar = {
    "Samba": "تخزين samba",
    "Primary storage": "التخزين الأساسي",
    "Primary storage Desc": "استخدم عنوان التخزين الأساسي كعنوان URL للصور في المستندات",
    "Gopic path": "مسار برنامج gopic",
    "Gopic path desc": "مسار برنامج gopic",
    "Please input gopic path": "يرجى إدخال مسار برنامج gopic",
    "Active Github": "تنشيط Github",
    "Active Github desc": "تحميل متزامن إلى Github",
    "Active Qiniu": "تنشيط تخزين Qiniu",
    "Active Qiniu desc": "تحميل متزامن إلى تخزين Qiniu",
    "Active Samba": "تنشيط Samba",
    "Active Samba desc": "تحميل متزامن إلى Samba",
    "Network Domain Black List": "قائمة العناوين السوداء للشبكة",
    "Network Domain Black List Des": "قائمة العناوين السوداء للشبكة",
    "Can not find any image file": "لا يمكن العثور على أي ملف صورة",
};

// čeština
var cz = {
    "Samba": "Samba úložiště",
    "Primary storage": "Primární úložiště",
    "Primary storage Desc": "Použijte adresu primárního úložiště jako URL obrázků v dokumentech",
    "Gopic path": "Cesta k programu GoPic",
    "Gopic path desc": "Cesta k programu GoPic",
    "Please input gopic path": "Zadejte prosím cestu k programu GoPic",
    "Active Github": "Aktivovat GitHub",
    "Active Github desc": "Synchronizované nahrávání na GitHub",
    "Active Qiniu": "Aktivovat úložiště Qiniu",
    "Active Qiniu desc": "Synchronizované nahrávání na úložiště Qiniu",
    "Active Samba": "Aktivovat Samba",
    "Active Samba desc": "Synchronizované nahrávání na Samba",
    "Network Domain Black List": "Seznam zakázaných domén",
    "Network Domain Black List Des": "Seznam zakázaných domén",
    "Can not find any image file": "Nelze najít žádný obrazový soubor",
};

// Dansk
var da = {
    "Samba": "samba-lagring",
    "Primary storage": "Primær lagring",
    "Primary storage Desc": "Brug den primære lagringsadresse som billed-URL i dokumenter",
    "Gopic path": "gopic programsti",
    "Gopic path desc": "gopic programsti",
    "Please input gopic path": "Indtast venligst gopic programsti",
    "Active Github": "Aktiver Github",
    "Active Github desc": "Synkroniseret upload til Github",
    "Active Qiniu": "Aktiver Qiniu-lagring",
    "Active Qiniu desc": "Synkroniseret upload til Qiniu-lagring",
    "Active Samba": "Aktiver Samba",
    "Active Samba desc": "Synkroniseret upload til Samba",
    "Network Domain Black List": "Netværksdomæner sortliste",
    "Network Domain Black List Des": "Netværksdomæner sortliste",
    "Can not find any image file": "Kan ikke finde nogen billedfil",
};

// Deutsch
var de = {
    "Samba": "Samba-Speicher",
    "Primary storage": "Primärspeicher",
    "Primary storage Desc": "Verwenden Sie die Adresse des Primärspeichers als Bild-URL in Dokumenten",
    "Gopic path": "gopic Programmpfad",
    "Gopic path desc": "gopic Programmpfad",
    "Please input gopic path": "Bitte geben Sie den gopic Programmpfad ein",
    "Active Github": "Github aktivieren",
    "Active Github desc": "Synchronisiertes Hochladen zu Github",
    "Active Qiniu": "Qiniu-Speicher aktivieren",
    "Active Qiniu desc": "Synchronisiertes Hochladen zum Qiniu-Speicher",
    "Active Samba": "Samba aktivieren",
    "Active Samba desc": "Synchronisiertes Hochladen zu Samba",
    "Network Domain Black List": "Netzwerk-Domain-Blacklist",
    "Network Domain Black List Des": "Netzwerk-Domain-Blacklist",
    "Can not find any image file": "Kann keine Bilddatei finden",
};

// English
var en = {
    "Samba": "Samba storage",
    "Primary storage": "Primary storage",
    "Primary storage Desc": "Use the primary storage address as the image URL in documents",
    "Gopic path": "GoPic program path",
    "Gopic path desc": "GoPic program path",
    "Please input gopic path": "Please input GoPic program path",
    "Active Github": "Activate GitHub",
    "Active Github desc": "Synchronize upload to GitHub",
    "Active Qiniu": "Activate Qiniu storage",
    "Active Qiniu desc": "Synchronize upload to Qiniu storage",
    "Active Samba": "Activate Samba",
    "Active Samba desc": "Synchronize upload to Samba",
    "Network Domain Black List": "Network domain blacklist",
    "Network Domain Black List Des": "Network domain blacklist",
    "Can not find any image file": "Cannot find any image file",
};

// British English
var enGB = {
    "Samba": "Samba storage",
    "Primary storage": "Primary storage",
    "Primary storage Desc": "Use the primary storage address as the image URL in documents",
    "Gopic path": "GoPic program path",
    "Gopic path desc": "GoPic program path",
    "Please input gopic path": "Please input GoPic program path",
    "Active Github": "Activate GitHub",
    "Active Github desc": "Synchronize upload to GitHub",
    "Active Qiniu": "Activate Qiniu storage",
    "Active Qiniu desc": "Synchronize upload to Qiniu storage",
    "Active Samba": "Activate Samba",
    "Active Samba desc": "Synchronize upload to Samba",
    "Network Domain Black List": "Network domain blacklist",
    "Network Domain Black List Des": "Network domain blacklist",
    "Can not find any image file": "Cannot find any image file",
};

// Español
var es = {
    "Samba": "Almacenamiento samba",
    "Primary storage": "Almacenamiento primario",
    "Primary storage Desc": "Use la dirección del almacenamiento primario como URL de las imágenes en documentos",
    "Gopic path": "Ruta del programa gopic",
    "Gopic path desc": "Ruta del programa gopic",
    "Please input gopic path": "Por favor, introduzca la ruta del programa gopic",
    "Active Github": "Activar Github",
    "Active Github desc": "Subida sincronizada a Github",
    "Active Qiniu": "Activar almacenamiento Qiniu",
    "Active Qiniu desc": "Subida sincronizada a almacenamiento Qiniu",
    "Active Samba": "Activar Samba",
    "Active Samba desc": "Subida sincronizada a Samba",
    "Network Domain Black List": "Lista negra de dominios de red",
    "Network Domain Black List Des": "Lista negra de dominios de red",
    "Can not find any image file": "No se puede encontrar ningún archivo de imagen",
};

// français
var fr = {
    "Samba": "Stockage samba",
    "Primary storage": "Stockage principal",
    "Primary storage Desc": "Utilisez l'adresse du stockage principal comme URL des images dans les documents",
    "Gopic path": "Chemin du programme gopic",
    "Gopic path desc": "Chemin du programme gopic",
    "Please input gopic path": "Veuillez entrer le chemin du programme gopic",
    "Active Github": "Activer Github",
    "Active Github desc": "Téléchargement synchronisé vers Github",
    "Active Qiniu": "Activer le stockage Qiniu",
    "Active Qiniu desc": "Téléchargement synchronisé vers le stockage Qiniu",
    "Active Samba": "Activer Samba",
    "Active Samba desc": "Téléchargement synchronisé vers Samba",
    "Network Domain Black List": "Liste noire des domaines réseau",
    "Network Domain Black List Des": "Liste noire des domaines réseau",
    "Can not find any image file": "Impossible de trouver un fichier image",
};

// हिन्दी
var hi = {
    "Samba": "samba भंडारण",
    "Primary storage": "प्राथमिक भंडारण",
    "Primary storage Desc": "दस्तावेज़ों में चित्र URL के रूप में प्राथमिक भंडारण का पता उपयोग करें",
    "Gopic path": "gopic प्रोग्राम पथ",
    "Gopic path desc": "gopic प्रोग्राम पथ",
    "Please input gopic path": "कृपया gopic प्रोग्राम पथ दर्ज करें",
    "Active Github": "Github सक्रिय करें",
    "Active Github desc": "Github पर समकालिक अपलोड",
    "Active Qiniu": "Qiniu भंडारण सक्रिय करें",
    "Active Qiniu desc": "Qiniu भंडारण पर समकालिक अपलोड",
    "Active Samba": "Samba सक्रिय करें",
    "Active Samba desc": "Samba पर समकालिक अपलोड",
    "Network Domain Black List": "नेटवर्क डोमेन ब्लैकलिस्ट",
    "Network Domain Black List Des": "नेटवर्क डोमेन ब्लैकलिस्ट",
    "Can not find any image file": "कोई चित्र फ़ाइल नहीं मिल सकी",
};

// Bahasa Indonesia
var id = {
    "Samba": "Penyimpanan samba",
    "Primary storage": "Penyimpanan Utama",
    "Primary storage Desc": "Gunakan alamat penyimpanan utama sebagai URL gambar di dokumen",
    "Gopic path": "Jalur program gopic",
    "Gopic path desc": "Jalur program gopic",
    "Please input gopic path": "Harap masukkan jalur program gopic",
    "Active Github": "Aktifkan Github",
    "Active Github desc": "Unggahan sinkron ke Github",
    "Active Qiniu": "Aktifkan Penyimpanan Qiniu",
    "Active Qiniu desc": "Unggahan sinkron ke Penyimpanan Qiniu",
    "Active Samba": "Aktifkan Samba",
    "Active Samba desc": "Unggahan sinkron ke Samba",
    "Network Domain Black List": "Daftar Hitam Domain Jaringan",
    "Network Domain Black List Des": "Daftar Hitam Domain Jaringan",
    "Can not find any image file": "Tidak dapat menemukan file gambar apa pun",
};

// Italiano
var it = {
    "Samba": "Archiviazione samba",
    "Primary storage": "Archiviazione primaria",
    "Primary storage Desc": "Utilizza l'indirizzo dell'archiviazione primaria come URL dell'immagine nei documenti",
    "Gopic path": "Percorso del programma gopic",
    "Gopic path desc": "Percorso del programma gopic",
    "Please input gopic path": "Si prega di inserire il percorso del programma gopic",
    "Active Github": "Attiva Github",
    "Active Github desc": "Caricamento sincronizzato su Github",
    "Active Qiniu": "Attiva archiviazione Qiniu",
    "Active Qiniu desc": "Caricamento sincronizzato su archiviazione Qiniu",
    "Active Samba": "Attiva Samba",
    "Active Samba desc": "Caricamento sincronizzato su Samba",
    "Network Domain Black List": "Lista nera dei domini di rete",
    "Network Domain Black List Des": "Lista nera dei domini di rete",
    "Can not find any image file": "Impossibile trovare alcun file immagine",
};

// 日本語
var ja = {
    "Samba": "samba ストレージ",
    "Primary storage": "主ストレージ",
    "Primary storage Desc": "ドキュメント内の画像URLとして主ストレージのアドレスを使用",
    "Gopic path": "gopic プログラムパス",
    "Gopic path desc": "gopic プログラムパス",
    "Please input gopic path": "gopic プログラムパスを入力してください",
    "Active Github": "Github を有効化",
    "Active Github desc": "Github への同期アップロード",
    "Active Qiniu": "Qiniu ストレージを有効化",
    "Active Qiniu desc": "Qiniu ストレージへの同期アップロード",
    "Active Samba": "Samba を有効化",
    "Active Samba desc": "Samba への同期アップロード",
    "Network Domain Black List": "ネットワークドメインのブラックリスト",
    "Network Domain Black List Des": "ネットワークドメインのブラックリスト",
    "Can not find any image file": "画像ファイルが見つかりません",
};

// 한국어
var ko = {
    "Samba": "samba 저장소",
    "Primary storage": "기본 저장소",
    "Primary storage Desc": "문서 내 이미지 URL로 기본 저장소 주소를 사용",
    "Gopic path": "gopic 프로그램 경로",
    "Gopic path desc": "gopic 프로그램 경로",
    "Please input gopic path": "gopic 프로그램 경로를 입력하십시오",
    "Active Github": "Github 활성화",
    "Active Github desc": "Github에 동기화된 업로드",
    "Active Qiniu": "Qiniu 저장소 활성화",
    "Active Qiniu desc": "Qiniu 저장소에 동기화된 업로드",
    "Active Samba": "Samba 활성화",
    "Active Samba desc": "Samba에 동기화된 업로드",
    "Network Domain Black List": "네트워크 도메인 블랙리스트",
    "Network Domain Black List Des": "네트워크 도메인 블랙리스트",
    "Can not find any image file": "이미지 파일을 찾을 수 없습니다",
};

// Nederlands
var nl = {
    "Samba": "samba-opslag",
    "Primary storage": "Primaire opslag",
    "Primary storage Desc": "Gebruik het adres van de primaire opslag als de afbeeldings-URL in documenten",
    "Gopic path": "gopic programmepad",
    "Gopic path desc": "gopic programmepad",
    "Please input gopic path": "Voer het gopic programmepad in",
    "Active Github": "Github activeren",
    "Active Github desc": "Gesynchroniseerde upload naar Github",
    "Active Qiniu": "Qiniu-opslag activeren",
    "Active Qiniu desc": "Gesynchroniseerde upload naar Qiniu-opslag",
    "Active Samba": "Samba activeren",
    "Active Samba desc": "Gesynchroniseerde upload naar Samba",
    "Network Domain Black List": "Zwarte lijst met netwerkomgevingen",
    "Network Domain Black List Des": "Zwarte lijst met netwerkomgevingen",
    "Can not find any image file": "Kan geen enkel afbeeldingsbestand vinden",
};

// Norsk
var no = {
    "Samba": "samba-lagring",
    "Primary storage": "Primærlagring",
    "Primary storage Desc": "Bruk primærlagringens adresse som bilde-URL i dokumenter",
    "Gopic path": "gopic programsti",
    "Gopic path desc": "gopic programsti",
    "Please input gopic path": "Vennligst skriv inn gopic programsti",
    "Active Github": "Aktiver Github",
    "Active Github desc": "Synkronisert opplasting til Github",
    "Active Qiniu": "Aktiver Qiniu-lagring",
    "Active Qiniu desc": "Synkronisert opplasting til Qiniu-lagring",
    "Active Samba": "Aktiver Samba",
    "Active Samba desc": "Synkronisert opplasting til Samba",
    "Network Domain Black List": "Nettverksdomeners svarteliste",
    "Network Domain Black List Des": "Nettverksdomeners svarteliste",
    "Can not find any image file": "Kan ikke finne noen bildefil",
};

// język polski
var pl = {
    "Samba": "Przechowywanie samba",
    "Primary storage": "Główna pamięć",
    "Primary storage Desc": "Użyj adresu głównej pamięci jako URL obrazu w dokumentach",
    "Gopic path": "Ścieżka programu gopic",
    "Gopic path desc": "Ścieżka programu gopic",
    "Please input gopic path": "Proszę wprowadzić ścieżkę programu gopic",
    "Active Github": "Aktywuj Github",
    "Active Github desc": "Synchronizowane przesyłanie do Github",
    "Active Qiniu": "Aktywuj przechowywanie Qiniu",
    "Active Qiniu desc": "Synchronizowane przesyłanie do przechowywania Qiniu",
    "Active Samba": "Aktywuj Samba",
    "Active Samba desc": "Synchronizowane przesyłanie do Samba",
    "Network Domain Black List": "Czarna lista domen sieciowych",
    "Network Domain Black List Des": "Czarna lista domen sieciowych",
    "Can not find any image file": "Nie można znaleźć żadnego pliku obrazu",
};

// Português
var pt = {
    "Samba": "Armazenamento samba",
    "Primary storage": "Armazenamento primário",
    "Primary storage Desc": "Use o endereço do armazenamento primário como URL da imagem nos documentos",
    "Gopic path": "Caminho do programa GoPic",
    "Gopic path desc": "Caminho do programa GoPic",
    "Please input gopic path": "Por favor, insira o caminho do programa GoPic",
    "Active Github": "Ativar GitHub",
    "Active Github desc": "Upload sincronizado para o GitHub",
    "Active Qiniu": "Ativar armazenamento Qiniu",
    "Active Qiniu desc": "Upload sincronizado para armazenamento Qiniu",
    "Active Samba": "Ativar Samba",
    "Active Samba desc": "Upload sincronizado para Samba",
    "Network Domain Black List": "Lista negra de domínios de rede",
    "Network Domain Black List Des": "Lista negra de domínios de rede",
    "Can not find any image file": "Não é possível encontrar nenhum arquivo de imagem",
};

// Português do Brasil
// Brazilian Portuguese
var ptBR = {
    "Samba": "Armazenamento samba",
    "Primary storage": "Armazenamento primário",
    "Primary storage Desc": "Use o endereço do armazenamento primário como URL da imagem nos documentos",
    "Gopic path": "Caminho do programa GoPic",
    "Gopic path desc": "Caminho do programa GoPic",
    "Please input gopic path": "Por favor, insira o caminho do programa GoPic",
    "Active Github": "Ativar GitHub",
    "Active Github desc": "Upload sincronizado para o GitHub",
    "Active Qiniu": "Ativar armazenamento Qiniu",
    "Active Qiniu desc": "Upload sincronizado para armazenamento Qiniu",
    "Active Samba": "Ativar Samba",
    "Active Samba desc": "Upload sincronizado para Samba",
    "Network Domain Black List": "Lista negra de domínios de rede",
    "Network Domain Black List Des": "Lista negra de domínios de rede",
    "Can not find any image file": "Não é possível encontrar nenhum arquivo de imagem",
};

// Română
var ro = {
    "Samba": "Stocare samba",
    "Primary storage": "Stocare principală",
    "Primary storage Desc": "Folosiți adresa stocării principale ca URL al imaginii în documente",
    "Gopic path": "Calea programului gopic",
    "Gopic path desc": "Calea programului gopic",
    "Please input gopic path": "Vă rugăm să introduceți calea programului gopic",
    "Active Github": "Activare Github",
    "Active Github desc": "Încărcare sincronizată pe Github",
    "Active Qiniu": "Activare stocare Qiniu",
    "Active Qiniu desc": "Încărcare sincronizată pe stocare Qiniu",
    "Active Samba": "Activare Samba",
    "Active Samba desc": "Încărcare sincronizată pe Samba",
    "Network Domain Black List": "Listă neagră de domenii de rețea",
    "Network Domain Black List Des": "Listă neagră de domenii de rețea",
    "Can not find any image file": "Nu se poate găsi niciun fișier de imagine",
};

// русский
var ru = {
    "Samba": "Хранение samba",
    "Primary storage": "Основное хранилище",
    "Primary storage Desc": "Используйте адрес основного хранилища в качестве URL изображения в документах",
    "Gopic path": "Путь программы gopic",
    "Gopic path desc": "Путь программы gopic",
    "Please input gopic path": "Пожалуйста, введите путь программы gopic",
    "Active Github": "Активировать Github",
    "Active Github desc": "Синхронизированная загрузка на Github",
    "Active Qiniu": "Активировать хранилище Qiniu",
    "Active Qiniu desc": "Синхронизированная загрузка на хранилище Qiniu",
    "Active Samba": "Активировать Samba",
    "Active Samba desc": "Синхронизированная загрузка на Samba",
    "Network Domain Black List": "Черный список доменов сети",
    "Network Domain Black List Des": "Черный список доменов сети",
    "Can not find any image file": "Не удается найти файл изображения",
};

// Türkçe
var tr = {
    "Samba": "samba depolama",
    "Primary storage": "Birincil Depolama",
    "Primary storage Desc": "Belgelerdeki resim URL'si olarak birincil depolama adresini kullanın",
    "Gopic path": "gopic program yolu",
    "Gopic path desc": "gopic program yolu",
    "Please input gopic path": "Lütfen gopic program yolunu girin",
    "Active Github": "Github'ı Aktifleştir",
    "Active Github desc": "Github'a senkronize yükleme",
    "Active Qiniu": "Qiniu Depolamayı Aktifleştir",
    "Active Qiniu desc": "Qiniu Depolamaya senkronize yükleme",
    "Active Samba": "Samba'yı Aktifleştir",
    "Active Samba desc": "Samba'ya senkronize yükleme",
    "Network Domain Black List": "Ağ Alan Adı Kara Listesi",
    "Network Domain Black List Des": "Ağ Alan Adı Kara Listesi",
    "Can not find any image file": "Herhangi bir resim dosyası bulunamadı",
};

// 简体中文
var zhCN = {
    "Samba": "samba存储",
    "Primary storage": "主存储",
    "Primary storage Desc": "使用主存储的地址作为文档中的图片url",
    "Gopic path": "gopic 程序路径",
    "Gopic path desc": "gopic程序路径",
    "Please input gopic path": "请填写gopic程序路径",
    "Active Github": "激活github",
    "Active Github desc": "同步上传到github",
    "Active Qiniu": "激活七牛云存储",
    "Active Qiniu desc": "同步上传到七牛云存储",
    "Active Samba": "激活samba",
    "Active Samba desc": "同步上传到samba",
    "Network Domain Black List": "网络地址黑名单",
    "Network Domain Black List Des": "网络地址黑名单",
    "Can not find any image file": "找不到任何图像文件",
};

// 繁體中文
var zhTW = {
    "Samba": "samba存儲",
    "Primary storage": "主存儲",
    "Primary storage Desc": "使用主存儲的地址作為文件中的圖片URL",
    "Gopic path": "gopic 程序路徑",
    "Gopic path desc": "gopic程序路徑",
    "Please input gopic path": "請填寫gopic程序路徑",
    "Active Github": "激活github",
    "Active Github desc": "同步上傳到github",
    "Active Qiniu": "激活七牛雲存儲",
    "Active Qiniu desc": "同步上傳到七牛雲存儲",
    "Active Samba": "激活samba",
    "Active Samba desc": "同步上傳到samba",
    "Network Domain Black List": "網絡地址黑名單",
    "Network Domain Black List Des": "網絡地址黑名單",
    "Can not find any image file": "找不到任何圖像文件",
};

var localeMap = {
    ar: ar,
    cs: cz,
    da: da,
    de: de,
    en: en,
    'en-gb': enGB,
    es: es,
    fr: fr,
    hi: hi,
    id: id,
    it: it,
    ja: ja,
    ko: ko,
    nl: nl,
    nn: no,
    pl: pl,
    pt: pt,
    'pt-br': ptBR,
    ro: ro,
    ru: ru,
    tr: tr,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
};
var locale = localeMap[obsidian.moment.locale()];
function t(str) {
    return (locale && locale[str]) || en[str];
}

var DEFAULT_SETTINGS = {
    PrimaryStorage: "github",
    GopicPath: "gopic",
    Github: false,
    Qiniu: false,
    Samba: false,
    NewWorkBlackDomains: "",
};
var SettingTab = /** @class */ (function (_super) {
    __extends(SettingTab, _super);
    function SettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName(t("Primary storage"))
            .setDesc(t("Primary storage Desc"))
            .addDropdown(function (cb) {
            return cb
                .addOption("github", "Github")
                .addOption("qiniu", "Qiniu")
                .addOption("samba", t("Samba"))
                .setValue(_this.plugin.settings.PrimaryStorage)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.PrimaryStorage = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Gopic path"))
            .setDesc(t("Gopic path desc"))
            .addText(function (text) {
            return text
                .setPlaceholder(t("Please input gopic path"))
                .setValue(_this.plugin.settings.GopicPath)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.GopicPath = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Active Github"))
            .setDesc(t("Active Github desc"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.Github)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.Github = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Active Qiniu"))
            .setDesc(t("Active Qiniu desc"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.Qiniu)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.Qiniu = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Active Samba"))
            .setDesc(t("Active Samba desc"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.Samba)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.Samba = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Network Domain Black List"))
            .setDesc(t("Network Domain Black List Des"))
            .addTextArea(function (textArea) {
            return textArea
                .setValue(_this.plugin.settings.NewWorkBlackDomains)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.NewWorkBlackDomains = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

var imageAutoUploadPlugin = /** @class */ (function (_super) {
    __extends(imageAutoUploadPlugin, _super);
    function imageAutoUploadPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    imageAutoUploadPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.onunload = function () { };
    imageAutoUploadPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.helper = new Cache(this.app);
                        this.goPicUploader = new PicGoUploader(this.settings, this);
                        obsidian.addIcon("cute-cat", "<svg x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\" class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M32 0C18.745 0 8 10.745 8 24c0 8.836 7.164 16 16 16h4v8c0 2.209 1.791 4 4 4s4-1.791 4-4v-8h4c8.836 0 16-7.164 16-16C56 10.745 45.255 0 32 0zM21.657 30.343a1 1 0 1 1 1.415-1.415 7.967 7.967 0 0 0 11.314 0 1 1 0 0 1 1.415 1.415 9.97 9.97 0 0 1-14.142 0zM40 24c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm-16 0c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z\" fill=\"#8a8a8a\"/>\n  </svg>");
                        this.addSettingTab(new SettingTab(this.app, this));
                        this.setupPasteHandler();
                        this.registerFileMenu();
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.registerFileMenu = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("file-menu", function (menu, file, source) {
            if (source === "canvas-menu")
                return false;
            if (!isAssetTypeAnImage(file.path))
                return false;
            if (!(file instanceof obsidian.TFile))
                return false;
            menu.addItem(function (item) {
                item
                    .setTitle("Upload")
                    .setIcon("upload")
                    .onClick(function () {
                    _this.fileMenuUpload(file);
                });
            });
        }));
    };
    imageAutoUploadPlugin.prototype.fileMenuUpload = function (file) {
        var e_1, _a;
        var _this = this;
        var content = this.helper.getValue();
        if (this.app.vault.adapter instanceof obsidian.FileSystemAdapter) {
            var basePath = this.app.vault.adapter.getBasePath();
            var imageList_1 = [];
            var fileArray = this.helper.getAllFiles();
            try {
                for (var fileArray_1 = __values(fileArray), fileArray_1_1 = fileArray_1.next(); !fileArray_1_1.done; fileArray_1_1 = fileArray_1.next()) {
                    var match = fileArray_1_1.value;
                    var imageName = match.name;
                    var encodedUri = match.path;
                    var fileName = path.basename(decodeURI(encodedUri));
                    if (file && file.name === fileName) {
                        var abstractImageFile = path.join(basePath, file.path);
                        if (isAssetTypeAnImage(abstractImageFile)) {
                            imageList_1.push({
                                path: abstractImageFile,
                                name: imageName,
                                source: match.source,
                            });
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fileArray_1_1 && !fileArray_1_1.done && (_a = fileArray_1.return)) _a.call(fileArray_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (imageList_1.length === 0) {
                new obsidian.Notice(t("Can not find any image file"));
                return;
            }
            this.goPicUploader.uploadFiles(imageList_1.map(function (item) { return item.path; })).then(function (res) {
                imageList_1.map(function (item) {
                    var uploadImage = res.shift();
                    var name = _this.handleName(item.name);
                    content = content.replaceAll(item.source, "![".concat(name, "](").concat(uploadImage, ")"));
                });
                _this.helper.setValue(content);
            });
        }
        else {
            new obsidian.Notice("The adapter is not a FileSystemAdapter");
        }
    };
    imageAutoUploadPlugin.prototype.setupPasteHandler = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("editor-paste", function (evt, editor) {
            var clipboardValue = evt.clipboardData.getData("text/plain");
            var imageList = _this.helper
                .getImageLink(clipboardValue)
                .filter(function (image) { return image.path.startsWith("http"); })
                .filter(function (image) {
                return !_this.helper.hasBlackDomain(image.path, _this.settings.NewWorkBlackDomains);
            });
            if (imageList.length !== 0) {
                _this.goPicUploader
                    .uploadFiles(imageList.map(function (item) { return item.path; }))
                    .then(function (res) {
                    var value = _this.helper.getValue();
                    imageList.map(function (item) {
                        var url = res[0];
                        var name = _this.handleName(item.name);
                        value = value.replaceAll(item.source, "![".concat(name, "](").concat(url, ")"));
                    });
                    _this.helper.setValue(value);
                });
            }
            if (_this.canUpload(evt.clipboardData)) {
                _this.uploadFileAndEmbedImgurImage(editor, function () { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.goPicUploader.uploadFileByClipboard(evt.clipboardData.files)];
                            case 1:
                                res = _a.sent();
                                return [2 /*return*/, res[0]];
                        }
                    });
                }); }, evt.clipboardData).catch();
                evt.preventDefault();
            }
        }));
        this.registerEvent(this.app.workspace.on("editor-drop", function (evt, editor) { return __awaiter(_this, void 0, void 0, function () {
            var files, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = evt.dataTransfer.files;
                        if (!(files.length !== 0 && files[0].type.startsWith("image"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.goPicUploader.uploadFileByData(files)];
                    case 1:
                        data = _a.sent();
                        data.map(function (value) {
                            var pasteId = (Math.random() + 1).toString(36).substr(2, 5);
                            _this.insertTemporaryText(editor, pasteId);
                            _this.embedMarkDownImage(editor, pasteId, value, files[0].name);
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }));
    };
    imageAutoUploadPlugin.prototype.canUpload = function (clipboardData) {
        var files = clipboardData.files;
        clipboardData.getData("text");
        return files.length !== 0 && files[0].type.startsWith("image");
    };
    imageAutoUploadPlugin.prototype.uploadFileAndEmbedImgurImage = function (editor, callback, clipboardData) {
        return __awaiter(this, void 0, void 0, function () {
            var pasteId, name, url, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pasteId = (Math.random() + 1).toString(36).substr(2, 5);
                        this.insertTemporaryText(editor, pasteId);
                        name = clipboardData.files[0].name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, callback(editor, pasteId)];
                    case 2:
                        url = _a.sent();
                        this.embedMarkDownImage(editor, pasteId, url, name);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.handleFailedUpload(editor, pasteId, e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.insertTemporaryText = function (editor, pasteId) {
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        editor.replaceSelection(progressText + "\n");
    };
    imageAutoUploadPlugin.progressTextFor = function (id) {
        return "![Uploading file...".concat(id, "]()");
    };
    imageAutoUploadPlugin.prototype.embedMarkDownImage = function (editor, pasteId, imageUrl, name) {
        if (name === void 0) { name = ""; }
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        name = this.handleName(name);
        var markDownImage = "![".concat(name, "](").concat(imageUrl, ")");
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, markDownImage);
    };
    imageAutoUploadPlugin.prototype.handleFailedUpload = function (editor, pasteId, reason) {
        new obsidian.Notice(reason);
        console.error("Failed request: ", reason);
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, "⚠️upload failed, check dev console");
    };
    imageAutoUploadPlugin.prototype.handleName = function (name) {
        return "".concat(name);
    };
    imageAutoUploadPlugin.replaceFirstOccurrence = function (editor, target, replacement) {
        var lines = editor.getValue().split("\n");
        for (var i = 0; i < lines.length; i++) {
            var ch = lines[i].indexOf(target);
            if (ch != -1) {
                var from = { line: i, ch: ch };
                var to = { line: i, ch: ch + target.length };
                editor.replaceRange(replacement, from, to);
                break;
            }
        }
    };
    return imageAutoUploadPlugin;
}(obsidian.Plugin));

module.exports = imageAutoUploadPlugin;


/* nosourcemap */