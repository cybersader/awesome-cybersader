---
aliases: []
tags: []
publish: true
permalink:
date created: Sunday, February 23rd 2025, 3:51 pm
date modified: Monday, February 24th 2025, 7:31 pm
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
	- [x] For tasks which don't have a combination of start OR created + due date, make them points ✅ 2025-02-24
	- [x] When a created date or scheduled date is used and no other date or priority, use a point with a purple color, else give the priority ✅ 2025-02-24
	- [x] When a started date is used and no other date or priority, use a point with a green color ✅ 2025-02-24
	- [x] When a due date is used and no other date or priority, use a point with a red color ✅ 2025-02-24
	- [x] For points that are created from tasks, use the green or red respectively when a start or due date is used.  If no start or due date is used, then use the scheduled date or the created date (purple).  If a priority is also specifically given, then use the related priority color instead and prioritize showing that color. To be explicit here, prioritize showing priority colors ✅ 2025-02-24
- Functioning ChildLaneOption behavior
	- [x] Groups based on the tags (use the breadcrumb and full as options again w/top-level used for major groups).  This has stopped working properly it seems. ✅ 2025-02-24
- Creating periods
	- [ ] Use `period` deeper than 2 depths on the tag to make a period instead of assuming the 2nd level is one. If a description is given, then  then instead use a "period" and base the color of the period of the, again, the task priority and/or status.  Done or cancelled could be the only time that green or red are used for instance to show those superseding statuses.
	- [ ] To reiterate, let's say that someone defines a task `[ ] test_title - desc_or_no_desc \#roadmap/section/period 🛫 2025-02-27 📅 2025-05-15`.  This means that a period of "test_title" should be created under "section".  However, this means that it has to have a start or created date along with a due date to define the range.  I would rather have this than the less intuitive way I was creating periods before
	- [ ] Moreover, if I create a period at a 2nd level and the "full" option is being used for child lanes, then that period needs to be duplicated for each of those generated child sections below it

Later:
- [ ] When a frontmatter property named "marker__COLOR_NAME_HERE: date" is used, make a pointer at that date with that name and color
- [ ] When a frontmatter property named "group_NAME_HERE: date_range" is used, make a group at that range with that name
- [ ] When a frontmatter property named "period_COLOR_NAME_HERE: date_range" is used, make a period at that range with that name and color
- [ ] Give default view dates that define the start and end date such as used in previous code
- [ ] Give an option for how to display quarters as either points at the top or bottom of the timeline or as Markers
- [ ] Be able to take the current year from start and end and auto-generate the quarters and put them in as markers
- [ ] When `roadmap/manual` is given, then allow child list items below that task to act as manual items to be ingested at the bottom of the chronos timeline instantiation
- [ ] When more than one year is given, generate more "quarters"
- [ ] Take broken dates and put them in a custom section to help find broken tasks

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
showQuarters:: true
childLaneOption:: "full"
>  "breadcrumb" (default) or "full"

quarterDivider:: "[Q#]"

> [!info] Look at [Obsidian Roadmaps](../Obsidian%20Roadmaps.md) for the established tasks

## V1.0

