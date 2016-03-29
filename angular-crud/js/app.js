var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);

var host = "https://angular-api-rails.herokuapp.com/users/"
// var host =  "http://localhost:3000/users/"

app.controller('usersCtrl',function($scope, $http){
  $scope.sortReverse  = false;  // set the default sort order
  $scope.users = [];
  $http.get(host).then(function(response) {
    $scope.users = response.data;
    $(".se-pre-con").css({ display: 'none' });
  });

  $scope.temp = []
  $scope.resetAll = function(){
    $http.get(host).then(function(response) {
      $scope.temp = response.data;
   });
  };


  $scope.removeRow = function(index, user){
    user_id = user.id;
    url = host + user_id + ".json";
    $(".se-pre-con").css({ display: 'block' });
    $http.delete(url).success(function(response){
      $scope.users.splice(index, 1);
      $(".se-pre-con").css({ display: 'none' });
    })
  };

  $scope.viewData = function(user){
    $scope.user_name = user.name
    $scope.user_experience = user.experience
    $scope.user_age = user.age
  };

  $scope.addRow = function(){
    user = { 'name':$scope.name, 'experience':$scope.experience, 'age': $scope.age }
    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
    $(".se-pre-con").css({ display: 'block' });
    $http.post(host, user, config ).success(function(response){
      $('#myModal').modal('hide');
      $(".se-pre-con").css({ display: 'none' });
      $scope.users.push(response)
      $scope.name = ""
      $scope.experience = ""
      $scope.age = ""
      $scope.myForm.$setUntouched();
    });
  };

  $scope.search = function () {
    $scope.users = _.filter( $scope.temp, function(user) {
      return searchUtil(user, $scope.searchText);
    });
    if ($scope.searchText == '') {
      $scope.users = $scope.temp;
    }
  }
  $scope.resetAll();
});

function searchUtil(user, toSearch) {
  return (user.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) ? true : false;
}

app.directive('newUser', function() {
  return {
    templateUrl: 'new-user.html'
  };
});

app.directive('headerDetail', function() {
  return {
    templateUrl: 'header-detail.html'
  };
});

app.directive('showUser', function() {
  return {
    templateUrl: 'show-user.html'
  };
});



