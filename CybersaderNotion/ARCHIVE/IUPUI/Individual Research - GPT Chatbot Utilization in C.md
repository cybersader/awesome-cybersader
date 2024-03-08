# Individual Research - GPT Chatbot Utilization in Cyber

---

# Name Ideas

- GPT-ReXplorer: GPT Recursive Expansion and Training with Web Crawling and Topic Exploration (Recursive Explorer)
    - A training system for GPT models that uses recursive topic expansion by crawling the web and expanding/exploring user or GPT-defined queries

# Workspace

[GPT Project Workspace](Individual%20Research%20-%20GPT%20Chatbot%20Utilization%20in%20C/GPT%20Project%20Workspace.md)

[The Idea](Individual%20Research%20-%20GPT%20Chatbot%20Utilization%20in%20C/The%20Idea.md)

[GPT & Topic/Query Expansion Research](Individual%20Research%20-%20GPT%20Chatbot%20Utilization%20in%20C/GPT%20&%20Topic%20Query%20Expansion%20Research%204fdc08a00e0441d29e08e4032bea8c4a.md)

[Theoretical Architectures](Individual%20Research%20-%20GPT%20Chatbot%20Utilization%20in%20C/Theoretical%20Architectures.md)

[GPT Convo](Individual%20Research%20-%20GPT%20Chatbot%20Utilization%20in%20C/GPT%20Convo.md)

---

# 2/9/2023

Hello Dr. Li, sorry, I haven't updated you recently, but I have been contemplating and researching. My search queries into the subject aren't finding anything quite like what I'm researching. I've attached an overview of some of the literature I've been going through, along with search queries or terms I've utilized. If you have any recommendations on areas to look into or searches to try, then I would greatly appreciate it.😁

The general processes (Specialized GPT Training through query and topic expansion):

All of this would be coded using Python.

- **Initialize a GPT Model (likely GPT 2)**
    - My research suggests that GPT3 would probably not be great for a specialized model because it requires large amounts of training that would require procuring computing infrastructure
    - The GPT-2 model is to be trained via. retrieved corpora from scraped webpages
- **Corpora Construction for Training**
    - The expansion part of this step can use a combination of the steps below.
    - Recursive Query Expansion
        - The process can be automated by taking user input for the first step, and then automatically expanding with model-defined expansion techniques for subsequent steps.
        - User Inputted Expansion
            - Search Query Expansion from User Prompts
                - Prompt an NLP model (maybe GPT 3) to generate search queries related to desired topics to train on
            - Search Query Expansion with a list of URLs
                - Feed the pipeline a list of URLs to use with Model-Defined Expansion
        - Model-Defined Expansion
            - Utilize corpora retrieved in the "User Inputted Expansion" step.
            - Web scraping is used to get the initial corpora from initial search queries
            - The corpora are then used to generate subsequent search queries recursively for a defined amount of cycles.
- Aggregating Corpora from Search Queries
    - Unstructured textual data is aggregated from search queries and fed into some form of temporary storage (cloud or local) Dynamic Cloud Storage Might require dynamic storage through a cloud provider for large corpora Would theorize this part and not actually pay for any cloud storage in testing
- **Bulk Training on Corpora**
    - Use a specialized Python-based program to feed corpora data from the dynamic cloud storage to the GPT model via. the OpenAI API and trains a model

I believe this project is doable. The hardest part will be the evaluation piece. I would guess it is VERY difficult to find out if a GPT model is performant on a specific area of knowledge i.e. a problem domain. I've read about "knowledge worker" tests and things of that nature. However, I still think that the process could at least be tested to some degree with specialized questions on recent topics in cyber (GPT wouldn't be trained on these so it would be new data for it). These topics would be ones that I train on with the "topic expansion" process.

# GPT GUIs

- Plug’n’play
    - https://github.com/MLeidel/GptGUI
- React
    - https://github.com/chatscope/chat-ui-kit-react
    - React with Vite
        - 
- Django

# Models & APIs

- https://github.com/acheong08/ChatGPT

# Creating a Docker Container to Use

- https://github.com/chatscope/chat-ui-kit-react
- 

# GPT Fine Tuning

- https://github.com/rudolfolah/finetune-gpt3-for-code

# Misc CYBERSADER

- [https://blog.remaketheweb.com/no-code-and-low-code-tools-and-platforms/](https://blog.remaketheweb.com/no-code-and-low-code-tools-and-platforms/)
- [https://unicornplatform.com/](https://unicornplatform.com/)
- [https://everysize.kibalabs.com/](https://everysize.kibalabs.com/)
- [https://editmode.com/](https://editmode.com/)
- [https://craftcms.com/](https://craftcms.com/)
- [https://www.plasmic.app/nextjs](https://www.plasmic.app/nextjs)
- [https://www.makeswift.com/](https://www.makeswift.com/)
- [https://www.builder.io/m/nextjs](https://www.builder.io/m/nextjs)
- [https://chakra-ui.com/](https://chakra-ui.com/)
    - [https://openchakra.app/](https://openchakra.app/)
- [https://quarkly.io/lp/no-code-low-code-platform/](https://quarkly.io/lp/no-code-low-code-platform/)
- [https://www.taskade.com/pricing](https://www.taskade.com/pricing)
- [https://create.t3.gg/](https://create.t3.gg/)
- [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
    - [https://next-auth.js.org/](https://next-auth.js.org/)
- [https://www.devwares.com/windframe/](https://www.devwares.com/windframe/)
- [https://vitejs.dev/](https://vitejs.dev/)
- [https://www.figma.com/community/plugin/959795830541939498](https://www.figma.com/community/plugin/959795830541939498)
- [https://www.figmachine.com/](https://www.figmachine.com/)
- [https://pagedraw.io/](https://pagedraw.io/)
- [https://mockitt.wondershare.com/figma/figma-to-react.html](https://mockitt.wondershare.com/figma/figma-to-react.html)
- [https://www.animaapp.com/](https://www.animaapp.com/)

# Session

```jsx
https://search.brave.com/search?q=desktop%20GPT%20training%20GUI&offset=1&spellcheck=0
https://huggingface.co/docs/transformers/model_doc/gpt_neo
https://openai.com/api/
https://beta.openai.com/overview
https://beta.openai.com/docs/api-reference/completions/create
https://beta.openai.com/docs/models/overview
https://beta.openai.com/docs/models/overview
https://beta.openai.com/docs/guides/completion/introduction
https://tailwind.build/
https://pinegrow.com/tailwind-visual-editor/
https://shuffle.dev/tailwind
https://www.devwares.com/windframe/
https://versoly.com/tailwind-page-builder
https://devdojo.com/tails
https://www.ui-devtools.com/
https://www.devwares.com/windframe/
https://chaibuilder.com/
https://flowbite.com/
https://headlessui.com/
https://www.radix-ui.com/
https://cybersader.ghost.io/ghost/#/editor/post/63633bfadb5681003d26b20d
https://notaku.so/dashboard
https://base.cybersader.com/cybersecurity-media-education-jobs
https://unicode-table.com/en/emoji/
https://www.canva.com/
https://tenor.com/search
```