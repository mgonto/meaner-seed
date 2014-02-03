angular.module( 'meaner.home', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'app.home', {
    url: '/home',
    templateUrl: 'app/home/home.tpl.html',
    controller: 'HomeCtrl'
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope ) {
  $scope.test = "Hello gonto";
})

;

