var app = angular.module('myApp', []);

var host = "https://angular-api-rails.herokuapp.com/users/"
// var host =  "http://localhost:3000/users/"

app.controller('usersCtrl',function($scope, $http){
  $scope.sortReverse  = false;  // set the default sort order
  $scope.users = [];
  $http.get(host).then(function(response) {
    $scope.users = response.data;
  });

  $scope.temp = []
  $scope.resetAll = function(){
      $http.get(host).then(function(response) {
        $scope.temp = response.data;
     });
  };


  $scope.removeRow = function(index, id){
    user_id = id;
    url = host + user_id;
    $http.delete(url).success(function(response){
      $scope.users.splice(index, 1)
    })
  };

  $scope.viewData = function(index, id){
    user_id = id;
     $http.get( host + user_id).success(function(response){
      $("#name").html(response.name);
      $("#experience").html(response.experience);
      $("#age").html(response.age)
    })
  };

  $scope.addRow = function(){

    user = { 'name':$scope.name, 'experience':$scope.experience, 'age': $scope.age }

    // create_user_url = "https://angular-api-rails.herokuapp.com/users";

    var config = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
      }
    $http.post(host, user, config ).success(function(response){
      $('#myModal').modal('hide');
      $scope.users.push(user);
      $scope.name = ""
      $scope.experience = ""
      $scope.age = ""
      $scope.resetAll();
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



