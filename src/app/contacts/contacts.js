'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])



.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope, $firebaseArray) {
	var Rootref = firebase.database().ref()
	$scope.contacts = $firebaseArray(Rootref);

	$scope.addFormShow= true;
	$scope.editFormShow= false;

	$scope.showEditForm = function(contact){
		$scope.addFormShow= false;
		$scope.editFormShow= true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.phone = contact.phone;
	}

	$scope.addContact = function(){
		console.log('Adding contact...');
		$scope.contacts.$add({
			name: $scope.name,
			email: $scope.email,
			phone: $scope.phone
		}).then(function(Rootref){
			var id = Rootref.key();
			console.log('Added Contact '+id);
			$scope.name = '';
			$scope.email= '';
			$scope.phone ='';
		});

	}
	
	

	$scope.removeContact = function(contact){
		$scope.contacts.$remove(contact);
	}
	
}]);