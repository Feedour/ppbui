'use strict';
const cardInLine = 5;

angular.module('BattleUI',[])
.factory('watchersService', function($http) {
    return {
        getAll : function () {
            return $http.get('http://95.163.181.14:3000/watchers')
            //return $http.get('http://localhost:3000/watchers')
            .then((resp) => {
              console.log('resp :', resp);
              return resp.data;
            })
        },
        heal: function (id) {
          return $http.get(`http://95.163.181.14:3000/heal/${id}`)
          //return $http.get(`http://localhost:3000/heal/${id}`)
          .then((resp) => {
            console.log('resp :', resp);
            return resp.data;
          })
        }
    }
})
.controller('WatchersController', ['$scope', '$http', 'watchersService',function($scope, $http, watchersService) {

//const getAll = watcherService($http) ;
  $scope.cardInLine = cardInLine;
  $scope.title = 'Battle UI';
  this.title = 'Battle UI';
  $scope.watchers = [
    {_id:'5d519f611c4c022ad4e71940',id:'0',name:'Миг',alive:true,deathCnt:2}
  ];
  watchersService.getAll()
  .then((resp) => {
      console.log('resp :', resp);
      $scope.watchers = resp;
      const watchersByMission = _.groupBy(resp, 'mission');
      const chunkedWatchersByMission = _.reduce(watchersByMission, (result, value, key) => {
        result[key] = _.chunk(value, cardInLine);
        return result;
      }, {});

      $scope.heal = watchersService.heal;

      $scope.watchersByMission = chunkedWatchersByMission;
      console.log('$scope.watchersByMission :', $scope.watchersByMission);
      $scope.chunkedWatchers = _.chunk(resp, cardInLine)
  })
    // $http.get('http://95.163.181.14:3000/watchers/')
    //   .then((resp) => {
    //     console.log('resp :', resp);
    //     return resp;
    //   })

}]);