`Use TODO v0 to find items that need added or fixed`
W
```js
//////////////////////////////////////////////////////////////////////////////////////////
// 1. CONFIGURATION PULLED FROM FRONTMATTER OR INLINE FIELDS
//////////////////////////////////////////////////////////////////////////////////////////

const cfg = {
    // Basic timeline settings
    title: dv.current().roadmapTitle || "Roadmap",
    defaultLane: dv.current().roadmapDefaultLane || "General",

    // "breadcrumb" => append nested path (except 'period') to the item label
    // "full" => skip 'period' but incorporate the rest into the group name
    childLaneOption: dv.current().roadmapChildLaneOption || "breadcrumb",

    // Colors & Priority
    overdueSuffix: dv.current().roadmapOverdueSuffix || " overdue",
    overdueFlag: dv.current().roadmapOverdueFlag || "red",
    priorityColors: {
        Highest: "red",
        High: "orange",
        Medium: "blue",
        Low: "cyan",
        Lowest: "gray"
    },
    doneColor: "green", // color for done tasks
    cancelledColor: "red", // color for cancelled tasks

    // Subtasks -> description
    captureSubtasks: true,

    // Single-date => `*`
    singleDateChar: "*",

    // Single-date color defaults
    givePointsColor: dv.current().roadmapPointHasColor !== false,
    createdOnlyColor: "purple",
    startedOnlyColor: "green",
    dueOnlyColor: "red",

    // Link tasks to their notes
    linkTasks: dv.current().roadmapLinkTasks || false,

    // Quarter Markers
    showQuarters: dv.current().roadmapShowQuarters !== false,
    quarterPlacement: "top", // or "bottom" or "none"

    // Date Range for Chronos defaultView
    defaultViewStart: dv.current().roadmapStart || "",
    defaultViewEnd: dv.current().roadmapEnd || "",

    // Ordering in Chronos
    orderBy: dv.current().orderBy || "start",
};

//////////////////////////////////////////////////////////////////////////////////////////
// 2. HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////

// Priority from emojis
const emojiPriorityMap = {
    "🔺": "Highest",
    "⏫": "High",
    "🔼": "High",
    "⏺️": "Medium",
    "🔽": "Low",
    "⏬": "Lowest"
};

function getPriorityFromText(text) {
    for (let e in emojiPriorityMap) {
        if (text.includes(e)) return emojiPriorityMap[e];
    }
    return "";
}

// Parse #roadmap markers
// e.g. #roadmap/one/period/two => lane="one", chain=["period","two"]
function parseRoadmapMarkers(txt) {
    const rx = /#roadmap(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?(?:\/([\w-]+))?/;
    let m = txt.match(rx);
    let rootLane = cfg.defaultLane;
    let rest = [];
    if (m) {
        if (m[1]) rootLane = m[1];
        for (let i = 2; i < m.length; i++) {
            if (m[i]) rest.push(m[i]);
        }
    }
    return {
        rootLane,
        rest
    };
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

// Split "title - desc" into [title, desc]
function parseTitleDesc(str) {
    let idx = str.indexOf(" - ");
    if (idx < 0) return [str.trim(), ""];
    let t = str.slice(0, idx).trim();
    let d = str.slice(idx + 3).trim();
    return [t, d];
}

// Color from done/cancelled tasks
function getStatusColor(task) {
    if (task.status === "done") return `#${cfg.doneColor}`;
    if (task.status === "cancelled") return `#${cfg.cancelledColor}`;
    return "";
}

// Convert date object to Chronos-friendly YYYY-MM-DD
function toChronosDate(dObj) {
    return dObj.toString().split("T")[0];
}

/**
 * Build the final Chronos line from parameters
 * @param {string} lineChar  e.g. '-', '*', '@'
 * @param {string} dateSyntax e.g. '[2025-01-01~2025-02-01]' or '[2025-01-10]'
 * @param {string} colorPart e.g. '#red'
 * @param {string} lane e.g. '{someLane}'
 * @param {string} label e.g. 'Title | Desc'
 */
function makeChronosLine(lineChar, dateSyntax, colorPart, lane, label) {
    let segs = [];
    segs.push(`${lineChar} ${dateSyntax}`);
    if (colorPart) segs.push(colorPart);
    if (lane) segs.push(`{${lane}}`);
    segs.push(label);
    return segs.join(" ");
}

function collectAllFullLanes(tasks) {
  let dict = {};
  for (let t of tasks) {
    // parse
    const { rootLane, rest } = parseRoadmapMarkers(t.text);
    if (!rootLane) continue;

    // >>> Filter out 'period' from rest to avoid unwanted lanes like "root/period"
    let filteredRest = rest.filter(seg => seg !== "period");

    // build expansions from rootLane + filteredRest
    let expansions = [];
    let current = rootLane;
    expansions.push(current);

    for (let i = 0; i < filteredRest.length; i++) {
      current += "/" + filteredRest[i];
      expansions.push(current);
    }

    if (!dict[rootLane]) dict[rootLane] = new Set();
    expansions.forEach(e => dict[rootLane].add(e));
  }

  // convert sets to arrays
  for (let k in dict) {
    dict[k] = Array.from(dict[k]);
  }
  return dict;
}

//////////////////////////////////////////////////////////////////////////////////////////
// 3. MAIN CODE
//////////////////////////////////////////////////////////////////////////////////////////

let lines = [];

// 3.1. Query tasks that contain #roadmap
const tasks = dv.pages("").file.tasks
    .where(t => t.text.includes("#roadmap"));

// 3.1.1 Gather all sub-lanes for root => expansions
const allFullLanes = collectAllFullLanes(tasks);

