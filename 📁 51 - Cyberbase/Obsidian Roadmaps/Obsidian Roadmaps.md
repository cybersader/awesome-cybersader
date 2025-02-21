---
aliases: []
tags: [initiatives/cyberbase]
publish: true
permalink: 
date created: Friday, February 21st 2025, 4:03 pm
date modified: Friday, February 21st 2025, 6:15 pm
---

# Gantt chat view of Tasks

## Important points to remember

1. Not all tasks need to go in ganttcharts: only place long terms tasks here.
2. To mark a task for gantt chart, put hashtag #ganttchart on it and ensure start and due date is marked that will plot the entry based on priority.

# Task Gantt Chart

```js
// Priority mapping based on emojis
const priorityMap = {
    "🔺": "Highest",
    "⏫": "High",
    "⏺️": "Medium",
    "🔽": "Low",
    "⏬": "Lowest"
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

const today = new Date(); // Get the current date
const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD format
const tomorrow = new Date(today); // Clone the today date 
tomorrow.setDate(today.getDate() + 1); // Add 1 day 
const future_date_max = new Date(today); future_date_max.setDate(today.getDate() + 90);
const tomorrowStr = tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
const tasks = dv.pages("").file.tasks.where(t => t.text.includes("#roadmap") && t.start && t.due && !t.completed && t.status != "-");
let endme="";

if (tasks.length > 0) {
    let ganttData = `
\`\`\`mermaid

gantt
    title Tasks with Start and Due Dates
    dateFormat YYYY-MM-DD
    axisFormat %d-%b
    `;
    
    // Group tasks by priority and create a critical group
    const priorityGroups = {"Critical": [], "Highest": [], "High": [], "Medium": [], "Low": [], "Lowest": [] };
    tasks.forEach(task => {
        const dueDate = new Date(task.due.toString().split("T")[0]); // Extract due date as Date object
		const startD = new Date(task.start.toString().split("T")[0]); // Extract start as Date object
		const startDate = task.start.toString().split("T")[0]; // Extract YYYY-MM-DD
        const endDate = task.due.toString().split("T")[0]; // Extract YYYY-MM-DD
        const endD = new Date(task.due.toString().split("T")[0]); // Extract YYYY-MM-DD
		const isCritical = dueDate < today; // Check if the task is overdue

		if (startD <= future_date_max) {
	        const priority = isCritical ? "Critical" : getPriority(task.text);
			if (endD > future_date_max) {
			endme = future_date_max.toString().split("T")[0]; // Extract YYYY-MM-DD
			}else {
			endme = endDate;
			}
	        let sanitizedTaskText = task.text
	            .replace(/#[\w-]+/g, "") // Remove hashtags
	            .replace(/(?:\p{Emoji_Presentation}|[\u2600-\u27BF])\s*\d{4}-\d{2}-\d{2}/gu, "") // Remove dates with emojis
	            .replace(/[\n\r]+/g, " ") // Remove newlines
	            .trim(); // Trim leading/trailing spaces
	
	        for (let emoji in priorityMap) { 
	            sanitizedTaskText = sanitizedTaskText.replace(emoji, "").trim(); 
	        }
	        
	        if (sanitizedTaskText) { // Ensure non-empty text
				if (isCritical) {
					priorityGroups[priority].push(`    ${sanitizedTaskText} overdue :crit, ${startDate}, ${tomorrowStr}`);
				} else { 
				    priorityGroups[priority].push(`    ${sanitizedTaskText} :active, ${startDate}, ${endDate}`);
		        }
	        }
		}
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

# Details of the Gantt Charted Pending Tasks

```
not done
tags includes #roadmap
```


- [ ] IR #roadmap 🚩 🔺 ➕ 2025-02-21 🛫 2025-04-25 📅 2025-06-05
- [ ] Test time #roadmap/dfir 🛫 2025-04-15 📅 2025-09-15
- [ ] yrdy 3 #roadmap/dfir/blah 🛫 2025-02-27 📅 2025-05-15

roadmapTitle:: "Initiative Roadmap"
roadmapDateFormat:: "YYYY-MM-DD"
roadmapAxisFormat:: "%d-%b"
roadmapDefaultLane:: "General Roadmap"
roadmapOverdueSuffix:: " overdue"
roadmapOverdueFlag:: "crit"
displayMode:: "compact"      # Optional: use "compact" to show multiple tasks per row
ganttStart:: "2025-01-01"    # Chart start boundary
ganttEnd:: "2025-12-31"      # Chart end boundary
showStart:: true             # Include start date in label?
showDue:: true               # Include due date in label?
showCreation:: false         # Include creation date in label? (Uses file ctime)

# TEST DATAVIEW 6

```dataviewjs
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

# TEST DATAVIEW 5

```dataviewjs
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

```mermaid
---
displayMode: "compact"      # Optional: use "compact" to show multiple tasks per row
---
gantt
    title Initiative Roadmap
    dateFormat YYYY-MM-DD
    axisFormat %d-%b
section __Chart Range__
    START :milestone, "2025-01-01"    # Chart start boundary, "2025-01-01"    # Chart start boundary
    END   :milestone, "2025-12-31"      # Chart end boundary, "2025-12-31"      # Chart end boundary

section General Roadmap
    IR  🚩 🔺 ➕ 2025-02-21 🛫 2025-04-25 📅 2025-06-05 [Highest] S:2025-04-25 D:2025-06-05 :milestone, 2025-04-25, 2025-06-05

section dfir
    Test time  🛫 2025-04-15 📅 2025-09-15 [Medium] S:2025-04-15 D:2025-09-15 :active, 2025-04-15, 2025-09-15
    (blah) yrdy 3  🛫 2025-02-27 📅 2025-05-15 [Medium] S:2025-02-27 D:2025-05-15 :active, 2025-02-27, 2025-05-15
```

# TEST DATAVIEW 4

```dataviewjs
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

# TEST DATAVIEW 3

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

# TEST DATAVIEW 2

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

# TEST DATAVIEW 1

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