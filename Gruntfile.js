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
          'dist/index.html': ['src/index.html'],
          'dist/CNAME': ['src/CNAME'],
          'dist/modernizr.js': ['src/modernizr.js']
        }
      },
      jxrs: {
        expand: true,
        cwd: 'src/assets',
        src: '*.jxr',
        dest: 'dist/assets'
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
      dist: ['dist/'],
      jxrTemp: ['src/assets/*.jxr']
    },

    cwebp: {
      dist: {
        options: {
          q: 50,
        },
        files: [{
          expand: true,
          cwd: 'src/assets',
          src: ['**/*.png'],
          dest: 'dist/assets'
        }]
      }
    },

    exec: {
      createJxrs: 'mogrify -format jxr -quality 50 src/assets/*.png',
      publish: 'git subtree push --prefix dist origin gh-pages'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-cwebp');

  grunt.registerTask('jxrs', ['exec:createJxrs', 'copy:jxrs', 'clean:jxrTemp'])
  grunt.registerTask('build', ['clean:dist', 'uglify:dist', 'cssmin:dist', 'copy:dist', 'imagemin:dist', 'jxrs', 'cwebp:dist']);
  grunt.registerTask('publish', ['exec:publish']);
};
