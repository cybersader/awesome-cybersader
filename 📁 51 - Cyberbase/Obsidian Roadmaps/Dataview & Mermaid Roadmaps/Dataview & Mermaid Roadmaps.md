---
aliases: []
tags: []
publish: true
permalink:
date created: Sunday, February 23rd 2025, 3:50 pm
date modified: Monday, February 24th 2025, 10:34 am
---

# Dataview-Based (Gantt Charts)

roadmapTitle:: "Roadmap"
roadmapDateFormat:: "YYYY-MM-DD"
roadmapAxisFormat:: "%b"
roadmapDefaultLane:: "General"
roadmapOverdueSuffix:: " overdue"
roadmapOverdueFlag:: "crit"
displayMode:: "compact"
ganttStart:: "2025-01-01"
ganttEnd:: "2025-12-31"
showStart:: false            
showDue:: false 
showCreation:: false
dateRangePattern:: "MM/DD" 
showQuarters:: true
topDivider:: "°"
bottomDivider:: "•"
topLevelCrit:: true
childLaneOption:: "breadcrumb"
>  "breadcrumb" (default) or "full"

quarterDivider:: "[Q#]"

## TEST DATAVIEW 9

```js
// ----------------------
// Helper Functions & Configuration
// ----------------------

// Priority mapping based on emojis.
const priorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

const getPriority = (text) => {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "";
};

// Determine status based on markers, due date, and priority.
const getStatus = (text, priority, dueDate) => {
  // If milestone markers are present, always use milestone.
  if (text.includes("🔺") || text.includes("🚩")) return "milestone";
  // If overdue, use the overdue flag.
  if (new Date(dueDate) < new Date()) return config.overdueFlag;
  // Otherwise, if priority is Highest, mark as crit;
  // if Low/Lowest, mark as inactive; else active.
  if (priority === "Highest") return "crit";
  if (priority === "Low" || priority === "Lowest") return "inactive";
  return "active";
};

// Read configuration from frontmatter.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || "",
  dateRangePattern: dv.current().dateRangePattern || "",  // e.g., "MM/DD"
  showQuarters: dv.current().showQuarters !== false,       // default true
  topDivider: dv.current().topDivider || "°",
  bottomDivider: dv.current().bottomDivider || "•",
  quarterDivider: dv.current().quarterDivider || "›",
  topLevelCrit: dv.current().topLevelCrit !== false,        // default true
  childLaneOption: dv.current().childLaneOption || "breadcrumb", // "breadcrumb" or "full"
  // TODO - can't be adjusted in Obsidian as of 2025 - 'tickInterval: dv.current().tickInterval || "1month" // Controls vertical grid lines
};

// ----------------------
// Text Processing
// ----------------------

// Remove hashtags, marker emojis, and inline dates (YYYY-MM-DD).
// Also extract nested roadmap segments.
function processTaskText(text) {
  // Capture roadmap segments up to 4 levels.
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  let m = text.match(roadmapRegex);
  let lane = config.defaultLane;
  let childChain = [];
  if (m) {
    if (m[1]) lane = m[1];
    for (let i = 2; i < m.length; i++) {
      if (m[i]) childChain.push(m[i]);
    }
  }
  // Remove all hashtags.
  let pureText = text.replace(/#[\w\/-]+/g, "");
  // Remove common marker emojis.
  pureText = pureText.replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "");
  // Remove inline dates (YYYY-MM-DD).
  pureText = pureText.replace(/\d{4}-\d{2}-\d{2}/g, "");
  // Collapse extra whitespace.
  pureText = pureText.replace(/\s+/g, " ").trim();
  return { baseTitle: pureText, lane: lane, childChain: childChain };
}

// ----------------------
// Main Task Processing & Grouping
// ----------------------

// Filter tasks that include #ganttchart or #roadmap and have start/due dates.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap"))
         && t.start && t.due && !t.completed && t.status != "-");

// Group tasks by lane.
const laneGroups = {};

tasks.forEach(task => {
  const startDate = task.start.toString().split("T")[0];
  const dueDate   = task.due.toString().split("T")[0];
  
  // Process the task text.
  let { baseTitle, lane, childChain } = processTaskText(task.text);
  
  // Build a compact date range string if configured.
  let dateRangeStr = "";
  if (config.dateRangePattern) {
    dateRangeStr = " [" + moment(startDate, config.dateFormat).format(config.dateRangePattern)
      + " - " + moment(dueDate, config.dateFormat).format(config.dateRangePattern) + "]";
  }
  
  // Determine priority.
  let priority = getPriority(task.text);
  let priorityStr = priority ? " (" + priority + ")" : "";
  
  // Depending on configuration, either append child breadcrumbs to the task title
  // OR change the lane name to include the child segments.
  let childStr = "";
  if (config.childLaneOption === "full") {
    // Use full lane name by appending the child segments.
    lane = lane + (childChain.length > 0 ? "/" + childChain.join("/") : "");
    childStr = "";
  } else {
    // Default: keep lane as root and append breadcrumbs to title.
    childStr = childChain.length > 0 ? " (" + childChain.join("/") + ")" : "";
  }
  
  // Final label: base title + date range + child breadcrumbs (if any) + priority.
  let finalLabel = baseTitle + dateRangeStr + childStr + priorityStr;
  
  // Determine status using our helper, then override if top-level.
  let status = getStatus(task.text, priority, dueDate);
  if (config.topLevelCrit && childChain.length === 0 && status !== "milestone") {
    status = "crit";
  }
  
  // Construct the mermaid task line.
  let taskLine = "    " + finalLabel + " :" + status + ", " + startDate + ", " + dueDate;
  
  // Group by lane.
  if (!laneGroups[lane]) laneGroups[lane] = [];
  laneGroups[lane].push(taskLine);
});

// ----------------------
// Build Mermaid Code Output
// ----------------------
if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";
  
  // Embed front matter if set.
  if (config) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    mermaidCode += "numberSectionStyles: 5\n";
    //mermaidCode += "titleTopMargin: 25\n";
    //mermaidCode += "barHeight: 20\n";  // The height of the bars in the graph
    //mermaidCode += "barGap: 4\n";  // The margin between the different activities in the gantt diagram
    //mermaidCode += "topPadding: 75\n";  // Margin between title and gantt diagram and between axis and gantt diagram.
    //mermaidCode += "rightPadding: 75\n";  // The space allocated for the section name to the right of the activities
    //mermaidCode += "leftPadding: 75\n";  // The space allocated for the section name to the left of the activities
    //mermaidCode += "gridLineStartPadding: 10\n";  // Vertical starting position of the grid lines
    //mermaidCode += "fontSize: 12\n";  // Font size
    //mermaidCode += "sectionFontSize: 24\n";  // Font size for sections
    //mermaidCode += "numberSectionStyles: 1\n";  // The number of alternating section styles
    mermaidCode += "axisFormat: '%d/%m'\n";  // Date/time format of the axis
    mermaidCode += "tickInterval: '1month'\n";  // Axis ticks
    mermaidCode += "topAxis: true\n";  // When this flag is set, date labels will be added to the top of the chart
    mermaidCode += "weekday: 'sunday'\n";  // On which day a week-based interval should start
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  //mermaidCode += "    excludes weekends\n";
  mermaidCode += "    tickInterval " + config.tickInterval + "\n";

  // Quarter divider section: Quarter markers
  mermaidCode += "\nsection " + config.quarterDivider + "\n";

	// Top divider section with dummy START task.
  if (config.ganttStart) {
    mermaidCode += "section " + config.topDivider + "\n";
    mermaidCode += "    START :milestone, crit, done, " + config.ganttStart + ", " + config.ganttStart + "\n";
  }

  if (config.showQuarters && config.ganttStart && config.ganttEnd) {
    // Use moment to ensure correct year parsing.
    let startYear = Number(moment(config.ganttStart, config.dateFormat).format("YYYY"));
    let endYear   = Number(moment(config.ganttEnd, config.dateFormat).format("YYYY"));
    if (startYear === endYear) {
      let q1 = moment(config.ganttStart, config.dateFormat).month(2).endOf("month").format("YYYY-MM-DD"); // End of March
      let q2 = moment(config.ganttStart, config.dateFormat).month(5).endOf("month").format("YYYY-MM-DD"); // End of June
      let q3 = moment(config.ganttStart, config.dateFormat).month(8).endOf("month").format("YYYY-MM-DD"); // End of September
      let q4 = moment(config.ganttStart, config.dateFormat).month(11).endOf("month").format("YYYY-MM-DD"); // End of December
      mermaidCode += "    Q1 :milestone, crit, done, " + q1 + ", " + q1 + "\n";
      mermaidCode += "    Q2 :milestone, crit, done, " + q2 + ", " + q2 + "\n";
      mermaidCode += "    Q3 :milestone, crit, done, " + q3 + ", " + q3 + "\n";
      mermaidCode += "    Q4 :milestone, crit, done, " + q4 + ", " + q4 + "\n";
    }
  }

  // Roadmap Lane Sections.
  for (const lane in laneGroups) {
    mermaidCode += "\nsection " + lane + "\n";
    mermaidCode += laneGroups[lane].join("\n") + "\n";
  }

  mermaidCode += "\nsection " + config.bottomDivider + "\n";

  if (config.ganttEnd) {
    mermaidCode += "    END :milestone, crit, done, " + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  mermaidCode += "```";
  console.log(mermaidCode);
  dv.el("pre", mermaidCode);
} else {
  dv.paragraph("No tasks found with #ganttchart or #roadmap marker and valid start/due dates.");
}

