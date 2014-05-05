blowerdoor-bonn.info 
========

### Deps

If you've Node.js & [grunt-cli](https://github.com/gruntjs/grunt-cli) installed, just run `npm install` on your favorite command line interface.
That's it __:-)__


```json

"devDependencies": {
  "grunt": "~0.4.4",
  "grunt-contrib-jshint": "~0.3.0",
  "grunt-contrib-cssmin": "~0.5.0",
  "matchdep": "~0.1.2",
  "grunt-contrib-uglify": "~0.4.0",
  "grunt-usemin": "~2.1.0",
  "grunt-contrib-copy": "~0.5.0",
  "grunt-contrib-concat": "~0.4.0",
  "grunt-contrib-watch": "~0.6.1",
  "grunt-open": "~0.2.3",
  "grunt-contrib-connect": "~0.7.1"
},
"engines": {
  "node": "0.10.x",
  "npm": "1.3.x"
}

```

### Grunt Tasks

1. `grunt` (default) : Runs `grunt:dev` Development Workflow
2. `grunt dev`: Development Workflow (jshint, server, watch, open)
3. `grunt prod`: Development Workflow (jshint, usemin, concat, cssmin, uglify, open)





