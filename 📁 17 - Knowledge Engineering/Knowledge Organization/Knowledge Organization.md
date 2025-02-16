---
permalink: 
aliases: [Obsidian Vault Structure]
tags: [knowledge_management, wiki_organization, taxonomies, taxonomy, wiki_structure, library-science, wiki, kms]
publish: true
date created: Thursday, June 20th 2024, 2:16 pm
date modified: Sunday, February 16th 2025, 2:40 pm
---

[Obsidian Knowledge Management Workflows](../../📁%2010%20-%20My%20Obsidian%20Stack/Obsidian%20Knowledge%20Management%20Workflows/Obsidian%20Knowledge%20Management%20Workflows.md)

> [!tip] Auto organize in Obsidian with something like [File Organizer 2000](../../📁%2009%20-%20My%20Obsidian%20Stack/Auto%20-%20Tagging,%20Linking,%20Dropzones%20&%20Organizers/File%20Organizer%202000/File%20Organizer%202000.md) 

# Nested Tags

- [help.obsidian.md > Tags - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/Tags)
- Plugins
	- [github.com > drPilman/obsidian-graph-nested-tags: A small plugin for Obsidian that links nested tags in graph view](https://github.com/drPilman/obsidian-graph-nested-tags)
	- [github.com > HananoshikaYomaru/obsidian-tag-generator: Break down nested tags into multiple parent tags](https://github.com/HananoshikaYomaru/obsidian-tag-generator)
	- 

# Links Relating To Obsidian Vaults

- [youtube.com > Obsidian: The Good Parts | No Boilerplate](https://www.youtube.com/watch?v=B0yAy2j-9V0&t=359s)
- https://forum.obsidian.md/t/cataloging-classification-information-science-pkms-and-you/10071
- https://hyperbolic.cloud/Knowledge/Knowledge+Management/Obsidian+Techniques
- https://forum.obsidian.md/t/difficulties-in-developing-a-udc-or-ddc-classifier/78072

- [Building a Second Brain: The Illustrated Notes](https://maggieappleton.com/basb)

- [Obsidian Resources - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/obsidian-resources/81835)
- [An opinionated reflection on using folders, links, tags, and properties - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/an-opinionated-reflection-on-using-folders-links-tags-and-properties/78548) 

- [CUT(ter) AWAY THE CHAOS OF YOUR VAULT WITH THIS ONE (two three four five six) SIMPLE METHOD(s) - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/cut-ter-away-the-chaos-of-your-vault-with-this-one-two-three-four-five-six-simple-method-s/33700) 
	- [A system to organise your life • Johnny.Decimal](https://johnnydecimal.com/) 
	- 

- LYT obsidian - ideaverse?
	- [Linking Your Thinking Workshop](https://www.linkingyourthinking.com/workshop) 
	- [Ideaverse for Obsidian](https://start.linkingyourthinking.com/ideaverse-for-obsidian) 

- https://fortelabs.com/
- [LIBRARIANSHIP STUDIES & INFORMATION TECHNOLOGY](https://www.librarianshipstudies.com/)
	- [Controlled Vocabulary](https://www.librarianshipstudies.com/2020/03/controlled-vocabulary.html)
	- [Library of Congress Subject Headings (LCSH)](https://www.librarianshipstudies.com/2018/01/library-of-congress-subject-headings-lcsh.html)
	- [Linked data: The future of library cataloging (by OCLC)](https://www.librarianshipstudies.com/2024/06/linked-data-future-of-library.html)

# Wiki Organization Methodologies, Taxonomies, Structures

## Organizing Using the Library of Congress Subject Headings

- https://obsidian.md/plugins?search=congress
- https://github.com/kometenstaub/linked-data-vocabularies
	- Used library of congress taxonomy/folksonomy
- Had to download the MADS/RDF JSONLD file from - https://id.loc.gov/download/
- Set the path in the linked-data-vocabularies tool
- Then, query it by doing 'Ctrl + P' > LCSH > type in category
- Apparently, the Breadcrumbs plugin can help facilitate use of this plugin as well
- Not generating JSON files:
	- ["Linked data helper" plugin by kometenstaub - Bug graveyard - Obsidian Forum](https://forum.obsidian.md/t/linked-data-helper-plugin-by-kometenstaub/28875) - probably hasn't been working for awhile now

- **==id.loc.gov API - related to "Linked Data" and Subject Headings==**
	- Description:
		- Each controlled vocabulary list has a resolvable URI, as does each data value within it. Ontologies for several major data element sets are also available. URIs accessible at id.loc.gov link to bibliographic descriptions and controlled vocabularies and the values within them. This data service does not provide access to the physical or electronic holdings of the Library.
	- Links:
		- [Additional APIs and Data Services | APIs for LoC.gov | Library of Congress](https://www.loc.gov/apis/additional-apis/)
		- [Linked Data Service | Additional APIs and Data Services | APIs for LoC.gov | Library of Congress](https://www.loc.gov/apis/additional-apis/linked-data-service/)
		- [Library of Congress Subject Headings - LC Linked Data Service: Authorities and Vocabularies | Library of Congress](https://id.loc.gov/authorities/subjects.html)
		- [Data for Exploration | Library of Congress](https://data.labs.loc.gov/apis/) - shows all of the APIs, including the Linked Data Service one that is applicable here
		- [Working Within Limits | JSON/YAML for LoC.gov | APIs for LoC.gov | Library of Congress](https://www.loc.gov/apis/json-and-yaml/working-within-limits/#rate-limits) - rate limiting for the API
		- [Integrating Wikidata at the Library of Congress | The Signal](https://blogs.loc.gov/thesignal/2019/05/integrating-wikidata-at-the-library-of-congress/)
		- 
	- ==**Using the "Linked Data Service" API for Subject Headings**==
		- [Technical Center - Downloads - LC Linked Data Service: Authorities and Vocabularies | Library of Congress](https://id.loc.gov/techcenter/) 
		- [Technical Center - Searching - LC Linked Data Service: Authorities and Vocabularies | Library of Congress](https://id.loc.gov/techcenter/searching.html) 
		- [ ] Extend or design an obsidian plugin that accomplishes using the LoC subject headings without needing to download it - utilize the id.loc.gov API ➕ 2024-10-26
		
- Related, but not the desired API - LoC.gov API
	- [JSON/YAML for LoC.gov | APIs for LoC.gov | Library of Congress](https://www.loc.gov/apis/json-and-yaml/) - not for the "linked data" and (subsequently) the subject headings data though
	- Github link - [LibraryOfCongress/data-exploration: Tutorials for working with Library of Congress collections data](https://github.com/LibraryOfCongress/data-exploration) 
		- [Tutorials for Data Exploration — Tutorials for Data Exploration | GitHub.io](https://libraryofcongress.github.io/data-exploration/intro.html)

# Classification Systems

- [Universal Decimal Classification - Wikipedia](https://en.wikipedia.org/wiki/Universal_Decimal_Classification) 
- 

# Links

2024-06-20
- [latch system wiki obsidian - Google Search](https://www.google.com/search?q=latch+system+wiki+obsidian&sca_upv=1)
- [The Ultimate Folder System: A quixotic journey to ACE - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/the-ultimate-folder-system-a-quixotic-journey-to-ace/63483)
- [Anyone else put everything into their obsidian? If so, how do you organize and find what you need? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/15bctzk/anyone_else_put_everything_into_their_obsidian_if/)
- [information anxiety latch method - Google Search](https://www.google.com/search?q=information+anxiety+latch+method&ie=UTF-8#sbfbu=1&pi=information%20anxiety%20latch%20method)
- [“LATCH” : Information Architecture from the Eyes of an Urban Indian User ! | by Nivedita Chandra | Medium](https://medium.com/@niveditachandra/latch-information-architecture-from-the-eyes-of-an-urban-indian-user-efd474a7bb37#:~:text=Richard%20Saul%20Wurman%20%E2%80%94%20the%20person,Time%2C%20Category%2C%20or%20Hierarchy.)
- [Organizing Information: L.A.T.C.H.](https://www.thedesigngym.com/organizing-information-l-a-t-c-h/)
- [Need to organize content? LATCH it | Davis &amp; Company](https://www.davisandco.com/blog/need-organize-content-latch-it)
- [library science taxonomies organization information retrieval - Google Search](https://www.google.com/search?q=library+science+taxonomies+organization+information+retrieval&ie=UTF-8#pi=library%20science%20taxonomies%20organization%20information%20retrieval&sbfbu=1)
- [Taxonomy 101: Definition, Best Practices, and How It Complements Other IA Work](https://www.nngroup.com/articles/taxonomy-101/)
- [Taxonomies and Controlled Vocabularies - Metadata &amp; Discovery @ Pitt - Guides at University of Pittsburgh](https://pitt.libguides.com/metadatadiscovery/controlledvocabularies)
- [KNOWLEDGE ORGANISATION SYSTEMS AS TOOLS FOR ENHANCED INFORMATION ACCESS AND RETRIEVAL: A NEED FOR THE USE OF CORPORATE TAXONOMIES ON LIBRARY PORTALS.](https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=9832&context=libphilprac)
- [An Introduction to Hierarchical Taxonomies for Modern Librarians - KnowAll Matrix - Library Management System](https://knowallmatrix-librarysoftware.com/2023/02/07/an-introduction-to-hierarchical-taxonomies-for-modern-librarians/)
- [taxscript.pdf](https://www.loc.gov/flicc/cm/taxscript.pdf)
- [What are the best practices for maintaining a taxonomy in library services over time?](https://www.linkedin.com/advice/3/what-best-practices-maintaining-taxonomy-library-vqtvf)
- [History of Modern Information Taxonomies – Hedden Information Management](https://www.hedden-information.com/history-of-modern-information-taxonomies/)
- [Taxodiary – Taxonomies in Information Science](https://taxodiary.com/2018/08/taxonomies-in-information-science/)
- [library science taxonomies information hierarchy organization catalog classification - Google Search](https://www.google.com/search?q=library+science+taxonomies+information+hierarchy+organization+catalog+classification&ie=UTF-8)
- [How is Obsidian more than a Wiki? - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/how-is-obsidian-more-than-a-wiki/2914)
- [Personal knowledge management - Evan Harmon - Memex - Obsidian Publish](https://publish.obsidian.md/evanharmon/pkm)
- [AI Obsidian File Organizer Plugin - Automatically Organize Your Notes](https://fileorganizer2000.com/)