
// server request for categy menu list for output. TODO : check why is calling two times !!!!!!

 applicaton.controller('categoryShower', ['$scope','$http',function(scope,http){
    
  // server  request with http angular.js, taking category list from JSON
                   http.get('/getcategories')
                     .success(function(result){
                        scope.categories = result;
                     });
                     
 }]);

// module controller that update category list

applicaton.controller('categoryController',['$scope','$http','$stateParams','$location',function(scope,http,stateParams,location)
        {
           
         scope.pageView = stateParams.page;
         
            if(stateParams.page != undefined){
                  http.get('/getSpecificCategory/' + stateParams.page)
                      .success(function(result){
                      scope.specificList = result;
                  });
            }
           
 }]);
 
applicaton.controller('searchFilter',['$scope','$http','$filter',function(scope,http,filter){

      console.log("search 1: ");
            http.get('/searchFunctionality')
                     .success(function(result){
         
         console.log("search 2: " + result);
         scope.clearSearch = function(){
               scope.searchName= '';
         };
                                     
        scope.$watch('searchName',function(sN){
          
            scope.filteredGames = filter('filter')(result, sN);
        })            
       });
    
}])

// module controller that insert specific .html game page


applicaton.controller('gamesController', ['$scope','$http','$sce','$stateParams',function(scope,http,sce,stateParams){     
           
    http.get('/'+stateParams.category+'/'+stateParams.id)
        .success(function(result){
		scope.Game = result.gameDetails;
		scope.relatedGames = result.relatedGames;
      scope.gameFrame = sce.trustAsHtml('<iframe allowfullscreen width="80%" height="600px" src="'+ scope.Game.url +'"></iframe>');
    }); 
    }]);
 
applicaton.controller('homeController', ['$scope','$http','$q',function(scope,http,q){     

       console.log("news 1: ");
      http.get('/homeNews')
         .success(function(result){
               console.log("news 2: "+result);
            scope.NewsGames = result;
         })       
 }]);
 

