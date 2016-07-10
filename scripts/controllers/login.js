'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, Session, $location, AUTH_REDIRECT, AuthService) {

  	if(AuthService.isAuthenticated())
  		$location.path('/dashboard');

    $scope.submit = function() {

      	if($scope.login_form.$valid)
		{	
			AuthService.login($scope.login).then(function(res){
				if(res.data.status != "error")
				{
					Session.create(res.data, true);
					$location.path('/dashboard');
				}
			}); 
		}

      return false;
    }

  });
