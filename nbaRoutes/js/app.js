var app = angular.module('nbaRoutes', ['ui.router']);


app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    // routing configuration code. $stateProvider object goes below
    $stateProvider //provides the "states/views"
        .state("home", { //.state("stateName") declares a new state
            url: "/",
            templateUrl: "js/home/homeTmpl.html", //the file path
            controller: "homeCtrl", //each state has it's own controller
            views: { //individual views
                "utahjazz": {
                    templateUrl: "js/teams/teamTmpl.html",
                    controller: "teamCtrl",
                    resolve: { teamData: //resolve a promise
                        function(teamService) {//inject team service
                            return teamService.getTeamData("utahjazz");

                        }
                    }
                },
                "losangeleslakers": {
                    templateUrl: "js/teams/teamTmpl.html",
                    controller: "teamCtrl",
                    resolve: { teamData:
                        function(teamService) {
                            return teamService.getTeamData("losangeleslakers");
                        }
                    }
                },
                "miamiheat": {
                    templateUrl: "js/teams/teamTmpl.html",
                    controller: "teamCtrl",
                    resolve: { teamData:
                        function(teamService) {
                            return teamService.getTeamData("miamiheat");
                        }
                    }
                }
            }
        })
        .state("teams", {
            url: '/teams/:team', //$stateParams
            templateUrl: "js/teams/teamTmpl.html",
            controller: "teamCtrl",
            resolve:{ //resolve a promise
                teamData: function(teamService, $stateParams) {
                    //inject teamService
                    return teamService.getTeamData($stateParams.team);
                    //$stateParams.team is up on line 46
            }
        }
        })

        $urlRouterProvider.otherwise('/');
        //default view/state

});
