---
aliases: []
tags: [initiatives/cyberbase]
publish: true
permalink: 
date created: Friday, February 21st 2025, 4:03 pm
date modified: Monday, February 24th 2025, 6:33 pm
---

%% Begin Waypoint %%
- **[[Dataview & Mermaid Roadmaps]]**
- **[[Dataview and Chronos Roadmap]]**

%% End Waypoint %%

- [forum.obsidian.md > How to style GANTT chart (mermaid)? - Help - Obsidian Forum](https://forum.obsidian.md/t/how-to-style-gantt-chart-mermaid/47883/5)
- [forum.obsidian.md > Resize and align mermaid diagrams - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/resize-and-align-mermaid-diagrams/7019)
- [forum.obsidian.md > Gantt charts are way too small to be readable - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/gantt-charts-are-way-too-small-to-be-readable/7017)
- 

# FAKE TASKS

- [ ] IR #roadmap 🚩 🔺 ➕ 2025-02-21 🛫 2025-04-25 📅 2025-06-05
	- IR stuff
- [ ] Test time #roadmap/dfir 🛫 2025-04-15 📅 2025-09-15
- [ ] yrdy 3 #roadmap/dfir/child 🛫 2025-02-27 📅 2025-05-15
- [ ] test_deep - desc #roadmap/dfir/child/deeper ➕ 2025-05-15 
- [ ] test #roadmap/secops/vulnmgmt 🛫 2025-09-16 📅 2025-11-12
- [ ] Title - desc ⏳ 2025-02-19
- [ ] Title 2 - desc 🛫 2025-02-26
- [ ] test_period #roadmap/secops/period 🛫 2025-03-02 📅 2025-03-28

# TEST

- 

# TESTING

roadmapTitle:: "Roadmap"
roadmapDateFormat:: "YYYY-MM-DD"
roadmapDefaultLane:: "General"
roadmapStart:: "2025-01-01"
roadmapEnd:: "2025-12-31"
roadmapLinkTasks:: false
roadmapPointHasColor:: true
roadmapShowQuarters:: true
roadmapChildLaneOption:: "breadcrumb"
>  "breadcrumb" (default) or "full"


```dataviewjs
/****************************************************************************************
 * Chronos Timeline Generator - Refactored
 *
 * Key Changes:
 *  1. Single-date tasks => points (default `*`).
 *     - If only "start" => green color (unless priority overrides).
 *     - If only "due" => red color (unless priority overrides).
 *     - If only "created"/"scheduled" => purple color (unless priority overrides).
 *  2. If childLaneOption is "breadcrumb", append sub-markers to the item’s title. 
 *     If "full", incorporate them into the Chronos group name.
 *  3. If the roadmap marker is 3+ levels deep (#roadmap/one/two/three => chain.length >=2),
 *     and we have a valid range => we create a `@ period`.
 *  4. Quarter markers inserted if showQuarters => true, placed at top by default.
 ****************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////
// 1. CONFIGURATION PULLED FROM FRONTMATTER OR INLINE FIELDS
//////////////////////////////////////////////////////////////////////////////////////////

const cfg = {
  // Basic timeline settings
  title: dv.current().roadmapTitle || "Timeline",
  defaultLane: dv.current().roadmapDefaultLane || "General",

  // "breadcrumb" => append nested path to the item label
  // "full" => group name includes the full path
  childLaneOption: dv.current().roadmapChildLaneOption || "breadcrumb",

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
  cancelledColor: "gray",   // color for cancelled tasks

  // Subtasks -> description
  captureSubtasks: true,

  // single-date char
  singleDateChar: "*",

  // Single-date color defaults
  givePointsColor: dv.current().roadmapPointHasColor !== false,
  createdOnlyColor: "purple",
  startedOnlyColor: "green",
  dueOnlyColor:     "red",

  // If linkTasks is true, we insert a link to the note containing that task
  linkTasks: dv.current().roadmapLinkTasks || false,

  // Quarter Markers
  showQuarters: dv.current().roadmapShowQuarters !== false,
  quarterPlacement: "top", // or "bottom" or "none"

  // Date Range for Chronos defaultView
  defaultViewStart: dv.current().roadmapStart || "",
  defaultViewEnd:   dv.current().roadmapEnd   || "",

  // Ordering
  orderBy: dv.current().orderBy || "start",  // e.g. "start|content" or "-start|end"
};


// Priority mapping from emojis
const emojiPriorityMap = {
  "🔺": "Highest",
  "⏫": "High",
  "🔼": "High",
  "⏺️": "Medium",
  "🔽": "Low",
  "⏬": "Lowest"
};

// Extract priority from text by scanning for known emojis
function getPriorityFromText(text) {
  for (let e in emojiPriorityMap) {
    if (text.includes(e)) return emojiPriorityMap[e];
  }
  return "";
}

// Parse #roadmap markers up to 4 levels
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

// Convert a dash " - " into [title,desc]
function parseTitleDesc(str) {
  let idx = str.indexOf(" - ");
  if (idx < 0) return [str.trim(), ""];
  let t = str.slice(0, idx).trim();
  let d = str.slice(idx + 3).trim();
  return [t, d];
}

// Basic function for coloring tasks by done/cancelled
function getStatusColor(task) {
  if (task.status === "done") return `#${cfg.doneColor}`;
  if (task.status === "cancelled") return `#${cfg.cancelledColor}`;
  return ""; // no color for pending
}

