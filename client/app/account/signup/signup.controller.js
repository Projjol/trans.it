'use strict';

angular.module('transitApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.userLangs = [];

    $scope.translator = false;
    $scope.languages = [
      {name: 'Russian'},
      {name: 'English'}
    ];

    $scope.userLang = '';
    $scope.userLangs  = [];
    $scope.addUserLang = function() {
      $scope.userLangs.push($scope.userLang);
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          languages: $scope.languages
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
