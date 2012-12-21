
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
      jasmine: {
        command: 'grunt jasmine',
        stdout: true
      },
      jasmine__server: {
        command: 'grunt jasmine-server',
        stdout: true
      }
    },

    clean: {
      bower: ['components']
    },

    rig: {
      build: {
        src: 'src/build/neatline.backbone.js',
        dest: 'lib/neatline.backbone.js'
      }
    },

    concat: {
      build: {
        src: [
          vendor.app.jquery,
          vendor.app.underscore,
          vendor.app.backbone,
          '<config:rig.build.dest>'
        ],
        dest: 'lib/neatline.backbone.js'
      }
    },

    min: {
      build: {
        src: '<config:concat.build.dest>',
        dest: 'lib/neatline.backbone.min.js'
      }
    },

    jasmine: {
      src: 'lib/neatline.backbone.js',
      specs: 'spec/unit/**/*.spec.js',
      helpers: [
        'spec/helpers.js',
        vendor.test.jasmine_jquery,
        vendor.test.sinon
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
  grunt.registerTask('default', 'test');

  // Compile the library.
  grunt.registerTask('compile', [
    'rig',
    'concat',
    'min'
  ]);

  // Build the application.
  grunt.registerTask('build', [
    'clean',
    'shell:bower'
  ]);

  // Run Jasmine suite.
  grunt.registerTask('test', 'shell:jasmine');
  grunt.registerTask('test_server', 'shell:jasmine_server');


};
