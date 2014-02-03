# MEANER seed

This is a MEAN (Mongo, Express, AngularJS, Node) seed recharged. This is partly based on [mean.io](https://github.com/linnovate/mean) and [ngBoilerplate](https://github.com/ngbp/ngbp) which are 2 great seeds projects for mean and angularjs. 

**This is still a work in progress. I'm using it now for a personal project and I'll keep improving it while I use it**.

# Why did I create this?

I created this because I saw some things that I didn't like on all MEAN seeds, so I decided to roll out my own :).

This are the things that I didn't like of other MEAN seeds:

* They didn't handle JS minification, concatenation, ngMin, etc. I want my dev code to be unminified and separated but I want my production code to work with minified files.
* They didn't handle Less/css minification, concatenation, transformations for prod and dev.
* Frontned code wasn't feature separated like ngBoilerplate
* Gruntfile was mostly for only server or only frontned. I wanted with one Gruntfile to be able to run the app.
* They didn't have a good and clear folder structure for both FrontEnd and Backend.
* They didn't have the ability to have both Frontend powered (SPA) pages and backend power pages.

So what I did here is to take the both of mean.io and ngBoilerplate, mix it with some of my code and configurations and et voila. Here is the new mean seed.

# How to use

You can just clone this repository, run `npm install`, `bower install`, `mongod`, `grunt` and you're set to go. After that, the app will be running on `http://localhost:3000`

# Folder structure

````
meaner/
  |- app/
  |  |- controllers/
  |  |  |- <backend controllers>
  |  |- models/
  |  |  |- <backend models>
  |  |- routes/
  |  |  |- <backend routes>
  |  |- views/
  |  |  |- <backend views and layouts>
  |- assets/
  |  |- <Built / Compiled frontend code: Minified, concatenated, transformed,etc>
  |- config/
  |- frontend/
  |  |- app/
  |  |  |- <all Angular apps code including JS, tests, Less>
  |  |- common/
  |  |  |- <all Angular code that is reusable (Services, Directives)>
  |  |- vendor/
  |  |  |- <Front end dependencies installed via bower>
  |  |- styles/
  |  |  |- <Less files to be used for non angular apps>
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- package.json
````

Please feel free to go to each folder and check out the code and run the app. This is the basic structure for the app.

# Running and using it

## Development

You're going to be using grunt to start/run the application.

Running `grunt` or `grunt watch` will start the application and watch for changes in either Frontend or Backend code. If there's a change, Livereload will reload the entire website. It runs `node` using `nodemon` 

`grunt watch` also takes care of processing frontend code so that it's available to use. It'll create CSS files from Less files, add the `script` and `link` tags to your HTML so that all of your frontned code is linked from the HTML, it'll convert all of your HTML templates to JS using `html2js` so that it doesn't have to do a request to get the templates and much more. You can view all tasks in the `Gruntfile.js`

## Production

For production, you'll need to run `grunt compile`. Besides doing all the things as `grunt watch`, it'll also minify and concatenate all JS, CSS and less files and change the `script` and `link` tags in your HTML to just this one dependency. This will make your code ready to be deployed.

If you're deploying this to Heroku, I've already configured the [correct buildpack](https://github.com/aquicore/heroku-buildpack-nodejs-grunt) which will take care of all of this once you push.

# Adding your code

Now, it's time to code. So, where do we start? A few tips on places to look and stuff to check:

* You need to add a new file in routes stating your routes and to which controller they point to. If you're going to use Angular for this page, I recommend you to use html5mode and add a route to `yourRoute/*`
* You can add then your controller for that route
* You need to create a view. Here, you can inherit from either defaultServer or defaultSPA. If you want this page to have Angular and use Angular stuff, inherit from defaultSPA. You'll see examples of both things in this seed project
* If you chose an AngularApp, you need to set the `ng-app` in your template and then you can create that app in Frontend. If you'll just have one main Angular app, just add it inside `/frontend/app` otherwise, I'd recommend creating a folder for each.

With those steps, you're ready to go to add your code

## Adding frontend dependencies

Now, what if you want to add Frontend dependencies?

You first must add it to `bower.json`. After running `bower install`, the dependency will be installed to `/frontend/vendor`.

Now, you have to go to the `build.config.js` and locate some properties:

* `js_vendor_all`: In this property you need to add the path to each new JS file you want to add from the libraries you chose. After doing this, the script tag will automatically be added by itself in dev and concatenated will other libs on prod **for both angular pages and non angular pages**
* `js_vendor_angular`: In this property you need to add the path to each new JS file you want to add from the libraries you chose. After doing this, the script tag will automatically be added by itself in dev and concatenated will other libs on prod **only for angular pages**
* `js_vendor_non_angular`: In this property you need to add the path to each new JS file you want to add from the libraries you chose. After doing this, the script tag will automatically be added by itself in dev and concatenated will other libs on prod **only for NON angular pages**
* `css_vendor_all`: In this property you need to add the path to each new CSS file you want to add from the libraries you chose. After doing this, the link tag will automatically be added by itself in dev and concatenated will other libs on prod **for both angular pages and non angular pages**

# TODO (Next steps)

* Make watch only rebuild the part that's needed. If less is changed, then just change less, not everything.
* Use bower's `main` file to discover what file of the library to add instead of manually adding vendor files
* Separate CSS and JS files to have CSS on head and JS on body

# License

The MIT License

Copyright (c) 2014 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
