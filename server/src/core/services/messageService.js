const DatabaseError = require("../errors/DatabaseError");
const Thread = require("../models/Thread");
const Message = require("../models/Message");

exports.create = async (threadId, userId, message) => {
    try {
        
        const newMessage = new Message({
            thread: threadId,
            sender: userId,
            content: message
        });
        await newMessage.save();
        
        const thread = await Thread.findById(threadId);
        thread.messages.push(newMessage._id);
        thread.save();

        return newMessage;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
};