var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {
//make a method addNewGame This method is going to take in a gameObject// as the
//parameter That gameObj will eventually have data about each individual game that we'll send to parse.

    this.addNewGame = function(gameObj) {
        var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
        if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
            gameObj.won = true;
        } else {
            gameObj.won = false;
        }
//Under your if statement, we're going make a POST request to parse to our URL we made earlier,
// sending gameObj as the data. So, return the result of making an $http request with the 'method'
//of 'POST', the 'url' being the URL variable we made earlier, and 'data' being our gameObj.
        return $http({
            method: "POST",
            url: url,
            data: gameObj
        })
    }

        this.getTeamData = function(team) {
            var deferred = $q.defer();
            var url = 'https://api.parse.com/1/classes/' + team;
            $http({
                method: "GET",
                url: url
            })
            .then(function(data) {
                var results = data.data.results;
                var wins = 0;
                var losses = 0;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].won === true) {
                        wins++;
                    } else {
                        losses++;
                    }
                }
                results.wins = wins;
                results.losses = losses;
                deferred.resolve(results)
                console.log(results)
            })
            return deferred.promise;
        }

});
