app.config(
  function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/map');
    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'app/screens/map/html/map.html'
      });
  }
);
