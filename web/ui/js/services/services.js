'use strict';
//simple stub that could use a lot of work...
TM.factory('RESTService',
 function ($http,$rootScope) {
		
     return {
         get: function (url, callback) {
             return $http({method: 'GET', url: url}).
                 success(function (data, status, headers, config) {
                     callback(data);
                     //console.log(data.json);
                 }).
                 error(function (data, status, headers, config) {
                     console.log("failed to retrieve data");
                 });
         },
         getAllItems: function(){
             return $http({method: 'get', url: 'http://127.0.0.1:8080/manner-ci/rest/items'}).
             success(function (data, status, headers, config) {
                 //callback(data);
             	console.log(data);
             	alert("getAllItems  查找数据成功！");
             	$rootScope.listItems=data;
             }).error(function (data, status, headers, config) {
                 console.log("failed");
                 });
         },
         getItemsByOwner: function(ownerId){
         	if(ownerId == ""){
         		alert("请输入。。。");
         		return ;
         	}else{
         	console.log(ownerId);
         	 return $http({method: 'get', url: 'http://127.0.0.1:8080/manner-ci/rest/items/'+ownerId}).
              success(function (data, status, headers, config) {
                  //callback(data);
              	console.log(data);
              	alert("getItemsByOwner  查找数据成功！");
              	$rootScope.listItems=data;
              }).error(function (data, status, headers, config) {
                  console.log("failed");
                  });
         	}
         },
         deleteItem: function(id){
         	return $http({method:'delete',url:'http://127.0.0.1:8080/manner-ci/rest/items/'+id}).
         	success(function (data, status, headers, config) {
                 //callback(data);
             	console.log(data);
             	alert(data);
             }).
         	error(function (data, status, headers, config) {
                 console.log("failed");
             });
         }
     };
 }
);

//items
TM.factory('Items', [ '$resource','TM.config',function($resource,config) {
    return $resource( config.RESTAPIBASEURL+'items', {}, {
        'query' : {
            method : 'GET',
            isArray : false,
            cache : false,
            responseType:'json'
        },
        'update' : {}
    });
} ]);
//Users
TM.factory('Users', [ '$resource','TM.config',function($resource,config) {
    return $resource( config.RESTAPIBASEURL+'users', {}, {
        'query' : {
            method : 'GET',
            isArray : false,
            cache : false,
            responseType:'json'
        },
        'update' : {}
    });
} ]);
//User
mannerServices.factory('User', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/manner-ci/api/users', {}, {
		'query' : {
			url:'http://localhost:8080/manner-ci/api/users/:userId',
			method : 'GET',
			cache : false
		},
		'save' : {
			url:'http://localhost:8080/manner-ci/api/users/:userId',
			method:'POST'
		},
		'delete':{
			url:'http://localhost:8080/manner-ci/api/users/:userId',
			method:'DELETE',
			cache:false
		},
		'update':{
			url:'http://localhost:8080/manner-ci/api/users/:userId',
			method:'PUT',
			params:{
			},
			cache:false
		},
	});
} ]);



//simple auth service that can use a lot of work... 
TM.factory('AuthService',
 function () {
     var currentUser = null;
     var authorized = false;

     // initMaybe it wasn't meant to work for mpm?ial state says we haven't logged in or out yet...
     // this tells us we are in public browsing
     var initialState = true;

     return {
         initialState: function () {
             return initialState;
         },
         login: function (name, password) {
             currentUser = name;
             authorized = true;
             //console.log("Logged in as " + name);
             initialState = false;
         },
         logout: function () {
             currentUser = null;
             authorized = false;
         },
         isLoggedIn: function () {
             return authorized;
         },
         currentUser: function () {
             return currentUser;
         },
         authorized: function () {
             return authorized;
         }
     };
 }
);