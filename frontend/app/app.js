angular.module( 'meaner', [
  'templates-app',
  'meaner.home',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $locationProvider) {
  $stateProvider.state( 'app', {
    url: '/app',
    template: '<div ui-view></div>',
    abstract: true,
    controller: 'AppCtrl'
  });

  $locationProvider.html5Mode(true);
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  
})

;

