/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
*/

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/webhookService.js
var require_webhookService = __commonJS({
  "src/webhookService.js"(exports2, module2) {
    var { requestUrl: requestUrl2, arrayBufferToBase64, parseYaml, getFrontMatterInfo } = require("obsidian");
    var WebhookService2 = class {
      static validateUrl(url) {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch (e) {
          return false;
        }
      }
      static parseYamlFrontmatter(content) {
        const info = getFrontMatterInfo(content);
        if (!info.exists) {
          return {
            frontmatter: {},
            content
          };
        }
        const frontmatter = parseYaml(info.frontmatter);
        const contentWithoutFrontmatter = content.slice(info.contentStart);
        return {
          frontmatter,
          content: contentWithoutFrontmatter
        };
      }
      static async getAttachments(app, file) {
        const attachments = [];
        const cache = app.metadataCache.getFileCache(file);
        if (!cache) {
          return attachments;
        }
        const processFile = async (linkedFile) => {
          if (linkedFile && !linkedFile.children) {
            const buffer = await app.vault.readBinary(linkedFile);
            const base64 = arrayBufferToBase64(buffer);
            const mimeType = this.getMimeType(linkedFile.extension);
            attachments.push({
              name: linkedFile.name,
              type: linkedFile.extension,
              mimeType,
              size: buffer.byteLength,
              data: `data:${mimeType};base64,${base64}`,
              path: linkedFile.path
            });
          }
        };
        if (cache.embeds) {
          for (const embed of cache.embeds) {
            if (embed.link) {
              const linkedFile = app.metadataCache.getFirstLinkpathDest(embed.link, file.path);
              if (linkedFile) {
                await processFile(linkedFile);
              }
            }
          }
        }
        if (cache.links) {
          for (const link of cache.links) {
            if (link.link) {
              const linkedFile = app.metadataCache.getFirstLinkpathDest(link.link, file.path);
              if (linkedFile) {
                await processFile(linkedFile);
              }
            }
          }
        }
        return attachments;
      }
      static getMimeType(extension) {
        const mimeTypes = {
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          gif: "image/gif",
          webp: "image/webp",
          svg: "image/svg+xml",
          mp3: "audio/mpeg",
          wav: "audio/wav",
          ogg: "audio/ogg",
          m4a: "audio/mp4",
          mp4: "video/mp4",
          webm: "video/webm",
          ogv: "video/ogg",
          mov: "video/quicktime",
          pdf: "application/pdf",
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          json: "application/json",
          xml: "application/xml",
          zip: "application/zip"
        };
        return mimeTypes[extension == null ? void 0 : extension.toLowerCase()] || "application/octet-stream";
      }
      static async sendContent(app, webhookUrl, content, filename, file) {
        if (!webhookUrl) {
          throw new Error("Webhook URL is required");
        }
        if (!this.validateUrl(webhookUrl)) {
          throw new Error("Invalid Webhook URL. Must be a valid HTTP or HTTPS URL");
        }
        try {
          const info = getFrontMatterInfo(content);
          const attachments = await this.getAttachments(app, file);
          let payload;
          if (info.exists) {
            const frontmatter = parseYaml(info.frontmatter);
            const noteContent = content.slice(info.contentStart).trim();
            payload = {
              ...frontmatter,
              // This puts all YAML fields at root level
              content: noteContent,
              filename,
              timestamp: Date.now(),
              attachments
            };
          } else {
            payload = {
              content,
              filename,
              timestamp: Date.now(),
              attachments
            };
          }
          const response = await requestUrl2({
            url: webhookUrl,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });
          if (response.status >= 400) {
            throw new Error(`Request failed: ${response.status}`);
          }
          return response;
        } catch (error) {
          if (error.message.includes("Failed to fetch")) {
            throw new Error("Could not connect to the Webhook URL. Please check your internet connection and the URL");
          }
          throw new Error(`Failed to send Webhook: ${error.message}`);
        }
      }
      static async testWebhook(webhookUrl) {
        if (!this.validateUrl(webhookUrl)) {
          throw new Error("Invalid Webhook URL. Must be a valid HTTP or HTTPS URL");
        }
        try {
          const testPayload = {
            test: true,
            timestamp: Date.now(),
            message: "This is a test message from Post Webhook plugin"
          };
          const response = await requestUrl2({
            url: webhookUrl,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(testPayload)
          });
          if (response.status >= 400) {
            throw new Error(`Test request failed with status: ${response.status}`);
          }
          return {
            success: true,
            message: "Webhook test successful!"
          };
        } catch (error) {
          return {
            success: false,
            message: `Webhook test failed: ${error.message}`
          };
        }
      }
    };
    module2.exports = WebhookService2;
  }
});

// src/main.js
var { Plugin, Notice, PluginSettingTab, Setting, requestUrl } = require("obsidian");
var WebhookService = require_webhookService();
var PostWebhookPlugin = class extends Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "send-to-webhook",
      name: "Send to Webhook",
      callback: async () => {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
          new Notice("No active file");
          return;
        }
        if (!this.settings.webhookUrl) {
          new Notice("Please configure Webhook URL in settings");
          return;
        }
        try {
          const content = await this.app.vault.read(file);
          const response = await WebhookService.sendContent(this.app, this.settings.webhookUrl, content, file.name, file);
          if (this.settings.attachResponse && response.text) {
            const responseContent = `

---
${response.text}`;
            const newContent = content + responseContent;
            await this.app.vault.modify(file, newContent);
          }
          new Notice("Successfully sent to Webhook");
        } catch (error) {
          console.error("Webhook error:", error);
          new Notice(`Error: ${error.message}`);
        }
      }
    });
    this.addSettingTab(new PostWebhookSettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, {
      webhookUrl: "",
      attachResponse: false
    }, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var PostWebhookSettingTab = class extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl).setName("Webhook URL").setDesc("Enter the URL where your notes will be sent").addText((text) => text.setPlaceholder("https://your-webhook-url").setValue(this.plugin.settings.webhookUrl).onChange(async (value) => {
      this.plugin.settings.webhookUrl = value;
      await this.plugin.saveSettings();
    }));
    new Setting(containerEl).setName("Attach Response").setDesc("Append Webhook response to the note").addToggle((toggle) => toggle.setValue(this.plugin.settings.attachResponse).onChange(async (value) => {
      this.plugin.settings.attachResponse = value;
      await this.plugin.saveSettings();
    }));
    new Setting(containerEl).setName("Test Webhook").setDesc("Send a test request to verify your Webhook configuration").addButton((button) => button.setButtonText("Test Webhook").onClick(async () => {
      if (!this.plugin.settings.webhookUrl) {
        new Notice("Please configure Webhook URL first");
        return;
      }
      try {
        const testPayload = {
          test: true,
          timestamp: Date.now(),
          message: "Test Webhook from Obsidian"
        };
        const response = await requestUrl({
          url: this.plugin.settings.webhookUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(testPayload)
        });
        if (response.status < 400) {
          new Notice("Test Webhook sent successfully");
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        new Notice(`Test failed: ${error.message}`);
      }
    }));
  }
};
module.exports = PostWebhookPlugin;


/* nosourcemap */