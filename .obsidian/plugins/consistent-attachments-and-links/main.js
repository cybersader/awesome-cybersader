'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_SETTINGS = {
    moveAttachmentsWithNote: true,
    deleteAttachmentsWithNote: true,
    updateLinks: true,
    deleteEmptyFolders: true,
    deleteExistFilesWhenMoveNote: true,
    changeNoteBacklinksAlt: false,
    ignoreFolders: [".git/", ".obsidian/"],
    ignoreFiles: ["consistency\\-report\\.md"],
    ignoreFilesRegex: [/consistency\-report\.md/],
    attachmentsSubfolder: "",
    consistencyReportFile: "consistency-report.md",
    useBuiltInObsidianLinkCaching: false,
};
class SettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Consistent attachments and links - Settings' });
        new obsidian.Setting(containerEl)
            .setName('Move Attachments with Note')
            .setDesc('Automatically move attachments when a note is relocated. This includes attachments located in the same folder or any of its subfolders.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.moveAttachmentsWithNote = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.moveAttachmentsWithNote));
        new obsidian.Setting(containerEl)
            .setName('Delete Unused Attachments with Note')
            .setDesc('Automatically remove attachments that are no longer referenced in other notes when the note is deleted.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.deleteAttachmentsWithNote = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.deleteAttachmentsWithNote));
        new obsidian.Setting(containerEl)
            .setName('Update Links')
            .setDesc('Automatically update links to attachments and other notes when moving notes or attachments.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.updateLinks = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.updateLinks));
        new obsidian.Setting(containerEl)
            .setName('Delete Empty Folders')
            .setDesc('Automatically remove empty folders after moving notes with attachments.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.deleteEmptyFolders = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.deleteEmptyFolders));
        new obsidian.Setting(containerEl)
            .setName('Delete Duplicate Attachments on Note Move')
            .setDesc('Automatically delete attachments when moving a note if a file with the same name exists in the destination folder. If disabled, the file will be renamed and moved.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.deleteExistFilesWhenMoveNote = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.deleteExistFilesWhenMoveNote));
        new obsidian.Setting(containerEl)
            .setName('Update Backlink Text on Note Rename')
            .setDesc('When a note is renamed, its linked references are automatically updated. If this option is enabled, the text of backlinks to this note will also be modified.')
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.changeNoteBacklinksAlt = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.changeNoteBacklinksAlt));
        new obsidian.Setting(containerEl)
            .setName("Ignore Folders")
            .setDesc("Specify a list of folders to ignore. Enter each folder on a new line.")
            .addTextArea(cb => cb
            .setPlaceholder("Example: .git, .obsidian")
            .setValue(this.plugin.settings.ignoreFolders.join("\n"))
            .onChange((value) => {
            let paths = value.trim().split("\n").map(value => this.getNormalizedPath(value) + "/");
            this.plugin.settings.ignoreFolders = paths;
            this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName("Ignore Files")
            .setDesc("Specify a list of files to ignore. Enter each file on a new line.")
            .addTextArea(cb => cb
            .setPlaceholder("Example: consistant-report.md")
            .setValue(this.plugin.settings.ignoreFiles.join("\n"))
            .onChange((value) => {
            let paths = value.trim().split("\n");
            this.plugin.settings.ignoreFiles = paths;
            this.plugin.settings.ignoreFilesRegex = paths.map(file => RegExp(file));
            this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName("Attachment Subfolder")
            .setDesc("Specify the subfolder within the note folder to collect attachments into when using the \"Collect All Attachments\" hotkey. Leave empty to collect attachments directly into the note folder. You can use ${filename} as a placeholder for the current note name.")
            .addText(cb => cb
            .setPlaceholder("Example: _attachments")
            .setValue(this.plugin.settings.attachmentsSubfolder)
            .onChange((value) => {
            this.plugin.settings.attachmentsSubfolder = value;
            this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName("Consistency Report Filename")
            .setDesc("Specify the name of the file for the consistency report.")
            .addText(cb => cb
            .setPlaceholder("Example: consistency-report.md")
            .setValue(this.plugin.settings.consistencyReportFile)
            .onChange((value) => {
            this.plugin.settings.consistencyReportFile = value;
            this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName("EXPERIMENTAL: Use Built-in Obsidian Link Caching for Moved Notes")
            .setDesc("Enable this option to use the experimental built-in Obsidian link caching for processing moved notes. Turn it off if the plugin misbehaves.")
            .addToggle(cb => cb.onChange(value => {
            this.plugin.settings.useBuiltInObsidianLinkCaching = value;
            this.plugin.saveSettings();
        }).setValue(this.plugin.settings.useBuiltInObsidianLinkCaching));
    }
    getNormalizedPath(path) {
        return path.length == 0 ? path : obsidian.normalizePath(path);
    }
}

class Utils {
    static delay(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    static normalizePathForFile(path) {
        path = path.replace(/\\/gi, "/"); //replace \ to /
        path = path.replace(/%20/gi, " "); //replace %20 to space
        return path;
    }
    static normalizePathForLink(path) {
        path = path.replace(/\\/gi, "/"); //replace \ to /
        path = path.replace(/ /gi, "%20"); //replace space to %20
        return path;
    }
    static normalizeLinkSection(section) {
        section = decodeURI(section);
        return section;
    }
    static getCacheSafe(fileOrPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = Utils.getFileOrNull(fileOrPath);
            if (!file) {
                return {};
            }
            while (true) {
                const cache = app.metadataCache.getFileCache(file);
                if (cache) {
                    return cache;
                }
                yield Utils.delay(100);
            }
        });
    }
    static getFileOrNull(fileOrPath) {
        if (fileOrPath instanceof obsidian.TFile) {
            return fileOrPath;
        }
        const abstractFile = app.vault.getAbstractFileByPath(fileOrPath);
        if (!abstractFile) {
            return null;
        }
        if (!(abstractFile instanceof obsidian.TFile)) {
            throw `${fileOrPath} is not a file`;
        }
        return abstractFile;
    }
}

class path {
    static join(...parts) {
        if (arguments.length === 0)
            return '.';
        var joined;
        for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            if (arg.length > 0) {
                if (joined === undefined)
                    joined = arg;
                else
                    joined += '/' + arg;
            }
        }
        if (joined === undefined)
            return '.';
        return this.posixNormalize(joined);
    }
    static dirname(path) {
        if (path.length === 0)
            return '.';
        var code = path.charCodeAt(0);
        var hasRoot = code === 47 /*/*/;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1)
            return hasRoot ? '/' : '.';
        if (hasRoot && end === 1)
            return '//';
        return path.slice(0, end);
    }
    static basename(path, ext) {
        if (ext !== undefined && typeof ext !== 'string')
            throw new TypeError('"ext" argument must be a string');
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext.length === path.length && ext === path)
                return '';
            var extIdx = ext.length - 1;
            var firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                var code = path.charCodeAt(i);
                if (code === 47 /*/*/) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end)
                end = firstNonSlashEnd;
            else if (end === -1)
                end = path.length;
            return path.slice(start, end);
        }
        else {
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === 47 /*/*/) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1)
                return '';
            return path.slice(start, end);
        }
    }
    static extname(path) {
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 || end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return '';
        }
        return path.slice(startDot, end);
    }
    static parse(path) {
        var ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0)
            return ret;
        var code = path.charCodeAt(0);
        var isAbsolute = code === 47 /*/*/;
        var start;
        if (isAbsolute) {
            ret.root = '/';
            start = 1;
        }
        else {
            start = 0;
        }
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        var preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            code = path.charCodeAt(i);
            if (code === 47 /*/*/) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === 46 /*.*/) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1)
                    startDot = i;
                else if (preDotState !== 1)
                    preDotState = 1;
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 || end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            if (end !== -1) {
                if (startPart === 0 && isAbsolute)
                    ret.base = ret.name = path.slice(1, end);
                else
                    ret.base = ret.name = path.slice(startPart, end);
            }
        }
        else {
            if (startPart === 0 && isAbsolute) {
                ret.name = path.slice(1, startDot);
                ret.base = path.slice(1, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
            }
            ret.ext = path.slice(startDot, end);
        }
        if (startPart > 0)
            ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute)
            ret.dir = '/';
        return ret;
    }
    static posixNormalize(path) {
        if (path.length === 0)
            return '.';
        var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
        var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;
        // Normalize the path
        path = this.normalizeStringPosix(path, !isAbsolute);
        if (path.length === 0 && !isAbsolute)
            path = '.';
        if (path.length > 0 && trailingSeparator)
            path += '/';
        if (isAbsolute)
            return '/' + path;
        return path;
    }
    static normalizeStringPosix(path, allowAboveRoot) {
        var res = '';
        var lastSegmentLength = 0;
        var lastSlash = -1;
        var dots = 0;
        var code;
        for (var i = 0; i <= path.length; ++i) {
            if (i < path.length)
                code = path.charCodeAt(i);
            else if (code === 47 /*/*/)
                break;
            else
                code = 47 /*/*/;
            if (code === 47 /*/*/) {
                if (lastSlash === i - 1 || dots === 1) ;
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
                        if (res.length > 2) {
                            var lastSlashIndex = res.lastIndexOf('/');
                            if (lastSlashIndex !== res.length - 1) {
                                if (lastSlashIndex === -1) {
                                    res = '';
                                    lastSegmentLength = 0;
                                }
                                else {
                                    res = res.slice(0, lastSlashIndex);
                                    lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
                                }
                                lastSlash = i;
                                dots = 0;
                                continue;
                            }
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = '';
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0)
                            res += '/..';
                        else
                            res = '..';
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0)
                        res += '/' + path.slice(lastSlash + 1, i);
                    else
                        res = path.slice(lastSlash + 1, i);
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === 46 /*.*/ && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    static posixResolve(...args) {
        var resolvedPath = '';
        var resolvedAbsolute = false;
        var cwd;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path;
            if (i >= 0)
                path = args[i];
            else {
                if (cwd === undefined)
                    cwd = process.cwd();
                path = cwd;
            }
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = this.normalizeStringPosix(resolvedPath, !resolvedAbsolute);
        if (resolvedAbsolute) {
            if (resolvedPath.length > 0)
                return '/' + resolvedPath;
            else
                return '/';
        }
        else if (resolvedPath.length > 0) {
            return resolvedPath;
        }
        else {
            return '.';
        }
    }
    static relative(from, to) {
        if (from === to)
            return '';
        from = this.posixResolve(from);
        to = this.posixResolve(to);
        if (from === to)
            return '';
        // Trim any leading backslashes
        var fromStart = 1;
        for (; fromStart < from.length; ++fromStart) {
            if (from.charCodeAt(fromStart) !== 47 /*/*/)
                break;
        }
        var fromEnd = from.length;
        var fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        var toStart = 1;
        for (; toStart < to.length; ++toStart) {
            if (to.charCodeAt(toStart) !== 47 /*/*/)
                break;
        }
        var toEnd = to.length;
        var toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        var length = fromLen < toLen ? fromLen : toLen;
        var lastCommonSep = -1;
        var i = 0;
        for (; i <= length; ++i) {
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === 47 /*/*/) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='/foo/bar'; to='/foo/bar/baz'
                        return to.slice(toStart + i + 1);
                    }
                    else if (i === 0) {
                        // We get here if `from` is the root
                        // For example: from='/'; to='/foo'
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='/foo/bar/baz'; to='/foo/bar'
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        // We get here if `to` is the root.
                        // For example: from='/foo'; to='/'
                        lastCommonSep = 0;
                    }
                }
                break;
            }
            var fromCode = from.charCodeAt(fromStart + i);
            var toCode = to.charCodeAt(toStart + i);
            if (fromCode !== toCode)
                break;
            else if (fromCode === 47 /*/*/)
                lastCommonSep = i;
        }
        var out = '';
        // Generate the relative path based on the path difference between `to`
        // and `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
                if (out.length === 0)
                    out += '..';
                else
                    out += '/..';
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0)
            return out + to.slice(toStart + lastCommonSep);
        else {
            toStart += lastCommonSep;
            if (to.charCodeAt(toStart) === 47 /*/*/)
                ++toStart;
            return to.slice(toStart);
        }
    }
}

//simple regex
// const markdownLinkOrEmbedRegexSimple = /\[(.*?)\]\((.*?)\)/gim
// const markdownLinkRegexSimple = /(?<!\!)\[(.*?)\]\((.*?)\)/gim;
// const markdownEmbedRegexSimple = /\!\[(.*?)\]\((.*?)\)/gim
// const wikiLinkOrEmbedRegexSimple = /\[\[(.*?)\]\]/gim
// const wikiLinkRegexSimple = /(?<!\!)\[\[(.*?)\]\]/gim;
// const wikiEmbedRegexSimple = /\!\[\[(.*?)\]\]/gim
//with escaping \ characters
const markdownLinkOrEmbedRegexG = /(?<!\\)\[(.*?)(?<!\\)\]\((.*?)(?<!\\)\)/gim;
const markdownLinkRegexG = /(?<!\!)(?<!\\)\[(.*?)(?<!\\)\]\((.*?)(?<!\\)(?:#(.*?))?\)/gim;
const markdownEmbedRegexG = /(?<!\\)\!\[(.*?)(?<!\\)\]\((.*?)(?<!\\)\)/gim;
const wikiLinkOrEmbedRegexG = /(?<!\\)\[\[(.*?)(?<!\\)\]\]/gim;
const wikiLinkRegexG = /(?<!\!)(?<!\\)\[\[(.*?)(?<!\\)\]\]/gim;
const wikiEmbedRegexG = /(?<!\\)\!\[\[(.*?)(?<!\\)\]\]/gim;
const markdownLinkOrEmbedRegex = /(?<!\\)\[(.*?)(?<!\\)\]\((.*?)(?<!\\)\)/im;
const markdownLinkRegex = /(?<!\!)(?<!\\)\[(.*?)(?<!\\)\]\((.*?)(?<!\\)\)/im;
class LinksHandler {
    constructor(app, consoleLogPrefix = "", ignoreFolders = [], ignoreFilesRegex = []) {
        this.app = app;
        this.consoleLogPrefix = consoleLogPrefix;
        this.ignoreFolders = ignoreFolders;
        this.ignoreFilesRegex = ignoreFilesRegex;
    }
    isPathIgnored(path) {
        if (path.startsWith("./"))
            path = path.substring(2);
        for (let folder of this.ignoreFolders) {
            if (path.startsWith(folder)) {
                return true;
            }
        }
        for (let fileRegex of this.ignoreFilesRegex) {
            if (fileRegex.test(path)) {
                return true;
            }
        }
    }
    checkIsCorrectMarkdownEmbed(text) {
        let elements = text.match(markdownEmbedRegexG);
        return (elements != null && elements.length > 0);
    }
    checkIsCorrectMarkdownLink(text) {
        let elements = text.match(markdownLinkRegexG);
        return (elements != null && elements.length > 0);
    }
    checkIsCorrectMarkdownEmbedOrLink(text) {
        let elements = text.match(markdownLinkOrEmbedRegexG);
        return (elements != null && elements.length > 0);
    }
    checkIsCorrectWikiEmbed(text) {
        let elements = text.match(wikiEmbedRegexG);
        return (elements != null && elements.length > 0);
    }
    checkIsCorrectWikiLink(text) {
        let elements = text.match(wikiLinkRegexG);
        return (elements != null && elements.length > 0);
    }
    checkIsCorrectWikiEmbedOrLink(text) {
        let elements = text.match(wikiLinkOrEmbedRegexG);
        return (elements != null && elements.length > 0);
    }
    getFileByLink(link, owningNotePath, allowInvalidLink = true) {
        link = this.splitLinkToPathAndSection(link).link;
        if (allowInvalidLink) {
            return this.app.metadataCache.getFirstLinkpathDest(link, owningNotePath);
        }
        let fullPath = this.getFullPathForLink(link, owningNotePath);
        return this.getFileByPath(fullPath);
    }
    getFileByPath(path) {
        path = Utils.normalizePathForFile(path);
        return app.vault.getAbstractFileByPath(path);
    }
    getFullPathForLink(link, owningNotePath) {
        link = this.splitLinkToPathAndSection(link).link;
        link = Utils.normalizePathForFile(link);
        owningNotePath = Utils.normalizePathForFile(owningNotePath);
        let parentFolder = owningNotePath.substring(0, owningNotePath.lastIndexOf("/"));
        let fullPath = path.join(parentFolder, link);
        fullPath = Utils.normalizePathForFile(fullPath);
        return fullPath;
    }
    getAllCachedLinksToFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let allLinks = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (note.path == filePath)
                        continue;
                    let links = (yield Utils.getCacheSafe(note.path)).links;
                    if (links) {
                        for (let link of links) {
                            let linkFullPath = this.getFullPathForLink(link.link, note.path);
                            if (linkFullPath == filePath) {
                                if (!allLinks[note.path])
                                    allLinks[note.path] = [];
                                allLinks[note.path].push(link);
                            }
                        }
                    }
                }
            }
            return allLinks;
        });
    }
    getAllCachedEmbedsToFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let allEmbeds = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (note.path == filePath)
                        continue;
                    //!!! this can return undefined if note was just updated
                    let embeds = (yield Utils.getCacheSafe(note.path)).embeds;
                    if (embeds) {
                        for (let embed of embeds) {
                            let linkFullPath = this.getFullPathForLink(embed.link, note.path);
                            if (linkFullPath == filePath) {
                                if (!allEmbeds[note.path])
                                    allEmbeds[note.path] = [];
                                allEmbeds[note.path].push(embed);
                            }
                        }
                    }
                }
            }
            return allEmbeds;
        });
    }
    getAllBadLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let allLinks = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let links = (yield Utils.getCacheSafe(note.path)).links;
                    if (links) {
                        for (let link of links) {
                            if (link.link.startsWith("#")) //internal section link
                                continue;
                            if (this.checkIsCorrectWikiLink(link.original))
                                continue;
                            let file = this.getFileByLink(link.link, note.path, false);
                            if (!file) {
                                if (!allLinks[note.path])
                                    allLinks[note.path] = [];
                                allLinks[note.path].push(link);
                            }
                        }
                    }
                }
            }
            return allLinks;
        });
    }
    getAllBadEmbeds() {
        return __awaiter(this, void 0, void 0, function* () {
            let allEmbeds = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let embeds = (yield Utils.getCacheSafe(note.path)).embeds;
                    if (embeds) {
                        for (let embed of embeds) {
                            if (this.checkIsCorrectWikiEmbed(embed.original))
                                continue;
                            let file = this.getFileByLink(embed.link, note.path, false);
                            if (!file) {
                                if (!allEmbeds[note.path])
                                    allEmbeds[note.path] = [];
                                allEmbeds[note.path].push(embed);
                            }
                        }
                    }
                }
            }
            return allEmbeds;
        });
    }
    getAllGoodLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let allLinks = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let links = (yield Utils.getCacheSafe(note.path)).links;
                    if (links) {
                        for (let link of links) {
                            if (link.link.startsWith("#")) //internal section link
                                continue;
                            if (this.checkIsCorrectWikiLink(link.original))
                                continue;
                            let file = this.getFileByLink(link.link, note.path);
                            if (file) {
                                if (!allLinks[note.path])
                                    allLinks[note.path] = [];
                                allLinks[note.path].push(link);
                            }
                        }
                    }
                }
            }
            return allLinks;
        });
    }
    getAllBadSectionLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let allLinks = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let links = (yield Utils.getCacheSafe(note.path)).links;
                    if (links) {
                        for (let link of links) {
                            if (this.checkIsCorrectWikiLink(link.original))
                                continue;
                            let li = this.splitLinkToPathAndSection(link.link);
                            if (!li.hasSection)
                                continue;
                            let file = this.getFileByLink(link.link, note.path, false);
                            if (file) {
                                if (file.extension === "pdf" && li.section.startsWith("page=")) {
                                    continue;
                                }
                                let text = yield this.app.vault.read(file);
                                let section = Utils.normalizeLinkSection(li.section);
                                if (section.startsWith("^")) //skip ^ links
                                    continue;
                                let regex = /[ !@$%^&*()-=_+\\/;'\[\]\"\|\?.\,\<\>\`\~\{\}]/gim;
                                text = text.replace(regex, '');
                                section = section.replace(regex, '');
                                if (!text.contains("#" + section)) {
                                    if (!allLinks[note.path])
                                        allLinks[note.path] = [];
                                    allLinks[note.path].push(link);
                                }
                            }
                        }
                    }
                }
            }
            return allLinks;
        });
    }
    getAllGoodEmbeds() {
        return __awaiter(this, void 0, void 0, function* () {
            let allEmbeds = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let embeds = (yield Utils.getCacheSafe(note.path)).embeds;
                    if (embeds) {
                        for (let embed of embeds) {
                            if (this.checkIsCorrectWikiEmbed(embed.original))
                                continue;
                            let file = this.getFileByLink(embed.link, note.path);
                            if (file) {
                                if (!allEmbeds[note.path])
                                    allEmbeds[note.path] = [];
                                allEmbeds[note.path].push(embed);
                            }
                        }
                    }
                }
            }
            return allEmbeds;
        });
    }
    getAllWikiLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let allLinks = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let links = (yield Utils.getCacheSafe(note.path)).links;
                    if (links) {
                        for (let link of links) {
                            if (!this.checkIsCorrectWikiLink(link.original))
                                continue;
                            if (!allLinks[note.path])
                                allLinks[note.path] = [];
                            allLinks[note.path].push(link);
                        }
                    }
                }
            }
            return allLinks;
        });
    }
    getAllWikiEmbeds() {
        return __awaiter(this, void 0, void 0, function* () {
            let allEmbeds = {};
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    //!!! this can return undefined if note was just updated
                    let embeds = (yield Utils.getCacheSafe(note.path)).embeds;
                    if (embeds) {
                        for (let embed of embeds) {
                            if (!this.checkIsCorrectWikiEmbed(embed.original))
                                continue;
                            if (!allEmbeds[note.path])
                                allEmbeds[note.path] = [];
                            allEmbeds[note.path].push(embed);
                        }
                    }
                }
            }
            return allEmbeds;
        });
    }
    updateLinksToRenamedFile(oldNotePath, newNotePath, changelinksAlt = false, useBuiltInObsidianLinkCaching = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(oldNotePath) || this.isPathIgnored(newNotePath))
                return;
            let notes = useBuiltInObsidianLinkCaching ? yield this.getCachedNotesThatHaveLinkToFile(oldNotePath) : yield this.getNotesThatHaveLinkToFile(oldNotePath);
            let links = [{ oldPath: oldNotePath, newPath: newNotePath }];
            if (notes) {
                for (let note of notes) {
                    yield this.updateChangedPathsInNote(note, links, changelinksAlt);
                }
            }
        });
    }
    updateChangedPathInNote(notePath, oldLink, newLink, changelinksAlt = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let changes = [{ oldPath: oldLink, newPath: newLink }];
            return yield this.updateChangedPathsInNote(notePath, changes, changelinksAlt);
        });
    }
    updateChangedPathsInNote(notePath, changedLinks, changelinksAlt = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let file = this.getFileByPath(notePath);
            if (!file) {
                console.error(this.consoleLogPrefix + "cant update links in note, file not found: " + notePath);
                return;
            }
            let text = yield this.app.vault.read(file);
            let dirty = false;
            let elements = text.match(markdownLinkOrEmbedRegexG);
            if (elements != null && elements.length > 0) {
                for (let el of elements) {
                    let alt = el.match(markdownLinkOrEmbedRegex)[1];
                    let link = el.match(markdownLinkOrEmbedRegex)[2];
                    let li = this.splitLinkToPathAndSection(link);
                    if (li.hasSection) // for links with sections like [](note.md#section)
                        link = li.link;
                    let fullLink = this.getFullPathForLink(link, notePath);
                    for (let changedLink of changedLinks) {
                        if (fullLink == changedLink.oldPath) {
                            let newRelLink = path.relative(notePath, changedLink.newPath);
                            newRelLink = Utils.normalizePathForLink(newRelLink);
                            if (newRelLink.startsWith("../")) {
                                newRelLink = newRelLink.substring(3);
                            }
                            if (changelinksAlt && newRelLink.endsWith(".md")) {
                                //rename only if old alt == old note name
                                if (alt === path.basename(changedLink.oldPath, path.extname(changedLink.oldPath))) {
                                    let ext = path.extname(newRelLink);
                                    let baseName = path.basename(newRelLink, ext);
                                    alt = Utils.normalizePathForFile(baseName);
                                }
                            }
                            if (li.hasSection)
                                text = text.replace(el, '[' + alt + ']' + '(' + newRelLink + '#' + li.section + ')');
                            else
                                text = text.replace(el, '[' + alt + ']' + '(' + newRelLink + ')');
                            dirty = true;
                            console.log(this.consoleLogPrefix + "link updated in cached note [note, old link, new link]: \n   "
                                + file.path + "\n   " + link + "\n   " + newRelLink);
                        }
                    }
                }
            }
            if (dirty)
                yield this.app.vault.modify(file, text);
        });
    }
    updateInternalLinksInMovedNote(oldNotePath, newNotePath, attachmentsAlreadyMoved) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(oldNotePath) || this.isPathIgnored(newNotePath))
                return;
            let file = this.getFileByPath(newNotePath);
            if (!file) {
                console.error(this.consoleLogPrefix + "can't update internal links, file not found: " + newNotePath);
                return;
            }
            let text = yield this.app.vault.read(file);
            let dirty = false;
            let elements = text.match(markdownLinkOrEmbedRegexG);
            if (elements != null && elements.length > 0) {
                for (let el of elements) {
                    let alt = el.match(markdownLinkOrEmbedRegex)[1];
                    let link = el.match(markdownLinkOrEmbedRegex)[2];
                    let li = this.splitLinkToPathAndSection(link);
                    if (link.startsWith("#")) //internal section link
                        continue;
                    if (li.hasSection) // for links with sections like [](note.md#section)
                        link = li.link;
                    //startsWith("../") - for not skipping files that not in the note dir
                    if (attachmentsAlreadyMoved && !link.endsWith(".md") && !link.startsWith("../"))
                        continue;
                    let file = this.getFileByLink(link, oldNotePath);
                    if (!file) {
                        file = this.getFileByLink(link, newNotePath);
                        if (!file) {
                            console.error(this.consoleLogPrefix + newNotePath + " has bad link (file does not exist): " + link);
                            continue;
                        }
                    }
                    let newRelLink = path.relative(newNotePath, file.path);
                    newRelLink = Utils.normalizePathForLink(newRelLink);
                    if (newRelLink.startsWith("../")) {
                        newRelLink = newRelLink.substring(3);
                    }
                    if (li.hasSection)
                        text = text.replace(el, '[' + alt + ']' + '(' + newRelLink + '#' + li.section + ')');
                    else
                        text = text.replace(el, '[' + alt + ']' + '(' + newRelLink + ')');
                    dirty = true;
                    console.log(this.consoleLogPrefix + "link updated in moved note [note, old link, new link]: \n   "
                        + file.path + "\n   " + link + "   \n" + newRelLink);
                }
            }
            if (dirty)
                yield this.app.vault.modify(file, text);
        });
    }
    getCachedNotesThatHaveLinkToFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            let allNotes = this.app.vault.getMarkdownFiles();
            if (allNotes) {
                for (let note of allNotes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let notePath = note.path;
                    if (note.path == filePath)
                        continue;
                    //!!! this can return undefined if note was just updated
                    let embeds = (yield Utils.getCacheSafe(notePath)).embeds;
                    if (embeds) {
                        for (let embed of embeds) {
                            let linkPath = this.getFullPathForLink(embed.link, note.path);
                            if (linkPath == filePath) {
                                if (!notes.contains(notePath))
                                    notes.push(notePath);
                            }
                        }
                    }
                    //!!! this can return undefined if note was just updated
                    let links = (yield Utils.getCacheSafe(notePath)).links;
                    if (links) {
                        for (let link of links) {
                            let linkPath = this.getFullPathForLink(link.link, note.path);
                            if (linkPath == filePath) {
                                if (!notes.contains(notePath))
                                    notes.push(notePath);
                            }
                        }
                    }
                }
            }
            return notes;
        });
    }
    getNotesThatHaveLinkToFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            let allNotes = this.app.vault.getMarkdownFiles();
            if (allNotes) {
                for (let note of allNotes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let notePath = note.path;
                    if (notePath == filePath)
                        continue;
                    let links = yield this.getLinksFromNote(notePath);
                    for (let link of links) {
                        let li = this.splitLinkToPathAndSection(link.link);
                        let linkFullPath = this.getFullPathForLink(li.link, notePath);
                        if (linkFullPath == filePath) {
                            if (!notes.contains(notePath))
                                notes.push(notePath);
                        }
                    }
                }
            }
            return notes;
        });
    }
    splitLinkToPathAndSection(link) {
        let res = {
            hasSection: false,
            link: link,
            section: ""
        };
        if (!link.contains('#'))
            return res;
        let linkBeforeHash = link.match(/(.*?)#(.*?)$/)[1];
        let section = link.match(/(.*?)#(.*?)$/)[2];
        let isMarkdownSection = section != "" && linkBeforeHash.endsWith(".md"); // for links with sections like [](note.md#section)
        let isPdfPageSection = section.startsWith("page=") && linkBeforeHash.endsWith(".pdf"); // for links with sections like [](note.pdf#page=42)
        if (isMarkdownSection || isPdfPageSection) {
            res = {
                hasSection: true,
                link: linkBeforeHash,
                section: section
            };
        }
        return res;
    }
    getFilePathWithRenamedBaseName(filePath, newBaseName) {
        return Utils.normalizePathForFile(path.join(path.dirname(filePath), newBaseName + path.extname(filePath)));
    }
    getLinksFromNote(notePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = this.getFileByPath(notePath);
            if (!file) {
                console.error(this.consoleLogPrefix + "can't get embeds, file not found: " + notePath);
                return;
            }
            let text = yield this.app.vault.read(file);
            let links = [];
            let elements = text.match(markdownLinkOrEmbedRegexG);
            if (elements != null && elements.length > 0) {
                for (let el of elements) {
                    let alt = el.match(markdownLinkOrEmbedRegex)[1];
                    let link = el.match(markdownLinkOrEmbedRegex)[2];
                    let emb = {
                        link: link,
                        displayText: alt,
                        original: el,
                        position: {
                            start: {
                                col: 0,
                                line: 0,
                                offset: 0
                            },
                            end: {
                                col: 0,
                                line: 0,
                                offset: 0
                            }
                        }
                    };
                    links.push(emb);
                }
            }
            return links;
        });
    }
    convertAllNoteEmbedsPathsToRelative(notePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let changedEmbeds = [];
            let embeds = (yield Utils.getCacheSafe(notePath)).embeds;
            if (embeds) {
                for (let embed of embeds) {
                    let isMarkdownEmbed = this.checkIsCorrectMarkdownEmbed(embed.original);
                    let isWikiEmbed = this.checkIsCorrectWikiEmbed(embed.original);
                    if (isMarkdownEmbed || isWikiEmbed) {
                        let file = this.getFileByLink(embed.link, notePath);
                        if (file)
                            continue;
                        file = this.app.metadataCache.getFirstLinkpathDest(embed.link, notePath);
                        if (file) {
                            let newRelLink = path.relative(notePath, file.path);
                            newRelLink = isMarkdownEmbed ? Utils.normalizePathForLink(newRelLink) : Utils.normalizePathForFile(newRelLink);
                            if (newRelLink.startsWith("../")) {
                                newRelLink = newRelLink.substring(3);
                            }
                            changedEmbeds.push({ old: embed, newLink: newRelLink });
                        }
                        else {
                            console.error(this.consoleLogPrefix + notePath + " has bad embed (file does not exist): " + embed.link);
                        }
                    }
                    else {
                        console.error(this.consoleLogPrefix + notePath + " has bad embed (format of link is not markdown or wiki link): " + embed.original);
                    }
                }
            }
            yield this.updateChangedEmbedInNote(notePath, changedEmbeds);
            return changedEmbeds;
        });
    }
    convertAllNoteLinksPathsToRelative(notePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let changedLinks = [];
            let links = (yield Utils.getCacheSafe(notePath)).links;
            if (links) {
                for (let link of links) {
                    let isMarkdownLink = this.checkIsCorrectMarkdownLink(link.original);
                    let isWikiLink = this.checkIsCorrectWikiLink(link.original);
                    if (isMarkdownLink || isWikiLink) {
                        if (link.link.startsWith("#")) //internal section link
                            continue;
                        let file = this.getFileByLink(link.link, notePath);
                        if (file)
                            continue;
                        //!!! link.displayText is always "" - OBSIDIAN BUG?, so get display text manualy
                        if (isMarkdownLink) {
                            let elements = link.original.match(markdownLinkRegex);
                            if (elements)
                                link.displayText = elements[1];
                        }
                        file = this.app.metadataCache.getFirstLinkpathDest(link.link, notePath);
                        if (file) {
                            let newRelLink = path.relative(notePath, file.path);
                            newRelLink = isMarkdownLink ? Utils.normalizePathForLink(newRelLink) : Utils.normalizePathForFile(newRelLink);
                            if (newRelLink.startsWith("../")) {
                                newRelLink = newRelLink.substring(3);
                            }
                            changedLinks.push({ old: link, newLink: newRelLink });
                        }
                        else {
                            console.error(this.consoleLogPrefix + notePath + " has bad link (file does not exist): " + link.link);
                        }
                    }
                    else {
                        console.error(this.consoleLogPrefix + notePath + " has bad link (format of link is not markdown or wiki link): " + link.original);
                    }
                }
            }
            yield this.updateChangedLinkInNote(notePath, changedLinks);
            return changedLinks;
        });
    }
    updateChangedEmbedInNote(notePath, changedEmbeds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let noteFile = this.getFileByPath(notePath);
            if (!noteFile) {
                console.error(this.consoleLogPrefix + "can't update embeds in note, file not found: " + notePath);
                return;
            }
            let text = yield this.app.vault.read(noteFile);
            let dirty = false;
            if (changedEmbeds && changedEmbeds.length > 0) {
                for (let embed of changedEmbeds) {
                    if (embed.old.link == embed.newLink)
                        continue;
                    if (this.checkIsCorrectMarkdownEmbed(embed.old.original)) {
                        text = text.replace(embed.old.original, '![' + embed.old.displayText + ']' + '(' + embed.newLink + ')');
                    }
                    else if (this.checkIsCorrectWikiEmbed(embed.old.original)) {
                        text = text.replace(embed.old.original, '![[' + embed.newLink + ']]');
                    }
                    else {
                        console.error(this.consoleLogPrefix + notePath + " has bad embed (format of link is not maekdown or wiki link): " + embed.old.original);
                        continue;
                    }
                    console.log(this.consoleLogPrefix + "embed updated in note [note, old link, new link]: \n   "
                        + noteFile.path + "\n   " + embed.old.link + "\n   " + embed.newLink);
                    dirty = true;
                }
            }
            if (dirty)
                yield this.app.vault.modify(noteFile, text);
        });
    }
    updateChangedLinkInNote(notePath, chandedLinks) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let noteFile = this.getFileByPath(notePath);
            if (!noteFile) {
                console.error(this.consoleLogPrefix + "can't update links in note, file not found: " + notePath);
                return;
            }
            let text = yield this.app.vault.read(noteFile);
            let dirty = false;
            if (chandedLinks && chandedLinks.length > 0) {
                for (let link of chandedLinks) {
                    if (link.old.link == link.newLink)
                        continue;
                    if (this.checkIsCorrectMarkdownLink(link.old.original)) {
                        text = text.replace(link.old.original, '[' + link.old.displayText + ']' + '(' + link.newLink + ')');
                    }
                    else if (this.checkIsCorrectWikiLink(link.old.original)) {
                        text = text.replace(link.old.original, '[[' + link.newLink + ']]');
                    }
                    else {
                        console.error(this.consoleLogPrefix + notePath + " has bad link (format of link is not maekdown or wiki link): " + link.old.original);
                        continue;
                    }
                    console.log(this.consoleLogPrefix + "cached link updated in note [note, old link, new link]: \n   "
                        + noteFile.path + "\n   " + link.old.link + "\n   " + link.newLink);
                    dirty = true;
                }
            }
            if (dirty)
                yield this.app.vault.modify(noteFile, text);
        });
    }
    replaceAllNoteWikilinksWithMarkdownLinks(notePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let res = {
                links: [],
                embeds: [],
            };
            let noteFile = this.getFileByPath(notePath);
            if (!noteFile) {
                console.error(this.consoleLogPrefix + "can't update wikilinks in note, file not found: " + notePath);
                return;
            }
            const cache = yield Utils.getCacheSafe(notePath);
            let links = cache.links;
            let embeds = cache.embeds;
            let text = yield this.app.vault.read(noteFile);
            let dirty = false;
            if (embeds) { //embeds must go first!
                for (let embed of embeds) {
                    if (this.checkIsCorrectWikiEmbed(embed.original)) {
                        let newPath = Utils.normalizePathForLink(embed.link);
                        let newLink = '![' + ']' + '(' + newPath + ')';
                        text = text.replace(embed.original, newLink);
                        console.log(this.consoleLogPrefix + "wiki link (embed) replaced in note [note, old link, new link]: \n   "
                            + noteFile.path + "\n   " + embed.original + "\n   " + newLink);
                        res.embeds.push({ old: embed, newLink: newLink });
                        dirty = true;
                    }
                }
            }
            if (links) {
                for (let link of links) {
                    if (this.checkIsCorrectWikiLink(link.original)) {
                        let newPath = Utils.normalizePathForLink(link.link);
                        let file = this.app.metadataCache.getFirstLinkpathDest(link.link, notePath);
                        if (file && file.extension == "md" && !newPath.endsWith(".md"))
                            newPath = newPath + ".md";
                        let newLink = '[' + link.displayText + ']' + '(' + newPath + ')';
                        text = text.replace(link.original, newLink);
                        console.log(this.consoleLogPrefix + "wiki link replaced in note [note, old link, new link]: \n   "
                            + noteFile.path + "\n   " + link.original + "\n   " + newLink);
                        res.links.push({ old: link, newLink: newLink });
                        dirty = true;
                    }
                }
            }
            if (dirty)
                yield this.app.vault.modify(noteFile, text);
            return res;
        });
    }
}

