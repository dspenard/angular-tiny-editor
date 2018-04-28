# angular-tiny-editor
Angular component using tinymce.js, with customization for adding menus and autocompletion

## Background
I created this component because I was using the tinymce-editor component (now called angular-tinymce, https://www.npmjs.com/package/angular-tinymce) but it was very consistently failing miserably in Safari, and in Chrome and Firefox I was seeing sporadic errors.

There is now an official TinyMCE angular component (https://www.npmjs.com/package/@tinymce/tinymce-angular) but after using it I decided to create my own to give it additional capabilities needed.

The functionality I added to this custom angular-tiny-editor component includes the ability to add additional dropdown menus to the menu bar and the ability to use an external plugin for autocompletion, which pulls its data from the additional dropdown menu.  Thanks to https://stevendevooght.github.io/tinyMCE-mention/javascripts/tinymce/plugins/mention/plugin.js for the handy tinymce mention plugin.


