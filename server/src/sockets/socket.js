const socketIO = require('socket.io');
const {threadSocket} = require('./events/thread.event');
const { messageSocket } = require('./events/message.event');

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {origin: '*'}
    });

    // New websocket connection
    io.on('connection', (socket) => {
        console.log('User connected!');
        // Disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });

        // Websocket Routes
        threadSocket(io, socket);
        messageSocket(io, socket);
    });

    return io;
};
