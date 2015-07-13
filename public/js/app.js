var app = angular.module('todoApp', ['ui.router', 'satellizer'])
    .config(function($stateProvider, $urlRouterProvider, $authProvider,$provide) {

        $authProvider.loginUrl = '/api/authenticate';

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/js/tpl/login.html',
                controller: 'AuthController'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/js/tpl/register.html',
                controller: 'AuthController'
            })
            .state('todo', {
            url: '/todo',
            templateUrl: '/js/tpl/todo.html',
            controller: 'TodoController'
        });

        function redirectWhenLoggedOut($q, $injector) {
            return {
                responseError: function (rejection) {
                    var $state = $injector.get('$state');
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            localStorage.removeItem('user');
                            $state.go('login');
                        }
                    });

                    return $q.reject(rejection);
                }
            }
        }

        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    });
