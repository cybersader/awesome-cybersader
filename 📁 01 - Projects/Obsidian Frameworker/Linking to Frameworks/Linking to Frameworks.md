---
aliases: []
tags: []
publish: true
permalink:
date created: Tuesday, December 24th 2024, 11:50 am
date modified: Sunday, January 12th 2025, 1:37 pm
---

# Link Metadata (Graph Link Properties) 

> [!important] The purpose?
> Encode metadata about an **edge/relationship/link** to another note in the vault.  This could be structured or unstructured data even.

## Edge (Link) Metadata

**Edge metadata** refers to all additional information we want to store _about_ a link or relationship between two notes. Examples include:

- A **dotKey** (e.g. `framework_here.reviewer`), which names a specific type of relationship or property.
- A **boolean** or simple value (e.g. `"Person_1"` or `true`).
- A **JSON object** (e.g. `{"control": true, "reviewer": "Person_1"}`) that stores richer details about the relationship.

# Link Syntax

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

# Overview of Dataview Inline Tag Syntax + Link Types

In Dataview, an **inline field** (aka “inline tag”) is often written as:

```arduino
key:: value
```

- **`key`** is the field name (e.g., `framework_here.applies_to`).
- **`value`** is the assigned data (e.g., `[ID 12](ID%2012.md)` or `"Person_1"` or `{"reviewer": "Alice"}`).

If you have the Dataview plugin enabled, Obsidian can parse these inline fields.  
Additionally, Dataview supports **wrapping** inline fields in parentheses `(...)`, square brackets `[...]`, or leaving them _unwrapped_, which influences how the text is rendered or hidden.

* * *

## 1. Wrapping Styles (Parentheses, Square Brackets, or None)

### 1.1 No Wrapping (Block-Style)

If you type your inline tag at the start of a line with no extra brackets, Dataview will interpret it as a **block-style** field. For example:

```arduino
framework_here.applies_to:: [ID 12](ID%2012.md)
```

- By default, this is visible in preview mode (unless you’ve changed Obsidian’s CSS).
- It often must begin a line (or at least be recognized by Dataview) so that `framework_here.applies_to:: ...` is detected.

### 1.2 Square Bracket Wrapping `[ ... ]`

Putting your inline field in square brackets means Obsidian typically treats it like a link or text that might be “hidden” or displayed differently. For example:

```scss
[framework_here.applies_to:: [ID 12](ID%2012.md)]
```

- Some themes or modes hide the text inside square brackets, so that only the link is displayed.
- This is sometimes done to keep the metadata from cluttering up the rendered text.

### 1.3 Parentheses Wrapping `( ... )`

Wrapping the entire inline tag in parentheses:

```less
(framework_here.applies_to:: [ID 12](ID%2012.md))
```

- Similar effect: some people prefer parentheses to keep the text inline but less visually intrusive.
- Again, depending on your theme or plugin settings, this might hide or reduce how the field is displayed in preview.

#### Dataview’s Own Docs

According to Dataview’s documentation, **inline fields** can be recognized with or without these brackets/parentheses; the effect is primarily _stylistic / presentational_. However, some advanced queries might specifically look for these differences.

* * *

## 2. Link Types (Markdown, WikiLink, Plain Text)

Within the **value** portion of your inline field, you might use different link syntaxes:

1. **Wikilink**
    - `[[Some Page]]`
    - Optionally can have an alias (`[[Some Page|Alias]]`).
2. **Markdown link**
    - `[Link Text](path/or/url)`
    - Commonly used for external URLs or internal note references if you prefer classic Markdown style.
3. **Plain Link / Text**
	- Use online links
    - Anything that isn’t bracketed or parenthesized, e.g., `SomeFileName.md` or `Person_1`.
    - Our custom regex can treat these as “plain link” if it doesn’t match the above patterns.

In **inline fields**, you can embed any of these link forms after the `::`.

### 2.1 Example: Wikilink

```lua
framework_here.applies_to:: [[ID 13]] 
```

