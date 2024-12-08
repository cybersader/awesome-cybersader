'use strict';

var obsidian = require('obsidian');

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
/* global Reflect, Promise */

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
        while (_) try {
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

var DangerzoneWritingPluginSettings = /** @class */ (function () {
    function DangerzoneWritingPluginSettings() {
        this.countdownSeconds = "60";
        this.secondsUntilDeletion = "5";
        this.succesfullSessionCount = "0";
        this.customEditorFontSize = "";
        this.customEditorBackgroundColor = "";
    }
    DangerzoneWritingPluginSettings.prototype.getCountdownSecondsInteger = function () {
        return parseInt(this.countdownSeconds);
    };
    DangerzoneWritingPluginSettings.prototype.getSecondsUntilDeletionInteger = function () {
        return parseInt(this.secondsUntilDeletion);
    };
    DangerzoneWritingPluginSettings.prototype.getSuccesfullSessionCountInteger = function () {
        return parseInt(this.succesfullSessionCount);
    };
    DangerzoneWritingPluginSettings.prototype.getCustomEditorFontSizeCssString = function () {
        if (this.customEditorFontSize != "") {
            return "font-size: ".concat(this.customEditorFontSize, "pt");
        }
        else {
            return "";
        }
    };
    DangerzoneWritingPluginSettings.prototype.getCustomEditorBackgroundColorCssString = function () {
        if (this.customEditorBackgroundColor != "") {
            return "background-color: ".concat(this.customEditorBackgroundColor);
        }
        else {
            return "";
        }
    };
    return DangerzoneWritingPluginSettings;
}());

var ExtractHighlightsPluginSettingsTab = /** @class */ (function (_super) {
    __extends(ExtractHighlightsPluginSettingsTab, _super);
    function ExtractHighlightsPluginSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    ExtractHighlightsPluginSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Dangerzone Writing Plugin" });
        containerEl.createEl("h3", { text: "Your Writing Stats" });
        containerEl.createEl("p", { text: "Successfully completed sessions: " + this.plugin.settings.succesfullSessionCount });
        containerEl.createEl("h3", { text: "Writing Session Timing Settings" });
        new obsidian.Setting(containerEl)
            .setName("Countdown Seconds")
            .setDesc("How many seconds you want your Dangerzone Writing session to last")
            .addText(function (text) {
            return text
                .setPlaceholder("100")
                .setValue(_this.plugin.settings.countdownSeconds)
                .onChange(function (value) {
                _this.plugin.settings.countdownSeconds = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Dangerzone Seconds")
            .setDesc("How many seconds until your text is deleted")
            .addText(function (text) {
            return text
                .setPlaceholder("5")
                .setValue(_this.plugin.settings.secondsUntilDeletion)
                .onChange(function (value) {
                _this.plugin.settings.secondsUntilDeletion = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        containerEl.createEl("h3", { text: "Immersive Writing Settings" });
        new obsidian.Setting(containerEl)
            .setName("Session Font-Size")
            .setDesc("Increases editor font-size temporarily for a more immersive experience. Leave empty to keep default size")
            .addText(function (text) {
            return text
                .setPlaceholder("32")
                .setValue(_this.plugin.settings.customEditorFontSize)
                .onChange(function (value) {
                _this.plugin.settings.customEditorFontSize = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Session Background Color")
            .setDesc("Changes background color of editor temporarily for a more immersive experience. Leave empty to omit")
            .addText(function (text) {
            return text
                .setPlaceholder("black, maroon, #CCC")
                .setValue(_this.plugin.settings.customEditorBackgroundColor)
                .onChange(function (value) {
                _this.plugin.settings.customEditorBackgroundColor = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        containerEl.createEl("hr");
        containerEl.createEl("h3", { text: "Thank You" });
        containerEl.createEl("p", { text: "Thank you ryanjamurphy, roberthaisfield, macedotavares, afokapu, tristanbailey, lukeleppan, AutonomyGaps and hicsuntdragons for your feedback and support." });
        containerEl.createEl("a", {
            text: "Visit the forum for feedback",
            href: "https://forum.obsidian.md/t/dangerzone-flowstate-like-plugin-prototype/8776/"
        });
        containerEl.createEl("h3", { text: "Disclaimer" });
        containerEl.createEl("i", { text: "This plugin is provided as-is with NO warranty that it'll work exactly as you expect. It's made to DELETE text in a note after X seconds of inactivity when you're start a session. Please do not hold me responsible if it does, in fact, DELETE your text. That's what it does. On the other hand there is always the possibility of a bug that makes this plugin behave unexpectedly." });
    };
    return ExtractHighlightsPluginSettingsTab;
}(obsidian.PluginSettingTab));

var CountdownTimer = /** @class */ (function () {
    function CountdownTimer(counter, statusBar, activeLeaf, secondsUntilDeletion, plugin) {
        var _this = this;
        this.counter = counter;
        this.handleKeyDown = function () {
            if (!_this.isFinished()) {
                _this.resetSecondUntilDeletion();
            }
        };
        this.plugin = plugin;
        this.editor = activeLeaf.view.editor;
        this.secondsUntilDeletion = secondsUntilDeletion;
        this.secondsRemaining = secondsUntilDeletion;
        this.activeLeaf = activeLeaf;
        this.counter = counter;
        this.originalCountdownSeconds = counter;
        var wrapper = activeLeaf.view.containerEl;
        var keyDownCb = this.handleKeyDown.bind(this);
        wrapper.addEventListener("keydown", keyDownCb);
        wrapper.setAttribute("id", "active-dangerzone-editor");
        this.intervalId = setInterval(function () {
            _this.counter = _this.counter - 1;
            _this.secondsRemaining = _this.secondsRemaining - 1;
            if (_this.secondsRemaining < _this.secondsUntilDeletion && _this.editor.getValue().length > 0) {
                if (_this.secondsRemaining <= 5) {
                    var opacity = _this.getOpacityForSecondsRemaining(_this.secondsRemaining, _this.secondsUntilDeletion);
                    wrapper.setAttribute("style", "opacity:" + opacity + "%");
                }
                statusBar.setText("".concat(_this.secondsRemaining));
                statusBar.setAttr('style', 'color: red;');
            }
            else {
                wrapper.setAttribute("style", "opacity: 100%");
                statusBar.setText("".concat(_this.counter, " seconds left"));
                statusBar.setAttr('style', 'color: #999;');
            }
            if (_this.secondsRemaining <= 0) {
                _this.editor.setValue('');
                _this.secondsRemaining = _this.secondsUntilDeletion + 1;
            }
            if (_this.counter === 0) {
                statusBar.setText("");
                new obsidian.Notice("Dangerzone session finished!");
                wrapper.setAttribute("style", "opacity: 100%");
                _this.plugin.removeStyle();
                // Save progress if there's something written
                if (_this.editor.getValue().length > 0) {
                    var currentSettings = _this.plugin.settings;
                    currentSettings.succesfullSessionCount = (currentSettings.getSuccesfullSessionCountInteger() + 1).toString();
                    _this.plugin.saveData(currentSettings);
                }
                clearInterval(_this.intervalId);
                wrapper.removeEventListener("keydown", keyDownCb);
            }
        }, 1000);
    }
    CountdownTimer.prototype.getOpacityForSecondsRemaining = function (secondsRemaining, secondsUntilDeletion) {
        // 3 / 5
        return secondsRemaining / secondsUntilDeletion * 100;
    };
    CountdownTimer.prototype.resetCountdown = function () {
        this.counter = this.originalCountdownSeconds;
    };
    CountdownTimer.prototype.resetSecondUntilDeletion = function () {
        // important: add +1 to this.secondsUntilDeletion to account for at least one key-stroke
        this.secondsRemaining = this.secondsUntilDeletion + 1;
    };
    CountdownTimer.prototype.isFinished = function () {
        return this.counter <= 0;
    };
    return CountdownTimer;
}());

var svgPath = '<path d="M49.5122 90C29.3926 89.7355 13.1468 73.5337 12.8816 53.4685C13.1468 33.4032 29.3926 17.2014 49.5122 16.9369C69.6319 17.2014 85.8776 33.4032 86.1428 53.4685C85.8776 73.5337 69.6319 89.7355 49.5122 90ZM49.5122 25.0551C33.8635 25.2605 21.2278 37.8621 21.0217 53.4685C21.2278 69.0749 33.8635 81.6764 49.5122 81.8819C65.1609 81.6764 77.7967 69.0749 78.0027 53.4685C77.7967 37.8621 65.1609 25.2605 49.5122 25.0551ZM53.5823 73.7638H45.4421V57.5275H29.1619V49.4094H45.4421V33.1732H53.5823V49.4094H69.8625V57.5275H53.5823V73.7638ZM83.2612 27.9289L71.0144 15.7517L76.7491 10L89 22.1772L83.2612 27.9248V27.9289ZM15.7673 27.9289L10 22.1772L22.1736 10L27.9327 15.7476L15.7673 27.9248V27.9289Z" fill="#646464"/>';
obsidian.addIcon('watch', svgPath);
var DangerzoneWritingPlugin = /** @class */ (function (_super) {
    __extends(DangerzoneWritingPlugin, _super);
    function DangerzoneWritingPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DangerzoneWritingPlugin.prototype.onload = function () {
        var _this = this;
        this.loadSettings();
        this.addSettingTab(new ExtractHighlightsPluginSettingsTab(this.app, this));
        this.statusBar = this.addStatusBarItem();
        this.addRibbonIcon('watch', 'Dangerzone Writing', function () {
            _this.startOrContinueTimer();
        });
        this.addCommand({
            id: "dangerzone-session-start",
            name: "Shortcut for starting a Dangerzone Writing session",
            callback: function () { return _this.startOrContinueTimer(); },
            hotkeys: [
                {
                    modifiers: ["Alt", "Shift"],
                    key: "⁄",
                },
            ],
        });
    };
    DangerzoneWritingPlugin.prototype.startOrContinueTimer = function () {
        this.setCustomStyle();
        if (this.countdown && !this.countdown.isFinished()) {
            this.countdown.resetCountdown();
        }
        else {
            this.startTimer();
        }
    };
    DangerzoneWritingPlugin.prototype.onunload = function () {
        this.removeStyle();
        clearInterval(this.countdown.intervalId);
    };
    DangerzoneWritingPlugin.prototype.loadSettings = function () {
        var _this = this;
        this.settings = new DangerzoneWritingPluginSettings();
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var loadedSettings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _a.sent();
                        if (loadedSettings) {
                            console.log("Found existing settings file for Dangerzone Writing");
                            this.settings.countdownSeconds = loadedSettings.countdownSeconds;
                            this.settings.secondsUntilDeletion = loadedSettings.secondsUntilDeletion;
                            this.settings.succesfullSessionCount = loadedSettings.succesfullSessionCount;
                            this.settings.customEditorFontSize = loadedSettings.customEditorFontSize;
                            this.settings.customEditorBackgroundColor = loadedSettings.customEditorBackgroundColor;
                        }
                        else {
                            console.log("No settings file found, creating for Dangerzone Writing");
                            this.saveData(this.settings);
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
    };
    DangerzoneWritingPlugin.prototype.startTimer = function () {
        var activeLeaf = this.app.workspace.getLeaf();
        var mdView = activeLeaf.view;
        if (mdView && mdView.getViewType() === "markdown" && mdView.getMode && mdView.getMode() === "source") {
            if (mdView.editor) {
                this.countdown = new CountdownTimer(this.settings.getCountdownSecondsInteger(), this.statusBar, activeLeaf, this.settings.getSecondsUntilDeletionInteger(), this);
                new obsidian.Notice("Dangerzone Writing session started!");
            }
            else {
                new obsidian.Notice("No editor active");
            }
        }
        else {
            new obsidian.Notice("No file open.");
        }
    };
    DangerzoneWritingPlugin.prototype.setCustomStyle = function () {
        var css = document.createElement('style');
        css.id = 'dangerzone-writing-style';
        var customEditorFontSizeCssString = this.settings.getCustomEditorFontSizeCssString();
        var customEditorBackgroundColor = this.settings.getCustomEditorBackgroundColorCssString();
        css.innerText = "\n            #active-dangerzone-editor { \n                ".concat(customEditorFontSizeCssString, ";\n                ").concat(customEditorBackgroundColor, ";             \n            }");
        document.getElementsByTagName("head")[0].appendChild(css);
        this.updateStyle();
    };
    DangerzoneWritingPlugin.prototype.updateStyle = function () {
        this.app.workspace.trigger('css-change');
    };
    DangerzoneWritingPlugin.prototype.removeStyle = function () {
        document.getElementById('dangerzone-writing-style').remove();
        this.app.workspace.trigger('css-change');
    };
    return DangerzoneWritingPlugin;
}(obsidian.Plugin));

module.exports = DangerzoneWritingPlugin;


/* nosourcemap */