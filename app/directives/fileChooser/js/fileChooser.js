/**
 * @class GMapsTest.gmt-directives.fileChooser
 * @description This handles the directive for the File Chooser
 */
gmtDirs.directive('fileChooser', function() {
	return {
		restrict: 'E',
		scope: {
			whenReadCompletes: "="
		},
		replace: true,
		templateUrl: 'app/directives/fileChooser/html/fileChooser.html'
	};
});
