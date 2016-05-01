// creating page module and and injecting new ui.router, ngSanitize modules
var applicaton = angular.module("appUsed", ['ui.router','ngSanitize'] );

// module configuration links to update views in page
applicaton.config(function($stateProvider, $locationProvider){
                $stateProvider
                // inserting filtersGame_page.html in page by link decision category/:page
                    .state('0',{
                    url:"/category/{page}",
                    views: {
                        "filtered-games" : {
                            templateUrl:"partials/filters_page.html",
                            controller: 'categoryController'
                        }}})
                // inserting game_page.html in page by link decision /game/:id
                 .state('1', {
                    url:"/category/{category}/game/{id}",
                    views : {
                        "game-view" : {
                        templateUrl: "partials/game_page.html",
                            controller:'gamesController'
                    }}})
                .state('2',{
                    url:"",
                    views :{
                        "home-page" :
                        {
                            templateUrl:"partials/home_page.html",
                            controller: 'homeController'
                        }}})
                
 });















