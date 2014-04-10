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
  * Git (dah!) (download and install at http://git-scm.com/)
  * Ruby 1.9 or higher (you probably already have it, but you can download and install at https://www.ruby-lang.org/en/)
  * [Node.js](download and install at http://nodejs.org)
  * Grunt (running  npm install -g bower grunt-cli )
  * Bower (running npm install -g bower
  * Compass (running [sudo] gem install compass )
  * Boostrap Sass (compass version)  gem install bootstrap-sass
  * Boostrap Sass (bower version)  bower install twbs/bootstrap-sass

  Well done, now you have all the requirements to get this project working!


## Downloading

  Just download and unzip or clone the project inside the folder you want
  * [Download](https://github.com/ivanhtp/kickstart_foundation5_bower_grunt_compass/archive/master.zip) or clone: `git clone https://github.com/ivanhtp/kickstart_foundation5_bower_grunt_compass.git`

  Optional: Install or update all Grunt dependencies running:
  * `npm install`

  Or just open your folder and run:
  * `grunt`

  This will get all contents of your "development" folder and send it to your "build" foder with a version tag and all files minified and optimized. Ready for deploy!

## Developing

  You can start a server anytime you want when developing, just run
    * `node server.js`

  It will create a local server with the 'development' folder as root!

## Folder Structure

  This project is organized following the structure below:

  * __bower_components__ - All the assets and libs used in this project: Foundation, modernizr, jquery, etc...
  * __node_modules__     - All plugins used by grunt and modules from Node: clean, uglify, compass, etc...
  * __scss__             - The global style of application goes here, basically your foundation overrides.
  * __img__              - Put your images here, they will be joined into a sprite in development/img.
  * __development__      - Your HTML files and javascripts only. Grunt will bring images and css for you, don't worry.
  * __build__            - Here goes your project ready for run. Deploy? Just copy this folder and be happy. DON'T CODE ANYTHING HERE!!!



## Configuration Files!

  * __package.json__ - Project version information for building. Project name, author, version goes here.
  * __Gruntfile.js__ - This file is to Grunt, what bower.json is to bower. Here goes Grunt dependencies/plugins and its configurations. Like bower, if you add a new dependency, run `npm install` to download the new dependencies