- Means “The current note says that it _applies_to_ the page `ID 13`”.

### 2.2 Example: Markdown Link

```arduino
framework_here.applies_to:: [ID 12](ID%2012.md)
```

- Means “The current note says that it _applies_to_ the note located at `ID%2012.md`”.

### 2.3 Example: Plain Text, Boolean, or Number

```arduino
framework_here.reviewer:: "Person_1"
```

- Means “The current note says the _reviewer_ is ‘Person_1’”.
- No link, just a string.

Depending on your **Dataview** or **Obsidian** setup, you may or may not treat that plain text as an actual link or object.

* * *

## 3. Metadata Values/Attributes/Properties

### 3.1 JSON Objects `{ ... }`

You can append **JSON** directly after your link to store more complex data. For example:

```arduino
framework_here.applies_to:: [ID 12](ID%2012.md) {"sufficient": true, "control": true}
```

**Dataview** (or your custom script) can parse that JSON to glean multiple properties about the relationship (e.g. `sufficient = true`, `control = true`).

### 3.2 Quoted String

Alternatively, you can store a single quoted value, like:

```arduino
framework_here.reviewer:: "Person_1"
```

- Interpreted as a simpler “metadata field = ‘Person_1’” scenario.
- It’s not multi-property JSON; just a single string.

### 3.3 Boolean (True or False)

- TODO

### 3.4 Numbers

- TODO

* * *

## 4. Dot Notation Use Cases

You can have **dot notation** to specify sub-keys or categories in your framework. For example:

- `framework_here.reviewer`
- `framework_here.applies_to`

The **dotKey** portion (`framework_here.something`) can be used to attach different properties or types of relationships to your “framework.” Below are three general use cases:

1. **Default for JSON-based links**
    - E.g. `framework_here:: [ID 12](...) {"reviewer": "Alice"}`
    - The tag key `framework_here` identifies the applicable mapping/framework, and the JSON fleshes out some metadata about the link to the `ID 12` page
2. **Boolean or Flag**
    - E.g. `framework_here.applies_to:: [ID 12](ID%2012.md)` with **no** trailing JSON or quotes.
    - Some scripts treat this as a boolean “true” for `applies_to` that link/page.
    - The above syntax can be translated to "this page applies to ID 12 in framework_here" or "applies_to is True for ID 12 under the structure of notes and pages for `framework_here`
3. **JSON as an object for a particular key**
    - E.g. `framework_here.applies_to:: [ID 12](...) {"sufficient": true, "control": true}`
    - Means “we have an object of properties associated with the relationship `applies_to`.”

* * *

## 5. Examples of Each Combination

Below is a small matrix of possible combinations, with or without wrappers:

| **Syntax**                                                                      | **Meaning**                                                                                                                                                                         | **Link Type**                                                                                                            | **Wrapper**        | **Metadata**                    | Metadata Priority/Merging Level |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------- | ------------------------------- |
| `framework_here.reviewer:: "Person_1"`                                          | Set `reviewer` to `"Person_1"`.                                                                                                                                                     | Plain (no link).  Default type for other links on the page.                                                              | None (block style) | Quoted string                   |                                 |
| `[framework_here.applies_to:: [ID 12](ID%2012.md)]`                             | The `applies_to` relationship references `ID 12`. Possibly hidden in preview.                                                                                                       | Markdown link.  Flag type.  Default type for other MATCHING links on the page (only to that PARTICULAR page/destination) | Square brackets    | No JSON, default = boolean true |                                 |
| `(framework_here.applies_to:: [[ID 13]] {"sufficient": true, "control": true})` | The `applies_to` relationship references wiki-link `[[ID 13]]` with extra JSON data. Hidden/inline.                                                                                 | WikiLink + JSON.  Default type for other MATCHING links on the page (only to that PARTICUALR page/destination)           | Parentheses        | JSON object                     |                                 |
| `framework_here.reviewed:: [[ID 12]]`                                           | `reviewed` relationship references page `ID 12`. Visible inline. This shows that the relationship has been reviewed.                                                                | WikiLink                                                                                                                 | None (block style) | No JSON, default = boolean true |                                 |
| `[framework_here.approved:: True]`                                              | Any non-explicit links to the `framework_here` framework are given a default of `approved = True` (if not explicitly defined in another link to ANY destination page)               | Default type for other links on the page                                                                                 | Square brackets    | Boolean                         |                                 |
| `(framework_here.score:: 9)`                                                    | Any non-explicit links to the `framework_here` framework (from this page) are given a default of `score = True` (if not explicitly defined in another link to ANY destination page) | Default type for other links on the page                                                                                 | Parentheses        | Number                          |                                 |
| `[framework_here.score:: [[ID 13]] {9}]`                                        |                                                                                                                                                                                     | WikiLink.  Default type for other MATCHING links on the page (only to that PARTICUALR page/destination)                  | Parentheses        | Number                          |                                 |

