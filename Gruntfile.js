module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'app/styles/login.css': 'app/styles/login.scss',
					'app/styles/alerts.css': 'app/styles/alerts.scss',
					'app/styles/cognitive_building.css': 'app/styles/cognitive_building.scss',
					'app/styles/emergency_lighting.css': 'app/styles/emergency_lighting.scss',
					'app/styles/energy_overview.css': 'app/styles/energy_overview.scss',
					'app/styles/overview.css': 'app/styles/overview.scss',
					'app/styles/left_menu.css': 'app/styles/left_menu.scss',
					'app/styles/shared.css': 'app/styles/shared.scss',
					'app/styles/site_popup.css': 'app/styles/site_popup.scss',
					'app/styles/site_tabs.css': 'app/styles/site_tabs.scss',
					'app/styles/toolbar.css': 'app/styles/toolbar.scss',
					'app/styles/messages.css': 'app/styles/messages.scss',
					'app/styles/environmental_overview.css': 'app/styles/environmental_overview.scss',
					'app/styles/asset_list.css': 'app/styles/asset_list.scss',
					'app/styles/asset_management.css': 'app/styles/asset_management.scss',
					'app/styles/device_info_popup.css': 'app/styles/device_info_popup.scss',
					'app/styles/screen_info.css': 'app/styles/screen_info.scss',
					'app/styles/settings_popup.css': 'app/styles/settings_popup.scss'
				}
			}
		},
		shell: {
			serve: {
				command: 'serve'
			},
			serve_prod: {
				command: 'serve -p 80'
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.css', '!*.min.css'],
					dest: 'app/styles',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['**/*.css'],
				tasks: ['cssmin']
			}
		},
		concurrent: {
			serve: ['shell:serve', 'watch:sass', 'watch:cssmin'],
			serve_prod: ['shell:serve_prod', 'watch:sass', 'watch:cssmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('serve', [
		'sass',
		'cssmin',
		'concurrent:serve'
	]);

	grunt.registerTask('serve_prod', [
		'sass',
		'cssmin',
		'concurrent:serve_prod'
	]);
};