`````

## TEST DATAVIEW 8

```js
// ----------------------
// Helper Functions & Configuration
// ----------------------

// Priority mapping based on emojis.
const priorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

const getPriority = (text) => {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "";
};

// Determine status based on markers, due date, and priority.
const getStatus = (text, priority, dueDate) => {
  // If milestone markers are present, always use milestone.
  if (text.includes("🔺") || text.includes("🚩")) return "milestone";
  // If overdue, use the overdue flag.
  if (new Date(dueDate) < new Date()) return config.overdueFlag;
  // Otherwise, if priority is Highest, mark as crit;
  // if Low/Lowest, mark as inactive; else active.
  if (priority === "Highest") return "crit";
  if (priority === "Low" || priority === "Lowest") return "inactive";
  return "active";
};

// Read configuration from frontmatter.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || "",
  dateRangePattern: dv.current().dateRangePattern || "",  // e.g., "MM/DD"
  showQuarters: dv.current().showQuarters !== false,       // default true
  topDivider: dv.current().topDivider || "°",
  bottomDivider: dv.current().bottomDivider || "•",
  topLevelCrit: dv.current().topLevelCrit !== false         // default true
};

  
// ----------------------
// Text Processing
// ----------------------

// Remove hashtags, marker emojis, and inline dates (YYYY-MM-DD).
// Also, extract any nested roadmap segments.
// Returns an object with a pure base title, the root lane, and any child segments.
function processTaskText(text) {
  // Capture roadmap segments up to 4 levels.
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  let m = text.match(roadmapRegex);
  let lane = config.defaultLane;
  let childChain = [];
  if (m) {
    if (m[1]) lane = m[1];
    for (let i = 2; i < m.length; i++) {
      if (m[i]) childChain.push(m[i]);
    }
  }
  // Remove all hashtags.
  let pureText = text.replace(/#[\w\/-]+/g, "");
  // Remove common marker emojis.
  pureText = pureText.replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "");
  // Remove any inline dates in the format YYYY-MM-DD.
  pureText = pureText.replace(/\d{4}-\d{2}-\d{2}/g, "");
  // Collapse extra whitespace.
  pureText = pureText.replace(/\s+/g, " ").trim();
  return { baseTitle: pureText, lane: lane, childChain: childChain };
}

