var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {
//make a method addNewGame This method is going to take in a gameObject// as the
//parameter That gameObj will eventually have data about each individual game that we'll send to parse.

    this.addNewGame = function(gameObj) {//gameObj is the newGame we created. see line 6 in teamCtrl
        var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
        if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) { //check to see who won
            gameObj.won = true; //set won property
        } else {
            gameObj.won = false;
        }
//Under your if statement, we're going make a POST request to parse to our URL we made earlier,
// sending gameObj as the data. So, return the result of making an $http request with the 'method'
//of 'POST', the 'url' being the URL variable we made earlier, and 'data' being our gameObj.
        return $http({ //return the http becuse we are posting this new data to the server
            method: "POST", //posing data to the server
            url: url,
            data: gameObj //newGame from Ctrl with info like "wins", "score", "opposingTeam"
        })
    }

//purpose of this function is to retreive team record which is on the server.
        this.getTeamData = function(team) { //the team param is the $scope.newGame.homeTeam in controller. see line 30
            var deferred = $q.defer(); //set up a promise to resolve later
            var url = 'https://api.parse.com/1/classes/' + team;
            $http({
                method: "GET", //retrieve the data
                url: url
            })
            .then(function(data) { //the data param is used to catch the web response
                var results = data.data.results; //filter down the web response to the results we want, assign to var
                var wins = 0; //wins counter
                var losses = 0;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].won === true) {
                        wins++;
                    } else {
                        losses++;
                    }
                }
                results.wins = wins; //add new property to our data
                results.losses = losses;
                deferred.resolve(results) //resolve the promising, passing in our filtered data, is ready to go back to ctrl
                console.log(results) //THIS! REMEMBER TO CONSOLE RESULTS!!!
            })
            return deferred.promise; //send back to calling funcion
        }

});
