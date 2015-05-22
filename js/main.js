currentImg = {};
currentPage = 'TheAmazingEarth';
currentData = 0;

function download(url) {
    window.open(url + '&dl=1');

}
var app = angular.module('FineVine', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/gallery.html',
            controller: 'render'
        })
        .when('/view', {
            templateUrl: 'views/viewer.html',
            controller: 'viewer'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.controller("render", function ($scope, $http) {
    $scope.user = currentPage;
    $scope.loadPhotos = function () {
        currentPage = $scope.user;
        $http.get('https://graph.facebook.com/' + $scope.user + '/photos/uploaded?fields=name,source,picture,description&limit=200').success(function (r) {
            if (r.error) {
                alert('Rendering error!');
            } else {
                $scope.data = r.data;
                currentData = r.data;
            }
        });
    }

    $scope.Download = function (obj) {
        download(obj.source);
    }


    $scope.view = function (obj) {
        location.hash = "/view";
        currentImg = obj;
    }

    if (currentData == 0)
        $scope.loadPhotos();
    else
        $scope.data = currentData;
});


app.controller("viewer", function ($scope) {
    $scope.img = currentImg;
    $scope.goBack = function () {
        location.hash = "#/Back";
    };
    $scope.Download = function (url) {
        download(url);
    };
    $scope.viewFull = function (url) {
        open(url);
    };
    $scope.goPrev = function () {
        currentImg = currentData[(currentData.length + currentData.indexOf(currentImg) - 1) % currentData.length];
        $scope.img = currentImg;
    }
    $scope.goNext = function () {
        currentImg = currentData[(currentData.indexOf(currentImg) + 1) % currentData.length];
        $scope.img = currentImg;
    }
});