* * *

## 6. Priority Structures & Query Logic

In your system, you may define a **priority** for how these inline tags (and their metadata) should be merged or interpreted, especially if multiple lines reference the same `dotKey`.

Here's how to think about how this relationship object building works:
- The relationship object builder will start with the most granular key:value instantiations for that "framework" relationship object.
- It will use the defined priority for graph-link classifications/types to determine how to build the relationship object
- Two key components affect prioritization:
	- The presence of an explicit link to the framework file
	- The level in the relationship object at which that graph link is declared/instantiated (child, root, relationship object itself w/no dot notation)
- This all assumes that the relationship object schema is the same for any relationship in that "framework"

(from highest importance to lowest)

1. With link
	1. Inline tag (leaf/lower/child - dot notation) + link + JSON 
	2. Inline tag (root/higher/parent - dot notation) + link + JSON 
	3. Inline tag (dot notation) + link + value or quoted value
	4. Inline tag (dot notation) + link + implied flag/boolean (no value)
2. Without link
	1. Inline tag (leaf/lower/child - dot notation) + JSON 
	2. Inline tag (root/higher/parent - dot notation) + JSON 
	3. Inline tag (dot notation) + value or quoted value
	4. Inline tag (dot notation) + implied flag/boolean (no value)

Options to think about:
1. **Inline tag with JSON**
2. **Inline tag with simpler quoted value**
3. **Fallback to a boolean or default**
4. **YAML frontmatter**
5. **Parent folder-levels or global defaults**

(The exact order depends on your project’s needs and the design of your dataviewjs queries.)

* * *

## 7. Practical Tips for Implementation

1. **Regex**: A robust regex (as shown in your code) can capture each piece (dotKey, wiki/markdown link, JSON, etc.) regardless of whether you wrap the inline field in `[]`, `()`, or nothing.
2. **Dataview**:
    - If you rely on Dataview’s _built-in parsing_, you may not need your own regex _for all cases_. However, **custom** or “complex” metadata (like trailing JSON) often requires the custom approach.
3. **User-Friendliness**:
    - Square brackets or parentheses can hide the inline field in rendered mode, making the note less cluttered.
    - However, new users might be confused by the syntax. Provide examples in your docs so they know how it’ll look in preview.
4. **Testing**:
    - Always test with a small set of sample notes and confirm that Dataview (or your script) picks up each inline field as expected.

* * *

## 8. Summarizing the Syntax

- **Dataview Inline Field**: `key:: value`
- **Optional Wrappers**: `(...), [...], or no wrapper`
- **Value Types**:
    1. **WikiLink**: `[[Some Page]]`
    2. **Markdown Link**: `[Link Text](path/or/url)`
    3. **Plain**: `"Some String"`, or just text (no brackets).
- **Extra Metadata**:
    - JSON object: `{ ... }` appended after the link.
    - Single quoted string: `"..."`.

Use whichever approach suits your workflow—**all** are valid ways to annotate links with additional metadata for your relationship mapping.

* * *

### References

- Dataview Docs: Inline Fields
- Obsidian Help: Internal Links vs. Wikilinks