class FilesHandler {
    constructor(app, lh, consoleLogPrefix = "", ignoreFolders = [], ignoreFilesRegex = []) {
        this.app = app;
        this.lh = lh;
        this.consoleLogPrefix = consoleLogPrefix;
        this.ignoreFolders = ignoreFolders;
        this.ignoreFilesRegex = ignoreFilesRegex;
    }
    isPathIgnored(path) {
        if (path.startsWith("./"))
            path = path.substring(2);
        for (let folder of this.ignoreFolders) {
            if (path.startsWith(folder)) {
                return true;
            }
        }
        for (let fileRegex of this.ignoreFilesRegex) {
            let testResult = fileRegex.test(path);
            // console.log(path,fileRegex,testResult)
            if (testResult) {
                return true;
            }
        }
    }
    createFolderForAttachmentFromLink(link, owningNotePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFullPath = this.lh.getFullPathForLink(link, owningNotePath);
            return yield this.createFolderForAttachmentFromPath(newFullPath);
        });
    }
    createFolderForAttachmentFromPath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let newParentFolder = filePath.substring(0, filePath.lastIndexOf("/"));
            try {
                //todo check filder exist
                yield this.app.vault.createFolder(newParentFolder);
            }
            catch (_a) { }
        });
    }
    generateFileCopyName(originalName) {
        let ext = path.extname(originalName);
        let baseName = path.basename(originalName, ext);
        let dir = path.dirname(originalName);
        for (let i = 1; i < 100000; i++) {
            let newName = dir + "/" + baseName + " " + i + ext;
            let existFile = this.lh.getFileByPath(newName);
            if (!existFile)
                return newName;
        }
        return "";
    }
    moveCachedNoteAttachments(oldNotePath, newNotePath, deleteExistFiles, attachmentsSubfolder, deleteEmptyFolders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(oldNotePath) || this.isPathIgnored(newNotePath))
                return;
            //try to get embeds for old or new path (metadataCache can be updated or not)
            //!!! this can return undefined if note was just updated
            let embeds = (yield Utils.getCacheSafe(newNotePath)).embeds;
            if (!embeds)
                return;
            let result = {
                movedAttachments: [],
                renamedFiles: []
            };
            for (let embed of embeds) {
                let link = embed.link;
                let oldLinkPath = this.lh.getFullPathForLink(link, oldNotePath);
                if (result.movedAttachments.findIndex(x => x.oldPath == oldLinkPath) != -1)
                    continue; //already moved
                let file = this.lh.getFileByLink(link, oldNotePath);
                if (!file) {
                    file = this.lh.getFileByLink(link, newNotePath);
                    if (!file) {
                        console.error(this.consoleLogPrefix + oldNotePath + " has bad embed (file does not exist): " + link);
                        continue;
                    }
                }
                //if attachment not in the note folder, skip it
                // = "." means that note was at root path, so do not skip it
                if (path.dirname(oldNotePath) != "." && !path.dirname(oldLinkPath).startsWith(path.dirname(oldNotePath)))
                    continue;
                let newLinkPath = this.getNewAttachmentPath(file.path, newNotePath, attachmentsSubfolder);
                if (newLinkPath == file.path) //nothing to move
                    continue;
                let res = yield this.moveAttachment(file, newLinkPath, [oldNotePath, newNotePath], deleteExistFiles, deleteEmptyFolders);
                result.movedAttachments = result.movedAttachments.concat(res.movedAttachments);
                result.renamedFiles = result.renamedFiles.concat(res.renamedFiles);
            }
            return result;
        });
    }
    getNewAttachmentPath(oldAttachmentPath, notePath, subfolderName) {
        let resolvedSubFolderName = subfolderName.replace(/\${filename}/g, path.basename(notePath, ".md"));
        let newPath = (resolvedSubFolderName == "") ? path.dirname(notePath) : path.join(path.dirname(notePath), resolvedSubFolderName);
        newPath = Utils.normalizePathForFile(path.join(newPath, path.basename(oldAttachmentPath)));
        return newPath;
    }
    collectAttachmentsForCachedNote(notePath, subfolderName, deleteExistFiles, deleteEmptyFolders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            let result = {
                movedAttachments: [],
                renamedFiles: []
            };
            const cache = yield Utils.getCacheSafe(notePath);
            for (let reference of this.getReferences(cache)) {
                let link = this.lh.splitLinkToPathAndSection(reference.link).link;
                if (link.startsWith("#")) {
                    // internal section link
                    continue;
                }
                let fullPathLink = this.lh.getFullPathForLink(link, notePath);
                if (result.movedAttachments.findIndex(x => x.oldPath == fullPathLink) != -1) {
                    // already moved
                    continue;
                }
                let file = this.lh.getFileByLink(link, notePath);
                if (!file) {
                    const type = reference.original.startsWith("!") ? "embed" : "link";
                    console.error(`${this.consoleLogPrefix}${notePath} has bad ${type} (file does not exist): ${link}`);
                    continue;
                }
                const extension = file.extension.toLowerCase();
                if (extension === "md" || file.extension === "canvas") {
                    // internal file link
                    continue;
                }
                let newPath = this.getNewAttachmentPath(file.path, notePath, subfolderName);
                if (newPath == file.path) {
                    // nothing to move
                    continue;
                }
                let res = yield this.moveAttachment(file, newPath, [notePath], deleteExistFiles, deleteEmptyFolders);
                result.movedAttachments = result.movedAttachments.concat(res.movedAttachments);
                result.renamedFiles = result.renamedFiles.concat(res.renamedFiles);
            }
            return result;
        });
    }
    moveAttachment(file, newLinkPath, parentNotePaths, deleteExistFiles, deleteEmptyFolders) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = file.path;
            let result = {
                movedAttachments: [],
                renamedFiles: []
            };
            if (this.isPathIgnored(path))
                return result;
            if (path == newLinkPath) {
                console.warn(this.consoleLogPrefix + "Can't move file. Source and destination path the same.");
                return result;
            }
            yield this.createFolderForAttachmentFromPath(newLinkPath);
            let linkedNotes = yield this.lh.getCachedNotesThatHaveLinkToFile(path);
            if (parentNotePaths) {
                for (let notePath of parentNotePaths) {
                    linkedNotes.remove(notePath);
                }
            }
            if (path !== file.path) {
                console.warn(this.consoleLogPrefix + "File was moved already");
                return yield this.moveAttachment(file, newLinkPath, parentNotePaths, deleteExistFiles, deleteEmptyFolders);
            }
            //if no other file has link to this file - try to move file
            //if file already exist at new location - delete or move with new name
            if (linkedNotes.length == 0) {
                let existFile = this.lh.getFileByPath(newLinkPath);
                if (!existFile) {
                    //move
                    console.log(this.consoleLogPrefix + "move file [from, to]: \n   " + path + "\n   " + newLinkPath);
                    result.movedAttachments.push({ oldPath: path, newPath: newLinkPath });
                    yield this.app.vault.rename(file, newLinkPath);
                }
                else {
                    if (deleteExistFiles) {
                        //delete
                        console.log(this.consoleLogPrefix + "delete file: \n   " + path);
                        result.movedAttachments.push({ oldPath: path, newPath: newLinkPath });
                        yield this.deleteFile(file, deleteEmptyFolders);
                    }
                    else {
                        //move with new name
                        let newFileCopyName = this.generateFileCopyName(newLinkPath);
                        console.log(this.consoleLogPrefix + "copy file with new name [from, to]: \n   " + path + "\n   " + newFileCopyName);
                        result.movedAttachments.push({ oldPath: path, newPath: newFileCopyName });
                        yield this.app.vault.rename(file, newFileCopyName);
                        result.renamedFiles.push({ oldPath: newLinkPath, newPath: newFileCopyName });
                    }
                }
            }
            //if some other file has link to this file - try to copy file
            //if file already exist at new location - copy file with new name or do nothing
            else {
                let existFile = this.lh.getFileByPath(newLinkPath);
                if (!existFile) {
                    //copy
                    console.log(this.consoleLogPrefix + "copy file [from, to]: \n   " + path + "\n   " + newLinkPath);
                    result.movedAttachments.push({ oldPath: path, newPath: newLinkPath });
                    yield this.app.vault.copy(file, newLinkPath);
                }
                else {
                    if (deleteExistFiles) ;
                    else {
                        //copy with new name
                        let newFileCopyName = this.generateFileCopyName(newLinkPath);
                        console.log(this.consoleLogPrefix + "copy file with new name [from, to]: \n   " + path + "\n   " + newFileCopyName);
                        result.movedAttachments.push({ oldPath: file.path, newPath: newFileCopyName });
                        yield this.app.vault.copy(file, newFileCopyName);
                        result.renamedFiles.push({ oldPath: newLinkPath, newPath: newFileCopyName });
                    }
                }
            }
            return result;
        });
    }
    deleteEmptyFolders(dirName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(dirName))
                return;
            if (dirName.startsWith("./"))
                dirName = dirName.substring(2);
            let list = yield this.app.vault.adapter.list(dirName);
            for (let folder of list.folders) {
                yield this.deleteEmptyFolders(folder);
            }
            list = yield this.app.vault.adapter.list(dirName);
            if (list.files.length == 0 && list.folders.length == 0) {
                console.log(this.consoleLogPrefix + "delete empty folder: \n   " + dirName);
                if (yield this.app.vault.adapter.exists(dirName))
                    yield this.app.vault.adapter.rmdir(dirName, false);
            }
        });
    }
    deleteUnusedAttachmentsForCachedNote(notePath, cache, deleteEmptyFolders) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(notePath))
                return;
            for (let reference of this.getReferences(cache)) {
                let link = reference.link;
                const file = this.lh.getFileByLink(link, notePath, false);
                if (!file || file.extension.toLowerCase() === "md") {
                    continue;
                }
                let linkedNotes = yield this.lh.getCachedNotesThatHaveLinkToFile(file.path);
                if (linkedNotes.length == 0) {
                    try {
                        yield this.deleteFile(file, deleteEmptyFolders);
                    }
                    catch (_a) { }
                }
            }
        });
    }
    getReferences(cache) {
        var _a, _b;
        return [...((_a = cache.embeds) !== null && _a !== void 0 ? _a : []), ...((_b = cache.links) !== null && _b !== void 0 ? _b : [])];
    }
    deleteFile(file, deleteEmptyFolders) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.vault.trash(file, true);
            if (deleteEmptyFolders) {
                let dir = file.parent;
                while (dir.children.length === 0) {
                    yield this.app.vault.trash(dir, true);
                    dir = dir.parent;
                }
            }
        });
    }
}

class ConsistentAttachmentsAndLinks extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.recentlyRenamedFiles = [];
        this.currentlyRenamingFiles = [];
        this.renamingIsActive = false;
        this.deletedNoteCache = new Map();
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.addSettingTab(new SettingTab(this.app, this));
            this.registerEvent(this.app.metadataCache.on('deleted', (file, prevCache) => this.handleDeletedMetadata(file, prevCache)));
            this.registerEvent(this.app.vault.on('delete', (file) => this.handleDeletedFile(file)));
            this.registerEvent(this.app.vault.on('rename', (file, oldPath) => this.handleRenamedFile(file, oldPath)));
            this.addCommand({
                id: 'collect-all-attachments',
                name: 'Collect All Attachments',
                callback: () => this.collectAllAttachments()
            });
            this.addCommand({
                id: 'collect-attachments-current-note',
                name: 'Collect Attachments in Current Note',
                editorCallback: (editor, view) => this.collectAttachmentsCurrentNote(editor, view)
            });
            this.addCommand({
                id: 'delete-empty-folders',
                name: 'Delete Empty Folders',
                callback: () => this.deleteEmptyFolders()
            });
            this.addCommand({
                id: 'convert-all-link-paths-to-relative',
                name: 'Convert All Link Paths to Relative',
                callback: () => this.convertAllLinkPathsToRelative()
            });
            this.addCommand({
                id: 'convert-all-embed-paths-to-relative',
                name: 'Convert All Embed Paths to Relative',
                callback: () => this.convertAllEmbedsPathsToRelative()
            });
            this.addCommand({
                id: 'replace-all-wikilinks-with-markdown-links',
                name: 'Replace All Wiki Links with Markdown Links',
                callback: () => this.replaceAllWikilinksWithMarkdownLinks()
            });
            this.addCommand({
                id: 'reorganize-vault',
                name: 'Reorganize Vault',
                callback: () => this.reorganizeVault()
            });
            this.addCommand({
                id: 'check-consistency',
                name: 'Check Vault consistency',
                callback: () => this.checkConsistency()
            });
            // make regex from given strings 
            this.settings.ignoreFilesRegex = this.settings.ignoreFiles.map(val => RegExp(val));
            this.lh = new LinksHandler(this.app, "Consistent Attachments and Links: ", this.settings.ignoreFolders, this.settings.ignoreFilesRegex);
            this.fh = new FilesHandler(this.app, this.lh, "Consistent Attachments and Links: ", this.settings.ignoreFolders, this.settings.ignoreFilesRegex);
        });
    }
    isPathIgnored(path) {
        if (path.startsWith("./"))
            path = path.substring(2);
        for (let folder of this.settings.ignoreFolders) {
            if (path.startsWith(folder)) {
                return true;
            }
        }
        for (let fileRegex of this.settings.ignoreFilesRegex) {
            if (fileRegex.test(path)) {
                return true;
            }
        }
    }
    handleDeletedMetadata(file, prevCache) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prevCache || !this.settings.deleteAttachmentsWithNote || this.isPathIgnored(file.path) || file.extension.toLowerCase() !== "md") {
                return;
            }
            this.deletedNoteCache.set(file.path, prevCache);
        });
    }
    handleDeletedFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPathIgnored(file.path))
                return;
            let fileExt = file.path.substring(file.path.lastIndexOf("."));
            if (fileExt == ".md") {
                if (this.settings.deleteAttachmentsWithNote) {
                    const cache = this.deletedNoteCache.get(file.path);
                    if (!cache) {
                        yield Utils.delay(100);
                        yield this.handleDeletedFile(file);
                        return;
                    }
                    this.deletedNoteCache.delete(file.path);
                    yield this.fh.deleteUnusedAttachmentsForCachedNote(file.path, cache, this.settings.deleteEmptyFolders);
                }
                //delete child folders (do not delete parent)
                if (this.settings.deleteEmptyFolders) {
                    if (yield this.app.vault.adapter.exists(path.dirname(file.path))) {
                        let list = yield this.app.vault.adapter.list(path.dirname(file.path));
                        for (let folder of list.folders) {
                            yield this.fh.deleteEmptyFolders(folder);
                        }
                    }
                }
            }
        });
    }
    handleRenamedFile(file, oldPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.recentlyRenamedFiles.push({ oldPath: oldPath, newPath: file.path });
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => { this.HandleRecentlyRenamedFiles(); }, 3000);
        });
    }
    HandleRecentlyRenamedFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.recentlyRenamedFiles || this.recentlyRenamedFiles.length == 0) //nothing to rename
                return;
            if (this.renamingIsActive) //already started
                return;
            this.renamingIsActive = true;
            this.currentlyRenamingFiles = this.recentlyRenamedFiles; //clear array for pushing new files async
            this.recentlyRenamedFiles = [];
            new obsidian.Notice("Fixing consistency for " + this.currentlyRenamingFiles.length + " renamed files" + "...");
            console.log("Consistent Attachments and Links:\nFixing consistency for " + this.currentlyRenamingFiles.length + " renamed files" + "...");
            try {
                for (let file of this.currentlyRenamingFiles) {
                    if (this.isPathIgnored(file.newPath) || this.isPathIgnored(file.oldPath))
                        return;
                    // await Utils.delay(10); //waiting for update vault
                    let result;
                    let fileExt = file.oldPath.substring(file.oldPath.lastIndexOf("."));
                    if (fileExt == ".md") {
                        // await Utils.delay(500);//waiting for update metadataCache
                        if ((path.dirname(file.oldPath) != path.dirname(file.newPath)) || (this.settings.attachmentsSubfolder.contains("${filename}"))) {
                            if (this.settings.moveAttachmentsWithNote) {
                                result = yield this.fh.moveCachedNoteAttachments(file.oldPath, file.newPath, this.settings.deleteExistFilesWhenMoveNote, this.settings.attachmentsSubfolder, this.settings.deleteEmptyFolders);
                                if (this.settings.updateLinks && result) {
                                    let changedFiles = result.renamedFiles.concat(result.movedAttachments);
                                    if (changedFiles.length > 0) {
                                        yield this.lh.updateChangedPathsInNote(file.newPath, changedFiles);
                                    }
                                }
                            }
                            if (this.settings.updateLinks) {
                                yield this.lh.updateInternalLinksInMovedNote(file.oldPath, file.newPath, this.settings.moveAttachmentsWithNote);
                            }
                            //delete child folders (do not delete parent)
                            if (this.settings.deleteEmptyFolders) {
                                if (yield this.app.vault.adapter.exists(path.dirname(file.oldPath))) {
                                    let list = yield this.app.vault.adapter.list(path.dirname(file.oldPath));
                                    for (let folder of list.folders) {
                                        yield this.fh.deleteEmptyFolders(folder);
                                    }
                                }
                            }
                        }
                    }
                    let updateAlts = this.settings.changeNoteBacklinksAlt && fileExt == ".md";
                    if (this.settings.updateLinks) {
                        yield this.lh.updateLinksToRenamedFile(file.oldPath, file.newPath, updateAlts, this.settings.useBuiltInObsidianLinkCaching);
                    }
                    if (result && result.movedAttachments && result.movedAttachments.length > 0) {
                        new obsidian.Notice("Moved " + result.movedAttachments.length + " attachment" + (result.movedAttachments.length > 1 ? "s" : ""));
                    }
                }
            }
            catch (e) {
                console.error("Consistent Attachments and Links: \n" + e);
            }
            new obsidian.Notice("Fixing Consistency Complete");
            console.log("Consistent Attachments and Links:\nFixing consistency complete");
            this.renamingIsActive = false;
            if (this.recentlyRenamedFiles && this.recentlyRenamedFiles.length > 0) {
                clearTimeout(this.timerId);
                this.timerId = setTimeout(() => { this.HandleRecentlyRenamedFiles(); }, 500);
            }
        });
    }
    collectAttachmentsCurrentNote(editor, view) {
        return __awaiter(this, void 0, void 0, function* () {
            let note = view.file;
            if (this.isPathIgnored(note.path)) {
                new obsidian.Notice("Note path is ignored");
                return;
            }
            let result = yield this.fh.collectAttachmentsForCachedNote(note.path, this.settings.attachmentsSubfolder, this.settings.deleteExistFilesWhenMoveNote, this.settings.deleteEmptyFolders);
            if (result && result.movedAttachments && result.movedAttachments.length > 0) {
                yield this.lh.updateChangedPathsInNote(note.path, result.movedAttachments);
            }
            if (result.movedAttachments.length == 0)
                new obsidian.Notice("No files found that need to be moved");
            else
                new obsidian.Notice("Moved " + result.movedAttachments.length + " attachment" + (result.movedAttachments.length > 1 ? "s" : ""));
        });
    }
    collectAllAttachments() {
        return __awaiter(this, void 0, void 0, function* () {
            let movedAttachmentsCount = 0;
            let processedNotesCount = 0;
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let result = yield this.fh.collectAttachmentsForCachedNote(note.path, this.settings.attachmentsSubfolder, this.settings.deleteExistFilesWhenMoveNote, this.settings.deleteEmptyFolders);
                    if (result && result.movedAttachments && result.movedAttachments.length > 0) {
                        yield this.lh.updateChangedPathsInNote(note.path, result.movedAttachments);
                        movedAttachmentsCount += result.movedAttachments.length;
                        processedNotesCount++;
                    }
                }
            }
            if (movedAttachmentsCount == 0)
                new obsidian.Notice("No files found that need to be moved");
            else
                new obsidian.Notice("Moved " + movedAttachmentsCount + " attachment" + (movedAttachmentsCount > 1 ? "s" : "")
                    + " from " + processedNotesCount + " note" + (processedNotesCount > 1 ? "s" : ""));
        });
    }
    convertAllEmbedsPathsToRelative() {
        return __awaiter(this, void 0, void 0, function* () {
            let changedEmbedCount = 0;
            let processedNotesCount = 0;
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let result = yield this.lh.convertAllNoteEmbedsPathsToRelative(note.path);
                    if (result && result.length > 0) {
                        changedEmbedCount += result.length;
                        processedNotesCount++;
                    }
                }
            }
            if (changedEmbedCount == 0)
                new obsidian.Notice("No embeds found that need to be converted");
            else
                new obsidian.Notice("Converted " + changedEmbedCount + " embed" + (changedEmbedCount > 1 ? "s" : "")
                    + " from " + processedNotesCount + " note" + (processedNotesCount > 1 ? "s" : ""));
        });
    }
    convertAllLinkPathsToRelative() {
        return __awaiter(this, void 0, void 0, function* () {
            let changedLinksCount = 0;
            let processedNotesCount = 0;
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let result = yield this.lh.convertAllNoteLinksPathsToRelative(note.path);
                    if (result && result.length > 0) {
                        changedLinksCount += result.length;
                        processedNotesCount++;
                    }
                }
            }
            if (changedLinksCount == 0)
                new obsidian.Notice("No links found that need to be converted");
            else
                new obsidian.Notice("Converted " + changedLinksCount + " link" + (changedLinksCount > 1 ? "s" : "")
                    + " from " + processedNotesCount + " note" + (processedNotesCount > 1 ? "s" : ""));
        });
    }
    replaceAllWikilinksWithMarkdownLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            let changedLinksCount = 0;
            let processedNotesCount = 0;
            let notes = this.app.vault.getMarkdownFiles();
            if (notes) {
                for (let note of notes) {
                    if (this.isPathIgnored(note.path))
                        continue;
                    let result = yield this.lh.replaceAllNoteWikilinksWithMarkdownLinks(note.path);
                    if (result && (result.links.length > 0 || result.embeds.length > 0)) {
                        changedLinksCount += result.links.length;
                        changedLinksCount += result.embeds.length;
                        processedNotesCount++;
                    }
                }
            }
            if (changedLinksCount == 0)
                new obsidian.Notice("No wiki links found that need to be replaced");
            else
                new obsidian.Notice("Replaced " + changedLinksCount + " wikilink" + (changedLinksCount > 1 ? "s" : "")
                    + " from " + processedNotesCount + " note" + (processedNotesCount > 1 ? "s" : ""));
        });
    }
    deleteEmptyFolders() {
        this.fh.deleteEmptyFolders("/");
    }
    checkConsistency() {
        return __awaiter(this, void 0, void 0, function* () {
            let badLinks = yield this.lh.getAllBadLinks();
            let badSectionLinks = yield this.lh.getAllBadSectionLinks();
            let badEmbeds = yield this.lh.getAllBadEmbeds();
            let wikiLinks = yield this.lh.getAllWikiLinks();
            let wikiEmbeds = yield this.lh.getAllWikiEmbeds();
            let text = "";
            let badLinksCount = Object.keys(badLinks).length;
            let badEmbedsCount = Object.keys(badEmbeds).length;
            let badSectionLinksCount = Object.keys(badSectionLinks).length;
            let wikiLinksCount = Object.keys(wikiLinks).length;
            let wikiEmbedsCount = Object.keys(wikiEmbeds).length;
            if (badLinksCount > 0) {
                text += "# Bad links (" + badLinksCount + " files)\n";
                for (let note in badLinks) {
                    text += "[" + note + "](" + Utils.normalizePathForLink(note) + "): " + "\n";
                    for (let link of badLinks[note]) {
                        text += "- (line " + (link.position.start.line + 1) + "): `" + link.link + "`\n";
                    }
                    text += "\n\n";
                }
            }
            else {
                text += "# Bad links \n";
                text += "No problems found\n\n";
            }
            if (badSectionLinksCount > 0) {
                text += "\n\n# Bad note link sections (" + badSectionLinksCount + " files)\n";
                for (let note in badSectionLinks) {
                    text += "[" + note + "](" + Utils.normalizePathForLink(note) + "): " + "\n";
                    for (let link of badSectionLinks[note]) {
                        let li = this.lh.splitLinkToPathAndSection(link.link);
                        let section = Utils.normalizeLinkSection(li.section);
                        text += "- (line " + (link.position.start.line + 1) + "): `" + li.link + "#" + section + "`\n";
                    }
                    text += "\n\n";
                }
            }
            else {
                text += "\n\n# Bad note link sections\n";
                text += "No problems found\n\n";
            }
            if (badEmbedsCount > 0) {
                text += "\n\n# Bad embeds (" + badEmbedsCount + " files)\n";
                for (let note in badEmbeds) {
                    text += "[" + note + "](" + Utils.normalizePathForLink(note) + "): " + "\n";
                    for (let link of badEmbeds[note]) {
                        text += "- (line " + (link.position.start.line + 1) + "): `" + link.link + "`\n";
                    }
                    text += "\n\n";
                }
            }
            else {
                text += "\n\n# Bad embeds \n";
                text += "No problems found\n\n";
            }
            if (wikiLinksCount > 0) {
                text += "# Wiki links (" + wikiLinksCount + " files)\n";
                for (let note in wikiLinks) {
                    text += "[" + note + "](" + Utils.normalizePathForLink(note) + "): " + "\n";
                    for (let link of wikiLinks[note]) {
                        text += "- (line " + (link.position.start.line + 1) + "): `" + link.original + "`\n";
                    }
                    text += "\n\n";
                }
            }
            else {
                text += "# Wiki links \n";
                text += "No problems found\n\n";
            }
            if (wikiEmbedsCount > 0) {
                text += "\n\n# Wiki embeds (" + wikiEmbedsCount + " files)\n";
                for (let note in wikiEmbeds) {
                    text += "[" + note + "](" + Utils.normalizePathForLink(note) + "): " + "\n";
                    for (let link of wikiEmbeds[note]) {
                        text += "- (line " + (link.position.start.line + 1) + "): `" + link.original + "`\n";
                    }
                    text += "\n\n";
                }
            }
            else {
                text += "\n\n# Wiki embeds \n";
                text += "No problems found\n\n";
            }
            let notePath = this.settings.consistencyReportFile;
            yield this.app.vault.adapter.write(notePath, text);
            let fileOpened = false;
            this.app.workspace.iterateAllLeaves(leaf => {
                if (leaf.getDisplayText() != "" && notePath.startsWith(leaf.getDisplayText())) {
                    fileOpened = true;
                }
            });
            if (!fileOpened)
                this.app.workspace.openLinkText(notePath, "/", false);
        });
    }
    reorganizeVault() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.replaceAllWikilinksWithMarkdownLinks();
            yield this.convertAllEmbedsPathsToRelative();
            yield this.convertAllLinkPathsToRelative();
            //- Rename all attachments (using Unique attachments, optional)
            yield this.collectAllAttachments();
            yield this.deleteEmptyFolders();
            new obsidian.Notice("Reorganization of the vault completed");
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
            this.lh = new LinksHandler(this.app, "Consistent Attachments and Links: ", this.settings.ignoreFolders, this.settings.ignoreFilesRegex);
            this.fh = new FilesHandler(this.app, this.lh, "Consistent Attachments and Links: ", this.settings.ignoreFolders, this.settings.ignoreFilesRegex);
        });
    }
}