// ----------------------
// Main Task Processing & Grouping
// ----------------------

// Filter tasks that include #ganttchart or #roadmap with valid start & due dates.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap"))
         && t.start && t.due && !t.completed && t.status != "-");

// Group tasks by lane.
const laneGroups = {};

tasks.forEach(task => {
  const startDate = task.start.toString().split("T")[0];
  const dueDate   = task.due.toString().split("T")[0];
  
  // Process the task text.
  let { baseTitle, lane, childChain } = processTaskText(task.text);
  
  // Build a compact date range string if configured.
  let dateRangeStr = "";
  if (config.dateRangePattern) {
    dateRangeStr = " [" + moment(startDate, config.dateFormat).format(config.dateRangePattern)
      + " - " + moment(dueDate, config.dateFormat).format(config.dateRangePattern) + "]";
  }
  
  // Determine priority.
  let priority = getPriority(task.text);
  let priorityStr = priority ? " (" + priority + ")" : "";
  
  // Build child breadcrumb string.
  let childStr = "";
  if (childChain.length > 0) {
    childStr = " (" + childChain.join("/") + ")";
  }
  
  // Final label: base title + (date range) + child breadcrumbs + (priority).
  let finalLabel = baseTitle + dateRangeStr + childStr + priorityStr;
  
  // Determine status using our helper, then override if top-level.
  let status = getStatus(task.text, priority, dueDate);
  if (config.topLevelCrit && childChain.length === 0 && status !== "milestone") {
    status = "crit";
  }
  
  // Construct the mermaid task line.
  let taskLine = "    " + finalLabel + " :" + status + ", " + startDate + ", " + dueDate;
  
  // Group by lane.
  if (!laneGroups[lane]) laneGroups[lane] = [];
  laneGroups[lane].push(taskLine);
});

// ----------------------
// Build Mermaid Code Output
// ----------------------
if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";

	// uncomment the blow "mermaidCode" and change values as need be   

  // Embed front matter if set.
  if (config) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    //mermaidCode += "titleTopMargin: 25\n";
    //mermaidCode += "barHeight: 20\n";  // The height of the bars in the graph
    //mermaidCode += "barGap: 4\n";  // The margin between the different activities in the gantt diagram
    //mermaidCode += "topPadding: 75\n";  // Margin between title and gantt diagram and between axis and gantt diagram.
    //mermaidCode += "rightPadding: 75\n";  // The space allocated for the section name to the right of the activities
    //mermaidCode += "leftPadding: 75\n";  // The space allocated for the section name to the left of the activities
    //mermaidCode += "gridLineStartPadding: 10\n";  // Vertical starting position of the grid lines
    //mermaidCode += "fontSize: 12\n";  // Font size
    //mermaidCode += "sectionFontSize: 24\n";  // Font size for sections
    //mermaidCode += "numberSectionStyles: 1\n";  // The number of alternating section styles
    //mermaidCode += "axisFormat: '%d/%m'\n";  // Date/time format of the axis
    ///mermaidCode += "tickInterval: '1 week'\n";  // Axis ticks
    //mermaidCode += "topAxis: true\n";  // When this flag is set, date labels will be added to the top of the chart
    //mermaidCode += "weekday: 'sunday'\n";  // On which day a week-based interval should start
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  //mermaidCode += "    excludes weekends\n";
  //mermaidCode += "    tickInterval 1month\n";
  //mermaidCode += "    weekday monday\n";
  
  // ----------------------
  // Top Divider Section (START)
  // ----------------------
  if (config.ganttStart) {
    mermaidCode += "section " + config.topDivider + "\n";
    mermaidCode += "    START :milestone, crit, " + config.ganttStart + ", " + config.ganttStart + "\n";
  }
  
  // ----------------------
  // Roadmap Lane Sections
  // ----------------------
  for (const lane in laneGroups) {
    mermaidCode += "\nsection " + lane + "\n";
    mermaidCode += laneGroups[lane].join("\n") + "\n";
  }
  
  // ----------------------
  // Bottom Divider Section (Quarter markers and END)
  // ----------------------
  mermaidCode += "\nsection " + config.bottomDivider + "\n";
  
  if (config.showQuarters && config.ganttStart && config.ganttEnd) {
    // Use moment to ensure correct year parsing.
    let startYear = Number(moment(config.ganttStart, config.dateFormat).format("YYYY"));
    let endYear   = Number(moment(config.ganttEnd, config.dateFormat).format("YYYY"));
    // Debug: console.log(startYear, endYear);
    if (startYear === endYear) {
      let q1 = moment(config.ganttStart, config.dateFormat).month(2).endOf("month").format("YYYY-MM-DD"); // End of March
      let q2 = moment(config.ganttStart, config.dateFormat).month(5).endOf("month").format("YYYY-MM-DD"); // End of June
      let q3 = moment(config.ganttStart, config.dateFormat).month(8).endOf("month").format("YYYY-MM-DD"); // End of September
      let q4 = moment(config.ganttStart, config.dateFormat).month(11).endOf("month").format("YYYY-MM-DD"); // End of December
      mermaidCode += "    Q1 :milestone, crit, done," + q1 + ", " + q1 + "\n";
      mermaidCode += "    Q2 :milestone, crit, done," + q2 + ", " + q2 + "\n";
      mermaidCode += "    Q3 :milestone, crit, done," + q3 + ", " + q3 + "\n";
      mermaidCode += "    Q4 :milestone, crit, done," + q4 + ", " + q4 + "\n";
    }
  }
  
  if (config.ganttEnd) {
    mermaidCode += "    END :milestone, crit," + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  mermaidCode += "```";
  
  dv.el("pre", mermaidCode);
} else {
  dv.paragraph("No tasks found with #ganttchart or #roadmap marker and valid start/due dates.");
}
```

## TEST DATAVIEW 7

```js
// ----------------------
// Helper Functions & Config
// ----------------------

