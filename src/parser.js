// src/parser.js

/**
 * Parses incoming raw RESP array buffer into command arguments
 * Example input: *2\r\n$3\r\nGET\r\n$4\r\nname\r\n
 * Example output: ['GET', 'name']
 */
function parseRESP(buffer) {
    const input = buffer.toString();

    // If it doesn't start with '*', it's not a standard RESP array format
    if (!input.startsWith('*')) {
        // Fallback for simple inline commands (e.g., typing PING directly in telnet)
        return input.trim().split(/\s+/);
    }

    const lines = input.split('\r\n');
    const args = [];

    // Iterate over array items, jumping over line length indicators ($3, $4, etc.)
    for (let i = 2; i < lines.length; i += 2) {
        if (lines[i] !== undefined && lines[i] !== '') {
            args.push(lines[i]);
        }
    }

    return args;
}

/**
 * Formats data back into valid RESP responses to send back over TCP
 */
function encodeRESP(data) {
    if (data === null || data === undefined) {
        return '$-1\r\n'; // Null Bulk String
    }

    if (typeof data === 'number') {
        return `:${data}\r\n`; // Integer response
    }

    if (data === 'OK' || data === 'PONG') {
        return `+${data}\r\n`; // Simple String response
    }

    // Default to Bulk String for standard return values
    const str = String(data);
    return `$${str.length}\r\n${str}\r\n`;
}

module.exports = { parseRESP, encodeRESP };