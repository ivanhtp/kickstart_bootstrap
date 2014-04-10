# Kickstarter Structure for FrontEnd Projects


Full working blank project for Boostrap, Compass and Grunt lovers!

## Features

  * Bootstrap
  * Node.js
  * Sass and Compass
  * Bower for assets organization
  * Grunt.js for building (and many tasks already configured!)
  * Great file/folder organization!
  * One command build and deploy
  * 100% upgradable


## Quickstart

  First of all, you need to install the applications below:
  * [Git](http://git-scm.com/) ...dah!
  * [Ruby](https://www.ruby-lang.org/en/) 1.9 or higher
  * [Node.js](http://nodejs.org)
  * Grunt `npm install -g bower grunt-cli`
  * Bower `npm install -g bower`
  * Compass `[sudo] gem install compass`
  * Boostrap Sass (compass version) `gem install bootstrap-sass`

  Well done, now you have all the requirements to get this project working!


## Downloading

  Just download and unzip or clone the project inside the folder you want
  * [Download](https://github.com/ivanhtp/kickstart_bootstrap/archive/master.zip) or clone:
  `git clone https://github.com/ivanhtp/kickstart_bootstrap.git`

  * Optional: Install or update all Grunt dependencies running:
  `npm install`

  * Or just open your folder and run:
   `grunt dev`  - Use it when developing, takes less time to run and don't compress your files. Good for debug. It also start a local server.
   `grunt dist`  - Use it when deploying, compress all files, images to sprites and create version tags of your project


## Folder Structure

  This project is organized following the structure below:

  * __node_modules__     - All plugins used by grunt and modules from Node: clean, uglify, compass, etc...
  * __scss__             - The global style of application goes here, basically your bootstrap overrides.
  * __img__              - Put your images here, they will be joined into a sprite in development/img.
  * __development__      - Your HTML files and javascripts only. Grunt will bring images and css for you, don't worry.
  * __build__            - Here goes your project ready for run. Deploy? Just copy this folder and be happy. DON'T CODE ANYTHING HERE!!!



## Configuration Files!

  * __package.json__ - Project version information for building. Project name, author, version goes here.
  * __Gruntfile.js__ - This file is to Grunt, what bower.json is to bower. Here goes Grunt dependencies/plugins and its configurations. Like bower, if you add a new dependency, run `npm install` to download the new dependencies

