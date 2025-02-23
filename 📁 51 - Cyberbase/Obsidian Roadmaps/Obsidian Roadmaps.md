---
aliases: []
tags: [initiatives/cyberbase]
publish: true
permalink: 
date created: Friday, February 21st 2025, 4:03 pm
date modified: Sunday, February 23rd 2025, 3:55 pm
---

%% Begin Waypoint %%
- **[[Dataview & Mermaid Roadmaps]]**
- **[[Dataview and Chronos Roadmap]]**

%% End Waypoint %%

- [forum.obsidian.md > How to style GANTT chart (mermaid)? - Help - Obsidian Forum](https://forum.obsidian.md/t/how-to-style-gantt-chart-mermaid/47883/5)
- [forum.obsidian.md > Resize and align mermaid diagrams - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/resize-and-align-mermaid-diagrams/7019)
- [forum.obsidian.md > Gantt charts are way too small to be readable - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/gantt-charts-are-way-too-small-to-be-readable/7017)
- 

# Roadmap Features

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
- Below the group level tasks like `\#roadmap/dfir`, if a description is not given, then instead use a "period" and base the color of the period of the, again, the task priority and/or status.  Done or cancelled could be the only time that green or red are used for instance to show those superceding statuses

# Gantt chart view of Tasks

## Important points to remember

1. Not all tasks need to go in ganttcharts: only place long terms tasks here.
2. To mark a task for gantt chart, put hashtag #ganttchart on it and ensure start and due date is marked that will plot the entry based on priority.

