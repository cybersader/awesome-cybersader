---
aliases: []
tags: []
publish: true
permalink:
date created: Tuesday, December 24th 2024, 11:28 am
date modified: Tuesday, December 24th 2024, 11:28 am
---

# System Overview

This document outlines key concepts and terminology for handling **relationship/edge/link metadata** in a vault (e.g., Obsidian), along with how to **parse**, **prioritize**, and **query** those relationships. The overall goal is to create a system that can map unstructured or semi-structured data to a structured “framework” (e.g., compliance or risk management framework) with minimal overhead and flexible data capture.

## 1. Edge (Link) Metadata

**Edge metadata** refers to all additional information we want to store _about_ a link or relationship between two notes. Examples include:

- A **dotKey** (e.g. `framework_here.reviewer`), which names a specific type of relationship or property.
- A **boolean** or simple value (e.g. `"Person_1"` or `true`).
- A **JSON object** (e.g. `{"control": true, "reviewer": "Person_1"}`) that stores richer details about the relationship.

### Why We Need Edge Metadata

Traditional markdown or wiki links only store the destination. By embedding **metadata** alongside these links, we can encode additional context—like _who reviewed_ a document or _why_ a specific reference applies.

## 2. Priority Structure (Metadata Hierarchy)

Because edge metadata can appear in multiple ways (frontmatter, inline tags, parent folder attributes, etc.), we need a **Priority Structure** that decides which data “wins” when merging multiple sources. One example priority order might be:

1. **Inline tags with JSON**
2. **Inline tags with quoted values**
3. **Inline tags (no JSON/quoted, but implied booleans)**
4. **YAML frontmatter**
5. **Folder-level or inherited metadata**

This ensures a consistent approach to how we interpret or combine different metadata sources when building the final “relationship object.”

## 3. Regex for Parsing

We rely on a **custom regex** that captures the inline link syntax plus any associated metadata. For example:

```lua
framework_here.applies_to:: [[ID 12]] {"sufficient": true, "control": true}
```

The regex typically breaks out:

- **dotKey**: `framework_here.applies_to`
- **wikilink** / **mdLink** / **plainLink** (the “destination”)
- **JSON** or **quotedValue** (extra metadata)

This parsing layer is the _mechanism_ that extracts meaningful data from raw text lines.

## 4. Levels of Querying

You can query the relationships at different **hierarchical levels** in your framework or knowledge base:

1. **Leaf-Level Query**: In the final “leaf” of your framework folder structure, where you look at all the direct references made to that particular leaf node (or page).
2. **Higher-Level (Folder) Query**: Aggregate links for an entire folder (or set of subfolders), merging or grouping the results for all contained files.
3. **Global Query**: A broad search across the entire vault to find _any_ note linking to the framework or subset thereof.

The ability to query at different layers gives you flexibility in how you see the aggregated relationships—whether focusing on a single node or an entire framework domain.

## 5. Query Output and Visualization

The results of these queries can be presented in various ways:

- **Nested Structures** (YAML or JSON)
    - Useful for programmatic manipulation or for a hierarchical view of data.
- **Tabular Format**
    - Ideal for quickly scanning across many links, sorting or filtering.
- **Grouped / Pivoted Format**
    - Summaries of relationships by category or property.

The same raw data can be visualized differently depending on user needs (e.g., an item-by-item table or a pivoted summary).

## 6. Relationship Aggregation at the Framework Side

When performing queries _from the perspective_ of the framework (e.g., “Find all notes that link to this standard and their associated metadata”), you need a process to **aggregate** and **merge** relationships from multiple inbound notes.

- **Example**: A single node in your framework might be referenced by multiple notes, each providing partial or conflicting metadata.
- This aggregation process uses the **priority structure** above to unify or override attributes, then produces a consolidated representation of the relationship (e.g., “control is true if _any_ inbound note sets it” or “reviewer is set to the _most recent_ inbound assignment,” etc.).

## 7. “Framework” Concept

In this system, a **framework** is simply a **structured hierarchy** of folders/files that represent standards, policies, or any systematic arrangement of knowledge. Each node in the framework acts as an anchor or reference point for external notes to link back to:

- **Folder-level nodes**: Possibly high-level groupings (e.g., “Policy Documents,” “Security Controls,” etc.).
- **Leaf nodes**: Specific items or checklists (e.g., “Control 12.3,” “Requirement #45,” etc.).

All references to these nodes can be captured, combined, and displayed in meaningful ways, thanks to the regex parsing and priority structure.

* * *

# Putting It All Together

Below is a high-level workflow that shows how the concepts fit together:

1. **Authoring**
    
    - While writing notes, you embed inline links like
        
        ```lua
        framework_here.applies_to:: [[SomeOtherNote]] {"reviewer": "Alice", "control": true}
        ```
        
    - or even frontmatter definitions referencing the same “framework.”
2. **Parsing**
    
    - A **custom regex** processes each note, capturing the `dotKey`, link, and optional metadata (JSON/quoted value).
3. **Priority Merging**
    
    - If there are multiple definitions of the same relationship, the system enforces a **priority** (e.g., inline JSON > frontmatter).
4. **Querying**
    
    - You run a **DataviewJS** or similar script to gather all inbound references for a particular framework folder or leaf.
5. **Aggregation**
    
    - The system aggregates inbound edges from multiple notes, combining them according to the priority structure.
    - The final output can be displayed as a **table**, **nested JSON**, or any structure you prefer.
6. **Analysis / Action**
    
    - By looking at the aggregated links, you see which notes reference which parts of the framework, who the reviewer is, whether a control is “sufficient,” and so on.
    - This can streamline compliance, project management, or any scenario where you need to map unstructured notes to a structured reference.

* * *

## Benefits

1. **Single Source of Truth**: All relationships are recorded in the same workspace, so the mapping is always up-to-date.
2. **Flexible Storage**: You can store metadata inline or in frontmatter, using JSON or simple strings.
3. **Extensible**: The system’s logic can adapt to new frameworks or new data structures with minimal refactoring (just update the `framework_here` prefix or the regex if needed).
4. **Unified Queries**: DataviewJS or similar tools allow you to unify structured + unstructured data, providing a holistic picture of your knowledge base.

* * *

## Final Notes

- These concepts (edge metadata, priority structure, etc.) apply in many knowledge management scenarios, not just security or risk frameworks.
- The key enabler is the **regex-based** capturing of inline link metadata, giving you the power to **extend** ordinary wiki or markdown links into a lightweight **graph database** of sorts.
- Future enhancements could include multi-file merges, advanced frontmatter scanning, or integrating a more sophisticated UI for editing these relationships directly.

* * *

**Document Version**: 1.0  
**Created**: 2024-12-24

Feel free to adapt or rename these terms to best fit your workflow. Above all, these definitions should help collaborators talk about the system with clarity and consistency.