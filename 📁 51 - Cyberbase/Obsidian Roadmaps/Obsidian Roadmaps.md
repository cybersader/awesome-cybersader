---
aliases: []
tags: [initiatives/cyberbase]
publish: true
permalink: 
date created: Friday, February 21st 2025, 4:03 pm
date modified: Sunday, February 23rd 2025, 1:10 pm
---

- [forum.obsidian.md > How to style GANTT chart (mermaid)? - Help - Obsidian Forum](https://forum.obsidian.md/t/how-to-style-gantt-chart-mermaid/47883/5)
- [forum.obsidian.md > Resize and align mermaid diagrams - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/resize-and-align-mermaid-diagrams/7019)
- [forum.obsidian.md > Gantt charts are way too small to be readable - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/gantt-charts-are-way-too-small-to-be-readable/7017)
- 

# Gantt chart view of Tasks

## Important points to remember

1. Not all tasks need to go in ganttcharts: only place long terms tasks here.
2. To mark a task for gantt chart, put hashtag #ganttchart on it and ensure start and due date is marked that will plot the entry based on priority.

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

- [ ] IR #roadmap 🚩 🔺 ➕ 2025-02-21 🛫 2025-04-25 📅 2025-06-05
- [ ] Test time #roadmap/dfir 🛫 2025-04-15 📅 2025-09-15
- [ ] yrdy 3 #roadmap/dfir/child 🛫 2025-02-27 📅 2025-05-15
- [ ] test_deep #roadmap/dfir/child/deeper 🛫 2025-04-02 📅 2025-08-12
- [ ] test #roadmap/secops/vulnmgmt 🛫 2025-09-16 📅 2025-11-12

# Chronos + Dataview + Tasks

```dataviewjs
/****************************************************************************************
 * "Chronos Timeline" Generator from Tasks
 *
 * This code collects tasks with certain markers, processes them according to 
 * user-defined frontmatter or inline config, and outputs a "```chronos" codeblock.
 *
 * Key Features:
 *  - Parse #roadmap tasks and optionally nest them.
 *  - Show single-date tasks as points or markers in Chronos if desired.
 *  - Show range tasks (start & due) as events or periods.
 *  - Color tasks by priority or status.
 *  - Use grouping based on root-level segments (dfir for #roadmap/dfir) 
 *    or "full" path or a "breadcrumb" approach.
 *  - Insert user-specified date range for Chronos's default view 
 *    (like > DEFAULTVIEW start|end).
 *  - Optional quarter markers if the user desires, or some other marking approach.
 *  - Insert sub-bullets under tasks (subtasks) into the item description if desired.
 *  - Break the Chronos line at the first dash (`-`) to produce `Event Title | Description`.
 ****************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////
// 1. CONFIGURATION PULLED FROM FRONTMATTER OR INLINE FIELDS
//////////////////////////////////////////////////////////////////////////////////////////

const config = {
  // Basic timeline settings
  title: dv.current().roadmapTitle || "Timeline",
  dateFormat: dv.current().roadmapDateFormat || "YYYY-MM-DD", 
  defaultLane: dv.current().roadmapDefaultLane || "General",
  groupMode: dv.current().childLaneOption || "breadcrumb",   // "breadcrumb" or "full"

  // Colors & Priority
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "red",
  priorityColors: {
    Highest: "red",
    High:    "orange",
    Medium:  "blue",
    Low:     "green",
    Lowest:  "cyan"
  },
  doneColor:    "gray",     // or "green" if you prefer
  cancelledColor: "gray",   // or "red" if you prefer

  // Additional toggles
  topLevelCrit: dv.current().topLevelCrit !== false,  // not as relevant in Chronos, but kept for reference
  onlyOneDateAsPoint: true,  // if a task has only a start OR due, treat as a Chronos point

  // Subtasks -> description
  // If true, nested bullet lines under tasks become part of the "description" in Chronos (the text after "|")
  // The script will gather them up into a bullet list or single line
  captureSubtasks: true,   

  // Order & DefaultView
  defaultViewStart: dv.current().ganttStart || "",
  defaultViewEnd:   dv.current().ganttEnd   || "",
  // Chronos syntax example:   > DEFAULTVIEW 2025|2030

  // Quarter Markers
  showQuarters: dv.current().showQuarters !== false,
  // "top" or "bottom" for whether to put these Q# lines in the code or not 
  // (Chronos doesn't have a built-in concept of top/bottom, but we can place them as markers or points)
  quarterPlacement: "markers",   // "markers" or "points"
};


// Priority mapping based on emojis
const priorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "🔼": "High",    // optional, if you also use these emojis
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

// A helper to detect priority from text
function getPriority(text) {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "";
}

// A helper to parse #roadmap markers
function parseRoadmapMarkers(text) {
  // up to 4 levels
  const roadmapRegex = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  let lane = config.defaultLane;
  let childChain = [];
  let match = text.match(roadmapRegex);
  if (match) {
    if (match[1]) lane = match[1];
    for (let i = 2; i < match.length; i++) {
      if (match[i]) childChain.push(match[i]);
    }
  }
  return {lane, childChain};
}

// Function that extracts a sub-bullet list for a given task, if desired.
function collectSubtaskDescription(task) {
  if (!config.captureSubtasks || !task.subtasks) return "";
  // Let's build a bullet list of subtask lines
  // This can be refined to skip completed or do something else
  let lines = [];
  for (let s of task.subtasks) {
    // skip if done or not, your choice
    lines.push("- " + s.text);
  }
  if (lines.length > 0) {
    return "\n" + lines.join("\n");
  }
  return "";
}

// A small helper to see if a task is "done" or "cancelled".
function getTaskStatus(task) {
  // typical tasks plugin statuses might be "done", "cancelled", etc.
  if (task.status === "done") return "done";
  if (task.status === "cancelled") return "cancelled";
  return "pending";
}

// A helper to convert an Obsidian Task date to an ISO date string for Chronos
function toChronosDate(obsidianDate) {
  // ex: 2025-01-23
  // Chronos supports YYYY, YYYY-MM, etc. We'll just produce YYYY-MM-DD
  return obsidianDate.toString().split("T")[0];
}

// Query tasks (#roadmap or #ganttchart or anything you want):
const tasks = dv.pages("")
  .file.tasks
  .where(t => 
    (t.text.includes("#roadmap") || t.text.includes("#ganttchart")) 
    && !t.completed
  );

// We'll store lines in a big array, then join them at the end
let lines = [];

// We might add some optional flags for Chronos at the top. 
// e.g. > ORDERBY start
// or a default view if config.defaultViewStart & config.defaultViewEnd
// or a color scheme
let topFlags = [];

if (config.defaultViewStart && config.defaultViewEnd) {
  topFlags.push(`DEFAULTVIEW  ${config.defaultViewStart}|${config.defaultViewEnd}`);
}

// For ordering, you can decide how to handle. Let's do nothing by default:
topFlags.push(`ORDERBY start`);

//////////////////////////////////////
// Process each task => Chronos items
//////////////////////////////////////
for (let t of tasks) {
  // We assume "start" is t.start, "due" is t.due
  let start = t.start ? toChronosDate(t.start) : "";
  let end   = t.due   ? toChronosDate(t.due)   : "";
  
  // Get the text and parse lane markers
  let rawText = t.text;
  let {lane, childChain} = parseRoadmapMarkers(rawText);

  // Compute priority from emojis
  let prio = getPriority(rawText);

  // Also handle "done" or "cancelled" from tasks
  let localStatus = getTaskStatus(t); // e.g. "done", "cancelled", "pending"
  // We'll map that to a color or so
  let color = "";
  if (localStatus === "done") {
    color = `#${config.doneColor}`;
  } else if (localStatus === "cancelled") {
    color = `#${config.cancelledColor}`;
  } else if (prio && config.priorityColors[prio]) {
    color = `#${config.priorityColors[prio]}`; 
    // for instance, #red, #blue, #green, etc.
  }

  // For the final lane name if "childLaneOption" is "full"
  // or keep it as the root and append childChain to the item label
  let laneBreadcrumb = "";
  let itemTitle = rawText;
  // Remove the #roadmap... stuff from itemTitle:
  itemTitle = itemTitle.replace(/#[\w\/-]+/g, "").trim();

  // Optionally parse the " dash " in the text to separate title & desc
  // If we want: "Title - desc text"
  let dashIndex = itemTitle.indexOf(" - ");
  let desc = "";
  if (dashIndex > 0) {
    desc = itemTitle.slice(dashIndex + 3).trim();
    itemTitle = itemTitle.slice(0, dashIndex).trim();
  }

  // If capturing sub-bullets as well, append to desc
  if (config.captureSubtasks) {
    let subDesc = collectSubtaskDescription(t);
    if (subDesc) {
      desc += (desc ? "\n" : "") + subDesc;
    }
  }

  // If groupMode is "full"
  if (config.groupMode === "full" && childChain.length > 0) {
    lane = lane + "/" + childChain.join("/");
  } 
  // else if breadcrumb, we do nothing special to lane, but we add childChain to the itemTitle
  else if (config.groupMode === "breadcrumb" && childChain.length > 0) {
    itemTitle += ` (${childChain.join("/")})`;
  }

  // If the task has both start & end => treat as "Event"  => leading char is `-`
  // If only one => treat as "Point" => leading char is `*` or `=` or `@` if you want a period
  // But let's do "point" = single date, "event" = range, "period" = there's an option to treat it as a "period"

  // We'll default to events, but if only one date is present, we do a point
  let timelineChar = "-";
  let hasBoth = (start && end);
  let sDateForChronos = `[${start}]`;
  // if we have a range
  if (hasBoth) {
    // if they differ, we do [start~end]
    if (start !== end) {
      sDateForChronos = `[${start}~${end}]`;
    }
  }
  else {
    // only has 1 date => point
    timelineChar = "*";
    // pick whichever is non-empty
    sDateForChronos = `[${start || end}]`;
  }

  // next we do color and grouping
  // Chronos syntax: - [dateRange] #color {Group Name} Title | desc
  let groupPart = lane ? `{${lane}}` : "";
  let colorPart = color ? `${color}` : "";  // e.g. "#red"

  let finalLabel = "";
  if (desc) {
    finalLabel = `${itemTitle} | ${desc}`;
  } else {
    finalLabel = itemTitle; // no desc
  }

  // Put it all together
  // e.g.:  - [2025-01-05~2025-01-15] #red {dfir} My Title | some desc
  // You can skip the group if you don't want them as groups, or if Chronos's grouping is optional
  // Also note that if you put a color, it must come before the group in Chronos syntax
  let lineParts = [];
  lineParts.push(`${timelineChar} ${sDateForChronos}`);
  if (colorPart) lineParts.push(colorPart);
  if (groupPart) lineParts.push(groupPart);
  lineParts.push(finalLabel);

  // join them with a space
  let finalLine = lineParts.join(" ");

  lines.push(finalLine);
} // end tasks loop

/////////////////////////////////////////////////////////
// Build up the final Chronos code block
/////////////////////////////////////////////////////////
let chronosLines = [];
chronosLines.push("```chronos");

// Insert any topFlags like DEFAULTVIEW or ORDERBY:
for (let f of topFlags) {
  chronosLines.push(`> ${f}`);
}

// Optional: If we want user color or grouping examples, we can add them here
if (config.defaultViewStart && config.defaultViewEnd) {
  // example: > DEFAULTVIEW 2025|2026
  // It's already done in topFlags
}

// Insert quarter markers if desired, as Markers or Points. 
// If showQuarters => we can do something like:
if (config.showQuarters && config.ganttStart && config.ganttEnd) {
  let startYear = Number(moment(config.ganttStart, config.dateFormat).format("YYYY"));
  let endYear   = Number(moment(config.ganttEnd, config.dateFormat).format("YYYY"));
  if (startYear === endYear) {
    // e.g. Q1, Q2, Q3, Q4 as markers or points
    // We'll do markers with single date: e.g. = [year-03-31] Q1
    // or we do a period or event, up to you
    let q1 = moment(config.ganttStart, config.dateFormat).month(2).endOf("month").format("YYYY-MM-DD");
    let q2 = moment(config.ganttStart, config.dateFormat).month(5).endOf("month").format("YYYY-MM-DD");
    let q3 = moment(config.ganttStart, config.dateFormat).month(8).endOf("month").format("YYYY-MM-DD");
    let q4 = moment(config.ganttStart, config.dateFormat).month(11).endOf("month").format("YYYY-MM-DD");
    // If we want them at the top, put them at the start of lines array
    // If you want them at the bottom, push them last
    // We'll just add them first here:
    lines.unshift(`= [${q4}] Q4 marker`);
    lines.unshift(`= [${q3}] Q3 marker`);
    lines.unshift(`= [${q2}] Q2 marker`);
    lines.unshift(`= [${q1}] Q1 marker`);
  }
}

// Now let's push all lines
chronosLines.push(...lines);

// Done. Close code block
chronosLines.push("```");

dv.paragraph(chronosLines.join("\n"));
```

# Chronos Timeline (Community Plugin)

## Chronos Cheatsheet

After installing the Chronos Timeline plugin for Obsidian, copy and paste this whole markdown file into a file in your vault to play around and learn the syntax.

Hover on a timeline and click the Edit button in the upper right to play with the data.

### Date formats

Chronos can visualize dates from the year down to the second level, using the syntax `YYYY-MM-DDThh:mm:ss`.

The only required component of a date is the year (`YYYY`). Beyond that, you can specify additional time granularity as needed for your use case.

If not explicitly provided:

- The month and day default to `01` (January and the 1st)
- The hour, minute, and second default to `00` (top of the hour or minute)

#### Examples

```chronos
- [2020] A year
- [2020-02] A month
- [2020-02-28] A day
- [2020-02-28T12] An hour
- [2020-02-28T12:30] A minute
- [2020-02-28T12:30:09] A second
```

### Events

**Full Syntax**

```
- [Date~Date] #Color {Group Name} Event Name | Description
```

- The second Date, Color, Group Name, Event Name, and Description are optional
- Description appears when you hover on an event in the timeline

#### Examples

##### Single Date

**Syntax**

```
- [Date] Event Name
```

```chronos
- [1879-03-14] Einstein born
```

##### Date range

**Syntax**

```
- [Date~Date] Event Name
```

```chronos
- [1991~2001] Time I believed in Santa
```

##### Date range with description

**Syntax**

```
- [Date~Date] Event Name| Description
```

```chronos
- [1991~2001] Time I believed in Santa | ended when my brother tried to videotape Santa with a hidden camera
```

##### With color

See available [Colors](#colors)

**Syntax**

```
- [Date~Date] #Color Event Name| Description
```

```chronos
- [2001~2009] #red Bush
- [2009~2017] #blue Obama
- [2017~2021] #red Trump
- [2021~2025] #blue Biden
```

##### With groups

**Syntax**

```
- [Date(~Date)] {Group Name} Event Name| Description
```

```chronos
@ [1892-10-08~1941-08-31] {Marina Tsvetaeva} 1892-1941
- [1916] {Marina Tsvetaeva} "Подруга"
- [1928] {Marina Tsvetaeva}  "Поэма концов"
- [1941] {Marina Tsvetaeva} "Записки о поэзии"

@ [1899-08-24~1986-06-14] {Jorge Luis Borges} 1899-1986
- [1944] {Jorge Luis Borges} "Ficciones"
- [1949] {Jorge Luis Borges} "El Aleph"
- [1962] {Jorge Luis Borges} "Labyrinths"

```

### Periods

**Full Syntax**

```
@ [Date~Date] #Color {Group Name} Period Name
```

- Color, Group Name, and Period Name are optional

#### Examples

##### Basic

```chronos
@ [-300~250] Yayoi Period
- [-100] Introduction of rice cultivation
- [-57] Japan’s first recorded contact with China
```

##### With color

See available [Colors](#colors)

```chronos
@ [-300~250] #red Yayoi Period
- [-100] Introduction of rice cultivation
- [-57] Japan’s first recorded contact with China

@ [250~538] Kofun Period
- [250] Construction of keyhole-shaped kofun burial mounds begins
- [369] Yamato state sends envoys to Korea
```

### Points

**Syntax**

```
* [Date] Point Name | Description
```

```chronos
- [2024-02-26~2024-03-10] Tournament
* [2024-02-26] Game 1 | Austin
* [2024-02-28] Game 2 | Los Angeles
* [2024-03-06] Game 3 | Tokyo
* [2024-03-10] Game 4 | Jakarta
```

### Markers

**Syntax**

```
= [Date] Marker Name
```

#### Examples

```chronos
= [1440] Invention of the Gutenberg Press

- [1455] Gutenberg Bible Printed
@ [1501~1600] The Spread of Printing
- [1517] Martin Luther's 95 Theses
```

### Advanced example

```chronos
- [1945-07-17] {Europe} Potsdam Conference | where post-WWII Europe is divided
- [1947-03-12] {USA} Truman Doctrine | committing the U.S. to containing communism
- [1948-06-24~1949-05-12] {Europe} Berlin Blockade | and Airlift in response to Soviet actions in Berlin
- [1949-04-04] {Europe} Formation of NATO

# Early Cold War

@ [1957~1969] #cyan {USSR} Space Race
@ [1957~1969] #cyan {USA} Space Race
- [1950-06-25~1953-07-27] {Asia} Korean War | between North and South Korea
- [1955-05-14] {USSR} Warsaw Pact | in response to NATO
- [1957-10-04] #cyan {USSR} Sputnik launched | initiating the Space Race
- [1961-04-17] {Cuba} Bay of Pigs Invasion | in Cuba

# Height of Tensions

- [1962-10-16] {Cuba} Cuban Missile Crisis | a peak confrontation between the U.S. and USSR
- [1963-08-05] {Global} Partial Nuclear Test Ban Treaty signed
- [1969-07-20] #cyan {USA} Apollo 11 Moon landing | U.S. wins the Space Race
- [1972-05-26] {Global} SALT I signed | first Strategic Arms Limitation Treaty

# Détente Period

- [1979-12-24~1989-02-15] {USSR} Soviet-Afghan War | straining Soviet resources
- [1983-03-23] {USA} Reagan announces the Strategic Defense Initiative (SDI)
- [1986-04-26] {USSR} Chernobyl nuclear disaster
- [1987-12-08] {Global} INF Treaty | signed, eliminating intermediate-range nuclear missiles

# Late Cold War

- [1989-11-09] {Europe} Fall of the Berlin Wall | symbolizing the end of Cold War tensions
- [1991-07-31] {Global} START I Treaty signed | further arms reduction
- [1991-12-26] {USSR} Dissolution of the Soviet Union | officially ending the Cold War

= [1991-12-26] End of the Cold War

```

### Ordering

**Order by start date**

```chronos
> ORDERBY start

- [2026~2028] Event D
- [2024~2028] Event B
- [2025~2030] #red Event C
- [2020~2030] #red  Event A
```

**Order by start (descending)**

```chronos
> ORDERBY -start

- [2026~2028] Event D
- [2024~2028] Event B
- [2025~2030] #red Event C
- [2020~2030] #red  Event A
```

**Order by color and start**

```chronos
> ORDERBY color|start

- [2026~2028] Event D
- [2024~2028] Event B
- [2025~2030] #red Event C
- [2020~2030] #red  Event A
```

### Default view dates

Use the `> DEFAULTVIEW start|end` flag to specify default start and end dates for your timeline's initial load

```chronos
> DEFAULTVIEW  -3000|3000

- [2024] AGI
```

### Colors

- `#red`
- `#orange`
- `#yellow`
- `#green`
- `#blue`
- `#purple`
- `#pink`
- `#cyan`

# Dataview-Based (Gantt Charts)

## TEST DATAVIEW 9

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