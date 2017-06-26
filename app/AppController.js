/**
 * @class GMapsTest.gmt-controllers.AppController
 * @description This controller is the one that interacts with the all of the parts of the app. Handles sideNavs and also CSS's on certain parts.
 */
gmtCons.controller('AppController', function($mdSidenav) {
	var vm = this;

	vm.toggleToolbarMenu = buildToggler('left');

	/**
	 * @function
	 * @name buildToggler
	 * @memberOf GMapsTest.gmt-controllers.AppController
	 * @param {string} componentId String of the name of the sideNav
	 * @description This function defines a toggler for the left sideBox
	 */
	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		};
	}
});
