---
aliases: []
tags: []
publish: true
permalink:
date created: Thursday, February 6th 2025, 9:49 pm
date modified: Saturday, February 8th 2025, 12:51 pm
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

- 