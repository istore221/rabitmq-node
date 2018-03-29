const express = require('express')
const app = express()
var amqp = require('amqp');

var connection = amqp.createConnection({
	host: 'localhost',
	port: 5672,
	login: 'guest',
	password: 'guest'
});
  

// add this for better debuging 
connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});
 
// Wait for connection to become established. 
connection.on('ready', function () {

	var exchange = connection.exchange('node-pdf-exchange', {type: 'direct'}); // create if not exisist

	connection.queue('node-pdf-print', function (queue) { // create if not exist
		queue.bind(exchange, "pdf-print");
	})

	// express
	app.get('/publish1', (req, res) => {

		exchange.publish('pdf-print', "hello pdf");
		res.send('published one')
	})

	app.get('/publish2', (req, res) => {

		exchange.publish('my-style', "hello pdf");
		res.send('published two')
	})

	app.listen(process.env.PORT , () => console.log(`Web app listening on port ${process.env.PORT}`))
    


});





