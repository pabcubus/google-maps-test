gmtApp.config(
	function(CacheFactoryProvider) {
		angular.extend(CacheFactoryProvider.defaults, {
			maxAge: 15 * 60 * 1000
		});
	}
);
