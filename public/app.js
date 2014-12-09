'use strict';

angular.module('bookshelfApp', ['ngResource', 'ngRoute'])
	.config(function ($routeProvider, $httpProvider) {

		$routeProvider.when('/article-list', {templateUrl: 'public/articleList.html', controller: 'ArticleCtrl'});
		$routeProvider.when('/add-article', {templateUrl: 'public/addArticle.html', controller: 'ArticleCtrl'});
		$routeProvider.when('/article-details/:id', {
			templateUrl: 'public/articleDetails.html',
			controller: 'ArticleDetailsCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/article-list'});
	})
	.factory('ArticlesFactory', function ($resource) {
		return $resource('/articles', {}, {
			addArticle: {method: 'POST'},
			listArticles: {method: 'GET', isArray: true}
		})
	})
	.factory('ArticleFactory', function ($resource) {
		return $resource('/article/:id', {}, {
			deleteArticle: {method: 'DELETE', params: {id: '@id'}},
			articleDetails: {method: 'GET', params: {id: '@id'}}
		})
	})
	.controller('ArticleCtrl', ['$scope', 'ArticleFactory', 'ArticlesFactory', '$location', '$http', 
		function ($scope, ArticleFactory, ArticlesFactory, $location, $http) {
			$scope.addNewArticle = function () {
				ArticlesFactory.addArticle($scope.article);
				$scope.articles = ArticlesFactory.listArticles();
				$scope.message = "Article added!";
				//$location.path('/article-list');
			};

			$scope.deleteArticle = function (articleId) {
				ArticleFactory.deleteArticle({id: articleId});
				$scope.articles = ArticlesFactory.listArticles();
			};

			$scope.articles = ArticlesFactory.listArticles();

		}])
	.controller('ArticleDetailsCtrl', ['$scope', '$routeParams', 'ArticleFactory', '$location',
		function ($scope, $routeParams, ArticleFactory, $location) {
			$scope.articleDetails = function () {
				$location.path('/article-details');
			};
			$scope.article = ArticleFactory.articleDetails({id: $routeParams.id});


		}]);
