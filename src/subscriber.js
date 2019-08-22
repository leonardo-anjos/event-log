const STAN = require('node-nats-streaming');

// const dataSource = require('./persistence/connect');

const servers = [
	'nats://localhost:4222',
	// 'nats://localhost:14222',
	// 'nats://localhost:24222',
	// 'nats://localhost:34222'
];

const cli_id = process.argv[2] || '1';
const serverUrl = servers[cli_id];

const opts = {
	url: serverUrl,
	reconnect: true,
	user: 'natssuser',
	pass: 'natsspass'
};

const cluster_id = 'estaleiro-addon';
const client_id = 'client-sub-conectagov-' + cli_id ;
const durable_name = 'durable-conectagov';
const queue = 'queue-conectagov';
const subject = 'subject-conectagov';

const stan = STAN.connect(cluster_id, client_id, opts);

stan.on('connect', function () {
	console.log(`STAN connected to '${serverUrl}'!`);
	const opts = stan.subscriptionOptions()
										.setDurableName(durable_name)
										.setDeliverAllAvailable()
										.setManualAckMode(true);

	const subscription = stan.subscribe(subject, queue, opts);

	subscription.on('error', (err) => {
		console.log(`subscription for '${subject}' raised an error: ${err}`);
	});

	subscription.on('unsubscribed', () => {
		console.log(`unsubscribed to '${subject}'`);
	});

	subscription.on('ready', () => {
		console.log(`subscribed to '${subject}'`);
		console.log(`client is '${client_id}'`);
	});

	subscription.on('message', (msg) => {
		console.log(`|${client_id}| [${msg.getSubject()}]`, `(${msg.getSequence()})`, msg.getData());
		// dataSource.saveLogReq()
		msg.ack();
	});
});

stan.on('error', (reason) => {
	console.log(reason);
});