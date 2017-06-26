/**
 * @class GMapsTest.gmt-services.DataService
 * @description This service handles all the API requests
 */
gmtSers.service('DataService', function($q, $http, lodash) {
	var vm = this;

	vm.performOperation = performOperation;

	/**
	 * @function
	 * @name performOperation
	 * @memberOf GMapsTest.gmt-services.DataService
	 * @param {string} url The URL of the API resource
	 * @param {string} operation GET, POST, DELETE, PUT
	 * @param {object} data Object with the data to be posted (in case of a POST)
	 * @returns {Promise} The promise with the response from the resource
	 * @description This function gets the service's response and it will display the coordinates on the map
	 */
	function performOperation(url, operation, data) {
		var deferred = $q.defer();

		var httpData = {
			'method': operation,
			'url': url,
			'data': (data ? data : {})
		};

		$http(httpData)
			.then(
				function successCallback(response) {
					deferred.resolve(response);
				}, function errorCallback(response) {
					deferred.reject({status: response.status});
				}
			);

		return deferred.promise;
	}
});
