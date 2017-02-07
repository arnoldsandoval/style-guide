# Odopod Style Guide

> A hackable, living style guide for Odopod projects.

## Install

```bash
npm install @odopod/style-guide --save-dev
```

## Usage

Require the style guide within your project's main gulpfile.

```javascript
// gulpfile.js

const styleguide = require('@odopod/style-guide');

styleguide.configure(options);

gulp.task('default', ['style-guide'])
```

The following gulp tasks are exported after the style guide is configured:

* `style-guide`
* `style-guide--clean`
* `style-guide--css`
* `style-guide--js`
* `style-guide--nunjucks`
* `style-guide--watch`

## Options

All availabe options can be found in [defaults.js](defaults.js).

#### `jsonSource` [_required_]

default: `null`

A string path to the .json files which Odopod Sassplate uses.

#### `title`

default: `'Odopod Style Guide'`

Project title. Shown in the header on each page.

#### `client`

default: `'Odopod'`

Project client. Shown in the header on each page.

#### `stylesheets`

default: `['css/docs.css']`

Array of `href` attributes used for each stylesheet added in the `<head>` on every page. You can add your own project css here too, just make sure you add the generated `docs.css` too when you change it!

#### `headScripts`

default: `[]`

Array of `src` attributes used for each `<script>` added in the `<head>` on every page.

#### `bodyScripts`

default: `['js/docs.js']`

Array of `src` attributes used for each `<script>` added at the bottom of `<body>` on every page.

#### `dist`

default:
```js
{
  markup: path.join(process.cwd(), 'dist'),
  css: path.join(process.cwd(), 'dist/css'),
  js: path.join(process.cwd(), 'dist/js'),
}
```

Where to place generated files.

#### `themeColor`

default: `'#03a9fa'`

Color to use for headers.

#### `templatePath`

default: `null`

Allows you to define a path for your own templates. This path will take precedence in Nunjucks' `searchPaths`. So when `{% include "partials/foo.nunjucks" %}` is used, it will first look inside this path, then the original Odopod Style Guide template path. If `templatePath` is defined, nunjucks files inside `${templatePath}/pages/*.nunjucks` will be used to generate the final markup. Files with the same name as originals will overwrite the original.

#### `iconPath`

default: `null`

If defined, Odopod Style Guide will search this directory for any `.svg` files, then include them on the `ui-components` page at the bottom via a `<use>` tag.

#### `homeLink`

default: `'index.html'`

Back link's `href` attribute.

#### `directoryLinks`

An object with keys as sections. Each key will be output on the index page with its array of links.

#### `renamePages`

A function or object to pass directly to [`gulp-rename`](https://github.com/hparra/gulp-rename). For example, to rename the `index.html` file, you could do this:

```js
renamePages: (filepath) => {
  if (filepath.basename === 'index') {
    filepath.basename = 'cool-index';
  }

  return filepath;
},
```

## Basic Example

[Podium Sassplate](https://github.com/odopod/podium/tree/master/packages/podium-sassplate) uses Odopod Style Guide. Here's that configuration.

```js
const styleguide = require('@odopod/style-guide');

// Configure style guide
styleguide.configure({
  name: 'Podium Sassplate',
  client: 'Odopod',
  jsonSource: 'extensions',
  stylesheets: [
    'styles.css',
    'css/docs.css',
  ],
  dist: {
    markup: path.join(process.cwd(), 'dist'),
  },
});
```
