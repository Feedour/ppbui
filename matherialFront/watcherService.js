'use strict';

angular.module('BattleUI',[])
  .service('watcherService', WatcherService);

function WatcherService($http){
        this.loadAll =  () => {
            return $http.get('localhost:3000/watchers/')
              .then((resp) => {
                console.log('resp :', resp);
                return resp;
              })
        
    }
}