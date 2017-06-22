app.service('DataController', function($q, $http, lodash) {
	var vm = this;

	vm.performOperation = performOperation;

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
