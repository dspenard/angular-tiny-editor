# angular-tiny-editor
Angular component using tinymce.js, with customization for adding menus and autocompletion

## Background
I created this component because I was using the tinymce-editor component (now called angular-tinymce, https://www.npmjs.com/package/angular-tinymce) but it was consistently failing miserably in Safari, and in Chrome and Firefox I was seeing sporadic errors.

There is now an official TinyMCE angular component (https://www.npmjs.com/package/@tinymce/tinymce-angular) but after using it I decided to create my own to offer additional capabilities needed at the time.

The functionality I added to this custom angular-tiny-editor component includes the ability to add additional dropdown menus to the menu bar and the ability to use an external plugin for autocompletion, which pulls its data from the additional dropdown menu.  Thanks to https://stevendevooght.github.io/tinyMCE-mention/javascripts/tinymce/plugins/mention/plugin.js for the handy tinymce mention plugin.

## Dependencies

Clone the repository and run

npm install
to install all modules, and then run

npm start
to run the application at http://localhost:4200

This project was built with the Angular CLI, and besides the usual list of modules installed, I also installed

bootstrap ver 3.3.7,
jquery ver 3.3.1,
tinymce ver 4.7.11

and all of these dependencies were be installed for you when you run npm install.
