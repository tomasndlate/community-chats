const { default: mongoose } = require("mongoose");
const NotFoundError = require("../../errors/NotFound.error");
const ServerError = require("../../errors/InternalServer.error");
const Thread = require("../../models/Thread");
const BadRequestError = require("../../errors/BadRequest.error");
const messageService = require("../../services/messageService");

exports.sendMessage = async (io, socket, user, data) => {
        try {

            if (!mongoose.Types.ObjectId.isValid(data.threadId))
                throw new BadRequestError('Thread ID not valid');

            const existentThread = await Thread.findById(data.threadId);

            if (!existentThread)
                throw new NotFoundError('Thread not found');

            const newMessage = await messageService.create(data.threadId, user._id, data.message);
            
            io.to(data.threadId).emit('receive-message', newMessage);
            
        } catch (error) {
            error = !error.statusCode ? new ServerError('Internal error.') : error;
            socket.emit('error-send-message', { code: error.statusCode, message: error.message });
        }   
    }