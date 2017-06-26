/**
 * @class GMapsTest.gmt-controllers.FileChooserController
 * @description This controller is the one that interacts with the File Chooser directive
 */
gmtCons.controller('FileChooserController', function($scope, $timeout, $mdSidenav) {
	'use strict'

	var vm = this;

	var d = new Date();
	var n = d.getTime();
	vm.id			= n;
	vm.fileName		= '';
	vm.fileType		= '';
	vm.fileContent	= '';

	init();

	/**
	 * @function
	 * @name init
	 * @memberOf GMapsTest.gmt-controllers.FileChooserController
	 * @description This function inits the File Chooser component
	 */
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

						var lines = contents.split(/[\r\n]+/g);

						$scope.whenReadCompletes(lines);
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
