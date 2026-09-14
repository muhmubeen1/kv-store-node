// scripts/test-client.js
const net = require('net');

const client = net.createConnection({ port: 6379 }, () => {
    console.log('Connected to custom Redis server!');

    // Send PING
    console.log('Sending: PING');
    client.write('PING\r\n');
});

client.on('data', (data) => {
    console.log('Received from server:\n' + data.toString());
    client.end();
});