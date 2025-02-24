---
aliases: []
tags: []
publish: true
permalink:
date created: Sunday, February 23rd 2025, 3:51 pm
date modified: Monday, February 24th 2025, 10:57 am
---

# Chronos Timeline (Community Plugin)

- [github.com > clairefro/obsidian-plugin-chronos: Render interactive timelines in your Obsidian notes from simple Markdown.](https://github.com/clairefro/obsidian-plugin-chronos?tab=readme-ov-file)
- [github.com > clairefro/obsidian-plugin-chronos > Table of Contents](https://github.com/clairefro/obsidian-plugin-chronos?tab=readme-ov-file#contents)
- 

# Chronos + Dataview + Tasks

Okay.  That all works pretty well now.  However, I've found another community plugin that has a very nice system that I would like integrate this sort of system into.  I'll show you my dataview + mermaid gantt workflow for some inspiration.  However, TO BE CLEAR, this does NOT use mermaid or gantt anymore.  This is a Chronos timeline based approach that I'm now taking

Here's the things I need to implement with the new Chronos plugin:
- Parse the tasks date into the format that Chronos uses
- Colors based on priority 
- Groups based on the tags (use the breadcrumb and full as options again w/top-level used for major groups)
- Use a dash in the task title to break the event up into title and description.  If there's nested bullet points under the task, then parse those into the description if possible.  
- Leave an option/frontmatter to turn on these aspects at will along with other variables or behavior like with the breadcrumb vs full
- Give an option for how to display quarters as either points at the top or bottom of the timeline or as Markers
- Give an option to tune the order behavior
- Give default view dates that define the start and end date such as used in previous code
- Use the status of tasks to also affect the color
- For tasks which only have a start or due date, make them points
- Below the group level tasks like `\#roadmap/dfir`, if a description is not given, then instead use a "period" and base the color of the period of the, again, the task priority and/or status.  Done or cancelled could be the only time that green or red are used for instance to show those superseding statuses

Extra features:
- When a created date is used and no other date, use a point with a purple color
- When a started date is used and no other date, use a point with a green color
- When a due date is used and no other date, use a point with a red color
- When a frontmatter property named "marker__COLOR_NAME_HERE: date" is used, make a pointer at that date with that name and color
- When a frontmatter property named "group_NAME_HERE: date_range" is used, make a group at that range with that name
- When a frontmatter property named "period_COLOR_NAME_HERE: date_range" is used, make a period at that range with that name and color
- Be able to take the current year from start and end and auto-generate the quarters and put them in as markers
- Add links to the related task

## TEST ZONE

roadmapTitle:: "Roadmap"
roadmapDateFormat:: "YYYY-MM-DD"
roadmapAxisFormat:: "%b"
roadmapDefaultLane:: "General"
roadmapOverdueSuffix:: " overdue"
roadmapOverdueFlag:: "red"
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

> [!info] Look at [Obsidian Roadmaps](../Obsidian%20Roadmaps.md) for the established tasks

## V0.1

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
