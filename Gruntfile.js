module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      options: {
        nameCache: '.tmp/grunt-uglify-cache.json',
      },
      dist: {
        files: {
          'dist/gridfolio.js': ['src/gridfolio.js'],
          'dist/index.js': ['src/index.js']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/index.css': ['src/index.css']
        }
      }
    },

    copy: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 4,
        },
        files: [{
          expand: true,
          cwd: 'src/assets',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets'
        }]
      }
    },

    clean: {
      dist: ['dist/']
    },

    exec: {
      publish: 'git subtree push --prefix dist origin gh-pages'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', ['clean:dist', 'uglify:dist', 'cssmin:dist', 'copy:dist', 'imagemin:dist']);
  grunt.registerTask('publish', ['exec:publish']);
};
