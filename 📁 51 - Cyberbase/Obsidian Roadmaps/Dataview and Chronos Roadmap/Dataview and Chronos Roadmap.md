---
aliases: []
tags: []
publish: true
permalink:
date created: Sunday, February 23rd 2025, 3:51 pm
date modified: Monday, February 24th 2025, 5:50 pm
---

# Chronos Timeline (Community Plugin)

- [github.com > clairefro/obsidian-plugin-chronos: Render interactive timelines in your Obsidian notes from simple Markdown.](https://github.com/clairefro/obsidian-plugin-chronos?tab=readme-ov-file)
- [github.com > clairefro/obsidian-plugin-chronos > Table of Contents](https://github.com/clairefro/obsidian-plugin-chronos?tab=readme-ov-file#contents)
- 

# Chronos + Dataview + Tasks

Okay.  That all works pretty well now.  However, I've found another community plugin that has a very nice system that I would like integrate this sort of system into.  I'll show you my dataview + mermaid gantt workflow for some inspiration.  However, TO BE CLEAR, this does NOT use mermaid or gantt anymore.  This is a Chronos timeline based approach that I'm now taking

Here's the things I need to implement with the new Chronos plugin:
- [x] Parse the tasks date into the format that Chronos uses ✅ 2025-02-24
- [x] Colors based on priority ✅ 2025-02-24
- [x] Use a dash in the task title to break the event up into title and description.  If there's nested bullet points under the task, then parse those into the description if possible. ✅ 2025-02-24
- [x] Leave an option/frontmatter to turn on these aspects at will along with other variables or behavior like with the breadcrumb vs full ✅ 2025-02-24
- [x] Give an option to tune the order behavior ✅ 2025-02-24
- [x] Use the status of tasks to also affect the color ✅ 2025-02-24
- [x] Add links to the related task ✅ 2025-02-24

Extra features:
- Points
	- [ ] For tasks which don't have a combination of start OR created + due date, make them points
	- [ ] When a created date or scheduled date is used and no other date or priority, use a point with a purple color, else give the priority
	- [ ] When a started date is used and no other date or priority, use a point with a green color
	- [ ] When a due date is used and no other date or priority, use a point with a red color
	- [ ] For points that are created from tasks, use the green or red respectively when a start or due date is used.  If no start or due date is used, then use the scheduled date or the created date (purple).  If a priority is also specifically given, then use the related priority color instead and prioritize showing that color. To be explicit here, prioritize showing priority colors
- Functioning ChildLaneOption behavior
	- [ ] Groups based on the tags (use the breadcrumb and full as options again w/top-level used for major groups).  This has stopped working properly it seems.
- Creating periods
	- [ ] Use `period` deeper than 2 depths on the tag to make a period instead of assuming the 2nd level is one. If a description is given, then  then instead use a "period" and base the color of the period of the, again, the task priority and/or status.  Done or cancelled could be the only time that green or red are used for instance to show those superseding statuses.
	- [ ] To reiterate, let's say that someone defines a task `[ ] test_title - desc_or_no_desc #roadmap/section/period 🛫 2025-02-27 📅 2025-05-15`.  This means that a period of "test_title" should be created under "section".  However, this means that it has to have a start or created date along with a due date to define the range.  I would rather have this than the less intuitive way I was creating periods before


Later:
- [ ] When a frontmatter property named "marker__COLOR_NAME_HERE: date" is used, make a pointer at that date with that name and color
- [ ] When a frontmatter property named "group_NAME_HERE: date_range" is used, make a group at that range with that name
- [ ] When a frontmatter property named "period_COLOR_NAME_HERE: date_range" is used, make a period at that range with that name and color
- [ ] Give default view dates that define the start and end date such as used in previous code
- [ ] Give an option for how to display quarters as either points at the top or bottom of the timeline or as Markers
- [ ] Be able to take the current year from start and end and auto-generate the quarters and put them in as markers
- [ ] When `roadmap/manual` is given, then allow child list items below that task to act as manual items to be ingested at the bottom of the chronos timeline instantiation
- [ ] When more than one year is given, generate more "quarters"

## TEST ZONE

roadmapTitle:: "Roadmap"
roadmapDateFormat:: "YYYY-MM-DD"
roadmapAxisFormat:: "%b"
roadmapDefaultLane:: "General"
roadmapOverdueSuffix:: " overdue"
roadmapOverdueFlag:: "red"
roadmapStart:: "2025-01-01"
roadmapEnd:: "2025-12-31"
roadmapLinkTasks:: false
showStart:: false            
showDue:: false 
showCreation:: false
dateRangePattern:: "MM/DD" 
showQuarters:: true
topDivider:: "°"
bottomDivider:: "•"
topLevelCrit:: true
childLaneOption:: "full"
>  "breadcrumb" (default) or "full"

quarterDivider:: "[Q#]"

> [!info] Look at [Obsidian Roadmaps](../Obsidian%20Roadmaps.md) for the established tasks

## V1.0

`Use TODO v0 to find items that need added or fixed`

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

const cfg = {
  // Basic timeline settings
  title: dv.current().roadmapTitle || "Timeline",
  defaultLane: dv.current().roadmapDefaultLane || "General",
  groupMode: dv.current().childLaneOption || "breadcrumb",   // "breadcrumb" or "full"

  // Colors & Priority
  overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
  overdueFlag: dv.current().roadmapOverdueFlag || "red",
  priorityColors: {
    Highest: "red",
    High:    "orange",
    Medium:  "blue",
    Low:     "cyan",
    Lowest:  "gray"
  },
  doneColor:      "green",  // color for done tasks
  cancelledColor: "gray",   // or "red" if you prefer

  // Additional toggles
  captureSubtasks: true,    // if true, gather sub-bullets
  treatTwoDeepAsPeriod: true, // if #roadmap/lane/sub-lane (2+ deep) & no desc => use `@` instead of `-` or `*`
  
  //TODO v0 - onlyOneDateAsPoint: true,  // if a task has only a start OR due, treat as a Chronos point

  // Subtasks -> description
  // If true, nested bullet lines under tasks become part of the "description" in Chronos (the text after "|")
  // The script will gather them up into a bullet list or single line
  captureSubtasks: true,   

  // Single-date logic: "point" or "marker" or "period"
  // (In this snippet we default to "point", but you can tweak it.)
  singleDateChar: "*",

  // created-only => purple color
  // started-only => green color
  // due-only => red color
  createdOnlyColor: "purple",
  startedOnlyColor: "green",
  dueOnlyColor:     "red",

  // Linking
  linkTasks: dv.current().roadmapLinkTasks || false, // if true, we add " [[filename]]" to the description

  // Quarter Markers
  showQuarters: dv.current().showQuarters !== false,
  // "top" or "bottom" for whether to put these Q# lines in the code or not 
  // (Chronos doesn't have a built-in concept of top/bottom, but we can place them as markers or points)
  // TODO v0 - quarterStyle: "markers",   // "markers" or "points"
  quarterPlacement: "top", // or "bottom" or "none"

  // DefaultView & ORDERBY
  defaultViewStart: dv.current().roadmapStart || "",
  defaultViewEnd:   dv.current().roadmapEnd   || "",
  orderBy: dv.current().orderBy || "start",  // e.g. "start|content" or "-start|end"

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
function getPriorityFromText(text) {
  for (let emoji in priorityMap) {
    if (text.includes(emoji)) return priorityMap[emoji];
  }
  return "";
}

// Extract #roadmap markers up to 4 levels
function parseRoadmapMarkers(txt) {
  const rx = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
  let m = txt.match(rx);
  let lane = cfg.defaultLane;
  let chain = [];
  if (m) {
    if (m[1]) lane = m[1];
    for (let i = 2; i < m.length; i++) {
      if (m[i]) chain.push(m[i]);
    }
  }
  return { lane, chain };
}

// Function that extracts a sub-bullet list for a given task, if desired.
function gatherSubBullets(task) {
  if (!cfg.captureSubtasks || !task.subtasks) return "";
  // Let's build a bullet list of subtask lines
  // This can be refined to skip completed or do something else
  let arr = [];
  for (let s of task.subtasks) {
    // skip if done or not, your choice
    arr.push(s.text + ". ");
  }
  if (arr.length > 0) {
    return "" + arr.join(". ");
  }
  return "";
}

// A small helper to see if a task is "done" or "cancelled".
function getTaskPluginStatus(task) {
  // typical tasks plugin statuses might be "done", "cancelled", etc.
  if (task.status === "done") return "done";
  if (task.status === "cancelled") return "cancelled";
  return "pending";
}

// For color-coding tasks by status
function getTaskColorForStatus(taskStatus) {
  // "done", "cancelled", "pending" from Tasks plugin
  if (taskStatus === "done") return `#${cfg.doneColor}`;
  if (taskStatus === "cancelled") return `#${cfg.cancelledColor}`;
  return ""; // no color
}

// If a dash " - " is found in the text, split into [title, desc].
function parseTitleDesc(str) {
  let idx = str.indexOf(" - ");
  if (idx < 0) return [str, ""]; 
  let t = str.slice(0, idx).trim();
  let d = str.slice(idx + 3).trim();
  return [t, d];
}

// A helper to convert an Obsidian Task date to an ISO date string for Chronos
function toChronosDate(obsidianDate) {
  // ex: 2025-01-23
  // Chronos supports YYYY, YYYY-MM, etc. We'll just produce YYYY-MM-DD
  return obsidianDate.toString().split("T")[0];
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// 3. COLLECT FRONTMATTER KEYS FOR EXTRA MARKERS/PERIODS/GROUPS
//////////////////////////////////////////////////////////////////////////////////////////

let fm = dv.current();
let lines = [];

// We'll read the frontmatter (or inline) keys. Examples:
// marker__COLOR_NAME: "2025-04-12"  → e.g.  "* [2025-04-12] #green My Marker"
// period_red: "2025-04-12~2025-08-01" 
// group_MyGroup: "2025-01-01~2025-03-01"
// We'll store them as lines to be appended.

for (let k in fm) {
  // skip ones that are obviously not our format
  if (typeof fm[k] !== "string") continue;
  let val = fm[k].trim();  
  if (!val) continue;

  // marker__COLOR approach
  if (k.startsWith("marker__")) {
    let cName = k.slice("marker__".length); // e.g. "green"
    // parse val as date or date range
    // if it has "~", we interpret as date range => not a marker
    // else a single date
    if (val.includes("~")) {
      // If the user used "~", then let's treat it as an event or period
      // but you might want to log an error
      continue;
    }
    // single date => Chronos line
    // e.g. "* [YYYY-MM-DD] #green MarkerTitle"
    let date = val;  
    let colorPart = `#${cName}`;
    let finalLine = `* [${date}] ${colorPart} Marker__${cName}`; 
    lines.push(finalLine);
  }
  // period_color approach
  else if (k.startsWith("period_")) {
    let cName = k.slice("period_".length); // e.g. "red"
    // val should be "YYYY-MM-DD~YYYY-MM-DD" 
    // Chronos periods => `@ [start~end] #color PeriodName` (PeriodName optional)
    if (!val.includes("~")) continue; // skip if not a range
    let colorPart = `#${cName}`;
    let finalLine = `@ [${val}] ${colorPart} Period_${cName}`;
    lines.push(finalLine);
  }
  // group_name => e.g. "2025-01-01~2025-08-31"
  else if (k.startsWith("group_")) {
    let groupName = k.slice("group_".length); 
    // Chronos group => can be an event with {groupName}
    // We'll treat it as an event or period: if "~" => range, else single
    let lineChar = "-"; 
    if (!val.includes("~")) {
      lineChar = "*"; // single date
    }
    let finalLine = `${lineChar} [${val}] {${groupName}} Group_${groupName}`;
    lines.push(finalLine);
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// MAIN CODE -------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////////
// 4. BUILD A LIST OF Chronos LINES FROM RELEVANT TASKS
//////////////////////////////////////////////////////////////////////////////////////////

// Query tasks (#roadmap or #timeline or anything you want):
const tasks = dv.pages("")
  .file.tasks
  .where(t => 
    (t.text.includes("#roadmap") || t.text.includes("#timeline")) 
    /*&& !t.completed*/
  );

//////////////////////////////////////
// Process each task => Chronos items
//////////////////////////////////////

// For each task, build a Chronos line
for (let task of tasks) {
  // We'll gather up the possible date fields
  // We rely on Obsidian Task plugin or the user populating these fields
  // https://publish.obsidian.md/tasks/Scripting/Task+Properties
  // 
  let created = task.created;
  let start = task.start;
  let due = task.due;
  let cancelled = task.cancelled;
  let done = task.done;
  let happens = task.happens;
  let scheduled = task.scheduled;
  

  // Convert them to strings for Chronos
  let cDate = created ? toChronosDate(created) : "";
  let sDate = start ? toChronosDate(start) : "";
  let dDate = due ? toChronosDate(due) : "";

  // We parse the text for lane & childChain
  let { lane, chain } = parseRoadmapMarkers(task.text);

  // We'll remove the hashtags, emojis, inline dates, etc. from the text to get a baseTitle
  let cleaned = task.text
    .replace(/#[\w\/-]+/g, "")
    .replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "")
    .replace(/\d{4}-\d{2}-\d{2}/g, "")
    .trim();

  // Attempt "Title - Description"
  let [title, desc] = parseTitleDesc(cleaned);

  // If capturing subtasks, append
  if (cfg.captureSubtasks && task.subtasks) {
    let subdesc = gatherSubBullets(task);
    if (subdesc) {
      desc = desc ? (desc + "\n" + subdesc) : subdesc;
    }
  }

  // TODO - make linking syntax better
  // [blacksmithgu.github.io > Metadata on Tasks and Lists - Dataview](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/)
  // If we also want to link to the note the task is in:
  if (cfg.linkTasks) {
    let noteName = task.path ? task.path.split("/").pop() : "";
    let link = task.link;
    // or use task.file.name
    if (noteName) {
      desc += desc ? ` | [[${link}]]` : `[[${link}]]`;
    }
  }

  // If "breadcrumb" => append chain to title
  // If "full" => incorporate child chain into lane
  if (cfg.breadcrumbOrFull === "full" && chain.length > 0) {
    lane = lane + "/" + chain.join("/");
  } else if (cfg.breadcrumbOrFull === "breadcrumb" && chain.length > 0) {
    title += ` (${chain.join("/")})`;
  }

  // Figure out priority from emojis
  let prio = getPriorityFromText(task.text);

  // Check status (done, cancelled, pending)
  let taskStatus = getTaskPluginStatus(task); // 'done','cancelled','pending'
  
  // Determine color from status or priority
  let color = "";
  if (taskStatus === "done") {
    color = "#" + cfg.doneColor;
  } else if (taskStatus === "cancelled") {
    color = "#" + cfg.cancelledColor;
  } else {
    // not done or cancelled => check priority
    if (prio && cfg.priorityColors[prio]) {
      color = "#" + cfg.priorityColors[prio];
    }
  }

  // If the task is overdue: if due < today => append suffix to title
  if (dDate && (new Date(dDate) < new Date()) && taskStatus==="pending") {
    title += cfg.overdueSuffix;
    color = "#" + cfg.overdueFlag; 
  }

  // Now let's figure out which date(s) to use for Chronos. 
  // We prefer start + due if both exist
  // If only one date, we do a single date. Then if it's "start" only => color green, if "due" only => color red
  // If no start/due, but we have creation => point with purple color.
  // etc.

  let lineChar = "-"; // default event
  let dateSyntax = ""; // e.g. [start~end] or [start]

  let hasStart = !!sDate;
  let hasDue   = !!dDate;
  let hasCreate= !!cDate;

  if (hasStart && hasDue) {
    if (sDate === dDate) {
      // same day => single date, so we do e.g. "* [2025-03-05]"
      lineChar = "-"; // or "*"
      dateSyntax = `[${sDate}]`;
    } else {
      // a true range
      dateSyntax = `[${sDate}~${dDate}]`;
      lineChar = "-"; 
    }
  }
  else if (hasStart && !hasDue) {
    // only start => single date
    lineChar = cfg.singleDateChar; // default "*"
    color = color || `#${cfg.startedOnlyColor}`; 
    dateSyntax = `[${sDate}]`;
  }
  else if (!hasStart && hasDue) {
    // only due => single date
    lineChar = cfg.singleDateChar;
    color = color || `#${cfg.dueOnlyColor}`;
    dateSyntax = `[${dDate}]`;
  }
  else {
    // no start or due => see if creation date is available
    if (hasCreate) {
      lineChar = cfg.singleDateChar;
      color = color || `#${cfg.createdOnlyColor}`;
      dateSyntax = `[${cDate}]`;
    } else {
      // fallback
      // no dates at all => skip or create a marker with "no date"?
      continue;
    }
  }

  // Possibly treat 2 levels down as a period if no desc 
  // (#roadmap/dfir/blah => chain has length >=2). 
  // If there's no desc, we can do a period with color from prio or status
  if (cfg.treatTwoDeepAsPeriod && chain.length == 1 && !desc) {
    lineChar = "@"; 
  }

  // Build final Chronos line
  // e.g. - [start~end] #red {lane} Title | desc
  let groupPart = lane ? `{${lane}}` : "";
  let colorPart = color ? color : "";
  let label = desc ? `${title} | ${desc}` : title;

  let lineSegs = [];
  lineSegs.push(`${lineChar} ${dateSyntax}`);
  if (colorPart) lineSegs.push(colorPart);
  if (groupPart) lineSegs.push(groupPart);
  lineSegs.push(label);

  lines.push(lineSegs.join(" "));
}

//////////////////////////////////////////////////////////////////////////////////////////
// 5. BUILD THE CODE BLOCK TEXT
//////////////////////////////////////////////////////////////////////////////////////////

let chronosLines = [];
chronosLines.push("```chronos");

// Insert top flags: e.g. > DEFAULTVIEW and > ORDERBY
if (cfg.defaultViewStart && cfg.defaultViewEnd) {
  chronosLines.push(`> DEFAULTVIEW ${cfg.defaultViewStart}|${cfg.defaultViewEnd}`);
}
chronosLines.push(`> ORDERBY ${cfg.orderBy}`);

chronosLines.push(`# ${cfg.title}`); // just a comment line for readability if you want

// Optionally insert Q1–Q4 markers or points
if (cfg.showQuarters && cfg.defaultViewStart && cfg.defaultViewEnd) {
  let startYr = Number(moment(cfg.defaultViewStart, cfg.dateFormat).format("YYYY"));
  let endYr   = Number(moment(cfg.defaultViewEnd, cfg.dateFormat).format("YYYY"));
  console.log(`${startYr} AND ${endYr}`)
  if (startYr === endYr) {
    // compute Q1..Q4
    let y = startYr;
    let q1 = moment(cfg.defaultViewStart, cfg.dateFormat).month(0).format("YYYY-MM-DD");
    let q2 = moment(cfg.defaultViewStart, cfg.dateFormat).month(2).endOf("month").format("YYYY-MM-DD");
    let q3 = moment(cfg.defaultViewStart, cfg.dateFormat).month(5).endOf("month").format("YYYY-MM-DD");
    let q4 = moment(cfg.defaultViewStart, cfg.dateFormat).month(8).endOf("month").format("YYYY-MM-DD");
    // if user wants them at the top, we push them now
    if (cfg.quarterPlacement === "top") {
      // Markers: e.g. "= [2025-03-31] Q1"
      chronosLines.push(`= [${q1}] Q1`);
      chronosLines.push(`= [${q2}] Q2`);
      chronosLines.push(`= [${q3}] Q3`);
      chronosLines.push(`= [${q4}] Q4`);
    }
    // if user wants them at "bottom", we can store them until the end. 
    // For brevity, we just do "top" here. 
  }
}

// Finally, add our lines from tasks + frontmatter
for (let L of lines) {
  chronosLines.push(L);
}

// If the user wants Q1–Q4 at the bottom, we’d do it here if (cfg.quarterPlacement === "bottom").

chronosLines.push("```");

const chronosContent = chronosLines.join("\n")
console.log(chronosContent);

const out = chronosLines.join("\n");
dv.paragraph(out);
```

## V0.1

```js
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
    return "" + lines.join(". ");
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

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// MAIN CODE -------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// Query tasks (#roadmap or #ganttchart or anything you want):
const tasks = dv.pages("")
  .file.tasks
  .where(t => 
    (t.text.includes("#roadmap") || t.text.includes("#timeline")) 
    && !t.completed
  );

// We'll store lines in a big array, then  join them at the end
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
  // Remove common marker emojis.
  itemTitle = itemTitle.replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "");
  // Remove inline dates (YYYY-MM-DD).
  itemTitle = itemTitle.replace(/\d{4}-\d{2}-\d{2}/g, "");

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
    lane = lane + "/" + childChain.join(" > ");
  } 
  // else if breadcrumb, we do nothing special to lane, but we add childChain to the itemTitle
  else if (config.groupMode === "breadcrumb" && childChain.length > 0) {
    itemTitle += ` (${childChain.join(" > ")})`;
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
	 console.log(`${showQuarters} - ${ganttStart} - ${ganttEnd}`)
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
    lines.unshift(`= [${q4}] Q4`);
    lines.unshift(`= [${q3}] Q3`);
    lines.unshift(`= [${q2}] Q2`);
    lines.unshift(`= [${q1}] Q1`);
  }
}

// Now let's push all lines
chronosLines.push(...lines);

// Done. Close code block
chronosLines.push("```");

const chronosContent = chronosLines.join("\n")

console.log(chronosContent);

dv.paragraph(chronosContent);
```
