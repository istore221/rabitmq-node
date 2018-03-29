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

	
	var exchange = connection.exchange('node-pdf-exchange', {type: 'direct'}) // create if not exisist else use exisiting


	connection.queue('node-pdf-print', function (queue) { // create if not exisist or get exisiting

		queue.bind(exchange, "pdf-print");

	  	console.log('Queue ' + queue.name + ' is open at consumer 1');

	  	queue.subscribe(function (message, headers, deliveryInfo, messageObject) {

				console.log('Got a message with routing key ' + deliveryInfo.routingKey );

		});

	});



})