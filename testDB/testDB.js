const MongoClient = require('mongodb').MongoClient;

const connection = (closure) =>
{
	return MongoClient.connect('mongodb://localhost:27017/testDB', (err, client) =>
	{
		if (err)
		{
			return console.log(err);
		}
		
		let db = client.db('testDB');
		closure(db);
	});
};

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!$[]#&*~@|_-().{}';
const randomChar = () =>
{
	return chars.charAt(Math.floor(Math.random() * chars.length));
}

let dbObj = [];

let seriesRoundsToGo = 0;
let series = '';

for (let videoIndex = 0; videoIndex < 15453; videoIndex++)
{
	if (seriesRoundsToGo === 0)
	{
		if (series)
		{
			series = '';
			seriesRoundsToGo = Math.ceil(Math.random() * 60);
		}
		else
		{
			let seriesLength = Math.max(6, Math.ceil(Math.random() * 12));
			for (let i = 0; i < seriesLength; i ++)
			{
				series += randomChar();
			}
			seriesRoundsToGo = Math.max(3, Math.ceil(Math.random() * 7));
		}
	}
	seriesRoundsToGo--;
	
	let randomFront = '';
	for (let i = 0; i < 8; i ++)
	{
		randomFront += randomChar();
	}
	
	let randomTail = '';
	let randomTailLength = Math.ceil(Math.random() * 16);
	for (let i = 0; i < randomTailLength; i ++)
	{
		randomTail += randomChar();
	}
	
	let fileName = (series ? series : randomFront) + ' file #' + videoIndex + ' ' + randomTail;
	
	newObj =
	{
		fileName:  fileName,
		fileSize: Math.ceil(Math.random() * 20000),
		lastModified: new Date(Date.now() - Math.floor(Math.random() * 4 * 31536000000)),
		time: Math.ceil(Math.random() * 5400),
		width: 320,
		height: 480,
		pending: Math.floor(Math.random() * 2) === 1
	};
	
	if (series)
	{
		newObj.series = series;
	}
	
	dbObj.push(newObj);
}

connection((db) =>
{
	db.collection('videos').insertMany(dbObj, (err, res) =>
	{
		if (err)
		{
			return console.log(err);
		}
		
		console.log("Number of documents inserted: " + res.insertedCount);
	});
});