for (let task of tasks) {
    // Potential date fields
    let created = task.created;
    let scheduled = task.scheduled;
    let start = task.start;
    let due = task.due;

    let cDate = created ? toChronosDate(created) : "";
    let sDate = start ? toChronosDate(start) : "";
    let dDate = due ? toChronosDate(due) : "";
    let schDate = scheduled ? toChronosDate(scheduled) : "";

    // Identify lane + chain
    let {
        rootLane,
        rest
    } = parseRoadmapMarkers(task.text);

    // Clean text for base title
    let cleaned = task.text
        .replace(/#[\w\/-]+/g, "")
        .replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "")
        .replace(/\d{4}-\d{2}-\d{2}/g, "")
        .trim();
    let [title, desc] = parseTitleDesc(cleaned);

    // Subtasks
    if (cfg.captureSubtasks && task.subtasks) {
        let sb = gatherSubBullets(task);
        if (sb) desc += (desc ? "\n" + sb : sb);
    }

    // Linking
    if (cfg.linkTasks && task.link) {
        desc += desc ? `\n[[${task.link}]]` : `[[${task.link}]]`;
    }

    // Decide final lane name and title modifications based on childLaneOption
    // If rest has 'period' we might skip it from the lane or treat differently
    let isPeriodTask = false;
    let laneName = rootLane;

    // Check if the second element is 'period'
    // e.g. rest = ["period"] or ["period","someOther"...]
    // if rest[0] === 'period', we want a period for any range
    // and we skip 'period' from lane building
    if (rest.length > 0 && rest[0] === "period") {
        isPeriodTask = true;
        // So we skip rest[0] => 'period' from the group name
        rest.shift();
    }

    if (cfg.childLaneOption === "full" && rest.length > 0) {
        laneName = rootLane + "/" + rest.join("/");
    } else if (cfg.childLaneOption === "breadcrumb" && rest.length > 0) {
        // Append them to the title (except 'period' which we already shifted out)
        title += ` (${rest.join("/")})`;
    }

    // Priority & status color
    let prio = getPriorityFromText(task.text);
    let color = getStatusColor(task); // done/cancelled => override
    if (!color && prio && cfg.priorityColors[prio]) {
        color = `#${cfg.priorityColors[prio]}`;
    }

    // Overdue?
    let isOverdue = false;
    if (dDate && task.status === "pending") {
        isOverdue = new Date(dDate) < new Date();
    }
    if (isOverdue) {
        color = `#${cfg.overdueFlag}`;
        title += cfg.overdueSuffix;
    }

    // Determine leftSide & rightSide for a range
    let leftSide = "";
    let rightSide = "";
    // prefer start => left, else created or scheduled
    if (sDate) leftSide = sDate;
    else if (cDate) leftSide = cDate;
    else if (schDate) leftSide = schDate;

    if (dDate) rightSide = dDate;

    // Are we a range or a single date?
    let hasRange = (leftSide && rightSide && leftSide !== rightSide);

    let lineChar = "-";
    let dateSyntax = "";
	if (isPeriodTask && cfg.childLaneOption === "full") {
	    if (hasRange) {
	        // We have dateSyntax = `[leftSide~rightSide]`
	        // and isPeriodTask indicates #roadmap/.../period
	        dateSyntax = `[${leftSide}~${rightSide}]`;
	
	        if (isPeriodTask && cfg.childLaneOption === "full") {
			  // Instead of only building expansions from root+rest,
			  // we look up all known expansions for this root in `allFullLanes[rootLane]`.
			  // Then produce a line for each if we have a valid date range (hasRange).
			  if (hasRange) {
			    let sublanes = allFullLanes[rootLane] || [];
			    // We have a dateSyntax = `[${leftSide}~${rightSide}]`
			    let lbl = desc ? `${title} | ${desc}` : title;
			    sublanes.forEach(l => {
			      // For each sub-lane under rootLane, produce a period line
			      let line = makeChronosLine("@", `[${leftSide}~${rightSide}]`, color, l, lbl);
			      lines.push(line);
			    });
			    continue; // skip normal single-lane push
			  } 
			  else {
			    // It's a "period" marker, but only a single date => just do normal single-line approach
			    // e.g. * [someDate]
			    // or skip if you prefer
			  }
			}
	    } else {
	        // single date => point
	        let singleDate = leftSide || rightSide;
	        if (!singleDate) {
	            // no date => skip
	            continue;
	        }
	        lineChar = cfg.singleDateChar; // default '*'
	        dateSyntax = `[${singleDate}]`;
	
	        // If givePointsColor => color a single date
	        if (cfg.givePointsColor && !color) {
	            // only start => green, only due => red, only created/sched => purple
	            let usedCount = [sDate, dDate, cDate, schDate].filter(x => x).length;
	            if (usedCount === 1) {
	                // figure out which one
	                if (sDate) color = `#${cfg.startedOnlyColor}`;
	                else if (dDate) color = `#${cfg.dueOnlyColor}`;
	                else color = `#${cfg.createdOnlyColor}`; // cDate or schDate
	            }
	        }
	    }
	} else {
		// Normal single-lane approach
		let lineChar = isPeriodTask ? "@" : "-";
		
		if (hasRange) {
		  dateSyntax = `[${leftSide}~${rightSide}]`;
		
		  // If it's a period task:
		  if (isPeriodTask) {
		    // If FULL => replicate expansions for each sub-lane
		    if (cfg.childLaneOption === "full") {
		      let sublanes = allFullLanes[rootLane] || [];
		      let lbl = desc ? `${title} | ${desc}` : title;
		      sublanes.forEach(l => {
		        let line = makeChronosLine("@", dateSyntax, color, l, lbl);
		        lines.push(line);
		      });
		      continue; // skip single-lane
		    }
		    else {
		      // BREADCRUMB mode => single period line
		      lineChar = "@";
		    }
		  } else {
		    lineChar = "-";
		  }
		
		  let lbl = desc ? `${title} | ${desc}` : title;
		  let finalLine = makeChronosLine(lineChar, dateSyntax, color, laneName, lbl);
		  lines.push(finalLine);
		  continue;
		} else {
	        // single date => point
	        let singleDate = leftSide || rightSide;
	        if (!singleDate) {
	            // no date => skip
	            continue;
	        }
	        lineChar = cfg.singleDateChar; // default '*'
	        dateSyntax = `[${singleDate}]`;
	
	        // If givePointsColor => color a single date
	        if (cfg.givePointsColor && !color) {
	            // only start => green, only due => red, only created/sched => purple
	            let usedCount = [sDate, dDate, cDate, schDate].filter(x => x).length;
	            if (usedCount === 1) {
	                // figure out which one
	                if (sDate) color = `#${cfg.startedOnlyColor}`;
	                else if (dDate) color = `#${cfg.dueOnlyColor}`;
	                else color = `#${cfg.createdOnlyColor}`; // cDate or schDate
	            }
	        }
	    }
	}

    // Build final label
    let lbl = desc ? `${title} | ${desc}` : title;
    let finalLine = makeChronosLine(lineChar, dateSyntax, color, laneName, lbl);

    lines.push(finalLine);
}

