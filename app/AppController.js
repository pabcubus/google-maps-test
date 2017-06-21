app.controller('AppController', function($mdSidenav) {
	var vm = this;

	vm.toggleToolbarMenu = buildToggler('left');

	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		};
	}
});