// Priority mapping based on emojis.
const priorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

const getPriority = (text) => {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "";
};

// Determine task status based on markers and priority.
const getStatus = (text, priority, dueDate) => {
  if (text.includes("🔺") || text.includes("🚩")) return "milestone";
  if (new Date(dueDate) < new Date() ) return config.overdueFlag;
  if (priority === "Highest") return "crit";
  if (priority === "Low" || priority === "Lowest") return "inactive";
  return "active";
};

// Read configuration from frontmatter.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || "",
  dateRangePattern: dv.current().dateRangePattern || "",  // e.g., "MM/DD"
  showQuarters: dv.current().showQuarters !== false,       // default true
  topDivider: dv.current().topDivider || "°",
  bottomDivider: dv.current().bottomDivider || "•"
};

// ----------------------
// Text Processing
// ----------------------

// Given a task text, strip out hashtags and marker emojis and dates.
// Also, extract any nested roadmap segments.
function processTaskText(text) {
  // Extract roadmap segments up to 4 levels.
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  let m = text.match(roadmapRegex);
  let lane = config.defaultLane;
  let childChain = [];
  if (m) {
    if (m[1]) lane = m[1];
    for (let i = 2; i < m.length; i++) {
      if (m[i]) childChain.push(m[i]);
    }
  }
  // Remove all hashtags.
  let pureText = text.replace(/#[\w\/-]+/g, "");
  // Remove marker emojis (common ones used).
  pureText = pureText.replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "");
  // Remove any dates (format YYYY-MM-DD) that might be inline.
  pureText = pureText.replace(/\d{4}-\d{2}-\d{2}/g, "");
  // Collapse extra whitespace.
  pureText = pureText.replace(/\s+/g, " ").trim();
  return { baseTitle: pureText, lane: lane, childChain: childChain };
}

// ----------------------
// Main Task Processing & Grouping
// ----------------------

// Filter tasks that include #ganttchart or #roadmap and have start & due.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap"))
         && t.start && t.due && !t.completed && t.status != "-");

// Group tasks by lane.
const laneGroups = {};

tasks.forEach(task => {
  let startDate = task.start.toString().split("T")[0];
  let dueDate = task.due.toString().split("T")[0];
  
  // Process text.
  let { baseTitle, lane, childChain } = processTaskText(task.text);
  
  // Build a compact date range string if configured.
  let dateRangeStr = "";
  if (config.dateRangePattern) {
    dateRangeStr = " [" + moment(startDate).format(config.dateRangePattern)
      + " - " + moment(dueDate).format(config.dateRangePattern) + "]";
  }
  
  // Determine priority.
  let priority = getPriority(task.text);
  
  // Append priority in parentheses.
  let priorityStr = "";
  if (priority == ""){
	  priorityStr = "";
	}else {
	  priorityStr = " (" + priority + ")";
	}
  
  
  // Optionally append child groups if any.
  let childStr = "";
  if (childChain.length > 0) {
    childStr = " (" + childChain.join("/") + ")";
  }
  
  // Final label: base text + date range + child groups + priority.
  let finalLabel = baseTitle + dateRangeStr + childStr + priorityStr;
  
  // Determine status.
  let status = getStatus(task.text, priority, dueDate);
  
  // Construct the mermaid task line.
  let taskLine = "    " + finalLabel + " :" + status + ", " + startDate + ", " + dueDate;
  
  // Group by lane.
  if (!laneGroups[lane]) laneGroups[lane] = [];
  laneGroups[lane].push(taskLine);
});

// ----------------------
// Build Mermaid Code Output
// ----------------------
if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";
  
  // Embed front matter if set.
  if (config) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    mermaidCode += "titleTopMargin: 25\n";
    mermaidCode += "barHeight: 20\n";  // The height of the bars in the graph
    mermaidCode += "barGap: 4\n";  // The margin between the different activities in the gantt diagram
    mermaidCode += "topPadding: 75\n";  // Margin between title and gantt diagram and between axis and gantt diagram.
    mermaidCode += "rightPadding: 75\n";  // The space allocated for the section name to the right of the activities
    mermaidCode += "leftPadding: 75\n";  // The space allocated for the section name to the left of the activities
    mermaidCode += "gridLineStartPadding: 10\n";  // Vertical starting position of the grid lines
    mermaidCode += "fontSize: 12\n";  // Font size
    mermaidCode += "sectionFontSize: 24\n";  // Font size for sections
    mermaidCode += "numberSectionStyles: 1\n";  // The number of alternating section styles
    mermaidCode += "axisFormat: '%d/%m'\n";  // Date/time format of the axis
    mermaidCode += "tickInterval: '1 week'\n";  // Axis ticks
    mermaidCode += "topAxis: true\n";  // When this flag is set, date labels will be added to the top of the chart
    mermaidCode += "weekday: 'sunday'\n";  // On which day a week-based interval should start
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  //mermaidCode += "    excludes weekends\n";
  //mermaidCode += "    tickInterval 1month\n";
  //mermaidCode += "    weekday monday\n";
  
  // Top divider section with dummy START task.
  if (config.ganttStart) {
    mermaidCode += "section " + config.topDivider + "\n";
    mermaidCode += "    START :milestone, crit, " + config.ganttStart + ", " + config.ganttStart + "\n";
  }
  
  // For each lane (e.g. General Roadmap, dfir, etc.)
  for (const lane in laneGroups) {
    mermaidCode += "\nsection " + lane + "\n";
    mermaidCode += laneGroups[lane].join("\n") + "\n";
  }
  
  // Bottom divider section: add quarter markers if enabled, then dummy END task.
  mermaidCode += "\nsection " + config.bottomDivider + "\n";
  if (config.showQuarters && config.ganttStart && config.ganttEnd) {
    let startYear = new Date(config.ganttStart).getFullYear();
    let endYear = new Date(config.ganttEnd).getFullYear();
    console.log(`${startYear} through ${endYear}`);
    if (startYear === endYear) {
      let q1 = new Date(startYear, 3, 0).toISOString().split("T")[0];
      let q2 = new Date(startYear, 6, 0).toISOString().split("T")[0];
      let q3 = new Date(startYear, 9, 0).toISOString().split("T")[0];
      let q4 = new Date(startYear, 12, 0).toISOString().split("T")[0];
      mermaidCode += "    Q1 :milestone, " + q1 + ", " + q1 + "\n";
      mermaidCode += "    Q2 :milestone, " + q2 + ", " + q2 + "\n";
      mermaidCode += "    Q3 :milestone, " + q3 + ", " + q3 + "\n";
      mermaidCode += "    Q4 :milestone, " + q4 + ", " + q4 + "\n";
    }
  }
  if (config.ganttEnd) {
    mermaidCode += "    END :milestone, crit," + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  mermaidCode += "```";
  console.log(mermaidCode);
  dv.el("pre", mermaidCode);
} else {
  dv.paragraph("No tasks found with #ganttchart or #roadmap marker and valid start/due dates.");
}
```

## TEST DATAVIEW 6

```js
// ----------------------
// Helper Functions & Configuration
// ----------------------

