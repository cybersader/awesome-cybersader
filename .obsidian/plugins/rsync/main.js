"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
const child_process_1 = require("child_process");
const DEFAULT_SETTINGS = {
    rsyncBinaryPath: '',
    remoteIP: '',
    sshPort: 22,
    sshUsername: '',
    sshPassword: '',
    privateKeyPath: '',
    localDirPath: '',
    remoteDirPath: '',
    syncDirection: 'push',
    dryRun: false,
    logFilePath: '',
    excludePatterns: [],
    scheduleInterval: 0,
};
class RsyncPlugin extends obsidian_1.Plugin {
    constructor() {
        super(...arguments);
        this.settings = DEFAULT_SETTINGS;
        this.intervalId = null;
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            // Schedule rsync sync if the interval is set
            if (this.settings.scheduleInterval > 0) {
                this.scheduleSync(this.settings.scheduleInterval);
            }
            // Add ribbon icon for manual sync
            this.addRibbonIcon('sync', 'Rsync', () => {
                new RsyncModal(this.app, this).open();
            });
            // Add settings tab for configuring Rsync paths and options
            this.addSettingTab(new RsyncPluginSettingTab(this.app, this));
        });
    }
    onunload() {
        // Clear the interval when the plugin is unloaded
        this.clearScheduleInterval();
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
            // Re-schedule sync if interval changes
            if (this.settings.scheduleInterval > 0) {
                this.scheduleSync(this.settings.scheduleInterval);
            }
            else {
                this.clearScheduleInterval();
            }
        });
    }
    scheduleSync(intervalMinutes) {
        // Clear any existing interval before setting a new one
        this.clearScheduleInterval();
        if (intervalMinutes > 0) {
            this.intervalId = window.setInterval(() => {
                this.runRsyncCommand();
            }, intervalMinutes * 60 * 1000);
            // Register the interval with Obsidian's event system
            this.registerInterval(this.intervalId);
        }
    }
    clearScheduleInterval() {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    runRsyncCommand(progressCallback = () => { }) {
        const { rsyncBinaryPath, remoteIP, sshPort, sshUsername, sshPassword, privateKeyPath, localDirPath, remoteDirPath, syncDirection, dryRun, logFilePath, excludePatterns } = this.settings;
        let rsyncCommand = '';
        const sshOptions = [];
        const excludeOptions = excludePatterns.map((pattern) => `--exclude '${pattern}'`).join(' ');
        if (privateKeyPath) {
            sshOptions.push(`-e "ssh -p ${sshPort} -i ${privateKeyPath}"`);
        }
        else if (sshUsername && sshPassword) {
            sshOptions.push(`-e "sshpass -p '${sshPassword}' ssh -p ${sshPort} -o StrictHostKeyChecking=no"`);
        }
        else {
            sshOptions.push(`-e "ssh -p ${sshPort}"`);
        }
        if (syncDirection === 'push') {
            rsyncCommand = `${rsyncBinaryPath} -avz --progress --stats --no-links --delete ${sshOptions.join(' ')} ${localDirPath} ${sshUsername}@${remoteIP}:${remoteDirPath}`;
        }
        else if (syncDirection === 'pull') {
            rsyncCommand = `${rsyncBinaryPath} -avz --progress --stats --no-links --delete ${sshOptions.join(' ')} ${sshUsername}@${remoteIP}:${remoteDirPath} ${localDirPath}`;
        }
        if (dryRun) {
            rsyncCommand += ' --dry-run';
        }
        if (logFilePath) {
            rsyncCommand += ` --log-file='${logFilePath}'`;
        }
        rsyncCommand += ` ${excludeOptions}`;
        // Run the rsync command using Node's child_process
        const rsyncProcess = (0, child_process_1.exec)(rsyncCommand, { encoding: 'utf8' }, (error, stdout, stderr) => {
            if (error) {
                new obsidian_1.Notice(`Rsync failed: ${stderr}`);
            }
            else {
                new obsidian_1.Notice(`Rsync completed`);
                // Set the progress to 100% when completed
                progressCallback(100);
            }
        });
        if (rsyncProcess.stdout) {
            rsyncProcess.stdout.on('data', (data) => {
                const match = data.match(/(\d+)%/); // Match percentage in output
                if (match) {
                    const percentage = parseInt(match[1], 10);
                    progressCallback(percentage); // Call the provided progress callback
                }
            });
        }
    }
}
exports.default = RsyncPlugin;
class RsyncModal extends obsidian_1.Modal {
    constructor(app, plugin) {
        super(app);
        this.progressBar = null;
        this.plugin = plugin;
    }
    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        // Add form for heading
        contentEl.createEl('h2', { text: 'Rsync' });
        // Container for progress bar and button
        const syncContainer = contentEl.createEl('div', { cls: 'rsync-container' });
        // Progress bar on the top left
        this.progressBar = syncContainer.createEl('div', { cls: 'rsync-progress' });
        const progressElement = this.progressBar.createEl('progress', { value: '0' });
        progressElement.setAttribute('max', '100'); // Set max value programmatically
        progressElement.createEl('span', { text: '100%' });
        // Move the sync direction section below the sync button
        new obsidian_1.Setting(contentEl)
            .setName('Sync direction')
            .setDesc('Choose sync direction')
            .addDropdown(dropdown => dropdown
            .addOption('push', 'Push (local to remote)')
            .addOption('pull', 'Pull (remote to local)')
            .setValue(this.plugin.settings.syncDirection)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.syncDirection = value;
            yield this.plugin.saveSettings();
        })));
        // Sync button on the top right
        const syncButtonContainer = syncContainer.createEl('div', { cls: 'rsync-button-container' });
        new obsidian_1.Setting(syncButtonContainer)
            .setName('')
            .setDesc('')
            .addButton(button => button
            .setButtonText('Start sync')
            .onClick(() => __awaiter(this, void 0, void 0, function* () {
            // Reset progress bar to 0 before starting
            if (this.progressBar) {
                const progressElement = this.progressBar.querySelector('progress');
                if (progressElement) {
                    progressElement.value = 0;
                }
            }
            this.plugin.runRsyncCommand((percentage) => {
                var _a;
                if (this.progressBar) {
                    (_a = this.progressBar.querySelector('progress')) === null || _a === void 0 ? void 0 : _a.setAttribute('value', percentage.toString());
                }
            });
        })));
        // Create the toggle button
        const toggleButton = contentEl.createEl('button', { cls: 'rsync-settings-toggle' });
        toggleButton.setText(String.fromCharCode(0x25B6) + ' Show settings'); // Initial text
        // Initialize settings visibility
        let settingsVisible = false;
        // Create the settings container
        const settingsContainer = contentEl.createEl('div', { cls: 'rsync-settings-container' });
        settingsContainer.classList.remove('visible'); // Ensure it's hidden initially
        // Toggle button click handler
        toggleButton.onclick = () => {
            settingsVisible = !settingsVisible;
            if (settingsVisible) {
                settingsContainer.classList.add('visible');
                toggleButton.setText(String.fromCharCode(0x25BC) + ' Hide settings');
            }
            else {
                settingsContainer.classList.remove('visible');
                toggleButton.setText(String.fromCharCode(0x25B6) + ' Show settings');
            }
        };
        // Add space here if needed (for visual separation)
        contentEl.createEl('div', { cls: 'spacer' }); // Optional spacer element
        contentEl.createEl('div', { cls: 'spacer' }); // Optional spacer element
        contentEl.createEl('div', { cls: 'spacer' }); // Optional spacer element
        // Use the function to add setting
        addRsyncSetting(this.plugin, settingsContainer);
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
    updateProgress(percentage) {
        if (this.progressBar) {
            const progressElement = this.progressBar.querySelector('progress');
            if (progressElement) {
                progressElement.value = percentage;
            }
        }
    }
}
class RsyncPluginSettingTab extends obsidian_1.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        // Use the function to add setting
        addRsyncSetting(this.plugin, containerEl);
    }
}
function addRsyncSetting(plugin, containerEl) {
    new obsidian_1.Setting(containerEl)
        .setName('Rsync binary path')
        .setDesc('Path to the rsync binary')
        .addText(text => text
        .setPlaceholder('Enter path to rsync binary')
        .setValue(plugin.settings.rsyncBinaryPath)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.rsyncBinaryPath = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Remote IP address')
        .setDesc('IP address of the remote machine')
        .addText(text => text
        .setPlaceholder('Enter remote IP')
        .setValue(plugin.settings.remoteIP)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.remoteIP = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('SSH port')
        .setDesc('SSH port to connect to the remote machine')
        .addText(text => text
        .setPlaceholder('Enter SSH port')
        .setValue(plugin.settings.sshPort.toString())
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.sshPort = parseInt(value);
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('SSH username')
        .setDesc('SSH username for remote connection')
        .addText(text => text
        .setPlaceholder('Enter SSH username')
        .setValue(plugin.settings.sshUsername)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.sshUsername = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('SSH password')
        .setDesc('SSH password for remote connection')
        .addText(text => text
        .setPlaceholder('Enter SSH password')
        .setValue(plugin.settings.sshPassword)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.sshPassword = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Private key path')
        .setDesc('Path to the SSH private key')
        .addText(text => text
        .setPlaceholder('Enter private key path')
        .setValue(plugin.settings.privateKeyPath)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.privateKeyPath = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Local directory path')
        .setDesc('Directory in the local machine to sync')
        .addText(text => text
        .setPlaceholder('Enter local directory path')
        .setValue(plugin.settings.localDirPath)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.localDirPath = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Remote directory path')
        .setDesc('Directory in the remote machine to sync')
        .addText(text => text
        .setPlaceholder('Enter remote directory path')
        .setValue(plugin.settings.remoteDirPath)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.remoteDirPath = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Dry run')
        .setDesc('Perform a trial run with no changes made')
        .addToggle(toggle => toggle
        .setValue(plugin.settings.dryRun)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.dryRun = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Log file path')
        .setDesc('File to save sync logs')
        .addText(text => text
        .setPlaceholder('Enter log file path')
        .setValue(plugin.settings.logFilePath)
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.logFilePath = value;
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Exclude patterns')
        .setDesc('Patterns to be excluded from sync')
        .addTextArea(textArea => textArea
        .setPlaceholder('Example: *.log, temp/*, *backup*')
        .setValue(plugin.settings.excludePatterns.join(','))
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.excludePatterns = value.split(',').map(pattern => pattern.trim());
        yield plugin.saveSettings();
    })));
    new obsidian_1.Setting(containerEl)
        .setName('Schedule interval (in minutes)')
        .setDesc('Interval for triggering periodic sync')
        .addText(text => text
        .setPlaceholder('Enter schedule interval in minutes')
        .setValue(plugin.settings.scheduleInterval.toString())
        .onChange((value) => __awaiter(this, void 0, void 0, function* () {
        plugin.settings.scheduleInterval = parseInt(value);
        yield plugin.saveSettings();
    })));
}

/* nosourcemap */