# Cynar.io (Cyber Text-Based RPG)

# Misc

- [The Interactive Fiction Community Forum - The IF Community Forum](https://intfiction.org/)
- [Twee2 | Interactive Fiction for Power Users](https://dan-q.github.io/twee2/)
- [Twine / An open-source tool for telling interactive, nonlinear stories](https://twinery.org/)

# Basic Website Architecture

## Design + Front-End

Chakra UI is a great React component system.  We can use [https://openchakra.app/](https://openchakra.app/) to visually design the website, then paste the code into VS Code.

[Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications.](https://chakra-ui.com/)

[](https://openchakra.app/)

## Mantine UI Stuff

[120+ responsive components built with Mantine](https://mantine.dev/)

## Front-End

- React JS
- CSS & UI & Components
    - Framer Motion, Tailwind CSS, MUI, Undraw, Chakra UI

## Backend

- Hosting
    - Netlify
- DNS
    - Cloudflare

# Basic Functionality of Cynar.io

- ONE PAGE Website
- Short description at the top of the page
- You can draw out a scenario in the graph scenario editor
    - [react-digraph](https://github.com/uber/react-digraph)
    - [https://cambridge-intelligence.com/regraph/technology/](https://cambridge-intelligence.com/regraph/technology/)
    - https://github.com/vasturiano/react-force-graph
    - [https://bestofreactjs.com/repo/reaviz-reagraph](https://bestofreactjs.com/repo/reaviz-reagraph)
    - [https://openbase.com/categories/js/best-react-graph-libraries](https://openbase.com/categories/js/best-react-graph-libraries)
    - [https://openbase.com/js/reaflow](https://openbase.com/js/reaflow)
    - https://github.com/plotly/react-cytoscapejs
    - [https://reactflow.dev/](https://reactflow.dev/)
    - “storing graph data in JSON format conversion”
- If a node is clicked or added, then FRAMER MOTION will animate an edit window for that specific node and allow you to change it
- You have the ability to import or export a scenario file
- NODE PROPERTIES:
    - Image
    - Description
        - MARKDOWN or Basic Text
    - Connections to other nodes
- IF AT AND END NODE, then give the ability to start over

# Graph Libraries

Recommended paid options for graph libraries are yFiles, Cambridge Intelligence, Linkurious

D3 and sigma.js are open-source and useful for lightweight projects,