// Priority mapping based on emojis.
const priorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

const getPriority = (text) => {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "Medium";
};
  
// Configuration from front matter.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || "",
  showStart: dv.current().showStart !== false,    // default true
  showDue: dv.current().showDue !== false,        // default true
  showCreation: dv.current().showCreation || false  // default false
};

const today = new Date();

// ----------------------
// Task Filtering & Processing
// ----------------------

// Select tasks with #ganttchart or #roadmap that have start and due dates.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap"))
         && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";
  
  // Embed display mode YAML if set.
  if (config.displayMode) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  
  // ----------------------
  // Chart Boundaries as Dummy Tasks (Milestones)
  // ----------------------
  if (config.ganttStart && config.ganttEnd) {
    mermaidCode += "section __Chart Range__\n";
    mermaidCode += "    START :milestone, " + config.ganttStart + ", " + config.ganttStart + "\n";
    mermaidCode += "    END   :milestone, " + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  // ----------------------
  // Quarter Divisions (if boundaries fall within one year)
  // ----------------------
  if (config.ganttStart && config.ganttEnd) {
    let startYear = new Date(config.ganttStart).getFullYear();
    let endYear = new Date(config.ganttEnd).getFullYear();
    if (startYear === endYear) {
      // Compute the last day of each quarter.
      let q1 = new Date(startYear, 3, 0).toISOString().split("T")[0];  // Last day of March.
      let q2 = new Date(startYear, 6, 0).toISOString().split("T")[0];  // Last day of June.
      let q3 = new Date(startYear, 9, 0).toISOString().split("T")[0];  // Last day of September.
      let q4 = new Date(startYear, 12, 0).toISOString().split("T")[0]; // Last day of December.
      mermaidCode += "section Quarter Divisions\n";
      mermaidCode += "    Q1 :milestone, " + q1 + ", " + q1 + "\n";
      mermaidCode += "    Q2 :milestone, " + q2 + ", " + q2 + "\n";
      mermaidCode += "    Q3 :milestone, " + q3 + ", " + q3 + "\n";
      mermaidCode += "    Q4 :milestone, " + q4 + ", " + q4 + "\n";
    }
  }
  
  // ----------------------
  // Group Tasks by Roadmap Lane & Process Labels
  // ----------------------
  const roadmapGroups = {};
  // Regex to capture nested markers: "#roadmap", "#roadmap/topic", or "#roadmap/topic/subtask"
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  
  tasks.forEach(task => {
    const text = task.text;
    const startDate = task.start.toString().split("T")[0];
    const dueDate = task.due.toString().split("T")[0];
    
    // Determine lane and subcategory.
    let lane = config.defaultLane;
    let subcategory = "";
    const match = text.match(roadmapRegex);
    if (match) {
      if (match[1]) lane = match[1];
      if (match[2]) subcategory = match[2];
    }
    
    // Base label: remove all hashtags.
    let baseLabel = text.replace(/#[\w\/-]+/g, "").trim();
    if (!baseLabel) baseLabel = "Untitled Task";
    
    // Append optional date info based on config.
    let dateInfo = "";
    if (config.showStart) dateInfo += " S:" + startDate;
    if (config.showDue) dateInfo += " D:" + dueDate;
    if (config.showCreation && task.file && task.file.ctime) {
      dateInfo += " C:" + moment(task.file.ctime).format(config.dateFormat);
    }
    
    // Determine priority and status.
    let priority = getPriority(text);
    let priorityLabel = " [" + priority + "]";
    let status = "active";
    // If task text contains 🔺 or 🚩, mark as milestone.
    if (text.includes("🔺") || text.includes("🚩")) {
      status = "milestone";
    } else {
      if (priority === "Highest") status = "crit";
      else if (priority === "Low" || priority === "Lowest") status = "inactive";
      else status = "active";
    }
    // If overdue (and not already a milestone), append overdue suffix and override status.
    if (status !== "milestone" && new Date(dueDate) < today) {
      baseLabel += config.overdueSuffix;
      status = config.overdueFlag;
    }
    
    // Final label: base label + priority + date info.
    let finalLabel = baseLabel + priorityLabel + dateInfo;
    if (subcategory) finalLabel = "(" + subcategory + ") " + finalLabel;
    
    // Construct the task line.
    let taskLine = "    " + finalLabel + " :" + status + ", " + startDate + ", " + dueDate;
    
    // Group by lane.
    if (!roadmapGroups[lane]) roadmapGroups[lane] = [];
    roadmapGroups[lane].push(taskLine);
  });
  
  // ----------------------
  // Append Each Roadmap Lane Section
  // ----------------------
  for (const lane in roadmapGroups) {
    if (roadmapGroups[lane].length > 0) {
      mermaidCode += "\nsection " + lane + "\n" + roadmapGroups[lane].join("\n") + "\n";
    }
  }
  
  mermaidCode += "```";
  
  // Render the Mermaid diagram.
  dv.el("pre", mermaidCode);
  console.log(mermaidCode);
} else {
  dv.paragraph("No tasks found with #ganttchart or #roadmap marker and valid start/due dates.");
}
```

## TEST DATAVIEW 5

```js
// Configuration options pulled from front matter or inline fields.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || ""
};

