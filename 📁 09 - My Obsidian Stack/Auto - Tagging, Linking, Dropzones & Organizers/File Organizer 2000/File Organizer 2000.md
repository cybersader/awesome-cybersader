---
aliases: 
tags: 
publish: true
date created: Friday, April 26th 2024, 10:06 pm
date modified: Thursday, June 20th 2024, 4:21 pm
---

- [ ] Set up and test file organizer 2000 ➕ 2024-04-27
# Links
- [FileOrganizer2000 - AI Obsidian File Organizer Plugin - Automatically Organize Your Notes](https://fileorganizer2000.com/)
	- [(29) File Organizer 2000: Tips & Tricks - YouTube](https://www.youtube.com/playlist?list=PLgRcC-DFR5jdUxbSBuNeymwYTH_FSVxio)
# File Organizer 2000 Setup
- https://fileorganizer2000.com/
	- ![500](_attachments/File%20Organizer%202000/IMG-20240620162131840.png)
- If you want to use OpenAI Gpt
	- Make an account and go to
	- https://platform.openai.com/api-keys
	- Paste the API key back in Obsidian
- If you want to use Ollama
	- https://ollama.com/
	- ![500](_attachments/File%20Organizer%202000/IMG-20240620162131907.png)
	- You can find the models you can use @ https://ollama.com/library
	- File Organizer uses the internal REST API found @ https://github.com/ollama/ollama?tab=readme-ov-file#rest-api
	- To use it, we just have to use the known port with localhost for the "Ollama Model" under the "Advanced Config" settings for "AI File Organizer 2000" in Obsidian
		- ![400](_attachments/File%20Organizer%202000/IMG-20240620162131972.png)
	- If we host on our computer, we ned to use "OLLAMA_ORIGINS=* ollama serve" for environment variables
		- [How can I allow additional web origins to access Ollama?](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-allow-additional-web-origins-to-access-ollama)
		- [How do I configure Ollama server?](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-configure-ollama-server)
	- To set up environment variables in Windows
		- ![400](_attachments/File%20Organizer%202000/IMG-20240620162132019.png)
	- To run a model
		- "ollama run <model_name>"
		- ![400](_attachments/File%20Organizer%202000/IMG-20240620162132074.png)
		- It will take awhile to download and verify the files
	- It should work in Obsidian once it's running
	- Make sure you matched the model you're running and the settings in Obsidian
