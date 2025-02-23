---
aliases: []
tags: []
publish: true
permalink:
date created: Sunday, February 23rd 2025, 3:51 pm
date modified: Sunday, February 23rd 2025, 4:26 pm
---

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
	- IR stuff
- [ ] Test time #roadmap/dfir 🛫 2025-04-15 📅 2025-09-15
- [ ] yrdy 3 #roadmap/dfir/child 🛫 2025-02-27 📅 2025-05-15
- [ ] test_deep #roadmap/dfir/child/deeper 🛫 2025-04-02 📅 2025-08-12
- [ ] test #roadmap/secops/vulnmgmt 🛫 2025-09-16 📅 2025-11-12
- [ ] Title - desc 📅 2025-02-26
- [ ] Title 2 - desc 🛫 2025-02-26

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
- When a frontmatter named "marker_NAME_HERE: date" is used, make a grey pointer at that date with that name
- 

## TEST ZONE

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

const chronosContent = chronosLines.join("\n")

console.log(chronosContent);

dv.paragraph(chronosContent);
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