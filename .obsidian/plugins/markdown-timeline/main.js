/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TimelinePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/views/TimelineView.ts
var import_obsidian2 = require("obsidian");

// src/utils/parser.ts
function parseTimelineContent(content) {
  const events = [];
  const sections = content.split("---").filter((section) => section.trim());
  sections.forEach((section) => {
    const lines = section.trim().split("\n");
    const currentEvent = {};
    const contentLines = [];
    let foundDate = false;
    let foundTitle = false;
    lines.forEach((line) => {
      line = line.trim();
      if (!foundDate && line.startsWith("# ")) {
        const dateStr = line.replace("# ", "");
        const dateParts = dateStr.split("-");
        currentEvent.year = dateParts[0];
        if (dateParts.length > 1) {
          currentEvent.month = dateParts[1];
        }
        if (dateParts.length > 2) {
          currentEvent.day = dateParts[2];
        }
        foundDate = true;
      } else if (!foundTitle && line.startsWith("## ")) {
        currentEvent.title = line.replace("## ", "");
        foundTitle = true;
      } else if (line) {
        contentLines.push(line);
      }
    });
    if (contentLines.length > 0) {
      currentEvent.content = contentLines.join("\n");
    }
    if (currentEvent.year && currentEvent.title) {
      events.push(currentEvent);
    }
  });
  return events.sort((a, b) => {
    const yearDiff = parseInt(b.year) - parseInt(a.year);
    if (yearDiff !== 0)
      return yearDiff;
    if (a.month && b.month) {
      const monthDiff = parseInt(b.month) - parseInt(a.month);
      if (monthDiff !== 0)
        return monthDiff;
    } else if (a.month) {
      return -1;
    } else if (b.month) {
      return 1;
    }
    if (a.day && b.day) {
      return parseInt(b.day) - parseInt(a.day);
    } else if (a.day) {
      return -1;
    } else if (b.day) {
      return 1;
    }
    return 0;
  });
}

// src/utils/timeline-renderer.ts
var import_obsidian = require("obsidian");
var TimelineEventContent = class extends import_obsidian.MarkdownRenderChild {
  constructor(container, content, sourcePath, plugin) {
    super(container);
    this.content = content;
    this.sourcePath = sourcePath;
    this.plugin = plugin;
  }
  async onload() {
    await import_obsidian.MarkdownRenderer.render(
      this.plugin.app,
      this.content,
      this.containerEl,
      this.sourcePath,
      this.plugin
    );
  }
};
function renderTimelineEvents(container, events, plugin, sourcePath = "") {
  const timeline = container.createEl("div", { cls: "timeline" });
  const renderChildren = [];
  for (const event of events) {
    const eventEl = timeline.createEl("div", { cls: "timeline-event" });
    const dateEl = eventEl.createEl("div", { cls: "timeline-date" });
    dateEl.createEl("span", { cls: "timeline-year", text: event.year });
    if (event.month) {
      const monthDisplay = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(2e3, parseInt(event.month) - 1));
      const dateDisplay = event.day ? `${monthDisplay} ${event.day}` : monthDisplay;
      dateEl.createEl("span", { cls: "timeline-month", text: dateDisplay });
    }
    eventEl.createEl("div", { cls: "timeline-point" });
    const contentEl = eventEl.createEl("div", { cls: "timeline-content" });
    contentEl.createEl("h3", { text: event.title });
    const markdownContent = contentEl.createDiv("timeline-markdown-content");
    const renderChild = new TimelineEventContent(
      markdownContent,
      event.content,
      sourcePath,
      plugin
    );
    renderChildren.push(renderChild);
  }
  return renderChildren;
}

// src/views/TimelineView.ts
var VIEW_TYPE_TIMELINE = "timeline-view";
var TimelineView = class extends import_obsidian2.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_TIMELINE;
  }
  getDisplayText() {
    return "Timeline view";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("div", { cls: "timeline-container" });
  }
  async setContent(content) {
    const container = this.containerEl.querySelector(".timeline-container");
    if (!container)
      return;
    container.empty();
    const events = parseTimelineContent(content);
    const renderChildren = renderTimelineEvents(container, events, this.plugin);
    renderChildren.forEach((child) => this.addChild(child));
  }
};

// src/types/index.ts
var DEFAULT_SETTINGS = {
  defaultView: "basic"
};

// src/main.ts
var TimelinePlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.timelineView = null;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(
      VIEW_TYPE_TIMELINE,
      (leaf) => this.timelineView = new TimelineView(leaf, this)
    );
    this.registerMarkdownCodeBlockProcessor("timeline", async (source, el, ctx) => {
      const container = el.createEl("div", { cls: "timeline-container" });
      const events = parseTimelineContent(source);
      const renderChildren = renderTimelineEvents(container, events, this, ctx.sourcePath);
      renderChildren.forEach((child) => this.addChild(child));
    });
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async activateView() {
    var _a;
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType(VIEW_TYPE_TIMELINE)[0];
    if (!leaf) {
      leaf = (_a = workspace.getRightLeaf(false)) != null ? _a : workspace.getLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE_TIMELINE });
    }
    workspace.revealLeaf(leaf);
  }
};

/* nosourcemap */