const app = require('express')();
const http = require('http').Server(app);
const market = require('./market');
const bodyParser = require("body-parser");
const io = require('socket.io')(http);

const port = 3000;

var cors = require('cors');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/market', (req, res) => {
	res.send(market.marketPositions);
});


app.post('/api/updateMessagSend', (req, res) => {
	market.updateMarket();
	 const userName = req.body.user;
	  console.log("User name = ",userName);
	  
	// SEND DATA TO CLIENT

	// TO 
	io.sockets.emit(`send/new/message/${userName}`, { "date": Date.now(), "close": 68.55, "open": 74.55, 'bg': genaratehexaColor() });
	res.send({});
});

function genaratehexaColor(){
	return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

// setInterval(function () {
// 	market.updateMarket();
// 	io.sockets.emit('market', market.marketPositions[0]);
// }, 15000);


// ESTABLISH SOCKET CONNECTION
io.on('connection', function (socket) {
	console.log('User connected');
});


http.listen(port, () => {
	console.log(`Listening on *:${port}`);
});