/**
 * Controller  Diary
 * @param $scope
 * @param $http
 * @param $log
 * @param $windows
 * @param $errorService
 * @constructor
 */


LifeModule.controller('DiaryCtrl', ['$scope', '$route', '$routeParams', '$http', '$log', '$window',
    function($scope, $route, $routeParams, $http, $log, $window) {


    // inicializa o escopo
    $scope.DEBUG_ENABLED = $routeParams.debug;
    // tests if its mock or webservice backend
    $scope.ENDPOINT = $routeParams.endpoint;
    if (!$scope.ENDPOINT) {
        $scope.ENDPOINT = "/service";
    }

    // Triggers the tooltip for the toolbar
    $('.btn-toolbar .btn-group .btn').tooltip();

    var requestObj = {
        method: "GET",
        url: $scope.ENDPOINT + "/backend/mock"
    };


    $http(requestObj).success(callback).error(alert("erro"));
    $scope.data = callback;


}]);
