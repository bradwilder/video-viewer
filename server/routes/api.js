const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const database = 'viewer';
//const database = 'test';

// Connect
const connection = (closure) =>
{
	return MongoClient.connect('mongodb://localhost:27017/' + database, (err, client) =>
	{
		if (err)
		{
			return console.log(err);
		}
		
		let db = client.db(database);
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

// API
const basePath = '/Volumes/YO/YO/jb';
//const basePath = '/Volumes/YO/temp';

const pendingPath = path.resolve(basePath, 'pendingvids');
const videosPath = path.resolve(basePath, 'vids');
const thumbPath = path.resolve(basePath, 'thumbs');

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

router.get('/series', (req, res) =>
{
	connection((db) =>
	{
		db.collection('videos').distinct("series").then((series) =>
		{
			response.data = series;
			res.json(response);
		})
		.catch((err) =>
		{
			sendError(err, res);
		});
	});
});

router.post('/updatePending', (req, res) =>
{
	let newVideo =
	{
		pending: req.body.pending
	};
	
	fs.rename(path.resolve(pendingPath, req.body.fileName), path.resolve(videosPath, req.body.fileName), (err) =>
	{
		if (err)
		{
			sendError(err, res);
			return;
		}
		
		connection((db) =>
		{
			db.collection('videos').updateOne
			(
				{_id: ObjectID(req.body._id)},
				{$set: newVideo},
				(err, dbRes) =>
				{
					if (err)
					{
						sendError(err, res);
					}
					else
					{
						res.json(response);
					}
				}
			);
		});
	});
});

router.post('/deleteVideos', (req, res) =>
{
	req.body.forEach((video) =>
	{
		try
		{
			const videoFileName = path.resolve(video.pending ? pendingPath : videosPath, video.fileName);
			fs.unlinkSync(videoFileName);
			
			const thumbFileName = path.resolve(thumbPath, video.fileName.slice(0, -4) + '.png');
			fs.unlinkSync(thumbFileName);
			
			connection((db) =>
			{
				db.collection('videos').remove
				(
					{_id: ObjectID(video._id)},
					(err, dbRes) =>
					{
						if (err)
						{
							sendError(err, res);
							return;
						}
					}
				);
			});
		}
		catch (err)
		{
			sendError(err, res);
			return;
		}
	});
	
	res.json(response);
});

router.get('/thumb', (req, res) =>
{
	if (fs.existsSync(thumbPath))
	{
		const fileName = path.resolve(thumbPath, req.query.name + '.png');
		let img = fs.readFileSync(fileName);
		let imgBase64 = new Buffer(img).toString('base64');
		
		response.data =
		{
			img: imgBase64,
			hasFullSize: false
		}
		
		if (sizeOf(fileName).height > 864)
		{
			response.data.hasFullSize = true;
		}
	}
	else
	{
		response.data = null;
	}
	
	res.json(response);
});

module.exports = router;