const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) =>
{
	return MongoClient.connect('mongodb://localhost:27017/viewer', (err, client) =>
	{
		if (err)
		{
			return console.log(err);
		}
		
		let db = client.db('viewer');
		closure(db);
	});
};

// Error handling
const sendError = (err, res) =>
{
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response =
{
	status: 200,
	data: [],
	message: null
};

// Get videos
router.get('/videos', (req, res) =>
{
	connection((db) =>
	{
		db.collection('videos').find().sort({fileName: 1}).toArray().then((videos) =>
		{
			response.data = videos;
			res.json(response);
		})
		.catch((err) =>
		{
			sendError(err, res);
		});
	});
});

module.exports = router;