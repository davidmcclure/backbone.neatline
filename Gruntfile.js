
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Gruntfile.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-shell');

  var cfg = grunt.file.readJSON('./config.json');

  grunt.initConfig({

    shell: {
      bower: {
        command: 'bower install',
        stdout: true
      }
    },

    clean: {
      bower: 'components'
    },

    rig: {
      build: {
        src: 'src/build/backbone.neatline.js',
        dest: 'lib/backbone.neatline.js'
      }
    },

    uglify: {
      build: {
        src: '<%= rig.build.dest %>',
        dest: 'lib/backbone.neatline.min.js'
      }
    },

    jasmine: {
      neatline: {
        src: [
          cfg.jquery,
          cfg.underscore,
          cfg.backbone,
          'lib/backbone.neatline.js'
        ],
        options: {
          specs: 'spec/unit/**/*.spec.js',
          helpers: [
            'spec/helpers.js',
            cfg.jasmine_jquery,
            cfg.sinon
          ]
        }
      }
    },

    watch: {
      payload: {
        files: 'src/**/*.js',
        tasks: ['compile']
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 1337
        }
      }
    }

  });


  grunt.registerTask('default', 'jasmine');

  grunt.registerTask('compile', [
    'rig',
    'uglify'
  ]);

  grunt.registerTask('build', [
    'clean',
    'shell:bower',
    'compile'
  ]);

  grunt.registerTask('jasmine:server', [
    'jasmine:neatline:build',
    'connect'
  ]);


};
