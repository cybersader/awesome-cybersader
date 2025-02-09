---
aliases: []
tags: []
publish: true
permalink:
date created: Thursday, February 6th 2025, 9:49 pm
date modified: Saturday, February 8th 2025, 6:34 pm
---

Okay I'm trying to build my Obsidian Publish website to look and function in an awesome fashion. My name is Cybersader and I want to build the most modern cool, gradient having, with animations, and yet fast website with inspiration from Astro JS. I want it to be sleek. Obsidian Publish essentially generates a static website from your Obsidian notes. The issue is that all you have to actually change the theme and function of your website is a publish.css and publish.js file that you can add in your vault that gets ingested when the website is built. I've got docs, examples from other people's vaults, complex explanations, and more to show you. Then, let's build a really good css and js file. Then, we can create a workflow for optimizing or minifying it. One of the only things that I need to implement, for sure, functionality wise is to dynamically generate a Edit, View, and Download button for GitHub for each page.

I would rather have this auto-generate from JS code running on the page that uses a manually put repo variable like my repo "https://github.com/cybersader/awesome-cybersader" and then dynamically generate a view, copy (raw page data), download, or edit links that are pretty buttons with GitHub svg.  This could maybe be done from the vault side, but I would rather have it done from within the vault.  

Below is more ideas I had randomly that are related:

```
Okay so I'm trying to use obsidian publish along with a publish.js and publish.css file. This is the only way that they allow you to add functionality or change the theme of your website. However there's definitely a lot of limitations when it comes to what you can change. I'm not a developer so I'm not familiar with how to code something for the CSS or JS side of things in this regard. If it was my own project I could start everything with a front end framework from an IDE and just start coding from there and be able to push it out after bundling it. However I'm not sure how to bridge development for partly something I don't have access to where I can only push a JS or CSS file that will change other existing code that I have no control of. Maybe this is a general problem that people run into before. I need a breakdown of the front end mental model here and how to look at it in terms of what I can control and what I can't and what my limitations are in terms of what runs in the browser. I will leave you some documentation below. But yeah I want to actually understand how to approach this problem. Where am I going to be coding and I'm guessing my testing will have to involve pushing the publish and then looking at the results and then going back. Another thing I could figure out is how do I look at a website and figure out all of the variables that I have at my disposal such as my published website after the fact. How do I see where the publish.js and publish.css files went?

Can I develop in a front end framework somehow even though I don't have this structure and then bundle the code before providing it so that it's optimized? Can I do network calls and things like that still with the JavaScript? Another thing that I want to know is how to look at other existing obsidian publish websites and pull out the JS and CSS code that they are using. I'm assuming some of this is minified however I still want to know maybe how I can get that data out and use it myself or test it out

Are there frameworks for developing in this context? Out there we have bundlers like roll down roll up vote and others. We also have css optimization stuff. Is there a way for me to take my published website and reverse generate the code I would need for testing things? Kuto is also a reverse bundler but that's probably different. The other thing I run into is if I can do network calls in the case of CORS. It's possible I could use a cloudflare worker based cors proxy to hide these though. I'm also not sure if I can use es modules in the browser. One could say that this is literally reverse engineering a website. The goal here is that I want to keep things efficient but I'm not sure how to start developing in that way in this context.

I would want it right below div.page-header and the same thing right above div.backlinks. I would want it to also be pretty and with the github svg or edit svg like a pen for the edit one and down arrow for download. I also want the CSS to be pretty. I can add JS to my publish.js file too
```
# Obsidian Docs - Publish, JS, CSS, Themes

## Build a Publish theme

[docs.obsidian.md > Build a Publish theme - Developer Documentation](https://docs.obsidian.md/Themes/Obsidian+Publish+themes/Build+a+Publish+theme)

You can build themes for your [Obsidian Publish](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish) site. Themes for Obsidian Publish use the same [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) as the Obsidian app along with [Publish-specific CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables#Obsidian%20Publish).

See [Build a theme](https://docs.obsidian.md/Themes/App+themes/Build+a+theme) for more in-depth information on the `body`, `:root`, `.theme-dark`, and `.theme-light` selectors.

To build a theme for your site:

1. Add a file called `publish.css` to the root folder of your vault.
    - You need to use a external editor to create this file, as Obsidian does not support editing CSS files.
2. Publish `publish.css` to enable the theme on your live Publish site.

**Example:**

```css
.published-container {
  --page-width: 800px;
  --page-side-padding: 48px;
  
  /* ... CSS variables for Publish that do not change when light or dark mode is enabled. They sometimes link to color variables in .theme-light or .theme-dark */
}

.theme-light {
  --background-primary: #ebf2ff;
  --h1-color: #000000;
 
  /* ... CSS color variables for when light mode is enabled */
}
.theme-dark {
  --background-primary: #1f2a3f;
  --h1-color: #ffffff;
  
  /* ... CSS color variables for when dark mode is enabled */
}
```

For more information on how to customize your site, refer to [Customize your site](https://help.obsidian.md/Obsidian+Publish/Customize+your+site).

## Best practices for Publish themes

### Obsidian App and Obsidian Publish are different contexts 

Obsidian Publish shares common code and UI principles with Obsidian App, but also has some important differences that you should consider when creating themes. A few rules of thumb to keep in mind:

- Avoid complex selectors, use the available [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) instead.
- Avoid including CSS selectors and rules that are specific to Obsidian App.
- Keep CSS file size small so it loads fast for visitors.
- Consider compatibility across browsers and screen sizes.

### App-specific and Publish-specific CSS rules 

While Obsidian App and Obsidian Publish share some common code, most App themes are designed to target CSS classes that are not present in the Publish context. For this reason, we recommend building Publish themes from the ground up, to minimize the amount of unnecessary code.

### File size 

Obsidian App themes are stored locally on the user's device, whereas Obsidian Publish themes are loaded each time a user vists the site. For this reason, Obsidian Publish themes should be mindful of file size.

Keeping your theme file small will avoid [flashes of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), and load faster on a variety of devices and internet connections. Ideally your `publish.css` file should be as small as possible.

In the App context it is acceptable to embed fonts and images in the CSS file using base64 encoding. In the Publish context, we recommend that you avoid this approach, especially if it leads to larger file sizes (multiple megabytes) that may block rendering when a visitor accesses the site.

### Browser compatibility 

Visitors to Publish sites may use older browsers that are not compatible with new CSS features. For this reason we recommend being conservative with advanced CSS features in the Publish context. This is in contrast to Obsidian App themes which target a narrow scope of rendering engines (recent versions of Chromium/Blink) that support newer browser features. Try searching [caniuse.com](https://caniuse.com/) to see which CSS features are broadly available across browsers.

### Small screens and mobile devices 

Obsidian Publish has two breakpoints by default:

|Breakpoint|Device|Effect|
|---|---|---|
|1000px|Tablet|Right sidebar is hidden|
|750px|Mobile|Left and right sidebars are hidden. If enabled, navigation is accessible via hamburger menu in the top left corner|

You can target these devices using CSS. Any rules defined outside of the `@media` query will apply to all devices.

```css
@media screen and (min-width: 1000px) {
  /* ... rules and variables for screens larger than tablet */
}
@media screen and (max-width: 1000px) {
  /* ... rules and variables for tablet devices and smaller */
}
@media screen and (max-width: 750px) {
  /* ... rules and variables for mobile devices and smaller */
}
```

## Customize your site

[help.obsidian.md > Customize your site - Obsidian Help](https://help.obsidian.md/Obsidian+Publish/Customize+your+site)

This page explains how you can customize how your [Obsidian Publish](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish) site looks and feels.

### Static assets 

You can customize your site by [publishing](https://help.obsidian.md/Obsidian+Publish/Publish+and+unpublish+notes#Publish%20notes) the following files to your site:

- `publish.css` to add custom CSS
- `publish.js` to add custom JavaScript
- `favicon-32x32.png` to set the favicon

**Notes:**

- [CSS variables for Publish](https://docs.obsidian.md/Reference/CSS+variables/Publish/Publish) can be found on on our Documentation site.
- Since Obsidian doesn't support CSS or JavaScript files, you need to use another application to create and edit them.
- Both `publish.css` and `publish.js` must be located in the root directory (`/`) of your vault.
- By default, `publish.css` and `publish.js` don't appear in the file explorer, but you can still publish them from the **Publish changes** dialog.
- To use custom JavaScript with `publish.js`, you need to [Custom domains](https://help.obsidian.md/Obsidian+Publish/Custom+domains).

For favicons, Obsidian Publish supports the following naming conventions, where `32` is the icon dimensions in pixels:

- `favicon-32.png`
- `favicon-32x32.png`
- `favicon.ico`

We recommend that you provide one or more of the following dimensions:

- `favicon-32x32.png`
- `favicon-128x128.png`
- `favicon-152x152.png`
- `favicon-167x167.png`
- `favicon-180x180.png`
- `favicon-192x192.png`
- `favicon-196x196.png`

You have flexibility in placing favicons anywhere within the vault, as long as they are published to your site.

### Use a community theme 

To use one of the community themes for your site:

1. Open your vault in the default file explorer for your OS.
2. Go to the vault settings folder (default: `.obsidian`).
3. Open the `themes` folder.
4. Copy the CSS file for the theme you want to use for your site.
5. Paste the file into the root folder of your vault.
6. Rename the CSS file to `publish.css`.
7. [Publish](https://help.obsidian.md/Obsidian+Publish/Publish+and+unpublish+notes#Publish%20notes) `publish.css`.

**Notes:**

- If the style doesn't change within a few minutes, you may need to refresh your browser cache.
- You can switch between light and dark mode in the [site options](https://help.obsidian.md/Obsidian+Publish/Manage+sites#View%20site%20options).

Developing themes

Can't find the theme for you? Learn how to [Build a Publish theme](https://docs.obsidian.md/Themes/Obsidian+Publish+themes/Build+a+Publish+theme) yourself.

### Enable UI features 

You can toggle several UI features for your site, such as the graph view or a table of contents.

Browse the available UI features under the **Reading experience** and **Components** sections in the [site options](https://help.obsidian.md/Obsidian+Publish/Manage+sites#View%20site%20options)

#### Customize navigation 

Within Obsidian Publish, you have the ability to customize the navigation order and display of files and folders within the Publish [File explorer](https://help.obsidian.md/Plugins/File+explorer). Navigation items are listed in published order by default. Notes not published will not appear within this pane.

##### Accessing Customize navigation options 

8. In ribbon, to the left of the application window, select **Publish changes** ( ![lucide-send.svg > icon](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/icons/lucide-send.svg) ).
9. In the **Publish changes** dialog, select **Change site options** ( ![lucide-cog.svg > icon](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/icons/lucide-cog.svg) ).
10. Under **Components settings**, next to **Customize navigation**, select the **manage** button.

A new pop-up window titled **Navigation** will appear over your **Change site options** window.

##### Adjust navigation items 

In the section labeled **Navigation preview**, you can adjust the display order of your published content.

11. Select the folder or note you want to adjust.
12. Drag the note or folder up or down until it is your desired place.
13. In the lower right of the **Navigation** window, select **Done**.

Publish will send your navigation changes to your site.

##### Hide and unhide navigation items 

If there are notes or folders you have published, but you do not want visible within your Navigation, you can opt to hide those items instead.

14. Select the folder or note you want to adjust.
15. Right click and select **Hide in navigation**. The item should now disappear from the **Navigation preview**.
16. In the lower right of the **Navigation** window, select **Done**.

Publish will send your navigation changes to your site.

You can **Show hidden** files by selecting the checkbox to the right of the **Navigation Preview** title

### FAQ 

**Can I move files from one folder to another within the Navigation?**

No. The file navigation structure for notes within folders needs to be maintained. You can adjust note order within folders (including the vault root), and folder order within other folders.

**Can I edit the order of multiple notes and folders before selecting Done?**

Yes.

**How do I revert these changes?**

- **Display order**: Select the **Restore Default** icon (counter clockwise rotate arrow) next to **Navigation item display order**. This will restore your navigation items to alphabetical order.
- **Hidden status**: Select the **Restore Default** icon (counter clockwise rotate arrow) next to **Hide pages or folders from navigation**. This will restore your hidden navigation items to a visible state.

## CSS Variables for Obsidian Publish

https://docs.obsidian.md/Reference/CSS+variables/CSS+variables#Obsidian+Publish

### Site sidebars

[docs.obsidian.md > Site sidebars - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+sidebars)


The left sidebar is present when [Site navigation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+navigation) is turned on. The right sidebar is present when the **Graph** and/or **Table of Contents** [Site components](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+components) are turned on. When these components are turned off, the following variables have no effect.

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

|Variable|Description|
|---|---|
|`--sidebar-left-width`|Width of the left sidebar|
|`--sidebar-left-background`|Background color of left sidebar|
|`--sidebar-left-border-width`|Right border width of left sidebar|
|`--sidebar-left-border-color`|Right border color of left sidebar|
|`--sidebar-right-width`|Width of the right sidebar|
|`--sidebar-right-background`|Background color of right sidebar|
|`--sidebar-right-border-width`|Left border width of right sidebar|
|`--sidebar-right-border-color`|Left border color of right sidebar|

Links to this page

### Site pages

[docs.obsidian.md > Site pages - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+pages)

This page lists CSS variables used for Obsidian Publish pages.

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

##### Page width and padding 

|Variable|Description|
|---|---|
|`--page-width`|Width of a note when readable line width is on|
|`--page-padding`|Padding around a note|

##### Page title 

The note title displayed at the top of the page. This title can be hidden in the Publish site settings using the "**Hide page title**" option.

|Variable|Description|
|---|---|
|`--page-title-color`|Font color|
|`--page-title-font`|Font family, see [Site fonts](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+fonts)|
|`--page-title-line-height`|Line height|
|`--page-title-size`|Font size|
|`--page-title-style`|Font style, e.g. normal or italic|
|`--page-title-variant`|Font variant|
|`--page-title-weight`|Font weight|

Links to this page

### Site navigation

[docs.obsidian.md > Site navigation - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+navigation)

When activated in Publish settings, navigation is placed in the left sidebar and can be styled with the following variables. Top-level items and folders can be treated differently than nested items.

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

|Variable|Description|
|---|---|
|`--nav-collapse-icon-color`|Collapse icon color|
|`--nav-collapse-icon-color-hover`|Collapse icon color (hovered)|
|`--nav-parent-item-color`|Font color for folders and top-level items|
|`--nav-parent-item-color-active`|Font color for active top-level items|
|`--nav-parent-item-weight`|Font weight for top-level items|
|`--nav-item-color`|Font color for nested items|
|`--nav-item-color-hover`|Font color for hovered nested items|
|`--nav-item-color-active`|Font color for active nested items|
|`--nav-item-border-color`|Border color for nested items|
|`--nav-item-border-color-hover`|Border color for hovered nested items|
|`--nav-item-border-color-active`|Border color for active nested items|
|`--nav-item-weight-active`|Font weight for active nested items|

Links to this page

### Site Header

[docs.obsidian.md > Site header - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+header)
The site header contains the site logo (if added in Publish settings), the site name, and the mobile hamburger menu if navigation is turned on.

The site header appears as a horizontal header at the top of the page on mobile devices and when navigation is turned off. When navigation is turned on in Publish settings, the site name and logo appear in the left sidebar.

This page lists CSS variables used for Obsidian Publish site header, site logo, and site name

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

|Variable|Description|
|---|---|
|`--logo-width`|Logo default width|
|`--logo-height`|Logo default height|
|`--logo-max-width`|Logo max width|
|`--logo-max-height`|Logo max height|
|`--logo-radius`|Logo corner radius|
|`--header-height`|Height of the site header|
|`--site-name-color`|Site name color|
|`--site-name-color-hover`|Site name hovered color|
|`--site-name-font`|Site name font family|
|`--site-name-size`|Site name font size|
|`--site-name-weight`|Site name font weight|
|`--site-menu-icon-color`|Mobile menu icon color|
|`--site-menu-icon-color-hover`|Mobile menu hovered icon color|
|`--site-menu-icon-size`|Mobile menu icon size|

Links to this page

### Site Footer

[docs.obsidian.md > Site footer - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+footer)

The site footer contains the text "Powered by Obsidian Publish". To hide the site footer you can set `--footer-display` to `none`.

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

|Variable|Description|
|---|---|
|`--footer-display`|Footer display|

### Site components

[docs.obsidian.md > Site components - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+components)

This page lists CSS variables used for Obsidian Publish site components.

#### CSS variables 

Publish-specific variables should be defined on the `.published-container`.

##### Component titles 

Styles for the title above components such as **Backlinks**, **Graph**, **Table of contents**, when these components are turned on in the site settings.

|Variable|Description|
|---|---|
|`--component-title-color`|Font color|
|`--component-title-font`|Font family|
|`--component-title-size`|Font size|
|`--component-title-style`|Font style, e.g. normal or italic|
|`--component-title-transform`|Text transform, e.g. uppercase|
|`--component-title-variant`|Font variant|
|`--component-title-weight`|Font weight|

##### Outline 

When activated in Publish settings, a table of contents is displayed in the right sidebar showing a navigable list of headings on the page.

|Variable|Description|
|---|---|
|`--outline-heading-color`|Font color for inactive headings|
|`--outline-heading-color-hover`|Font color for hovered heading|
|`--outline-heading-color-active`|Font color for active heading|
|`--outline-heading-weight-active`|Font weight for active heading|

##### Graph 

The graph component can be turned on in Publish settings. More graph CSS variables for node and line colors are present in the inherited CSS.

|Variable|Description|
|---|---|
|`--graph-height`|Height of the graph component|

### Site Fonts

[docs.obsidian.md > Site fonts - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+fonts)

To load remote fonts we recommend using CSS with `@import` or defining your fonts with `@font-face` and an absolute URL. [Learn more.](https://css-tricks.com/snippets/css/using-font-face-in-css/)

For example you can use [Google Fonts](https://fonts.google.com/) in your `publish.css` file. Here's how you would use the font Poppins:

```css
/* @import must always be at the top of your publish.css file */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  --font-text-theme: 'Poppins';
}
```

Obsidian Publish shares many [CSS variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables) with the Obsidian app. You can change these variables on the `body` element.

|Variable|Description|
|---|---|
|`--font-text-size`|Font size for page text|
|`--font-text-theme`|Font family for page text|
|`--font-monospace-theme`|Font family for code|
|`--font-interface-theme`|Font family for interface elements such as navigation|

Publish-specific CSS variables should be defined on the `.published-container`. See [Build a Publish theme](https://docs.obsidian.md/Themes/Obsidian+Publish+themes/Build+a+Publish+theme).

|Variable|Description|
|---|---|
|`--page-title-font`|Font family for [page titles](https://docs.obsidian.md/Reference/CSS+variables/Publish/Site+pages)|

### Graph View CSS Variables

This page lists CSS variables used by the [Graph view](https://help.obsidian.md/Plugins/Graph+view) plugin.

| Variable                  | Description           |
| ------------------------- | --------------------- |
| `--graph-controls-width`  | Graph controls width  |
| `--graph-text`            | Node text color       |
| `--graph-line`            | Line color            |
| `--graph-node`            | Resolved node color   |
| `--graph-node-unresolved` | Unresolved node color |
| `--graph-node-focused`    | Focused node color    |
| `--graph-node-tag`        | Tag node color        |
| `--graph-node-attachment` | Attachment node color |

## Other Useful CSS Variables

- [docs.obsidian.md > CSS variables - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables)

## Manifest

[docs.obsidian.md > Manifest - Developer Documentation](https://docs.obsidian.md/Reference/Manifest)

This page describes the schema for the manifest, `manifest.json`.

### Properties

The following properties are available for both plugins and themes.

| Property        | Type                                                                           | Required | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------- |
| `author`        | `string`                                                                       | **Yes**  | The author's name.                                                              |
| `minAppVersion` | `string`                                                                       | **Yes**  | The minimum required Obsidian version.                                          |
| `name`          | `string`                                                                       | **Yes**  | The display name.                                                               |
| `version`       | `string`                                                                       | **Yes**  | The version, using [Semantic Versioning](https://semver.org/).                  |
| `authorUrl`     | `string`                                                                       | No       | A URL to the author's website.                                                  |
| `fundingUrl`    | `string` or [`object`](https://docs.obsidian.md/Reference/Manifest#fundingurl) | No       | A URL or multiple URLs to where the users can support your project financially. |

### Plugin-specific properties

The following properties are only available to plugins.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | **Yes** | A description of your plugin. |
| `id` | `string` | **Yes** | The ID of your plugin. |
| `isDesktopOnly` | `boolean` | **Yes** | Whether your plugin uses NodeJS or Electron APIs. |

For local development, the `id` should match the plugin's folder name; otherwise some methods, such as `onExternalSettingsChange`, won't be called.

### fundingUrl

`fundingUrl` can either be a string with a single URL, or an object with multiple URLs.

**Single URL**:

```json
{
  "fundingUrl": "https://buymeacoffee.com"
}
```

**Multiple URLs**:

```json
{
  "fundingUrl": {
    "Buy Me a Coffee": "https://buymeacoffee.com",
    "GitHub Sponsor": "https://github.com/sponsors",
    "Patreon": "https://www.patreon.com/"
  }
}
```

## Embed fonts and images in your theme

[docs.obsidian.md > Embed fonts and images in your theme - Developer Documentation](https://docs.obsidian.md/Themes/App+themes/Embed+fonts+and+images+in+your+theme)

Learn how to include assets, such as fonts and images, in your theme.

Loading remote content

For Obsidian to work offline and to preserve user privacy, themes [aren't allowed](https://docs.obsidian.md/Developer+policies) to load remote content over the network. For more information, refer to [Theme guidelines > Keep resources local](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines#Keep%20resources%20local)

### Use data URLs 

To include assets such as fonts, icons, and images in your theme, you need to _embed_ them in the CSS file by passing a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to the [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function.

To create a data URL for your assets, create a URL using the following format:

```css
url("data:<MIME_TYPE>;base64,<BASE64_DATA>")
```

- Replace `<MIME_TYPE>` with the MIME type for your asset. If you don't know it, refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).
- Replace `<BASE64_DATA>` with the [Base64](https://en.wikipedia.org/wiki/Base64) encoded representation of your asset.

The following example embeds a GIF file as a background image:

```css
h1 {
  background-image: url("data:image/gif;base64,R0lGODdhAQADAPABAP////8AACwAAAAAAQADAAACAgxQADs=")
}
```

### Encode your assets 

For instructions on how to encode an asset into base64, refer to [Encoding data into base64 format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#encoding_data_into_base64_format).

You can also use one of the many free online tools for encoding.

For fonts:

- [Woff2Base](https://hellogreg.github.io/woff2base/) for WOFF2 font files
- [Aspose](https://products.aspose.app/font/base64) supports a wide variety of font formats

For images:

- [WebSemantics](https://websemantics.uk/tools/image-to-data-uri-converter/) converts JPEG, JPG, GIF, PNG, SVG
- [Base64 Guru](https://base64.guru/converter/encode/image) supports a wide variety of image formats
- [Yoksel URL-encoder for SVG](https://yoksel.github.io/url-encoder/) optimized for SVG files

### Consider file size 

Embedding assets increases the file size of your theme, which may lead to poor performance in the following situations:

- Downloading and updating your theme from the community theme directory.
- Loading and using your theme in the Obsidian app.
- Editing your theme in a code editor. Consider breaking up your theme into multiple files using a CSS preprocessor, such as [Sass](https://sass-lang.com/) or [Less](https://lesscss.org/).

# Obsidian Publish CSS

## Minimal for Obsidian Publish

### Overview 

Minimal Publish is a stripped-down version of Minimal for [Obsidian Publish](https://obsidian.md/publish) . It follows the same design principles but is optimized for web usage. The theme is designed to load fast for all of your visitors. [See GitHub repo.](https://github.com/kepano/obsidian-minimal-publish)

### Features 

- Adheres to [best practices](https://docs.obsidian.md/Themes/Obsidian+Publish+themes/Best+practices+for+Publish+themes) for Obsidian Publish themes
- Much smaller file size **~16KB** compared to **~247KB** for app version, making it faster to download
- Available in several [color schemes](https://minimal.guide/features/color-schemes)
- Compatible with [helper classes](https://minimal.guide/features/helper-classes) such as [cards](https://minimal.guide/cards), [image grids](https://minimal.guide/image-grids), [image zoom](https://minimal.guide/features/image-zoom), and [table styles](https://minimal.guide/tables)
- Enables creating [zoomable image galleries](https://minimal.guide/guides/image-gallery)

### How to install 

17. Download the theme using one of the links below or go to the [GitHub repo](https://github.com/kepano/obsidian-minimal-publish)
18. Copy the `publish.css` file into the root folder of your vault
19. Publish the `publish.css` file

### Downloads 

Minimal Publish is available in 13 color schemes. You can download your favorite one optimized for Obsidian Publish using the links below. The files are located in the `/color-schemes` folder of the [GitHub repo](https://github.com/kepano/obsidian-minimal-publish).

- [Default](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/publish.css) (used on this site)
- [Atom](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/atom/publish.css)
- [Ayu](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/ayu/publish.css)
- [Catppuccin](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/catppuccin/publish.css)
- [Dracula](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/dracula/publish.css)
- [Everforest](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/everforest/publish.css)
- [Flexoki](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/flexoki/publish.css)
- [Gruvbox](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/gruvbox/publish.css)
- [macOS](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/macos/publish.css)
- [Nord](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/nord/publish.css)
- [Sky](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/sky/publish.css)
- [Rosé Pine](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/rose-pine/publish.css)
- [Solarized](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/solarized/publish.css)
- [Things](https://raw.githubusercontent.com/kepano/obsidian-minimal-publish/master/color-schemes/things/publish.css)

### Create an image gallery for Obsidian Publish

#### Overview 

This gallery uses [image grids](https://minimal.guide/image-grids) with [Minimal for Obsidian Publish](https://minimal.guide/publish/download). Images can be placed side by side, and clicked to open a zoomed in version.

#### Requirements 

For this guide you will need an [Obsidian Publish](https://obsidian.md/publish) site with a [custom domain](https://help.obsidian.md/Obsidian+Publish/Set+up+a+custom+domain), which is required to use `publish.js` on Obsidian Publish.

#### Step 1. Add theme and JS code to your vault 

20. Download [Minimal for Obsidian Publish](https://minimal.guide/publish/download) version 1.1+, and add it to your vault.
21. Download [publish.js](https://github.com/kepano/obsidian-minimal-publish/blob/master/publish.js) with the image zoom code, and add it to your vault.

Learn more about how to use `publish.css` and `publish.js` on the official [Obsidian Help site](https://help.obsidian.md/Obsidian+Publish/Customize+your+site).

#### Step 2. Add helper classes to your note 

For notes where you want to allow zoom, include the `img-zoom` [helper class](https://minimal.guide/features/helper-classes). You can also include the `img-grid` class if you want to enable [Image grids](https://minimal.guide/image-grids).

```
---
cssclasses:
  - img-grid
  - img-zoom
---
```

From here you can add images to your note following the instructions in [Image grids](https://minimal.guide/image-grids). Note that the code for image zoom currently only supports local image embeds (not remote assets).

#### Step 3. Publish your note and resources 

The final step is to publish all the relevant resources:

- Your `publish.js` file
- Your `publish.css` file
- Your note and images

More information can be found on the [Obsidian Help Site](https://help.obsidian.md/Obsidian+Publish/Publish+and+unpublish+notes).

You’re done! Refresh your site to see the image gallery. Note it may require a hard refresh (using `CMD + Shift + R`) or a few minutes to clear the cache.

#### Adapting this code to other Publish themes 

The resources associated with this feature can be found in the Minimal for Publish [GitHub repo](https://github.com/kepano/obsidian-minimal-publish/tree/master). You can use this to adapt the CSS and JS to other Publish themes. [Image zoom CSS](https://github.com/kepano/obsidian-minimal-publish/blob/master/src/scss/publish/image-zoom.scss)

### Helper Classes

#### How to use helper classes 

Helper classes are added using the special `cssclasses` [property](https://help.obsidian.md/Editing+and+formatting/Properties). In source mode it should look like this:

```
---
cssclasses:
  - img-grid
---
```

To use multiple classes use the following syntax:

```
---
cssclasses:
  - cards
  - cards-1-1
---
```

#### Image grids 

Helper class for [Image grids](https://minimal.guide/image-grids) feature

|Class|Description|
|---|---|
|`img-grid`|Turns consecutive images into columns. To make a new row, add an extra line break between images.|

#### Block widths 

Enable [Block width](https://minimal.guide/features/block-width) features on per-file basis, for [Tables](https://minimal.guide/tables), [Image grids](https://minimal.guide/image-grids) and [Iframes](https://minimal.guide/iframes)

|Class|Description|
|---|---|
|`wide`|Entire note uses wide line width|
|`max`|Entire note uses max line width|
|`table-wide`, `img-wide`, `iframe-wide`|Block type uses wide line width|
|`table-max`, `img-max`, `iframe-max`|Block type uses max line width|
|`table-100`, `img-100`, `iframe-100`|Block type uses 100% of the pane width|

#### Embeds and transclusions 

Controls the styling of [embeds](https://minimal.guide/embeds)

|Class|Description|
|---|---|
|`embed-strict`|Transclusions appear seamlessly in the flow of text|

#### Tables 

Controls the row and column styling of [tables](https://minimal.guide/tables)

| Class           | Description                                         |
| :-------------- | :-------------------------------------------------- |
| `table-nowrap`  | Disable line wrapping in table cells                |
| `table-wrap`    | Force wrapping in table cells                       |
| `table-center`  | Center small tables narrower than line width        |
| `table-numbers` | Add row numbers to tables                           |
| `table-tabular` | Use tabular figures in tables                       |
| `table-small`   | Use small font size in tables                       |
| `table-tiny`    | Use tiny font size in tables                        |
| `table-lines`   | Add borders around all table cells                  |
| `row-lines`     | Add borders between table rows                      |
| `col-lines`     | Add borders between table columns                   |
| `row-alt`       | Add striped background to alternating table rows    |
| `col-alt`       | Add striped background to alternating table columns |
| `row-highlight` | Highlight rows on hover                             |

#### Cards 

Helper class for [Cards](https://minimal.guide/cards) feature

|Class|Description|
|:--|:--|
|`cards` (required)|Set all Dataview tables to card layout|
|`list-cards`|Set all bullet lists to card layout|
|`cards-align-bottom`|Align the last element of a card to the bottom|
|`cards-cover`|Images are resized to fill the defined space|
|`cards-16-9`|Fit images in cards to 16:9 ratio|
|`cards-1-1`|Fit images in cards to 1:1 ratio (square)|
|`cards-2-1`|Fit images in cards to 2:1 ratio|
|`cards-2-3`|Fit images in cards to 2:3 ratio|
|`cards-cols-1` to `8`|Force a specific number of columns (from 1 to 8)|

# Obsidian API

## Obsidian Publish API (publish.d.ts)

- [github.com > obsidian-api/publish.d.ts at master · obsidianmd/obsidian-api](https://github.com/obsidianmd/obsidian-api/blob/master/publish.d.ts)
- [forum.obsidian.md > Obsidian Publish API - Developers: Plugin & API - Obsidian Forum](https://forum.obsidian.md/t/obsidian-publish-api/22546)
	- These are Publish API requests that came in via O_O 2024.
		- Classes and functions that exist in the Obsidian API which would be nice to have in Publish
		    - `Modal` for modals
		    - `FuzzySuggestModal` not really necessary but would be a nice to have
		    - `Menu` for custom right click menus
		    - `prepareFuzzySearch` for custom fuzzy searches
		    - `MarkdownRenderer` rendering custom Markdown is quite important for a lot of plugins
		    - `getFirstLinkPathDest` to resolve links
		- A way to access the list of all files and their frontmatter via the API would be useful, currently it’s undocumented in `publish.site.cache`
		- Some plugin management system, telling users to copy thousands of lines of JS code to their singular `publish.js` is not the best thing. Copying plugin code makes plugin updates and handling settings very complicated for the user. Even a simple plugin management system would be a huge improvement.

```ts

declare global {
    interface ObjectConstructor {
        isEmpty(object: Record<string, any>): boolean;
        each<T>(object: {
            [key: string]: T;
        }, callback: (value: T, key?: string) => boolean | void, context?: any): boolean;
    }
    interface ArrayConstructor {
        combine<T>(arrays: T[][]): T[];
    }
    interface Array<T> {
        first(): T | undefined;
        last(): T | undefined;
        contains(target: T): boolean;
        remove(target: T): void;
        shuffle(): this;
        unique(): T[];
    }
    interface Math {
        clamp(value: number, min: number, max: number): number;
        square(value: number): number;
    }
    interface StringConstructor {
        isString(obj: any): obj is string;
    }
    interface String {
        contains(target: string): boolean;
        startsWith(searchString: string, position?: number): boolean;
        endsWith(target: string, length?: number): boolean;
        format(...args: string[]): string;
    }
    interface NumberConstructor {
        isNumber(obj: any): obj is number;
    }
    interface Node {
        detach(): void;
        empty(): void;
        insertAfter<T extends Node>(node: T, child: Node | null): T;
        indexOf(other: Node): number;
        setChildrenInPlace(children: Node[]): void;
        appendText(val: string): void;
        /**
         * Cross-window capable instanceof check, a drop-in replacement
         * for instanceof checks on DOM Nodes. Remember to also check
         * for nulls when necessary.
         * @param type
         */
        instanceOf<T>(type: {
            new (): T;
        }): this is T;
        /**
         * The document this node belongs to, or the global document.
         */
        doc: Document;
        /**
         * The window object this node belongs to, or the global window.
         */
        win: Window;
        constructorWin: Window;
    }
    interface Element extends Node {
        getText(): string;
        setText(val: string | DocumentFragment): void;
        addClass(...classes: string[]): void;
        addClasses(classes: string[]): void;
        removeClass(...classes: string[]): void;
        removeClasses(classes: string[]): void;
        toggleClass(classes: string | string[], value: boolean): void;
        hasClass(cls: string): boolean;
        setAttr(qualifiedName: string, value: string | number | boolean | null): void;
        setAttrs(obj: {
            [key: string]: string | number | boolean | null;
        }): void;
        getAttr(qualifiedName: string): string | null;
        matchParent(selector: string, lastParent?: Element): Element | null;
        getCssPropertyValue(property: string, pseudoElement?: string): string;
        isActiveElement(): boolean;
    }
    interface HTMLElement extends Element {
        show(): void;
        hide(): void;
        toggle(show: boolean): void;
        toggleVisibility(visible: boolean): void;
        /**
         * Returns whether this element is shown, when the element is attached to the DOM and
         * none of the parent and ancestor elements are hidden with `display: none`.
         *
         * Exception: Does not work on <body> and <html>, or on elements with `position: fixed`.
         */
        isShown(): boolean;
        setCssStyles(styles: Partial<CSSStyleDeclaration>): void;
        setCssProps(props: Record<string, string>): void;
        /**
         * Get the inner width of this element without padding.
         */
        readonly innerWidth: number;
        /**
         * Get the inner height of this element without padding.
         */
        readonly innerHeight: number;
    }
    interface SVGElement extends Element {
        setCssStyles(styles: Partial<CSSStyleDeclaration>): void;
        setCssProps(props: Record<string, string>): void;
    }
    function isBoolean(obj: any): obj is boolean;
    function fish(selector: string): HTMLElement | null;
    function fishAll(selector: string): HTMLElement[];
    interface Element extends Node {
        find(selector: string): Element | null;
        findAll(selector: string): HTMLElement[];
        findAllSelf(selector: string): HTMLElement[];
    }
    interface HTMLElement extends Element {
        find(selector: string): HTMLElement;
        findAll(selector: string): HTMLElement[];
        findAllSelf(selector: string): HTMLElement[];
    }
    interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
        find(selector: string): HTMLElement;
        findAll(selector: string): HTMLElement[];
    }
    interface DomElementInfo {
        /**
         * The class to be assigned. Can be a space-separated string or an array of strings.
         */
        cls?: string | string[];
        /**
         * The textContent to be assigned.
         */
        text?: string | DocumentFragment;
        /**
         * HTML attributes to be added.
         */
        attr?: {
            [key: string]: string | number | boolean | null;
        };
        /**
         * HTML title (for hover tooltip).
         */
        title?: string;
        /**
         * The parent element to be assigned to.
         */
        parent?: Node;
        value?: string;
        type?: string;
        prepend?: boolean;
        placeholder?: string;
        href?: string;
    }
    interface SvgElementInfo {
        /**
         * The class to be assigned. Can be a space-separated string or an array of strings.
         */
        cls?: string | string[];
        /**
         * HTML attributes to be added.
         */
        attr?: {
            [key: string]: string | number | boolean | null;
        };
        /**
         * The parent element to be assigned to.
         */
        parent?: Node;
        prepend?: boolean;
    }
    interface Node {
        /**
         * Create an element and append it to this node.
         */
        createEl<K extends keyof HTMLElementTagNameMap>(tag: K, o?: DomElementInfo | string, callback?: (el: HTMLElementTagNameMap[K]) => void): HTMLElementTagNameMap[K];
        createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;
        createSpan(o?: DomElementInfo | string, callback?: (el: HTMLSpanElement) => void): HTMLSpanElement;
        createSvg<K extends keyof SVGElementTagNameMap>(tag: K, o?: SvgElementInfo | string, callback?: (el: SVGElementTagNameMap[K]) => void): SVGElementTagNameMap[K];
    }
    function createEl<K extends keyof HTMLElementTagNameMap>(tag: K, o?: DomElementInfo | string, callback?: (el: HTMLElementTagNameMap[K]) => void): HTMLElementTagNameMap[K];
    function createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;
    function createSpan(o?: DomElementInfo | string, callback?: (el: HTMLSpanElement) => void): HTMLSpanElement;
    function createSvg<K extends keyof SVGElementTagNameMap>(tag: K, o?: SvgElementInfo | string, callback?: (el: SVGElementTagNameMap[K]) => void): SVGElementTagNameMap[K];
    function createFragment(callback?: (el: DocumentFragment) => void): DocumentFragment;
    interface EventListenerInfo {
        selector: string;
        listener: Function;
        options?: boolean | AddEventListenerOptions;
        callback: Function;
    }
    interface HTMLElement extends Element {
        _EVENTS?: {
            [K in keyof HTMLElementEventMap]?: EventListenerInfo[];
        };
        on<K extends keyof HTMLElementEventMap>(this: HTMLElement, type: K, selector: string, listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any, options?: boolean | AddEventListenerOptions): void;
        off<K extends keyof HTMLElementEventMap>(this: HTMLElement, type: K, selector: string, listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any, options?: boolean | AddEventListenerOptions): void;
        onClickEvent(this: HTMLElement, listener: (this: HTMLElement, ev: MouseEvent) => any, options?: boolean | AddEventListenerOptions): void;
        /**
         * @param listener - the callback to call when this node is inserted into the DOM.
         * @param once - if true, this will only fire once and then unhook itself.
         * @returns destroy - a function to remove the event handler to avoid memory leaks.
         */
        onNodeInserted(this: HTMLElement, listener: () => any, once?: boolean): () => void;
        /**
         * @param listener - the callback to call when this node has been migrated to another window.
         * @returns destroy - a function to remove the event handler to avoid memory leaks.
         */
        onWindowMigrated(this: HTMLElement, listener: (win: Window) => any): () => void;
        trigger(eventType: string): void;
    }
    interface Document {
        _EVENTS?: {
            [K in keyof DocumentEventMap]?: EventListenerInfo[];
        };
        on<K extends keyof DocumentEventMap>(this: Document, type: K, selector: string, listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any, options?: boolean | AddEventListenerOptions): void;
        off<K extends keyof DocumentEventMap>(this: Document, type: K, selector: string, listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any, options?: boolean | AddEventListenerOptions): void;
    }
    interface UIEvent extends Event {
        targetNode: Node | null;
        win: Window;
        doc: Document;
        /**
         * Cross-window capable instanceof check, a drop-in replacement
         * for instanceof checks on UIEvents.
         * @param type
         */
        instanceOf<T>(type: {
            new (...data: any[]): T;
        }): this is T;
    }
    interface AjaxOptions {
        method?: 'GET' | 'POST';
        url: string;
        success?: (response: any, req: XMLHttpRequest) => any;
        error?: (error: any, req: XMLHttpRequest) => any;
        data?: object | string | ArrayBuffer;
        headers?: Record<string, string>;
        withCredentials?: boolean;
        req?: XMLHttpRequest;
    }
    function ajax(options: AjaxOptions): void;
    function ajaxPromise(options: AjaxOptions): Promise<any>;
    function ready(fn: () => any): void;
    function sleep(ms: number): Promise<void>;
    function nextFrame(): Promise<void>;
    /**
     * The actively focused Window object. This is usually the same as `window` but
     * it will be different when using popout windows.
     */
    let activeWindow: Window;
    /**
     * The actively focused Document object. This is usually the same as `document` but
     * it will be different when using popout windows.
     */
    let activeDocument: Document;
    interface Window extends EventTarget, AnimationFrameProvider, GlobalEventHandlers, WindowEventHandlers, WindowLocalStorage, WindowOrWorkerGlobalScope, WindowSessionStorage {
        /**
         * The actively focused Window object. This is usually the same as `window` but
         * it will be different when using popout windows.
         */
        activeWindow: Window;
        /**
         * The actively focused Document object. This is usually the same as `document` but
         * it will be different when using popout windows.
         */
        activeDocument: Document;
        sleep(ms: number): Promise<void>;
        nextFrame(): Promise<void>;
    }
    interface Touch {
        touchType: 'stylus' | 'direct';
    }
}

/**
 * @public
 */
export class Component {

    /**
     * Load this component and its children
     * @public
     */
    load(): void;
    /**
     * Override this to load your component
     * @public
     * @virtual
     */
    onload(): void;
    /**
     * Unload this component and its children
     * @public
     */
    unload(): void;
    /**
     * Override this to unload your component
     * @public
     * @virtual
     */
    onunload(): void;
    /**
     * Adds a child component, loading it if this component is loaded
     * @public
     */
    addChild<T extends Component>(component: T): T;
    /**
     * Removes a child component, unloading it
     * @public
     */
    removeChild<T extends Component>(component: T): T;
    /**
     * Registers a callback to be called when unloading
     * @public
     */
    register(cb: () => any): void;
    /**
     * Registers an event to be detached when unloading
     * @public
     */
    registerEvent(eventRef: EventRef): void;
    /**
     * Registers an DOM event to be detached when unloading
     * @public
     */
    registerDomEvent<K extends keyof WindowEventMap>(el: Window, type: K, callback: (this: HTMLElement, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    /**
     * Registers an DOM event to be detached when unloading
     * @public
     */
    registerDomEvent<K extends keyof DocumentEventMap>(el: Document, type: K, callback: (this: HTMLElement, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    /**
     * Registers an DOM event to be detached when unloading
     * @public
     */
    registerDomEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

    /**
     * Registers an interval (from setInterval) to be cancelled when unloading
     * Use {@link window#setInterval} instead of {@link setInterval} to avoid TypeScript confusing between NodeJS vs Browser API
     * @public
     */
    registerInterval(id: number): number;
}

/**
 * @public
 */
export interface EventRef {

}

/**
 * @public
 */
export class Events {

    /**
     * @public
     */
    on(name: string, callback: (...data: unknown[]) => unknown, ctx?: any): EventRef;
    /**
     * @public
     */
    off(name: string, callback: (...data: unknown[]) => unknown): void;
    /**
     * @public
     */
    offref(ref: EventRef): void;
    /**
     * @public
     */
    trigger(name: string, ...data: unknown[]): void;
    /**
     * @public
     */
    tryTrigger(evt: EventRef, args: unknown[]): void;
}

/**
 * A post processor receives an element which is a section of the preview.
 *
 * Post processors can mutate the DOM to render various things, such as mermaid graphs, latex equations, or custom controls.
 *
 * If your post processor requires lifecycle management, for example, to clear an interval, kill a subprocess, etc when this element is
 * removed from the app, look into {@link MarkdownPostProcessorContext#addChild}
 * @public
 */
export interface MarkdownPostProcessor {
    /**
     * The processor function itself.
     * @public
     */
    (el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<any> | void;
    /**
     * An optional integer sort order. Defaults to 0. Lower number runs before higher numbers.
     * @public
     */
    sortOrder?: number;
}

/**
 * @public
 */
export interface MarkdownPostProcessorContext {
    /**
     * @public
     */
    docId: string;
    /**
     * The path to the associated file. Any links are assumed to be relative to the `sourcePath`.
     * @public
     */
    sourcePath: string;
    /** @public */
    frontmatter: any | null | undefined;

    /**
     * Adds a child component that will have its lifecycle managed by the renderer.
     *
     * Use this to add a dependent child to the renderer such that if the containerEl
     * of the child is ever removed, the component's unload will be called.
     * @public
     */
    addChild(child: MarkdownRenderChild): void;
    /**
     * Gets the section information of this element at this point in time.
     * Only call this function right before you need this information to get the most up-to-date version.
     * This function may also return null in many circumstances; if you use it, you must be prepared to deal with nulls.
     * @public
     */
    getSectionInfo(el: HTMLElement): MarkdownSectionInformation | null;

}

/**
 * @public
 */
export class MarkdownPreviewRenderer {

    /**
     * @public
     */
    static registerPostProcessor(postProcessor: MarkdownPostProcessor, sortOrder?: number): void;
    /**
     * @public
     */
    static unregisterPostProcessor(postProcessor: MarkdownPostProcessor): void;

    /**
     * @public
     */
    static createCodeBlockPostProcessor(language: string, handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<any> | void): (el: HTMLElement, ctx: MarkdownPostProcessorContext) => void;

}

/**
 * @public
 */
export class MarkdownRenderChild extends Component {
    /** @public */
    containerEl: HTMLElement;
    /**
     * @param containerEl - This HTMLElement will be used to test whether this component is still alive.
     * It should be a child of the Markdown preview sections, and when it's no longer attached
     * (for example, when it is replaced with a new version because the user edited the Markdown source code),
     * this component will be unloaded.
     * @public
     */
    constructor(containerEl: HTMLElement);
}

/** @public */
export interface MarkdownSectionInformation {
    /** @public */
    text: string;
    /** @public */
    lineStart: number;
    /** @public */
    lineEnd: number;
}

/** @public */
export class Publish extends Events {

    /** @public */
    get currentFilepath(): string;
    /**
     * @public
     */
    registerMarkdownPostProcessor(postProcessor: MarkdownPostProcessor, sortOrder?: number): MarkdownPostProcessor;
    /**
     * Register a special post processor that handles fenced code given a language and a handler.
     * This special post processor takes care of removing the `<pre><code>` and create a `<div>` that
     * will be passed to your handler, and is expected to be filled with your custom elements.
     * @public
     */
    registerMarkdownCodeBlockProcessor(language: string, handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<any> | void, sortOrder?: number): MarkdownPostProcessor;

    /** @public */
    on(name: 'navigated', callback: () => any, ctx?: any): EventRef;
}

export { }

/** @public */
declare global {
	/**
	 * Global reference to the publish instance.
	 * @public
	 */
	var publish: Publish;
}
```

## Undocumented and Unofficial "Obsidian Typings"

- [fevol.github.io > Obsidian Typings](https://fevol.github.io/obsidian-typings/)

# Publish JS/CSS - Implementation Examples

## Obsidian Hub

[github.com > obsidian-community/obsidian-hub: Resource hub for Obsidian resources.](https://github.com/obsidian-community/obsidian-hub)

```css
.page-header {
	display: none;
}

.markdown-preview-view h1{
	line-height: 1.1em;
}

.site-body-left-column-site-logo {
    /* make the logo be in the center */
	align-self: center;
    /* 18 px padding so that it aligns with the center of the text below it as  well as with the search bar */
    padding-right: 18px;
    /* make it big */
    width: 100%;
    /* The original 120px plus 18px padding */
    max-width: 138px;
}

.site-body-left-column-site-name {
	text-align: center;
    /* 18px padding so it alignes with the search bar */
    padding-right: 18px;
}

/* Widen/Dynamically Size File Explorer & Right Panel */
.site-body-left-column  { flex:  0 .9 350px; }
.site-body-right-column { flex: .1 .9 300px; }

/* Hide Graph Around 1300px */
@media screen and (max-width: 1300px) {
    .published-container.has-graph .graph-view-outer {
        display: none;
    }    
}

/* Embed Adjustments */
.internal-embed[alt*="clean"] .markdown-embed,
.markdown-preview-view .internal-embed[alt*="clean"]:not(.image-embed),
.internal-embed[alt*="clean"] .markdown-embed .markdown-preview-view {
    border: 0;
    margin: 0;
    padding: 0;
}

/*Fix Embed Link Icon Alignment*/
.internal-embed[alt*="clean"] .markdown-embed-link { top: 0px; }
/*Hide Embed Link Icon Unless Hovered*/
.internal-embed[alt*="clean"]:not(:hover) .markdown-embed-link { display: none; }

/*"Hide" Bullet*/
.internal-embed[alt*="bullet"] .markdown-embed ul { padding-inline-start: 0; }




/* Footer Heading */
h1[data-heading="This note on GitHub"],
h1[data-heading="This note in GitHub"] {
    font-size: var(--editor-font-size);
    text-align: center;
}
h1[data-heading="This note on GitHub"]::before,
h1[data-heading="This note in GitHub"]::before {
    content: '';
    display: block;
    height: 2px;
    background: var(--background-modifier-border);
    margin-bottom: 10px;
}
/* Style Footer Links */
span.git-footer {
    display: block;
    text-align: center;
    bottom: 0;
}
.git-footer .external-link {
    background-image: url();
    padding-right: 0;
    padding: 6px 15px;
    background: var(--interactive-normal);
    border-radius: 4px;
    text-decoration: none;
}
.git-footer .external-link:hover {
    background: var(--interactive-accent-hover);
    color: var(--text-on-accent);
}
/* Footer Link Icons */
.git-footer .external-link::before {
    vertical-align: -3px;
    padding-right: 4px;
}
.git-footer .external-link[title="git-hub-edit-note"]::before {
    content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M3%2017.25V21h3.75L17.81%209.94l-3.75-3.75L3%2017.25zM20.71%207.04a.996.996%200%200%200%200-1.41l-2.34-2.34a.996.996%200%200%200-1.41%200l-1.83%201.83l3.75%203.75l1.83-1.83z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E');
}
.git-footer .external-link[title="git-hub-copy-note"]::before {
    content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M216%2032H88a8%208%200%200%200-8%208v40H40a8%208%200%200%200-8%208v128a8%208%200%200%200%208%208h128a8%208%200%200%200%208-8v-40h40a8%208%200%200%200%208-8V40a8%208%200%200%200-8-8zm-8%20128h-32V88a8%208%200%200%200-8-8H96V48h112z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E');
}
.git-footer .external-link[title="git-hub-download-vault"]::before {
    content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%209h-4V3H9v6H5l7%207l7-7zM5%2018v2h14v-2H5z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E')
}
```

## Yomaru.dev

[yomaru.dev > 901 🏠 Home - Hananoshika Yomaru](https://yomaru.dev/home)

```js
var publish = (() => {
  var Qn = Object.defineProperty,
    zn = Object.defineProperties;
  var Zn = Object.getOwnPropertyDescriptors;
  var Be = Object.getOwnPropertySymbols;
  var Jn = Object.prototype.hasOwnProperty,
    Xn = Object.prototype.propertyIsEnumerable;
  var qe = (e, n, i) =>
      n in e
        ? Qn(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[n] = i),
    Ye = (e, n) => {
      for (var i in n || (n = {})) Jn.call(n, i) && qe(e, i, n[i]);
      if (Be) for (var i of Be(n)) Xn.call(n, i) && qe(e, i, n[i]);
      return e;
    },
    Ue = (e, n) => zn(e, Zn(n));
  var ei = ((e) =>
    typeof require != "undefined"
      ? require
      : typeof Proxy != "undefined"
      ? new Proxy(e, {
          get: (n, i) => (typeof require != "undefined" ? require : n)[i],
        })
      : e)(function (e) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
  });
  var T = (e, n, i) =>
    new Promise((r, t) => {
      var l = (a) => {
          try {
            c(i.next(a));
          } catch (u) {
            t(u);
          }
        },
        o = (a) => {
          try {
            c(i.throw(a));
          } catch (u) {
            t(u);
          }
        },
        c = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(l, o));
      c((i = i.apply(e, n)).next());
    });
  var $e = () => {
    (function (e, n, i) {
      let r = function (l, o) {
          l.q.push(o);
        },
        t = e.document;
      e.Cal =
        e.Cal ||
        function () {
          let l = e.Cal,
            o = arguments;
          if (
            (l.loaded ||
              ((l.ns = {}),
              (l.q = l.q || []),
              (t.head.appendChild(t.createElement("script")).src = n),
              (l.loaded = !0)),
            o[0] === i)
          ) {
            let c = function () {
                r(c, arguments);
              },
              a = o[1];
            (c.q = c.q || []),
              typeof a == "string" ? (l.ns[a] = c) && r(c, o) : r(l, o);
            return;
          }
          r(l, o);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init"),
      Cal("init", { origin: "https://cal.com" }),
      Cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: !1,
        layout: "month_view",
      });
  };
  var Ge = ei("obsidian/publish"),
    ge = class extends Ge.MarkdownRenderChild {
      constructor(i, r) {
        super(i);
        (this.text = r), this.load();
      }
      onload() {
        var r;
        let i = this.containerEl.createSpan({
          text: (r = ge.ALL_EMOJIS[this.text]) != null ? r : this.text,
        });
        this.containerEl.replaceWith(i);
      }
    },
    B = ge;
  B.ALL_EMOJIS = {
    ":+1:": "\u{1F44D}",
    ":sunglasses:": "\u{1F60E}",
    ":smile:": "\u{1F604}",
  };
  function an(e) {
    return typeof e == "undefined" || e === null;
  }
  function ni(e) {
    return typeof e == "object" && e !== null;
  }
  function ii(e) {
    return Array.isArray(e) ? e : an(e) ? [] : [e];
  }
  function ri(e, n) {
    var i, r, t, l;
    if (n)
      for (l = Object.keys(n), i = 0, r = l.length; i < r; i += 1)
        (t = l[i]), (e[t] = n[t]);
    return e;
  }
  function ti(e, n) {
    var i = "",
      r;
    for (r = 0; r < n; r += 1) i += e;
    return i;
  }
  function oi(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  var li = an,
    ci = ni,
    ai = ii,
    ui = ti,
    si = oi,
    di = ri,
    b = {
      isNothing: li,
      isObject: ci,
      toArray: ai,
      repeat: ui,
      isNegativeZero: si,
      extend: di,
    };
  function un(e, n) {
    var i = "",
      r = e.reason || "(unknown reason)";
    return e.mark
      ? (e.mark.name && (i += 'in "' + e.mark.name + '" '),
        (i += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
        !n &&
          e.mark.snippet &&
          (i +=
            `

` + e.mark.snippet),
        r + " " + i)
      : r;
  }
  function Y(e, n) {
    Error.call(this),
      (this.name = "YAMLException"),
      (this.reason = e),
      (this.mark = n),
      (this.message = un(this, !1)),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack || "");
  }
  Y.prototype = Object.create(Error.prototype);
  Y.prototype.constructor = Y;
  Y.prototype.toString = function (n) {
    return this.name + ": " + un(this, n);
  };
  var w = Y;
  function xe(e, n, i, r, t) {
    var l = "",
      o = "",
      c = Math.floor(t / 2) - 1;
    return (
      r - n > c && ((l = " ... "), (n = r - c + l.length)),
      i - r > c && ((o = " ..."), (i = r + c - o.length)),
      {
        str: l + e.slice(n, i).replace(/\t/g, "\u2192") + o,
        pos: r - n + l.length,
      }
    );
  }
  function ve(e, n) {
    return b.repeat(" ", n - e.length) + e;
  }
  function fi(e, n) {
    if (((n = Object.create(n || null)), !e.buffer)) return null;
    n.maxLength || (n.maxLength = 79),
      typeof n.indent != "number" && (n.indent = 1),
      typeof n.linesBefore != "number" && (n.linesBefore = 3),
      typeof n.linesAfter != "number" && (n.linesAfter = 2);
    for (
      var i = /\r?\n|\r|\0/g, r = [0], t = [], l, o = -1;
      (l = i.exec(e.buffer));

    )
      t.push(l.index),
        r.push(l.index + l[0].length),
        e.position <= l.index && o < 0 && (o = r.length - 2);
    o < 0 && (o = r.length - 1);
    var c = "",
      a,
      u,
      d = Math.min(e.line + n.linesAfter, t.length).toString().length,
      s = n.maxLength - (n.indent + d + 3);
    for (a = 1; a <= n.linesBefore && !(o - a < 0); a++)
      (u = xe(e.buffer, r[o - a], t[o - a], e.position - (r[o] - r[o - a]), s)),
        (c =
          b.repeat(" ", n.indent) +
          ve((e.line - a + 1).toString(), d) +
          " | " +
          u.str +
          `
` +
          c);
    for (
      u = xe(e.buffer, r[o], t[o], e.position, s),
        c +=
          b.repeat(" ", n.indent) +
          ve((e.line + 1).toString(), d) +
          " | " +
          u.str +
          `
`,
        c +=
          b.repeat("-", n.indent + d + 3 + u.pos) +
          `^
`,
        a = 1;
      a <= n.linesAfter && !(o + a >= t.length);
      a++
    )
      (u = xe(e.buffer, r[o + a], t[o + a], e.position - (r[o] - r[o + a]), s)),
        (c +=
          b.repeat(" ", n.indent) +
          ve((e.line + a + 1).toString(), d) +
          " | " +
          u.str +
          `
`);
    return c.replace(/\n$/, "");
  }
  var pi = fi,
    hi = [
      "kind",
      "multi",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "representName",
      "defaultStyle",
      "styleAliases",
    ],
    mi = ["scalar", "sequence", "mapping"];
  function gi(e) {
    var n = {};
    return (
      e !== null &&
        Object.keys(e).forEach(function (i) {
          e[i].forEach(function (r) {
            n[String(r)] = i;
          });
        }),
      n
    );
  }
  function xi(e, n) {
    if (
      ((n = n || {}),
      Object.keys(n).forEach(function (i) {
        if (hi.indexOf(i) === -1)
          throw new w(
            'Unknown option "' +
              i +
              '" is met in definition of "' +
              e +
              '" YAML type.'
          );
      }),
      (this.options = n),
      (this.tag = e),
      (this.kind = n.kind || null),
      (this.resolve =
        n.resolve ||
        function () {
          return !0;
        }),
      (this.construct =
        n.construct ||
        function (i) {
          return i;
        }),
      (this.instanceOf = n.instanceOf || null),
      (this.predicate = n.predicate || null),
      (this.represent = n.represent || null),
      (this.representName = n.representName || null),
      (this.defaultStyle = n.defaultStyle || null),
      (this.multi = n.multi || !1),
      (this.styleAliases = gi(n.styleAliases || null)),
      mi.indexOf(this.kind) === -1)
    )
      throw new w(
        'Unknown kind "' +
          this.kind +
          '" is specified for "' +
          e +
          '" YAML type.'
      );
  }
  var E = xi;
  function We(e, n) {
    var i = [];
    return (
      e[n].forEach(function (r) {
        var t = i.length;
        i.forEach(function (l, o) {
          l.tag === r.tag &&
            l.kind === r.kind &&
            l.multi === r.multi &&
            (t = o);
        }),
          (i[t] = r);
      }),
      i
    );
  }
  function vi() {
    var e = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: { scalar: [], sequence: [], mapping: [], fallback: [] },
      },
      n,
      i;
    function r(t) {
      t.multi
        ? (e.multi[t.kind].push(t), e.multi.fallback.push(t))
        : (e[t.kind][t.tag] = e.fallback[t.tag] = t);
    }
    for (n = 0, i = arguments.length; n < i; n += 1) arguments[n].forEach(r);
    return e;
  }
  function be(e) {
    return this.extend(e);
  }
  be.prototype.extend = function (n) {
    var i = [],
      r = [];
    if (n instanceof E) r.push(n);
    else if (Array.isArray(n)) r = r.concat(n);
    else if (n && (Array.isArray(n.implicit) || Array.isArray(n.explicit)))
      n.implicit && (i = i.concat(n.implicit)),
        n.explicit && (r = r.concat(n.explicit));
    else
      throw new w(
        "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
      );
    i.forEach(function (l) {
      if (!(l instanceof E))
        throw new w(
          "Specified list of YAML types (or a single Type object) contains a non-Type object."
        );
      if (l.loadKind && l.loadKind !== "scalar")
        throw new w(
          "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
        );
      if (l.multi)
        throw new w(
          "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
        );
    }),
      r.forEach(function (l) {
        if (!(l instanceof E))
          throw new w(
            "Specified list of YAML types (or a single Type object) contains a non-Type object."
          );
      });
    var t = Object.create(be.prototype);
    return (
      (t.implicit = (this.implicit || []).concat(i)),
      (t.explicit = (this.explicit || []).concat(r)),
      (t.compiledImplicit = We(t, "implicit")),
      (t.compiledExplicit = We(t, "explicit")),
      (t.compiledTypeMap = vi(t.compiledImplicit, t.compiledExplicit)),
      t
    );
  };
  var yi = be,
    bi = new E("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function (e) {
        return e !== null ? e : "";
      },
    }),
    Ei = new E("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function (e) {
        return e !== null ? e : [];
      },
    }),
    Ai = new E("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function (e) {
        return e !== null ? e : {};
      },
    }),
    wi = new yi({ explicit: [bi, Ei, Ai] });
  function Ci(e) {
    if (e === null) return !0;
    var n = e.length;
    return (
      (n === 1 && e === "~") ||
      (n === 4 && (e === "null" || e === "Null" || e === "NULL"))
    );
  }
  function Si() {
    return null;
  }
  function ki(e) {
    return e === null;
  }
  var Li = new E("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: Ci,
    construct: Si,
    predicate: ki,
    represent: {
      canonical: function () {
        return "~";
      },
      lowercase: function () {
        return "null";
      },
      uppercase: function () {
        return "NULL";
      },
      camelcase: function () {
        return "Null";
      },
      empty: function () {
        return "";
      },
    },
    defaultStyle: "lowercase",
  });
  function Ti(e) {
    if (e === null) return !1;
    var n = e.length;
    return (
      (n === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
      (n === 5 && (e === "false" || e === "False" || e === "FALSE"))
    );
  }
  function _i(e) {
    return e === "true" || e === "True" || e === "TRUE";
  }
  function Fi(e) {
    return Object.prototype.toString.call(e) === "[object Boolean]";
  }
  var Mi = new E("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: Ti,
    construct: _i,
    predicate: Fi,
    represent: {
      lowercase: function (e) {
        return e ? "true" : "false";
      },
      uppercase: function (e) {
        return e ? "TRUE" : "FALSE";
      },
      camelcase: function (e) {
        return e ? "True" : "False";
      },
    },
    defaultStyle: "lowercase",
  });
  function Ii(e) {
    return (
      (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102)
    );
  }
  function Oi(e) {
    return 48 <= e && e <= 55;
  }
  function Ni(e) {
    return 48 <= e && e <= 57;
  }
  function Di(e) {
    if (e === null) return !1;
    var n = e.length,
      i = 0,
      r = !1,
      t;
    if (!n) return !1;
    if (((t = e[i]), (t === "-" || t === "+") && (t = e[++i]), t === "0")) {
      if (i + 1 === n) return !0;
      if (((t = e[++i]), t === "b")) {
        for (i++; i < n; i++)
          if (((t = e[i]), t !== "_")) {
            if (t !== "0" && t !== "1") return !1;
            r = !0;
          }
        return r && t !== "_";
      }
      if (t === "x") {
        for (i++; i < n; i++)
          if (((t = e[i]), t !== "_")) {
            if (!Ii(e.charCodeAt(i))) return !1;
            r = !0;
          }
        return r && t !== "_";
      }
      if (t === "o") {
        for (i++; i < n; i++)
          if (((t = e[i]), t !== "_")) {
            if (!Oi(e.charCodeAt(i))) return !1;
            r = !0;
          }
        return r && t !== "_";
      }
    }
    if (t === "_") return !1;
    for (; i < n; i++)
      if (((t = e[i]), t !== "_")) {
        if (!Ni(e.charCodeAt(i))) return !1;
        r = !0;
      }
    return !(!r || t === "_");
  }
  function Ri(e) {
    var n = e,
      i = 1,
      r;
    if (
      (n.indexOf("_") !== -1 && (n = n.replace(/_/g, "")),
      (r = n[0]),
      (r === "-" || r === "+") &&
        (r === "-" && (i = -1), (n = n.slice(1)), (r = n[0])),
      n === "0")
    )
      return 0;
    if (r === "0") {
      if (n[1] === "b") return i * parseInt(n.slice(2), 2);
      if (n[1] === "x") return i * parseInt(n.slice(2), 16);
      if (n[1] === "o") return i * parseInt(n.slice(2), 8);
    }
    return i * parseInt(n, 10);
  }
  function ji(e) {
    return (
      Object.prototype.toString.call(e) === "[object Number]" &&
      e % 1 === 0 &&
      !b.isNegativeZero(e)
    );
  }
  var Hi = new E("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: Di,
      construct: Ri,
      predicate: ji,
      represent: {
        binary: function (e) {
          return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
        },
        octal: function (e) {
          return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
        },
        decimal: function (e) {
          return e.toString(10);
        },
        hexadecimal: function (e) {
          return e >= 0
            ? "0x" + e.toString(16).toUpperCase()
            : "-0x" + e.toString(16).toUpperCase().slice(1);
        },
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"],
      },
    }),
    Pi = new RegExp(
      "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
  function Bi(e) {
    return !(e === null || !Pi.test(e) || e[e.length - 1] === "_");
  }
  function qi(e) {
    var n, i;
    return (
      (n = e.replace(/_/g, "").toLowerCase()),
      (i = n[0] === "-" ? -1 : 1),
      "+-".indexOf(n[0]) >= 0 && (n = n.slice(1)),
      n === ".inf"
        ? i === 1
          ? Number.POSITIVE_INFINITY
          : Number.NEGATIVE_INFINITY
        : n === ".nan"
        ? NaN
        : i * parseFloat(n, 10)
    );
  }
  var Yi = /^[-+]?[0-9]+e/;
  function Ui(e, n) {
    var i;
    if (isNaN(e))
      switch (n) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === e)
      switch (n) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === e)
      switch (n) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (b.isNegativeZero(e)) return "-0.0";
    return (i = e.toString(10)), Yi.test(i) ? i.replace("e", ".e") : i;
  }
  function $i(e) {
    return (
      Object.prototype.toString.call(e) === "[object Number]" &&
      (e % 1 !== 0 || b.isNegativeZero(e))
    );
  }
  var Gi = new E("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: Bi,
      construct: qi,
      predicate: $i,
      represent: Ui,
      defaultStyle: "lowercase",
    }),
    Wi = wi.extend({ implicit: [Li, Mi, Hi, Gi] }),
    Ki = Wi,
    sn = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
    dn = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
  function Vi(e) {
    return e === null ? !1 : sn.exec(e) !== null || dn.exec(e) !== null;
  }
  function Qi(e) {
    var n,
      i,
      r,
      t,
      l,
      o,
      c,
      a = 0,
      u = null,
      d,
      s,
      p;
    if (((n = sn.exec(e)), n === null && (n = dn.exec(e)), n === null))
      throw new Error("Date resolve error");
    if (((i = +n[1]), (r = +n[2] - 1), (t = +n[3]), !n[4]))
      return new Date(Date.UTC(i, r, t));
    if (((l = +n[4]), (o = +n[5]), (c = +n[6]), n[7])) {
      for (a = n[7].slice(0, 3); a.length < 3; ) a += "0";
      a = +a;
    }
    return (
      n[9] &&
        ((d = +n[10]),
        (s = +(n[11] || 0)),
        (u = (d * 60 + s) * 6e4),
        n[9] === "-" && (u = -u)),
      (p = new Date(Date.UTC(i, r, t, l, o, c, a))),
      u && p.setTime(p.getTime() - u),
      p
    );
  }
  function zi(e) {
    return e.toISOString();
  }
  var Zi = new E("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: Vi,
    construct: Qi,
    instanceOf: Date,
    represent: zi,
  });
  function Ji(e) {
    return e === "<<" || e === null;
  }
  var Xi = new E("tag:yaml.org,2002:merge", { kind: "scalar", resolve: Ji }),
    Se = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function er(e) {
    if (e === null) return !1;
    var n,
      i,
      r = 0,
      t = e.length,
      l = Se;
    for (i = 0; i < t; i++)
      if (((n = l.indexOf(e.charAt(i))), !(n > 64))) {
        if (n < 0) return !1;
        r += 6;
      }
    return r % 8 === 0;
  }
  function nr(e) {
    var n,
      i,
      r = e.replace(/[\r\n=]/g, ""),
      t = r.length,
      l = Se,
      o = 0,
      c = [];
    for (n = 0; n < t; n++)
      n % 4 === 0 &&
        n &&
        (c.push((o >> 16) & 255), c.push((o >> 8) & 255), c.push(o & 255)),
        (o = (o << 6) | l.indexOf(r.charAt(n)));
    return (
      (i = (t % 4) * 6),
      i === 0
        ? (c.push((o >> 16) & 255), c.push((o >> 8) & 255), c.push(o & 255))
        : i === 18
        ? (c.push((o >> 10) & 255), c.push((o >> 2) & 255))
        : i === 12 && c.push((o >> 4) & 255),
      new Uint8Array(c)
    );
  }
  function ir(e) {
    var n = "",
      i = 0,
      r,
      t,
      l = e.length,
      o = Se;
    for (r = 0; r < l; r++)
      r % 3 === 0 &&
        r &&
        ((n += o[(i >> 18) & 63]),
        (n += o[(i >> 12) & 63]),
        (n += o[(i >> 6) & 63]),
        (n += o[i & 63])),
        (i = (i << 8) + e[r]);
    return (
      (t = l % 3),
      t === 0
        ? ((n += o[(i >> 18) & 63]),
          (n += o[(i >> 12) & 63]),
          (n += o[(i >> 6) & 63]),
          (n += o[i & 63]))
        : t === 2
        ? ((n += o[(i >> 10) & 63]),
          (n += o[(i >> 4) & 63]),
          (n += o[(i << 2) & 63]),
          (n += o[64]))
        : t === 1 &&
          ((n += o[(i >> 2) & 63]),
          (n += o[(i << 4) & 63]),
          (n += o[64]),
          (n += o[64])),
      n
    );
  }
  function rr(e) {
    return Object.prototype.toString.call(e) === "[object Uint8Array]";
  }
  var tr = new E("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: er,
      construct: nr,
      predicate: rr,
      represent: ir,
    }),
    or = Object.prototype.hasOwnProperty,
    lr = Object.prototype.toString;
  function cr(e) {
    if (e === null) return !0;
    var n = [],
      i,
      r,
      t,
      l,
      o,
      c = e;
    for (i = 0, r = c.length; i < r; i += 1) {
      if (((t = c[i]), (o = !1), lr.call(t) !== "[object Object]")) return !1;
      for (l in t)
        if (or.call(t, l))
          if (!o) o = !0;
          else return !1;
      if (!o) return !1;
      if (n.indexOf(l) === -1) n.push(l);
      else return !1;
    }
    return !0;
  }
  function ar(e) {
    return e !== null ? e : [];
  }
  var ur = new E("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: cr,
      construct: ar,
    }),
    sr = Object.prototype.toString;
  function dr(e) {
    if (e === null) return !0;
    var n,
      i,
      r,
      t,
      l,
      o = e;
    for (l = new Array(o.length), n = 0, i = o.length; n < i; n += 1) {
      if (
        ((r = o[n]),
        sr.call(r) !== "[object Object]" ||
          ((t = Object.keys(r)), t.length !== 1))
      )
        return !1;
      l[n] = [t[0], r[t[0]]];
    }
    return !0;
  }
  function fr(e) {
    if (e === null) return [];
    var n,
      i,
      r,
      t,
      l,
      o = e;
    for (l = new Array(o.length), n = 0, i = o.length; n < i; n += 1)
      (r = o[n]), (t = Object.keys(r)), (l[n] = [t[0], r[t[0]]]);
    return l;
  }
  var pr = new E("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: dr,
      construct: fr,
    }),
    hr = Object.prototype.hasOwnProperty;
  function mr(e) {
    if (e === null) return !0;
    var n,
      i = e;
    for (n in i) if (hr.call(i, n) && i[n] !== null) return !1;
    return !0;
  }
  function gr(e) {
    return e !== null ? e : {};
  }
  var xr = new E("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: mr,
      construct: gr,
    }),
    fn = Ki.extend({ implicit: [Zi, Xi], explicit: [tr, ur, pr, xr] }),
    F = Object.prototype.hasOwnProperty,
    J = 1,
    pn = 2,
    hn = 3,
    X = 4,
    ye = 1,
    vr = 2,
    Ke = 3,
    yr =
      /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
    br = /[\x85\u2028\u2029]/,
    Er = /[,\[\]\{\}]/,
    mn = /^(?:!|!!|![a-z\-]+!)$/i,
    gn =
      /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function Ve(e) {
    return Object.prototype.toString.call(e);
  }
  function k(e) {
    return e === 10 || e === 13;
  }
  function I(e) {
    return e === 9 || e === 32;
  }
  function C(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function D(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function Ar(e) {
    var n;
    return 48 <= e && e <= 57
      ? e - 48
      : ((n = e | 32), 97 <= n && n <= 102 ? n - 97 + 10 : -1);
  }
  function wr(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function Cr(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function Qe(e) {
    return e === 48
      ? "\0"
      : e === 97
      ? "\x07"
      : e === 98
      ? "\b"
      : e === 116 || e === 9
      ? "	"
      : e === 110
      ? `
`
      : e === 118
      ? "\v"
      : e === 102
      ? "\f"
      : e === 114
      ? "\r"
      : e === 101
      ? "\x1B"
      : e === 32
      ? " "
      : e === 34
      ? '"'
      : e === 47
      ? "/"
      : e === 92
      ? "\\"
      : e === 78
      ? "\x85"
      : e === 95
      ? "\xA0"
      : e === 76
      ? "\u2028"
      : e === 80
      ? "\u2029"
      : "";
  }
  function Sr(e) {
    return e <= 65535
      ? String.fromCharCode(e)
      : String.fromCharCode(
          ((e - 65536) >> 10) + 55296,
          ((e - 65536) & 1023) + 56320
        );
  }
  var xn = new Array(256),
    vn = new Array(256);
  for (M = 0; M < 256; M++) (xn[M] = Qe(M) ? 1 : 0), (vn[M] = Qe(M));
  var M;
  function kr(e, n) {
    (this.input = e),
      (this.filename = n.filename || null),
      (this.schema = n.schema || fn),
      (this.onWarning = n.onWarning || null),
      (this.legacy = n.legacy || !1),
      (this.json = n.json || !1),
      (this.listener = n.listener || null),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.typeMap = this.schema.compiledTypeMap),
      (this.length = e.length),
      (this.position = 0),
      (this.line = 0),
      (this.lineStart = 0),
      (this.lineIndent = 0),
      (this.firstTabInLine = -1),
      (this.documents = []);
  }
  function yn(e, n) {
    var i = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart,
    };
    return (i.snippet = pi(i)), new w(n, i);
  }
  function f(e, n) {
    throw yn(e, n);
  }
  function ee(e, n) {
    e.onWarning && e.onWarning.call(null, yn(e, n));
  }
  var ze = {
    YAML: function (n, i, r) {
      var t, l, o;
      n.version !== null && f(n, "duplication of %YAML directive"),
        r.length !== 1 && f(n, "YAML directive accepts exactly one argument"),
        (t = /^([0-9]+)\.([0-9]+)$/.exec(r[0])),
        t === null && f(n, "ill-formed argument of the YAML directive"),
        (l = parseInt(t[1], 10)),
        (o = parseInt(t[2], 10)),
        l !== 1 && f(n, "unacceptable YAML version of the document"),
        (n.version = r[0]),
        (n.checkLineBreaks = o < 2),
        o !== 1 && o !== 2 && ee(n, "unsupported YAML version of the document");
    },
    TAG: function (n, i, r) {
      var t, l;
      r.length !== 2 && f(n, "TAG directive accepts exactly two arguments"),
        (t = r[0]),
        (l = r[1]),
        mn.test(t) ||
          f(n, "ill-formed tag handle (first argument) of the TAG directive"),
        F.call(n.tagMap, t) &&
          f(
            n,
            'there is a previously declared suffix for "' + t + '" tag handle'
          ),
        gn.test(l) ||
          f(n, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        l = decodeURIComponent(l);
      } catch (o) {
        f(n, "tag prefix is malformed: " + l);
      }
      n.tagMap[t] = l;
    },
  };
  function _(e, n, i, r) {
    var t, l, o, c;
    if (n < i) {
      if (((c = e.input.slice(n, i)), r))
        for (t = 0, l = c.length; t < l; t += 1)
          (o = c.charCodeAt(t)),
            o === 9 ||
              (32 <= o && o <= 1114111) ||
              f(e, "expected valid JSON character");
      else yr.test(c) && f(e, "the stream contains non-printable characters");
      e.result += c;
    }
  }
  function Ze(e, n, i, r) {
    var t, l, o, c;
    for (
      b.isObject(i) ||
        f(
          e,
          "cannot merge mappings; the provided source object is unacceptable"
        ),
        t = Object.keys(i),
        o = 0,
        c = t.length;
      o < c;
      o += 1
    )
      (l = t[o]), F.call(n, l) || ((n[l] = i[l]), (r[l] = !0));
  }
  function R(e, n, i, r, t, l, o, c, a) {
    var u, d;
    if (Array.isArray(t))
      for (
        t = Array.prototype.slice.call(t), u = 0, d = t.length;
        u < d;
        u += 1
      )
        Array.isArray(t[u]) &&
          f(e, "nested arrays are not supported inside keys"),
          typeof t == "object" &&
            Ve(t[u]) === "[object Object]" &&
            (t[u] = "[object Object]");
    if (
      (typeof t == "object" &&
        Ve(t) === "[object Object]" &&
        (t = "[object Object]"),
      (t = String(t)),
      n === null && (n = {}),
      r === "tag:yaml.org,2002:merge")
    )
      if (Array.isArray(l))
        for (u = 0, d = l.length; u < d; u += 1) Ze(e, n, l[u], i);
      else Ze(e, n, l, i);
    else
      !e.json &&
        !F.call(i, t) &&
        F.call(n, t) &&
        ((e.line = o || e.line),
        (e.lineStart = c || e.lineStart),
        (e.position = a || e.position),
        f(e, "duplicated mapping key")),
        t === "__proto__"
          ? Object.defineProperty(n, t, {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              value: l,
            })
          : (n[t] = l),
        delete i[t];
    return n;
  }
  function ke(e) {
    var n;
    (n = e.input.charCodeAt(e.position)),
      n === 10
        ? e.position++
        : n === 13
        ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
        : f(e, "a line break is expected"),
      (e.line += 1),
      (e.lineStart = e.position),
      (e.firstTabInLine = -1);
  }
  function y(e, n, i) {
    for (var r = 0, t = e.input.charCodeAt(e.position); t !== 0; ) {
      for (; I(t); )
        t === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position),
          (t = e.input.charCodeAt(++e.position));
      if (n && t === 35)
        do t = e.input.charCodeAt(++e.position);
        while (t !== 10 && t !== 13 && t !== 0);
      if (k(t))
        for (
          ke(e), t = e.input.charCodeAt(e.position), r++, e.lineIndent = 0;
          t === 32;

        )
          e.lineIndent++, (t = e.input.charCodeAt(++e.position));
      else break;
    }
    return (
      i !== -1 && r !== 0 && e.lineIndent < i && ee(e, "deficient indentation"),
      r
    );
  }
  function re(e) {
    var n = e.position,
      i;
    return (
      (i = e.input.charCodeAt(n)),
      !!(
        (i === 45 || i === 46) &&
        i === e.input.charCodeAt(n + 1) &&
        i === e.input.charCodeAt(n + 2) &&
        ((n += 3), (i = e.input.charCodeAt(n)), i === 0 || C(i))
      )
    );
  }
  function Le(e, n) {
    n === 1
      ? (e.result += " ")
      : n > 1 &&
        (e.result += b.repeat(
          `
`,
          n - 1
        ));
  }
  function Lr(e, n, i) {
    var r,
      t,
      l,
      o,
      c,
      a,
      u,
      d,
      s = e.kind,
      p = e.result,
      h;
    if (
      ((h = e.input.charCodeAt(e.position)),
      C(h) ||
        D(h) ||
        h === 35 ||
        h === 38 ||
        h === 42 ||
        h === 33 ||
        h === 124 ||
        h === 62 ||
        h === 39 ||
        h === 34 ||
        h === 37 ||
        h === 64 ||
        h === 96 ||
        ((h === 63 || h === 45) &&
          ((t = e.input.charCodeAt(e.position + 1)), C(t) || (i && D(t)))))
    )
      return !1;
    for (
      e.kind = "scalar", e.result = "", l = o = e.position, c = !1;
      h !== 0;

    ) {
      if (h === 58) {
        if (((t = e.input.charCodeAt(e.position + 1)), C(t) || (i && D(t))))
          break;
      } else if (h === 35) {
        if (((r = e.input.charCodeAt(e.position - 1)), C(r))) break;
      } else {
        if ((e.position === e.lineStart && re(e)) || (i && D(h))) break;
        if (k(h))
          if (
            ((a = e.line),
            (u = e.lineStart),
            (d = e.lineIndent),
            y(e, !1, -1),
            e.lineIndent >= n)
          ) {
            (c = !0), (h = e.input.charCodeAt(e.position));
            continue;
          } else {
            (e.position = o),
              (e.line = a),
              (e.lineStart = u),
              (e.lineIndent = d);
            break;
          }
      }
      c && (_(e, l, o, !1), Le(e, e.line - a), (l = o = e.position), (c = !1)),
        I(h) || (o = e.position + 1),
        (h = e.input.charCodeAt(++e.position));
    }
    return _(e, l, o, !1), e.result ? !0 : ((e.kind = s), (e.result = p), !1);
  }
  function Tr(e, n) {
    var i, r, t;
    if (((i = e.input.charCodeAt(e.position)), i !== 39)) return !1;
    for (
      e.kind = "scalar", e.result = "", e.position++, r = t = e.position;
      (i = e.input.charCodeAt(e.position)) !== 0;

    )
      if (i === 39)
        if (
          (_(e, r, e.position, !0),
          (i = e.input.charCodeAt(++e.position)),
          i === 39)
        )
          (r = e.position), e.position++, (t = e.position);
        else return !0;
      else
        k(i)
          ? (_(e, r, t, !0), Le(e, y(e, !1, n)), (r = t = e.position))
          : e.position === e.lineStart && re(e)
          ? f(e, "unexpected end of the document within a single quoted scalar")
          : (e.position++, (t = e.position));
    f(e, "unexpected end of the stream within a single quoted scalar");
  }
  function _r(e, n) {
    var i, r, t, l, o, c;
    if (((c = e.input.charCodeAt(e.position)), c !== 34)) return !1;
    for (
      e.kind = "scalar", e.result = "", e.position++, i = r = e.position;
      (c = e.input.charCodeAt(e.position)) !== 0;

    ) {
      if (c === 34) return _(e, i, e.position, !0), e.position++, !0;
      if (c === 92) {
        if (
          (_(e, i, e.position, !0),
          (c = e.input.charCodeAt(++e.position)),
          k(c))
        )
          y(e, !1, n);
        else if (c < 256 && xn[c]) (e.result += vn[c]), e.position++;
        else if ((o = wr(c)) > 0) {
          for (t = o, l = 0; t > 0; t--)
            (c = e.input.charCodeAt(++e.position)),
              (o = Ar(c)) >= 0
                ? (l = (l << 4) + o)
                : f(e, "expected hexadecimal character");
          (e.result += Sr(l)), e.position++;
        } else f(e, "unknown escape sequence");
        i = r = e.position;
      } else
        k(c)
          ? (_(e, i, r, !0), Le(e, y(e, !1, n)), (i = r = e.position))
          : e.position === e.lineStart && re(e)
          ? f(e, "unexpected end of the document within a double quoted scalar")
          : (e.position++, (r = e.position));
    }
    f(e, "unexpected end of the stream within a double quoted scalar");
  }
  function Fr(e, n) {
    var i = !0,
      r,
      t,
      l,
      o = e.tag,
      c,
      a = e.anchor,
      u,
      d,
      s,
      p,
      h,
      m = Object.create(null),
      x,
      v,
      S,
      g;
    if (((g = e.input.charCodeAt(e.position)), g === 91))
      (d = 93), (h = !1), (c = []);
    else if (g === 123) (d = 125), (h = !0), (c = {});
    else return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = c),
        g = e.input.charCodeAt(++e.position);
      g !== 0;

    ) {
      if ((y(e, !0, n), (g = e.input.charCodeAt(e.position)), g === d))
        return (
          e.position++,
          (e.tag = o),
          (e.anchor = a),
          (e.kind = h ? "mapping" : "sequence"),
          (e.result = c),
          !0
        );
      i
        ? g === 44 && f(e, "expected the node content, but found ','")
        : f(e, "missed comma between flow collection entries"),
        (v = x = S = null),
        (s = p = !1),
        g === 63 &&
          ((u = e.input.charCodeAt(e.position + 1)),
          C(u) && ((s = p = !0), e.position++, y(e, !0, n))),
        (r = e.line),
        (t = e.lineStart),
        (l = e.position),
        j(e, n, J, !1, !0),
        (v = e.tag),
        (x = e.result),
        y(e, !0, n),
        (g = e.input.charCodeAt(e.position)),
        (p || e.line === r) &&
          g === 58 &&
          ((s = !0),
          (g = e.input.charCodeAt(++e.position)),
          y(e, !0, n),
          j(e, n, J, !1, !0),
          (S = e.result)),
        h
          ? R(e, c, m, v, x, S, r, t, l)
          : s
          ? c.push(R(e, null, m, v, x, S, r, t, l))
          : c.push(x),
        y(e, !0, n),
        (g = e.input.charCodeAt(e.position)),
        g === 44
          ? ((i = !0), (g = e.input.charCodeAt(++e.position)))
          : (i = !1);
    }
    f(e, "unexpected end of the stream within a flow collection");
  }
  function Mr(e, n) {
    var i,
      r,
      t = ye,
      l = !1,
      o = !1,
      c = n,
      a = 0,
      u = !1,
      d,
      s;
    if (((s = e.input.charCodeAt(e.position)), s === 124)) r = !1;
    else if (s === 62) r = !0;
    else return !1;
    for (e.kind = "scalar", e.result = ""; s !== 0; )
      if (((s = e.input.charCodeAt(++e.position)), s === 43 || s === 45))
        ye === t
          ? (t = s === 43 ? Ke : vr)
          : f(e, "repeat of a chomping mode identifier");
      else if ((d = Cr(s)) >= 0)
        d === 0
          ? f(
              e,
              "bad explicit indentation width of a block scalar; it cannot be less than one"
            )
          : o
          ? f(e, "repeat of an indentation width identifier")
          : ((c = n + d - 1), (o = !0));
      else break;
    if (I(s)) {
      do s = e.input.charCodeAt(++e.position);
      while (I(s));
      if (s === 35)
        do s = e.input.charCodeAt(++e.position);
        while (!k(s) && s !== 0);
    }
    for (; s !== 0; ) {
      for (
        ke(e), e.lineIndent = 0, s = e.input.charCodeAt(e.position);
        (!o || e.lineIndent < c) && s === 32;

      )
        e.lineIndent++, (s = e.input.charCodeAt(++e.position));
      if ((!o && e.lineIndent > c && (c = e.lineIndent), k(s))) {
        a++;
        continue;
      }
      if (e.lineIndent < c) {
        t === Ke
          ? (e.result += b.repeat(
              `
`,
              l ? 1 + a : a
            ))
          : t === ye &&
            l &&
            (e.result += `
`);
        break;
      }
      for (
        r
          ? I(s)
            ? ((u = !0),
              (e.result += b.repeat(
                `
`,
                l ? 1 + a : a
              )))
            : u
            ? ((u = !1),
              (e.result += b.repeat(
                `
`,
                a + 1
              )))
            : a === 0
            ? l && (e.result += " ")
            : (e.result += b.repeat(
                `
`,
                a
              ))
          : (e.result += b.repeat(
              `
`,
              l ? 1 + a : a
            )),
          l = !0,
          o = !0,
          a = 0,
          i = e.position;
        !k(s) && s !== 0;

      )
        s = e.input.charCodeAt(++e.position);
      _(e, i, e.position, !1);
    }
    return !0;
  }
  function Je(e, n) {
    var i,
      r = e.tag,
      t = e.anchor,
      l = [],
      o,
      c = !1,
      a;
    if (e.firstTabInLine !== -1) return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = l),
        a = e.input.charCodeAt(e.position);
      a !== 0 &&
      (e.firstTabInLine !== -1 &&
        ((e.position = e.firstTabInLine),
        f(e, "tab characters must not be used in indentation")),
      !(a !== 45 || ((o = e.input.charCodeAt(e.position + 1)), !C(o))));

    ) {
      if (((c = !0), e.position++, y(e, !0, -1) && e.lineIndent <= n)) {
        l.push(null), (a = e.input.charCodeAt(e.position));
        continue;
      }
      if (
        ((i = e.line),
        j(e, n, hn, !1, !0),
        l.push(e.result),
        y(e, !0, -1),
        (a = e.input.charCodeAt(e.position)),
        (e.line === i || e.lineIndent > n) && a !== 0)
      )
        f(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < n) break;
    }
    return c
      ? ((e.tag = r), (e.anchor = t), (e.kind = "sequence"), (e.result = l), !0)
      : !1;
  }
  function Ir(e, n, i) {
    var r,
      t,
      l,
      o,
      c,
      a,
      u = e.tag,
      d = e.anchor,
      s = {},
      p = Object.create(null),
      h = null,
      m = null,
      x = null,
      v = !1,
      S = !1,
      g;
    if (e.firstTabInLine !== -1) return !1;
    for (
      e.anchor !== null && (e.anchorMap[e.anchor] = s),
        g = e.input.charCodeAt(e.position);
      g !== 0;

    ) {
      if (
        (!v &&
          e.firstTabInLine !== -1 &&
          ((e.position = e.firstTabInLine),
          f(e, "tab characters must not be used in indentation")),
        (r = e.input.charCodeAt(e.position + 1)),
        (l = e.line),
        (g === 63 || g === 58) && C(r))
      )
        g === 63
          ? (v && (R(e, s, p, h, m, null, o, c, a), (h = m = x = null)),
            (S = !0),
            (v = !0),
            (t = !0))
          : v
          ? ((v = !1), (t = !0))
          : f(
              e,
              "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"
            ),
          (e.position += 1),
          (g = r);
      else {
        if (
          ((o = e.line),
          (c = e.lineStart),
          (a = e.position),
          !j(e, i, pn, !1, !0))
        )
          break;
        if (e.line === l) {
          for (g = e.input.charCodeAt(e.position); I(g); )
            g = e.input.charCodeAt(++e.position);
          if (g === 58)
            (g = e.input.charCodeAt(++e.position)),
              C(g) ||
                f(
                  e,
                  "a whitespace character is expected after the key-value separator within a block mapping"
                ),
              v && (R(e, s, p, h, m, null, o, c, a), (h = m = x = null)),
              (S = !0),
              (v = !1),
              (t = !1),
              (h = e.tag),
              (m = e.result);
          else if (S)
            f(e, "can not read an implicit mapping pair; a colon is missed");
          else return (e.tag = u), (e.anchor = d), !0;
        } else if (S)
          f(
            e,
            "can not read a block mapping entry; a multiline key may not be an implicit key"
          );
        else return (e.tag = u), (e.anchor = d), !0;
      }
      if (
        ((e.line === l || e.lineIndent > n) &&
          (v && ((o = e.line), (c = e.lineStart), (a = e.position)),
          j(e, n, X, !0, t) && (v ? (m = e.result) : (x = e.result)),
          v || (R(e, s, p, h, m, x, o, c, a), (h = m = x = null)),
          y(e, !0, -1),
          (g = e.input.charCodeAt(e.position))),
        (e.line === l || e.lineIndent > n) && g !== 0)
      )
        f(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < n) break;
    }
    return (
      v && R(e, s, p, h, m, null, o, c, a),
      S && ((e.tag = u), (e.anchor = d), (e.kind = "mapping"), (e.result = s)),
      S
    );
  }
  function Or(e) {
    var n,
      i = !1,
      r = !1,
      t,
      l,
      o;
    if (((o = e.input.charCodeAt(e.position)), o !== 33)) return !1;
    if (
      (e.tag !== null && f(e, "duplication of a tag property"),
      (o = e.input.charCodeAt(++e.position)),
      o === 60
        ? ((i = !0), (o = e.input.charCodeAt(++e.position)))
        : o === 33
        ? ((r = !0), (t = "!!"), (o = e.input.charCodeAt(++e.position)))
        : (t = "!"),
      (n = e.position),
      i)
    ) {
      do o = e.input.charCodeAt(++e.position);
      while (o !== 0 && o !== 62);
      e.position < e.length
        ? ((l = e.input.slice(n, e.position)),
          (o = e.input.charCodeAt(++e.position)))
        : f(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; o !== 0 && !C(o); )
        o === 33 &&
          (r
            ? f(e, "tag suffix cannot contain exclamation marks")
            : ((t = e.input.slice(n - 1, e.position + 1)),
              mn.test(t) ||
                f(e, "named tag handle cannot contain such characters"),
              (r = !0),
              (n = e.position + 1))),
          (o = e.input.charCodeAt(++e.position));
      (l = e.input.slice(n, e.position)),
        Er.test(l) &&
          f(e, "tag suffix cannot contain flow indicator characters");
    }
    l && !gn.test(l) && f(e, "tag name cannot contain such characters: " + l);
    try {
      l = decodeURIComponent(l);
    } catch (c) {
      f(e, "tag name is malformed: " + l);
    }
    return (
      i
        ? (e.tag = l)
        : F.call(e.tagMap, t)
        ? (e.tag = e.tagMap[t] + l)
        : t === "!"
        ? (e.tag = "!" + l)
        : t === "!!"
        ? (e.tag = "tag:yaml.org,2002:" + l)
        : f(e, 'undeclared tag handle "' + t + '"'),
      !0
    );
  }
  function Nr(e) {
    var n, i;
    if (((i = e.input.charCodeAt(e.position)), i !== 38)) return !1;
    for (
      e.anchor !== null && f(e, "duplication of an anchor property"),
        i = e.input.charCodeAt(++e.position),
        n = e.position;
      i !== 0 && !C(i) && !D(i);

    )
      i = e.input.charCodeAt(++e.position);
    return (
      e.position === n &&
        f(e, "name of an anchor node must contain at least one character"),
      (e.anchor = e.input.slice(n, e.position)),
      !0
    );
  }
  function Dr(e) {
    var n, i, r;
    if (((r = e.input.charCodeAt(e.position)), r !== 42)) return !1;
    for (
      r = e.input.charCodeAt(++e.position), n = e.position;
      r !== 0 && !C(r) && !D(r);

    )
      r = e.input.charCodeAt(++e.position);
    return (
      e.position === n &&
        f(e, "name of an alias node must contain at least one character"),
      (i = e.input.slice(n, e.position)),
      F.call(e.anchorMap, i) || f(e, 'unidentified alias "' + i + '"'),
      (e.result = e.anchorMap[i]),
      y(e, !0, -1),
      !0
    );
  }
  function j(e, n, i, r, t) {
    var l,
      o,
      c,
      a = 1,
      u = !1,
      d = !1,
      s,
      p,
      h,
      m,
      x,
      v;
    if (
      (e.listener !== null && e.listener("open", e),
      (e.tag = null),
      (e.anchor = null),
      (e.kind = null),
      (e.result = null),
      (l = o = c = X === i || hn === i),
      r &&
        y(e, !0, -1) &&
        ((u = !0),
        e.lineIndent > n
          ? (a = 1)
          : e.lineIndent === n
          ? (a = 0)
          : e.lineIndent < n && (a = -1)),
      a === 1)
    )
      for (; Or(e) || Nr(e); )
        y(e, !0, -1)
          ? ((u = !0),
            (c = l),
            e.lineIndent > n
              ? (a = 1)
              : e.lineIndent === n
              ? (a = 0)
              : e.lineIndent < n && (a = -1))
          : (c = !1);
    if (
      (c && (c = u || t),
      (a === 1 || X === i) &&
        (J === i || pn === i ? (x = n) : (x = n + 1),
        (v = e.position - e.lineStart),
        a === 1
          ? (c && (Je(e, v) || Ir(e, v, x))) || Fr(e, x)
            ? (d = !0)
            : ((o && Mr(e, x)) || Tr(e, x) || _r(e, x)
                ? (d = !0)
                : Dr(e)
                ? ((d = !0),
                  (e.tag !== null || e.anchor !== null) &&
                    f(e, "alias node should not have any properties"))
                : Lr(e, x, J === i) &&
                  ((d = !0), e.tag === null && (e.tag = "?")),
              e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
          : a === 0 && (d = c && Je(e, v))),
      e.tag === null)
    )
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (
        e.result !== null &&
          e.kind !== "scalar" &&
          f(
            e,
            'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
              e.kind +
              '"'
          ),
          s = 0,
          p = e.implicitTypes.length;
        s < p;
        s += 1
      )
        if (((m = e.implicitTypes[s]), m.resolve(e.result))) {
          (e.result = m.construct(e.result)),
            (e.tag = m.tag),
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (F.call(e.typeMap[e.kind || "fallback"], e.tag))
        m = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (
          m = null,
            h = e.typeMap.multi[e.kind || "fallback"],
            s = 0,
            p = h.length;
          s < p;
          s += 1
        )
          if (e.tag.slice(0, h[s].tag.length) === h[s].tag) {
            m = h[s];
            break;
          }
      m || f(e, "unknown tag !<" + e.tag + ">"),
        e.result !== null &&
          m.kind !== e.kind &&
          f(
            e,
            "unacceptable node kind for !<" +
              e.tag +
              '> tag; it should be "' +
              m.kind +
              '", not "' +
              e.kind +
              '"'
          ),
        m.resolve(e.result, e.tag)
          ? ((e.result = m.construct(e.result, e.tag)),
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
          : f(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return (
      e.listener !== null && e.listener("close", e),
      e.tag !== null || e.anchor !== null || d
    );
  }
  function Rr(e) {
    var n = e.position,
      i,
      r,
      t,
      l = !1,
      o;
    for (
      e.version = null,
        e.checkLineBreaks = e.legacy,
        e.tagMap = Object.create(null),
        e.anchorMap = Object.create(null);
      (o = e.input.charCodeAt(e.position)) !== 0 &&
      (y(e, !0, -1),
      (o = e.input.charCodeAt(e.position)),
      !(e.lineIndent > 0 || o !== 37));

    ) {
      for (
        l = !0, o = e.input.charCodeAt(++e.position), i = e.position;
        o !== 0 && !C(o);

      )
        o = e.input.charCodeAt(++e.position);
      for (
        r = e.input.slice(i, e.position),
          t = [],
          r.length < 1 &&
            f(
              e,
              "directive name must not be less than one character in length"
            );
        o !== 0;

      ) {
        for (; I(o); ) o = e.input.charCodeAt(++e.position);
        if (o === 35) {
          do o = e.input.charCodeAt(++e.position);
          while (o !== 0 && !k(o));
          break;
        }
        if (k(o)) break;
        for (i = e.position; o !== 0 && !C(o); )
          o = e.input.charCodeAt(++e.position);
        t.push(e.input.slice(i, e.position));
      }
      o !== 0 && ke(e),
        F.call(ze, r)
          ? ze[r](e, r, t)
          : ee(e, 'unknown document directive "' + r + '"');
    }
    if (
      (y(e, !0, -1),
      e.lineIndent === 0 &&
      e.input.charCodeAt(e.position) === 45 &&
      e.input.charCodeAt(e.position + 1) === 45 &&
      e.input.charCodeAt(e.position + 2) === 45
        ? ((e.position += 3), y(e, !0, -1))
        : l && f(e, "directives end mark is expected"),
      j(e, e.lineIndent - 1, X, !1, !0),
      y(e, !0, -1),
      e.checkLineBreaks &&
        br.test(e.input.slice(n, e.position)) &&
        ee(e, "non-ASCII line breaks are interpreted as content"),
      e.documents.push(e.result),
      e.position === e.lineStart && re(e))
    ) {
      e.input.charCodeAt(e.position) === 46 &&
        ((e.position += 3), y(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      f(e, "end of the stream or a document separator is expected");
    else return;
  }
  function bn(e, n) {
    (e = String(e)),
      (n = n || {}),
      e.length !== 0 &&
        (e.charCodeAt(e.length - 1) !== 10 &&
          e.charCodeAt(e.length - 1) !== 13 &&
          (e += `
`),
        e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var i = new kr(e, n),
      r = e.indexOf("\0");
    for (
      r !== -1 && ((i.position = r), f(i, "null byte is not allowed in input")),
        i.input += "\0";
      i.input.charCodeAt(i.position) === 32;

    )
      (i.lineIndent += 1), (i.position += 1);
    for (; i.position < i.length - 1; ) Rr(i);
    return i.documents;
  }
  function jr(e, n, i) {
    n !== null &&
      typeof n == "object" &&
      typeof i == "undefined" &&
      ((i = n), (n = null));
    var r = bn(e, i);
    if (typeof n != "function") return r;
    for (var t = 0, l = r.length; t < l; t += 1) n(r[t]);
  }
  function Hr(e, n) {
    var i = bn(e, n);
    if (i.length !== 0) {
      if (i.length === 1) return i[0];
      throw new w("expected a single document in the stream, but found more");
    }
  }
  var Pr = jr,
    Br = Hr,
    En = { loadAll: Pr, load: Br },
    An = Object.prototype.toString,
    wn = Object.prototype.hasOwnProperty,
    Te = 65279,
    qr = 9,
    U = 10,
    Yr = 13,
    Ur = 32,
    $r = 33,
    Gr = 34,
    Ee = 35,
    Wr = 37,
    Kr = 38,
    Vr = 39,
    Qr = 42,
    Cn = 44,
    zr = 45,
    ne = 58,
    Zr = 61,
    Jr = 62,
    Xr = 63,
    et = 64,
    Sn = 91,
    kn = 93,
    nt = 96,
    Ln = 123,
    it = 124,
    Tn = 125,
    A = {};
  A[0] = "\\0";
  A[7] = "\\a";
  A[8] = "\\b";
  A[9] = "\\t";
  A[10] = "\\n";
  A[11] = "\\v";
  A[12] = "\\f";
  A[13] = "\\r";
  A[27] = "\\e";
  A[34] = '\\"';
  A[92] = "\\\\";
  A[133] = "\\N";
  A[160] = "\\_";
  A[8232] = "\\L";
  A[8233] = "\\P";
  var rt = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF",
    ],
    tt = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function ot(e, n) {
    var i, r, t, l, o, c, a;
    if (n === null) return {};
    for (i = {}, r = Object.keys(n), t = 0, l = r.length; t < l; t += 1)
      (o = r[t]),
        (c = String(n[o])),
        o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)),
        (a = e.compiledTypeMap.fallback[o]),
        a && wn.call(a.styleAliases, c) && (c = a.styleAliases[c]),
        (i[o] = c);
    return i;
  }
  function lt(e) {
    var n, i, r;
    if (((n = e.toString(16).toUpperCase()), e <= 255)) (i = "x"), (r = 2);
    else if (e <= 65535) (i = "u"), (r = 4);
    else if (e <= 4294967295) (i = "U"), (r = 8);
    else
      throw new w(
        "code point within a string may not be greater than 0xFFFFFFFF"
      );
    return "\\" + i + b.repeat("0", r - n.length) + n;
  }
  var ct = 1,
    G = 2;
  function at(e) {
    (this.schema = e.schema || fn),
      (this.indent = Math.max(1, e.indent || 2)),
      (this.noArrayIndent = e.noArrayIndent || !1),
      (this.skipInvalid = e.skipInvalid || !1),
      (this.flowLevel = b.isNothing(e.flowLevel) ? -1 : e.flowLevel),
      (this.styleMap = ot(this.schema, e.styles || null)),
      (this.sortKeys = e.sortKeys || !1),
      (this.lineWidth = e.lineWidth || 80),
      (this.noRefs = e.noRefs || !1),
      (this.noCompatMode = e.noCompatMode || !1),
      (this.condenseFlow = e.condenseFlow || !1),
      (this.quotingType = e.quotingType === '"' ? G : ct),
      (this.forceQuotes = e.forceQuotes || !1),
      (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
      (this.implicitTypes = this.schema.compiledImplicit),
      (this.explicitTypes = this.schema.compiledExplicit),
      (this.tag = null),
      (this.result = ""),
      (this.duplicates = []),
      (this.usedDuplicates = null);
  }
  function Xe(e, n) {
    for (
      var i = b.repeat(" ", n), r = 0, t = -1, l = "", o, c = e.length;
      r < c;

    )
      (t = e.indexOf(
        `
`,
        r
      )),
        t === -1
          ? ((o = e.slice(r)), (r = c))
          : ((o = e.slice(r, t + 1)), (r = t + 1)),
        o.length &&
          o !==
            `
` &&
          (l += i),
        (l += o);
    return l;
  }
  function Ae(e, n) {
    return (
      `
` + b.repeat(" ", e.indent * n)
    );
  }
  function ut(e, n) {
    var i, r, t;
    for (i = 0, r = e.implicitTypes.length; i < r; i += 1)
      if (((t = e.implicitTypes[i]), t.resolve(n))) return !0;
    return !1;
  }
  function ie(e) {
    return e === Ur || e === qr;
  }
  function W(e) {
    return (
      (32 <= e && e <= 126) ||
      (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
      (57344 <= e && e <= 65533 && e !== Te) ||
      (65536 <= e && e <= 1114111)
    );
  }
  function en(e) {
    return W(e) && e !== Te && e !== Yr && e !== U;
  }
  function nn(e, n, i) {
    var r = en(e),
      t = r && !ie(e);
    return (
      ((i
        ? r
        : r && e !== Cn && e !== Sn && e !== kn && e !== Ln && e !== Tn) &&
        e !== Ee &&
        !(n === ne && !t)) ||
      (en(n) && !ie(n) && e === Ee) ||
      (n === ne && t)
    );
  }
  function st(e) {
    return (
      W(e) &&
      e !== Te &&
      !ie(e) &&
      e !== zr &&
      e !== Xr &&
      e !== ne &&
      e !== Cn &&
      e !== Sn &&
      e !== kn &&
      e !== Ln &&
      e !== Tn &&
      e !== Ee &&
      e !== Kr &&
      e !== Qr &&
      e !== $r &&
      e !== it &&
      e !== Zr &&
      e !== Jr &&
      e !== Vr &&
      e !== Gr &&
      e !== Wr &&
      e !== et &&
      e !== nt
    );
  }
  function dt(e) {
    return !ie(e) && e !== ne;
  }
  function q(e, n) {
    var i = e.charCodeAt(n),
      r;
    return i >= 55296 &&
      i <= 56319 &&
      n + 1 < e.length &&
      ((r = e.charCodeAt(n + 1)), r >= 56320 && r <= 57343)
      ? (i - 55296) * 1024 + r - 56320 + 65536
      : i;
  }
  function _n(e) {
    var n = /^\n* /;
    return n.test(e);
  }
  var Fn = 1,
    we = 2,
    Mn = 3,
    In = 4,
    N = 5;
  function ft(e, n, i, r, t, l, o, c) {
    var a,
      u = 0,
      d = null,
      s = !1,
      p = !1,
      h = r !== -1,
      m = -1,
      x = st(q(e, 0)) && dt(q(e, e.length - 1));
    if (n || o)
      for (a = 0; a < e.length; u >= 65536 ? (a += 2) : a++) {
        if (((u = q(e, a)), !W(u))) return N;
        (x = x && nn(u, d, c)), (d = u);
      }
    else {
      for (a = 0; a < e.length; u >= 65536 ? (a += 2) : a++) {
        if (((u = q(e, a)), u === U))
          (s = !0),
            h && ((p = p || (a - m - 1 > r && e[m + 1] !== " ")), (m = a));
        else if (!W(u)) return N;
        (x = x && nn(u, d, c)), (d = u);
      }
      p = p || (h && a - m - 1 > r && e[m + 1] !== " ");
    }
    return !s && !p
      ? x && !o && !t(e)
        ? Fn
        : l === G
        ? N
        : we
      : i > 9 && _n(e)
      ? N
      : o
      ? l === G
        ? N
        : we
      : p
      ? In
      : Mn;
  }
  function pt(e, n, i, r, t) {
    e.dump = (function () {
      if (n.length === 0) return e.quotingType === G ? '""' : "''";
      if (!e.noCompatMode && (rt.indexOf(n) !== -1 || tt.test(n)))
        return e.quotingType === G ? '"' + n + '"' : "'" + n + "'";
      var l = e.indent * Math.max(1, i),
        o =
          e.lineWidth === -1
            ? -1
            : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - l),
        c = r || (e.flowLevel > -1 && i >= e.flowLevel);
      function a(u) {
        return ut(e, u);
      }
      switch (ft(n, c, e.indent, o, a, e.quotingType, e.forceQuotes && !r, t)) {
        case Fn:
          return n;
        case we:
          return "'" + n.replace(/'/g, "''") + "'";
        case Mn:
          return "|" + rn(n, e.indent) + tn(Xe(n, l));
        case In:
          return ">" + rn(n, e.indent) + tn(Xe(ht(n, o), l));
        case N:
          return '"' + mt(n) + '"';
        default:
          throw new w("impossible error: invalid scalar style");
      }
    })();
  }
  function rn(e, n) {
    var i = _n(e) ? String(n) : "",
      r =
        e[e.length - 1] ===
        `
`,
      t =
        r &&
        (e[e.length - 2] ===
          `
` ||
          e ===
            `
`),
      l = t ? "+" : r ? "" : "-";
    return (
      i +
      l +
      `
`
    );
  }
  function tn(e) {
    return e[e.length - 1] ===
      `
`
      ? e.slice(0, -1)
      : e;
  }
  function ht(e, n) {
    for (
      var i = /(\n+)([^\n]*)/g,
        r = (function () {
          var u = e.indexOf(`
`);
          return (
            (u = u !== -1 ? u : e.length),
            (i.lastIndex = u),
            on(e.slice(0, u), n)
          );
        })(),
        t =
          e[0] ===
            `
` || e[0] === " ",
        l,
        o;
      (o = i.exec(e));

    ) {
      var c = o[1],
        a = o[2];
      (l = a[0] === " "),
        (r +=
          c +
          (!t && !l && a !== ""
            ? `
`
            : "") +
          on(a, n)),
        (t = l);
    }
    return r;
  }
  function on(e, n) {
    if (e === "" || e[0] === " ") return e;
    for (var i = / [^ ]/g, r, t = 0, l, o = 0, c = 0, a = ""; (r = i.exec(e)); )
      (c = r.index),
        c - t > n &&
          ((l = o > t ? o : c),
          (a +=
            `
` + e.slice(t, l)),
          (t = l + 1)),
        (o = c);
    return (
      (a += `
`),
      e.length - t > n && o > t
        ? (a +=
            e.slice(t, o) +
            `
` +
            e.slice(o + 1))
        : (a += e.slice(t)),
      a.slice(1)
    );
  }
  function mt(e) {
    for (var n = "", i = 0, r, t = 0; t < e.length; i >= 65536 ? (t += 2) : t++)
      (i = q(e, t)),
        (r = A[i]),
        !r && W(i)
          ? ((n += e[t]), i >= 65536 && (n += e[t + 1]))
          : (n += r || lt(i));
    return n;
  }
  function gt(e, n, i) {
    var r = "",
      t = e.tag,
      l,
      o,
      c;
    for (l = 0, o = i.length; l < o; l += 1)
      (c = i[l]),
        e.replacer && (c = e.replacer.call(i, String(l), c)),
        (L(e, n, c, !1, !1) ||
          (typeof c == "undefined" && L(e, n, null, !1, !1))) &&
          (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), (r += e.dump));
    (e.tag = t), (e.dump = "[" + r + "]");
  }
  function ln(e, n, i, r) {
    var t = "",
      l = e.tag,
      o,
      c,
      a;
    for (o = 0, c = i.length; o < c; o += 1)
      (a = i[o]),
        e.replacer && (a = e.replacer.call(i, String(o), a)),
        (L(e, n + 1, a, !0, !0, !1, !0) ||
          (typeof a == "undefined" && L(e, n + 1, null, !0, !0, !1, !0))) &&
          ((!r || t !== "") && (t += Ae(e, n)),
          e.dump && U === e.dump.charCodeAt(0) ? (t += "-") : (t += "- "),
          (t += e.dump));
    (e.tag = l), (e.dump = t || "[]");
  }
  function xt(e, n, i) {
    var r = "",
      t = e.tag,
      l = Object.keys(i),
      o,
      c,
      a,
      u,
      d;
    for (o = 0, c = l.length; o < c; o += 1)
      (d = ""),
        r !== "" && (d += ", "),
        e.condenseFlow && (d += '"'),
        (a = l[o]),
        (u = i[a]),
        e.replacer && (u = e.replacer.call(i, a, u)),
        L(e, n, a, !1, !1) &&
          (e.dump.length > 1024 && (d += "? "),
          (d +=
            e.dump +
            (e.condenseFlow ? '"' : "") +
            ":" +
            (e.condenseFlow ? "" : " ")),
          L(e, n, u, !1, !1) && ((d += e.dump), (r += d)));
    (e.tag = t), (e.dump = "{" + r + "}");
  }
  function vt(e, n, i, r) {
    var t = "",
      l = e.tag,
      o = Object.keys(i),
      c,
      a,
      u,
      d,
      s,
      p;
    if (e.sortKeys === !0) o.sort();
    else if (typeof e.sortKeys == "function") o.sort(e.sortKeys);
    else if (e.sortKeys)
      throw new w("sortKeys must be a boolean or a function");
    for (c = 0, a = o.length; c < a; c += 1)
      (p = ""),
        (!r || t !== "") && (p += Ae(e, n)),
        (u = o[c]),
        (d = i[u]),
        e.replacer && (d = e.replacer.call(i, u, d)),
        L(e, n + 1, u, !0, !0, !0) &&
          ((s =
            (e.tag !== null && e.tag !== "?") ||
            (e.dump && e.dump.length > 1024)),
          s &&
            (e.dump && U === e.dump.charCodeAt(0) ? (p += "?") : (p += "? ")),
          (p += e.dump),
          s && (p += Ae(e, n)),
          L(e, n + 1, d, !0, s) &&
            (e.dump && U === e.dump.charCodeAt(0) ? (p += ":") : (p += ": "),
            (p += e.dump),
            (t += p)));
    (e.tag = l), (e.dump = t || "{}");
  }
  function cn(e, n, i) {
    var r, t, l, o, c, a;
    for (
      t = i ? e.explicitTypes : e.implicitTypes, l = 0, o = t.length;
      l < o;
      l += 1
    )
      if (
        ((c = t[l]),
        (c.instanceOf || c.predicate) &&
          (!c.instanceOf ||
            (typeof n == "object" && n instanceof c.instanceOf)) &&
          (!c.predicate || c.predicate(n)))
      ) {
        if (
          (i
            ? c.multi && c.representName
              ? (e.tag = c.representName(n))
              : (e.tag = c.tag)
            : (e.tag = "?"),
          c.represent)
        ) {
          if (
            ((a = e.styleMap[c.tag] || c.defaultStyle),
            An.call(c.represent) === "[object Function]")
          )
            r = c.represent(n, a);
          else if (wn.call(c.represent, a)) r = c.represent[a](n, a);
          else
            throw new w(
              "!<" + c.tag + '> tag resolver accepts not "' + a + '" style'
            );
          e.dump = r;
        }
        return !0;
      }
    return !1;
  }
  function L(e, n, i, r, t, l, o) {
    (e.tag = null), (e.dump = i), cn(e, i, !1) || cn(e, i, !0);
    var c = An.call(e.dump),
      a = r,
      u;
    r && (r = e.flowLevel < 0 || e.flowLevel > n);
    var d = c === "[object Object]" || c === "[object Array]",
      s,
      p;
    if (
      (d && ((s = e.duplicates.indexOf(i)), (p = s !== -1)),
      ((e.tag !== null && e.tag !== "?") || p || (e.indent !== 2 && n > 0)) &&
        (t = !1),
      p && e.usedDuplicates[s])
    )
      e.dump = "*ref_" + s;
    else {
      if (
        (d && p && !e.usedDuplicates[s] && (e.usedDuplicates[s] = !0),
        c === "[object Object]")
      )
        r && Object.keys(e.dump).length !== 0
          ? (vt(e, n, e.dump, t), p && (e.dump = "&ref_" + s + e.dump))
          : (xt(e, n, e.dump), p && (e.dump = "&ref_" + s + " " + e.dump));
      else if (c === "[object Array]")
        r && e.dump.length !== 0
          ? (e.noArrayIndent && !o && n > 0
              ? ln(e, n - 1, e.dump, t)
              : ln(e, n, e.dump, t),
            p && (e.dump = "&ref_" + s + e.dump))
          : (gt(e, n, e.dump), p && (e.dump = "&ref_" + s + " " + e.dump));
      else if (c === "[object String]") e.tag !== "?" && pt(e, e.dump, n, l, a);
      else {
        if (c === "[object Undefined]") return !1;
        if (e.skipInvalid) return !1;
        throw new w("unacceptable kind of an object to dump " + c);
      }
      e.tag !== null &&
        e.tag !== "?" &&
        ((u = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(
          /!/g,
          "%21"
        )),
        e.tag[0] === "!"
          ? (u = "!" + u)
          : u.slice(0, 18) === "tag:yaml.org,2002:"
          ? (u = "!!" + u.slice(18))
          : (u = "!<" + u + ">"),
        (e.dump = u + " " + e.dump));
    }
    return !0;
  }
  function yt(e, n) {
    var i = [],
      r = [],
      t,
      l;
    for (Ce(e, i, r), t = 0, l = r.length; t < l; t += 1)
      n.duplicates.push(i[r[t]]);
    n.usedDuplicates = new Array(l);
  }
  function Ce(e, n, i) {
    var r, t, l;
    if (e !== null && typeof e == "object")
      if (((t = n.indexOf(e)), t !== -1)) i.indexOf(t) === -1 && i.push(t);
      else if ((n.push(e), Array.isArray(e)))
        for (t = 0, l = e.length; t < l; t += 1) Ce(e[t], n, i);
      else
        for (r = Object.keys(e), t = 0, l = r.length; t < l; t += 1)
          Ce(e[r[t]], n, i);
  }
  function bt(e, n) {
    n = n || {};
    var i = new at(n);
    i.noRefs || yt(e, i);
    var r = e;
    return (
      i.replacer && (r = i.replacer.call({ "": r }, "", r)),
      L(i, 0, r, !0, !0)
        ? i.dump +
          `
`
        : ""
    );
  }
  var Et = bt,
    At = { dump: Et };
  function _e(e, n) {
    return function () {
      throw new Error(
        "Function yaml." +
          e +
          " is removed in js-yaml 4. Use yaml." +
          n +
          " instead, which is now safe by default."
      );
    };
  }
  var On = En.load,
    Kt = En.loadAll,
    Vt = At.dump;
  var Qt = _e("safeLoad", "load"),
    zt = _e("safeLoadAll", "loadAll"),
    Zt = _e("safeDump", "dump");
  var K = class extends Error {},
    V = class extends Error {};
  var wt =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
  function Ct(e) {
    return On(e);
  }
  var te = class {
    run(n, i) {
      return T(this, null, function* () {
        try {
          let r = this.parseLinkMetadataFromYaml(n);
          i.appendChild(this.genLinkEl(r));
        } catch (r) {
          r instanceof V
            ? i.appendChild(this.genErrorEl(r.message))
            : r instanceof K
            ? i.appendChild(this.genErrorEl(r.message))
            : r instanceof TypeError
            ? (i.appendChild(
                this.genErrorEl("internal links must be surrounded by quotes.")
              ),
              console.log(r))
            : console.log("Code Block: cardlink unknown error", r);
        }
      });
    }
    parseLinkMetadataFromYaml(n) {
      let i,
        r = -1;
      n = n.split(/\r?\n|\r|\n/g).map((t) =>
        t.replace(/^\t+/g, (l) => {
          let o = l.length;
          return r < 0 && (r = o), " ".repeat(o);
        })
      ).join(`
`);
      try {
        i = Ct(n);
      } catch (t) {
        throw (
          (console.log(t),
          new K("failed to parse yaml. Check debug console for more detail."))
        );
      }
      if (!i || !i.url || !i.title)
        throw new V("required params[url, title] are not found.");
      return {
        url: i.url,
        title: i.title,
        description: i.description,
        host: i.host,
        favicon: i.favicon,
        image: i.image,
        indent: r,
      };
    }
    genErrorEl(n) {
      let i = document.createElement("div");
      i.addClass("auto-card-link-error-container");
      let r = document.createElement("span");
      return (r.textContent = `cardlink error: ${n}`), i.appendChild(r), i;
    }
    genLinkEl(n) {
      let i = document.createElement("div");
      i.addClass("auto-card-link-container"),
        i.setAttr("data-auto-card-link-depth", n.indent);
      let r = document.createElement("a");
      r.addClass("auto-card-link-card"),
        r.setAttr("href", n.url),
        i.appendChild(r);
      let t = document.createElement("div");
      t.addClass("auto-card-link-main"), r.appendChild(t);
      let l = document.createElement("div");
      if (
        (l.addClass("auto-card-link-title"),
        (l.textContent = n.title),
        t.appendChild(l),
        n.description)
      ) {
        let a = document.createElement("div");
        a.addClass("auto-card-link-description"),
          (a.textContent = n.description),
          t.appendChild(a);
      }
      let o = document.createElement("div");
      if ((o.addClass("auto-card-link-host"), t.appendChild(o), n.favicon)) {
        let a = document.createElement("img");
        a.addClass("auto-card-link-favicon"),
          a.setAttr("src", n.favicon),
          o.appendChild(a);
      }
      if (n.host) {
        let a = document.createElement("span");
        (a.textContent = n.host), o.appendChild(a);
      }
      if (n.image) {
        let a = document.createElement("img");
        a.addClass("auto-card-link-thumbnail"),
          a.setAttr("src", n.image),
          a.setAttr("draggable", "false"),
          r.appendChild(a);
      }
      let c = document.createElement("button");
      return (
        (c.innerHTML = wt),
        (c.title = "Copy URL"),
        c.classList.add("auto-card-link-copy-url"),
        c.classList.add("clickable-icon"),
        (c.onclick = () => {
          navigator.clipboard.writeText(n.url),
            vercelToast.createToast("Copied URL to clipboard", {
              timeout: 1500,
              type: "dark",
            });
        }),
        i.appendChild(c),
        i
      );
    }
  };
  var St = /\[([^\]]*)\]\(([^\(]*)\)/g,
    Fe = { a: 2, b: 2, c: 2, d: 3, e: 3, f: 4, g: 4, h: 3, i: 4 },
    Nn = (e, n, i, r) => {
      let t = n.createEl("a");
      (t.href = e.link),
        (t.dataset.lightbox = i),
        e.alt && (t.dataset.title = e.alt);
      let l = t.createEl("img");
      (l.src = e.link), e.alt && (l.alt = e.alt);
    },
    kt = (e, n) => {
      e = e != null ? e : "640x480";
      let i = n.createEl("img");
      i.src = `https://via.placeholder.com/${e}`;
    },
    Dn = (e, n, i) => {
      let r = Fe[n];
      if (e.length < r)
        for (let o = e.length; o < r; o++) e.push({ type: "placeholder" });
      e.length > r && (e = e.slice(0, r));
      let t = i.createEl("div", {
          cls: `image-layouts-grid image-layouts-layout-${n}`,
        }),
        l = Math.random().toString(36).substring(7);
      e.forEach((o, c) => {
        let a = t.createEl("div", { cls: `image-layouts-image-${c}` });
        o.type === "external"
          ? Nn(o, a, l, c)
          : o.type === "placeholder" && kt("640x480", a);
      });
    },
    Lt = (e) => {
      let n = [...e.trim().matchAll(St)];
      if (n.length > 0) {
        let i = n[0],
          r = i[1],
          t = i[2];
        if (t) return { type: "external", link: t, alt: r || void 0 };
      }
      return console.log("not match ", e), null;
    },
    Me = (e) =>
      e
        .split(
          `
`
        )
        .filter((r) => r.startsWith("!"))
        .map((r) => Lt(r))
        .filter((r) => r !== null),
    Rn = (e, n, i) => {
      let r = i.createEl("div", { cls: `image-layouts-masonry-grid-${n}` }),
        t = [];
      for (let o = 0; o < n; o++) {
        let c = r.createEl("div", { cls: "image-layouts-masonry-column" });
        t.push(c);
      }
      let l = Math.random().toString(36).substring(7);
      e.forEach((o, c) => {
        let a = c % n,
          u = t[a].createEl("div", { cls: `image-layouts-masonry-image-${c}` });
        o.type === "external" && Nn(o, u, l, c);
      });
    };
  var oe = class {
    constructor() {
      this.load();
    }
    onLoad() {
      publish.registerMarkdownPostProcessor((n, i) => {
        let r = n.querySelectorAll("code");
        for (let t = 0; t < r.length; t++) {
          let l = r.item(t),
            o = l.innerText.trim();
          o[0] === ":" && o[o.length - 1] === ":" && i.addChild(new B(l, o));
        }
      }),
        publish.registerMarkdownCodeBlockProcessor("csv", (n, i, r) => {
          let t = n
              .split(
                `
`
              )
              .filter((c) => c.length > 0),
            o = i.createEl("table").createEl("tbody");
          for (let c = 0; c < t.length; c++) {
            let a = t[c].split(","),
              u = o.createEl("tr");
            for (let d = 0; d < a.length; d++) u.createEl("td", { text: a[d] });
          }
        }),
        Object.keys(Fe).forEach((n) => {
          publish.registerMarkdownCodeBlockProcessor(
            `image-layout-${n}`,
            (i, r, t) => {
              let l = Me(i);
              Dn(l, n, r);
            }
          );
        });
      for (let n = 2; n <= 6; n++)
        publish.registerMarkdownCodeBlockProcessor(
          `image-layout-masonry-${n}`,
          (i, r, t) => {
            let l = Me(i);
            Rn(l, n, r);
          }
        );
      publish.registerMarkdownCodeBlockProcessor("cardlink", (n, i) =>
        T(this, null, function* () {
          yield new te().run(n, i);
        })
      ),
        publish.registerMarkdownPostProcessor((n, i) =>
          T(this, null, function* () {
            let r = n.querySelectorAll("code[data-gist-id]");
            if (r.length === 0) return;
            let t = (l) =>
              T(this, null, function* () {
                l.childNodes.length === 0 &&
                  window.GistEmbed &&
                  setTimeout(() => {
                    window.GistEmbed.init();
                  }, 100);
              });
            for (let l of r) yield t(l);
          })
        );
    }
    onUnload() {}
    load() {
      this.onLoad();
    }
    unload() {
      this.onUnload();
    }
    getFilePathsByName(n) {
      return [n];
    }
  };
  var Hn = () => {
      let e = new Set();
      return {
        add: (r) => {
          e.add(r);
        },
        fire: () => {
          e.forEach((r) => r()), e.clear();
        },
      };
    },
    jn = (e, n, i, r = !1) => {
      let t = Hn(),
        l = i(),
        o = (a) => {
          let u = n(a, l);
          typeof u == "function" && t.add(u);
        };
      r && o(l);
      let c = e(() => {
        let a = i();
        a !== l && (t.fire(), o(a), (l = a));
      });
      return () => {
        t.fire(), c();
      };
    },
    Pn = (e, n) => {
      let i = new Set();
      return {
        listeners: i,
        get: () => e,
        set: (r) => {
          e !== r && ((e = r), n == null || n(), i.forEach((t) => t()));
        },
        subscribe: (r) => (i.add(r), () => void i.delete(r)),
      };
    },
    Tt = (e) => {
      let { get: n, set: i, subscribe: r } = e,
        t = {
          get value() {
            return n();
          },
          set value(l) {
            t.set(l);
          },
          set: (l) => i(l),
          update: (l) => t.set(l(n())),
          subscribe: (l) => jn(r, l, n),
          watch: (l) => jn(r, l, n, !0),
        };
      return t;
    },
    H = Symbol(),
    _t = (e) =>
      Array.isArray(e)
        ? e.slice()
        : Object.create(
            Object.getPrototypeOf(e),
            Object.getOwnPropertyDescriptors(e)
          );
  function Oe(e, n, i = !1, r = 0) {
    if (r === n.length) return e;
    let t = n[r];
    return i && !e[t] && (e[t] = {}), Oe(e[t], n, i, r + 1);
  }
  function Bn(e, n, i, r = 0) {
    if (r === n.length) return i;
    let t = n[r],
      l = e[t],
      o = Bn(l, n, i, r + 1);
    if (o === l) return e;
    let c = _t(e);
    return (c[t] = o), c;
  }
  var Ft = (e, n) => (i, r) =>
      r ? (n(r(e)), i()) : (n(i.subscribe(e)), i.value),
    Mt = (e, n) => {
      let { get: i, set: r, listeners: t } = e,
        { add: l, fire: o } = Hn(),
        c = !0,
        a = Ft(() => {
          t.size ? u() : (c = !0);
        }, l),
        u = () => {
          o(), (c = !1), r(n(a));
        };
      e.get = () => (c && u(), i());
    },
    qn = (e) =>
      new Proxy(
        {},
        {
          get: (n, i) => {
            if (i === H) return e;
            let r = e.slice();
            return r.push(i), qn(r);
          },
        }
      ),
    It = qn([]),
    Ot = (e, n, i) => {
      let r = Oe(e, n, !0),
        t = r && r[H];
      return t || (r[H] = i());
    },
    Nt =
      (e, n = []) =>
      (i) => {
        let r = typeof i == "function" ? i(It)[H] : [i];
        e.cache || (e.cache = {});
        let t = n.concat(r),
          { get: l } = e,
          o = {
            listeners: e.listeners,
            subscribe: e.subscribe,
            isStream: e.isStream,
            get: () => {
              let c = l();
              return c ? Oe(c, t) : void 0;
            },
            set: (c) => e.atom.set(Bn(l(), t, c)),
          };
        return Ot(e.cache, t, () => Ne(o, e, t));
      },
    Dt = (e) => (n, i) => {
      let r,
        t = Pn(),
        l = !0,
        o = () => {
          t.listeners.size ? c() : (l = !0);
        },
        c = () => {
          let a = e.get(),
            u = n(a, r);
          (l = !1), (i && !u) || (t.set(u), (r = u));
        };
      return Ne({
        get: () => (!e.isStream && l && c(), t.get()),
        set: t.set,
        listeners: t.listeners,
        isStream: i || e.isStream,
        subscribe: (a) => {
          let u = e.subscribe(o),
            d = t.subscribe(a);
          return () => {
            d(), t.listeners.size || u();
          };
        },
      });
    },
    Ne = (e, n = e, i = []) => {
      let r = Tt(e);
      return (r.focus = Nt(n, i)), (r.map = Dt(e)), (r[H] = e), (e.atom = r), r;
    };
  function O(e, n) {
    let i = typeof e == "function",
      r = Pn(i ? void 0 : e, () => Ie.send(t));
    (r.isStream = !arguments.length), i && Mt(r, e);
    let t = Ne(r);
    O.plugins.forEach((o) => o(t));
    let l = n == null ? void 0 : n(t);
    return (
      Object.defineProperty(t, "actions", {
        get() {
          return Ie.wrap(l, t);
        },
      }),
      t
    );
  }
  O.plugins = [];
  var Ie = { send: (e) => {}, wrap: (e, n) => e };
  O.internal = { symbol: H, devtools: Ie };
  var P = O(!0),
    Yn =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>',
    Un =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>',
    $n = () => {
      let e = document.querySelector(
        "body > div > div.site-body > div.site-body-center-column"
      );
      e.style.position = "relative";
      let n = document.createElement("button");
      (n.innerHTML = P.value ? Yn : Un),
        (n.style.position = "absolute"),
        (n.style.top = "50px"),
        (n.style.left = "-20px"),
        (n.className = "focus-btn hidden md:block"),
        (n.title = "Toggle Focus Mode"),
        (n.type = "button"),
        e.appendChild(n);
      let i = document.querySelector(
          "body > div > div.site-body > div.site-body-left-column"
        ),
        r = document.querySelector(
          "body > div > div.site-body > div.site-body-center-column > div.render-container > div.site-body-right-column"
        ),
        t = document.querySelector(".markdown-preview-sizer "),
        l = document.querySelector("body");
      n.onclick = function (o) {
        P.update((c) => !c),
          (n.innerHTML = P.value ? Yn : Un),
          P.value
            ? (i.classList.remove("md:hidden"),
              r.classList.remove("md:!hidden"),
              t.style.removeProperty("margin"),
              (n.style.left = "-20px"),
              l.removeAttribute("data-focus-mode"))
            : (i.addClasses(["md:hidden"]),
              r.addClasses(["md:!hidden"]),
              (t.style.margin = "auto"),
              (n.style.left = "0px"),
              l.setAttribute("data-focus-mode", "true"));
      };
    };
  var De = O(!1),
    Gn = () => {
      let e = document.querySelector(".site-header > div.clickable-icon"),
        n = e.cloneNode(!0);
      document.querySelector(".site-header").appendChild(n);
      let r = document.querySelector("div.published-container");
      (n.onclick = function (t) {
        let l = r.classList.contains("is-left-column-open");
        r.classList.remove("is-left-column-open"),
          De.update((o) => !o),
          De.value
            ? r.classList.add("is-right-column-open")
            : l || r.classList.remove("is-right-column-open");
      }),
        (e.onclick = function (t) {
          r.classList.remove("is-right-column-open"), De.update(() => !1);
        }),
        window.addEventListener("locationchange", function (t) {
          let l = document.querySelector("body");
          r.classList.remove("is-right-column-open");
        });
    };
  var Wn = () => {
    document.querySelectorAll("div.mermaid").forEach((n) => {
      if (
        n.parentElement &&
        !n.parentElement.classList.contains("relative") &&
        n.parentElement.tagName !== "BODY"
      ) {
        n.parentElement.classList.add("relative");
        let i = document.createElement("div");
        i.className =
          "absolute bottom-3 right-3 flex flex-row items-center gap-2";
        let r = n.querySelector("svg");
        r.style.removeProperty("max-width"),
          n.addClasses([
            "max-w-[calc(min(100vw,var(--page-width))-2*var(--page-side-padding))]",
            "md:max-w-[calc(100vw-var(--sidebar-left-width)-2*var(--page-side-padding))]",
            "lg:max-w-[calc(100vw-var(--sidebar-right-width)-var(--sidebar-left-width)-2*var(--page-side-padding))]",
          ]);
        let t = document.createElement("button");
        (t.innerHTML = "+"),
          (t.onclick = (o) => {
            let c = r.clientWidth * 1.1;
            r.style.width = `${r.clientWidth * 1.1}px`;
            let a =
              Number(r.getAttribute("height")) /
              Number(r.getAttribute("width"));
            r.style.height = `${c * a}px`;
          }),
          (t.title = "Zoom In"),
          i.appendChild(t);
        let l = document.createElement("button");
        (l.innerHTML = "-"),
          (l.title = "Zoom Out"),
          (l.onclick = (o) => {
            let c = r.clientWidth / 1.1;
            r.style.width = `${r.clientWidth / 1.1}px`;
            let a =
              Number(r.getAttribute("height")) /
              Number(r.getAttribute("width"));
            r.style.height = `${c * a}px`;
          }),
          i.appendChild(l),
          n.parentElement.appendChild(i);
      }
    });
  };
  P.subscribe((e) => {
    let n = document.querySelectorAll("div.mermaid");
    e
      ? n.forEach((i) => {
          i.addClasses([
            "md:max-w-[calc(100vw-var(--sidebar-left-width)-2*var(--page-side-padding))]",
            "lg:max-w-[calc(100vw-var(--sidebar-right-width)-var(--sidebar-left-width)-2*var(--page-side-padding))]",
          ]);
        })
      : n.forEach((i) => {
          i.removeClasses([
            "md:max-w-[calc(100vw-var(--sidebar-left-width)-2*var(--page-side-padding))]",
            "lg:max-w-[calc(100vw-var(--sidebar-right-width)-var(--sidebar-left-width)-2*var(--page-side-padding))]",
          ]);
        });
  });
  var Kn = () => {
    let e = document.querySelector(
        'div p img[alt~="banner"], div p img[alt~="banner+tall"], div p img[alt~="banner+small"]'
      ),
      n = e == null ? void 0 : e.closest(".markdown-embed");
    if (!e) return;
    let i = e.closest("div"),
      t = e.closest(".markdown-preview-view ").querySelector(".mod-header");
    t.insertBefore(e, t.firstChild), i.remove();
  };
  document.getElementsByClassName("site-footer")[0].innerHTML =
    '<div style="text-align: center "><a href="https://www.buymeacoffee.com/yomaru" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 110px !important;" ></a></div>';
  document
    .querySelector(".published-container")
    .style.setProperty("--footer-display", "block");
  var ae = document.createElement("script");
  ae.defer = !0;
  ae.setAttribute("data-domain", "yomaru.dev");
  ae.src = "https://sendfox.com/js/form.js";
  document.head.appendChild(ae);
  var Q = document.createElement("script");
  Q.defer = !0;
  Q.setAttribute("data-domain", "yomaru.dev");
  Q.src = "https://plausible.io/js/plausible.js";
  document.head.appendChild(Q);
  Q.onload = function () {
    console.log("plausible loaded");
  };
  window.SubstackFeedWidget = {
    substackUrl: "yomaru.substack.com",
    posts: 3,
    hidden: ["author"],
    colors: { primary: "#FFFFFF", secondary: "#9A9A9A", background: "#151515" },
  };
  window.CustomSubstackWidget = {
    substackUrl: "yomaru.substack.com",
    placeholder: "example@gmail.com",
    buttonText: "Subscribe",
    theme: "custom",
    colors: {
      primary: "#8B6CEF",
      input: "#1E1E1E",
      email: "#FFFFFF",
      text: "#FFFFFF",
    },
  };
  var He = document.createElement("script");
  He.setAttribute("data-domain", "yomaru.dev");
  He.src =
    "https://cdn.jsdelivr.net/gh/bvanderhoof/gist-embed@master/dist/gist-embed.min.js";
  document.head.appendChild(He);
  var ue = document.createElement("link");
  ue.setAttribute("data-domain", "yomaru.dev");
  ue.href = "https://unpkg.com/vercel-toast/dist/vercel-toast.css";
  ue.rel = "stylesheet";
  document.head.appendChild(ue);
  var se = document.createElement("script");
  se.setAttribute("data-domain", "yomaru.dev");
  se.src = "https://unpkg.com/vercel-toast";
  se.defer = !0;
  document.head.appendChild(se);
  var de = document.createElement("script");
  de.setAttribute("data-domain", "yomaru.dev");
  de.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(de);
  $e();
  de.onload = function () {
    let e = tailwind;
    console.log("tailwind loaded", e),
      (e.config = Ue(Ye({}, e.config), {
        corePlugins: { preflight: !1 },
        theme: { screens: { md: "750px", lg: "1000px" } },
      }));
  };
  var fe = document.createElement("link");
  fe.setAttribute("data-domain", "yomaru.dev");
  fe.href =
    "https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css";
  fe.rel = "stylesheet";
  document.head.appendChild(fe);
  var pe = document.createElement("script");
  pe.setAttribute("data-domain", "yomaru.dev");
  pe.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox-plus-jquery.min.js";
  pe.defer = !0;
  document.head.appendChild(pe);
  var Pe = document.createElement("script");
  Pe.setAttribute("data-domain", "yomaru.dev");
  Pe.src =
    "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js";
  document.head.appendChild(Pe);
  var he = document.createElement("link");
  he.setAttribute("data-domain", "yomaru.dev");
  he.href =
    "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css";
  he.rel = "stylesheet";
  document.head.appendChild(he);
  var me = document.createElement("script");
  me.setAttribute("data-domain", "yomaru.dev");
  me.defer = !0;
  me.src =
    "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js";
  me.onload = function () {
    $("img").magnificPopup({ type: "image" });
  };
  var z = document.createElement("script");
  z.defer = !0;
  z.setAttribute("data-domain", "yomaru.dev");
  z.src = "https://widget.senja.io/embed/frame.js";
  document.head.appendChild(z);
  z.onload = function () {
    console.log("senja loaded");
  };
  var Z = document.createElement("script");
  Z.defer = !0;
  Z.setAttribute("data-domain", "yomaru.dev");
  Z.src = "https://static.senja.io/dist/platform.js";
  document.head.appendChild(Z);
  Z.onload = function () {
    console.log("senja2 loaded");
  };
  (() => {
    let e = history.pushState;
    history.pushState = function () {
      let r = e.apply(this, arguments);
      return (
        window.dispatchEvent(new Event("pushstate")),
        window.dispatchEvent(new Event("locationchange")),
        r
      );
    };
    let n = history.replaceState;
    (history.replaceState = function () {
      let r = n.apply(this, arguments);
      return (
        window.dispatchEvent(new Event("replacestate")),
        window.dispatchEvent(new Event("locationchange")),
        r
      );
    }),
      window.addEventListener("popstate", () => {
        window.dispatchEvent(new Event("locationchange"));
      });
  })();
  window.addEventListener("locationchange", function (e) {
    console.log("location changed!", window.location.href),
      document
        .querySelector(".published-container")
        .classList.remove("is-left-column-open");
  });
  new oe();
  var Vn = () => {
    console.log("DOMContentLoaded already loaded");
  };
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", Vn)
    : Vn();
  $n();
  Gn();
  var Bt = document.querySelectorAll("div.list-item.published-section-header");
  Bt.forEach((e) => {
    e.classList.remove("list-item");
  });
  var Re,
    le,
    ce,
    je = new WeakMap(),
    qt = new MutationObserver((mutations) =>
      T(void 0, null, function* () {
        mutations.forEach((e) => {
          e.type === "childList" &&
            document.querySelectorAll("table").forEach((i) => {
              if (!je.has(i)) {
                Yt(i);
                let r = Array.from(i.querySelectorAll("tr:has(td)"));
                je.set(i, r);
              }
            });
        }),
          Wn(),
          Kn(),
          Re
            ? eval(Re)
            : yield fetch("https://iframely.net/embed.js")
                .then((e) => e.text())
                .then((text) => {
                  (Re = text), eval(text);
                });
        let gistCodeElements = document.querySelectorAll("code[data-gist-id]");
        gistCodeElements.forEach((e) => {
          var i;
          let n = e.childNodes;
          n.length !== 0 &&
            ((i = e.parentNode) == null || i.replaceChild(n[0], e));
        });
        let my2Elements = document.querySelectorAll(".gist .my-2");
        my2Elements.forEach((e) => {
          e.classList.remove("my-2");
        });
        let substackFeedEmbedElement = document.querySelector(
          "#substack-feed-embed"
        );
        le ||
          (yield fetch("https://substackapi.com/embeds/feed.js")
            .then((e) => e.text())
            .then((e) => {
              le = e;
            })),
          le &&
            substackFeedEmbedElement &&
            substackFeedEmbedElement.innerHTML === "" &&
            eval(le);
        let substackWidgetElement = document.querySelector(
          "#custom-substack-embed"
        );
        ce ||
          (yield fetch("https://substackapi.com/widget.js")
            .then((e) => e.text())
            .then((e) => {
              ce = e;
            })),
          ce &&
            substackWidgetElement &&
            substackWidgetElement.innerHTML === "" &&
            eval(ce);
      })
    );
  qt.observe(document.body, { childList: !0, subtree: !0 });
  function Yt(e) {
    e.querySelectorAll("th").forEach((n) => {
      n.addEventListener("click", () => {
        let i = Array.prototype.indexOf.call(n.parentElement.children, n),
          r = n.classList.contains("th-sort-asc"),
          t = n.classList.contains("th-sort-desc"),
          l = null;
        !r && !t ? (l = "asc") : r && (l = "desc"), Ut(e, i, l);
      });
    });
  }
  function Ut(e, n, i = null) {
    let r = i === "asc" ? 1 : -1,
      t = e.tBodies[0],
      l;
    for (
      i !== null
        ? ((l = Array.from(t.querySelectorAll("tr:has(td)"))),
          (l = l.sort((o, c) => {
            let a = o
                .querySelector(`td:nth-child(${n + 1})`)
                .textContent.trim(),
              u = c.querySelector(`td:nth-child(${n + 1})`).textContent.trim();
            return a > u ? 1 * r : -1 * r;
          })))
        : (l = je.get(e));
      t.firstChild;

    )
      t.removeChild(t.firstChild);
    t.append(...l),
      e
        .querySelectorAll("th")
        .forEach((o) => o.classList.remove("th-sort-asc", "th-sort-desc")),
      i !== null &&
        (e
          .querySelector(`th:nth-child(${n + 1})`)
          .classList.toggle("th-sort-asc", i === "asc"),
        e
          .querySelector(`th:nth-child(${n + 1})`)
          .classList.toggle("th-sort-desc", i === "desc"));
  }
})();
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/

```

## Data Engineering Wiki

[dataengineering.wiki > Index - Data Engineering Wiki](https://dataengineering.wiki/Index)

```js
/*
Since this site is made with Obsidian, we use this publish.js file to customize the site.
https://help.obsidian.md/Obsidian+Publish/Customize+your+site
*/

const site = "https://dataengineering.wiki";

// Each folder contains a note with the same name as the folder, add a redirect to the note when the folder is clicked.
// Expand arrow should not be affected.
var navContainer = document.querySelector('.site-body-left-column').querySelector('.nav-view-outer').querySelector('.tree-item').querySelector('.tree-item-children');
let folders = ["Community", "Concepts", "FAQ", "Guides", "Tools", "Tutorials"];
for (const item of folders) {

    var element = navContainer.querySelector(`[data-path="${item}"] div.tree-item-inner`);
    element.setAttribute('data-link', `${site}/${item}/${item}`);
    element.addEventListener('click', function (e) {
        window.location.href = e.target.getAttribute('data-link');
        return false;
    });
};
```

```css
.graph-view.color-fill {
  /* Supports all CSS color directives, like #HEX, rgb and rgba */
  color: #7f6df2;
}

.site-footer {
  display: none;
}

.site-body-left-column-site-name {
  text-align: center;
  margin: 0 auto;
}


/* Footer Heading */
h2[data-heading="This note on GitHub"],
h2[data-heading="This note in GitHub"] {
    font-size: var(--editor-font-size);
    text-align: center;
}
h2[data-heading="This note on GitHub"]::before,
h2[data-heading="This note in GitHub"]::before {
    content: '';
    display: block;
    height: 2px;
    background: var(--background-modifier-border);
    margin-bottom: 10px;
}

/* Style GitHub footer links */
span.git-footer {
  display: block;
  text-align: center;
  bottom: 0;
}
.git-footer .external-link {
  background-image: url();
  padding-right: 0;
  padding: 6px 15px;
  background: var(--interactive-normal);
  border-radius: 4px;
  text-decoration: none;
}
.git-footer .external-link:hover {
  background: var(--interactive-accent-hover);
  color: var(--text-on-accent);
}
/* Footer Link Icons */
.git-footer .external-link::before {
  vertical-align: -3px;
  padding-right: 4px;
}
.git-footer .external-link[title="git-hub-edit-note"]::before {
  content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M3%2017.25V21h3.75L17.81%209.94l-3.75-3.75L3%2017.25zM20.71%207.04a.996.996%200%200%200%200-1.41l-2.34-2.34a.996.996%200%200%200-1.41%200l-1.83%201.83l3.75%203.75l1.83-1.83z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E');
}
.git-footer .external-link[title="git-hub-copy-note"]::before {
  content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M216%2032H88a8%208%200%200%200-8%208v40H40a8%208%200%200%200-8%208v128a8%208%200%200%200%208%208h128a8%208%200%200%200%208-8v-40h40a8%208%200%200%200%208-8V40a8%208%200%200%200-8-8zm-8%20128h-32V88a8%208%200%200%200-8-8H96V48h112z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E');
}
.git-footer .external-link[title="git-hub-download-vault"]::before {
  content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%221em%22%20height%3D%221em%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%209h-4V3H9v6H5l7%207l7-7zM5%2018v2h14v-2H5z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E')
}

/* List Cards */
.list-cards div > ul {
    --link-color: var(--text-normal);
    --link-unresolved-color: var(--text-muted);
    --link-decoration: none;
    --link-decoration-hover: none;
    --link-external-color: var(--text-normal);
    --link-external-decoration: none;
    --link-external-decoration-hover: none;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding:0;
}
.list-cards div > ul > li {
    display: flex;
    border-radius: var(--radius-s);
    border: 1px solid var(--color-base-25);
}
.list-cards div > ul > li:has(ul) {
	flex-direction: column;
}
.list-cards div > ul > li:has(ul) a {
	flex-grow: 0;
}
.list-cards div ul > li a {
	flex-grow: 1;
    padding: 16px;
    font-weight: var(--font-semibold);
    background: none;
}
.list-cards div ul > li:hover {
    border-color: var(--color-base-35);
}

.theme-dark .list-cards div ul > li {
    background-color: var(--background-secondary);
}
.list-cards div ul ul {
    display: block;
    width: 100%;
    color: var(--text-muted);
    font-size: var(--font-smaller);
    margin-top: -8px;
    padding: 0 16px 16px;
}
.list-cards div ul ul > li {
    display: block;
}
```

## Beto.Group

```js
// Instructional texts for image toggle
const clickToEnlarge = "Click and hold to enlarge. SHIFT + wheel to zoom. ESC to reset.";
const clickToCollapse = "ESC to reset. Click and hold to collapse. SHIFT + wheel to zoom.";

// If running inside an iframe, hide certain site panels
if (window.self !== window.top) {
  const panelsToHide = [
    "div.site-body-right-column",
    "div.site-body-left-column",
    "div.site-header",
    "div.site-footer"
  ];
  panelsToHide.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.style.display = "none");
  });
}

const baseUrl = `${window.location.origin}/`;

// Detect device types
const [isDesktop, isMobile, isTablet] = (() => {
  const ua = navigator.userAgent;
  const mobileKeywords = ['Mobile', 'Android', 'iPhone', 'iPad', 'Windows Phone'];
  const mobileCheck = mobileKeywords.some(keyword => ua.includes(keyword));
  const tabletCheck = /iPad/i.test(ua) || (mobileCheck && !/Mobile/i.test(ua));
  const desktopCheck = !mobileCheck && !tabletCheck;
  return [desktopCheck, mobileCheck, tabletCheck];
})();

/**
 * Consolidated function for adding navigation and interaction controls to
 * SVG (or PNG) containers.
 */
const addNavigationToDiv = (container) => {
  // Look for an SVG or PNG element inside the container
  const imageElement = container.querySelector('.excalidraw-svg, .excalidraw-png');
  if (!imageElement) return;

  // Add a container class and remove fixed dimensions
  container.classList.add("excalidraw-svg-container");
  imageElement.removeAttribute("width");
  imageElement.removeAttribute("height");

  // Set up transform variables for zooming and panning
  let zoomLevel = 1,
      panX = 0,
      panY = 0,
      isPanning = false,
      panStartX = 0,
      panStartY = 0,
      initialDistance = 0,
      enlargeTimeout = null,
      isEnlarged = false;

  // Create an overlay for desktop instructions (if applicable)
  let overlay = null;
  if (isDesktop) {
    overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    overlay.textContent = clickToEnlarge;
    // Style the overlay as needed via CSS or inline styles:
    overlay.style.position = 'absolute';
    overlay.style.bottom = '5px';
    overlay.style.left = '5px';
    overlay.style.padding = '5px 10px';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.color = '#fff';
    overlay.style.fontSize = '12px';
    overlay.style.borderRadius = '3px';
    container.style.position = 'relative';
    container.appendChild(overlay);
  }

  // Update the transform style on the image element
  const applyTransform = () => {
    imageElement.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    imageElement.style.transformOrigin = 'center center';
  };

  // --- Button Controls (Reset, Zoom In, Zoom Out) ---
  // Utility for creating an SVG button using currentColor for fill (so icon color
  // is determined by the button's CSS color property)
  const createButton = (id, svgPath) => {
    const btn = document.createElement('button');
    btn.id = id;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="${svgPath}" fill="currentColor"/>
      </svg>`;
    btn.style.background = 'rgba(0,0,0,0.6)';
    btn.style.border = 'none';
    btn.style.padding = '5px';
    btn.style.borderRadius = '3px';
    btn.style.cursor = 'pointer';
    // Set the icon color via the text color
    btn.style.color = '#fff';
    return btn;
  };

  // Create buttons with appropriate SVG paths
  const resetButton = createButton('resetButton', 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z');
  const zoomInButton = createButton('zoomInButton', 'M12 5v14M5 12h14');
  const zoomOutButton = createButton('zoomOutButton', 'M5 12h14');

  // Container for zoom control buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.position = 'absolute';
  buttonContainer.style.bottom = '10px';
  buttonContainer.style.right = '10px';
  buttonContainer.style.display = 'flex';
  buttonContainer.style.flexDirection = 'column';
  buttonContainer.style.gap = '5px';
  buttonContainer.appendChild(zoomInButton);
  buttonContainer.appendChild(zoomOutButton);
  container.appendChild(resetButton);
  container.appendChild(buttonContainer);

  // --- Button Event Listeners ---
  resetButton.addEventListener('click', () => {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    if (overlay) overlay.textContent = clickToEnlarge;
    isEnlarged = false;
    applyTransform();
  });
  zoomInButton.addEventListener('click', () => {
    zoomLevel = Math.min(zoomLevel + 0.5, 10);
    applyTransform();
  });
  zoomOutButton.addEventListener('click', () => {
    const prevZoom = zoomLevel;
    zoomLevel = Math.max(zoomLevel - 0.5, 1);
    // Adjust panning to retain center focus
    const zoomRatio = zoomLevel / prevZoom;
    const rect = imageElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    panX = centerX - (centerX - panX) * zoomRatio;
    panY = centerY - (centerY - panY) * zoomRatio;
    if (zoomLevel === 1) {
      panX = 0;
      panY = 0;
    }
    applyTransform();
  });

  // --- Mouse & Touch Interaction ---
  // Handle wheel zoom when Shift (or CTRL for button-free zoom) is pressed
  container.addEventListener('wheel', (event) => {
    if (event.shiftKey || event.ctrlKey) {
      event.preventDefault();
      const { offsetX, offsetY, deltaY } = event;
      const scaleChange = -deltaY / 200;
      const previousZoom = zoomLevel;
      zoomLevel += scaleChange;
      zoomLevel = Math.min(Math.max(zoomLevel, 1), 10);
      const zoomRatio = zoomLevel / previousZoom;
      panX = offsetX - (offsetX - panX) * zoomRatio;
      panY = offsetY - (offsetY - panY) * zoomRatio;
      applyTransform();
    }
  }, { passive: false });

  // Mouse panning listeners
  container.addEventListener('mousedown', (event) => {
    event.preventDefault();
    isPanning = true;
    panStartX = event.clientX;
    panStartY = event.clientY;

    // Start timer for long click to toggle enlargement (only on desktop)
    if (isDesktop && overlay) {
      enlargeTimeout = setTimeout(() => {
        if (!isPanning) return;
        // Toggle enlarged state
        isEnlarged = !isEnlarged;
        container.classList.toggle("enlarged", isEnlarged);
        overlay.textContent = isEnlarged ? clickToCollapse : clickToEnlarge;
        clearTimeout(enlargeTimeout);
      }, 1000);
    }
  });

  container.addEventListener('mousemove', (event) => {
    if (isPanning) {
      const deltaX = event.clientX - panStartX;
      const deltaY = event.clientY - panStartY;
      panX += deltaX;
      panY += deltaY;
      panStartX = event.clientX;
      panStartY = event.clientY;
      applyTransform();
    }
  });

  container.addEventListener('mouseup', () => {
    isPanning = false;
    if (enlargeTimeout) clearTimeout(enlargeTimeout);
  });
  container.addEventListener('mouseleave', () => {
    isPanning = false;
    if (enlargeTimeout) clearTimeout(enlargeTimeout);
  });

  // Touch handlers: single-touch for panning and two-touch for pinch zoom.
  container.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
      isPanning = true;
      panStartX = event.touches[0].clientX;
      panStartY = event.touches[0].clientY;
    } else if (event.touches.length === 2) {
      isPanning = false;
      initialDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
    }
  }, { passive: false });

  container.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1 && isPanning) {
      const deltaX = event.touches[0].clientX - panStartX;
      const deltaY = event.touches[0].clientY - panStartY;
      panX += deltaX;
      panY += deltaY;
      panStartX = event.touches[0].clientX;
      panStartY = event.touches[0].clientY;
      applyTransform();
    } else if (event.touches.length === 2) {
      event.preventDefault();
      const currentDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
      const distanceDelta = currentDistance - initialDistance;
      const prevZoom = zoomLevel;
      zoomLevel += distanceDelta * 0.01;
      zoomLevel = Math.min(Math.max(zoomLevel, 1), 10);
      const zoomRatio = zoomLevel / prevZoom;
      // Compute the center between both touches
      const rect = imageElement.getBoundingClientRect();
      const centerX = ((event.touches[0].clientX + event.touches[1].clientX) / 2) - rect.left;
      const centerY = ((event.touches[0].clientY + event.touches[1].clientY) / 2) - rect.top;
      panX -= (centerX - rect.width / 2) * (zoomRatio - 1);
      panY -= (centerY - rect.height / 2) * (zoomRatio - 1);
      applyTransform();
      initialDistance = currentDistance;
    }
  }, { passive: false });

  // Abort transform on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      isPanning = false;
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      container.classList.remove("enlarged");
      if (overlay) overlay.textContent = clickToEnlarge;
      applyTransform();
    }
  });

  // Ensure links inside the image open in a new tab
  imageElement.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && event.target.href) {
      event.preventDefault();
      const url = event.target.getAttribute('xlink:href') || event.target.href;
      if (url) window.open(url, '_blank');
    }
  });

  // Handle iframes inside the container (disable dragging when hovered)
  container.querySelectorAll('iframe').forEach(iframe => {
    iframe.style.pointerEvents = 'auto';
    iframe.setAttribute('loading', 'lazy');
    iframe.addEventListener('mouseover', () => {
      container.removeEventListener('mousedown', null);
      container.removeEventListener('mousemove', null);
      container.removeEventListener('touchstart', null);
      container.removeEventListener('touchmove', null);
    });
    iframe.addEventListener('mouseout', () => {
      container.addEventListener('mousedown', null);
      container.addEventListener('mousemove', null);
      container.addEventListener('touchstart', null);
      container.addEventListener('touchmove', null);
    });
  });

  applyTransform();
};

// Process an image element: fetch SVG content or add controls to PNG
const processIMG = async (img) => {
  img.setAttribute('loading', 'lazy');
  const imgURL = img.src;
  const container = img.parentElement;

  try {
    if (img.alt.endsWith('.svg')) {
      const response = await fetch(imgURL);
      if (!response.ok) throw new Error('Failed to fetch SVG');
      const svgContent = await response.text();
      const svgContainer = document.createElement('div');
      svgContainer.classList.add('excalidraw-svg-container');
      svgContainer.innerHTML = svgContent;
      // Fix internal links if needed (using baseUrl)
      svgContainer.querySelectorAll(`a[href^="obsidian://open?vault="]`).forEach(el => {
        el.setAttribute("href", unescape(el.getAttribute("href").replace(/.*&file=/, baseUrl).replaceAll(" ", "+")));
      });
      // Replace image with the rendered SVG
      container.removeChild(img);
      container.appendChild(svgContainer);
      addNavigationToDiv(svgContainer);
    } else if (img.alt.endsWith('.png')) {
      img.classList.add('excalidraw-png');
      addNavigationToDiv(container);
    }
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

// Observe DOM mutations to process dynamically added images
const addImgMutationObserver = () => {
  const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) {
            const imgEl = node.querySelector('img[alt$=".svg"], img[alt$=".png"]');
            if (imgEl) {
              imgEl.setAttribute('loading', 'lazy');
              requestAnimationFrame(() => processIMG(imgEl));
            }
          }
        });
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

// Process any existing images on DOM load
document.body.querySelectorAll('img[alt$=".svg"], img[alt$=".png"]').forEach(img => {
  img.setAttribute('loading', 'lazy');
  requestAnimationFrame(() => processIMG(img));
});
addImgMutationObserver();

// --- Prefetch Important Resources ---
const prefetchResources = (url) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};
prefetchResources('https://example.com/important-resource.js');
prefetchResources('https://example.com/another-important-resource.css');

// --- Optimize DOM: Remove unnecessary empty SVG groups ---
const optimizeDOM = () => {
  document.querySelectorAll('svg.excalidraw-svg g').forEach(g => {
    if (!g.hasChildNodes()) g.remove();
  });
};
document.addEventListener('DOMContentLoaded', optimizeDOM);

// --- Code Block Copy Button for Code Snippets ---
const addCopyButtonToCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(codeBlock => {
    const container = codeBlock.parentNode;
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.className = 'copy-code-button';
    // Style the button (or move styling to your CSS)
    copyButton.style.position = 'absolute';
    copyButton.style.right = '5px';
    copyButton.style.top = '5px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.fontSize = '12px';
    copyButton.style.background = '#f1f1f1';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '3px';
    copyButton.style.cursor = 'pointer';
    // Copy action
    copyButton.addEventListener('click', () => {
      const code = codeBlock.textContent;
      navigator.clipboard.writeText(code)
        .then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => copyButton.textContent = 'Copy', 2000);
        })
        .catch((error) => {
          console.error('Copy failed:', error);
          copyButton.textContent = 'Failed to copy';
        });
    });
    container.style.position = 'relative';
    container.appendChild(copyButton);
  });
};
document.addEventListener('DOMContentLoaded', addCopyButtonToCodeBlocks);

// MutationObserver for dynamically added code blocks
const observeCodeBlocks = () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll('pre code').length > 0) {
            addCopyButtonToCodeBlocks();
          }
        });
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
};
observeCodeBlocks();

// --- Side Panel Collapse on Large Screens ---
// Assumes you have a toggle button with id "toggle-panels"
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector('#toggle-panels');
  const leftPanel = document.querySelector('.site-body-left-column');
  const rightPanel = document.querySelector('.site-body-right-column');
  if (toggleButton && leftPanel && rightPanel) {
    toggleButton.addEventListener('click', () => {
      const panelsAreHidden = window.getComputedStyle(leftPanel).display === 'none';
      leftPanel.style.display = panelsAreHidden ? 'block' : 'none';
      rightPanel.style.display = panelsAreHidden ? 'block' : 'none';
    });
  }
});


```

## Chad Bennt

[github.com > chad-bennett/obsidian-publish-css: the publish.css file for my personal website](https://github.com/chad-bennett/obsidian-publish-css/tree/main)

```js
var siteLeft = document.querySelector('.site-body-left-column');
let navOrderAsc = ["welcome.md", "start here.md"]; /* these go on top*/
let navOrderDsc = []; /* these go at the bottom */
/* items not mentioned go in between in alphabetical order */

var siteNav = siteLeft.querySelector('.nav-view-outer');
var navContainer = siteNav.querySelector('.tree-item').querySelector('.tree-item-children');

for (const item of navOrderAsc.reverse()){
    querytext = '[data-path="' + item + '"]';
    navItem = navContainer.querySelector(querytext);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.prepend(moveItem);
}

for (const item of navOrderDsc.reverse()){
    querytext = '[data-path="' + item + '"]';
    navItem = navContainer.querySelector(querytext);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.append(moveItem);
}
```

## Soul to World

```css

/*
Obsidian Publish theme by @lkadre
This theme was set up for my own personal use but I'm sharing it in case it helps someone!
Inspirations:
https://github.com/kepano/obsidian-minimal 
https://github.com/jdanielmourao/obsidian-sanctum
https://github.com/obsidian-ezs/obsidian-ursa
Catppuccin Colour Palettes
https://github.com/catppuccin/catppuccin
Latte for light theme and Frappé for dark theme
Accent color: Flamingo
Bold: Maroon
Italic: Rosewater
External links: Teal
Unresolved links: Pink
*/

@import url('https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,200..900;1,200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,700;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Courgette&family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bad+Script&family=Chilanka&family=Delius&family=Delius+Swash+Caps&family=Edu+SA+Beginner:wght@400..700&family=Handlee&family=Indie+Flower&family=Patrick+Hand&family=Playpen+Sans:wght@100..800&family=Reenie+Beanie&family=Shadows+Into+Light&display=swap');



.published-container {
    --fontsizetiniest: 10px;
    --fontsizetinier: 11px;
    --fontsizetiny: 12px;
    --fontsizeheader: 3em;
    --fontsizeh1: 2em;
    --fontsizeh2: 1.7em;
    --fontsizeh3: 1.4em;
    --fontsizeh4: 1.2em;
    --fontsizeh5: 1em;
    --fontsizeh6: 0.8em;
    --fontsizenormal: 16px;
    --popover-font-size: 12px;
    --bulletpointlinecolor: rgb(27, 38, 59);
    --background-primary: #f5e0dc;
    --background-primary-alt: #FAF3F3;
    --background-secondary: #f5e0dc;
    --background-secondary-alt: var(--text-accent-faded);
    --background-accent: #fff;
    --background-modifier-border: rgba(0, 0, 0, 0.05);
    --background-modifier-form-field: var(--background-primary);
    --background-modifier-form-field-highlighted: var(--background-primary);
    --background-modifier-box-shadow: rgba(0, 0, 0, 0.1);
    --background-modifier-success: #a4e7c3;
    --background-modifier-error: #990000;
    --background-modifier-error-rgb: 230, 135, 135;
    --background-modifier-error-hover: #bb0000;
    --background-modifier-cover: rgba(0, 0, 0, 0.8);
    --text-accent: #16949b;
    --text-bold: rgb(230, 69, 83);
    --text-italic: #df8e1d;
    --text-accent-rgb-yellow: 223, 142, 29;
    --text-accent-rgb-pink: 234, 118, 203;
    --text-accent-rgb-blue: 54, 178, 231;
    --text-accent-rgb-gray: 156, 160, 176;
    --text-accent-nonfaded: rgba(220, 138, 120, 1);
    --text-accent-faded: rgba(220, 138, 120, 0.1);
    --text-accent-unresolved: rgba(234, 118, 203);
    --text-color-external: rgb(23, 146, 153);
    --text-color-header: #000000;
    --text-normal: #000;
    --text-muted: #5e5e5e;
    --text-muted-rgb: 136, 136, 136;
    --text-faint: #999999;
    --text-error: #800000;
    --text-error-hover: #990000;
    --text-highlight-bg: rgba(220, 138, 120, 0.1);
    --text-selection: rgba(220, 138, 120, 0.7);
    --text-on-accent: #f2f3f5;
    --text-header-prefix: #999999;
    --interactive-normal: #f2f3f5;
    --interactive-hover: #e9e9e9;
    --interactive-accent: #DC8A78;
    --interactive-accent-rgb: 220, 138, 120;
    --interactive-accent-hover: #999999;
    --scrollbar-active-thumb-bg: rgba(0, 0, 0, 0.2);
    --scrollbar-bg: rgba(0, 0, 0, 0);
    --scrollbar-thumb-bg: var(--background-modifier-border);
    --font-family-preview: inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
    --default-font: inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
	--font-header: 'Playpen Sans';
	--font-logo: 'Reenie Beanie';
    --font-monospace: "Reddit Sans";
    --font-serif: 'Noto Serif';


	/*tags*/
	--tag-size: 14px; !important;
	
	/*from Chad Bennet's custom css*/
	--shadow: 1px 1px 4px #88888888;
	--inset-shadow: inset 1px 1px 3px #88888888;
	--color-dark: #3e3831 !important;
	--color-gray-light: #d1cdc7;
	--color-gray-lightest: #eae8e3;
	--color-background: #f4f3f1;
	--color-greens: #d1dba2;
	--color-blues: #16949b;
	--color-blues-translucent: #c9ddde;
	--border: 0.5px solid transparent;
	--radius: 0.4rem;
}

/* IFRAMES */
iframe {
    display: block;
    border-style: none;
    margin: 0 auto;
}

/* SCROLLBAR */
::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-bg);
}

::-webkit-scrollbar {
    background-color: var(--scrollbar-bg);
}

::-webkit-scrollbar-thumb:active {
    background-color: var(--scrollbar-active-thumb-bg);
}

::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    -webkit-border-radius: 100px;
}

::-webkit-scrollbar-thumb {
    -webkit-border-radius: 100px;
}

::-webkit-scrollbar-thumb:active {
    -webkit-border-radius: 100px;
}

::-webkit-scrollbar-corner {
    background: transparent;
}

* {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-bg) var(--scrollbar-bg);
}


/* || LINKS AND BASIC FORMATTING */


/*link styling*/
.published-container .markdown-rendered .internal-link,
.published-container .markdown-rendered a {
  color: var(--color-blues) !important;
  text-decoration: none;

}

.published-container .markdown-rendered a:hover {
  text-decoration: underline;
}



.markdown-preview-view  {
    border-color: var(--text-accent);
    background-color: var(--text-accent-faded);
    font-size: 0.6rem;
}

strong, b {
    font-weight: bold;
    color: var(--text-bold)
}

i, cite, em, var, address, dfn {
    text-style: italic;
    color: var(--text-italic)
}

/*Images*/

.centerImg img {
  display: block;
  margin: 0px auto;
}

/* SITE HEADER */
.site-header {
    cursor: pointer;
    padding: 0;
    display:none;
}

.site-header-logo {
    display: none
}

.site-header-text {
    text-align: center;
    font-family: 'Courgette';
    font-size: var(--fontsizetiny);
}

.search-view-container .search-bar {
    font-family: var(--default-font);
}

@media only screen and (min-width: 750px) {
    .site-header {
        margin-left: -20px;
    }
}

/* HEADERS */
.page-header {
    color: var(--section-header-color);
    font-family: var(--font-header);
    font-size: var(--fontsizetiny);
    font-weight: 400;
    border-bottom: 1px solid var(--text-accent);
    top:0;
    text-align: center; 
    position: -webkit-sticky !important;
    position: sticky !important;
    line-height: 1.5em;
    padding:1.5em 0px
}

h1 {
    font-size: var(--fontsizeh1) !important;
    font-weight: 400;
    --h1-font: var(--font-header);
    color: var(--text-color-header);
    text-align: center;
    padding: 5px;
   text-transform: lowercase;
}

h2 {
    font-size: var(--fontsizeh2) !important;
    color: var(--text-color-header) !important;
	--h2-font: var(--font-header);
   text-transform: lowercase;
}

h3 {
    font-size: var(--fontsizeh3) !important;
    color: var(--text-color-header) !important;
	--h3-font: var(--font-header);
   text-transform: lowercase;
}


h4 {
    font-size: var(--fontsizeh4) !important;
    color: var(--text-color-header) !important;
	--h4-font: var(--font-header);
   text-transform: lowercase;
}

h5 {
    font-size: var(--fontsizeh5) !important;
    color: var(--text-color-header) !important;
   text-transform: lowercase;    
}

h6 {
    font-size: var(--fontsizeh6) !important;
    color: var(--text-color-header) !important;
    font-weight: normal;

    letter-spacing: .125em;
}

.markdown-preview-view hr {
    border: none;
    border-top: 2px solid;
    border-color: var(--background-modifier-border);
}

/* GRAPHS */
.graph-view.color-fill-unresolved {
    opacity: 0.5;
}

.graph-view.color-fill {
    color: var(--text-accent) !important;
}

.graph-view.color-fill:hover {
    color: var(--text-accent-hover) !important;
}

.graph-view.color-text {
    color: var(--text-faint) !important;
}

.graph-view.color-line {
    color: var(--text-faint) !important;
}

.markdown-preview-view .internal-link.is-unresolved {
    opacity: 0.8;
    color: var(--text-accent-unresolved);
}

.external-link, .external-link:hover {
    color: var(--text-color-external);
}


/* QUOTE BLOCKS */
.markdown-preview-view blockquote {
    text-align: justify !important;
    font-size: var(--fontsizetiny);
    padding: 20px 20px;
    margin-left: 20px;
    border-top: 1px solid var(--text-accent);
    border-bottom: 1px solid var(--text-accent);
    border-left:none; 
    border-right: none;
}

/* FOOTER */
.site-footer {
    display: none
}

.footnotes {
    font-size: var(--fontsizetinier);
    font-family: var(--font-monospace);
    color: var(--text-faint);
    text-align: left;
}

/* GENERAL */
.sliding-windows .publish-renderer.mod-squished .extra-title {
    font-family: var(--font-monospace);
    font-size: var(--fontsizetiny);
    color: var(--section-header-color);
}

.markdown-preview-view .markdown-embed-content {
    max-height: none
}

.markdown-preview-view .markdown-embed-content > .markdown-preview-view {
    max-height: none
}

.markdown-preview-view .markdown-embed, .markdown-preview-view .file-embed {
    border: none;
    padding: 0px 20px
}

.markdown-embed-title {
    font-weight: 900;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.markdown-embed-title, .file-embed-title {
    font-size: 1.5em;
    width: 100%;
    text-align: left;
}

.markdown-embed-title::before
{
    content: 'EMBED ';
    font-size: 10px;
    color: var(--text-faint);
    font-family: var(--font-monospace);
}

.file-embed-title::before
{
    content: 'EMBED ';
    font-size: var(--fontsizetiny);
    color: var(--text-header-prefix);
    font-family: var(--font-monospace);
}

.markdown-embed-link, .file-embed-link {
    color: var(--interactive-accent);
}

div.markdown-preview-view {
    font-family: var(--font-family-preview);
}

.markdown-preview-view pre {
    margin: 0px 60px;
    overflow: scroll;
    border: 1px solid var(--background-modifier-border);
    background-color: var(--background-primary-alt);
}

.markdown-preview-view pre code {
    border: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px
}

.markdown-rendered code {
    color: rgb(108, 111, 133);
    font-family: var(--font-monospace);
    background-color: var(--background-primary-alt);
    border-radius: 4px;
    font-size: 0.85em;
    }

.markdown-preview-view table {
    margin-right: auto;
    margin-left: auto;
}

thead {
    background-color: var(--background-primary);
    font-family: var(--font-monospace);
    font-size: var(--fontsizenormal);
    text-align: center;
    text-transform: uppercase;
}

.markdown-preview-view ol {
    margin-left: 0;
    padding-inline-start: 2em;
    list-style: decimal;
    white-space: normal !important
}

/* SIDEBARS AND BACKLINKS */
.site-body-left-column, .site-body-left-column:before {
    background-color: var(--background-secondary);
    border-right: none !important;
	
}


.published-container .markdown-preview-view {
    user-select: text;
    background-color: var(--background-primary-alt);
    font-size: var(--fontsizenormal) !important;
    line-height: 1.8;
    border-radius: 10px;
    margin-top: 20px;
    text-align: justify;
}

.published-container .backlinks {
    background-color: var(--background-primary-alt);
    border-radius: 10px;
    margin-bottom: 25px;
    font-family: var(--font-monospace);
}

.backlink-items-container {
    font-size: var(--fontsizetiny)
}

.published-container .backlinks .published-section-header {
    color: var(--text-color-header) !important
}

.published-section-header {
    color: var(--section-header-color);
    font-family: var(--default-font);
    font-weight: 400;
}


.outline-view-outer .collapsible-item-self.mod-active {
    background-color: transparent;
}

.outline-view-outer .tree-item-self:hover {
    background: transparent;
    text-transform: uppercase
}

.outline-view-outer .tree-item-self.mod-active {
    background: transparent;
    text-transform: uppercase
}

.outline-view-outer .tree-item-self.mod-active:before {
    content: "•⠀";
    color: var(--text-accent-hover);
}


.site-body-left-column, .site-body-right-column {
	background-color: var(--background-secondary);
	text-transform: lowercase;
}



.site-body-left-column-site-name {
    font-size: var(--fontsizeh1);
    font-weight: normal;
    z-index: 1;
    cursor: pointer;
	line-height: 32px;
    padding: 0px 20px;
    text-align: center;
    font-family: var(--font-logo);
	text-transform: lowercase;
    letter-spacing: 0.06em;
}

.site-body-left-column-site-theme-toggle {
    margin: 0 auto
}

.tree-item-self[data-path^='§ 01'], .tree-item-self[data-path^='§ 02'], .tree-item-self[data-path^='§ 03'], .tree-item-self[data-path^='§ 04'], .tree-item-self[data-path^='§ 05'], .tree-item-self[data-path^='§ 06'], .tree-item-self[data-path^='§ 07'], .tree-item-self[data-path^='§ 08'], .tree-item-self[data-path^='§ 09'], .tree-item-self[data-path^='§ 000'], .tree-item-self[data-path^='§ 99'] {
    display: none;
  }

/* MODALS AND POPOVERS */

.modal {
    background-color: var(--background-primary-alt);
}

.popover {
    background-color: var(--background-primary-alt);
    border: 1px solid var(--background-primary);
    box-shadow: 0 2px 8px var(--background-modifier-box-shadow);
    border-radius: 6px;
    padding: 15px 20px 10px 20px;
    position: relative;
    font-size: var(--fontsizepopover) !important;
}

.popover-title {
    font-weight: 800;
}

.popover-content {
    margin: 10px;
}

.hover-popover .markdown-preview-view {
    font-size: var(--fontsizepopover) !important;
    line-height: 1.4;
    padding: 10px !important;
}



/* LISTS */


.markdown-preview-view ul > li.task-list-item {
	text-indent: 0;
	line-height: var(--leading-4);
    font-size: smaller;
}

.markdown-preview-view .task-list-item {
	padding-inline-start:0;
}


.markdown-preview-view ul > li.task-list-item > * {
	text-indent: 0;
    font-size: smaller;
    padding:0 10px;
}

ol.contains-task-list p,
ul.contains-task-list p {
	margin: 0;
}


/* CALLOUTS */

.callout {
    background-color: rgb(var(--callout-color), 0.05);
    border-radius: 10px;
    border-left: 0px solid rgb(var(--callout-color))
}

.callout-title {
    padding: 10px;
    display: flex;
    gap: 10px;
    background-color: transparent;
}

.callout-title-inner {
    flex: 1 1 0;
    font-weight: normal;
    font-size: small;
    }

.callout-content {
    overflow-x: auto;
    padding: 5px 15px;
    font-size: small;
}

.callout[data-callout="info"] {
    --callout-color: 156, 160, 176;
}

.callout[data-callout="hint"], .callout[data-callout="tip"], .callout[data-callout="summary"] {
    --callout-color: var(--text-accent-rgb-yellow);
}

.callout[data-callout="note"], .callout[data-callout="tldr"], .callout[data-callout="abstract"], .callout[data-callout="quote"], .callout[data-callout="cite"] {
    --callout-color: 156, 160, 176;
}

.callout[data-callout="important"], .callout[data-callout="caution"], .callout[data-callout="attention"], .callout[data-callout="warning"], .callout[data-callout="danger"], .callout[data-callout="error"] {
    --callout-color: 210, 15, 57;
}

.callout[data-callout="person"] {
    --callout-color: var(--text-accent-rgb-pink);
    --callout-icon: user;
}

.callout[data-callout="resource"] {
    --callout-color: var(--text-accent-rgb-blue);
    --callout-icon: bookmark;
}

.callout[data-callout="summary"] {
    --callout-color: var(--text-accent-rgb-yellow);
    --callout-icon: coffee;
}

.callout[data-callout="person"] .callout-title-inner, .callout[data-callout="resource"] .callout-title-inner, .callout[data-callout="summary"] .callout-title-inner, .callout[data-callout="abstract"] .callout-title-inner, .callout[data-callout="see-also"] .callout-title-inner, .callout[data-callout="last-updated"] .callout-title-inner {
    font-size: var(--fontsizetiniest);
    font-family: var(--font-monospace);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 3px
}

.callout[data-callout="see-also"] {
    --callout-color: 156, 160, 176;
    --callout-icon: compass;
}

.callout[data-callout="last-updated"] {
    --callout-color: 156, 160, 176;
    --callout-icon: calendar;
    border-left: none;
    padding-top:0px;
    color: var(--text-faint);
    text-align:right;
    text-transform: uppercase;
    font-size:0.8em;
}

.callout[data-callout="home"] {
    --callout-color: 156, 160, 176;
    --callout-icon: home;
    border-left: none;
    border-top: 1px solid var(--scrollbar-thumb-bg);
    padding-top:0px;
    color: var(--text-faint);
    text-align:right;
    text-transform: uppercase;
    font-size:0.8em;
    background-color:transparent;
}
.callout[data-callout="home"] .callout-title-inner {
    text-transform: uppercase;
    font-size:1em;
}


```

## XML Aficionado

[xmlaficionado.com > Espanso - XML Aficionado](https://xmlaficionado.com/XML+Aficionado/Espanso)

```js
/*
// Locate the div with class "outline-view-outer" to add a Twitter timeline
const targetDiv = document.querySelector('.outline-view-outer');

if (targetDiv) {
  // Create a new div element
  const newDiv = document.createElement('div');
  
  // Add the Twitter timeline anchor and script to the new div
  //newDiv.innerHTML = `<a class="twitter-timeline" data-width="240" data-theme="dark" href="https://twitter.com/afalk?ref_src=twsrc%5Etfw">Tweets by @afalk</a>
  //  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  // Add the Twitter timeline iframe to the new div
  newDiv.innerHTML = `<iframe id="twitter-widget-3" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 240px; height: 7926px; display: block; flex-grow: 1;" title="Twitter Timeline" src="https://syndication.twitter.com/srv/timeline-profile/screen-name/afalk?dnt=false&amp;embedId=twitter-widget-3&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideBorder=false&amp;hideFooter=false&amp;hideHeader=false&amp;hideScrollBar=false&amp;lang=en&amp;origin=https%3A%2F%2Fpublish.twitter.com%2F%23&amp;sessionId=94e8603f1c827dbf2527e306aa272b87f5e9f30b&amp;showHeader=true&amp;showReplies=false&amp;theme=dark&amp;transparent=false&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716"></iframe>`;
  
  // Insert the new div as the last child of the target div
  targetDiv.appendChild(newDiv);
} else {
  // console.log("Couldn't find the div with class 'outline-view-outer'. Maybe it's taking a day off?");
}
*/

// Rewrite all <img> sources to use Cloudflare Images Transformations
const prefix = "https://xmlaficionado.com/cdn-cgi/image/width=1000,quality=75,fit=scale-down,format=auto/";

// Function to add prefix to source for cloudflare images transformations
function addCloudflareImagesPrefix(image_node) {
  // Get the current value of the src attribute
  const currentSrc = image_node.getAttribute("src");
  // Check if the src attribute is not empty and doesn't already start with the prefix
  if (currentSrc && !currentSrc.startsWith(prefix) && !currentSrc.endsWith(".svg") && !currentSrc.endsWith(".webp") && !currentSrc.endsWith(".avif")) {
    // Add the prefix to the src attribute
    const newSrc = prefix + currentSrc;
    image_node.setAttribute("src", newSrc);
    // console.log('Image src attribute changed to:', newSrc);
  }
}

// Find all the <img> elements on the page
const images = document.getElementsByTagName("img");
// console.log('Found this many images in document at the start:', images.length);
// Loop through each <img> element
for (let i = 0; i < images.length; i++) {
  addCloudflareImagesPrefix( images[i] );
}

// Also set up an observer to catch future additions of image elements and then any changes of their image sources

// Function to handle the attribute change event
function handleAttributeChange(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
      // console.log('Image src attribute observer triggered:', mutation.target.src);
      addCloudflareImagesPrefix( mutation.target );
    }
  }
}

// Function to process one img element and add observer for future src changes
function processImages(node) {
  // console.log('Image node added observer found child node:', node);
  addCloudflareImagesPrefix( node );
  // Also create a MutationObserver instance for future attribute changes
  const attributeObserver = new MutationObserver(handleAttributeChange);
  attributeObserver.observe(node, { attributes: true });
}

// Function to handle the child addition event
function handleChildAddition(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const imgElements = node.querySelectorAll('img');
          for (let img of imgElements) {
            processImages(img);
          }
        }
      }
    }
  }
}

// Create a MutationObserver instance for child additions
const childObserver = new MutationObserver(handleChildAddition);

// Observe the entire document for child additions
childObserver.observe(document, { childList: true, subtree: true });

```

## EM Ponders

[em.ponders.us > Welcome - E.M.Ponders](https://em.ponders.us/0+Start+Here/Welcome)

```css
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap');
	
	@font-face {
	  font-family: 'Comic Neue';
	  src: url('https://fonts.gstatic.com/s/comicneue/v2/0QIkMXF4vthvCVbFJg3aIMHgdm0.ttf') format('truetype'); 
	}
	
	:root {
	  --font-family-editor: 'Comic Neue', cursive;
	  --font-monospace: 'Comic Neue', cursive;
	  --font-title: 'Comic Neue', cursive;
	}
	
	
	
	:root {
	  --shadow: 1px 1px 4px #88888888;
	  --inset-shadow: inset 1px 1px 3px #88888888;
	  --color-dark: #3e3831 !important;
	  --font-size: 1.2em !important;
	  --color-gray-light: #d1cdc7;
	  --color-gray-lightest: #eae8e3;
	  --color-background: #f4f3f1;
	  --color-greens: #d1dba2;
	  --color-blues: #16949b;
	  --color-blues-translucent: #c9ddde;
	  --border: 0.5px solid transparent;
	  --radius: 0.3rem;
	}
	
	* {
	  color: var(--color-dark) !important;
	}
	
	/*reset body*/
	body {
	  --font-family-editor: 'Comic Neue', cursive;
	  --font-monospace: 'Comic Neue', cursive;
	  --font-text-theme: 'Comic Neue', cursive;
	  --font-title: 'Comic Neue', cursive;
	  background-image: none;
	  background: var(--color-background);
	  text-rendering: optimizeLegibility;
	  font-feature-settings: "kern" 1;
	  font-kerning: normal;
	  font-size: 1.2rem !important;
	  --font-monospace: 'Comic Neue';
	  --wws-font-modern: 'Comic Neue';
	  --wws-font-text: 'Comic Neue';
	  --wws-font-monospace: 'Comic Neue';
	  --wws-header-font: 'Comic Neue';
	  --wws-header-font-caps-variant: normal;
	  --wws-font-tags: var(--wws-header-font);
	  --wws-font-callout-title: var(--wws-header-font);
	}


/* Hide the sidebar on mobile devices  -  2024-05-18 - this didn't work*/
@media (max-width: 768px) {
  .published-container.is-readable-line-width .site-body-right-column {
    display: none;
  }
}


	/* hide right columne change inline to none*/
	
.published-container.is-readable-line-width .site-body-right-column {
	  display: none;
	}
	
	@media screen and (min-width: 1000px)
	body:not(.sliding-windows) .is-readable-line-width.has-outline.has-navigation .publish-renderer > .markdown-preview-view > .markdown-preview-sizer, body:not(.sliding-windows) .is-readable-line-width.has-graph.has-navigation .publish-renderer > .markdown-preview-view > .markdown-preview-sizer {
	    margin-right: 0;
	}
	
	.publish-renderer {
	  margin-top: 2rem;
	}
	
	@media screen and (max-width: 750px) {
	
	  .published-container.has-navigation.is-left-column-open .site-body-left-column,
	  .published-container.has-navigation .site-header {
	    background: var(--color-background);
	  }
	}
	
	.published-container.has-navigation .nav-backdrop {
	  background: var(--color-background);
	}
	
	/* font and line spacing */
	.published-container .markdown-rendered {
	  font-size: 1.2rem !important;
	  line-height: 1.7 !important;
	  letter-spacing: 0rem;
	  padding: 0px 40px 20px 40px;
	}
	
	.published-container .markdown-rendered h1 {
	  font-size: 3rem;
	  line-height: 3.3rem;
	  border: none;
	}
	
	.published-container .markdown-rendered h2 {
	  font-size: 2.4rem;
	  line-height: 2.6rem;
	  border: none;
	}
	
	.published-container .markdown-rendered h3 {
	  font-size: 2rem;
	  line-height: 2.2rem;
	  border: none;
	}
	
	.published-container .markdown-rendered h1,
	.published-container .markdown-rendered h2,
	.published-container .markdown-rendered h3,
	.published-container .markdown-rendered h4,
	.published-container .markdown-rendered h5,
	.published-container .markdown-rendered h6 {
	  margin-bottom: 1rem;
	  margin-top: 1rem;
	}
	
	.published-container .markdown-rendered p,
	.published-container .markdown-rendered ul,
	.published-container .markdown-rendered ol {
	  margin-bottom: 1.8rem;
	}
	
	/* left column stuff */
	.site-body-left-column {
	  background: none;
	  border-right: none;
	  padding: 1rem 0 0 2rem;
	  height: 95%;
	}
	
	.site-body-left-column-site-name {
	  text-align: center;
	  font-family: var(--font-title);
	}
	
	.site-body-left-column-site-name::before {
	  background: none;
	  display: block;
	  content: url(https://publish-01.obsidian.md/access/0837a8f082a3615de0270e8eb6c6d6a1/0%20Start%20Here/Em-Profile-Circle.png);
	  width: 100%;
	}
	
	.site-body-left-column .search-bar {
	  background-color: var(--color-gray-lightest);
	  box-shadow: var(--inset-shadow);
	  border: var(--border);
	  border-radius: var(--radius);
	  padding: 0.6rem;
	}
	
	.site-body-left-column .search-view-outer {
	  padding-right: 0;
	  padding-bottom: 1rem;
	  width: 90%;
	}
	
	input[type="text"] {
	  padding-left: 2rem !important;
	}
	
	/* links on sidebars */
	.nav-view .tree-item,
	.outline-view-outer .tree-item-children {
	  width: calc(100% - 4px);
	  border-left: none;
	}
	
	.nav-view-outer .tree-item-self:not(.mod-collapsible) {
	  border: 0.5px solid transparent !important;
	}
	
	.nav-view-outer .tree-item-self {
	  border: 0.5px solid transparent;
	  transition: background-color 0.4s;
	}
	
	.outline-view-outer .tree-item-self {
	  padding-left: 1rem;
	  border: 0.5px solid transparent;
	}
	
	.nav-view-outer .tree-item-self.mod-active,
	.outline-view-outer .tree-item-self.mod-active {
	  font-weight: 700;
	  background-color: var(--color-gray-light);
	  border: var(--border) !important;
	  border-radius: var(--radius);
	}
	
	.nav-view-outer .tree-item-self:hover:not(.mod-collapsible):not(.mod-active),
	.outline-view-outer .tree-item-self:hover {
	  background-color: var(--color-blues-translucent);
	  border-radius: var(--radius);
	  border: var(--border) !important;
	}
	
	/* fade side columns until hover */
	.site-body-left-column,
	.site-body-right-column {
	  opacity: 0.2;
	  transition: opacity 0.6s;
	}
	
	.site-body-left-column:hover,
	.site-body-right-column:hover,
	.site-body-left-column:active,
	.site-body-right-column:active {
	  opacity: 1;
	}
	
	/* remove internal link brackets */
	.internal-link::before,
	.internal-link::after {
	  display: none;
	}
	
	/*link styling*/
	.published-container .markdown-rendered .internal-link,
	.published-container .markdown-rendered a {
	  color: var(--color-blues) !important;
	  text-decoration: none;
	  border-radius: var(--radius);
	  border: 0.5px solid transparent;
	  top: 0;
	  padding: 0.2rem;
	  transition: border 0.4s, background 0.3s;
	  position: relative;
	}
	
	.published-container .markdown-rendered a:hover {
	  color: var(--color-dark) !important;
	  background: var(--color-blues-translucent) !important;
	  border: var(--border);
	}
	
	/* font fixes */
	.published-section-header {
	  font-family: var(--font-title);
	  font-size: var(--h3-size);
	  font-weight: var(--h3-weight);
	  font-style: var(--h3-style);
	  text-transform: lowercase;
	  letter-spacing: 0;
	}
	
	.published-section-header span {
	  font-family: var(--font-title);
	}
	
	/* tags */
	.published-container .markdown-rendered .tag,
	a.tag {
	  background: #d5d4ec !important;
	  padding: 0.3rem;
	  border-radius: var(--radius);
	  border: var(--border);
	  transition: transform 0.4s;
	}
	
	.published-container .markdown-rendered .tag:hover,
	a.tag:hover {
	  text-decoration: none;
	}
	
	/* center small images */
	.image-embed {
	  justify-content: center;
	  display: flex;
	}
	
	/* svg tweaks */
	svg {
	  font-family: var(--font-family-editor);
	}
	
	/* fix higlight color */
	::selection,
	.published-container .markdown-rendered mark {
	  background-color: var(--color-greens) !important;
	}
	
	/* images */
	.markdown-preview-view .internal-embed img {
	  border: var(--border);
	  border-radius: var(--radius);
	}
	
	/* responsive iframe */
	.iframeDiv {
	  position: relative;
	  overflow: hidden;
	  padding-top: 56.25%;
	}
	
	iframe {
	  position: relative;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  border: 0;
	  border-radius: var(--radius);
	  border: var(--border);
	  border-radius: var(--radius);
	}
	
	/* blockquotes */
	
	.markdown-preview-view blockquote {
	  box-shadow: var(--inset-shadow);
	  border: var(--border);
	  border-radius: var(--radius);
	  background-color: var(--color-gray-lightest) !important;
	}
	
	/** callout styling */
	.callout {
	  background-color: var(--color-gray-lightest);
	  box-shadow: var(--inset-shadow);
	  border: var(--border);
	  border-radius: var(--radius);
	  padding: 0.6rem;
	  margin-bottom: 2rem;
	}
	
	.callout-title {
	  padding: 0.5rem;
	  padding-left: 2rem;
	  width: 100%;
	  border-radius: var(--radius);
	}
	
	.callout-title h3 {
	  font-size: 1.1rem;
	  font-family: var(--font-family-editor);
	  margin: 0;
	}
	
	.callout-icon {
	  display: none;
	}
	
	.callout-content {
	  padding: 15px;
	}
	
	.callout a:hover,
	.published-container .markdown-rendered .backlinks a:hover {
	  border: var(--border);
	}
	
	/* backlinks */
	.backlink-items-container {
	  border: none;
	  background-color: var(--color-gray-lightest);
	  box-shadow: var(--inset-shadow);
	  border: var(--border);
	  border-radius: var(--radius);
	  padding: 1rem 2rem;
	}
	
	/* tooltips */
	.tooltip,
	.mod-top {
	  color: var(--color-gray-lightest) !important;
	}
	
	/* tables */
	.markdown-rendered table {
	  border: none;
	  background-color: var(--color-gray-lightest);
	  box-shadow: var(--shadow);
	  border: 1px solid var(--background-color);
	  border-radius: var(--radius) !important;
	}
	
	.markdown-preview-view th,
	.markdown-preview-view td {
	  border: 1px solid var(--background-color);
	}
	
	.markdown-rendered thead tr>th:nth-child(2n + 2) {
	  background-color: var(--color-gray-light);
	}
	
	/* utility classes */
	figure:has(.left),
	figure:has(.right) {
	  display: inline;
	}
	
	.right,
	[data-callout="right-card"] {
	  float: right;
	  width: 35%;
	  max-width: 35%;
	  margin-left: 0.5rem;
	  margin-bottom: 0.5rem;
	  background-color: transparent;
	  box-shadow: none;
	  border-right: none;
	  border-bottom: none;
	}
	
	.left,
	[data-callout="left-card"] {
	  float: left;
	  width: 35%;
	  max-width: 35%;
	  margin-right: 0.5rem;
	  margin-bottom: 0.5rem;
	  background-color: transparent;
	  box-shadow: none;
	  border-right: none;
	  border-bottom: none;
	}
	
	.right .callout-title,
	[data-callout="right-card"] .callout-title,
	.left .callout-title,
	[data-callout="left-card"] .callout-title {
	  display: none;
	}
	
	[data-callout="right-card"] .callout-content,
	[data-callout="left-card"] .callout-content {
	  padding: 0;
	  scale: 1.1;
	}
	
	.hideSmall {
	  display: block;
	}
	
	@media screen and (max-width: 500px) {
	
	  .right,
	  .left {
	    float: none;
	    clear: both;
	    width: 80%;
	    margin-left: auto;
	    margin-right: auto;
	  }
	
	  .hideSmall {
	    display: none;
	  }
	}
	
	/* graph view */
	.graph-view-container {
	  background-color: var(--color-gray-lightest);
	  box-shadow: var(--inset-shadow);
	  border: var(--border);
	  border-radius: var(--radius);
	  padding: 0.6rem;
	}
	
	/* image grid */
	/* grid setup for mobile-first design */
	.grid {
	  display: grid;
	  grid-template-columns: 1fr;
	  grid-gap: 0.5rem;
	  width: 95%;
	  max-width: 80em;
	  margin: 2rem auto;
	}
	
	.grid figure,
	.grid img {
	  width: 100%;
	  max-width: 100%;
	  margin: 0 auto;
	  height: 100%;
	}
	
	.grid img {
	  object-fit: cover;
	  transition: transform 0.25s;
	  border-radius: 0.3rem;
	}
	
	.grid img:hover {
	  transform: scale(1.1);
	  z-index: 1000;
	  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
	    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
	    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	}
	
	.grid figcaption {
	  text-align: center;
	  font-weight: 300;
	  color: var(--black-color);
	  padding-bottom: 1rem;
	  font-style: italic;
	}
	
	.callout-content img {
	  box-shadow: none !important;
	  border-right: none !important;
	  border-bottom: none !important;
	  border-radius: 0;
	}
	
	/* contact form */
	.forms {
	  min-height: 500px;
	}
	
	.forms .supernova .form-all,
	.forms .form-all {
	  border: none !important;
	  box-shadow: none !important;
	}
	
	.forms .formFooter {
	  display: none !important;
	}
	
	.forms .jf-form-buttons:hover {
	  background: #c9ddde !important;
	}
	
	.forms .form-textbox {
	  box-shadow: inset 1px 1px 3px #88888888;
	}

```

## Gina Marie

[ginamarieagosta.us > Welcome - Gina Marie's Brain Forest](https://ginamarieagosta.us/Welcome)

```js
var siteLeft = document.querySelector('.site-body-left-column');
let navOrderAsc = ["Welcome.md", "Explore here.md", "What I'm up to now.md", "Contact Me.md", "Changelog.md"]; /* these go on top*/
let navOrderDsc = []; /* these go at the bottom */
/* items not mentioned go in between in alphabetical order */
 
var siteNav = siteLeft.querySelector('.nav-view-outer');
var navContainer = siteNav.querySelector('.tree-item').querySelector('.tree-item-children');
 
for (const item of navOrderAsc.reverse()){
    querytext = '[data-path="' + item + '"]';
    navItem = navContainer.querySelector(querytext);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.prepend(moveItem);
}
 
for (const item of navOrderDsc.reverse()){
    querytext = '[data-path="' + item + '"]';
    navItem = navContainer.querySelector(querytext);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.append(moveItem);
}
```

## Deep Web

[deep-web.us > Welcome! - Deep Web](https://deep-web.us/Welcome!)

```js
document.body.addClass('t-d'); 
document.body.addClass('hide-header-underline-4');
document.body.addClass('hide-header-underline-5');
document.body.addClass('hide-header-underline-6');
document.body.addClass('headings-center-lines');
document.body.addClass('readable');
document.body.addClass('paper');
```

## 100 Days Ago

[100daysago.com > Welcome - 100 Days Ago](https://100daysago.com/Welcome)

```js
let imagesByPath = {};
let currentImageIndex = 0;
let currentPath = '';

function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

function preloadAllImages() {
  const images = imagesByPath[currentPath] || [];
  images.forEach(image => {
    const imgElement = image.querySelector('img');
    const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src');
    if (imageUrl) {
      preloadImage(imageUrl);
    }
  });
}

function updateCurrentPath() {
  currentPath = publish.currentFilepath;
  if (!imagesByPath[currentPath]) {
    imagesByPath[currentPath] = [];
    preloadAllImages();
  }
}

publish.registerMarkdownPostProcessor(async (el, ctx) => {
  updateCurrentPath();

  const blockImages = Array.from(el.querySelectorAll('.internal-embed')).filter(span => /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(span.getAttribute('src')));
  blockImages.forEach((span) => {
    if (!span.classList.contains('processed')) {
      span.classList.add('processed');
      imagesByPath[currentPath].push(span);

      span.addEventListener('click', function() {
        currentImageIndex = imagesByPath[currentPath].indexOf(this);
        const lightboxDiv = document.createElement('div');
        lightboxDiv.classList.add('lightbox');
        const contentToMove = this.cloneNode(true);
        lightboxDiv.appendChild(contentToMove);
        document.body.appendChild(lightboxDiv);

        let startX;
        lightboxDiv.addEventListener('touchstart', e => {
          startX = e.touches[0].clientX;
        });

        lightboxDiv.addEventListener('touchend', e => {
          const endX = e.changedTouches[0].clientX;
          if (startX - endX > 50) {
            // Swipe left
            currentImageIndex = (currentImageIndex + 1) % imagesByPath[currentPath].length;
          } else if (startX - endX < -50) {
            // Swipe right
            currentImageIndex = (currentImageIndex - 1 + imagesByPath[currentPath].length) % imagesByPath[currentPath].length;
          }
          lightboxDiv.innerHTML = '';
          const newContent = imagesByPath[currentPath][currentImageIndex].cloneNode(true);
          lightboxDiv.appendChild(newContent);
        });

        const removeLightbox = () => {
          document.body.removeChild(lightboxDiv);
          document.removeEventListener('keydown', keyListener);
        };

        lightboxDiv.addEventListener('click', removeLightbox);

        const keyListener = (event) => {
          const images = imagesByPath[currentPath] || [];
          if (event.key === "Escape") {
            removeLightbox();
          } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            if (event.key === "ArrowRight") {
              currentImageIndex = (currentImageIndex + 1) % images.length;
            } else {
              currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            }
            lightboxDiv.innerHTML = '';
            const newContent = images[currentImageIndex].cloneNode(true);
            lightboxDiv.appendChild(newContent);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
          }
        };

        document.addEventListener('keydown', keyListener);
      });
    }
  });
});
```

## Ben issen

[benissen.com > Ben issen - Ben issen](https://benissen.com/Ben+issen)

```js
!function(t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog = e,
    e._i = [],
    e.init = function(i, s, a) {
        function g(t, e) {
            var o = e.split(".");
            2 == o.length && (t = t[o[0]],
            e = o[1]),
            t[e] = function() {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
        (p = t.createElement("script")).type = "text/javascript",
        p.async = !0,
        p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js",
        (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
        var u = e;
        for (void 0 !== a ? u = e[a] = [] : a = "posthog",
        u.people = u.people || [],
        u.toString = function(t) {
            var e = "posthog";
            return "posthog" !== a && (e += "." + a),
            t || (e += " (stub)"),
            e
        }
        ,
        u.people.toString = function() {
            return u.toString(1) + ".people (stub)"
        }
        ,
        o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),
        n = 0; n < o.length; n++)
            g(u, o[n]);
        e._i.push([i, s, a])
    }
    ,
    e.__SV = 1)
}(document, window.posthog || []);
posthog.init('phc_fe6JXyb2IJDVo7h4dHL6HaG1lo1qo5tEUV6WKGLaAU9', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only'// or 'always' to create profiles for anonymous users as well
})

```

## Obsidianite

[publish.obsidian.md > C203 Home - Aviation - Obsidian Publish](https://publish.obsidian.md/student/Content/ATAC/C203/C203+Home)

```css
/**************************************
| MAIN EDITOR / PREVIEW MODE
| -------------------------------------
| Write in the same section to keep them
| relatively sync with css.
/**************************************/

/**-------------------**
| HEADING STYLES
**--------------------**/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--default-font);
  font-weight: 600;
  margin: 0px;
}

.published-container .markdown-rendered h1, .published-container .markdown-rendered h2, .published-container .markdown-rendered h3,.published-container .markdown-rendered h4, .published-container .markdown-rendered h5, .published-container .markdown-rendered h6 {
  margin: 0em 0 0em 7px;
}

.HyperMD-header-2::after,
.HyperMD-header-3::after,
.HyperMD-header-4::after,
.HyperMD-header-5::after,
.HyperMD-header-6::after {
  position: absolute;
  content: '';
  height: 1px;
  width: 35%;
  left: 0;
  bottom: 5px;
  background-image: linear-gradient(to right, var(--text-sub-accent), #100e17);
  opacity: 1;
}

.markdown-preview-section h1,
.cm-header-1 {
  font-size: 20px;
  color: var(--text-title-h1);
}

.markdown-preview-section h2,
.cm-header-2 {
  font-size: 18px;
  color: var(--text-title-h2);
}

.markdown-preview-section h3,
.cm-header-3 {
  font-size: 16px;
  color: var(--text-title-h3);
}

.markdown-preview-section h4,
.cm-header-4 {
  font-size: 16px;
  color: var(--text-title-h4);
}

.markdown-preview-section h5,
.cm-header-5 {
  font-size: 16px;
  color: var(--text-title-h5);
}

.markdown-preview-section h6,
.cm-header-6 {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-title-h6);
}


/*
/** headings */
/*
.markdown-preview-view h2,
.markdown-preview-view h3,
.markdown-preview-view h4,
.markdown-preview-view h5,
*/
/*This broke the headers, grouped them all on top of each other*/
/*
.markdown-preview-view h2:after,
.markdown-preview-view h3:after,
.markdown-preview-view h4:after,
.markdown-preview-view h5:after{
  position: absolute;
  content: '';
  height: 1px;
  width: 35%;
  left: 0;
  bottom: -8px;
  background-image: linear-gradient(to right, var(--text-sub-accent), #100e17);
  opacity: 1;
}*/

.view-header-icon {
  color: var(--text-accent);
}

/**-------------------**
| HR STYLES
**--------------------**/

/** hr styles -- PREVIEW MODE */
.markdown-preview-view hr {
  margin-block-start: 1em;
  margin-block-end: 1em;
  border: none;
  height: 0;
  border-bottom: 1px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to right, transparent, var(--text-accent), transparent);
}

.markdown-preview-view hr::after {
  content: '✈️';
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translate(-40%, -40%) rotate(15deg);
  transform-origin: 50% 50%;
  padding: 0rem;
  color: var(--text-sub-accent);
  background-color: var(--background-primary);
}

/**-------------------**
| STRONG/BOLD STYLES
**--------------------**/

.cm-strong,
strong {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 0.1rem;
  color: #5d5e5e;
  background-color: #5d5e5e;
}

strong .math.math-inline .MathJax {
  position: inherit !important;
}

.cm-strong::selection,
strong::selection {
  -webkit-text-fill-color: var(--text-faint);
}

/**-------------------**
| ITALIC STYLES
**--------------------**/

.cm-em,
em {
  color: #bb9af7 !important;
  font-family: OperatorMonoSSmLig-Book, Rubik !important;
}

/**-------------------**
| LISTING STYLES (ul, li, ol)
**--------------------**/
/*
.cm-s-obsidian span.cm-formatting-list {
  color: var(--text-accent);
}

/* Adding a rule line before ul list -- EDITOR Mode  
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-2::before,
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-3::before,
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-4::before {
  content: '';
  border-left: 1px solid var(--text-accent);
  position: absolute;
  opacity: 0.35;
  left: 0.5em;
  top: 0;
  bottom: 0;
  height: 100%;
}
*/
/** Syncing the space in font of the list symbol with preview mode 
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-2,
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-3,
.cm-s-obsidian pre.HyperMD-list-line.HyperMD-list-line-4 {
}

/* Adding a rule line before ul list -- PREVIEW Mode 
ul ul,
.cm-s-obsidian pre.HyperMD-list-line {
  position: relative;
}
.markdown-preview-section > ul > li > ul::before {
  content: '';
  border-left: 1px solid var(--text-accent);
  position: absolute;
  opacity: 0.35;
  left: -1em;
  top: 0;
  bottom: 0;
}
*/
/* bullet lists 
ul,
ul ul,
ol ul,
ul ul ul,
ol ul ul {
  list-style: none;
}
li > p {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
}

ul li:not(.task-list-item)::before {
  content: '•';
  color: var(--text-accent);
  display: inline-block;
  width: 1em;
  margin-left: -1.15em;
  padding: 0;
  font-weight: bold;
  text-shadow: 0 0 0.5em var(--accent-2);
}
ul ul li:not(.task-list-item)::before {
  content: '•';
}
ul ul ul li:not(.task-list-item)::before {
  content: '•';
}
*/
/* numbered lists 
ol {
  list-style: none;
  counter-reset: li;
}
ol > li {
  counter-increment: li;
}
ol > li:not(.task-list-item)::before,
ul ol > li:not(.task-list-item)::before,
ul ul ol > li:not(.task-list-item)::before,
ul ul ul ol > li:not(.task-list-item)::before {
  content: '.' counter(li);
  color: var(--text-accent);
  font-weight: normal;
  display: inline-block;
  width: 1em;
  margin-left: -1.5em;
  margin-right: 0.5em;
  text-align: right;
  direction: rtl;
  overflow: visible;
  word-break: keep-all;
  white-space: nowrap;
}
*/
/* rule line when there are checkboxes
ul .task-list-item ul::before {
  left: 0.15em !important;
}
*/
/**-------------------**
| LINKS STYLING
**--------------------**/

/** editor mode **/
.cm-s-obsidian span.cm-link,
.cm-s-obsidian span.cm-hmd-internal-link {

 text-shadow: -1px -1px 2px var(--background-secondary), -1px 1px 2px var(--background-secondary),
    1px -1px 2px var(--background-secondary), 1px 1px 2px var(--background-secondary);
  color: var(--text-normal);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 5px 5px;
  text-decoration: none;
}

.cm-s-obsidian span.cm-link {
  background-image: linear-gradient(
    to bottom,
    var(--bg-sub-accent-55) 0%,
    var(--bg-sub-accent-55) 100%
  );
}

.cm-s-obsidian span.cm-hmd-internal-link {
  background-image: linear-gradient(to bottom, var(--bg-accent-55) 0%, var(--bg-accent-55) 100%);
}

.cm-s-obsidian span.cm-formatting-link {
  color: var(--text-faint) !important;
  opacity: 0.25;
}

/** preview mode **/
.external-link {
  padding: 0;
}

.internal-link,
.external-link {
  text-shadow: -1px -1px 2px var(--background-primary), -1px 1px 2px var(--background-primary),
    1px -1px 2px var(--background-primary), 1px 1px 2px var(--background-primary);
  -webkit-text-fill-color: var(--text-normal);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 1px 1px;
  text-decoration: none;
  transition: all 350ms ease;
}

.internal-link {
  background-image: linear-gradient(to bottom, var(--bg-accent-55) 0%, var(--bg-accent-55) 100%);
}

.external-link {
  background-image: linear-gradient(
    to bottom,
    var(--bg-sub-accent-55) 0%,
    var(--bg-sub-accent-55) 100%
  );
}

.internal-link:hover {
  text-shadow: -1px -1px 2px var(--background-modifier-border),
    -1px 1px 2px var(--background-modifier-border), 1px -1px 2px var(--background-modifier-border),
    1px 1px 2px var(--background-modifier-border);
  -webkit-text-fill-color: var(--text-sub-accent);
  background-size: 4px 50px;
}

.external-link:hover {
  text-shadow: -1px -1px 2px var(--background-modifier-border),
    -1px 1px 2px var(--background-modifier-border), 1px -1px 2px var(--background-modifier-border),
    1px 1px 2px var(--background-modifier-border);
  -webkit-text-fill-color: var(--text-sub-accent);
  background-size: 4px 50px;
}

/* link */
a,
.internal-link,
.cm-hmd-internal-link,
.cm-link {
  text-decoration: none !important;
  color: var(--text-normal);
  position: relative;
  z-index: 1;
}

.cm-url {
  color: var(--text-faint) !important;
  opacity: 0.4;
  font-weight: normal;
}

.cm-formatting-image {
  color: var(--text-accent) !important;
  opacity: 0.7;
}

/* link hover color */
a:hover,
.internal-link:hover {
  text-decoration: none !important;
  color: var(--text-accent);
}

/**-------------------**
| TAG STYLING
**--------------------**/

.cm-s-obsidian .CodeMirror-line span.cm-hashtag {
  position: relative;
  color: var(--text-accent);
  opacity: 1;
  font-family: var(--tag-font-family);
  font-style: italic;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 500;
}

.cm-s-obsidian .CodeMirror-line span.cm-formatting-hashtag {
  color: var(--text-faint);
}

/** tags */

a.tag {
  background: #100e18;
  color: #7a7a8c;
  color: var(--text-accent);
  white-space: nowrap;
  border: 2px solid #28242f;
  border-radius: 2rem;
  padding: 0.05rem 0.5rem;
  font-family: var(--tag-font-family);
  font-size: 0.8rem;
  background: linear-gradient(to bottom, rgba(25, 22, 33) 0%, rgba(25, 22, 33) 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 0 0;
  text-decoration: none;
  transition: all 400ms ease;
}

a.tag:hover {
  color: var(--text-normal) !important;
  border-color: var(--text-accent);
  opacity: 1;
  background-size: 4px 50px;
}

/**-------------------**
| INLINE CODE STYLING
**--------------------**/

.CodeMirror-activeline
  span.cm-inline-code:not(.cm-formatting):not(.cm-hmd-indented-code):not(.obsidian-search-match-highlight) {
  padding: 0 !important;
  margin: 0 !important;
}

.cm-s-obsidian span.cm-inline-code {
  color: rgba(14, 210, 247, 0.9) !important;
}

/**-------------------**
| CODE FENCE STYLING
**--------------------**/

.cm-s-obsidian pre.HyperMD-codeblock {
  color: var(--text-sub-accent);
}

.cm-s-obsidian div.HyperMD-codeblock-bg {
  background-color: var(--background-secondary-alt);
}

/**-------------------**
| BLOCKQUOTE STYLING
**--------------------**/

/* Remove blockquote left margin */
blockquote {
  margin-inline-start: 0px;
}

/* blockquote style overwrite */

.markdown-preview-view blockquote {
  position: relative;
  padding: 15px 10px 15px 10px;
  color: #bdbdbd;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 0px;
  border-left: 3px rgba(14, 210, 247, 0.5) solid;
  border-top: transparent;
  border-bottom: transparent;
  border-right: transparent;
  background: linear-gradient(135deg, rgba(32, 28, 41, 0.45), #100e17);
}

.markdown-preview-view blockquote::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0px;
  height: 2px;
  width: 60%;
  background: linear-gradient(90deg, rgba(13, 185, 215, 0.5), #13111a);
}

.markdown-preview-view blockquote::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0px;
  height: 2px;
  width: 25%;
  background: linear-gradient(90deg, rgba(13, 185, 215, 0.5), #15131c);
}

.markdown-preview-view blockquote p {
  position: relative;
  margin-top: 5px;
}


/*
.markdown-preview-view blockquote p:first-of-type::before {
  content: '!';
  font-style: italic;
  font-weight: 700;
  font-size: 18px;
  color: var(--text-accent);
  position: absolute;
  top: 0.1rem;
  left: -1.8rem;
}
*/
/**-------------------**
| FRONT-META STYLING
**--------------------**/

.cm-s-obsidian span.cm-def,
.cm-s-obsidian span.cm-atom {
  color: var(--text-faint);
}
.cm-s-obsidian span.cm-meta {
  color: var(--text-accent);
}

.cm-s-obsidian span.cm-string {
  color: var(--text-sub-accent);
}

/**-------------------**
| CODE STYLING
**--------------------**/

/** inline code */
.markdown-preview-view code {
  overflow-wrap: break-word;
  background-color: rgba(14, 210, 247, 0.05);
  word-wrap: break-word;
  padding: 0 5px;
  border-radius: 0.3rem;
  margin: 0 0.3rem;
  color: rgba(14, 210, 247, 0.9) !important;
}

.theme-dark :not(pre) > code[class*='language-'],
.theme-dark pre[class*='language-'] {
  background-color: var(--background-secondary);
}

.markdown-preview-view img {
  display: block;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
}


/** code syntax theme **/

.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-comment {
  color: #6272a4;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-string,
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-string-2 {
  color: #f1fa8c;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-number {
  color: #bd93f9;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-variable {
  color: #50fa7b;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-variable-2 {
  color: white;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-def {
  color: #50fa7b;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-operator {
  color: #ff79c6;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-keyword {
  color: #ff79c6;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-atom {
  color: #bd93f9;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-meta {
  color: #f8f8f2;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-tag {
  color: #ff79c6;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-attribute {
  color: #50fa7b;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-qualifier {
  color: #50fa7b;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-property {
  color: #66d9ef;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-builtin {
  color: #50fa7b;
}
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-variable-3,
.theme-dark .cm-s-obsidian pre.HyperMD-codeblock span.cm-type {
  color: #ffb86c;
}

/** prism.js dracular theme **/

/*
* Dracula Theme for Prism.JS
*
* @author Gustavo Costa
* e-mail: gusbemacbe@gmail.com
*
* @contributor Jon Leopard
* e-mail: jonlprd@gmail.com
*
* @license MIT 2016-2018
*/

pre::-webkit-scrollbar {
  width: 14px;
}

code[class*='language-'],
pre[class*='language-'] {
  color: #ccc;
  background: rgb(40, 41, 54);
  text-shadow: none;
  font-family: 'OperatorMonoSSmLig-Book', PT Mono, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
    monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection,
code[class*='language-']::-moz-selection,
code[class*='language-'] ::-moz-selection {
  text-shadow: none;
  background-color: #5a5f80;
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection,
code[class*='language-']::selection,
code[class*='language-'] ::selection {
  text-shadow: none;
  background-color: #5a5f80;
}

@media print {
  code[class*='language-'],
  pre[class*='language-'] {
    text-shadow: none;
  }
}

/* Code blocks */
:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: rgba(40, 41, 54, 1);
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  padding: 4px 7px;
  border-radius: 0.3em;
  white-space: normal;
}

.limit-300 {
  height: 300px !important;
}

.limit-400 {
  height: 400px !important;
}

.limit-500 {
  height: 500px !important;
}

.limit-600 {
  height: 600px !important;
}

.limit-700 {
  height: 700px !important;
}

.limit-800 {
  height: 800px !important;
}

.theme-dark .token.comment {
  color: rgba(98, 114, 164, 1);
}

.theme-dark .token.prolog {
  color: rgba(207, 207, 194, 1);
}

.theme-dark .token.tag {
  color: rgba(220, 104, 170, 1);
}

.theme-dark .token.entity {
  color: rgba(139, 233, 253, 1);
}

.theme-dark .token.atrule {
  color: rgba(98, 239, 117, 1);
}

.theme-dark .token.url {
  color: rgba(102, 217, 239, 1);
}

.theme-dark .token.selector {
  color: rgba(207, 207, 194, 1);
}

.theme-dark .token.string {
  color: rgba(241, 250, 140, 1);
}

.theme-dark .token.property {
  color: rgba(255, 184, 108, 1);
}

.theme-dark .token.important {
  color: rgba(255, 121, 198, 1);
  font-weight: bold;
}

.theme-dark .token.punctuation {
  color: white;
}

.theme-dark .token.number {
  color: rgba(189, 147, 249, 1);
}

.theme-dark .token.function {
  color: rgba(80, 250, 123, 1);
}

.theme-dark .token.class-name {
  color: rgba(255, 184, 108, 1);
}

.theme-dark .token.keyword {
  color: rgba(255, 121, 198, 1);
}

.theme-dark .token.boolean {
  color: rgba(255, 184, 108, 1);
}

.theme-dark .token.operator {
  color: rgba(139, 233, 253, 1);
}

.theme-dark .token.char {
  color: rgba(255, 135, 157, 1);
}

.theme-dark .token.regex {
  color: rgba(80, 250, 123, 1);
}

.theme-dark .token.variable {
  color: rgba(80, 250, 123, 1);
}

.theme-dark .token.constant {
  color: rgba(255, 184, 108, 1);
}

.theme-dark .token.symbol {
  color: rgba(255, 184, 108, 1);
}

.theme-dark .token.builtin {
  color: rgba(255, 121, 198, 1);
}

.theme-dark .token.attr-value {
  color: #7ec699;
}

.theme-dark .token.deleted {
  color: #e2777a;
}

.theme-dark .token.namespace {
  color: #e2777a;
}

.theme-dark .token.bold {
  font-weight: bold;
}

.theme-dark .token.italic {
  font-style: italic;
}

.theme-dark .token {
  color: #ff79c6;
}

.language-cpp .theme-dark .token.string {
  color: #8be9fd;
}

.language-c .theme-dark .token.string {
  color: #8be9fd;
}

.theme-dark .language-css .token.selector {
  color: rgba(80, 250, 123, 1);
}

.theme-dark .language-css .token.property {
  color: rgba(255, 184, 108, 1);
}

.language-java span.theme-dark .token.class-name {
  color: #8be9fd;
}

.language-java .theme-dark .token.class-name {
  color: #8be9fd;
}

.language-markup .theme-dark .token.attr-value {
  color: rgba(102, 217, 239, 1);
}

.language-markup .theme-dark .token.tag {
  color: rgba(80, 250, 123, 1);
}

.language-objectivec .theme-dark .token.property {
  color: #66d9ef;
}

.language-objectivec .theme-dark .token.string {
  color: #50fa7b;
}

.language-php .theme-dark .token.boolean {
  color: #8be9fd;
}

.language-php .theme-dark .token.function {
  color: #ff79c6;
}

.language-php .theme-dark .token.keyword {
  color: #66d9ef;
}

.language-ruby .theme-dark .token.symbol {
  color: #8be9fd;
}

.language-ruby .theme-dark .token.class-name {
  color: #cfcfc2;
}

pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre.line-numbers > code {
  position: relative;
  white-space: inherit;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em; /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows > span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows > span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}

/*JB added snippets*/

div[src$="#portrait"] {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 200px;
  clip-path: ellipse(32% 45% at 50% 50%);
}

div[src$="#sideleft"] {
  position: relative;
  float: left;
  width: 35%;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 12px;
}
div[src$="#sideright"] {
  position: relative;
  float: right;
  width: 35%;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 12px;
}

div[alt$="-sbq"] {
    background-color: #6096cc;
    position: relative;
    right: -20px;
    float: right;
    clip-path: polygon(0% 0%,100% 0%,100% 80%,44% 80%,20% 100%,25% 80%,0% 80%);
    width: 35%;
    margin-top: 5px;
    margin-left: 10px;
  }

  div[src$="-sbq"] div.markdown-embed-link {
    visibility: hidden;
  }

  div[src$="-sbq"] div.markdown-embed {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  div[alt$="-sbq"] .markdown-preview-view {
    padding: 3px;
    padding-left: 10px;
    padding-bottom: 40px;
  }
  div[src$="-sbq"] .markdown-preview-view p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: larger;
    font-style: italic;
    color: black;
  }


/***************************************/
/* table */
/***************************************/


th {
font-weight: 800 !important;
}


.markdown-preview-view th {
font-weight: 800;
background-color: var(--background-secondary) !important;
}


thead {
border-bottom: 3px solid var(--background-modifier-border);
}


.table {
padding: 4px;
line-height: normal;
display: block;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 4px;
}

/* Naked Embeds */
.markdown-embed-title { display: none; }
.markdown-preview-view .markdown-embed-content { padding 0px;}

.markdown-preview-view .markdown-embed-content>:first-child { margin-top: 0;}
.markdown-preview-view .markdown-embed-content>:last-child { margin-bottom: 0;}

/*remove the following two line, you will get border and scroll*/
.markdown-preview-view .markdown-embed { border:none; padding:0; margin:0; }
.markdown-preview-view .markdown-embed-content {
  max-height: unset;
  background-color: var(--background-secondary); /*define different bg color*/
}

/* Remove link in embeds */
.markdown-embed-link, .file-embed-link{
 display: none;
  }


/*click on image to zoom*/
  .markdown-preview-view .internal-embed img {
    cursor:zoom-in;}

  .markdown-preview-view .internal-embed img:active {
    cursor:zoom-out;
    display:block;
    z-index:100;
    position:fixed;
      max-height:calc(100% + 1px);
      max-width:calc(100% - 20px);
      height:calc(100% + 1px);
      width:100%;
      object-fit:contain;
      margin:-0.5px auto 0;
      text-align:center;
      top:50%;
      transform:translateY(-50%);
      transition: transform .7s ease-in-out;
      transition-delay: .1s;
      padding:0;
      left:0;
      right:0;
      bottom:0;
      background:var(--background-primary);
      mix-blend-mode: normal;
      filter: opacity(1);
    }


  /* Stickies*/

  .stickies {
    text-align: center;
    transition: width 2s;
    padding:  3px;
    margin: 20px;
    position: relative;
    float: left;
    right: -10px;
    box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.3);
    width: 35%;
    background: #073c4a;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(-4deg);
    transition: all 2s ease;
    z-index: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 0px;
    color: #AAAAAA;
  }
/*
  .stickies::after {
    content: "";
    left: -1%;
    top: -10px;
    background: ffff00;
    height: 40px;
    width: 15px;
    border-radius: 10px;
    border: 3px solid black;
    display: inline-block;
    position: absolute;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(-11deg);
    z-index: 11;
  }

  .stickies::before {
    width: 11px;
    height: 20px;
    content: "";
    background: ffff00;
    display: inline-block;
    position: absolute;
    left: -1.3%;
    top: -2px;
    border-radius: 10px;
    border: 3px solid black;
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    z-index: 10;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(-11deg);
  }
*/
  .stickies2 {
    position: relative;
    float: left;
    box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.3);
    width: 30%;
    background: #edec92;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(-2deg);
    transition: all 2s ease;
    z-index: 1;
    padding: 10px;
    margin: 10px;
    color: black;
  }

  .stickies2::after {
    content: "";
    display: block;
    height: 32px;
    width: 2px;
    position: absolute;
    left: 50%;
    top: -10px;
    z-index: 1;
    border-radius: 50%;
    display: inline-block;
    height: 15px;
    width: 15px;
    border: 1px;
    box-shadow: inset -10px -10px 10px #f0b7a4, inset 3px 3px 5px;
  }

  /*Image Flags Snippet by Lithou
  http://github.com/lithou/sandbox
  */

  div{
      --coremarg: 1%;
      --extramarg: 1%; /* This margin is used for any added margin between items */
      --defaultwidth: 60%; /*This is the default width for core flags such as the "side" and "tape" */
  }

  /* Core Flags */
      /*side */
          div[alt*="rightside"]{
              position: relative;
              width: var(--defaultwidth);
              float: right;
              margin: 0px;
              margin-left: var(--coremarg);
          }
          div[alt*="leftside"]{
              position: relative;
              width: var(--defaultwidth);
              float: left;
              margin: 0px;
              margin-left: var(--coremarg);
          }

      /*tape */
          div[alt*="+tape"] {
              position: relative;
              float: right;
              width: var(--defaultwidth);
              margin-left: var(--coremarg);
              -webkit-transform: rotate(0deg);
              -moz-transform: rotate(0deg);
              -o-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(2deg);
          }

          div[alt*="+tape"]::before {
              content: "";
              display: block;
              position: relative;
              margin: auto;
              width: 100px;
              height: 30px;
              top: 12px;
              background: rgba(255, 234, 118, 0.377); /*here you can chosse the scotch tape background*/
              -webkit-box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
              -moz-box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
              box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
              z-index: 10;
              clip-path: polygon(50% 0%, 100% 0%,
              98% 10%, 100% 20%, 98% 30%, 100% 40%, 98% 50%, 100% 60%, 98% 70%, 100% 80%, 98% 90%,100% 100%,
              0% 100%, 2% 90%, 0% 80%, 2% 70%, 0% 60%, 2% 50%, 0% 40%, 2% 30%, 0% 20%, 2% 10%, 0% 0%);
          }
          div[alt*="-lg"]::before{
              width: 100px;
              height: 30px;
          }

          div[alt*="-med"]::before{
              width: 70px;
              height: 25px;
          }

          div[alt*="-sm"]::before{
              width: 45px;
              height: 15px;
              top: 8px;
          }
          div[alt*="-thumb"]::before{
              width: 25px;
              height: 5px;
              top: 2px;
          }
      /* Push Pin */
          div[alt*="+pin"] {
              position: relative;
              float: right;
              width: var(--defaultwidth);
              margin: auto;
              margin-left: var(--coremarg);
              -webkit-transform: rotate(0deg);
              -moz-transform: rotate(0deg);
              -o-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
              transform: rotate(2deg);}
          div[alt*="+pin"]::before {
              content: "";
              position: absolute;
              width: 5px;
              height: 5px;
              background-color: #4588cc;
              top: -3%;
              left: 50%;
              border: solid #336699 8px;
              border-radius: 50%;
              box-shadow: #274d74 -5px 3px 1px;}
      /* Portrait and Landscape */
          div[alt*="+portrait"]{
              position: relative;
              width: calc(var(--defaultwidth)/2);
              float: right;
              /* background-color:blue; This setting will create a border effect of set color */
              clip-path: ellipse(36% 46% at 50% 50%);}
          div[alt*="+portrait"]>img{
              vertical-align: middle;
              clip-path: ellipse(35% 45% at 50% 50%);}
          div[alt*="+landscape"]{
              position: relative;
              width: var(--defaultwidth);
              float: right;
              /* background-color:blue; This setting will create a border effect of set color */
              clip-path: ellipse(46% 36% at 50% 50%);}
          div[alt*="+landscape"]>img{
              vertical-align: middle;
              clip-path: ellipse(45% 35% at 50% 50%);}

      /* Banner and HR */
          div[alt*="+banner"]{
              height: 100px;
              overflow: hidden;

          }

          div[alt*="+banner"]>img{
              margin-top: -130px;
              }

          div[alt*="+hr"]{
              height: 10px;
              overflow: hidden;
              border-radius: 10px;
              margin-top: 10px;

          }
          

          div[alt*="+hr"]>img{
              margin-top: 10px;
              }


      /*Custom Core Flags */
      div[alt*="+custom1"]{
          position: relative;
          width: var(--defaultwidth);
          float: right;
          margin-top: 0px;
          margin-bottom: 0px;
      }
      div[alt*="+custom2"]{
          position: relative;
          width: var(--defaultwidth);
          float: right;
          margin-top: 0px;
          margin-bottom: 0px;
      }




  /* Modifier Flags */
      /* Orientation and position */
          div[alt*="-left"]{
              float: left;
              margin: 0px;
              margin-right: var(--extramarg);}
          div[alt*="-right"]{
              float: right;
              margin: 0px;
              margin-left: var(--extramarg);}
          div[alt*="-fix"]{position: fixed;}
          div[alt*="-abs"]{position: absolute;}

      /* Size */
          div[alt*="-thumb"]{width: 11.50%;}
          div[alt*="-sm"]{width: 24%;}
          div[alt*="-med"]{width: 32.3333%;}
          div[alt*="-lg"]{width: 49%;}
          div[alt*="-huge"]{width: 67%;}
          div[alt*="-cwidth"]{float: none;margin-left: -10%;width: 120%;}

  /* Borders */
  div[alt*="-border1"]>img{border: solid black 3px;}
  div[alt*="-border2"]>img{border: solid white 3px;}
  div[alt*="-bradius1"]>img{border-radius: 5px;}
  div[alt*="-bradius2"]>img{border-radius: 20px;}
  div[alt*="-bradiustl"]>img{border-top-left-radius: 20px;}
  div[alt*="-bradiusbr"]>img{border-bottom-right-radius: 20px;}
  div[alt*="-bradiustr"]>img{border-top-right-radius: 20px;}
  div[alt*="-bradiusbl"]>img{border-bottom-left-radius: 20px;}
  div[alt*="-bthick"]>img{border-width: 5px;}
  div[alt*="-bthin"]>img{border-width: 1px;}

  /* Div Borders */
  div[alt*="-divborder1"]{border: solid #336699 2px;}
  div[alt*="-divborder2"]{border: solid black 2px;}
  div[alt*="-divbradius1"]{border-radius: 5px;}
  div[alt*="-divbradius2"]{border-radius: 20px;}
  div[alt*="-cdivbradius1"]{border-radius: 50px;}


  div[alt*="-shadow1"]>img{
      box-shadow: darkgrey -2px 2px 2px;

  }


  div[alt*="-glow"]>img{
      box-shadow: darkgrey 0px 0px 20px;
  }

  div[alt*="-nofloat"]{
      float:none
  }

/*max out embeds*/
  .markdown-preview-view .markdown-embed-content > .markdown-preview-view {
    max-height: none !important;
  }

  .internal-embed .markdown-embed {
    border:0;
    border-left:0px;
    border-radius:0;
  }


  .popover.hover-popover {
      transform: scale(0.95); /* makes the content smaller*/
      max-height: none !important;    /* was 300*/
      min-height: none !important;
      width: 600px;     /* was 400 */

  }



  .popover.hover-popover.is-loaded .markdown-embed .markdown-embed-content .markdown-preview-view{
    max-height: none !important;
    /*padding: 10px 10px 10px 16px; /*16px  two pop magin */
  }

/*  .popover.hover-popover .markdown-preview-view table{

      min-width: 90%;
      width: 450px;
      max-width: 100%;
      font-size: 90%;
      height: auto;
      margin-left: 0%;
      margin-top: 30px;
      margin-bottom: 20px;

    }

  .popover.hover-popover video {

      min-width: 100%;
      width: 410px;
      max-width: 100%;
      font-size: 90%;
      height: auto;
      margin-left: 0%;
      margin-right: 0%;
      margin-top: 30px;
      margin-bottom: 20px;

    }

    margin: 0.2rem 1rem 1rem 1rem;

    */

  /* JBADD This hides highlighted text,
   i.e. ==text here==
    from displaying in preview or publish
    - permits links in editor too
    MUST BE COMMENTED OUT FOR FACULTY WEBSITE*/

.markdown-embed-content mark {
    display: none !important;
}

mark {
    display: none !important;
}


.page-header {
  display: none;
}

.site-footer {
    display: none;
}

/* Captions for Images
.image-embed[alt]:after {
    content: attr(alt);
    display: block;
    margin: 0 auto;
    font-size: 75%;
    line-height: 1.4;
    color: var(--text-faint);
    text-align: center;
}
*/


.markdown-preview-view markdown-rendered node-insert-event {
  padding: 0px;
}

/* Adjust padding on the embed */
.markdown-embed .markdown-preview-view { /* the padding */
  padding: 5px 5px 5px 10px !important; /* up right down left */
}

/* JBADD ITS Callouts wholesale*/

/*Callout Positioning*/
:not(.is-live-preview) .callout.callout.callout:is([data-callout-metadata~="p+l"],
[data-callout-metadata~=left]) {
  float: left;
  margin: unset;
  margin-right: 8px;
}

:not(.is-live-preview) .callout.callout:is([data-callout-metadata~="p+r"],
[data-callout-metadata~=right]) {
  float: right;
  margin: unset;
  margin-left: 8px;
}

.callout.callout.callout:is([data-callout-metadata~=ctr],
[data-callout-metadata~=center]) {
  display: block;
  margin: auto;
  float: unset;
}

.callout.callout[data-callout-metadata~=wtiny] {
  width: 20%;
}
.callout.callout[data-callout-metadata~=wsmall] {
  width: 30%;
}
.callout.callout[data-callout-metadata~=ws-med] {
  width: 40%;
}
.callout.callout[data-callout-metadata~=wm-sm] {
  width: 50%;
}
.callout.callout[data-callout-metadata~=wmed] {
  width: 60%;
}
.callout.callout[data-callout-metadata~=wm-tl] {
  width: 80%;
}
.callout.callout[data-callout-metadata~=wtall] {
  width: 95%;
}
.callout.callout[data-callout-metadata~=wfull] {
  width: 100%;
}
.callout.callout[data-callout-metadata~=wtiny-c] {
  width: 19%;
}
.callout.callout[data-callout-metadata~=wsmall-c] {
  width: 32.4%;
}
.callout.callout[data-callout-metadata~=ws-med-c] {
  width: 39%;
}
.callout.callout[data-callout-metadata~=wm-sm-c] {
  width: 49%;
}
.callout.callout[data-callout-metadata~=wmed-c] {
  width: 59%;
}
.callout.callout[data-callout-metadata~=wm-tl-c] {
  width: 79%;
}

body .callout.callout.callout:is([data-callout-metadata~=nmg], [data-callout-metadata~=no-margin]) {
  margin: 0;
}

.callout[data-callout-metadata~=collapse] * {
  margin: 0 !important;
  padding: 0 !important;
  grid-gap: 0 !important;
}

.callout.callout.callout:is([data-callout-metadata~=nbrd], [data-callout-metadata~=no-border]) {
  border: 0;
}

.callout.callout:is([data-callout-metadata~=txt-l],
[data-callout-metadata~=text-Left]) > .callout-content {
  text-align: left;
}

.callout.callout:is([data-callout-metadata~=txt-r],
[data-callout-metadata~=text-Right]) > .callout-content {
  text-align: right;
}

.callout.callout:is([data-callout-metadata~=txt-c],
[data-callout-metadata~=text-Center]) > .callout-content {
  text-align: center;
}

.callout.callout:is([data-callout-metadata~=ttl-c],
[data-callout-metadata~=title-Center]) .callout-title {
  justify-content: center;
}
.callout.callout:is([data-callout-metadata~=ttl-c],
[data-callout-metadata~=title-Center]) .callout-title-inner {
  display: block;
  flex: unset;
}

/*Callout Sizing*/
.callout.callout.callout:is([data-callout-metadata~=banner], [data-callout-metadata~=sban]) {
  width: 100%;
  max-width: unset;
}
.callout.callout.callout:is([data-callout-metadata~=banner], [data-callout-metadata~=sban]) :is(.internal-embed, img) {
  width: 100%;
  object-fit: cover;
}

.callout.callout.callout[data-callout-metadata~=clean],
.callout.callout.callout[data-callout-metadata~=clean] .callout-content {
  border: 0;
  box-shadow: none;
  --callout-padding: 0;
}
.callout.callout.callout[data-callout-metadata~=clean] .callout-content,
.callout.callout.callout[data-callout-metadata~=clean] .callout-content .callout-content {
  padding: 0;
}

/*Caption Adjustments*/
.callout:is([data-callout-metadata~=no-t],
[data-callout-metadata~=no-title]) > .callout-title {
  display: none;
}

.callout.callout.callout.callout:is([data-callout-metadata~=s-t],
[data-callout-metadata~=show-title]) > .callout-title {
  display: flex;
}
.callout.callout.callout.callout:is([data-callout-metadata~=s-t],
[data-callout-metadata~=show-title]) p {
  margin-top: 0;
}

.callout:is([data-callout-metadata~=no-i],
[data-callout-metadata~=no-icon]) > .callout-title .callout-icon {
  display: none;
}

.callout:is([data-callout-metadata~=n-th],
[data-callout-metadata~=no-table-header]) .callout-content > table {
  margin-bottom: 5px;
}
.callout:is([data-callout-metadata~=n-th],
[data-callout-metadata~=no-table-header]) .callout-content > table th {
  display: none;
}

.callout[data-callout-metadata~=t-w] table td {
  width: calc(var(--tbl-w) / 2);
}

.callout[data-callout-metadata~=t-w] table {
  width: 100%;
}

.callout:is([data-callout-metadata~=nmg],
[data-callout-metadata~=no-margin]) > .callout {
  margin: 0;
}

.callout[data-callout-metadata~=embed] .callout-content, .callout[data-callout-metadata~=embed] p {
  margin: 0;
  padding: 0;
}

.callout.callout.callout {
  --callout-blue: 42, 131, 156;
  --callout-green: 86, 179, 117;
  --callout-orange: 230, 129, 63;
  --callout-red: 193, 67, 67;
  --callout-purple: 153, 97, 218;
  --callout-gray: 166, 189, 197;
  --callout-yellow: 208, 181, 48;
  --callout-pink: transparent;
}
.callout.callout.callout:is([data-callout-metadata~=color-blue], [data-callout-metadata~=c-blue], [data-callout-metadata~=background-color-blue], [data-callout-metadata~=bg-c-blue]) {
  --callout-color: var(--callout-blue);
}
.callout.callout.callout:is([data-callout-metadata~=color-green], [data-callout-metadata~=c-green], [data-callout-metadata~=background-color-green], [data-callout-metadata~=bg-c-green]) {
  --callout-color: var(--callout-green);
}
.callout.callout.callout:is([data-callout-metadata~=color-orange], [data-callout-metadata~=c-orange], [data-callout-metadata~=background-color-orange], [data-callout-metadata~=bg-c-orange]) {
  --callout-color: var(--callout-orange);
}
.callout.callout.callout:is([data-callout-metadata~=color-red], [data-callout-metadata~=c-red], [data-callout-metadata~=background-color-red], [data-callout-metadata~=bg-c-red]) {
  --callout-color: var(--callout-red);
}
.callout.callout.callout:is([data-callout-metadata~=color-purple], [data-callout-metadata~=c-purple], [data-callout-metadata~=background-color-purple], [data-callout-metadata~=bg-c-purple]) {
  --callout-color: var(--callout-purple);
}
.callout.callout.callout:is([data-callout-metadata~=color-gray], [data-callout-metadata~=c-gray], [data-callout-metadata~=background-color-gray], [data-callout-metadata~=bg-c-gray]) {
  --callout-color: var(--callout-gray);
}
.callout.callout.callout:is([data-callout-metadata~=color-yellow], [data-callout-metadata~=c-yellow], [data-callout-metadata~=background-color-yellow], [data-callout-metadata~=bg-c-yellow]) {
  --callout-color: var(--callout-yellow);
}
.callout.callout.callout:is([data-callout-metadata~=color-pink], [data-callout-metadata~=c-pink], [data-callout-metadata~=background-color-pink], [data-callout-metadata~=bg-c-pink]) {
  --callout-color: var(--callout-pink);
}
.callout.callout.callout:is([data-callout-metadata~=color-], [data-callout-metadata~=c-]) {
  --callout-color: var(--callout);
}
.callout.callout.callout:is([data-callout-metadata~=background-blue], [data-callout-metadata~=bg-blue], [data-callout-metadata~=background-color-blue], [data-callout-metadata~=bg-c-blue]) {
  background-color: rgba(var(--callout-blue), 30%);
}
.callout.callout.callout:is([data-callout-metadata~=background-green], [data-callout-metadata~=bg-green], [data-callout-metadata~=background-color-green], [data-callout-metadata~=bg-c-green]) {
  background-color: rgba(var(--callout-green), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-orange], [data-callout-metadata~=bg-orange], [data-callout-metadata~=background-color-orange], [data-callout-metadata~=bg-c-orange]) {
  background-color: rgba(var(--callout-orange), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-red], [data-callout-metadata~=bg-red], [data-callout-metadata~=background-color-red], [data-callout-metadata~=bg-c-red]) {
  background-color: rgba(var(--callout-red), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-purple], [data-callout-metadata~=bg-purple], [data-callout-metadata~=background-color-purple], [data-callout-metadata~=bg-c-purple]) {
  background-color: rgba(var(--callout-purple), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-gray], [data-callout-metadata~=bg-gray], [data-callout-metadata~=background-color-gray], [data-callout-metadata~=bg-c-gray]) {
  background-color: rgba(var(--callout-gray), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-yellow], [data-callout-metadata~=bg-yellow], [data-callout-metadata~=background-color-yellow], [data-callout-metadata~=bg-c-yellow]) {
  background-color: rgba(var(--callout-yellow), 10%);
}
.callout.callout.callout:is([data-callout-metadata~=background-pink], [data-callout-metadata~=bg-pink], [data-callout-metadata~=background-color-pink], [data-callout-metadata~=bg-c-pink]) {
  background-color: rgba(var(--callout-pink), 10%);
}

/*--Callout Types--*/
body {
  --kbn-radius: 3px;
  --co-radius: 7px;
}

/* Minimalist Style */
.alt-co .callout.callout,
.callout[data-callout-metadata~=alt-co] {
  background: rgba(var(--callout-color), 0.1);
  border: 0;
  margin-left: 40px;
  margin-right: 40px;
  border-radius: var(--radius, var(--co-radius));
  box-shadow: 1px 1px 0 rgba(var(--callout-color), 0.2);
}
.alt-co .callout.callout p:first-child,
.callout[data-callout-metadata~=alt-co] p:first-child {
  margin-block-start: 5px;
}
.alt-co .callout.callout:not(.is-collapsed) .callout-title,
.callout[data-callout-metadata~=alt-co]:not(.is-collapsed) .callout-title {
  padding-bottom: 0;
}
.alt-co .callout.callout .callout-title,
.callout[data-callout-metadata~=alt-co] .callout-title {
  background: transparent;
}
.alt-co .callout.callout .callout-content,
.callout[data-callout-metadata~=alt-co] .callout-content {
  border: 0;
}

.callout.callout[data-callout-metadata~=alt-line] {
  border: 0;
}
.callout.callout[data-callout-metadata~=alt-line] .callout-title {
  background: transparent;
  border-bottom: 2px solid var(--table, var(--background-modifier-border));
  padding: 5px 0;
}
.callout.callout[data-callout-metadata~=alt-line] .callout-fold {
  color: rgb(var(--callout-color));
}
.callout.callout[data-callout-metadata~=alt-line] .callout-content.callout-content {
  border: 0;
  border-bottom: 1px solid rgba(var(--callout-color), 0.5);
}

.callout.callout[data-callout-metadata~=dim-hvr]:not(:hover),
.callout.callout[data-callout-metadata~=dim].is-collapsed:not(:hover) {
  opacity: 30%;
  transition: opacity 300ms;
}

.co-ttl-ctr .callout-title {
  justify-content: center;
}
.co-ttl-ctr .callout-title-inner {
  display: block;
  flex: unset;
}

/*Infobox*/
:is(.is-mobile,
.is-mobile .is-live-preview,
.is-live-preview) .callout[data-callout~=infobox]:not([data-callout-metadata~=mobile]) {
  float: unset !important;
  max-width: 100%;
  margin: 0 !important;
  width: auto;
}

.callout[data-callout~=infobox] {
  --callout-color: var(--note, var(--background-primary));
  --callout-padding: 0;
  border: 0;
  box-shadow: none;
  margin: 0;
  margin-left: 8px;
  width: auto;
  max-width: 100vw;
  float: right;
}
.callout[data-callout~=infobox] .callout-title {
  padding: 0;
  justify-content: left;
}
.callout[data-callout~=infobox].is-collapsed .callout-fold {
  border: 1px solid var(--hr, var(--background-modifier-border));
  padding: 0px 0px;
}
.callout[data-callout~=infobox] .callout-title :is(.callout-icon, .callout-title-inner) {
  display: none;
}
.callout[data-callout~=infobox]:not(:hover):not(.is-collapsed) .callout-title {
  background-color: transparent;
}
.callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]):not(:hover):not(.is-collapsed) > .callout-title {
  display: flex;
  gap: 0;
}
.callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]).is-collapsed .callout-title {
  border: 1px solid var(--hr, var(--background-modifier-border));
  display: flex;
}
.callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]) .callout-fold, .callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]) .callout-title .callout-title-inner {
  display: unset;
  align-items: left;
  align-content: left;
  padding: 5px 10px;
}
.callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]) .callout-fold {
  padding: unset;
  margin-top: auto;
  margin-bottom: auto;
}
.callout[data-callout~=infobox]:is([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]).is-collapsed .callout-fold {
  border: 0;
}
.callout[data-callout~=infobox] .callout-content {
  padding: 10px;
  border: 1px solid var(--table, var(--background-modifier-border));
  margin: 0;
  border-radius: var(--radius, var(--co-radius));
}
.callout[data-callout~=infobox] table {
  width: 100%;
}
.callout[data-callout~=infobox] table td {
  white-space: pre-wrap;
  word-wrap: normal;
  word-break: normal;
}
.callout[data-callout~=infobox] :is(p, table) {
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0;
}
.callout[data-callout~=infobox] :is(h1, h2, h3, h4, h5, h6) {
  font-size: 20px;
  text-align: left;
  margin: 0;
  padding: 2px;
  color: var(--text-normal);
  background: var(--outer-bar, var(--background-secondary));
}
.callout[data-callout~=infobox] p, .callout[data-callout~=infobox] .internal-embed, .callout[data-callout~=infobox] img {
  margin: auto;
  padding: auto;
  text-align: left;
}
.callout[data-callout~=infobox][data-callout-metadata][data-callout-metadata][data-callout-metadata~=left] {
  margin-right: 25px;
  float: left;
}
.callout[data-callout~=infobox][data-callout-metadata~=wikipedia] table th, .callout[data-callout~=infobox][data-callout-metadata~=wikipedia] table th:nth-child(even), .callout[data-callout~=infobox][data-callout-metadata~=wikipedia] table :is(td, tr) {
  background: transparent;
}
.callout[data-callout~=infobox][data-callout-metadata~=wikipedia] table tr td {
  border-top: 1.1px solid var(--hr);
}
.callout[data-callout~=infobox][data-callout-metadata~=wikipedia] table tr:last-child {
  margin-bottom: 2px;
}

@media print {
  .callout[data-callout~=infobox] {
    max-width: 400px;
  }
}
.theme-light .callout[data-callout~=infobox][data-callout-metadata~=wikipedia] {
  --th-text: var(--th) ;
}

/*Image Grid*/
.callout.callout[data-callout=grid] {
  --callout-padding: 0;
  --callout-content-padding: 0;
  background: transparent;
  border: 0;
  margin: 0;
  box-shadow: none;
}
.callout.callout[data-callout=grid] .callout-content {
  display: block;
  width: 100%;
  border: 0;
  box-shadow: unset;
  padding: 0;
}
.callout.callout[data-callout=grid] .callout-title {
  display: none;
}
.callout.callout[data-callout=grid] .callout-content p {
  display: flex;
  margin-block-start: 0;
  margin-block-end: 0;
  justify-content: center;
}
.callout.callout[data-callout=grid] .callout-content img {
  display: table-cell;
  vertical-align: middle;
  padding: 3px;
  max-height: 35vh;
}
.callout.callout[data-callout=grid] .callout-content img[alt=wfull] {
  max-height: unset;
}
.callout.callout[data-callout=grid][data-callout-metadata~=masonry] .callout-content p {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  grid-gap: 0;
  margin: 0;
  margin-top: 1px;
}
.callout.callout[data-callout=grid][data-callout-metadata~=masonry] .callout-content img {
  display: flex;
  flex: 1;
  align-self: stretch;
  object-fit: cover;
  max-height: unset;
}

/*Captions*/
.callout.callout[data-callout~=caption] {
  background: transparent;
  text-align: center;
  box-shadow: none;
  border: 0;
  padding: 0;
  margin: 0;
  margin-top: -10px;
  max-width: 30vh;
}
.callout.callout[data-callout~=caption] .callout-title {
  display: none;
}
.callout.callout[data-callout~=caption] p {
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--text-faint);
}

/*Kanban*/
.callout.callout[data-callout~=kanban] {
  --callout-color: var(--text-normal);
  --callout-icon: layout-dashboard;
  --item-outline: 0 0 0 1px var(--outline, var(--background-modifier-border));
  --box-shadow: 0 0 5px var(--outline, var(--background-modifier-box-shadow));
  --lane-width: 250px;
  background: transparent;
  box-shadow: none;
  border: 0;
  width: auto;
  padding: 0;
}
.callout.callout[data-callout~=kanban] .callout-title {
  justify-content: center;
  background: var(--background-primary-alt);
  padding: 5px;
  border-radius: var(--radius, var(--co-radius));
}
.callout.callout[data-callout~=kanban] .callout-title-inner {
  flex: unset;
}
.callout.callout[data-callout~=kanban] .callout-content {
  padding: 0;
}
.callout.callout[data-callout~=kanban] ul li::marker, .callout.callout[data-callout~=kanban] ul li::before, .callout.callout[data-callout~=kanban] ul::before, .callout.callout[data-callout~=kanban] :is(ul, ul ul) .list-collapse-indicator {
  list-style-type: none;
  color: transparent;
  display: none !important;
}
.callout.callout[data-callout~=kanban] ul {
  display: flex;
  margin-block-start: 5px;
  padding-inline-start: 0;
  text-align: center;
  overflow: auto;
}
.callout.callout[data-callout~=kanban] ul.dataview-ul {
  margin-inline-start: unset;
}
.callout.callout[data-callout~=kanban] ul li {
  min-width: var(--lane-width);
  border: 0;
  padding: 5px;
  margin: 5px 3px;
  padding-top: 4px;
  background: var(--note, var(--background-primary-alt));
  border-radius: var(--radius, var(--kbn-radius));
  box-shadow: var(--item-outline), var(--box-shadow);
}
.callout.callout[data-callout~=kanban] ul ul {
  flex-direction: column;
  text-align: left;
  overflow: unset;
}
.callout.callout[data-callout~=kanban] ul ul li {
  min-width: calc(var(--lane-width) / 2);
  padding: 5px;
  box-shadow: var(--item-outline);
  background: var(--code-bg, var(--background-primary));
}
.callout.callout[data-callout~=kanban] ul ul li :is(img, .internal-embed) {
  margin-bottom: -6px;
}
.callout.callout[data-callout~=kanban] ul.contains-task-list {
  padding-inline-start: 20px;
}
.callout.callout[data-callout~=kanban] .task-list-item-checkbox {
  cursor: default;
}

/* Recite */
.callout.callout[data-callout=recite] {
  --callout-color: 193, 67, 67;
  --callout-icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path stroke="none" fill="none" d="M0 0h24v24H0z"/><path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455z"/></svg>';
  padding: 10px;
  padding-top: 5px;
  margin: 10px;
  border-style: solid;
  border-width: 11px;
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAYAAADxJz2MAAAFWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjgwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iNjAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSI4MCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iNjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjMwMC8xIgogICB0aWZmOllSZXNvbHV0aW9uPSIzMDAvMSIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMS0wMlQxNjowNTo0MS0wODowMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMS0wMlQxNjowNTo0MS0wODowMCI+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+RCZhbXA7RCBCb3JkZXI8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzp0aXRsZT4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0icHJvZHVjZWQiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFmZmluaXR5IERlc2lnbmVyIDEuMTAuNCIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMi0wMS0wMlQxNjowNTo0MS0wODowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+SLcLyAAAAYFpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZHPK0RRFMc/8xD50SiUhcVLWA35UWJjMZNfhcXMKIPNm2fejJo3Xu+NJFtlO0WJjV8L/gK2ylopIiVLWRMbpuc8o0Yy53bP/dzvPed077mgRNO66ZR3g5nJ2uHRoDoTm1Urn/Ch0EQdqqY71mRkJEpJe7+VaLHrTq9W6bh/rWYh4ejgqxIe0i07KzwmPLGStTzeEm7UU9qC8IlwwJYLCt94erzAzx4nC/zpsR0Nh0CpF1aTvzj+i/WUbQrLy2kz08v6z328l9QmMtMRWVtltuAQZpQgKuMME6KfHgbF99NJL12yo0R+93f+FEuSq4u3WMVmkSQpsgREXZbqCVkN0RMy0qx6/f/bV8fo6y1Urw1CxaPrvrZD5Sbkc677ceC6+UMoe4DzTDF/aR8G3kTPFbW2PfCvw+lFUYtvw9kGNN9bmq19S2UyFcOAl2Ooi0HDFVTPFXr2c87RHUTX5KsuYWcXOiTeP/8FK5Jny8RYHqYAAAAJcEhZcwAALiMAAC4jAXilP3YAAAG5SURBVHic7dyxSiNRFMbxv0OwEkvZfrEWleWAvbA+giB5ANtgcx/gFJK0+wAbwUdYV7bZRjiIirXYL1tbiajFXHV3Y5KBbIyTfL8yOQxfPu5kprkXKnCzRTfrVpmdBm7WdbPFKrNFhYt9As6BnVGD1cgOcJ5/+0CNfl+4WQG0AB80N8U+AiduloBOirh/bejVFehmH4AjYJ/ZLO9Jg7KDo9xJj54C3ewzcAlsjjdbrWwCl7mbvzyvLjebp7xdW28YrE6WgG9u1gFSiriFvALdbBk4QeVV0aL8b1wGKNysCVwA6xONVS/rwIWbNefc7GHSaeps6HugiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIyCzQTqURaafSiBpAE/gCLAwbThFzY0/0DlS8K2+A3SJFdIE14Gy8sabKGbCWIroFQIq4AjaA9kRj1UMb2MidvexYzzuw99zsB/CVcoe2vPgNNFPE9z8/7HmI5IEV4PiNgtXBMbDyb3nQ5ymcIn4BW8AecDfebO/aHWUHW7mTHn2PNMnnpLTd7CdwSHmOyiy5BrZTxOmgoaHvgfkCq8DBfwpWBwfA6rDyAB4BTjVxWZByO0gAAAAASUVORK5CYII=") 11;
  border-image-outset: 9px 0px;
  box-shadow: 0px 0px 10px var(--outline, var(--background-modifier-box-shadow));
  background: var(--note, var(--background-primary));
  text-align: justify;
}
.callout.callout[data-callout=recite] .callout-title {
  padding: 0;
  background: transparent;
  color: rgba(var(--callout-color), 1);
  justify-content: center;
}
.callout.callout[data-callout=recite][data-callout-metadata*=bg-]:not([data-callout-metadata*=bg-c]) .callout-title {
  color: var(--text-normal);
}
.callout.callout[data-callout=recite] .callout-title-inner {
  flex: unset;
}
.callout.callout[data-callout=recite] .callout-content {
  padding: 0;
  padding-top: 10px;
}

/* Metadata */
.callout.callout[data-callout~=Metadata i] {
  --callout-icon: layers;
  --callout-color: 82, 139, 212;
  border-width: 2px;
  box-shadow: 0px 0px 0px 1px var(--outline);
}
.callout.callout[data-callout~=Metadata i] .callout-title {
  padding: 5px;
  background-color: transparent;
  justify-content: center;
}
.callout.callout[data-callout~=Metadata i] .callout-fold {
  color: rgb(var(--callout-color));
}
.callout.callout[data-callout~=Metadata i] .callout-title-inner {
  flex: unset;
  color: rgb(var(--callout-color));
}
.callout.callout[data-callout~=Metadata i] .callout-content {
  padding: 10px;
  padding-top: 0px;
}
.callout.callout[data-callout~=Metadata i] .callout-content strong {
  color: rgb(var(--callout-color));
}
.callout.callout[data-callout~=Metadata i] .dataview.inline-field-key {
  background: rgb(var(--callout-color));
  color: var(--text-on-accent);
  font-weight: 900;
}
.callout.callout[data-callout~=Metadata i] .dataview.inline-field-value {
  font-weight: unset;
  background: transparent;
}
.callout.callout[data-callout~=Metadata i] table th {
  background-color: var(--aside-bg, rgba(var(--callout-color), 0.5));
}
.callout.callout[data-callout~=Metadata i] table {
  --tbl-td-h: 0;
  --tbl-td-w: 5px;
  white-space: nowrap;
  margin: 0;
  width: 100%;
}
.callout.callout[data-callout~=Metadata i] .callout-content p:last-child {
  margin-bottom: 0;
}
.callout.callout[data-callout~=Metadata i] .callout-content p:first-child {
  margin-top: 0;
}
.callout.callout[data-callout~=Metadata i] .callout-content, .callout.callout[data-callout~=Metadata i] ul {
  margin: 0;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at] {
  background: var(--outer-bar);
  border: 0;
  text-align: center;
  padding: 0;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at].is-collapsible:not(.is-collapsed) {
  display: flex;
  flex-direction: row-reverse;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at]:not(.is-collapsible) .callout-title, .callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at] .callout-title-inner, .callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at]:not(.is-collapsed) .callout-icon {
  display: none;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at] .callout-fold {
  display: flex;
  align-content: center;
  align-items: center;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at] .callout-fold svg {
  margin-bottom: unset;
}
.callout.callout[data-callout~=Metadata i][data-callout-metadata~=i-at] .callout-content {
  padding: 0px;
  margin: auto;
}
.callout.callout[data-callout~=Metadata i]:is([data-callout-metadata~=tbl-cln], [data-callout-metadata~=table-clean]) table :is(td, tr, th) {
  background-color: transparent;
  border-color: transparent;
}

.callout-list .callout {
  border: 0;
  background-color: var(--note, var(--background-primary));
}
.callout-list .callout-title {
  padding: 5px 10px;
}
.callout-list .callout ul {
  margin-block-start: 0;
  margin-block-end: 0;
}

/* Cards */
.callout[data-callout~=cards] {
  --callout-color: none;
  --callout-icon: layout-dashboard;
  --callout-content-padding: 0px;
  box-shadow: none;
  border: 0;
  width: auto;
  background: transparent;
}
.callout[data-callout~=cards] .callout-title {
  display: none;
}
.callout[data-callout~=cards] .callout-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  border-radius: 0;
  padding-inline-start: 0px;
  padding: 0;
}
.callout[data-callout~=cards] p {
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0;
}
.callout[data-callout~=cards]:not([data-callout-metadata~=nstr], [data-callout-metadata~=no-strong]) strong {
  display: block;
  text-align: center;
  margin: auto;
  background-color: var(--outer-bar, var(--background-secondary));
}


.callout[data-callout~=cards] br {
  display: none;
}

/* Dataview Cards */
.callout[data-callout~=cards][data-callout-metadata~=dataview] {
  --callout-content-padding: 0px;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .callout-content {
  display: unset;
  grid-template-columns: unset;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .dataview.table-view-table {
  display: grid;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .dataview.table-view-table :is(td, tr) {
  border: 0;
  background: transparent;
  padding: 0;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .dataview.table-view-table strong {
  background: transparent;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .table-view-thead th {
  border: 0;
  background-color: transparent;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .table-view-thead tr {
  display: none;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .dataview.table-view-table tbody {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.callout[data-callout~=cards][data-callout-metadata~=dataview] .dataview.table-view-table tbody tr {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 10px;
  box-shadow: 0 0 0 1px var(--outline, var(--background-modifier-box-shadow)), 2px 2px 0 var(--outline, var(--background-modifier-box-shadow));
}

.callout[data-callout~=cards][data-callout-metadata~=dvl] .callout-content {
  display: block;
}
.callout[data-callout~=cards][data-callout-metadata~=dvl] br {
  display: unset;
}
.callout[data-callout~=cards][data-callout-metadata~=dvl] .block-language-dataviewjs .dataview-result-list-li, .callout[data-callout~=cards][data-callout-metadata~=dvl] .list-view-ul li {
  padding: 10px;
  background-color: var(--outer-bar);
  box-shadow: 2px 2px 0 var(--outline);
  margin-bottom: 5px;
}
.callout[data-callout~=cards][data-callout-metadata~=dvl] .dataview.list-view-ul li::before {
  margin-left: -27px;
}
.callout[data-callout~=cards][data-callout-metadata~=dvl] ul {
  padding-inline-start: unset;
}

.callout[data-callout~=cards][data-callout-metadata~="1"] :is(.dataview.table-view-table tbody, .callout-content) {
  grid-template-columns: repeat(1, 1fr);
}
.callout[data-callout~=cards][data-callout-metadata~="2"] :is(.dataview.table-view-table tbody, .callout-content) {
  grid-template-columns: repeat(2, 1fr);
}
.callout[data-callout~=cards][data-callout-metadata~="4"] :is(.dataview.table-view-table tbody, .callout-content) {
  grid-template-columns: repeat(4, 1fr);
}
.callout[data-callout~=cards][data-callout-metadata~="5"] :is(.dataview.table-view-table tbody, .callout-content) {
  grid-template-columns: repeat(5, 1fr);
}

/* Unwrapped Table */
.callout.callout[data-callout-metadata~=table],
.callout.callout[data-callout~=table] {
  border: 0;
}
.callout.callout[data-callout-metadata~=table] .callout-content,
.callout.callout[data-callout~=table] .callout-content {
  padding: 0;
  border: 0;
  background-color: transparent;
  box-shadow: none;
}
.callout.callout[data-callout-metadata~=table]:not([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]) .callout-title,
.callout.callout[data-callout~=table]:not([data-callout-metadata~=show-title], [data-callout-metadata~=s-t]) .callout-title {
  display: none;
}
.callout.callout[data-callout-metadata~=table] table,
.callout.callout[data-callout~=table] table {
  white-space: nowrap;
  margin: 0;
  margin: auto;
}

/* Asides */
.callout[data-callout~=aside] {
  --callout-color: 130,130,130;
  --callout-icon: book-open;
  --callout-padding: 10px;
  background-color: var(--aside-bg, var(--background-secondary));
  box-shadow: 0.3em 0.3em 0 var(--accent, var(--background-modifier-box-shadow)), 0 0 0 1px var(--accent, var(--background-modifier-box-shadow));
  float: right;
  position: relative;
  margin: 5px;
  margin-right: 0;
  margin-left: 5px;
  padding-bottom: 10px;
  max-width: 250px;
}
.callout[data-callout~=aside]:not([data-callout-metadata~=no-t]) .callout-content {
  padding: 5px 5px;
}
.callout[data-callout~=aside]:not([data-callout-metadata~=no-t]) .callout-content p:first-child {
  margin-top: 0;
}


.callout[data-callout~=aside].is-collapsed {
  background-color: transparent;
  box-shadow: none;
}
.callout[data-callout~=aside].is-collapsed .callout-title-inner {
  display: block;
}
.callout[data-callout~=aside].is-not-collapsed .callout-title-inner {
  display: block;
}
.callout[data-callout~=aside].is-collapsed .callout-title {
 justify-content: space-between; 
  padding: 10;
}
.callout[data-callout~=aside].is-collapsed .callout-fold {
  margin: 10;
  padding: 10;
  margin-left: 0px;
  visibility: hidden;
}

.callout[data-callout~=aside][data-callout-metadata~=clean] {
  background: transparent;
  box-shadow: none;
}

.callout[data-callout~=aside][data-callout-metadata~=tufte] {
  background: transparent;
  box-shadow: none;
  float: right;
  position: relative;
}
.callout[data-callout~=aside][data-callout-metadata~=tufte]:not(.is-collapsed) {
  width: 400px;
  margin-right: -25.3em;
}
.callout[data-callout~=aside][data-callout-metadata~=tufte] .callout-title {
  padding-top: 0;
}
.callout[data-callout~=aside][data-callout-metadata~=tufte].is-collapsed .callout-title {
  justify-content: unset;
}
.callout[data-callout~=aside][data-callout-metadata~=tufte].is-collapsed .callout-content {
  display: none;
}

.is-live-preview .callout[data-callout~=aside] {
  float: unset;
}

.callout.callout.callout[data-callout~=aside]:is([data-callout-metadata~=left], [data-callout-metadata~="p+l"]) {
  margin-left: -1.6em;
}
.callout.callout.callout[data-callout~=aside]:is([data-callout-metadata~=left], [data-callout-metadata~="p+l"]):not(.is-collapsed) {
  margin-right: 10px;
}
.callout.callout.callout[data-callout~=aside]:is([data-callout-metadata~=left], [data-callout-metadata~="p+l"])[data-callout-metadata~=tufte]:not(.is-collapsed) {
  margin: unset;
  margin-left: -25em !important;
}
.callout.callout.callout[data-callout~=aside]:is([data-callout-metadata~=left], [data-callout-metadata~="p+l"])[data-callout-metadata~=tufte]:not(.is-collapsed) .callout-title {
  padding-top: 5px;
  flex-direction: row-reverse;
}

.is-live-preview.is-live-preview .callout.callout[data-callout~=aside] {
  margin: 5px;
}

/* Columns */
.callout[data-callout*=column] {
  --callout-color: var(--text-normal);
  --callout-icon: layout-dashboard;
  --columns: 2;
  background: transparent;
  box-shadow: none;
  border: 0;
  width: auto;
  padding: 0;
}
.callout[data-callout*=column] > .callout-content .callout-content {
  border: 0;
}
.callout[data-callout*=column] > .callout-content {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 10px;
  background: transparent;
  box-shadow: none;
  border: 0;
  padding: 0;
}
.callout[data-callout*=column][data-callout-metadata~="3"] .callout-content {
  --columns: 3;
}
.callout[data-callout*=column][data-callout-metadata~="4"] .callout-content {
  --columns: 4;
}
.callout[data-callout*=column][data-callout-metadata~=flex] > .callout-content {
  gap: unset;
  grid-template-columns: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.callout[data-callout*=column][data-callout-metadata~=flex] > .callout-content .callout {
  flex: 1 1 250px;
  margin: 5px;
}
.callout[data-callout*=column][data-callout-metadata~=dataview] > .callout-content {
  grid-template-columns: unset;
  gap: unset;
}
.callout[data-callout*=column][data-callout-metadata~=dataview] > .callout-content .dataview.list-view-ul {
  columns: var(--columns);
}
.callout[data-callout*=column][data-callout-metadata~=dataview] > .callout-content .dataview li {
  break-inside: avoid;
}

/* Timeline */
.callout.callout[data-callout~=timeline] {
  --callout-icon: "clock-12";
  --callout-padding: 0px;
  --callout-title-padding: 10px;
  --callout-content-padding: 10px;
  --micro: 50px;
  --tiny: 100px;
  --small: 200px;
  --small-med: 300px;
  --med-small: 400px;
  --medium: 500px;
  --med-tall: 600px;
  --tall: 700px;
  --c-timeline: 49.72%;
  background-color: transparent;
  margin: 0;
  border: 0;
  clear: both;
}
@media all and (max-width: 450px) {
  .callout.callout[data-callout~=timeline] {
    --c-timeline: 49.5%;
  }
}
.callout.callout[data-callout~=timeline] .callout-title {
  background: rgb(var(--callout-color), 0.35);
  align-content: center;
  align-items: center;
}
.callout.callout[data-callout~=timeline] .callout-title em {
  font-style: normal;
  display: block;
  font-size: 14px;
  line-height: 12px;
  color: rgb(var(--callout-color));
}
.callout.callout[data-callout~=timeline] .callout-icon {
  background-color: var(--note, var(--background-primary));
  transform: scale(1.2);
  border-radius: 20px;
}
.callout.callout[data-callout~=timeline] .callout-content {
  background-color: rgb(var(--callout-color), 0.1);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-l] :is(.callout-title, .callout-content) {
  border-right: 4px solid rgb(var(--callout-color));
  margin-right: var(--c-timeline);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-l] :is(.callout-title, .callout-content) > .callout-title, .callout.callout[data-callout~=timeline][data-callout-metadata~=t-l] :is(.callout-title, .callout-content) > .callout-content {
  box-shadow: -4px 4px 0 var(--outline, var(--background-modifier-box-shadow));
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-r] :is(.callout-title, .callout-content) {
  border-left: 4px solid rgb(var(--callout-color));
  margin-left: var(--c-timeline);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-r] :is(.callout-title, .callout-content) > .callout-title, .callout.callout[data-callout~=timeline][data-callout-metadata~=t-r] :is(.callout-title, .callout-content) > .callout-content {
  box-shadow: 4px 4px 0 var(--outline, var(--background-modifier-box-shadow));
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-l] > .callout-title {
  flex-direction: row-reverse;
  text-align: right;
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-l] > .callout-title .callout-icon {
  float: right;
  margin-right: -20px;
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-r] > .callout-title .callout-icon {
  float: left;
  margin-left: -20px;
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-1] {
  padding-top: var(--micro);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-2] {
  padding-top: var(--tiny);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-3] {
  padding-top: var(--small);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-4] {
  padding-top: var(--small-med);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-5] {
  padding-top: var(--med-small);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-6] {
  padding-top: var(--medium);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-7] {
  padding-top: 350px;
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-8] {
  padding-top: var(--med-tall);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-9] {
  padding-top: var(--tall);
}
.callout.callout[data-callout~=timeline][data-callout-metadata~=t-10] {
  padding-top: 750px;
}

@media print {
.print.print .markdown-preview-view .callout:is(
    [data-callout*="cards"],
    [data-callout*="column"]
) .callout-content { display: grid !important; }
}


/*JBADD images from ITS theme*/

.theme-dark, .theme-light {
  /*Sizes*/
  --radius: 0px;
  --micro: 70px;
  --tiny: 100px;
  --small: 200px;
  --small-med: 300px;
  --med-small: 400px;
  --medium: 500px;
  --med-tall: 600px;
  --tall: 700px;
}
/*----Mobile----*/
@media (max-width: 500px) {
  
  .theme-dark, .theme-light {
      /*Mobile Sizes*/
      --radius: 0px;
      --micro: 70px;
      --tiny: 100px;
      --small: 150px;
      --small-med: 200px;
      --med-small: 250px;
      --medium: 300px;
      --med-tall: 450px;
      --tall: 500px;
  }
}

/*----<i alt=""></i>----*/
i { 
  display: block;
  font-style: unset;
  color: var(--text-normal);
  text-align: center;
  background-color: var(--background-secondary-alt);
  padding: 0 1em;
}

i[alt*="right"] {
  display: block;
  text-align: right;
  background-color: var(--background-secondary-alt);
  padding-right: .8em;
}


i[alt*="left"] {
  display: block;
  text-align: left;
  background-color: var(--background-secondary-alt);
  padding-left: .8em;
}

i[alt*="clear"] {
  clear: both;
}

i[alt*="nobg"] {
  background-color: transparent;
}



/*----Image Positions/Adjustments----*/
/*Captions*/
.img-cap .image-embed::after,
.image-embed[src*="#cap"]::after {
content: attr(alt);
color: var(--inactive);
display: block;
text-align: center;
}

/* Lithou's Img-Grid CSS */
.img-grid span.image-embed[alt*="."],
span.image-embed[src*=grid],
span.image-embed[alt*=grid],
img[alt*=grid] {
display: table-cell;
vertical-align: middle;
padding: 3px;
}

.img-grid img[alt*="."],
.image-embed[alt*=grid],
img[alt*=grid],
.image-embed[src*="#grid"] {
max-height: 30vh;
}

.img-grid img[alt*="."]:hover,
.image-embed[src*="#grid"]:hover,
.image-embed[src*="#grid"]:hover,
img[alt*=grid]:hover {
transform: scale(1.5);
}

/*Invert Colors*/
.theme-dark img[alt*=invertb],
.theme-dark .image-embed[src*="#invertb"] {
filter: invert(1) hue-rotate(180deg);
}

.theme-light img[alt*=invertw],
.theme-light .image-embed[src*="#invertw"] {
filter: invert(1) hue-rotate(180deg);
}

.theme-dark img[alt*=invertbc],
.theme-dark .image-embed[src*="#invertbc"] {
filter: invert(1) hue-rotate(180deg) contrast(1.5);
}

.theme-light img[alt*=invertwc],
.theme-light .image-embed[src*="#invertwc"] {
filter: invert(1) hue-rotate(180deg) contrast(1.45);
}

/*Fix Float Issues*/
img[alt*=clear],
.image-embed[src*="#clear"] {
clear: both;
}

img[alt*=unclr],
.image-embed[src*="#unclr"] {
clear: none !important;
}

/*Round Image*/
img[alt*=circle] {
border-radius: 50%;
}

/*Center Image*/
img:is([alt*="ctr"], [alt*="center"]),
.image-embed[src*="#ctr"] .image-embed[alt*=ctr],
.image-embed[src*="#center"] .image-embed[alt*=center],
.imgctr img {
display: block;
margin-left: auto;
margin-right: auto;
}

/*--Simplified Version--*/
/*Image Locations*/
/*Left & Right*/
body .popover.hover-popover img:is([alt*=left], [alt*=locl]), body .popover.hover-popover img[src*="#locl"] img, body .popover.hover-popover .image-embed:is([alt*=left], [alt*=locl]), body .popover.hover-popover .image-embed[src*="#locl"] img,
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) img:is([alt*=left], [alt*=locl]),
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) img[src*="#locl"] img,
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) .image-embed:is([alt*=left], [alt*=locl]),
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) .image-embed[src*="#locl"] img {
  float: left;
  margin-right: 2%;
  margin-top: 0px;
  margin-bottom: 0px;
}
body .popover.hover-popover img:is([alt*=right], [alt*=locr]), body .popover.hover-popover img[src*="#locr"] img, body .popover.hover-popover .image-embed:is([alt*=right], [alt*=locr]), body .popover.hover-popover .image-embed[src*="#locr"] img,
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) img:is([alt*=right], [alt*=locr]),
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) img[src*="#locr"] img,
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) .image-embed:is([alt*=right], [alt*=locr]),
body :is(.markdown-source-view, .markdown-preview-view):not(.is-live-preview) .image-embed[src*="#locr"] img {
  float: right;
  margin-left: 2%;
  margin-bottom: 0px;
}

.is-live-preview.is-live-preview :is(img, .image-embed)[alt*=lp]:is([alt*=left], [alt*=locl]) {
  float: left;
  margin-right: 2%;
  margin-top: 0px;
  margin-bottom: 0px;
}
.is-live-preview.is-live-preview :is(img, .image-embed)[alt*=lp]:is([alt*=right], [alt*=locr]) {
  float: right;
  margin-left: 2%;
  margin-bottom: 0px;
}

/*Image Shapes*/
/*Banners*/
img[alt*="banner"],
.image-embed[alt*="banner"] img,
.image-embed[src*="#banner"] {
  display: block;
  object-fit: cover;
  height: var(--small);
  width: 100%;
  margin-bottom: 0px;
  clear: both;
}
img[alt*="banner+small"],
.image-embed[alt*="banner+small"] img,
.image-embed[src*="#banner+small"] {
  display: block;
  object-fit: cover;
  height: var(--tiny);
  width: 100%;
  margin-bottom: 0px;
  clear: both;
}
img[alt*="banner+tall"],
.image-embed[alt*="banner+tall"] img,
.image-embed[src*="#banner+tall"] {
  display: block;
  object-fit: cover;
  height: var(--medium);
  width: 100%;
  margin-bottom: 0px;
  clear: both;
}



/*Portait*/
img[alt*="portrait"],
.image-embed[alt*="portrait"] img,
.image-embed[src*="#portrait"] {
  object-fit: cover;
  height: var(--small-med);
  width: 40%;
}

img[alt*="portrait+small"],
.image-embed[alt*="portrait+small"] img,
.image-embed[src*="#portrait+small"] {
  height: var(--small);
  width: 20%;
  object-fit: cover;
}

img[alt*="portrait+tall"],
.image-embed[alt*="portrait+tall"] img,
.image-embed[src*="#portrait+tall"] {
  height: 500px;
  width: 50%;
  object-fit: cover;
}

/*Profile*/
img[alt*="profile"],
.image-embed[alt*="profile"] img,
.image-embed[src*="#profile"] {
  object-fit: cover;
  height: var(--tiny);
  width: var(--tiny);
}

img[alt*="profile+medium"],
.image-embed[alt*="profile+medium"] img,
.image-embed[src*="#profile+medium"] {
  object-fit: cover;
  height: var(--small);
  width: var(--small);
}
img[alt*="profile+tall"],
.image-embed[alt*="profile+tall"] img,
.image-embed[src*="#profile+tall"] {
  object-fit: cover;
  height: var(--medium);
  width: var(--medium);
}

/*--Customizable Version--*/
/*-Image Sizing-*/

/*Fit image within bounds WITHOUT stretching*/
img[alt*="cover"], 
.image-embed[src*="#cover"], 
span.image-embed[src*="#cover"] img,
img[alt*="cvr"],
.image-embed[src*="#cvr"], 
span.image-embed[src*="#cvr"] img {
  object-fit: cover;
}

/*Height*/
img[alt*="hmicro"],
.image-embed[src*="#hmicro"] img {
  height: var(--micro);
}
img[alt*="htiny"],
.image-embed[src*="#htiny"] img {
  height: var(--tiny);
}
img[alt*="hsmall"],
.image-embed[src*="#hsmall"] img {
  height: var(--small);
}
img[alt*="hs-med"],
.image-embed[src*="#hs-med"] img {
  height: var(--small-med);
}
img[alt*="hm-sm"],
.image-embed[src*="#hs-sm"] img {
  height: var(--med-small);
}
img[alt*="hmed"],
.image-embed[src*="#hmed"] img {
  height: var(--medium);
}
img[alt*="hm-tl"],
.image-embed[src*="#hm-tl"],
.image-embed[src*="#hm-tl"] img {
  height: var(--med-tall);
}
img[alt*="htall"],
.image-embed[src*="#htall"] img {
  height: var(--tall);
}

/*Width*/
img[alt*="wmicro"],
.image-embed[src*="#wmicro"] img,
.image-embed[alt*="#wmicro"]::after {
  width: var(--micro); 
}

img[alt*="wtiny"],
.image-embed[src*="#wtiny"] img,
.image-embed[src*="#wtiny"]::after { 
  width: var(--tiny); 
}

img[alt*="wsmall"],
.image-embed[src*="#wsmall"] img,
.image-embed[src*="#wsmall"]::after {
  width: var(--small);
}

img[alt*="ws-med"],
.image-embed[src*="#ws-med"] img,
.image-embed[src*="#ws-med"]::after {
  width: var(--small-med); 
}

img[alt*="wm-sm"],
.image-embed[src*="#wm-sm"] img,
.image-embed[src*="#wm-sm"]::after {
  width: var(--med-small); 
}

img[alt*="wmed"],
.image-embed[src*="#wmed"] img,
.image-embed[src*="#wmed"]::after {
  width: var(--medium); 
}

img[alt*="wm-tl"],
.image-embed[src*="#wm-tl"] img,
.image-embed[src*="#wm-tl"]::after {
  width: var(--med-tall); 
}

img[alt*="wtall"],
.image-embed[src*="#wtall"] img,
.image-embed[src*="#wtall"]::after {
  width: var(--tall); 
}


/*--Image Position--*/
img[alt*="p+"],
.image-embed[src*="#p+"] img { object-fit: cover; }

/*Inner Image*/
img[alt*="p+c"],
.image-embed[src*="#p+c"] img{ object-position: center; }
img[alt*="p+t"],
.image-embed[src*="#p+t"] img{ object-position: top; }
img[alt*="p+b"],
.image-embed[src*="#p+b"] img{ object-position: bottom; }
img[alt*="p+l"],
.image-embed[src*="#p+l"] img{ object-position: left; }
img[alt*="p+r"],
.image-embed[src*="#p+r"] img{ object-position: right; }


img[alt*="p+cl"],
.image-embed[src*="#p+cl"] img      {object-position: 15%; }
img[alt*="p+ccl"],
.image-embed[src*="#p+ccl"] img     {object-position: 25%; }
img[alt*="p+cr"],
.image-embed[src*="#p+cr"] img      {object-position: 60%; }
img[alt*="p+ccr"],
.image-embed[src*="#p+ccr"] img     {object-position: 75%; }

img[alt*="p+tc"],
.image-embed[src*="#p+tc"] img      {object-position: 50% 10%; }
img[alt*="p+tcc"],
.image-embed[src*="#p+tcc"] img     {object-position: 50% 20%; }
img[alt*="p+cct"],
.image-embed[src*="#p+cct"] img     {object-position: 50% 30%; }
img[alt*="p+ct"],
.image-embed[src*="#p+ct"] img      {object-position: 50% 40%; }

img[alt*="p+cb"],
.image-embed[src*="#p+cb"] img      {object-position: 50% 60%; }
img[alt*="p+ccb"],
.image-embed[src*="#p+ccb"] img     {object-position: 50% 70%; }
img[alt*="p+bc"],
.image-embed[src*="#p+bc"] img      {object-position: 50% 80%; }
img[alt*="p+bcc"],
.image-embed[src*="#p+bcc"] img     {object-position: 50% 90%; }


/*--Image Rotation--*/ 
img[alt~="r+r" i],
.image-embed[src~="r+r" i] img      { transform: rotate(90deg); }
img[alt~="r+l" i],
.image-embed[src~="r+l" i] img      { transform: rotate(-90deg); }
img[alt~="r+180"],
.image-embed[src~="r+180"] img      { transform: rotate(-180deg); }


/*--Image Shapes--*/
/*Banners*/
img[alt*="sban"],
.internal-embed[src*="#sban"] img {
  object-fit: cover;
  width: 100%;
}

/*Profile*/
/*Rounded Image*/
img[alt*="sprf"]{
  object-fit: cover;
  border-radius: 100%;
}


.callout.callout[data-callout=jbplus] {
  --callout-icon: plus-square;
  background-color: rgba(42, 131, 156, 0.3);
  padding: 7px;
  margin: 5px;
  margin-right: 0px;
}

.callout.callout[data-callout=jbplus] .callout-title {
  padding: 3px;
  color: #2a839c;
  justify-content: left;
}
.callout.callout[data-callout=jbplus][data-callout-metadata*=bg-]:not([data-callout-metadata*=bg-c]) .callout-title {
  color: var(--text-normal);
}

.callout.callout[data-callout=jbplus] .callout-content {
  padding: 5px;
  margin: 0px !important;
}

.callout.callout[data-callout=jbplus].callout.is-collapsible .callout-title {
  cursor: var(--cursor);
  padding: 0px;
}

.site-body-left-column-site-name {
  color:  #2a839c;
  font-size: 26px;
  font-weight: 600;
  z-index: 1;
  cursor: pointer;
  line-height: 1.2;
  padding: 14px 10px 40px 0;
}

.site-body-left-column-site-logo {
  width: 200px;
  max-width: 200px;
  height: 85px;
  max-height: 85px;
  border-radius: 10px;
  object-fit: contain;
  margin-bottom: 30px;
}

.site-body-left-column {
  width: 100px;
  flex: 0 0 var(--sidebar-left-width);
  min-width: var(--sidebar-left-width);
  padding: 10px 0 0 18px;
  position: relative;
  /*display: none;*?
  background-color: var(--sidebar-left-background);
  border-right: var(--sidebar-left-border-width) solid var(--sidebar-left-border-color);
  height: 100%;
}

/* Site Logo */

.search-view-container {
  margin: 0px 0;
}

.site-body-left-column-site-name {
    color: transparent;
    line-height: 0px;
    padding: 0;
}
.site-body-left-column-site-name:hover {
  color: transparent;
}

/*
.site-body-left-column-site-name::before {
    display: block;
    content: url(https://stratocat.github.io/Obelisk/ObeliskFrontPagedark.png);
    width: 100%;
    transform: scale(0.4);
    -webkit-transform-origin-x: left;
    -webkit-transform-origin-y: top;
    position: absolute;
}
*/


.site-body-left-column-site-theme-toggle {
  padding: 0 0 12px 0;
  margin-top: 5px;
  display: flex;
  position: relative;
}

  /* Site Logo Mobile */

.site-header-text {
  color: transparent;
}

.site-header {
  background: url(https://stratocat.github.io/Obelisk/ObeliskFrontPagedark.png) no-repeat;
  padding: 10px 10px 10px 10px;
  background-position-x: 50px;
  background-size: contain;
}

.site-header-text:hover {
  color: transparent;
}


/* JBADD get the blockquotes more compact */

.published-container .markdown-rendered h1, .published-container .markdown-rendered h2 {
  border-bottom: 0px solid var(--background-modifier-border);
  padding-bottom: 0em;
}

.publish-article-heading .clickable-icon {
  color: var(--text-faint);
  display: none;
  cursor: pointer;
  scale: .6;
  margin: 0px;
  padding: 0px;
}


.clickable-icon {
  vertical-align: bottom;
  margin: 0px;
  padding: 0px;
}

.publish-article-heading {
  margin-left: 50px;
}

.tree-item-self[data-path^='Student Vault'] {
  display: none;
}
.tree-item-self[data-path^='Content/assets'] {
  display: none;
}
.tree-item-self[data-path^='Content/ATAC/C203/assets'] {
  display: none;
}
.tree-item-self[data-path^='Content/ATAT/T101/assets'] {
  display: none;
}
.tree-item-self[data-path^='Content/ATAT/T105/assets'] {
  display: none;
}
.tree-item-self[data-path^='Content/ATAT/T110'] {
  display: none;
}
.tree-item-self[data-path^='References/TOCs'] {
  display: none;
}

.blue2 {
	background-image: linear-gradient(rgb(0, 0, 0), 95%, rgb(42, 131, 156))
}


.published-container {
  --sidebar-left-width: 192px;
  --sidebar-left-background: black;
  --sidebar-font-size: 10px;
  --page-side-padding: 10px;
  --page-width: 1200px;
}

.extra-title-text {
  margin-top: 85px;
}

.search-view-container .search-bar::placeholder {
  content: "Search";
  font-size: 10px;
  color: var(--text-faint);
}

.iframe-wrapperjb {
  height: 100%;
}

.iframe-wrapperjb iframe {
  width: 100%;
  min-height: 1000px; /* set a minimum height for the iframe */
  border: none;
  display: block;
}
.overlay-image {
  position: absolute;
  right: 100px;
  bottom: 100px;
  width: 50%;
  z-index: 1;
}

.published-container {
  /* Page */
  --page-width: 1200px;
  --page-side-padding: 10px;
}

.published-container .blue2 {
  /* Page */
  --page-width: 2400px;
  --page-side-padding: 10px;
}
```

## Ouroboros lab

[lab.marconoris.com > Notas sobre el ahora - Ouroboros lab](https://lab.marconoris.com/now)

```js
/* 
Marco Noris - https://lab.marconoris.com 
Select the Obsidian Publihs input search by pressing 'ctrl+f' keys
*/


function setupKeyboardShortcut() {
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'f') { //It is possible to change with other characters.
      e.preventDefault(); // Prevent default behavior
      var searchBar = document.querySelector('.search-bar');
      if (searchBar) {
        searchBar.focus();
      }
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupKeyboardShortcut);
} else {
  setupKeyboardShortcut();
}
```

```js
function setPlaceholder() {
    var _ = document.querySelector(".search-bar");
    _ && (-1 !== navigator.userAgent.indexOf("Mac") ? _.placeholder = "Search lab using ⌘+K" : _.placeholder = "Search lab using ctrl+K")
}
function setupKeyboardShortcut(_) {
    if ((_.metaKey || _.ctrlKey) && "k" === _.key) {
        _.preventDefault();
        var e = document.querySelector(".search-bar");
        e && e.focus()
    }
}
console.log("publish.js loaded"),
document.addEventListener("DOMContentLoaded", function() {
    let _ = document.querySelectorAll("h1");
    _.forEach(_ => {
        let e = _.parentElement.nextElementSibling;
        e && e.querySelector(".callout") && (_.classList.add("h1-with-callout"),
        e.querySelector(".callout").classList.add("callout-with-h1"))
    }
    )
}),
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", function() {
    setPlaceholder(),
    document.addEventListener("keydown", setupKeyboardShortcut)
}) : (setPlaceholder(),
document.addEventListener("keydown", setupKeyboardShortcut));
const iconVisible = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
  , iconHidden = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>'
  , helpIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  , contactIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
  , copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copyright"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>'
  , imgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
function toggleReaderView() {
    let _ = document.querySelectorAll(".node-insert-event")
      , e = document.querySelector("#toggle-sidebar-btn")
      , t = document.querySelector("#chooser");
    if (_.length > 0 && e) {
        let $ = Array.from(_).some(_ => _.classList.contains("reader-view"));
        _.forEach(_ => {
            $ ? _.classList.remove("reader-view") : _.classList.add("reader-view")
        }
        ),
        e.innerHTML = $ ? iconVisible : iconHidden,
        t && (t.style.display = $ ? "none" : "block"),
        localStorage.setItem("readerView", !$)
    }
}
function applyInitialVisibilityState() {
    let _ = document.querySelectorAll(".node-insert-event")
      , e = document.querySelector("#toggle-sidebar-btn")
      , t = document.querySelector("#chooser")
      , $ = "true" === localStorage.getItem("readerView");
    _.forEach(_ => {
        $ ? _.classList.add("reader-view") : _.classList.remove("reader-view")
    }
    ),
    e.innerHTML = $ ? iconHidden : iconVisible,
    t && (t.style.display = $ ? "block" : "none")
}
function addButtons() {
    let _ = document.querySelector(".site-body-center-column");
    if (_) {
        let e = document.createElement("button");
        e.id = "toggle-sidebar-btn",
        e.setAttribute("aria-label", "Toggle reader view"),
        e.innerHTML = iconVisible,
        e.addEventListener("click", toggleReaderView);
        let t = document.createElement("div");
        t.id = "chooser",
        t.style.display = "none";
        let $ = document.createElement("a");
        $.classList.add("help"),
        $.href = "https://lab.marconoris.com/info",
        $.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
        let s = document.createElement("a");
        s.classList.add("contact"),
        s.href = "https://lab.marconoris.com/contacto",
        s.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
        let a = document.createElement("a");
        a.classList.add("copy"),
        a.href = "https://lab.marconoris.com/info#Copyright",
        a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copyright"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>';
        let r = document.createElement("a");
        r.classList.add("copy"),
        r.href = "https://marconoris.com",
        r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
        t.appendChild(s),
        t.appendChild($),
        t.appendChild(a),
        t.appendChild(r),
        _.appendChild(e),
        _.appendChild(t)
    }
}
function waitForSiteBodyCenterColumn() {
    let _ = new MutationObserver( (_, e) => {
        document.querySelector(".site-body-center-column") && (addButtons(),
        applyInitialVisibilityState(),
        e.disconnect())
    }
    );
    _.observe(document.body, {
        childList: !0,
        subtree: !0
    })
}
function checkURLParameter() {
    let _ = new URLSearchParams(window.location.search);
    if ("true" === _.get("reader")) {
        let e = document.querySelectorAll(".node-insert-event");
        e.forEach(_ => {
            _.classList.add("reader-view")
        }
        );
        let t = document.querySelector("#toggle-sidebar-btn");
        t && (t.innerHTML = iconHidden),
        localStorage.setItem("readerView", !0)
    }
}
function resetReaderViewAfterNavigation() {
    document.addEventListener("click", _ => {
        _.target.closest(".site-body-left-column-site-logo, .nav-file-title, .nav-folder-title, .nav-file, .nav-folder") && setTimeout(applyInitialVisibilityState, 100)
    }
    )
}
function resetReaderViewOnLoad() {
    window.addEventListener("load", applyInitialVisibilityState)
}
document.addEventListener("keydown", function(_) {
    let e = document.activeElement
      , t = e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName);
    "r" !== _.key || _.ctrlKey || _.metaKey || _.altKey || _.shiftKey || t || toggleReaderView()
}),
waitForSiteBodyCenterColumn(),
checkURLParameter(),
resetReaderViewAfterNavigation(),
resetReaderViewOnLoad();
let imagesByPath = {}
  , currentImageIndex = 0
  , currentPath = "";
function preloadImage(_) {
    let e = new Image;
    e.src = _
}
function preloadAllImages() {
    let _ = imagesByPath[currentPath] || [];
    _.forEach(_ => {
        let e = _.querySelector("img")
          , t = e?.getAttribute("src") || e?.getAttribute("data-src");
        t && preloadImage(t)
    }
    )
}
function updateCurrentPath() {
    imagesByPath[currentPath = publish.currentFilepath] || (imagesByPath[currentPath] = [],
    preloadAllImages())
}
function toggleTheme() {
    let _ = document.body
      , e = document.querySelector(".checkbox-container")
      , t = document.querySelector(".site-body-left-column-site-theme-toggle");
    _.classList.contains("theme-dark") ? (_.classList.remove("theme-dark"),
    _.classList.add("theme-light"),
    e && e.classList.remove("is-enabled"),
    t && t.classList.remove("is-dark")) : (_.classList.remove("theme-light"),
    _.classList.add("theme-dark"),
    e && e.classList.add("is-enabled"),
    t && t.classList.add("is-dark"))
}
publish.registerMarkdownPostProcessor(async (_, e) => {
    updateCurrentPath();
    let t = Array.from(_.querySelectorAll(".internal-embed")).filter(_ => /\.(jpg|jpeg|png|gif|bmp|svg|webp|jpg#invert|jpeg#invert|png#invert|gif#invert|bmp#invert|svg#invert|jpg#float|jpeg#float|webp#float|gif#float|png#float|jpg#boxed|jpeg#boxed|webp#boxed|gif#boxed|png#boxed|jpg#blend|jpeg#blend|webp#blend|gif#blend|png#blend)$/i.test(_.getAttribute("src")));
    t.forEach(_ => {
        _.classList.contains("processed") || (_.classList.add("processed"),
        imagesByPath[currentPath].push(_),
        _.addEventListener("click", function() {
            currentImageIndex = imagesByPath[currentPath].indexOf(this);
            let _ = document.createElement("div");
            _.classList.add("lightbox");
            let e = this.cloneNode(!0);
            _.appendChild(e),
            document.body.appendChild(_);
            let t;
            _.addEventListener("touchstart", _ => {
                t = _.touches[0].clientX
            }
            ),
            _.addEventListener("touchend", e => {
                let $ = e.changedTouches[0].clientX;
                t - $ > 50 ? currentImageIndex = (currentImageIndex + 1) % imagesByPath[currentPath].length : t - $ < -50 && (currentImageIndex = (currentImageIndex - 1 + imagesByPath[currentPath].length) % imagesByPath[currentPath].length),
                _.innerHTML = "";
                let s = imagesByPath[currentPath][currentImageIndex].cloneNode(!0);
                _.appendChild(s)
            }
            );
            let $ = () => {
                document.body.removeChild(_),
                document.removeEventListener("keydown", s)
            }
            ;
            _.addEventListener("click", $);
            let s = e => {
                let t = imagesByPath[currentPath] || [];
                if ("Escape" === e.key)
                    $();
                else if ("ArrowRight" === e.key || "ArrowLeft" === e.key) {
                    currentImageIndex = "ArrowRight" === e.key ? (currentImageIndex + 1) % t.length : (currentImageIndex - 1 + t.length) % t.length,
                    _.innerHTML = "";
                    let s = t[currentImageIndex].cloneNode(!0);
                    _.appendChild(s)
                }
                ("ArrowUp" === e.key || "ArrowDown" === e.key) && e.preventDefault()
            }
            ;
            document.addEventListener("keydown", s)
        }))
    }
    )
}
),
document.getElementsByClassName("site-footer")[0].innerHTML = '<div class="social"><a href="mailto:hola+lab@marconoris.com" title="Contact me" target="_blank"><svg id="mailme" data-name="mailme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349.3 218.15"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M596.14,393.93c-1,.74-1.34-.36-1.81-.77Q540.1,345.6,485.94,298c-.33-.29-.61-.63-1.08-1.13l26.42-23.21q41-36,82-72c.78-.68,1.32-2.11,2.84-1.6Z" transform="translate(-246.84 -187.89)"/><path class="cls-1" d="M580.05,187.89C527,234.49,474.34,280.73,421.41,327.2L262.77,187.89Z" transform="translate(-246.84 -187.89)"/><path class="cls-1" d="M470.3,309.64,580.07,406H262.76l109.76-96.4,48.89,42.92Z" transform="translate(-246.84 -187.89)"/><path class="cls-1" d="M246.84,394.66V199.27L358.08,297Z" transform="translate(-246.84 -187.89)"/></svg></a> <a href="https://marconoris.com/" title="Artworks" target="_blank"><svg version="1.1" id="portfolio" data-name="portfolio" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.89 595.28" style="enable-background:new 0 0 841.89 595.28;" xml:space="preserve"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M2.92,116.12c35.75,0,71.16,0,107.23,0c0,16.31,0,32.54,0,49.71c1.22-1.03,1.72-1.27,1.95-1.66 c17.14-30.27,44.05-47.24,77.11-54.42c32.09-6.97,63.46-3.23,93.18,11.33c21.01,10.29,35.63,26.83,45.63,47.71c0.3,0.63,0.6,1.28,0.93,1.9c0.12,0.23,0.34,0.41,0.62,0.74c2.97-4.67,5.83-9.35,8.86-13.92c20.89-31.44,50.87-47.29,87.93-49.85c18.14-1.25,36.39-0.9,54.6-0.95c27.97-0.08,55.91-0.83,83.68-4.34c10.01-1.27,20.18-2.37,29.34-8.73c0,23.93,0,47.52,0,72c1.16-0.99,1.76-1.28,2.03-1.75c17.34-30.34,44.47-47.2,77.69-54.3c28.23-6.04,56.62-4.02,83.99,5.15c33.75,11.3,54.73,35.55,66.07,68.75c6.02,17.63,8.89,35.9,10.05,54.35c1.21,19.28,1.71,38.64,1.78,57.97c0.22,59.73,0.08,119.45,0.08,179.18c0,0.98,0,1.97,0,3.29c-37.19,0-74.23,0-111.93,0c0-1.63,0-3.4,0-5.16c-0.01-58.32,0.12-116.63-0.13-174.94c-0.07-17.18,0.01-34.49-4.81-51.26c-0.89-3.11-1.85-6.23-3.1-9.21c-7.64-18.25-20.56-29.63-40.93-31.35c-15.44-1.3-30.54-0.42-44.38,7.38c-16.76,9.45-25.26,24.92-28.31,43.09c-2.33,13.84-3.43,28.04-3.52,42.09c-0.38,58.03-0.16,116.06-0.16,174.1c0,1.67,0,3.35,0,5.31c-45.81,0-91.33,0-137.52,0c0-1.75,0-3.51,0-5.27c0-68.06,0-136.12,0-204.17c0-12.38-1.78-24.41-6.4-36.01c-6.28-15.78-17.5-24.89-34.52-26.5c-16.52-1.56-32.49,0.09-46.84,9.25c-16.59,10.58-23.97,26.94-26.98,45.51c-1.51,9.29-2.3,18.8-2.34,28.21c-0.2,61.14-0.1,122.28-0.1,183.42c0,1.8,0,3.6,0,5.62c-37.47,0-74.53,0-112.03,0c0-1.83,0-3.49,0-5.14c-0.01-63.4,0.04-126.8-0.08-190.19c-0.03-14.96-0.2-29.98-5.12-44.38c-4.54-13.29-11.54-25.25-25.59-29.62c-20.6-6.4-40.83-4.53-59.09,7.9c-13.92,9.48-20.88,23.8-23.45,39.76c-2.3,14.28-3.45,28.89-3.55,43.36c-0.38,57.75-0.16,115.5-0.16,173.25c0,1.54,0,3.08,0,4.96c-37.25,0-74.3,0-111.69,0C2.92,357.74,2.92,237.12,2.92,116.12z"/></svg></a><a href="https://www.are.na/marco-noris/index" title="Are.na" class="arena" target="_blank"><svg id="arena" data-name="arena" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 297"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M297,149.28h4c4.58,3,6.79,7.11,7.53,12.61,3.69,27.53,7.7,55,11.5,82.54,1.29,9.34,4.81,11.57,13.46,8.13,25.47-10.15,50.95-20.25,76.38-30.48a28.53,28.53,0,0,1,22.28,0c25.27,10.17,50.6,20.21,75.91,30.3,9.33,3.72,12.58,1.63,14-8.43,3.79-27.35,7.83-54.66,11.5-82,.74-5.5,2.87-9.67,7.47-12.63h4c3.55,2.8,6.37,6,6.94,10.79.89,7.43,2,14.83,3.07,22.24,3,21.57,6,43.15,9.13,64.71.88,6.13,5,8.44,10.83,6.4,1.41-.49,2.8-1.06,4.18-1.62q37.94-15.2,75.86-30.4c7.84-3.13,11.82-2.12,16,3.88v4c-2.25,4.33-5.8,7.38-9.59,10.34q-31,24.27-61.95,48.72c-8.13,6.4-8.08,10.2.18,16.72q30.95,24.4,61.92,48.75c3.8,3,7.3,6.07,9.44,10.47v5c-5,6.28-8.35,7.1-16.36,3.89q-38.82-15.6-77.64-31.23c-7.35-2.95-11.12-.78-12.16,7-3.69,27.51-7.44,55-10.87,82.58-.81,6.51-2.77,11.79-9,14.78h-4c-5-2.36-8.08-5.94-8.81-11.66-3.63-28.06-7.45-56.1-11.11-84.16-1.26-9.62-4.65-11.69-13.79-8q-37.47,15.07-74.92,30.22a28.87,28.87,0,0,1-22.77,0q-38.12-15.48-76.33-30.72c-7-2.81-11.2-.53-12.14,6.59-3.72,27.88-7.52,55.76-11,83.67-.8,6.51-3,11.41-9.17,14.11h-4c-6.42-3.09-8.19-8.66-9-15.3-3.34-26.89-6.95-53.75-10.6-80.6-1.34-9.88-4.6-11.63-13.79-7.93q-38.13,15.36-76.24,30.72c-8,3.22-11.3,2.39-16.36-3.89v-5c2.15-4.4,5.65-7.49,9.45-10.46q30.26-23.67,60.37-47.54c10.62-8.38,10.59-11-.21-19.47q-30-23.61-60-47.19c-3.79-3-7.35-6-9.6-10.34v-4c4.2-6,8.16-7,16-3.88q39.34,15.73,78.65,31.52c7.49,3,11.32.66,12.45-7.36,3.89-27.5,7.93-55,11.59-82.51C290.44,157.3,292.33,152.69,297,149.28ZM421.13,352.94a15.36,15.36,0,0,0,8.72-3.28c19.6-15.19,39.27-30.29,58.87-45.49,5.73-4.45,5.81-9,.19-13.48q-29.71-23.62-59.54-47.07c-5.39-4.24-11.22-4.33-16.53-.16q-30,23.58-59.92,47.39c-5.36,4.26-5.28,8.93.18,13.17q29.58,23,59.27,45.8A15,15,0,0,0,421.13,352.94Z" transform="translate(-171 -149.28)"/></svg></a><a href="https://www.linkedin.com/in/marco-noris/" title="Linkedin" class="linkedin" target="_blank"><svg version="1.1" id="linkedin-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path class="cls-1" d="M384,64H128c-35.3,0-64,28.7-64,64v256c0,35.3,28.7,64,64,64h256c35.3,0,64-28.7,64-64V128C448,92.7,419.3,64,384,64zM192,376h-40V216h40V376zM192.2,184.1c-5.2,5.3-11.9,7.9-20.2,7.9c-8.2,0-14.9-2.7-20.2-8.2s-7.8-12.2-7.8-20.1c0-8.2,2.6-14.8,7.8-20c5.2-5.2,11.9-7.8,20.2-7.8c8.3,0,15.1,2.6,20.2,7.8c5.2,5.2,7.8,11.8,7.8,20C200,172,197.4,178.8,192.2,184.1z M376,376h-40v-88.9c0-24.8-14.3-39.1-32-39.1c-8.5,0-18.2,5.2-23.7,11.8c-5.5,6.6-8.3,14.9-8.3,25V376h-40V216h40v25.3h0.6c11.8-19.5,28.9-29.2,51.4-29.2c32-0.1,52,23.9,52,65.9V376z"/></svg></a><a href="https://marconoris.substack.com" target="_blank" class="substack" title="Notas sobre el ahora on Substack"><svg version="1.1" id="Capa_1" shape-rendering="geometricPrecision" image-rendering="optimizeQuality" text-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 448 511.5" style="enable-background:new 0 0 448 511.5;" xml:space="preserve"><style type="text/css">.cls-1{fill-rule:evenodd;clip-rule:evenodd;fill:#020202;}</style><path class="cls-1" d="M0,0h448v62.8H0V0z M0,229.1h448v282.4L224,385.8L0,511.5V229.1z M0,114.5h448v62.8H0C0,177.3,0,114.5,0,114.5z"/></svg></a><a href="https://www.behance.net/marconoris" class="behance" title="Behance" target="_blank"><svg id="behance" data-name="behance" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2500 1583" style="enable-background:new 0 0 2500 1583;" xml:space="preserve"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M1009,707.7c0,0,236.5-17.6,236.5-294.9C1245.5,135.4,1052,0,806.9,0H0.2v1550.1h806.6c0,0,492.4,15.6,492.4-457.5C1299.3,1092.6,1320.8,707.7,1009,707.7L1009,707.7z M748.8,275.5h58.1c0,0,109.6,0,109.6,161.3c0,161.3-64.5,184.6-137.6,184.6H355.7V275.5L748.8,275.5L748.8,275.5z M784.1,1274.6H355.7V860.4h451.2c0,0,163.4-2.1,163.4,212.9C970.3,1254.6,848.2,1273.3,784.1,1274.6L784.1,1274.6z M1956,394.4c-596.1,0-595.6,595.6-595.6,595.6s-40.9,592.6,595.6,592.6c0,0,530.4,30.3,530.4-412.2h-272.8c0,0,9.1,166.6-248.5,166.6c0,0-272.8,18.3-272.8-269.7h803.2C2495.6,1067.3,2583.4,394.4,1956,394.4L1956,394.4z M1689.3,860.4c0,0,33.3-238.9,272.8-238.9c239.4,0,236.4,238.9,236.4,238.9H1689.3z M2262.1,282.2h-639.6V91.3h639.6V282.2L2262.1,282.2z"/></svg></a><a href="https://www.facebook.com/marconoris" title="Facebook" class="facebook" target="_blank"><svg id="face" data-name="face" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233.54 233.59"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M631,283.77c-1.34-3.82-3.25-7.21-7.1-9-1.23-.59-2.56-1-3.85-1.45h11Z" transform="translate(-397.46 -273.28)"/><path class="cls-1" d="M631,283.77v213c-.16.14-.38.25-.46.43-3,7.18-6.57,9.6-14.24,9.6q-27.6,0-55.19,0a4.34,4.34,0,0,1-2.44-.23V416.38h30.26c1.53-11.81,3-23.44,4.57-35.35h-35c.29-9.41-.53-18.61.5-27.76.68-6.07,4.15-9.72,10.14-11,5.1-1.12,10.28-.71,15.44-.77,3.32,0,6.63,0,10,0v-31.5c-1.61-.15-3.11-.33-4.62-.43-10.54-.7-21.09-1.74-31.62-.21-9.92,1.45-18.58,5.5-25.3,13.15-7,8-10,17.57-10.6,28-.55,9.34-.15,18.69-.26,28a5,5,0,0,1-.31,2.66H492v35.4H522v90.23c-.44,0-.74.06-1,.06q-55.06,0-110.15,0a15.29,15.29,0,0,1-3.17-.32c-6.38-1.39-10.22-6.54-10.22-13.71q0-102.75,0-205.49a19.23,19.23,0,0,1,.09-2.28,13,13,0,0,1,7.58-10.61c.78-.39,1.81-.24,2.36-1.11H620.05c1.29.48,2.62.86,3.85,1.45C627.75,276.56,629.66,280,631,283.77Z" transform="translate(-397.46 -273.28)"/></svg></a><a href="http://xarxa.cloud/@marconoris" title="Mastodon" class="mastodon" target="_blank"><svg version="1.1" id="mastodon" data-name="mastodon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 173.1 185.6" style="enable-background:new 0 0 173.1 185.6;" xml:space="preserve"><defs><style>.cls-1{fill:#020202;}</style></defs><path  class="cls-1" d="M142,64.1c0-10-2.5-17.9-7.6-23.7c-5.3-5.9-12.1-8.9-20.7-8.9c-9.9,0-17.4,3.8-22.3,11.4l-4.8,8.1l-4.8-8.1c-4.9-7.6-12.4-11.4-22.3-11.4c-8.5,0-15.4,3-20.7,8.9c-5.1,5.9-7.6,13.8-7.6,23.7v48.8h19.3V65.5c0-10,4.2-15,12.6-15c9.3,0,13.9,6,13.9,17.9v25.9h19.2V68.3c0-11.9,4.7-17.9,13.9-17.9c8.4,0,12.6,5.1,12.6,15v47.3H142V64.1l27.4,47.2c-2.5,13.1-22.8,27.4-46.1,30.2c-12.1,1.4-24.1,2.8-36.8,2.2c-20.8-1-37.3-5-37.3-5c0,2,0.1,4,0.4,5.8c2.7,20.5,20.4,21.8,37.1,22.4c16.9,0.6,31.9-4.2,31.9-4.2l0.7,15.3c0,0-11.8,6.3-32.9,7.5c-11.6,0.6-26-0.3-42.8-4.7C7.4,171.1,1.1,132.2,0.2,92.9c-0.3-11.7-0.1-22.7-0.1-31.9c0-40.3,26.4-52.1,26.4-52.1C39.7,2.8,62.6,0.2,86.3,0h0.6c23.7,0.2,46.6,2.8,59.9,8.9c0,0,26.4,11.8,26.4,52.1c0,0,0.3,29.7-3.7,50.3"/></svg></a><a href="https://instagram.com/zarconoris" title="Instagram" class="instragram" target="_blank"><svg id="instagram" data-name="instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.6 409.6"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M216,403.06V193.85c1.61-1.36,1.22-3.37,1.47-5.07a99.59,99.59,0,0,1,12.59-36.67c22.42-38.05,55.94-57.72,100.2-58,60.35-.35,120.71-.09,181.07-.08,14.64,0,28.91,2.15,42.52,7.72q52.11,21.3,67.85,75.3c1.71,5.8,1.66,11.94,3.9,17.58V403.06c-2.33,4.39-1.88,9.4-3.17,14.05q-17.76,64-81.61,82.21c-5.5,1.56-11.21,2.39-16.82,3.56H316c-4.4-2.33-9.42-1.88-14.08-3.17Q237.84,482,219.46,418.27C218,413.25,218.36,407.85,216,403.06ZM533.08,298.64c.38-61.49-50.18-112.08-112.2-112.25-61.64-.17-111.54,49.43-112.36,111.69-.8,61.19,49.65,111.84,112,112.45C482,411.12,532.69,360.7,533.08,298.64Zm40.84-119.07a34.21,34.21,0,0,0-34.13-33.95c-18.64.09-34.2,15.65-34.09,34.07s15.77,34.08,34.22,34A34.43,34.43,0,0,0,573.92,179.57Z" transform="translate(-216 -93.28)"/><path class="cls-0" d="M625.6,194.65c-2.24-5.64-2.19-11.78-3.9-17.58q-15.86-54-67.85-75.3c-13.61-5.57-27.88-7.72-42.52-7.72-60.36,0-120.72-.27-181.07.08-44.26.26-77.78,19.93-100.2,58a99.59,99.59,0,0,0-12.59,36.67c-.25,1.7.14,3.71-1.47,5.07V93.28H625.6Z" transform="translate(-216 -93.28)"/><path class="cls-0" d="M524,502.88c5.61-1.17,11.32-2,16.82-3.56q63.93-18.17,81.61-82.21c1.29-4.65.84-9.66,3.17-14.05v99.82Z" transform="translate(-216 -93.28)"/><path class="cls-0" d="M216,403.06c2.36,4.79,2,10.19,3.46,15.21q18.48,63.74,82.46,81.44c4.66,1.29,9.68.84,14.08,3.17H216Z" transform="translate(-216 -93.28)"/><path class="cls-1" d="M420.66,386.37c-48.66-.13-88.15-39.72-87.93-88.16.22-48.6,39.93-88,88.42-87.66s87.76,39.59,87.72,87.95A88.08,88.08,0,0,1,420.66,386.37Z" transform="translate(-216 -93.28)"/><path class="cls-1" d="M549.69,179.49a10,10,0,0,1-9.69,10,10.29,10.29,0,0,1-10.06-9.77,10.08,10.08,0,0,1,9.8-9.94A9.83,9.83,0,0,1,549.69,179.49Z" transform="translate(-216 -93.28)"/></svg></a><a href="https://www.threads.net/@zarconoris" title="Threads" class="threads" target="_blank"><svg id="threads" data-name="threads" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.18 192"><defs><style>.cls-1{fill:#020202;}</style></defs><path class="cls-1" d="M141.54,89q-1.24-.6-2.52-1.14c-1.48-27.31-16.4-42.95-41.46-43.11h-.34c-15,0-27.45,6.4-35.12,18l13.78,9.45c5.73-8.69,14.73-10.55,21.35-10.55h.23c8.25.05,14.47,2.45,18.5,7.12,2.93,3.41,4.89,8.12,5.86,14a105.86,105.86,0,0,0-23.68-1.14C74.32,83.1,59,97,60,116.29A29.76,29.76,0,0,0,73.78,140c7,4.65,16.12,6.93,25.55,6.41,12.46-.68,22.23-5.43,29.05-14.12,5.18-6.6,8.45-15.16,9.9-25.93,5.94,3.58,10.34,8.29,12.77,14,4.13,9.64,4.37,25.47-8.55,38.38C131.18,170,117.58,174.91,97,175.06c-22.81-.17-40.06-7.49-51.27-21.74C35.24,140,29.81,120.68,29.61,96c.2-24.68,5.63-44,16.13-57.32C57,24.42,74.2,17.11,97,16.94c23,.17,40.53,7.52,52.17,21.85,5.71,7,10,15.86,12.86,26.16l16.14-4.31C174.74,48,169.33,37,162,28,147,9.61,125.2.2,97.07,0H97C68.88.19,47.29,9.64,32.79,28.08,19.88,44.49,13.22,67.32,13,95.93v.14c.22,28.61,6.88,51.44,19.79,67.85C47.29,182.36,68.88,191.81,97,192h.11c25-.17,42.55-6.71,57.05-21.19,19-18.94,18.39-42.69,12.14-57.27C161.78,103.09,153.23,94.6,141.54,89Zm-43.1,40.52c-10.44.59-21.29-4.1-21.82-14.14-.4-7.44,5.3-15.74,22.46-16.73,2-.12,3.9-.17,5.79-.17a81.49,81.49,0,0,1,17.37,1.76C120.26,124.93,108.66,129,98.44,129.51Z" transform="translate(-13 0)"/></svg></a><a href="https://bsky.app/profile/marconoris.com" title="Bluesky" class="bluesky" target="_blank"><svg width="100%" height="100%" viewBox="0 0 600 530" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path class="cls-1" d="M135.72,44.03C202.216,93.951 273.74,195.17 300,249.49C326.262,195.174 397.782,93.95 464.28,44.03C512.26,8.009 590,-19.862 590,68.825C590,86.537 579.845,217.615 573.889,238.895C553.186,312.879 477.745,331.749 410.639,320.328C527.939,340.292 557.779,406.42 493.336,472.548C370.946,598.138 317.426,441.037 303.706,400.782C301.192,393.402 300.016,389.95 299.998,392.886C299.981,389.95 298.805,393.402 296.291,400.782C282.577,441.037 229.058,598.142 106.661,472.548C42.217,406.42 72.056,340.288 189.358,320.328C122.25,331.749 46.808,312.879 26.108,238.895C20.151,217.613 9.997,86.535 9.997,68.825C9.997,-19.862 87.739,8.009 135.717,44.03L135.72,44.03Z" style="fill-rule:nonzero;"/></svg></a></div><div class="foot-links"><a href="http://marconoris.com" target="_blank">Artworks</a> \xb7 <a href="https://lab.marconoris.com/news">News</a> \xb7 <a href="https://marconoris.com/about" target="_blank">About</a> \xb7 <a href="https://lab.marconoris.com/info#Contact">Contact</a></div><div class="credits">\xa9 <a href="https://lab.marconoris.com/marconoris" title="About Marco Noris">Marco Noris</a> \xb7 <a href="https://lab.marconoris.com/info">About this site</a> \xb7 <a href="https://lab.marconoris.com/contacto#Recibe+mis+actualizaciones">Subscribe</a><br />Content licensed CC BY-NC 4.0: <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">eng</a> | <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.es" target="_blank">esp</a></div>',
document.addEventListener("keydown", function(_) {
    _.ctrlKey && "t" === _.key && (_.preventDefault(),
    toggleTheme())
});

```

## Javalent

[plugins.javalent.com > Home -](https://plugins.javalent.com/home#Practical+plugins)

```js
/* == Add Buy Me a Coffee to Right Side Menu == */

document.getElementsByClassName('site-footer')[0].innerHTML = '<div style="text-align: center "><a href=\'https://www.buymeacoffee.com/valentine195\' target=\'_blank\'><img height=\'32\' width=\'150\' style=\'border:0;height:32px;opacity:0.5;filter:alpha(opacity=50);\' src=\'https://storage.ko-fi.com/cdn/kofi3.png?v=3\' border=\'0\' alt=\'Buy Me a Coffee at ko-fi.com\' /></a></div>';


/* == Add Copy Code Button == */

const svgCopy =
    '<svg aria-hidden="true" height="12" viewBox="1 -2 12 18" version="1.1" width="18" data-view-component="true"><path fill-rule="evenodd" fill="rgb(200, 200, 200)" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" fill="rgb(200, 200, 200)" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'
const svgCheck =
    '<svg aria-hidden="true" height="12" viewBox="1 -2 12 18" version="1.1" width="18" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

// Function to create the copy button element
function createButton() {
    const button = document.createElement('button')
    button.classList.add('copy-code-button')
    button.type = 'button'
    return button
}

// Function to update the button's icon with the specified SVG
function updateButtonIcon(button, icon) {
    button.innerHTML = icon
}

// Function to add a copy button to the code block
function addCopyButton(block) {
    const button = createButton()
    updateButtonIcon(button, svgCopy)
    block.parentNode.insertBefore(button, block.nextSibling)

    // Add click event listener to the button
    button.addEventListener('click', function () {
        copyCodeToClipboard(block.textContent, button)
    })
}

// Function to copy code to clipboard and update the button's icon
function copyCodeToClipboard(code, button) {
    navigator.clipboard
        .writeText(code)
        .then(function () {
            console.log('Copied to clipboard: ' + code)
            button.blur()
            updateButtonIcon(button, svgCheck)
            setTimeout(function () {
                updateButtonIcon(button, svgCopy)
            }, 2000)
        })
        .catch(function (error) {
            console.error('Failed to copy code: ', error)
        })
}

// Check for new code blocks periodically and add copy buttons if needed
setInterval(function () {
    document.querySelectorAll('pre code:not(.copy-code-button)').forEach(addCopyButton)
}, 100)

```

## Minerva

[minerva.mamansoft.net > Home - Minerva](https://minerva.mamansoft.net/Home)

```js
console.log("Load start publish.js");

// Disable default favicon
document.querySelector("head > link[rel=icon]").href =
  "https://publish-01.obsidian.md/access/35d05cd1bf5cc500e11cc8ba57daaf88/favicon.ico";

let id;

function insertMetaData() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    clearInterval(id);
    return;
  }

  const created = frontmatter["created"]?.replaceAll("-", "/");
  const updated = frontmatter["updated"]?.replaceAll("-", "/");
  const status = frontmatter["status"];
  const url = frontmatter["url"];
  if (!(created || updated || status || url)) {
    clearInterval(id);
    return;
  }

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    // DOMの準備が完了していないだけの可能性が高いためclearIntervalはしない
    return;
  }

  const urlElement = url ? `<a href="${url}" class="url">一次情報あり</a>` : "";

  frontmatterEl.insertAdjacentHTML(
    "afterend",
    `
<div class="properties-container">
  <div class="properties">
    ${created ? '<div class="created">作成:' + created + "</div>" : ""}
    ${updated ? '<div class="updated">更新:' + updated + "</div>" : ""}
    ${status ? '<div class="status">' + status + "</div>" : ""}
  </div>
  <div class="properties">
    ${urlElement}
  </div>
</div>
`,
  );

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaData, 50);
    }
  }
};

const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section",
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaData, 50);

```

## Excalidraw Wiki

[excalidraw-obsidian.online > Welcome - Obsidian-Excalidraw](https://excalidraw-obsidian.online/Welcome)

```js
const clickToEnlarge = "Click and hold to enlarge. SHIFT + wheel to zoom. ESC to reset.";
const clickToCollapse = "ESC to reset. Click and hold to collapse. SHIFT + wheel to zoom";

//check if in iFrame - if yes the page is assumed to be an embedded frame
if(window.self !== window.top) {
  const elements = [
    "div.site-body-right-column",
    "div.site-body-left-column",
    "div.site-header",
    "div.site-footer"
  ];
  elements.forEach(x=>{
    document.querySelectorAll(x).forEach(div=>{
      div.style.display = "none";
    });
  });
}

const baseUrl = `${window.location.origin}/`;

const [isDesktop, isMobile, isTablet] = (()=>{
  const userAgent = navigator.userAgent;
  const mobileKeywords = ['Mobile', 'Android', 'iPhone', 'iPad', 'Windows Phone'];

  const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
  const isTablet = /iPad/i.test(userAgent) || (isMobile && !/Mobile/i.test(userAgent));
  const isDesktop = !isMobile && !isTablet;

  return [isDesktop, isMobile, isTablet];
})();

const addNavigationToDiv = (container) => {
  const svgElement = container?.querySelector('.excalidraw-svg');
  if(!svgElement) return;
  container.addClass("excalidraw-svg");
  svgElement.removeAttribute("width");
  svgElement.removeAttribute("height");
  
  if(!isDesktop) return;
  
  const textDiv = document.createElement('div');
  textDiv.className = 'text';
  textDiv.textContent = clickToEnlarge;
  container.appendChild(textDiv);

  let isEnlarged = false;
  let timeout = null;
  let isReadyToPan = false;
  let isPanning = false;
  let zoomLevel = 1;
  let panX = 0;
  let panY = 0;
  let pinchStartDistance = 0;
  let panStartX = 0;
  let panStartY = 0;

  const clearEnlargeTimeout = () => {
    if(timeout) clearTimeout(timeout);
    timeout = null;
  }

  const enablePointerEvents = (val) => {
    svgElement.querySelectorAll("a").forEach(el=>{
      el.style.pointerEvents = val ? "all" : "none";
    });
  }

  const applyTransform = () => {
    svgElement.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    clearEnlargeTimeout();
  };

  //Wheel zoom
  svgElement.addEventListener('wheel', (event) => {
    if(!event.shiftKey ) return;
    if (event.deltaY > 0) {
    zoomLevel -= zoomLevel > 4 
	  ? (zoomLevel > 6 
	    ? (zoomLevel > 10 ? 0.4 : 0.3)
		: 0.2) 
	  : 0.1;
    } else {
    zoomLevel += zoomLevel > 4 
	  ? (zoomLevel > 6 
	    ? (zoomLevel > 10 ? 0.4 : 0.3)
		: 0.2) 
	  : 0.1;
    }
    applyTransform();
  });

  // Panning
  svgElement.addEventListener('mousedown', (event) => {
    isReadyToPan = true;
    panStartX = event.clientX;
    panStartY = event.clientY;
  });

  svgElement.addEventListener('mousemove', (event) => {
    const deltaX = event.clientX - panStartX;
    const deltaY = event.clientY - panStartY;
    const distance = Math.sqrt(deltaX**2+deltaY**2);
    if (isReadyToPan && (distance > 20)) {
      if(!isPanning) {
        enablePointerEvents(false);
        isPanning = true;
      }
      panX += deltaX/zoomLevel;
      panY += deltaY/zoomLevel;
      panStartX = event.clientX;
      panStartY = event.clientY;

      applyTransform();
    }
  });

  svgElement.addEventListener('mouseup', () => {
    enablePointerEvents(true);
    isPanning = false;
    isReadyToPan = false;
  });

  svgElement.addEventListener('mouseleave', () => {
    enablePointerEvents(true);
    isPanning = false;
    isReadyToPan = false;
  });

  //abort on Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      enablePointerEvents(true);
      isEnlarged = false;
      isPanning = false;
      isReadyToPan = false;
      container.classList.remove("enlarged");
      textDiv.textContent = clickToEnlarge;
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      applyTransform();
    }
  });
 

  //Enlarge on long click
  svgElement.addEventListener('mouseup', () => clearEnlargeTimeout());
  svgElement.addEventListener('mousedown', () => {
    timeout = setTimeout(()=> {
      timeout = null;
      if(isPanning) return;
      isReadyToPan = false;
      if (isEnlarged) {
        // Collapse the image
        container.classList.remove("enlarged");
        textDiv.textContent = clickToEnlarge;
      } else {
        // Enlarge the image
        container.addClass("enlarged");
        textDiv.textContent = clickToCollapse;
      }
      isEnlarged = !isEnlarged;
    },1000);
  });

  applyTransform();
}

const processIMG = (img) => {
  const svgURL = img.src;
  const container = img.parentElement;

  fetch(svgURL)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Failed to fetch SVG');
    })
    .then((svgContent) => {    
      svgContainer = document.createElement('div');
      svgContainer.innerHTML = svgContent;
      svgContainer.querySelectorAll(`a[href^="obsidian://open?vault="`).forEach(el=>{
        el.setAttribute("href",unescape(el.getAttribute("href").replace(/.*&file=/,baseUrl).replaceAll(" ","+")));
      });
      svgContainer.querySelectorAll(`iframe[src^="obsidian://open?vault="`).forEach(el=>{
        el.setAttribute("src",unescape(el.getAttribute("src").replace(/.*&file=/,baseUrl).replaceAll(" ","+")));
      });
      container.removeChild(img);
      container.appendChild(svgContainer);
      addNavigationToDiv(svgContainer);
      
    })
    .catch((error) => {
      console.error('Error: ' + error);
    });
}

const processIframe = (iframe) => {
  const p = iframe.parentElement;
  if(!p || p.tagName.toLowerCase()!=="p") return;
  const div = p.parentElement;
  if(!div || div.tagName.toLowerCase()!=="div") return;

  div.style.maxWidth = '600px';
  div.style.maxHeight = '350px';
  div.style.overflow = 'hidden';

  p.style.position = 'relative';
  p.style.width = '100%';
  p.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
  p.style.height = '0';

  // Apply inline styles to the iframe
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';
};

const addMutationObserver = () => {
  const targetElement = document.body;

  const handler = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) {
            // Process SVG images as before
            if (node.querySelector(`img[alt$=".svg"]`)) {
              processIMG(node.querySelector(`img[alt$=".svg"]`));
            }
            // Process iframes with the class 'external-embed'
            const iframe = node.querySelector('iframe.external-embed');
            if (iframe) {
              processIframe(iframe);
              
            }
          }
        });
      }
    }
  };

  const observer = new MutationObserver(handler);
  const config = { childList: true, subtree: true };
  observer.observe(targetElement, config);
};

//process images after loading
document.body.querySelectorAll(`img[alt$=".svg"`).forEach(img => {
  processIMG(img);
});

addMutationObserver();

// -----------------------------------
// Page redirect for 404 pages
// -----------------------------------

const pageNotFoundObserver = new MutationObserver(() => {
  handlePageNotFound();
});

function handlePageNotFound() {
  const container = document.querySelector('div.published-container.has-not-found');
  if (container) {
    pageNotFoundObserver.disconnect(); // Stop observing once the .published-container is found

    const currentLocation = window.location.href;
    const newLocation = currentLocation.replace(/Hobbies\/Excalidraw\+Blog\//, '');

    // Update the content of the div.not-found-description
    const notFoundDescription = document.querySelector('div.not-found-description');
    if (notFoundDescription) {
      notFoundDescription.innerHTML = `
        <p style="text-align: center;">This page may have moved. You will be redirected in <span id="countdown" style="color:red;">10</span><span style="color:red;"> seconds</span>.</p>
        <p style="text-align: center;">If you arrived from an external link, please email details to 
        <a href="mailto:webmaster@visual-thinking-workshop.com">webmaster@visual-thinking-workshop.com</a>.</p>
        <p style="text-align: center;"><a href="${newLocation}">Click here to redirect now.</a></p>
      `;
    }

    // Countdown timer
    let countdown = 10;
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
	  //abort if the user has moved to another page
	  if(currentLocation !== window.location.href) {
		  clearInterval(interval);
	  }
      countdown -= 1;
      countdownElement.textContent = countdown;
      
      // Once the countdown reaches 0, redirect the page
      if (countdown <= 0) {
        clearInterval(interval);
        window.location.href = newLocation;
      }
    }, 1000); // Update every second

    console.log(`Redirecting to: ${newLocation}`);
    return true;
  }
  return false;
}

if(!handlePageNotFound()) {
  const target = document.querySelector("div.published-container") ?? document.body;
  pageNotFoundObserver.observe(target, { childList: true, attributes: true });
}
```

## Anthony Amar

[anthonyamar.fr > Welcome in my mind 🧠 - My second-brain](https://anthonyamar.fr/Welcome+in+my+mind+%F0%9F%A7%A0)

```js
var path = decodeURI(window.location.pathname).replaceAll("+", " ");
var str = path.substring(1) + ".md";
var frontmatter = window.app.site.cache.cache[str].frontmatter;

var metas = {}
metas["title"] = frontmatter.title;
metas["description"] = frontmatter.description;

Object.keys(metas).forEach(function(key){
  var metaTag = document.createElement('meta'); 
  metaTag.name = key; 
  metaTag.content = metas[key]; 
  document.head.appendChild(metaTag);
});
```

## Elkadre

[gist.github.com > elkadre’s gists](https://gist.github.com/elkadre)

```js
/*
Since this site is made with Obsidian, we use this publish.js file to customize the site.
https://help.obsidian.md/Obsidian+Publish/Customize+your+site
*/

const site = "https://brain.elkadre.ch";

// Customize navigation order

let navOrderAsc = []; // These go on top
let navOrderDsc = []; // These go at the bottom

// Items not mentioned go in between in alphabetical order

var siteLeft = document.querySelector('.site-body-left-column');
var siteNav = siteLeft.querySelector('.nav-view-outer');
var navContainer = siteNav.querySelector('.tree-item').querySelector('.tree-item-children');

for (const item of navOrderAsc.reverse()) {
    navItem = navContainer.querySelector(`[data-path="${item}.md"]`);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.prepend(moveItem);
};

for (const item of navOrderDsc.reverse()) {
    navItem = navContainer.querySelector(`[data-path="${item}.md"]`);
    if (navItem == null) continue;
    moveItem = navItem.parentElement;
    navContainer.append(moveItem);
};

/* == Add Buy Me a Coffee to Left Side Menu == */

var buymeacoffee = document.createElement("bmac");

document.querySelector(".site-body-right-column").appendChild(buymeacoffee); 

buymeacoffee.innerHTML = '<div style="text-align: center; display:block; bottom:0; right:10px; position: absolute; margin-bottom:30px; margin-left: "><a href="https://ko-fi.com/lkadre" target="_blank"><img src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png" alt="Buy Me A Coffee" height="60" width="60" style="opacity:0.3;filter:alpha(opacity=30);"></a></div>';


/* == Publish Frontmatter code from tadashi-aikawa 
https://forum.obsidian.md/t/show-properties-of-a-note-in-the-published-pages/68164/5?u=sigrunixia */

let id;

function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    return;
  }

  const lastupdate = frontmatter["lastupdate"]?.replaceAll("-", "/");
  const fullname = frontmatter["fullname"]?.replaceAll("-", "/");
  const birth = frontmatter["birth"]?.replaceAll("-", "/");
  const death = frontmatter["death"]?.replaceAll("-", "/");
  const type = frontmatter["type"]?.replaceAll("-", "/");
  const jurisdiction = frontmatter["jurisdiction"]?.replaceAll("-", "/");
  const url = frontmatter["url"];
  const tags = frontmatter["tags"]

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    return;
  }

  const tagElms = tags
  .map(
    (tag) => `
  <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
  `
  )
  .join("");



  frontmatterEl.insertAdjacentHTML(
    "afterend",
    `
<div class="propertyitemtable">
    <div id="updatedateproperty" class="propertyitem">Last Update on ${lastupdate}</div>
    <div id="fullnameproperty" class="propertyitem">full name: ${fullname}</div>
    <div id="birthproperty" class="propertyitem">birth: ${birth}</div>
    <div id="deathproperty" class="propertyitem">death: ${death}</div>
    <div id="jurisdictionproperty" class="propertyitem">jurisdiction: ${jurisdiction}</div>
    <div id="typeproperty" class="propertyitem">type: ${type}</div>
    <div id="urlproperty" class="propertyitem"><a href="${url}"> URL </a></div>
</div>
<div class="propertyitemtags">
        ${tagElms}
</div>
`
  );

if (!lastupdate) {
    document.getElementById('updatedateproperty').style.display = "none"
} else {
    document.getElementById('updatedateproperty').style.display = ""
}

if (!fullname) {
    document.getElementById('fullnameproperty').style.display = "none"
} else {
    document.getElementById('fullnameproperty').style.display = ""
}

if (!birth) {
    document.getElementById('birthproperty').style.display = "none"
} else {
    document.getElementById('birthproperty').style.display = ""
}

if (!death) {
    document.getElementById('deathproperty').style.display = "none"
} else {
    document.getElementById('deathproperty').style.display = ""
}

if (!jurisdiction) {
  document.getElementById('jurisdictionproperty').style.display = "none"
} else {
  document.getElementById('jurisdictionproperty').style.display = ""
}

if (!url) {
  document.getElementById('urlproperty').style.display = "none"
} else {
  document.getElementById('urlproperty').style.display = ""
}

if (!type) {
  document.getElementById('typeproperty').style.display = "none"
} else {
  document.getElementById('typeproperty').style.display = ""
}

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaDates, 50);
    }
  }
};


const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section"
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);
```

# Implementations from the Vault Side

There's two good ways to implement things from the vault side:
1. Use HTML or embeds
2. Use plugins that programmatically generate into supported formats that would work in Publish 

## Hiding Content from Obsidian Publish

### 1. Wrapping Links in a “No Publish” Container and Hiding with CSS

**a. Generate the Links Wrapped in a Container**

When you generate your GitHub links (using Templater, QuickAdd, or another method), have the output wrapped in an element with a dedicated class (for example, `.no-publish`). For instance:

markdown

Copy

`<div class="no-publish"> [View on GitHub](https://github.com/yourusername/yourrepo/blob/main/<% tp.file.path() %>) | [Edit on GitHub](https://github.com/yourusername/yourrepo/edit/main/<% tp.file.path() %>) </div>`

**b. Hide the Container in publish.css**

Then, in your publish.css (which controls the published website’s appearance), add a rule to hide that element:

css

Copy

`.no-publish {   display: none; }`

This way, while the links are present in your markdown files (and useful for local navigation or editing), they won’t be visible on the published site.

---

### 2. Removing the Elements via publish.js

If you prefer to remove the elements entirely after the page loads (rather than just hiding them with CSS), you can add some JavaScript to your publish.js. For example, append the following snippet to your publish.js file:

js

Copy

`function removeNoPublishElements() {   const noPublishElements = document.querySelectorAll('.no-publish');   noPublishElements.forEach(el => el.remove()); }  // Run once the page’s DOM is ready document.addEventListener("DOMContentLoaded", removeNoPublishElements);`

This code waits for the page to load and then finds and removes all elements with the class `.no-publish` from the DOM.

---

### Additional Considerations

- **Conditional Generation:**  
    If you want the links available in certain environments (like local preview) but not in the published output, you might include a flag in your frontmatter (or use environment-specific variables) so that your template generates the block only when needed.  
    However, using a “wrapper” and then hiding it via CSS or JS is straightforward and works well with Obsidian Publish’s customization.
    
- **Data Attributes:**  
    Another option is to wrap the links with an element that carries a data attribute (for example, `data-publish="false"`) and then in CSS target it like so:
    
    css
    
    Copy
    
    `[data-publish="false"] {   display: none; }`
    
    This method works similarly to using a class.
    
- **Ensuring Clean Markup:**  
    Since Obsidian Publish renders your markdown as HTML, ensure that your generated block is valid HTML. The approaches above (using `<div>`) should work without issues.

## HTML and Embeds

### Embed Web Pages

[help.obsidian.md > Embed web pages - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/Embed+web+pages)

Learn how to use the [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML element to embed web pages in your notes.

To embed a web page, add the following in your note and replace the placeholder text with the URL of the web page you want to embed:

```html
<iframe src="INSERT YOUR URL HERE"></iframe>
```

Note

Some websites don't allow you to embed them. Instead, they may provide URLs that are meant for embedding them. If the website doesn't support embedding, try searching for the name of the website followed by "embed iframe". For example, "youtube embed iframe".

Tip

If you're using [Canvas](https://help.obsidian.md/Plugins/Canvas), you can embed a web page in a card. For more information, refer to [Canvas > Add cards from web pages](https://help.obsidian.md/Plugins/Canvas#Add%20cards%20from%20web%20pages).

#### Embed a YouTube video 

To embed a YouTube video, use the same Markdown syntax as [external images](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20images):

```md
![](https://www.youtube.com/watch?v=NnTvZWp5Q7o)
```

#### Embed a tweet 

To embed a tweet, use the same Markdown syntax as [external images](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20images):

```md
![](https://twitter.com/obsdmd/status/1580548874246443010)
```

### HTML Content

[help.obsidian.md > HTML content - Obsidian Help](https://help.obsidian.md/Editing+and+formatting/HTML+content)

Obsidian supports HTML to allow you to display your notes the way you want, or even [embed web pages](https://help.obsidian.md/Editing+and+formatting/Embed+web+pages). Allowing HTML inside your notes comes with risks. To prevent malicious code from doing harm, Obsidian _sanitizes_ any HTML in your notes.

Example

The `<script>` element normally lets you run JavaScript whenever it loads. If Obsidian didn't sanitize HTML, an attacker could convince you to paste a text containing JavaScript that extracts sensitive information from your computer and sends it back to them.

That said, since Markdown syntax does not support all forms of styling, using sanitized HTML can be yet another way of enhancing the quality of your notes. We've included some of the more common usages of HTML.

More details on using `<iframe>` can be found in [Embed web pages](https://help.obsidian.md/Editing+and+formatting/Embed+web+pages).

#### Comments 

[Markdown comments](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Comments) are the preferred way of adding hidden comments within your notes. However some methods of converting Markdown notes, such as [Pandoc](https://pandoc.org/), have limited support of Markdown comments. In those instances, you can use a `<!-- HTML Comment -->` instead!

#### Underline 

If you need to quickly underline an item in your notes, you can use `<u>Example</u>` to create your underlined text.

#### Span/Div 

Span and div tags can be used to apply custom classes from a [CSS snippet](https://help.obsidian.md/Extending+Obsidian/CSS+snippets), or custom defined styling, onto a selected area of text. For example, using `<span style="font-family: cursive">your text</span>` can allow you to quickly change your font.

#### Strikethrough 

Need to strike ~~some text~~? Use `<s>this</s>` to strike it out.

## Templater

- [silentvoid13.github.io > ](https://silentvoid13.github.io/Templater/)

### Script User Functions

This type of user functions allows you to call JavaScript functions from JavaScript files and retrieve their output.

To use script user functions, you need to specify a script folder in Templater's settings. This folder needs to be accessible from your vault.

#### [Define a Script User Function](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html#define-a-script-user-function)

Let's say you specified the `Scripts` folder as your script folder in Templater's settings.

Templater will load all JavaScript (`.js` files) scripts in the `Scripts` folder.

You can then create your script named `Scripts/my_script.js` (the `.js` extension is required) for example. You will likely have to create the file outside of Obsidian, as Obsidian only creates markdown files.

You will then be able to call your scripts as user functions. The function name corresponds to the script file name.

Scripts should follow the [CommonJS module specification](https://flaviocopes.com/commonjs/), and export a single function.

``function my_function (msg) {     return `Message from my script: ${msg}`; } module.exports = my_function;``

In this example, a complete command invocation would look like this:

`<% tp.user.my_script("Hello World!") %>`

Which would output `Message from my script: Hello World!`.

#### [Global namespace](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html#global-namespace)

In script user functions, you can still access global namespace variables like `app` or `moment`.

However, you can't access the template engine scoped variables like `tp` or `tR`. If you want to use them, you must pass them as arguments for your function.

#### [Functions Arguments](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html#functions-arguments)

You can pass as many arguments as you want to your function, depending on how you defined it.

You can for example pass the `tp` object to your function, to be able to use all of the [internal variables / functions](https://silentvoid13.github.io/Templater/internal-variables-functions/overview.html) of Templater: `<% tp.user.<user_function_name>(tp) %>`

### Internal Functions

The different internal variables and functions offered by [Templater](https://github.com/SilentVoid13/Templater) are available under different **modules**, to sort them. The existing **internal modules** are:

- [App module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/app-module.html): `tp.app`
- [Config module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/config-module.html): `tp.config`
- [Date module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html): `tp.date`
- [File module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html): `tp.file`
- [Frontmatter module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/frontmatter-module.html): `tp.frontmatter`
- [Hooks module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/hooks-module.html): `tp.hooks`
- [Obsidian module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/obsidian-module.html): `tp.obsidian`
- [System module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/system-module.html): `tp.system`
- [Web module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/web-module.html): `tp.web`

If you understood the [object hierarchy](https://silentvoid13.github.io/Templater/syntax.html#objects-hierarchy) correctly, this means that a typical internal function call looks like this: `<% tp.<module_name>.<internal_function_name> %>`

#### [Contribution](https://silentvoid13.github.io/Templater/internal-functions/overview.html#contribution)

I invite everyone to contribute to this plugin development by adding new internal functions. More information [here](https://silentvoid13.github.io/Templater/internal-functions/contribute.html).

### Settings

#### [General Settings](https://silentvoid13.github.io/Templater/settings.html#general-settings)

- `Template folder location`: Files in this folder will be available as templates.
- `Syntax Highlighting on Desktop` adds syntax highlighting for [Templater](https://github.com/SilentVoid13/Templater) commands in edit mode.
- `Syntax Highlighting on Mobile` adds syntax highlighting for [Templater](https://github.com/SilentVoid13/Templater) commands in edit mode on mobile. Use with caution: this may break live preview on mobile platforms."
- `Automatic jump to cursor` automatically triggers `tp.file.cursor` after inserting a template. You can also set a hotkey to manually trigger `tp.file.cursor`.
- `Trigger Templater on new file creation`: [Templater](https://github.com/SilentVoid13/Templater) will listen for the new file creation event, and, if it matches a rule you've set, replace every command it finds in the new file's content. This makes [Templater](https://github.com/SilentVoid13/Templater) compatible with other plugins like the Daily note core plugin, Calendar plugin, Review plugin, Note refactor plugin, etc.
    - Make sure to set up rules under either Folder Templates or File Regex Template below.
    - **Warning:** This can be dangerous if you create new files with unknown / unsafe content on creation. Make sure that every new file's content is safe on creation."

#### [Template Hotkeys](https://silentvoid13.github.io/Templater/settings.html#template-hotkeys)

Template Hotkeys allows you to bind a template to a hotkey.

#### [Folder Templates](https://silentvoid13.github.io/Templater/settings.html#folder-templates)

**Note**: This setting is hidden by default. To view it first enable the `Trigger Template on new file creation` setting. And since it's mutually exclusive with File Regex Templates, enabling one will disable the other.

You can specify a template that will automatically be used on a selected folder and children using the `Folder Templates` functionality. The deepest match will be used, so the order of the rules is irrelevant.

Add a rule for "`/`" if you need a catch-all.

#### [File Regex Templates](https://silentvoid13.github.io/Templater/settings.html#file-regex-templates)

**Note**: This setting is hidden by default. To view it first enable the `Trigger Template on new file creation` setting. And since it's mutually exclusive with Folder Templates, enabling one will disable the other.

You can specify regex declarations that a new file's path will be tested against. If a regex matches, the associated template will automatically be used. Rules are tested top-to-bottom, and the first match will be used.

End with a rule for "`.*`" if you need a catch-all.

Use a tool like [Regex101](https://regex101.com/) to verify your regexes.

#### [Startup Templates](https://silentvoid13.github.io/Templater/settings.html#startup-templates)

Startup Templates are templates that will get executed once when Templater starts.

These templates won't output anything.

This can be useful to set up templates adding hooks to obsidian events for example.

#### [User Script Functions](https://silentvoid13.github.io/Templater/settings.html#user-script-functions)

All JavaScript files in this folder will be loaded as CommonJS modules, to import custom [user functions](https://silentvoid13.github.io/Templater/user-functions/overview.html).

The folder needs to be accessible from the vault.

Check the [documentation](https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html) for more information.

#### [User System Command Functions](https://silentvoid13.github.io/Templater/settings.html#user-system-command-functions)

Allows you to create [user functions](https://silentvoid13.github.io/Templater/user-functions/overview.html) linked to system commands.

Check the [documentation](https://silentvoid13.github.io/Templater/user-functions/system-user-functions.html) for more information.

**Warning:** It can be dangerous to execute arbitrary system commands from untrusted sources. Only run system commands that you understand, from trusted sources.

### Syntax

[Templater](https://github.com/SilentVoid13/Templater) uses a custom templating engine ([rusty_engine](https://github.com/SilentVoid13/rusty_engine)) syntax to declare a command. You may need a bit of time to get used to it, but once you get the idea, the syntax is not that hard.

All of Templater's functions are JavaScript objects that are invoked using a **command**.

#### [Command syntax](https://silentvoid13.github.io/Templater/syntax.html#command-syntax)

A command **must** have both an opening tag `<%` and a closing tag `%>`.

A complete command using the `tp.date.now` internal function would be: `<% tp.date.now() %>`

#### [Function syntax](https://silentvoid13.github.io/Templater/syntax.html#function-syntax)

##### [Objects hierarchy](https://silentvoid13.github.io/Templater/syntax.html#objects-hierarchy)

All of Templater's functions, whether it's an internal function or a user function, are available under the `tp` object. You could say that all our functions are children of the `tp` object. To access the "child" of an object, we have to use the dot notation `.`

This means that a Templater function invocation will always start with `tp.<something>`

###### [Function invocation](https://silentvoid13.github.io/Templater/syntax.html#function-invocation)

To invoke a function, we need to use a syntax specific to functions calls: appending an opening and a closing parenthesis after the function name.

As an example, we would use `tp.date.now()` to invoke the `tp.date.now` internal function.

A function can have arguments and optional arguments. They are placed between the opening and the closing parenthesis, like so:

`tp.date.now(arg1_value, arg2_value, arg3_value, ...)`

All arguments must be passed in the correct order.

The arguments of a function can have different **types**. Here is a non-exhaustive list of the possible types of a function:

- A `string` type means the value must be placed within simple or double quotes (`"value"` or `'value'`)
- A `number` type means the value must be an integer (`15`, `-5`, ...)
- A `boolean` type means the value must be either `true` or `false` (completely lower case), and nothing else.

The type of an argument must be respected when calling a function, or it won't work.

##### [Function documentation syntax](https://silentvoid13.github.io/Templater/syntax.html#function-documentation-syntax)

The documentation for the internal functions of Templater are using the following syntax:

`tp.<my_function>(arg1_name: type, arg2_name?: type, arg3_name: type = <default_value>, arg4_name: type1|type2, ...)`

Where:

- `arg_name` represents a **symbolic** name for the argument, to understand what it is.
- `type` represents the expected type for the argument. This type must be respected when calling the internal function, or it will throw an error.

If an argument is optional, it will be appended with a question mark `?`, e.g. `arg2_name?: type`

If an argument has a default value, it will be specified using an equal sign `=`, e.g. `arg3_name: type = <default_value>`.

If an argument can have different types, it will be specified using a pipe `|`, e.g. `arg4_name: type1|type2`

###### [Syntax warning](https://silentvoid13.github.io/Templater/syntax.html#syntax-warning)

Please note that this syntax is for documentation purposes only, to be able to understand what arguments the function expects.

You mustn't specify the name nor the type nor the default value of an argument when calling a function. Only the value of the arguments are required, as explained [here](https://silentvoid13.github.io/Templater/syntax.html#function-invocation)

Let's take the `tp.date.now` internal function documentation as an example:

`tp.date.now(format: string = "YYYY-MM-DD", offset?: number|string, reference?: string, reference_format?: string)`

This internal function has 4 optional arguments:

- a format of type `string`, with a default value of `"YYYY-MM-DD"`.
- an offset of type `number` or of type `string`.
- a reference of type `string` .
- a reference_format of type `string` .

That means that **valid invocations** for this internal function are:

- `<% tp.date.now() %>`
- `<% tp.date.now("YYYY-MM-DD", 7) %>`
- `<% tp.date.now("YYYY-MM-DD", 7, "2021-04-09", "YYYY-MM-DD") %>`
- `<% tp.date.now("dddd, MMMM Do YYYY", 0, tp.file.title, "YYYY-MM-DD") %>` *Assuming the file name is of the format: "YYYY-MM-DD"

On the other hand, **invalid invocations** are:

- `tp.date.now(format: string = "YYYY-MM-DD")`
- `tp.date.now(format: string = "YYYY-MM-DD", offset?: 0)`


## Dataview & DataviewJS

- [github.com > udus122/dataview-publisher: Output markdown from your Dataview queries and keep them up to date. You can also be able to publish them.](https://github.com/udus122/dataview-publisher)
- [github.com > dsebastien/obsidian-dataview-serializer: Obsidian plugin that gives you the power of Dataview](https://github.com/dsebastien/obsidian-dataview-serializer)

### DataviewJS

[blacksmithgu.github.io > Codeblock Reference - Dataview](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)

Dataview JavaScript Codeblocks are created using the `dataviewjs` language specification for a codeblock:

` ```dataviewjs dv.table([], ...) ``` `

The API is available through the implicitly provided `dv` (or `dataview`) variable, through which you can query for information, render HTML, and configure the view.

Asynchronous API calls are marked with `⌛`.

#### Query

Query methods allow you to query the Dataview index for page metadata; to render this data, use the methods in the [render section](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#render).

##### `dv.current()`

Get page information (via `dv.page()`) for the page the script is currently executing on.

##### `dv.pages(source)`

Take a single string argument, `source`, which is the same form as a [query language source](https://blacksmithgu.github.io/obsidian-dataview/reference/sources). Return a [data array](https://blacksmithgu.github.io/obsidian-dataview/api/data-array) of page objects, which are plain objects with all of the page fields as values.

`dv.pages() => all pages in your vault dv.pages("#books") => all pages with tag 'books' dv.pages('"folder"') => all pages from folder "folder" dv.pages("#yes or -#no") => all pages with tag #yes, or which DON'T have tag #no dv.pages('"folder" or #tag') => all pages with tag #tag, or from folder "folder"`

Note that folders need to be double-quoted inside the string (i.e., `dv.pages("folder")` does not work, but `dv.pages('"folder"')` does) - this is to exactly match how sources are written in the query language.

##### `dv.pagePaths(source)`

As with `dv.pages`, but just returns a [data array](https://blacksmithgu.github.io/obsidian-dataview/api/data-array) of paths of pages that match the given source.

`dv.pagePaths("#books") => the paths of pages with tag 'books'`

##### `dv.page(path)`

Map a simple path or link to the full page object, which includes all of the pages fields. Automatically does link resolution, and will figure out the extension automatically if not present.

`dv.page("Index") => The page object for /Index dv.page("books/The Raisin.md") => The page object for /books/The Raisin.md`

#### Render

##### `dv.el(element, text)`

Render arbitrary text in the given html element.

`dv.el("b", "This is some bold text");`

You can specify custom classes to add to the element via `cls`, and additional attributes via `attr`:

`dv.el("b", "This is some text", { cls: "dataview dataview-class", attr: { alt: "Nice!" } });`

##### `dv.header(level, text)`

Render a header of level 1 - 6 with the given text.

`dv.header(1, "Big!"); dv.header(6, "Tiny");`

##### `dv.paragraph(text)`

Render arbitrary text in a paragraph.

`dv.paragraph("This is some text");`

##### `dv.span(text)`

Render arbitrary text in a span (no padding above/below, unlike a paragraph).

`dv.span("This is some text");`

##### `dv.execute(source)`

Execute an arbitrary dataview query and embed the view into the current page.

`dv.execute("LIST FROM #tag"); dv.execute("TABLE field1, field2 FROM #thing");`

##### `dv.executeJs(source)`

Execute an arbitrary DataviewJS query and embed the view into the current page.

`dv.executeJs("dv.list([1, 2, 3])");`

##### `dv.view(path, input)`

Complex function which allows for custom views. Will attempt to load a JavaScript file at the given path, passing it `dv` and `input` and allowing it to execute. This allows for you to re-use custom view code across multiple pages. Note that this is an asynchronous function since it involves file I/O - make sure to `await` the result!

`await dv.view("views/custom", { arg1: ..., arg2: ... });`

If you want to also include custom CSS in your view, you can instead pass a path to a folder containing `view.js` and `view.css`; the CSS will be added to the view automatically:

`views/custom  -> view.js  -> view.css`

View scripts have access to the `dv` object (the API object), and an `input` object which is exactly whatever the second argument of `dv.view()` was.

Bear in mind, `dv.view()` cannot read from directories starting with a dot, like `.views`. Example of an incorrect usage:

`await dv.view(".views/view1", { arg1: 'a', arg2: 'b' });`

Attempting this will yield the following exception:

`Dataview: custom view not found for '.views/view1/view.js' or '.views/view1.js'.`

Also note, directory paths always originate from the vault root.

###### Example

In this example, we have a custom script file named `view1.js` in the `scripts` directory.

**File:** `scripts/view1.js`

``console.log(`Loading view1`);  function foo(...args) {   console.log('foo is called with args', ...args); } foo(input)``

And we have an Obsidian document located under `projects`. We'll call `dv.view()` from this document using the `scripts/view1.js` path.

**Document:** `projects/customViews.md`

`await dv.view("scripts/view1", { arg1: 'a', arg2: 'b' })` 

When the above script is executed, it will print the following:

`Loading view1 foo is called with args {arg1: 'a', arg2: 'b'}`

#### Dataviews

##### `dv.list(elements)`

Render a dataview list of elements; accept both vanilla arrays and data arrays.

`dv.list([1, 2, 3]) => list of 1, 2, 3 dv.list(dv.pages().file.name) => list of all file names dv.list(dv.pages().file.link) => list of all file links dv.list(dv.pages("#book").where(p => p.rating > 7)) => list of all books with rating greater than 7`

##### `dv.taskList(tasks, groupByFile)`

Render a dataview list of `Task` objects, as obtained by `page.file.tasks`. By default, this view will automatically group the tasks by their origin file. If you provide `false` as a second argument explicitly, it will instead render them as a single unified list.

`// List all tasks from pages marked '#project' dv.taskList(dv.pages("#project").file.tasks)  // List all *uncompleted* tasks from pages marked #project dv.taskList(dv.pages("#project").file.tasks     .where(t => !t.completed))  // List all tasks tagged with '#tag' from pages marked #project dv.taskList(dv.pages("#project").file.tasks     .where(t => t.text.includes("#tag")))  // List all tasks from pages marked '#project', without grouping. dv.taskList(dv.pages("#project").file.tasks, false)`

##### `dv.table(headers, elements)`

Renders a dataview table. `headers` is an array of column headers. `elements` is an array of rows. Each row is itself an array of columns. Inside a row, every column which is an array will be rendered with bullet points.

`dv.table(     ["Col1", "Col2", "Col3"],         [             ["Row1", "Dummy", "Dummy"],             ["Row2",                  ["Bullet1",                  "Bullet2",                  "Bullet3"],              "Dummy"],             ["Row3", "Dummy", "Dummy"]         ]     );`

An example of how to render a simple table of book info sorted by rating.

`dv.table(["File", "Genre", "Time Read", "Rating"], dv.pages("#book")     .sort(b => b.rating)     .map(b => [b.file.link, b.genre, b["time-read"], b.rating]))`

#### Markdown Dataviews

Functions which render to plain Markdown strings which you can then render or manipulate as desired.

##### `dv.markdownTable(headers, values)`

Equivalent to `dv.table()`, which renders a table with the given list of headers and 2D array of elements, but returns plain Markdown.

`// Render a simple table of book info sorted by rating. const table = dv.markdownTable(["File", "Genre", "Time Read", "Rating"], dv.pages("#book")     .sort(b => b.rating)     .map(b => [b.file.link, b.genre, b["time-read"], b.rating]))  dv.paragraph(table);`

##### `dv.markdownList(values)`

Equivalent to `dv.list()`, which renders a list of the given elements, but returns plain Markdown.

`const markdown = dv.markdownList([1, 2, 3]); dv.paragraph(markdown);`

##### `dv.markdownTaskList(tasks)`

Equivalent to `dv.taskList()`, which renders a task list, but returns plain Markdown.

`const markdown = dv.markdownTaskList(dv.pages("#project").file.tasks); dv.paragraph(markdown);`

#### Utility

##### `dv.array(value)`

Convert a given value or array into a Dataview [data array](https://blacksmithgu.github.io/obsidian-dataview/api/data-array). If the value is already a data array, returns it unchanged.

`dv.array([1, 2, 3]) => dataview data array [1, 2, 3]`

##### `dv.isArray(value)`

Returns true if the given value is an array or dataview array.

`dv.isArray(dv.array([1, 2, 3])) => true dv.isArray([1, 2, 3]) => true dv.isArray({ x: 1 }) => false`

##### `dv.fileLink(path, [embed?], [display-name])`

Converts a textual path into a Dataview `Link` object; you can optionally also specify if the link is embedded as well as it's display name.

`dv.fileLink("2021-08-08") => link to file named "2021-08-08" dv.fileLink("book/The Raisin", true) => embed link to "The Raisin" dv.fileLink("Test", false, "Test File") => link to file "Test" with display name "Test File"`

##### `dv.sectionLink(path, section, [embed?], [display?])`

Converts a textual path + section name into a Dataview `Link` object; you can optionally also specify if the link is embedded and it's display name.

`dv.sectionLink("Index", "Books") => [[Index#Books]] dv.sectionLink("Index", "Books", false, "My Books") => [[Index#Books|My Books]]`

##### `dv.blockLink(path, blockId, [embed?], [display?])`

Converts a textual path + block ID into a Dataview `Link` object; you can optionally also specify if the link is embedded and it's display name.

`dv.blockLink("Notes", "12gdhjg3") => [[Index#^12gdhjg3]]`

##### `dv.date(text)`

Coerce text and links to luxon `DateTime`; if provided with a `DateTime`, return it unchanged.

`dv.date("2021-08-08") => DateTime for August 8th, 2021 dv.date(dv.fileLink("2021-08-07")) => dateTime for August 8th, 2021`

##### `dv.duration(text)`

Coerce text to a luxon `Duration`; uses the same parsing rules as Dataview duration types.

`dv.duration("8 minutes") => Duration { 8 minutes } dv.duration("9 hours, 2 minutes, 3 seconds") => Duration { 9 hours, 2 minutes, 3 seconds }`

##### `dv.compare(a, b)`

Compare two arbitrary JavaScript values according to dataview's default comparison rules; useful if you are writing a custom comparator and want to fall back to the default behavior. Returns a negative value if `a < b`, 0 if `a = b`, and a positive value if `a > b`.

`dv.compare(1, 2) = -1 dv.compare("yes", "no") = 1 dv.compare({ what: 0 }, { what: 0 }) = 0`

##### `dv.equal(a, b)`

Compare two arbitrary JavaScript values and return true if they are equal according to Dataview's default comparison rules.

`dv.equal(1, 2) = false dv.equal(1, 1) = true`

##### `dv.clone(value)`

Deep clone any Dataview value, including dates, arrays, and links.

`dv.clone(1) = 1 dv.clone({ a: 1 }) = { a: 1 }`

##### `dv.parse(value)`

Parse an arbitrary string object into a complex Dataview type (mainly supporting links, dates, and durations).

`dv.parse("[[A]]") = Link { path: A } dv.parse("2020-08-14") = DateTime { 2020-08-14 } dv.parse("9 seconds") = Duration { 9 seconds }`

#### File I/O

These utility methods are all contained in the `dv.io` sub-API, and are all _asynchronous_ (marked by ⌛).

##### ⌛ `dv.io.csv(path, [origin-file])`

Load a CSV from the given path (a link or string). Relative paths will be resolved relative to the optional origin file (defaulting to the current file if not provided). Return a dataview array, each element containing an object of the CSV values; if the file does not exist, return `undefined`.

`await dv.io.csv("hello.csv") => [{ column1: ..., column2: ...}, ...]`

##### ⌛ `dv.io.load(path, [origin-file])`

Load the contents of the given path (a link or string) asynchronously. Relative paths will be resolved relative to the optional origin file (defaulting to the current file if not provided). Returns the string contents of the file, or `undefined` if the file does not exist.

`await dv.io.load("File") => "# File\nThis is an example file..."`

##### `dv.io.normalize(path, [origin-file])`

Convert a relative link or path into an absolute path. If `origin-file` is provided, then the resolution is doing as if you were resolving the link from that file; if not, the path is resolved relative to the current file.

`dv.io.normalize("Test") => "dataview/test/Test.md", if inside "dataview/test" dv.io.normalize("Test", "dataview/test2/Index.md") => "dataview/test2/Test.md", irrespective of the current file`

#### Query Evaluation

##### ⌛ `dv.query(source, [file, settings])`

Execute a Dataview query and return the results as a structured return. The return type of this function varies by the query type being executed, though will always be an object with a `type` denoting the return type. This version of `query` returns a result type - you may want `tryQuery`, which instead throws an error on failed query execution.

``await dv.query("LIST FROM #tag") =>     { successful: true, value: { type: "list", values: [value1, value2, ...] } }  await dv.query(`TABLE WITHOUT ID file.name, value FROM "path"`) =>     { successful: true, value: { type: "table", headers: ["file.name", "value"], values: [["A", 1], ["B", 2]] } }  await dv.query("TASK WHERE due") =>     { successful: true, value: { type: "task", values: [task1, task2, ...] } }``

`dv.query` accepts two additional, optional arguments: 1. `file`: The file path to resolve the query from (in case of references to `this`). Defaults to the current file. 2. `settings`: Execution settings for running the query. This is largely an advanced use case (where I recommend you directly check the API implementation to see all available options).

##### ⌛ `dv.tryQuery(source, [file, settings])`

Exactly the same as `dv.query`, but more convenient in short scripts as execution failures will be raised as JavaScript exceptions instead of a result type.

##### ⌛ `dv.queryMarkdown(source, [file], [settings])`

Equivalent to `dv.query()`, but returns rendered Markdown.

`await dv.queryMarkdown("LIST FROM #tag") =>     { successful: true, value: { "- [[Page 1]]\n- [[Page 2]]" } }`

##### ⌛ `dv.tryQueryMarkdown(source, [file], [settings])`

Exactly the same as `dv.queryMarkdown()`, but throws an error on parse failure.

##### `dv.tryEvaluate(expression, [context])`

Evaluate an arbitrary dataview expression (like `2 + 2` or `link("text")` or `x * 9`); throws an `Error` on parse or evaluation failure. `this` is an always-available implicit variable which refers to the current file.

`dv.tryEvaluate("2 + 2") => 4 dv.tryEvaluate("x + 2", {x: 3}) => 5 dv.tryEvaluate("length(this.file.tasks)") => number of tasks in the current file`

##### `dv.evaluate(expression, [context])`

Evaluate an arbitrary dataview expression (like `2 + 2` or `link("text")` or `x * 9`), returning a `Result` object of the result. You can unwrap the result type by checking `result.successful` (and then fetching either `result.value` or `result.error`). If you want a simpler API that throws an error on a failed evaluation, use `dv.tryEvaluate`.

`dv.evaluate("2 + 2") => Successful { value: 4 } dv.evaluate("2 +") => Failure { error: "Failed to parse ... " }`