const today = new Date();

// Select tasks that include either the #ganttchart or #roadmap marker and have valid start/due dates.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap"))
         && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";
  
  // If a display mode is provided (e.g., compact), embed it as YAML front matter inside the Mermaid block.
  if (config.displayMode) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  
  // Insert dummy one-day tasks to force chart boundaries.
  if (config.ganttStart && config.ganttEnd) {
    mermaidCode += "section __Chart Range__\n";
    mermaidCode += "    START :active, " + config.ganttStart + ", " + config.ganttStart + "\n";
    mermaidCode += "    END   :active, " + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  // Add vertical quarter divisions if ganttStart and ganttEnd are in the same year.
  if (config.ganttStart && config.ganttEnd) {
    let startYear = new Date(config.ganttStart).getFullYear();
    let endYear = new Date(config.ganttEnd).getFullYear();
    if (startYear === endYear) {
      // Calculate quarter end dates using JavaScript date math.
      let q1 = new Date(startYear, 3, 0).toISOString().split("T")[0]; // Last day of March.
      let q2 = new Date(startYear, 6, 0).toISOString().split("T")[0]; // Last day of June.
      let q3 = new Date(startYear, 9, 0).toISOString().split("T")[0]; // Last day of September.
      let q4 = new Date(startYear, 12, 0).toISOString().split("T")[0]; // Last day of December.
      mermaidCode += "section Quarter Divisions\n";
      mermaidCode += "    Q1 :milestone, " + q1 + ", " + q1 + "\n";
      mermaidCode += "    Q2 :milestone, " + q2 + ", " + q2 + "\n";
      mermaidCode += "    Q3 :milestone, " + q3 + ", " + q3 + "\n";
      mermaidCode += "    Q4 :milestone, " + q4 + ", " + q4 + "\n";
    }
  }
  
  // Group tasks by roadmap lane.
  const roadmapGroups = {};
  // This regex captures nested roadmap markers: "#roadmap", "#roadmap/topic", or "#roadmap/topic/subtask"
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  
  tasks.forEach(task => {
    const text = task.text;
    const startDate = task.start.toString().split("T")[0];
    const dueDate = task.due.toString().split("T")[0];
    
    // Determine the lane and an optional subcategory.
    let lane = config.defaultLane;
    let subcategory = "";
    const match = text.match(roadmapRegex);
    if (match) {
      if (match[1]) lane = match[1];
      if (match[2]) subcategory = match[2];
    }
    
    // Clean the task label by removing all hashtags.
    let label = text.replace(/#[\w\/-]+/g, "").trim();
    if (!label) label = "Untitled Task";
    if (subcategory) {
      label = "(" + subcategory + ") " + label;
    }
    
    // Determine if the task is overdue.
    const isOverdue = new Date(dueDate) < today;
    let taskLine = "";
    if (isOverdue) {
      taskLine = "    " + label + config.overdueSuffix + " :" + config.overdueFlag + ", " + startDate + ", " + dueDate;
    } else {
      taskLine = "    " + label + " :active, " + startDate + ", " + dueDate;
    }
    
    // Group the task line into its lane.
    if (!roadmapGroups[lane]) {
      roadmapGroups[lane] = [];
    }
    roadmapGroups[lane].push(taskLine);
  });
  
  // Append each lane section.
  for (const lane in roadmapGroups) {
    if (roadmapGroups[lane].length > 0) {
      mermaidCode += "\nsection " + lane + "\n" + roadmapGroups[lane].join("\n") + "\n";
    }
  }
  
  mermaidCode += "```";
  
  dv.el("pre", mermaidCode);
} else {
  dv.paragraph("No tasks found with #roadmap (or #ganttchart) marker and valid start/due dates.");
}
```

## TEST DATAVIEW 4

```js
// Configuration options pulled from inline dataview fields or default values.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
  displayMode: dv.current().displayMode || "",
  ganttStart: dv.current().ganttStart || "",
  ganttEnd: dv.current().ganttEnd || ""
};

// Today's date for overdue comparisons.
const today = new Date();