// Convert Obsidian Task date to Chronos YYYY-MM-DD
function toChronosDate(dateObj) {
  return dateObj.toString().split("T")[0];
}


//////////////////////////////////////////////////////////////////////////////////////////
// 2. MAIN SCRIPT
//////////////////////////////////////////////////////////////////////////////////////////

let lines = [];

// 2.1. Query all tasks that have #roadmap
const tasks = dv.pages("").file.tasks
  .where(t => t.text.includes("#roadmap"));

for (let task of tasks) {
  // We'll gather potential date fields:
  let created   = task.created;
  let scheduled = task.scheduled;
  let start     = task.start;
  let due       = task.due;

  // Convert them to strings
  let cDate = created   ? toChronosDate(created)   : "";
  let sDate = start     ? toChronosDate(start)     : "";
  let dDate = due       ? toChronosDate(due)       : "";
  let schDate= scheduled? toChronosDate(scheduled) : "";

  // Parse #roadmap markers
  let { lane, chain } = parseRoadmapMarkers(task.text);

  // Clean text for the base title
  let cleaned = task.text
    .replace(/#[\w\/-]+/g, "")
    .replace(/[🚩🔺⏫⏺️🔽⏬➕🛫📅]/g, "")
    .replace(/\d{4}-\d{2}-\d{2}/g, "")
    .trim();
  // "Title - desc" => separate
  let [title, desc] = parseTitleDesc(cleaned);

  // Subtasks in desc
  if (cfg.captureSubtasks && task.subtasks) {
    let subs = gatherSubBullets(task);
    if (subs) desc += (desc ? "\n" : "") + subs;
  }

  // If we want a note link
  if (cfg.linkTasks) {
    let noteName = task.link; 
    if (noteName) {
      desc += desc ? `\n[[${noteName}]]` : `[[${noteName}]]`;
    }
  }

  // If childLaneOption is "breadcrumb", append chain to title
  // If "full", incorporate them into the lane name
  if (cfg.childLaneOption === "full" && chain.length > 0) {
    lane = lane + "/" + chain.join("/");
  } else if (cfg.childLaneOption === "breadcrumb" && chain.length > 0) {
    title += ` (${chain.join("/")})`;
  }

  // Priority from emojis
  let prio = getPriorityFromText(task.text);

  // Overdue check
  let isOverdue = false;
  if (dDate) {
    isOverdue = (new Date(dDate) < new Date() && task.status === "pending");
  }

  // Status color from done/cancelled
  let color = getStatusColor(task); // if done => green, cancelled => grey
  // If not done/cancelled => check priority color
  if (!color && prio && cfg.priorityColors[prio]) {
    color = `#${cfg.priorityColors[prio]}`;
  }

  // If overdue => color = overdueFlag, suffix on title
  if (isOverdue) {
    color = `#${cfg.overdueFlag}`;
    title += cfg.overdueSuffix;
  }

  /************************************************************************
   * 2.2. Determine if it's a single date or a date range => 
   *     * [date]  or  - [start~end]
   *     Possibly a "period" if chain≥2 and we have a range
   ************************************************************************/
  let hasStart  = !!sDate;
  let hasDue    = !!dDate;
  let hasCreate = !!cDate;
  let hasSched  = !!schDate;

  let lineChar  = "-"; 
  let dateStr   = "";

  // We want a range if (start or created) plus a due => e.g. [start~due] or [created~due]
  // else a single date => a "point"
  // * If chain≥2 => use `@` if it's a range
  // else if single date => use `*`
  
  // 2.2.1. Check if we have a range
  let leftSide = ""; 
  let rightSide= "";

  // We'll prefer start if available, else created or scheduled for the left
  // We'll prefer due if available for the right
  if (hasStart) leftSide = sDate;
  else if (hasCreate) leftSide = cDate;
  else if (hasSched)  leftSide = schDate;

  if (hasDue) rightSide = dDate;

  let hasRange = (!!leftSide && !!rightSide && (leftSide !== rightSide));

  if (hasRange) {
    dateStr = `[${leftSide}~${rightSide}]`;
    lineChar = "-"; // default is an event
    // If chain≥2 => make it a period
    if (chain.length >= 2) {
      lineChar = "@";
    }
  }
  else {
    // single date => use whichever we can find in priority:
    // start? else due? else scheduled? else created?
    // The code above might already pick the correct one, but let's finalize it:
    let singleDate = leftSide || rightSide;
    if (!singleDate) {
      // no valid date found => skip
      continue;
    }
    // single date => a "point"
    lineChar = cfg.singleDateChar;
    // If no color is set yet:
    // if it was "start only" => green, "due only" => red, "scheduled or created" => purple
    // but priority overrides if prio color is found

	// if givePointsColor is false, then set color to nothing
	color = cfg.givePointsColor ? color : "";
	console.log(`TEST -> ${cfg.givePointsColor}`);

    if (!color && cfg.givePointsColor==true) {
      if (hasStart && !hasDue && !hasSched && !hasCreate) {
        color = `#${cfg.startedOnlyColor}`;
      }
      else if (!hasStart && hasDue && !hasSched && !hasCreate) {
        color = `#${cfg.dueOnlyColor}`;
      }
      else if ((!hasStart && !hasDue) && (hasSched || hasCreate)) {
        color = `#${cfg.createdOnlyColor}`;
      }
      // else if multiple single-date fields => we just keep empty or pick one
    }
    dateStr = `[${singleDate}]`;
  }

  // Build final Chronos line
  // e.g.  - [start~end] #red {lane} Title | desc
  let groupPart = lane ? `{${lane}}` : "";
  let colorPart = color ? color : "";
  let label = desc ? `${title} | ${desc}` : title;

  let segs = [];
  segs.push(`${lineChar} ${dateStr}`);
  if (colorPart) segs.push(colorPart);
  if (groupPart) segs.push(groupPart);
  segs.push(label);

  lines.push(segs.join(" "));
}


// 2.3. BUILD THE CHRONOS CODE BLOCK
let out = [];
out.push("```chronos");

// Insert top flags: e.g. > DEFAULTVIEW and > ORDERBY
if (cfg.defaultViewStart && cfg.defaultViewEnd) {
  out.push(`> DEFAULTVIEW ${cfg.defaultViewStart}|${cfg.defaultViewEnd}`);
}
out.push(`> ORDERBY ${cfg.orderBy}`);

out.push(`# ${cfg.title}`);

// Insert Q1–Q4 if showQuarters
if (cfg.showQuarters && cfg.defaultViewStart && cfg.defaultViewEnd) {
  let startY = Number(moment(cfg.defaultViewStart).format("YYYY"));
  let endY   = Number(moment(cfg.defaultViewEnd).format("YYYY"));
  if (startY === endY) {
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

// Finally add the lines from tasks
for (let l of lines) {
  out.push(l);
}

out.push("```");

const chronosContent = out.join("\n")
console.log(chronosContent);

dv.paragraph(out.join("\n"));
```

# TESTING 2

```dataviewjs
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
