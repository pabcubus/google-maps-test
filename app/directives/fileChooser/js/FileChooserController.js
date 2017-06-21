app.controller('FileChooserController', function($scope, $timeout, $mdSidenav) {
	'use strict'

	var vm = this;

	var d = new Date();
	var n = d.getTime();
	vm.id			= n;
	vm.fileName		= '';
	vm.fileType		= '';
	vm.fileContent	= '';

	init();

	function init() {
		$timeout(function() {
			var input = $('#fileChooser' + vm.id);
			var button = $('#fileChooserButton' + vm.id);

			button.click(function(e) {
				input.click();
			});

			input.on('change', function(e) {
				var r = new FileReader();

				r.onload = function(e) {
					if (vm.fileType == 'text/csv') {
						var contents = e.target.result;
						vm.fileContent = contents;
						$scope.whenReadCompletes(contents);
					}
				};

				var files = e.target.files;
				if (files[0]) {
					r.readAsText(files[0]);
					vm.fileName = files[0].name;
					vm.fileType = files[0].type;
				} else {
					vm.fileName = null;
					vm.fileType = null;
				}
				$scope.$apply();
			});
		}, 500);
	}
});