// Select tasks that include either the #ganttchart or #roadmap marker and have valid start/due dates.
const tasks = dv.pages("")
  .file.tasks
  .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap")) && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
  let mermaidCode = "```mermaid\n";
  
  // If displayMode is provided, embed YAML front matter for it.
  if (config.displayMode) {
    mermaidCode += "---\n";
    mermaidCode += "displayMode: " + config.displayMode + "\n";
    mermaidCode += "---\n";
  }
  
  mermaidCode += "gantt\n";
  mermaidCode += "    title " + config.title + "\n";
  mermaidCode += "    dateFormat " + config.dateFormat + "\n";
  mermaidCode += "    axisFormat " + config.axisFormat + "\n";
  
  // Add dummy tasks for chart boundaries using one-day tasks named START and END.
  if (config.ganttStart && config.ganttEnd) {
    mermaidCode += "section __Chart Range__\n";
    mermaidCode += "    START :active, " + config.ganttStart + ", " + config.ganttStart + "\n";
    mermaidCode += "    END   :active, " + config.ganttEnd + ", " + config.ganttEnd + "\n";
  }
  
  // Object to store tasks grouped by lane.
  const roadmapGroups = {};
  
  // Regular expression to capture roadmap markers.
  // Matches: "#roadmap", "#roadmap/topic", or "#roadmap/topic/subtask"
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  
  tasks.forEach(task => {
    const text = task.text;
    const startDate = task.start.toString().split("T")[0];
    const dueDate = task.due.toString().split("T")[0];
    
    // Extract roadmap details.
    let lane = config.defaultLane;
    let subcategory = "";
    const match = text.match(roadmapRegex);
    if (match) {
      if (match[1]) lane = match[1];
      if (match[2]) subcategory = match[2];
    }
    
    // Clean up the task label by removing all hashtags.
    let label = text.replace(/#[\w\/-]+/g, "").trim();
    if (!label) label = "Untitled Task";
    if (subcategory) label = `(${subcategory}) ${label}`;
    
    // Check if the task is overdue.
    const isOverdue = new Date(dueDate) < today;
    let taskLine = "";
    if (isOverdue) {
      taskLine = "    " + label + config.overdueSuffix + " :" + config.overdueFlag + ", " + startDate + ", " + dueDate;
    } else {
      taskLine = "    " + label + " :active, " + startDate + ", " + dueDate;
    }
    
    // Group tasks by the determined lane.
    if (!roadmapGroups[lane]) {
      roadmapGroups[lane] = [];
    }
    roadmapGroups[lane].push(taskLine);
  });
  
  // Build Mermaid sections for each lane.
  for (const lane in roadmapGroups) {
    if (roadmapGroups[lane].length > 0) {
      mermaidCode += "\nsection " + lane + "\n" + roadmapGroups[lane].join("\n") + "\n";
    }
  }
  
  // Append class definitions (for milestone styling, etc.) if needed.
  //mermaidCode += "\nclassDef milestone fill:#ffb6c1,stroke:#ff69b4,stroke-width:2px;\n";
  
  mermaidCode += "```";
  
  // Render the Mermaid diagram in the preview.
  dv.el("pre", mermaidCode);
} else {
  dv.paragraph("No tasks found with #roadmap (or #ganttchart) marker and valid start/due dates.");
}
```

## TEST DATAVIEW 3

```js
// Configuration options pulled from inline dataview fields or default values.
const config = {
  title: dv.current().roadmapTitle || "Roadmap Tasks",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD",
  axisFormat: dv.current().roadmapAxisFormat || "%d-%b",
  defaultLane: dv.current().roadmapDefaultLane || "General Roadmap",
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "crit",
};

// Today's date for overdue comparison.
const today = new Date();

// Select tasks that include either the #ganttchart or #roadmap marker and have valid start/due dates.
const tasks = dv.pages("")
    .file.tasks
    .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap")) && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
    let ganttData = `\`\`\`mermaid
gantt
    title ${config.title}
    dateFormat ${config.dateFormat}
    axisFormat ${config.axisFormat}
    `;
    
    // Object to store tasks grouped by top-level lane (topic).
    const roadmapGroups = {};
    
    // Regular expression to capture roadmap markers.
    // Matches: "#roadmap", "#roadmap/topic", or "#roadmap/topic/subtask"
    const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?/;
    
    tasks.forEach(task => {
        const text = task.text;
        const startDate = task.start.toString().split("T")[0];
        const dueDate = task.due.toString().split("T")[0];
        
        // Extract roadmap details.
        const match = text.match(roadmapRegex);
        let lane = config.defaultLane;
        let subcategory = "";
        if (match) {
            if (match[1]) lane = match[1];
            if (match[2]) subcategory = match[2];
        }
        
        // Clean up the task label by removing roadmap-related and other hashtags.
        let label = text.replace(/#[\w\/-]+/g, "").trim();
        // If a subcategory is defined, prepend it to the label.
        if (subcategory) {
            label = `(${subcategory}) ${label}`;
        }
        
        // Check if the task is overdue.
        const isCritical = new Date(dueDate) < today;
        let taskLine = "";
        if (isCritical) {
            taskLine = `    ${label}${config.overdueSuffix} :${config.overdueFlag}, ${startDate}, ${dueDate}`;
        } else {
            taskLine = `    ${label} :active, ${startDate}, ${dueDate}`;
        }
        
        // Group tasks by the determined lane.
        if (!roadmapGroups[lane]) {
            roadmapGroups[lane] = [];
        }
        roadmapGroups[lane].push(taskLine);
    });
    
    // Build Mermaid sections for each lane.
    for (const lane in roadmapGroups) {
        if (roadmapGroups[lane].length > 0) {
            ganttData += `\nsection ${lane}\n`;
            ganttData += roadmapGroups[lane].join("\n");
        }
    }
    
    ganttData += `\n\`\`\``;
    
    // Render the Mermaid diagram in the preview.
    dv.el("pre", ganttData);
} else {
    dv.paragraph("No tasks found with #roadmap (or #ganttchart) marker and valid start/due dates.");
}
```

## TEST DATAVIEW 2

```js
// This script generates a Mermaid Gantt chart for tasks marked with #roadmap (or #ganttchart).
// Use "#roadmap/topic" to assign a task to a specific vertical lane (the topic name).

const today = new Date();