// 3.2. Build the Chronos code block
let out = [];
out.push("```chronos");
// DefaultView
if (cfg.defaultViewStart && cfg.defaultViewEnd) {
    out.push(`> DEFAULTVIEW ${cfg.defaultViewStart}|${cfg.defaultViewEnd}`);
}
// ORDERBY
out.push(`> ORDERBY ${cfg.orderBy}`);

out.push(`# ${cfg.title}`);

// Insert Q1..Q4 if showQuarters
if (cfg.showQuarters && cfg.defaultViewStart && cfg.defaultViewEnd) {
    let sy = Number(moment(cfg.defaultViewStart).format("YYYY"));
    let ey = Number(moment(cfg.defaultViewEnd).format("YYYY"));
    if (sy === ey) {
        let q1 = moment(cfg.defaultViewStart).month(0).format("YYYY-MM-DD");
        let q2 = moment(cfg.defaultViewStart).month(2).endOf("month").format("YYYY-MM-DD");
        let q3 = moment(cfg.defaultViewStart).month(5).endOf("month").format("YYYY-MM-DD");
        let q4 = moment(cfg.defaultViewStart).month(8).endOf("month").format("YYYY-MM-DD");
        if (cfg.quarterPlacement === "top") {
            out.push(`= [${q1}] Q1`);
            out.push(`= [${q2}] Q2`);
            out.push(`= [${q3}] Q3`);
            out.push(`= [${q4}] Q4`);
        }
    }
}

for (let ln of lines) {
    out.push(ln);
}

out.push("```");

console.log(`${out.join("\n")}`)

dv.paragraph(out.join("\n"));
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
