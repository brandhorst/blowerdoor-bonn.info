module.exports = function( grunt ) {
  'use strict';

  // Global Parameters (CONST)
  // --------------------------
  var globals = {
    DIST_DIR: 'dist',
    SRC_DIR: 'src',
    PORT: 9000,
    HOST_NAME: 'localhost'
  };

  // Load Grunt-Tasks
  // --------------------------
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Grunt Configuration Object!
  // --------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Global Parameters
    // Usage: <%= globals.param %>
    // --------------------------
    globals: globals,

    // Banner
    // Header Banner for Javascript & Style Files
    // --------------------------
    banner: '/*! \n' +
              ' * <%= pkg.name %> - <%= pkg.description %>\n' +
              ' * <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd, HH:MM:ss") %>\n' +
              ' *\n' +
              ' * (c) <%= pkg.author.name %> <%= grunt.template.today("yyyy") %>\n' +
              ' */\n',





    // (B) Styles
    // --------------------------
    less: {
      compiler: {
        options: {
          dumpLineNumbers: 'comments'
        },
        files: {
          'src/assets/css/style.css': 'src/assets/css/less/base.less'
        }
      }
    },
    autoprefixer: {
        options: {
          browsers: ['last 1 version']
        },
        css: {
          src: [
            'src/assets/css/style.css'
          ]
        }
    },
    // @end dev workflow tasks



    // Build Tasks
    // --------------------------
    cssmin: {
      options: {
        banner: '/*! Stylesheets <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author.url %> */',
        report: 'min',
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'dist/assets/css/style.css': 'src/assets/css/style.css'
        }
      }
    },

    uncss: {
      dist: {
        files: {
          'dist/assets/css/style.css': ['dist/index.html']
        }
      }
    },


    // (C) Javascript
    // --------------------------

    // (C-1) Javascript hinting (excluding vendors)
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: ['Gruntfile.js']
    },


    // (D) Development Workflow Tools
    // --------------------------

    // (D-1) Start a simple webserver and
    //       open the URL (http://localhost:9000/).
    connect: {
      server: {
        options: {
          livereload: true,
          //hostname: globals.HOST_NAME,
          port: globals.PORT,
          base: '<%= globals.SRC_DIR %>',
          open: true
        }
      }
    },

    // (D-2) Watch for changes an trigger event
    //       to livereload the connect.server
    watch: {
      options: {
        livereload: true
      },
      dev: {
        files: '<%= globals.SRC_DIR %>/**/*'
      },
      less: {
        files: 'src/assets/css/less/**/*.less',
        tasks: ['less', 'autoprefixer'],
        options: {
          atBegin: true
        }
      }
    },





    // (E) Build Tools
    // --------------------------

    // (E-2) Open distribution folder inside a brower
    //       to have quick look after build.
    open : {
      prod: {
        path: 'dist/index.html',
        app: 'Google Chrome'
      }
    },

    copy: {
      html: {
        expand:     true,
        cwd:        'src/',
        src:        ['**/*.html'],
        dest:       'dist/'
      },
      img: {
        expand:     true,
        cwd:        'src/assets/img',
        src:        ['*'],
        dest:       'dist/assets/img'
      }
    }
  });





  // Register Tasks
  //
  // (1) build: Build for Prod enviroment
  // (2) server: Development Workflow
  // --------------------------
  grunt.registerTask('build', [
    'jshint:all',
    'less',
    'autoprefixer',
    'cssmin',
    'uncss:dist',
    'copy'
  ]);
  grunt.registerTask('server', [
    'connect:server'
  ]);

  grunt.registerTask('dev', ['jshint:all', 'server', 'watch']);
  grunt.registerTask('prod', ['jshint:all', 'build', 'open:prod']);
  grunt.registerTask('default', ['prod']);

};
