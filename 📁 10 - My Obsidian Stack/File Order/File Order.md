---
permalink: 
aliases: [Obsidian File Order]
tags: [obsidian/plugin]
publish: true
date created: Sunday, April 28th 2024, 11:19 pm
date modified: Friday, December 20th 2024, 1:05 pm
---

[Obsidian File Names](../Obsidian%20File%20Names/Obsidian%20File%20Names.md)

[lukasbach/obsidian-file-order: Obsidian plugin to reorder files with drag-and-drop by customizing a number-prefix in the filenames](https://github.com/lukasbach/obsidian-file-order)

- testing the file order plugin and viability
- It's alright, but I can't have an icon or unicode emoji in front of the numbers
- [ ] PR to improve File Order plugin to follow various templates? ➕ 2024-04-28

# Related Links

- [Alphabetic sort order should be dependent on system/input language - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/alphabetic-sort-order-should-be-dependent-on-system-input-language/11149)

# How Obsidian Organizes "Files"

Collation determines how strings are ordered or compared based on cultural and linguistic rules. These rules can vary widely between locales, and Unicode Collation Algorithms (UCA) are used to handle such complexities.

In JavaScript and environments like Chromium and Obsidian, collation is managed by the `Intl.Collator` API, which provides fine-grained control over string comparison.

- [We use the sorting algorithm provided by Chromium’s implementation of the web standard](https://forum.obsidian.md/t/alphabetic-sort-order-should-be-dependent-on-system-input-language/11149/5 "Alphabetic sort order should be dependent on system/input language - Bug graveyard - Obsidian Forum")
- [File order in Obsidian different from Windows File Explorer - Help - Obsidian Forum](https://forum.obsidian.md/t/file-order-in-obsidian-different-from-windows-file-explorer/93480) 