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
 

connection.on('ready', function () {

	
	connection.queue('my-own-queue', function (queue) {  // asuuming that this quie is already declared somewhere


	  	queue.subscribe(function (message, headers, deliveryInfo, ack) {

				console.log('Got a message with routing key ' + deliveryInfo.routingKey );

		});

	});



})