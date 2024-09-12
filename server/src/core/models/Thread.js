const mongoose = require('mongoose');
const DatabaseError = require('../errors/DatabaseError');
const BadRequestError = require('../errors/BadRequest.error');

const threadSchema = new mongoose.Schema({
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true
    },
    nameId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    messages: [{
            type: String
        }],
    startDate: {
        type: Date,
        default: Date.now,
    },
});

threadSchema.index({ nameId: 1, community: 1 }, { unique: true });

threadSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const existingThread = await this.constructor.findOne({ nameId: this.nameId, community: this.community });
        
            if (!!existingThread)
                throw new BadRequestError('Thread already exists');
        }
        
        next();

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        next(error);
    }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;