var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

    $scope.teamData = teamData;
    $scope.newGame = {}; //newGame obj starts out emtpy in order to build it up
    $scope.showNewGameForm = false; //newGameForm is hidden by default
    $scope.toggleNewGameForm = function() { //on click, toggles visibility of newGameForm
        $scope.showNewGameForm = !$scope.showNewGameForm;
    }
    //once you click an <a ui-sref="sdfsd" tag, it changes the $stateParams
    if ($stateParams.team === 'utahjazz') { //if at a certain state
        $scope.homeTeam = "Utah Jazz"; //display certain info
        $scope.logoPath = 'images/jazz-logo.png'; //display certain pictures
    } else if ($stateParams.team === 'losangeleslakers') {
        $scope.homeTeam = "Los Angeles Lakers";
        $scope.logoPath = 'images/lakers-logo.png';
    } else if ($stateParams.team === 'miamiheat') {
        $scope.homeTeam = "Miami Heat";
        $scope.logoPath = 'images/heat-logo.png';

    }

    $scope.submitGame = function() { //once invoked
        $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
        //take homeTeam and convert it to its variable name
        teamService.addNewGame($scope.newGame) //pass newGame object to service
        //this funciton posts the newGame data to the server
            .then(function() {//WHAT IS THIS FIRST PROMISE DOING?
                teamService.getTeamData($scope.newGame.homeTeam)
                //invoke this method to retreive the data from the server, using
                //$scope parameters
                .then(function(data){// get the data back with a promise, using
                    //data param to catch results. see line 44 in service.
                    $scope.teamData = data;//assign data from service to $scope
                    $scope.newGame = {}; //reset newGame object
                    $scope.showNewGameForm = false; //close newGameForm
                })
            })
        }





});
