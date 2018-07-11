(function (angular) {
    const app = angular.module('jwt-demo', []);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["Content-type"] = 'application/json';
    }]);

    app.value('JWTValue', {
        token: null
    });

    app.service('LoginService', ['$http', 'JWTValue', function ($http, JWTValue) {
        return {
            login(name, password) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:8081/api/login',
                    data: {
                        name,
                        password
                    }
                });
            },
            logout() {
                JWTValue.token = null;
                $http.defaults.headers.common["Authorization"] = undefined;
            },
            isLoggedIn() {
                return JWTValue.token !== null;
            },
            handleToken(token) {
                JWTValue.token = token;
                $http.defaults.headers.common["Authorization"] = `bearer ${JWTValue.token}`;
            }
        };
    }]);

    app.controller('LoginCtrl', ['LoginService', function (LoginService) {
        this.login = (username, password) => {
            LoginService.login(username, password).then(response => {
                if (response.data.token) {
                    LoginService.handleToken(response.data.token);
                }
            });
        };

        this.logout = () => {
            LoginService.logout();
        };

        this.isLoginFormVisible = () => {
            return !LoginService.isLoggedIn();
        };
    }]);

    app.service('ResourceDAO', ['$http', function ($http) {
        return {
            getResource1() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/api/protected1'
                });
            },
            getResource2() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/api/protected2'
                });
            },
            getPublicResource() {
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/api/public'
                });
            }
        };
    }]);

    app.controller('DemoController', ['ResourceDAO', 'LoginService', function (ResourceDAO, LoginService) {
        this.text = null;

        this.button0 = () => {
            ResourceDAO.getPublicResource().then(({ data }) => {
                this.text = data.text;
            });
        };

        this.button1 = () => {
            ResourceDAO.getResource1().then(({ data }) => {
                this.text = data.text;
            });
        };

        this.isButton1Disabled = () => {
            return !LoginService.isLoggedIn();
        };

        this.isButton2Disabled = () => {
            return !LoginService.isLoggedIn();
        };

        this.button2 = () => {
            ResourceDAO.getResource2().then(({ data }) => {
                this.text = data.text;
            });
        };
    }]);

})(window.angular);
