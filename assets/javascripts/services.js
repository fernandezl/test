(function(){

    var servicesModule = angular.module('NewsFeedServices', ['ngResource']);

	servicesModule.factory('NewsFeedServices',['$resource', function($resource) {
		return $resource('', null, {
			getAuthorization: {
				method: 'GET',
				url: 'scripts/authorization.php',
				transformResponse: function (token) {
					return { data: token };
				}
			},
			getFeed: {
				method: 'GET',
				url: 'scripts/getfeed.php?token=:token',
				transformResponse: function (data) {
					return { data: angular.fromJson(data) };
				}
			}
		});
	}]);
/*
	app.factory('myService', function($http) {
		var myService = {
		async: function() {
		// $http returns a promise, which has a then function, which also returns a promise
		var promise = $http.get('test.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			console.log(response);
			// The return value gets picked up by the then in the controller.
			return response.data;
			});
			// Return the promise to the controller
			return promise;
			}
		};
		return myService;
	});*/

})();