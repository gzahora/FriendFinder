var friends = require("../data/friends");

module.exports = function (app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    console.log(req.body);

    var user = req.body;
    var userScore = user.scores;

    var bestMatchIndex = 0;
    var totalDiff = 1000;


    for (var i = 0; i < friends.length; i++) {
      var scoreDiff = 0;

      for (var j = 0; j < friends[i].scores.length; j++) {
				scoreDiff += Math.abs(friends[i].scores[j] - userScore[j]);
      }
      
      if (scoreDiff < totalDiff) {
        bestMatchIndex = i;
        totalDiff = scoreDiff;

			}
    }

    friends.push(user);

		// Send appropriate response
    res.json(friends[bestMatchIndex]);

  })
};