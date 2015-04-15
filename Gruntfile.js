module.exports = function (grunt) {
	'use strict';

	var port = grunt.option('port') || 9001,
		lrPort = grunt.option('lr-port') || 35731,
		hostname = 'localhost',
		baseFolder = '.';

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	// Load all grunt-* packages from package.json
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Read settings from package.json
		pkg: grunt.file.readJSON('package.json'),
		// Paths settings
		dirs: {
			src: {
				src: 'src',
				css: 'src/css',
				js: 'src/js'
			},
			dest: {
				dest: 'public',
				css: 'public/css',
				js: 'public/js'
			}
		},
		watch: {
			// Will try to connect to a LiveReload script
			options: {
				livereload: lrPort
			},
			configs: {
				options: {
					reload: true
				},
				files: ['Gruntfile.js', 'package.json']
			},
			css: {
				files: '<%= dirs.src.css %>/**/*.scss',
				tasks: ['build-css']
			},
			js: {
				files: '<%= dirs.src.js %>/**/*.js',
				tasks: ['build-js']
			},
			index: {
				files: 'index.html'
			}
		},
		// Setup a local server (using Node) with LiveReload enabled
		connect: {
			server: {
				options: {
					port: port,
					base: baseFolder,
					hostname: hostname,
					livereload: lrPort,
					open: true
				}
			}
		}
	});


	// Open local server and watch for file changes
	grunt.registerTask('serve', ['connect', 'watch']);
	// Default task(s).
	grunt.registerTask('default', ['serve']);
};
