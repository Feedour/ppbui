'use strict';

angular.module('BattleUI',[])
.factory('watchersService', function($http) {
    return {
        getAll : function () {
            return $http.get('http://localhost:3000/watchers')
            .then((resp) => {
              console.log('resp :', resp);
              return resp.data;
            })
        }
    }
})
.controller('WatchersController', ['$scope', '$http', 'watchersService', function($scope, $http, watchersService) {

//const getAll = watcherService($http) ;
  $scope.title = 'Battle UI';
  this.title = 'Battle UI';
  $scope.watchers = [
    {_id:'5d519f611c4c022ad4e71940',id:'0',name:'Миг',alive:true,deathCnt:2}
  ];
  watchersService.getAll()
  .then((resp) => {
      console.log('resp :', resp);
      $scope.watchers = resp;
  })
    // $http.get('localhost:3000/watchers/')
    //   .then((resp) => {
    //     console.log('resp :', resp);
    //     return resp;
    //   })

}]);