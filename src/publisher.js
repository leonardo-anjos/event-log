const STAN = require('node-nats-streaming');
const nuid = require('nuid');

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

const cluster_id = 'cluster_id';
const client_id = 'client_id-' + nuid.next() ;
const subject = 'subject-EVENTELOG';
const max = process.argv[3] || 1;

const sc = STAN.connect(cluster_id, client_id, opts);

sc.on('connect', () => {
	console.log(`Connected to: ${sc.currentServer}`);
	console.log(`Maximum Payload Size: ${sc.subscriptionOptionsinfo}`);

	for (let i = 1; i <= max; i++) {

		const req = {
			id_req_log: nuid.next(),
			id_cons: nuid.next(),
			endpoint_req_log: "/req",
			supplier_req_log: "supplier_req_log",
			data_hora_req_log: "2019-07-22 17:37:56.421678",
			header_req_log: "header_req_log " + nuid.next(),
			payload_req_log: "payload_req_log " + nuid.next()
		}

		const res = {
			id_res_log: nuid.next(),
			id_cons: nuid.next(),
			endpoint_res_log: "/res",
			supplier_res_log: "supplier_res_log",
			data_hora_res_log: "2019-07-22 17:37:56.421678",
			status_res_req_log: "200",
			header_res_log: "header_res_log " + nuid.next(),
			payload_res_log: "payload_res_log " + nuid.next()
		}

		// convert request message to string handler exceptions
		const convertedMessageReq = JSON.stringify(req);
		sc.publish(subject, convertedMessageReq, (err, guid) => {
			if (err) {
				console.log(err);
				process.exit(1);
			} else {
				console.log(`[REQUEST ${i}/${max}] Published to ${subject} (${guid}) -> '${convertedMessageReq}'`);
			}
		});
	}
});

sc.on('error', (reason) => {
	console.log(reason);
	process.exit(1);
});