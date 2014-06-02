"use strict";angular.module("tedApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl"}).state("home.video",{url:"video/{talkId:[0-9]}",views:{"":{templateUrl:"views/main.video.html",controller:"VideoCtrl"}}})}]),angular.module("tedApp").controller("MainCtrl",["$rootScope","$scope","$resource",function(a,b,c){a.feed=[];var d=c("https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A//feeds.feedburner.com/TEDTalks_video",{},{fetch:{method:"JSONP",params:{v:"1.0",callback:"JSON_CALLBACK",num:10}}});d.fetch().$promise.then(function(b){var c=0,d=/<img\s.+\>/g;b.responseData.feed.entries.forEach(function(a){a.ind=c,a.title=a.title.slice(4),a.content=a.content.replace(d,""),c++}),a.feed=b.responseData.feed.entries})}]),angular.module("tedApp").controller("VideoCtrl",["$rootScope","$scope","$state","$stateParams",function(a,b,c,d){b.feed=a.feed[d.talkId],b.url=b.feed.mediaGroups[0].contents[0].url,b.removeHandler=function(){c.go("home")}}]),angular.module("tedApp").directive("dynamicUrl",function(){return{restrict:"A",link:function(a,b){b.attr("src",a.url)}}});