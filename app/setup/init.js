/**
 * @class GMapsTest.gmt-controllers
 * @memberOf GMapsTest
 * @description This is the module that includes controllers
 */
var gmtCons	= angular.module('gmt-controllers', ['ngMaterial', 'ngLodash', 'ui.router']);
/**
 * @class GMapsTest.gmt-directives
 * @memberOf GMapsTest
 * @description This is the module that includes directives
 */
var gmtDirs = angular.module('gmt-directives', []);
/**
 * @class GMapsTest.gmt-services
 * @memberOf GMapsTest
 * @description This is the module that includes services
 */
var gmtSers = angular.module('gmt-services', ['ngLodash', 'ui.router', 'angular-cache']);


/**
 * @class GMapsTest.gmt-services
 * @memberOf GMapsTest
 * @description This is the principal modules that combines all previous modules and controls the whole app
 */
var gmtApp	= angular.module('gmt-app', ['gmt-controllers', 'gmt-directives', 'gmt-services']);
