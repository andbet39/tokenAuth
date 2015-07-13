/**
 * Created by andrea.terzani on 13/07/2015.
 */

app.controller('AuthController',  function($auth, $state,$http,$rootScope, $scope) {

    $scope.email='';
    $scope.password='';
    $scope.newUser={};
    $scope.loginError=false;
    $scope.loginErrorText='';

        $scope.login = function() {

            var credentials = {
                email: $scope.email,
                password: $scope.password
            }

            $auth.login(credentials).then(function() {

                return $http.get('api/authenticate/user');

            }, function(error) {
                $scope.loginError = true;
                $scope.loginErrorText = error.data.error;

            }).then(function(response) {

               // var user = JSON.stringify(response.data.user);

              //  localStorage.setItem('user', user);
                $rootScope.authenticated = true;
                $rootScope.currentUser = response.data.user;
                $scope.loginError = false;
                $scope.loginErrorText = '';

                $state.go('todo');
            });
        }

        $scope.register = function () {

            $http.post('/api/register',$scope.newUser)
                .success(function(data){
                    $scope.email=$scope.newUser.email;
                    $scope.password=$scope.newUser.password;
                    $scope.login();
            })

        };


});