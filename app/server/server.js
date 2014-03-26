var express = require('express');
var app = express();



var getStories = function() {
	var tempArray = [ {
		id : 0,
		title : 'Story 00',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'Back Log',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 1,
		title : 'Story 01',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'To Do',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 2,
		title : 'Story 02',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'To Do',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'

	}, {
		id : 3,
		title : 'Story 03',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'In progress',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 4,
		title : 'Story 04',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'Code Review',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 5,
		title : 'Story 05',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'Verified',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 6,
		title : 'Story 06',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'Done',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {
		id : 7,
		title : 'Story 07',
		description : 'Description pending.',
		criteria : 'Criteria pending.',
		status : 'Done',
		type : 'Feature',
		reporter : 'knuthp',
		assignee : 'Gunhild'
	}, {} ];
	return tempArray;
};

var stories = getStories();

//Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('i am a beautiful butterfly');
});


app.get('/rest/story', function (req, res) {
	res.json(stories);
});

app.post('/rest/story', function(req, res) {
	console.log(req);
//	stories.push(req.body);
	res.send(200);
});


app.listen(process.env.PORT || 4730);