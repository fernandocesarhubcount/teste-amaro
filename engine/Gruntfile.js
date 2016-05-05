module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      beforeconcat: ['../app/js/components/*.js'],
    },

    uglify: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        files: {
          // Custom main JS
          '../app/main.min.js': ['../app/js/*.js'],
          // Libs JS
          '../app/libs.min.js': [
	          	'./bower_components/jquery/dist/jquery.js',
          	],
        }
      }
    },

    sprite:{
      all: {
        src: '../app/img/gen-sprites/*.png',
        dest: '../app/img/sprites.png',
        destCss: '../app/scss/common/_sprite.scss'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
        build: {
            options: {
            	sassDir: '../app/scss', //Get all SASS
            	cssDir: '../app/css', //Dist finish CSS
            	raw: "preferred_syntax = :sass\n"
            }
        }
    },

    cssmin: {
        target: {
            files: {
              '../build/main.min.css': ['../app/css/main.css'],
              '../app/main.min.css': ['../app/css/main.css'],
            }
        }
    },

    imagemin: {
      build: {
         options: {
            optimizationLevel: 3
         },
         files: [{
            expand: true,
            cwd: '../app/img/', //Optimization of img
            src: ['../app/img/**/*.{png,jpg,gif}'], //Get all extension
            dest: '../build/img/' //Dist finish of optimization
         }]
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: '../app/img/',
        src:['**/*.{png,jpg,gif}'],
        dest:'../build/img/'
      },
      css: {
        expand: true,
        cwd: '../app/css/',
        src:['**/*'],
        dest:'../build/css/'
      },
      js: {
        expand: true,
        cwd: '../app/js/',
        src:['**/*'],
        dest:'../build/js/'
      },
      fonts: {
        expand: true,
        cwd: '../app/fonts/',
        src:['**/*'],
        dest:'../build/fonts/'
      },
      img: {
        expand: true,
        cwd: '../app/img/',
        src:['**/*'],
        dest:'../build/img/'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '../build/index.html': '../app/index.html',
        }
      }
    },

    watch: {
      sass: {
        files: ['../app/**/*.scss'], //View all files SASS
        tasks: ['compass'],
      },
      sprite:{
      	'files': ['../app/img/gen-sprites/*.png'],
      	'tasks': ['sprite'],
      },
      js: {
        files: ['../app/**/*.js'], //View all files JS
        tasks: ['uglify','jshint'],
      },
      cssminify: {
          files: ['../app/**/*.scss'],
          tasks: ['cssmin'],
      },
      copy: {
          files: ['../app/**/*'],
          tasks: ['copy'],
      },
      html: {
        files: ['../app/**/*.html'],
        tasks: ['htmlmin'],
      },
      options: {
        livereload: true,
      },
    },
  });

  // Load the plugin jshint
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin jshint
  grunt.loadNpmTasks('grunt-spritesmith');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  //Load the plugin cssMin
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin imagemin
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Load the plugin htmlmin
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Load the plugin copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  //Grunt build of project
  grunt.registerTask('build', ['jshint','uglify','sprite', 'compass', 'cssmin', 'imagemin', 'htmlmin', 'copy']);
  grunt.registerTask('test', ['jshint']);
};
