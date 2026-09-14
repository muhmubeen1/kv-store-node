// src/server.js
const net = require('net');
const store = require('./store');
const { parseRESP, encodeRESP } = require('./parser');

const PORT = 6379;

const server = net.createServer((socket) => {
    console.log(`[+] Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (buffer) => {
        try {
            const args = parseRESP(buffer);
            if (!args || args.length === 0) return;

            const command = args[0].toUpperCase();

            switch (command) {
                case 'PING':
                    socket.write(encodeRESP('PONG'));
                    break;

                case 'SET':
                    if (args.length < 3) {
                        socket.write('-ERR wrong number of arguments for "set" command\r\n');
                    } else {
                        const result = store.set(args[1], args[2]);
                        socket.write(encodeRESP(result));
                    }
                    break;

                case 'GET':
                    if (args.length < 2) {
                        socket.write('-ERR wrong number of arguments for "get" command\r\n');
                    } else {
                        const value = store.get(args[1]);
                        socket.write(encodeRESP(value));
                    }
                    break;

                case 'DEL':
                    if (args.length < 2) {
                        socket.write('-ERR wrong number of arguments for "del" command\r\n');
                    } else {
                        const count = store.del(args[1]);
                        socket.write(encodeRESP(count));
                    }
                    break;

                default:
                    socket.write(`-ERR unknown command '${command}'\r\n`);
                    break;
            }
        } catch (err) {
            console.error('Error handling request:', err);
            socket.write('-ERR internal server error\r\n');
        }
    });

    socket.on('end', () => {
        console.log('[-] Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Custom Redis TCP Server listening on port ${PORT}`);
});