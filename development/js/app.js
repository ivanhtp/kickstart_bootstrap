/**
 *
 * MY APP JAVASCRIPT!
 * Description: The brain behind my powerfull application!
 * Author: John Doe | jdoe@gmail.com
 * Disclaimer: The methods below are purely fictional and optional. For code organization only.
 *
**/


/**
 * Controller CarCtrl
 * Description: Creates a car
 * Methods:
 */


'use strict';
var LifeModule = angular.module("LifeModule", ['ngRoute']);


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
         otherwise({
         templateUrl: 'views/diary.html',
         controller: 'DiaryCtrl'
         });
    }]);


/**
 * Ativa HTML5 Mode,
 * fazendo com que o Angular não tome conta dos links, alterando a url da página.
 */
LifeModule.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('!');
}]);


/**
 * Cria session interceptor para requisições HTTP, que controla validade da sessão entre requisições
 */
LifeModule.factory("$sessionInterceptor", function ($q, $window, $log) {
    var redirect = function () {
        var loginLocation = LOGIN_PAGE;

        // adiciona parâmetros da url no redirecionamento
        var currentLocation = window.location.href;
        if (/\?/.test(currentLocation)) {
            loginLocation += '?' + currentLocation.split('?')[1];
        }
        $window.location = loginLocation;
    };
    var isLogged = false;

    return {
        request: function (config) {
            var token = $window.localStorage["dt.admin.token"];
            var lastRequestTime = $window.localStorage["dt.admin.lastRequestTime"];

            var now = new Date().getTime();
            // verifica se último request faz mais de 10 minutos
            // (caso request seja para operação de login ignora validação)
            if (/Login$/.test(config.url) || token && lastRequestTime && (now - lastRequestTime) < 10 * 60 * 1000) {
                // logado, continuando requisição
                isLogged = true;
                return config || $q.when(config);
            } else {
                $log.info("$sessionInterceptor => Sessão local expirada, último request a mais de 10 minutos, preparando redirecionamento...");
                $window.localStorage.removeItem("dt.admin.token");

                // tratamento para quando estiver no login.html e evitar loop.
                if ((window['LOGIN_PAGE'] != undefined) || (window['LOGIN_PAGE'] != void 0)) {
                    $log.info("$sessionInterceptor =>  Ok, redirecionando para login.html");
                    redirect();
                    return $q.reject(config);
                } else {
                    $log.info("$sessionInterceptor =>  Já está no login.html. Redirecionamento cancelado!");
                    return config || $q.when(config);
                }
            }
        },
        response: function (response) {
            // verifica a presença do header "dt-legacy-http-status" no header da resposta
            var dtLegacyHttpStatus = response.headers("dt-legacy-http-status");
            if (dtLegacyHttpStatus) {
                // converte para numero inteiro
                dtLegacyHttpStatus = parseInt(dtLegacyHttpStatus, 10);

                // verifica se existe o código 403, se existir sessão foi expirada, redirecionando p/ login
                if (dtLegacyHttpStatus === 403) {
                    $window.localStorage.removeItem("dt.admin.token");
                    redirect();
                    return $q.reject(config);

                } else if (Modernizr.localstorage) {
                    $window.localStorage["dt.admin.lastRequestTime"] = new Date().getTime();
                }
            } else {
                if (Modernizr.localstorage) {
                    $window.localStorage["dt.admin.lastRequestTime"] = new Date().getTime();
                } else {
                    $log.error("$sessionInterceptor => No localStorage, impossível armazenar último request...");
                }
            }

            return response || $q.when(response);
        }
    };
});

/**
 * Cria interceptor que loga todas as requisições
 */
LifeModule.factory("$httpLogInterceptor", function ($q, $log) {
    return {
        request: function (config) {
            $log.info("$httpLogInterceptor.request => " + config.url);
            return config || $q.when(config);
        },
        requestError: function (rejection) {
            $log.info("$httpLogInterceptor.requestError => " + rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            $log.info("$httpLogInterceptor.response => " + response.config.url + " STATUS: " + response.status);
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            $log.info("$httpLogInterceptor.responseError => " + rejection);
            return $q.reject(rejection);
        }
    };
});

/**
 * Interceptador de erros, envia para o $errorService as requisições com status de erro
 */
LifeModule.factory("$responseErrorInterceptor", function ($q, $errorService) {
    return {
        responseError: function (rejection) {
            $errorService.addHttpError(rejection.status, rejection.config);
            return $q.reject(rejection);
        }
    };
});


// Registra interceptors no módulo admin
LifeModule.config(function ($httpProvider) {
    //$httpProvider.interceptors.push('$sessionInterceptor');
    $httpProvider.interceptors.push('$responseErrorInterceptor');
    if ($.url(window.location.href).param("debug")) {
        $httpProvider.interceptors.push('$httpLogInterceptor');
    }
});



/**
 * Inits
 * Execuções e inicializações após aplicação estar pronta
 */
LifeModule.run(function($rootScope, $timeout) {

});


