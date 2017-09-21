# Web Starter
Start new projects very quickly using SASS, ES6 and Browserify with Gulp. <br/>
This is ideal for building a quick demo / proof of concept.

* You can use ES6 features and your code is automatically run through JSLint and Browserify.
* Use npm to install any module you need and import that into your code.
    * JQuery is inculded by default

# Install
* Clone this repository: 
```bash
git clone git@github.com:scrubmx/web-starter.git mywebapp
```
* Install all the dependecies: 
```bash
cd mywebapp
sudo npm install
```

* Run `gulp` to start watching for changes in your files.
* Done!

# Directory Structure
```bash
├── resources
│   └── assets
│       ├── sass
│       │   ├── _global.scss
│       │   ├── _variables.scss
│       │   └── style.scss
│       └── scripts
│           └── app.js
├── .editorconfig
├── .gitignore
├── favicon.ico
├── gulpfile.babel.js
├── index.html
├── license.txt
├── package.json
├── readme.md
└── robots.txt
```

# Licence
Web Starter is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/web-starter/blob/master/license.txt)