module.exports = ConsistentAttachmentsAndLinks;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy91dGlscy50cyIsInNyYy9wYXRoLnRzIiwic3JjL2xpbmtzLWhhbmRsZXIudHMiLCJzcmMvZmlsZXMtaGFuZGxlci50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBub3JtYWxpemVQYXRoLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCB9IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IENvbnNpc3RlbnRBdHRhY2htZW50c0FuZExpbmtzIGZyb20gJy4vbWFpbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBsdWdpblNldHRpbmdzIHtcclxuICAgIG1vdmVBdHRhY2htZW50c1dpdGhOb3RlOiBib29sZWFuO1xyXG4gICAgZGVsZXRlQXR0YWNobWVudHNXaXRoTm90ZTogYm9vbGVhbjtcclxuICAgIHVwZGF0ZUxpbmtzOiBib29sZWFuO1xyXG4gICAgZGVsZXRlRW1wdHlGb2xkZXJzOiBib29sZWFuO1xyXG4gICAgZGVsZXRlRXhpc3RGaWxlc1doZW5Nb3ZlTm90ZTogYm9vbGVhbjtcclxuICAgIGNoYW5nZU5vdGVCYWNrbGlua3NBbHQ6IGJvb2xlYW47XHJcbiAgICBpZ25vcmVGb2xkZXJzOiBzdHJpbmdbXTtcclxuICAgIGlnbm9yZUZpbGVzOiBzdHJpbmdbXTtcclxuICAgIGlnbm9yZUZpbGVzUmVnZXg6IFJlZ0V4cFtdO1xyXG4gICAgYXR0YWNobWVudHNTdWJmb2xkZXI6IHN0cmluZztcclxuICAgIGNvbnNpc3RlbmN5UmVwb3J0RmlsZTogc3RyaW5nO1xyXG4gICAgdXNlQnVpbHRJbk9ic2lkaWFuTGlua0NhY2hpbmc6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcclxuICAgIG1vdmVBdHRhY2htZW50c1dpdGhOb3RlOiB0cnVlLFxyXG4gICAgZGVsZXRlQXR0YWNobWVudHNXaXRoTm90ZTogdHJ1ZSxcclxuICAgIHVwZGF0ZUxpbmtzOiB0cnVlLFxyXG4gICAgZGVsZXRlRW1wdHlGb2xkZXJzOiB0cnVlLFxyXG4gICAgZGVsZXRlRXhpc3RGaWxlc1doZW5Nb3ZlTm90ZTogdHJ1ZSxcclxuICAgIGNoYW5nZU5vdGVCYWNrbGlua3NBbHQ6IGZhbHNlLFxyXG4gICAgaWdub3JlRm9sZGVyczogW1wiLmdpdC9cIiwgXCIub2JzaWRpYW4vXCJdLFxyXG4gICAgaWdub3JlRmlsZXM6IFtcImNvbnNpc3RlbmN5XFxcXC1yZXBvcnRcXFxcLm1kXCJdLFxyXG4gICAgaWdub3JlRmlsZXNSZWdleDogWy9jb25zaXN0ZW5jeVxcLXJlcG9ydFxcLm1kL10sXHJcbiAgICBhdHRhY2htZW50c1N1YmZvbGRlcjogXCJcIixcclxuICAgIGNvbnNpc3RlbmN5UmVwb3J0RmlsZTogXCJjb25zaXN0ZW5jeS1yZXBvcnQubWRcIixcclxuICAgIHVzZUJ1aWx0SW5PYnNpZGlhbkxpbmtDYWNoaW5nOiBmYWxzZSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuICAgIHBsdWdpbjogQ29uc2lzdGVudEF0dGFjaG1lbnRzQW5kTGlua3M7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ29uc2lzdGVudEF0dGFjaG1lbnRzQW5kTGlua3MpIHtcclxuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywgeyB0ZXh0OiAnQ29uc2lzdGVudCBhdHRhY2htZW50cyBhbmQgbGlua3MgLSBTZXR0aW5ncycgfSk7XHJcblxyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUoJ01vdmUgQXR0YWNobWVudHMgd2l0aCBOb3RlJylcclxuICAgICAgICAgICAgLnNldERlc2MoJ0F1dG9tYXRpY2FsbHkgbW92ZSBhdHRhY2htZW50cyB3aGVuIGEgbm90ZSBpcyByZWxvY2F0ZWQuIFRoaXMgaW5jbHVkZXMgYXR0YWNobWVudHMgbG9jYXRlZCBpbiB0aGUgc2FtZSBmb2xkZXIgb3IgYW55IG9mIGl0cyBzdWJmb2xkZXJzLicpXHJcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW92ZUF0dGFjaG1lbnRzV2l0aE5vdGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW92ZUF0dGFjaG1lbnRzV2l0aE5vdGUpKTtcclxuXHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZSgnRGVsZXRlIFVudXNlZCBBdHRhY2htZW50cyB3aXRoIE5vdGUnKVxyXG4gICAgICAgICAgICAuc2V0RGVzYygnQXV0b21hdGljYWxseSByZW1vdmUgYXR0YWNobWVudHMgdGhhdCBhcmUgbm8gbG9uZ2VyIHJlZmVyZW5jZWQgaW4gb3RoZXIgbm90ZXMgd2hlbiB0aGUgbm90ZSBpcyBkZWxldGVkLicpXHJcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsZXRlQXR0YWNobWVudHNXaXRoTm90ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxldGVBdHRhY2htZW50c1dpdGhOb3RlKSk7XHJcblxyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUoJ1VwZGF0ZSBMaW5rcycpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKCdBdXRvbWF0aWNhbGx5IHVwZGF0ZSBsaW5rcyB0byBhdHRhY2htZW50cyBhbmQgb3RoZXIgbm90ZXMgd2hlbiBtb3Zpbmcgbm90ZXMgb3IgYXR0YWNobWVudHMuJylcclxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGRhdGVMaW5rcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGRhdGVMaW5rcykpO1xyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUoJ0RlbGV0ZSBFbXB0eSBGb2xkZXJzJylcclxuICAgICAgICAgICAgLnNldERlc2MoJ0F1dG9tYXRpY2FsbHkgcmVtb3ZlIGVtcHR5IGZvbGRlcnMgYWZ0ZXIgbW92aW5nIG5vdGVzIHdpdGggYXR0YWNobWVudHMuJylcclxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxldGVFbXB0eUZvbGRlcnMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsZXRlRW1wdHlGb2xkZXJzKSk7XHJcblxyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUoJ0RlbGV0ZSBEdXBsaWNhdGUgQXR0YWNobWVudHMgb24gTm90ZSBNb3ZlJylcclxuICAgICAgICAgICAgLnNldERlc2MoJ0F1dG9tYXRpY2FsbHkgZGVsZXRlIGF0dGFjaG1lbnRzIHdoZW4gbW92aW5nIGEgbm90ZSBpZiBhIGZpbGUgd2l0aCB0aGUgc2FtZSBuYW1lIGV4aXN0cyBpbiB0aGUgZGVzdGluYXRpb24gZm9sZGVyLiBJZiBkaXNhYmxlZCwgdGhlIGZpbGUgd2lsbCBiZSByZW5hbWVkIGFuZCBtb3ZlZC4nKVxyXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+IGNiLm9uQ2hhbmdlKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZUV4aXN0RmlsZXNXaGVuTW92ZU5vdGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsZXRlRXhpc3RGaWxlc1doZW5Nb3ZlTm90ZSkpO1xyXG5cclxuXHJcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKCdVcGRhdGUgQmFja2xpbmsgVGV4dCBvbiBOb3RlIFJlbmFtZScpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKCdXaGVuIGEgbm90ZSBpcyByZW5hbWVkLCBpdHMgbGlua2VkIHJlZmVyZW5jZXMgYXJlIGF1dG9tYXRpY2FsbHkgdXBkYXRlZC4gSWYgdGhpcyBvcHRpb24gaXMgZW5hYmxlZCwgdGhlIHRleHQgb2YgYmFja2xpbmtzIHRvIHRoaXMgbm90ZSB3aWxsIGFsc28gYmUgbW9kaWZpZWQuJylcclxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jaGFuZ2VOb3RlQmFja2xpbmtzQWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNoYW5nZU5vdGVCYWNrbGlua3NBbHQpKTtcclxuXHJcblxyXG5cclxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAgICAgLnNldE5hbWUoXCJJZ25vcmUgRm9sZGVyc1wiKVxyXG4gICAgICAgICAgICAuc2V0RGVzYyhcIlNwZWNpZnkgYSBsaXN0IG9mIGZvbGRlcnMgdG8gaWdub3JlLiBFbnRlciBlYWNoIGZvbGRlciBvbiBhIG5ldyBsaW5lLlwiKVxyXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkV4YW1wbGU6IC5naXQsIC5vYnNpZGlhblwiKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZUZvbGRlcnMuam9pbihcIlxcblwiKSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZ2V0Tm9ybWFsaXplZFBhdGgodmFsdWUpICsgXCIvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZUZvbGRlcnMgPSBwYXRocztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKFwiSWdub3JlIEZpbGVzXCIpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKFwiU3BlY2lmeSBhIGxpc3Qgb2YgZmlsZXMgdG8gaWdub3JlLiBFbnRlciBlYWNoIGZpbGUgb24gYSBuZXcgbGluZS5cIilcclxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJFeGFtcGxlOiBjb25zaXN0YW50LXJlcG9ydC5tZFwiKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZUZpbGVzLmpvaW4oXCJcXG5cIikpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZUZpbGVzID0gcGF0aHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRmlsZXNSZWdleCA9IHBhdGhzLm1hcChmaWxlID0+IFJlZ0V4cChmaWxlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZShcIkF0dGFjaG1lbnQgU3ViZm9sZGVyXCIpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKFwiU3BlY2lmeSB0aGUgc3ViZm9sZGVyIHdpdGhpbiB0aGUgbm90ZSBmb2xkZXIgdG8gY29sbGVjdCBhdHRhY2htZW50cyBpbnRvIHdoZW4gdXNpbmcgdGhlIFxcXCJDb2xsZWN0IEFsbCBBdHRhY2htZW50c1xcXCIgaG90a2V5LiBMZWF2ZSBlbXB0eSB0byBjb2xsZWN0IGF0dGFjaG1lbnRzIGRpcmVjdGx5IGludG8gdGhlIG5vdGUgZm9sZGVyLiBZb3UgY2FuIHVzZSAke2ZpbGVuYW1lfSBhcyBhIHBsYWNlaG9sZGVyIGZvciB0aGUgY3VycmVudCBub3RlIG5hbWUuXCIpXHJcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiXHJcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJFeGFtcGxlOiBfYXR0YWNobWVudHNcIilcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdHRhY2htZW50c1N1YmZvbGRlcilcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdHRhY2htZW50c1N1YmZvbGRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuXHJcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgICAgIC5zZXROYW1lKFwiQ29uc2lzdGVuY3kgUmVwb3J0IEZpbGVuYW1lXCIpXHJcbiAgICAgICAgICAgIC5zZXREZXNjKFwiU3BlY2lmeSB0aGUgbmFtZSBvZiB0aGUgZmlsZSBmb3IgdGhlIGNvbnNpc3RlbmN5IHJlcG9ydC5cIilcclxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcclxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkV4YW1wbGU6IGNvbnNpc3RlbmN5LXJlcG9ydC5tZFwiKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbnNpc3RlbmN5UmVwb3J0RmlsZSlcclxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb25zaXN0ZW5jeVJlcG9ydEZpbGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgICAgICAuc2V0TmFtZShcIkVYUEVSSU1FTlRBTDogVXNlIEJ1aWx0LWluIE9ic2lkaWFuIExpbmsgQ2FjaGluZyBmb3IgTW92ZWQgTm90ZXNcIilcclxuICAgICAgICAgICAgLnNldERlc2MoXCJFbmFibGUgdGhpcyBvcHRpb24gdG8gdXNlIHRoZSBleHBlcmltZW50YWwgYnVpbHQtaW4gT2JzaWRpYW4gbGluayBjYWNoaW5nIGZvciBwcm9jZXNzaW5nIG1vdmVkIG5vdGVzLiBUdXJuIGl0IG9mZiBpZiB0aGUgcGx1Z2luIG1pc2JlaGF2ZXMuXCIpXHJcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQnVpbHRJbk9ic2lkaWFuTGlua0NhY2hpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQnVpbHRJbk9ic2lkaWFuTGlua0NhY2hpbmcpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3JtYWxpemVkUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmxlbmd0aCA9PSAwID8gcGF0aCA6IG5vcm1hbGl6ZVBhdGgocGF0aCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuXHJcblx0c3RhdGljIGFzeW5jIGRlbGF5KG1zOiBudW1iZXIpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgbm9ybWFsaXplUGF0aEZvckZpbGUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcXFwvZ2ksIFwiL1wiKTsgLy9yZXBsYWNlIFxcIHRvIC9cclxuXHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoLyUyMC9naSwgXCIgXCIpOyAvL3JlcGxhY2UgJTIwIHRvIHNwYWNlXHJcblx0XHRyZXR1cm4gcGF0aDtcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgbm9ybWFsaXplUGF0aEZvckxpbmsocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcXFwvZ2ksIFwiL1wiKTsgLy9yZXBsYWNlIFxcIHRvIC9cclxuXHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoLyAvZ2ksIFwiJTIwXCIpOyAvL3JlcGxhY2Ugc3BhY2UgdG8gJTIwXHJcblx0XHRyZXR1cm4gcGF0aDtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBub3JtYWxpemVMaW5rU2VjdGlvbihzZWN0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0c2VjdGlvbiA9IGRlY29kZVVSSShzZWN0aW9uKTtcclxuXHRcdHJldHVybiBzZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGFzeW5jIGdldENhY2hlU2FmZShmaWxlT3JQYXRoOiBURmlsZSB8IHN0cmluZykge1xyXG5cdFx0Y29uc3QgZmlsZSA9IFV0aWxzLmdldEZpbGVPck51bGwoZmlsZU9yUGF0aCk7XHJcblx0XHRpZiAoIWZpbGUpIHtcclxuXHRcdFx0cmV0dXJuIHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xyXG5cdFx0XHRpZiAoY2FjaGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XHJcblx0XHRcdH1cclxuXHRcclxuXHRcdFx0YXdhaXQgVXRpbHMuZGVsYXkoMTAwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRGaWxlT3JOdWxsKGZpbGVPclBhdGg6IFRGaWxlIHwgc3RyaW5nKTogVEZpbGUgfCBudWxsIHtcclxuXHRcdGlmIChmaWxlT3JQYXRoIGluc3RhbmNlb2YgVEZpbGUpIHtcclxuXHRcdFx0cmV0dXJuIGZpbGVPclBhdGg7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgYWJzdHJhY3RGaWxlID0gYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmaWxlT3JQYXRoKTtcclxuXHRcdGlmICghYWJzdHJhY3RGaWxlKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghKGFic3RyYWN0RmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xyXG5cdFx0XHR0aHJvdyBgJHtmaWxlT3JQYXRofSBpcyBub3QgYSBmaWxlYDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYWJzdHJhY3RGaWxlO1xyXG5cdH1cclxufSIsImV4cG9ydCBjbGFzcyBwYXRoIHtcclxuICAgIHN0YXRpYyBqb2luKC4uLnBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJy4nO1xyXG4gICAgICAgIHZhciBqb2luZWQ7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoam9pbmVkID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgam9pbmVkID0gYXJnO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGpvaW5lZCArPSAnLycgKyBhcmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpvaW5lZCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gJy4nO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l4Tm9ybWFsaXplKGpvaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpcm5hbWUocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gJy4nO1xyXG4gICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIHZhciBoYXNSb290ID0gY29kZSA9PT0gNDcgLyovKi87XHJcbiAgICAgICAgdmFyIGVuZCA9IC0xO1xyXG4gICAgICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XHJcbiAgICAgICAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3JcclxuICAgICAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XHJcbiAgICAgICAgaWYgKGhhc1Jvb3QgJiYgZW5kID09PSAxKSByZXR1cm4gJy8vJztcclxuICAgICAgICByZXR1cm4gcGF0aC5zbGljZSgwLCBlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBiYXNlbmFtZShwYXRoOiBzdHJpbmcsIGV4dD86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZXh0ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJleHRcIiBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJyk7XHJcblxyXG4gICAgICAgIHZhciBzdGFydCA9IDA7XHJcbiAgICAgICAgdmFyIGVuZCA9IC0xO1xyXG4gICAgICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xyXG4gICAgICAgIHZhciBpO1xyXG5cclxuICAgICAgICBpZiAoZXh0ICE9PSB1bmRlZmluZWQgJiYgZXh0Lmxlbmd0aCA+IDAgJiYgZXh0Lmxlbmd0aCA8PSBwYXRoLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoZXh0Lmxlbmd0aCA9PT0gcGF0aC5sZW5ndGggJiYgZXh0ID09PSBwYXRoKSByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHZhciBleHRJZHggPSBleHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgdmFyIGZpcnN0Tm9uU2xhc2hFbmQgPSAtMTtcclxuICAgICAgICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0Tm9uU2xhc2hFbmQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCByZW1lbWJlciB0aGlzIGluZGV4IGluIGNhc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgbmVlZCBpdCBpZiB0aGUgZXh0ZW5zaW9uIGVuZHMgdXAgbm90IG1hdGNoaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5vblNsYXNoRW5kID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHRJZHggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gbWF0Y2ggdGhlIGV4cGxpY2l0IGV4dGVuc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSA9PT0gZXh0LmNoYXJDb2RlQXQoZXh0SWR4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tZXh0SWR4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIG1hdGNoZWQgdGhlIGV4dGVuc2lvbiwgc28gbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyIHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0ZW5zaW9uIGRvZXMgbm90IG1hdGNoLCBzbyBvdXIgcmVzdWx0IGlzIHRoZSBlbnRpcmUgcGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRJZHggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGZpcnN0Tm9uU2xhc2hFbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGFydCA9PT0gZW5kKSBlbmQgPSBmaXJzdE5vblNsYXNoRW5kOyBlbHNlIGlmIChlbmQgPT09IC0xKSBlbmQgPSBwYXRoLmxlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIHBhdGguc2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcclxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGV4dG5hbWUocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0RG90ID0gLTE7XHJcbiAgICAgICAgdmFyIHN0YXJ0UGFydCA9IDA7XHJcbiAgICAgICAgdmFyIGVuZCA9IC0xO1xyXG4gICAgICAgIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xyXG4gICAgICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcclxuICAgICAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxyXG4gICAgICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICAgICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcclxuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbmQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXHJcbiAgICAgICAgICAgICAgICAvLyBleHRlbnNpb25cclxuICAgICAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gaSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREb3QgPSBpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlRG90U3RhdGUgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcclxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXHJcbiAgICAgICAgICAgICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xIHx8IGVuZCA9PT0gLTEgfHxcclxuICAgICAgICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcclxuICAgICAgICAgICAgcHJlRG90U3RhdGUgPT09IDAgfHxcclxuICAgICAgICAgICAgLy8gVGhlIChyaWdodC1tb3N0KSB0cmltbWVkIHBhdGggY29tcG9uZW50IGlzIGV4YWN0bHkgJy4uJ1xyXG4gICAgICAgICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc3RhdGljIHBhcnNlKHBhdGg6IHN0cmluZykge1xyXG5cclxuICAgICAgICB2YXIgcmV0ID0geyByb290OiAnJywgZGlyOiAnJywgYmFzZTogJycsIGV4dDogJycsIG5hbWU6ICcnIH07XHJcbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSByZXR1cm4gcmV0O1xyXG4gICAgICAgIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIHZhciBpc0Fic29sdXRlID0gY29kZSA9PT0gNDcgLyovKi87XHJcbiAgICAgICAgdmFyIHN0YXJ0O1xyXG4gICAgICAgIGlmIChpc0Fic29sdXRlKSB7XHJcbiAgICAgICAgICAgIHJldC5yb290ID0gJy8nO1xyXG4gICAgICAgICAgICBzdGFydCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhcnREb3QgPSAtMTtcclxuICAgICAgICB2YXIgc3RhcnRQYXJ0ID0gMDtcclxuICAgICAgICB2YXIgZW5kID0gLTE7XHJcbiAgICAgICAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XHJcbiAgICAgICAgdmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcclxuICAgICAgICAvLyBhZnRlciBhbnkgcGF0aCBzZXBhcmF0b3Igd2UgZmluZFxyXG4gICAgICAgIHZhciBwcmVEb3RTdGF0ZSA9IDA7XHJcblxyXG4gICAgICAgIC8vIEdldCBub24tZGlyIGluZm9cclxuICAgICAgICBmb3IgKDsgaSA+PSBzdGFydDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjb2RlID09PSA0NyAvKi8qLykge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcclxuICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBhcnQgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbmQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXHJcbiAgICAgICAgICAgICAgICAvLyBleHRlbnNpb25cclxuICAgICAgICAgICAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gaSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cclxuICAgICAgICAgICAgICAgIGlmIChzdGFydERvdCA9PT0gLTEpIHN0YXJ0RG90ID0gaTsgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpIHByZURvdFN0YXRlID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydERvdCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgYW5kIG5vbi1wYXRoIHNlcGFyYXRvciBiZWZvcmUgb3VyIGRvdCwgc28gd2Ugc2hvdWxkXHJcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGEgZ29vZCBjaGFuY2UgYXQgaGF2aW5nIGEgbm9uLWVtcHR5IGV4dGVuc2lvblxyXG4gICAgICAgICAgICAgICAgcHJlRG90U3RhdGUgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSB8fCBlbmQgPT09IC0xIHx8XHJcbiAgICAgICAgICAgIC8vIFdlIHNhdyBhIG5vbi1kb3QgY2hhcmFjdGVyIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgZG90XHJcbiAgICAgICAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XHJcbiAgICAgICAgICAgIC8vIFRoZSAocmlnaHQtbW9zdCkgdHJpbW1lZCBwYXRoIGNvbXBvbmVudCBpcyBleGFjdGx5ICcuLidcclxuICAgICAgICAgICAgcHJlRG90U3RhdGUgPT09IDEgJiYgc3RhcnREb3QgPT09IGVuZCAtIDEgJiYgc3RhcnREb3QgPT09IHN0YXJ0UGFydCArIDEpIHtcclxuICAgICAgICAgICAgaWYgKGVuZCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydFBhcnQgPT09IDAgJiYgaXNBYnNvbHV0ZSkgcmV0LmJhc2UgPSByZXQubmFtZSA9IHBhdGguc2xpY2UoMSwgZW5kKTsgZWxzZSByZXQuYmFzZSA9IHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3RhcnRQYXJ0ID09PSAwICYmIGlzQWJzb2x1dGUpIHtcclxuICAgICAgICAgICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZSgxLCBzdGFydERvdCk7XHJcbiAgICAgICAgICAgICAgICByZXQuYmFzZSA9IHBhdGguc2xpY2UoMSwgZW5kKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldC5uYW1lID0gcGF0aC5zbGljZShzdGFydFBhcnQsIHN0YXJ0RG90KTtcclxuICAgICAgICAgICAgICAgIHJldC5iYXNlID0gcGF0aC5zbGljZShzdGFydFBhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0LmV4dCA9IHBhdGguc2xpY2Uoc3RhcnREb3QsIGVuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RhcnRQYXJ0ID4gMCkgcmV0LmRpciA9IHBhdGguc2xpY2UoMCwgc3RhcnRQYXJ0IC0gMSk7IGVsc2UgaWYgKGlzQWJzb2x1dGUpIHJldC5kaXIgPSAnLyc7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgc3RhdGljIHBvc2l4Tm9ybWFsaXplKHBhdGg6IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XHJcblxyXG4gICAgICAgIHZhciBpc0Fic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcclxuICAgICAgICB2YXIgdHJhaWxpbmdTZXBhcmF0b3IgPSBwYXRoLmNoYXJDb2RlQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gNDcgLyovKi87XHJcblxyXG4gICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxyXG4gICAgICAgIHBhdGggPSB0aGlzLm5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGgsICFpc0Fic29sdXRlKTtcclxuXHJcbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwICYmICFpc0Fic29sdXRlKSBwYXRoID0gJy4nO1xyXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDAgJiYgdHJhaWxpbmdTZXBhcmF0b3IpIHBhdGggKz0gJy8nO1xyXG5cclxuICAgICAgICBpZiAoaXNBYnNvbHV0ZSkgcmV0dXJuICcvJyArIHBhdGg7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG5vcm1hbGl6ZVN0cmluZ1Bvc2l4KHBhdGg6IHN0cmluZywgYWxsb3dBYm92ZVJvb3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICB2YXIgcmVzID0gJyc7XHJcbiAgICAgICAgdmFyIGxhc3RTZWdtZW50TGVuZ3RoID0gMDtcclxuICAgICAgICB2YXIgbGFzdFNsYXNoID0gLTE7XHJcbiAgICAgICAgdmFyIGRvdHMgPSAwO1xyXG4gICAgICAgIHZhciBjb2RlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHBhdGgubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGkgPCBwYXRoLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPT09IDQ3IC8qLyovKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNvZGUgPSA0NyAvKi8qLztcclxuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNsYXNoID09PSBpIC0gMSB8fCBkb3RzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9PUFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0U2xhc2ggIT09IGkgLSAxICYmIGRvdHMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA8IDIgfHwgbGFzdFNlZ21lbnRMZW5ndGggIT09IDIgfHwgcmVzLmNoYXJDb2RlQXQocmVzLmxlbmd0aCAtIDEpICE9PSA0NiAvKi4qLyB8fCByZXMuY2hhckNvZGVBdChyZXMubGVuZ3RoIC0gMikgIT09IDQ2IC8qLiovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RTbGFzaEluZGV4ID0gcmVzLmxhc3RJbmRleE9mKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFNsYXNoSW5kZXggIT09IHJlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTbGFzaEluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHJlcy5zbGljZSgwLCBsYXN0U2xhc2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50TGVuZ3RoID0gcmVzLmxlbmd0aCAtIDEgLSByZXMubGFzdEluZGV4T2YoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNsYXNoID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMubGVuZ3RoID09PSAyIHx8IHJlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNsYXNoID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93QWJvdmVSb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyArPSAnLy4uJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gJy4uJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgKz0gJy8nICsgcGF0aC5zbGljZShsYXN0U2xhc2ggKyAxLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IHBhdGguc2xpY2UobGFzdFNsYXNoICsgMSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRMZW5ndGggPSBpIC0gbGFzdFNsYXNoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RTbGFzaCA9IGk7XHJcbiAgICAgICAgICAgICAgICBkb3RzID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSA0NiAvKi4qLyAmJiBkb3RzICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgKytkb3RzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG90cyA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBvc2l4UmVzb2x2ZSguLi5hcmdzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHZhciByZXNvbHZlZFBhdGggPSAnJztcclxuICAgICAgICB2YXIgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBjd2Q7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSBhcmdzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgcGF0aDtcclxuICAgICAgICAgICAgaWYgKGkgPj0gMClcclxuICAgICAgICAgICAgICAgIHBhdGggPSBhcmdzW2ldO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjd2QgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGN3ZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIFNraXAgZW1wdHkgZW50cmllc1xyXG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xyXG4gICAgICAgICAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQ29kZUF0KDApID09PSA0NyAvKi8qLztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcclxuICAgICAgICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXHJcbiAgICAgICAgcmVzb2x2ZWRQYXRoID0gdGhpcy5ub3JtYWxpemVTdHJpbmdQb3NpeChyZXNvbHZlZFBhdGgsICFyZXNvbHZlZEFic29sdXRlKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc29sdmVkQWJzb2x1dGUpIHtcclxuICAgICAgICAgICAgaWYgKHJlc29sdmVkUGF0aC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcvJyArIHJlc29sdmVkUGF0aDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcvJztcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc29sdmVkUGF0aC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlZFBhdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcuJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbGF0aXZlKGZyb206IHN0cmluZywgdG86IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcclxuXHJcbiAgICAgICAgZnJvbSA9IHRoaXMucG9zaXhSZXNvbHZlKGZyb20pO1xyXG4gICAgICAgIHRvID0gdGhpcy5wb3NpeFJlc29sdmUodG8pO1xyXG5cclxuICAgICAgICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiAnJztcclxuXHJcbiAgICAgICAgLy8gVHJpbSBhbnkgbGVhZGluZyBiYWNrc2xhc2hlc1xyXG4gICAgICAgIHZhciBmcm9tU3RhcnQgPSAxO1xyXG4gICAgICAgIGZvciAoOyBmcm9tU3RhcnQgPCBmcm9tLmxlbmd0aDsgKytmcm9tU3RhcnQpIHtcclxuICAgICAgICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQpICE9PSA0NyAvKi8qLylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZnJvbUVuZCA9IGZyb20ubGVuZ3RoO1xyXG4gICAgICAgIHZhciBmcm9tTGVuID0gZnJvbUVuZCAtIGZyb21TdGFydDtcclxuXHJcbiAgICAgICAgLy8gVHJpbSBhbnkgbGVhZGluZyBiYWNrc2xhc2hlc1xyXG4gICAgICAgIHZhciB0b1N0YXJ0ID0gMTtcclxuICAgICAgICBmb3IgKDsgdG9TdGFydCA8IHRvLmxlbmd0aDsgKyt0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIGlmICh0by5jaGFyQ29kZUF0KHRvU3RhcnQpICE9PSA0NyAvKi8qLylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdG9FbmQgPSB0by5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRvTGVuID0gdG9FbmQgLSB0b1N0YXJ0O1xyXG5cclxuICAgICAgICAvLyBDb21wYXJlIHBhdGhzIHRvIGZpbmQgdGhlIGxvbmdlc3QgY29tbW9uIHBhdGggZnJvbSByb290XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGZyb21MZW4gPCB0b0xlbiA/IGZyb21MZW4gOiB0b0xlbjtcclxuICAgICAgICB2YXIgbGFzdENvbW1vblNlcCA9IC0xO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKDsgaSA8PSBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9MZW4gPiBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSkgPT09IDQ3IC8qLyovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgdG9gLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvby9iYXInOyB0bz0nL2Zvby9iYXIvYmF6J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCArIGkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYGZyb21gIGlzIHRoZSByb290XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvJzsgdG89Jy9mb28nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0ICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmcm9tTGVuID4gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyb20uY2hhckNvZGVBdChmcm9tU3RhcnQgKyBpKSA9PT0gNDcgLyovKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgZnJvbWAuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vL2Jhci9iYXonOyB0bz0nL2Zvby9iYXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDb21tb25TZXAgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBnZXQgaGVyZSBpZiBgdG9gIGlzIHRoZSByb290LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvbyc7IHRvPScvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Q29tbW9uU2VwID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZnJvbUNvZGUgPSBmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSk7XHJcbiAgICAgICAgICAgIHZhciB0b0NvZGUgPSB0by5jaGFyQ29kZUF0KHRvU3RhcnQgKyBpKTtcclxuICAgICAgICAgICAgaWYgKGZyb21Db2RlICE9PSB0b0NvZGUpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZWxzZSBpZiAoZnJvbUNvZGUgPT09IDQ3IC8qLyovKVxyXG4gICAgICAgICAgICAgICAgbGFzdENvbW1vblNlcCA9IGk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb3V0ID0gJyc7XHJcbiAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHJlbGF0aXZlIHBhdGggYmFzZWQgb24gdGhlIHBhdGggZGlmZmVyZW5jZSBiZXR3ZWVuIGB0b2BcclxuICAgICAgICAvLyBhbmQgYGZyb21gXHJcbiAgICAgICAgZm9yIChpID0gZnJvbVN0YXJ0ICsgbGFzdENvbW1vblNlcCArIDE7IGkgPD0gZnJvbUVuZDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSBmcm9tRW5kIHx8IGZyb20uY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChvdXQubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIG91dCArPSAnLi4nO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG91dCArPSAnLy4uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTGFzdGx5LCBhcHBlbmQgdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uIChgdG9gKSBwYXRoIHRoYXQgY29tZXMgYWZ0ZXJcclxuICAgICAgICAvLyB0aGUgY29tbW9uIHBhdGggcGFydHNcclxuICAgICAgICBpZiAob3V0Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHJldHVybiBvdXQgKyB0by5zbGljZSh0b1N0YXJ0ICsgbGFzdENvbW1vblNlcCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRvU3RhcnQgKz0gbGFzdENvbW1vblNlcDtcclxuICAgICAgICAgICAgaWYgKHRvLmNoYXJDb2RlQXQodG9TdGFydCkgPT09IDQ3IC8qLyovKVxyXG4gICAgICAgICAgICAgICAgKyt0b1N0YXJ0O1xyXG4gICAgICAgICAgICByZXR1cm4gdG8uc2xpY2UodG9TdGFydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwLCBUQWJzdHJhY3RGaWxlLCBURmlsZSwgRW1iZWRDYWNoZSwgTGlua0NhY2hlLCBQb3MgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IHBhdGggfSBmcm9tICcuL3BhdGgnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXRoQ2hhbmdlSW5mbyB7XHJcblx0b2xkUGF0aDogc3RyaW5nLFxyXG5cdG5ld1BhdGg6IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbWJlZENoYW5nZUluZm8ge1xyXG5cdG9sZDogRW1iZWRDYWNoZSxcclxuXHRuZXdMaW5rOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGlua0NoYW5nZUluZm8ge1xyXG5cdG9sZDogTGlua0NhY2hlLFxyXG5cdG5ld0xpbms6IHN0cmluZyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5rc0FuZEVtYmVkc0NoYW5nZWRJbmZvIHtcclxuXHRlbWJlZHM6IEVtYmVkQ2hhbmdlSW5mb1tdXHJcblx0bGlua3M6IExpbmtDaGFuZ2VJbmZvW11cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGlua1NlY3Rpb25JbmZvIHtcclxuXHRoYXNTZWN0aW9uOiBib29sZWFuXHJcblx0bGluazogc3RyaW5nXHJcblx0c2VjdGlvbjogc3RyaW5nXHJcbn1cclxuXHJcblxyXG4vL3NpbXBsZSByZWdleFxyXG4vLyBjb25zdCBtYXJrZG93bkxpbmtPckVtYmVkUmVnZXhTaW1wbGUgPSAvXFxbKC4qPylcXF1cXCgoLio/KVxcKS9naW1cclxuLy8gY29uc3QgbWFya2Rvd25MaW5rUmVnZXhTaW1wbGUgPSAvKD88IVxcISlcXFsoLio/KVxcXVxcKCguKj8pXFwpL2dpbTtcclxuLy8gY29uc3QgbWFya2Rvd25FbWJlZFJlZ2V4U2ltcGxlID0gL1xcIVxcWyguKj8pXFxdXFwoKC4qPylcXCkvZ2ltXHJcblxyXG4vLyBjb25zdCB3aWtpTGlua09yRW1iZWRSZWdleFNpbXBsZSA9IC9cXFtcXFsoLio/KVxcXVxcXS9naW1cclxuLy8gY29uc3Qgd2lraUxpbmtSZWdleFNpbXBsZSA9IC8oPzwhXFwhKVxcW1xcWyguKj8pXFxdXFxdL2dpbTtcclxuLy8gY29uc3Qgd2lraUVtYmVkUmVnZXhTaW1wbGUgPSAvXFwhXFxbXFxbKC4qPylcXF1cXF0vZ2ltXHJcblxyXG4vL3dpdGggZXNjYXBpbmcgXFwgY2hhcmFjdGVyc1xyXG5jb25zdCBtYXJrZG93bkxpbmtPckVtYmVkUmVnZXhHID0gLyg/PCFcXFxcKVxcWyguKj8pKD88IVxcXFwpXFxdXFwoKC4qPykoPzwhXFxcXClcXCkvZ2ltXHJcbmNvbnN0IG1hcmtkb3duTGlua1JlZ2V4RyA9IC8oPzwhXFwhKSg/PCFcXFxcKVxcWyguKj8pKD88IVxcXFwpXFxdXFwoKC4qPykoPzwhXFxcXCkoPzojKC4qPykpP1xcKS9naW07XHJcbmNvbnN0IG1hcmtkb3duRW1iZWRSZWdleEcgPSAvKD88IVxcXFwpXFwhXFxbKC4qPykoPzwhXFxcXClcXF1cXCgoLio/KSg/PCFcXFxcKVxcKS9naW1cclxuXHJcbmNvbnN0IHdpa2lMaW5rT3JFbWJlZFJlZ2V4RyA9IC8oPzwhXFxcXClcXFtcXFsoLio/KSg/PCFcXFxcKVxcXVxcXS9naW1cclxuY29uc3Qgd2lraUxpbmtSZWdleEcgPSAvKD88IVxcISkoPzwhXFxcXClcXFtcXFsoLio/KSg/PCFcXFxcKVxcXVxcXS9naW07XHJcbmNvbnN0IHdpa2lFbWJlZFJlZ2V4RyA9IC8oPzwhXFxcXClcXCFcXFtcXFsoLio/KSg/PCFcXFxcKVxcXVxcXS9naW1cclxuXHJcbmNvbnN0IG1hcmtkb3duTGlua09yRW1iZWRSZWdleCA9IC8oPzwhXFxcXClcXFsoLio/KSg/PCFcXFxcKVxcXVxcKCguKj8pKD88IVxcXFwpXFwpL2ltXHJcbmNvbnN0IG1hcmtkb3duTGlua1JlZ2V4ID0gLyg/PCFcXCEpKD88IVxcXFwpXFxbKC4qPykoPzwhXFxcXClcXF1cXCgoLio/KSg/PCFcXFxcKVxcKS9pbTtcclxuY29uc3QgbWFya2Rvd25FbWJlZFJlZ2V4ID0gLyg/PCFcXFxcKVxcIVxcWyguKj8pKD88IVxcXFwpXFxdXFwoKC4qPykoPzwhXFxcXClcXCkvaW1cclxuXHJcbmNvbnN0IHdpa2lMaW5rT3JFbWJlZFJlZ2V4ID0gLyg/PCFcXFxcKVxcW1xcWyguKj8pKD88IVxcXFwpXFxdXFxdL2ltXHJcbmNvbnN0IHdpa2lMaW5rUmVnZXggPSAvKD88IVxcISkoPzwhXFxcXClcXFtcXFsoLio/KSg/PCFcXFxcKVxcXVxcXS9pbTtcclxuY29uc3Qgd2lraUVtYmVkUmVnZXggPSAvKD88IVxcXFwpXFwhXFxbXFxbKC4qPykoPzwhXFxcXClcXF1cXF0vaW1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTGlua3NIYW5kbGVyIHtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGFwcDogQXBwLFxyXG5cdFx0cHJpdmF0ZSBjb25zb2xlTG9nUHJlZml4OiBzdHJpbmcgPSBcIlwiLFxyXG5cdFx0cHJpdmF0ZSBpZ25vcmVGb2xkZXJzOiBzdHJpbmdbXSA9IFtdLFxyXG5cdFx0cHJpdmF0ZSBpZ25vcmVGaWxlc1JlZ2V4OiBSZWdFeHBbXSA9IFtdLFxyXG5cdCkgeyB9XHJcblxyXG5cdGlzUGF0aElnbm9yZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAocGF0aC5zdGFydHNXaXRoKFwiLi9cIikpXHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cmluZygyKTtcclxuXHJcblx0XHRmb3IgKGxldCBmb2xkZXIgb2YgdGhpcy5pZ25vcmVGb2xkZXJzKSB7XHJcblx0XHRcdGlmIChwYXRoLnN0YXJ0c1dpdGgoZm9sZGVyKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgZmlsZVJlZ2V4IG9mIHRoaXMuaWdub3JlRmlsZXNSZWdleCkge1xyXG5cdFx0XHRpZiAoZmlsZVJlZ2V4LnRlc3QocGF0aCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hlY2tJc0NvcnJlY3RNYXJrZG93bkVtYmVkKHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IGVsZW1lbnRzID0gdGV4dC5tYXRjaChtYXJrZG93bkVtYmVkUmVnZXhHKTtcclxuXHRcdHJldHVybiAoZWxlbWVudHMgIT0gbnVsbCAmJiBlbGVtZW50cy5sZW5ndGggPiAwKVxyXG5cdH1cclxuXHJcblx0Y2hlY2tJc0NvcnJlY3RNYXJrZG93bkxpbmsodGV4dDogc3RyaW5nKSB7XHJcblx0XHRsZXQgZWxlbWVudHMgPSB0ZXh0Lm1hdGNoKG1hcmtkb3duTGlua1JlZ2V4Ryk7XHJcblx0XHRyZXR1cm4gKGVsZW1lbnRzICE9IG51bGwgJiYgZWxlbWVudHMubGVuZ3RoID4gMClcclxuXHR9XHJcblxyXG5cdGNoZWNrSXNDb3JyZWN0TWFya2Rvd25FbWJlZE9yTGluayh0ZXh0OiBzdHJpbmcpIHtcclxuXHRcdGxldCBlbGVtZW50cyA9IHRleHQubWF0Y2gobWFya2Rvd25MaW5rT3JFbWJlZFJlZ2V4Ryk7XHJcblx0XHRyZXR1cm4gKGVsZW1lbnRzICE9IG51bGwgJiYgZWxlbWVudHMubGVuZ3RoID4gMClcclxuXHR9XHJcblxyXG5cdGNoZWNrSXNDb3JyZWN0V2lraUVtYmVkKHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IGVsZW1lbnRzID0gdGV4dC5tYXRjaCh3aWtpRW1iZWRSZWdleEcpO1xyXG5cdFx0cmV0dXJuIChlbGVtZW50cyAhPSBudWxsICYmIGVsZW1lbnRzLmxlbmd0aCA+IDApXHJcblx0fVxyXG5cclxuXHRjaGVja0lzQ29ycmVjdFdpa2lMaW5rKHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IGVsZW1lbnRzID0gdGV4dC5tYXRjaCh3aWtpTGlua1JlZ2V4Ryk7XHJcblx0XHRyZXR1cm4gKGVsZW1lbnRzICE9IG51bGwgJiYgZWxlbWVudHMubGVuZ3RoID4gMClcclxuXHR9XHJcblxyXG5cdGNoZWNrSXNDb3JyZWN0V2lraUVtYmVkT3JMaW5rKHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IGVsZW1lbnRzID0gdGV4dC5tYXRjaCh3aWtpTGlua09yRW1iZWRSZWdleEcpO1xyXG5cdFx0cmV0dXJuIChlbGVtZW50cyAhPSBudWxsICYmIGVsZW1lbnRzLmxlbmd0aCA+IDApXHJcblx0fVxyXG5cclxuXHJcblx0Z2V0RmlsZUJ5TGluayhsaW5rOiBzdHJpbmcsIG93bmluZ05vdGVQYXRoOiBzdHJpbmcsIGFsbG93SW52YWxpZExpbms6IGJvb2xlYW4gPSB0cnVlKTogVEZpbGUge1xyXG5cdFx0bGluayA9IHRoaXMuc3BsaXRMaW5rVG9QYXRoQW5kU2VjdGlvbihsaW5rKS5saW5rO1xyXG5cdFx0aWYgKGFsbG93SW52YWxpZExpbmspIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QobGluaywgb3duaW5nTm90ZVBhdGgpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGZ1bGxQYXRoID0gdGhpcy5nZXRGdWxsUGF0aEZvckxpbmsobGluaywgb3duaW5nTm90ZVBhdGgpO1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0RmlsZUJ5UGF0aChmdWxsUGF0aCk7XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0RmlsZUJ5UGF0aChwYXRoOiBzdHJpbmcpOiBURmlsZSB7XHJcblx0XHRwYXRoID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckZpbGUocGF0aCk7XHJcblx0XHRyZXR1cm4gYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKSBhcyBURmlsZTtcclxuXHR9XHJcblxyXG5cclxuXHRnZXRGdWxsUGF0aEZvckxpbmsobGluazogc3RyaW5nLCBvd25pbmdOb3RlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdGxpbmsgPSB0aGlzLnNwbGl0TGlua1RvUGF0aEFuZFNlY3Rpb24obGluaykubGluaztcclxuXHRcdGxpbmsgPSBVdGlscy5ub3JtYWxpemVQYXRoRm9yRmlsZShsaW5rKTtcclxuXHRcdG93bmluZ05vdGVQYXRoID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckZpbGUob3duaW5nTm90ZVBhdGgpO1xyXG5cclxuXHRcdGxldCBwYXJlbnRGb2xkZXIgPSBvd25pbmdOb3RlUGF0aC5zdWJzdHJpbmcoMCwgb3duaW5nTm90ZVBhdGgubGFzdEluZGV4T2YoXCIvXCIpKTtcclxuXHRcdGxldCBmdWxsUGF0aCA9IHBhdGguam9pbihwYXJlbnRGb2xkZXIsIGxpbmspO1xyXG5cclxuXHRcdGZ1bGxQYXRoID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckZpbGUoZnVsbFBhdGgpO1xyXG5cdFx0cmV0dXJuIGZ1bGxQYXRoO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGdldEFsbENhY2hlZExpbmtzVG9GaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHsgW25vdGVQYXRoOiBzdHJpbmddOiBMaW5rQ2FjaGVbXTsgfT4ge1xyXG5cdFx0bGV0IGFsbExpbmtzOiB7IFtub3RlUGF0aDogc3RyaW5nXTogTGlua0NhY2hlW107IH0gPSB7fTtcclxuXHRcdGxldCBub3RlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHJcblx0XHRpZiAobm90ZXMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xyXG5cdFx0XHRcdGlmIChub3RlLnBhdGggPT0gZmlsZVBhdGgpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IGxpbmtzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlLnBhdGgpKS5saW5rcztcclxuXHJcblx0XHRcdFx0aWYgKGxpbmtzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0XHRcdGxldCBsaW5rRnVsbFBhdGggPSB0aGlzLmdldEZ1bGxQYXRoRm9yTGluayhsaW5rLmxpbmssIG5vdGUucGF0aCk7XHJcblx0XHRcdFx0XHRcdGlmIChsaW5rRnVsbFBhdGggPT0gZmlsZVBhdGgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIWFsbExpbmtzW25vdGUucGF0aF0pXHJcblx0XHRcdFx0XHRcdFx0XHRhbGxMaW5rc1tub3RlLnBhdGhdID0gW107XHJcblx0XHRcdFx0XHRcdFx0YWxsTGlua3Nbbm90ZS5wYXRoXS5wdXNoKGxpbmspO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFsbExpbmtzO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGdldEFsbENhY2hlZEVtYmVkc1RvRmlsZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTx7IFtub3RlUGF0aDogc3RyaW5nXTogRW1iZWRDYWNoZVtdOyB9PiB7XHJcblx0XHRsZXQgYWxsRW1iZWRzOiB7IFtub3RlUGF0aDogc3RyaW5nXTogRW1iZWRDYWNoZVtdOyB9ID0ge307XHJcblx0XHRsZXQgbm90ZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG5cdFx0aWYgKG5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2Ygbm90ZXMpIHtcclxuXHRcdFx0XHRpZiAobm90ZS5wYXRoID09IGZpbGVQYXRoKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdC8vISEhIHRoaXMgY2FuIHJldHVybiB1bmRlZmluZWQgaWYgbm90ZSB3YXMganVzdCB1cGRhdGVkXHJcblx0XHRcdFx0bGV0IGVtYmVkcyA9IChhd2FpdCBVdGlscy5nZXRDYWNoZVNhZmUobm90ZS5wYXRoKSkuZW1iZWRzO1xyXG5cclxuXHRcdFx0XHRpZiAoZW1iZWRzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBlbWJlZCBvZiBlbWJlZHMpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGxpbmtGdWxsUGF0aCA9IHRoaXMuZ2V0RnVsbFBhdGhGb3JMaW5rKGVtYmVkLmxpbmssIG5vdGUucGF0aCk7XHJcblx0XHRcdFx0XHRcdGlmIChsaW5rRnVsbFBhdGggPT0gZmlsZVBhdGgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIWFsbEVtYmVkc1tub3RlLnBhdGhdKVxyXG5cdFx0XHRcdFx0XHRcdFx0YWxsRW1iZWRzW25vdGUucGF0aF0gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRhbGxFbWJlZHNbbm90ZS5wYXRoXS5wdXNoKGVtYmVkKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhbGxFbWJlZHM7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdGFzeW5jIGdldEFsbEJhZExpbmtzKCk6IFByb21pc2U8eyBbbm90ZVBhdGg6IHN0cmluZ106IExpbmtDYWNoZVtdOyB9PiB7XHJcblx0XHRsZXQgYWxsTGlua3M6IHsgW25vdGVQYXRoOiBzdHJpbmddOiBMaW5rQ2FjaGVbXTsgfSA9IHt9O1xyXG5cdFx0bGV0IG5vdGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuXHRcdGlmIChub3Rlcykge1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlLnBhdGgpKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdC8vISEhIHRoaXMgY2FuIHJldHVybiB1bmRlZmluZWQgaWYgbm90ZSB3YXMganVzdCB1cGRhdGVkXHJcblx0XHRcdFx0bGV0IGxpbmtzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlLnBhdGgpKS5saW5rcztcclxuXHJcblx0XHRcdFx0aWYgKGxpbmtzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChsaW5rLmxpbmsuc3RhcnRzV2l0aChcIiNcIikpIC8vaW50ZXJuYWwgc2VjdGlvbiBsaW5rXHJcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jaGVja0lzQ29ycmVjdFdpa2lMaW5rKGxpbmsub3JpZ2luYWwpKVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGZpbGUgPSB0aGlzLmdldEZpbGVCeUxpbmsobGluay5saW5rLCBub3RlLnBhdGgsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFhbGxMaW5rc1tub3RlLnBhdGhdKVxyXG5cdFx0XHRcdFx0XHRcdFx0YWxsTGlua3Nbbm90ZS5wYXRoXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGFsbExpbmtzW25vdGUucGF0aF0ucHVzaChsaW5rKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhbGxMaW5rcztcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbEJhZEVtYmVkcygpOiBQcm9taXNlPHsgW25vdGVQYXRoOiBzdHJpbmddOiBFbWJlZENhY2hlW107IH0+IHtcclxuXHRcdGxldCBhbGxFbWJlZHM6IHsgW25vdGVQYXRoOiBzdHJpbmddOiBFbWJlZENhY2hlW107IH0gPSB7fTtcclxuXHRcdGxldCBub3RlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHJcblx0XHRpZiAobm90ZXMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZS5wYXRoKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHQvLyEhISB0aGlzIGNhbiByZXR1cm4gdW5kZWZpbmVkIGlmIG5vdGUgd2FzIGp1c3QgdXBkYXRlZFxyXG5cdFx0XHRcdGxldCBlbWJlZHMgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGUucGF0aCkpLmVtYmVkcztcclxuXHJcblx0XHRcdFx0aWYgKGVtYmVkcykge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZW1iZWQgb2YgZW1iZWRzKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmNoZWNrSXNDb3JyZWN0V2lraUVtYmVkKGVtYmVkLm9yaWdpbmFsKSlcclxuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCBmaWxlID0gdGhpcy5nZXRGaWxlQnlMaW5rKGVtYmVkLmxpbmssIG5vdGUucGF0aCwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIWFsbEVtYmVkc1tub3RlLnBhdGhdKVxyXG5cdFx0XHRcdFx0XHRcdFx0YWxsRW1iZWRzW25vdGUucGF0aF0gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRhbGxFbWJlZHNbbm90ZS5wYXRoXS5wdXNoKGVtYmVkKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhbGxFbWJlZHM7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgZ2V0QWxsR29vZExpbmtzKCk6IFByb21pc2U8eyBbbm90ZVBhdGg6IHN0cmluZ106IExpbmtDYWNoZVtdOyB9PiB7XHJcblx0XHRsZXQgYWxsTGlua3M6IHsgW25vdGVQYXRoOiBzdHJpbmddOiBMaW5rQ2FjaGVbXTsgfSA9IHt9O1xyXG5cdFx0bGV0IG5vdGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuXHRcdGlmIChub3Rlcykge1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlLnBhdGgpKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdC8vISEhIHRoaXMgY2FuIHJldHVybiB1bmRlZmluZWQgaWYgbm90ZSB3YXMganVzdCB1cGRhdGVkXHJcblx0XHRcdFx0bGV0IGxpbmtzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlLnBhdGgpKS5saW5rcztcclxuXHJcblx0XHRcdFx0aWYgKGxpbmtzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0XHRcdGlmIChsaW5rLmxpbmsuc3RhcnRzV2l0aChcIiNcIikpIC8vaW50ZXJuYWwgc2VjdGlvbiBsaW5rXHJcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jaGVja0lzQ29ycmVjdFdpa2lMaW5rKGxpbmsub3JpZ2luYWwpKVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGZpbGUgPSB0aGlzLmdldEZpbGVCeUxpbmsobGluay5saW5rLCBub3RlLnBhdGgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICghYWxsTGlua3Nbbm90ZS5wYXRoXSlcclxuXHRcdFx0XHRcdFx0XHRcdGFsbExpbmtzW25vdGUucGF0aF0gPSBbXTtcclxuXHRcdFx0XHRcdFx0XHRhbGxMaW5rc1tub3RlLnBhdGhdLnB1c2gobGluayk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYWxsTGlua3M7XHJcblx0fVxyXG5cclxuXHRhc3luYyBnZXRBbGxCYWRTZWN0aW9uTGlua3MoKTogUHJvbWlzZTx7IFtub3RlUGF0aDogc3RyaW5nXTogTGlua0NhY2hlW107IH0+IHtcclxuXHRcdGxldCBhbGxMaW5rczogeyBbbm90ZVBhdGg6IHN0cmluZ106IExpbmtDYWNoZVtdOyB9ID0ge307XHJcblx0XHRsZXQgbm90ZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG5cdFx0aWYgKG5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2Ygbm90ZXMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGUucGF0aCkpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0Ly8hISEgdGhpcyBjYW4gcmV0dXJuIHVuZGVmaW5lZCBpZiBub3RlIHdhcyBqdXN0IHVwZGF0ZWRcclxuXHRcdFx0XHRsZXQgbGlua3MgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGUucGF0aCkpLmxpbmtzO1xyXG5cdFx0XHRcdGlmIChsaW5rcykge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgbGluayBvZiBsaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jaGVja0lzQ29ycmVjdFdpa2lMaW5rKGxpbmsub3JpZ2luYWwpKVxyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0bGV0IGxpID0gdGhpcy5zcGxpdExpbmtUb1BhdGhBbmRTZWN0aW9uKGxpbmsubGluayk7XHJcblx0XHRcdFx0XHRcdGlmICghbGkuaGFzU2VjdGlvbilcclxuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCBmaWxlID0gdGhpcy5nZXRGaWxlQnlMaW5rKGxpbmsubGluaywgbm90ZS5wYXRoLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGZpbGUuZXh0ZW5zaW9uID09PSBcInBkZlwiICYmIGxpLnNlY3Rpb24uc3RhcnRzV2l0aChcInBhZ2U9XCIpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHRsZXQgc2VjdGlvbiA9IFV0aWxzLm5vcm1hbGl6ZUxpbmtTZWN0aW9uKGxpLnNlY3Rpb24pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoc2VjdGlvbi5zdGFydHNXaXRoKFwiXlwiKSkgLy9za2lwIF4gbGlua3NcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRsZXQgcmVnZXggPSAvWyAhQCQlXiYqKCktPV8rXFxcXC87J1xcW1xcXVxcXCJcXHxcXD8uXFwsXFw8XFw+XFxgXFx+XFx7XFx9XS9naW07XHJcblx0XHRcdFx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZShyZWdleCwgJycpO1xyXG5cdFx0XHRcdFx0XHRcdHNlY3Rpb24gPSBzZWN0aW9uLnJlcGxhY2UocmVnZXgsICcnKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKCF0ZXh0LmNvbnRhaW5zKFwiI1wiICsgc2VjdGlvbikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICghYWxsTGlua3Nbbm90ZS5wYXRoXSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0YWxsTGlua3Nbbm90ZS5wYXRoXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdFx0YWxsTGlua3Nbbm90ZS5wYXRoXS5wdXNoKGxpbmspO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhbGxMaW5rcztcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbEdvb2RFbWJlZHMoKTogUHJvbWlzZTx7IFtub3RlUGF0aDogc3RyaW5nXTogRW1iZWRDYWNoZVtdOyB9PiB7XHJcblx0XHRsZXQgYWxsRW1iZWRzOiB7IFtub3RlUGF0aDogc3RyaW5nXTogRW1iZWRDYWNoZVtdOyB9ID0ge307XHJcblx0XHRsZXQgbm90ZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG5cdFx0aWYgKG5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2Ygbm90ZXMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGUucGF0aCkpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0Ly8hISEgdGhpcyBjYW4gcmV0dXJuIHVuZGVmaW5lZCBpZiBub3RlIHdhcyBqdXN0IHVwZGF0ZWRcclxuXHRcdFx0XHRsZXQgZW1iZWRzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlLnBhdGgpKS5lbWJlZHM7XHJcblxyXG5cdFx0XHRcdGlmIChlbWJlZHMpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IGVtYmVkIG9mIGVtYmVkcykge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jaGVja0lzQ29ycmVjdFdpa2lFbWJlZChlbWJlZC5vcmlnaW5hbCkpXHJcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgZmlsZSA9IHRoaXMuZ2V0RmlsZUJ5TGluayhlbWJlZC5saW5rLCBub3RlLnBhdGgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICghYWxsRW1iZWRzW25vdGUucGF0aF0pXHJcblx0XHRcdFx0XHRcdFx0XHRhbGxFbWJlZHNbbm90ZS5wYXRoXSA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGFsbEVtYmVkc1tub3RlLnBhdGhdLnB1c2goZW1iZWQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFsbEVtYmVkcztcclxuXHR9XHJcblxyXG5cdGFzeW5jIGdldEFsbFdpa2lMaW5rcygpOiBQcm9taXNlPHsgW25vdGVQYXRoOiBzdHJpbmddOiBMaW5rQ2FjaGVbXTsgfT4ge1xyXG5cdFx0bGV0IGFsbExpbmtzOiB7IFtub3RlUGF0aDogc3RyaW5nXTogTGlua0NhY2hlW107IH0gPSB7fTtcclxuXHRcdGxldCBub3RlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHJcblx0XHRpZiAobm90ZXMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZS5wYXRoKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHQvLyEhISB0aGlzIGNhbiByZXR1cm4gdW5kZWZpbmVkIGlmIG5vdGUgd2FzIGp1c3QgdXBkYXRlZFxyXG5cdFx0XHRcdGxldCBsaW5rcyA9IChhd2FpdCBVdGlscy5nZXRDYWNoZVNhZmUobm90ZS5wYXRoKSkubGlua3M7XHJcblxyXG5cdFx0XHRcdGlmIChsaW5rcykge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgbGluayBvZiBsaW5rcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuY2hlY2tJc0NvcnJlY3RXaWtpTGluayhsaW5rLm9yaWdpbmFsKSlcclxuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghYWxsTGlua3Nbbm90ZS5wYXRoXSlcclxuXHRcdFx0XHRcdFx0XHRhbGxMaW5rc1tub3RlLnBhdGhdID0gW107XHJcblx0XHRcdFx0XHRcdGFsbExpbmtzW25vdGUucGF0aF0ucHVzaChsaW5rKTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFsbExpbmtzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZ2V0QWxsV2lraUVtYmVkcygpOiBQcm9taXNlPHsgW25vdGVQYXRoOiBzdHJpbmddOiBFbWJlZENhY2hlW107IH0+IHtcclxuXHRcdGxldCBhbGxFbWJlZHM6IHsgW25vdGVQYXRoOiBzdHJpbmddOiBFbWJlZENhY2hlW107IH0gPSB7fTtcclxuXHRcdGxldCBub3RlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHJcblx0XHRpZiAobm90ZXMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZS5wYXRoKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHQvLyEhISB0aGlzIGNhbiByZXR1cm4gdW5kZWZpbmVkIGlmIG5vdGUgd2FzIGp1c3QgdXBkYXRlZFxyXG5cdFx0XHRcdGxldCBlbWJlZHMgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGUucGF0aCkpLmVtYmVkcztcclxuXHJcblx0XHRcdFx0aWYgKGVtYmVkcykge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZW1iZWQgb2YgZW1iZWRzKSB7XHJcblx0XHRcdFx0XHRcdGlmICghdGhpcy5jaGVja0lzQ29ycmVjdFdpa2lFbWJlZChlbWJlZC5vcmlnaW5hbCkpXHJcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIWFsbEVtYmVkc1tub3RlLnBhdGhdKVxyXG5cdFx0XHRcdFx0XHRcdGFsbEVtYmVkc1tub3RlLnBhdGhdID0gW107XHJcblx0XHRcdFx0XHRcdGFsbEVtYmVkc1tub3RlLnBhdGhdLnB1c2goZW1iZWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhbGxFbWJlZHM7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlTGlua3NUb1JlbmFtZWRGaWxlKG9sZE5vdGVQYXRoOiBzdHJpbmcsIG5ld05vdGVQYXRoOiBzdHJpbmcsIGNoYW5nZWxpbmtzQWx0ID0gZmFsc2UsIHVzZUJ1aWx0SW5PYnNpZGlhbkxpbmtDYWNoaW5nID0gZmFsc2UpIHtcclxuXHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQob2xkTm90ZVBhdGgpIHx8IHRoaXMuaXNQYXRoSWdub3JlZChuZXdOb3RlUGF0aCkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRsZXQgbm90ZXMgPSB1c2VCdWlsdEluT2JzaWRpYW5MaW5rQ2FjaGluZyA/IGF3YWl0IHRoaXMuZ2V0Q2FjaGVkTm90ZXNUaGF0SGF2ZUxpbmtUb0ZpbGUob2xkTm90ZVBhdGgpIDogYXdhaXQgdGhpcy5nZXROb3Rlc1RoYXRIYXZlTGlua1RvRmlsZShvbGROb3RlUGF0aCk7XHJcblx0XHRsZXQgbGlua3M6IFBhdGhDaGFuZ2VJbmZvW10gPSBbeyBvbGRQYXRoOiBvbGROb3RlUGF0aCwgbmV3UGF0aDogbmV3Tm90ZVBhdGggfV07XHJcblxyXG5cdFx0aWYgKG5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2Ygbm90ZXMpIHtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLnVwZGF0ZUNoYW5nZWRQYXRoc0luTm90ZShub3RlLCBsaW5rcywgY2hhbmdlbGlua3NBbHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlQ2hhbmdlZFBhdGhJbk5vdGUobm90ZVBhdGg6IHN0cmluZywgb2xkTGluazogc3RyaW5nLCBuZXdMaW5rOiBzdHJpbmcsIGNoYW5nZWxpbmtzQWx0ID0gZmFsc2UpIHtcclxuXHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZVBhdGgpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IGNoYW5nZXM6IFBhdGhDaGFuZ2VJbmZvW10gPSBbeyBvbGRQYXRoOiBvbGRMaW5rLCBuZXdQYXRoOiBuZXdMaW5rIH1dO1xyXG5cdFx0cmV0dXJuIGF3YWl0IHRoaXMudXBkYXRlQ2hhbmdlZFBhdGhzSW5Ob3RlKG5vdGVQYXRoLCBjaGFuZ2VzLCBjaGFuZ2VsaW5rc0FsdCk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlQ2hhbmdlZFBhdGhzSW5Ob3RlKG5vdGVQYXRoOiBzdHJpbmcsIGNoYW5nZWRMaW5rczogUGF0aENoYW5nZUluZm9bXSwgY2hhbmdlbGlua3NBbHQgPSBmYWxzZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlUGF0aCkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRsZXQgZmlsZSA9IHRoaXMuZ2V0RmlsZUJ5UGF0aChub3RlUGF0aCk7XHJcblx0XHRpZiAoIWZpbGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImNhbnQgdXBkYXRlIGxpbmtzIGluIG5vdGUsIGZpbGUgbm90IGZvdW5kOiBcIiArIG5vdGVQYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcclxuXHRcdGxldCBkaXJ0eSA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBlbGVtZW50cyA9IHRleHQubWF0Y2gobWFya2Rvd25MaW5rT3JFbWJlZFJlZ2V4Ryk7XHJcblx0XHRpZiAoZWxlbWVudHMgIT0gbnVsbCAmJiBlbGVtZW50cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGZvciAobGV0IGVsIG9mIGVsZW1lbnRzKSB7XHJcblx0XHRcdFx0bGV0IGFsdCA9IGVsLm1hdGNoKG1hcmtkb3duTGlua09yRW1iZWRSZWdleClbMV07XHJcblx0XHRcdFx0bGV0IGxpbmsgPSBlbC5tYXRjaChtYXJrZG93bkxpbmtPckVtYmVkUmVnZXgpWzJdO1xyXG5cdFx0XHRcdGxldCBsaSA9IHRoaXMuc3BsaXRMaW5rVG9QYXRoQW5kU2VjdGlvbihsaW5rKTtcclxuXHJcblx0XHRcdFx0aWYgKGxpLmhhc1NlY3Rpb24pICAvLyBmb3IgbGlua3Mgd2l0aCBzZWN0aW9ucyBsaWtlIFtdKG5vdGUubWQjc2VjdGlvbilcclxuXHRcdFx0XHRcdGxpbmsgPSBsaS5saW5rO1xyXG5cclxuXHRcdFx0XHRsZXQgZnVsbExpbmsgPSB0aGlzLmdldEZ1bGxQYXRoRm9yTGluayhsaW5rLCBub3RlUGF0aCk7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IGNoYW5nZWRMaW5rIG9mIGNoYW5nZWRMaW5rcykge1xyXG5cdFx0XHRcdFx0aWYgKGZ1bGxMaW5rID09IGNoYW5nZWRMaW5rLm9sZFBhdGgpIHtcclxuXHRcdFx0XHRcdFx0bGV0IG5ld1JlbExpbms6IHN0cmluZyA9IHBhdGgucmVsYXRpdmUobm90ZVBhdGgsIGNoYW5nZWRMaW5rLm5ld1BhdGgpO1xyXG5cdFx0XHRcdFx0XHRuZXdSZWxMaW5rID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckxpbmsobmV3UmVsTGluayk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobmV3UmVsTGluay5zdGFydHNXaXRoKFwiLi4vXCIpKSB7XHJcblx0XHRcdFx0XHRcdFx0bmV3UmVsTGluayA9IG5ld1JlbExpbmsuc3Vic3RyaW5nKDMpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoY2hhbmdlbGlua3NBbHQgJiYgbmV3UmVsTGluay5lbmRzV2l0aChcIi5tZFwiKSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vcmVuYW1lIG9ubHkgaWYgb2xkIGFsdCA9PSBvbGQgbm90ZSBuYW1lXHJcblx0XHRcdFx0XHRcdFx0aWYgKGFsdCA9PT0gcGF0aC5iYXNlbmFtZShjaGFuZ2VkTGluay5vbGRQYXRoLCBwYXRoLmV4dG5hbWUoY2hhbmdlZExpbmsub2xkUGF0aCkpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZXh0ID0gcGF0aC5leHRuYW1lKG5ld1JlbExpbmspO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGJhc2VOYW1lID0gcGF0aC5iYXNlbmFtZShuZXdSZWxMaW5rLCBleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YWx0ID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckZpbGUoYmFzZU5hbWUpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGxpLmhhc1NlY3Rpb24pXHJcblx0XHRcdFx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZShlbCwgJ1snICsgYWx0ICsgJ10nICsgJygnICsgbmV3UmVsTGluayArICcjJyArIGxpLnNlY3Rpb24gKyAnKScpO1xyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZShlbCwgJ1snICsgYWx0ICsgJ10nICsgJygnICsgbmV3UmVsTGluayArICcpJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRkaXJ0eSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImxpbmsgdXBkYXRlZCBpbiBjYWNoZWQgbm90ZSBbbm90ZSwgb2xkIGxpbmssIG5ldyBsaW5rXTogXFxuICAgXCJcclxuXHRcdFx0XHRcdFx0XHQrIGZpbGUucGF0aCArIFwiXFxuICAgXCIgKyBsaW5rICsgXCJcXG4gICBcIiArIG5ld1JlbExpbmspXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGRpcnR5KVxyXG5cdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgdGV4dCk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlSW50ZXJuYWxMaW5rc0luTW92ZWROb3RlKG9sZE5vdGVQYXRoOiBzdHJpbmcsIG5ld05vdGVQYXRoOiBzdHJpbmcsIGF0dGFjaG1lbnRzQWxyZWFkeU1vdmVkOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG9sZE5vdGVQYXRoKSB8fCB0aGlzLmlzUGF0aElnbm9yZWQobmV3Tm90ZVBhdGgpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IGZpbGUgPSB0aGlzLmdldEZpbGVCeVBhdGgobmV3Tm90ZVBhdGgpO1xyXG5cdFx0aWYgKCFmaWxlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJjYW4ndCB1cGRhdGUgaW50ZXJuYWwgbGlua3MsIGZpbGUgbm90IGZvdW5kOiBcIiArIG5ld05vdGVQYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcclxuXHRcdGxldCBkaXJ0eSA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBlbGVtZW50cyA9IHRleHQubWF0Y2gobWFya2Rvd25MaW5rT3JFbWJlZFJlZ2V4Ryk7XHJcblx0XHRpZiAoZWxlbWVudHMgIT0gbnVsbCAmJiBlbGVtZW50cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGZvciAobGV0IGVsIG9mIGVsZW1lbnRzKSB7XHJcblx0XHRcdFx0bGV0IGFsdCA9IGVsLm1hdGNoKG1hcmtkb3duTGlua09yRW1iZWRSZWdleClbMV07XHJcblx0XHRcdFx0bGV0IGxpbmsgPSBlbC5tYXRjaChtYXJrZG93bkxpbmtPckVtYmVkUmVnZXgpWzJdO1xyXG5cdFx0XHRcdGxldCBsaSA9IHRoaXMuc3BsaXRMaW5rVG9QYXRoQW5kU2VjdGlvbihsaW5rKTtcclxuXHJcblx0XHRcdFx0aWYgKGxpbmsuc3RhcnRzV2l0aChcIiNcIikpIC8vaW50ZXJuYWwgc2VjdGlvbiBsaW5rXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0aWYgKGxpLmhhc1NlY3Rpb24pICAvLyBmb3IgbGlua3Mgd2l0aCBzZWN0aW9ucyBsaWtlIFtdKG5vdGUubWQjc2VjdGlvbilcclxuXHRcdFx0XHRcdGxpbmsgPSBsaS5saW5rO1xyXG5cclxuXHJcblx0XHRcdFx0Ly9zdGFydHNXaXRoKFwiLi4vXCIpIC0gZm9yIG5vdCBza2lwcGluZyBmaWxlcyB0aGF0IG5vdCBpbiB0aGUgbm90ZSBkaXJcclxuXHRcdFx0XHRpZiAoYXR0YWNobWVudHNBbHJlYWR5TW92ZWQgJiYgIWxpbmsuZW5kc1dpdGgoXCIubWRcIikgJiYgIWxpbmsuc3RhcnRzV2l0aChcIi4uL1wiKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgZmlsZSA9IHRoaXMuZ2V0RmlsZUJ5TGluayhsaW5rLCBvbGROb3RlUGF0aCk7XHJcblx0XHRcdFx0aWYgKCFmaWxlKSB7XHJcblx0XHRcdFx0XHRmaWxlID0gdGhpcy5nZXRGaWxlQnlMaW5rKGxpbmssIG5ld05vdGVQYXRoKTtcclxuXHRcdFx0XHRcdGlmICghZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuY29uc29sZUxvZ1ByZWZpeCArIG5ld05vdGVQYXRoICsgXCIgaGFzIGJhZCBsaW5rIChmaWxlIGRvZXMgbm90IGV4aXN0KTogXCIgKyBsaW5rKTtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0bGV0IG5ld1JlbExpbms6IHN0cmluZyA9IHBhdGgucmVsYXRpdmUobmV3Tm90ZVBhdGgsIGZpbGUucGF0aCk7XHJcblx0XHRcdFx0bmV3UmVsTGluayA9IFV0aWxzLm5vcm1hbGl6ZVBhdGhGb3JMaW5rKG5ld1JlbExpbmspO1xyXG5cclxuXHRcdFx0XHRpZiAobmV3UmVsTGluay5zdGFydHNXaXRoKFwiLi4vXCIpKSB7XHJcblx0XHRcdFx0XHRuZXdSZWxMaW5rID0gbmV3UmVsTGluay5zdWJzdHJpbmcoMyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAobGkuaGFzU2VjdGlvbilcclxuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoZWwsICdbJyArIGFsdCArICddJyArICcoJyArIG5ld1JlbExpbmsgKyAnIycgKyBsaS5zZWN0aW9uICsgJyknKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGVsLCAnWycgKyBhbHQgKyAnXScgKyAnKCcgKyBuZXdSZWxMaW5rICsgJyknKTtcclxuXHJcblx0XHRcdFx0ZGlydHkgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImxpbmsgdXBkYXRlZCBpbiBtb3ZlZCBub3RlIFtub3RlLCBvbGQgbGluaywgbmV3IGxpbmtdOiBcXG4gICBcIlxyXG5cdFx0XHRcdFx0KyBmaWxlLnBhdGggKyBcIlxcbiAgIFwiICsgbGluayArIFwiICAgXFxuXCIgKyBuZXdSZWxMaW5rKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkaXJ0eSlcclxuXHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIHRleHQpO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGdldENhY2hlZE5vdGVzVGhhdEhhdmVMaW5rVG9GaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XHJcblx0XHRsZXQgbm90ZXM6IHN0cmluZ1tdID0gW107XHJcblx0XHRsZXQgYWxsTm90ZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG5cdFx0aWYgKGFsbE5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2YgYWxsTm90ZXMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGUucGF0aCkpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IG5vdGVQYXRoID0gbm90ZS5wYXRoO1xyXG5cdFx0XHRcdGlmIChub3RlLnBhdGggPT0gZmlsZVBhdGgpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0Ly8hISEgdGhpcyBjYW4gcmV0dXJuIHVuZGVmaW5lZCBpZiBub3RlIHdhcyBqdXN0IHVwZGF0ZWRcclxuXHRcdFx0XHRsZXQgZW1iZWRzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlUGF0aCkpLmVtYmVkcztcclxuXHRcdFx0XHRpZiAoZW1iZWRzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBlbWJlZCBvZiBlbWJlZHMpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGxpbmtQYXRoID0gdGhpcy5nZXRGdWxsUGF0aEZvckxpbmsoZW1iZWQubGluaywgbm90ZS5wYXRoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGxpbmtQYXRoID09IGZpbGVQYXRoKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFub3Rlcy5jb250YWlucyhub3RlUGF0aCkpXHJcblx0XHRcdFx0XHRcdFx0XHRub3Rlcy5wdXNoKG5vdGVQYXRoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8hISEgdGhpcyBjYW4gcmV0dXJuIHVuZGVmaW5lZCBpZiBub3RlIHdhcyBqdXN0IHVwZGF0ZWRcclxuXHRcdFx0XHRsZXQgbGlua3MgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGVQYXRoKSkubGlua3M7XHJcblx0XHRcdFx0aWYgKGxpbmtzKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0XHRcdGxldCBsaW5rUGF0aCA9IHRoaXMuZ2V0RnVsbFBhdGhGb3JMaW5rKGxpbmsubGluaywgbm90ZS5wYXRoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGxpbmtQYXRoID09IGZpbGVQYXRoKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFub3Rlcy5jb250YWlucyhub3RlUGF0aCkpXHJcblx0XHRcdFx0XHRcdFx0XHRub3Rlcy5wdXNoKG5vdGVQYXRoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBub3RlcztcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyBnZXROb3Rlc1RoYXRIYXZlTGlua1RvRmlsZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xyXG5cdFx0bGV0IG5vdGVzOiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0bGV0IGFsbE5vdGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuXHRcdGlmIChhbGxOb3Rlcykge1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIGFsbE5vdGVzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlLnBhdGgpKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCBub3RlUGF0aCA9IG5vdGUucGF0aDtcclxuXHRcdFx0XHRpZiAobm90ZVBhdGggPT0gZmlsZVBhdGgpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IGxpbmtzID0gYXdhaXQgdGhpcy5nZXRMaW5rc0Zyb21Ob3RlKG5vdGVQYXRoKTtcclxuXHRcdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0XHRsZXQgbGkgPSB0aGlzLnNwbGl0TGlua1RvUGF0aEFuZFNlY3Rpb24obGluay5saW5rKTtcclxuXHRcdFx0XHRcdGxldCBsaW5rRnVsbFBhdGggPSB0aGlzLmdldEZ1bGxQYXRoRm9yTGluayhsaS5saW5rLCBub3RlUGF0aCk7XHJcblx0XHRcdFx0XHRpZiAobGlua0Z1bGxQYXRoID09IGZpbGVQYXRoKSB7XHJcblx0XHRcdFx0XHRcdGlmICghbm90ZXMuY29udGFpbnMobm90ZVBhdGgpKVxyXG5cdFx0XHRcdFx0XHRcdG5vdGVzLnB1c2gobm90ZVBhdGgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBub3RlcztcclxuXHR9XHJcblxyXG5cdHNwbGl0TGlua1RvUGF0aEFuZFNlY3Rpb24obGluazogc3RyaW5nKTogTGlua1NlY3Rpb25JbmZvIHtcclxuXHRcdGxldCByZXM6IExpbmtTZWN0aW9uSW5mbyA9IHtcclxuXHRcdFx0aGFzU2VjdGlvbjogZmFsc2UsXHJcblx0XHRcdGxpbms6IGxpbmssXHJcblx0XHRcdHNlY3Rpb246IFwiXCJcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWxpbmsuY29udGFpbnMoJyMnKSlcclxuXHRcdFx0cmV0dXJuIHJlcztcclxuXHJcblxyXG5cdFx0bGV0IGxpbmtCZWZvcmVIYXNoID0gbGluay5tYXRjaCgvKC4qPykjKC4qPykkLylbMV07XHJcblx0XHRsZXQgc2VjdGlvbiA9IGxpbmsubWF0Y2goLyguKj8pIyguKj8pJC8pWzJdO1xyXG5cclxuXHRcdGxldCBpc01hcmtkb3duU2VjdGlvbiA9IHNlY3Rpb24gIT0gXCJcIiAmJiBsaW5rQmVmb3JlSGFzaC5lbmRzV2l0aChcIi5tZFwiKTsgLy8gZm9yIGxpbmtzIHdpdGggc2VjdGlvbnMgbGlrZSBbXShub3RlLm1kI3NlY3Rpb24pXHJcblx0XHRsZXQgaXNQZGZQYWdlU2VjdGlvbiA9IHNlY3Rpb24uc3RhcnRzV2l0aChcInBhZ2U9XCIpICYmIGxpbmtCZWZvcmVIYXNoLmVuZHNXaXRoKFwiLnBkZlwiKTsgLy8gZm9yIGxpbmtzIHdpdGggc2VjdGlvbnMgbGlrZSBbXShub3RlLnBkZiNwYWdlPTQyKVxyXG5cclxuXHRcdGlmIChpc01hcmtkb3duU2VjdGlvbiB8fCBpc1BkZlBhZ2VTZWN0aW9uKSB7XHJcblx0XHRcdHJlcyA9IHtcclxuXHRcdFx0XHRoYXNTZWN0aW9uOiB0cnVlLFxyXG5cdFx0XHRcdGxpbms6IGxpbmtCZWZvcmVIYXNoLFxyXG5cdFx0XHRcdHNlY3Rpb246IHNlY3Rpb25cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXM7XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0RmlsZVBhdGhXaXRoUmVuYW1lZEJhc2VOYW1lKGZpbGVQYXRoOiBzdHJpbmcsIG5ld0Jhc2VOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFV0aWxzLm5vcm1hbGl6ZVBhdGhGb3JGaWxlKHBhdGguam9pbihwYXRoLmRpcm5hbWUoZmlsZVBhdGgpLCBuZXdCYXNlTmFtZSArIHBhdGguZXh0bmFtZShmaWxlUGF0aCkpKTtcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyBnZXRMaW5rc0Zyb21Ob3RlKG5vdGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPExpbmtDYWNoZVtdPiB7XHJcblx0XHRsZXQgZmlsZSA9IHRoaXMuZ2V0RmlsZUJ5UGF0aChub3RlUGF0aCk7XHJcblx0XHRpZiAoIWZpbGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImNhbid0IGdldCBlbWJlZHMsIGZpbGUgbm90IGZvdW5kOiBcIiArIG5vdGVQYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcclxuXHJcblx0XHRsZXQgbGlua3M6IExpbmtDYWNoZVtdID0gW107XHJcblxyXG5cdFx0bGV0IGVsZW1lbnRzID0gdGV4dC5tYXRjaChtYXJrZG93bkxpbmtPckVtYmVkUmVnZXhHKTtcclxuXHRcdGlmIChlbGVtZW50cyAhPSBudWxsICYmIGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9yIChsZXQgZWwgb2YgZWxlbWVudHMpIHtcclxuXHRcdFx0XHRsZXQgYWx0ID0gZWwubWF0Y2gobWFya2Rvd25MaW5rT3JFbWJlZFJlZ2V4KVsxXTtcclxuXHRcdFx0XHRsZXQgbGluayA9IGVsLm1hdGNoKG1hcmtkb3duTGlua09yRW1iZWRSZWdleClbMl07XHJcblxyXG5cdFx0XHRcdGxldCBlbWI6IExpbmtDYWNoZSA9IHtcclxuXHRcdFx0XHRcdGxpbms6IGxpbmssXHJcblx0XHRcdFx0XHRkaXNwbGF5VGV4dDogYWx0LFxyXG5cdFx0XHRcdFx0b3JpZ2luYWw6IGVsLFxyXG5cdFx0XHRcdFx0cG9zaXRpb246IHtcclxuXHRcdFx0XHRcdFx0c3RhcnQ6IHtcclxuXHRcdFx0XHRcdFx0XHRjb2w6IDAsLy90b2RvXHJcblx0XHRcdFx0XHRcdFx0bGluZTogMCxcclxuXHRcdFx0XHRcdFx0XHRvZmZzZXQ6IDBcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0ZW5kOiB7XHJcblx0XHRcdFx0XHRcdFx0Y29sOiAwLC8vdG9kb1xyXG5cdFx0XHRcdFx0XHRcdGxpbmU6IDAsXHJcblx0XHRcdFx0XHRcdFx0b2Zmc2V0OiAwXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRsaW5rcy5wdXNoKGVtYik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBsaW5rcztcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdGFzeW5jIGNvbnZlcnRBbGxOb3RlRW1iZWRzUGF0aHNUb1JlbGF0aXZlKG5vdGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPEVtYmVkQ2hhbmdlSW5mb1tdPiB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGVQYXRoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGxldCBjaGFuZ2VkRW1iZWRzOiBFbWJlZENoYW5nZUluZm9bXSA9IFtdO1xyXG5cclxuXHRcdGxldCBlbWJlZHMgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGVQYXRoKSkuZW1iZWRzO1xyXG5cclxuXHRcdGlmIChlbWJlZHMpIHtcclxuXHRcdFx0Zm9yIChsZXQgZW1iZWQgb2YgZW1iZWRzKSB7XHJcblx0XHRcdFx0bGV0IGlzTWFya2Rvd25FbWJlZCA9IHRoaXMuY2hlY2tJc0NvcnJlY3RNYXJrZG93bkVtYmVkKGVtYmVkLm9yaWdpbmFsKTtcclxuXHRcdFx0XHRsZXQgaXNXaWtpRW1iZWQgPSB0aGlzLmNoZWNrSXNDb3JyZWN0V2lraUVtYmVkKGVtYmVkLm9yaWdpbmFsKTtcclxuXHRcdFx0XHRpZiAoaXNNYXJrZG93bkVtYmVkIHx8IGlzV2lraUVtYmVkKSB7XHJcblx0XHRcdFx0XHRsZXQgZmlsZSA9IHRoaXMuZ2V0RmlsZUJ5TGluayhlbWJlZC5saW5rLCBub3RlUGF0aCk7XHJcblx0XHRcdFx0XHRpZiAoZmlsZSlcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0ZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoZW1iZWQubGluaywgbm90ZVBhdGgpO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0bGV0IG5ld1JlbExpbms6IHN0cmluZyA9IHBhdGgucmVsYXRpdmUobm90ZVBhdGgsIGZpbGUucGF0aCk7XHJcblx0XHRcdFx0XHRcdG5ld1JlbExpbmsgPSBpc01hcmtkb3duRW1iZWQgPyBVdGlscy5ub3JtYWxpemVQYXRoRm9yTGluayhuZXdSZWxMaW5rKSA6IFV0aWxzLm5vcm1hbGl6ZVBhdGhGb3JGaWxlKG5ld1JlbExpbmspO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKG5ld1JlbExpbmsuc3RhcnRzV2l0aChcIi4uL1wiKSkge1xyXG5cdFx0XHRcdFx0XHRcdG5ld1JlbExpbmsgPSBuZXdSZWxMaW5rLnN1YnN0cmluZygzKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Y2hhbmdlZEVtYmVkcy5wdXNoKHsgb2xkOiBlbWJlZCwgbmV3TGluazogbmV3UmVsTGluayB9KVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBub3RlUGF0aCArIFwiIGhhcyBiYWQgZW1iZWQgKGZpbGUgZG9lcyBub3QgZXhpc3QpOiBcIiArIGVtYmVkLmxpbmspO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuY29uc29sZUxvZ1ByZWZpeCArIG5vdGVQYXRoICsgXCIgaGFzIGJhZCBlbWJlZCAoZm9ybWF0IG9mIGxpbmsgaXMgbm90IG1hcmtkb3duIG9yIHdpa2kgbGluayk6IFwiICsgZW1iZWQub3JpZ2luYWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGF3YWl0IHRoaXMudXBkYXRlQ2hhbmdlZEVtYmVkSW5Ob3RlKG5vdGVQYXRoLCBjaGFuZ2VkRW1iZWRzKTtcclxuXHRcdHJldHVybiBjaGFuZ2VkRW1iZWRzO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGNvbnZlcnRBbGxOb3RlTGlua3NQYXRoc1RvUmVsYXRpdmUobm90ZVBhdGg6IHN0cmluZyk6IFByb21pc2U8TGlua0NoYW5nZUluZm9bXT4ge1xyXG5cdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlUGF0aCkpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRsZXQgY2hhbmdlZExpbmtzOiBMaW5rQ2hhbmdlSW5mb1tdID0gW107XHJcblxyXG5cdFx0bGV0IGxpbmtzID0gKGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlUGF0aCkpLmxpbmtzO1xyXG5cclxuXHRcdGlmIChsaW5rcykge1xyXG5cdFx0XHRmb3IgKGxldCBsaW5rIG9mIGxpbmtzKSB7XHJcblx0XHRcdFx0bGV0IGlzTWFya2Rvd25MaW5rID0gdGhpcy5jaGVja0lzQ29ycmVjdE1hcmtkb3duTGluayhsaW5rLm9yaWdpbmFsKTtcclxuXHRcdFx0XHRsZXQgaXNXaWtpTGluayA9IHRoaXMuY2hlY2tJc0NvcnJlY3RXaWtpTGluayhsaW5rLm9yaWdpbmFsKTtcclxuXHRcdFx0XHRpZiAoaXNNYXJrZG93bkxpbmsgfHwgaXNXaWtpTGluaykge1xyXG5cdFx0XHRcdFx0aWYgKGxpbmsubGluay5zdGFydHNXaXRoKFwiI1wiKSkgLy9pbnRlcm5hbCBzZWN0aW9uIGxpbmtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGZpbGUgPSB0aGlzLmdldEZpbGVCeUxpbmsobGluay5saW5rLCBub3RlUGF0aCk7XHJcblx0XHRcdFx0XHRpZiAoZmlsZSlcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0Ly8hISEgbGluay5kaXNwbGF5VGV4dCBpcyBhbHdheXMgXCJcIiAtIE9CU0lESUFOIEJVRz8sIHNvIGdldCBkaXNwbGF5IHRleHQgbWFudWFseVxyXG5cdFx0XHRcdFx0aWYgKGlzTWFya2Rvd25MaW5rKSB7XHJcblx0XHRcdFx0XHRcdGxldCBlbGVtZW50cyA9IGxpbmsub3JpZ2luYWwubWF0Y2gobWFya2Rvd25MaW5rUmVnZXgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudHMpXHJcblx0XHRcdFx0XHRcdFx0bGluay5kaXNwbGF5VGV4dCA9IGVsZW1lbnRzWzFdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZpbGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGxpbmsubGluaywgbm90ZVBhdGgpO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0bGV0IG5ld1JlbExpbms6IHN0cmluZyA9IHBhdGgucmVsYXRpdmUobm90ZVBhdGgsIGZpbGUucGF0aCk7XHJcblx0XHRcdFx0XHRcdG5ld1JlbExpbmsgPSBpc01hcmtkb3duTGluayA/IFV0aWxzLm5vcm1hbGl6ZVBhdGhGb3JMaW5rKG5ld1JlbExpbmspIDogVXRpbHMubm9ybWFsaXplUGF0aEZvckZpbGUobmV3UmVsTGluayk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobmV3UmVsTGluay5zdGFydHNXaXRoKFwiLi4vXCIpKSB7XHJcblx0XHRcdFx0XHRcdFx0bmV3UmVsTGluayA9IG5ld1JlbExpbmsuc3Vic3RyaW5nKDMpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRjaGFuZ2VkTGlua3MucHVzaCh7IG9sZDogbGluaywgbmV3TGluazogbmV3UmVsTGluayB9KVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBub3RlUGF0aCArIFwiIGhhcyBiYWQgbGluayAoZmlsZSBkb2VzIG5vdCBleGlzdCk6IFwiICsgbGluay5saW5rKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcih0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBub3RlUGF0aCArIFwiIGhhcyBiYWQgbGluayAoZm9ybWF0IG9mIGxpbmsgaXMgbm90IG1hcmtkb3duIG9yIHdpa2kgbGluayk6IFwiICsgbGluay5vcmlnaW5hbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0YXdhaXQgdGhpcy51cGRhdGVDaGFuZ2VkTGlua0luTm90ZShub3RlUGF0aCwgY2hhbmdlZExpbmtzKTtcclxuXHRcdHJldHVybiBjaGFuZ2VkTGlua3M7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlQ2hhbmdlZEVtYmVkSW5Ob3RlKG5vdGVQYXRoOiBzdHJpbmcsIGNoYW5nZWRFbWJlZHM6IEVtYmVkQ2hhbmdlSW5mb1tdKSB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGVQYXRoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGxldCBub3RlRmlsZSA9IHRoaXMuZ2V0RmlsZUJ5UGF0aChub3RlUGF0aCk7XHJcblx0XHRpZiAoIW5vdGVGaWxlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJjYW4ndCB1cGRhdGUgZW1iZWRzIGluIG5vdGUsIGZpbGUgbm90IGZvdW5kOiBcIiArIG5vdGVQYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChub3RlRmlsZSk7XHJcblx0XHRsZXQgZGlydHkgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoY2hhbmdlZEVtYmVkcyAmJiBjaGFuZ2VkRW1iZWRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9yIChsZXQgZW1iZWQgb2YgY2hhbmdlZEVtYmVkcykge1xyXG5cdFx0XHRcdGlmIChlbWJlZC5vbGQubGluayA9PSBlbWJlZC5uZXdMaW5rKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLmNoZWNrSXNDb3JyZWN0TWFya2Rvd25FbWJlZChlbWJlZC5vbGQub3JpZ2luYWwpKSB7XHJcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGVtYmVkLm9sZC5vcmlnaW5hbCwgJyFbJyArIGVtYmVkLm9sZC5kaXNwbGF5VGV4dCArICddJyArICcoJyArIGVtYmVkLm5ld0xpbmsgKyAnKScpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5jaGVja0lzQ29ycmVjdFdpa2lFbWJlZChlbWJlZC5vbGQub3JpZ2luYWwpKSB7XHJcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGVtYmVkLm9sZC5vcmlnaW5hbCwgJyFbWycgKyBlbWJlZC5uZXdMaW5rICsgJ11dJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgbm90ZVBhdGggKyBcIiBoYXMgYmFkIGVtYmVkIChmb3JtYXQgb2YgbGluayBpcyBub3QgbWFla2Rvd24gb3Igd2lraSBsaW5rKTogXCIgKyBlbWJlZC5vbGQub3JpZ2luYWwpO1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImVtYmVkIHVwZGF0ZWQgaW4gbm90ZSBbbm90ZSwgb2xkIGxpbmssIG5ldyBsaW5rXTogXFxuICAgXCJcclxuXHRcdFx0XHRcdCsgbm90ZUZpbGUucGF0aCArIFwiXFxuICAgXCIgKyBlbWJlZC5vbGQubGluayArIFwiXFxuICAgXCIgKyBlbWJlZC5uZXdMaW5rKVxyXG5cclxuXHRcdFx0XHRkaXJ0eSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGlydHkpXHJcblx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShub3RlRmlsZSwgdGV4dCk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgdXBkYXRlQ2hhbmdlZExpbmtJbk5vdGUobm90ZVBhdGg6IHN0cmluZywgY2hhbmRlZExpbmtzOiBMaW5rQ2hhbmdlSW5mb1tdKSB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGVQYXRoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGxldCBub3RlRmlsZSA9IHRoaXMuZ2V0RmlsZUJ5UGF0aChub3RlUGF0aCk7XHJcblx0XHRpZiAoIW5vdGVGaWxlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJjYW4ndCB1cGRhdGUgbGlua3MgaW4gbm90ZSwgZmlsZSBub3QgZm91bmQ6IFwiICsgbm90ZVBhdGgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHRleHQgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKG5vdGVGaWxlKTtcclxuXHRcdGxldCBkaXJ0eSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmIChjaGFuZGVkTGlua3MgJiYgY2hhbmRlZExpbmtzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9yIChsZXQgbGluayBvZiBjaGFuZGVkTGlua3MpIHtcclxuXHRcdFx0XHRpZiAobGluay5vbGQubGluayA9PSBsaW5rLm5ld0xpbmspXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuY2hlY2tJc0NvcnJlY3RNYXJrZG93bkxpbmsobGluay5vbGQub3JpZ2luYWwpKSB7XHJcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGxpbmsub2xkLm9yaWdpbmFsLCAnWycgKyBsaW5rLm9sZC5kaXNwbGF5VGV4dCArICddJyArICcoJyArIGxpbmsubmV3TGluayArICcpJyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmNoZWNrSXNDb3JyZWN0V2lraUxpbmsobGluay5vbGQub3JpZ2luYWwpKSB7XHJcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGxpbmsub2xkLm9yaWdpbmFsLCAnW1snICsgbGluay5uZXdMaW5rICsgJ11dJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgbm90ZVBhdGggKyBcIiBoYXMgYmFkIGxpbmsgKGZvcm1hdCBvZiBsaW5rIGlzIG5vdCBtYWVrZG93biBvciB3aWtpIGxpbmspOiBcIiArIGxpbmsub2xkLm9yaWdpbmFsKTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJjYWNoZWQgbGluayB1cGRhdGVkIGluIG5vdGUgW25vdGUsIG9sZCBsaW5rLCBuZXcgbGlua106IFxcbiAgIFwiXHJcblx0XHRcdFx0XHQrIG5vdGVGaWxlLnBhdGggKyBcIlxcbiAgIFwiICsgbGluay5vbGQubGluayArIFwiXFxuICAgXCIgKyBsaW5rLm5ld0xpbmspXHJcblxyXG5cdFx0XHRcdGRpcnR5ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChkaXJ0eSlcclxuXHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KG5vdGVGaWxlLCB0ZXh0KTtcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyByZXBsYWNlQWxsTm90ZVdpa2lsaW5rc1dpdGhNYXJrZG93bkxpbmtzKG5vdGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPExpbmtzQW5kRW1iZWRzQ2hhbmdlZEluZm8+IHtcclxuXHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZVBhdGgpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IHJlczogTGlua3NBbmRFbWJlZHNDaGFuZ2VkSW5mbyA9IHtcclxuXHRcdFx0bGlua3M6IFtdLFxyXG5cdFx0XHRlbWJlZHM6IFtdLFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBub3RlRmlsZSA9IHRoaXMuZ2V0RmlsZUJ5UGF0aChub3RlUGF0aCk7XHJcblx0XHRpZiAoIW5vdGVGaWxlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IodGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJjYW4ndCB1cGRhdGUgd2lraWxpbmtzIGluIG5vdGUsIGZpbGUgbm90IGZvdW5kOiBcIiArIG5vdGVQYXRoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGNhY2hlID0gYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5vdGVQYXRoKTtcclxuXHRcdGxldCBsaW5rcyA9IGNhY2hlLmxpbmtzO1xyXG5cdFx0bGV0IGVtYmVkcyA9IGNhY2hlLmVtYmVkcztcclxuXHRcdGxldCB0ZXh0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChub3RlRmlsZSk7XHJcblx0XHRsZXQgZGlydHkgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoZW1iZWRzKSB7IC8vZW1iZWRzIG11c3QgZ28gZmlyc3QhXHJcblx0XHRcdGZvciAobGV0IGVtYmVkIG9mIGVtYmVkcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNoZWNrSXNDb3JyZWN0V2lraUVtYmVkKGVtYmVkLm9yaWdpbmFsKSkge1xyXG5cclxuXHRcdFx0XHRcdGxldCBuZXdQYXRoID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckxpbmsoZW1iZWQubGluaylcclxuXHRcdFx0XHRcdGxldCBuZXdMaW5rID0gJyFbJyArICddJyArICcoJyArIG5ld1BhdGggKyAnKSdcclxuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoZW1iZWQub3JpZ2luYWwsIG5ld0xpbmspO1xyXG5cclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuY29uc29sZUxvZ1ByZWZpeCArIFwid2lraSBsaW5rIChlbWJlZCkgcmVwbGFjZWQgaW4gbm90ZSBbbm90ZSwgb2xkIGxpbmssIG5ldyBsaW5rXTogXFxuICAgXCJcclxuXHRcdFx0XHRcdFx0KyBub3RlRmlsZS5wYXRoICsgXCJcXG4gICBcIiArIGVtYmVkLm9yaWdpbmFsICsgXCJcXG4gICBcIiArIG5ld0xpbmspXHJcblxyXG5cdFx0XHRcdFx0cmVzLmVtYmVkcy5wdXNoKHsgb2xkOiBlbWJlZCwgbmV3TGluazogbmV3TGluayB9KVxyXG5cclxuXHRcdFx0XHRcdGRpcnR5ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobGlua3MpIHtcclxuXHRcdFx0Zm9yIChsZXQgbGluayBvZiBsaW5rcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNoZWNrSXNDb3JyZWN0V2lraUxpbmsobGluay5vcmlnaW5hbCkpIHtcclxuXHRcdFx0XHRcdGxldCBuZXdQYXRoID0gVXRpbHMubm9ybWFsaXplUGF0aEZvckxpbmsobGluay5saW5rKVxyXG5cclxuXHRcdFx0XHRcdGxldCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChsaW5rLmxpbmssIG5vdGVQYXRoKTtcclxuXHRcdFx0XHRcdGlmIChmaWxlICYmIGZpbGUuZXh0ZW5zaW9uID09IFwibWRcIiAmJiAhbmV3UGF0aC5lbmRzV2l0aChcIi5tZFwiKSlcclxuXHRcdFx0XHRcdFx0bmV3UGF0aCA9IG5ld1BhdGggKyBcIi5tZFwiO1xyXG5cclxuXHRcdFx0XHRcdGxldCBuZXdMaW5rID0gJ1snICsgbGluay5kaXNwbGF5VGV4dCArICddJyArICcoJyArIG5ld1BhdGggKyAnKSdcclxuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UobGluay5vcmlnaW5hbCwgbmV3TGluayk7XHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJ3aWtpIGxpbmsgcmVwbGFjZWQgaW4gbm90ZSBbbm90ZSwgb2xkIGxpbmssIG5ldyBsaW5rXTogXFxuICAgXCJcclxuXHRcdFx0XHRcdFx0KyBub3RlRmlsZS5wYXRoICsgXCJcXG4gICBcIiArIGxpbmsub3JpZ2luYWwgKyBcIlxcbiAgIFwiICsgbmV3TGluaylcclxuXHJcblx0XHRcdFx0XHRyZXMubGlua3MucHVzaCh7IG9sZDogbGluaywgbmV3TGluazogbmV3TGluayB9KVxyXG5cclxuXHRcdFx0XHRcdGRpcnR5ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZGlydHkpXHJcblx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShub3RlRmlsZSwgdGV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBDYWNoZWRNZXRhZGF0YSwgUmVmZXJlbmNlQ2FjaGUsIFRBYnN0cmFjdEZpbGUsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBMaW5rc0hhbmRsZXIsIFBhdGhDaGFuZ2VJbmZvIH0gZnJvbSAnLi9saW5rcy1oYW5kbGVyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gJy4vcGF0aCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vdmVkQXR0YWNobWVudFJlc3VsdCB7XHJcblx0bW92ZWRBdHRhY2htZW50czogUGF0aENoYW5nZUluZm9bXVxyXG5cdHJlbmFtZWRGaWxlczogUGF0aENoYW5nZUluZm9bXSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVzSGFuZGxlciB7XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGFwcDogQXBwLFxyXG5cdFx0cHJpdmF0ZSBsaDogTGlua3NIYW5kbGVyLFxyXG5cdFx0cHJpdmF0ZSBjb25zb2xlTG9nUHJlZml4OiBzdHJpbmcgPSBcIlwiLFxyXG5cdFx0cHJpdmF0ZSBpZ25vcmVGb2xkZXJzOiBzdHJpbmdbXSA9IFtdLFxyXG5cdFx0cHJpdmF0ZSBpZ25vcmVGaWxlc1JlZ2V4OiBSZWdFeHBbXSA9IFtdLFxyXG5cdCkgeyB9XHJcblxyXG5cdGlzUGF0aElnbm9yZWQocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZiAocGF0aC5zdGFydHNXaXRoKFwiLi9cIikpXHJcblx0XHRcdHBhdGggPSBwYXRoLnN1YnN0cmluZygyKTtcclxuXHJcblx0XHRmb3IgKGxldCBmb2xkZXIgb2YgdGhpcy5pZ25vcmVGb2xkZXJzKSB7XHJcblx0XHRcdGlmIChwYXRoLnN0YXJ0c1dpdGgoZm9sZGVyKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgZmlsZVJlZ2V4IG9mIHRoaXMuaWdub3JlRmlsZXNSZWdleCkge1xyXG5cdFx0XHRsZXQgdGVzdFJlc3VsdCA9IGZpbGVSZWdleC50ZXN0KHBhdGgpXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHBhdGgsZmlsZVJlZ2V4LHRlc3RSZXN1bHQpXHJcblx0XHRcdGlmKHRlc3RSZXN1bHQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgY3JlYXRlRm9sZGVyRm9yQXR0YWNobWVudEZyb21MaW5rKGxpbms6IHN0cmluZywgb3duaW5nTm90ZVBhdGg6IHN0cmluZykge1xyXG5cdFx0bGV0IG5ld0Z1bGxQYXRoID0gdGhpcy5saC5nZXRGdWxsUGF0aEZvckxpbmsobGluaywgb3duaW5nTm90ZVBhdGgpO1xyXG5cdFx0cmV0dXJuIGF3YWl0IHRoaXMuY3JlYXRlRm9sZGVyRm9yQXR0YWNobWVudEZyb21QYXRoKG5ld0Z1bGxQYXRoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZUZvbGRlckZvckF0dGFjaG1lbnRGcm9tUGF0aChmaWxlUGF0aDogc3RyaW5nKSB7XHJcblx0XHRsZXQgbmV3UGFyZW50Rm9sZGVyID0gZmlsZVBhdGguc3Vic3RyaW5nKDAsIGZpbGVQYXRoLmxhc3RJbmRleE9mKFwiL1wiKSk7XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvL3RvZG8gY2hlY2sgZmlsZGVyIGV4aXN0XHJcblx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNyZWF0ZUZvbGRlcihuZXdQYXJlbnRGb2xkZXIpXHJcblx0XHR9IGNhdGNoIHsgfVxyXG5cdH1cclxuXHJcblx0Z2VuZXJhdGVGaWxlQ29weU5hbWUob3JpZ2luYWxOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0bGV0IGV4dCA9IHBhdGguZXh0bmFtZShvcmlnaW5hbE5hbWUpO1xyXG5cdFx0bGV0IGJhc2VOYW1lID0gcGF0aC5iYXNlbmFtZShvcmlnaW5hbE5hbWUsIGV4dCk7XHJcblx0XHRsZXQgZGlyID0gcGF0aC5kaXJuYW1lKG9yaWdpbmFsTmFtZSk7XHJcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8IDEwMDAwMDsgaSsrKSB7XHJcblx0XHRcdGxldCBuZXdOYW1lID0gZGlyICsgXCIvXCIgKyBiYXNlTmFtZSArIFwiIFwiICsgaSArIGV4dDtcclxuXHRcdFx0bGV0IGV4aXN0RmlsZSA9IHRoaXMubGguZ2V0RmlsZUJ5UGF0aChuZXdOYW1lKTtcclxuXHRcdFx0aWYgKCFleGlzdEZpbGUpXHJcblx0XHRcdFx0cmV0dXJuIG5ld05hbWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG1vdmVDYWNoZWROb3RlQXR0YWNobWVudHMob2xkTm90ZVBhdGg6IHN0cmluZywgbmV3Tm90ZVBhdGg6IHN0cmluZyxcclxuXHRcdGRlbGV0ZUV4aXN0RmlsZXM6IGJvb2xlYW4sIGF0dGFjaG1lbnRzU3ViZm9sZGVyOiBzdHJpbmcsIGRlbGV0ZUVtcHR5Rm9sZGVyczogYm9vbGVhbik6IFByb21pc2U8TW92ZWRBdHRhY2htZW50UmVzdWx0PiB7XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChvbGROb3RlUGF0aCkgfHwgdGhpcy5pc1BhdGhJZ25vcmVkKG5ld05vdGVQYXRoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdC8vdHJ5IHRvIGdldCBlbWJlZHMgZm9yIG9sZCBvciBuZXcgcGF0aCAobWV0YWRhdGFDYWNoZSBjYW4gYmUgdXBkYXRlZCBvciBub3QpXHJcblx0XHQvLyEhISB0aGlzIGNhbiByZXR1cm4gdW5kZWZpbmVkIGlmIG5vdGUgd2FzIGp1c3QgdXBkYXRlZFxyXG5cclxuXHRcdGxldCBlbWJlZHMgPSAoYXdhaXQgVXRpbHMuZ2V0Q2FjaGVTYWZlKG5ld05vdGVQYXRoKSkuZW1iZWRzO1xyXG5cclxuXHRcdGlmICghZW1iZWRzKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IHJlc3VsdDogTW92ZWRBdHRhY2htZW50UmVzdWx0ID0ge1xyXG5cdFx0XHRtb3ZlZEF0dGFjaG1lbnRzOiBbXSxcclxuXHRcdFx0cmVuYW1lZEZpbGVzOiBbXVxyXG5cdFx0fTtcclxuXHJcblx0XHRmb3IgKGxldCBlbWJlZCBvZiBlbWJlZHMpIHtcclxuXHRcdFx0bGV0IGxpbmsgPSBlbWJlZC5saW5rO1xyXG5cdFx0XHRsZXQgb2xkTGlua1BhdGggPSB0aGlzLmxoLmdldEZ1bGxQYXRoRm9yTGluayhsaW5rLCBvbGROb3RlUGF0aCk7XHJcblxyXG5cdFx0XHRpZiAocmVzdWx0Lm1vdmVkQXR0YWNobWVudHMuZmluZEluZGV4KHggPT4geC5vbGRQYXRoID09IG9sZExpbmtQYXRoKSAhPSAtMSlcclxuXHRcdFx0XHRjb250aW51ZTsvL2FscmVhZHkgbW92ZWRcclxuXHJcblx0XHRcdGxldCBmaWxlID0gdGhpcy5saC5nZXRGaWxlQnlMaW5rKGxpbmssIG9sZE5vdGVQYXRoKTtcclxuXHRcdFx0aWYgKCFmaWxlKSB7XHJcblx0XHRcdFx0ZmlsZSA9IHRoaXMubGguZ2V0RmlsZUJ5TGluayhsaW5rLCBuZXdOb3RlUGF0aCk7XHJcblx0XHRcdFx0aWYgKCFmaWxlKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuY29uc29sZUxvZ1ByZWZpeCArIG9sZE5vdGVQYXRoICsgXCIgaGFzIGJhZCBlbWJlZCAoZmlsZSBkb2VzIG5vdCBleGlzdCk6IFwiICsgbGluayk7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vaWYgYXR0YWNobWVudCBub3QgaW4gdGhlIG5vdGUgZm9sZGVyLCBza2lwIGl0XHJcblx0XHRcdC8vID0gXCIuXCIgbWVhbnMgdGhhdCBub3RlIHdhcyBhdCByb290IHBhdGgsIHNvIGRvIG5vdCBza2lwIGl0XHJcblx0XHRcdGlmIChwYXRoLmRpcm5hbWUob2xkTm90ZVBhdGgpICE9IFwiLlwiICYmICFwYXRoLmRpcm5hbWUob2xkTGlua1BhdGgpLnN0YXJ0c1dpdGgocGF0aC5kaXJuYW1lKG9sZE5vdGVQYXRoKSkpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRsZXQgbmV3TGlua1BhdGggPSB0aGlzLmdldE5ld0F0dGFjaG1lbnRQYXRoKGZpbGUucGF0aCwgbmV3Tm90ZVBhdGgsIGF0dGFjaG1lbnRzU3ViZm9sZGVyKTtcclxuXHJcblx0XHRcdGlmIChuZXdMaW5rUGF0aCA9PSBmaWxlLnBhdGgpIC8vbm90aGluZyB0byBtb3ZlXHJcblx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRsZXQgcmVzID0gYXdhaXQgdGhpcy5tb3ZlQXR0YWNobWVudChmaWxlLCBuZXdMaW5rUGF0aCwgW29sZE5vdGVQYXRoLCBuZXdOb3RlUGF0aF0sIGRlbGV0ZUV4aXN0RmlsZXMsIGRlbGV0ZUVtcHR5Rm9sZGVycyk7XHJcblx0XHRcdHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzID0gcmVzdWx0Lm1vdmVkQXR0YWNobWVudHMuY29uY2F0KHJlcy5tb3ZlZEF0dGFjaG1lbnRzKTtcclxuXHRcdFx0cmVzdWx0LnJlbmFtZWRGaWxlcyA9IHJlc3VsdC5yZW5hbWVkRmlsZXMuY29uY2F0KHJlcy5yZW5hbWVkRmlsZXMpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Z2V0TmV3QXR0YWNobWVudFBhdGgob2xkQXR0YWNobWVudFBhdGg6IHN0cmluZywgbm90ZVBhdGg6IHN0cmluZywgc3ViZm9sZGVyTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdGxldCByZXNvbHZlZFN1YkZvbGRlck5hbWUgPSBzdWJmb2xkZXJOYW1lLnJlcGxhY2UoL1xcJHtmaWxlbmFtZX0vZywgcGF0aC5iYXNlbmFtZShub3RlUGF0aCwgXCIubWRcIikpO1xyXG5cdFx0bGV0IG5ld1BhdGggPSAocmVzb2x2ZWRTdWJGb2xkZXJOYW1lID09IFwiXCIpID8gcGF0aC5kaXJuYW1lKG5vdGVQYXRoKSA6IHBhdGguam9pbihwYXRoLmRpcm5hbWUobm90ZVBhdGgpLCByZXNvbHZlZFN1YkZvbGRlck5hbWUpO1xyXG5cdFx0bmV3UGF0aCA9IFV0aWxzLm5vcm1hbGl6ZVBhdGhGb3JGaWxlKHBhdGguam9pbihuZXdQYXRoLCBwYXRoLmJhc2VuYW1lKG9sZEF0dGFjaG1lbnRQYXRoKSkpO1xyXG5cdFx0cmV0dXJuIG5ld1BhdGg7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgY29sbGVjdEF0dGFjaG1lbnRzRm9yQ2FjaGVkTm90ZShub3RlUGF0aDogc3RyaW5nLCBzdWJmb2xkZXJOYW1lOiBzdHJpbmcsXHJcblx0XHRkZWxldGVFeGlzdEZpbGVzOiBib29sZWFuLCBkZWxldGVFbXB0eUZvbGRlcnM6IGJvb2xlYW4pOiBQcm9taXNlPE1vdmVkQXR0YWNobWVudFJlc3VsdD4ge1xyXG5cclxuXHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZVBhdGgpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IHJlc3VsdDogTW92ZWRBdHRhY2htZW50UmVzdWx0ID0ge1xyXG5cdFx0XHRtb3ZlZEF0dGFjaG1lbnRzOiBbXSxcclxuXHRcdFx0cmVuYW1lZEZpbGVzOiBbXVxyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCBjYWNoZSA9IGF3YWl0IFV0aWxzLmdldENhY2hlU2FmZShub3RlUGF0aCk7XHJcblxyXG5cdFx0Zm9yIChsZXQgcmVmZXJlbmNlIG9mIHRoaXMuZ2V0UmVmZXJlbmNlcyhjYWNoZSkpIHtcclxuXHRcdFx0bGV0IGxpbmsgPSB0aGlzLmxoLnNwbGl0TGlua1RvUGF0aEFuZFNlY3Rpb24ocmVmZXJlbmNlLmxpbmspLmxpbms7XHJcblxyXG5cdFx0XHRpZiAobGluay5zdGFydHNXaXRoKFwiI1wiKSkge1xyXG5cdFx0XHRcdC8vIGludGVybmFsIHNlY3Rpb24gbGlua1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgZnVsbFBhdGhMaW5rID0gdGhpcy5saC5nZXRGdWxsUGF0aEZvckxpbmsobGluaywgbm90ZVBhdGgpO1xyXG5cdFx0XHRpZiAocmVzdWx0Lm1vdmVkQXR0YWNobWVudHMuZmluZEluZGV4KHggPT4geC5vbGRQYXRoID09IGZ1bGxQYXRoTGluaykgIT0gLTEpIHtcclxuXHRcdFx0XHQvLyBhbHJlYWR5IG1vdmVkXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBmaWxlID0gdGhpcy5saC5nZXRGaWxlQnlMaW5rKGxpbmssIG5vdGVQYXRoKVxyXG5cdFx0XHRpZiAoIWZpbGUpIHtcclxuXHRcdFx0XHRjb25zdCB0eXBlID0gcmVmZXJlbmNlLm9yaWdpbmFsLnN0YXJ0c1dpdGgoXCIhXCIpID8gXCJlbWJlZFwiIDogXCJsaW5rXCI7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgJHt0aGlzLmNvbnNvbGVMb2dQcmVmaXh9JHtub3RlUGF0aH0gaGFzIGJhZCAke3R5cGV9IChmaWxlIGRvZXMgbm90IGV4aXN0KTogJHtsaW5rfWApO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBleHRlbnNpb24gPSBmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0aWYgKGV4dGVuc2lvbiA9PT0gXCJtZFwiIHx8IGZpbGUuZXh0ZW5zaW9uID09PSBcImNhbnZhc1wiKSB7XHJcblx0XHRcdFx0Ly8gaW50ZXJuYWwgZmlsZSBsaW5rXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBuZXdQYXRoID0gdGhpcy5nZXROZXdBdHRhY2htZW50UGF0aChmaWxlLnBhdGgsIG5vdGVQYXRoLCBzdWJmb2xkZXJOYW1lKTtcclxuXHJcblx0XHRcdGlmIChuZXdQYXRoID09IGZpbGUucGF0aCkge1xyXG5cdFx0XHRcdC8vIG5vdGhpbmcgdG8gbW92ZVxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgcmVzID0gYXdhaXQgdGhpcy5tb3ZlQXR0YWNobWVudChmaWxlLCBuZXdQYXRoLCBbbm90ZVBhdGhdLCBkZWxldGVFeGlzdEZpbGVzLCBkZWxldGVFbXB0eUZvbGRlcnMpO1xyXG5cclxuXHRcdFx0cmVzdWx0Lm1vdmVkQXR0YWNobWVudHMgPSByZXN1bHQubW92ZWRBdHRhY2htZW50cy5jb25jYXQocmVzLm1vdmVkQXR0YWNobWVudHMpO1xyXG5cdFx0XHRyZXN1bHQucmVuYW1lZEZpbGVzID0gcmVzdWx0LnJlbmFtZWRGaWxlcy5jb25jYXQocmVzLnJlbmFtZWRGaWxlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyBtb3ZlQXR0YWNobWVudChmaWxlOiBURmlsZSwgbmV3TGlua1BhdGg6IHN0cmluZywgcGFyZW50Tm90ZVBhdGhzOiBzdHJpbmdbXSwgZGVsZXRlRXhpc3RGaWxlczogYm9vbGVhbiwgZGVsZXRlRW1wdHlGb2xkZXJzOiBib29sZWFuKTogUHJvbWlzZTxNb3ZlZEF0dGFjaG1lbnRSZXN1bHQ+IHtcclxuXHRcdGNvbnN0IHBhdGggPSBmaWxlLnBhdGg7XHJcblxyXG5cdFx0bGV0IHJlc3VsdDogTW92ZWRBdHRhY2htZW50UmVzdWx0ID0ge1xyXG5cdFx0XHRtb3ZlZEF0dGFjaG1lbnRzOiBbXSxcclxuXHRcdFx0cmVuYW1lZEZpbGVzOiBbXVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKHBhdGgpKVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHJcblx0XHRpZiAocGF0aCA9PSBuZXdMaW5rUGF0aCkge1xyXG5cdFx0XHRjb25zb2xlLndhcm4odGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJDYW4ndCBtb3ZlIGZpbGUuIFNvdXJjZSBhbmQgZGVzdGluYXRpb24gcGF0aCB0aGUgc2FtZS5cIilcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCB0aGlzLmNyZWF0ZUZvbGRlckZvckF0dGFjaG1lbnRGcm9tUGF0aChuZXdMaW5rUGF0aCk7XHJcblxyXG5cdFx0bGV0IGxpbmtlZE5vdGVzID0gYXdhaXQgdGhpcy5saC5nZXRDYWNoZWROb3Rlc1RoYXRIYXZlTGlua1RvRmlsZShwYXRoKTtcclxuXHRcdGlmIChwYXJlbnROb3RlUGF0aHMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZVBhdGggb2YgcGFyZW50Tm90ZVBhdGhzKSB7XHJcblx0XHRcdFx0bGlua2VkTm90ZXMucmVtb3ZlKG5vdGVQYXRoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwYXRoICE9PSBmaWxlLnBhdGgpIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKHRoaXMuY29uc29sZUxvZ1ByZWZpeCArIFwiRmlsZSB3YXMgbW92ZWQgYWxyZWFkeVwiKVxyXG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5tb3ZlQXR0YWNobWVudChmaWxlLCBuZXdMaW5rUGF0aCwgcGFyZW50Tm90ZVBhdGhzLCBkZWxldGVFeGlzdEZpbGVzLCBkZWxldGVFbXB0eUZvbGRlcnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vaWYgbm8gb3RoZXIgZmlsZSBoYXMgbGluayB0byB0aGlzIGZpbGUgLSB0cnkgdG8gbW92ZSBmaWxlXHJcblx0XHQvL2lmIGZpbGUgYWxyZWFkeSBleGlzdCBhdCBuZXcgbG9jYXRpb24gLSBkZWxldGUgb3IgbW92ZSB3aXRoIG5ldyBuYW1lXHJcblx0XHRpZiAobGlua2VkTm90ZXMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0bGV0IGV4aXN0RmlsZSA9IHRoaXMubGguZ2V0RmlsZUJ5UGF0aChuZXdMaW5rUGF0aCk7XHJcblx0XHRcdGlmICghZXhpc3RGaWxlKSB7XHJcblx0XHRcdFx0Ly9tb3ZlXHJcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5jb25zb2xlTG9nUHJlZml4ICsgXCJtb3ZlIGZpbGUgW2Zyb20sIHRvXTogXFxuICAgXCIgKyBwYXRoICsgXCJcXG4gICBcIiArIG5ld0xpbmtQYXRoKVxyXG5cdFx0XHRcdHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLnB1c2goeyBvbGRQYXRoOiBwYXRoLCBuZXdQYXRoOiBuZXdMaW5rUGF0aCB9KVxyXG5cdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlbmFtZShmaWxlLCBuZXdMaW5rUGF0aCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKGRlbGV0ZUV4aXN0RmlsZXMpIHtcclxuXHRcdFx0XHRcdC8vZGVsZXRlXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImRlbGV0ZSBmaWxlOiBcXG4gICBcIiArIHBhdGgpXHJcblx0XHRcdFx0XHRyZXN1bHQubW92ZWRBdHRhY2htZW50cy5wdXNoKHsgb2xkUGF0aDogcGF0aCwgbmV3UGF0aDogbmV3TGlua1BhdGggfSlcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuZGVsZXRlRmlsZShmaWxlLCBkZWxldGVFbXB0eUZvbGRlcnMpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvL21vdmUgd2l0aCBuZXcgbmFtZVxyXG5cdFx0XHRcdFx0bGV0IG5ld0ZpbGVDb3B5TmFtZSA9IHRoaXMuZ2VuZXJhdGVGaWxlQ29weU5hbWUobmV3TGlua1BhdGgpXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImNvcHkgZmlsZSB3aXRoIG5ldyBuYW1lIFtmcm9tLCB0b106IFxcbiAgIFwiICsgcGF0aCArIFwiXFxuICAgXCIgKyBuZXdGaWxlQ29weU5hbWUpXHJcblx0XHRcdFx0XHRyZXN1bHQubW92ZWRBdHRhY2htZW50cy5wdXNoKHsgb2xkUGF0aDogcGF0aCwgbmV3UGF0aDogbmV3RmlsZUNvcHlOYW1lIH0pXHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC5yZW5hbWUoZmlsZSwgbmV3RmlsZUNvcHlOYW1lKTtcclxuXHRcdFx0XHRcdHJlc3VsdC5yZW5hbWVkRmlsZXMucHVzaCh7IG9sZFBhdGg6IG5ld0xpbmtQYXRoLCBuZXdQYXRoOiBuZXdGaWxlQ29weU5hbWUgfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vaWYgc29tZSBvdGhlciBmaWxlIGhhcyBsaW5rIHRvIHRoaXMgZmlsZSAtIHRyeSB0byBjb3B5IGZpbGVcclxuXHRcdC8vaWYgZmlsZSBhbHJlYWR5IGV4aXN0IGF0IG5ldyBsb2NhdGlvbiAtIGNvcHkgZmlsZSB3aXRoIG5ldyBuYW1lIG9yIGRvIG5vdGhpbmdcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgZXhpc3RGaWxlID0gdGhpcy5saC5nZXRGaWxlQnlQYXRoKG5ld0xpbmtQYXRoKTtcclxuXHRcdFx0aWYgKCFleGlzdEZpbGUpIHtcclxuXHRcdFx0XHQvL2NvcHlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImNvcHkgZmlsZSBbZnJvbSwgdG9dOiBcXG4gICBcIiArIHBhdGggKyBcIlxcbiAgIFwiICsgbmV3TGlua1BhdGgpXHJcblx0XHRcdFx0cmVzdWx0Lm1vdmVkQXR0YWNobWVudHMucHVzaCh7IG9sZFBhdGg6IHBhdGgsIG5ld1BhdGg6IG5ld0xpbmtQYXRoIH0pXHJcblx0XHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQuY29weShmaWxlLCBuZXdMaW5rUGF0aCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKGRlbGV0ZUV4aXN0RmlsZXMpIHtcclxuXHRcdFx0XHRcdC8vZG8gbm90aGluZ1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvL2NvcHkgd2l0aCBuZXcgbmFtZVxyXG5cdFx0XHRcdFx0bGV0IG5ld0ZpbGVDb3B5TmFtZSA9IHRoaXMuZ2VuZXJhdGVGaWxlQ29weU5hbWUobmV3TGlua1BhdGgpXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImNvcHkgZmlsZSB3aXRoIG5ldyBuYW1lIFtmcm9tLCB0b106IFxcbiAgIFwiICsgcGF0aCArIFwiXFxuICAgXCIgKyBuZXdGaWxlQ29weU5hbWUpXHJcblx0XHRcdFx0XHRyZXN1bHQubW92ZWRBdHRhY2htZW50cy5wdXNoKHsgb2xkUGF0aDogZmlsZS5wYXRoLCBuZXdQYXRoOiBuZXdGaWxlQ29weU5hbWUgfSlcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNvcHkoZmlsZSwgbmV3RmlsZUNvcHlOYW1lKTtcclxuXHRcdFx0XHRcdHJlc3VsdC5yZW5hbWVkRmlsZXMucHVzaCh7IG9sZFBhdGg6IG5ld0xpbmtQYXRoLCBuZXdQYXRoOiBuZXdGaWxlQ29weU5hbWUgfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHRhc3luYyBkZWxldGVFbXB0eUZvbGRlcnMoZGlyTmFtZTogc3RyaW5nKSB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKGRpck5hbWUpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0aWYgKGRpck5hbWUuc3RhcnRzV2l0aChcIi4vXCIpKVxyXG5cdFx0XHRkaXJOYW1lID0gZGlyTmFtZS5zdWJzdHJpbmcoMik7XHJcblxyXG5cclxuXHRcdGxldCBsaXN0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5saXN0KGRpck5hbWUpO1xyXG5cdFx0Zm9yIChsZXQgZm9sZGVyIG9mIGxpc3QuZm9sZGVycykge1xyXG5cdFx0XHRhd2FpdCB0aGlzLmRlbGV0ZUVtcHR5Rm9sZGVycyhmb2xkZXIpXHJcblx0XHR9XHJcblxyXG5cdFx0bGlzdCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIubGlzdChkaXJOYW1lKTtcclxuXHRcdGlmIChsaXN0LmZpbGVzLmxlbmd0aCA9PSAwICYmIGxpc3QuZm9sZGVycy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbnNvbGVMb2dQcmVmaXggKyBcImRlbGV0ZSBlbXB0eSBmb2xkZXI6IFxcbiAgIFwiICsgZGlyTmFtZSlcclxuXHRcdFx0aWYgKGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKGRpck5hbWUpKVxyXG5cdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIucm1kaXIoZGlyTmFtZSwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlVW51c2VkQXR0YWNobWVudHNGb3JDYWNoZWROb3RlKG5vdGVQYXRoOiBzdHJpbmcsIGNhY2hlOiBDYWNoZWRNZXRhZGF0YSwgZGVsZXRlRW1wdHlGb2xkZXJzOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGVQYXRoKSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGZvciAobGV0IHJlZmVyZW5jZSBvZiB0aGlzLmdldFJlZmVyZW5jZXMoY2FjaGUpKSB7XHJcblx0XHRcdGxldCBsaW5rID0gcmVmZXJlbmNlLmxpbms7XHJcblx0XHRcdGNvbnN0IGZpbGUgPSB0aGlzLmxoLmdldEZpbGVCeUxpbmsobGluaywgbm90ZVBhdGgsIGZhbHNlKTtcclxuXHJcblx0XHRcdGlmICghZmlsZSB8fCBmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpID09PSBcIm1kXCIpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGxpbmtlZE5vdGVzID0gYXdhaXQgdGhpcy5saC5nZXRDYWNoZWROb3Rlc1RoYXRIYXZlTGlua1RvRmlsZShmaWxlLnBhdGgpO1xyXG5cdFx0XHRpZiAobGlua2VkTm90ZXMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5kZWxldGVGaWxlKGZpbGUsIGRlbGV0ZUVtcHR5Rm9sZGVycyk7XHJcblx0XHRcdFx0fSBjYXRjaCB7IH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0UmVmZXJlbmNlcyhjYWNoZTogQ2FjaGVkTWV0YWRhdGEpOiBSZWZlcmVuY2VDYWNoZVtdIHtcclxuXHRcdHJldHVybiBbLi4uKGNhY2hlLmVtYmVkcyA/PyBbXSksIC4uLihjYWNoZS5saW5rcyA/PyBbXSldO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgZGVsZXRlRmlsZShmaWxlOiBURmlsZSwgZGVsZXRlRW1wdHlGb2xkZXJzOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC50cmFzaChmaWxlLCB0cnVlKTtcclxuXHRcdGlmIChkZWxldGVFbXB0eUZvbGRlcnMpIHtcclxuXHRcdFx0bGV0IGRpciA9IGZpbGUucGFyZW50O1xyXG5cdFx0XHR3aGlsZSAoZGlyLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LnRyYXNoKGRpciwgdHJ1ZSk7XHJcblx0XHRcdFx0ZGlyID0gZGlyLnBhcmVudDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpbiwgVEFic3RyYWN0RmlsZSwgVEZpbGUsIEVtYmVkQ2FjaGUsIExpbmtDYWNoZSwgTm90aWNlLCBFZGl0b3IsIE1hcmtkb3duVmlldywgQ2FjaGVkTWV0YWRhdGEgfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IFBsdWdpblNldHRpbmdzLCBERUZBVUxUX1NFVFRJTkdTLCBTZXR0aW5nVGFiIH0gZnJvbSAnLi9zZXR0aW5ncyc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IExpbmtzSGFuZGxlciwgUGF0aENoYW5nZUluZm8gfSBmcm9tICcuL2xpbmtzLWhhbmRsZXInO1xyXG5pbXBvcnQgeyBGaWxlc0hhbmRsZXIsIE1vdmVkQXR0YWNobWVudFJlc3VsdCB9IGZyb20gJy4vZmlsZXMtaGFuZGxlcic7XHJcbmltcG9ydCB7IHBhdGggfSBmcm9tICcuL3BhdGgnO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc2lzdGVudEF0dGFjaG1lbnRzQW5kTGlua3MgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncztcclxuXHRsaDogTGlua3NIYW5kbGVyO1xyXG5cdGZoOiBGaWxlc0hhbmRsZXI7XHJcblxyXG5cdHJlY2VudGx5UmVuYW1lZEZpbGVzOiBQYXRoQ2hhbmdlSW5mb1tdID0gW107XHJcblx0Y3VycmVudGx5UmVuYW1pbmdGaWxlczogUGF0aENoYW5nZUluZm9bXSA9IFtdO1xyXG5cdHRpbWVySWQ6IE5vZGVKUy5UaW1lb3V0O1xyXG5cdHJlbmFtaW5nSXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0ZGVsZXRlZE5vdGVDYWNoZTogTWFwPHN0cmluZywgQ2FjaGVkTWV0YWRhdGE+ID0gbmV3IE1hcDxzdHJpbmcsIENhY2hlZE1ldGFkYXRhPigpO1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudChcclxuXHRcdFx0dGhpcy5hcHAubWV0YWRhdGFDYWNoZS5vbignZGVsZXRlZCcsIChmaWxlLCBwcmV2Q2FjaGUpID0+IHRoaXMuaGFuZGxlRGVsZXRlZE1ldGFkYXRhKGZpbGUsIHByZXZDYWNoZSkpLFxyXG5cdFx0KTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcblx0XHRcdHRoaXMuYXBwLnZhdWx0Lm9uKCdkZWxldGUnLCAoZmlsZSkgPT4gdGhpcy5oYW5kbGVEZWxldGVkRmlsZShmaWxlKSksXHJcblx0XHQpO1xyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudChcclxuXHRcdFx0dGhpcy5hcHAudmF1bHQub24oJ3JlbmFtZScsIChmaWxlLCBvbGRQYXRoKSA9PiB0aGlzLmhhbmRsZVJlbmFtZWRGaWxlKGZpbGUsIG9sZFBhdGgpKSxcclxuXHRcdCk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdjb2xsZWN0LWFsbC1hdHRhY2htZW50cycsXHJcblx0XHRcdG5hbWU6ICdDb2xsZWN0IEFsbCBBdHRhY2htZW50cycsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNvbGxlY3RBbGxBdHRhY2htZW50cygpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2NvbGxlY3QtYXR0YWNobWVudHMtY3VycmVudC1ub3RlJyxcclxuXHRcdFx0bmFtZTogJ0NvbGxlY3QgQXR0YWNobWVudHMgaW4gQ3VycmVudCBOb3RlJyxcclxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB0aGlzLmNvbGxlY3RBdHRhY2htZW50c0N1cnJlbnROb3RlKGVkaXRvciwgdmlldylcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnZGVsZXRlLWVtcHR5LWZvbGRlcnMnLFxyXG5cdFx0XHRuYW1lOiAnRGVsZXRlIEVtcHR5IEZvbGRlcnMnLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5kZWxldGVFbXB0eUZvbGRlcnMoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdjb252ZXJ0LWFsbC1saW5rLXBhdGhzLXRvLXJlbGF0aXZlJyxcclxuXHRcdFx0bmFtZTogJ0NvbnZlcnQgQWxsIExpbmsgUGF0aHMgdG8gUmVsYXRpdmUnLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5jb252ZXJ0QWxsTGlua1BhdGhzVG9SZWxhdGl2ZSgpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2NvbnZlcnQtYWxsLWVtYmVkLXBhdGhzLXRvLXJlbGF0aXZlJyxcclxuXHRcdFx0bmFtZTogJ0NvbnZlcnQgQWxsIEVtYmVkIFBhdGhzIHRvIFJlbGF0aXZlJyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuY29udmVydEFsbEVtYmVkc1BhdGhzVG9SZWxhdGl2ZSgpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ3JlcGxhY2UtYWxsLXdpa2lsaW5rcy13aXRoLW1hcmtkb3duLWxpbmtzJyxcclxuXHRcdFx0bmFtZTogJ1JlcGxhY2UgQWxsIFdpa2kgTGlua3Mgd2l0aCBNYXJrZG93biBMaW5rcycsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLnJlcGxhY2VBbGxXaWtpbGlua3NXaXRoTWFya2Rvd25MaW5rcygpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ3Jlb3JnYW5pemUtdmF1bHQnLFxyXG5cdFx0XHRuYW1lOiAnUmVvcmdhbml6ZSBWYXVsdCcsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLnJlb3JnYW5pemVWYXVsdCgpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2NoZWNrLWNvbnNpc3RlbmN5JyxcclxuXHRcdFx0bmFtZTogJ0NoZWNrIFZhdWx0IGNvbnNpc3RlbmN5JyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuY2hlY2tDb25zaXN0ZW5jeSgpXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBtYWtlIHJlZ2V4IGZyb20gZ2l2ZW4gc3RyaW5ncyBcclxuXHRcdHRoaXMuc2V0dGluZ3MuaWdub3JlRmlsZXNSZWdleCA9IHRoaXMuc2V0dGluZ3MuaWdub3JlRmlsZXMubWFwKHZhbD0+UmVnRXhwKHZhbCkpXHJcblxyXG5cdFx0dGhpcy5saCA9IG5ldyBMaW5rc0hhbmRsZXIoXHJcblx0XHRcdHRoaXMuYXBwLFxyXG5cdFx0XHRcIkNvbnNpc3RlbnQgQXR0YWNobWVudHMgYW5kIExpbmtzOiBcIixcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5pZ25vcmVGb2xkZXJzLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmlnbm9yZUZpbGVzUmVnZXhcclxuXHRcdCk7XHJcblxyXG5cdFx0dGhpcy5maCA9IG5ldyBGaWxlc0hhbmRsZXIoXHJcblx0XHRcdHRoaXMuYXBwLFxyXG5cdFx0XHR0aGlzLmxoLFxyXG5cdFx0XHRcIkNvbnNpc3RlbnQgQXR0YWNobWVudHMgYW5kIExpbmtzOiBcIixcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5pZ25vcmVGb2xkZXJzLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmlnbm9yZUZpbGVzUmVnZXhcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRpc1BhdGhJZ25vcmVkKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHBhdGguc3RhcnRzV2l0aChcIi4vXCIpKVxyXG5cdFx0XHRwYXRoID0gcGF0aC5zdWJzdHJpbmcoMik7XHJcblxyXG5cdFx0Zm9yIChsZXQgZm9sZGVyIG9mIHRoaXMuc2V0dGluZ3MuaWdub3JlRm9sZGVycykge1xyXG5cdFx0XHRpZiAocGF0aC5zdGFydHNXaXRoKGZvbGRlcikpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IGZpbGVSZWdleCBvZiB0aGlzLnNldHRpbmdzLmlnbm9yZUZpbGVzUmVnZXgpIHtcclxuXHRcdFx0aWYgKGZpbGVSZWdleC50ZXN0KHBhdGgpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGhhbmRsZURlbGV0ZWRNZXRhZGF0YShmaWxlOiBURmlsZSwgcHJldkNhY2hlOiBDYWNoZWRNZXRhZGF0YSkge1xyXG5cdFx0aWYgKCFwcmV2Q2FjaGUgfHwgIXRoaXMuc2V0dGluZ3MuZGVsZXRlQXR0YWNobWVudHNXaXRoTm90ZSB8fCB0aGlzLmlzUGF0aElnbm9yZWQoZmlsZS5wYXRoKSB8fCBmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpICE9PSBcIm1kXCIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGVsZXRlZE5vdGVDYWNoZS5zZXQoZmlsZS5wYXRoLCBwcmV2Q2FjaGUpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaGFuZGxlRGVsZXRlZEZpbGUoZmlsZTogVEFic3RyYWN0RmlsZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChmaWxlLnBhdGgpKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0bGV0IGZpbGVFeHQgPSBmaWxlLnBhdGguc3Vic3RyaW5nKGZpbGUucGF0aC5sYXN0SW5kZXhPZihcIi5cIikpO1xyXG5cdFx0aWYgKGZpbGVFeHQgPT0gXCIubWRcIikge1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5kZWxldGVBdHRhY2htZW50c1dpdGhOb3RlKSB7XHJcblx0XHRcdFx0Y29uc3QgY2FjaGUgPSB0aGlzLmRlbGV0ZWROb3RlQ2FjaGUuZ2V0KGZpbGUucGF0aCk7XHJcblxyXG5cdFx0XHRcdGlmICghY2FjaGUpIHtcclxuXHRcdFx0XHRcdGF3YWl0IFV0aWxzLmRlbGF5KDEwMCk7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLmhhbmRsZURlbGV0ZWRGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5kZWxldGVkTm90ZUNhY2hlLmRlbGV0ZShmaWxlLnBhdGgpO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMuZmguZGVsZXRlVW51c2VkQXR0YWNobWVudHNGb3JDYWNoZWROb3RlKGZpbGUucGF0aCwgY2FjaGUsIHRoaXMuc2V0dGluZ3MuZGVsZXRlRW1wdHlGb2xkZXJzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9kZWxldGUgY2hpbGQgZm9sZGVycyAoZG8gbm90IGRlbGV0ZSBwYXJlbnQpXHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmRlbGV0ZUVtcHR5Rm9sZGVycykge1xyXG5cdFx0XHRcdGlmIChhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhwYXRoLmRpcm5hbWUoZmlsZS5wYXRoKSkpIHtcclxuXHRcdFx0XHRcdGxldCBsaXN0ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5saXN0KHBhdGguZGlybmFtZShmaWxlLnBhdGgpKTtcclxuXHRcdFx0XHRcdGZvciAobGV0IGZvbGRlciBvZiBsaXN0LmZvbGRlcnMpIHtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5maC5kZWxldGVFbXB0eUZvbGRlcnMoZm9sZGVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGhhbmRsZVJlbmFtZWRGaWxlKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xyXG5cdFx0dGhpcy5yZWNlbnRseVJlbmFtZWRGaWxlcy5wdXNoKHsgb2xkUGF0aDogb2xkUGF0aCwgbmV3UGF0aDogZmlsZS5wYXRoIH0pO1xyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpO1xyXG5cdFx0dGhpcy50aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuSGFuZGxlUmVjZW50bHlSZW5hbWVkRmlsZXMoKSB9LCAzMDAwKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIEhhbmRsZVJlY2VudGx5UmVuYW1lZEZpbGVzKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlY2VudGx5UmVuYW1lZEZpbGVzIHx8IHRoaXMucmVjZW50bHlSZW5hbWVkRmlsZXMubGVuZ3RoID09IDApIC8vbm90aGluZyB0byByZW5hbWVcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGlmICh0aGlzLnJlbmFtaW5nSXNBY3RpdmUpIC8vYWxyZWFkeSBzdGFydGVkXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0aGlzLnJlbmFtaW5nSXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuY3VycmVudGx5UmVuYW1pbmdGaWxlcyA9IHRoaXMucmVjZW50bHlSZW5hbWVkRmlsZXM7IC8vY2xlYXIgYXJyYXkgZm9yIHB1c2hpbmcgbmV3IGZpbGVzIGFzeW5jXHJcblx0XHR0aGlzLnJlY2VudGx5UmVuYW1lZEZpbGVzID0gW107XHJcblxyXG5cdFx0bmV3IE5vdGljZShcIkZpeGluZyBjb25zaXN0ZW5jeSBmb3IgXCIgKyB0aGlzLmN1cnJlbnRseVJlbmFtaW5nRmlsZXMubGVuZ3RoICsgXCIgcmVuYW1lZCBmaWxlc1wiICsgXCIuLi5cIik7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNvbnNpc3RlbnQgQXR0YWNobWVudHMgYW5kIExpbmtzOlxcbkZpeGluZyBjb25zaXN0ZW5jeSBmb3IgXCIgKyB0aGlzLmN1cnJlbnRseVJlbmFtaW5nRmlsZXMubGVuZ3RoICsgXCIgcmVuYW1lZCBmaWxlc1wiICsgXCIuLi5cIik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Zm9yIChsZXQgZmlsZSBvZiB0aGlzLmN1cnJlbnRseVJlbmFtaW5nRmlsZXMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKGZpbGUubmV3UGF0aCkgfHwgdGhpcy5pc1BhdGhJZ25vcmVkKGZpbGUub2xkUGF0aCkpXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdC8vIGF3YWl0IFV0aWxzLmRlbGF5KDEwKTsgLy93YWl0aW5nIGZvciB1cGRhdGUgdmF1bHRcclxuXHJcblx0XHRcdFx0bGV0IHJlc3VsdDogTW92ZWRBdHRhY2htZW50UmVzdWx0O1xyXG5cclxuXHRcdFx0XHRsZXQgZmlsZUV4dCA9IGZpbGUub2xkUGF0aC5zdWJzdHJpbmcoZmlsZS5vbGRQYXRoLmxhc3RJbmRleE9mKFwiLlwiKSk7XHJcblxyXG5cdFx0XHRcdGlmIChmaWxlRXh0ID09IFwiLm1kXCIpIHtcclxuXHRcdFx0XHRcdC8vIGF3YWl0IFV0aWxzLmRlbGF5KDUwMCk7Ly93YWl0aW5nIGZvciB1cGRhdGUgbWV0YWRhdGFDYWNoZVxyXG5cclxuXHRcdFx0XHRcdGlmICgocGF0aC5kaXJuYW1lKGZpbGUub2xkUGF0aCkgIT0gcGF0aC5kaXJuYW1lKGZpbGUubmV3UGF0aCkpIHx8ICh0aGlzLnNldHRpbmdzLmF0dGFjaG1lbnRzU3ViZm9sZGVyLmNvbnRhaW5zKFwiJHtmaWxlbmFtZX1cIikpKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLm1vdmVBdHRhY2htZW50c1dpdGhOb3RlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gYXdhaXQgdGhpcy5maC5tb3ZlQ2FjaGVkTm90ZUF0dGFjaG1lbnRzKFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5vbGRQYXRoLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5uZXdQYXRoLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kZWxldGVFeGlzdEZpbGVzV2hlbk1vdmVOb3RlLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5hdHRhY2htZW50c1N1YmZvbGRlcixcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuZGVsZXRlRW1wdHlGb2xkZXJzXHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy51cGRhdGVMaW5rcyAmJiByZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBjaGFuZ2VkRmlsZXMgPSByZXN1bHQucmVuYW1lZEZpbGVzLmNvbmNhdChyZXN1bHQubW92ZWRBdHRhY2htZW50cyk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlZEZpbGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5saC51cGRhdGVDaGFuZ2VkUGF0aHNJbk5vdGUoZmlsZS5uZXdQYXRoLCBjaGFuZ2VkRmlsZXMpXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy51cGRhdGVMaW5rcykge1xyXG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMubGgudXBkYXRlSW50ZXJuYWxMaW5rc0luTW92ZWROb3RlKGZpbGUub2xkUGF0aCwgZmlsZS5uZXdQYXRoLCB0aGlzLnNldHRpbmdzLm1vdmVBdHRhY2htZW50c1dpdGhOb3RlKVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvL2RlbGV0ZSBjaGlsZCBmb2xkZXJzIChkbyBub3QgZGVsZXRlIHBhcmVudClcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZGVsZXRlRW1wdHlGb2xkZXJzKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKHBhdGguZGlybmFtZShmaWxlLm9sZFBhdGgpKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGxpc3QgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmxpc3QocGF0aC5kaXJuYW1lKGZpbGUub2xkUGF0aCkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgZm9sZGVyIG9mIGxpc3QuZm9sZGVycykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmZoLmRlbGV0ZUVtcHR5Rm9sZGVycyhmb2xkZXIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IHVwZGF0ZUFsdHMgPSB0aGlzLnNldHRpbmdzLmNoYW5nZU5vdGVCYWNrbGlua3NBbHQgJiYgZmlsZUV4dCA9PSBcIi5tZFwiO1xyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnVwZGF0ZUxpbmtzKSB7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLmxoLnVwZGF0ZUxpbmtzVG9SZW5hbWVkRmlsZShmaWxlLm9sZFBhdGgsIGZpbGUubmV3UGF0aCwgdXBkYXRlQWx0cywgdGhpcy5zZXR0aW5ncy51c2VCdWlsdEluT2JzaWRpYW5MaW5rQ2FjaGluZyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocmVzdWx0ICYmIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzICYmIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdG5ldyBOb3RpY2UoXCJNb3ZlZCBcIiArIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLmxlbmd0aCArIFwiIGF0dGFjaG1lbnRcIiArIChyZXN1bHQubW92ZWRBdHRhY2htZW50cy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwiKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDb25zaXN0ZW50IEF0dGFjaG1lbnRzIGFuZCBMaW5rczogXFxuXCIgKyBlKTtcclxuXHRcdH1cclxuXHJcblx0XHRuZXcgTm90aWNlKFwiRml4aW5nIENvbnNpc3RlbmN5IENvbXBsZXRlXCIpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJDb25zaXN0ZW50IEF0dGFjaG1lbnRzIGFuZCBMaW5rczpcXG5GaXhpbmcgY29uc2lzdGVuY3kgY29tcGxldGVcIik7XHJcblxyXG5cdFx0dGhpcy5yZW5hbWluZ0lzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMucmVjZW50bHlSZW5hbWVkRmlsZXMgJiYgdGhpcy5yZWNlbnRseVJlbmFtZWRGaWxlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpO1xyXG5cdFx0XHR0aGlzLnRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5IYW5kbGVSZWNlbnRseVJlbmFtZWRGaWxlcygpIH0sIDUwMCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgY29sbGVjdEF0dGFjaG1lbnRzQ3VycmVudE5vdGUoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykge1xyXG5cdFx0bGV0IG5vdGUgPSB2aWV3LmZpbGU7XHJcblx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGUucGF0aCkpIHtcclxuXHRcdFx0bmV3IE5vdGljZShcIk5vdGUgcGF0aCBpcyBpZ25vcmVkXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZmguY29sbGVjdEF0dGFjaG1lbnRzRm9yQ2FjaGVkTm90ZShcclxuXHRcdFx0bm90ZS5wYXRoLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmF0dGFjaG1lbnRzU3ViZm9sZGVyLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmRlbGV0ZUV4aXN0RmlsZXNXaGVuTW92ZU5vdGUsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuZGVsZXRlRW1wdHlGb2xkZXJzKTtcclxuXHJcblx0XHRpZiAocmVzdWx0ICYmIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzICYmIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0YXdhaXQgdGhpcy5saC51cGRhdGVDaGFuZ2VkUGF0aHNJbk5vdGUobm90ZS5wYXRoLCByZXN1bHQubW92ZWRBdHRhY2htZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVzdWx0Lm1vdmVkQXR0YWNobWVudHMubGVuZ3RoID09IDApXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBmaWxlcyBmb3VuZCB0aGF0IG5lZWQgdG8gYmUgbW92ZWRcIik7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJNb3ZlZCBcIiArIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLmxlbmd0aCArIFwiIGF0dGFjaG1lbnRcIiArIChyZXN1bHQubW92ZWRBdHRhY2htZW50cy5sZW5ndGggPiAxID8gXCJzXCIgOiBcIlwiKSk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgY29sbGVjdEFsbEF0dGFjaG1lbnRzKCkge1xyXG5cdFx0bGV0IG1vdmVkQXR0YWNobWVudHNDb3VudCA9IDA7XHJcblx0XHRsZXQgcHJvY2Vzc2VkTm90ZXNDb3VudCA9IDA7XHJcblxyXG5cdFx0bGV0IG5vdGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuXHRcdGlmIChub3Rlcykge1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlLnBhdGgpKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmZoLmNvbGxlY3RBdHRhY2htZW50c0ZvckNhY2hlZE5vdGUoXHJcblx0XHRcdFx0XHRub3RlLnBhdGgsXHJcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmF0dGFjaG1lbnRzU3ViZm9sZGVyLFxyXG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kZWxldGVFeGlzdEZpbGVzV2hlbk1vdmVOb3RlLFxyXG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5kZWxldGVFbXB0eUZvbGRlcnMpO1xyXG5cclxuXHJcblx0XHRcdFx0aWYgKHJlc3VsdCAmJiByZXN1bHQubW92ZWRBdHRhY2htZW50cyAmJiByZXN1bHQubW92ZWRBdHRhY2htZW50cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLmxoLnVwZGF0ZUNoYW5nZWRQYXRoc0luTm90ZShub3RlLnBhdGgsIHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzKVxyXG5cdFx0XHRcdFx0bW92ZWRBdHRhY2htZW50c0NvdW50ICs9IHJlc3VsdC5tb3ZlZEF0dGFjaG1lbnRzLmxlbmd0aDtcclxuXHRcdFx0XHRcdHByb2Nlc3NlZE5vdGVzQ291bnQrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobW92ZWRBdHRhY2htZW50c0NvdW50ID09IDApXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBmaWxlcyBmb3VuZCB0aGF0IG5lZWQgdG8gYmUgbW92ZWRcIik7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJNb3ZlZCBcIiArIG1vdmVkQXR0YWNobWVudHNDb3VudCArIFwiIGF0dGFjaG1lbnRcIiArIChtb3ZlZEF0dGFjaG1lbnRzQ291bnQgPiAxID8gXCJzXCIgOiBcIlwiKVxyXG5cdFx0XHRcdCsgXCIgZnJvbSBcIiArIHByb2Nlc3NlZE5vdGVzQ291bnQgKyBcIiBub3RlXCIgKyAocHJvY2Vzc2VkTm90ZXNDb3VudCA+IDEgPyBcInNcIiA6IFwiXCIpKTtcclxuXHR9XHJcblxyXG5cclxuXHRhc3luYyBjb252ZXJ0QWxsRW1iZWRzUGF0aHNUb1JlbGF0aXZlKCkge1xyXG5cdFx0bGV0IGNoYW5nZWRFbWJlZENvdW50ID0gMDtcclxuXHRcdGxldCBwcm9jZXNzZWROb3Rlc0NvdW50ID0gMDtcclxuXHJcblx0XHRsZXQgbm90ZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblxyXG5cdFx0aWYgKG5vdGVzKSB7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgb2Ygbm90ZXMpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5pc1BhdGhJZ25vcmVkKG5vdGUucGF0aCkpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMubGguY29udmVydEFsbE5vdGVFbWJlZHNQYXRoc1RvUmVsYXRpdmUobm90ZS5wYXRoKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0Y2hhbmdlZEVtYmVkQ291bnQgKz0gcmVzdWx0Lmxlbmd0aDtcclxuXHRcdFx0XHRcdHByb2Nlc3NlZE5vdGVzQ291bnQrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY2hhbmdlZEVtYmVkQ291bnQgPT0gMClcclxuXHRcdFx0bmV3IE5vdGljZShcIk5vIGVtYmVkcyBmb3VuZCB0aGF0IG5lZWQgdG8gYmUgY29udmVydGVkXCIpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXcgTm90aWNlKFwiQ29udmVydGVkIFwiICsgY2hhbmdlZEVtYmVkQ291bnQgKyBcIiBlbWJlZFwiICsgKGNoYW5nZWRFbWJlZENvdW50ID4gMSA/IFwic1wiIDogXCJcIilcclxuXHRcdFx0XHQrIFwiIGZyb20gXCIgKyBwcm9jZXNzZWROb3Rlc0NvdW50ICsgXCIgbm90ZVwiICsgKHByb2Nlc3NlZE5vdGVzQ291bnQgPiAxID8gXCJzXCIgOiBcIlwiKSk7XHJcblx0fVxyXG5cclxuXHJcblx0YXN5bmMgY29udmVydEFsbExpbmtQYXRoc1RvUmVsYXRpdmUoKSB7XHJcblx0XHRsZXQgY2hhbmdlZExpbmtzQ291bnQgPSAwO1xyXG5cdFx0bGV0IHByb2Nlc3NlZE5vdGVzQ291bnQgPSAwO1xyXG5cclxuXHRcdGxldCBub3RlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHJcblx0XHRpZiAobm90ZXMpIHtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzUGF0aElnbm9yZWQobm90ZS5wYXRoKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5saC5jb252ZXJ0QWxsTm90ZUxpbmtzUGF0aHNUb1JlbGF0aXZlKG5vdGUucGF0aCk7XHJcblxyXG5cdFx0XHRcdGlmIChyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdGNoYW5nZWRMaW5rc0NvdW50ICs9IHJlc3VsdC5sZW5ndGg7XHJcblx0XHRcdFx0XHRwcm9jZXNzZWROb3Rlc0NvdW50Kys7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNoYW5nZWRMaW5rc0NvdW50ID09IDApXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBsaW5rcyBmb3VuZCB0aGF0IG5lZWQgdG8gYmUgY29udmVydGVkXCIpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXcgTm90aWNlKFwiQ29udmVydGVkIFwiICsgY2hhbmdlZExpbmtzQ291bnQgKyBcIiBsaW5rXCIgKyAoY2hhbmdlZExpbmtzQ291bnQgPiAxID8gXCJzXCIgOiBcIlwiKVxyXG5cdFx0XHRcdCsgXCIgZnJvbSBcIiArIHByb2Nlc3NlZE5vdGVzQ291bnQgKyBcIiBub3RlXCIgKyAocHJvY2Vzc2VkTm90ZXNDb3VudCA+IDEgPyBcInNcIiA6IFwiXCIpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlcGxhY2VBbGxXaWtpbGlua3NXaXRoTWFya2Rvd25MaW5rcygpIHtcclxuXHRcdGxldCBjaGFuZ2VkTGlua3NDb3VudCA9IDA7XHJcblx0XHRsZXQgcHJvY2Vzc2VkTm90ZXNDb3VudCA9IDA7XHJcblxyXG5cdFx0bGV0IG5vdGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cclxuXHRcdGlmIChub3Rlcykge1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuaXNQYXRoSWdub3JlZChub3RlLnBhdGgpKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmxoLnJlcGxhY2VBbGxOb3RlV2lraWxpbmtzV2l0aE1hcmtkb3duTGlua3Mobm90ZS5wYXRoKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3VsdCAmJiAocmVzdWx0LmxpbmtzLmxlbmd0aCA+IDAgfHwgcmVzdWx0LmVtYmVkcy5sZW5ndGggPiAwKSkge1xyXG5cdFx0XHRcdFx0Y2hhbmdlZExpbmtzQ291bnQgKz0gcmVzdWx0LmxpbmtzLmxlbmd0aDtcclxuXHRcdFx0XHRcdGNoYW5nZWRMaW5rc0NvdW50ICs9IHJlc3VsdC5lbWJlZHMubGVuZ3RoO1xyXG5cdFx0XHRcdFx0cHJvY2Vzc2VkTm90ZXNDb3VudCsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjaGFuZ2VkTGlua3NDb3VudCA9PSAwKVxyXG5cdFx0XHRuZXcgTm90aWNlKFwiTm8gd2lraSBsaW5rcyBmb3VuZCB0aGF0IG5lZWQgdG8gYmUgcmVwbGFjZWRcIik7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJSZXBsYWNlZCBcIiArIGNoYW5nZWRMaW5rc0NvdW50ICsgXCIgd2lraWxpbmtcIiArIChjaGFuZ2VkTGlua3NDb3VudCA+IDEgPyBcInNcIiA6IFwiXCIpXHJcblx0XHRcdFx0KyBcIiBmcm9tIFwiICsgcHJvY2Vzc2VkTm90ZXNDb3VudCArIFwiIG5vdGVcIiArIChwcm9jZXNzZWROb3Rlc0NvdW50ID4gMSA/IFwic1wiIDogXCJcIikpO1xyXG5cdH1cclxuXHJcblx0ZGVsZXRlRW1wdHlGb2xkZXJzKCkge1xyXG5cdFx0dGhpcy5maC5kZWxldGVFbXB0eUZvbGRlcnMoXCIvXCIpXHJcblx0fVxyXG5cclxuXHRhc3luYyBjaGVja0NvbnNpc3RlbmN5KCkge1xyXG5cdFx0bGV0IGJhZExpbmtzID0gYXdhaXQgdGhpcy5saC5nZXRBbGxCYWRMaW5rcygpO1xyXG5cdFx0bGV0IGJhZFNlY3Rpb25MaW5rcyA9IGF3YWl0IHRoaXMubGguZ2V0QWxsQmFkU2VjdGlvbkxpbmtzKCk7XHJcblx0XHRsZXQgYmFkRW1iZWRzID0gYXdhaXQgdGhpcy5saC5nZXRBbGxCYWRFbWJlZHMoKTtcclxuXHRcdGxldCB3aWtpTGlua3MgPSBhd2FpdCB0aGlzLmxoLmdldEFsbFdpa2lMaW5rcygpO1xyXG5cdFx0bGV0IHdpa2lFbWJlZHMgPSBhd2FpdCB0aGlzLmxoLmdldEFsbFdpa2lFbWJlZHMoKTtcclxuXHJcblx0XHRsZXQgdGV4dCA9IFwiXCI7XHJcblxyXG5cdFx0bGV0IGJhZExpbmtzQ291bnQgPSBPYmplY3Qua2V5cyhiYWRMaW5rcykubGVuZ3RoO1xyXG5cdFx0bGV0IGJhZEVtYmVkc0NvdW50ID0gT2JqZWN0LmtleXMoYmFkRW1iZWRzKS5sZW5ndGg7XHJcblx0XHRsZXQgYmFkU2VjdGlvbkxpbmtzQ291bnQgPSBPYmplY3Qua2V5cyhiYWRTZWN0aW9uTGlua3MpLmxlbmd0aDtcclxuXHRcdGxldCB3aWtpTGlua3NDb3VudCA9IE9iamVjdC5rZXlzKHdpa2lMaW5rcykubGVuZ3RoO1xyXG5cdFx0bGV0IHdpa2lFbWJlZHNDb3VudCA9IE9iamVjdC5rZXlzKHdpa2lFbWJlZHMpLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoYmFkTGlua3NDb3VudCA+IDApIHtcclxuXHRcdFx0dGV4dCArPSBcIiMgQmFkIGxpbmtzIChcIiArIGJhZExpbmtzQ291bnQgKyBcIiBmaWxlcylcXG5cIjtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBpbiBiYWRMaW5rcykge1xyXG5cdFx0XHRcdHRleHQgKz0gXCJbXCIgKyBub3RlICsgXCJdKFwiICsgVXRpbHMubm9ybWFsaXplUGF0aEZvckxpbmsobm90ZSkgKyBcIik6IFwiICsgXCJcXG5cIlxyXG5cdFx0XHRcdGZvciAobGV0IGxpbmsgb2YgYmFkTGlua3Nbbm90ZV0pIHtcclxuXHRcdFx0XHRcdHRleHQgKz0gXCItIChsaW5lIFwiICsgKGxpbmsucG9zaXRpb24uc3RhcnQubGluZSArIDEpICsgXCIpOiBgXCIgKyBsaW5rLmxpbmsgKyBcImBcXG5cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGV4dCArPSBcIlxcblxcblwiXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRleHQgKz0gXCIjIEJhZCBsaW5rcyBcXG5cIjtcclxuXHRcdFx0dGV4dCArPSBcIk5vIHByb2JsZW1zIGZvdW5kXFxuXFxuXCJcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYgKGJhZFNlY3Rpb25MaW5rc0NvdW50ID4gMCkge1xyXG5cdFx0XHR0ZXh0ICs9IFwiXFxuXFxuIyBCYWQgbm90ZSBsaW5rIHNlY3Rpb25zIChcIiArIGJhZFNlY3Rpb25MaW5rc0NvdW50ICsgXCIgZmlsZXMpXFxuXCI7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgaW4gYmFkU2VjdGlvbkxpbmtzKSB7XHJcblx0XHRcdFx0dGV4dCArPSBcIltcIiArIG5vdGUgKyBcIl0oXCIgKyBVdGlscy5ub3JtYWxpemVQYXRoRm9yTGluayhub3RlKSArIFwiKTogXCIgKyBcIlxcblwiXHJcblx0XHRcdFx0Zm9yIChsZXQgbGluayBvZiBiYWRTZWN0aW9uTGlua3Nbbm90ZV0pIHtcclxuXHRcdFx0XHRcdGxldCBsaSA9IHRoaXMubGguc3BsaXRMaW5rVG9QYXRoQW5kU2VjdGlvbihsaW5rLmxpbmspO1xyXG5cdFx0XHRcdFx0bGV0IHNlY3Rpb24gPSBVdGlscy5ub3JtYWxpemVMaW5rU2VjdGlvbihsaS5zZWN0aW9uKTtcclxuXHRcdFx0XHRcdHRleHQgKz0gXCItIChsaW5lIFwiICsgKGxpbmsucG9zaXRpb24uc3RhcnQubGluZSArIDEpICsgXCIpOiBgXCIgKyBsaS5saW5rICsgXCIjXCIgKyBzZWN0aW9uICsgXCJgXFxuXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRleHQgKz0gXCJcXG5cXG5cIlxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0ZXh0ICs9IFwiXFxuXFxuIyBCYWQgbm90ZSBsaW5rIHNlY3Rpb25zXFxuXCJcclxuXHRcdFx0dGV4dCArPSBcIk5vIHByb2JsZW1zIGZvdW5kXFxuXFxuXCJcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYgKGJhZEVtYmVkc0NvdW50ID4gMCkge1xyXG5cdFx0XHR0ZXh0ICs9IFwiXFxuXFxuIyBCYWQgZW1iZWRzIChcIiArIGJhZEVtYmVkc0NvdW50ICsgXCIgZmlsZXMpXFxuXCI7XHJcblx0XHRcdGZvciAobGV0IG5vdGUgaW4gYmFkRW1iZWRzKSB7XHJcblx0XHRcdFx0dGV4dCArPSBcIltcIiArIG5vdGUgKyBcIl0oXCIgKyBVdGlscy5ub3JtYWxpemVQYXRoRm9yTGluayhub3RlKSArIFwiKTogXCIgKyBcIlxcblwiXHJcblx0XHRcdFx0Zm9yIChsZXQgbGluayBvZiBiYWRFbWJlZHNbbm90ZV0pIHtcclxuXHRcdFx0XHRcdHRleHQgKz0gXCItIChsaW5lIFwiICsgKGxpbmsucG9zaXRpb24uc3RhcnQubGluZSArIDEpICsgXCIpOiBgXCIgKyBsaW5rLmxpbmsgKyBcImBcXG5cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGV4dCArPSBcIlxcblxcblwiXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRleHQgKz0gXCJcXG5cXG4jIEJhZCBlbWJlZHMgXFxuXCI7XHJcblx0XHRcdHRleHQgKz0gXCJObyBwcm9ibGVtcyBmb3VuZFxcblxcblwiXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmICh3aWtpTGlua3NDb3VudCA+IDApIHtcclxuXHRcdFx0dGV4dCArPSBcIiMgV2lraSBsaW5rcyAoXCIgKyB3aWtpTGlua3NDb3VudCArIFwiIGZpbGVzKVxcblwiO1xyXG5cdFx0XHRmb3IgKGxldCBub3RlIGluIHdpa2lMaW5rcykge1xyXG5cdFx0XHRcdHRleHQgKz0gXCJbXCIgKyBub3RlICsgXCJdKFwiICsgVXRpbHMubm9ybWFsaXplUGF0aEZvckxpbmsobm90ZSkgKyBcIik6IFwiICsgXCJcXG5cIlxyXG5cdFx0XHRcdGZvciAobGV0IGxpbmsgb2Ygd2lraUxpbmtzW25vdGVdKSB7XHJcblx0XHRcdFx0XHR0ZXh0ICs9IFwiLSAobGluZSBcIiArIChsaW5rLnBvc2l0aW9uLnN0YXJ0LmxpbmUgKyAxKSArIFwiKTogYFwiICsgbGluay5vcmlnaW5hbCArIFwiYFxcblwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0ZXh0ICs9IFwiXFxuXFxuXCJcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCArPSBcIiMgV2lraSBsaW5rcyBcXG5cIjtcclxuXHRcdFx0dGV4dCArPSBcIk5vIHByb2JsZW1zIGZvdW5kXFxuXFxuXCJcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2lraUVtYmVkc0NvdW50ID4gMCkge1xyXG5cdFx0XHR0ZXh0ICs9IFwiXFxuXFxuIyBXaWtpIGVtYmVkcyAoXCIgKyB3aWtpRW1iZWRzQ291bnQgKyBcIiBmaWxlcylcXG5cIjtcclxuXHRcdFx0Zm9yIChsZXQgbm90ZSBpbiB3aWtpRW1iZWRzKSB7XHJcblx0XHRcdFx0dGV4dCArPSBcIltcIiArIG5vdGUgKyBcIl0oXCIgKyBVdGlscy5ub3JtYWxpemVQYXRoRm9yTGluayhub3RlKSArIFwiKTogXCIgKyBcIlxcblwiXHJcblx0XHRcdFx0Zm9yIChsZXQgbGluayBvZiB3aWtpRW1iZWRzW25vdGVdKSB7XHJcblx0XHRcdFx0XHR0ZXh0ICs9IFwiLSAobGluZSBcIiArIChsaW5rLnBvc2l0aW9uLnN0YXJ0LmxpbmUgKyAxKSArIFwiKTogYFwiICsgbGluay5vcmlnaW5hbCArIFwiYFxcblwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0ZXh0ICs9IFwiXFxuXFxuXCJcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dCArPSBcIlxcblxcbiMgV2lraSBlbWJlZHMgXFxuXCI7XHJcblx0XHRcdHRleHQgKz0gXCJObyBwcm9ibGVtcyBmb3VuZFxcblxcblwiXHJcblx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRsZXQgbm90ZVBhdGggPSB0aGlzLnNldHRpbmdzLmNvbnNpc3RlbmN5UmVwb3J0RmlsZTtcclxuXHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobm90ZVBhdGgsIHRleHQpO1xyXG5cclxuXHRcdGxldCBmaWxlT3BlbmVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhsZWFmID0+IHtcclxuXHRcdFx0aWYgKGxlYWYuZ2V0RGlzcGxheVRleHQoKSAhPSBcIlwiICYmIG5vdGVQYXRoLnN0YXJ0c1dpdGgobGVhZi5nZXREaXNwbGF5VGV4dCgpKSkge1xyXG5cdFx0XHRcdGZpbGVPcGVuZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoIWZpbGVPcGVuZWQpXHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQobm90ZVBhdGgsIFwiL1wiLCBmYWxzZSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW9yZ2FuaXplVmF1bHQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnJlcGxhY2VBbGxXaWtpbGlua3NXaXRoTWFya2Rvd25MaW5rcygpXHJcblx0XHRhd2FpdCB0aGlzLmNvbnZlcnRBbGxFbWJlZHNQYXRoc1RvUmVsYXRpdmUoKVxyXG5cdFx0YXdhaXQgdGhpcy5jb252ZXJ0QWxsTGlua1BhdGhzVG9SZWxhdGl2ZSgpXHJcblx0XHQvLy0gUmVuYW1lIGFsbCBhdHRhY2htZW50cyAodXNpbmcgVW5pcXVlIGF0dGFjaG1lbnRzLCBvcHRpb25hbClcclxuXHRcdGF3YWl0IHRoaXMuY29sbGVjdEFsbEF0dGFjaG1lbnRzKClcclxuXHRcdGF3YWl0IHRoaXMuZGVsZXRlRW1wdHlGb2xkZXJzKClcclxuXHRcdG5ldyBOb3RpY2UoXCJSZW9yZ2FuaXphdGlvbiBvZiB0aGUgdmF1bHQgY29tcGxldGVkXCIpO1xyXG5cdH1cclxuXHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHJcblx0XHR0aGlzLmxoID0gbmV3IExpbmtzSGFuZGxlcihcclxuXHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdFwiQ29uc2lzdGVudCBBdHRhY2htZW50cyBhbmQgTGlua3M6IFwiLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmlnbm9yZUZvbGRlcnMsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuaWdub3JlRmlsZXNSZWdleFxyXG5cdFx0KTtcclxuXHJcblx0XHR0aGlzLmZoID0gbmV3IEZpbGVzSGFuZGxlcihcclxuXHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdHRoaXMubGgsXHJcblx0XHRcdFwiQ29uc2lzdGVudCBBdHRhY2htZW50cyBhbmQgTGlua3M6IFwiLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmlnbm9yZUZvbGRlcnMsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuaWdub3JlRmlsZXNSZWdleCxcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIm5vcm1hbGl6ZVBhdGgiLCJURmlsZSIsIlBsdWdpbiIsIk5vdGljZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUks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
