import dns from 'dns';
import net from 'net';

dns.lookup('smtp.gmail.com', (error, address, family) => {
    if (error) {
        console.error('DNS lookup failed:', error);
        return;
    }

    console.log('Gmail SMTP resolved to:', address);
    console.log('IP family:', family);
});

const socket = net.createConnection({
    host: 'smtp.gmail.com',
    port: 587,
    timeout: 10000,
});

socket.on('connect', () => {
    console.log('SMTP TCP connection successful');
    socket.end();
});

socket.on('timeout', () => {
    console.error('SMTP TCP connection timed out');
    socket.destroy();
});

socket.on('error', (error) => {
    console.error('SMTP TCP connection failed:', error);
});
