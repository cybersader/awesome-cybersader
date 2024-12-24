---
aliases: []
tags: []
publish: true
permalink:
date created: Tuesday, December 24th 2024, 11:50 am
date modified: Tuesday, December 24th 2024, 11:55 am
---

# Link Metadata (Graph Link Properties) 

> [!important] The purpose?
> Encode metadata about an **edge/relationship/link** to another note in the vault.  This could be structured or unstructured data even.

## Edge (Link) Metadata

**Edge metadata** refers to all additional information we want to store _about_ a link or relationship between two notes. Examples include:

- A **dotKey** (e.g. `framework_here.reviewer`), which names a specific type of relationship or property.
- A **boolean** or simple value (e.g. `"Person_1"` or `true`).
- A **JSON object** (e.g. `{"control": true, "reviewer": "Person_1"}`) that stores richer details about the relationship.

## Link Syntax

- Use dot notation with inline dataview tags
- Use JSON after inline dataview tags
- Define same connections in YAML frontmatter

- Dot notation
	- The presence of dot notation has 3 use cases: 
		1) the case where this is merely a "default" for outgoing JSON-based links, 
		2) the case where a boolean-based value is set to True (is there's no JSON), and 
		3) the case where an object-based key is given JSON at the end to define the object for that key as a "default" (same as #1 except that the value is a JSON object).  This can overlap with other values, but the priority is taken based on defined priority in the dataviewjs query


1) default for JSON-based links

	```
	[framework_here.reviewer:: "Person_1"]
	framework_here.reviewer:: "Person_1"
	(framework_here.reviewer:: "Person_1")
	```

2) Setting a boolean-based value to true for a particular target framework node

	```
	[framework_here.applies_to:: [ID 12](ID%2012.md)]
	(framework_here.applies_to:: [ID 12](ID%2012.md))
	framework_here.applies_to:: [ID 12](ID%2012.md)
	```

3) the case where an object-based key is given JSON at the end to define the object for that key as a "default"

	```
	framework_here.applies_to:: [[ID 13]] {"sufficient": true, "control": true}
	framework_here.applies_to:: [ID 12](ID%2012.md) {"sufficient": true, "control": true}
	```

