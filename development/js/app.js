/**
 *
 * MY APP JAVASCRIPT!
 * Description: The brain behind my powerfull application!
 * Author: John Doe | jdoe@gmail.com
 * Disclaimer: The methods below are purely fictional and optional. For code organization only.
 *
**/


var LifeModule = angular.module('LifeModule', ['ngRoute','ui.bootstrap']);


/**
 * Route Provider
 * Index com todas as páginas da Aplicação e seus redirecionamentos
 */
LifeModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/settings', {
                //  Configurações / Template
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            }).
            when('/diary', {
                templateUrl: 'views/diary.html',
                controller: 'DiaryCtrl'
            }).
            when('/dashboard/weight', {
                templateUrl: 'views/weight.html',
                controller: 'WeightCtrl'
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
LifeModule.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);

/**
 * Inits
 * Execuções e inicializações após aplicação estar pronta
 */
LifeModule.run(function($rootScope, $timeout) {

});


