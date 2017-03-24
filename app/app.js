'use strict';

// Declare app level module which depends on views, and components
angular.module('myContacts', [
  'ngRoute',
  'firebase',
  'myContacts.contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyD6MKN3ROwCpUdbqtBbHCKBwqcRjMLtdx8",
    authDomain: "mycontacts-6a99d.firebaseapp.com",
    databaseURL: "https://mycontacts-6a99d.firebaseio.com",
    storageBucket: "mycontacts-6a99d.appspot.com",
    messagingSenderId: "486354792943"
  };
  firebase.initializeApp(config);
}]);
