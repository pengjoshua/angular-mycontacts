'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

// Contacts Controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  // Init Firebase
  let ref = firebase.database().ref();

  // Get Contacts
  $scope.contacts = $firebaseArray(ref);
  // console.log($scope.contacts);

  // Show Add Form
  $scope.showAddForm = function() {
    $scope.addFormShow = true;
  };

  // Show Edit Form
  $scope.showEditForm = function(contact) {
    $scope.editFormShow = true;

    $scope.id			          = contact.$id;
		$scope.name 			      = contact.name;
		$scope.email 			      = contact.email;
		$scope.company 			    = contact.company;
		$scope.work_phone 		  = contact.phones[0].work;
		$scope.home_phone 		  = contact.phones[0].home;
		$scope.mobile_phone 	  = contact.phones[0].mobile;
		$scope.street_address 	= contact.address[0].street_address;
		$scope.city 			      = contact.address[0].city;
		$scope.state 			      = contact.address[0].state;
		$scope.zipcode 		    	= contact.address[0].zipcode;
  };

  // Hide Forms
  $scope.hide = function() {
    $scope.addFormShow = false;
    $scope.contactShow = false;
  };

  // Submit Contact
	$scope.addFormSubmit = function() {
		console.log('Adding Contact...');

		// Assign Values
		// if($scope.name){ let name = $scope.name; } else { let name = null; }
		// if($scope.email){ let email = $scope.email; } else { let email = null; }
		// if($scope.company){ let company = $scope.company; } else { let company = null; }
		// if($scope.mobile_phone){ let mobile_phone = $scope.mobile_phone; } else { let mobile_phone = null; }
		// if($scope.home_phone){ let home_phone = $scope.home_phone; } else { let home_phone = null; }
		// if($scope.work_phone){ let work_phone = $scope.work_phone; } else { let work_phone = null; }
		// if($scope.street_address){ let street_address = $scope.street_address; } else { let street_address = null; }
		// if($scope.city){ let city = $scope.city; } else { let city = null; }
		// if($scope.state){ let state = $scope.state; } else { let state = null; }
		// if($scope.zipcode){ let zipcode = $scope.zipcode; } else { let zipcode = null; }
		$scope.name = $scope.name || null;
		$scope.email = $scope.email || null;
		$scope.company = $scope.company || null;
		$scope.mobile_phone = $scope.mobile_phone || null;
		$scope.home_phone = $scope.home_phone || null;
		$scope.work_phone = $scope.work_phone || null;
		$scope.street_address = $scope.street_address || null;
		$scope.city = $scope.city || null;
		$scope.state = $scope.state || null;
		$scope.zipcode = $scope.zipcode || null;

		// Build Object
		$scope.contacts.$add({
			name: $scope.name,
			email: $scope.email,
			company: $scope.company,
			phones: [
				{
					mobile: $scope.mobile_phone,
					home: $scope.home_phone,
					work: $scope.work_phone
				}
			],
			address: [
				{
					street_address: $scope.street_address,
					city: $scope.city,
					state: $scope.state,
					zipcode: $scope.zipcode
				}
			]
		}).then(function(ref){
			let id = ref.key();
			console.log('Added Contact with ID: ' + id);

			// Clear Form
			clearFields();

			// Hide Form
			$scope.addFormShow = false;

			// Send Message
			$scope.msg = "Contact Added";
		});
	};

  $scope.editFormSubmit = function() {
    console.log('Updating Contact...');

    // Get ID
    let id = $scope.id;

    // Get Record
    let record = $scope.contacts.$getRecord(id);

    // Assign Values
		record.name 						          = $scope.name;
		record.email 						          = $scope.email;
		record.company 						        = $scope.company;
		record.phones[0].work 				    = $scope.work_phone;
		record.phones[0].home 			    	= $scope.home_phone;
		record.phones[0].mobile 		  	  = $scope.mobile_phone;
		record.address[0].street_address 	= $scope.street_address;
		record.address[0].city 				    = $scope.city;
		record.address[0].state 			    = $scope.state;
		record.address[0].zipcode 			  = $scope.zipcode;

    // Save Contact
    $scope.contacts.$save(record).then(function(ref) {
      console.log(ref.key);
    });

    clearFields();

    // Hide Form
    $scope.editFormShow = false;

    $scope.msg = 'Contact Updated';
  };

  $scope.showContact = function(contact) {
    console.log('Getting Contact...');

    $scope.name             = contact.name;
    $scope.email            = contact.email;
		$scope.company          = contact.company;
		$scope.work_phone       = contact.phones[0].work;
		$scope.home_phone       = contact.phones[0].home;
		$scope.mobile_phone     = contact.phones[0].mobile;
		$scope.street_address	  = contact.address[0].street_address;
		$scope.city	            = contact.address[0].city;
		$scope.state            = contact.address[0].state;
		$scope.zipcode          = contact.address[0].zipcode;

		$scope.contactShow = true;
  };

  $scope.removeContact = function(contact) {
    console.log('Removing Contact...');

    $scope.contacts.$remove(contact);

    $scope.msg = 'Contact Removed';
  };

  // Clear $scope Fields
	function clearFields() {
		console.log('Clearing All Fields...');

		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	};
}]);
