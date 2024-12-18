
I'm trying to build a tool that can be used to map plaintext files in markdown to taxonomical frameworks with a variety of built-in features such as using YAML frontmatter on note pages, import process for CSV file mapping or tabular versions, 2 way sync with those files, workflows, and more.

[Frameworks & Standards](../📁%2005%20-%20Organizational%20Cyber/Frameworks,%20Standards/Frameworks,%20Standards.md)
[Framework Mapping](../📁%2005%20-%20Organizational%20Cyber/Frameworks,%20Standards/Framework%20Mapping/Framework%20Mapping.md)
[My Obsidian Stack](../📁%2010%20-%20My%20Obsidian%20Stack/📁%2010%20-%20My%20Obsidian%20Stack.md)

# Data Structures, Taxonomies, Approach

- CRI Community Profile -  Bridge/Crosswalk/Intersection/Merge/Mapping Framework
    - https://cyberriskinstitute.org/the-profile/

# Useful Obsidian Plugins
- 

# DROPZONE, WORKSPACE

- What's the system fundamentally doing?
    - We are taking strict taxonomies/hierarchies and representing them in a way that can be easily interfaced and machine-readable
    - We are using a many components to represent these taxonomies or nested key:value pair systems:
        - Plaintext files with markdown
        - Inline tagging
        - YAML frontmatter - nested information about a singular node
        - Paths (relative or absolute) to other notes
            - Linking
            - Like a "graph"
        - How to represent an "edge" like in a graph but with particular values?
            - EXAMPLE: this page shows evidence of compensating control for this other reference framework page
    - Using the "graph"
        - We have to tell it how to pull the data out (below)

- Relationships between MD pages - links and graphs
    - How do graph DBs represent information about relationships between 2 nodes?
    - Links
        - https://forum.obsidian.md/t/add-support-for-link-types/6994/27?page=2
        - https://forum.obsidian.md/t/add-support-for-link-types/6994/186
        - https://volodymyrpavlyshyn.medium.com/how-to-make-personal-knowledge-graph-in-obsidian-a6dcd9cd0502
        - https://forum.obsidian.md/t/graph-link-types/74710
        - https://forum.obsidian.md/t/graph-link-types/74710/29 - with positional and keyword parameters per edge
        - https://forum.obsidian.md/t/graph-query-language-api/1542/5
        - https://forum.obsidian.md/t/juggl-out-now-1-0-1-a-completely-interactive-stylable-and-expandable-graph-view-plugin/9625
        - https://medium.com/@apappascs/aggregation-in-cypher-collect-list-comprehension-and-map-projections-4c011a6a6ce3
        - https://forum.obsidian.md/t/paths-for-notes-connection/6888
        - https://forum.obsidian.md/t/paths-for-notes-connection/6888
        - https://forum.obsidian.md/t/how-to-best-discern-between-different-types-of-links/8906/8
        - https://juggl.io/
    - At nodes --
        - Use queries - for generating editable, versionable tables, require dates for changes or just serialize it on nodes in the form of some table that can be edited.  This might be hard
        - At edges - use templates for the to/from set of available key value pairs.  Templates could be in the YAML frontmatter or stored in some other format inline within the note using code blocks
    - Allow for inline connections to other note pages using some crazy inline format

- Connection/edge templates for graph system
    - Store them per node (note page).  Templates can be defined globally per type of note page based on a tag in YAML frontmatter, or you can have value choices for key_value pairs in the edges, global templates

- Include frameworks out-of-the-box with support from the framework makers

- Merging/searching/exporting a path in the graph/structure?
    - We could flatten with particular key:value choices down to a certain layer
    - Use cypher queries with the notes?
    - Somehow would need to use graph-based connections, potentially index them (SUPER HARD), and allow for building two-way synced tables (or not) 

- How does OSCAL fit in?
    - OSCAL to YAML frontmatter?

- Storing, importing, and exporting templates for these framework setups?
    - Use some template format or system?
    - Definition files?
    - OSCAL?
