---
aliases: []
tags: []
publish: true
permalink:
date created: Thursday, February 6th 2025, 9:49 pm
date modified: Saturday, February 8th 2025, 3:12 pm
---

Okay I'm trying to build my Obsidian Publish website to look and function in an awesome fashion. My name is Cybersader and I want to build the most modern cool, gradient having, with animations, and yet fast website with inspiration from Astro JS. I want it to be sleek. Obsidian Publish essentially generates a static website from your Obsidian notes. The issue is that all you have to actually change the theme and function of your website is a publish.css and publish.js file that you can add in your vault that gets ingested when the website is built. I've got docs, examples from other people's vaults, complex explanations, and more to show you. Then, let's build a really good css and js file. Then, we can create a workflow for optimizing or minifying it. One of the only things that I need to implement, for sure, functionality wise is to dynamically generate a Edit, View, and Download button for GitHub for each page.

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

# Implementation Examples



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

```css
@import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);body {
    --font-default: ui-sans-serif,-apple-system,BlinkMacSystemFont,"Roboto","Helvetica","Arial","Segoe UI","Inter","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Microsoft YaHei Light",sans-serif;
    --font-text-theme: var(--font-default);
    --font-text-size-mobile: calc(0.95rem + 0.30vw);
    --font-primary-sans: var(--font-default);
    --font-secondary-sans: Helvetica,-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;
    --font-primary-serif: Georgia,'Times New Roman',Times,serif;
    --font-secondary-serif: "Merriweather",'Times New Roman',Times,serif;
    --font-text-size: calc(0.8rem + 0.30vw);
    --font-smallest: 0.8em;
    --font-smaller: 0.875em;
    --font-small: 0.933em;
    --font-inputs: 0.933em;
    --normal-weight: 400;
    --bold-weight: 600;
    --link-weight: inherit;
    --cards-min-width: 180px;
    --cards-max-width: 1fr;
    --cards-mobile-width: 180px;
    --cards-image-height: 400px;
    --cards-padding: 1.2em;
    --cards-image-fit: contain;
    --cards-background: transparent;
    --cards-border-width: 1px;
    --cards-aspect-ratio: auto;
    --cards-columns: repeat(auto-fit, minmax(var(--cards-min-width), var(--cards-max-width)));
    --image-radius: 8px;
    --img-grid-fit: cover;
    --img-grid-background: transparent;
    --img-grid-gap: 0.5rem;
    --img-zoom-background: rgba(0,0,0,0.6);
    --img-zoom-max-width: 96%;
    --img-zoom-max-height: 90vh;
    --img-zoom-in-cursor: zoom-in;
    --img-zoom-out-cursor: zoom-out;
    --icon-muted: 0.5;
    --border-width: 1px;
    --folding-offset: 16px;
    --nested-padding: 30px;
    --list-padding: 2em;
    --list-spacing: 0.075em
}

@media (max-width: 400pt) {
    body {
        --cards-min-width:var(--cards-mobile-width);
        --img-grid-gap: 0.25rem
    }
}

.theme-light {
    --color-red-rgb: 175,48,41;
    --color-orange-rgb: 188,82,21;
    --color-yellow-rgb: 173,131,1;
    --color-green-rgb: 102,128,11;
    --color-cyan-rgb: 36,131,123;
    --color-blue-rgb: 32,94,166;
    --color-purple-rgb: 94,64,157;
    --color-pink-rgb: 160,47,111;
    --color-red: #AF3029;
    --color-orange: #BC5215;
    --color-yellow: #AD8301;
    --color-green: #66800B;
    --color-cyan: #24837B;
    --color-blue: #205EA6;
    --color-purple: #5E409D;
    --color-pink: #A02F6F
}

.theme-dark {
    --color-red-rgb: 209,77,65;
    --color-orange-rgb: 218,112,44;
    --color-yellow-rgb: 208,162,21;
    --color-green-rgb: 135,154,57;
    --color-cyan-rgb: 58,169,159;
    --color-blue-rgb: 67,133,190;
    --color-purple-rgb: 139,126,200;
    --color-pink-rgb: 206,93,151;
    --color-red: #D14D41;
    --color-orange: #DA702C;
    --color-yellow: #D0A215;
    --color-green: #879A39;
    --color-cyan: #3AA99F;
    --color-blue: #4385BE;
    --color-purple: #8B7EC8;
    --color-pink: #CE5D97
}

.theme-light {
    --base-h: 360;
    --base-s: 3%;
    --base-l: 6%;
    --accent-h: 175;
    --accent-s: 57%;
    --accent-l: 33%;
    --bg1: #FFFCF0;
    --bg2: #F2F0E5;
    --bg3: rgba(16,15,15,0.05);
    --ui1: #E6E4D9;
    --ui2: #DAD8CE;
    --ui3: #CECDC3;
    --tx1: #100F0F;
    --tx2: #6F6E69;
    --tx3: #B7B5AC;
    --hl1: rgba(187,220,206,0.3);
    --hl2: rgba(247,209,61,0.3)
}

.theme-dark {
    --base-h: 360;
    --base-s: 3%;
    --base-l: 6%;
    --accent-h: 175;
    --accent-s: 49%;
    --accent-l: 45%;
    --bg1: #100F0F;
    --bg2: #1C1B1A;
    --bg3: rgba(254,252,240,0.05);
    --ui1: #282726;
    --ui2: #343331;
    --ui3: #403E3C;
    --tx1: #CECDC3;
    --tx2: #878580;
    --tx3: #575653;
    --hl1: rgba(30,95,91,0.3);
    --hl2: rgba(213,159,17,0.3)
}

.theme-light {
    --mono100: black;
    --mono0: white
}

.theme-dark {
    --mono100: white;
    --mono0: black
}

.theme-dark,.theme-light {
    --h1-color: var(--text-normal);
    --h2-color: var(--text-normal);
    --h3-color: var(--text-normal);
    --h4-color: var(--text-normal);
    --h5-color: var(--text-normal);
    --h6-color: var(--text-muted)
}

.published-container {
    --outline-heading-color-active: var(--tx1);
    --sidebar-left-background: var(--bg2)
}

.theme-dark,.theme-light {
    --background-primary: var(--bg1);
    --background-primary-alt: var(--bg2);
    --background-secondary: var(--bg2);
    --background-secondary-alt: var(--bg1);
    --background-tertiary: var(--bg3);
    --background-table-rows: var(--bg2);
    --background-modifier-form-field: var(--bg1);
    --background-modifier-form-field-highlighted: var(--bg1);
    --background-modifier-accent: var(--ax3);
    --background-modifier-border: var(--ui1);
    --background-modifier-border-hover: var(--ui2);
    --background-modifier-border-focus: var(--ui3);
    --background-modifier-success: var(--color-green);
    --background-divider: var(--ui1);
    --interactive-hover: var(--ui1);
    --interactive-accent: var(--ax3);
    --interactive-accent-hover: var(--ax3);
    --quote-opening-modifier: var(--ui2);
    --modal-border: var(--ui2);
    --icon-color: var(--tx2);
    --icon-color-hover: var(--tx2);
    --icon-color-active: var(--tx1);
    --icon-hex: var(--mono0);
    --text-normal: var(--tx1);
    --text-bold: var(--tx1);
    --text-italic: var(--tx1);
    --text-muted: var(--tx2);
    --text-faint: var(--tx3);
    --text-accent: var(--ax1);
    --text-accent-hover: var(--ax2);
    --text-on-accent: white;
    --text-selection: var(--hl1);
    --text-code: var(--tx4);
    --text-error: var(--color-red);
    --text-blockquote: var(--tx2);
    --title-color: var(--tx1);
    --title-color-inactive: var(--tx2)
}

.theme-light {
    --interactive-normal: var(--bg1);
    --interactive-accent-rgb: 220,220,220;
    --text-highlight-bg: rgba(255, 225, 0, 0.5);
    --text-highlight-bg-active: rgba(0, 0, 0, 0.1);
    --background-modifier-error: rgba(255,0,0,0.14);
    --background-modifier-error-hover: rgba(255,0,0,0.08);
    --shadow-color: rgba(0, 0, 0, 0.1);
    --btn-shadow-color: rgba(0, 0, 0, 0.05)
}

.theme-dark {
    --interactive-normal: var(--bg3);
    --interactive-accent-rgb: 66,66,66;
    --text-highlight-bg: rgba(255, 177, 80, 0.3);
    --text-highlight-bg-active: rgba(255, 255, 255, 0.1);
    --background-modifier-error: rgba(255,20,20,0.12);
    --background-modifier-error-hover: rgba(255,20,20,0.18);
    --background-modifier-box-shadow: rgba(0, 0, 0, 0.3);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --btn-shadow-color: rgba(0, 0, 0, 0.2)
}

.alt-title .page-header,.hide-title .page-header {
    display: none
}

.hide-title.markdown-preview-view div:nth-child(4) h1 {
    margin-top: .25em;
    font-variant: var(--page-title-variant);
    letter-spacing: -.015em;
    line-height: var(--page-title-line-height);
    font-size: var(--page-title-size);
    color: var(--page-title-color);
    font-weight: var(--page-title-weight);
    font-style: var(--page-title-style);
    font-family: var(--page-title-font);
    border: none
}

.h1-borders h1 {
    border-bottom: 1px solid var(--ui1);
    padding-bottom: .5em
}

.table-col-1-150.markdown-preview-view td:first-child {
    width: 150px
}

.table-col-1-200.markdown-preview-view td:first-child {
    width: 200px
}

.table-100 table,.table-cards table,.table-full table {
    width: 100%
}

.table-small table {
    --table-text-size: 85%
}

.table-tiny table {
    --table-text-size: 75%
}

.row-hover {
    --table-edge-cell-padding-first: 10px
}

.row-alt {
    --table-row-alt-background: var(--background-table-rows);
    --table-edge-cell-padding-first: 10px
}

.col-alt .markdown-rendered:not(.cards) {
    --table-column-alt-background: var(--background-table-rows)
}

.table-tabular table {
    font-variant-numeric: tabular-nums
}

.table-lines {
    --table-border-width: var(--border-width);
    --table-header-border-width: var(--border-width);
    --table-column-first-border-width: var(--border-width);
    --table-column-last-border-width: var(--border-width);
    --table-row-last-border-width: var(--border-width);
    --table-edge-cell-padding: 10px
}

.table-nowrap {
    --table-white-space: nowrap
}

.table-nowrap .table-wrap,.trim-cols {
    --table-white-space: normal
}

.table-numbers table {
    counter-reset: section
}

.table-numbers table>thead>tr>th:first-child::before {
    content: " ";
    padding-right: .5em;
    display: inline-block;
    min-width: 2em
}

.table-numbers table>tbody>tr>td:first-child::before {
    counter-increment: section;
    content: counter(section) " ";
    text-align: center;
    padding-right: .5em;
    display: inline-block;
    min-width: 2em;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums
}

.row-lines-off .table-view-table>tbody>tr>td,.row-lines-off table tbody>tr:last-child>td,.row-lines-off table tbody>tr>td {
    border-bottom: none
}

.row-lines .table-view-table>tbody>tr>td,.row-lines table tbody>tr>td {
    border-bottom: var(--table-border-width) solid var(--table-border-color)
}

.row-lines table tbody>tr:last-child>td {
    border-bottom: none
}

.col-lines .table-view-table thead>tr>th:not(:last-child),.col-lines .table-view-table>tbody>tr>td:not(:last-child),.col-lines table tbody>tr>td:not(:last-child) {
    border-right: var(--table-border-width) solid var(--background-modifier-border)
}

.row-hover {
    --table-row-background-hover: hsla( var(--accent-h), 50%, 80%, 20% )
}

.theme-dark .row-hover,.theme-dark.row-hover {
    --table-row-background-hover: hsla( var(--accent-h), 30%, 40%, 20% )
}

img[src$="#outline"],span[src$="#outline"] img {
    border: 1px solid var(--ui1)
}

.published-container img[src$="#interface"],.published-container span[src$="#interface"] img {
    border: 1px solid var(--ui1);
    box-shadow: 0 .5px .9px rgba(0,0,0,.021),0 1.3px 2.5px rgba(0,0,0,.03),0 3px 6px rgba(0,0,0,.039),0 10px 20px rgba(0,0,0,.06);
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: var(--radius-m)
}

.theme-dark img[src$="#invert"],.theme-dark span[src$="#invert"] img {
    filter: invert(1) hue-rotate(180deg);
    mix-blend-mode: screen
}

.theme-light img[src$="#invertW"],.theme-light span[src$="#invertW"] img {
    filter: invert(1) hue-rotate(180deg)
}

img[src$="#circle"],span[src$="#circle"] img {
    border-radius: 50%;
    aspect-ratio: 1/1
}

body {
    --img-grid-fit: cover;
    --img-grid-background: transparent;
    --img-grid-gap: 0.5rem
}

@media (max-width: 400pt) {
    body {
        --img-grid-gap:0.25rem
    }
}

.img-grid-ratio {
    --image-grid-fit: contain
}

.img-grid .image-embed.is-loaded {
    line-height: 0;
    display: flex;
    align-items: stretch
}

.img-grid .image-embed.is-loaded img {
    background-color: var(--image-grid-background)
}

.img-grid .image-embed.is-loaded img:active {
    background-color: transparent
}

.img-grid .markdown-preview-section>div:has(img) .image-embed~br,.img-grid .markdown-preview-section>div:has(img) img~br,.img-grid .markdown-preview-section>div:has(img) p:empty {
    display: none
}

.img-grid .markdown-preview-section div:has(>.image-embed~.image-embed),.img-grid .markdown-preview-section div:has(>img~img),.img-grid .markdown-preview-section p:has(>.image-embed~.image-embed),.img-grid .markdown-preview-section p:has(>.image-embed~img),.img-grid .markdown-preview-section p:has(>img~.image-embed),.img-grid .markdown-preview-section p:has(>img~img) {
    display: grid;
    margin-block-start:var(--img-grid-gap);margin-block-end: var(--img-grid-gap);
    grid-column-gap: var(--img-grid-gap);
    grid-row-gap: 0;
    grid-template-columns: repeat(auto-fit,minmax(0,1fr))
}

.img-grid .markdown-preview-section div:has(>.image-embed~.image-embed)>img,.img-grid .markdown-preview-section div:has(>img~img)>img,.img-grid .markdown-preview-section p:has(>.image-embed~.image-embed)>img,.img-grid .markdown-preview-section p:has(>.image-embed~img)>img,.img-grid .markdown-preview-section p:has(>img~.image-embed)>img,.img-grid .markdown-preview-section p:has(>img~img)>img {
    object-fit: var(--image-grid-fit);
    align-self: stretch
}

.img-grid .markdown-preview-section div:has(>.image-embed~.image-embed)>.internal-embed img,.img-grid .markdown-preview-section div:has(>img~img)>.internal-embed img,.img-grid .markdown-preview-section p:has(>.image-embed~.image-embed)>.internal-embed img,.img-grid .markdown-preview-section p:has(>.image-embed~img)>.internal-embed img,.img-grid .markdown-preview-section p:has(>img~.image-embed)>.internal-embed img,.img-grid .markdown-preview-section p:has(>img~img)>.internal-embed img {
    object-fit: var(--image-grid-fit);
    align-self: center
}

.img-grid .markdown-preview-section>div:has(img)>p {
    display: grid;
    margin-block-start:var(--img-grid-gap);margin-block-end: var(--img-grid-gap);
    grid-column-gap: var(--img-grid-gap);
    grid-row-gap: 0;
    grid-template-columns: repeat(auto-fit,minmax(0,1fr))
}

.img-grid .markdown-preview-section>div:has(img)>p>br {
    display: none
}

.img-zoom .image-embed {
    cursor: zoom-in
}

.lightbox {
    z-index: 99999;
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 100%;
    top: 0;
    left: 0;
    background: var(--img-zoom-background);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%
}

.lightbox .internal-embed.image-embed {
    max-width: var(--img-zoom-max-width);
    max-height: var(--img-zoom-max-height);
    cursor: var(--img-zoom-in-cursor);
    display: flex
}

.lightbox img {
    cursor: var(--img-zoom-out-cursor);
    object-fit: contain;
    width: auto
}

.cards table {
    --table-width: 100%;
    --table-edge-cell-padding-first: calc(var(--cards-padding)/2);
    --table-edge-cell-padding-last: calc(var(--cards-padding)/2);
    --table-cell-padding: calc(var(--cards-padding)/3) calc(var(--cards-padding)/2);
    line-height: 1.3
}

.cards table tbody {
    clear: both;
    padding: .5rem 0;
    display: grid;
    grid-template-columns: var(--cards-columns);
    grid-column-gap: .75rem;
    grid-row-gap: .75rem
}

.cards table>tbody>tr {
    background-color: var(--cards-background);
    border: var(--cards-border-width) solid var(--background-modifier-border);
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 0 calc(var(--cards-padding)/3) 0;
    border-radius: 6px;
    overflow: hidden;
    transition: box-shadow .15s linear;
    max-width: var(--cards-max-width)
}

.cards table>tbody>tr:hover {
    border: var(--cards-border-width) solid var(--background-modifier-border-hover);
    box-shadow: 0 4px 6px 0 rgba(0,0,0,.05),0 1px 3px 1px rgba(0,0,0,.025);
    transition: box-shadow .15s linear
}

.cards table tbody>tr>td:first-child {
    font-weight: var(--bold-weight);
    border: none
}

.cards table tbody>tr>td:first-child a {
    display: block
}

.cards table tbody>tr>td:last-child {
    border: none
}

.cards table tbody>tr>td:not(:first-child) {
    font-size: calc(var(--table-text-size) * .9);
    color: var(--text-muted)
}

.cards table tbody>tr>td>* {
    padding: calc(var(--cards-padding)/3) 0
}

.cards table tbody>tr>td:not(:last-child):not(:first-child) {
    padding: 4px 0;
    border-bottom: 1px solid var(--background-modifier-border);
    width: calc(100% - var(--cards-padding));
    margin: 0 calc(var(--cards-padding)/2)
}

.cards table tbody>tr>td a {
    text-decoration: none
}

.cards table tbody>tr>td>button {
    width: 100%;
    margin: calc(var(--cards-padding)/2) 0
}

.cards table tbody>tr>td:last-child>button {
    margin-bottom: calc(var(--cards-padding)/6)
}

.cards table tbody>tr>td>ul {
    width: 100%;
    padding: .25em 0!important;
    margin: 0 auto!important
}

.cards table tbody>tr>td:has(img) {
    padding: 0!important;
    background-color: var(--background-secondary);
    display: block;
    margin: 0;
    width: 100%
}

.cards table tbody>tr>td img {
    aspect-ratio: var(--cards-aspect-ratio);
    width: 100%;
    object-fit: var(--cards-image-fit);
    max-height: var(--cards-image-height);
    background-color: var(--background-secondary);
    vertical-align: bottom
}

.cards table thead {
    display: none
}

.list-cards.markdown-preview-view .list-bullet,.list-cards.markdown-preview-view .list-collapse-indicator,.list-cards.markdown-preview-view.markdown-rendered.show-indentation-guide li>ul::before {
    display: none
}

.list-cards.markdown-preview-view div>ul {
    display: grid;
    gap: .75rem;
    grid-template-columns: var(--cards-columns);
    padding: 0;
    line-height: var(--line-height-tight)
}

.list-cards.markdown-preview-view div>ul>li {
    background-color: var(--cards-background);
    padding: calc(var(--cards-padding)/2);
    border-radius: var(--radius-s);
    border: var(--cards-border-width) solid var(--background-modifier-border);
    overflow: hidden
}

.list-cards.markdown-preview-view div>ul .image-embed {
    padding: 0;
    display: block;
    background-color: var(--background-secondary);
    border-radius: var(--image-radius)
}

.list-cards.markdown-preview-view div>ul .image-embed img {
    aspect-ratio: var(--cards-aspect-ratio);
    object-fit: var(--cards-image-fit);
    max-height: var(--cards-image-height);
    background-color: var(--background-secondary);
    vertical-align: bottom
}

.list-cards.markdown-preview-view div>ul>li>a {
    --link-decoration: none;
    --link-external-decoration: none;
    font-weight: var(--bold-weight)
}

.list-cards.markdown-preview-view div ul>li:hover {
    border-color: var(--background-modifier-border-hover)
}

.list-cards.markdown-preview-view div ul ul {
    display: block;
    width: 100%;
    color: var(--text-muted);
    font-size: var(--font-smallest);
    margin: calc(var(--cards-padding)/-4) 0;
    padding: calc(var(--cards-padding)/2) 0
}

.list-cards.markdown-preview-view div ul ul ul {
    padding-bottom: calc(var(--cards-padding)/4)
}

.list-cards.markdown-preview-view div ul ul>li {
    display: block
}

.cards.cards-16-9,.list-cards.cards-16-9 {
    --cards-aspect-ratio: 16/9
}

.cards.cards-1-1,.list-cards.cards-1-1 {
    --cards-aspect-ratio: 1/1
}

.cards.cards-2-1,.list-cards.cards-2-1 {
    --cards-aspect-ratio: 2/1
}

.cards.cards-2-3,.list-cards.cards-2-3 {
    --cards-aspect-ratio: 2/3
}

.cards.cards-cols-1,.list-cards.cards-cols-1 {
    --cards-columns: repeat(1, minmax(0, 1fr))
}

.cards.cards-cols-2,.list-cards.cards-cols-2 {
    --cards-columns: repeat(2, minmax(0, 1fr))
}

.cards.cards-cover,.list-cards.cards-cover {
    --cards-image-fit: cover
}

.cards.cards-align-bottom table.dataview tbody>tr>td:last-child,.list-cards.cards-align-bottom table.dataview tbody>tr>td:last-child {
    margin-top: auto
}

@media (max-width: 400pt) {
    .cards table.dataview tbody>tr>td:not(:first-child) {
        font-size:80%
    }
}

@media (min-width: 400pt) {
    .cards-cols-3 {
        --cards-columns:repeat(3, minmax(0, 1fr))
    }

    .cards-cols-4 {
        --cards-columns: repeat(4, minmax(0, 1fr))
    }

    .cards-cols-5 {
        --cards-columns: repeat(5, minmax(0, 1fr))
    }

    .cards-cols-6 {
        --cards-columns: repeat(6, minmax(0, 1fr))
    }

    .cards-cols-7 {
        --cards-columns: repeat(7, minmax(0, 1fr))
    }

    .cards-cols-8 {
        --cards-columns: repeat(8, minmax(0, 1fr))
    }
}

.markdown-preview-view code {
    color: var(--tx4);
    font-size: .85em
}

.theme-light :not(pre)>code[class*=language-],.theme-light pre[class*=language-] {
    background-color: var(--bg2)
}

iframe,img {
    border-radius: var(--image-radius)
}

input[type=email],input[type=number],input[type=password],input[type=search],input[type=text] {
    border-color: var(--ui1)
}

input[type=email]:hover,input[type=number]:hover,input[type=password]:hover,input[type=search]:hover,input[type=text]:hover {
    border-color: var(--ui2)
}

input[type=email]:active,input[type=email]:focus,input[type=number]:active,input[type=number]:focus,input[type=password]:active,input[type=password]:focus,input[type=search]:active,input[type=search]:focus,input[type=text]:active,input[type=text]:focus {
    border-color: var(--ui2);
    box-shadow: 0 0 0 2px var(--ui2)
}

ol>li::marker,ul>li::marker {
    color: var(--tx3)
}

body {
    --table-header-border-width: 0;
    --table-column-first-border-width: 0;
    --table-column-last-border-width: 0;
    --table-row-last-border-width: 0;
    --table-edge-cell-padding-first: 0;
    --table-edge-cell-padding-last: 10px;
    --table-cell-padding: 4px 10px;
    --table-header-size: var(--table-text-size)
}

.markdown-preview-view table {
    border: var(--border-width) solid var(--border-color);
    border-collapse: collapse;
    margin-block-start:1em}

.markdown-preview-view td,.markdown-preview-view th {
    padding: var(--table-cell-padding)
}

.markdown-preview-view td:first-child,.markdown-preview-view th:first-child {
    padding-left: var(--table-edge-cell-padding-first)
}

.markdown-preview-view td:last-child,.markdown-preview-view th:last-child {
    padding-right: var(--table-edge-cell-padding-last)
}

.markdown-preview-view .tag:not(.token) {
    background-color: transparent;
    border: 1px solid var(--ui1);
    color: var(--tx2);
    font-size: var(--font-small)
}

.tooltip {
    display: none
}

body {
    --flexoki-blue-200: 146,191,219;
    --flexoki-blue-300: 102,160,200;
    --flexoki-red-500: 203,62,52;
    --flexoki-yellow-150: 241,214,126;
    --flexoki-yellow-300: 223,180,49;
    --flexoki-yellow-400: 208,162,21;
    --flexoki-purple-400: 139,126,200;
    --flexoki-gray: 230,228,217;
    --tag-color: var(--text-normal);
    --tag-size: var(--font-smallest);
    --tag-radius: var(--radius-s);
    --tag-color-hover: var(--color-base-10);
    --tag-padding-x: 4px;
    --tag-padding-y: 1px;
    --h1-size: calc(2.8em + 0.55vw);
    --h2-size: calc(1.40em + 0.35vw);
    --h3-size: calc(1.3em + 0.25vw);
    --h4-size: calc(1.2em + 0.15vw);
    --h5-size: calc(1.1em + 0.20vw);
    --h6-size: calc(0.8em + 0.1vw);
    --h1-weight: 100;
    --h6-weight: 400;
    --h2-weight: 300;
    --h3-weight: 300;
    --h4-weight: 300;
    --h5-weight: 300;
    --h1-line-height: 1;
    --h2-line-height: 1.1;
    --h3-line-height: var(--line-height-tight);
    --h4-line-height: var(--line-height-tight);
    --h5-line-height: 1.15;
    --h6-line-height: var(--line-height-tight);
    --h6-variant: all-small-caps
}

body.theme-light {
    --color-base-55: #a3a199;
    --color-base-80: #555450;
    --tag-background: var(--background-secondary);
    --tag-background-hover: var(--color-base-50);
    --sidebar-left-border-width: 0px;
    --sidebar-right-border-width: 0px
}

body.theme-dark {
    --color-base-55: #63615d;
    --color-base-80: #abaaa4;
    --flexoki-gray: 40,39,38;
    --tag-background: var(--color-base-35);
    --tag-background-hover: var(--color-base-70);
    --sidebar-left-border-width: 1px;
    --sidebar-right-border-width: 1px
}

.theme-light {
    --background-reader: var(--background-primary);
    --blockquote-font-style: italic;
    --blockquote-border-color: var(--color-base-25);
    --blockquote-border-thickness: 1px;
    --color-ligthorange: rgb(224, 150, 31);
    --color-faintorange: rgb(204, 146, 83);
    --color-darkorange: rgb(211, 117, 13);
    --color-wine: #9a4a42;
    --color-oldpink: #ac6a8c;
    --color-wine-rgb: 154,74,66;
    --color-oldpink-rgb: 172,106,140;
    --color-gray-rgb: 111,110,105;
    --color-base: 0,0,0;
    --code-background: #efefe8;
    --component-title-color: var(--text-normal);
    --embed-border-left: 1px solid var(--blockquote-border-color);
    --graph-node: var(--color-ligthorange);
    --graph-node-unresolved: rgba(0, 0, 0, 1.00);
    --graph-text: var(--color-base-60);
    --img-zoom-color-background: rgba(250, 250, 244, 0.85);
    --interactive-accent: var(--color-darkorange);
    --link-color: rgb(16, 15, 15);
    --link-external-color: rgb(16, 15, 15);
    --link-external-decoration: underline;
    --link-decoration: underline;
    --blockquote-border-thickness: from-font;
    --link-unresolved-color: var(--text-faint);
    --link-unresolved-decoration-style: wavy;
    --logo-width: 100%;
    --sidebar-right-background: var(--color-base-10);
    --text-light: var(--color-base-00);
    --text-accent: var(--color-faintorange);
    --text-accent-hover: var(--color-ligthorange);
    --text-selection: var(--interactive-accent)
}

.theme-dark {
    --background-reader: var(--background-primary);
    --background-modifier-border: var(--color-base-35);
    --blockquote-font-style: italic;
    --blockquote-border-color: var(--color-base-50);
    --color-wine: #b34b42;
    --color-oldpink: #A02F6F;
    --color-wine-rgb: 179,75,66;
    --color-oldpink-rgb: 174,88,132;
    --color-gray-rgb: 218,216,206;
    --color-base: 255,255,255;
    --code-background: var(--background-secondary);
    --embed-border-left: 1px solid var(--blockquote-border-color);
    --graph-node: rgb(56, 166, 222);
    --graph-text: rgba(136, 159, 170, 1.00);
    --graph-line: rgba(118, 117, 117, 0.6);
    --graph-node-unresolved: #fd7878;
    --interactive-accent: #4690b5;
    --link-color: rgb(206, 205, 195);
    --link-external-color: rgb(206, 205, 195);
    --link-external-decoration: underline;
    --link-decoration: underline;
    --link-decoration-thickness: auto;
    --link-unresolved-color: var(--text-faint);
    --link-unresolved-decoration-color: var(--text-faint);
    --link-unresolved-decoration-style: wavy;
    --logo-width: 100%;
    --img-zoom-color-background: rgba(0, 0, 0, 0.85);
    --text-accent: rgb(96 184 228);
    --text-accent-hover: #50d9fc;
    --text-selection: var(--interactive-accent);
    --text-light: var(--color-base-100)
}

.published-container {
    --background-color: var(--background-primary);
    --code-radius: var(--radius-m);
    --footer-display: fixed;
    --page-title-size: 14px;
    --page-title-weight: 500;
    --page-title-line-height: 1.1;
    --page-title-variant: all-small-caps;
    --page-title-color: var(--color-base-60);
    --page-title-style: normal;
    --sidebar-right-background: var(--background-primary);
    --site-name-size: 14px;
    --site-name-color: var(--text-accent);
    --site-name-color-hover: var(--color-base-80);
    --site-name-weight: 600
}

html {
    -webkit-text-size-adjust: 100%
}

::-moz-selection {
    color: #fff
}

::selection {
    color: #fff
}

.site-body-center-column {
    position: relative;
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1)
}

.page-header {
    letter-spacing: 0
}

.publish-renderer:has(:active) {
    z-index: 99999
}

.site-header {
    border-bottom: 0
}

.sliding-windows .render-container {
    background-color: var(--background-primary)
}

.sliding-windows .publish-renderer,.sliding-windows .site-body-right-column {
    box-shadow: none
}

button .external-link {
    background-image: none
}

button {
    cursor: pointer
}

button.center {
    display: flex
}

button:not(.clickable-icon) {
    color: var(--background-primary);
    background-color: var(--interactive-accent);
    padding: 15px;
    margin: 40px auto
}

button:not(.clickable-icon):hover {
    background-color: var(--text-accent);
    color: var(--background-primary)
}

button:not(.clickable-icon) a.external-link,button:not(.clickable-icon) a.internal-link {
    color: var(--background-primary);
    padding: 5px 20px;
    border: 0;
    padding: 10px 30px;
    margin: 0 auto;
    text-decoration: none;
    font-weight: 700
}

button:not(.clickable-icon) a.external-link:hover,button:not(.clickable-icon) a.internal-link:hover {
    color: var(--background-primary);
    text-decoration: none
}

@media screen and (min-width: 751px) {
    #toggle-sidebar-btn {
        margin:0;
        width: 30px;
        background: 0 0;
        padding: 5px;
        position: fixed;
        right: 5px;
        top: 5px;
        background: 0 0;
        border-radius: 50%;
        border: 0;
        box-shadow: none;
        background: var(--background-primary);
        opacity: 1;
        color: var(--component-title-color);
        z-index: 10
    }

    .theme-dark.sliding-windows #toggle-sidebar-btn {
        top: 25px
    }

    #chooser {
        position: absolute;
        bottom: 5px;
        right: 0;
        background-color: var(--background-color);
        padding: 7px 10px 2px 10px;
        border-radius: 20px
    }

    #chooser a {
        color: var(--text-muted);
        margin-right: 5px
    }

    #chooser a:hover {
        color: var(--text-accent-hover)
    }

    #chooser a:last-child {
        margin-right: 0
    }

    #chooser svg {
        width: 18px;
        height: auto
    }

    .sliding-windows #toggle-sidebar-btn {
        right: 287px;
        top: 25px
    }

    #toggle-sidebar-btn:hover {
        color: var(--color-base-100);
        background: var(--background-secondary)
    }

    #toggle-sidebar-btn:hover {
        cursor: pointer
    }

    .site-body:has(.landing) .publish-renderer,.site-body:has(.reader-view) .publish-renderer {
        min-width: 800px!important
    }

    .published-container:has(.reader-view).is-readable-line-width:not(.has-navigation).has-graph .publish-renderer>.markdown-preview-view>.markdown-preview-sizer,.published-container:has(.reader-view).is-readable-line-width:not(.has-navigation).has-outline .publish-renderer>.markdown-preview-view>.markdown-preview-sizer {
        margin-right: calc((100vw - var(--page-width))/ 2)!important
    }

    .site-body:has(.reader-view) #toggle-sidebar-btn {
        color: var(--component-title-color)
    }

    .site-body:has(.reader-view) #toggle-sidebar-btn::before {
        content: "Press r to switch view";
        position: absolute;
        top: 82px;
        right: -46px;
        transform: rotate(90deg);
        color: var(--text-faint);
        font-size: var(--font-smaller)
    }

    .site-body:has(.reader-view) .published-container .markdown-rendered h1 {
        margin-top: 0
    }

    .site-body:has(.reader-view) .markdown-preview-view {
        font-size: calc(.8rem + .3vw)
    }

    .site-body:has(.reader-view) #toggle-sidebar-btn {
        top: 5px;
        background: 0 0
    }

    .site-body:has(.reader-view) #toggle-sidebar-btn:hover {
        background: 0 0
    }

    .sliding-windows .site-body:has(.reader-view) #toggle-sidebar-btn {
        right: 5px
    }

    .published-container:has(.reader-view) .site-header {
        display: block;
        position: fixed;
        top: 5px;
        right: 30px;
        z-index: 10;
        height: auto;
        padding: 5px 10px
    }

    .published-container:has(.reader-view) .site-header .site-header-text::after {
        display: none
    }

    .sliding-windows:has(.reader-view) .publish-renderer,.sliding-windows:has(.reader-view) .render-container,body:has(.reader-view) {
        background-color: var(--background-reader)
    }

    .sliding-windows:has(.reader-view.white) .publish-renderer,.sliding-windows:has(.reader-view.white) .render-container,body:has(.reader-view.white) {
        background-color: #fff
    }

    .site-body:has(.reader-view) .render-container-inner {
        margin: 0 auto
    }

    body:not(.sliding-windows):has(.reader-view) .is-readable-line-width.has-outline.has-navigation .publish-renderer>.markdown-preview-view>.markdown-preview-sizer {
        margin-right: inherit
    }

    body:not(.sliding-windows):has(.reader-view) .publish-renderer>.markdown-preview-view>.markdown-preview-sizer {
        margin: 0 auto
    }

    .sliding-windows div.hover-popover.is-loaded .publish-renderer {
        width: inherit!important;
        flex: inherit!important
    }

    .sliding-windows .published-container.has-graph .site-body:has(.reader-view) .site-body-center-column,.sliding-windows .site-body:has(.landing) .site-body-center-column,.sliding-windows .site-body:has(.reader-view) .site-body-center-column {
        padding-right: 40px
    }

    .site-body:has(.landing) .site-body-center-column,.site-body:has(.reader-view) .site-body-center-column {
        padding-left: 0;
        box-shadow: none
    }

    .site-body:has(.reader-view) .graph-view-outer .published-section-header,.site-body:has(.reader-view) .mod-footer,.site-body:has(.reader-view) .nav-view-outer,.site-body:has(.reader-view) .outline-view-outer,.site-body:has(.reader-view) .page-header,.site-body:has(.reader-view) .search-view-container,.site-body:has(.reader-view) .site-body-left-column,.site-body:has(.reader-view) .site-body-left-column-site-logo,.site-body:has(.reader-view) .site-body-left-column-site-name,.site-body:has(.reader-view) .site-body-right-column,.site-body:has(.reader-view) .site-footer {
        display: none
    }
}

.site-body:has(.reader-view) h1 {
    font-size: calc(3.4em + .55vw)
}

@media screen and (max-width: 750px) {
    #toggle-sidebar-btn {
        display:none
    }

    .site-body:has(.reader-view) .site-body-left-column {
        display: flex!important
    }

    .markdown-rendered .callout-content ol>li,.markdown-rendered .callout-content ul>li {
        margin-inline-start:1.25em}
}

@media screen and (max-width: 1024px) {
    #toggle-sidebar-btn {
        right:10px
    }
}

::-webkit-scrollbar-track:has(.reader-view) {
    background: rgba(14,13,13,0)
}

.site-body:has(.landing) .callout,.site-body:has(.landing) h1,.site-body:has(.landing) h2,.site-body:has(.landing) h3,.site-body:has(.landing) h4,.site-body:has(.landing) h5,.site-body:has(.landing) h6,.site-body:has(.landing) li,.site-body:has(.landing) p {
    text-align: center
}

.site-body:has(.landing) li {
    list-style-position: inside;
    list-style: none
}

.site-body:has(.landing)>li:before {
    content: "— "
}

.site-body:has(.landing)>li:after {
    content: " —"
}

.site-body:has(.landing) .site-header {
    right: 5px
}

.site-body:has(.landing) #chooser,.site-body:has(.landing) #toggle-sidebar-btn,.site-body:has(.landing) .graph-view-outer .published-section-header,.site-body:has(.landing) .mod-footer,.site-body:has(.landing) .nav-view-outer,.site-body:has(.landing) .outline-view-outer,.site-body:has(.landing) .page-header,.site-body:has(.landing) .search-view-container,.site-body:has(.landing) .site-body-left-column,.site-body:has(.landing) .site-body-left-column-site-logo,.site-body:has(.landing) .site-body-left-column-site-name,.site-body:has(.landing) .site-body-right-column,.site-body:has(.landing) .site-footer {
    display: none!important
}

.site-body:has(.landing) .render-container-inner {
    margin: 0 auto
}

@media screen and (max-width: 751px) {
    .site-body:has(.landing) .site-header {
        display:none
    }
}

.published-container .backlinks {
    margin-top: 100px;
    margin-bottom: 100px
}

.backlink-items-container {
    font-size: 16px
}

.backlinks .internal-link {
    color: var(--text-muted)
}

.theme-dark .invert {
    filter: invert()!important
}

.publish-article-heading .clickable-icon {
    position: absolute
}

.theme-light .blend {
    mix-blend-mode: multiply
}

.theme-dark .blend {
    mix-blend-mode: normal
}

div.hover-popover.is-loaded h1,div.hover-popover.is-loaded h2 {
    margin-block-end:.3em!important}

#cookie-banner {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--bg2);
    text-align: center;
    padding: 10px;
    z-index: 1000;
    border-top: 1px solid var(--background-modifier-border)
}

#cookie-banner button:not(.clickable-icon) {
    margin: 10px
}

.markdown-rendered div:has(>:is(p,pre,table,ul,ol,blockquote))+div>:is(h1,h2,h3,h4,h5,h6) {
    margin-top: var(--heading-spacing)!important
}

.published-container .markdown-rendered h1,.published-container .markdown-rendered h2 {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: .35em
}

.markdown-rendered h1 .internal-link,.markdown-rendered h2 .internal-link,.markdown-rendered h3 .internal-link,.markdown-rendered h4 .internal-link,.markdown-rendered h5 .internal-link,.markdown-rendered h6 .internal-link {
    text-decoration-thickness: 1px
}

.publish-article-heading .footnote-ref {
    font-size: 1.3rem
}

.list-cards.markdown-preview-view div ul ul>li,.list-cards.markdown-preview-view div>ul>li {
    margin-inline-start:0;background-color: var(--bg2);
    border: 0
}

.list-cards.markdown-preview-view .callout div ul ul>li,.list-cards.markdown-preview-view .callout div>ul>li {
    background-color: transparent;
    border: 1px solid var(--tx2)
}

.list-cards.markdown-preview-view div>ul>li a {
    font-weight: var(--bold-weight)
}

.markdown-preview-view .caption .external-link,.markdown-preview-view .small .external-link {
    background-position-y: 2px
}

.theme-dark .external-link,.theme-dark .internal-link {
    text-decoration-color: var(--color-base-70)
}

.external-link:hover,.markdown-rendered .internal-link:hover,.metadata-container .internal-link:hover {
    text-decoration-color: var(--text-accent)
}

.theme-dark .markdown-rendered mark .internal-link {
    color: var(--background-primary);
    font-weight: 700
}

.outline-view-outer .outline-view {
    padding-bottom: 80px
}

span.inline-note {
    font-size: var(--font-smallest);
    vertical-align: super;
    color: var(--color-base-50);
    padding: 3px;
    font-style: italic
}

.footnote-ref {
    font-size: var(--font-smallest)
}

input.search-bar {
    border-radius: var(--radius-l);
    background: var(--background-primary)
}

.publish-renderer .motionblur {
    animation: blur-in 3s ease-out
}

@keyframes blur-in {
    from {
        filter: blur(4px) grayscale(100%)
    }

    to {
        filter: blur(0) grayscale(0)
    }
}

p svg.lucide {
    vertical-align: middle
}

.theme-dark .markdown-rendered mark {
    color: var(--background-primary);
    background-color: rgb(255 235 146 / 71%)
}

.boxed {
    padding: 15px;
    border: 1px solid var(--color-base-50);
    margin: 0 auto;
    border-radius: var(--radius-m);
    max-width: 700px;
    text-align: center
}

.markdown-preview-view .caption,.markdown-preview-view .smalltext,.markdown-preview-view .smalltext *,.smalltext.smalltext.list-cards.markdown-preview-view div>ul>li {
    font-size: var(--font-smallest)
}

.markdown-preview-view .caption a,.markdown-preview-view .smalltext a {
    text-decoration-thickness: 1px
}

.grayscale img {
    filter: grayscale()
}

.grayscale img:hover {
    filter: none
}

.desaturated {
    filter: grayscale(90%)
}

.desaturated a {
    text-decoration: underline
}

.reduced {
    font-size: 96%
}

.blur {
    filter: blur(4px)
}

.blur:hover {
    filter: blur(0)
}

.desaturated.blur {
    filter: blur(4px) grayscale(90%)
}

.desaturated.blur:hover {
    filter: blur(0) grayscale(90%)
}

.markdown-preview-view .date {
    font-weight: 700;
    opacity: .7;
    text-align: right;
    margin-right: 5px
}

.caption {
    text-align: center;
    display: block;
    margin: -12px auto 35px
}

.list-cards .caption {
    margin-top: 0
}

.img-grid .markdown-preview-section>div:has(.image-embed)>p span.caption {
    text-align: left;
    margin: 0 auto 35px
}

.markdown-preview-view .light * {
    opacity: .7
}

.markdown-preview-view .footnotes ol {
    font-size: var(--font-smallest)!important
}

ul>li.task-list-item .task-list-item-checkbox {
    margin-left: -1.83em!important
}

.nav-view-outer,.outline-view-outer {
    padding-bottom: 90px
}

.modal-close-button {
    top: 16px
}

.markdown-preview-view.reduced p {
    margin-block-start:0}

@media screen and (min-width: 751px) {
    .markdown-rendered.clean {
        padding:70px!important
    }

    .markdown-rendered.clean h1 .markdown-rendered.clean h1 {
        display: none
    }
}

.mermaid {
    text-align: center;
    margin: 30px auto 30px auto
}

.mermaid .text-inner-tspan {
    fill: var(--text-light)
}

.markdown-rendered table {
    border-radius: var(--radius-m);
    margin: 30px 0
}

.markdown-rendered.small-table table td {
    font-size: var(--font-smallest)
}

.markdown-rendered.nolists ol,.markdown-rendered.nolists.clean-table ul,table ul:has(li.tag) {
    margin: 0;
    padding: 0
}

.markdown-rendered.nolists ol>li,.markdown-rendered.nolists ul>li,table ul:has(li.tag)>li {
    list-style-type: none;
    display: inline-block;
    margin-inline-start:0}

table ul:has(li.tag)>li::after {
    content: " "
}

.markdown-rendered.nolists ol>li::after,.markdown-rendered.nolists ul>li::after {
    content: " / "
}

.markdown-rendered.nolists ol>li:last-child::after,.markdown-rendered.nolists ul>li:last-child::after,table ul:has(li.tag)>li:last-child::after {
    content: ""
}

.markdown-rendered.clean-table tbody>tr>td,.markdown-rendered.clean-table thead>tr>th {
    border: none
}

.markdown-rendered.clean-table tbody tr>td:first-child,.markdown-rendered.clean-table thead tr>th:first-child {
    text-align: right;
    color: var(--color-base-55)
}

.theme-dark .markdown-rendered.clean-table tbody tr>td:first-child,.theme-dark .markdown-rendered.clean-table thead tr>th:first-child {
    color: var(--text-muted)
}

.markdown-preview-view table {
    border: var(--border-width) solid var(--border-color);
    border-collapse: collapse;
    margin-block-start:1em}

.markdown-preview-view td,.markdown-preview-view th {
    padding: var(--table-cell-padding)
}

.markdown-preview-view td:first-child,.markdown-preview-view th:first-child {
    padding-left: var(--table-edge-cell-padding-first)
}

.markdown-preview-view td:last-child,.markdown-preview-view th:last-child {
    padding-right: var(--table-edge-cell-padding-last)
}

.search-view-container {
    margin: 0 0 10px 0
}

.site-body-left-column-site-logo img {
    border-radius: 0
}

.site-body-left-column-site-logo img:hover {
    cursor: pointer
}

.site-body-left-column-site-name {
    z-index: 0!important;
    padding: 0;
    text-align: center;
    font-weight: 600
}

.theme-dark .site-body-left-column-site-logo img {
    filter: invert(1) hue-rotate(212deg);
    opacity: 1
}

.site-body-left-column-site-theme-toggle {
    margin: 0 auto;
    padding-right: 32px;
    position: absolute;
    top: 10px;
    left: 10px
}

.site-body-left-column .search-view-outer {
    margin: 0;
    display: contents
}

.site-body-left-column-site-name::after {
    display: block;
    content: "¿El cuerpo del texto o el texto del cuerpo?";
    margin: 0 0 30px;
    font-weight: 400;
    font-size: var(--font-smaller);
    color: var(--color-base-70)
}

.site-body-left-column-site-name::after:hover {
    color: var(--color-base-100)
}

.site-header-text::after {
    content: "¿El cuerpo del texto o el texto del cuerpo?";
    font-size: var(--font-smaller);
    text-align: right;
    margin-left: 10px;
    color: var(--color-base-70);
    font-weight: 400
}

.site-header-text:hover {
    text-decoration: none
}

.site-header-logo {
    display: none
}

.site-body-left-column {
    padding-right: 18px
}

.nav-view-outer .nav-view>.tree-item>.tree-item-children>.tree-item>.tree-item-self:hover {
    opacity: .65
}

.callout {
    margin: 30px 0;
    padding: 10px;
    border-radius: var(--radius-m);
    border-left: 0
}

.callout[data-callout-metadata=red] {
    --callout-color: var(--flexoki-red-500)!important
}

.callout[data-callout-metadata=blue] {
    --callout-color: var(--flexoki-blue-300)!important
}

.callout[data-callout-metadata=yellow] {
    --callout-color: var(--flexoki-yellow-400)!important
}

.callout[data-callout-metadata=purple] {
    --callout-color: var(--flexoki-purple-400)!important
}

.callout[data-callout-metadata=gray] {
    --callout-color: var(--flexoki-gray)!important
}

.callout[data-callout=highlight],.callout[data-callout=pdf] {
    --callout-icon: "lucide-highlighter"
}

.callout[data-callout=pdf][data-callout-metadata=yellow] {
    --callout-color: var(--color-yellow-rgb)
}

.callout[data-callout=pdf][data-callout-metadata=red] {
    --callout-color: var(--color-orange-rgb)
}

.callout[data-callout=pdf][data-callout-metadata=note] {
    --callout-color: var(--color-cyan-rgb)
}

.callout[data-callout=hint] {
    --callout-color: var(--color-purple-rgb)
}

.callout[data-callout=important] {
    --callout-color: var(--color-red-rgb)
}

.callout[data-callout=watch] {
    --callout-icon: "lucide-youtube";
    background-color: var(--background-secondary)
}

.callout[data-callout=timeline] {
    --callout-icon: "lucide-calendar";
    --callout-color: var(--color-purple-rgb)
}

.callout[data-callout=links] {
    --callout-icon: "lucide-link";
    --callout-color: var(--color-orange-rgb)
}

.callout[data-callout=bot],.callout[data-callout=note] {
    --callout-color: var(--color-purple-rgb)
}

.callout[data-callout=user] {
    --callout-icon: "lucide-user";
    background-color: var(--background-secondary);
    --callout-color: var(--color-gray-rgb)
}

.callout[data-callout=grid].callout,.callout[data-callout=routes] {
    filter: none;
    -webkit-filter: none
}

.callout[data-callout=cite] {
    background-color: transparent;
    border-radius: 0;
    margin: 20px 30px;
    padding: 0
}

.callout[data-callout=texts] {
    --callout-icon: "lucide-file-text";
    --callout-color: var(--color-oldpink-rgb)
}

.callout[data-callout=bot] {
    --callout-icon: "lucide-bot-message-square"
}

.callout[data-callout=docs] {
    --callout-icon: "lucide-paperclip";
    --callout-color: var(--color-green-rgb)
}

.callout[data-callout=trail] {
    --callout-icon: "lucide-footprints";
    --callout-color: var(--color-yellow-rgb)
}

.callout[data-callout=routes] {
    --callout-icon: "lucide-map";
    --callout-color: var(--color-yellow-rgb)
}

.callout[data-callout=hipertext] {
    --callout-icon: "lucide-refresh-cw";
    --callout-color: var(--color-wine-rgb)
}

.callout[data-callout=small] {
    --callout-icon: "circle-dashed";
    background-color: transparent
}

.callout[data-callout=video] {
    --callout-icon: "lucide-video"
}

.callout[data-callout=galleries],.callout[data-callout=images],.callout[data-callout=portfolio] {
    --callout-icon: "lucide-image";
    border: 1px solid var(--color-base-35);
    margin: 20px auto 20px auto;
    border-radius: var(--radius-m);
    background-color: rgba(255,255,255,1)
}

.theme-dark .callout[data-callout=galleries],.theme-dark .callout[data-callout=images],.theme-dark .callout[data-callout=portfolio] {
    background-color: rgba(0,0,0,1)
}

.callout[data-callout=newsbox] {
    padding: 15px;
    border: 1px solid var(--text-normal);
    margin: 20px auto 20px auto;
    border-radius: var(--radius-m);
    background-color: transparent;
    --callout-icon: "calendar-days"
}

.callout[data-callout=info] {
    background-color: var(--background-secondary)
}

.callout[data-callout=infobox] {
    padding: 0;
    border: 1px solid var(--color-base-35);
    margin: 20px auto 20px auto;
    background-color: transparent;
    font-size: var(--font-small)
}

.callout[data-callout=big-sans],.callout[data-callout=big-serif] {
    font-size: 22px;
    background: 0;
    margin: 50px 0;
    line-height: 30px;
    padding: 0
}

.callout[data-callout=big-serif] {
    font-family: var(--font-primary-serif)
}

.callout[data-callout=clean] {
    background: 0;
    border: 0;
    padding: 30px 0 30px 50px
}

div.hover-popover.is-loaded .callout[data-callout=clean] {
    margin-left: 0!important
}

.callout[data-callout=book] {
    --callout-color: var(--color-yellow-rgb);
    --callout-icon: "lucide-book"
}

div.popover.hover-popover.is-loaded .callout[data-callout=noteinfo] {
    margin-top: 0!important
}

.callout[data-callout=noteinfo] {
    --callout-icon: "lucide-info"
}

.callout[data-callout=noteinfo] {
    font-size: var(--font-smaller);
    background: 0;
    padding: 0;
    margin: 0 0 50px 0;
    border-radius: 0;
    line-height: var(--line-height-normal)
}

.callout[data-callout=small] {
    font-size: var(--font-smallest);
    padding: 0;
    margin: 0 0 50px 0;
    border-radius: 0;
    opacity: 1;
    line-height: var(--line-height-normal)
}

.callout[data-callout=languages] {
    padding: 5px 5px;
    background-color: transparent;
    font-size: var(--font-smallest);
    border: .01em solid var(--color-base-50);
    margin: 0 0 5px 0;
    --callout-icon: "lucide-languages";
    font-variant: all-small-caps
}

.callout[data-callout=big-sans] .callout-title,.callout[data-callout=big-serif] .callout-title,.callout[data-callout=cite] .callout-icon,.callout[data-callout=cite] .callout-title,.callout[data-callout=clean]>.callout-title,.callout[data-callout=infobox] .callout-title,.callout[data-callout=infobox] .callout-title .svg-icon,.callout[data-callout=noteinfo] .callout-title,.callout[data-callout=small] .callout-title {
    display: none
}

.callout[data-callout=languages] .callout-title {
    padding: 0
}

.callout[data-callout=galleries] .callout-title,.callout[data-callout=images] .callout-title,.callout[data-callout=info] .callout-title,.callout[data-callout=languages] .callout-title .svg-icon,.callout[data-callout=portfolio] .callout-title {
    filter: grayscale()
}

.callout[data-callout=languages] .callout-title-inner {
    font-weight: 300;
    color: var(--text-muted)
}

.callout[data-callout=cite] .callout-content {
    font-weight: inherit;
    font-style: italic;
    font-family: var(--font-primary-serif)
}

.callout[data-callout=cite] .callout-content {
    padding: 0
}

.callout[data-callout=cite] .callout-content blockquote {
    border: 0;
    padding: 0
}

.callout[data-callout=infobox] .callout-content {
    padding-top: 10px;
    text-align: center
}

.callout[data-callout=infobox] .callout-content p {
    margin: 10px 0
}

.callout[data-callout=big-sans] .callout-content,.callout[data-callout=big-serif] .callout-content {
    padding: 0 0 0 30px
}

.callout[data-callout=big-sans] p,.callout[data-callout=big-serif] p {
    padding: 0;
    margin: 0
}

.callout[data-callout=noteinfo] .callout-content {
    padding: 0 0 2px 0;
    text-indent: 0
}

.callout[data-callout=noteinfo] .callout-content p,.callout[data-callout=small] .callout-content,.callout[data-callout=small] .callout-content p {
    padding: 0;
    margin: 0
}

.callout[data-callout=noteinfo] .external-link,.callout[data-callout=small] .external-link {
    background-size: 10px;
    background-position-y: 0
}

.callout[data-callout=small] .callout-content p svg.lucide {
    vertical-align: text-bottom
}

.callout[data-callout=noteinfo] .callout-content,.callout[data-callout=small] .callout-content {
    padding: 0
}

.callout[data-callout=noteinfo] .callout-content {
    color: var(--text-muted)
}

.callout[data-callout=noteinfo] .callout-content .markdown-rendered .tag:not(.token) {
    font-size: var(--font-smaller)
}

.callout[data-callout=noteinfo] .callout-content a {
    color: var(--color-base-60);
    text-decoration-color: var(--color-base-40)
}

.callout[data-callout=noteinfo] .callout-content a:hover {
    color: var(--text-accent-hover);
    text-decoration-color: var(--text-accent-hover)
}

.callout[data-callout=noteinfo] .callout-content .tag:not(.token):hover {
    color: var(--color-base-00)
}

.theme-dark .callout[data-callout=noteinfo] .callout-content .tag:not(.token):hover {
    color: var(--color-base-60)
}

.callout[data-callout=languages] .callout-content {
    display: none
}

.callout[data-callout=small] .callout-content .markdown-rendered .tag:not(.token) {
    font-size: var(--font-smallest)
}

.callout .callout-title a {
    font-weight: var(--bold-weight);
    color: var(--callout-title-color)
}

.callout[data-callout=pdf][data-callout-metadata=yellow] .callout-title a {
    filter: brightness(.8)
}

.markdown-preview-view .tag:not(.token) {
    white-space: nowrap;
    text-decoration: none;
    font-size: var(--font-smallest);
    border: 1px solid var(--ui3)
}

.markdown-preview-view .tag:not(.token):hover {
    text-decoration: none;
    background-color: var(--ui3)
}

.body:not(.minimal-unstyled-tags) {
    margin: 1px 10px 0 0
}

.markdown-preview-view .callout:not([data-callout=noteinfo]):not([data-callout=clean]):not([data-callout=small]) .tag:not(.token) {
    background-color: transparent;
    color: var(--text-normal);
    border: 1px solid var(--text-normal);
    padding: 0 5px;
    font-size: var(--font-smallest)
}

.markdown-preview-view .callout:not([data-callout=noteinfo]):not([data-callout=clean]):not([data-callout=small]) .tag:not(.token):hover {
    background-color: var(--text-normal);
    color: var(--background-color)
}

.theme-light img[src$="#blend"],.theme-light span[src$="#blend"] img {
    mix-blend-mode: multiply
}

.theme-light .lightbox [src$="#blend"],.theme-light .lightbox span[src$="#blend"] img {
    mix-blend-mode: screen
}

.theme-light img[src$="#invert"],.theme-light span[src$="#invert"] img {
    mix-blend-mode: multiply
}

.theme-light .lightbox [src$="#invert"],.theme-light .lightbox span[src$="#invert"] img {
    mix-blend-mode: screen
}

.list-cards.cards-white.markdown-preview-view div>ul>li {
    background-color: #fff
}

.list-cards.cards-noborder.markdown-preview-view div>ul>li {
    border: 0
}

img {
    cursor: var(--img-zoom-in-cursor)
}

.publish-renderer .grayscale img {
    filter: grayscale(100%);
    opacity: 1
}

.publish-renderer .grayscale img:hover {
    filter: none;
    opacity: 1
}

.markdown-preview-view img {
    max-width: 100%;
    border-radius: var(--radius-m);
    display: block;
    margin: 0 auto
}

.theme-dark img {
    opacity: .8
}

.theme-dark .lightbox img {
    opacity: 1
}

div[src$="#float"],span[src$="#float"] {
    padding-right: 10px;
    float: left
}

div[src$="#float"] img,img[src$="#float"],span[src$="#float"] img {
    height: auto;
    width: 100px
}

.lightbox div[src$="#float"] img,.lightbox img[src$="#float"],.lightbox span[src$="#float"] img {
    height: auto;
    width: auto
}

div[src$="#boxed"] img,img[src$="#boxed"],span[src$="#boxed"] img {
    border: 1px solid var(--color-base-50)
}

.lightbox div[src$="#boxed"] img,.lightbox img[src$="#boxed"],.lightbox span[src$="#boxed"] img {
    border: 0
}

.theme-dark div[src$="#icon"] img,.theme-dark img[src$="#icon"],.theme-dark span[src$="#icon"] img,.theme-dark svg.icon {
    width: 18px;
    margin-right: 2px;
    filter: invert()
}

div[src$="#icon"] img,img[src$="#icon"],span[src$="#icon"] img,svg.icon {
    width: 18px;
    margin-right: 2px
}

.img-grid .image-embed.is-loaded[src$="#icon"],.img-grid div[src$="#icon"],.img-grid span[src$="#icon"],div[src$="#icon"],span[src$="#icon"] {
    display: inline-block;
    vertical-align: middle;
    opacity: .6
}

.img-grid span[src$="#icon"].image-embed img:hover,.img-zoom span[src$="#icon"].image-embed img:hover,.markdown-preview-view img[src^=http],div[src$="#icon"].image-embed img:hover,span[src$="#icon"].image-embed img:hover {
    cursor: default
}

span[src$="#icon"]+span[src$="#icon"] {
    margin-left: 2px
}

.markdown-rendered video {
    width: 100%;
    margin: 0 auto;
    display: block;
    border-radius: var(--radius-m)
}

.markdown-source-view .pdf-embed,.pdf-embed {
    max-width: 100%;
    height: auto!important
}

.internal-embed:not(.image-embed) {
    --embed-padding: 20px 0 0 20px
}

.internal-embed:not(.image-embed) h1 {
    margin-top: 0;
    font-size: var(--h2-size)!important
}

.internal-embed:not(.image-embed).pdf-embed .iframe,.internal-embed:not(.image-embed).pdf-embed .iframe embed {
    max-width: 100%!important
}

.markdown-embed-title {
    white-space: pre-wrap;
    font-variant: var(--page-title-variant);
    line-height: var(--page-title-line-height);
    font-size: var(--page-title-size);
    color: var(--page-title-color);
    font-weight: var(--page-title-weight);
    font-style: var(--page-title-style);
    font-family: var(--page-title-font);
    margin-bottom: 50px
}

iframe video .media-controls {
    width: 100%!important
}

iframe {
    border: 0;
    width: 100%;
    max-width: 100%;
    border-radius: var(--radius-m);
    background-color: transparent;
    margin: 50px auto 50px auto;
    display: block
}

iframe.boxed {
    padding: 0
}

iframe.border {
    border-color: var(--color-base-100)
}

.internal-embed:not(.image-embed).pdf-embed {
    height: 800px!important;
    max-width: 100%;
    width: 100%;
    border: 0
}

.internal-embed:not(.image-embed).pdf-embed iframe {
    height: 100%!important;
    min-height: 340px;
    max-width: 100%;
    width: 100%;
    border-radius: var(--radius-m);
    margin: 0
}

.lr_embed {
    margin: 20px 0
}

#slideshow .image-view .image,video {
    border-radius: var(--radius-m)
}

.site-footer {
    position: absolute;
    right: 5px;
    bottom: 0;
    width: 258px;
    font-size: 11px;
    line-height: initial;
    padding-bottom: 10px;
    background-color: var(--background-primary)
}

.sliding-windows .site-footer {
    right: 23px;
    position: absolute;
    bottom: 0;
    width: 258px;
    font-size: 11px;
    line-height: initial;
    padding-bottom: 10px;
    background-color: var(--background-primary);
    text-align: left
}

.site-footer a {
    text-decoration: underline
}

.theme-light .site-footer {
    color: rgba(127,127,127,1)
}

.theme-dark .site-footer {
    color: rgba(126,126,126,1)
}

.site-footer .foot-links {
    margin-bottom: 2px;
    border-bottom: 0 dotted #e2e2e2;
    padding-bottom: 2px;
    display: none
}

.social {
    margin: 5px auto 5px auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 5px
}

.markdown-preview-view .social img[src^=http] {
    cursor: pointer
}

.social .social-icon svg {
    fill: var(--text-muted)
}

.social svg:hover path {
    fill: var(--text-accent)
}

.social img.social-icon {
    filter: opacity(.6)!important;
    border-radius: 0
}

.social img.social-icon:hover {
    filter: opacity(1)!important
}

.theme-dark .social img.social-icon {
    filter: invert(1)!important;
    opacity: .6
}

.theme-dark .social img.social-icon:hover {
    opacity: 1
}

.social a {
    background: 0 0;
    text-decoration: none;
    margin-right: 10px
}

.social a:last-child {
    margin-right: 0!important
}

.site-footer .social .behance,.site-footer .social .facebook,.site-footer .social .linkedin,.site-footer .threads {
    display: none!important
}

.site-footer .social {
    text-align: right;
    display: block
}

.sliding-windows .site-footer .social {
    text-align: left;
    display: block
}

.social svg {
    width: auto;
    height: 15px;
    vertical-align: middle
}

.social svg .cls-0,.social svg:hover path.cls-0 {
    fill: none
}

.social svg#mailme {
    border-radius: 2px;
    background: 0 0;
    width: auto;
    height: 12px;
    gap: 33px
}

.social svg#portfolio {
    height: 18px
}

.social svg#blog {
    height: 20px
}

.social svg#behance {
    background: 0 0;
    width: auto;
    height: 13px
}

.social svg#linkedin-icon {
    background: 0 0;
    width: auto;
    height: 22px
}

.social svg#face {
    border-radius: 2px
}

@media screen and (min-width: 1800px) {
    .sliding-windows .publish-renderer {
        width:800px;
        flex: 0 0 800px
    }

    .site-body-left-column-site-name,body {
        font-size: 110%
    }
}

@media screen and (min-width: 2100px) {
    .published-container {
        --sidebar-left-width:400px
    }

    .nav-view,.site-body-left-column-site-name,body {
        font-size: 120%
    }

    .nav-view [data-path]::after,.site-body-left-column-site-name::after {
        font-size: 100%;
        padding: 0
    }

    .callout[data-callout=circle],.callout[data-callout=noteinfo],.callout[data-callout=small] {
        font-size: 85%!important
    }
}

@media screen and (max-width: 730px) {
    .site-header-text::after {
        display:block;
        text-align: left;
        margin: 0
    }

    .page-header {
        display: none
    }

    .site-footer {
        width: 100%
    }

    .site-footer .social {
        display: flex;
        text-align: center
    }

    .site-footer {
        position: relative;
        width: 100%;
        text-align: center;
        right: 0
    }

    .search-view-container {
        margin: 10px 15px 15px
    }

    .search-view-container input {
        height: 50px
    }

    .site-body-left-column-site-name,.site-body-left-column-site-theme-toggle {
        margin: 0 0 20px 5px!important;
        position: relative;
        top: 0
    }
}

@media screen and (max-width: 1024px) {
    .markdown-rendered h1 {
        margin-block-start:40px!important
    }

    .frontmatter-container {
        margin-bottom: 3rem
    }

    .callout[data-callout=clean] {
        background: 0;
        border: 0;
        padding: 10px 0 10px 0
    }

    .site-footer {
        width: 100%
    }

    .site-body-left-column .search-view-outer {
        margin: 20px 0 0 0
    }

    .site-footer .social {
        display: none
    }
}

@media screen and (max-width: 1024px) and (orientation:landscape) {
    .site-body-left-column-site-logo,.site-footer {
        width:150px!important;
        display: none
    }

    .site-body-left-column-site-name,.site-body-left-column-site-theme-toggle {
        margin: 0 0!important
    }

    .nav-view-outer {
        opacity: 1
    }

    .markdown-preview-view:not(.show-frontmatter) .frontmatter {
        display: none!important
    }

    .site-footer {
        text-align: center;
        width: 100%;
        right: 50%;
        bottom: -20px;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 5px 0 22px 0!important;
        margin: 0
    }

    .site-footer .social {
        display: none
    }
}

@media screen and (max-width: 1024px) and (orientation:portrait) {
    body {
        --font-text-size:var(--font-text-size-mobile)!important
    }

    .tree-item-self .tree-item-icon {
        padding-inline-start:25px!important}

    .site-footer {
        text-align: center;
        right: 0;
        width: 100%
    }

    .site-footer .social {
        text-align: center
    }
}

@media print {
    #toggle-sidebar-btn,.backlinks,.boxed:has(.social),.callout.is-collapsed,.frontmatter-container,.markdown-preview-view:not(.show-frontmatter) .frontmatter,.page-header {
        display: none!important
    }
}

.footnote-tooltip {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
    max-width: 300px;
    font-size: .9em
}

.footnote-link:hover .footnote-tooltip {
    display: block
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