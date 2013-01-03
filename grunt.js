
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Grunt file.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-shell');

  // Load configuration.
  var vendor = grunt.file.readJSON('./vendor.json');

  grunt.initConfig({

    shell: {
      bower: {
        command: 'bower install',
        stdout: true
      },
      jasmine_server: {
        command: 'grunt jasmine-server',
        stdout: true
      }
    },

    clean: {
      bower: ['components']
    },

    rig: {
      build: {
        src: 'src/build/backbone.neatline.js',
        dest: 'lib/backbone.neatline.js'
      }
    },

    concat: {
      build: {
        src: '<config:rig.build.dest>',
        dest: 'lib/backbone.neatline.js'
      }
    },

    min: {
      build: {
        src: '<config:concat.build.dest>',
        dest: 'lib/backbone.neatline.min.js'
      }
    },

    jasmine: {
      src: [
        vendor.jquery,
        vendor.underscore,
        vendor.backbone,
        'lib/backbone.neatline.js'
      ],
      specs: 'spec/unit/**/*.spec.js',
      helpers: [
        'spec/helpers.js',
        vendor.jasmine_jquery,
        vendor.sinon
      ],
      server: {
        port: 1337
      }
    },

    watch: {
      payload: {
        files: 'src/**/*.js',
        tasks: ['compile']
      }
    }

  });


  // Task aliases.
  // -------------

  // Default task.
  grunt.registerTask('default', 'jasmine');

  // Compile the library.
  grunt.registerTask('compile', [
    'rig',
    'concat',
    'min'
  ]);

  // Build the application.
  grunt.registerTask('build', [
    'clean',
    'shell:bower',
    'compile'
  ]);

  // Run Jasmine suite.
  grunt.registerTask('jasmine:server', 'shell:jasmine_server');


};
