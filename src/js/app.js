/**
 *
 * MY APP JAVASCRIPT!
 * Description: The brain behind my powerfull application!
 * Author: John Doe | jdoe@gmail.com
 * Disclaimer: The methods below are purely fictional and optional. For code organization only.
 *
 **/


var DTFramework = angular.module('DTFramework', ['ngRoute','ui.bootstrap']);


/**
 * Route Provider
 * All routes and redirects
 */
DTFramework.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            // List All
            when('/', {
                templateUrl: 'views/list.html',
                controller: 'ListCtrl'
            }).

            otherwise({
                redirectTo: '/'
            });
    }
]);


/**
 * Ativa HTML5 Mode,
 * fazendo com que o Angular não tome conta dos links, alterando a url da página.
 */
DTFramework.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);

/**
 * Inits
 * Execuções e inicializações após aplicação estar pronta
 */
DTFramework.run(function($rootScope, $timeout) {

});