// Select tasks that include either the #ganttchart or #roadmap marker and have start/due dates.
const tasks = dv.pages("")
    .file.tasks
    .where(t => (t.text.includes("#ganttchart") || t.text.includes("#roadmap")) && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
    let ganttData = `
\`\`\`mermaid
gantt
    title Roadmap Tasks
    dateFormat YYYY-MM-DD
    axisFormat %d-%b
    `;
    
    // Object to store tasks by roadmap lane
    const roadmapLanes = {};

    tasks.forEach(task => {
        const text = task.text;
        const startDate = task.start.toString().split("T")[0];
        const dueDate = task.due.toString().split("T")[0];
        
        // Extract roadmap lane if available: matches "#roadmap/topic"
        let lane = "General Roadmap";
        const roadmapMatch = text.match(/#roadmap\/([\w-]+)/);
        if (roadmapMatch) {
            lane = roadmapMatch[1];
        } else if (text.includes("#roadmap")) {
            lane = "General Roadmap";
        } else {
            // Skip tasks without the roadmap marker.
            return;
        }
        
        // Remove roadmap-related hashtags from the task text for a clean label.
        let label = text.replace(/#[\w\/-]+/g, "").trim();
        
        // Determine if the task is overdue and mark it as critical if so.
        const isCritical = new Date(dueDate) < today;
        let taskLine = "";
        if (isCritical) {
            taskLine = `    ${label} overdue :crit, ${startDate}, ${dueDate}`;
        } else {
            taskLine = `    ${label} :active, ${startDate}, ${dueDate}`;
        }
        
        if (!roadmapLanes[lane]) {
            roadmapLanes[lane] = [];
        }
        roadmapLanes[lane].push(taskLine);
    });
    
    // Build Mermaid sections for each roadmap lane.
    for (const lane in roadmapLanes) {
        if (roadmapLanes[lane].length > 0) {
            ganttData += `\nsection ${lane}\n`;
            ganttData += roadmapLanes[lane].join("\n");
        }
    }
    
    ganttData += `\n\`\`\``;
    
    // Render the Mermaid diagram.
    dv.el("pre", ganttData);
} else {
    dv.paragraph("No tasks found with #roadmap marker and valid start/due dates. Please mark tasks with #roadmap (or #roadmap/topic) and include both start and due dates.");
}
```

## TEST DATAVIEW 1

```js
// Priority mapping based on emojis
const priorityMap = {
    "⏬": "Lowest",
    "🔽": "Low",
    "⏺️": "Medium",
    "⏫": "High",
    "🔺": "Highest"
};

// Function to determine priority based on emoji in task text
const getPriority = (text) => {
    for (let emoji in priorityMap) {
        if (text.includes(emoji)) {
            return priorityMap[emoji];
        }
    }
    return "Medium"; // Default to Medium if no emoji is found
};

// Function to count completed and total subtasks
const countSubtasks = (subtasks) => {
    const completed = subtasks.filter(st => st.completed).length;
    return { completed, total: subtasks.length };
};

const tasks = dv.pages("").file.tasks.where(t => t.text.includes("#roadmap") && t.start && t.due && !t.completed && t.status != "-");

if (tasks.length > 0) {
    let ganttData = `
\`\`\`mermaid
gantt
    title Tasks with Start and Due Dates
    dateFormat YYYY-MM-DD
    axisFormat %d-%b
    `;
    
    // Group tasks by priority
    const priorityGroups = { "Lowest": [], "Low": [], "Medium": [], "High": [], "Highest": [] };
    tasks.forEach(task => {
        const priority = getPriority(task.text);
        
        // Sanitize task text
        let sanitizedTaskText = task.text
            .replace(/#[\w-]+/g, "") // Remove hashtags
            .replace(/(?:\p{Emoji_Presentation}|[\u2600-\u27BF])\s*\d{4}-\d{2}-\d{2}/gu, "") // Remove dates with emojis
            .replace(/[\n\r]+/g, " ") // Remove newlines
            .trim(); // Trim leading/trailing spaces

		for (let emoji in priorityMap) { sanitizedTaskText = sanitizedTaskText.replace(emoji, "").trim(); }

        const startDate = task.start.toString().split("T")[0]; // Extract YYYY-MM-DD
        const dueDate = task.due.toString().split("T")[0]; // Extract YYYY-MM-DD

        // Find subtasks of the current task
        const subtasks = task.subtasks || [];
        const { completed, total } = countSubtasks(subtasks);
        const progressMarker = total > 0 ? ` [${completed}/${total}]` : "";

        // Add main task
        if (sanitizedTaskText) {
            priorityGroups[priority].push(`    ${sanitizedTaskText}${progressMarker} :active, ${startDate}, ${dueDate}`);
        }

        // Add subtasks as dependencies
        subtasks.forEach((subtask) => {
            const sanitizedSubtaskText = subtask.text
                .replace(/#[\w-]+/g, "")
                .replace(/[\n\r]+/g, " ")
                .trim();

            if (sanitizedSubtaskText) {
                const subStartDate = subtask.start ? subtask.start.toString().split("T")[0] : startDate;
                const subDueDate = subtask.due ? subtask.due.toString().split("T")[0] : dueDate;

                priorityGroups[priority].push(`        ${sanitizedSubtaskText} : ${startDate}, ${subDueDate}`);
            }
        });
    });

    // Add tasks to Gantt chart by priority
    for (const priority in priorityGroups) {
        if (priorityGroups[priority].length > 0) {
            ganttData += `\nsection ${priority}\n`;
            ganttData += priorityGroups[priority].join("\n");
        }
    }

    ganttData += `\n\`\`\``;

    // Debug mode: Show raw text
	dv.el("pre", ganttData); 
} else {
    dv.paragraph("No tasks found with Gantt chart marker and with start and due dates. Mark text with #roadmap and ensure both start and due dates are marked.");
}
```