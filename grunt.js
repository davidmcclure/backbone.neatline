
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Grunt file.
 *
 * @package     neatline.backbone
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
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
      bower: '/.components'
      // payload: [
      // ]
    },

    min: {

    },

    watch: {
      payload: {
        files: [
        ],
        tasks: [
        ]
      }
    }

  });


  // Task aliases.
  // -------------

  // Default task.
  grunt.registerTask('default', 'test');

  // Build the application.
  grunt.registerTask('build', [
    'clean',
    'shell:bower'
  ]);

  // Run Jasmine suite.
  grunt.registerTask('test', 'shell:jasmine');
  grunt.registerTask('test_server', 'shell:jasmine_server');


};
