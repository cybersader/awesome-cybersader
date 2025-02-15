---
aliases: []
tags: []
permalink:
date created: Friday, March 22nd 2024, 11:10 pm
date modified: Saturday, February 15th 2025, 6:10 pm
publish: true
---

%% Begin Waypoint %%
- **[[Inpainting]]**
	- **[[A111 Inpaint]]**
- **[[Stable Diffusion Setup]]**
	- **[[ComfyUI Setup]]**
	- **[[SD Web UI Setup]]**

%% End Waypoint %%

# Midjourney

## Using MJ in Discord

- Add to your server by going to direct messages (on PC - not mobile), right-click the Midjourney bot after searching it, then add to your server
- Start using the commands -  [docs.midjourney.com > Discord Quick Start](https://docs.midjourney.com/hc/en-us/articles/32631709682573-Discord-Quick-Start)
- 

## Image -> Prompt

- Use `/describe`

## Adding Self to Prompts or Existing Images

### InsightFace Workflow

- Add InsightFace bot to your Discord server
	- First, you will need to [**invite Insight Face Bot**](https://discord.com/oauth2/authorize?client_id=1090660574196674713&permissions=274877945856&scope=bot) to your server.
- use `/saveid` to save a photo that you drag and drop as an identity
	- Give it an `idname` 
- After making something you like with Midjourney...
	- Right-click > Apps > INSwapper
- You can use the `/swapid` command to drag and drop your own local images too

#### Major Commands of Insight Face

- **/saveid** name upload-ID-image  
    Upload an image and register the ID
- **/setid** name(s)  
    Easily set the identity name(s) for image generation. You can specify multiple IDs by separating them with “,” or use “+” to link multiple ID names.
- **/swapid** name(s) upload-ID-image  
    Replace the face with the registered identity name(s) on target image.
- **/listid**  
    List all registered identity names. You can create up to 20 distinct IDs!
- **/delid** name  
    Delete specific identity name.
- **/delall**  
    Delete all registered names

### Midjourney Character Reference Workflow

[docs.midjourney.com > Character Reference](https://docs.midjourney.com/hc/en-us/articles/32162917505293-Character-Reference)
[docs.midjourney.com > Using Your Own Images – Midjourney](https://docs.midjourney.com/hc/en-us/sections/32013397184397-Using-Your-Own-Images)
[youtube.com > Want to Put Yourself in Midjourney? It FINALLY Works! | Glibatree](https://www.youtube.com/watch?v=KwAwWjCRaCY&list=WL&index=10&t=100s)

- Using Midjourney website
	- Drag in all of your images of you
	- Hover over each picture and choose the person icon
	- Click the lock button to keep using them
	- 

## InsightFace - ID Mixing (Mix People)

- [medium.com > You Can Now Generate Your Future Kid with Midjourney!](https://medium.com/design-bootcamp/you-can-now-generate-an-image-resembling-your-future-kid-with-midjourney-980676890235)
- Use `/setid` then two ids with a `+` between like `id1+id2`

# Putting Yourself in Images

## Flux LoRA, Cloud-Hosted Workflow

### Replicate AI

[replicate.com > Replicate - Run AI with an API](https://replicate.com/)

[youtube.com > How To Generate Yourself LITERALLY Anywhere - Flux LoRA Tutorial | 100x Engineers](https://www.youtube.com/watch?v=sNpQ9ULDMoo&list=WL&index=3)
[youtube.com > Create CONSISTENT CHARACTERS for your projects with FLUX! (ComfyUI Tutorial) | Mickmumpitz](https://www.youtube.com/watch?v=MbQv8zoNEfY&list=WL&index=1)
[youtube.com > How To Make AI Images Of Yourself (Free) | Matt Wolfe](https://www.youtube.com/watch?v=_rjto4ix3rA&list=WL&index=7&t=165s)

### Krea AI

[krea.ai > KREA](https://www.krea.ai/)

[youtube.com > REAL TIME FLUX LORA - just WOW! | Olivio Sarikas](https://www.youtube.com/watch?v=F_dklbWouOQ&list=WL&index=4)

- 