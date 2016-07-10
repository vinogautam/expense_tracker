'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $timeout, $state, AuthService, $location, Session) {
    
  	if(!AuthService.isAuthenticated())
  		$location.path('/');

    $scope.$state = $state;

    $scope.user = Session.user;
    $scope.overview = {};

    $scope.expense = {expense:"Daily Expense", edate: new Date().getFullYear()+'-'+ (new Date().getMonth() + 1) +'-'+new Date().getDate(), type:"daily", user_id: Session.userId};

    AuthService.overview().then(function(res){
    	$scope.overview = res.data;
    });

    $scope.users = [];
    
    AuthService.users().then(function(res){
    	$scope.users = res.data;
    	$timeout(function(){
    		$scope.expense.paid_by = Session.userId;
    	},500);
    });

    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({name: item.name, text: item.data.text});
        }
    });

    $scope.logout = function(){
    	Session.destroy();
    	$location.path('/');
    };

    $scope.add_expense = function() {
    	console.log("dfs df sdf");
      	AuthService.add_expense($scope.expense).then(function(res){
      		$scope.expense = {expense:"Daily Expense", edate: new Date().getFullYear()+'-'+ (new Date().getMonth() + 1) +'-'+new Date().getDate(), type:"daily", user_id: Session.userId};
			AuthService.overview().then(function(res){
		    	$scope.overview = res.data;
		    });
			$location.path('/dashboard');
		}); 

      return false;
    }

  });
