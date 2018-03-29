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
 

// if this consumer is not up even thru publisher send message to this my-own-queue via exhcnage messages will be lost as it is not declared in production

// Wait for connection to become established. 
connection.on('ready', function () {

	
	var exchange = connection.exchange('node-pdf-exchange', {type: 'direct'}) // create if not exisist


	connection.queue('my-own-queue', function (queue) { // create if not exisist

		queue.bind(exchange, "my-style");

	  	console.log('Queue ' + queue.name + ' is open at consumer 2');

	  	queue.subscribe(function (message, headers, deliveryInfo, ack) {

				console.log('Got a message with routing key ' + deliveryInfo.routingKey );

		});

	});



})