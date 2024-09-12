const { sendMessage } = require("../../web/controllers/websocket/messageController");
const { socketAuth } = require("../../web/middleware/socketAuth");

exports.messageSocket = (io, socket) => {

    // socketAuth middleware that return user object and is sent to the next function
    socket.on('send-message', (data) => socketAuth(socket, data, (user) => sendMessage(io, socket, user, data)));

}
