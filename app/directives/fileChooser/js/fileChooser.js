app.directive('fileChooser', function() {
	return {
		restrict: 'E',
		scope: {
			whenReadCompletes: "="
		},
		replace: true,
		templateUrl: 'app/directives/fileChooser/html/fileChooser.html'
	};
});
