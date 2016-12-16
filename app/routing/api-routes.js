var friendData = require('../data/friends.js');

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

	app.post('/api/friends', function(req, res){
		for(i=0; i<req.body.scores.length; i++){
			var interized = parseInt(req.body.scores[i]);
			req.body.scores[i] = interized;
		}

		friendData.push(req.body);

		var bestMatch = 0;
		var lowestDiff = 40;

		for(i=0; i<friendData.length-1; i++){
			var totalDifference = 0;

			for(j=0; j<friendData[i].scores.length; j++){
				totalDifference += Math.abs(friendData[i].scores[j] - req.body.scores[j]);
			}

			if (totalDifference < lowestDiff){
				bestMatch = i;
				lowestDiff = totalDifference;
			}
		}

		res.send(friendData[bestMatch]);
	});
};