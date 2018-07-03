(function(angular) {
    const app = angular.module('jwt-demo', []);

    app.service('ResourceDAO', ['$http', function($http) {
        return {
            getResource() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/api/resource'
                });
            }
        };
    }]);

    app.controller('DemoController', ['ResourceDAO', function(ResourceDAO) {
        return {
            button1 () {
                console.log('BUTTON 1 MOCK');
                ResourceDAO.getResource().then((data) => {
                    console.log(data);
                })
            }
        };
    }]);
    
})(window.angular);
